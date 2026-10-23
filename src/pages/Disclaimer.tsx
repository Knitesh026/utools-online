import LegalPage from "@/components/LegalPage";

const Disclaimer = () => (
  <LegalPage
    title="Disclaimer"
    path="/disclaimer"
    updated="October 23, 2026"
    description="Important limits on the calculators, converters and guides on uTools.online: general information only, not professional advice."
    intro="Everything on uTools.online is provided for general information and convenience. Please read these limits before relying on a result."
    sections={[
      {
        heading: "Calculators are estimates",
        paragraphs: [
          "The EMI, SIP, mortgage, GST, PPP, BMI, age and unit calculators apply standard formulas to the numbers you enter. Real loans, investments and tax bills depend on lender fees, rate changes, payment timing, rounding rules and laws that a general calculator cannot know. Investment returns are never guaranteed and a SIP calculator shows a projection, not a forecast.",
        ],
      },
      {
        heading: "Not professional advice",
        paragraphs: [
          "Nothing on this site is financial, investment, tax, legal or medical advice. A BMI figure is a screening measure and does not diagnose anything. For decisions that matter, consult a qualified professional or the official source, such as your lender, your tax authority or your doctor.",
        ],
      },
      {
        heading: "File and image tools",
        paragraphs: [
          "Converters and editors can change a file's quality, layout or format. Keep an original copy before processing anything important, and check the output before you send or publish it. Electronic signatures created with our tools may not meet the legal requirements for every document or jurisdiction.",
        ],
      },
      {
        heading: "Accuracy of content",
        paragraphs: [
          "We check formulas and examples before publishing, but errors can happen and rules change, for example tax rates and browser features. If you find a mistake, please tell us through the Contact page and we will correct it.",
        ],
      },
      {
        heading: "External links and advertising",
        paragraphs: [
          "Ads are provided by Google AdSense and links may lead to other websites. We do not control or endorse them and are not responsible for their content or practices.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "Use of the site is at your own risk. To the extent permitted by law, uTools.online is not liable for losses arising from the use of, or inability to use, its tools and content.",
        ],
      },
    ]}
  />
);

export default Disclaimer;
