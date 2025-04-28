'use client';

import { useState, FormEvent, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Toast from "../components/Toast";

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'info'
  });

  // Check for previously submitted email on page load
  useEffect(() => {
    const savedEmail = localStorage.getItem('subscribedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setShowSuccess(true);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      setToast({
        visible: true,
        message: 'Please enter a valid email address',
        type: 'error'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call to store email in backend
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      // Store email in localStorage to remember the user
      localStorage.setItem('subscribedEmail', email);
      
      // Show success state
      setShowSuccess(true);
      
      // Success toast
      setToast({
        visible: true,
        message: data.message || 'Thank you! You\'re on the early access list.',
        type: 'success'
      });
      
      // Reset form (but keep email for display purposes)
      // Don't hide success message since we want it to persist
      
    } catch (error) {
      setToast({
        visible: true,
        message: 'Something went wrong. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle toast close
  const handleToastClose = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 md:py-6 px-4 md:px-12 flex justify-between items-center border-b border-gray-100 dark:border-gray-800 backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 sticky top-0 z-10">
        <div className="flex items-center gap-2 sm:gap-3">
        <Image
            src="/images/logo-placeholder.svg" 
            alt="givemymenu.com" 
            width={40} 
            height={40} 
            className="rounded-lg shadow-sm"
          priority
        />
          <span className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold tracking-tight truncate">
            <span className="hidden xs:inline">givemymenu.com</span>
            <span className="xs:hidden">givemymenu.com</span>
          </span>
        </div>
        <div className="flex items-center ml-2">
          <a 
            href="#subscribe" 
            className="text-xs sm:text-sm md:text-base px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-[#eb8036] hover:bg-[#d97429] text-white font-medium rounded-md transition-colors shadow-sm whitespace-nowrap"
          >
            <span className="hidden sm:inline">Get Early Access</span>
            <span className="sm:hidden">Early Access</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 px-4 md:px-12 bg-gradient-to-br from-white to-[#eb8036]/10 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight tracking-tight text-gray-900 dark:text-white">
                Revolutionizing Restaurant Menus <span className="text-[#eb8036]">Digitally</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed">
                Our platform empowers restaurants to create elegant, contactless dining experiences through instantly scannable QR code menus.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <a
                  href="#subscribe"
                  className="px-5 py-3 bg-[#eb8036] hover:bg-[#d97429] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all text-center"
                >
                  Get Early Access
        </a>
        <a
                  href="#features"
                  className="px-5 py-3 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-medium rounded-lg shadow-sm hover:shadow-md transition-all text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center mb-8 md:mb-0">
              <div className="relative w-60 h-60 sm:w-64 sm:h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-[#eb8036]/20 to-[#eb8036]/20 dark:from-[#eb8036]/10 dark:to-[#eb8036]/10 rounded-3xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 flex items-center justify-center">
                  <div className="grid grid-cols-5 gap-2 md:gap-3 w-full h-full relative">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`
                          aspect-square rounded-md transition-all
                          ${
                            [0, 1, 4, 5, 9, 15, 19, 21, 23, 24].includes(i)
                              ? "bg-[#eb8036] dark:bg-[#eb8036]"
                              : i % 3 === 0 ? "bg-gray-800 dark:bg-gray-600" : "bg-transparent border border-gray-200 dark:border-gray-700"
                          }
                        `}
                        style={{
                          animationDelay: `${i * 100}ms`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Plate overlay in the middle */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-[#eb8036] to-[#f59e0b] flex items-center justify-center animate-float shadow-lg">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                        <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="w-full py-12 md:py-24 px-4 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight text-gray-900 dark:text-white">Why Choose givemymenu</h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our platform offers comprehensive solutions for restaurants looking to modernize their menu experience.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 md:p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-[#eb8036]/20 dark:bg-[#eb8036]/30 rounded-lg flex items-center justify-center mb-4 md:mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#eb8036]">
                    <path d="M3 5V19H21V5H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">Digital Menus</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  Create beautiful, dynamic digital menus that can be updated in real-time with new items and prices.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 md:p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-[#eb8036]/20 dark:bg-[#eb8036]/30 rounded-lg flex items-center justify-center mb-4 md:mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#eb8036]">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M7 7H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M17 7H17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M7 17H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M17 17H17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">QR Code Generation</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  Instantly generate custom QR codes that link directly to your restaurant's menu.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 md:p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 sm:col-span-2 md:col-span-1">
                <div className="w-12 h-12 bg-[#eb8036]/20 dark:bg-[#eb8036]/30 rounded-lg flex items-center justify-center mb-4 md:mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#eb8036]">
                    <path d="M8 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H16" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 3C8 1.89543 8.89543 1 10 1H14C15.1046 1 16 1.89543 16 3C16 4.10457 15.1046 5 14 5H10C8.89543 5 8 4.10457 8 3Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 12C14.2091 12 16 10.2091 16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 12C9.79086 12 8 13.7909 8 16C8 18.2091 9.79086 20 12 20C14.2091 20 16 18.2091 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">Contactless Dining</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  Provide a safer, more hygienic dining experience for your customers with zero physical contact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section id="subscribe" className="w-full py-12 md:py-24 px-4 md:px-12 bg-[#eb8036]/10 dark:bg-gray-900/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight text-gray-900 dark:text-white">Be the First to Experience It</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
              Join our waiting list to get early access to our platform and exclusive launch offers.
            </p>
            <div className="max-w-lg mx-auto">
              {showSuccess ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">Thank You!</h3>
                  <p className="text-green-700 dark:text-green-300">
                    We've received your email ({email}) and will notify you as soon as we launch.
                  </p>
                </div>
              ) : (
                <form className="flex flex-col sm:flex-row gap-3 mx-auto" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#eb8036] dark:text-white"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <button 
                    type="submit"
                    className={`px-5 py-3 bg-[#eb8036] hover:bg-[#d97429] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all whitespace-nowrap ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Early Access'}
                  </button>
                </form>
              )}
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 md:px-12 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4 md:mb-5">
          <Image
                  src="/images/logo-placeholder.svg" 
                  alt="givemymenu.com" 
                  width={32} 
                  height={32} 
                  className="rounded-lg"
                />
                <span className="text-xl font-semibold">givemymenu.com</span>
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-6 max-w-xs">
                Transforming restaurant menus into digital experiences through simple QR code technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">Product</h3>
              <ul className="space-y-2 md:space-y-3">
                <li><Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-[#eb8036] dark:hover:text-[#eb8036] transition-colors text-sm md:text-base">Features</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#eb8036] dark:hover:text-[#eb8036] transition-colors text-sm md:text-base">Pricing</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#eb8036] dark:hover:text-[#eb8036] transition-colors text-sm md:text-base">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">Connect</h3>
              <ul className="space-y-2 md:space-y-3">
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#eb8036] dark:hover:text-[#eb8036] transition-colors text-sm md:text-base">Twitter</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#eb8036] dark:hover:text-[#eb8036] transition-colors text-sm md:text-base">Instagram</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#eb8036] dark:hover:text-[#eb8036] transition-colors text-sm md:text-base">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} givemymenu.com — All rights reserved.
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="#" className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-[#eb8036] dark:hover:text-[#eb8036] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-[#eb8036] dark:hover:text-[#eb8036] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Toast Component */}
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={handleToastClose}
      />
    </div>
  );
}
