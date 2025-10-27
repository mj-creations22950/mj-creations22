import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { prestations, services } from '../data/mock';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';
import { ShoppingCart, Clock, TrendingUp, Filter } from 'lucide-react';

const Catalog = () => {
  const [filter, setFilter] = useState('all');
  const { addToCart } = useCart();
  const { toast } = useToast();

  const categories = [
    { id: 'all', label: 'Toutes les prestations', count: prestations.length },
    ...services.map(s => ({
      id: s.id,
      label: s.title,
      color: s.color,
      count: prestations.filter(p => p.categoryId === s.id).length
    }))
  ];

  const filteredPrestations = filter === 'all'
    ? prestations
    : prestations.filter(p => p.categoryId === filter);

  const handleAddToCart = (prestation) => {
    addToCart(prestation);
    toast({
      title: "Ajouté au panier !",
      description: `${prestation.name} a été ajouté à votre panier.`,
    });
  };

  const getCategoryColor = (categoryId) => {
    const service = services.find(s => s.id === categoryId);
    return service?.color || '#00B4D8';
  };

  const getCategoryName = (categoryId) => {
    const service = services.find(s => s.id === categoryId);
    return service?.title || '';
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <ShoppingCart className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Catalogue de Prestations</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Découvrez toutes nos prestations et ajoutez-les à votre panier
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="font-bold text-gray-900">Filtrer par catégorie :</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                variant={filter === cat.id ? 'default' : 'outline'}
                className={filter === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold'
                  : 'border-2 border-gray-200 text-gray-700 hover:bg-gray-100 font-bold'
                }
              >
                {cat.label}
                <Badge className="ml-2" variant="secondary">{cat.count}</Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Prestations Grid */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrestations.map((prestation) => {
              const categoryColor = getCategoryColor(prestation.categoryId);
              const categoryName = getCategoryName(prestation.categoryId);

              return (
                <Card
                  key={prestation.id}
                  className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-none hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={prestation.image}
                      alt={prestation.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{ background: `linear-gradient(135deg, ${categoryColor}40, ${categoryColor}80)` }}
                    ></div>
                    {prestation.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-yellow-500 text-white font-bold">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Populaire
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <Badge
                        className="font-bold text-white"
                        style={{ backgroundColor: categoryColor }}
                      >
                        {categoryName}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-black group-hover:text-cyan-600 transition-colors">
                      {prestation.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {prestation.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Durée : {prestation.duration}</span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Prix</div>
                          <div className="text-3xl font-black text-cyan-600">
                            {prestation.price}€
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleAddToCart(prestation)}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Ajouter au panier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredPrestations.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600">Aucune prestation trouvée dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Catalog;