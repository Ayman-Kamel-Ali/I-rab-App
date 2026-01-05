
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import AnalysisResult from './components/AnalysisResult';
import { analyzeArabicSentence } from './services/geminiService';
import { AnalysisStatus, SentenceAnalysisResponse } from './types';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<SentenceAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    setStatus(AnalysisStatus.LOADING);
    setError(null);
    
    try {
      const data = await analyzeArabicSentence(input);
      setResult(data);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تحليل الجملة. يرجى المحاولة مرة أخرى.');
      setStatus(AnalysisStatus.ERROR);
    }
  };

  const handleExample = (example: string) => {
    setInput(example);
    // Automatic trigger after state update can be tricky, so we'll just set it
  };

  return (
    <div className="min-h-screen flex flex-col font-['Amiri']" dir="rtl">
      <Header />
      
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            أتقن قواعد <span className="text-emerald-600">اللغة العربية</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            أدخل أي جملة عربية للحصول على إعراب تفصيلي ودقيق لكل كلمة باستخدام تقنيات الذكاء الاصطناعي المتقدمة.
          </p>
        </section>

        {/* Search Bar Container */}
        <div className="max-w-3xl mx-auto mb-16">
          <form onSubmit={handleAnalyze} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب جملتك هنا (مثال: ذهب الولد إلى المدرسة)"
              className="w-full h-16 px-6 pr-14 text-xl bg-white border-2 border-slate-200 rounded-2xl shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-slate-300 arabic-text"
              disabled={status === AnalysisStatus.LOADING}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              disabled={status === AnalysisStatus.LOADING || !input.trim()}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-12 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === AnalysisStatus.LOADING ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  يتم التحليل...
                </span>
              ) : 'حلل الآن'}
            </button>
          </form>

          {/* Examples */}
          <div className="mt-4 flex flex-wrap gap-2 items-center justify-center text-sm">
            <span className="text-slate-400">أمثلة:</span>
            {['العلمُ نورٌ', 'إنَّ اللهَ مع الصابرين', 'يكتبُ الطالبُ الدرسَ'].map((ex) => (
              <button
                key={ex}
                onClick={() => handleExample(ex)}
                className="px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="max-w-5xl mx-auto">
          {status === AnalysisStatus.ERROR && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl flex items-center gap-4 mb-8">
              <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-semibold">{error}</p>
            </div>
          )}

          {status === AnalysisStatus.LOADING && !result && (
            <div className="py-20 text-center">
              <div className="inline-block relative">
                <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-slate-500 font-medium">جاري معالجة الجملة وتحليل القواعد...</p>
            </div>
          )}

          {result && status !== AnalysisStatus.LOADING && (
            <AnalysisResult data={result} />
          )}

          {status === AnalysisStatus.IDLE && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <FeatureCard 
                icon="📖"
                title="إعراب دقيق"
                description="تحليل لكل كلمة يوضح موقعها الإعرابي وعلامة الإعراب والسبب."
              />
              <FeatureCard 
                icon="⚡"
                title="نتائج فورية"
                description="احصل على التحليل النحوي الكامل في ثوانٍ معدودة بفضل الذكاء الاصطناعي."
              />
              <FeatureCard 
                icon="🎓"
                title="تعليمي ومبسط"
                description="مناسب للطلاب والمعلمين وهواة اللغة لتعميق فهم النحو العربي."
              />
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} إعراب - منصة تحليل النحو العربي الذكية</p>
          <p className="mt-2">صُنع بحب للغة الضاد</p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:shadow-md transition-shadow">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </div>
);

export default App;
