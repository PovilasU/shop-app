import { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";

type AccordionItem = {
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [heights, setHeights] = useState<number[]>([]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const newHeights = refs.current.map((ref) => ref?.scrollHeight || 0);
    setHeights(newHeights);
  }, [items]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const iconContainerWidth = "w-20"; // keep fixed width for consistent alignment

  return (
    <div className="w-full divide-y divide-gray-300">
      {items.map((item, index) => {
        const isOpen = openIndex === index;


if (index === 0) {
  return (
    <div key={index} className="w-full px-4 sm:px-6 py-5">
      <div className="flex justify-start sm:justify-end">
        <div
          className="px-5 h-10 min-w-[110px] flex items-center justify-center 
                     rounded-full border border-gray-400 
                     text-black font-bold text-[13px] tracking-wide 
                     whitespace-nowrap"
        >
          ALL FAQS
        </div>
      </div>
    </div>
  );
}


        return (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-4 sm:px-6 py-5 text-left hover:bg-gray-50 transition"
            >
              <span className="text-black font-medium text-base sm:text-lg">
                {item.title}
              </span>
              <div className={`${iconContainerWidth} flex justify-start sm:justify-center`}>
                <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400">
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-black" />
                  ) : (
                    <Plus className="w-4 h-4 text-black" />
                  )}
                </div>
              </div>
            </button>

            <div
              ref={(el) => (refs.current[index] = el)}
              className="px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: isOpen ? `${heights[index]}px` : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="pb-6 pt-1 text-gray-600 text-base leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
