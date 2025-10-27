import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Panier vide",
        description: "Ajoutez des prestations avant de passer commande.",
        variant: "destructive"
      });
      return;
    }

    const user = localStorage.getItem('user');
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour passer commande.",
      });
      navigate('/login');
      return;
    }

    // Mock order creation
    toast({
      title: "Commande validée !",
      description: "Votre commande a été enregistrée. Nous vous contacterons sous 24h.",
    });
    clearCart();
    navigate('/profile');
  };

  const subtotal = getCartTotal();
  const tva = subtotal * 0.2;
  const total = subtotal + tva;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-16 shadow-xl">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">Votre panier est vide</h2>
            <p className="text-lg text-gray-600 mb-8">
              Découvrez nos prestations et ajoutez-les à votre panier
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold"
              onClick={() => navigate('/catalog')}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Voir le catalogue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mon Panier</h1>
          <p className="text-xl opacity-90">{cart.length} prestation(s) sélectionnée(s)</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="border-none shadow-lg overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-lg font-bold w-12 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-black text-cyan-600">
                              {(item.price * item.quantity).toFixed(2)}€
                            </div>
                            <div className="text-sm text-gray-600">{item.price}€ x {item.quantity}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/catalog')}
                  className="flex-1 font-bold"
                >
                  Continuer mes achats
                </Button>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="border-red-600 text-red-600 hover:bg-red-50 font-bold"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Vider le panier
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-none shadow-xl sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl">Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Sous-total</span>
                      <span className="font-semibold">{subtotal.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>TVA (20%)</span>
                      <span className="font-semibold">{tva.toFixed(2)}€</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">Total</span>
                        <span className="text-3xl font-black text-cyan-600">{total.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg py-6"
                    onClick={handleCheckout}
                  >
                    Valider la commande
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-xs text-center text-gray-600">
                    Un devis détaillé vous sera envoyé sous 24h
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;