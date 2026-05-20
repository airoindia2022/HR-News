import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  PlusCircle, 
  CheckCircle2, 
  Trash2, 
  Pencil, 
  LogOut, 
  ArrowLeft,
  Image as ImageIcon,
  Video,
  FileText,
  History,
  Send,
  XCircle
} from 'lucide-react';
import api from '../utils/api';

const AdminDashboard = () => {
  const [news, setNews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Latest stories',
    newsCategory: 'General',
    author: 'Hindustan Radiance Editorial',
    image: '',
    video: '',
    isBreaking: false
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [latestEpaper, setLatestEpaper] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [epaperMessage, setEpaperMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'published'
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
      console.error('Error fetching news', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      if (name === 'imageFile') setSelectedFile(files[0]);
      if (name === 'videoFile') setSelectedVideoFile(files[0]);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditingId(item._id);
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category || 'Latest stories',
      newsCategory: item.newsCategory || 'General',
      author: item.author || 'Hindustan Radiance Editorial',
      image: item.image || '',
      video: item.video || '',
      isBreaking: item.isBreaking || false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      title: '',
      content: '',
      category: 'Latest stories',
      newsCategory: 'General',
      author: 'Hindustan Radiance Editorial',
      image: '',
      video: '',
      isBreaking: false
    });
    setSelectedFile(null);
    setSelectedVideoFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      const data = new FormData();
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      // Append files if they exist
      if (selectedFile) {
        data.append('image', selectedFile);
      } else if (formData.image) {
        data.append('imageUrl', formData.image);
      }

      if (selectedVideoFile) {
        data.append('video', selectedVideoFile);
      } else if (formData.video) {
        data.append('videoUrl', formData.video);
      }

      if (isEditing) {
        await api.put(`/api/news/${editingId}`, data, {
          headers: { 'x-auth-token': token }
        });
        setMessage('News updated successfully!');
      } else {
        await api.post('/api/news', data, {
          headers: { 'x-auth-token': token }
        });
        setMessage('News published successfully!');
      }

      cancelEdit();
      fetchNews();
    } catch (err) {
      console.error('Submission error:', err);
      setMessage(err.response?.data?.error || 'Error processing news.');
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
          <h2 className="text-2xl font-sans text-radiance-gold font-bold">HR <span className="text-radiance-gold">ADMIN</span></h2>
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">Hindustan Radiance</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link to="/" className="p-4 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl flex items-center gap-3 font-medium text-sm transition-all cursor-pointer mb-6 border border-slate-800/50">
            <ArrowLeft size={20} />
            Back to Website
          </Link>

          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full p-4 rounded-xl flex items-center gap-3 font-bold text-sm transition-all ${activeTab === 'overview' ? 'bg-radiance-gold/10 text-radiance-gold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={20} />
            Dashboard Overview
          </button>
          <button 
            onClick={() => setActiveTab('published')}
            className={`w-full p-4 rounded-xl flex items-center gap-3 font-bold text-sm transition-all ${activeTab === 'published' ? 'bg-radiance-gold/10 text-radiance-gold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Newspaper size={20} />
            Published Stories
          </button>
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
      <main className="flex-1 ml-72 p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'overview' ? (
            <>
              <header className="flex justify-between items-center mb-10">
                <div>
                  <h1 className="text-3xl font-sans font-black text-slate-900">
                    {isEditing ? 'Edit News Article' : 'Publish News'}
                  </h1>
                  <p className="text-slate-500 mt-1">
                    {isEditing ? 'Update the selected story details.' : 'Add new stories to the editorial feed.'}
                  </p>
                </div>
                <div className="flex gap-4">
                  {isEditing && (
                    <button
                      onClick={cancelEdit}
                      className="px-6 py-3 bg-white border border-red-200 text-red-500 rounded-2xl shadow-sm flex items-center gap-2 font-bold text-xs uppercase tracking-wider hover:bg-red-50 transition-colors"
                    >
                      <XCircle size={18} />
                      Cancel Edit
                    </button>
                  )}
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
                      {isEditing ? <Pencil className="text-radiance-gold" size={24} /> : <PlusCircle className="text-radiance-gold" size={24} />}
                      <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">
                        {isEditing ? 'Update Article Details' : 'New Editorial Entry'}
                      </h3>
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
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                            Article Title <span className="text-red-500">*</span>
                          </label>
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                              Editorial Section <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-radiance-gold/10 focus:border-radiance-gold outline-none transition-all font-semibold text-slate-800"
                            >
                              <option value="Headline">Headline (Hero)</option>
                              <option value="Trending now">Trending Now</option>
                              <option value="Latest stories">Latest Stories</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                              News Category <span className="text-slate-300 font-normal">(Optional)</span>
                            </label>
                            <select
                              name="newsCategory"
                              value={formData.newsCategory}
                              onChange={handleChange}
                              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-radiance-gold/10 focus:border-radiance-gold outline-none transition-all font-semibold text-slate-800"
                            >
                              <option value="General">General</option>
                              <option value="World">World</option>
                              <option value="Politics">Politics</option>
                              <option value="Business">Business</option>
                              <option value="Technology">Technology</option>
                              <option value="Sports">Sports</option>
                              <option value="Culture">Culture</option>
                              <option value="Features">Features</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                          Main Content <span className="text-slate-300 font-normal">(Optional)</span>
                        </label>
                        <textarea
                          name="content"
                          value={formData.content}
                          onChange={handleChange}
                          placeholder="Write the full story here..."
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-radiance-gold/10 focus:border-radiance-gold outline-none transition-all font-medium text-slate-700 min-h-[300px]"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                              Featured Image URL <span className="text-slate-300 font-normal">(Optional)</span>
                            </label>
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
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                              OR Upload Image <span className="text-slate-300 font-normal">(Optional)</span>
                            </label>
                            <input
                              type="file"
                              name="imageFile"
                              onChange={handleChange}
                              accept="image/*"
                              className="w-full px-4 py-3 bg-white border border-dashed border-slate-300 rounded-2xl text-xs font-bold text-slate-500 cursor-pointer hover:border-radiance-gold transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-radiance-gold/10 file:text-radiance-gold hover:file:bg-radiance-gold/20"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                              Featured Video URL <span className="text-slate-300 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                              <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                              <input
                                type="text"
                                name="video"
                                value={formData.video}
                                onChange={handleChange}
                                placeholder="https://youtube.com/watch?v=..."
                                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-radiance-gold/10 focus:border-radiance-gold outline-none transition-all font-medium text-slate-700"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                              OR Upload Video <span className="text-slate-300 font-normal">(Optional)</span>
                            </label>
                            <input
                              type="file"
                              name="videoFile"
                              onChange={handleChange}
                              accept="video/*"
                              className="w-full px-4 py-3 bg-white border border-dashed border-slate-300 rounded-2xl text-xs font-bold text-slate-500 cursor-pointer hover:border-radiance-gold transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-radiance-gold/10 file:text-radiance-gold hover:file:bg-radiance-gold/20"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 
                      <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                        <input
                          type="checkbox"
                          id="isBreaking"
                          name="isBreaking"
                          checked={formData.isBreaking}
                          onChange={handleChange}
                          className="w-5 h-5 rounded accent-radiance-gold cursor-pointer"
                        />
                        <label htmlFor="isBreaking" className="text-sm font-bold text-slate-700 cursor-pointer uppercase tracking-wider">Mark as Breaking News</label>
                      </div>
                      */}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-70 group"
                      >
                        {loading ? (isEditing ? 'Updating Article...' : 'Publishing Article...') : (
                          <>
                            {isEditing ? 'Update Story on Live Feed' : 'Publish Story to Live Feed'}
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
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="p-2 text-slate-300 hover:text-radiance-gold transition-colors"
                                  title="Edit Article"
                                >
                                  <Pencil size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                  title="Delete Article"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </>
          ) : (
            <>
              {/* Published Stories Tab Content */}
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h1 className="text-4xl font-sans font-black text-slate-900 tracking-tight mb-2">Published Stories</h1>
                  <p className="text-slate-500 font-medium">Manage and edit all your published news articles.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('overview')}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
                >
                  Post New Story
                </button>
              </div>

              {/* News List */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-800">All Published Articles</h3>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {news.length} Total
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-[700px] overflow-y-auto">
                  {news.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 font-medium">No stories found.</div>
                  ) : (
                    news.map((item) => (
                      <div key={item._id} className="p-6 hover:bg-slate-50 transition-colors group flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                            {item.video ? (
                              <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white">
                                <Video size={20} />
                              </div>
                            ) : (
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-radiance-gold mb-1 block">
                              {item.newsCategory || item.category}
                            </span>
                            <h4 className="font-bold text-slate-800 line-clamp-1 mb-1">{item.title}</h4>
                            <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                              <span>{new Date(item.date).toLocaleDateString()}</span>
                              <span className="text-slate-300">•</span>
                              <span>By {item.author}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button 
                            onClick={() => {
                              handleEdit(item);
                              setActiveTab('overview');
                            }}
                            className="p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-radiance-gold hover:text-white hover:border-radiance-gold transition-all shadow-sm"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item._id)}
                            className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
