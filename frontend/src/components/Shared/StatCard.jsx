import { TrendingUp } from 'lucide-react';

export default function StatCard({ icon: Icon, label, value, trend, color = 'orange' }) {
  const colorClasses = {
    orange: {
      card: 'border-soft-mcm-rose/35 bg-soft-mcm-rose/10',
      icon: 'text-soft-mcm-rose',
      iconWrap: 'bg-soft-mcm-rose/20',
      trend: 'text-soft-mcm-rose',
    },
    blue: {
      card: 'border-soft-mcm-sage/35 bg-soft-mcm-sage/10',
      icon: 'text-soft-mcm-sage',
      iconWrap: 'bg-soft-mcm-sage/20',
      trend: 'text-soft-mcm-sage',
    },
    green: {
      card: 'border-green-500/35 bg-green-500/10',
      icon: 'text-green-400',
      iconWrap: 'bg-green-500/20',
      trend: 'text-green-300',
    },
  };

  const currentColor = colorClasses[color] || colorClasses.orange;

  return (
    <div className={`surface-card surface-card-hover p-6 ${currentColor.card}`}>
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className={`rounded-xl p-2.5 ${currentColor.iconWrap}`}>
              <Icon size={20} className={currentColor.icon} />
            </span>
          )}
          <p className="text-soft-mcm-gray text-sm">{label}</p>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${currentColor.trend}`}>
            <TrendingUp size={16} />
            {trend}%
          </div>
        )}
      </div>
      <p className="text-3xl lg:text-[2rem] font-bold text-soft-mcm-light tracking-tight">{value}</p>
    </div>
  );
}
