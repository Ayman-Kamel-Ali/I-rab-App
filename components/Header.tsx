
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-lg text-white font-bold text-xl">إ</div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">إعراب <span className="text-emerald-600">I'rab</span></h1>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-emerald-600 transition-colors">عن التطبيق</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">القواعد</a>
          <a href="#" className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-100">محلل النحو الذكي</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
