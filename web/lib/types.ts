export type Source = {
  title: string;
  url: string;
};

export type ToolCallInfo = {
  name: string;
  label: string;
  query: string;
};

export type StepData = {
  intent?: string;
  complexity?: string;
  steps?: string[];
  tools?: ToolCallInfo[];
  result_count?: number;
  verdict?: string;
  feedback?: string;
};

export type AgentStep = {
  id: string;
  node: string;
  state: "done";
  title: string;
  detail: string;
  data: StepData;
  at: number;
};

export type PlanStep = {
  etapa: string;
  descricao: string;
  fonte?: string | null;
};

export type ProjectPlan = {
  title: string;
  target_audience: string;
  justification: string;
  methodology: PlanStep[];
  challenges: string[];
  indicators: string[];
  expected_results: string[];
  references: string[];
};

export type FinalMeta = {
  intent?: string | null;
  complexity?: string | null;
  verdict?: string | null;
  iterations?: number;
  elapsed_ms?: number;
};

export type FinalPayload = {
  answer_markdown: string;
  warning?: string | null;
  response_type?: "text" | "plan";
  plan?: ProjectPlan | null;
  sources?: Source[];
  meta?: FinalMeta;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  status: "streaming" | "done" | "error" | "stopped";
  createdAt: number;
  steps?: AgentStep[];
  sources?: Source[];
  warning?: string | null;
  responseType?: "text" | "plan";
  plan?: ProjectPlan | null;
  meta?: FinalMeta;
  error?: string;
  /** Pergunta que originou esta resposta, usada em "tentar novamente". */
  question?: string;
};

export type StreamEvent =
  | { event: "meta"; data: { version: number; request_id: string } }
  | {
      event: "status";
      data: {
        node: string;
        state: "done";
        title: string;
        detail: string;
        data: StepData;
      };
    }
  | { event: "final"; data: FinalPayload }
  | {
      event: "error";
      data: {
        code: string;
        message: string;
        retryable?: boolean;
        request_id?: string;
      };
    };
