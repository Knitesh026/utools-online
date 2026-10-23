import LegalPage from "@/components/LegalPage";

const PrivacyPolicy = () => (
  <LegalPage
    title="Privacy Policy"
    path="/privacy-policy"
    updated="October 23, 2026"
    description="How uTools.online handles your files, data, cookies and Google AdSense advertising, and the choices you have."
    intro="This policy explains what information uTools.online (the website at utoolss.online) handles when you use our tools and guides, how Google AdSense advertising works on the site, and the choices and rights you have. We have tried to keep it specific and short."
    sections={[
      {
        heading: "1. Files and data you put into the tools",
        paragraphs: [
          "Most tools, including the PDF, image, text, colour and calculator tools, process what you give them inside your browser. The file or text is held in your device's memory while you work and is not uploaded to our servers. Closing or reloading the page discards it.",
          "Each tool page describes how that tool works. If a tool ever needs to send data to a server to function, the page says so before you use it. We do not ask you to create an account, so we do not hold a profile about you.",
        ],
      },
      {
        heading: "2. Information collected automatically",
        paragraphs: [
          "Like most websites, the servers that deliver this site's pages may record technical data in standard logs: your IP address, browser and device type, the page requested, the referring page and the time. This is used to keep the site running, secure it and fix errors. Our hosting provider keeps these logs for a limited period.",
          "We do not currently run third-party analytics tools on the site. If that changes, this policy will be updated first.",
        ],
      },
      {
        heading: "3. Cookies and local storage",
        paragraphs: [
          "The site itself uses little or no cookie storage. Your browser may store small preference values locally so the site behaves consistently. Advertising partners set their own cookies as described below. The Cookie Policy lists the categories and how to control them.",
        ],
      },
      {
        heading: "4. Advertising and Google AdSense",
        paragraphs: [
          "uTools.online shows ads served by Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.",
          "Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.",
          "You can opt out of personalised advertising by visiting Google Ads Settings. You can also opt out of a third-party vendor's use of cookies for personalised advertising by visiting aboutads.info. Opting out does not remove ads; it makes them less relevant to you.",
          "Google may use cookies, device identifiers and similar technologies, and may collect information such as your IP address and the pages you view, to deliver, measure and protect ads. We do not receive your name or contact details from Google through this process.",
        ],
        links: [
          { label: "Google Ads Settings", href: "https://adssettings.google.com" },
          { label: "How Google uses information from sites that use its services", href: "https://policies.google.com/technologies/partner-sites" },
          { label: "How Google uses cookies in advertising", href: "https://policies.google.com/technologies/ads" },
          { label: "Opt out of third-party vendors at aboutads.info", href: "https://www.aboutads.info/choices/" },
          { label: "Your Online Choices (EU/UK)", href: "https://www.youronlinechoices.com/" },
        ],
      },
      {
        heading: "5. Visitors in the EEA, United Kingdom and Switzerland",
        paragraphs: [
          "If you visit from the European Economic Area, the United Kingdom or Switzerland, ad cookies and similar technologies are used only with your consent, which you can give, refuse or change through the consent message shown on the site. You can reopen your choices at any time from the privacy settings link in the footer where it is available, or by clearing this site's cookies.",
          "Where we or our partners process personal data, the legal bases are your consent (advertising cookies) and our legitimate interest in operating and securing the site (server logs).",
        ],
      },
      {
        heading: "6. Your rights",
        paragraphs: [
          "Depending on where you live, you may have the right to access, correct or delete personal data held about you, to object to or restrict processing, to withdraw consent, and to complain to your data protection authority. Because we do not hold account data, most requests relate to server logs. Email us and we will respond within a reasonable time.",
        ],
      },
      {
        heading: "7. United States state privacy laws",
        paragraphs: [
          "We do not sell personal information in exchange for money and we do not knowingly share it except through the advertising technology described above. Residents of states with privacy laws, such as California, can use the opt-out tools in section 4 and can contact us about their rights.",
        ],
      },
      {
        heading: "8. Children",
        paragraphs: [
          "The site is a general-audience utility site and is not directed to children under 13 (or under 16 where local law sets that age). We do not knowingly collect personal information from children. If you believe a child has provided personal data, contact us and we will remove it.",
        ],
      },
      {
        heading: "9. Other services the site loads",
        bullets: [
          "Google Fonts: page text is displayed using fonts loaded from Google's servers, which means your browser contacts Google when a page loads.",
          "Google AdSense: described in section 4.",
          "Links to other websites: if you follow a link from our pages, that site's own privacy policy applies.",
        ],
      },
      {
        heading: "10. Security and retention",
        paragraphs: [
          "The site is served over HTTPS. Because files are processed on your device, they are not stored by us. Server logs are kept only as long as needed for security and operations, then deleted or anonymised.",
        ],
      },
      {
        heading: "11. Changes to this policy",
        paragraphs: [
          "We will change this page when our practices change and update the date at the top. Material changes will be highlighted on the site.",
        ],
      },
      {
        heading: "12. Contact",
        paragraphs: ["Email support@utoolss.online with any privacy question or request."],
      },
    ]}
  />
);

export default PrivacyPolicy;
