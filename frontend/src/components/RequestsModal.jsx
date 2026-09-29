import React from 'react';
import { X, Check, XCircle, Clock, CheckCircle2, User, Phone, Mail } from 'lucide-react';

export default function RequestsModal({
  isOpen,
  onClose,
  requests = [],
  currentUser,
  users = [],
  onUpdateStatus
}) {
  if (!isOpen) return null;

  const getUser = (id) => users.find(u => u.id === id) || { full_name: `User #${id}`, avatar: "" };

  const incoming = requests.filter(r => r.receiver_id === currentUser?.id);
  const outgoing = requests.filter(r => r.sender_id === currentUser?.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-base text-slate-900">Roommate Connection Inquiries</h3>
            <p className="text-xs text-slate-500">Manage incoming and sent roommate requests</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Tabs / List */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* Incoming */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center justify-between">
              <span>Received Inquiries ({incoming.length})</span>
            </h4>

            {incoming.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500">
                No incoming connection requests right now.
              </div>
            ) : (
              <div className="space-y-3">
                {incoming.map((req) => {
                  const sender = getUser(req.sender_id);
                  return (
                    <div key={req.id} className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 transition-all space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={sender.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                            alt={sender.full_name}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div>
                            <p className="font-bold text-sm text-slate-900">{sender.full_name}</p>
                            <p className="text-[11px] text-slate-500">{sender.occupation}</p>
                          </div>
                        </div>

                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          req.status === 'accepted'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : req.status === 'declined'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {req.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl italic">
                        "{req.message}"
                      </p>

                      {req.status === 'pending' && (
                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            onClick={() => onUpdateStatus(req.id, 'declined')}
                            className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => onUpdateStatus(req.id, 'accepted')}
                            className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-2xs transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Accept & Connect
                          </button>
                        </div>
                      )}

                      {req.status === 'accepted' && (
                        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Mutual Match! Contact Unlocked:</span>
                          </div>
                          <div className="text-slate-700 space-x-3 text-[11px]">
                            <span>📞 {sender.phone || "+1 (555) 345-6789"}</span>
                            <span>✉️ {sender.email}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Outgoing */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
              Sent Requests ({outgoing.length})
            </h4>

            {outgoing.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500">
                You haven't sent any connection requests yet. Browse the roommate feed to connect!
              </div>
            ) : (
              <div className="space-y-3">
                {outgoing.map((req) => {
                  const receiver = getUser(req.receiver_id);
                  return (
                    <div key={req.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={receiver.avatar}
                          alt={receiver.full_name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-bold text-sm text-slate-900">{receiver.full_name}</p>
                          <p className="text-[11px] text-slate-500 italic line-clamp-1 max-w-sm">"{req.message}"</p>
                        </div>
                      </div>

                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        req.status === 'accepted'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : req.status === 'declined'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 rounded-xl"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
