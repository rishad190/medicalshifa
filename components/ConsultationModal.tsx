'use client';

import { useState, useEffect } from 'react';
import { createAppointment } from '../app/firebaseClient';

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    service: 'Second Opinion',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStatus('idle');
    };
    window.addEventListener('open-consultation', handleOpen);
    return () => {
      window.removeEventListener('open-consultation', handleOpen);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Attempt to save to Firestore via client helper if available
    try {
      if (typeof createAppointment === 'function') {
        await createAppointment({
          ...formData,
        });

        setStatus('success');

        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          service: 'Second Opinion',
          notes: '',
        });
        return;
      }
    } catch (err) {
      // If Firestore write fails, fall back to localStorage below
      // eslint-disable-next-line no-console
      console.warn('Firestore write failed, falling back to localStorage:', err);
    }

    // Fallback: Save appointment to localStorage (development fallback)
    setTimeout(() => {
      setStatus('success');
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const newAppointment = {
        id: Math.random().toString(36).substring(2, 9),
        ...formData,
        dateCreated: new Date().toISOString(),
        status: 'Pending',
      };
      localStorage.setItem('appointments', JSON.stringify([newAppointment, ...appointments]));

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        service: 'Second Opinion',
        notes: '',
      });
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-md transition-opacity" 
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-surface-container-lowest p-8 shadow-2xl border border-outline-variant/30 transition-all duration-300 z-10">
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute right-6 top-6 text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {status === 'idle' && (
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Book a Consultation</h3>
            <p className="text-sm text-on-surface-variant mb-6">
              Connect with our medical experts and international network. Fill out the details below to request a callback.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="Second Opinion">Second Opinion</option>
                    <option value="Medical Consultation">Medical Consultation</option>
                    <option value="Hospital Referral">Hospital Referral</option>
                    <option value="Telemedicine">Telemedicine</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Case Notes / Brief History
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us briefly about the symptoms or desired medical specialty..."
                  rows={3}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-on-primary font-bold py-4 rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">send</span>
                Request Appointment
              </button>
            </form>
          </div>
        )}

        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
            <p className="font-bold text-on-surface">Securing Appointment Slot...</p>
            <p className="text-xs text-on-surface-variant mt-2">Connecting with Shifa Healthcare coordinators</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Request Confirmed!</h3>
            <p className="text-on-surface-variant max-w-sm mx-auto mb-8 leading-relaxed">
              We have received your case details. A medical coordinator will review the information and contact you within 15 minutes.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md"
            >
              Back to Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
