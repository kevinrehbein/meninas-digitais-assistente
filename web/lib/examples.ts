export type Example = {
  question: string;
  label: string;
  accent: "rose" | "purple" | "blue";
};

export const EXAMPLES: Example[] = [
  {
    question: "Quais artigos falam sobre mentoria para meninas?",
    label: "Mentoria para meninas",
    accent: "rose",
  },
  {
    question: "Faça um panorama sobre a inclusão de mulheres na computação.",
    label: "Panorama da inclusão",
    accent: "purple",
  },
  {
    question:
      "Crie um plano de projeto de oficina de programação para alunas do ensino médio.",
    label: "Plano de oficina",
    accent: "blue",
  },
];

export const EXAMPLE_STYLES = {
  rose: {
    dot: "bg-brand-rose",
    border: "hover:border-brand-rose/50",
    icon: "bg-[#FBEEF0] text-brand-rose",
  },
  purple: {
    dot: "bg-brand-purple",
    border: "hover:border-brand-purple/50",
    icon: "bg-brand-lilac text-brand-purple",
  },
  blue: {
    dot: "bg-brand-blue",
    border: "border-brand-blue/25 hover:border-brand-blue/60",
    icon: "bg-[#E0E4F7] text-brand-blue",
  },
} as const;
