import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Phone, User, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ThemeSelector from './ThemeSelector';
import NotificationCenter from './NotificationCenter';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Catalogue', path: '/catalog' },
    { name: 'Réalisations', path: '/portfolio' },
    { name: 'Témoignages', path: '/testimonials' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
              <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">MJ Créations</div>
              <div className="text-xs text-gray-600 font-semibold">Artisan en Bretagne</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeSelector />
            <NotificationCenter />
            <Button 
              variant="outline" 
              size="sm"
              className="border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 font-bold"
              asChild
            >
              <a href="tel:0611203741">
                <Phone className="h-4 w-4 mr-2" />
                06.11.20.37.41
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              asChild
            >
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
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
                className={`block px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
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
                className="w-full border-2 border-cyan-600 text-cyan-600 font-bold"
                asChild
              >
                <a href="tel:0611203741">
                  <Phone className="h-4 w-4 mr-2" />
                  06.11.20.37.41
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full font-bold relative"
                asChild
              >
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Panier {cartCount > 0 && `(${cartCount})`}
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full font-bold"
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