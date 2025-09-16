export default function useEMIcalc() {
  const calculateEMI = (
    principal: number,
    annualInterestRate: number,
    tenureYears: number
  ): { emi: number; totalInterest: number; totalPayment: number } => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = tenureYears * 12;

    if (monthlyInterestRate === 0) {
      const emi = principal / numberOfPayments;
      const totalPayment = principal;
      const totalInterest = 0;
      return { emi, totalInterest, totalPayment };
    }

    const emi =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    const totalPayment = emi * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return { emi, totalInterest, totalPayment };
  };

  return { calculateEMI };
}
