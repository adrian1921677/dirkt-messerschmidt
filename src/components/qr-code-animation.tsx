'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Smartphone } from 'lucide-react';
import Image from 'next/image';

interface QRCodeAnimationProps {
  qrCodePath: string;
  delay?: number;
  isGlobal?: boolean;
}

export function QRCodeAnimation({ qrCodePath, delay = 2000, isGlobal = false }: QRCodeAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isGlobal && !hasAnimated) {
      // QR-Code erscheint nach der angegebenen Verzögerung
      const qrTimer = setTimeout(() => {
        setIsVisible(true);
      }, delay);

      // Pfeil erscheint 1 Sekunde nach dem QR-Code
      const arrowTimer = setTimeout(() => {
        setShowArrow(true);
        setHasAnimated(true); // Mark as animated, so it stays visible
      }, delay + 1000);

      return () => {
        clearTimeout(qrTimer);
        clearTimeout(arrowTimer);
      };
    } else if (!isGlobal) {
      // If not global, it's always visible
      setIsVisible(true);
      setShowArrow(true);
    }
  }, [delay, isGlobal, hasAnimated]);

  const containerClasses = isGlobal 
    ? "fixed bottom-4 left-4 z-50 pointer-events-none"
    : "relative w-full h-auto aspect-square"; // For static display within content flow

  return (
    <div className={containerClasses}>
      {/* QR-Code Container */}
      <div 
        className={`transition-all duration-1000 ease-out ${
          isVisible 
            ? 'translate-x-0 opacity-100' 
            : '-translate-x-full opacity-0'
        }`}
      >
        <div className="relative bg-white rounded-2xl shadow-2xl p-4 border-2 border-blue-200">
          {/* QR-Code */}
          <div className="w-32 h-32 relative">
            <Image
              src={qrCodePath}
              alt="WhatsApp QR-Code"
              fill
              className="rounded-lg"
              priority
            />
          </div>
          
          {/* WhatsApp Icon */}
          <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg">
            <Smartphone className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      {/* Pfeil mit "Scan me" Text - nur für global animation */}
      {isGlobal && (
        <div 
          className={`absolute left-40 top-1/2 transform -translate-y-1/2 transition-all duration-500 ${
            showArrow 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-4 opacity-0'
          }`}
        >
          <div className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
            <span className="text-sm font-medium">Scan me</span>
            <ArrowRight className="h-4 w-4 animate-pulse" />
          </div>
          
          {/* Pfeil-Spitze */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
            <div className="w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-blue-600"></div>
          </div>
        </div>
      )}

      {/* Pulsierender Ring um den QR-Code - nur für global animation */}
      {isVisible && isGlobal && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-40 h-40 border-2 border-blue-400 rounded-2xl animate-ping opacity-20"></div>
        </div>
      )}
    </div>
  );
}
