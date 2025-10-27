import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { portfolioItems, services } from '../data/mock';
import { MapPin, Clock } from 'lucide-react';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'Tous' },
    ...services.map(s => ({ id: s.id, label: s.title }))
  ];

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Nos Réalisations</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Découvrez nos projets récents et la qualité de notre travail
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                variant={filter === cat.id ? 'default' : 'outline'}
                className={filter === cat.id ? 'bg-cyan-600 hover:bg-cyan-700' : 'border-cyan-600 text-cyan-600 hover:bg-cyan-50'}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const service = services.find(s => s.id === item.category);
              return (
                <Card key={item.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: service?.color }}
                      >
                        {service?.title}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Votre Projet, Notre Expertise
          </h2>
          <p className="text-xl text-gray-600">
            Transformez votre intérieur avec nos services professionnels
          </p>
          <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white" asChild>
            <a href="/devis">Demander un devis gratuit</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
