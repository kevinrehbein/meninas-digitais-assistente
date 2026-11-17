"""Testes rápidos da API sem tocar em Neo4j/LLMs (usa um serviço fake)."""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from fastapi.testclient import TestClient
from langchain_core.messages import ToolMessage

from api import chat as chat_module
from api.main import app
from api.progress import describe_update
from api.sources import extract_sources


class FakeService:
    def stream(self, question, stop_event):
        yield {
            "event": "status",
            "data": describe_update(
                "supervisor", {"intent": "qa", "complexity": "simples"}
            ),
        }
        yield {
            "event": "status",
            "data": describe_update(
                "pesquisador",
                {
                    "messages": [
                        ToolMessage(
                            content="ok",
                            tool_call_id="1",
                            name="pesquisar_contexto_wit",
                        )
                    ]
                },
            ),
        }
        yield {
            "event": "final",
            "data": {
                "answer_markdown": "Resposta de teste.",
                "warning": None,
                "response_type": "text",
                "plan": None,
                "sources": [
                    {"title": "Artigo", "url": "https://sol.sbc.org.br/x"}
                ],
                "meta": {"intent": "qa", "elapsed_ms": 10},
            },
        }


class ExplodingService:
    def stream(self, question, stop_event):
        raise RuntimeError("boom")
        yield  # pragma: no cover


def parse_sse(text: str):
    events = []
    for block in text.split("\n\n"):
        name = None
        data = None
        for line in block.splitlines():
            if line.startswith("event:"):
                name = line[6:].strip()
            elif line.startswith("data:"):
                data = line[5:].strip()
        if name and data:
            events.append((name, json.loads(data)))
    return events


def main() -> None:
    client = TestClient(app)

    # health
    r = client.get("/api/health")
    print("health:", r.status_code, r.json())
    assert r.status_code in (200, 503)

    # unit: sources
    msgs = [
        ToolMessage(
            content="[FONTE: Artigo A | https://a.example/x] [FONTE: Artigo B | https://b.example/y]",
            tool_call_id="1",
        )
    ]
    found = extract_sources(msgs)
    print("sources:", list(found))
    assert list(found) == ["https://a.example/x", "https://b.example/y"]

    # validation
    r = client.post("/api/chat", json={"question": "   "})
    print("blank ->", r.status_code)
    assert r.status_code == 422

    # happy path
    chat_module.get_service = lambda: FakeService()  # type: ignore[assignment]
    with client.stream("POST", "/api/chat", json={"question": "O que é WIT?"}) as resp:
        print("chat status:", resp.status_code, resp.headers.get("content-type"))
        assert resp.status_code == 200
        assert "text/event-stream" in resp.headers["content-type"]
        body = "".join(resp.iter_text())
    events = parse_sse(body)
    print("events:", [name for name, _ in events])
    assert events[0][0] == "meta"
    assert events[-1][0] == "final"
    assert events[-1][1]["answer_markdown"] == "Resposta de teste."

    # error path
    chat_module.get_service = lambda: ExplodingService()  # type: ignore[assignment]
    with client.stream("POST", "/api/chat", json={"question": "erro"}) as resp:
        body = "".join(resp.iter_text())
    names = [n for n, _ in parse_sse(body)]
    print("error events:", names)
    assert "error" in names

    print("ALL_OK")


if __name__ == "__main__":
    main()
