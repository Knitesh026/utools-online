import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOPage } from "@/components/SEOPage";
import { faqSchema } from "@/lib/seoHelpers";
import StickerBadge from "@/components/StickerBadge";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const faqs = [
    {
      question: "What is uTools.online?",
      answer:
        "uTools.online is a set of free web tools for everyday tasks: working with PDFs and images, counting and reversing text, picking colours and gradients, generating QR codes, passwords and IDs, and calculating loans, SIP returns, GST, BMI, age and unit conversions. Each tool page explains how it works, and the Guides section covers the ideas behind the tools in more depth.",
    },
    {
      question: "Are all tools really free?",
      answer:
        "Yes. There are no accounts, quotas, trial periods or watermarks. The site is paid for by advertising from Google AdSense, which is labelled and kept separate from the tools. See the Advertising Disclosure page for details.",
    },
    {
      question: "Are my files uploaded to your servers?",
      answer:
        "For the file and image tools, no. They use your browser's own processing (Canvas, WebAssembly and JavaScript libraries), so the file stays in your device's memory and is gone when you close the tab. Each tool page says how it works. Our Privacy Policy explains the small amount of information that servers and advertising partners can see, such as your IP address.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No. Open any tool and use it. We do not ask for an email address, password or payment details.",
    },
    {
      question: "Which file formats are supported?",
      answer:
        "It depends on the tool. For example, the image tools work with common web formats such as JPG, PNG and WebP, and the PDF tools work with standard PDF files. The 'What it cannot do' section on each tool page lists its supported formats and limits, including file-size limits that depend on your device's memory.",
    },
    {
      question: "Why does a result look different from what I expected?",
      answer:
        "Most often the input settings differ from what you assumed, such as the compounding frequency in a finance calculator, imperial instead of metric units, or the quality level in an image compressor. Read the 'How it works' and 'Worked example' sections on the tool page, then compare the example with your numbers.",
    },
    {
      question: "Can I rely on the calculators for financial or health decisions?",
      answer:
        "Use them as estimates. Loan, SIP, GST and BMI calculators follow standard formulas, but real lenders, tax rules and medical assessments include factors a simple calculator cannot. For decisions that matter, check the result with your bank, a tax professional or a doctor. See the Disclaimer page.",
    },
    {
      question: "Does it work on phones and tablets?",
      answer:
        "Yes. The site is responsive and the tools work in current versions of Chrome, Safari, Edge and Firefox. Very large files can be slow on older phones because processing happens on the device itself.",
    },
    {
      question: "Can I use the results commercially?",
      answer:
        "Yes. Files and values you create with the tools belong to you. Make sure you have the right to use any source files you process, such as photos or documents created by other people.",
    },
    {
      question: "How do I report a mistake or a broken tool?",
      answer:
        "Use the Contact page and tell us the tool, what you entered and what you expected. We check reports and correct confirmed errors.",
    },
    {
      question: "Why are there ads on the site?",
      answer:
        "Ads pay for hosting and development so the tools can stay free. They are served by Google AdSense, are labelled 'Advertisement', and never sit inside a tool's controls or results. You can limit ad personalisation in Google Ads Settings.",
    },
    {
      question: "How do I contact you?",
      answer:
        "Email support@utoolss.online or use the Contact page. We aim to reply within a couple of working days.",
    },
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
        <section className="relative pt-28 pb-10 sm:pt-36 sm:pb-12 px-4 sm:px-6 text-center border-b border-slate-200/70 bg-white/60 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-studio-grid [mask-image:radial-gradient(ellipse_80%_75%_at_50%_10%,#000_45%,transparent_100%)] pointer-events-none"
          />
          <div className="max-w-3xl mx-auto space-y-3.5 relative z-10">
            <StickerBadge color="red" icon={<HelpCircle className="w-3.5 h-3.5" />}>
              Help & Support
            </StickerBadge>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="font-sans font-medium text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Find quick answers about privacy, browser execution, format support, and usage.
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 max-w-3xl flex-1">
          <div className="w-full space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white border border-slate-200/90 rounded-2xl px-5 py-4 shadow-hard-sm open:border-primary/30 open:shadow-studio transition-all"
                open={idx === 0}
              >
                <summary className="cursor-pointer list-none font-display font-bold text-base sm:text-lg text-slate-950 flex justify-between gap-3">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden
                    className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-sm leading-none group-open:rotate-45 group-open:bg-slate-900 group-open:text-white transition-all"
                  >
                    +
                  </span>
                </summary>
                <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600 pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 p-6 sm:p-8 bg-slate-950 text-white rounded-2xl shadow-hard-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                Still have questions?
              </h2>
              <p className="font-sans font-normal text-xs sm:text-sm text-slate-300 mt-0.5">
                Reach out to our developer team and we will help you out.
              </p>
            </div>
            <Link to="/contact" className="btn-primary text-xs sm:text-sm px-5 py-2.5 text-white">
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
