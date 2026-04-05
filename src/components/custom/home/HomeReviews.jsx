import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Aarav Mehta",
    role: "Weekend Traveler",
    text: "I planned a 4-day Japan route in under 5 minutes. It felt like having a travel assistant.",
  },
  {
    name: "Sana Rizvi",
    role: "Solo Explorer",
    text: "The day-wise structure is very practical. I used it directly during my Istanbul trip.",
  },
  {
    name: "Karan Dutta",
    role: "Family Planner",
    text: "Budget mode gave us realistic hotel ideas and activities my kids actually liked.",
  },
];

function HomeReviews() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 lg:px-14">
      <div className="rounded-3xl border bg-card p-6 sm:p-8">
        <h2 className="text-3xl font-bold sm:text-4xl">
          What Travelers Are Saying
        </h2>
        <p className="mt-2 text-muted-foreground">
          Demo testimonials to preview social proof styling.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((review, index) => (
            <article
              key={review.name}
              className="animate-fade-up rounded-2xl border bg-background p-5"
              style={{ animationDelay: `${index * 140}ms` }}
            >
              <div className="mb-3 flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-sm text-muted-foreground">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-4 font-semibold">{review.name}</p>
              <p className="text-xs text-muted-foreground">{review.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeReviews;
