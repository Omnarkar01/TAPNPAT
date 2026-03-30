import { useEffect, useState } from 'react';
import Navbar from '../../components/Shared/Navbar';
import StatCard from '../../components/Shared/StatCard';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { driverService } from '../../services/driverService';
import { formatCurrency } from '../../utils/formatters';
import { DollarSign, Users, TrendingUp, Star, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

export default function DriverDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await driverService.getDashboard();
      setStats(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="app-shell">
      <Navbar title="Driver Dashboard" />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            label="Today's Earnings"
            value={formatCurrency(stats?.todayEarnings || 0)}
            color="orange"
          />
          <StatCard
            icon={Users}
            label="Today's Rides"
            value={stats?.todayRides || 0}
            color="blue"
          />
          <StatCard
            icon={TrendingUp}
            label="Total Rides"
            value={stats?.totalRides || 0}
            color="green"
          />
          <StatCard
            icon={Star}
            label="Rating"
            value={`${stats?.rating || 5}/5`}
            color="orange"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/driver/earnings"
            className="surface-card surface-card-hover p-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-soft-mcm-rose/20 rounded-lg">
                <DollarSign className="text-soft-mcm-rose" size={24} />
              </div>
              <div>
                <p className="text-soft-mcm-gray text-sm">View Earnings</p>
                <p className="text-soft-mcm-light font-semibold">Detailed Report</p>
              </div>
            </div>
          </Link>

          <Link
            to="/driver/rides"
            className="surface-card surface-card-hover p-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-soft-mcm-sage/20 rounded-lg">
                <Users className="text-soft-mcm-sage" size={24} />
              </div>
              <div>
                <p className="text-soft-mcm-gray text-sm">View Rides</p>
                <p className="text-soft-mcm-light font-semibold">Ride History</p>
              </div>
            </div>
          </Link>

          <div className="surface-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Calendar className="text-green-400" size={24} />
              </div>
              <div>
                <p className="text-soft-mcm-gray text-sm">This Month</p>
                <p className="text-soft-mcm-light font-semibold">{stats?.todayRides || 0} rides</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Rides */}
        <div className="surface-card p-6">
          <h2 className="text-xl font-bold text-soft-mcm-light mb-6">Recent Rides</h2>
          <div className="space-y-3">
            {stats?.recentRides && stats.recentRides.length > 0 ? (
              stats.recentRides.map((ride) => (
                <div key={ride._id} className="flex justify-between items-center p-4 bg-soft-mcm-dark/65 rounded-xl border border-soft-mcm-sage/25">
                  <div>
                    <p className="text-soft-mcm-light font-semibold">{ride.passengerId?.name}</p>
                    <p className="text-soft-mcm-gray text-sm">{ride.startLocation} → {ride.endLocation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-soft-mcm-rose font-bold">{formatCurrency(ride.calculatedFare)}</p>
                    <p className="text-soft-mcm-gray text-sm capitalize">{ride.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-soft-mcm-gray text-center py-8">No rides yet</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
