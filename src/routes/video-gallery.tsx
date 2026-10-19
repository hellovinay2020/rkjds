import { useEffect } from "react";
import { Play } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
import { useGallery } from "@/data/gallery";

export default function VideoGalleryPage() {
    const { items, loading } = useGallery();
    const videos = items.filter((item) => item.type === "video");

    useEffect(() => {
        document.title = "Video Gallery — Mahila Chetna Samiti";
    }, []);

    return (
        <div className="bg-background text-text font-sans">
            <SiteHeader />
            <PageHero
                title="Video Gallery"
                description="Watch moments from our programs, events and community initiatives."
                image={heroBg}
                crumbs={[{ label: "Home", to: "/" }, { label: "Video Gallery" }]}
            />

            <section className="py-16">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                    {loading && <p className="text-center text-text-2">Loading videos...</p>}
                    {!loading && videos.length === 0 && (
                        <div className="py-12 text-center">
                            <Play className="mx-auto h-10 w-10 text-orange" />
                            <p className="mt-4 text-text-2">No videos available yet.</p>
                        </div>
                    )}
                    {!loading && videos.length > 0 && (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {videos.map((video) => (
                                <article key={video._id || video.slug} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                                    <video
                                        controls
                                        preload="metadata"
                                        poster={video.thumbnail || undefined}
                                        className="aspect-video w-full bg-black object-cover"
                                    >
                                        <source src={video.mediaUrl} />
                                        Your browser does not support video playback.
                                    </video>
                                    {video.title && <h2 className="px-4 py-4 text-base font-semibold text-navy">{video.title}</h2>}
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <SiteFooter />
        </div>
    );
}