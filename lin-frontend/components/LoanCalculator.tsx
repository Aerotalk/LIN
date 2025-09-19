"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import useEMIcalc from "@/hooks/useEMIcalc";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

export default function LoanCalculator() {
  const { calculateEMI } = useEMIcalc();
  const [principal, setPrincipal] = useState(5000); // Default principal amount
  const [annualInterestRate, setAnnualInterestRate] = useState(12); // Default interest rate
  const [tenureDays, setTenureDays] = useState(2); // Default tenure in days
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const handleCalculate = () => {
    const { emi, totalInterest, totalPayment } = calculateEMI(
      principal,
      annualInterestRate,
      tenureDays
    );
    setTotalPayment(totalPayment);
    setEmi(emi);
    setTotalInterest(totalInterest);
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-4 p-6 md:p-12 lg:p-20">
      <div className="flex flex-col justify-center items-center-safe space-y-6 w-full">
        <div className="flex flex-col justify-center items-center-safe space-y-2 text-center w-full mb-18">
          <span className="text-primary font-semibold leading-tight uppercase">
            LOAN CALCULATOR
          </span>
          <h2 className="lg:text-4xl text-3xl font-bold">
            Personal loan <span className="text-primary">EMI Calculator</span>
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-8 justify-between items-center gap-4 w-full">
          <div className="w-full flex flex-col space-y-4">
            <div className="w-full flex flex-col space-y-3">
              <div className="w-full flex justify-between items-center">
                <span className="text-start font-medium">Principal Amount</span>
                <Input
                  className="justify-end w-1/6 max-w-[80px] bg-gray-200 border-0 focus:border-0 focus:ring-0 active:border-0 active:ring-0"
                  type="text"
                  value={`₹ ${principal}`}
                  onChange={(e) =>
                    setPrincipal(Number(e.target.value.replace("₹ ", "")))
                  }
                />
              </div>
              <Slider
                value={[principal]}
                onValueChange={(value) => setPrincipal(value[0])}
                min={5000}
                max={500000}
                step={1000}
                className="flex-1"
              />
              <div className="w-full flex justify-between items-center text-sm">
                <span className="text-start">5k</span>
                <span className="text-end">5,00,000</span>
              </div>
            </div>
            <div className="w-full flex flex-col space-y-3">
              <div className="w-full flex justify-between items-center">
                <span className="text-start font-medium">
                  Annual Interest Rate
                </span>
                <Input
                  className="justify-end w-1/6 max-w-[80px] bg-gray-200 border-0 focus:border-0 focus:ring-0 active:border-0 active:ring-0"
                  type="text"
                  value={annualInterestRate}
                  onChange={(e) =>
                    setAnnualInterestRate(Number(e.target.value))
                  }
                />
              </div>
              <Slider
                value={[annualInterestRate]}
                onValueChange={(value) => setAnnualInterestRate(value[0])}
                min={12}
                max={30}
                step={1}
                className="flex-1"
              />
              <div className="w-full flex justify-between items-center text-sm">
                <span className="text-start">12%</span>
                <span className="text-end">30%</span>
              </div>
            </div>
            <div className="w-full flex flex-col space-y-3">
              <div className="w-full flex justify-between items-center">
                <span className="text-start font-semibold">
                  Tenure (In Days)
                </span>
                <Input
                  className="justify-end w-1/6 max-w-[80px] bg-gray-200 border-0 focus:border-0 focus:ring-0 active:border-0 active:ring-0"
                  type="text"
                  value={tenureDays}
                  onChange={(e) => setTenureDays(Number(e.target.value))}
                />
              </div>
              <Slider
                value={[tenureDays]}
                onValueChange={(value) => setTenureDays(value[0])}
                min={2}
                max={45}
                step={1}
                className="flex-1"
              />
              <div className="w-full flex justify-between items-center text-sm">
                <span className="text-start">2</span>
                <span className="text-end">45</span>
              </div>
            </div>
          </div>

          <div className="bg-primary text-white w-full lg:w-1/2 px-6 py-8 rounded-lg flex flex-col space-y-4">
            <div className="space-y-2 flex flex-col">
              <p className="capitalize leading-tight text-sm">monthly EMI</p>
              <h3 className="lg:text-3xl text-2xl font-bold">
                ₹ {emi.toFixed(2)}
              </h3>
            </div>
            <Separator className="bg-white" />
            <div className="w-full flex justify-between items-center">
              <p>Total Interest</p>
              <p>₹ {totalInterest.toFixed(2)}</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p>Total Payable</p>
              <p>₹ {totalPayment.toFixed(2)}</p>
            </div>
            <Button
              onClick={handleCalculate}
              className="w-full mt-2 bg-white text-black hover:bg-gray-100 font-medium cursor-pointer py-3"
              type="button"
            >
              Apply loan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
