import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

function Hero() {
  const { resolvedTheme } = useTheme();
  const heroImage = resolvedTheme === "dark" ? "/dark.png" : "/light.png";

  return (
    <main className="relative overflow-hidden px-4 pb-12 pt-8 sm:px-8 lg:px-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.12),transparent_35%)]" />
      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border bg-card px-4 py-1 text-sm text-muted-foreground">
            AI-Powered Trip Planning
          </p>
          <h1 className="text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Plan Smarter, Travel Better, and Explore More with Wanderlust.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
            Build personalized itineraries in seconds with AI suggestions for
            stays, places, and daily plans tailored to your style and budget.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/create-trip">
              <Button className="rounded-full px-6">Create Your Trip</Button>
            </Link>
            <Link to="/my-trips">
              <Button variant="outline" className="rounded-full px-6">
                View Saved Trips
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border bg-card p-3 shadow-sm">
          <img
            src={heroImage}
            alt="Trip planner preview"
            className="w-full rounded-2xl object-cover"
          />
        </div>
      </section>
    </main>
  );
}

export default Hero;
