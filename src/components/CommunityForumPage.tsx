import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, ThumbsUp, MessageCircle, Share2, Users } from 'lucide-react';
import { i18n } from '../utils/i18n';
import { authManager } from '../utils/auth';
import { notificationManager } from '../utils/notifications';
import type { ForumPost } from '../types';

export const CommunityForumPage: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);

  useEffect(() => {
    // Load forum posts from localStorage or use mock data
    const savedPosts = localStorage.getItem('agriConnectForumPosts');
    if (savedPosts) {
      setForumPosts(JSON.parse(savedPosts));
    } else {
      setForumPosts([...mockData.forumPosts]);
    }
  }, []);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.trim()) {
      notificationManager.show('Please enter a question', 'error');
      return;
    }

    const currentUser = authManager.getCurrentUser();
    
    const post: ForumPost = {
      id: Date.now(),
      author: currentUser?.name || 'Anonymous',
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: 0
    };

    const updatedPosts = [post, ...forumPosts];
    setForumPosts(updatedPosts);
    localStorage.setItem('agriConnectForumPosts', JSON.stringify(updatedPosts));
    
    setNewPost('');
    notificationManager.show('Question posted successfully', 'success');
  };

  const handleLike = (postId: number) => {
    const updatedPosts = forumPosts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setForumPosts(updatedPosts);
    localStorage.setItem('agriConnectForumPosts', JSON.stringify(updatedPosts));
    notificationManager.show('Post liked!', 'success');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-8 pb-3 border-b-2 border-gray-200">
        {i18n.t('communityForum')}
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <form onSubmit={handlePostSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {i18n.t('askQuestion')}
            </label>
            <textarea
              rows={3}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Ask a question to the farming community..."
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors duration-200 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {i18n.t('post')}
          </button>
        </form>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-700" />
          {i18n.t('recentQuestions')}
        </h3>

        {forumPosts.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {forumPosts.map((post) => (
              <div key={post.id} className="p-6 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">
                    {getInitials(post.author)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">{post.author}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{post.time}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 hover:text-green-700 transition-colors duration-200"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-700 transition-colors duration-200">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-700 transition-colors duration-200">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-xl shadow-lg text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No questions yet. Be the first to ask a question!</p>
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={() => window.location.hash = '#home'}
          className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors duration-200 flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          {i18n.t('backToHome')}
        </button>
      </div>
    </div>
  );
};