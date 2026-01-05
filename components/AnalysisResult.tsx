
import React from 'react';
import { SentenceAnalysisResponse } from '../types';

interface AnalysisResultProps {
  data: SentenceAnalysisResponse;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Overview Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">نظرة عامة على الجملة</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <p className="text-slate-500 text-sm mb-1">الجملة الأصلية</p>
            <p className="arabic-text text-3xl font-bold text-emerald-900 leading-relaxed">{data.fullSentence}</p>
          </div>
          <div className="md:w-1/3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-emerald-800 text-sm font-semibold mb-1">نوع الجملة</p>
            <p className="text-emerald-700">{data.overallStructure}</p>
          </div>
        </div>
      </div>

      {/* Word Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.words.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-300 hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded">كلمة {index + 1}</span>
              <span className="arabic-text text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                {item.word}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">نوع الكلمة:</span>
                <span className="font-semibold text-slate-700">{item.partOfSpeech}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">الحالة الإعرابية:</span>
                <span className={`font-bold px-2 py-0.5 rounded ${
                  item.grammaticalCase.includes('مرفوع') ? 'bg-blue-50 text-blue-700' :
                  item.grammaticalCase.includes('منصوب') ? 'bg-orange-50 text-orange-700' :
                  item.grammaticalCase.includes('مجرور') ? 'bg-purple-50 text-purple-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {item.grammaticalCase}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">علامة الإعراب:</span>
                <span className="font-semibold text-slate-700">{item.inflectionSign}</span>
              </div>
              <div className="pt-2 border-t border-slate-50">
                <p className="text-xs text-slate-400 mb-1">التفسير:</p>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  {item.reason}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.words.some(w => w.notes) && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            ملاحظات إضافية
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {data.words.filter(w => w.notes).map((w, i) => (
              <li key={i}>{w.word}: {w.notes}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;
