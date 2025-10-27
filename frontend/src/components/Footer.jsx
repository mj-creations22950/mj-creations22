import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <img 
              src="https://customer-assets.emergentagent.com/job_faf0138a-b75a-4631-8591-33611d8fb33c/artifacts/1i3w1awh_IMG_20250922_173712_727.jpg"
              alt="MJ Créations"
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="text-sm leading-relaxed">
              Votre artisan de confiance en Bretagne pour tous vos travaux de plomberie, chauffage, électricité et ventilation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-cyan-400 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-cyan-400 transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-cyan-400 transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-cyan-400 transition">Plomberie & Sanitaire</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition">Chauffage</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition">Électricité</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition">VMC / Ventilation</Link></li>
              <li><Link to="/devis" className="hover:text-cyan-400 transition">Demander un devis</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Liens Utiles</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/portfolio" className="hover:text-cyan-400 transition">Nos Réalisations</Link></li>
              <li><Link to="/testimonials" className="hover:text-cyan-400 transition">Témoignages</Link></li>
              <li><Link to="/blog" className="hover:text-cyan-400 transition">Blog & Conseils</Link></li>
              <li><Link to="/faq" className="hover:text-cyan-400 transition">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:0611203741" className="hover:text-cyan-400 transition">
                    06.11.20.37.41
                  </a>
                  <div className="text-xs text-gray-500">24h/24 - 7j/7</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:mj.creations22950@gmail.com" className="hover:text-cyan-400 transition break-all">
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

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© {currentYear} MJ Créations. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link to="/mentions-legales" className="hover:text-cyan-400 transition">Mentions légales</Link>
              <Link to="/cgv" className="hover:text-cyan-400 transition">CGV</Link>
              <Link to="/privacy" className="hover:text-cyan-400 transition">Politique de confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
