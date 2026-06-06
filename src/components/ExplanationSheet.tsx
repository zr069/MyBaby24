'use client';

export interface ExplanationItem {
  title: string;
  content: string;
  action?: string;
  actionHref?: string;
}

export default function ExplanationSheet({ item, onClose }: { item: ExplanationItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}
         onClick={onClose}>
      <div className="w-full max-w-lg rounded-t-2xl p-5 space-y-3 max-h-[80vh] overflow-y-auto"
           style={{ background: 'var(--bg-card)' }} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start">
          <h3 className="text-base font-bold pr-4" style={{ color: 'var(--text-primary)' }}>
            {item.title}
          </h3>
          <button onClick={onClose} className="text-sm flex-shrink-0 px-2 py-1 rounded-lg"
                  style={{ color: 'var(--text-muted)' }}>
            Schliessen
          </button>
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
          {item.content}
        </p>
        {item.action && item.actionHref && (
          <a href={item.actionHref}
             className="block w-full py-3 rounded-xl font-semibold text-white text-sm text-center active:scale-[0.98]"
             style={{ background: 'var(--accent)' }}>
            {item.action}
          </a>
        )}
      </div>
    </div>
  );
}
