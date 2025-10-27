import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { services } from '../data/mock';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(services[0]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Nos Services</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Une expertise complète pour tous vos besoins en installation et réparation
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6 mb-12">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                  selectedService.id === service.id
                    ? 'bg-white shadow-xl scale-105'
                    : 'bg-white/50 hover:bg-white hover:shadow-lg'
                }`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: service.color }}>
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </button>
            ))}
          </div>

          {/* Selected Service Detail */}
          <Card className="border-none shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-96 lg:h-auto">
                <img 
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{ background: `linear-gradient(135deg, ${selectedService.color}40, ${selectedService.color}80)` }}
                ></div>
              </div>
              <div className="p-8 lg:p-12 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-3 mb-4">
                    <span className="text-5xl">{selectedService.icon}</span>
                    <h2 className="text-3xl font-bold" style={{ color: selectedService.color }}>
                      {selectedService.title}
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600">
                    {selectedService.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-xl text-gray-900">Nos prestations :</h3>
                  <ul className="space-y-3">
                    {selectedService.services.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: selectedService.color }} />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full text-white"
                    style={{ backgroundColor: selectedService.color }}
                    asChild
                  >
                    <Link to="/devis">
                      Demander un devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <p className="text-sm text-center text-gray-600">
                    Intervention rapide • Devis gratuit • Garantie décennale
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Besoin d'un service spécifique ?
          </h2>
          <p className="text-xl text-gray-600">
            Contactez-nous pour discuter de votre projet. Nous trouverons la solution adaptée à vos besoins.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white" asChild>
              <Link to="/contact">Nous contacter</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-cyan-600 text-cyan-600" asChild>
              <a href="tel:0611203741">Appeler maintenant</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
