"use client";

import React from 'react';
import Link from 'next/link';
import { Plus, Users, BookOpen, BarChart3, DollarSign, Edit, Trash2, CheckCircle, Clock, MoreVertical, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_COURSES } from '@/constants';
import { useSession } from 'next-auth/react';

export default function InstructorDashboard() {
    const { data: session } = useSession();
    const userName = session?.user?.name || session?.user?.username || "Instructor";

    const instructorCourses = MOCK_COURSES.slice(0, 3).map((c, i) => ({
        ...c,
        students: [124, 85, 210][i],
        revenue: [1240, 850, 4200][i],
        status: i === 2 ? 'Published' : 'Draft'
    }));

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Dashboard Header */}
            <div className="bg-white border-b border-slate-100 pt-8 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Instructor Dashboard</h1>
                            <p className="text-slate-500">Welcome back, {userName}. Here's what's happening with your courses.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard/instructor/create-course" className="flex items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                                <Plus className="w-5 h-5" />
                                Create New Course
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Revenue', value: '$6,290', icon: DollarSign, color: 'green' },
                        { label: 'Total Students', value: '419', icon: Users, color: 'blue' },
                        { label: 'Active Courses', value: '5', icon: BookOpen, color: 'indigo' },
                        { label: 'Avg. Rating', value: '4.8', icon: BarChart3, color: 'orange' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center`}>
                                    <stat.icon className={`text-indigo-600 w-6 h-6`} />
                                </div>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">+12.5%</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Courses List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">Your Courses</h2>
                            <Link href="/dashboard/instructor/all-course" className="text-sm font-bold text-indigo-600 hover:underline">View All</Link>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Course</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Students</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Earnings</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {instructorCourses.map((course) => (
                                            <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                                                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                                        </div>
                                                        <p className="text-sm font-bold text-slate-900 line-clamp-1">{course.title}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-sm font-medium text-slate-600">{course.students}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-sm font-bold text-slate-900">${course.revenue}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${course.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                                        }`}>
                                                        {course.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Quick Tips */}
                        <div className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-100 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Plus className="w-20 h-20 rotate-12" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2">Pro Tip! 💡</h3>
                                <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                                    Add more quizzes and interactive content to increase student engagement by up to 40%.
                                </p>
                                <button className="text-xs font-bold underline">Learn More</button>
                            </div>
                        </div>

                        {/* Recent Reviews */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-6">Recent Reviews</h3>
                            <div className="space-y-6">
                                {[
                                    { name: 'David Lee', rating: 5, comment: 'Excellent delivery and practical examples!', course: 'Advanced React Part 2' },
                                    { name: 'Sarah M.', rating: 4, comment: 'Very helpful contents. Could be slightly slower.', course: 'UI Design Fundamentals' }
                                ].map((review, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-bold text-slate-900">{review.name}</p>
                                            <div className="flex gap-0.5">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    < Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-500 italic">"{review.comment}"</p>
                                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{review.course}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
