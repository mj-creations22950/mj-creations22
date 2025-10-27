import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { faqItems } from '../data/mock';
import { ChevronDown, Search } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItem, setOpenItem] = useState(null);

  const filteredFaqs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Questions Fréquentes</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Rechercher une question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((item) => (
            <Card key={item.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <button
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                  onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                >
                  <h3 className="text-lg font-bold text-gray-900">{item.question}</h3>
                  <ChevronDown 
                    className={`h-6 w-6 text-cyan-600 flex-shrink-0 transition-transform ${
                      openItem === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openItem === item.id && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-lg text-gray-600">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:0611203741"
              className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition"
            >
              Appelez-nous : 06.11.20.37.41
            </a>
            <a 
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 rounded-lg font-semibold transition"
            >
              Contactez-nous
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
