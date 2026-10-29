import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ReactNode, ReactElement } from 'react';

interface MetricCardProps {
  title: string;
  value: ReactNode;
  icon: ReactElement;
  bgClass?: string;
}

export default function MetricCard({ title, value, icon, bgClass }: MetricCardProps) {
  return (
    <Card className={cn('bg-gray-800 text-white shadow-lg', bgClass)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  );
}
