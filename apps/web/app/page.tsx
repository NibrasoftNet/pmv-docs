import Image from 'next/image';
import Link from 'next/link';
import {
  Play,
  Plus,
  ArrowRight,
  MessageSquare,
  Clock,
  GitMerge,
  Search,
  Database,
  Globe,
  TrophyIcon,
} from 'lucide-react';
import { LandingFeatures } from '@/components/landing-features';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-amber-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2 font-semibold text-xl tracking-tight text-neutral-900">
            <span>PMV Docs</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-500">
            <Link
              href="#features"
              className="hover:text-neutral-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#services"
              className="hover:text-neutral-900 transition-colors"
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="hover:text-neutral-900 transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/auth/sign-up"
              className="hidden md:inline-flex h-10 items-center justify-center rounded-full bg-amber-500 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-600"
            >
              Preorder
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 px-4 md:px-6 pb-12">
        {/* Hero Section (Card Style) */}
        <section className="relative mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-neutral-900 text-white shadow-2xl min-h-[800px] flex flex-col">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/hero-bg.png"
                alt="hero-bg"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-8 py-16 md:py-24 flex-1 flex flex-col">
              <div className="grid lg:grid-cols-12 gap-12">
                {/* Left Content */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <h1 className="text-5xl font-medium tracking-tight md:text-7xl lg:text-8xl leading-[0.9]">
                    The aftermarket, <br />
                    reimagined
                  </h1>

                  <p className="mt-8 max-w-xl text-lg text-neutral-200 md:text-xl leading-relaxed">
                    Meet PMV Docs — a unified platform designed for deep
                    integration, seamless search, and global commerce. A smarter
                    way to buy and sell.
                  </p>

                  {/* Features Row */}
                  <div className="mt-12 flex flex-wrap gap-6">
                    <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                        <Search className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          Smart Search
                        </div>
                        <div className="text-xs text-neutral-400">
                          Instant discovery
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                        <Database className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          Supplier Cloud
                        </div>
                        <div className="text-xs text-neutral-400">
                          Secure storage
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                        <Globe className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          Global Market
                        </div>
                        <div className="text-xs text-neutral-400">
                          B2C Sales
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex items-center gap-6">
                    <Link
                      href="/auth/sign-up"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-amber-500 px-8 text-sm font-medium text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-600"
                    >
                      Order now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                      href="#features"
                      className="inline-flex items-center text-sm font-medium text-white hover:text-amber-500 transition-colors"
                    >
                      <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/30">
                        <span className="text-xs">i</span>
                      </div>
                      Learn more
                    </Link>
                  </div>
                </div>

                {/* Right Content - Vehicle Search Engine */}
                <div className="lg:col-span-5 lg:flex lg:justify-end">
                  <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl p-6 text-white shadow-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-medium text-lg">Find your parts</h3>
                        <p className="text-xs text-neutral-400 mt-1">
                          Select your vehicle to get started
                        </p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                        <Search className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <select className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 [&>option]:bg-neutral-900">
                            <option value="">Year</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                          </select>
                          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="relative">
                          <select className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 [&>option]:bg-neutral-900">
                            <option value="">Make</option>
                            <option value="audi">Audi</option>
                            <option value="bmw">BMW</option>
                            <option value="ford">Ford</option>
                          </select>
                          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <select className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 [&>option]:bg-neutral-900">
                          <option value="">Model</option>
                          <option value="a4">A4</option>
                          <option value="mustang">Mustang</option>
                          <option value="x5">X5</option>
                        </select>
                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search by part number or name..."
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pl-10 text-sm text-white placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                      </div>

                      <button className="w-full rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-600 hover:scale-[1.02] active:scale-[0.98]">
                        Search Parts
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer inside Hero */}
              <div className="mt-auto pt-16 flex flex-col md:flex-row items-end justify-between gap-8">
                {/* Video Card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-1 backdrop-blur-md transition-transform hover:scale-105 cursor-pointer group">
                  <div className="flex items-center gap-4 p-3 pr-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors">
                      <Play className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        Watch the overview
                      </div>
                      <div className="text-xs text-neutral-400">
                        1 min • No fluff
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="flex items-center gap-6 text-sm font-medium">
                  <span className="text-neutral-300">
                    In stock • Ships in 2–5 business days
                  </span>
                  <Link
                    href="/auth/sign-up"
                    className="inline-flex h-10 items-center justify-center rounded-full bg-amber-500 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-600"
                  >
                    Order now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Section (Animated) */}
        <LandingFeatures />

        {/* Services Section (Dark Card Style) */}
        <section id="services" className="py-12 bg-neutral-50">
          <div className="container mx-auto px-6">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-neutral-900 text-white shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/services-bg.png"
                  alt="Services Background"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-transparent" />
              </div>

              <div className="relative z-10 grid min-h-[600px] grid-cols-1 lg:grid-cols-2">
                {/* Left Content */}
                <div className="flex flex-col justify-center p-12 lg:p-16">
                  <div className="mb-12 flex items-center gap-2 text-sm font-medium text-neutral-400">
                    <GitMerge className="h-4 w-4" />
                    <span>What we do</span>
                  </div>

                  <div className="space-y-0">
                    {[
                      { id: '001', title: 'Search Engine API & Widget' },
                      { id: '002', title: 'Supplier Inventory Cloud' },
                      { id: '003', title: 'Global B2C Marketplace' },
                      { id: '004', title: 'Priority Support & Integration' },
                    ].map((service, index) => (
                      <div
                        key={service.id}
                        className={cn(
                          'group flex items-center justify-between border-b border-white/10 py-8 transition-colors hover:bg-white/5',
                          index === 0 && 'border-t',
                        )}
                      >
                        <div className="flex items-center gap-6">
                          <span className="font-mono text-xs text-neutral-500 group-hover:text-amber-500 transition-colors">
                            ({service.id})
                          </span>
                          <span className="text-lg font-medium md:text-xl">
                            {service.title}
                          </span>
                        </div>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-amber-500 group-hover:text-amber-500">
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Content (Title) */}
                <div className="flex items-start justify-end p-12 lg:p-16">
                  <h2 className="text-5xl font-medium tracking-tight md:text-7xl">
                    Services.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Let's Talk Section (Dark Card Style) */}
        <section id="contact" className="py-12 pb-24 bg-neutral-50">
          <div className="container mx-auto px-6">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0A1A15] text-white shadow-2xl">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f2e22] to-[#050a08] opacity-80" />

              <div className="relative z-10 grid gap-12 p-8 lg:grid-cols-2 lg:p-16">
                {/* Left Column: Form */}
                <div className="rounded-3xl bg-neutral-100 p-8 text-neutral-900 shadow-xl">
                  <div className="mb-8 flex items-start justify-between">
                    <div>
                      <span className="text-xs font-medium text-neutral-500">
                        PMV Support
                      </span>
                      <h3 className="mt-1 text-2xl font-semibold">
                        Have a question?
                      </h3>
                    </div>
                    <MessageSquare className="h-6 w-6 text-neutral-400" />
                  </div>

                  <form className="space-y-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs font-medium text-neutral-500"
                      >
                        Your name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Jane Doe"
                        className="w-full rounded-xl border-0 bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-amber-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs font-medium text-neutral-500"
                      >
                        E-mail *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        className="w-full rounded-xl border-0 bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-amber-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="text-xs font-medium text-neutral-500"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="How can we help?"
                        className="w-full resize-none rounded-xl border-0 bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-amber-500"
                      />
                    </div>

                    <button
                      type="button"
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                    >
                      Send message
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <p className="text-center text-xs text-neutral-400">
                      By submitting, you agree to our Terms and Privacy Policy.
                    </p>
                  </form>
                </div>

                {/* Right Column: Info */}
                <div className="flex flex-col justify-between py-4">
                  <div>
                    <h2 className="text-5xl font-medium tracking-tight md:text-6xl">
                      Let's talk.
                    </h2>
                    <p className="mt-6 max-w-md text-lg text-neutral-400">
                      Tell us about your setup—support, bulk orders, or
                      partnerships. We reply within one business day.
                    </p>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2">
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-emerald-400">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">
                            Quick response
                          </h4>
                          <p className="mt-1 text-sm text-neutral-400">
                            Most messages receive a reply in under 24h.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-emerald-400">
                          <GitMerge className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">
                            Clear next steps
                          </h4>
                          <p className="mt-1 text-sm text-neutral-400">
                            We'll follow up with a concise plan and timeline.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex items-center gap-4 rounded-2xl bg-white/5 p-2 pr-6 backdrop-blur-sm w-fit">
                    <TrophyIcon className="relative h-8 w-8 overflow-hidden rounded-xl" />
                    <div>
                      <div className="text-xs font-medium text-neutral-400">
                        Team Lead
                      </div>
                      <div className="font-medium text-white">Sofien</div>
                    </div>
                    <button className="ml-4 flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/10 transition-colors hover:bg-neutral-800">
                      Ask directly
                      <MessageSquare className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-neutral-200 bg-neutral-50 py-12">
          <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 md:flex-row">
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-900">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span>PMV Docs</span>
            </div>
            <p className="text-sm text-neutral-500">
              © 2024 PMV Docs. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-sm text-neutral-500 hover:text-neutral-900"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-neutral-500 hover:text-neutral-900"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-neutral-500 hover:text-neutral-900"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
