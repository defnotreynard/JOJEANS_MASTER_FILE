import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import RecentEvents from '@/components/RecentEvents';
import PackageSection from '@/components/PackageSection';
import VenuesSection from '@/components/VenuesSection';
// import WeddingSection from '@/components/WeddingSection';
// import ShopSection from '@/components/ShopSection';
// import FeaturedTools from '@/components/FeaturedTools';
// import InspirationGallery from '@/components/InspirationGallery';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { UserChat } from '@/components/chat/UserChat';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-background page-transition">
      <Navigation />

      <main>
        <Hero />
        <RecentEvents />
        <PackageSection />
        <VenuesSection />
        {/* <WeddingSection /> */}
        {/* <ShopSection /> */}
        {/* <FeaturedTools /> */}
        {/* <InspirationGallery /> */}
        <Testimonials />
      </main>
      <Footer />
      <UserChat />
    </div>
  );
};

export default Index;
