import React from 'react'
import {CloudIcon, PhoneIcon, ExclamationTriangleIcon} from '@heroicons/react/24/outline';

const Footer = () => {
  return (
      <>
          <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="px-4">
                  <div className="grid md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="md:col-span-2">
                      <h3 className="text-white font-bold text-lg mb-4">
                        National Weather Service
                      </h3>
                      <p className="text-sm mb-4 leading-relaxed">
                        The India Meteorological Department (IMD) is the national meteorological service 
                        of India and is the principal government agency responsible for meteorological 
                        observations, weather forecasting, and seismology.
                      </p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                          <CloudIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm">Serving the nation since 1947</span>
                      </div>
                    </div>
        
                    {/* Quick Links */}
                    <div>
                      <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                      <ul className="text-sm space-y-2">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Weather Warnings</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Cyclone Updates</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Rainfall Data</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Climate Information</a></li>
                      </ul>
                    </div>
        
                    {/* Contact */}
                    <div>
                      <h4 className="text-white font-semibold mb-4">Emergency Contact</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-2" />
                          <span>Weather Emergency: 1077</span>
                        </div>
                        <div className="flex items-center">
                          <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                          <span>Disaster Helpline: 108</span>
                        </div>
                        <div className="mt-4 p-3 bg-red-900 rounded-lg border border-red-700">
                          <p className="text-red-100 text-xs font-medium">
                            For weather-related emergencies, contact local authorities immediately
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
        
                  {/* Copyright */}
                  <div className="border-t border-gray-700 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                      <p>
                        © 2025 India Meteorological Department, Ministry of Earth Sciences, Government of India. All rights reserved.
                      </p>
                      <div className="mt-4 md:mt-0 flex items-center space-x-4">
                        <span>Data updated every 15 minutes</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
      </>
  )
}

export default Footer