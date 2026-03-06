"use client";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, BookOpen, Star, Sparkles, Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function SignupPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();

    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                alert("Account created successfully! Please log in.");
                router.push("/login");
            } else {
                alert(result.error || "SignUp failed");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen bg-white">
            {/* Left Side: Branding/Hero (Hidden on Mobile) */}
            <section className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 overflow-hidden flex-col justify-between p-12 text-white">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-white rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-400 rounded-full blur-[120px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <Link href="/" className="flex items-center gap-2 mb-12">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                            <BookOpen className="text-indigo-600 w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold font-display tracking-tight">EduFlow</span>
                    </Link>

                    <h1 className="text-5xl font-bold font-display leading-tight mb-6">
                        Start Your <br />
                        <span className="text-indigo-200">Learning Journey</span>
                    </h1>
                    <p className="text-indigo-100 text-lg max-w-md leading-relaxed">
                        Create an account today and get unlimited access to expert-led courses and certifications.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-md"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <Sparkles className="text-white w-5 h-5" />
                        </div>
                        <p className="font-bold">Over 1,200+ Courses</p>
                    </div>
                    <p className="text-indigo-50 leading-relaxed mb-6">
                        From web development to business strategy, learn anything with our curated paths designed for beginners and experts alike.
                    </p>
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <img
                                key={i}
                                className="w-10 h-10 rounded-full border-2 border-indigo-600"
                                src={`https://i.pravatar.cc/100?img=${i + 20}`}
                                alt="User"
                            />
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-white flex items-center justify-center text-[10px] font-bold text-indigo-600">
                            +25k
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Right Side: Signup Form */}
            <section className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 font-display">Create an account</h2>
                        <p className="text-slate-500">Sign up in seconds to start your free trial.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <FieldGroup className="gap-5">
                            <Field>
                                <FieldLabel htmlFor="username" className="text-slate-700 font-semibold">Username</FieldLabel>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="yourname"
                                    className="bg-white border-slate-200 h-12 rounded-xl focus:ring-indigo-500 transition-all"
                                    {...register("username", { required: "Username is required" })}
                                />
                                {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
                            </Field>

                            <Field>
                                <FieldLabel className="text-slate-700 font-semibold mb-2">I want to join as</FieldLabel>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`
                                        flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                                        ${register("role").value === "student" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white hover:border-indigo-300"}
                                    `}>
                                        <input
                                            type="radio"
                                            value="student"
                                            className="hidden"
                                            defaultChecked
                                            {...register("role")}
                                        />
                                        <span className="font-bold text-slate-900">Student</span>
                                        <span className="text-xs text-slate-500">I want to learn</span>
                                    </label>
                                    <label className={`
                                        flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                                        ${register("role").value === "instructor" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white hover:border-indigo-300"}
                                    `}>
                                        <input
                                            type="radio"
                                            value="instructor"
                                            className="hidden"
                                            {...register("role")}
                                        />
                                        <span className="font-bold text-slate-900">Instructor</span>
                                        <span className="text-xs text-slate-500">I want to teach</span>
                                    </label>
                                </div>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email" className="text-slate-700 font-semibold">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    className="bg-white border-slate-200 h-12 rounded-xl focus:ring-indigo-500 transition-all"
                                    {...register("email", { required: "Email is required" })}
                                />
                                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password" className="text-slate-700 font-semibold">Password</FieldLabel>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="bg-white border-slate-200 h-12 rounded-xl focus:ring-indigo-500 transition-all"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: { value: 8, message: "Must be at least 8 characters" }
                                        })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                            </Field>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-100 transition-all"
                            >
                                {isLoading ? "Creating account..." : "Sign up"}
                            </Button>
                        </FieldGroup>
                    </form>

                    <div className="my-8 flex items-center gap-4 text-slate-400">
                        <div className="flex-1 h-[1px] bg-slate-200" />
                        <span className="text-sm font-medium">Or sign up with</span>
                        <div className="flex-1 h-[1px] bg-slate-200" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-12 border-slate-200 hover:bg-white hover:border-slate-300 rounded-xl font-semibold gap-2">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                            Google
                        </Button>
                        <Button variant="outline" className="h-12 border-slate-200 hover:bg-white hover:border-slate-300 rounded-xl font-semibold gap-2">
                            <Github className="w-5 h-5" />
                            GitHub
                        </Button>
                    </div>

                    <p className="mt-10 text-center text-slate-600">
                        Already have an account?{" "}
                        <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-700">
                            Log in
                        </Link>
                    </p>
                </motion.div>
            </section>
        </main>
    );
}
