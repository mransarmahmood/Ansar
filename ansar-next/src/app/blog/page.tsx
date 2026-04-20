import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Clock, ArrowUpRight, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getAllPosts, formatDate } from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Insights — HSE, AI, Vision 2030 & Certification | Ansar Mahmood",
  description:
    "Long-form essays and field notes on HSE management, AI-powered safety, ISO 45001 implementation, Vision 2030 giga-projects, and CSP / CRSP / NEBOSH certification — by Ansar Mahmood.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    type: "website",
    title: "Insights by Ansar Mahmood",
    description:
      "Essays on HSE, AI, Vision 2030, and HSE certification.",
    url: "/blog/",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  const crumbs = breadcrumbSchema([
    { name: "Home",     url: "/" },
    { name: "Insights", url: "/blog/" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="relative text-white overflow-hidden"
        style={{ background: "var(--grad-hero-glow)" }}
      >
        <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />
        <Container className="relative z-10">
          <div className="py-20 md:py-28">
            <nav className="inline-flex items-center gap-1.5 text-[0.8rem] text-white/55 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-white/85">Insights</span>
            </nav>

            <div className="inline-flex items-center gap-3 mb-8 font-mono text-[0.72rem] font-medium tracking-[0.15em] text-white/55 uppercase">
              <span className="h-px w-10 bg-white/40" />
              Insights · Field notes · Long-form essays
            </div>

            <h1
              className="text-white font-display font-normal text-[2.6rem] md:text-[3.6rem] lg:text-[4.2rem] leading-[0.98] tracking-[-0.035em] mb-7 max-w-[18ch]"
              style={{ fontVariationSettings: '"SOFT" 30, "opsz" 144' }}
            >
              What&apos;s on my mind about{" "}
              <span className="serif-italic text-gold-gradient">HSE and AI</span>.
            </h1>

            <p className="text-[1.1rem] md:text-[1.2rem] text-white/75 leading-[1.55] max-w-[54ch] font-light">
              Practical essays written from the field — not from a desk. No
              vendor pitches, no hype cycles. If it&apos;s here, it&apos;s
              because a client paid for me to figure it out.
            </p>
          </div>
        </Container>
      </section>

      {/* ═══ FEATURED POST (or empty state) ═════════════════════ */}
      {posts.length === 0 ? (
        <section className="py-28 md:py-40 bg-[var(--surface)]">
          <Container size="narrow">
            <div className="text-center">
              <div className="eyebrow mb-4 text-[var(--text-muted)]">§ Coming soon</div>
              <h2 className="font-display text-[1.8rem] md:text-[2.3rem] leading-[1.1] tracking-[-0.03em] mb-5">
                The first essays are being{" "}
                <span className="serif-italic text-[var(--brand)]">written</span>.
              </h2>
              <p className="text-[var(--text-muted)] leading-[1.65] max-w-[52ch] mx-auto">
                In the meantime, use the newsletter at the foot of the page and
                I&apos;ll send each essay to your inbox when it goes live.
              </p>
            </div>
          </Container>
        </section>
      ) : (
        <>
          {featured && (
            <section className="relative py-24 md:py-28 bg-[var(--surface)]">
              <Container>
                <div className="eyebrow mb-6">§ Featured essay</div>
                <Link
                  href={`/blog/${featured.slug}/`}
                  className="group grid grid-cols-12 gap-8 lg:gap-16 items-center"
                >
                  {featured.image && (
                    <div className="col-span-12 lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-[2px]">
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                        priority
                      />
                    </div>
                  )}
                  <div className={featured.image ? "col-span-12 lg:col-span-5" : "col-span-12 lg:col-span-8 lg:col-start-3"}>
                    <PostMeta date={featured.date} readTime={featured.readTime} tags={featured.tags} />
                    <h2 className="font-display font-normal text-[2rem] md:text-[2.4rem] lg:text-[2.8rem] leading-[1.06] tracking-[-0.03em] mt-5 mb-5 group-hover:text-[var(--brand-dark)] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-[var(--text-muted)] leading-[1.65] text-[1.05rem] mb-6 max-w-[48ch]">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 font-medium text-[var(--text)]">
                      <span className="relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-[var(--brand)] after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-500">
                        Read the essay
                      </span>
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </Link>
              </Container>
            </section>
          )}

          {rest.length > 0 && (
            <section className="py-24 md:py-32 bg-[var(--surface-alt)]">
              <Container>
                <div className="flex items-end justify-between mb-12">
                  <div>
                    <div className="eyebrow mb-3">§ All essays</div>
                    <h2 className="font-display text-[1.8rem] md:text-[2.2rem] leading-[1.1] tracking-[-0.03em]">
                      More from the archive
                    </h2>
                  </div>
                  <div className="hidden md:block eyebrow text-[var(--text-muted)]">
                    {posts.length} essays · updated {formatDate(posts[0].date)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0">
                  {rest.map((p) => (
                    <PostListItem key={p.slug} post={p} />
                  ))}
                </div>
              </Container>
            </section>
          )}
        </>
      )}
    </>
  );
}

/* ── Small components ────────────────────────────────────────── */

function PostMeta({
  date,
  readTime,
  tags,
}: {
  date: string;
  readTime: string;
  tags?: string[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 eyebrow text-[var(--text-muted)]">
      {date && <span>{formatDate(date)}</span>}
      {date && readTime && <span className="h-px w-4 bg-[var(--gray-300)]" />}
      {readTime && (
        <span className="inline-flex items-center gap-1.5">
          <Clock size={11} strokeWidth={2} />
          {readTime}
        </span>
      )}
      {tags && tags.length > 0 && (
        <>
          <span className="h-px w-4 bg-[var(--gray-300)]" />
          <span className="inline-flex gap-1.5 flex-wrap">
            {tags.slice(0, 3).map((t) => (
              <span key={t} className="text-[var(--brand)]">{t}</span>
            ))}
          </span>
        </>
      )}
    </div>
  );
}

function PostListItem({
  post,
}: {
  post: ReturnType<typeof getAllPosts>[number];
}) {
  return (
    <article className="border-t border-[var(--gray-200)] last:border-b md:[&:nth-child(-n+3)]:border-t md:[&:nth-last-child(-n+3)]:border-b">
      <Link
        href={`/blog/${post.slug}/`}
        className="group block py-10 pr-4 transition-all duration-500"
      >
        <PostMeta date={post.date} readTime={post.readTime} tags={post.tags} />
        <h3 className="font-display text-[1.4rem] md:text-[1.55rem] leading-[1.1] tracking-[-0.015em] text-[var(--text)] mt-4 mb-3 max-w-[22ch]">
          <span className="relative">
            {post.title}
            <span
              aria-hidden="true"
              className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-[var(--brand)]"
            />
          </span>
        </h3>
        <p className="text-[0.95rem] text-[var(--text-muted)] leading-[1.6] mb-5 max-w-[40ch]">
          {post.excerpt}
        </p>
        <div className="inline-flex items-center gap-1.5 text-[0.82rem] font-mono uppercase tracking-[0.12em] text-[var(--text-light)] group-hover:text-[var(--text)] transition-colors">
          Read more
          <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>
    </article>
  );
}
