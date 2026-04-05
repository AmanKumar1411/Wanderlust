import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function HomeCta() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-14 pt-10 sm:px-8 lg:px-14">
      <div className="rounded-3xl border bg-gradient-to-r from-emerald-500/20 via-sky-500/15 to-cyan-500/20 p-8 sm:p-10">
        <h2 className="text-3xl font-black sm:text-4xl">
          Ready for your next unforgettable journey?
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Generate your custom itinerary now and start exploring with a smarter
          plan.
        </p>
        <Link to="/create-trip" className="mt-6 inline-block">
          <Button className="rounded-full px-6">
            Build My Trip
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default HomeCta;
