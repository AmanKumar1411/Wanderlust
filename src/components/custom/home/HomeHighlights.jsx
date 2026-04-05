import React from "react";
import { Bot, CalendarClock, MapPinned, Wallet } from "lucide-react";

const features = [
  {
    title: "AI Itinerary Builder",
    description:
      "Get a complete daily travel flow with places, timing, and activity pacing.",
    icon: Bot,
  },
  {
    title: "Smart Budget Match",
    description:
      "Choose Cheap, Moderate, or Luxury and receive options that fit your style.",
    icon: Wallet,
  },
  {
    title: "Location-Rich Planning",
    description:
      "From city breaks to long vacations, generate plans around real destinations.",
    icon: MapPinned,
  },
  {
    title: "Fast Re-Planning",
    description:
      "Need changes? Regenerate in seconds and compare multiple trip versions.",
    icon: CalendarClock,
  },
];

function HomeHighlights() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 lg:px-14">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Why People Use Wanderlust
          </h2>
          <p className="mt-2 text-muted-foreground">
            Built to remove planning stress and keep your trip exciting.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <article
              key={feature.title}
              className="animate-fade-up rounded-2xl border bg-card p-5 shadow-sm transition-transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default HomeHighlights;
