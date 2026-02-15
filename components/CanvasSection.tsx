import React, { useState } from 'react';
import { SectionId } from '../types';
import { ICON_MAP } from '../constants';
import { Info, X } from 'lucide-react';

interface CanvasSectionProps {
  id: SectionId;
  title: string;
  value: string;
  prompts: string[];
  instruction?: string;
  onChange: (id: SectionId, value: string) => void;
  // Theme props - expecting standard Tailwind classes
  headerBgClass: string; 
  headerTextClass?: string; 
  borderColorClass: string; 
  focusRingClass?: string;
  className?: string;
  minHeight?: string;
}

const CanvasSection: React.FC<CanvasSectionProps> = ({
  id,
  title,
  value,
  prompts,
  instruction,
  onChange,
  headerBgClass,
  headerTextClass = "text-white",
  borderColorClass,
  focusRingClass = "focus-within:ring-blue-500",
  className = "",
  minHeight = "min-h-[220px]"
}) => {
  const Icon = ICON_MAP[id];
  const [showInstruction, setShowInstruction] = useState(false);

  return (
    <>
      <div className={`bg-white rounded-xl shadow-md border-2 flex flex-col overflow-hidden transition-all hover:shadow-lg focus-within:ring-4 focus-within:ring-opacity-50 ${borderColorClass} ${focusRingClass} ${className} ${minHeight}`}>
        
        {/* Header Block */}
        <div className={`px-4 py-3 border-b-2 ${borderColorClass} flex items-center justify-between ${headerBgClass} ${headerTextClass}`}>
          <div className="flex items-center gap-2">
            {Icon && <Icon size={20} className="opacity-95" />}
            <h3 className="font-bold text-base uppercase tracking-wide leading-tight drop-shadow-sm">{title}</h3>
          </div>
          {instruction && (
            <button 
              onClick={() => setShowInstruction(true)}
              className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-full transition-colors focus:outline-none print:hidden"
              title="Show Instructions"
            >
              <Info size={18} />
            </button>
          )}
        </div>
        
        {/* Content Area */}
        <div className="flex-1 relative p-4 flex flex-col group bg-white">
          {value === '' && (
            <div className="absolute inset-0 p-4 pointer-events-none">
              <ul className="list-disc pl-4 space-y-1.5">
                {prompts.map((prompt, idx) => (
                  <li key={idx} className="text-sm text-slate-400 font-medium leading-normal">{prompt}</li>
                ))}
              </ul>
            </div>
          )}
          <textarea
            value={value}
            onChange={(e) => onChange(id, e.target.value)}
            className="w-full h-full min-h-[140px] resize-none focus:outline-none bg-transparent text-lg text-slate-900 font-medium z-10 leading-relaxed placeholder-transparent"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Instruction Modal */}
      {showInstruction && instruction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm print:hidden" onClick={() => setShowInstruction(false)}>
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200 border-2 border-slate-300"
            onClick={e => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between p-5 border-b border-slate-100 ${headerBgClass} ${headerTextClass}`}>
              <h4 className="font-bold text-lg flex items-center gap-2">
                {Icon && <Icon size={22} />}
                {title} Guide
              </h4>
              <button 
                onClick={() => setShowInstruction(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 text-base text-slate-700 leading-relaxed max-h-[60vh] overflow-y-auto">
              <div dangerouslySetInnerHTML={{ __html: instruction }} className="prose prose-sm max-w-none" />
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 text-right">
              <button 
                onClick={() => setShowInstruction(false)}
                className={`px-5 py-2 ${headerBgClass} text-white text-base font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-sm`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CanvasSection;
