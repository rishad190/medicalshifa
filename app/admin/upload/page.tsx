'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

export default function AdminUploadPage() {
  const [contentType, setContentType] = useState<'Service' | 'Blog Post' | 'Partner'>('Service');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General Consultation');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<'Draft' | 'Public'>('Draft');
  
  // Tags State
  const [tags, setTags] = useState<string[]>(['Cardiology', 'Wellness']);
  const [tagInput, setTagInput] = useState('');

  // Image Upload State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Publish Status
  const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'published'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handlePublish = async () => {
    setPublishStatus('publishing');
    setError(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType,
          title,
          category,
          duration,
          description,
          image: imagePreview,
          tags,
          visibility,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to publish content');
      }

      setPublishStatus('published');
      setTimeout(() => {
        setPublishStatus('idle');
        // Clear form
        setTitle('');
        setDuration('');
        setDescription('');
        setImagePreview(null);
        setTags(['Cardiology', 'Wellness']);
      }, 2000);
    } catch (err: any) {
      setPublishStatus('idle');
      setError(err.message || 'An error occurred while publishing.');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-on-surface -mt-20">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/20 flex flex-col py-6 px-4 shrink-0 hidden md:flex sticky top-20 h-[calc(100vh-5rem)]">
        <div className="mb-8 px-4">
          <p className="text-xs font-bold uppercase tracking-wider text-outline">Management Portal</p>
        </div>
        <nav className="flex-1 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-slate-100 hover:text-primary transition-all text-sm font-semibold cursor-pointer">
            <span className="material-symbols-outlined text-lg">dashboard</span>
            <span>Dashboard</span>
          </button>
          <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold cursor-pointer ${
            contentType === 'Service' ? 'text-primary bg-primary/5' : 'text-on-surface-variant hover:bg-slate-100 hover:text-primary'
          }`} onClick={() => setContentType('Service')}>
            <span className="material-symbols-outlined text-lg">medical_services</span>
            <span>Services</span>
          </button>
          <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold cursor-pointer ${
            contentType === 'Blog Post' ? 'text-primary bg-primary/5' : 'text-on-surface-variant hover:bg-slate-100 hover:text-primary'
          }`} onClick={() => setContentType('Blog Post')}>
            <span className="material-symbols-outlined text-lg">article</span>
            <span>Blog Posts</span>
          </button>
          <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold cursor-pointer ${
            contentType === 'Partner' ? 'text-primary bg-primary/5' : 'text-on-surface-variant hover:bg-slate-100 hover:text-primary'
          }`} onClick={() => setContentType('Partner')}>
            <span className="material-symbols-outlined text-lg">handshake</span>
            <span>Partners</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-slate-100 hover:text-primary transition-all text-sm font-semibold cursor-pointer">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            <span>Appointments</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-slate-100 hover:text-primary transition-all text-sm font-semibold cursor-pointer mt-auto">
            <span className="material-symbols-outlined text-lg">settings</span>
            <span>Settings</span>
          </button>
          <button 
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/5 transition-all text-sm font-bold cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span>Sign Out</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-6 md:p-12 max-w-[1200px] mx-auto">
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-10">
          <div>
            <nav className="flex gap-2 text-xs font-semibold text-outline mb-2 uppercase tracking-wide">
              <span>Content Management</span>
              <span>/</span>
              <span className="text-primary">{contentType} Upload</span>
            </nav>
            <h2 className="font-headline-md text-headline-md text-on-surface">Upload New Content</h2>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 rounded-xl font-bold text-sm text-outline border border-outline-variant hover:bg-slate-100 transition-all cursor-pointer">
              Discard
            </button>
            <button 
              onClick={handlePublish}
              disabled={publishStatus === 'publishing'}
              className="px-8 py-2.5 rounded-xl font-bold text-sm text-on-primary bg-primary hover:bg-primary/95 transition-all shadow-lg hover:shadow-primary/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">
                {publishStatus === 'publishing' ? 'hourglass_empty' : 'publish'}
              </span>
              {publishStatus === 'publishing' ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Info banners */}
        {publishStatus === 'published' && (
          <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl text-primary font-bold text-sm mb-8 flex items-center gap-3 animate-pulse">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <span>Content successfully published to Shifa global registry!</span>
          </div>
        )}

        {error && (
          <div className="bg-error-container/10 border border-error/20 p-4 rounded-xl text-error font-bold text-sm mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-xl">error</span>
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Primary inputs Form */}
          <div className="lg:col-span-8 space-y-8">
            {/* Content Type Selector */}
            <div className="glass-panel p-1.5 rounded-2xl inline-flex gap-1 shadow-sm border border-outline-variant/30 bg-white">
              {(['Service', 'Blog Post', 'Partner'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setContentType(type)}
                  className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    contentType === type
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:bg-slate-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Input fields Card */}
            <div className="glass-panel p-8 rounded-3xl shadow-sm border border-outline-variant/20 bg-white space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-outline uppercase tracking-wider">Title</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`e.g. Specialized ${contentType === 'Service' ? 'Cardiac Consultation' : contentType === 'Blog Post' ? 'Oncology Breakpoint Guide' : 'Hospital Partner'}`}
                  className="w-full text-lg md:text-xl font-headline-md border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all bg-transparent py-4 placeholder:text-outline-variant/50 focus:outline-none"
                />
              </div>

              {contentType === 'Service' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-outline uppercase tracking-wider">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-slate-50 py-3 px-4 text-sm focus:outline-none"
                    >
                      <option value="General Consultation">General Consultation</option>
                      <option value="Specialized Surgery">Specialized Surgery</option>
                      <option value="Diagnostics & Labs">Diagnostics &amp; Labs</option>
                      <option value="Wellness & Prevention">Wellness &amp; Prevention</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-outline uppercase tracking-wider">Est. Duration (Optional)</label>
                    <input 
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 45 - 60 mins" 
                      className="w-full rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-slate-50 py-3 px-4 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold text-outline uppercase tracking-wider">Content Body</label>
                <div className="border border-outline-variant/30 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                  {/* Rich Text Toolbar */}
                  <div className="bg-slate-100 px-4 py-2 border-b border-outline-variant/20 flex flex-wrap gap-2">
                    <button type="button" className="p-1.5 hover:bg-slate-200 rounded-lg text-on-surface-variant flex items-center justify-center cursor-pointer" title="Bold">
                      <span className="material-symbols-outlined text-base">format_bold</span>
                    </button>
                    <button type="button" className="p-1.5 hover:bg-slate-200 rounded-lg text-on-surface-variant flex items-center justify-center cursor-pointer" title="Italic">
                      <span className="material-symbols-outlined text-base">format_italic</span>
                    </button>
                    <button type="button" className="p-1.5 hover:bg-slate-200 rounded-lg text-on-surface-variant flex items-center justify-center cursor-pointer" title="List">
                      <span className="material-symbols-outlined text-base">list</span>
                    </button>
                    <button type="button" className="p-1.5 hover:bg-slate-200 rounded-lg text-on-surface-variant flex items-center justify-center cursor-pointer" title="Link">
                      <span className="material-symbols-outlined text-base">link</span>
                    </button>
                    <div className="w-px h-5 bg-outline-variant/30 self-center"></div>
                    <button type="button" className="p-1.5 hover:bg-slate-200 rounded-lg text-on-surface-variant flex items-center justify-center cursor-pointer" title="Add Image">
                      <span className="material-symbols-outlined text-base">add_photo_alternate</span>
                    </button>
                  </div>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Start writing clinical service details or article text here..."
                    rows={8}
                    className="w-full border-none focus:ring-0 p-6 bg-white resize-none font-body-md text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Featured Image File uploader */}
            <div className="glass-panel p-8 rounded-3xl shadow-sm border border-outline-variant/20 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-on-surface text-base md:text-lg">Featured Media</h3>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">High Resolution Required</span>
              </div>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative group cursor-pointer border-2 border-dashed border-outline-variant/50 hover:border-primary/50 rounded-2xl p-10 text-center transition-all bg-slate-50/40"
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden" 
                />
                
                {imagePreview ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-inner">
                    <Image 
                      src={imagePreview} 
                      alt="Uploaded media preview"
                      fill
                      className="object-cover"
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                      }}
                      className="absolute right-4 top-4 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-semibold text-on-background">Drag and drop your featured image here</p>
                      <p className="text-xs text-outline mt-1">or <span className="text-primary underline font-bold">browse files</span> from your computer</p>
                      <p className="mt-4 text-2xs text-outline-variant uppercase tracking-wider">Recommended size: 1200 x 630 pixels (Max 5MB)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar options panel */}
          <div className="lg:col-span-4 space-y-8">
            {/* Settings block */}
            <div className="glass-panel p-6 rounded-3xl shadow-sm border border-outline-variant/20 bg-white space-y-6">
              <h3 className="font-bold text-on-surface text-base border-b border-outline-variant/20 pb-4">Settings</h3>
              <div className="space-y-5">
                {/* Author Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-outline uppercase tracking-wider">Author / Provider</label>
                  <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-outline-variant/30">
                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden relative">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzQL-tqoi4mBI4rAj-vnlNIljOiw2PZRLb5hUxqSfsI0elcXXJiqk2IJlFw8vt6tw1MLr_TCP9pZC4CMTAZ0S4wbZooZvksKcFBNLok_ndGfWUbo5eROBFoiAujUv5bRmZTqpHmgCeOFVpW53IP-rGf4Vx-fJ6c4EcBdTgGqP0a3agXDmCZBzRI-tvjZOtHqCVmmDEg2AOtZCUUamX55TFgrGF0f52avx1tlTxH3USRVfZXv04r8E0IBx0dOAgUFjOZ7OSmIwJTFg"
                        alt="Sarah Khalil Admin"
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <span className="text-xs font-bold text-on-surface">Dr. Sarah Khalil</span>
                    <span className="material-symbols-outlined ml-auto text-outline text-lg">expand_more</span>
                  </div>
                </div>

                {/* Visibility Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-outline uppercase tracking-wider">Visibility Status</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setVisibility('Draft')}
                      className={`flex-1 py-2 px-4 border rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        visibility === 'Draft'
                          ? 'bg-primary/5 border-primary text-primary'
                          : 'border-outline-variant/30 text-on-surface-variant hover:bg-slate-50'
                      }`}
                    >
                      Draft
                    </button>
                    <button 
                      onClick={() => setVisibility('Public')}
                      className={`flex-1 py-2 px-4 border rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        visibility === 'Public'
                          ? 'bg-primary/5 border-primary text-primary'
                          : 'border-outline-variant/30 text-on-surface-variant hover:bg-slate-50'
                      }`}
                    >
                      Public
                    </button>
                  </div>
                </div>

                {/* Tag Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-outline uppercase tracking-wider">SEO Tags</label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Press enter to add..."
                    className="w-full rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-slate-50 py-2.5 px-4 text-xs focus:outline-none"
                  />
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-secondary-container/10 text-secondary text-2xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm"
                      >
                        <span>{tag}</span>
                        <span 
                          onClick={() => handleRemoveTag(tag)}
                          className="material-symbols-outlined text-xs hover:text-primary transition-colors cursor-pointer"
                        >
                          close
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview block */}
            <div className="glass-panel p-6 rounded-3xl shadow-sm border border-outline-variant/20 bg-white">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
                <span className="material-symbols-outlined text-lg">visibility</span>
                <span>Live Preview</span>
              </div>
              <div className="aspect-video rounded-xl bg-slate-100 mb-4 overflow-hidden relative border border-outline-variant/10">
                {imagePreview ? (
                  <Image 
                    src={imagePreview} 
                    alt="Preview visual"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-outline-variant/60 text-center px-6">
                    <span className="material-symbols-outlined text-3xl mb-1.5 opacity-40">image</span>
                    <span className="text-2xs uppercase tracking-wide">Media Preview Area</span>
                  </div>
                )}
              </div>
              <h4 className="font-bold text-on-background mb-1 text-sm md:text-base">
                {title || `Untitled ${contentType}`}
              </h4>
              {contentType === 'Service' && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-3xs font-bold rounded-full uppercase tracking-wider">
                    {category}
                  </span>
                  {duration && (
                    <span className="text-3xs text-on-surface-variant font-medium flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-2xs">schedule</span>
                      {duration}
                    </span>
                  )}
                </div>
              )}
              <p className="text-2xs text-outline line-clamp-2 leading-relaxed">
                {description || 'Start typing in the content form to see the real-time card preview update here...'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
