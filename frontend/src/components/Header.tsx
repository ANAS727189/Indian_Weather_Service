'use client';

import { CloudIcon, InformationCircleIcon, GlobeAltIcon} from '@heroicons/react/24/outline';
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

      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="font-medium">Government of India</span>
            <span className="hidden sm:inline text-blue-200">|</span>
            <span className="hidden sm:inline text-blue-200">Ministry of Earth Sciences</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-blue-200">Emergency: 1077</span>
            <span className="text-blue-200">|</span>
            <span className="text-xs">{currentTime}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white shadow-lg border-b-2 border-blue-600">
        <div className="px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-lg flex items-center justify-center shadow-lg border-2 border-blue-200">
                  <CloudIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                  National Weather Service
                </h1>
                <p className="text-gray-600 text-sm font-medium">
                  India Meteorological Department
                </p>
                <div className="flex items-center mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-green-700 font-medium text-xs">Live Updates</span>
                </div>
              </div>
            </div>

            {/* Temperature Unit Toggle + Auth Section */}
            <div className="flex items-center space-x-5">
              {/* Unit Toggle */}
              <div className="flex items-center space-x-2">
                <GlobeAltIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700 font-medium">IN</span>
                <span className="text-gray-400">|</span>
                <button
                  onClick={toggleUnit}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-700 transition-colors duration-200"
                >
                  <span className="font-medium">{unit === 'C' ? '°C' : '°F'}</span>
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* Auth Section */}
              <div className="flex items-center space-x-3">
                <SignedOut>
                  <SignInButton 
                    mode="modal"
                    forceRedirectUrl="/"
                  >
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton 
                    mode="modal"
                    forceRedirectUrl="/"
                  >
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton 
                    afterSignOutUrl="/" 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 border-2 border-blue-600 shadow-md"
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
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center text-sm">
            <InformationCircleIcon className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
            <div className="text-center">
              <span className="text-amber-800 font-medium">
                All weather monitoring systems operational
              </span>
              <span className="hidden sm:inline text-amber-700 ml-2">
                • Data updated every 15 minutes • Last update: {new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}