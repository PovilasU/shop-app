import Accordion from "./Accordion";

const faqItems = [
  {
    title: "What is Mock Shop?",
    content: "Mock Shop is a public API that mimics a Shopify storefront.",
  },
  {
    title: "Can I use real products?",
    content: "No, this is mock data for demo purposes only.",
  },
  {
    title: "Is Tailwind CSS required?",
    content: "No, but it is recommended for styling in this task.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-16 bg-white px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 leading-tight">
          // FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="text-center mb-8 text-sm uppercase text-gray-500 tracking-wide">
          EVERYTHING AROUND PRODUCT, ORDER AND DELIVERY
        </p>
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
