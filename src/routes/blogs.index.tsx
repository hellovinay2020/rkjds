import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, ArrowRight, User } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/herosection/NariSashaktikaran.png";
import { fetchBlogs } from "@/data/blogs";

export default function BlogsPage() {
  const [loaderData, setLoaderData] = useState<{ blogs: any[] }>({ blogs: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Blogs — Mahila Chetna Samiti ";
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const blogs = await fetchBlogs();
        setLoaderData({ blogs });
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Preloader />;

  const { blogs } = loaderData;
  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero title="Our Blogs" accent="Stories From The Field" description="Insights, updates and stories from our programs and the communities we serve." image={heroBg} crumbs={[{ label: "Home", to: "/" }, { label: "Blogs" }]} />
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="eyebrow">Latest Articles</div>
            <h2 className="section-title mt-2">Read Our Latest Stories</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <div key={b.slug} className="card-soft card-soft-hover overflow-hidden group flex flex-col justify-between">
                <div>
                  <Link to={`/blogs/${b.slug}`} className="block relative overflow-hidden">
                    <img src={b.img} alt={b.title} className="w-full h-[180px] sm:h-[210px] object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-orange text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">{b.tag}</span>
                  </Link>
                  <div className="p-6 pb-0">
                    <div className="flex items-center gap-3 text-[12px] text-text-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-orange" />{b.date}</span>
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-orange" />{b.author.name}</span>
                    </div>
                    <Link to={`/blogs/${b.slug}`}>
                      <h3 className="mt-3 text-navy font-bold text-[18px] font-display leading-snug group-hover:text-orange transition">{b.title}</h3>
                    </Link>
                    <p className="mt-2 text-text-2 text-[14px] leading-relaxed line-clamp-3">{b.excerpt}</p>
                  </div>
                </div>
                <div className="p-6 pt-4">
                  <div className="pt-3 border-t border-gray-100">
                    <Link
                      to={`/blogs/${b.slug}`}
                      className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-orange/5 hover:bg-orange text-orange hover:text-white font-semibold text-[13px] transition-all duration-300 group/btn"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
