import React from 'react';
import { motion } from 'framer-motion';
import { useNews } from '../context/NewsContext';
import Header from './Header';
import Footer from './Footer';

const LegalPageLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-parchment">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-sans font-black text-midnight mb-12 tracking-tighter">
            {title}
          </h1>
          <div className="text-slate-700 space-y-8 text-lg leading-relaxed">
            {children}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export const PrivacyPolicy = () => {
  const { language } = useNews();
  
  const content = language === 'hi' ? (
    <>
      <p className="mb-6">हिंदुस्तान रेडिएंस में, हम आपकी गोपनीयता का सम्मान करते हैं। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट पर जाते हैं तो हम आपकी जानकारी कैसे एकत्र, उपयोग और सुरक्षित करते हैं।</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">1. जानकारी जो हम एकत्र करते हैं</h2>
      <p className="mb-6">हम व्यक्तिगत जानकारी एकत्र कर सकते हैं जो आप हमें स्वेच्छा से प्रदान करते हैं, जैसे कि आपका नाम और ईमेल पता जब आप हमारे समाचार पत्र की सदस्यता लेते हैं।</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">2. हम आपकी जानकारी का उपयोग कैसे करते हैं</h2>
      <p className="mb-6">हम आपकी जानकारी का उपयोग हमारे समाचार पत्र भेजने, आपके अनुभव को निजीकृत करने और हमारी सामग्री को बेहतर बनाने के लिए करते हैं।</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">3. डेटा सुरक्षा</h2>
      <p className="mb-6">हम आपकी जानकारी की सुरक्षा सुनिश्चित करने के लिए विभिन्न सुरक्षा उपायों को लागू करते हैं।</p>
    </>
  ) : (
    <>
      <p className="mb-6">At Hindustan Radiance, we respect your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">1. Information We Collect</h2>
      <p className="mb-6">We may collect personal information that you voluntarily provide to us, such as your name and email address when you subscribe to our newsletter.</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">2. How We Use Your Information</h2>
      <p className="mb-6">We use your information to send our newsletters, personalize your experience, and improve our content.</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">3. Data Security</h2>
      <p className="mb-6">We implement a variety of security measures to maintain the safety of your information.</p>
    </>
  );

  return (
    <LegalPageLayout title={language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}>
      {content}
    </LegalPageLayout>
  );
};

export const TermsOfService = () => {
  const { language } = useNews();

  const content = language === 'hi' ? (
    <>
      <p className="mb-6">हमारी वेबसाइट का उपयोग करके, आप इन सेवा की शर्तों का पालन करने के लिए सहमत होते हैं।</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">1. सामग्री का उपयोग</h2>
      <p className="mb-6">इस वेबसाइट पर सभी सामग्री हिंदुस्तान रेडिएंस की संपत्ति है। आप हमारी पूर्व अनुमति के बिना हमारी सामग्री का पुनरुत्पादन नहीं कर सकते।</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">2. उपयोगकर्ता आचरण</h2>
      <p className="mb-6">आप हमारी वेबसाइट का उपयोग केवल कानूनी उद्देश्यों के लिए करने के लिए सहमत हैं।</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">3. दायित्व की सीमा</h2>
      <p className="mb-6">हिंदुस्तान रेडिएंस हमारी वेबसाइट के उपयोग से उत्पन्न होने वाले किसी भी नुकसान के लिए उत्तरदायी नहीं होगा।</p>
    </>
  ) : (
    <>
      <p className="mb-6">By using our website, you agree to comply with these Terms of Service.</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">1. Use of Content</h2>
      <p className="mb-6">All content on this website is the property of Hindustan Radiance. You may not reproduce our content without our prior permission.</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">2. User Conduct</h2>
      <p className="mb-6">You agree to use our website only for lawful purposes.</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">3. Limitation of Liability</h2>
      <p className="mb-6">Hindustan Radiance shall not be liable for any damages arising from the use of our website.</p>
    </>
  );

  return (
    <LegalPageLayout title={language === 'hi' ? 'सेवा की शर्तें' : 'Terms of Service'}>
      {content}
    </LegalPageLayout>
  );
};

export const CookiePolicy = () => {
  const { language } = useNews();

  const content = language === 'hi' ? (
    <>
      <p className="mb-6">यह कुकी नीति बताती है कि हम अपनी वेबसाइट पर कुकीज़ का उपयोग कैसे करते हैं।</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">1. कुकीज़ क्या हैं?</h2>
      <p className="mb-6">कुकीज़ छोटी टेक्स्ट फाइलें होती हैं जो आपके ब्राउज़र में स्टोर होती हैं ताकि आपके अनुभव को बेहतर बनाया जा सके।</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">2. हम कुकीज़ का उपयोग क्यों करते हैं?</h2>
      <p className="mb-6">हम कुकीज़ का उपयोग साइट ट्रैफ़िक का विश्लेषण करने और आपकी प्राथमिकताओं को याद रखने के लिए करते हैं।</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">3. कुकीज़ प्रबंधित करना</h2>
      <p className="mb-6">आप अपनी ब्राउज़र सेटिंग्स के माध्यम से कुकीज़ को अक्षम करना चुन सकते हैं।</p>
    </>
  ) : (
    <>
      <p className="mb-6">This Cookie Policy explains how we use cookies on our website.</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">1. What are Cookies?</h2>
      <p className="mb-6">Cookies are small text files stored in your browser to improve your experience.</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">2. Why We Use Cookies?</h2>
      <p className="mb-6">We use cookies to analyze site traffic and remember your preferences.</p>
      <h2 className="text-2xl font-bold text-midnight mt-10 mb-4 tracking-tight">3. Managing Cookies</h2>
      <p className="mb-6">You can choose to disable cookies through your browser settings.</p>
    </>
  );

  return (
    <LegalPageLayout title={language === 'hi' ? 'कुकी नीति' : 'Cookie Policy'}>
      {content}
    </LegalPageLayout>
  );
};
