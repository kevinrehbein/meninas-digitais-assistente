from config import validate_config
from retrieval.hybrid import HybridRetriever

validate_config()
r = HybridRetriever.get_instance()

query = "oficinas de programação para meninas do ensino médio"
vec = r.embedding_model.embed_query(query)

print(f"\nQUERY: {query}\n")

print("=== CHUNKS ===")
for c in r._chunks_entrada(vec):
    texto = c["texto"].replace("\n", " ")[:150]
    print(f"{c['score']:.3f} | {c['titulo']}\n        {texto}...\n")

print("=== ENTIDADES ===")
for e in r._entidades_entrada(vec):
    print(f"{e['score']:.3f} | {e['nome']}: {e['descricao'][:100]}")