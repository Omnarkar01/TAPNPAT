import { useState, useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import StatCard from '../../components/Shared/StatCard';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { driverService } from '../../services/driverService';
import { formatCurrency } from '../../utils/formatters';
import { DollarSign } from 'lucide-react';

export default function DriverEarnings() {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    fetchEarnings();
  }, [period]);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const response = await driverService.getEarnings(period);
      setEarnings(response.data);
    } catch (error) {
      console.error('Failed to fetch earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-soft-mcm-dark">
      <Navbar title="Earnings Report" />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Period Selector */}
        <div className="flex gap-4 mb-8">
          {['day', 'week', 'month', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-6 py-2 rounded-lg font-semibold transition capitalize ${
                period === p
                  ? 'bg-soft-mcm-rose text-soft-mcm-dark'
                  : 'bg-soft-mcm-dark border border-soft-mcm-sage/30 text-soft-mcm-light hover:border-soft-mcm-sage'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            label="Total Earnings"
            value={formatCurrency(earnings?.totalEarnings || 0)}
            color="orange"
          />
          <StatCard
            label="Total Rides"
            value={earnings?.rideCount || 0}
            color="blue"
          />
          <StatCard
            label="Average Fare"
            value={formatCurrency(earnings?.averageFare || 0)}
            color="green"
          />
        </div>

        {/* Daily Breakdown */}
        <div className="bg-soft-mcm-dark border border-soft-mcm-sage/30 rounded-lg p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-soft-mcm-light mb-6">Daily Breakdown</h2>
          <div className="space-y-3">
            {earnings?.dailyBreakdown ? (
              Object.entries(earnings.dailyBreakdown)
                .sort(([a], [b]) => new Date(b) - new Date(a))
                .map(([date, amount]) => (
                  <div key={date} className="flex justify-between items-center p-4 bg-soft-mcm-dark rounded-lg border border-soft-mcm-sage/20">
                    <p className="text-soft-mcm-light font-semibold">{date}</p>
                    <p className="text-soft-mcm-rose font-bold">{formatCurrency(amount)}</p>
                  </div>
                ))
            ) : (
              <p className="text-center text-soft-mcm-gray py-8">No data available</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
