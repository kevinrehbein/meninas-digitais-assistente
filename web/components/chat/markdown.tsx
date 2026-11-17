import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { ExternalLink } from "lucide-react";

const components: Components = {
  a({ href, children, ...props }) {
    const external = Boolean(href && /^https?:\/\//i.test(href));
    return (
      <a
        href={href}
        {...props}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
        {external ? (
          <ExternalLink
            className="ml-1 inline h-3 w-3 align-baseline opacity-60"
            aria-hidden="true"
          />
        ) : null}
      </a>
    );
  },
  table({ children }) {
    return (
      <div className="my-4 w-full overflow-x-auto rounded-xl border border-brand-line">
        <table className="!my-0">{children}</table>
      </div>
    );
  },
};

type MarkdownProps = {
  children: string;
  className?: string;
};

export function Markdown({ children, className = "" }: MarkdownProps) {
  return (
    <div className={`md-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
