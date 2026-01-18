import React from 'react';
import { SEOPage } from '@/components/SEOPage';
import { faqSchema } from '@/lib/seoHelpers';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQPage = () => {
  const faqs = [
    {
      question: "What is uTools.online?",
      answer: "uTools.online is a comprehensive collection of free online utility tools for file conversion, image editing, PDF processing, video conversion, and AI-powered tools. No sign-up or installation required."
    },
    {
      question: "Are all tools on uTools.online free?",
      answer: "Yes! All tools on uTools.online are completely free to use. There are no hidden costs, subscriptions, or premium features. You can use any tool as many times as you need."
    },
    {
      question: "Do I need to create an account to use these tools?",
      answer: "No, there's no need to create an account. All tools work without sign-up. Simply visit the tool page and start using it immediately."
    },
    {
      question: "Is my data secure when using these tools?",
      answer: "Yes, your data security is our priority. Files are processed locally in your browser whenever possible, and we don't store your data on our servers without your consent."
    },
    {
      question: "What file formats do these tools support?",
      answer: "Our tools support various formats including images (PNG, JPG, GIF, WebP), PDFs, documents, videos, and more. Check individual tool pages for specific format support."
    },
    {
      question: "Can I use these tools on mobile devices?",
      answer: "Yes! Most of our tools are fully responsive and work on mobile devices, tablets, and desktops."
    },
    {
      question: "Do these tools work offline?",
      answer: "Many of our tools work offline, processing files directly in your browser. However, some advanced features may require an internet connection."
    },
    {
      question: "How can I report a bug or suggest a feature?",
      answer: "You can contact us through our website's contact form or email. We appreciate feedback and suggestions for improvements."
    },
    {
      question: "Can I use these tools for commercial purposes?",
      answer: "Yes, you can use our tools for personal and commercial purposes. Check our Terms of Service for specific guidelines."
    },
    {
      question: "Do you offer API access?",
      answer: "Currently, we provide web-based tools. Please contact us if you're interested in API integrations for your business."
    }
  ];

  return (
    <SEOPage
      title="Frequently Asked Questions - uTools.online"
      description="Find answers to common questions about uTools.online, our free online utility tools, security, and features."
      canonical="https://utoolss.online/faq"
      keywords="FAQ, questions, answers, help, support, utools"
      schema={faqSchema(faqs)}
    >
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about uTools.online and our services.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
          <p className="text-muted-foreground">
            If you couldn't find the answer you're looking for, please{' '}
            <a href="/contact" className="text-blue-600 hover:underline">
              contact us
            </a>
            .
          </p>
        </div>
      </div>
    </SEOPage>
  );
};

export default FAQPage;
