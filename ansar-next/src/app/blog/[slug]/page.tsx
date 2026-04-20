import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  ChevronRight,
  ArrowLeft,
  Clock,
  CalendarCheck,
  ArrowUpRight,
  Share2,
  Mail,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getAllPosts, getPost, getPostSlugs, formatDate } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Essay not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}/`,
      publishedTime: post.date,
      authors: [post.author ?? "Ansar Mahmood"],
      tags: post.tags,
      images: post.image ? [post.image] : ["/images/ansar-10.jpeg"],
    },
    keywords: post.tags,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return notFound();

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const crumbs = breadcrumbSchema([
    { name: "Home",       url: "/" },
    { name: "Insights",   url: "/blog/" },
    { name: post.title,   url: `/blog/${post.slug}/` },
  ]);

  // BlogPosting schema — for AI citation + rich result eligibility
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author ?? "Ansar Mahmood",
      url: site.url,
    },
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags?.join(", "),
    image: post.image ? `${site.url}${post.image}` : `${site.url}/images/ansar-10.jpeg`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blog/${post.slug}/`,
    },
    publisher: {
      "@type": "Person",
      name: "Ansar Mahmood",
      url: site.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ═══ ARTICLE HEADER ═══════════════════════════════════ */}
      <article className="bg-[var(--surface)]">
        <Container size="narrow">
          <div className="pt-12 md:pt-16 pb-10">
            <nav className="inline-flex items-center gap-1.5 text-[0.8rem] text-[var(--text-muted)] mb-10">
              <Link href="/" className="hover:text-[var(--text)] transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <Link href="/blog/" className="hover:text-[var(--text)] transition-colors">
                Insights
              </Link>
              <ChevronRight size={12} />
              <span className="text-[var(--text)] font-medium truncate">
                {post.title}
              </span>
            </nav>

            {/* Eyebrow meta line */}
            <div className="flex flex-wrap items-center gap-3 eyebrow text-[var(--text-muted)] mb-6">
              {post.date && <span>{formatDate(post.date)}</span>}
              <span className="h-px w-4 bg-[var(--gray-300)]" />
              <span className="inline-flex items-center gap-1.5">
                <Clock size={11} strokeWidth={2} />
                {post.readTime}
              </span>
              {post.tags && post.tags.length > 0 && (
                <>
                  <span className="h-px w-4 bg-[var(--gray-300)]" />
                  <span className="inline-flex gap-2 flex-wrap">
                    {post.tags.map((t) => (
                      <span key={t} className="text-[var(--brand)]">{t}</span>
                    ))}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display font-normal text-[2.2rem] md:text-[3rem] lg:text-[3.4rem] leading-[1.04] tracking-[-0.035em] text-[var(--text)] mb-6 max-w-[22ch]">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-[1.15rem] md:text-[1.25rem] text-[var(--text-muted)] leading-[1.55] font-light max-w-[58ch]">
              {post.excerpt}
            </p>

            {/* Author strip */}
            <div className="mt-10 pt-6 border-t border-[var(--gray-200)] flex items-center gap-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-[var(--gray-100)] shrink-0">
                <Image
                  src="/images/ansar-10.jpeg"
                  alt="Ansar Mahmood"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-[var(--text)] font-medium text-[0.95rem]">
                  {post.author ?? "Ansar Mahmood"}
                </div>
                <div className="text-[0.78rem] text-[var(--text-muted)]">
                  Senior HSE Consultant · AI Specialist
                </div>
              </div>
            </div>
          </div>

          {/* Lead image */}
          {post.image && (
            <figure className="relative aspect-[16/9] md:aspect-[16/8] overflow-hidden rounded-[2px] mb-14">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 768px"
                priority
                className="object-cover"
              />
            </figure>
          )}

          {/* MDX body */}
          <div className="pb-16 md:pb-20">
            <MDXRemote source={post.body} components={mdxComponents} />
          </div>

          {/* Share + newsletter footer */}
          <footer className="pb-20 border-t border-[var(--gray-200)] pt-12">
            <div className="flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <span className="eyebrow text-[var(--text-muted)]">Share</span>
                <a
                  href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${site.url}/blog/${post.slug}/`)}`}
                  className="inline-flex items-center gap-2 text-[0.88rem] text-[var(--text)] hover:text-[var(--brand)] transition-colors"
                >
                  <Mail size={14} />
                  Email
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${site.url}/blog/${post.slug}/`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.88rem] text-[var(--text)] hover:text-[var(--brand)] transition-colors"
                >
                  <Share2 size={14} />
                  LinkedIn
                </a>
              </div>
              <Button asChild variant="gold" size="sm">
                <Link href="/book-consultation/">
                  <CalendarCheck size={14} />
                  Book a 30-min call
                </Link>
              </Button>
            </div>
          </footer>
        </Container>

        {/* Related */}
        {related.length > 0 && (
          <section className="bg-[var(--surface-alt)] py-20">
            <Container>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <div className="eyebrow mb-3">§ More essays</div>
                  <h2 className="font-display text-[1.7rem] md:text-[2.1rem] leading-[1.1] tracking-[-0.03em]">
                    Continue reading
                  </h2>
                </div>
                <Link
                  href="/blog/"
                  className="inline-flex items-center gap-1.5 text-[var(--text)] hover:text-[var(--brand-dark)] text-sm font-semibold transition-colors"
                >
                  All essays
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}/`}
                    className="group block border-t border-[var(--gray-200)] pt-8 pb-6 transition-all hover:border-[var(--brand)]"
                  >
                    <div className="eyebrow mb-3 text-[var(--text-muted)]">
                      {formatDate(p.date)} · {p.readTime}
                    </div>
                    <h3 className="font-display text-[1.25rem] md:text-[1.35rem] leading-[1.15] tracking-[-0.015em] mb-3 group-hover:text-[var(--brand-dark)] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-[0.9rem] text-[var(--text-muted)] leading-[1.6] max-w-[40ch]">
                      {p.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Back to index */}
        <div className="py-16 bg-[var(--page)]">
          <Container size="narrow">
            <Link
              href="/blog/"
              className="group inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors text-sm"
            >
              <ArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Back to all essays
            </Link>
          </Container>
        </div>
      </article>
    </>
  );
}
