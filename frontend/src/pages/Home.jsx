import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { services, stats } from '../data/mock';
import { Phone, Mail, MapPin, ArrowRight, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-50 via-blue-50 to-orange-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <img 
                  src="https://customer-assets.emergentagent.com/job_faf0138a-b75a-4631-8591-33611d8fb33c/artifacts/1i3w1awh_IMG_20250922_173712_727.jpg"
                  alt="MJ Créations Logo"
                  className="h-24 w-auto"
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Votre Artisan de Confiance en Bretagne
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Plomberie, Chauffage, Sanitaire, Électricité, VMC - Confort, Fiabilité, Réactivité.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white" asChild>
                  <Link to="/devis">Demander un devis gratuit <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50" asChild>
                  <a href="tel:0611203741">
                    <Phone className="mr-2 h-5 w-5" />
                    06.11.20.37.41
                  </a>
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.9/5</span>
                  <span>(280+ avis)</span>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div>Intervention rapide 24/7</div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwbHVtYmVyfGVufDB8fHx8MTc2MTU3MDE1N3ww&ixlib=rb-4.1.0&q=85"
                  alt="Artisan au travail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold text-cyan-600">15+</div>
                <div className="text-sm text-gray-600">Années d'expérience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expertise complète pour tous vos besoins en plomberie, chauffage, électricité et ventilation
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-none"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div 
                    className="absolute inset-0 opacity-80"
                    style={{ background: `linear-gradient(135deg, ${service.color}20, ${service.color}40)` }}
                  ></div>
                  <div className="absolute top-4 left-4 text-5xl">{service.icon}</div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl" style={{ color: service.color }}>
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{service.description}</p>
                  <ul className="space-y-2">
                    {service.services.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-cyan-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/services" className="block">
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:bg-cyan-50 group-hover:text-cyan-600"
                    >
                      En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir MJ Créations ?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Intervention Rapide</h3>
              <p className="text-gray-600">
                Service d'urgence 24h/24 et 7j/7. Nous intervenons dans les 2 heures pour vos urgences.
              </p>
            </Card>
            <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Artisans Certifiés</h3>
              <p className="text-gray-600">
                Équipe qualifiée et assurée. Respect des normes en vigueur et garantie décennale.
              </p>
            </Card>
            <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Prix Transparents</h3>
              <p className="text-gray-600">
                Devis gratuits et détaillés. Aucune surprise, tarifs clairs communiqués à l'avance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Besoin d'un Artisan Professionnel ?
          </h2>
          <p className="text-xl opacity-90">
            Contactez-nous dès maintenant pour un devis gratuit et sans engagement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100" asChild>
              <Link to="/devis">Demander un devis</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm pt-8">
            <a href="tel:0611203741" className="flex items-center gap-2 hover:opacity-80 transition">
              <Phone className="h-5 w-5" />
              06.11.20.37.41
            </a>
            <a href="mailto:mj.creations22950@gmail.com" className="flex items-center gap-2 hover:opacity-80 transition">
              <Mail className="h-5 w-5" />
              mj.creations22950@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
