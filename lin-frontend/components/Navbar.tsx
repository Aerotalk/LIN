"use client";

import * as React from "react";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Button } from "./ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Mumbai",
    href: "/loan/mumbai",
    description: "Avail loans in Mumbai",
  },
  {
    title: "Delhi",
    href: "/loan/delhi",
    description: "Avail loans in Delhi",
  },
  {
    title: "Bengaluru",
    href: "/loan/bengaluru",
    description: "Avail loans in Bengaluru",
  },
  {
    title: "Hyderabad",
    href: "/loan/hyderabad",
    description: "Avail loans in Hyderabad",
  },
  {
    title: "Pune",
    href: "/loan/pune",
    description: "Avail loans in Pune",
  },
  {
    title: "Gujrat",
    href: "/loan/gujrat",
    description: "Avail loans in Gujrat",
  },
  {
    title: "Kolkata",
    href: "/loan/kolkata",
    description: "Avail loans in Kolkata",
  },
  {
    title: "Bihar",
    href: "/loan/bihar",
    description: "Avail loans in Bihar",
  },
  {
    title: "Punjab",
    href: "/loan/punjab",
    description: "Avail loans in Punjab",
  },
  {
    title: "Madhya Pradesh",
    href: "/loan/madhya-pradesh",
    description: "Avail loans in Madhya Pradesh",
  },
  {
    title: "Chennai",
    href: "/loan/chennai",
    description: "Avail loans in Chennai",
  },
];

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default function Navbar() {
  return (
    <nav className="w-full max-w-[90rem] mx-auto py-4 px-8 md:px-16 lg:px-24 absolute z-10 bg-red-50">
      <div className="flex justify-between items-center gap-8">
        <Link href="/" className="flex items-center">
          <Image src="/lin-logo.png" alt="Logo" width={120} height={40} />
        </Link>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Personal loan</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3">
                  <ListItem href="/apply-loan" title="Insta Loan">
                    Get an instant personal loan with quick approval and minimal
                    documentation.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Loan calculators</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#">
                        <div className="font-medium">
                          Personal EMI Calculator
                        </div>
                        <div className="text-muted-foreground">
                          Calculate your monthly EMI for personal loans.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#">
                        <div className="font-medium">
                          Eligibility Loan Calculator
                        </div>
                        <div className="text-muted-foreground">
                          Check your eligibility for a loan.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#">
                        <div className="font-medium">Cibil Score Checker</div>
                        <div className="text-muted-foreground">
                          Check your Cibil score.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#">
                        <div className="font-medium">
                          Loan Comparison Calculator
                        </div>
                        <div className="text-muted-foreground">
                          Compare different loan offers.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Cities</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-2 md:w-[400px] md:grid-cols-3 lg:w-[500px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/blogs">Blogs</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/about">About us</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/news">News</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Support</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/contact">Contact us</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/enquiry">Enquire now</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/track-loan">Track loan</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/login">Login</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="font-medium">
                <Link href="/apply">
                  <Button className="text-base">Apply now</Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
