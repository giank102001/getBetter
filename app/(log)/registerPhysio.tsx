import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';

import FirebaseContext from '@/controller/context/firebaseContext';

const RegisterPhysio = () => {
  // context de firebase
  const { resultCreate, crearCuenta } = useContext(FirebaseContext);


  const router = useRouter();

  // Estados para los campos
  const [fullName, setFullName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [idFile, setIdFile] = useState({});
  const [credentialsFile, setCredentialsFile] = useState({});

  useEffect(() => {
    if (resultCreate === email && email) {
      Alert.alert('Registro exitoso', `Bienvenido ${username}, por favor inicia sesion`);
      router.push('/(log)'); // Redirige a la pantalla de inicio de sesión
    } if(resultCreate == 'incorrect') {
      Alert.alert('Error al crear la cuenta');
    }
  }, [resultCreate])


  const handleRegister = () => {
    if (/*!fullName || !speciality || !hospitalName || */!email || !username || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
      return;
    }

    /*if (!idFile || !credentialsFile) {
      Alert.alert('Error', 'Por favor, carga tu ID y tus credenciales.');
      return;
    }*/

    crearCuenta(email, password, username, 'physio');
    // por ultimo comprobamos la respuesta con el useEffect
  };


  // Función para manejar la carga de archivos
  const handleUpload = async (type: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Permite seleccionar cualquier tipo de archivo
      });

      if (!result.canceled) {
        if (type === 'id') {
          setIdFile(result);
        } else if (type === 'credentials') {
          setCredentialsFile(result);
        }
        Alert.alert('Archivo cargado', 'Correcto'); // Usa un valor por defecto si `name` no está definido
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar el archivo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Fisioterapeuta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Cargar ID:</Text>
      <View style={styles.uploadRow}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleUpload('id')}
        >
          <Text style={styles.uploadButtonText}>Subir ID</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Cargar Credenciales:</Text>
      <View style={styles.uploadRow}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleUpload('credentials')}
        >
          <Text style={styles.uploadButtonText}>Subir Credenciales</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Especialidad"
        value={speciality}
        onChangeText={setSpeciality}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre del hospital"
        value={hospitalName}
        onChangeText={setHospitalName}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(log)')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  label: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  uploadButton: {
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileName: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    color: '#007bff',
  },
});

export default RegisterPhysio;
