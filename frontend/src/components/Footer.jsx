import React from 'react';
import { Link } from 'react-router-dom';
import RotatingAiLogo from './RotatingAiLogo';
import { Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#08090c]/95 backdrop-blur-md pt-20 pb-16 px-6 sm:px-14 text-slate-300 font-sans w-full select-none">
      <div className="max-w-[1520px] mx-auto">
        {/* Main 5-Column Grid with generous spacing */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 pb-20">
          {/* Left Brand Column */}
          <div className="md:col-span-5 space-y-5">
            <Link to="/" className="flex items-center gap-3.5 group">
              <RotatingAiLogo size="sm" showDust={false} />
              <span className="font-black text-3xl tracking-tight text-white font-sans lowercase">
                prompt<span className="text-sky-400">2</span>web
              </span>
            </Link>
            <div className="space-y-2.5 max-w-md">
              <p className="text-base text-slate-300 font-sans leading-relaxed font-medium">
                Build production-ready web apps through natural conversation.
              </p>
              <p className="text-sm text-slate-400 font-sans leading-relaxed">
                Chat with autonomous AI agents that design, code, test, and deploy fullstack applications from start to finish.
              </p>
            </div>
          </div>

          {/* Right Links Columns with larger, legible typography */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
            {/* Product */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white font-sans tracking-wide">Product</h4>
              <ul className="space-y-3 text-sm text-slate-400 font-sans">
                <li><a href="#features" className="hover:text-white transition-colors">Build</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            {/* Solutions */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white font-sans tracking-wide">Solutions</h4>
              <ul className="space-y-3 text-sm text-slate-400 font-sans">
                <li><a href="#enterprise" className="hover:text-white transition-colors">Enterprise</a></li>
                <li><a href="#smb" className="hover:text-white transition-colors">SMB Owners</a></li>
                <li><a href="#agencies" className="hover:text-white transition-colors">IT Agencies</a></li>
                <li><a href="#pm" className="hover:text-white transition-colors">Product Managers</a></li>
                <li><a href="#ops" className="hover:text-white transition-colors">Operations Team</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white font-sans tracking-wide">Resources</h4>
              <ul className="space-y-3 text-sm text-slate-400 font-sans">
                <li><a href="#docs" className="hover:text-white transition-colors">Docs</a></li>
                <li><a href="#tutorials" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white font-sans tracking-wide">Company</h4>
              <ul className="space-y-3 text-sm text-slate-400 font-sans">
                <li><a href="#affiliates" className="hover:text-white transition-colors">Affiliates</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#info" className="hover:text-white transition-colors">Company Info</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#cookies" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#dpa" className="hover:text-white transition-colors">Data Processing Agreement</a></li>
                <li><a href="#subprocessors" className="hover:text-white transition-colors">Sub-processors</a></li>
                <li><a href="#preferences" className="hover:text-white transition-colors">Cookie preferences</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar with larger font */}
        <div className="pt-10 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-5 text-xs sm:text-sm font-mono text-slate-400">
          <div>
            COPYRIGHT &copy; PROMPT2WEB LABS 2026
          </div>

          <div className="text-center font-medium">
            DESIGNED AND BUILT BY THE AWESOME PEOPLE OF PROMPT2WEB <span className="text-sky-400">🩵</span>
          </div>

          <div className="flex items-center gap-6 text-slate-300">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Twitter / X">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="YouTube">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
