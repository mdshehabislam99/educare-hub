"use client";

import React, { useState } from 'react';
import { Plus, Users, DollarSign, BookOpen, Star, MoreVertical, Edit, Trash, BarChart3, Layout, MessageSquare, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_COURSES } from '@/constants';

export default function InstructorDashboardPage() {
    const [activeTab, setActiveTab] = useState('courses');

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-64 bg-white border-r border-slate-100 flex-col sticky top-0 h-screen">
                <div className="p-6 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                            <BookOpen className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold font-display tracking-tight text-slate-900">EduFlow</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {[
                        { id: 'courses', label: 'My Courses', icon: Layout },
                        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                        { id: 'students', label: 'Students', icon: Users },
                        { id: 'messages', label: 'Messages', icon: MessageSquare },
                        { id: 'settings', label: 'Settings', icon: Settings },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-50">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                        <div className="flex items-center gap-3 mb-3">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Instructor" className="w-10 h-10 rounded-xl" />
                            <div>
                                <p className="text-sm font-bold text-slate-900">Michael Chen</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Instructor</p>
                            </div>
                        </div>
                        <button className="w-full py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                            View Profile
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 pb-20">
                {/* Header */}
                <header className="bg-white border-b border-slate-100 p-8">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Instructor Dashboard</h1>
                            <p className="text-slate-500">Manage your courses and track student performance.</p>
                        </div>
                        <button className="px-5 py-2 border text-white rounded bg-indigo-600 flex items-center justify-center gap-2">
                            <Plus className="w-5 h-5" /> Create New Course
                        </button>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto p-8 space-y-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Revenue', value: '$12,450', icon: DollarSign, color: 'green', trend: '+12%' },
                            { label: 'Total Students', value: '1,240', icon: Users, color: 'indigo', trend: '+5%' },
                            { label: 'Course Ratings', value: '4.8', icon: Star, color: 'yellow', trend: '0%' },
                            { label: 'Active Courses', value: '6', icon: BookOpen, color: 'blue', trend: '+1' }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-10 h-10 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                                        <stat.icon className={`text-${stat.color}-600 w-5 h-5`} />
                                    </div>
                                    <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-slate-400'}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Courses List */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">My Courses</h2>
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                                    <BarChart3 className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Course</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Students</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {MOCK_COURSES.map((course) => (
                                        <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img src={course.thumbnail} alt="" className="w-16 h-10 rounded-lg object-cover" />
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 line-clamp-1">{course.title}</p>
                                                        <p className="text-xs text-slate-500">Updated {course.lastUpdated}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-slate-900">{course.studentsCount.toLocaleString()}</p>
                                                <p className="text-xs text-slate-500">Enrolled</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-slate-900">${(course.price * course.studentsCount * 0.7).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                                <p className="text-xs text-slate-500">Earnings</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-sm font-bold text-slate-900">{course.rating}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                                        <Trash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 bg-slate-50/50 text-center">
                            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">View All Courses</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
