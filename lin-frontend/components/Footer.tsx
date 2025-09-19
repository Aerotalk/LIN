import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-[#FEF5F5] py-10 px-6 md:px-12 lg:px-20 mt-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left side */}
        <div className="space-y-6 lg:col-span-[1.5]">
          {/* Logo & Info */}
          <Image
            src="/lin-logo.png"
            alt="Loan In Need"
            width={300}
            height={300}
            className="h-16 w-auto"
          />
          <p className="text-sm text-gray-600">
            Welcome to LoanInNeed. We provide loan at very reasonable interest,
            on minimal documentation.
          </p>
          <div className="flex flex-col space-y-2">
            <Input
              type="text"
              placeholder="Enter your mobile number"
              className="px-3 py-2 rounded-md border border-gray-300 text-sm w-full"
            />
            <Button size="sm" className="bg-primary hover:bg-primary/90 w-1/2">
              Apply now
            </Button>
          </div>
          <address className="not-italic text-sm text-gray-600">
            OFFICE NO.-202, PLOT 9, Veer Savarkar Block, Guru Nanak Nagar,
            Shakurpur, Delhi, 110092
          </address>
          <div className="flex space-x-3 text-primary">
            <Link href="#">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Right side (links) */}
        <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Useful Links */}
          <div>
            <h4 className="font-semibold text-primary mb-3">Useful links</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link href="#">Insta loans</Link>
              </li>
              <li>
                <Link href="#">Track loan</Link>
              </li>
              <li>
                <Link href="#">Repay loan</Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-primary mb-3">Tools</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link href="#">Personal loan EMI calculator</Link>
              </li>
              <li>
                <Link href="#">Eligibility Loan calculator</Link>
              </li>
              <li>
                <Link href="#">Cibil score checker</Link>
              </li>
              <li>
                <Link href="#">Loan comparison calculator</Link>
              </li>
            </ul>
          </div>

          {/* Insta loan by needs */}
          <div>
            <h4 className="font-semibold text-primary mb-3">
              Insta loan by needs
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link href="/medical-emergency-loan">
                  Medical emergency loan
                </Link>
              </li>
              <li>
                <Link href="/utility-bill-loan">Utility bill loan</Link>
              </li>
              <li>
                <Link href="/house-rent-loan">House rent loan</Link>
              </li>
              <li>
                <Link href="/daily-expense-loan">Daily expense loan</Link>
              </li>
              <li>
                <Link href="/education-loan">Education purpose loan</Link>
              </li>
              <li>
                <Link href="/debt-consolidation-loan">
                  Debt consolidation loan
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-primary mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Career</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
              <li>
                <Link href="#">News</Link>
              </li>
              <li>
                <Link href="#">Contact us</Link>
              </li>
            </ul>
          </div>

          {/* Insta loan by cities */}
          <div>
            <h4 className="font-semibold text-primary mb-3">
              Insta loan by cities
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link href="/loans/mumbai">Insta loan in Mumbai</Link>
              </li>
              <li>
                <Link href="/loans/delhi">Insta loan in Delhi</Link>
              </li>
              <li>
                <Link href="/loans/bangalore">Insta loan in Bengaluru</Link>
              </li>
              <li>
                <Link href="/loans/hyderabad">Insta loan in Hyderabad</Link>
              </li>
              <li>
                <Link href="/loans/pune">Insta loan in Pune</Link>
              </li>
              <li>
                <Link href="/loans/kolkata">Insta loan in Kolkata</Link>
              </li>
              <li>
                <Link href="/loans/chennai">Insta loan in Chennai</Link>
              </li>
            </ul>
          </div>

          {/* Insta loan by states */}
          <div>
            <h4 className="font-semibold text-primary mb-3">
              Insta loan by states
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link href="/loans/gujarat">Insta loan in Gujarat</Link>
              </li>
              <li>
                <Link href="/loans/bihar">Insta loan in Bihar</Link>
              </li>
              <li>
                <Link href="/loans/orissa">Insta loan in Orissa</Link>
              </li>
              <li>
                <Link href="/loans/jharkhand">Insta loan in Jharkhand</Link>
              </li>
              <li>
                <Link href="/loans/assam">Insta loan in Assam</Link>
              </li>
              <li>
                <Link href="/loans/punjab">Insta loan in Punjab</Link>
              </li>
              <li>
                <Link href="/loans/chhattisgarh">
                  Insta loan in Chhattisgarh
                </Link>
              </li>
              <li>
                <Link href="/loans/madhya-pradesh">
                  Insta loan in Madhya Pradesh
                </Link>
              </li>
              <li>
                <Link href="/loans/west-bengal">Insta loan in West Bengal</Link>
              </li>
            </ul>
          </div>

          {/* Insta loan by salary */}
          <div>
            <h4 className="font-semibold text-primary mb-3">
              Personal loan by salary
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link href="/loans/forty-thousand">40,000 salary loan</Link>
              </li>
              <li>
                <Link href="/loans/fifty-thousand">50,000 salary loan</Link>
              </li>
              <li>
                <Link href="/loans/eighty-thousand">80,000 salary loan</Link>
              </li>
              <li>
                <Link href="/loans/one-lakh">1,00,000 salary loan</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2025 Loan in need. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <Link href="#">Privacy policy</Link>
          <Link href="#">Terms & conditions</Link>
          <Link href="#">Refunds & cancellation</Link>
          <Link href="#">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}
