import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Gavel, 
  ShoppingBag, 
  HeartHandshake, 
  ExternalLink, 
  Globe, 
  Target, 
  Users, 
  Zap,
  BookOpen,
  Camera,
  Laptop,
  AlertTriangle,
  Mail,
  Send,
  CheckCircle2,
  Infinity,
  Eye
} from 'lucide-react';
import { useNews } from '../context/NewsContext';

const Careers = () => {
  const { language } = useNews();
  const [activeRoleTab, setActiveRoleTab] = useState('editorial');

  const coreValues = [
    {
      title: language === 'hi' ? 'बिना समझौते के गति' : 'Speed without Sacrifice',
      desc: language === 'hi' ? 'सबसे पहले खबर देना, सबसे सही रिपोर्ट करना।' : 'First to break it, rightest to report it.',
      icon: <Zap className="w-5 h-5 text-radiance-gold" />
    },
    {
      title: language === 'hi' ? 'पाठक सर्वोपरि' : 'Audience First',
      desc: language === 'hi' ? 'हम पाठकों के लिए लिखते हैं, एसईओ बॉट्स के लिए नहीं।' : 'We write for the reader, not for SEO bots.',
      icon: <Users className="w-5 h-5 text-radiance-gold" />
    },
    {
      title: language === 'hi' ? 'पूर्ण पारदर्शिता' : 'Radical Transparency',
      desc: language === 'hi' ? 'हम अपनी गलतियों को खुलकर सुधारते हैं और तेजी से सीखते हैं।' : 'We correct mistakes loudly and learn faster.',
      icon: <Eye className="w-5 h-5 text-radiance-gold" />
    },
    {
      title: language === 'hi' ? '24/7 मानसिकता' : '24/7 Mindset',
      desc: language === 'hi' ? 'समाचार कभी थमता नहीं, लेकिन हम आपके कार्य-जीवन संतुलन का सम्मान करते हैं।' : "News doesn't clock out, but we respect your work life balance.",
      icon: <Infinity className="w-5 h-5 text-radiance-gold" />
    }
  ];

  const jobRoles = {
    editorial: {
      title: language === 'hi' ? 'संपादकीय (इंजन)' : 'Editorial (The Engine)',
      icon: <BookOpen className="w-5 h-5" />,
      roles: [
        { title: language === 'hi' ? 'ब्रेकिंग न्यूज रिपोर्टर' : 'Breaking News Reporter', desc: language === 'hi' ? 'सुबह 3 बजे की उपलब्धता आवश्यक' : 'Needs 3 AM availability' },
        { title: language === 'hi' ? 'फीचर लेखक / लॉन्गफॉर्म' : 'Feature Writer / Longform', desc: language === 'hi' ? 'कथा शैली आवश्यक' : 'Needs narrative skill' },
        { title: language === 'hi' ? 'कॉपी एडिटर / तथ्य जांचकर्ता' : 'Copy Editor / Fact Checker', desc: language === 'hi' ? 'सूक्ष्म विवरणों पर अत्यधिक ध्यान' : 'Needs OCD level attention' },
        { title: language === 'hi' ? 'ओपिनियन / स्तंभकार' : 'Opinion / Columnist', desc: language === 'hi' ? 'एक विशिष्ट दृष्टिकोण और शैली' : 'Needs a unique voice' },
        { title: language === 'hi' ? 'खोजी पत्रकार' : 'Investigative Journalist', desc: language === 'hi' ? 'धैर्य और कानूनी ज्ञान आवश्यक' : 'Needs patience & legal knowledge' }
      ]
    },
    visual: {
      title: language === 'hi' ? 'दृश्य और उत्पादन (चमक)' : 'Visual & Production (The Polish)',
      icon: <Camera className="w-5 h-5" />,
      roles: [
        { title: language === 'hi' ? 'वीडियो पत्रकार' : 'Video Journalist', desc: language === 'hi' ? 'शूट, कट, प्रकाशित करें' : 'Shoot, cut, publish' },
        { title: language === 'hi' ? 'सोशल मीडिया मैनेजर' : 'Social Media Manager', desc: language === 'hi' ? 'समाचार को थ्रेड्स/रील्स में बदलें' : 'Turn news into threads/reels' },
        { title: language === 'hi' ? 'ग्राफिक डिजाइनर' : 'Graphic Designer', desc: language === 'hi' ? 'मानचित्र, चार्ट, मीम्स' : 'Maps, charts, memes' },
        { title: language === 'hi' ? 'फोटोग्राफर' : 'Photographer', desc: language === 'hi' ? 'ताजा खबरें और पोर्ट्रेट' : 'Spot news & portraits' }
      ]
    },
    tech: {
      title: language === 'hi' ? 'ग्रोथ और टेक' : 'Growth & Tech',
      icon: <Laptop className="w-5 h-5" />,
      roles: [
        { title: language === 'hi' ? 'एसईओ विशेषज्ञ' : 'SEO Specialist', desc: language === 'hi' ? 'खोज के इरादे को समझना' : 'Understanding search intent' },
        { title: language === 'hi' ? 'न्यूजलेटर संपादक' : 'Newsletter Editor', desc: language === 'hi' ? 'दैनिक सारांश' : 'The daily digest' },
        { title: language === 'hi' ? 'डेटा विश्लेषक' : 'Data Analyst', desc: language === 'hi' ? 'पाठकों की क्लिकिंग का विश्लेषण' : 'What are readers actually clicking?' },
        { title: language === 'hi' ? 'फुल स्टैक डेवलपर' : 'Full Stack Developer', desc: language === 'hi' ? 'गति एक महत्वपूर्ण रैंकिंग कारक है' : 'Speed is a ranking factor' }
      ]
    }
  };

  const companies = [
    {
      name: "Artificial Intelligence & Robotics Organisation",
      sector: language === 'hi' ? 'शिक्षा' : 'Education',
      link: "https://airoindia.net",
      icon: <GraduationCap className="w-6 h-6" />,
      description: language === 'hi' 
        ? 'उन्नत एआई और रोबोटिक्स शिक्षा के माध्यम से प्रौद्योगिकी के भविष्य को अग्रणी बनाना।'
        : 'Pioneering the future of technology through advanced AI and robotics education.',
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Shubh Vivah",
      sector: language === 'hi' ? 'वैवाहिक साइट' : 'Matrimonial Site',
      link: "https://shubhvivah.org.in",
      icon: <Heart className="w-6 h-6" />,
      description: language === 'hi'
        ? 'विश्वास और परंपरा के साथ आत्माओं को जोड़ना और स्थायी रिश्ते बनाना।'
        : 'Connecting souls and building lasting relationships with trust and tradition.',
      color: "from-pink-500 to-rose-600"
    },
    {
      name: "Integrity Legal Center",
      sector: language === 'hi' ? 'कानूनी केंद्र' : 'Legal Center',
      link: "https://www.integritylegalcentre.in",
      icon: <Gavel className="w-6 h-6" />,
      description: language === 'hi'
        ? 'विशेषज्ञ कानूनी समाधान प्रदान करना और अटूट अखंडता के साथ न्याय सुनिश्चित करना।'
        : 'Providing expert legal solutions and ensuring justice with unwavering integrity.',
      color: "from-slate-600 to-slate-800"
    },
    {
      name: "Nav Nirman Welfare Society",
      sector: language === 'hi' ? 'एनजीओ/चैरिटी' : 'NGO/Charity',
      link: "https://www.navnirmanwelfaresociety.in",
      icon: <HeartHandshake className="w-6 h-6" />,
      description: language === 'hi'
        ? 'समर्पित सेवा के माध्यम से समुदायों को सशक्त बनाना और सामाजिक प्रभाव पैदा करना।'
        : 'Empowering communities and creating social impact through dedicated service.',
      color: "from-emerald-500 to-teal-600"
    },
    {
      name: "Jobscenter India",
      sector: language === 'hi' ? 'नौकरियों के लिए' : 'For Jobs',
      link: "https://jobscenterindia.com",
      icon: <Briefcase className="w-6 h-6" />,
      description: language === 'hi'
        ? 'देश भर में प्रतिभा और अवसर के बीच की खाई को पाटना।'
        : 'Bridging the gap between talent and opportunity across the nation.',
      color: "from-blue-600 to-cyan-600"
    },
    {
      name: "Bazaar India",
      sector: language === 'hi' ? 'खरीदारी के लिए' : 'For Shopping',
      link: "https://bazaarindia.org",
      icon: <ShoppingBag className="w-6 h-6" />,
      description: language === 'hi'
        ? 'प्रीमियम खरीदारी के अनुभव और गुणवत्तापूर्ण उत्पादों के लिए आपका अंतिम गंतव्य।'
        : 'Your ultimate destination for premium shopping experiences and quality products.',
      color: "from-amber-500 to-orange-600"
    }
  ];

  const stats = [
    { label: language === 'hi' ? 'वैश्विक पहुंच' : 'Global Reach', value: "10M+", icon: <Globe size={20} /> },
    { label: language === 'hi' ? 'टीम के सदस्य' : 'Team Members', value: "500+", icon: <Users size={20} /> },
    { label: language === 'hi' ? 'प्रोजेक्ट्स पूर्ण' : 'Projects Done', value: "1.2K+", icon: <Target size={20} /> },
    { label: language === 'hi' ? 'नवाचार दर' : 'Innovation Rate', value: "98%", icon: <Zap size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-parchment">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-radiance-gold/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black uppercase tracking-[0.3em] bg-radiance-gold/10 text-radiance-gold rounded-full border border-radiance-gold/20">
              {language === 'hi' ? 'हिंदुस्तान रेडिएंस में शामिल हों' : 'Join Hindustan Radiance'}
            </span>
            <h1 className="text-5xl md:text-7xl font-sans font-black text-midnight tracking-tighter mb-8 uppercase">
              Join the <span className="text-radiance-gold">Hunt</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-700 leading-relaxed font-semibold font-serif italic border-l-4 border-radiance-gold pl-6 text-left my-8">
              {language === 'hi' 
                ? '"हेडलाइंस तेजी से बदलती हैं। हम भी। हम ऐसे कहानीकारों की तलाश में हैं जो दूसरों से पीछे रहने से नफरत करते हैं, तथ्य जांचकर्ता जो एक आंख खुली रखकर सोते हैं, और डिजाइनर जो डेटा को सुंदर बनाते हैं। यदि आप केवल रिपोर्ट करने के बजाय समाचार के एजेंडे को आकार देना चाहते हैं—तो आपको अपना घर मिल गया है।"'
                : '"Headlines move fast. So do we. We are looking for storytellers who hate being scooped, fact checkers who sleep with one eye open, and designers who make data beautiful. If you want to shape the news agenda—not just report it—you’ve found your home."'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-black text-midnight uppercase tracking-tight">
            {language === 'hi' ? 'हमारे मुख्य मूल्य' : 'Core Values'}
          </h2>
          <div className="w-16 h-1 bg-radiance-gold mx-auto mt-4 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-radiance-gold/10 flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="font-bold text-midnight text-lg mb-2">{value.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group hover:border-radiance-gold/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 text-radiance-gold flex items-center justify-center mb-4 group-hover:bg-radiance-gold group-hover:text-white transition-all">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-midnight mb-1">{stat.value}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Job Roles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sans font-black text-midnight uppercase tracking-tight">
            {language === 'hi' ? 'भूमिकाएं और रिक्तियां' : 'Job Roles'}
          </h2>
          <div className="w-16 h-1 bg-radiance-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-4 mb-12">
          {Object.keys(jobRoles).map((key) => (
            <button
              key={key}
              onClick={() => setActiveRoleTab(key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${
                activeRoleTab === key 
                  ? 'bg-midnight text-white border-midnight shadow-md' 
                  : 'bg-white border-slate-200 text-slate-500 hover:border-radiance-gold hover:text-radiance-gold'
              }`}
            >
              {jobRoles[key].icon}
              {jobRoles[key].title}
            </button>
          ))}
        </div>

        {/* Roles Display */}
        <motion.div 
          key={activeRoleTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {jobRoles[activeRoleTab].roles.map((role, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-radiance-gold/20 transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-midnight mb-2">{role.title}</h3>
                <p className="text-slate-500 font-medium text-sm mb-4 leading-relaxed">{role.desc}</p>
              </div>
              <a 
                href="mailto:hindustanradiance@gmail.com?subject=Application%20for%20Job%20Role"
                className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-radiance-gold hover:text-midnight transition-colors"
              >
                {language === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'} &rarr;
              </a>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Editorial Warning / Callout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-radiance-gold/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
            <div className="p-4 bg-radiance-gold/20 text-radiance-gold rounded-2xl flex-shrink-0 animate-pulse">
              <AlertTriangle size={36} />
            </div>
            <div>
              <h3 className="text-2xl font-black font-sans text-radiance-gold uppercase tracking-widest mb-4">
                {language === 'hi' ? 'समाचार कोई 9 से 5 की नौकरी नहीं है' : 'News is not a 9 to 5 job'}
              </h3>
              <p className="text-slate-300 font-medium leading-relaxed mb-6">
                {language === 'hi' 
                  ? 'हम चुनावों, मानसून और आधी रात को सर्वर क्रैश के दौरान भी काम करते हैं। आप एक हेडलाइन को 12 बार दोबारा लिखेंगे। लेकिन आप कहानी टूटने के एक घंटे के भीतर Google समाचार पर अपनी बायलाइन भी देखेंगे।'
                  : 'We work during elections, monsoons, and midnight server crashes. You will rewrite a headline 12 times. But you will also see your byline on Google News within an hour of a story breaking.'}
              </p>
              <div className="text-slate-400 font-black text-sm uppercase tracking-wider">
                {language === 'hi' ? 'यदि आप अनुमानित काम चाहते हैं, तो यह आपके लिए नहीं है। यदि आप प्रभाव चाहते हैं, तो आवेदन करें।' : 'If you want predictable work, this isn\'t it. If you want impact, apply.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internship & Freelance & Apply */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Academy & Freelancers */}
        <div className="space-y-8">
          {/* Internships Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent -mr-8 -mt-8 rounded-full" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <GraduationCap size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {language === 'hi' ? 'प्रशिक्षु कार्यक्रम' : 'Internship Program'}
                </span>
                <h3 className="text-xl font-bold text-midnight">
                  {language === 'hi' ? 'द न्यूज़रूम एकेडमी' : 'The Newsroom Academy'}
                </h3>
              </div>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed text-sm">
              {language === 'hi' 
                ? 'आप केवल कॉफी नहीं लाएंगे। आप साक्षात्कारों का ट्रांसक्रिप्शन करेंगे, स्रोतों की जांच करेंगे और होमपेज के लिए कहानियां पिच करेंगे। 3 महीने के अंत में, आपके पास 10 प्रकाशित क्लिपों का एक पोर्टफोलियो होगा।'
                : 'You will not fetch coffee. You will transcribe interviews, fact check sources, and pitch stories for the homepage. At the end of 3 months, you will have a portfolio of 10 published clips.'}
            </p>
          </div>

          {/* Freelance Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50 to-transparent -mr-8 -mt-8 rounded-full" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Send size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {language === 'hi' ? 'मुक्त सहयोग' : 'Open Collaboration'}
                </span>
                <h3 className="text-xl font-bold text-midnight">
                  {language === 'hi' ? 'फ्रीलांस / स्ट्रिंगर्स' : 'Freelance / Stringers'}
                </h3>
              </div>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed text-sm">
              {language === 'hi'
                ? 'हमेशा घटनाओं के स्थल पर रहते हैं? हम प्रति रिपोर्ट, फोटो या टिप-ऑफ पर भुगतान करते हैं। आइए मिलकर काम करें और स्वतंत्र रूप से अपनी कहानियां भेजें।'
                : 'Always on the scene? We pay per story, per photo, and per tip-off. Let\'s collaborate and pitch your independent pitches to us.'}
            </p>
          </div>
        </div>

        {/* Right: Apply Card */}
        <div className="bg-white border border-radiance-gold/20 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-radiance-gold/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-radiance-gold/10 text-radiance-gold rounded-2xl">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black font-sans text-midnight uppercase tracking-tighter">
                  {language === 'hi' ? 'आवेदन करने के लिए' : 'To Apply'}
                </h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                  {language === 'hi' ? 'हमसे आज ही संपर्क करें' : 'Get in touch today'}
                </p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  {language === 'hi' ? 'ईमेल भेजें:' : 'Send Email to:'}
                </span>
                <a 
                  href="mailto:hindustanradiance@gmail.com?subject=Application%20for%20Job%20Role"
                  className="inline-flex items-center gap-2 text-radiance-gold font-sans font-black text-lg md:text-xl border-b border-dashed border-radiance-gold/40 hover:border-radiance-gold transition-all"
                >
                  hindustanradiance@gmail.com
                </a>
                <p className="text-xs text-slate-500 font-medium mt-2">
                  {language === 'hi' ? 'विषय पंक्ति में अपनी इच्छित भूमिका का उल्लेख करें।' : 'Mention the role name in the subject line.'}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
                  {language === 'hi' ? 'कृपया संलग्न करें:' : 'Please attach:'}
                </span>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm font-medium text-slate-600">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{language === 'hi' ? '1. बायोडाटा (अधिकतम 1 पृष्ठ)' : '1. Resume (1 page max).'}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-slate-600">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{language === 'hi' ? '2. आपके सर्वोत्तम कार्य के तीन लिंक' : '2. Three links to your best work.'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <a 
            href="mailto:hindustanradiance@gmail.com?subject=Application%20for%20Job%20Role"
            className="w-full py-4 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-lg transition-all text-center block"
          >
            {language === 'hi' ? 'ईमेल भेजें' : 'Send Application'}
          </a>
        </div>
      </section>

      {/* Our Group Companies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-sans font-black text-midnight tracking-tight mb-4">
              {language === 'hi' ? 'हमारा विविध' : 'Our Diverse'} <span className="text-radiance-gold">{language === 'hi' ? 'पारिस्थितिकी तंत्र' : 'Ecosystem'}</span>
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              {language === 'hi'
                ? 'हिंदुस्तान रेडिएंस विभिन्न क्षेत्रों में उत्कृष्टता के लिए प्रतिबद्ध संगठनों के एक बड़े परिवार का हिस्सा है। हमारी समूह कंपनियों का अन्वेषण करें और खोजें कि आप कहाँ फिट बैठते हैं।'
                : 'Hindustan Radiance is part of a larger family of organizations committed to excellence across various sectors. Explore our group companies and find where you belong.'}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-1 bg-radiance-gold rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company, idx) => (
            <motion.a
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${company.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -mr-16 -mt-16 rounded-full`} />
              
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${company.color} text-white shadow-lg shadow-current/20`}>
                    {company.icon}
                  </div>
                  <ExternalLink size={20} className="text-slate-300 group-hover:text-radiance-gold transition-colors" />
                </div>
                
                <div className="mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-radiance-gold mb-2 block">
                    {company.sector}
                  </span>
                  <h3 className="text-xl font-bold text-midnight group-hover:text-radiance-gold transition-colors">
                    {company.name}
                  </h3>
                </div>
                
                <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                  {company.description}
                </p>
                
                <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-midnight transition-colors">
                  {language === 'hi' ? 'वेबसाइट देखें' : 'Visit Website'} <div className="ml-2 w-0 group-hover:w-8 h-[2px] bg-radiance-gold transition-all duration-300" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
