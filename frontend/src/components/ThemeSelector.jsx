import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { themes, applyTheme, loadSavedTheme } from '../config/themes';
import { Palette, Check } from 'lucide-react';

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const theme = loadSavedTheme();
    setCurrentTheme(theme);
  }, []);

  const handleThemeChange = (themeId) => {
    applyTheme(themeId);
    setCurrentTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Palette className="h-4 w-4" />
        Themes
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 z-50 w-80 border-none shadow-2xl">
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-4">Choisissez votre theme</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(themes).map(([id, theme]) => (
                <button
                  key={id}
                  onClick={() => handleThemeChange(id)}
                  className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                    currentTheme === id ? 'border-cyan-600 bg-cyan-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{theme.name}</span>
                    {currentTheme === id && <Check className="h-4 w-4 text-cyan-600" />}
                  </div>
                  <div className="flex gap-1">
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: theme.colors.primary }}
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: theme.colors.secondary }}
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: theme.colors.accent }}
                    ></div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ThemeSelector;