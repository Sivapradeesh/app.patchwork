"use client";

import BackgroundEffects from "@/components/BackgroundEffects";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DeviceMockup from "@/components/DeviceMockup";
import FeaturesSection from "@/components/FeaturesSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <BackgroundEffects />
      <Navbar />
      <HeroSection />
      <DeviceMockup />
      <FeaturesSection />
      <CapabilitiesSection />
      <DownloadSection />
      <Footer />
    </main>
  );
}
