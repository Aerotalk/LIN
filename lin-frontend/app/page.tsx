import BenefitTabsSection from "@/components/BenefitTabsSection";
import HomeHeroSection from "@/components/HomeHeroSection";
import HowItWorks from "@/components/HowItWorks";
import StatsHistory from "@/components/StatsHistory";

export default function Home() {
  return (
    <section>
      <HomeHeroSection />
      <StatsHistory />
      <HowItWorks />
      <BenefitTabsSection />
    </section>
  );
}
