import { getDb } from "@/lib/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const runtime = "edge";
export const revalidate = 60; // Cache on edge for 1 minute

const defaultPosts = [
  {
    slug: "future-precision-medicine",
    title: "The Future of Precision Medicine in 2026",
    category: "Medical Innovation",
    date: "July 12, 2026",
    author: "Dr. Sarah Khalil",
    authorImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
    excerpt: "How genomic sequencing is revolutionizing oncology and cardiology.",
    content: `
      <p>Precision medicine is transforming the global healthcare landscape. By integrating genomic profiles, environmental inputs, and lifestyle factors, physicians can now tailormake treatments that maximize efficacy while reducing adverse side effects.</p>
      
      <h3>The Role of Genomics in Cancer Coordinates</h3>
      <p>Historically, oncology followed a one-size-fits-all protocol. Today, molecular profiling of tumors allows oncologists at partner facilities in India to select targeted immunotherapies. For instance, breast cancer cases showing HER2 overexpression respond exceptionally well to specific monoclonal antibodies, avoiding broad-spectrum chemotherapy toxicity.</p>

      <h3>Cardiology and Inherited Heart Conditions</h3>
      <p>Similarly, precision cardiology uses genetic risk screening to identify patients vulnerable to sudden cardiac death or hypertrophic cardiomyopathy. Early genetic screening allows care coordinators to arrange prophylactic treatments before critical symptoms develop.</p>

      <h3>Navigating Care coordinates in India</h3>
      <p>Shifa Global Care works directly with leading JCI hospitals providing genomic medicine wings. Patients from Bangladesh and other regional hubs can request molecular pathology audits as part of their initial evaluation, establishing a personalized plan before boarding their flights.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    tags: "Oncology,Genomics,India",
  },
  {
    slug: "navigating-international-healthcare",
    title: "Navigating International Healthcare Systems",
    category: "Patient Guide",
    date: "June 28, 2026",
    author: "Dr. Elena Rossi",
    authorImage:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=100&q=80",
    excerpt: "A comprehensive handbook for patients seeking treatment in JCI facilities.",
    content: `
      <p>Traveling abroad for medical care can be daunting. Navigating unfamiliar hospital policies, visa requirements, and accommodation logistics requires coordination and careful preparation.</p>

      <h3>Choosing the Right Accredited Institution</h3>
      <p>Safety is the primary metric. We restrict our network to JCI (Joint Commission International) accredited facilities. JCI accreditation ensures strict adherence to clinical standards, safety indicators, and administrative coordinates comparable to Western institutions.</p>

      <h3>Step-by-Step Preparations</h3>
      <ul>
        <li><strong>Step 1: Clinical Evaluation:</strong> Secure a second opinion and detailed cost brief from the operating hospital.</li>
        <li><strong>Step 2: Medical Visa (MED):</strong> Never travel on a standard tourist visa for surgery. Embassy regulations require an official hospital invitation letter.</li>
        <li><strong>Step 3: Care Attendants:</strong> Ensure your companion visa paperwork is submitted concurrently.</li>
      </ul>

      <p>By delegating travel logistics to a trusted facilitator like Shifa Global Care, families can bypass administrative bottlenecks and focus entirely on patient recovery.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1504813184591-01592f259ff2?auto=format&fit=crop&w=800&q=80",
    tags: "Travel,Guides,JCI",
  },
];

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  let post: any = null;

  try {
    const db = getDb();
    const results = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (results.length > 0) {
      post = results[0];
    }
  } catch (error) {
    console.error("Failed to query D1 for blog details:", error);
  }

  // Fallback to core mock posts
  if (!post) {
    post = defaultPosts.find((p) => p.slug === slug);
  }

  if (!post) {
    notFound();
  }

  const tagsList = post.tags ? post.tags.split(",") : [];

  return (
    <article className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="mx-auto max-w-3xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        {/* Featured Image */}
        <div className="relative aspect-video bg-slate-100">
          <Image
            src={post.image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Details */}
        <div className="p-8 md:p-12 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-2xs text-slate-400">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : post.date}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight sm:text-4xl">
            {post.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-3 py-4 border-y border-slate-100">
            <div className="relative size-10 rounded-full bg-slate-200 overflow-hidden">
              <Image
                src={
                  post.authorImage ||
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                }
                alt={post.author || "Sarah Khalil"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{post.author || "Dr. Sarah Khalil"}</p>
              <p className="text-[10px] text-slate-400">Shifa Global Care Consultant</p>
            </div>
          </div>

          {/* Body Content */}
          <div
            className="prose prose-teal prose-sm max-w-none text-slate-600 leading-relaxed space-y-6 text-xs md:text-sm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {tagsList.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
              {tagsList.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-slate-100 text-slate-600 text-3xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Return footer */}
          <div className="pt-6 border-t border-slate-100">
            <Link
              href="/blog"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1.5"
            >
              ← Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
