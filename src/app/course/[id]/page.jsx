"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Star, Users, Clock, Globe, Award, PlayCircle, ChevronDown, CheckCircle, Share2, Heart, ShieldCheck, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_COURSES } from '@/constants';

export default function CourseDetailsPage() {
     const params = useParams();
     const id = params?.id;

     const course = MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];
     const [activeTab, setActiveTab] = useState('overview');
     const [expandedSections, setExpandedSections] = useState(['s1']);

     const toggleSection = (sectionId) => {
          setExpandedSections(prev =>
               prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
          );
     };

     return (
          <div className="min-h-screen bg-white">
               {/* Hero Header */}
               <div className="bg-slate-900 text-white pt-12 pb-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="grid lg:grid-cols-3 gap-12">
                              <div className="lg:col-span-2">
                                   <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-6">
                                        <Link href="/course" className="hover:text-white transition-colors">Courses</Link>
                                        <span>/</span>
                                        <span>{course.category}</span>
                                   </div>
                                   <h1 className="text-4xl lg:text-5xl font-bold font-display leading-tight mb-6">{course.title}</h1>
                                   <p className="text-xl text-slate-300 mb-8 leading-relaxed">{course.description}</p>

                                   <div className="flex flex-wrap items-center gap-6 mb-8">
                                        <div className="flex items-center gap-2">
                                             <div className="flex gap-0.5">
                                                  {[1, 2, 3, 4, 5].map((i) => (
                                                       <Star key={i} className={`w-4 h-4 ${i <= Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} />
                                                  ))}
                                             </div>
                                             <span className="text-yellow-400 font-bold">{course.rating}</span>
                                             <span className="text-slate-400">({course.reviewsCount} ratings)</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                             <Users className="w-4 h-4" />
                                             <span>{course.studentsCount.toLocaleString()} students</span>
                                        </div>
                                   </div>

                                   <div className="flex items-center gap-4">
                                        <img src={course.instructorImage} alt={course.instructor} className="w-12 h-12 rounded-full border-2 border-slate-700" />
                                        <div>
                                             <p className="text-sm text-slate-400">Created by</p>
                                             <p className="font-bold text-white hover:text-indigo-400 cursor-pointer transition-colors">{course.instructor}</p>
                                        </div>
                                        <div className="ml-8 flex items-center gap-6 text-sm text-slate-400">
                                             <div className="flex items-center gap-2">
                                                  <Globe className="w-4 h-4" /> English
                                             </div>
                                             <div className="flex items-center gap-2">
                                                  <Award className="w-4 h-4" /> Certificate
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Main Content */}
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
                    <div className="grid lg:grid-cols-3 gap-12">
                         {/* Left Column */}
                         <div className="lg:col-span-2 pb-20">
                              {/* Tabs */}
                              <div className="flex border-b border-slate-100 mb-8 overflow-x-auto">
                                   {['overview', 'curriculum', 'reviews'].map((tab) => (
                                        <button
                                             key={tab}
                                             onClick={() => setActiveTab(tab)}
                                             className={`px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                        >
                                             {tab}
                                        </button>
                                   ))}
                              </div>

                              <AnimatePresence mode="wait">
                                   {activeTab === 'overview' && (
                                        <motion.div
                                             initial={{ opacity: 0, y: 10 }}
                                             animate={{ opacity: 1, y: 0 }}
                                             exit={{ opacity: 0, y: -10 }}
                                             className="space-y-12"
                                        >
                                             <div>
                                                  <div className="flex items-center justify-between mb-6">
                                                       <h2 className="text-2xl font-bold text-slate-900">What you'll learn</h2>
                                                       <button
                                                            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all"
                                                       >
                                                            <Sparkles className="w-4 h-4" /> AI Summary
                                                       </button>
                                                  </div>

                                                  <div className="grid md:grid-cols-2 gap-4">
                                                       {[
                                                            'Build 16 web development projects for your portfolio',
                                                            'Master React Hooks, Context API, and Redux',
                                                            'Build professional websites with Tailwind CSS',
                                                            'Create backend APIs with Node.js and Express',
                                                            'Deploy your applications to Vercel and Netlify',
                                                            'Learn modern JavaScript (ES6+) fundamentals'
                                                       ].map((item, i) => (
                                                            <div key={i} className="flex gap-3">
                                                                 <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                                                 <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                                                            </div>
                                                       ))}
                                                  </div>
                                             </div>

                                             <div>
                                                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Requirements</h2>
                                                  <ul className="list-disc list-inside space-y-3 text-slate-600 text-sm">
                                                       <li>No prior coding experience required - we start from scratch!</li>
                                                       <li>A computer (Windows, Mac, or Linux) with internet access</li>
                                                       <li>Basic understanding of how to use a web browser</li>
                                                  </ul>
                                             </div>
                                        </motion.div>
                                   )}

                                   {activeTab === 'curriculum' && (
                                        <motion.div
                                             initial={{ opacity: 0, y: 10 }}
                                             animate={{ opacity: 1, y: 0 }}
                                             exit={{ opacity: 0, y: -10 }}
                                             className="space-y-4"
                                        >
                                             <div className="flex justify-between items-center mb-6">
                                                  <p className="text-sm text-slate-500 font-medium">
                                                       {course.curriculum.length} sections • {course.curriculum.reduce((acc, s) => acc + s.lessons.length, 0)} lectures • {course.duration} total length
                                                  </p>
                                                  <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Expand all sections</button>
                                             </div>

                                             {course.curriculum.map((section) => (
                                                  <div key={section.id} className="border border-slate-100 rounded-2xl overflow-hidden">
                                                       <button
                                                            onClick={() => toggleSection(section.id)}
                                                            className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition-colors"
                                                       >
                                                            <div className="flex items-center gap-4">
                                                                 <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.includes(section.id) ? 'rotate-180' : ''}`} />
                                                                 <span className="font-bold text-slate-900">{section.title}</span>
                                                            </div>
                                                            <span className="text-sm text-slate-500">{section.lessons.length} lectures</span>
                                                       </button>

                                                       <AnimatePresence>
                                                            {expandedSections.includes(section.id) && (
                                                                 <motion.div
                                                                      initial={{ height: 0 }}
                                                                      animate={{ height: 'auto' }}
                                                                      exit={{ height: 0 }}
                                                                      className="overflow-hidden bg-white"
                                                                 >
                                                                      {section.lessons.map((lesson) => (
                                                                           <div key={lesson.id} className="flex items-center justify-between p-5 border-t border-slate-50 hover:bg-slate-50 transition-colors group">
                                                                                <div className="flex items-center gap-4">
                                                                                     <PlayCircle className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                                                                                     <span className="text-sm text-slate-700">{lesson.title}</span>
                                                                                </div>
                                                                                <div className="flex items-center gap-4">
                                                                                     <span className="text-xs text-slate-400">{lesson.duration}</span>
                                                                                     {!lesson.isLocked ? (
                                                                                          <button className="text-xs font-bold text-indigo-600 hover:underline">Preview</button>
                                                                                     ) : (
                                                                                          <ShieldCheck className="w-4 h-4 text-slate-300" />
                                                                                     )}
                                                                                </div>
                                                                           </div>
                                                                      ))}
                                                                 </motion.div>
                                                            )}
                                                       </AnimatePresence>
                                                  </div>
                                             ))}
                                        </motion.div>
                                   )}
                              </AnimatePresence>
                         </div>

                         {/* Right Column - Floating Sidebar */}
                         <div className="relative">
                              <div className="sticky top-24 space-y-6">
                                   <div className="bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-indigo-100 overflow-hidden">
                                        <div className="relative aspect-video group cursor-pointer">
                                             <img src={course.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                                                       <PlayCircle className="w-8 h-8 text-indigo-600 fill-indigo-600" />
                                                  </div>
                                             </div>
                                             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-bold drop-shadow-md">Preview this course</div>
                                        </div>

                                        <div className="p-8">
                                             <div className="flex items-baseline gap-3 mb-6">
                                                  <span className="text-4xl font-bold text-slate-900">${course.price}</span>
                                                  <span className="text-lg text-slate-400 line-through">$129.99</span>
                                                  <span className="text-sm font-bold text-green-600">31% off</span>
                                             </div>

                                             <div className="space-y-3 mb-8">
                                                  <button className="w-full btn-primary py-4 text-lg">Add to Cart</button>
                                                  <button className="w-full btn-secondary py-4">Buy Now</button>
                                             </div>

                                             <p className="text-center text-xs text-slate-400 mb-8">30-Day Money-Back Guarantee</p>

                                             <div className="space-y-4">
                                                  <h4 className="text-sm font-bold text-slate-900">This course includes:</h4>
                                                  <div className="space-y-3">
                                                       {[
                                                            { icon: Clock, text: '45.5 hours on-demand video' },
                                                            { icon: Award, text: 'Certificate of completion' },
                                                            { icon: Globe, text: 'Full lifetime access' },
                                                            { icon: ShieldCheck, text: 'Access on mobile and TV' }
                                                       ].map((item, i) => (
                                                            <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                                                                 <item.icon className="w-4 h-4 text-slate-400" />
                                                                 <span>{item.text}</span>
                                                            </div>
                                                       ))}
                                                  </div>
                                             </div>

                                             <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-slate-50">
                                                  <button className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                                                       <Share2 className="w-4 h-4" /> Share
                                                  </button>
                                                  <button className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-red-600 transition-colors">
                                                       <Heart className="w-4 h-4" /> Wishlist
                                                  </button>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Instructor Card */}
                                   <div className="card p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                             <img src={course.instructorImage} alt={course.instructor} className="w-14 h-14 rounded-2xl object-cover" />
                                             <div>
                                                  <h4 className="font-bold text-slate-900">{course.instructor}</h4>
                                                  <p className="text-xs text-slate-500">Senior Web Developer</p>
                                             </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                             <div className="text-center p-3 bg-slate-50 rounded-xl">
                                                  <p className="text-lg font-bold text-slate-900">4.8</p>
                                                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Rating</p>
                                             </div>
                                             <div className="text-center p-3 bg-slate-50 rounded-xl">
                                                  <p className="text-lg font-bold text-slate-900">12k</p>
                                                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Students</p>
                                             </div>
                                        </div>
                                        <button className="w-full btn-secondary py-2 text-sm">View Profile</button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}