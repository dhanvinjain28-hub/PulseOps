import type { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  bgClass?: string;
}

export default function MetricCard({
  title,
  value,
  icon,
  bgClass = 'bg-slate-800/60',
}: MetricCardProps) {
  return (
    <div
      className={`${bgClass} flex items-center justify-between rounded-xl border border-white/10 p-5 shadow-lg backdrop-blur`}
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
          {title}
        </p>
        <p className="mt-1 text-3xl font-bold text-white">{value}</p>
      </div>
      <div className="text-indigo-400 opacity-80">{icon}</div>
    </div>
  );
}
