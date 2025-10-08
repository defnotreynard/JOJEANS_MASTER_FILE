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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
    </div>
  );
};

export default Index;
