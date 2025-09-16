import {
  BriefcaseMedical,
  CircleQuestionMarkIcon,
  GraduationCap,
  House,
  ScatterChartIcon,
} from "lucide-react";
import { FAQItem } from "./types";

export const benefitTabsData = [
  {
    tabName: "Medical Emergency Loan",
    value: "medical-emergency-loan",
    tabIcon: <BriefcaseMedical />,
    title:
      "Instant short term medical emergency loan - quick cash for urgent Healthcare Needs",
    description: (
      <>
        When sudden medical expenses arise, waiting for insurance claims or
        arranging money from friends can delay critical treatment.
        <br />
        <br />A short-term medical emergency loan provides immediate funds so
        you can pay hospital bills, buy medicines, or handle surgery costs
        without stress. It's the fastest way to secure financial support during
        health emergencies.
      </>
    ),
    imageUrl: "/benefits-tab/medical-emergency-loan-doctor-tab-min.png",
    link: "/apply-now",
  },
  {
    tabName: "Utility Bill Loan",
    value: "utility-bill-loan",
    tabIcon: <ScatterChartIcon />,
    title:
      "Affordable travel loans for your dream vacation - flexible plans, low interest rates",
    description: (
      <>
        Don't let finances hold you back from exploring the world. Our travel
        loans offer competitive interest rates and flexible repayment options,
        making it easier than ever to fund your next adventure.
        <br />
        <br />
        Whether it's a family vacation, honeymoon, or solo trip, we provide the
        financial support you need to make your travel dreams a reality.
      </>
    ),
    imageUrl: "/benefits-tab/medical-emergency-loan-doctor-tab-min.png",
    link: "/apply-now",
  },
  {
    tabName: "House Rent Loan",
    value: "house-rent-loan",
    tabIcon: <House />,
    title:
      "Make your special day unforgettable with our wedding loans - easy approvals, flexible terms",
    description: (
      <>
        Planning a wedding can be expensive, but our wedding loans help you
        cover costs without stress.
        <br />
        <br />
        From venue bookings to catering and decorations, we provide quick and
        easy financing options so you can focus on creating beautiful memories
        without worrying about the budget.
      </>
    ),
    imageUrl: "/benefits-tab/medical-emergency-loan-doctor-tab-min.png",
    link: "/apply-now",
  },
  {
    tabName: "Education Purpose",
    value: "education-purpose",
    tabIcon: <GraduationCap />,
    title:
      "Transform your living space with our home renovation loans - low rates, flexible repayment",
    description: (
      <>
        Whether it's a kitchen upgrade, bathroom remodel, or adding a new room,
        our home renovation loans provide the funds you need to enhance your
        home's value and comfort.
        <br />
        <br />
        With competitive interest rates and customizable repayment plans, we
        make it easy to finance your home improvement projects.
      </>
    ),
    imageUrl: "/benefits-tab/medical-emergency-loan-doctor-tab-min.png",
    link: "/apply-now",
  },
  {
    tabName: "Daily Expenses Loan",
    value: "daily-expenses-loan",
    tabIcon: <BriefcaseMedical />,
    title:
      "Simplify your finances with our debt consolidation loans - lower interest, single payment",
    description: (
      <>
        Managing multiple debts can be overwhelming. Our debt consolidation
        loans help you combine all your debts into one manageable monthly
        payment, often at a lower interest rate.
        <br />
        <br />
        This not only simplifies your finances but can also save you money in
        the long run, making it easier to achieve financial freedom.
      </>
    ),
    imageUrl: "/benefits-tab/medical-emergency-loan-doctor-tab-min.png",
    link: "/apply-now",
  },
  {
    tabName: "Debt Payment Loan",
    value: "debt-payment-loan",
    tabIcon: <CircleQuestionMarkIcon />,
    title:
      "Invest in your future with our education loans - flexible terms, low interest rates",
    description: (
      <>
        Pursuing higher education can be costly, but our education loans provide
        the financial support you need to achieve your academic goals.
        <br />
        <br />
        With competitive interest rates and flexible repayment options, we make
        it easier for you to focus on your studies without worrying about
        finances.
      </>
    ),
    imageUrl: "/benefits-tab/medical-emergency-loan-doctor-tab-min.png",
    link: "/apply-now",
  },
];

export const homeFAQdata: FAQItem[] = [
  {
    question: "How fast will my loan be approved?",
    answer:
      "Most applications are approved within 2 minutes. Once approved, the money is usually in your account within 10 minutes.",
  },
  {
    question: "Do I need a high credit score to apply?",
    answer:
      "Not at all. We focus on your current income and repayment ability rather than your past credit score.",
  },
  {
    question: "What’s the maximum loan amount I can get?",
    answer:
      "You can borrow from ₹5,000 up to ₹2,00,000, depending on your eligibility.",
  },
  {
    question: "Is collateral needed for this loan?",
    answer: "No, there’s no need to provide any security or guarantor.",
  },
  {
    question: "Can I still apply if my CIBIL score is low?",
    answer:
      "Yes, you can. Even with a score below 600, we’ll consider your application based on your present financial status.",
  },
  {
    question: "What documents are required?",
    answer:
      "Just the basics – identity proof, address proof, and income proof. No long forms or unnecessary paperwork.",
  },
  {
    question: "What interest rates do you charge?",
    answer:
      "Rates start at 24% per annum, and we keep everything transparent with no hidden fees.",
  },
  {
    question: "Can I repay the loan early?",
    answer:
      "Yes, you can close your loan anytime. Paying it off early helps reduce your interest costs.",
  },
];

export const cardBenefits = [
  {
    iconImg: <CircleQuestionMarkIcon className="h-6 w-6 text-white" />,
    title: "100% Digital Process",
    description:
      "Our loan with less paperwork approach eliminates branch visits and document hassles.",
  },
  {
    iconImg: <CircleQuestionMarkIcon className="h-6 w-6 text-white" />,
    title: "Transparent Process",
    description: "No hidden fees or charges - what you see is what you get.",
  },
  {
    iconImg: <CircleQuestionMarkIcon className="h-6 w-6 text-white" />,
    title: "Flexible Repayment",
    description:
      "Choose a repayment plan that suits your budget and lifestyle.",
  },
  {
    iconImg: <CircleQuestionMarkIcon className="h-6 w-6 text-white" />,
    title: "Secure & Confidential",
    description:
      "Your data is protected with bank-level security and confidentiality.",
  },
  {
    iconImg: <CircleQuestionMarkIcon className="h-6 w-6 text-white" />,
    title: "Quick & Easy",
    description:
      "Simple online application with instant approval and fast disbursal.",
  },
  {
    iconImg: <CircleQuestionMarkIcon className="h-6 w-6 text-white" />,
    title: "Transparent Process",
    description: "No hidden fees or charges – what you see is what you get.",
  },
  {
    iconImg: <CircleQuestionMarkIcon className="h-6 w-6 text-white" />,
    title: "Flexible Repayment",
    description:
      "Choose a repayment plan that suits your budget and lifestyle.",
  },
  {
    iconImg: <CircleQuestionMarkIcon className="h-6 w-6 text-white" />,
    title: "Secure & Confidential",
    description:
      "Your data is protected with bank-level security and confidentiality.",
  },
];
