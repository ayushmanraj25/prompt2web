import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Lock, Mail, User, Shield, Loader2, Check } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.email || !formData.password) {
      setErrorMsg('All fields are required.');
      return;
    }

    if (!isLogin && !formData.name) {
      setErrorMsg('Full Name is required.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      const user = {
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        token: `session_${Date.now()}`,
      };
      localStorage.setItem('prompt2web_user', JSON.stringify(user));
      setTimeout(() => {
        navigate('/dashboard');
      }, 400);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-ochre-600 text-clay-100 flex flex-col justify-center items-center p-8 selection:bg-clay-800 selection:text-white relative overflow-hidden">
      {/* Top back link */}
      <div className="absolute top-8 left-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-clay-100 hover:text-white px-4 py-2.5 rounded-xl bg-clay-900/90 border border-clay-800 shadow-md transition-all duration-200 active:scale-95 hover:border-clay-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>HOME</span>
        </Link>
      </div>

      {/* Main Container with Smooth Modal Pop Animation */}
      <div className="w-full max-w-md bg-clay-900 border border-clay-700 rounded-3xl p-10 shadow-2xl space-y-8 animate-modal-pop">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-clay-800 border border-clay-700 flex items-center justify-center text-clay-200 mx-auto font-bold text-2xl shadow-inner font-mono hover:scale-105 transition-transform">
            ⚡
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono uppercase">
            {isLogin ? 'SESSION ACCESS' : 'NEW OPERATOR'}
          </h1>
          <p className="text-xs font-mono text-clay-400">
            {isLogin ? 'AUTHENTICATE TO PROCEED' : 'CREATE WORKSPACE IDENTITY'}
          </p>
        </div>

        {/* Tab Toggle with Smooth Active Slider */}
        <div className="relative grid grid-cols-2 p-1.5 rounded-xl bg-clay-950 border border-clay-800 text-xs font-mono">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setErrorMsg('');
            }}
            className={`relative z-10 py-2.5 rounded-lg transition-all duration-200 ${
              isLogin
                ? 'bg-clay-800 text-white font-bold shadow-md border border-clay-700'
                : 'text-clay-400 hover:text-white'
            }`}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setErrorMsg('');
            }}
            className={`relative z-10 py-2.5 rounded-lg transition-all duration-200 ${
              !isLogin
                ? 'bg-clay-800 text-white font-bold shadow-md border border-clay-700'
                : 'text-clay-400 hover:text-white'
            }`}
          >
            SIGN UP
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs font-mono text-center animate-slide-up">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-1.5 animate-slide-up">
              <label className="block text-xs font-mono text-clay-300 uppercase">
                Operator Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-clay-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Morgan"
                  className="w-full clay-input pl-11"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-clay-300 uppercase">
              Email Identifier
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-clay-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="dev@prompt2web.io"
                className="w-full clay-input pl-11"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-clay-300 uppercase">
              Security Key
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-clay-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="w-full clay-input pl-11"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full btn-terracotta py-3.5 text-xs font-mono uppercase font-bold tracking-wider mt-2 group"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                AUTHENTICATING...
              </span>
            ) : isSuccess ? (
              <span className="flex items-center gap-2 text-emerald-300">
                <Check className="w-4 h-4" />
                ACCESS GRANTED
              </span>
            ) : (
              <>
                <span>{isLogin ? 'ENTER DASHBOARD' : 'REGISTER WORKSPACE'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                localStorage.setItem('prompt2web_user', JSON.stringify({ name: 'Demo Operator', email: 'demo@prompt2web.io' }));
                navigate('/dashboard');
              }, 300);
            }}
            className="w-full btn-clay-ghost py-3 text-xs font-mono uppercase text-clay-200 hover:text-white group"
          >
            <Shield className="w-4 h-4 text-clay-400 group-hover:scale-110 transition-transform" />
            <span>QUICK DEMO ACCESS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
