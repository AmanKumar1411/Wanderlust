import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can I regenerate the same trip with new options?",
    answer:
      "Yes. You can submit the same preferences again and get another itinerary suggestion.",
  },
  {
    question: "Does it support different budget styles?",
    answer:
      "Yes, you can choose Cheap, Moderate, or Luxury and the generated plan adapts accordingly.",
  },
  {
    question: "Can I save and revisit trips later?",
    answer:
      "Yes. Generated trips are saved and available from your My Trips section.",
  },
];

function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 lg:px-14">
      <h2 className="text-3xl font-bold sm:text-4xl">
        Frequently Asked Questions
      </h2>
      <div className="mt-6 space-y-3">
        {faqs.map((faq, index) => {
          const open = openIndex === index;
          return (
            <div key={faq.question} className="rounded-2xl border bg-card">
              <button
                type="button"
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenIndex(open ? -1 : index)}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
              {open && (
                <p className="px-5 pb-4 text-sm text-muted-foreground">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HomeFaq;
