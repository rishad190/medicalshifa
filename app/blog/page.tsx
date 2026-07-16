"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  authorImage: string;
  excerpt: string;
  image: string;
}

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dbPosts, setDbPosts] = useState<any[]>([]);

  const categories = [
    "All",
    "Medical Innovation",
    "Patient Guide",
    "Global Network",
  ];

  const posts: BlogPost[] = [
    {
      slug: "future-precision-medicine",
      title: "The Future of Precision Medicine in 2026",
      category: "Medical Innovation",
      date: "July 12, 2026",
      author: "Dr. Sarah Khalil",
      authorImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBzQL-tqoi4mBI4rAj-vnlNIljOiw2PZRLb5hUxqSfsI0elcXXJiqk2IJlFw8vt6tw1MLr_TCP9pZC4CMTAZ0S4wbZooZvksKcFBNLok_ndGfWUbo5eROBFoiAujUv5bRmZTqpHmgCeOFVpW53IP-rGf4Vx-fJ6c4EcBdTgGqP0a3agXDmCZBzRI-tvjZOtHqCVmmDEg2AOtZCUUamX55TFgrGF0f52avx1tlTxH3USRVfZXv04r8E0IBx0dOAgUFjOZ7OSmIwJTFg",
      excerpt:
        "How genomic sequencing is revolutionizing personalized treatment plans for complex oncology and cardiology cases globally.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "navigating-international-healthcare",
      title: "Navigating International Healthcare Systems",
      category: "Patient Guide",
      date: "June 28, 2026",
      author: "Dr. Elena Rossi",
      authorImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDpGQKjQRlIUuAhUeL_ErrdJywQnOJAVvr_97itJGV-6f1dBnGZQdmohbRPvkshu4pOWAHQYZ7vsAWKoVWNuKvoicsoftVE3WdZU-9CAzBqwZdDuhBRrVSTsfpTt6Qh8PoTvFlJg8b7_EFUTua5U2ZiAYF1bTUCu0jNAw-_LiEXuhCEFSvLZuwkB0Kvu5aDViRaGzQMHQxzQ7cm4UslSIueco9nEvVwVnVv70TN_438gGZidBNSAQmIsa80J_yyVJNu0ufCQlzvK7k",
      excerpt:
        "A comprehensive handbook for patients seeking specialized treatment across international borders and JCI facilities.",
      image:
        "https://images.unsplash.com/photo-1504813184591-01592f259ff2?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "top-cardiology-centers",
      title: "Top 5 Specialized Centers for Cardiology",
      category: "Global Network",
      date: "May 15, 2026",
      author: "Dr. Julian Vance",
      authorImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAvErAvuWjkgK2xsRY0M5Ki5BZCdziCJZvndnbsFCFx-IEB_X4s1F_9y3GBQQ26-jEv7VPBFtzgIuxQteVgbrTKRz962sJV5Y8T4E6MQnHHg7B9gjYkf1TXrMAb37ZoFjDv4KxgshQQRlVNUjuEDvm6qu6nYDXnSRTNJsXwAQzykNa2ZDdz2Tmg52iYP6iaWoRyYS06SpsnYwm0duVVTrFBKnDc3w4XYGwfaPWQFw-whQvZcMXPSAJUCKFigF8q6CJlZpXkT3i9n_M",
      excerpt:
        "An inside look at the world's leading medical institutions and hospital pathways for advanced cardiac care.",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "understanding-medical-visas",
      title: "Understanding Medical Visas & Global Travel",
      category: "Patient Guide",
      date: "April 3, 2026",
      author: "Sarah Al-Fayez",
      authorImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDj15iel4u7hhT8qPvpcL_GgJzIU7hWg6jf_YoRJ5NVFYgx6opJIv76CL5Ymke99jSGT62uuR4rr0X8SVL956DhGM5MQGvSD1d3_M-WIftfqGdby0COMKV2J0fbf-PpW7WX_oUrV74GPfT9o-HP_sIagJ82Bt0JWSBXW5z0v2Cp4QYRL6r8BFEquNCy1eWVCUDpyCufbp6IvQ7YD7_N-wyZPQ8WrmepyPf573Ei3qXpnYEnQZEYLHpFPYccBZmRH2YnlECK15mcYkQ",
      excerpt:
        "An operational guide to medical travel logistics, fast-tracking visas, and coordination details for families.",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    },
  ];

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("/api/admin/content?type=Blog Post");
        if (res.ok) {
          const data = (await res.json()) as any[];
          const publicPosts = data.filter(
            (p: any) => p.visibility === "Public"
          );
          setDbPosts(publicPosts);
        }
      } catch (e) {
        console.error("Failed to fetch posts", e);
      }
    }
    loadPosts();
  }, []);

  const displayPosts =
    dbPosts.length > 0
      ? [
          ...dbPosts.map((p) => ({
            slug: p.slug,
            title: p.title,
            category: p.category,
            date: new Date(p.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            author: p.author,
            authorImage: p.authorImage,
            excerpt: p.excerpt,
            image:
              p.image ||
              "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
          })),
          ...posts,
        ]
      : posts;

  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -40px 0px",
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".reveal")
      .forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  const filteredPosts = displayPosts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Hero Header */}
      <section className="mx-auto max-w-360 px-6 md:px-12 lg:px-grid-margin-desktop py-16 relative z-10 animate-fade-in">
        <div className="max-w-3xl">
          <span className="text-primary font-label-sm tracking-widest block mb-4 uppercase">
            Shifa Insights
          </span>
          <h1 className="font-headline-xl text-headline-xl mb-6 text-on-surface leading-tight">
            Latest Insights &amp; Medical Trends
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Expert perspectives on global healthcare, patient advocacy, medical
            innovations, and cross-border recovery pathways.
          </p>
        </div>
      </section>

      {/* Search & Category Filter Section */}
      <section className="mx-auto max-w-360 px-6 md:px-12 lg:px-grid-margin-desktop mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
          {/* Categories Tab */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-white hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-xs group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="bg-white border border-outline-variant/30 rounded-xl py-3 pl-12 pr-4 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="mx-auto max-w-360 px-6 md:px-12 lg:px-grid-margin-desktop mb-24 relative z-10">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post, idx) => (
              <article
                key={post.slug}
                className="group bg-white rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between reveal"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block relative aspect-video overflow-hidden"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>
                  <div className="p-8">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
                      {post.category}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-4">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-on-surface-variant text-sm line-clamp-3 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-8 pb-8 pt-4 border-t border-outline-variant/10 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden relative">
                      <Image
                        src={post.authorImage}
                        alt={post.author}
                        fill
                        className="object-cover"
                        sizes="36px"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface">
                        {post.author}
                      </p>
                      <p className="text-3xs text-on-surface-variant uppercase tracking-wider">
                        {post.date}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    <span>Read Article</span>
                    <span className="material-symbols-outlined text-base">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/20 rounded-2xl border border-dashed border-outline-variant/30">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">
              find_in_page
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
              No articles found
            </h3>
            <p className="text-on-surface-variant max-w-xs mx-auto text-sm">
              We couldn&apos;t find any articles matching &ldquo;{searchQuery}
              &rdquo;. Try another term.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
