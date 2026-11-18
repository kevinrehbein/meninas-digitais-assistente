import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  Compass,
  ExternalLink,
  HeartHandshake,
  Library,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  ListOrdered,
  GitBranch,
  Workflow,
  Network
} from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { TapestryBand } from "@/components/brand/tapestry";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Sobre o projeto",
  description:
    "Conheça o Assistente Meninas Digitais: um projeto acadêmico de pesquisa sobre os artigos do WIT.",
};

const GITHUB_URL = "https://github.com/SEU-USUARIO/SEU-REPOSITORIO";

const PALETTE = [
  { name: "Rosa", hex: "#C96372" },
  { name: "Roxo", hex: "#7B3688" },
  { name: "Azul", hex: "#35418E" },
  { name: "Amarelo", hex: "#F8E12D" },
  { name: "Verde", hex: "#54963D" },
  { name: "Laranja", hex: "#CE6B00" },
];

const CAPABILITIES = [
  {
    icon: Search,
    title: "Perguntas e sínteses",
    text: "Responde dúvidas factuais e produz panoramas sobre temas presentes nos artigos do WIT, sempre citando as evidências encontradas.",
    color: "bg-[#FBEEF0] text-brand-rose",
  },
  {
    icon: ClipboardList,
    title: "Planos de projeto",
    text: "Estrutura propostas de oficinas, cursos e ações de inclusão com justificativa, metodologia, desafios e indicadores.",
    color: "bg-[#EDEFF9] text-brand-blue",
  },
];

const PIPELINE = [
  {
    icon: Compass,
    title: "1. Classificação",
    text: "O supervisor identifica a intenção — pergunta direta, síntese ou plano — e decide o esforço de pesquisa.",
  },
    {
    icon: Library,
    title: "2. Decomposição de Tarefas",
    text: "O descompositor quebra buscas complexas em passos menores, que serão sequencialmente feitas pelo pesquisador. ",
  },
  {
    icon: ListOrdered,
    title: "3. Pesquisa Híbrida RAG + Grafos de Conhecimento",
    text: "O pesquisador consulta os artigos por similaridade vetorial e expande o contexto pelas relações do grafo de conhecimento.",
  },
  {
    icon: Sparkles,
    title: "4. Redação",
    text: "O redator ou o planejador organiza a resposta usando apenas as evidências coletadas na base.",
  },
  {
    icon: ShieldCheck,
    title: "5. Verificação",
    text: "Um verificador compara o rascunho com as evidências e pode pedir correção, nova pesquisa ou reclassificação.",
  },
];

const GUARANTEES = [
  "As respostas são construídas a partir de trechos reais dos artigos do WIT.",
  "As fontes consultadas ficam disponíveis para conferência em cada resposta.",
  "O texto passa por uma etapa de verificação de fidelidade às evidências.",
  "A conversa fica apenas no seu navegador; não há cadastro nem login.",
];

const LIMITS = [
  "O assistente pode cometer erros. A resposta não substitui a leitura do artigo original.",
  "Cada pergunta é independente: não há memória de mensagens anteriores.",
  "Perguntas fora do escopo são recusadas.",
  "O projeto é acadêmico e não representa uma posição oficial do PMD ou da SBC.",
];

export default function AboutPage() {
  return (
    <>
      <article>
        <section className="relative overflow-hidden border-b border-brand-line/70">
          <TapestryBand rows={2} className="h-2.5" />
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-muted transition-colors hover:text-brand-purple"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Voltar ao assistente
            </Link>

            <div className="mt-8 grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-line bg-white px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.15em] text-brand-purple">
                  <HeartHandshake className="h-3 w-3" aria-hidden="true" />
                  Sobre o projeto
                </span>
                <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-[0.01em] text-brand-ink sm:text-5xl">
                  Uma ponte entre a produção do WIT e você.
                </h1>
                <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-brand-muted sm:text-[15px]">
                  O Meninas Digitais Assistente é um projeto acadêmico que usa
                  agentes de Inteligência Artificial e Geração Aumentada por
                  Recuperação baseada em Grafo de Conhecimento para tornar os
                  artigos do{" "}
                  <strong className="font-semibold text-brand-ink">
                    Women in Information Technology
                  </strong>{" "}
                  mais acessíveis. Em vez de uma busca por palavras-chave, você
                  conversa com uma ferramenta que pesquisa, organiza evidências
                  e verifica o que escreveu.
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-brand-purple px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-[0_10px_24px_-14px_rgba(123,54,136,0.8)] transition-colors hover:bg-[#672b73]"
                  >
                    Conversar com o assistente
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <a
                    href="https://meninas.sbc.org.br/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-brand-line bg-white px-4 py-2.5 text-[12.5px] font-semibold text-brand-muted transition-colors hover:border-brand-purple/30 hover:text-brand-purple"
                  >
                    Programa Meninas Digitais
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-sm">
                <div
                  className="absolute -inset-4 rounded-[2rem] bg-[conic-gradient(from_140deg,#C96372,#7B3688,#35418E,#F8E12D,#54963D,#CE6B00,#C96372)] opacity-20 blur-sm"
                  aria-hidden="true"
                />
                <div className="relative flex flex-col items-center rounded-[1.75rem] border border-brand-line bg-white p-6 shadow-[0_24px_60px_-40px_rgba(26,26,30,0.5)]">
                  <BrandMark
                    size={96}
                    className="mx-auto ring-4 ring-brand-lilac"
                  />
                  <p className="mt-5 text-center text-sm font-semibold text-brand-ink">
                    &ldquo;Promover, articular e apoiar iniciativas que
                    estimulem o interesse, a permanência e o protagonismo de
                    meninas e mulheres na área de Computação, por meio de ações
                    educativas, científicas e extensionistas em todos os níveis
                    de educação. &rdquo;
                  </p>
                  <p className="mt-2 text-center text-[10.5px] uppercase tracking-[0.14em] text-brand-muted">
                    Missão do Programa Meninas Digitais
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <section className="border-b border-brand-line/70 py-12 sm:py-16">
            <div className="max-w-3xl">
              <div>
                <h2 className="font-display text-3xl tracking-[0.01em] text-brand-ink">
                  O Programa Meninas Digitais
                </h2>
                <p className="mt-4 text-[13px] leading-relaxed text-brand-muted">
                  O Programa Meninas Digitais foi criado em 2011 sob a
                  coordenação da Secretaria Regional da Sociedade Brasileira de
                  Computação (SBC) em Mato Grosso e, em 2015, foi
                  institucionalizado pela SBC, recebendo sua chancela, como
                  programa de interesse nacional da comunidade de Computação.
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-brand-muted">
                  A ideia do Programa Meninas Digitais surgiu a partir de
                  discussões no Women in Information Technology (WIT), evento
                  base do Congresso da Sociedade Brasileira de Computação
                  (CSBC). O WIT é uma iniciativa da SBC realizada desde 2007
                  para discutir assuntos relacionados às questões de gênero e a
                  Tecnologia de Informação (TI) no Brasil por meio de histórias
                  de sucesso, políticas de incentivo e formas de engajamento e
                  atração de jovens, especialmente mulheres, para as carreiras
                  associadas à TI.
                </p>
                <a
                  href="https://meninas.sbc.org.br/sobre-o-wit/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-blue hover:underline"
                >
                  Conheça o WIT
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          <section className="border-b border-brand-line/70 py-12 sm:py-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl tracking-[0.01em] text-brand-ink">
                O que o assistente faz
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-brand-muted">
                A ferramenta foi desenhada para dois tipos de uso, todos
                ancorados nos artigos do WIT.
              </p>
            </div>
            <div className="mt-7 grid gap-3.5 md:grid-cols-3">
              {CAPABILITIES.map((capability) => {
                const Icon = capability.icon;
                return (
                  <div
                    key={capability.title}
                    className="rounded-2xl border border-brand-line bg-white p-5"
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${capability.color}`}
                    >
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-3.5 text-sm font-semibold text-brand-ink">
                      {capability.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-brand-muted">
                      {capability.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="border-b border-brand-line/70 py-12 sm:py-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl tracking-[0.01em] text-brand-ink">
                Como a resposta é construída
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-brand-muted">
                Um grafo de agentes coordena cinco etapas. Você acompanha cada
                uma delas na interface enquanto a resposta é preparada.
              </p>
            </div>

            <ol className="mt-7 grid gap-3.5 md:grid-cols-2">
              {PIPELINE.map((step) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.title}
                    className="flex gap-3 rounded-2xl border border-brand-line bg-white p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-lilac text-brand-purple">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-brand-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[12px] leading-relaxed text-brand-muted">
                        {step.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="py-12 sm:py-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl tracking-[0.01em] text-brand-ink">
                Tecnologia
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-brand-muted">
                O assistente é construído sobre dois pilares: LangGraph, que
                orquestra o fluxo de agentes, e Neo4j, que guarda o grafo de
                conhecimento com os artigos do WIT.
              </p>
            </div>
 
            <div className="mt-7 grid gap-3.5 md:grid-cols-2">
              <div className="rounded-2xl border border-brand-line bg-white p-6">

                <h3 className="mt-4 font-display text-2xl tracking-[0.01em] text-brand-ink">
                  LangGraph
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-brand-muted">
                  Cada pergunta percorre um grafo de agentes com etapas
                  explícitas: entender a pergunta, recuperar evidências, gerar
                  a resposta e verificar a fidelidade em relação às fontes.
                  Como o fluxo é um grafo, cada passo pode ser inspecionado e
                  ajustado de forma independente.
                </p>
              </div>
 
              <div className="rounded-2xl border border-brand-line bg-white p-6">
                <h3 className="mt-4 font-display text-2xl tracking-[0.01em] text-brand-ink">
                  Neo4j
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-brand-muted">
                  Os artigos dos anais do WIT ficam indexados como nós e possuem
                  relações. A recuperação combina busca vetorial por embeddings com expansão
                  pelas conexões do grafo, trazendo nós relacionados que a
                  busca por similaridade sozinha não encontraria.
                </p>
              </div>
            </div>
 
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-brand-line bg-brand-lilac/60 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-brand-ink">
                  Código aberto no GitHub
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-brand-muted">
                  Veja o grafo de agentes, o esquema do Neo4j e o pipeline de
                  indexação.
                </p>
              </div>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-ink px-5 py-2.5 text-[12px] font-semibold text-white transition hover:bg-brand-purple"
              >
                <GitBranch className="h-4 w-4" aria-hidden="true" />
                Ver repositório
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
 
            <div className="mt-5 flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brand-muted">
                Também usamos
              </span>
              {[
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "FastAPI",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-brand-line bg-white px-2.5 py-1 text-[10.5px] font-semibold text-brand-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="border-b border-brand-line/70 py-12 sm:py-16">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-brand-line bg-white p-5">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
                  <ShieldCheck
                    className="h-4 w-4 text-brand-success"
                    aria-hidden="true"
                  />
                  O que garantimos
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {GUARANTEES.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-[12px] leading-relaxed text-brand-muted"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-success"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#F0D3B4] bg-[#FFF8EE] p-5">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-warning">
                  <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                  Limites importantes
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {LIMITS.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-[12px] leading-relaxed text-[#6f4a25]"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-warning" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

        </div>

        <section className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-brand-purple px-6 py-8 text-white sm:px-10 sm:py-10">
            <TapestryBand rows={1} className="absolute inset-x-0 top-0 h-1.5" />
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-rose/30 blur-3xl" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl tracking-[0.01em]">
                  Pronto para pesquisar?
                </h2>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/80">
                  Faça uma pergunta sobre os artigos do WIT, peça um panorama ou
                  monte um plano de projeto com base na literatura.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex w-fit items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-[12.5px] font-semibold text-brand-purple transition-transform hover:scale-[1.02]"
              >
                Abrir o assistente
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}