import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Clock, BookOpen } from 'lucide-react';
import { chapters } from '../data';

export function ChapterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const chapter = chapters.find(c => c.id === Number(id));

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Chapter not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Return to chapters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={chapter.coverImage} 
            alt={chapter.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 mix-blend-multiply" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex flex-col justify-center">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-white/80 hover:text-white mb-8 w-fit transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Chapters
            </button>
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 text-white rounded-full mb-4">
                Community Chapter
              </span>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">{chapter.title}</h1>
              <div className="flex items-center space-x-8 text-white/80">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{chapter.members.toLocaleString()} members</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Created {new Date(chapter.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">About this Chapter</h2>
                  <p className="text-gray-600 mt-1">By {chapter.author}</p>
                </div>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Join Chapter
                </button>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">{chapter.description}</p>
                {chapter.content && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Content</h3>
                    <p className="text-gray-700 leading-relaxed">{chapter.content}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Chapter Leads */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Chapter Leads</h3>
              <div className="space-y-6">
                {chapter.chapterLeads?.map((lead, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {lead.name}
                        </h4>
                        <p className="text-sm text-indigo-600 font-medium">{lead.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chapter Stats */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Chapter Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Members</span>
                  <span className="font-medium text-gray-900">{chapter.members.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium text-gray-900">
                    {new Date(chapter.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium text-gray-900">
                    {new Date(chapter.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}