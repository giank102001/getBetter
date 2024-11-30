import React, { useState } from 'react';
import { StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function SettingsScreen() {
  const [language, setLanguage] = useState('es');
  const [theme, setTheme] = useState('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [name, setName] = useState('Juan Pérez');

  const handleLogout = () => {
    alert('Cerrar sesión');
  };

  const handleLanguageChange = (lang : any) => {
    setLanguage(lang);
    alert(`Idioma cambiado a ${lang === 'es' ? 'Español' : 'Inglés'}`);
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    alert(`Tema cambiado a ${theme === 'light' ? 'Oscuro' : 'Claro'}`);
  };

  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#A1CEDC', dark: '#fff' }}
    headerImage={
      <Image
        source={require('@/assets/images/GetBetter-icon.png')}
        style={styles.reactLogo}
      />
    }>
      {/* Sección de Cuenta */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Cuenta</ThemedText>
        <ThemedText>{`Nombre: ${name}`}</ThemedText>
      </ThemedView>

      {/* Idioma */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Idioma</ThemedText>
        <ThemedView style={styles.languageOptions}>
          <TouchableOpacity
            style={[styles.languageButton, language === 'es' && styles.languageButtonActive]}
            onPress={() => handleLanguageChange('es')}>
            <ThemedText>Español</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.languageButton, language === 'en' && styles.languageButtonActive]}
            onPress={() => handleLanguageChange('en')}>
            <ThemedText>English</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* Tema */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Tema</ThemedText>
        <ThemedView style={styles.themeOption}>
          <ThemedText>{theme === 'light' ? 'Modo Claro' : 'Modo Oscuro'}</ThemedText>
          <Switch value={theme === 'dark'} onValueChange={handleThemeToggle} />
        </ThemedView>
      </ThemedView>

      {/* Notificaciones */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Notificaciones</ThemedText>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </ThemedView>

      {/* Cerrar Sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText style={styles.logoutButtonText}>Cerrar Sesión</ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  languageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  languageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  languageButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#dc3545',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});
