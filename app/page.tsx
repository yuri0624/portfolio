import { ActivitiesSection } from "./components/ActivitiesSection";
import { AwardsSection } from "./components/AwardsSection";
import { BeliefSection } from "./components/BeliefSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Intro } from "./components/Intro";
import { MediaSection } from "./components/MediaSection";
import { VideosSection } from "./components/VideosSection";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[#fafaf9] text-stone-900">
      <Header />
      <main className="flex-1">
        <Intro />
        <BeliefSection />
        <ActivitiesSection />
        <AwardsSection />
        <MediaSection />
        <VideosSection />
      </main>
      <Footer />
    </div>
  );
}
