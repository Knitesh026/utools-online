import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOPage } from '@/components/SEOPage';
import { faqSchema } from '@/lib/seoHelpers';
import StickerBadge from '@/components/StickerBadge';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const faqs = [
    {
      question: "What is uTools.online?",
      answer: "uTools.online is a set of free web tools for everyday tasks: working with PDFs and images, counting and reversing text, picking colours and gradients, generating QR codes, passwords and IDs, and calculating loans, SIP returns, GST, BMI, age and unit conversions. Each tool page explains how it works, and the Guides section covers the ideas behind the tools in more depth."
    },
    {
      question: "Are all tools really free?",
      answer: "Yes. There are no accounts, quotas, trial periods or watermarks. The site is paid for by advertising from Google AdSense, which is labelled and kept separate from the tools. See the Advertising Disclosure page for details."
    },
    {
      question: "Are my files uploaded to your servers?",
      answer: "For the file and image tools, no. They use your browser's own processing (Canvas, WebAssembly and JavaScript libraries), so the file stays in your device's memory and is gone when you close the tab. Each tool page says how it works. Our Privacy Policy explains the small amount of information that servers and advertising partners can see, such as your IP address."
    },
    {
      question: "Do I need to create an account?",
      answer: "No. Open any tool and use it. We do not ask for an email address, password or payment details."
    },
    {
      question: "Which file formats are supported?",
      answer: "It depends on the tool. For example, the image tools work with common web formats such as JPG, PNG and WebP, and the PDF tools work with standard PDF files. The 'What it cannot do' section on each tool page lists its supported formats and limits, including file-size limits that depend on your device's memory."
    },
    {
      question: "Why does a result look different from what I expected?",
      answer: "Most often the input settings differ from what you assumed, such as the compounding frequency in a finance calculator, imperial instead of metric units, or the quality level in an image compressor. Read the 'How it works' and 'Worked example' sections on the tool page, then compare the example with your numbers."
    },
    {
      question: "Can I rely on the calculators for financial or health decisions?",
      answer: "Use them as estimates. Loan, SIP, GST and BMI calculators follow standard formulas, but real lenders, tax rules and medical assessments include factors a simple calculator cannot. For decisions that matter, check the result with your bank, a tax professional or a doctor. See the Disclaimer page."
    },
    {
      question: "Does it work on phones and tablets?",
      answer: "Yes. The site is responsive and the tools work in current versions of Chrome, Safari, Edge and Firefox. Very large files can be slow on older phones because processing happens on the device itself."
    },
    {
      question: "Can I use the results commercially?",
      answer: "Yes. Files and values you create with the tools belong to you. Make sure you have the right to use any source files you process, such as photos or documents created by other people."
    },
    {
      question: "How do I report a mistake or a broken tool?",
      answer: "Use the Contact page and tell us the tool, what you entered and what you expected. We check reports and correct confirmed errors."
    },
    {
      question: "Why are there ads on the site?",
      answer: "Ads pay for hosting and development so the tools can stay free. They are served by Google AdSense, are labelled 'Advertisement', and never sit inside a tool's controls or results. You can limit ad personalisation in Google Ads Settings."
    },
    {
      question: "How do I contact you?",
      answer: "Email support@utoolss.online or use the Contact page. We aim to reply within a couple of working days."
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
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        {/* Hero Header */}
        <section className="pt-28 pb-8 sm:pt-32 sm:pb-10 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <StickerBadge color="white" rotation={-2}>
              <HelpCircle className="w-3.5 h-3.5 text-primary" />
              Help & Support
            </StickerBadge>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="font-sans font-bold text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Find quick answers about privacy, browser execution, format support, and usage.
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-3xl flex-1">
          <div className="w-full space-y-3">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="group bg-white border-2 border-border rounded-3xl px-5 py-3 open:bg-accent" open={idx === 0}>
                    <summary className="cursor-pointer list-none font-display font-extrabold text-base sm:text-lg flex justify-between gap-3">
                      <span>{faq.question}</span>
                      <span aria-hidden className="text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="font-sans font-semibold text-base leading-relaxed text-foreground/85 pt-2">{faq.answer}</p>
                  </details>
                ))}
              </div>

          <div className="card-ink mt-8 p-6 bg-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-extrabold text-lg text-foreground">Still have questions?</h2>
              <p className="font-sans font-medium text-xs text-muted-foreground mt-0.5">
                Reach out to our developer team and we will help you out.
              </p>
            </div>
            <Link to="/contact" className="btn-blue text-xs sm:text-sm px-5 py-2.5">
              <span>Contact Team</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </SEOPage>
  );
};

export default FAQPage;
