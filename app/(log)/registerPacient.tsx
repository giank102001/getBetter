import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importamos el Date Picker
import { useRouter } from 'expo-router';

import FirebaseContext from '@/controller/context/firebaseContext';

const RegisterScreen = () => {
  // context de firebase
  const { resultCreate, crearCuenta } = useContext(FirebaseContext);

  const router = useRouter();

  // Estados para los campos
  const [fullName, setFullName] = useState('');
  const [physicianName, setPhysicianName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // Controla la visibilidad del Date Picker
  const [doWorkout, setDoWorkout] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [dailyActivities, setDailyActivities] = useState('');
  const [allergies, setAllergies] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (resultCreate === email && email) {
      Alert.alert('Registro exitoso', `Bienvenido ${username}, por favor inicia sesion`);
      router.push('/(log)'); // Redirige a la pantalla de inicio de sesión
    } if(resultCreate == 'incorrect') {
      Alert.alert('Error al crear la cuenta');
    }
  }, [resultCreate])

  const handleRegister = () => {
    if(/*!fullName || !physicianName || !dob || */!email || !username || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
      return;
    }
    if (doWorkout === 'yes' && !workoutType) {
      Alert.alert('Error', 'Por favor, especifica el tipo de ejercicio.');
      return;
    }

    crearCuenta(email, password, username, 'patient');
    // por ultimo comprobamos la respuesta con el useEffect
  };

  const handleDateChange = (_: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false); // Oculta el Date Picker al seleccionar una fecha
    if (selectedDate) {
      setDob(selectedDate); // Actualiza la fecha de nacimiento
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Paciente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre del médico"
        value={physicianName}
        onChangeText={setPhysicianName}
      />

      <Text style={styles.label}>Fecha de nacimiento:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>
          {dob ? dob.toLocaleDateString() : 'Selecciona tu fecha de nacimiento'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()} // La fecha no puede ser mayor al día actual
        />
      )}

      <Text style={styles.label}>¿Haces ejercicio?</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            doWorkout === 'yes' && styles.radioButtonSelected,
          ]}
          onPress={() => setDoWorkout('yes')}
        >
          <Text style={[styles.radioButtonText, doWorkout === 'yes' && styles.radioButtonTextSelected]}>Sí</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            doWorkout === 'no' && styles.radioButtonSelected,
          ]}
          onPress={() => setDoWorkout('no')}
        >
          <Text style={[styles.radioButtonText, doWorkout === 'no' && styles.radioButtonTextSelected]}>No</Text>
        </TouchableOpacity>
      </View>

      {doWorkout === 'yes' && (
        <Picker
          selectedValue={workoutType}
          style={styles.picker}
          onValueChange={(itemValue) => setWorkoutType(itemValue)}
        >
          <Picker.Item label="Selecciona el tipo de ejercicio" value="" />
          <Picker.Item label="Cardio" value="cardio" />
          <Picker.Item label="Fuerza" value="strength" />
          <Picker.Item label="Yoga" value="yoga" />
        </Picker>
      )}

      <TextInput
        style={styles.input}
        placeholder="Actividades diarias principales"
        value={dailyActivities}
        onChangeText={setDailyActivities}
      />

      <TextInput
        style={styles.input}
        placeholder="Introduce tus alergias"
        value={allergies}
        onChangeText={setAllergies}
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
    justifyContent: 'center',
  },
  label: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  radioButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  radioButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  radioButtonText: {
    color: '#000',
    fontSize: 16,
  },
  radioButtonTextSelected: {
    color: '#fff',
  },
  picker: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
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

export default RegisterScreen;
