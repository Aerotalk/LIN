import FAQSection from "@/components/FAQSection";
import FootCTA from "@/components/FootCTA";
import HowItWorks from "@/components/HowItWorks";
import EligibilityMandatoryGrid from "@/components/personal-insta/EligibilityMandatoryGrid";
import LoanDefine from "@/components/personal-insta/LoanDefine";
import DefineLoanTypeQA from "@/components/use-cases/DefineLoanTypeQA";
import UseCaseHero from "@/components/use-cases/UseCaseHero";
import {
  eligibilityCriteria,
  mandatoryDocuments,
  medicalLoanFAQ,
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
      <DefineLoanTypeQA
        loanType="Medical Emergency"
        loanDesc="A personal medical emergency loan is a quick, unsecured loan designed to help you cover unexpected medical expenses without any colateral. It provides immediate financial assistance to pay for hospital bills, doctor consultations, diagnostic tests, surgeries, medications, or any other urgent healthcare costs. This type of loan is ideal when you need instant short-term funds and don't want to wait for your payday."
      />
      <HowItWorks />
      <EligibilityMandatoryGrid
        spanTitle={eligibilityCriteria.spanTitle}
        title={eligibilityCriteria.title}
        titleColoured={eligibilityCriteria.titleColoured}
        desc={eligibilityCriteria.desc}
        elimangridData={eligibilityCriteria.criteria}
      />
      <EligibilityMandatoryGrid
        spanTitle={mandatoryDocuments.spanTitle}
        title={mandatoryDocuments.title}
        titleColoured={mandatoryDocuments.titleColoured}
        desc={mandatoryDocuments.desc}
        elimangridData={mandatoryDocuments.criteria}
      />
      <FootCTA />
      <FAQSection faqData={medicalLoanFAQ} />
    </>
  );
}
