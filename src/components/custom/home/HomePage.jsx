import React from "react";
import HomeHero from "./HomeHero";
import HomeHighlights from "./HomeHighlights";
import HomeReviews from "./HomeReviews";
import HomeFaq from "./HomeFaq";
import HomeCta from "./HomeCta";

function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.12),transparent_35%)]" />
      <HomeHero />
      <HomeHighlights />
      <HomeReviews />
      <HomeFaq />
      <HomeCta />
    </main>
  );
}

export default HomePage;
