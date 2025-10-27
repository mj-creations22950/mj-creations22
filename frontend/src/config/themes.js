// Configuration des 9 themes MJ Creations

export const themes = {
  default: {
    id: 'default',
    name: 'Par defaut',
    colors: {
      primary: '#00B4D8',
      secondary: '#0077B6',
      accent: '#FF6B35',
      success: '#06D6A0',
      warning: '#FFB627',
      error: '#EF476F'
    }
  },
  green: {
    id: 'green',
    name: 'Vert Nature',
    colors: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#34D399',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    }
  },
  red: {
    id: 'red',
    name: 'Rouge Passion',
    colors: {
      primary: '#EF4444',
      secondary: '#DC2626',
      accent: '#F87171',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#DC2626'
    }
  },
  purple: {
    id: 'purple',
    name: 'Violet Royal',
    colors: {
      primary: '#8B5CF6',
      secondary: '#7C3AED',
      accent: '#A78BFA',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    }
  },
  orange: {
    id: 'orange',
    name: 'Orange Energie',
    colors: {
      primary: '#F97316',
      secondary: '#EA580C',
      accent: '#FB923C',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    }
  },
  cyan: {
    id: 'cyan',
    name: 'Cyan Ocean',
    colors: {
      primary: '#06B6D4',
      secondary: '#0891B2',
      accent: '#22D3EE',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    }
  },
  spring: {
    id: 'spring',
    name: 'Printemps',
    colors: {
      primary: '#84CC16',
      secondary: '#65A30D',
      accent: '#A3E635',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    }
  },
  summer: {
    id: 'summer',
    name: 'Ete',
    colors: {
      primary: '#F59E0B',
      secondary: '#D97706',
      accent: '#FBBF24',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    }
  },
  autumn: {
    id: 'autumn',
    name: 'Automne',
    colors: {
      primary: '#B45309',
      secondary: '#92400E',
      accent: '#D97706',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    }
  },
  winter: {
    id: 'winter',
    name: 'Hiver',
    colors: {
      primary: '#3B82F6',
      secondary: '#2563EB',
      accent: '#60A5FA',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    }
  }
};

export const applyTheme = (themeId) => {
  const theme = themes[themeId] || themes.default;
  const root = document.documentElement;
  
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  localStorage.setItem('mjc_theme', themeId);
};

export const loadSavedTheme = () => {
  const savedTheme = localStorage.getItem('mjc_theme') || 'default';
  applyTheme(savedTheme);
  return savedTheme;
};

export default themes;