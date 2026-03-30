import { useAuth } from '../../hooks/useAuth';
import { LogOut, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const getProfileRoute = () => {
    if (user?.role === 'driver') return '/driver/profile';
    if (user?.role === 'customer') return '/customer/profile';
    return '/';
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-soft-mcm-sage/25 bg-soft-mcm-dark/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="surface-card rounded-2xl border-soft-mcm-sage/25 bg-soft-mcm-dark/70 px-4 sm:px-5 py-3">
          <div className="flex justify-between items-center gap-3">
            <div className="min-w-0 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-soft-mcm-sage to-soft-mcm-rose text-soft-mcm-dark font-bold flex items-center justify-center">
                TN
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-soft-mcm-light leading-tight">tapNGo</h1>
                <p className="text-soft-mcm-gray text-xs sm:text-sm truncate">{title}</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="text-right pr-2">
                <p className="text-soft-mcm-light font-semibold truncate max-w-40">{user?.name}</p>
                <p className="text-soft-mcm-gray text-sm capitalize">{user?.role}</p>
              </div>
              {user?.isVerified && (
                <button
                  onClick={() => navigate(getProfileRoute())}
                  className="soft-btn-secondary"
                >
                  <User size={18} />
                  Profile
                </button>
              )}
              <button
                onClick={handleLogout}
                className="soft-btn-primary"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden rounded-lg border border-soft-mcm-sage/40 p-2 text-soft-mcm-sage hover:bg-soft-mcm-sage-dark/10"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 border-t border-soft-mcm-sage/25 pt-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="text-soft-mcm-light min-w-0">
                  <p className="font-semibold truncate">{user?.name}</p>
                  <p className="text-soft-mcm-gray text-sm capitalize">{user?.role}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user?.isVerified ? 'bg-soft-mcm-sage/20 text-soft-mcm-sage' : 'bg-soft-mcm-rose/20 text-soft-mcm-rose'}`}>
                  {user?.isVerified ? 'Verified' : 'Pending'}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {user?.isVerified && (
                  <button
                    onClick={() => {
                      navigate(getProfileRoute());
                      setMenuOpen(false);
                    }}
                    className="soft-btn-secondary w-full"
                  >
                    <User size={18} />
                    Profile
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="soft-btn-primary w-full"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
