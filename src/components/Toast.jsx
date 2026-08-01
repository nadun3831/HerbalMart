import React from 'react';
import { useStore } from '../data/store';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';

export const Toast = () => {
  const { toast } = useStore();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />,
    error: <XCircle className="text-red-400 shrink-0" size={20} />,
    warning: <AlertTriangle className="text-amber-400 shrink-0" size={20} />,
    info: <Info className="text-blue-400 shrink-0" size={20} />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-sm">
      <div className="bg-emerald-950 text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-700/50 flex items-center gap-3 backdrop-blur-md">
        {icons[toast.type] || icons.success}
        <span className="text-xs font-semibold leading-snug">{toast.message}</span>
      </div>
    </div>
  );
};
