import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Componentes
import { View, ActivityIndicator } from 'react-native';
import { Logo } from './components/misc/components';
//Estilos
import { styles } from "./assets/styles/styles";
//Imagenes 
const logoGG = require('./assets/images/logos/logoGG.png');
//Vistas
import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado

  // Suponiendo que aquí realizas alguna lógica para verificar la sesión del usuario, por ejemplo, con AsyncStorage o un servicio de autenticación
  useEffect(() => {
    // Simulando una verificación de sesión al inicio de la aplicación
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(false); // Cambiar a true si se detecta una sesión iniciada
    }, 2000); // Simulación de carga durante 2 segundos
  }, []);

  if (isLoading) {
    return (
      <View style={styles.main}>
        <Logo source={logoGG} resizeMode='contain'/>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}