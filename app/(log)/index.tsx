import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

import FirebaseContext from '@/controller/context/firebaseContext';

const LoginScreen = () => {
  // context de firebase
  const { userLog, iniciarSesion } = useContext(FirebaseContext);

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (userLog.email == email) {
      Alert.alert('Inicio de sesión', 'Bienvenido a getBetter');
      if (userLog.role === 'patient') {
        router.push('/(pacient)');
      } else {
        router.push('/(physio)');
      }
    } else if(userLog == 'auth/invalid-credential'){
      Alert.alert('Error', 'La contraseña es incorrecta');
    } else if(userLog == 'auth/invalid-credential'){
      Alert.alert('Error', 'El correo no existe');
    } else if(userLog == 'auth/invalid-email'){
      Alert.alert('Error', 'El correo no es valido');
    }
  }, [userLog])

  const handleLogin = () => {
    if (email && password) {
      iniciarSesion(email, password);
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
    }
  };

  const handleCreateUser = (role: String) => {
    if (role === 'pacient') {
      router.push('/registerPacient');
    } else if (role === 'physio') {
      router.push('/registerPhysio');
    } else {
      Alert.alert('Error', 'Por favor selecciona un rol válido.');
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        {/* Logo */}
        <Image
          source={require('@/assets/images/GetBetter-icon.png')}
          style={styles.logo}
        />

        {/* Título */}
        <Text style={styles.title}>Inicia Sesión</Text>

        {/* Campo Email */}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Campo Contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Botón Iniciar Sesión */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        {/* Enlace Crear Cuenta */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.link}>¿No tienes cuenta? Crear Cuenta</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para elegir el rol */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Quién eres?</Text>
            <TouchableOpacity
              style={styles.roleButton}
              onPress={() => handleCreateUser('pacient')}
            >
              <Text style={styles.roleButtonText}>Paciente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roleButton}
              onPress={() => handleCreateUser('physio')}
            >
              <Text style={styles.roleButtonText}>Fisioterapeuta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Fondo claro
    padding: 20,
  },
  loginBox: {
    width: Platform.OS === 'web' ? '30%' : '95%', // Ancho adaptado
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50, // Hacer el logo redondo si es necesario
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#007bff',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20
  },
  modalContent: {
    width: Platform.OS === 'web' ? '30%' : '90%', // Ancho adaptado
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  roleButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  roleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
