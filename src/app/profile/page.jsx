"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  User,
  Mail,
  Shield,
  Layout,
  PlusCircle,
  GraduationCap,
  Loader2,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4">
          <h1 className="text-2xl font-black text-slate-900">Sign in to view profile</h1>
          <p className="text-slate-500">You need to be logged in to access profile details.</p>
          <Link href="/login" className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const user = session.user;
  const userRole = user.role || "student";
  const userName = user.name || user.username || "User";
  const userEmail = user.email || "Not available";
  const dashboardLink = userRole === "instructor" ? "/dashboard/instructor" : "/dashboard/student";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center shrink-0">
              {user.image ?
                <img
                  src={user.image}
                  alt={`${userName} profile image`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              : <User className="w-10 h-10 text-indigo-600" />}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-black text-slate-900">{userName}</h1>
              <p className="text-slate-500 mt-1">
                Manage your account and learning details.
              </p>
              <span className="inline-flex mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
                {userRole}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              User Information
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-indigo-600" />
                <div>
                  <p className="text-xs text-slate-400">Full Name</p>
                  <p className="font-semibold text-slate-900">
                    {userName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-600" />
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="font-semibold text-slate-900">
                    {userEmail}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-indigo-600" />
                <div>
                  <p className="text-xs text-slate-400">Role</p>
                  <p className="font-semibold text-slate-900 capitalize">
                    {userRole}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Quick Actions
            </p>
            <div className="space-y-3">
              <Link
                href={dashboardLink}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
              >
                <Layout className="w-4 h-4" />
                Open Dashboard
              </Link>
              {userRole === "instructor" && (
                <Link
                  href="/dashboard/instructor/create-course"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  Create New Course
                </Link>
              )}
              {userRole === "student" && (
                <Link
                  href="/dashboard/student/my-enrollments"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  <GraduationCap className="w-4 h-4" />
                  View My Enrollments
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
