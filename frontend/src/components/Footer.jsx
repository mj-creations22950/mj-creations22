import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="text-2xl font-black text-white">MJ Créations</div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Votre artisan de confiance en Bretagne pour tous vos travaux de plomberie, chauffage, électricité et ventilation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-black text-lg mb-6">Nos Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">Plomberie & Sanitaire</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">Chauffage</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">Électricité</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">VMC / Ventilation</Link></li>
              <li><Link to="/devis" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block font-semibold">Demander un devis</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-black text-lg mb-6">Liens Utiles</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/portfolio" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">Nos Réalisations</Link></li>
              <li><Link to="/testimonials" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">Témoignages</Link></li>
              <li><Link to="/blog" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">Blog & Conseils</Link></li>
              <li><Link to="/faq" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-black text-lg mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:0611203741" className="hover:text-cyan-400 transition-colors font-semibold">
                    06.11.20.37.41
                  </a>
                  <div className="text-xs text-gray-500 mt-1">24h/24 - 7j/7</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:mj.creations22950@gmail.com" className="hover:text-cyan-400 transition-colors break-all">
                  mj.creations22950@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Bretagne, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">© {currentYear} MJ Créations. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link to="/mentions-legales" className="hover:text-cyan-400 transition-colors">Mentions légales</Link>
              <Link to="/cgv" className="hover:text-cyan-400 transition-colors">CGV</Link>
              <Link to="/privacy" className="hover:text-cyan-400 transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;