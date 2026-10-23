import LegalPage from "@/components/LegalPage";

const CookiePolicy = () => (
  <LegalPage
    title="Cookie Policy"
    path="/cookie-policy"
    updated="October 23, 2026"
    description="Which cookies and similar technologies uTools.online and its advertising partner Google use, why, and how to control them."
    intro="Cookies are small files that a website stores in your browser. This page lists what is used on uTools.online and how you can control it."
    sections={[
      {
        heading: "Strictly necessary and preference storage",
        paragraphs: [
          "The site may store small values in your browser's local storage, for example a remembered setting. These do not identify you and are not shared with advertisers. You can clear them at any time in your browser settings.",
        ],
      },
      {
        heading: "Advertising cookies (Google AdSense)",
        paragraphs: [
          "Google and its partners set cookies and use similar identifiers to show ads, limit how often you see the same ad, measure ad performance, and, where you have allowed it, personalise ads based on your activity on this and other sites. Cookies with names such as __gads and __gpi are typical examples. The exact cookies are controlled by Google and may change.",
          "Where required by law, for example in the EEA, the UK and Switzerland, these cookies are set only after you consent.",
        ],
      },
      {
        heading: "Fonts",
        paragraphs: [
          "Fonts are loaded from Google Fonts. This is a request to Google's servers when a page loads; it is not used to show you ads.",
        ],
      },
      {
        heading: "How to control cookies",
        bullets: [
          "Use the consent message on the site to accept, refuse or change advertising choices where it is shown.",
          "Block or delete cookies in your browser settings. Blocking all cookies does not stop the tools from working; ads may become less relevant or fail to load.",
          "Turn off ad personalisation in Google Ads Settings.",
          "Opt out of participating vendors' personalised advertising at aboutads.info or youronlinechoices.com.",
        ],
        links: [
          { label: "Google Ads Settings", href: "https://adssettings.google.com" },
          { label: "aboutads.info choices", href: "https://www.aboutads.info/choices/" },
          { label: "Your Online Choices", href: "https://www.youronlinechoices.com/" },
          { label: "How Google uses cookies", href: "https://policies.google.com/technologies/cookies" },
        ],
      },
      {
        heading: "Changes",
        paragraphs: ["If the cookies we use change, we will update this page and its date."],
      },
    ]}
  />
);

export default CookiePolicy;
