"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    eyebrow: "Welcome to BookNook",
    title: "Every Book Opens a New World.",
    description:
      "Discover fascinating stories, explore new ideas, and find your next favorite book in our growing collection.",
    buttonText: "Browse Books",
    background:
      "from-slate-950 via-indigo-950 to-violet-950",
    accent: "text-violet-300",
    number: "01",
  },
  {
    eyebrow: "Explore. Read. Grow.",
    title: "Your Next Great Read Is Waiting.",
    description:
      "From timeless classics to modern discoveries, explore books that inspire your imagination and curiosity.",
    buttonText: "Explore Collection",
    background:
      "from-slate-950 via-emerald-950 to-teal-950",
    accent: "text-emerald-300",
    number: "02",
  },
  {
    eyebrow: "Share the Joy of Reading",
    title: "Borrow a Book. Discover More.",
    description:
      "Enjoy a simple borrowing experience and make every reading moment count with BookNook.",
    buttonText: "Find Your Book",
    background:
      "from-slate-950 via-rose-950 to-orange-950",
    accent: "text-rose-300",
    number: "03",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.number}>
            <div
              className={`relative flex min-h-135 items-center bg-gradient-to-br ${slide.background} px-4 py-20 sm:px-8 lg:min-h-[620px] lg:px-16`}
            >
              {/* Decorative background elements */}
              <div className="pointer-events-none absolute -right-20 top-10 size-96 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-10 top-20 size-72 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -bottom-40 right-1/4 size-96 rounded-full bg-white/5 blur-3xl" />

              <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
                {/* Content */}
                <div className="max-w-2xl">
                  <div
                    className={`mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium ${slide.accent}`}
                  >
                    <BookOpen className="size-4" />
                    {slide.eyebrow}
                  </div>

                  <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                    {slide.description}
                  </p>

                  <Link
                    href="/books"
                    className="mt-9 inline-flex h-12 items-center gap-3 rounded-lg bg-white px-7 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-200"
                  >
                    {slide.buttonText}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>

                {/* Decorative book illustration */}
                <div className="relative hidden h-90 items-center justify-center lg:flex">
                  <div className="absolute size-72 rounded-full border border-white/10" />
                  <div className="absolute size-56 rounded-full border border-white/10" />

                  <div className="relative flex h-64 w-48 -rotate-6 flex-col justify-between rounded-r-2xl rounded-l-md border-l-10 border-amber-700 bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-6 shadow-2xl shadow-black/40">
                    <div className="absolute inset-y-0 right-2 w-px bg-white/20" />

                    <BookOpen className="size-10 text-amber-100" />

                    <div>
                      <div className="mb-3 h-1 w-12 rounded-full bg-amber-200/70" />
                      <p className="text-2xl font-bold leading-tight text-white">
                        The Art of Reading
                      </p>
                      <p className="mt-3 text-xs text-amber-100">
                        A world of imagination
                      </p>
                    </div>

                    <span className="text-xs font-semibold tracking-widest text-amber-100">
                      BOOKNOOK
                    </span>
                  </div>

                  <div className="absolute right-10 top-10 h-52 w-36 rotate-12 rounded-r-xl rounded-l-sm border-l-[7px] border-emerald-800 bg-gradient-to-br from-emerald-500 to-emerald-900 p-4 shadow-xl">
                    <BookOpen className="size-7 text-emerald-100" />
                    <p className="mt-20 text-sm font-bold text-white">
                      Explore More
                    </p>
                  </div>

                  <div className="absolute bottom-4 left-8 h-44 w-32 rotate-6 rounded-r-xl rounded-l-sm border-l-[7px] border-rose-800 bg-gradient-to-br from-rose-500 to-rose-900 p-4 shadow-xl">
                    <BookOpen className="size-6 text-rose-100" />
                    <p className="mt-12 text-sm font-bold text-white">
                      New Stories
                    </p>
                  </div>
                </div>
              </div>

              <span className="absolute bottom-10 right-8 hidden text-7xl font-bold text-white/5 sm:block">
                {slide.number}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}