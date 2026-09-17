"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit, BookOpen, ExternalLink, Calendar, Clock } from "lucide-react";
import { cmsStore, BlogItem } from "@/lib/data";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>(cmsStore.getBlogs());
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    cmsStore.saveBlog(editingBlog);
    setBlogs(cmsStore.getBlogs());
    setEditingBlog(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">
            Editorial Perspectives
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Articles & Blog Management
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Author technical articles, edit categories, configure reading times, and manage publication.
          </p>
        </div>

        <button
          onClick={() => {
            const newB: BlogItem = {
              id: "blog-" + Date.now(),
              slug: "new-article-" + Date.now(),
              title: "Untitled Article",
              excerpt: "Brief summary of article...",
              content: "Full content of the article...",
              authorName: "VIO Architecture Board",
              authorRole: "Principal Architects",
              category: "Architecture & Strategy",
              tags: ["Cloud", "Modernization"],
              readingTime: "5 min read",
              publishedAt: new Date().toISOString().slice(0, 10),
              featuredImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
            };
            setEditingBlog(newB);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="space-y-4">
        {blogs.map((b) => (
          <div
            key={b.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand-blue/40 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-brand-blue mt-1">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-blue border border-blue-200">
                    {b.category}
                  </span>
                  <span className="text-xs text-slate-500">• {b.publishedAt}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">{b.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mb-2 line-clamp-2">
                  {b.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-500">
                  <span>Author: {b.authorName}</span>
                  <span>{b.readingTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/blogs/${b.slug}`}
                target="_blank"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                title="View live article"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setEditingBlog(b)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-brand-blue font-bold text-xs hover:bg-blue-100 transition-all border border-blue-200"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Article</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingBlog && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Edit Article: {editingBlog.title}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Reading Time</label>
                  <input
                    type="text"
                    value={editingBlog.readingTime}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readingTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Excerpt / Summary</label>
                <textarea
                  rows={2}
                  value={editingBlog.excerpt}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Article Content (Markdown / Text)</label>
                <textarea
                  rows={6}
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
