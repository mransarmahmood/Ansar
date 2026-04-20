import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

/**
 * Typography overrides for rendered MDX.
 * Editorial / long-form magazine feel — Fraunces headings, Inter body,
 * proper vertical rhythm, pull-quote treatment, syntax-styled code.
 */
export const mdxComponents: MDXComponents = {
  h1: ({ children, ...rest }) => (
    <h1
      {...rest}
      className="font-display font-normal text-[2.4rem] md:text-[3rem] leading-[1.06] tracking-[-0.03em] text-[var(--text)] mt-14 mb-6"
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...rest }) => (
    <h2
      {...rest}
      className="font-display font-normal text-[1.8rem] md:text-[2.1rem] leading-[1.1] tracking-[-0.025em] text-[var(--text)] mt-14 mb-5"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...rest }) => (
    <h3
      {...rest}
      className="font-display font-medium text-[1.35rem] md:text-[1.5rem] leading-[1.2] tracking-[-0.015em] text-[var(--text)] mt-10 mb-4"
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...rest }) => (
    <h4
      {...rest}
      className="font-semibold text-[1.08rem] text-[var(--text)] mt-8 mb-3 tracking-[-0.005em]"
    >
      {children}
    </h4>
  ),
  p: ({ children, ...rest }) => (
    <p
      {...rest}
      className="text-[1.08rem] md:text-[1.12rem] leading-[1.75] text-[var(--text)] my-6 font-light"
    >
      {children}
    </p>
  ),
  a: ({ children, href, ...rest }) => {
    const isInternal = href?.startsWith("/") || href?.startsWith("#");
    const className =
      "text-[var(--brand-dark)] underline underline-offset-4 decoration-[var(--brand)]/30 hover:decoration-[var(--brand)] transition-all";
    if (isInternal) {
      return (
        <Link href={href ?? "#"} className={className} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children, ...rest }) => (
    <blockquote
      {...rest}
      className="relative my-10 pl-6 md:pl-8 border-l-2 border-[var(--brand)] not-italic"
    >
      <div className="font-display italic text-[1.3rem] md:text-[1.5rem] leading-[1.3] tracking-[-0.015em] text-[var(--text)] font-normal">
        {children}
      </div>
    </blockquote>
  ),
  ul: ({ children, ...rest }) => (
    <ul
      {...rest}
      className="my-6 space-y-2.5 pl-5 text-[1.05rem] leading-[1.75] text-[var(--text)] font-light list-disc marker:text-[var(--brand)]"
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...rest }) => (
    <ol
      {...rest}
      className="my-6 space-y-2.5 pl-5 text-[1.05rem] leading-[1.75] text-[var(--text)] font-light list-decimal marker:text-[var(--brand)] marker:font-mono"
    >
      {children}
    </ol>
  ),
  li: ({ children, ...rest }) => (
    <li {...rest} className="pl-1.5">
      {children}
    </li>
  ),
  hr: ({ ...rest }) => (
    <hr
      {...rest}
      className="my-14 border-0 h-px bg-gradient-to-r from-transparent via-[var(--gray-300)] to-transparent"
    />
  ),
  code: ({ children, ...rest }) => (
    <code
      {...rest}
      className="font-mono text-[0.88em] bg-[var(--gray-100)] text-[var(--text)] px-1.5 py-0.5 rounded-[3px] border border-[var(--gray-200)]"
    >
      {children}
    </code>
  ),
  pre: ({ children, ...rest }) => (
    <pre
      {...rest}
      className="my-8 overflow-x-auto rounded-[2px] bg-[var(--navy)] text-white/90 p-6 text-[0.9rem] leading-[1.65] font-mono border border-[var(--navy-mid)]"
    >
      {children}
    </pre>
  ),
  img: ({ src, alt, ...rest }) => {
    if (!src) return null;
    return (
      <figure className="my-10">
        <Image
          src={String(src)}
          alt={String(alt ?? "")}
          width={1200}
          height={675}
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="w-full h-auto rounded-[2px]"
          {...rest}
        />
        {alt && (
          <figcaption className="mt-3 text-[0.82rem] text-[var(--text-light)] italic text-center">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
  table: ({ children, ...rest }) => (
    <div className="my-8 overflow-x-auto">
      <table
        {...rest}
        className="w-full border-collapse text-[0.95rem]"
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...rest }) => (
    <th
      {...rest}
      className="text-left font-mono text-[0.72rem] tracking-[0.12em] uppercase text-[var(--text-light)] font-semibold px-4 py-3 border-b border-[var(--gray-300)]"
    >
      {children}
    </th>
  ),
  td: ({ children, ...rest }) => (
    <td
      {...rest}
      className="px-4 py-3 border-b border-[var(--gray-200)] align-top"
    >
      {children}
    </td>
  ),
  strong: ({ children, ...rest }) => (
    <strong {...rest} className="font-semibold text-[var(--text)]">
      {children}
    </strong>
  ),
  em: ({ children, ...rest }) => (
    <em {...rest} className="serif-italic text-[var(--text)]">
      {children}
    </em>
  ),
};
