import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection({
  faqData,
}: {
  faqData: { question: string; answer: string }[];
}) {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 p-6 md:p-12 lg:p-20 my-12">
      <div className="flex flex-col justify-center items-center-safe space-y-6 w-full">
        <div className="flex flex-col justify-center items-center-safe space-y-2 text-center mb-18 w-full">
          <span className="text-primary font-semibold leading-tight">FAQs</span>
          <h2 className="lg:text-4xl text-3xl font-bold">
            Frequently
            <span className="text-primary capitalize"> asked questions</span>
          </h2>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
          defaultValue="item-1"
        >
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
