import math

import pytest

from config import validate_config
from retrieval.connection import get_graph
from retrieval.embedding_model import DIM
from retrieval.hybrid import HybridRetriever

validate_config()
graph = get_graph()
retriever = HybridRetriever.get_instance()
emb = retriever.embedding_model


def test_modelo_gera_vetor_valido():
    v = emb.embed_query("oficinas de programação para meninas")
    assert len(v) == DIM
    assert all(math.isfinite(x) for x in v)
    assert any(abs(x) > 1e-6 for x in v)


@pytest.mark.parametrize("label", ["Document", "__Entity__"])
def test_sem_embedding_faltando(label):
    n = graph.query(
        f"MATCH (n:`{label}`) WHERE n.embedding IS NULL RETURN count(n) AS n"
    )[0]["n"]
    assert n == 0, f"{n} nós {label} sem embedding"


@pytest.mark.parametrize("label", ["Document", "__Entity__"])
def test_dimensao_correta(label):
    n = graph.query(
        f"MATCH (n:`{label}`) WHERE size(n.embedding) <> $d RETURN count(n) AS n",
        {"d": DIM},
    )[0]["n"]
    assert n == 0, f"{n} nós {label} com dimensão != {DIM}"


def test_busca_retorna_resultados():
    vec = emb.embed_query("oficinas de programação para meninas do ensino médio")
    chunks = retriever._chunks_entrada(vec)
    assert chunks, "nenhum chunk retornado"
    assert chunks[0]["score"] > 0.5