import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Upload, 
  Trash2, 
  Printer, 
  Save 
} from 'lucide-react';
import { 
  CanvasState, 
  CanvasMetadata,
  SectionId,
  FullCanvasData
} from './types';
import { 
  INITIAL_STATE, 
  INITIAL_METADATA,
  GOVERNANCE_CONFIG, 
  DISCOVER_CONFIG, 
  DESIGN_CONFIG, 
  DELIVER_CONFIG, 
  VALUE_ANCHOR_CONFIG 
} from './constants';
import CanvasSection from './components/CanvasSection';

const App: React.FC = () => {
  const [sections, setSections] = useState<CanvasState>(INITIAL_STATE);
  const [metadata, setMetadata] = useState<CanvasMetadata>(INITIAL_METADATA);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('vdhic-canvas-v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if ('sections' in parsed && 'metadata' in parsed) {
            setSections(parsed.sections);
            setMetadata(parsed.metadata);
        } else {
            setSections(parsed);
        }
        setLastSaved(new Date());
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
  }, []);

  const handleSectionChange = (id: SectionId, value: string) => {
    setSections(prev => ({ ...prev, [id]: value }));
  };

  const handleMetadataChange = (field: keyof CanvasMetadata, value: string) => {
    setMetadata(prev => ({ ...prev, [field]: value }));
  };

  const saveToLocal = () => {
    const data: FullCanvasData = { metadata, sections };
    localStorage.setItem('vdhic-canvas-v1', JSON.stringify(data));
    setLastSaved(new Date());
    alert('Canvas saved to browser storage!');
  };

  const downloadJson = () => {
    const data: FullCanvasData = { metadata, sections };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    const filename = metadata.innovationName 
      ? `vdhic-${metadata.innovationName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.json` 
      : `vdhic-canvas-${new Date().toISOString().split('T')[0]}.json`;
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const loadJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (typeof json === 'object') {
             if ('sections' in json && 'metadata' in json) {
                setSections(prev => ({ ...prev, ...json.sections }));
                setMetadata(prev => ({ ...prev, ...json.metadata }));
            } else {
                setSections(prev => ({ ...prev, ...json }));
            }
        }
      } catch (error) {
        console.error("Invalid JSON file", error);
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const clearCanvas = () => {
    if (window.confirm("Are you sure you want to clear the entire canvas? This cannot be undone.")) {
      setSections(INITIAL_STATE);
      setMetadata(INITIAL_METADATA);
      localStorage.removeItem('vdhic-canvas-v1');
      setLastSaved(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20 print:bg-white print:pb-0 font-sans selection:bg-blue-200">
      
      {/* Navbar / Controls */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md print:hidden">
        <div className="max-w-[1920px] mx-auto px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="bg-blue-600 px-3 py-1 rounded text-white text-lg tracking-widest shadow-sm">VDHIC</span>
            </h1>
            <div className="h-6 w-px bg-slate-700"></div>
            <span className="text-slate-400 font-medium text-sm hidden sm:inline-block">Digital Health Innovation Canvas</span>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={saveToLocal} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2 text-sm font-semibold border border-slate-700" title="Save to Browser">
              <Save size={18} /> <span className="hidden lg:inline">Save</span>
            </button>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <button onClick={downloadJson} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2 text-sm font-semibold border border-slate-700" title="Export JSON">
              <Download size={18} /> <span className="hidden lg:inline">Export</span>
            </button>
            <label className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all cursor-pointer flex items-center gap-2 text-sm font-semibold border border-slate-700" title="Import JSON">
              <Upload size={18} /> <span className="hidden lg:inline">Import</span>
              <input type="file" accept=".json" onChange={loadJson} className="hidden" />
            </label>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <button onClick={() => window.print()} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2 text-sm font-semibold border border-slate-700" title="Print/PDF">
              <Printer size={18} /> <span className="hidden lg:inline">Print</span>
            </button>
            <button onClick={clearCanvas} className="px-4 py-2 text-red-300 bg-red-900/30 hover:bg-red-900/50 rounded-lg transition-all flex items-center gap-2 text-sm font-semibold border border-red-900/50 ml-2" title="Clear Canvas">
              <Trash2 size={18} /> <span className="hidden lg:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto p-6 sm:p-10 print:p-0">
        
        {/* Header for Print */}
        <div className="hidden print:block mb-10 text-center border-b-4 border-slate-800 pb-8">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">VDHIC</h1>
          <h2 className="text-2xl text-slate-600 font-bold uppercase tracking-wide">Value-Based Digital Health Innovation Canvas</h2>
        </div>

        <div className="flex flex-col gap-10 print:gap-6">

          {/* Metadata Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-300 print:shadow-none print:border-none print:p-0">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 print:gap-8">
              <div className="sm:col-span-6 flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Innovation Name</label>
                <input 
                  type="text" 
                  value={metadata.innovationName} 
                  onChange={e => handleMetadataChange('innovationName', e.target.value)}
                  className="border-b-2 border-slate-200 focus:border-blue-600 outline-none py-2 text-4xl text-slate-900 font-black transition-colors bg-transparent placeholder-slate-300 print:border-none print:p-0"
                  placeholder="PROJECT NAME"
                />
              </div>
              <div className="sm:col-span-3 flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Date</label>
                <input 
                  type="date" 
                  value={metadata.date} 
                  onChange={e => handleMetadataChange('date', e.target.value)}
                  className="border-b-2 border-slate-200 focus:border-blue-600 outline-none py-2 text-xl text-slate-700 font-bold transition-colors bg-transparent print:border-none print:p-0"
                />
              </div>
              <div className="sm:col-span-3 flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Authored By</label>
                <input 
                  type="text" 
                  value={metadata.author} 
                  onChange={e => handleMetadataChange('author', e.target.value)}
                  className="border-b-2 border-slate-200 focus:border-blue-600 outline-none py-2 text-xl text-slate-700 font-bold transition-colors bg-transparent placeholder-slate-200 print:border-none print:p-0"
                  placeholder="Author Name"
                />
              </div>
            </div>
          </div>
          
          {/* GOVERNANCE SPINE - ROSE */}
          <section className="rounded-2xl overflow-hidden shadow-lg border-2 border-rose-600 bg-rose-50 print:border-black print:shadow-none">
            <div className="bg-rose-700 text-white py-4 px-8 flex items-center justify-between print:bg-slate-200 print:text-black">
              <h2 className="text-2xl font-black uppercase tracking-widest">{GOVERNANCE_CONFIG.title}</h2>
              <span className="opacity-90 font-bold tracking-wide text-sm bg-white/20 px-3 py-1 rounded">GOVERNANCE</span>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 print:gap-4 print:p-4">
              {GOVERNANCE_CONFIG.sections.map(section => (
                <CanvasSection
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  value={sections[section.id]}
                  prompts={section.prompts}
                  instruction={section.instruction}
                  onChange={handleSectionChange}
                  headerBgClass="bg-rose-700 print:bg-slate-300 print:text-black"
                  borderColorClass="border-rose-200 print:border-slate-400"
                  focusRingClass="focus-within:ring-rose-500"
                  className="shadow-sm"
                />
              ))}
            </div>
          </section>

          {/* MAIN PHASES: DISCOVER - DESIGN - DELIVER */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:gap-4">
            
            {/* DISCOVER BLOCK - TEAL */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg border-2 border-teal-600 bg-teal-50 print:border-black print:shadow-none">
              <div className="bg-teal-700 text-white py-5 px-6 flex items-center justify-between print:bg-slate-200 print:text-black">
                <h2 className="text-3xl font-black uppercase tracking-tight">DISCOVER</h2>
                <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded text-white print:text-black">PHASE 1</span>
              </div>
              <div className="p-6 flex flex-col gap-6 flex-1 print:p-4 print:gap-4">
                {DISCOVER_CONFIG.sections.map(section => (
                  <CanvasSection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    value={sections[section.id]}
                    prompts={section.prompts}
                    instruction={section.instruction}
                    onChange={handleSectionChange}
                    headerBgClass="bg-teal-700 print:bg-slate-300 print:text-black"
                    borderColorClass="border-teal-200 print:border-slate-400"
                    focusRingClass="focus-within:ring-teal-500"
                    className="h-full shadow-sm"
                  />
                ))}
              </div>
              <div className="bg-teal-100/50 py-3 px-6 text-center text-sm font-bold text-teal-900 border-t border-teal-200 print:hidden">
                {DISCOVER_CONFIG.footer}
              </div>
            </div>

            {/* DESIGN BLOCK - VIOLET */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg border-2 border-violet-600 bg-violet-50 print:border-black print:shadow-none">
              <div className="bg-violet-700 text-white py-5 px-6 flex items-center justify-between print:bg-slate-200 print:text-black">
                <h2 className="text-3xl font-black uppercase tracking-tight">DESIGN</h2>
                <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded text-white print:text-black">PHASE 2</span>
              </div>
              <div className="p-6 flex flex-col gap-6 flex-1 print:p-4 print:gap-4">
                {DESIGN_CONFIG.sections.map(section => (
                  <CanvasSection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    value={sections[section.id]}
                    prompts={section.prompts}
                    instruction={section.instruction}
                    onChange={handleSectionChange}
                    headerBgClass="bg-violet-700 print:bg-slate-300 print:text-black"
                    borderColorClass="border-violet-200 print:border-slate-400"
                    focusRingClass="focus-within:ring-violet-500"
                    className="h-full shadow-sm"
                  />
                ))}
              </div>
              <div className="bg-violet-100/50 py-3 px-6 text-center text-sm font-bold text-violet-900 border-t border-violet-200 print:hidden">
                {DESIGN_CONFIG.footer}
              </div>
            </div>

            {/* DELIVER BLOCK - AMBER */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg border-2 border-amber-600 bg-amber-50 print:border-black print:shadow-none">
              <div className="bg-amber-700 text-white py-5 px-6 flex items-center justify-between print:bg-slate-200 print:text-black">
                <h2 className="text-3xl font-black uppercase tracking-tight">DELIVER</h2>
                <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded text-white print:text-black">PHASE 3</span>
              </div>
              <div className="p-6 flex flex-col gap-6 flex-1 print:p-4 print:gap-4">
                {DELIVER_CONFIG.sections.map(section => (
                  <CanvasSection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    value={sections[section.id]}
                    prompts={section.prompts}
                    instruction={section.instruction}
                    onChange={handleSectionChange}
                    headerBgClass="bg-amber-700 print:bg-slate-300 print:text-black"
                    borderColorClass="border-amber-200 print:border-slate-400"
                    focusRingClass="focus-within:ring-amber-500"
                    className="h-full shadow-sm"
                  />
                ))}
              </div>
              <div className="bg-amber-100/50 py-3 px-6 text-center text-sm font-bold text-amber-900 border-t border-amber-200 print:hidden">
                {DELIVER_CONFIG.footer}
              </div>
            </div>

          </div>

          {/* VALUE ANCHOR - SKY BLUE */}
          <section className="rounded-2xl overflow-hidden shadow-lg border-2 border-sky-600 bg-sky-50 print:border-black print:shadow-none">
            <div className="bg-sky-700 text-white py-4 px-8 flex items-center justify-between print:bg-slate-200 print:text-black">
              <h2 className="text-2xl font-black uppercase tracking-widest">{VALUE_ANCHOR_CONFIG.title}</h2>
              <span className="opacity-90 font-bold tracking-wide text-sm bg-white/20 px-3 py-1 rounded">OUTCOMES</span>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 print:gap-4 print:p-4">
              {VALUE_ANCHOR_CONFIG.sections.map(section => (
                <CanvasSection
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  value={sections[section.id]}
                  prompts={section.prompts}
                  instruction={section.instruction}
                  onChange={handleSectionChange}
                  headerBgClass="bg-sky-700 print:bg-slate-300 print:text-black"
                  borderColorClass="border-sky-200 print:border-slate-400"
                  focusRingClass="focus-within:ring-sky-500"
                  className="shadow-sm"
                />
              ))}
            </div>
          </section>

          {/* Footer */}
          <div className="text-center text-slate-400 mt-12 pb-12 print:mt-8 print:text-slate-600 border-t border-slate-200 pt-8">
            <p className="font-bold text-lg text-slate-500 mb-1">Value-Based Digital Health Innovation Canvas (VDHIC) v1.2</p>
            <p className="font-medium text-sm text-slate-500 mb-6">Facilitating Acceleration of Digital Health Innovation in Indonesia</p>
            
            <div className="text-xs font-medium text-slate-400 flex flex-col gap-1">
              <p>Australian Awards Fellowships &bull; DFAT Australia</p>
              <p>&copy; 2025 Monash University Faculty of Information Technology</p>
            </div>
            
            {lastSaved && <div className="mt-4 inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-500 text-xs font-semibold print:hidden">Auto-saved: {lastSaved.toLocaleTimeString()}</div>}
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;