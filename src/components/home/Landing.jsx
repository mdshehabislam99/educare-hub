"use client";

import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PopularCourse from './PopularCourse';
import CTASection from './CTASection';

export const Landing = () => {
    return (
        <div className="bg-white">
            <HeroSection />
            <FeaturesSection />
            <PopularCourse />
            <CTASection />
        </div>
    );
};
