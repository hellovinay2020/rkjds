import { Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, User, ArrowRight, ArrowLeft, Tag, Share2, Facebook, Twitter, Instagram, Linkedin, Clock, MessageCircle, Eye, Heart, Bookmark, Quote, CheckCircle2, Mail, ChevronRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Preloader from "@/components/Preloader";
import { fetchBlogs, getBlogBySlug } from "@/data/blogs";

export default function BlogDetailPage() {
  const [loaderData, setLoaderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        const blogs = await fetchBlogs();
        const blog = getBlogBySlug(slug, blogs);
        if (!blog) { setNotFound(true); setLoading(false); return; }
        setLoaderData({ blog, blogs });
        document.title = `${blog.title} — MCS Blog`;
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return <Preloader />;
  if (!slug) return <Navigate to="/" replace />;
  if (notFound || !loaderData) return <Navigate to="/not-found" replace />;

  const { blog, blogs } = loaderData;
  const related = blogs.filter((b) => b.slug !== blog.slug).slice(0, 3);
  const readTime = Math.max(3, Math.round(blog.content.join(" ").split(" ").length / 200));
  const categories = Array.from(new Set<string>(blogs.map((b: any) => b.tag)));

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <section className="relative bg-navy text-white overflow-hidden">
        <img src={blog.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/85 to-transparent" />
        <div className="relative max-w-[1180px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <nav className="no-reveal flex items-center gap-1.5 text-[13px] text-white/70 mb-3 animate-fade-down flex-wrap" style={{ animationDelay: ".05s" }}>
            {[{ label: "Home", to: "/" }, { label: "Blogs", to: "/blogs" }, { label: blog.title }].map((c, i, arr) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.to ? <Link to={c.to} className="hover:text-orange transition">{c.label}</Link> : <span className="text-white">{c.label}</span>}
                {i < arr.length - 1 && <ChevronRight className="w-3.5 h-3.5" />}
              </span>
            ))}
          </nav>
          <h1 className="no-reveal font-display font-extrabold text-[34px] sm:text-[44px] md:text-[54px] leading-[1.05] animate-fade-up" style={{ animationDelay: ".1s" }}>{blog.title}</h1>
        </div>
      </section>

      <section className="py-16 -mt-10 relative z-10">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_340px] gap-10">
          <article>
            <div className="rounded-[24px] overflow-hidden shadow-soft border border-slate-100">
              <img src={blog.img} alt={blog.title} className="w-full h-[300px] sm:h-[460px] object-cover" />
            </div>
            <div className="mt-10">
              <h2 className="font-display font-bold text-navy text-[24px] sm:text-[28px] leading-snug">{blog.title}</h2>
              <p className="mt-3 text-[16px] text-text-2 leading-relaxed">{blog.excerpt}</p>
              <p className="text-[20px] sm:text-[22px] leading-[1.55] text-navy font-display font-semibold border-l-4 border-orange pl-5 mt-8">{blog.content[0]}</p>
              <div className="mt-8 space-y-6 text-[17px] text-text-2 leading-[1.85]">
                {blog.content.slice(1).map((p: string, i: number) => (<p key={i}>{p}</p>))}
              </div>
              <figure className="my-10 relative bg-orange/5 border-l-4 border-orange rounded-r-2xl p-7">
                <Quote className="w-10 h-10 text-orange/40 absolute top-4 right-5" />
                <blockquote className="text-[18px] sm:text-[20px] font-display font-semibold text-navy italic leading-snug">"When a woman earns her first rupee, the conversation at home changes forever — and so does the future of her family."</blockquote>
                <figcaption className="mt-3 text-[13px] font-semibold text-orange uppercase tracking-wider">— {blog.author.name}</figcaption>
              </figure>
              {blog.highlights && (
                <div className="mt-10 rounded-2xl p-7 bg-gradient-to-br from-navy to-[#0a1830] text-white shadow-soft">
                  <div className="eyebrow text-orange">Impact at a glance</div>
                  <h3 className="font-display font-bold text-[22px] mt-2">Key Highlights</h3>
                  <ul className="mt-5 grid sm:grid-cols-2 gap-3">
                    {blog.highlights.map((h: string) => (
                      <li key={h} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                        <CheckCircle2 className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                        <span className="text-[15px]">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {blog.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
                  <span className="text-[13px] font-semibold text-navy">Tags:</span>
                  {blog.tags.map((t) => (
                    <span key={t} className="text-[12px] px-3 py-1.5 rounded-full bg-slate-100 text-text hover:bg-orange hover:text-white cursor-pointer transition">#{t}</span>
                  ))}
                </div>
              )}
              <div className="mt-10 card-soft p-6 flex gap-5 items-start">
                {blog.author.photo ? (
                  <img src={blog.author.photo} alt={blog.author.name} className="w-20 h-20 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-orange grid place-items-center text-white font-bold text-[22px] font-display flex-shrink-0">
                    {blog.author.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                )}
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-orange font-bold">Written by</div>
                  <div className="font-display font-bold text-navy text-[20px]">{blog.author.name}</div>
                  <p className="text-text-2 text-[14px] mt-2 leading-relaxed">{blog.author.bio || "Part of the Mahila Chetna Samiti  field team — documenting stories of change from villages across Uttar Pradesh and beyond."}</p>
                  <div className="flex gap-2 mt-3">
                    {blog.author.socialLinks.facebook && <a href={blog.author.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-navy/5 text-navy grid place-items-center hover:bg-orange hover:text-white transition"><Facebook className="w-3.5 h-3.5" /></a>}
                    {blog.author.socialLinks.twitter && <a href={blog.author.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-navy/5 text-navy grid place-items-center hover:bg-orange hover:text-white transition"><Twitter className="w-3.5 h-3.5" /></a>}
                    {blog.author.socialLinks.instagram && <a href={blog.author.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-navy/5 text-navy grid place-items-center hover:bg-orange hover:text-white transition"><Instagram className="w-3.5 h-3.5" /></a>}
                    {blog.author.socialLinks.linkedin && <a href={blog.author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-navy/5 text-navy grid place-items-center hover:bg-orange hover:text-white transition"><Linkedin className="w-3.5 h-3.5" /></a>}
                    {!blog.author.socialLinks.facebook && !blog.author.socialLinks.twitter && !blog.author.socialLinks.instagram && !blog.author.socialLinks.linkedin && (
                      <span className="text-[12px] text-text-2 italic">No social links</span>
                    )}
                  </div>
                </div>
              </div>
              {blog.galleryImages.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-display font-bold text-navy text-[22px]">Gallery</h3>
                  {blog.galleryNote && <p className="text-text-2 text-[14px] mt-1">{blog.galleryNote}</p>}
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {blog.galleryImages.map((url, i) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden group">
                        <img src={url} alt={`${blog.title} gallery ${i + 1}`} className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition duration-500" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {blog.medicalSupportPdf && (
                <div className="mt-6">
                  <a href={blog.medicalSupportPdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-navy text-white px-5 py-3 rounded-xl text-[14px] font-semibold hover:bg-orange transition shadow-soft">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Download Medical Support PDF
                  </a>
                </div>
              )}
              {blog.keypoints.items.length > 0 && (
                <div className="mt-10 rounded-2xl p-7 bg-gradient-to-br from-navy to-[#0a1830] text-white shadow-soft">
                  <h3 className="font-display font-bold text-[22px]">{blog.keypoints.sectionTitle || "Key Points"}</h3>
                  <ul className="mt-5 space-y-3">
                    {blog.keypoints.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                        <span className="w-6 h-6 rounded-full bg-orange text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-[15px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {blog.cards.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-display font-bold text-navy text-[22px]">Related Resources</h3>
                  <div className="mt-4 grid sm:grid-cols-2 gap-4">
                    {blog.cards.map((c, i) => (
                      <a key={i} href={c.link || "#"} className="card-soft overflow-hidden group hover:border-orange border border-transparent transition">
                        {c.image && <img src={c.image} alt={c.title} className="w-full h-36 object-cover" />}
                        <div className="p-5">
                          <h4 className="font-display font-bold text-navy text-[16px] group-hover:text-orange transition">{c.title}</h4>
                          {c.description && <p className="text-text-2 text-[13px] mt-1 leading-relaxed">{c.description}</p>}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                <Link to="/blogs" className="card-soft p-5 hover:border-orange border border-transparent transition group">
                  <div className="text-[12px] text-text-2 flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Previous</div>
                  <div className="font-display font-bold text-navy mt-1 group-hover:text-orange line-clamp-2">All Articles</div>
                </Link>
                {related[0] && (
                  <Link to={`/blogs/${related[0].slug}`} className="card-soft p-5 hover:border-orange border border-transparent transition group sm:text-right">
                    <div className="text-[12px] text-text-2 flex items-center gap-1 sm:justify-end">Next <ArrowRight className="w-3.5 h-3.5" /></div>
                    <div className="font-display font-bold text-navy mt-1 group-hover:text-orange line-clamp-2">{related[0].title}</div>
                  </Link>
                )}
              </div>

            </div>
          </article>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">

            <div className="card-soft p-6">
              <h3 className="font-display font-bold text-navy text-[18px]">Categories</h3>
              <ul className="mt-3 space-y-2">
                {categories.map((t) => (
                  <li key={t} className="flex items-center justify-between text-[14px] text-text-2 hover:text-orange cursor-pointer transition border-b border-slate-100 pb-2 last:border-0">
                    <span>{t}</span>
                    <span className="text-[11px] bg-orange/10 text-orange font-bold px-2 py-0.5 rounded-full">{blogs.filter(b => b.tag === t).length}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-soft p-6">
              <h3 className="font-display font-bold text-navy text-[18px]">Recent Posts</h3>
              <ul className="mt-4 space-y-4">
                {blogs.slice(0, 4).map((b) => (
                  <li key={b.slug}>
                    <Link to={`/blogs/${b.slug}`} className="flex gap-3 group">
                      <img src={b.img} alt={b.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                      <div>
                        <div className="text-[11px] text-text-2">{b.date}</div>
                        <div className="text-[13px] font-semibold text-navy leading-snug group-hover:text-orange line-clamp-2">{b.title}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
