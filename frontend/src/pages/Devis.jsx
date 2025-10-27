import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { services } from '../data/mock';
import { CheckCircle2, Calculator } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Devis = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    description: '',
    preferredDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3);
    setTimeout(() => {
      toast({
        title: "Demande envoyée !",
        description: "Nous vous contacterons dans les 24h pour établir votre devis.",
      });
    }, 500);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Calculator className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Demande de Devis</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Recevez un devis gratuit et personnalisé en moins de 24h
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4">
              <div className={`flex items-center ${
                step >= 1 ? 'text-cyan-600' : 'text-gray-400'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= 1 ? 'bg-cyan-600 text-white' : 'bg-gray-200'
                }`}>
                  {step > 1 ? <CheckCircle2 className="h-6 w-6" /> : '1'}
                </div>
                <span className="ml-2 hidden sm:inline font-semibold">Service</span>
              </div>
              <div className="h-1 w-12 sm:w-24 bg-gray-300">
                <div className={`h-full transition-all ${
                  step >= 2 ? 'bg-cyan-600 w-full' : 'bg-gray-300 w-0'
                }`}></div>
              </div>
              <div className={`flex items-center ${
                step >= 2 ? 'text-cyan-600' : 'text-gray-400'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= 2 ? 'bg-cyan-600 text-white' : 'bg-gray-200'
                }`}>
                  {step > 2 ? <CheckCircle2 className="h-6 w-6" /> : '2'}
                </div>
                <span className="ml-2 hidden sm:inline font-semibold">Informations</span>
              </div>
              <div className="h-1 w-12 sm:w-24 bg-gray-300">
                <div className={`h-full transition-all ${
                  step >= 3 ? 'bg-cyan-600 w-full' : 'bg-gray-300 w-0'
                }`}></div>
              </div>
              <div className={`flex items-center ${
                step >= 3 ? 'text-cyan-600' : 'text-gray-400'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= 3 ? 'bg-cyan-600 text-white' : 'bg-gray-200'
                }`}>
                  3
                </div>
                <span className="ml-2 hidden sm:inline font-semibold">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <Card className="border-none shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">Sélectionnez le type de service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setFormData({ ...formData, serviceType: service.title });
                        setStep(2);
                      }}
                      className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg ${
                        formData.serviceType === service.title
                          ? 'border-cyan-600 bg-cyan-50'
                          : 'border-gray-200 hover:border-cyan-300'
                      }`}
                    >
                      <div className="text-4xl mb-3">{service.icon}</div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: service.color }}>
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Information Form */}
          {step === 2 && (
            <Card className="border-none shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">Vos informations</CardTitle>
                <p className="text-gray-600">Service sélectionné : <span className="font-semibold text-cyan-600">{formData.serviceType}</span></p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Code postal *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Adresse complète *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="preferredDate">Date souhaitée pour l'intervention</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description de votre projet *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={5}
                      required
                      className="mt-2"
                      placeholder="Décrivez vos besoins en détail..."
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                    >
                      Envoyer la demande
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <Card className="border-none shadow-2xl text-center">
              <CardContent className="p-12 space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Demande envoyée avec succès !</h2>
                <p className="text-lg text-gray-600">
                  Nous avons bien reçu votre demande de devis pour <span className="font-semibold text-cyan-600">{formData.serviceType}</span>.
                </p>
                <div className="bg-cyan-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3">Prochaines étapes :</h3>
                  <ul className="text-left space-y-2 text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span>Nous étudions votre demande sous 24h</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span>Un technicien vous contacte pour préciser les détails</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span>Vous recevez votre devis détaillé gratuit</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6">
                  <Button
                    onClick={() => {
                      setStep(1);
                      setFormData({
                        serviceType: '',
                        name: '',
                        email: '',
                        phone: '',
                        address: '',
                        zipCode: '',
                        description: '',
                        preferredDate: ''
                      });
                    }}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    Faire une nouvelle demande
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default Devis;
