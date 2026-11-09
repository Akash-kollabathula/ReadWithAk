import React, { useState } from 'react';
import { X, Award, CheckCircle2, Printer, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedCount: number;
  totalModules: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  completedCount,
  totalModules,
}) => {
  const [studentName, setStudentName] = useState('Alex Rivera');
  const percent = Math.round((completedCount / totalModules) * 100);
  const isMastered = completedCount >= Math.max(1, Math.floor(totalModules * 0.7)); // 70%+ unlocks certificate

  if (!isOpen) return null;

  const todayStr = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transition-colors">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ReadWithAK Mastery Certificate
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Custom Name Input */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0">
              Your Name:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Certificate Canvas / Card */}
          <div
            id="readwithak-certificate"
            className="p-8 rounded-xl border-2 border-amber-300 dark:border-amber-700/60 bg-linear-to-b from-amber-50/40 via-white to-amber-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-center relative overflow-hidden shadow-sm"
          >
            {/* Corner Decorative Watermark */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
              ReadWithAK Verified
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400">
              ID: RWAK-{Math.abs(studentName.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0) % 99999).toString().padStart(5, '0')}
            </div>

            <div className="my-2">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                Certificate of Completion
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Playwright &amp; API Automation Mastery
              </h2>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
              This certificate affirms that
            </p>

            <div className="my-4 text-2xl font-bold text-indigo-600 dark:text-indigo-400 font-serif border-b border-indigo-200 dark:border-indigo-800/60 inline-block px-8 py-1">
              {studentName || 'Learner'}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              has demonstrated in-depth understanding of Playwright persistent WebSocket architecture,
              Actionability auto-waiting, headless REST <code className="font-mono">APIRequestContext</code> testing,
              network interception, and enterprise CI/CD deployment pipelines.
            </p>

            {/* Verification Stats */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Curriculum Track</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {completedCount} / {totalModules} Modules Studied ({percent}%)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Issue Date</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{todayStr}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified</span>
              </div>
            </div>
          </div>

          {!isMastered && (
            <p className="text-xs text-amber-600 dark:text-amber-400 text-center">
              Tip: Study at least 70% of modules to unlock your full verifiable badge status!
            </p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
          >
            Close
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print or Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
