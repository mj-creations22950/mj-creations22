import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Calendar, Settings, LogOut, ShoppingBag, CreditCard, MapPin, Download, Edit } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
    navigate('/');
  };

  if (!user) return null;

  // Mock data
  const orders = [
    { id: 'CMD-001', date: '2025-01-20', service: 'Plomberie', status: 'En cours', amount: '280€' },
    { id: 'CMD-002', date: '2025-01-15', service: 'Chauffage', status: 'Terminé', amount: '1200€' },
    { id: 'CMD-003', date: '2025-01-10', service: 'Électricité', status: 'Terminé', amount: '850€' }
  ];

  const quotes = [
    { id: 'DEV-001', service: 'VMC Double Flux', date: '2025-01-18', status: 'En attente', amount: '2800€' },
    { id: 'DEV-002', service: 'Rénovation SDB', date: '2025-01-12', status: 'Accepté', amount: '3500€' }
  ];

  const appointments = [
    { id: 1, service: 'Installation chaudière', date: '2025-02-05', time: '14:00', status: 'Confirmé' },
    { id: 2, service: 'Réparation fuite', date: '2025-01-28', time: '10:00', status: 'Confirmé' }
  ];

  const invoices = [
    { id: 'FACT-001', date: '2025-01-15', amount: '1200€', status: 'Payée' },
    { id: 'FACT-002', date: '2025-01-10', amount: '850€', status: 'Payée' }
  ];

  const addresses = [
    { id: 1, type: 'Principale', address: '15 Rue de la République', city: 'Rennes', zipCode: '35000' },
    { id: 2, type: 'Secondaire', address: '8 Avenue du Port', city: 'Brest', zipCode: '29200' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <User className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Bonjour, {user.name}</h1>
              <p className="text-lg opacity-90">{user.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="overflow-x-auto">
              <TabsList className="inline-flex gap-2 bg-transparent h-auto min-w-full">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap">
                  <User className="h-4 w-4 mr-2" />
                  Tableau de bord
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Commandes
                </TabsTrigger>
                <TabsTrigger value="quotes" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap">
                  <FileText className="h-4 w-4 mr-2" />
                  Devis
                </TabsTrigger>
                <TabsTrigger value="invoices" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap">
                  <Download className="h-4 w-4 mr-2" />
                  Factures
                </TabsTrigger>
                <TabsTrigger value="appointments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap">
                  <Calendar className="h-4 w-4 mr-2" />
                  RDV
                </TabsTrigger>
                <TabsTrigger value="addresses" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap">
                  <MapPin className="h-4 w-4 mr-2" />
                  Adresses
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </TabsTrigger>
                <button onClick={handleLogout} className="px-4 py-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 font-bold whitespace-nowrap flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </button>
              </TabsList>
            </div>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-none shadow-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                  <CardContent className="p-8">
                    <ShoppingBag className="h-12 w-12 mb-4 opacity-80" />
                    <div className="text-4xl font-black mb-2">{orders.length}</div>
                    <div className="text-lg opacity-90">Commandes</div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <CardContent className="p-8">
                    <FileText className="h-12 w-12 mb-4 opacity-80" />
                    <div className="text-4xl font-black mb-2">{quotes.length}</div>
                    <div className="text-lg opacity-90">Devis</div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                  <CardContent className="p-8">
                    <Calendar className="h-12 w-12 mb-4 opacity-80" />
                    <div className="text-4xl font-black mb-2">{appointments.length}</div>
                    <div className="text-lg opacity-90">Rendez-vous</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-xl">
                  <CardHeader>
                    <CardTitle>Commandes récentes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-bold text-gray-900">{order.service}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-cyan-600">{order.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'Terminé' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl">
                  <CardHeader>
                    <CardTitle>Prochains rendez-vous</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-bold text-gray-900">{apt.service}</p>
                          <p className="text-sm text-gray-600">{apt.date} à {apt.time}</p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                          {apt.status}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Mes Commandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-lg text-gray-900">{order.service}</p>
                            <p className="text-sm text-gray-600">Commande #{order.id} - {order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-2xl text-cyan-600">{order.amount}</p>
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            order.status === 'Terminé' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Autres tabs... */}
            <TabsContent value="quotes">
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Mes Devis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quotes.map((quote) => (
                      <div key={quote.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-bold text-lg">{quote.service}</p>
                          <p className="text-sm text-gray-600">#{quote.id} - {quote.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-2xl text-cyan-600">{quote.amount}</p>
                          <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">{quote.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoices">
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Mes Factures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.map((inv) => (
                      <div key={inv.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-bold text-lg">{inv.id}</p>
                          <p className="text-sm text-gray-600">{inv.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-2xl text-cyan-600">{inv.amount}</p>
                            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">{inv.status}</span>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Mes Rendez-vous</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-bold text-lg">{apt.service}</p>
                          <p className="text-sm text-gray-600">{apt.date} à {apt.time}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">{apt.status}</span>
                          <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Mes Adresses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-bold text-lg">{addr.type}</p>
                          <p className="text-sm text-gray-600">{addr.address}</p>
                          <p className="text-sm text-gray-600">{addr.zipCode} {addr.city}</p>
                        </div>
                        <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Paramètres</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Nom</Label>
                        <Input value={user.name} className="mt-2" />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input value={user.email} className="mt-2" />
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold">
                      Enregistrer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Profile;