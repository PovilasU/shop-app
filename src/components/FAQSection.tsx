import Accordion from "./Accordion";

const faqItems = [
  {
    title: "How do I know if the cap I want is in stock?",
    content:
      "We do restock certain styles on a regular basis but cannot guarantee all styles/sizes will become available. The best way to be sure is to send us information on the product and we can let you know when we might expect more back in. Due to the huge range of caps we offer, we are confident however, that we will have something in stock to suit your requirements.",
  },
  {
    title: "Can you tell me if you're getting an item back in stock?",
    content:
      "We do restock certain styles on a regular basis but cannot guarantee all styles/sizes will become available. The best way to be sure is to send us information on the product and we can let you know when we might expect more back in. Due to the huge range of caps we offer, we are confident however, that we will have something in stock to suit your requirements.",
  },
  {
    title: "What types of payment do you take?",
    content:
      "We accept all major credit cards, PayPal, Apple Pay, and Google Pay.",
  },
  {
    title: "Another question example here.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
  },
  {
    title: "Another question. Maximum of 5.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec nisl non neque malesuada volutpat sed nec lorem.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-16 bg-white px-4">
      <div className="max-w-4xl mx-auto">
        <p
          className="mb-10 leading-tight font-medium
                     text-[14px] sm:text-[12px]
                     text-black text-left"
        >
          // FREQUENTLY ASKED QUESTIONS
        </p>
      <h2
        className="mb-8 uppercase tracking-wide
                  text-[24px] font-bold sm:text-[40px] sm:font-bold
                  text-black text-left"
      >
        EVERYTHING AROUND PRODUCT, ORDER AND DELIVERY
      </h2>

        <Accordion items={faqItems} />
      </div>
    </section>
  );
}

