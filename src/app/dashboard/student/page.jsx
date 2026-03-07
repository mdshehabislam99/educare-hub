"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Loader2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function StudentDashboard() {
  const { data: session } = useSession();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userName = session?.user?.name || session?.user?.username || "Learner";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollmentRes, courseRes] = await Promise.all([
          fetch("/api/my-enrollments", { cache: "no-store" }),
          fetch("/api/course", { cache: "no-store" }),
        ]);

        let enrollmentData = [];
        if (enrollmentRes.ok) {
          enrollmentData = await enrollmentRes.json();
          setEnrolledCourses(enrollmentData);
        }

        if (courseRes.ok) {
          const allCourses = await courseRes.json();
          const enrolledIds = new Set(
            enrollmentData.map((course) => (course._id || course.id)?.toString())
          );
          const discoverCourses = allCourses
            .filter((course) => !enrolledIds.has((course._id || course.id)?.toString()))
            .slice(0, 3);
          setRecommendations(discoverCourses);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  const stats = useMemo(() => {
    const inProgress = enrolledCourses.filter(
      (course) => course.progress > 0 && course.progress < 100
    ).length;
    const completed = enrolledCourses.filter((course) => course.progress === 100).length;
    const notStarted = enrolledCourses.filter((course) => (course.progress || 0) === 0).length;

    return { inProgress, completed, notStarted, total: enrolledCourses.length };
  }, [enrolledCourses]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <section className="rounded-3xl p-6 md:p-10 text-white bg-gradient-to-r from-slate-900 via-indigo-900 to-cyan-800 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.24em] text-indigo-100 font-bold">Student Workspace</p>
          <h1 className="text-3xl md:text-5xl font-black mt-3">Welcome back, {userName}</h1>
          <p className="text-indigo-100 mt-3 max-w-2xl">
            Your dashboard is powered by live records from the enrollments database. Track progress and continue learning.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard/student/my-enrollments" className="px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm">
              Go to My Enrollments
            </Link>
            <Link href="/course" className="px-5 py-3 rounded-xl border border-white/30 text-white font-bold text-sm">
              Explore New Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Enrolled", value: stats.total, icon: GraduationCap },
          { label: "In Progress", value: stats.inProgress, icon: TrendingUp },
          { label: "Completed", value: stats.completed, icon: CheckCircle2 },
          { label: "Not Started", value: stats.notStarted, icon: Clock3 },
        ].map((item) => (
          <article key={item.label} className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <item.icon className="w-5 h-5" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">{item.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black text-slate-900">My Enrolled Courses</h2>
            <Link href="/dashboard/student/my-enrollments" className="text-sm font-semibold text-indigo-600 inline-flex items-center gap-1">
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="mt-3 text-slate-600 font-semibold">No enrolled courses yet</p>
              <Link href="/course" className="mt-4 inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold text-sm">
                Start Learning
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledCourses.slice(0, 4).map((course) => {
                const progress = Number(course.progress || 0);
                return (
                  <article key={course._id || course.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-indigo-600 font-bold">
                          {course.category || "General"}
                        </p>
                        <h3 className="text-lg font-bold text-slate-900 mt-1">{course.title}</h3>
                        <p className="text-sm text-slate-500 mt-1">Next: {course.nextLesson || "Getting Started"}</p>
                      </div>
                      <Link href={`/course/${course._id || course.id}`} className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold text-center">
                        Continue
                      </Link>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <aside className="bg-white border border-slate-200 rounded-3xl p-6">
          <h2 className="text-xl font-black text-slate-900">Recommended</h2>
          <p className="text-sm text-slate-500 mt-1">New courses you can pick next.</p>

          <div className="mt-5 space-y-4">
            {recommendations.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
                <Sparkles className="w-5 h-5 text-indigo-500 mx-auto" />
                <p className="mt-2 text-sm text-slate-600">No recommendations right now.</p>
              </div>
            ) : (
              recommendations.map((course) => (
                <Link
                  key={course._id || course.id}
                  href={`/course/${course._id || course.id}`}
                  className="block rounded-2xl border border-slate-200 p-4 hover:border-indigo-300 hover:bg-indigo-50/40 transition-colors"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-700 font-bold">
                    {course.category || "General"}
                  </p>
                  <h3 className="font-bold text-slate-900 mt-1 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-slate-600 mt-2">${course.price || 0}</p>
                </Link>
              ))
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
