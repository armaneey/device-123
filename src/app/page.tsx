'use client';

import DashboardHeader from '@/components/DashboardHeader';
import Overview from '@/components/Overview';
import BrowserInfo from '@/components/BrowserInfo';
import DeviceInfo from '@/components/DeviceInfo';
import ScreenInfo from '@/components/ScreenInfo';
import NetworkInfo from '@/components/NetworkInfo';
import LocationInfo from '@/components/LocationInfo';
import ExtendedHardware from '@/components/ExtendedHardware';
import BrowserCapabilities from '@/components/BrowserCapabilities';


export default function Home() {
  return (
    <div className="min-h-screen bg-[#120E1D] text-[#F5EFE6] antialiased selection:bg-[#E6C5B8]/20 selection:text-[#E6C5B8]">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <Overview />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BrowserInfo />
          <DeviceInfo />
          <ScreenInfo />
          <NetworkInfo />
          <LocationInfo />
          <ExtendedHardware />
          <BrowserCapabilities />
        </div>
      </main>
      
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-12 border-t border-[#251D33]">
        <p className="text-center text-xs tracking-wide text-[#9A8EA9]">
          Device Information Dashboard
        </p>
      </footer>
    </div>
  );
}