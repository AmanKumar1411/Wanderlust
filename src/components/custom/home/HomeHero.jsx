import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Compass, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function HomeHero() {
  const { resolvedTheme } = useTheme();
  const heroImage = resolvedTheme === "dark" ? "/dark.png" : "/light.png";

  return (
    <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-10 pt-8 sm:px-8 lg:grid-cols-2 lg:px-14">
      <div className="space-y-6 animate-fade-up">
        <p className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          AI-Powered Trip Planning
        </p>

        <h1 className="text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Your Personalized Travel Plan in Minutes, Not Hours.
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
          Wanderlust creates tailored day-wise itineraries with hotel options,
          local highlights, and smart budget guidance for your next adventure.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link to="/create-trip">
            <Button className="rounded-full px-6 transition-all duration-300">
              Start Planning
            </Button>
          </Link>
          <Link to="/my-trips">
            <Button
              variant="outline"
              className="rounded-full px-6 transition-all duration-300"
            >
              View My Trips
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-5 pt-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Compass className="h-4 w-4" />
            80+ destination styles
          </span>
          <span className="inline-flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Instant itinerary drafts
          </span>
        </div>
      </div>

      <div className="animate-fade-up-delay-2 animate-soft-float rounded-3xl border bg-card p-3 shadow-sm">
        <img
          src={heroImage}
          alt="Trip planner preview"
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
      </div>
    </section>
  );
}

export default HomeHero;
