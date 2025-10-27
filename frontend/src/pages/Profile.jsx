import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Calendar, Settings, LogOut } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);

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

  // Mock data for profile
  const quotes = [
    { id: 1, service: 'Plomberie', date: '2025-01-15', status: 'En attente', amount: '850€' },
    { id: 2, service: 'Chauffage', date: '2025-01-10', status: 'Accepté', amount: '1200€' }
  ];

  const appointments = [
    { id: 1, service: 'Installation chaudière', date: '2025-02-05', time: '14:00', status: 'Confirmé' },
    { id: 2, service: 'Réparation fuite', date: '2025-01-28', time: '10:00', status: 'Confirmé' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <User className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Bonjour, {user.name}</h1>
              <p className="text-lg opacity-90 mt-2">{user.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-none shadow-lg sticky top-24">
                <CardContent className="p-6 space-y-3">
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <User className="mr-3 h-5 w-5" />
                    Mon profil
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <FileText className="mr-3 h-5 w-5" />
                    Mes devis
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <Calendar className="mr-3 h-5 w-5" />
                    Mes rendez-vous
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <Settings className="mr-3 h-5 w-5" />
                    Paramètres
                  </Button>
                  <div className="pt-4 border-t">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Déconnexion
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Info */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Nom</label>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Téléphone</label>
                      <p className="font-semibold">{user.phone || 'Non renseigné'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Client depuis</label>
                      <p className="font-semibold">Janvier 2025</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50">
                    Modifier mes informations
                  </Button>
                </CardContent>
              </Card>

              {/* Quotes */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Mes devis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quotes.map((quote) => (
                      <div key={quote.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">{quote.service}</p>
                          <p className="text-sm text-gray-600">{quote.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-cyan-600">{quote.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            quote.status === 'Accepté' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {quote.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white" asChild>
                    <a href="/devis">Demander un nouveau devis</a>
                  </Button>
                </CardContent>
              </Card>

              {/* Appointments */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Mes rendez-vous</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">{apt.service}</p>
                          <p className="text-sm text-gray-600">{apt.date} à {apt.time}</p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                          {apt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
