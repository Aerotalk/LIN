import FAQSection from "@/components/FAQSection";
import FootCTA from "@/components/FootCTA";
import HowItWorks from "@/components/HowItWorks";
import LoanCalculator from "@/components/LoanCalculator";
import EligibilityMandatoryGrid from "@/components/personal-insta/EligibilityMandatoryGrid";
import LoanDefine from "@/components/personal-insta/LoanDefine";
import UseCaseHero from "@/components/use-cases/UseCaseHero";
import {
  eligibilityCriteria,
  mandatoryDocuments,
  personalLoanFAQdata,
} from "@/lib/data";

export default function MedicalEmergencyLoan() {
  return (
    <>
      <UseCaseHero
        loanType="Medical Emergency"
        loanDesc={
          <>
            Whether it&apos;s a medical emergency, monthly bills, travel, or
            unexpected expenses,{" "}
            <span className="text-primary">Loan In Need</span> gives you fast,
            hassle-free personal loans. Simple online process, flexible tenures,
            and money in your account within hours.
          </>
        }
        heroImg="/benefits-tab/medical-emergency-loan-doctor-tab-min.png"
      />
      <LoanDefine
        heading="What is medical emergency loan?"
        description="A medical emergency loan is a type of personal loan specifically designed to cover unexpected medical expenses, such as hospital bills, surgeries, or other healthcare costs. These loans often come with quick approval processes and flexible repayment options."
      />
      <HowItWorks />
      <EligibilityMandatoryGrid
        spanTitle={eligibilityCriteria.spanTitle}
        title={eligibilityCriteria.title}
        titleColoured={eligibilityCriteria.titleColoured}
        desc={eligibilityCriteria.desc}
        elimangridData={eligibilityCriteria.criteria}
      />
      <LoanCalculator />
      <EligibilityMandatoryGrid
        spanTitle={mandatoryDocuments.spanTitle}
        title={mandatoryDocuments.title}
        titleColoured={mandatoryDocuments.titleColoured}
        desc={mandatoryDocuments.desc}
        elimangridData={mandatoryDocuments.criteria}
      />
      <FootCTA />
      <FAQSection faqData={personalLoanFAQdata} />
    </>
  );
}
