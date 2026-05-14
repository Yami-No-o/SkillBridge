// src/components/admin/StatusPill.jsx
import React from 'react';

const config = {
  Verified:  { bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500'  },
  Pending:   { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  Flagged:   { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500'    },
  Open:      { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500'   },
  Matched:   { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  Completed: { bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500'  },
  Confirmed: { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500'   },
  Cancelled: { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500'    },
};

export default function StatusPill({ status }) {
  const s = config[status] ?? { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}
