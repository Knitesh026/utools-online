import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
          
          <div className="prose dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to uTools.online ("we," "us," "our," or "Company"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains our information practices, what types of information we collect, how we use it, and the rights you have regarding your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">2. Information We Collect</h2>
              <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">2.1 Information You Provide</h3>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you voluntarily provide when you use our tools and services, such as:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Input data you upload or enter into our tools (e.g., images, documents, text)</li>
                <li>Account information if you create an account</li>
                <li>Contact information when you reach out to us</li>
                <li>Feedback and support requests</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">2.2 Automatically Collected Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you visit our website, we automatically collect certain information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Device information (browser type, IP address, device type)</li>
                <li>Usage data (pages visited, time spent, features used)</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Referral information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing and completing transactions</li>
                <li>Sending technical notices and support messages</li>
                <li>Responding to your inquiries and requests</li>
                <li>Analyzing usage patterns to optimize our website</li>
                <li>Detecting and preventing fraudulent or illegal activities</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">4. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website uses Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ad Settings or the Network Advertising Initiative opt-out page.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We also use Google Analytics to understand how users interact with our website. Google Analytics uses cookies to collect information about your visits. Google's privacy practices are described in their Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You can request deletion of your data by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">7. Your Rights and Choices</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on your location, you may have rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The right to access your information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to delete your information</li>
                <li>The right to opt-out of marketing communications</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">8. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences. Note that disabling cookies may affect some functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">9. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected information from a child under 13 without parental consent, we will delete such information promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">10. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have data protection laws that differ from your home country. By using our website, you consent to such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <p className="text-muted-foreground">
                  Email: contact@utools.online<br/>
                  Website: uTools.online
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">12. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website and updating the "Last Updated" date. Your continued use of our website constitutes your acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section>
              <p className="text-sm text-muted-foreground mt-8">
                Last Updated: January 17, 2026
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
