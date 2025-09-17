import BenefitTabsSection from "@/components/BenefitTabsSection";
import CardGrids from "@/components/CardGrids";
import FAQSection from "@/components/FAQSection";
import FootCTA from "@/components/FootCTA";
import HomeHeroSection from "@/components/HomeHeroSection";
import HowItWorks from "@/components/HowItWorks";
import LoanCalculator from "@/components/LoanCalculator";
import StatsHistory from "@/components/StatsHistory";
import TestimonialSection from "@/components/TestimonialSection";
import { cardBenefits, homeFAQdata } from "@/lib/data";

export default function Home() {
  return (
    <section>
      <HomeHeroSection />
      <StatsHistory />
      <HowItWorks />
      <BenefitTabsSection />
      <CardGrids cardsData={cardBenefits} colsNoMdScreen={4} />
      <LoanCalculator />
      <TestimonialSection />
      <FAQSection faqData={homeFAQdata} />
      <FootCTA />
    </section>
  );
}
