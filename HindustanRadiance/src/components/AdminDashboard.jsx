import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  LogOut,
  Newspaper,
  TrendingUp,
  History,
  Image as ImageIcon,
  Send,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  FileText
} from 'lucide-react';

const AdminDashboard = () => {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Latest stories',
    author: 'Hindustan Radiance Editorial',
    image: '',
    excerpt: '',
    isBreaking: false
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [latestEpaper, setLatestEpaper] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [epaperMessage, setEpaperMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/contact/admin');
    }
    fetchNews();
    fetchLatestEpaper();
  }, [navigate]);

  const fetchLatestEpaper = async () => {
    try {
      const res = await api.get('/api/epaper/latest');
      setLatestEpaper(res.data);
    } catch (err) {
      console.error('Error fetching latest epaper', err);
    }
  };

  const fetchNews = async () => {
    try {
      const res = await api.get('/api/news?all=true');
      setNews(res.data);
    } catch (err) {
      console.error('Publish Error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'imageFile') {
      setSelectedFile(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');

      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      if (selectedFile) {
        data.append('image', selectedFile);
      } else if (formData.image) {
        data.append('imageUrl', formData.image);
      }

      await api.post('/api/news', data, {
        headers: {
          'x-auth-token': token
          // Content-Type is set automatically by the browser for FormData
        }
      });

      setMessage('News published successfully!');
      setFormData({
        title: '',
        content: '',
        category: 'Latest stories',
        author: 'Hindustan Radiance Editorial',
        image: '',
        excerpt: '',
        isBreaking: false
      });
      setSelectedFile(null);
      fetchNews();
    } catch (err) {
      console.error('Publishing error:', err);
      setMessage(err.response?.data?.error || 'Error publishing news.');
    } finally {
      setLoading(false);
    }
  };

  const handlePdfUpload = async (e) => {
    e.preventDefault();
    if (!selectedPdf) return;
    setLoading(true);
    setEpaperMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      const data = new FormData();
      data.append('pdf', selectedPdf);

      await api.post('/api/epaper', data, {
        headers: { 'x-auth-token': token }
      });
      setEpaperMessage('E-paper published successfully!');
      setSelectedPdf(null);
      fetchLatestEpaper();
    } catch (err) {
      setEpaperMessage('Error publishing E-paper.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEpaper = async (id) => {
    if (window.confirm('Are you sure you want to delete this E-paper?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await api.delete(`/api/epaper/${id}`, {
          headers: { 'x-auth-token': token }
        });
        setLatestEpaper(null);
        setEpaperMessage('E-paper deleted successfully!');
      } catch (err) {
        console.error('Error deleting epaper', err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await api.delete(`/api/news/${id}`, {
          headers: { 'x-auth-token': token }
        });
        fetchNews();
      } catch (err) {
        console.error('Error deleting news', err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/contact/admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col fixed h-full">
        <div className="p-8">
          <h2 className="text-2xl font-sans font-bold">HR <span className="text-radiance-gold">ADMIN</span></h2>
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">Hindustan Radiance</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link to="/" className="p-4 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl flex items-center gap-3 font-medium text-sm transition-all cursor-pointer mb-6 border border-slate-800/50">
            <ArrowLeft size={20} />
            Back to Website
          </Link>

          <div className="p-4 bg-radiance-gold/10 text-radiance-gold rounded-xl flex items-center gap-3 font-bold text-sm">
            <LayoutDashboard size={20} />
            Dashboard Overview
          </div>
          <div className="p-4 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl flex items-center gap-3 font-medium text-sm transition-all cursor-pointer">
            <Newspaper size={20} />
            Published Stories
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full p-4 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl flex items-center gap-3 font-bold text-sm transition-all"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-sans font-bold text-slate-900">Publish News</h1>
            <p className="text-slate-500 mt-1">Add new stories to the editorial feed.</p>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">System Live</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Post Form */}
          <section className="xl:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <PlusCircle className="text-radiance-gold" size={24} />
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">New Editorial Entry</h3>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {message && (
                  <div className={`p-4 rounded-2xl flex items-center gap-3 font-medium ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    <CheckCircle2 size={20} />
                    {message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Article Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter a compelling headline..."
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-radiance-gold/10 focus:border-radiance-gold outline-none transition-all font-semibold text-slate-800"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Editorial Section</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-radiance-gold/10 focus:border-radiance-gold outline-none transition-all font-semibold text-slate-800"
                    >
                      <option value="Headline">Headline</option>
                      <option value="Trending now">Trending Now</option>
                      <option value="Latest stories">Latest Stories</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Summary (Excerpt)</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Brief summary for preview cards..."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-radiance-gold/10 focus:border-radiance-gold outline-none transition-all font-medium text-slate-700 h-20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Main Content</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write the full story here..."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-radiance-gold/10 focus:border-radiance-gold outline-none transition-all font-medium text-slate-700 min-h-[300px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Featured Image URL</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text"
                          name="image"
                          value={formData.image}
                          onChange={handleChange}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-radiance-gold/10 focus:border-radiance-gold outline-none transition-all font-medium text-slate-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">OR Upload from Local System</label>
                      <input
                        type="file"
                        name="imageFile"
                        onChange={handleChange}
                        accept="image/*"
                        className="w-full px-4 py-3 bg-white border border-dashed border-slate-300 rounded-2xl text-xs font-bold text-slate-500 cursor-pointer hover:border-radiance-gold transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-radiance-gold/10 file:text-radiance-gold hover:file:bg-radiance-gold/20"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-8 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl">
                    <input
                      type="checkbox"
                      name="isBreaking"
                      id="isBreaking"
                      checked={formData.isBreaking}
                      onChange={handleChange}
                      className="w-5 h-5 rounded accent-radiance-gold cursor-pointer"
                    />
                    <label htmlFor="isBreaking" className="text-sm font-bold text-slate-700 cursor-pointer uppercase tracking-wider">Mark as Breaking News</label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-70 group"
                >
                  {loading ? 'Publishing Article...' : (
                    <>
                      Publish Story to Live Feed
                      <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>

          {/* E-paper Section */}
          <section className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <FileText className="text-radiance-gold" size={20} />
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">E-paper Publish</h3>
              </div>

              <div className="p-6">
                <p className="text-xs text-slate-500 mb-4 font-medium">Upload today's digital edition (PDF format).</p>
                <form onSubmit={handlePdfUpload} className="space-y-4">
                  {epaperMessage && (
                    <div className={`p-3 rounded-xl text-[10px] font-bold uppercase tracking-wider ${epaperMessage.includes('success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {epaperMessage}
                    </div>
                  )}
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setSelectedPdf(e.target.files[0])}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-radiance-gold/10 file:text-radiance-gold hover:file:bg-radiance-gold/20"
                  />
                  <button
                    type="submit"
                    disabled={loading || !selectedPdf}
                    className="w-full py-3 bg-radiance-gold text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Uploading...' : 'Publish PDF'}
                  </button>
                </form>

                {latestEpaper && (
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Live E-Paper</p>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-radiance-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FileText className="text-radiance-gold" size={20} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 truncate">{latestEpaper.title}</h4>
                          <p className="text-[10px] text-slate-500">{new Date(latestEpaper.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEpaper(latestEpaper._id)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                        title="Delete E-paper"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <History className="text-radiance-gold" size={20} />
                  <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">Recent Activities</h3>
                </div>
              </div>

              <div className="divide-y divide-slate-100 max-h-[800px] overflow-y-auto">
                {news.length === 0 ? (
                  <div className="p-10 text-center text-slate-400 italic">No articles published yet.</div>
                ) : (
                  news.map((item) => (
                    <div key={item._id} className="p-6 hover:bg-slate-50 transition-colors group">
                      <div className="flex gap-4">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=200'}
                          alt=""
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${item.category === 'Headline' ? 'bg-red-100 text-red-600' :
                              item.category === 'Trending now' ? 'bg-blue-100 text-blue-600' :
                                'bg-slate-100 text-slate-600'
                            }`}>
                            {item.category}
                          </span>
                          <h4 className="font-bold text-slate-800 truncate mt-1">{item.title}</h4>
                          <p className="text-[10px] text-slate-400 font-medium mt-1">{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
