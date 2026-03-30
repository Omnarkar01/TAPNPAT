import { useState, useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { customerService } from '../../services/customerService';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function CustomerTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await customerService.getTransactions({ page, limit: 10 });
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-soft-mcm-dark">
      <Navbar title="Transaction History" />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-soft-mcm-dark border border-soft-mcm-sage/30 rounded-lg p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-soft-mcm-light mb-6">Transactions</h2>
          <div className="space-y-3">
            {transactions && transactions.length > 0 ? (
              transactions.map((tx) => (
                <div
                  key={tx._id}
                  className="flex justify-between items-center p-4 bg-soft-mcm-dark rounded-lg border border-soft-mcm-sage/20 hover:border-soft-mcm-sage transition"
                >
                  <div className="flex-1">
                    <p className="text-soft-mcm-light font-semibold capitalize">{tx.type}</p>
                    <p className="text-soft-mcm-gray text-sm">{tx.description || 'Transaction'}</p>
                    <p className="text-soft-mcm-gray text-xs mt-1">{formatDate(tx.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.type === 'topup' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'topup' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </p>
                    <p className="text-soft-mcm-gray text-sm capitalize mt-1">{tx.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-soft-mcm-gray py-8">No transactions found</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
