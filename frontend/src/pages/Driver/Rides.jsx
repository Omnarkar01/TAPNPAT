import { useState, useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { driverService } from '../../services/driverService';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function DriverRides() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchRides();
  }, [page]);

  const fetchRides = async () => {
    try {
      setLoading(true);
      const response = await driverService.getRides({ page, limit: 10 });
      setRides(response.data);
    } catch (error) {
      console.error('Failed to fetch rides:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-soft-mcm-dark">
      <Navbar title="My Rides" />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-soft-mcm-dark border border-soft-mcm-sage/30 rounded-lg p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-soft-mcm-light mb-6">Ride History</h2>
          <div className="space-y-4">
            {rides && rides.length > 0 ? (
              rides.map((ride) => (
                <div
                  key={ride._id}
                  className="flex justify-between items-center p-4 bg-soft-mcm-dark rounded-lg border border-soft-mcm-sage/20 hover:border-soft-mcm-sage transition"
                >
                  <div className="flex-1">
                    <p className="text-soft-mcm-light font-semibold">{ride.passengerId?.name}</p>
                    <p className="text-soft-mcm-gray text-sm mb-2">
                      {ride.startLocation} → {ride.endLocation}
                    </p>
                    <p className="text-soft-mcm-gray text-xs">{formatDate(ride.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-soft-mcm-rose font-bold">{formatCurrency(ride.calculatedFare)}</p>
                    <p className="text-soft-mcm-gray text-sm capitalize mt-1">{ride.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-soft-mcm-gray py-8">No rides found</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
