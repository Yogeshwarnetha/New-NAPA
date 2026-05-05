import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface NotificationModalProps {
  open: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ open, message, type, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [mounted, onClose]);

  if (!mounted) return null;

  const config = {
    success: {
      icon: <CheckCircle className="w-14 h-14 text-green-500" />,
      titleColor: 'text-green-700',
      borderColor: 'border-green-100',
      bgAccent: 'bg-green-50',
      title: 'Success',
      btnClass:
        'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white',
    },
    error: {
      icon: <XCircle className="w-14 h-14 text-red-500" />,
      titleColor: 'text-red-700',
      borderColor: 'border-red-100',
      bgAccent: 'bg-red-50',
      title: 'Error',
      btnClass:
        'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
    },
    info: {
      icon: <Info className="w-14 h-14 text-blue-500" />,
      titleColor: 'text-blue-700',
      borderColor: 'border-blue-100',
      bgAccent: 'bg-blue-50',
      title: 'Info',
      btnClass:
        'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
    },
  }[type];

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="notification-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div
        className={`relative w-full max-w-sm mx-auto bg-white rounded-2xl shadow-2xl border ${
          config.borderColor
        } overflow-hidden transition-all duration-300 ${
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colored top accent strip */}
        <div
          className={`h-1.5 w-full ${
            type === 'success'
              ? 'bg-green-500'
              : type === 'error'
              ? 'bg-red-500'
              : 'bg-blue-500'
          }`}
        />

        {/* Close X */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Body */}
        <div className={`flex flex-col items-center text-center px-6 py-8 ${config.bgAccent}`}>
          {/* Icon */}
          <div className="mb-4">{config.icon}</div>

          {/* Title */}
          <h3
            id="notification-modal-title"
            className={`text-xl font-bold mb-2 ${config.titleColor}`}
          >
            {config.title}
          </h3>

          {/* Message */}
          <p className="text-gray-700 text-sm leading-relaxed mb-6">{message}</p>

          {/* OK / Close button */}
          <button
            type="button"
            onClick={onClose}
            className={`px-10 py-2.5 rounded-lg font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${config.btnClass}`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
