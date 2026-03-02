'use client';

import { useState } from 'react';
import { createNote } from '@/lib/api';

const tabs = [
  { id: 'text', icon: '📝', label: 'Text' },
  { id: 'url', icon: '🔗', label: 'URL' },
  { id: 'file', icon: '📄', label: 'File' },
  { id: 'voice', icon: '🎤', label: 'Voice' },
  { id: 'image', icon: '🖼️', label: 'Image' },
];

export default function CapturePage() {
  const [activeTab, setActiveTab] = useState('text');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setProcessing(true);
    
    try {
      await createNote({
        title: content.slice(0, 50),
        content,
        source_type: activeTab,
        source_url: url || undefined,
        tags,
      });
      setSaved(true);
      setContent('');
      setUrl('');
      setTags([]);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error(e);
    }
    
    setProcessing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <span>⚡</span> Capture
        </h1>
        <p className="text-slate-400 mt-1">Add new knowledge to your brain.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-800 rounded-lg border border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-violet-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-4">
        {activeTab === 'text' && (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here... Markdown supported."
            className="w-full h-64 bg-slate-900 border border-slate-700 rounded-lg p-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 resize-none"
          />
        )}

        {activeTab === 'url' && (
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste URL here..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
          />
        )}

        {activeTab === 'file' && (
          <div className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center hover:border-violet-500/50 transition-colors cursor-pointer">
            <div className="text-4xl mb-4">📁</div>
            <p className="text-white font-medium mb-1">Drag & drop files here</p>
            <p className="text-sm text-slate-400">PDF, DOCX, TXT, CSV — max 50MB</p>
          </div>
        )}

        {activeTab === 'voice' && (
          <div className="text-center py-12">
            <button className="w-24 h-24 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center mx-auto mb-4 hover:bg-violet-600/30 transition-colors animate-pulse">
              <span className="text-4xl">🎤</span>
            </button>
            <p className="text-white font-medium mb-1">Click to record</p>
            <p className="text-sm text-slate-400">Speak your thoughts</p>
          </div>
        )}

        {activeTab === 'image' && (
          <div className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center hover:border-violet-500/50 transition-colors cursor-pointer">
            <div className="text-4xl mb-4">🖼️</div>
            <p className="text-white font-medium mb-1">Upload or paste image</p>
            <p className="text-sm text-slate-400">OCR will extract text automatically</p>
          </div>
        )}

        {/* Tags */}
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-violet-500/20 text-violet-400 rounded-full text-xs flex items-center gap-1">
                {tag}
                <button onClick={() => setTags(tags.filter(t => t !== tag))} className="hover:text-white">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add tags..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
            />
            <button onClick={handleAddTag} className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600">Add</button>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || processing}
          className="w-full py-3 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {processing ? (
            <>Processing...</>
          ) : saved ? (
            <>✅ Saved!</>
          ) : (
            <>
              <span>⚡</span> Add to Brain
            </>
          )}
        </button>
      </div>
    </div>
  );
}
