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

    // There is no server-side inbox behind this form, so hand the message to the visitor's own email app.
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
        <section className="pt-28 pb-8 sm:pt-32 sm:pb-10 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <StickerBadge color="white" rotation={-2}>
              <Mail className="w-3.5 h-3.5 text-primary" />
              We're Here to Help
            </StickerBadge>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground tracking-tight">
              Get in Touch
            </h1>
            <p className="font-sans font-bold text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Have questions, feedback, or a tool request? We would love to hear from you.
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-5xl flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="card-ink bg-white p-5 rounded-2xl space-y-2">
                <div className="w-10 h-10 rounded-xl bg-primary border-2 border-border flex items-center justify-center shadow-hard-sm">
                  <Mail className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-display font-extrabold text-base text-foreground">Email Support</h3>
                <p className="font-sans font-medium text-xs text-muted-foreground">
                  Send your inquiries directly to our developer team.
                </p>
                <a
                  href="mailto:support@utoolss.online"
                  className="font-sans font-extrabold text-xs text-blue hover:underline block break-all pt-1"
                >
                  support@utoolss.online
                </a>
              </div>

              <div className="card-ink bg-white p-5 rounded-2xl space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#a3e635] border-2 border-border flex items-center justify-center shadow-hard-sm">
                  <Clock className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-display font-extrabold text-base text-foreground">Response Window</h3>
                <p className="font-sans font-medium text-xs text-muted-foreground">
                  We typically answer all emails within 24 to 48 hours.
                </p>
              </div>

              <div className="card-ink bg-white p-5 rounded-2xl space-y-2">
                <div className="w-10 h-10 rounded-xl bg-pink border-2 border-border flex items-center justify-center shadow-hard-sm">
                  <HelpCircle className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-display font-extrabold text-base text-foreground">Quick Answers</h3>
                <p className="font-sans font-medium text-xs text-muted-foreground">
                  Check our FAQ page for answers on privacy, limits, and supported formats.
                </p>
                <Link to="/faq" className="font-sans font-extrabold text-xs text-blue hover:underline block pt-1">
                  Visit FAQ Center →
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-ink bg-white p-6 sm:p-8 rounded-3xl">
                {submitted ? (
                  <div className="text-center py-10 space-y-3">
                    <div className="w-14 h-14 bg-primary border-2 border-border text-foreground rounded-2xl flex items-center justify-center mx-auto shadow-hard-sm">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-foreground">Check your email app</h3>
                    <p className="font-sans font-bold text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                      Your email app should have opened with the message ready to send. Press send there to reach us. If nothing opened, copy your message and email support@utoolss.online directly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "feedback", message: "" });
                      }}
                      className="btn-blue px-6 py-2.5 text-xs font-bold"
                    >
                      Write another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="font-display font-extrabold text-xl text-foreground">Send Us a Message</h2>
                      <p className="font-sans font-medium text-xs text-muted-foreground">
                        Fill out the form below and we will get back to you promptly.
                      </p>
                    </div>

                    {error && (
                      <div className="p-3 bg-pink border-2 border-border rounded-xl text-xs font-bold text-foreground flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-foreground">Your Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full bg-background border-2 border-border rounded-xl px-3.5 py-2 text-xs sm:text-sm font-sans font-bold text-foreground focus:outline-none focus:bg-white shadow-hard-sm transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-foreground">Your Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@example.com"
                          className="w-full bg-background border-2 border-border rounded-xl px-3.5 py-2 text-xs sm:text-sm font-sans font-bold text-foreground focus:outline-none focus:bg-white shadow-hard-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans font-bold text-xs text-foreground">Subject *</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-background border-2 border-border rounded-xl px-3.5 py-2 text-xs sm:text-sm font-sans font-bold text-foreground focus:outline-none focus:bg-white shadow-hard-sm transition-all"
                      >
                        <option value="feedback">General Feedback</option>
                        <option value="feature">Request a New Tool</option>
                        <option value="bug">Report a Bug / Error</option>
                        <option value="privacy">Privacy Question</option>
                        <option value="business">Advertising / Partnership</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans font-bold text-xs text-foreground">Message *</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we help you today? Please share as much detail as possible..."
                        className="w-full bg-background border-2 border-border rounded-xl p-3.5 text-xs sm:text-sm font-sans font-bold text-foreground focus:outline-none focus:bg-white shadow-hard-sm transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-blue w-full py-3 text-sm font-bold flex items-center justify-center gap-2"
                    >
                      <span>{loading ? "Sending..." : "Send Message"}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <section className="mt-12 max-w-3xl space-y-4">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">What to write to us about</h2>
            <p className="font-sans font-semibold text-base leading-relaxed text-foreground/85">
              We read every message. The most useful ones tell us which tool or page you were using, what you entered, what you expected and what happened instead. A browser name and version helps when something does not load.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-primary">
              <li className="font-sans font-semibold text-base leading-relaxed text-foreground/85"><strong>Mistakes and corrections:</strong> a wrong formula, an unclear explanation or an outdated figure. Confirmed errors are fixed and the page is updated.</li>
              <li className="font-sans font-semibold text-base leading-relaxed text-foreground/85"><strong>Tool problems:</strong> a tool that fails, produces a bad file or behaves differently from its description.</li>
              <li className="font-sans font-semibold text-base leading-relaxed text-foreground/85"><strong>Privacy and data requests:</strong> questions about this site's Privacy Policy, cookies or ad personalisation. See the Privacy Policy for how to manage ads yourself.</li>
              <li className="font-sans font-semibold text-base leading-relaxed text-foreground/85"><strong>Accessibility barriers:</strong> anything that is hard to use with a keyboard or assistive technology.</li>
              <li className="font-sans font-semibold text-base leading-relaxed text-foreground/85"><strong>Copyright or content concerns:</strong> tell us the page and what you believe is a problem and we will review it promptly.</li>
              <li className="font-sans font-semibold text-base leading-relaxed text-foreground/85"><strong>Ideas for tools or guides:</strong> we keep a list and build the ones that help the most people.</li>
            </ul>
            <p className="font-sans font-semibold text-base leading-relaxed text-foreground/85">
              We cannot recover files for you, because files processed in your browser are never stored by us, and we cannot give personal financial, legal or medical advice. We aim to reply within two working days.
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </SEOPage>
  );
}
