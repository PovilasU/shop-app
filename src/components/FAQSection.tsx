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
    <section className="py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <Accordion items={faqItems} />
    </section>
  );
}
