import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type AccordionItem = {
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg overflow-hidden"
        >
          <button
            className="flex items-center justify-between w-full px-4 py-3 text-left bg-white hover:bg-gray-100 transition"
            onClick={() => toggle(index)}
          >
            <span className="font-medium">{item.title}</span>
            {openIndex === index ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-4 py-2 text-gray-700 bg-gray-50 transition-all">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
