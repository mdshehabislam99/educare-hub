"use client";

import React from 'react';

const FloatingCard = ({ className = '', children }) => {
     return (
          <div className={`absolute bg-white rounded-2xl shadow-xl border border-slate-50 z-20 ${className}`}>
               {children}
          </div>
     );
};

export default FloatingCard;