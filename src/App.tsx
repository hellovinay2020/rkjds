import { Routes, Route, Link, Navigate } from "react-router-dom";
import ScrollReveal from "./components/ScrollReveal";
import Preloader from "./components/Preloader";

import HomePage from "./routes/index";
import AboutPage from "./routes/about";
import CausesPage from "./routes/causes";
import CauseDetailPage from "./routes/causes_.$slug";
import ContactPage from "./routes/contact";
import CrowdFundingPage from "./routes/crowd-funding";
import DocumentsPage from "./routes/documents";
import DonatePage from "./routes/donate";
import EventsPage from "./routes/events";
import EventDetailPage from "./routes/events_.$slug";
import FounderPage from "./routes/founder";
import GalleryPage from "./routes/gallery";
import MediaCoveragePage from "./routes/media-coverage";
import VideoGalleryPage from "./routes/video-gallery";
import MissionVisionPage from "./routes/mission-vision";
import FinancialHelpPage from "./routes/financial-help";
import PrivacyPage from "./routes/privacy";
import ProgramsPage from "./routes/programs";
import ProjectsPage from "./routes/projects";
import ProjectDetailPage from "./routes/projects_.$slug";
import RefundPage from "./routes/refund";
import SuccessStoriesPage from "./routes/success-stories";
import SuccessStoryDetailPage from "./routes/success-stories_.$slug";
import TeamPage from "./routes/team";
import TermsPage from "./routes/terms";
import BlogsIndexPage from "./routes/blogs.index";
import BlogDetailPage from "./routes/blogs.$slug";

// RK MINISTRIES Core Features & Portals
import ChairmanDashboardPage from "./routes/chairman";
import ManagerDashboardPage from "./routes/manager";
import FieldWorkerPortalPage from "./routes/field-worker";
import MemberPortalPage from "./routes/member-portal";
import MemberRegistrationPage from "./routes/member-registration";
import MembershipIdCardPage from "./routes/id-card";
import BaptismApplicationPage from "./routes/baptism-application";
import BaptismVerifyPage from "./routes/baptism-verify";
import BaptismCertificatePage from "./routes/baptism-certificate";
import PrayerRequestPage from "./routes/prayer-request";
import TestimonyPage from "./routes/testimony";
import HolyBiblePage from "./routes/bible";
import ReportsPage from "./routes/reports";
import LocalDataBackupPage from "./routes/local-backup";
import MobileSoftwarePage from "./routes/mobile-app";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Preloader autoDismiss={true} minDuration={700} />
      <ScrollReveal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/causes" element={<CausesPage />} />
        <Route path="/causes/:slug" element={<CauseDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/crowd-funding" element={<Navigate to="/campaigns" replace />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:slug" element={<EventDetailPage />} />
        <Route path="/founder" element={<FounderPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/video-gallery" element={<VideoGalleryPage />} />
        <Route path="/media-coverage" element={<MediaCoveragePage />} />
        <Route path="/mission-vision" element={<MissionVisionPage />} />
        <Route path="/financial-help" element={<FinancialHelpPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/projects" element={<CrowdFundingPage />} />
        <Route path="/projects/:slug" element={<Navigate to="/campaigns/:slug" replace />} />
        <Route path="/campaigns" element={<ProjectsPage />} />
        <Route path="/campaigns/:slug" element={<ProjectDetailPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/success-stories/:slug" element={<SuccessStoryDetailPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/blogs" element={<BlogsIndexPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailPage />} />

        {/* RK MINISTRIES Portals & Features */}
        <Route path="/chairman" element={<ChairmanDashboardPage />} />
        <Route path="/manager" element={<ManagerDashboardPage />} />
        <Route path="/field-worker" element={<FieldWorkerPortalPage />} />
        <Route path="/retailer" element={<Navigate to="/field-worker" replace />} />
        <Route path="/member-portal" element={<MemberPortalPage />} />
        <Route path="/member-registration" element={<MemberRegistrationPage />} />
        <Route path="/mlm-register" element={<Navigate to="/member-registration" replace />} />
        <Route path="/id-card" element={<MembershipIdCardPage />} />
        <Route path="/membership-card" element={<Navigate to="/id-card" replace />} />
        <Route path="/baptism-application" element={<BaptismApplicationPage />} />
        <Route path="/baptism-verify" element={<BaptismVerifyPage />} />
        <Route path="/baptism-certificate" element={<BaptismCertificatePage />} />
        <Route path="/prayer-request" element={<PrayerRequestPage />} />
        <Route path="/prayer" element={<Navigate to="/prayer-request" replace />} />
        <Route path="/testimony" element={<TestimonyPage />} />
        <Route path="/testimonies" element={<Navigate to="/testimony" replace />} />
        <Route path="/bible" element={<HolyBiblePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/local-backup" element={<LocalDataBackupPage />} />
        <Route path="/backup" element={<Navigate to="/local-backup" replace />} />
        <Route path="/mobile-app" element={<MobileSoftwarePage />} />
        <Route path="/mobile" element={<Navigate to="/mobile-app" replace />} />

        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
