import Navbar from "@/app/components/landing/Navbar/Navbar";
import Hero from "@/app/components/landing/Hero/Hero";
import Features from "@/app/components/landing/Features/Features";
import HowItWorks from "@/app/components/landing/HowItWorks/HowItWorks";
import CTA from "@/app/components/landing/CTA/CTA";
import Footer from "@/app/components/landing/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
}