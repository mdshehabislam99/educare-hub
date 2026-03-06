import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "EduFlow | Master New Skills",
  description: "Empowering learners worldwide with high-quality education.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="bg-slate-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">E</span>
                    </div>
                    <span className="text-xl font-bold font-display tracking-tight">
                      EduFlow
                    </span>
                  </div>
                  <p className="text-slate-400 max-w-sm leading-relaxed">
                    Empowering learners worldwide with high-quality,
                    accessible education from industry experts.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-6">Platform</h4>
                  <ul className="space-y-4 text-slate-400 text-sm">
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Browse Courses
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Instructor Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Student Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Pricing
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-6">Company</h4>
                  <ul className="space-y-4 text-slate-400 text-sm">
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Careers
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-sm">
                  © 2024 EduFlow Inc. All rights reserved.
                </p>
                <div className="flex gap-6">
                  <a
                    href="#"
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
