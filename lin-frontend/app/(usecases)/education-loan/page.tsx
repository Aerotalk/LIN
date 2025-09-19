import FAQSection from "@/components/FAQSection";
import FootCTA from "@/components/FootCTA";
import HowItWorks from "@/components/HowItWorks";
import EligibilityMandatoryGrid from "@/components/personal-insta/EligibilityMandatoryGrid";
import LoanDefine from "@/components/personal-insta/LoanDefine";
import DefineLoanTypeQA from "@/components/use-cases/DefineLoanTypeQA";
import UseCaseHero from "@/components/use-cases/UseCaseHero";
import {
  educationLoanFAQ,
  eligibilityCriteria,
  mandatoryDocuments,
} from "@/lib/data";

export default function EducationLoan() {
  return (
    <>
      <UseCaseHero
        loanType="Education"
        loanDesc={
          <>
            Whether it&apos;s a medical emergency, monthly bills, travel, or
            unexpected expenses,{" "}
            <span className="text-primary">Loan In Need</span> gives you fast,
            hassle-free personal loans. Simple online process, flexible tenures,
            and money in your account within hours.
          </>
        }
        heroImg={"/use-cases/education-hero.png"}
      />
      <LoanDefine
        heading="What is education loan?"
        description="An education loan is a type of loan specifically designed to help students cover the costs of their education, including tuition fees, books, and living expenses. These loans often come with lower interest rates and flexible repayment options."
      />
      <DefineLoanTypeQA
        loanType="education purpose"
        loanDesc="A short-term education loan is a type of personal loan designed to cover immediate or upcoming educational expenses without any secured collateral. It helps parents or guardians manage school or college fees, coaching classes, online programs, or study materials, ensuring their child's learning continues smoothly without financial burdens."
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
      <FAQSection faqData={educationLoanFAQ} />
    </>
  );
}
