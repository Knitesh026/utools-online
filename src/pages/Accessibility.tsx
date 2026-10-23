import LegalPage from "@/components/LegalPage";

const Accessibility = () => (
  <LegalPage
    title="Accessibility Statement"
    path="/accessibility"
    updated="October 23, 2026"
    description="How uTools.online approaches accessibility, what we have done so far, known limitations and how to report a barrier."
    intro="We want everyone to be able to use uTools.online, including people who use keyboards, screen readers, magnification or other assistive technology. This page describes what we do, where we fall short and how to tell us about a problem."
    sections={[
      {
        heading: "What we do",
        bullets: [
          "Pages use semantic HTML: one main heading per page, ordered section headings, lists for lists, and labelled form fields.",
          "Navigation, tool controls, menus and the FAQ can be used with a keyboard, and focus is shown with a visible outline.",
          "Text has strong contrast against its background and can be zoomed to 200% without losing content.",
          "Animation is minimal and is switched off for visitors who ask their device to reduce motion.",
          "Guides and tool explanations are plain text, so they work with reader modes and screen readers.",
        ],
      },
      {
        heading: "Known limitations",
        bullets: [
          "Some tools rely on visual interaction, for example cropping an image, drawing a signature or placing a blur zone. Where possible we provide numeric alternatives, but not every tool has one yet.",
          "Third-party advertising is provided by Google and we cannot control its accessibility.",
          "We have not had the site audited by an external accessibility specialist. Our checks so far are our own.",
        ],
      },
      {
        heading: "Standard we aim for",
        paragraphs: [
          "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 level AA wherever it applies to the tools and content we publish. This is a goal we are working toward, not a certification.",
        ],
      },
      {
        heading: "Tell us about a barrier",
        paragraphs: [
          "If something on the site is hard or impossible to use, please email support@utoolss.online with the page address, what you were trying to do and the browser or assistive technology you use. We aim to reply within a few working days and to fix confirmed barriers as soon as we can.",
        ],
      },
    ]}
  />
);

export default Accessibility;
