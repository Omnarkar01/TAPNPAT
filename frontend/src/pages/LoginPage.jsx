import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, User, AlertCircle, Truck, ShoppingCart, ArrowLeft, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null); // null = role selection, 'driver'/'customer' = login/signup
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    password: '',
    role: 'customer',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await login(formData.email, formData.password);
        if (!response.user.isVerified) {
          // Redirect to onboarding for unverified users
          const route = response.user.role === 'driver' ? '/driver/onboarding' : '/customer/onboarding';
          navigate(route);
        } else {
          // Redirect to dashboard for verified users
          const route = response.user.role === 'driver' ? '/driver/dashboard' : response.user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard';
          navigate(route);
        }
      } else {
        await register(formData);
        const response = await login(formData.email, formData.password);
        const route = response.user.role === 'driver' ? '/driver/onboarding' : '/customer/onboarding';
        navigate(route);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const roleLabel = selectedRole === 'driver' ? 'Driver' : 'Customer';

  return (
    <div className="app-shell flex items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-5xl">
        <div className="surface-card overflow-hidden">
          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            <aside className="hidden lg:flex flex-col justify-between border-r border-soft-mcm-sage/25 bg-gradient-to-br from-soft-mcm-sage/15 via-transparent to-soft-mcm-rose/15 p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-soft-mcm-sage/40 bg-soft-mcm-sage/10 px-3 py-1 text-xs font-semibold text-soft-mcm-sage mb-6">
                  <Sparkles size={14} />
                  Smart Transit Payments
                </div>
                <h1 className="text-4xl font-bold text-soft-mcm-light leading-tight mb-4">Welcome to tapNGo</h1>
                <p className="text-soft-mcm-gray max-w-md">
                  One place for quick ride payments, wallet tracking, and verified digital transactions.
                </p>
              </div>

              <div className="space-y-3 text-sm text-soft-mcm-light">
                <p className="flex items-center gap-2"><span className="text-soft-mcm-sage">•</span> Fast role-based onboarding</p>
                <p className="flex items-center gap-2"><span className="text-soft-mcm-sage">•</span> Real-time wallet and earnings visibility</p>
                <p className="flex items-center gap-2"><span className="text-soft-mcm-sage">•</span> Secure and verified payment experience</p>
              </div>
            </aside>

            <section className="p-6 sm:p-8 lg:p-10">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="mb-5 inline-flex items-center gap-2 rounded-lg border border-soft-mcm-sage/30 px-3 py-1.5 text-sm font-semibold text-soft-mcm-sage hover:bg-soft-mcm-sage-dark/10"
              >
                <ArrowLeft size={16} />
                Back to Home
              </button>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-soft-mcm-rose mb-1">tapNGo</h2>
                <p className="text-soft-mcm-gray text-sm">Sign in to continue to your dashboard</p>
              </div>

              {!selectedRole ? (
                <div className="space-y-4">
                  <p className="text-soft-mcm-light font-semibold">Choose your role to continue</p>

                  <button
                    onClick={() => {
                      setSelectedRole('driver');
                      setIsLogin(true);
                      setError('');
                      setFormData({ email: '', phone: '', name: '', password: '', role: 'driver' });
                    }}
                    className="w-full rounded-2xl border border-soft-mcm-sage/40 bg-gradient-to-r from-soft-mcm-sage to-soft-mcm-sage-dark px-5 py-4 text-white font-bold text-lg transition hover:from-soft-mcm-sage-dark hover:to-soft-mcm-sage-deep shadow-lg"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Truck size={26} />
                      I'm a Driver
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedRole('customer');
                      setIsLogin(true);
                      setError('');
                      setFormData({ email: '', phone: '', name: '', password: '', role: 'customer' });
                    }}
                    className="w-full rounded-2xl border border-soft-mcm-rose/40 bg-gradient-to-r from-soft-mcm-rose to-soft-mcm-rose-dark px-5 py-4 text-white font-bold text-lg transition hover:from-soft-mcm-rose-dark hover:to-soft-mcm-rose-deep shadow-lg"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <ShoppingCart size={26} />
                      I'm a Customer
                    </span>
                  </button>

                  <p className="text-soft-mcm-gray text-xs text-center pt-2">
                    Admin and merchant accounts require registration from administrators.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 rounded-xl border border-soft-mcm-sage/30 bg-soft-mcm-dark/45 p-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-soft-mcm-gray text-xs">Signing in as</p>
                      <p className="text-soft-mcm-sage font-bold text-base capitalize">{roleLabel}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRole(null);
                        setError('');
                        setFormData({ email: '', phone: '', name: '', password: '', role: 'customer' });
                      }}
                      className="rounded-lg border border-soft-mcm-sage/35 px-3 py-1.5 text-sm font-semibold text-soft-mcm-light hover:bg-soft-mcm-sage-dark/10"
                    >
                      Change Role
                    </button>
                  </div>

                  <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-soft-mcm-sage/25 bg-soft-mcm-dark/45 p-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(true);
                        setError('');
                        setFormData({ ...formData, email: '', phone: '', name: '', password: '' });
                      }}
                      className={`rounded-lg py-2 text-sm font-semibold ${isLogin ? 'bg-soft-mcm-rose text-soft-mcm-dark' : 'text-soft-mcm-light hover:bg-soft-mcm-sage-dark/10'}`}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(false);
                        setError('');
                        setFormData({ ...formData, email: '', phone: '', name: '', password: '' });
                      }}
                      className={`rounded-lg py-2 text-sm font-semibold ${!isLogin ? 'bg-soft-mcm-rose text-soft-mcm-dark' : 'text-soft-mcm-light hover:bg-soft-mcm-sage-dark/10'}`}
                    >
                      Register
                    </button>
                  </div>

                  {error && (
                    <div className="mb-5 rounded-xl border border-red-500/45 bg-red-900/20 px-4 py-3 text-red-200 flex gap-2">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <>
                        <div className="relative">
                          <User size={19} className="absolute left-3 top-3.5 text-soft-mcm-sage" />
                          <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required={!isLogin}
                            className="soft-input pl-11"
                          />
                        </div>
                        <div className="relative">
                          <Phone size={19} className="absolute left-3 top-3.5 text-soft-mcm-sage" />
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required={!isLogin}
                            className="soft-input pl-11"
                          />
                        </div>
                      </>
                    )}

                    <div className="relative">
                      <Mail size={19} className="absolute left-3 top-3.5 text-soft-mcm-sage" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="soft-input pl-11"
                      />
                    </div>

                    <div className="relative">
                      <Lock size={19} className="absolute left-3 top-3.5 text-soft-mcm-sage" />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="soft-input pl-11"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="soft-btn-primary w-full py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Please wait...' : isLogin ? `Login as ${roleLabel}` : `Register as ${roleLabel}`}
                    </button>
                  </form>

                  <div className="mt-7 rounded-xl border border-soft-mcm-sage/25 bg-soft-mcm-dark/45 p-4 text-xs">
                    <p className="text-soft-mcm-sage font-semibold mb-2">Verified accounts (skip onboarding)</p>
                    <div className="text-soft-mcm-light space-y-1 mb-3">
                      {selectedRole === 'driver' && <p><strong>Driver:</strong> driver@tapngo.com / password123</p>}
                      {selectedRole === 'customer' && <p><strong>Customer:</strong> customer@tapngo.com / password123</p>}
                    </div>

                    <p className="text-soft-mcm-rose font-semibold mb-2">Unverified accounts (require onboarding)</p>
                    <div className="text-soft-mcm-light space-y-1">
                      {selectedRole === 'driver' && <p><strong>Driver:</strong> unverified.driver@tapngo.com / password123</p>}
                      {selectedRole === 'customer' && <p><strong>Customer:</strong> unverified.customer@tapngo.com / password123</p>}
                    </div>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Phone({ size, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <polyline points="22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></polyline>
    </svg>
  );
}
