import BenefitTabsSection from "@/components/BenefitTabsSection";
import FAQSection from "@/components/FAQSection";
import HomeHeroSection from "@/components/HomeHeroSection";
import HowItWorks from "@/components/HowItWorks";
import LoanCalculator from "@/components/LoanCalculator";
import StatsHistory from "@/components/StatsHistory";
import TestimonialSection from "@/components/TestimonialSection";

export default function Home() {
  return (
    <section>
      <HomeHeroSection />
      <StatsHistory />
      <HowItWorks />
      <BenefitTabsSection />
      <LoanCalculator />
      <TestimonialSection />
      <FAQSection faqData={faqData} />
    </section>
  );
}
