import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Heart, Gavel, ShoppingBag, HeartHandshake, ExternalLink, Globe, Target, Users, Zap } from 'lucide-react';
import { useNews } from '../context/NewsContext';

const Careers = () => {
  const { language } = useNews();

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
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-radiance-gold/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black uppercase tracking-[0.3em] bg-radiance-gold/10 text-radiance-gold rounded-full border border-radiance-gold/20">
              {language === 'hi' ? 'हिंदुस्तान रेडिएंस में करियर' : 'Careers at Hindustan Radiance'}
            </span>
            <h1 className="text-5xl md:text-7xl font-sans font-black text-midnight tracking-tighter mb-8">
              {language === 'hi' ? 'डिजिटल पत्रकारिता के' : 'Join the Future of'} <br />
              <span className="text-radiance-gold">{language === 'hi' ? 'भविष्य से जुड़ें' : 'Digital Journalism'}</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed font-medium">
              {language === 'hi' 
                ? 'हम साहसी कहानीकारों, तकनीकी नवाचारकों और रचनात्मक विचारकों की तलाश कर रहे हैं ताकि हम सच्चाई को उजागर करने और दुनिया द्वारा समाचारों के उपभोग के तरीके को फिर से परिभाषित करने में हमारी मदद कर सकें।'
                : 'We are looking for bold storytellers, tech innovators, and creative thinkers to help us illuminate the truth and redefine how the world consumes news.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
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

      {/* Our Group Companies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
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
