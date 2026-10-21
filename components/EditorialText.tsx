import ReactMarkdown from 'react-markdown';

/** Inline formatting for CMS-authored copy. Raw HTML and unsafe URLs stay disabled. */
export default function EditorialText({ children }: { children: string }) {
  return <ReactMarkdown skipHtml allowedElements={['p', 'strong', 'em', 'a', 'code', 'br']} unwrapDisallowed components={{
    p: ({ children }) => <>{children}</>,
    strong: ({ children }) => <strong className="text-text-primary">{children}</strong>,
    code: ({ children }) => <code className="text-text-primary text-sm">{children}</code>,
    a: ({ href, children }) => <a href={href} className="text-white font-semibold underline underline-offset-2" {...(href?.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>,
  }}>{children}</ReactMarkdown>;
}
