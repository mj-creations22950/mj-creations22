import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { testimonials } from '../data/mock';
import { Star, Quote } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Testimonials = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    rating: 5,
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Merci pour votre avis !",
      description: "Votre témoignage a été soumis avec succès.",
    });
    setFormData({ name: '', service: '', rating: 5, comment: '' });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Témoignages Clients</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            La satisfaction de nos clients est notre meilleure récompense
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex">{renderStars(5)}</div>
            <span className="text-2xl font-bold">4.9/5</span>
            <span className="text-lg opacity-90">(280+ avis)</span>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <Quote className="h-8 w-8 text-cyan-600 opacity-50" />
                    <div className="flex">{renderStars(testimonial.rating)}</div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">"{testimonial.text}"</p>
                  <div className="pt-4 border-t">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                    <div className="text-xs text-cyan-600 font-semibold mt-2">{testimonial.service}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Laissez-nous votre avis</h2>
            <p className="text-lg text-gray-600">
              Votre retour d'expérience nous aide à nous améliorer
            </p>
          </div>
          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Votre nom *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="service">Service utilisé *</Label>
                  <Input
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    placeholder="Ex: Plomberie, Chauffage..."
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Votre note *</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-8 w-8 ${rating <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="comment">Votre commentaire *</Label>
                  <Textarea
                    id="comment"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows={5}
                    required
                    className="mt-2"
                    placeholder="Partagez votre expérience avec MJ Créations..."
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                  Envoyer mon avis
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
