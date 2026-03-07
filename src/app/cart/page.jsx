"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ShoppingCart, Loader2, BookOpen, Trash2 } from "lucide-react";

export default function CartPage() {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (error) {
        console.error("Cart fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchCart();
    } else if (status !== "loading") {
      setIsLoading(false);
    }
  }, [session, status]);

  const handleRemove = async (courseId) => {
    setRemovingId(courseId);
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      if (!res.ok) {
        return;
      }

      setCartItems((prev) => prev.filter((item) => item.courseId !== courseId));
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Remove cart item error:", error);
    } finally {
      setRemovingId(null);
    }
  };

  if (isLoading) {
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
          <h1 className="text-2xl font-black text-slate-900">Your cart is waiting</h1>
          <p className="text-slate-500">Please sign in to view and manage your cart.</p>
          <Link href="/login" className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900">My Cart</h1>
            <p className="text-slate-500 text-sm">{cartItems.length} course(s) in your cart</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-5">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h2 className="text-xl font-bold text-slate-900">No courses in cart</h2>
            <p className="text-slate-500">Browse courses and add what you want to learn next.</p>
            <Link href="/course" className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold">
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => {
              const course = item.course;
              return (
                <div key={item._id} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-5 sm:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                      {course?.thumbnail && (
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{course?.title}</h3>
                      <p className="text-sm text-slate-500">{course?.category || "General"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-xl font-black text-slate-900">${course?.price || 0}</p>
                    <Link href={`/course/${course?._id || course?.id}`} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">
                      View Course
                    </Link>
                    <button
                      onClick={() => handleRemove(item.courseId)}
                      disabled={removingId === item.courseId}
                      className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-60"
                    >
                      {removingId === item.courseId ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Removing
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
