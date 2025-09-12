import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const HomeHeroSection = () => {
  return (
    <section className="font-sans items-center justify-items-center gap-16 relative flex flex-col md:flex-row">
      <div className="flex relative z-10 items-center justify-center p-8 md:p-16 lg:p-24 flex-col md:flex-row gap-8 w-full">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="space-y-2">
            <p className="text-base text-primary font-semibold">PAYDAY LOAN</p>
            <h2 className="text-5xl font-bold leading-snug">
              Get instant personal loan{" "}
              <span className="text-primary">upto ₹1 lakh</span> in few minutes
            </h2>
          </div>
          <p className="text-lg text-gray-600 leading-tight">
            Whether it&apos;s a medical emergency, monthly bills, travel, or
            unexpected expenses — Loan In Need gives you fast, hassle-free
            personal loans. Simple online process, flexible tenures, and money
            in your account within hours.
          </p>
          <Button className="w-56 p-6 text-base my-3">
            Check loan eligibility now
          </Button>
        </div>
        <Image
          src="/Graphic-min.png"
          alt="Hero Image"
          width={300}
          height={300}
          className="ml-8 w-8/12 h-full object-cover hidden md:block md:w-1/2"
        />
      </div>
      <Image
        src="/bg-gradient.png"
        alt="Background Gradient"
        fill
        className="w-full max-w-full h-full object-cover absolute z-0"
      />
    </section>
  );
};

export default HomeHeroSection;
