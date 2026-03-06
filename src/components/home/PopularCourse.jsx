"use client";

import React from 'react';
import Link from 'next/link';
import { Star, Users, ArrowRight } from 'lucide-react';
import { MOCK_COURSES } from '@/constants';

const PopularCourse = () => {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">Popular Courses</h2>
                        <p className="text-slate-600">The most trending courses right now.</p>
                    </div>
                    <Link href="/course" className="text-indigo-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
                        View All Courses <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {MOCK_COURSES.map((course) => (
                        <Link
                            key={course.id}
                            href={`/course/${course.id}`}
                            className="bg-white shadow-xl shadow-slate-200/50 border border-slate-100 rounded-3xl overflow-hidden group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                                    {course.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <img src={course.instructorImage} alt={course.instructor} className="w-6 h-6 rounded-full" />
                                    <span className="text-xs font-medium text-slate-500">{course.instructor}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                    {course.title}
                                </h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-bold text-slate-700">{course.rating}</span>
                                    </div>
                                    <span className="text-sm text-slate-400">({course.reviewsCount} reviews)</span>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <span className="text-xl font-bold text-slate-900">${course.price}</span>
                                    <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                                        <Users className="w-4 h-4" /> {course.studentsCount.toLocaleString()} students
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCourse;
