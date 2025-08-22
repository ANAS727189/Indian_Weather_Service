'use client';

import { CloudIcon, InformationCircleIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useTemperature } from '@/context/TemperatureContext';
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut
} from '@clerk/nextjs';

const currentTime = new Date().toLocaleString('en-IN', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Kolkata'
});

export default function Header() {
  const { unit, toggleUnit } = useTemperature();

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Indian Flag Tricolor Bar */}
      <div className="w-full h-1 flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white text-xs">
        <div className="max-w-7xl mx-auto px-2 sm:px-3 py-1.5 sm:py-2">
          <div className="flex flex-row items-center justify-between gap-1 xs:gap-2">
            <div className="flex items-center flex-wrap gap-x-1 sm:gap-x-2">
              <span className="font-medium text-xs">Government of India</span>
              <span className="hidden xs:inline text-blue-200 text-xs">|</span>
              <span className="text-blue-200 text-xs">Ministry of Earth Sciences</span>
            </div>
            <div className="flex items-center flex-wrap gap-x-1 sm:gap-x-2">
              <span className="hidden md:inline text-blue-200 text-xs">Emergency: 1077</span>
              <span className="hidden md:inline text-blue-200 text-xs">|</span>
              <span className="text-xs truncate">{currentTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white shadow-lg border-b-2 border-blue-600">
        <div className="px-2 sm:px-3 lg:px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 py-2 sm:py-0 sm:h-20">
            {/* Logo + Title */}
            <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-lg flex items-center justify-center shadow-lg border-2 border-blue-200">
                  <CloudIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900 leading-tight">
                  National Weather Service
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                  India Meteorological Department
                </p>
                <div className="flex items-center mt-0.5 sm:mt-1">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2 animate-pulse"></span>
                  <span className="text-green-700 font-medium text-xs">Live Updates</span>
                </div>
              </div>
            </div>

            {/* Temperature Unit Toggle + Auth Section */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 sm:gap-3">
              {/* Unit Toggle */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                <GlobeAltIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                <span className="text-gray-700 font-medium text-sm">IN</span>
                <span className="hidden sm:inline text-gray-400">|</span>
                <button
                  onClick={toggleUnit}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-700 transition-colors duration-200"
                >
                  <span className="font-medium text-sm">{unit === 'C' ? '°C' : '°F'}</span>
                  <svg
                    className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Auth Section */}
              <div className="flex items-center space-x-2">
                <SignedOut>
                  <SignInButton mode="modal" forceRedirectUrl="/">
                    <button className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal" forceRedirectUrl="/">
                    <button className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: 'w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 border-2 border-blue-600 shadow-md'
                      }
                    }}
                  />
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Alert Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center text-xs gap-1 sm:gap-2">
            <InformationCircleIcon className="h-4 w-4 text-amber-600 flex-shrink-0" />
            <div className="text-center">
              <span className="text-amber-800 font-medium">All weather monitoring systems operational</span>
              <span className="hidden sm:inline text-amber-700 sm:ml-2">
                • Data updated every 15 minutes • Last update:{' '}
                {new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}