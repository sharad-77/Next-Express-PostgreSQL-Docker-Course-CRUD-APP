import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';

export default function Home() {
  return (
    <div className="relative flex h-full w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      <div className="mt-60 w-full">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
          Learn New Skills. Build Your Future
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
          We believe learning should be simple, engaging, and practical. That’s
          why we built a platform that focuses on skill-based education, not
          just theory.
        </p>
      </div>
    </div>
  );
}
