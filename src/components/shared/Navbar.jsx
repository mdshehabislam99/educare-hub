"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Bell,
  User,
  Menu,
  X,
  LogOut,
  BookOpen,
  Layout,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  // Mock auth state
  const isLoggedIn = true;
  const userRole = "student"; // 'student' | 'instructor'

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-slate-900">
                EduFlow
              </span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-80">
              <Search className="text-slate-400 w-4 h-4 mr-2" />
              <input
                type="text"
                placeholder="Search for courses..."
                className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/courses"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Explore
            </Link>

            {isLoggedIn ?
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white text-[10px] flex items-center justify-center rounded-full">
                    2
                  </span>
                </button>
                <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                  <Bell className="w-5 h-5" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 pl-3 bg-slate-50 border border-slate-100 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <span className="text-xs font-semibold text-slate-700">
                      Alex Johnson
                    </span>
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-slate-50 mb-2">
                          <p className="text-sm font-bold text-slate-900">
                            Alex Johnson
                          </p>
                          <p className="text-xs text-slate-500">
                            alex@example.com
                          </p>
                        </div>
                        <Link
                          href={
                            userRole === "instructor" ? "/instructor" : (
                              "/dashboard"
                            )
                          }
                          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                          <Layout className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                          <Settings className="w-4 h-4" /> Settings
                        </Link>
                        <button
                          onClick={() => router.push("/login")}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              : <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-indigo-600 px-4 py-2"
                >
                  Log In
                </Link>
                <Link href="/signup" className="btn-primary py-2 px-5 text-sm">
                  Sign Up
                </Link>
              </div>
            }
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600"
            >
              {isMenuOpen ?
                <X />
                : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full bg-slate-100 border-none rounded-xl pl-10 py-2 text-sm"
                />
              </div>
              <Link
                href="/courses"
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Explore
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                My Learning
              </Link>
              <Link
                href="/settings"
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Settings
              </Link>
              <button className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg">
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
