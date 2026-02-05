'use client';

import React from "react"

import { useState, useEffect, useRef } from 'react';
import { Star, Smile, Layers, TrendingUp } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  startValue: number;
  endValue: number;
  increment: number;
  label: string;
}

export function Stats() {
  const [numbers, setNumbers] = useState([50, 60, 100, 60]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const stats: StatItem[] = [
    {
      icon: <Star className="w-12 h-12" />,
      startValue: 50,
      endValue: 150,
      increment: 2,
      label: '5 Star Reviews',
    },
    {
      icon: <Smile className="w-12 h-12" />,
      startValue: 60,
      endValue: 120,
      increment: 2,
      label: 'Happy Clients',
    },
    {
      icon: <Layers className="w-12 h-12" />,
      startValue: 100,
      endValue: 200,
      increment: 2,
      label: 'Successful Projects',
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      startValue: 60,
      endValue: 120,
      increment: 2,
      label: '6-7 Figures Earners',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setNumbers((prev) => {
          const newNumbers = [...prev];
          if (newNumbers[index] < stat.endValue) {
            newNumbers[index] = Math.min(
              newNumbers[index] + stat.increment,
              stat.endValue
            );
          }
          return newNumbers;
        });
      }, 30);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-16"
    >
      {/* Header Section */}
      <div className="mb-16 text-center max-w-4xl">
        {/* Trustpilot Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-emerald-500 text-2xl">★</span>
          <span className="text-white font-semibold">Trustpilot</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-emerald-500 text-lg">
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Track Record Label */}
        <p className="text-emerald-500 text-sm font-semibold tracking-wide mb-4">
          OUR TRACK RECORD
        </p>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-white">We Get Results, </span>
          <span className="text-emerald-500">Fast.</span>
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg leading-relaxed">
          After building thousands of aspiring businesses over the years,
          <br />
          we&apos;ve systemised success.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center border-l border-gray-700 pl-8 md:pl-0 md:border-l-0"
          >
            {/* Icon */}
            <div className="text-emerald-500 mb-6">{stat.icon}</div>

            {/* Number with Animation */}
            <div className="text-5xl md:text-6xl font-bold text-white mb-2">
              {numbers[index]}
              <span className="text-emerald-500">+</span>
            </div>

            {/* Divider */}
            <div className="w-16 h-1 bg-linear-to-r from-emerald-500 to-emerald-500 mb-4"></div>

            {/* Label */}
            <p className="text-emerald-500 text-sm md:text-base font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
