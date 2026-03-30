import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Zap, Shield, TrendingUp, Users, MapPin, QrCode, Smartphone, Menu, X, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Instant Tap Payments',
      description: 'Pay with just a tap of your NFC card. No change needed, no disputes, instant settlement.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Bank-Level Security',
      description: 'Your data is encrypted with enterprise-grade security. 100% safe and secure transactions.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Earn More',
      description: 'Drivers earn better with digital payments. Track earnings in real-time, withdraw instantly.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'For Everyone',
      description: 'Works for auto drivers, taxis, retail shops, food courts. One app for all payments.'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Location-First',
      description: 'Find drivers nearby, see ratings, track earnings by area. All location-based insights.'
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: 'Fallback QR Codes',
      description: 'If NFC fails, scan the driver\'s QR code for instant Google Pay payment.'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Download & Sign Up',
      description: 'Create your account in 2 minutes. For drivers or customers.',
      icon: '📱'
    },
    {
      step: 2,
      title: 'Complete Your Profile',
      description: 'Add your details and verify your phone. Takes 5 minutes.',
      icon: '✓'
    },
    {
      step: 3,
      title: 'Get Your Card/NFC',
      description: 'Receive your NFC card or digital payment card. Start earning/paying.',
      icon: '💳'
    },
    {
      step: 4,
      title: 'Start Using',
      description: 'Tap to pay (driver) or tap to earn (passenger). Instant settlements!',
      icon: '⚡'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Drivers' },
    { number: '2M+', label: 'Monthly Transactions' },
    { number: '₹85Cr+', label: 'Payments Processed' },
    { number: '4.8★', label: 'Average Rating' }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Auto Driver',
      city: 'Bangalore',
      text: 'TapNGo changed my life! I earn 40% more with digital payments. No more change issues!'
    },
    {
      name: 'Priya Sharma',
      role: 'Passenger',
      city: 'Mumbai',
      text: 'Love the simplicity. Just tap and go. No waiting for change, no disputes. Perfect!'
    },
    {
      name: 'DMart Bangalore',
      role: 'Retail Manager',
      city: 'Bangalore',
      text: 'Our customers love TapNGo. Fast checkouts, instant settlement, zero fraud risk.'
    }
  ];

  const faqs = [
    {
      q: 'Is TapNGo safe?',
      a: 'Yes! We use bank-level encryption. Your data is protected with enterprise-grade security. All transactions are verified and secure.'
    },
    {
      q: 'How do I get started?',
      a: 'Download the app, sign up with phone number, complete your 5-minute profile setup, verify your phone, and you\'re ready to go!'
    },
    {
      q: 'What if NFC doesn\'t work?',
      a: 'No problem! Scan the driver\'s QR code to open Google Pay and pay via UPI. Works with all UPI apps.'
    },
    {
      q: 'How long does settlement take?',
      a: 'Money is settled to your UPI account within 4 hours. Most payments settle in 1-2 hours.'
    },
    {
      q: 'Can I use it offline?',
      a: 'NFC works without internet. Once you reconnect, your transaction syncs and settles automatically.'
    },
    {
      q: 'What cities does TapNGo support?',
      a: 'We\'re live in Bangalore, Mumbai, Delhi, Pune, Chennai, and expanding to 100+ cities. Check your area now!'
    }
  ];

  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="app-shell">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-soft-mcm-sage/25 bg-soft-mcm-dark/65 backdrop-blur-xl">
        <div className="section-wrap py-3">
          <div className="surface-card rounded-2xl border-soft-mcm-sage/25 bg-soft-mcm-dark/70 px-4 sm:px-5">
            <div className="flex h-14 justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-soft-mcm-sage to-soft-mcm-rose rounded-xl flex items-center justify-center font-bold text-soft-mcm-dark">
                  TN
                </div>
                <span className="text-xl font-bold">tapNGo</span>
              </div>

              <div className="hidden md:flex items-center gap-7">
                <a href="#features" className="text-soft-mcm-gray hover:text-soft-mcm-sage">Features</a>
                <a href="#how-it-works" className="text-soft-mcm-gray hover:text-soft-mcm-sage">How It Works</a>
                <a href="#faq" className="text-soft-mcm-gray hover:text-soft-mcm-sage">FAQ</a>
                <button
                  onClick={() => navigate('/login')}
                  className="px-5 py-2 rounded-xl font-semibold bg-gradient-to-r from-soft-mcm-sage to-soft-mcm-rose hover:from-soft-mcm-sage-dark hover:to-soft-mcm-rose-dark text-soft-mcm-dark hover:text-soft-mcm-light"
                >
                  Login
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden rounded-lg border border-soft-mcm-sage/35 p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden border-t border-soft-mcm-sage/25 py-4 space-y-2">
                <a href="#features" className="block py-2 text-soft-mcm-gray hover:text-soft-mcm-sage" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#how-it-works" className="block py-2 text-soft-mcm-gray hover:text-soft-mcm-sage" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                <a href="#faq" className="block py-2 text-soft-mcm-gray hover:text-soft-mcm-sage" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <button
                  onClick={() => navigate('/login')}
                  className="mt-2 w-full px-5 py-2 rounded-xl font-semibold bg-gradient-to-r from-soft-mcm-sage to-soft-mcm-rose hover:from-soft-mcm-sage-dark hover:to-soft-mcm-rose-dark text-soft-mcm-dark hover:text-soft-mcm-light"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-0 w-[30rem] h-[30rem] bg-soft-mcm-sage/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 right-0 w-[26rem] h-[26rem] bg-soft-mcm-rose/10 rounded-full blur-3xl" />
        </div>

        <div className="relative section-wrap py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-soft-mcm-light tracking-tight">
              Welcome to tapNGo
            </h1>
            <p className="text-xl md:text-2xl text-soft-mcm-taupe mb-4">
              The future of contactless payments for autorickshaw rides and retail
            </p>
            <p className="text-lg text-soft-mcm-gray mb-10 max-w-2xl mx-auto">
              Say goodbye to change issues. Tap once to pay. Instant settlement. Zero disputes. Available in 50+ cities across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-gradient-to-r from-soft-mcm-sage to-soft-mcm-rose hover:from-soft-mcm-sage-dark hover:to-soft-mcm-rose-dark rounded-xl font-bold text-lg text-soft-mcm-dark hover:text-soft-mcm-light transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight size={20} />
              </button>
              <button className="soft-btn-secondary px-8 py-4 text-lg">
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {stats.map((stat, i) => (
                <div key={i} className="surface-card border-soft-mcm-sage/25 p-4 md:p-5 text-center">
                  <p className="text-2xl md:text-3xl font-bold text-soft-mcm-sage">{stat.number}</p>
                  <p className="text-soft-mcm-gray text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="surface-card border-soft-mcm-sage/25 p-8 flex items-center justify-center min-h-80 bg-gradient-to-r from-soft-mcm-dark/70 to-soft-mcm-sage/10">
              <div className="text-center">
                <Smartphone className="w-20 h-20 mx-auto text-soft-mcm-sage mb-4" />
                <p className="text-xl font-semibold">Download tapNGo App</p>
                <p className="text-soft-mcm-gray mt-2">Coming to iOS & Android</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="surface-card border-soft-mcm-sage/25 p-4 flex items-start gap-3">
                <div className="w-10 h-10 bg-soft-mcm-sage/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="text-soft-mcm-sage" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Instant Settlements</p>
                  <p className="text-sm text-soft-mcm-gray">Money in your account within 4 hours</p>
                </div>
              </div>

              <div className="surface-card border-soft-mcm-sage/25 p-4 flex items-start gap-3">
                <div className="w-10 h-10 bg-soft-mcm-rose/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="text-soft-mcm-rose" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Bank-Level Security</p>
                  <p className="text-sm text-soft-mcm-gray">Enterprise-grade encryption & protection</p>
                </div>
              </div>

              <div className="surface-card border-soft-mcm-sage/25 p-4 flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <QrCode className="text-emerald-300" size={20} />
                </div>
                <div>
                  <p className="font-semibold">QR Code Fallback</p>
                  <p className="text-sm text-soft-mcm-gray">Works with all UPI apps (GPay, PhonePe, Paytm)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="section-wrap">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-soft-mcm-gray text-lg">Everything you need for seamless contactless payments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="surface-card surface-card-hover border-soft-mcm-sage/20 p-7">
                <div className="text-soft-mcm-sage mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-soft-mcm-gray">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-r from-soft-mcm-dark/70 via-soft-mcm-dark/55 to-soft-mcm-dark/70">
        <div className="section-wrap">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-soft-mcm-gray text-lg">Get started in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, i) => (
              <div key={i} className="relative">
                <div className="surface-card border-soft-mcm-sage/25 p-6 text-center h-full">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 text-soft-mcm-sage">{item.step}</h3>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-soft-mcm-gray text-sm">{item.description}</p>
                </div>

                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="text-soft-mcm-sage" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="section-wrap">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Users Say</h2>
            <p className="text-soft-mcm-gray text-lg">Join thousands of happy drivers and customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="surface-card border-soft-mcm-sage/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-soft-mcm-rose">★</span>
                  ))}
                </div>
                <p className="text-soft-mcm-taupe mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-soft-mcm-gray">{testimonial.role} • {testimonial.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-28 bg-gradient-to-r from-soft-mcm-dark/70 via-soft-mcm-dark/55 to-soft-mcm-dark/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-soft-mcm-gray text-lg">Got questions? We have answers</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="surface-card border-soft-mcm-sage/20 overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-soft-mcm-sage-dark/5"
                >
                  <span className="font-semibold text-left">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${openFAQ === i ? 'rotate-180' : ''}`}
                  />
                </button>

                {openFAQ === i && (
                  <div className="px-6 pb-4 text-soft-mcm-taupe border-t border-soft-mcm-sage/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="section-wrap">
          <div className="surface-card border-soft-mcm-sage/30 rounded-3xl p-10 md:p-16 text-center bg-gradient-to-br from-soft-mcm-dark/70 to-soft-mcm-sage/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Payments?</h2>
            <p className="text-xl text-soft-mcm-taupe mb-8 max-w-2xl mx-auto">
              Join thousands of drivers and customers already using tapNGo. Earn more, pay smarter.
            </p>

            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-gradient-to-r from-soft-mcm-sage to-soft-mcm-rose hover:from-soft-mcm-sage-dark hover:to-soft-mcm-rose-dark rounded-xl font-bold text-lg text-soft-mcm-dark hover:text-soft-mcm-light transition-transform hover:-translate-y-0.5"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-soft-mcm-sage/20 py-12 bg-soft-mcm-dark/70">
        <div className="section-wrap">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-soft-mcm-sage to-soft-mcm-rose rounded-lg flex items-center justify-center font-bold text-sm text-soft-mcm-dark">
                  TN
                </div>
                <span className="font-bold">tapNGo</span>
              </div>
              <p className="text-soft-mcm-gray text-sm">The future of contactless payments.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-soft-mcm-gray text-sm">
                <li><a href="#" className="hover:text-soft-mcm-sage">Features</a></li>
                <li><a href="#" className="hover:text-soft-mcm-sage">Security</a></li>
                <li><a href="#" className="hover:text-soft-mcm-sage">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-soft-mcm-gray text-sm">
                <li><a href="#" className="hover:text-soft-mcm-sage">About Us</a></li>
                <li><a href="#" className="hover:text-soft-mcm-sage">Blog</a></li>
                <li><a href="#" className="hover:text-soft-mcm-sage">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-soft-mcm-gray text-sm">
                <li><a href="#" className="hover:text-soft-mcm-sage">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-soft-mcm-sage">Terms of Service</a></li>
                <li><a href="#" className="hover:text-soft-mcm-sage">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-soft-mcm-sage/20 pt-8 text-center text-soft-mcm-gray text-sm">
            <p>&copy; 2026 tapNGo. All rights reserved. | Made with ❤️ for India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
