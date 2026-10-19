import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Clock, MapPin, Upload, X, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export type ApplyContext = {
  title: string;
  type?: string;
  location?: string;
  badge?: string; // e.g. "Apply Now" / "Volunteer Application"
};

interface ApplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context: ApplyContext | null;
}

export default function ApplyDialog({ open, onOpenChange, context }: ApplyDialogProps) {
  const [fileName, setFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const resume = data.get("resume") as File | null;
    if (!name || !email || !phone) { toast.error("Please fill all required fields"); return; }
    if (!resume || resume.size === 0) { toast.error("Please upload your resume"); return; }
    if (resume.size > 5 * 1024 * 1024) { toast.error("Resume must be under 5MB"); return; }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Application submitted! We'll get back to you soon.");
      onOpenChange(false);
      setFileName("");
      form.reset();
    }, 900);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) { setFileName(""); } onOpenChange(o); }}>
      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-lg p-0 overflow-hidden border-0 rounded-[20px] [&>button]:bg-white/15 [&>button]:text-white [&>button]:rounded-full [&>button]:p-1.5 [&>button]:opacity-100 [&>button:hover]:bg-white/25">
        <div className="bg-gradient-to-br from-navy to-navy-2 text-white p-5 sm:p-6 relative">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange/30 blur-3xl rounded-full" />
          <span className="inline-block px-3 py-1 rounded-full bg-orange text-white text-[10px] font-bold uppercase tracking-wider">{context?.badge || "Apply Now"}</span>
          <DialogHeader className="mt-3 space-y-1 text-left">
            <DialogTitle className="text-white font-display text-[18px] sm:text-[22px] leading-tight pr-8">{context?.title}</DialogTitle>
            {(context?.type || context?.location) && (
              <DialogDescription className="text-white/70 text-[12px] sm:text-[13px] flex flex-wrap gap-3">
                {context?.type && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {context.type}</span>}
                {context?.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {context.location}</span>}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 bg-white">
          <div>
            <label className="text-[12px] font-semibold text-navy uppercase tracking-wider">Full Name *</label>
            <input name="name" required maxLength={100} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-[14px] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="Your full name" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="min-w-0">
              <label className="text-[12px] font-semibold text-navy uppercase tracking-wider">Email *</label>
              <input type="email" name="email" required maxLength={120} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-[14px] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="you@email.com" />
            </div>
            <div className="min-w-0">
              <label className="text-[12px] font-semibold text-navy uppercase tracking-wider">Phone *</label>
              <input type="tel" name="phone" required maxLength={15} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-[14px] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="+91 ..." />
            </div>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-navy uppercase tracking-wider">City / Location</label>
            <input name="city" maxLength={80} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-[14px] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="Lucknow" />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-navy uppercase tracking-wider">Cover Note</label>
            <textarea name="message" rows={3} maxLength={500} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-[14px] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="Tell us briefly why you're a great fit..." />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-navy uppercase tracking-wider">Resume / CV * (PDF/DOC, max 5MB)</label>
            <label className="mt-1.5 flex items-center gap-3 w-full max-w-full rounded-xl border-2 border-dashed border-slate-300 px-3 sm:px-4 py-3 cursor-pointer hover:border-orange hover:bg-orange/5 transition overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-orange/10 text-orange flex items-center justify-center shrink-0">
                {fileName ? <CheckCircle2 className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-navy truncate">{fileName || "Click to upload resume"}</div>
                <div className="text-[11px] text-text-2">PDF, DOC or DOCX</div>
              </div>
              {fileName && (
                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFileName(""); }} className="shrink-0 w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-text-2" />
                </button>
              )}
              <input type="file" name="resume" accept=".pdf,.doc,.docx" required className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
            </label>
          </div>
          <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 bg-orange text-white font-semibold rounded-full px-6 py-3 hover:bg-orange-2 transition disabled:opacity-60">
            {submitting ? "Submitting..." : <>Submit Application <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
