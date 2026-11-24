import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOPage from "@/components/SEOPage";
import StickerBadge from "@/components/StickerBadge";
import { Mail, Clock, CheckCircle2, AlertCircle, HelpCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "feedback",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    const subject = encodeURIComponent(`[uTools.online] ${formData.subject}`);
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name} <${formData.email}>`);
    window.location.href = `mailto:support@utoolss.online?subject=${subject}&body=${body}`;
    setLoading(false);
    setSubmitted(true);
  };

  const breadcrumbs = [
    { name: "Home", url: "https://utoolss.online" },
    { name: "Contact Us", url: "https://utoolss.online/contact" },
  ];

  return (
    <SEOPage
      title="Contact Us - uTools.online Support & Feedback"
      description="Get in touch with the uTools.online team for support, feature requests, partnership inquiries, or general feedback. We respond within 24-48 hours."
      canonical="https://utoolss.online/contact"
      breadcrumbs={breadcrumbs}
      keywords="contact utools, support, feedback, bug report, feature request"
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
            <StickerBadge color="red" icon={<Mail className="w-3.5 h-3.5" />}>
              We're Here to Help
            </StickerBadge>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight">
              Get in Touch
            </h1>
            <p className="font-sans font-medium text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Have questions, feedback, or a tool request? We would love to hear from you.
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 max-w-5xl flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="bg-white border border-slate-200/90 p-5 sm:p-6 rounded-2xl shadow-studio space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200/80 text-primary flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-950">
                  Email Support
                </h3>
                <p className="font-sans font-medium text-xs sm:text-sm text-slate-500">
                  Send your inquiries directly to our developer team.
                </p>
                <a
                  href="mailto:support@utoolss.online"
                  className="font-mono font-semibold text-xs sm:text-sm text-secondary hover:underline block break-all pt-1"
                >
                  support@utoolss.online
                </a>
              </div>

              <div className="bg-white border border-slate-200/90 p-5 sm:p-6 rounded-2xl shadow-studio space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-950">
                  Response Window
                </h3>
                <p className="font-sans font-medium text-xs sm:text-sm text-slate-500">
                  We typically answer all emails within 24 to 48 hours.
                </p>
              </div>

              <div className="bg-white border border-slate-200/90 p-5 sm:p-6 rounded-2xl shadow-studio space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-600 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-950">
                  Quick Answers
                </h3>
                <p className="font-sans font-medium text-xs sm:text-sm text-slate-500">
                  Check our FAQ page for answers on privacy, limits, and supported formats.
                </p>
                <Link
                  to="/faq"
                  className="font-sans font-bold text-xs sm:text-sm text-secondary hover:underline block pt-1"
                >
                  Visit FAQ Center →
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-studio-lg">
                {submitted ? (
                  <div className="text-center py-10 space-y-3">
                    <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-slate-950">
                      Check your email app
                    </h3>
                    <p className="font-sans font-medium text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Your email app should have opened with the message ready to send. Press send there to reach us. If nothing opened, copy your message and email support@utoolss.online directly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "feedback", message: "" });
                      }}
                      className="btn-blue px-6 py-2.5 text-xs sm:text-sm font-semibold"
                    >
                      Write another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1 pb-1">
                      <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-950">
                        Send Us a Message
                      </h2>
                      <p className="font-sans font-medium text-xs sm:text-sm text-slate-500">
                        Fill out the form below and we will get back to you promptly.
                      </p>
                    </div>

                    {error && (
                      <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-800 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-name"
                          className="font-sans font-semibold text-xs text-slate-700"
                        >
                          Your Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full bg-slate-50/70 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm font-sans font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="font-sans font-semibold text-xs text-slate-700"
                        >
                          Your Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@example.com"
                          className="w-full bg-slate-50/70 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm font-sans font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-subject"
                        className="font-sans font-semibold text-xs text-slate-700"
                      >
                        Subject *
                      </label>
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-slate-50/70 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-sm font-sans font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                      >
                        <option value="feedback">General Feedback</option>
                        <option value="feature">Request a New Tool</option>
                        <option value="bug">Report a Bug / Error</option>
                        <option value="privacy">Privacy Question</option>
                        <option value="business">Advertising / Partnership</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-message"
                        className="font-sans font-semibold text-xs text-slate-700"
                      >
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we help you today? Please share as much detail as possible..."
                        className="w-full bg-slate-50/70 border border-slate-200/90 rounded-xl p-3.5 text-sm font-sans font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2 text-white"
                    >
                      <span>{loading ? "Sending..." : "Send Message"}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <section className="mt-10 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-studio space-y-4">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-slate-950">
              What to write to us about
            </h2>
            <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
              We read every message. The most useful ones tell us which tool or page you were using, what you entered, what you expected and what happened instead. A browser name and version helps when something does not load.
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-primary">
              <li className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
                <strong className="text-slate-900">Mistakes and corrections:</strong> a wrong formula, an unclear explanation or an outdated figure. Confirmed errors are fixed and the page is updated.
              </li>
              <li className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
                <strong className="text-slate-900">Tool problems:</strong> a tool that fails, produces a bad file or behaves differently from its description.
              </li>
              <li className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
                <strong className="text-slate-900">Privacy and data requests:</strong> questions about this site's Privacy Policy, cookies or ad personalisation. See the Privacy Policy for how to manage ads yourself.
              </li>
              <li className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
                <strong className="text-slate-900">Accessibility barriers:</strong> anything that is hard to use with a keyboard or assistive technology.
              </li>
              <li className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
                <strong className="text-slate-900">Copyright or content concerns:</strong> tell us the page and what you believe is a problem and we will review it promptly.
              </li>
              <li className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
                <strong className="text-slate-900">Ideas for tools or guides:</strong> we keep a list and build the ones that help the most people.
              </li>
            </ul>
            <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
              We cannot recover files for you, because files processed in your browser are never stored by us, and we cannot give personal financial, legal or medical advice. We aim to reply within two working days.
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </SEOPage>
  );
}
