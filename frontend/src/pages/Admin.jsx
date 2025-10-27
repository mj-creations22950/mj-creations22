import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { LayoutDashboard, Users, ShoppingBag, FileText, CreditCard, Calendar, Settings, TrendingUp, DollarSign, Package } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock admin data
  const stats = [
    { label: 'Commandes du mois', value: '48', change: '+12%', icon: ShoppingBag, color: 'from-cyan-500 to-blue-600' },
    { label: 'Chiffre d\\'affaires', value: '42,580€', change: '+18%', icon: DollarSign, color: 'from-green-500 to-teal-600' },
    { label: 'Nouveaux clients', value: '23', change: '+8%', icon: Users, color: 'from-purple-500 to-pink-600' },
    { label: 'Devis en attente', value: '15', change: '-5%', icon: FileText, color: 'from-orange-500 to-red-600' }
  ];

  const recentOrders = [
    { id: 'CMD-048', client: 'Sophie Martin', service: 'Plomberie', amount: '280€', status: 'En cours', date: '2025-01-20' },
    { id: 'CMD-047', client: 'Jean Dupont', service: 'Chauffage', amount: '1200€', status: 'Terminé', date: '2025-01-19' },
    { id: 'CMD-046', client: 'Marie Leblanc', service: 'Électricité', amount: '850€', status: 'En cours', date: '2025-01-18' },
    { id: 'CMD-045', client: 'Pierre Rousseau', service: 'VMC', amount: '2800€', status: 'Planifié', date: '2025-01-17' }
  ];

  const clients = [
    { id: 1, name: 'Sophie Martin', email: 'sophie.m@email.com', orders: 5, total: '3,280€', status: 'Actif' },
    { id: 2, name: 'Jean Dupont', email: 'jean.d@email.com', orders: 3, total: '4,500€', status: 'Actif' },
    { id: 3, name: 'Marie Leblanc', email: 'marie.l@email.com', orders: 7, total: '8,200€', status: 'VIP' }
  ];

  const upcomingAppointments = [
    { id: 1, client: 'Sophie Martin', service: 'Installation chaudière', date: '2025-01-25', time: '14:00' },
    { id: 2, client: 'Jean Dupont', service: 'Réparation fuite', date: '2025-01-26', time: '10:00' },
    { id: 3, client: 'Marie Leblanc', service: 'Diagnostic électrique', date: '2025-01-27', time: '09:00' }
  ];

  return (
    <div className=\"min-h-screen bg-gray-50\">
      {/* Admin Header */}
      <section className=\"bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 text-white py-12 px-6\">
        <div className=\"max-w-7xl mx-auto\">
          <div className=\"flex items-center justify-between\">
            <div>
              <h1 className=\"text-4xl font-bold mb-2\">Administration</h1>
              <p className=\"text-lg opacity-90\">Tableau de bord MJ Créations</p>
            </div>
            <div className=\"flex items-center gap-4\">
              <Badge className=\"bg-green-500 text-white px-4 py-2 text-sm\">En ligne</Badge>
            </div>
          </div>
        </div>
      </section>

      <section className=\"py-12 px-6\">
        <div className=\"max-w-7xl mx-auto\">
          <Tabs value={activeTab} onValueChange={setActiveTab} className=\"space-y-8\">
            <div className=\"overflow-x-auto\">
              <TabsList className=\"inline-flex gap-2 bg-transparent h-auto min-w-full\">
                <TabsTrigger value=\"dashboard\" className=\"data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap\">
                  <LayoutDashboard className=\"h-4 w-4 mr-2\" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value=\"orders\" className=\"data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap\">
                  <ShoppingBag className=\"h-4 w-4 mr-2\" />
                  Commandes
                </TabsTrigger>
                <TabsTrigger value=\"clients\" className=\"data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap\">
                  <Users className=\"h-4 w-4 mr-2\" />
                  Clients
                </TabsTrigger>
                <TabsTrigger value=\"quotes\" className=\"data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap\">
                  <FileText className=\"h-4 w-4 mr-2\" />
                  Devis
                </TabsTrigger>
                <TabsTrigger value=\"services\" className=\"data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap\">
                  <Package className=\"h-4 w-4 mr-2\" />
                  Services
                </TabsTrigger>
                <TabsTrigger value=\"calendar\" className=\"data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap\">
                  <Calendar className=\"h-4 w-4 mr-2\" />
                  Calendrier
                </TabsTrigger>
                <TabsTrigger value=\"settings\" className=\"data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white font-bold whitespace-nowrap\">
                  <Settings className=\"h-4 w-4 mr-2\" />
                  Paramètres
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Dashboard Tab */}
            <TabsContent value=\"dashboard\" className=\"space-y-8\">
              {/* Stats Grid */}
              <div className=\"grid md:grid-cols-2 lg:grid-cols-4 gap-6\">
                {stats.map((stat, idx) => (
                  <Card key={idx} className=\"border-none shadow-xl overflow-hidden\">
                    <CardContent className=\"p-6\">
                      <div className=\"flex items-center justify-between mb-4\">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                          <stat.icon className=\"h-6 w-6 text-white\" />
                        </div>
                        <Badge className={stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                          {stat.change}
                        </Badge>
                      </div>
                      <div className=\"text-3xl font-black text-gray-900 mb-1\">{stat.value}</div>
                      <div className=\"text-sm text-gray-600\">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className=\"grid lg:grid-cols-2 gap-8\">
                {/* Recent Orders */}
                <Card className=\"border-none shadow-xl\">
                  <CardHeader>
                    <CardTitle className=\"text-xl\">Commandes récentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className=\"space-y-3\">
                      {recentOrders.map((order) => (
                        <div key={order.id} className=\"flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transition\">
                          <div>
                            <p className=\"font-bold text-gray-900\">{order.client}</p>
                            <p className=\"text-sm text-gray-600\">{order.service} - {order.date}</p>
                          </div>
                          <div className=\"text-right\">
                            <p className=\"font-bold text-cyan-600\">{order.amount}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === 'Terminé' ? 'bg-green-100 text-green-700' :
                              order.status === 'En cours' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Appointments */}
                <Card className=\"border-none shadow-xl\">
                  <CardHeader>
                    <CardTitle className=\"text-xl\">Rendez-vous à venir</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className=\"space-y-3\">
                      {upcomingAppointments.map((apt) => (
                        <div key={apt.id} className=\"flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transition\">
                          <div>
                            <p className=\"font-bold text-gray-900\">{apt.client}</p>
                            <p className=\"text-sm text-gray-600\">{apt.service}</p>
                          </div>
                          <div className=\"text-right\">
                            <p className=\"text-sm font-semibold text-gray-900\">{apt.date}</p>
                            <p className=\"text-xs text-gray-600\">{apt.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value=\"orders\">
              <Card className=\"border-none shadow-xl\">
                <CardHeader>
                  <div className=\"flex items-center justify-between\">
                    <CardTitle className=\"text-2xl\">Gestion des Commandes</CardTitle>
                    <Button className=\"bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold\">
                      + Nouvelle commande
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className=\"space-y-4\">
                    {recentOrders.map((order) => (
                      <div key={order.id} className=\"flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:shadow-lg transition\">
                        <div>
                          <p className=\"font-black text-lg text-gray-900\">{order.id}</p>
                          <p className=\"text-gray-600\">{order.client} - {order.service}</p>
                          <p className=\"text-sm text-gray-500\">{order.date}</p>
                        </div>
                        <div className=\"flex items-center gap-4\">
                          <div className=\"text-right\">
                            <p className=\"font-bold text-2xl text-cyan-600\">{order.amount}</p>
                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              order.status === 'Terminé' ? 'bg-green-100 text-green-700' :
                              order.status === 'En cours' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <Button size=\"sm\" variant=\"outline\">Détails</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Clients Tab */}
            <TabsContent value=\"clients\">
              <Card className=\"border-none shadow-xl\">
                <CardHeader>
                  <div className=\"flex items-center justify-between\">
                    <CardTitle className=\"text-2xl\">Gestion des Clients</CardTitle>
                    <Button className=\"bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold\">
                      + Nouveau client
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className=\"space-y-4\">
                    {clients.map((client) => (
                      <div key={client.id} className=\"flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:shadow-lg transition\">
                        <div className=\"flex items-center gap-4\">
                          <div className=\"w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg\">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <p className=\"font-bold text-lg text-gray-900\">{client.name}</p>
                            <p className=\"text-sm text-gray-600\">{client.email}</p>
                            <p className=\"text-xs text-gray-500\">{client.orders} commandes - {client.total}</p>
                          </div>
                        </div>
                        <div className=\"flex items-center gap-4\">
                          <Badge className={client.status === 'VIP' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' : 'bg-green-100 text-green-700'}>
                            {client.status}
                          </Badge>
                          <Button size=\"sm\" variant=\"outline\">Voir profil</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tabs */}
            <TabsContent value=\"quotes\">
              <Card className=\"border-none shadow-xl\">
                <CardHeader>
                  <CardTitle className=\"text-2xl\">Gestion des Devis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className=\"text-gray-600\">Liste des devis en attente et validés...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value=\"services\">
              <Card className=\"border-none shadow-xl\">
                <CardHeader>
                  <CardTitle className=\"text-2xl\">Gestion des Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className=\"text-gray-600\">Gérer les prestations du catalogue...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value=\"calendar\">
              <Card className=\"border-none shadow-xl\">
                <CardHeader>
                  <CardTitle className=\"text-2xl\">Calendrier des Interventions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className=\"text-gray-600\">Vue calendrier des rendez-vous...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value=\"settings\">
              <Card className=\"border-none shadow-xl\">
                <CardHeader>
                  <CardTitle className=\"text-2xl\">Paramètres Généraux</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className=\"text-gray-600\">Configuration de l'application...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Admin;
