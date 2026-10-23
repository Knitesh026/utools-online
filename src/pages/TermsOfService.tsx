import LegalPage from "@/components/LegalPage";

const TermsOfService = () => (
  <LegalPage
    title="Terms of Service"
    path="/terms-of-service"
    updated="October 23, 2026"
    description="The terms that apply when you use uTools.online: acceptable use, your content, accuracy of results, advertising and liability."
    intro="By using uTools.online you agree to these terms. They are short on purpose. If you do not agree, please do not use the site."
    sections={[
      {
        heading: "1. The service",
        paragraphs: [
          "uTools.online provides free online tools and educational guides. We may change, add or remove tools and content at any time, and we do not promise that every tool will be available without interruption.",
        ],
      },
      {
        heading: "2. Acceptable use",
        bullets: [
          "Use the tools only for lawful purposes and only with files and data you have the right to use.",
          "Do not try to disrupt, overload, scrape at high volume, or reverse engineer the site in a way that harms it or other visitors.",
          "Do not use the tools to create or distribute malware, to infringe someone else's rights, or to deceive people.",
          "Do not click ads on this site for any reason other than genuine interest, and do not ask others to.",
        ],
      },
      {
        heading: "3. Your files and content",
        paragraphs: [
          "You keep all rights to the files and text you process. Most tools run in your browser, so your content stays on your device. You are responsible for backing up anything important and for checking results before relying on them.",
        ],
      },
      {
        heading: "4. Accuracy of results",
        paragraphs: [
          "Calculators and converters use standard methods and we describe each method on its page, but results are estimates for general information. They are not financial, tax, legal or medical advice. Verify anything important with a qualified professional or the relevant institution. See the Disclaimer for more.",
        ],
      },
      {
        heading: "5. Advertising and third-party services",
        paragraphs: [
          "The site shows ads served by Google AdSense and loads fonts from Google Fonts. Those services have their own terms and privacy practices. We are not responsible for the content of ads or of sites you reach through them or through links on our pages.",
        ],
      },
      {
        heading: "6. Intellectual property",
        paragraphs: [
          "The site's design, text, guides and code are owned by uTools.online or its licensors. You may link to our pages and quote short excerpts with attribution. Please do not copy guides or tool descriptions wholesale or republish them as your own.",
        ],
      },
      {
        heading: "7. No warranty and limitation of liability",
        paragraphs: [
          "The site is provided as is and as available, without warranties of any kind. To the extent allowed by law, uTools.online is not liable for any loss or damage, including lost data, arising from your use of the tools or from reliance on results.",
        ],
      },
      {
        heading: "8. Changes and contact",
        paragraphs: [
          "We may update these terms; the date above shows the latest version, and continued use means you accept the update. Questions: support@utoolss.online.",
        ],
      },
    ]}
  />
);

export default TermsOfService;
