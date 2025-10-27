import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { services, stats } from '../data/mock';
import { Phone, Mail, ArrowRight, Star, Award, Clock, Shield, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 py-32 px-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1679240219409-51901fb6d2db?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0b29sc3xlbnwwfHx8fDE3NjE1NzA4MDB8MA&ixlib=rb-4.1.0&q=85')] opacity-10 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-white">
              <div className="inline-block">
                <div className="flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-3">
                  <Award className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm font-semibold">Artisan Certifié depuis 2009</span>
                </div>
              </div>
              <h1 className="text-6xl md:text-7xl font-black leading-tight">
                MJ Créations
                <span className="block text-cyan-400 mt-2">Votre Expert en Bretagne</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Plomberie • Chauffage • Électricité • VMC
                <span className="block mt-2 text-cyan-400 font-semibold">Confort. Fiabilité. Réactivité.</span>
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-xl shadow-cyan-500/50 transition-all duration-300 hover:scale-105" asChild>
                  <Link to="/devis">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Devis Gratuit en 24h
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
                  <a href="tel:0611203741">
                    <Phone className="mr-2 h-5 w-5" />
                    06.11.20.37.41
                  </a>
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-bold text-lg">4.9/5</span>
                </div>
                <div className="h-8 w-px bg-white/30"></div>
                <div className="text-sm">
                  <span className="font-bold text-lg">280+</span> avis clients
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/30 border-4 border-cyan-500/30">
                <img 
                  src="https://images.unsplash.com/photo-1761353855019-05f2f3ed9c43?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwbHVtYmluZyUyMGluc3RhbGxhdGlvbnxlbnwwfHx8fDE3NjE1NzA3OTV8MA&ixlib=rb-4.1.0&q=85"
                  alt="Installation professionnelle"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-cyan-500 to-blue-600 p-8 rounded-2xl shadow-2xl border-4 border-white">
                <div className="text-5xl font-black text-white">15+</div>
                <div className="text-sm text-white/90 font-semibold">Années d'expertise</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </div>
                <div className="text-gray-700 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-cyan-600 font-bold text-sm uppercase tracking-widest bg-cyan-100 px-4 py-2 rounded-full">Nos Services</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Expertise Complète
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions professionnelles pour tous vos besoins
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border-none bg-white hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  <div 
                    className="absolute inset-0 opacity-60 group-hover:opacity-70 transition-opacity"
                    style={{ background: `linear-gradient(135deg, ${service.color}80, ${service.color}CC)` }}
                  ></div>
                  <div className="absolute top-6 left-6 text-6xl filter drop-shadow-lg">{service.icon}</div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-black group-hover:scale-105 transition-transform" style={{ color: service.color }}>
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 font-medium">{service.description}</p>
                  <ul className="space-y-2">
                    {service.services.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="font-bold" style={{ color: service.color }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/services" className="block">
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white transition-all"
                    >
                      En savoir plus <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Pourquoi Nous Choisir ?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-10 border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-gradient-to-br from-white to-cyan-50">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Intervention Rapide</h3>
              <p className="text-gray-600 leading-relaxed">
                Service d'urgence 24h/24 et 7j/7. Nous intervenons dans les 2 heures pour vos urgences.
              </p>
            </Card>
            <Card className="text-center p-10 border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/50">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Artisans Certifiés</h3>
              <p className="text-gray-600 leading-relaxed">
                Équipe qualifiée et assurée. Respect des normes en vigueur et garantie décennale.
              </p>
            </Card>
            <Card className="text-center p-10 border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-gradient-to-br from-white to-cyan-50">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Prix Transparents</h3>
              <p className="text-gray-600 leading-relaxed">
                Devis gratuits et détaillés. Aucune surprise, tarifs clairs communiqués à l'avance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxob21lJTIwcmVub3ZhdGlvbnxlbnwwfHx8fDE3NjE1NzA4MDN8MA&ixlib=rb-4.1.0&q=85')] opacity-10 bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-5xl md:text-6xl font-black leading-tight">
            Besoin d'un Artisan Professionnel ?
          </h2>
          <p className="text-2xl opacity-90">
            Contactez-nous dès maintenant pour un devis gratuit et sans engagement
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-2xl shadow-cyan-500/50 px-8 py-6 text-lg font-bold hover:scale-105 transition-all" asChild>
              <Link to="/devis">Demander un devis</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold" asChild>
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8">
            <a href="tel:0611203741" className="flex items-center gap-3 hover:opacity-80 transition text-lg font-semibold">
              <Phone className="h-6 w-6" />
              06.11.20.37.41
            </a>
            <a href="mailto:mj.creations22950@gmail.com" className="flex items-center gap-3 hover:opacity-80 transition text-lg font-semibold">
              <Mail className="h-6 w-6" />
              mj.creations22950@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;