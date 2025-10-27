import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Phone, User } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Réalisations', path: '/portfolio' },
    { name: 'Témoignages', path: '/testimonials' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_faf0138a-b75a-4631-8591-33611d8fb33c/artifacts/1i3w1awh_IMG_20250922_173712_727.jpg"
              alt="MJ Créations"
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-gray-900">MJ Créations</div>
              <div className="text-xs text-gray-600">Artisan en Bretagne</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-cyan-50 text-cyan-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-cyan-600 text-cyan-600 hover:bg-cyan-50"
              asChild
            >
              <a href="tel:0611203741">
                <Phone className="h-4 w-4 mr-2" />
                06.11.20.37.41
              </a>
            </Button>
            <Button 
              size="sm"
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
              asChild
            >
              <Link to="/devis">Devis gratuit</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <Link to="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-cyan-50 text-cyan-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Button 
                variant="outline" 
                className="w-full border-cyan-600 text-cyan-600"
                asChild
              >
                <a href="tel:0611203741">
                  <Phone className="h-4 w-4 mr-2" />
                  06.11.20.37.41
                </a>
              </Button>
              <Button 
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                asChild
              >
                <Link to="/devis">Devis gratuit</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <Link to="/login">
                  <User className="h-5 w-5 mr-2" />
                  Mon compte
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
