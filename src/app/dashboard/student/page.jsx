"use client";

import React from 'react';
import Link from 'next/link';
import { Book, Clock, Award, ChevronRight, PlayCircle, Calendar, Bell, Search, Filter, Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_COURSES } from '@/constants';
import { useSession } from 'next-auth/react';

const STABLE_PROGRESS = [65, 42];

export default function StudentDashboard() {
    const { data: session } = useSession();
    const userName = session?.user?.name || session?.user?.username || "Learner";

    const enrolledCourses = MOCK_COURSES.slice(0, 2).map((c, i) => ({
        ...c,
        progress: STABLE_PROGRESS[i],
        nextLesson: 'Introduction to React Hooks'
    }));

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Dashboard Header */}
            <div className="bg-white border-b border-slate-100 pt-8 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {userName}! 👋</h1>
                            <p className="text-slate-500">You've completed 75% of your goal this week. Keep it up!</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/cart" className="relative p-3 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition-colors">
                                <ShoppingCart className="w-6 h-6 text-slate-600" />
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
                                    0
                                </span>
                            </Link>
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl uppercase">
                                {userName[0]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[
                                { label: 'Courses In Progress', value: '4', icon: Book, color: 'indigo' },
                                { label: 'Completed Courses', value: '8', icon: Award, color: 'green' },
                                { label: 'Learning Hours', value: '124h', icon: Clock, color: 'blue' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                    <div className={`w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4`}>
                                        <stat.icon className={`text-indigo-600 w-5 h-5`} />
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Continue Learning */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-slate-900">Continue Learning</h2>
                                <Link href="/courses" className="text-sm font-bold text-indigo-600 hover:underline">View All</Link>
                            </div>

                            <div className="space-y-4">
                                {enrolledCourses.map((course) => (
                                    <div key={course.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{course.progress}%</span>
                                                    </div>
                                                    <p className="text-sm text-slate-500 mb-4">Next: {course.nextLesson}</p>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${course.progress}%` }}
                                                            className="h-full bg-indigo-600 rounded-full"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-slate-400 font-medium">12/45 lessons completed</span>
                                                        <button className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-3 transition-all">
                                                            Continue <ChevronRight className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Browse Courses */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900">Recommended for You</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {MOCK_COURSES.slice(2, 4).map((course) => (
                                    <Link key={course.id} href={`/course/${course.id}`} className="bg-white shadow-xl shadow-slate-200/50 border border-slate-100 rounded-3xl overflow-hidden group">
                                        <div className="h-40 overflow-hidden">
                                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{course.title}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-slate-900">${course.price}</span>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-xs font-bold text-slate-700">{course.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Calendar Widget */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-slate-900">Learning Schedule</h3>
                                <Calendar className="w-5 h-5 text-slate-400" />
                            </div>
                            <div className="space-y-4">
                                {[
                                    { day: 'Mon', date: '12', active: true },
                                    { day: 'Tue', date: '13', active: false },
                                    { day: 'Wed', date: '14', active: true },
                                    { day: 'Thu', date: '15', active: true },
                                    { day: 'Fri', date: '16', active: false },
                                ].map((item, i) => (
                                    <div key={i} className={`flex items-center justify-between p-3 rounded-2xl border ${item.active ? 'bg-indigo-50 border-indigo-100' : 'border-slate-50'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center ${item.active ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                                <span className="text-[10px] uppercase font-bold">{item.day}</span>
                                                <span className="text-sm font-bold">{item.date}</span>
                                            </div>
                                            <div>
                                                <p className={`text-sm font-bold ${item.active ? 'text-slate-900' : 'text-slate-400'}`}>
                                                    {item.active ? 'React Masterclass' : 'No sessions'}
                                                </p>
                                                {item.active && <p className="text-xs text-slate-500">04:00 PM - 05:30 PM</p>}
                                            </div>
                                        </div>
                                        {item.active && <PlayCircle className="w-5 h-5 text-indigo-600" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <p className="text-sm font-medium text-slate-700">Started Node.js course</p>
                                    </div>
                                    <span className="text-[10px] text-slate-400">2d ago</span>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                        <p className="text-sm font-medium text-slate-700">Earned React Badge</p>
                                    </div>
                                    <span className="text-[10px] text-slate-400">3d ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
