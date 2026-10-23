import LegalPage from "@/components/LegalPage";

const AdvertisingDisclosure = () => (
  <LegalPage
    title="Advertising Disclosure"
    path="/advertising-disclosure"
    updated="October 23, 2026"
    description="How advertising supports uTools.online, how ads are labelled and kept separate from tools, and how to control or report ads."
    intro="uTools.online is free to use and is funded by advertising. This page explains how that works and what we do to keep ads from getting in your way."
    sections={[
      {
        heading: "Who serves the ads",
        paragraphs: [
          "Ads on this site are served by Google AdSense. Google chooses which ads to show, based on the content of the page and, where you allow it, your browsing activity. We do not choose individual advertisers and we have no control over a specific ad's content.",
        ],
      },
      {
        heading: "How ads are presented",
        bullets: [
          "Ads are labelled \"Advertisement\" and sit apart from tools, results and guide text.",
          "We do not place ads over buttons, inside results or in menus, and we do not use pop-ups, pop-unders or redirects.",
          "We never ask you to click an ad. Clicking your own ads, or asking others to, is against Google's policies and ours.",
        ],
      },
      {
        heading: "Editorial independence",
        paragraphs: [
          "Advertisers do not influence our tools, calculations or guides. We do not publish sponsored articles or paid reviews, and we do not accept payment to rank or recommend a tool.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You can turn off personalised ads in Google Ads Settings, manage cookies in your browser, and, in the EEA, the UK and Switzerland, choose your consent options in the consent message. See the Cookie Policy and Privacy Policy for details.",
        ],
        links: [{ label: "Google Ads Settings", href: "https://adssettings.google.com" }],
      },
      {
        heading: "Reporting a problem ad",
        paragraphs: [
          "If you see an ad that is misleading, inappropriate or broken, use the ad's own report control (the small i or X icon in the corner of the ad), or email us the page address and a description so we can pass it to Google.",
        ],
      },
    ]}
  />
);

export default AdvertisingDisclosure;
