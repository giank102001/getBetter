import { StyleSheet, Image, Platform, ScrollView, TouchableOpacity, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function PlanScreen() {
  const data = [
    {
      id: 'KNR090',
      createdDate: '07/11/2024',
      lastUpdated: '07/11/2024',
      planName: 'Plan de recuperación de la cirugía de rodilla',
      patients: 13,
    },
    {
      id: 'KNR090',
      createdDate: '07/11/2024',
      lastUpdated: '07/11/2024',
      planName: 'Plan de recuperación de la cirugía de rodilla',
      patients: 13,
    },
    {
      id: 'KNR090',
      createdDate: '07/11/2024',
      lastUpdated: '07/11/2024',
      planName: 'Plan de recuperación de la cirugía de rodilla',
      patients: 13,
    },
    {
      id: 'KNR090',
      createdDate: '07/11/2024',
      lastUpdated: '07/11/2024',
      planName: 'Plan de recuperación de la cirugía de rodilla',
      patients: 13,
    },
    {
      id: 'KNR090',
      createdDate: '07/11/2024',
      lastUpdated: '07/11/2024',
      planName: 'Plan de recuperación de la cirugía de rodilla',
      patients: 13,
    },
    {
      id: 'KNR090',
      createdDate: '07/11/2024',
      lastUpdated: '07/11/2024',
      planName: 'Plan de recuperación de la cirugía de rodilla',
      patients: 13,
    },
    {
      id: 'KNR090',
      createdDate: '07/11/2024',
      lastUpdated: '07/11/2024',
      planName: 'Plan de recuperación de la cirugía de rodilla',
      patients: 13,
    },
    {
      id: 'KNR090',
      createdDate: '07/11/2024',
      lastUpdated: '07/11/2024',
      planName: 'Plan de recuperación de la cirugía de rodilla',
      patients: 13,
    },
    {
      id: 'KNR090',
      createdDate: '07/11/2024',
      lastUpdated: '07/11/2024',
      planName: 'Plan de recuperación de la cirugía de rodilla',
      patients: 13,
    },
    {
      id: 'KNR090',
      createdDate: '07/11/2024',
      lastUpdated: '07/11/2024',
      planName: 'Plan de recuperación de la cirugía de rodilla',
      patients: 13,
    },
    {
      id: 'KNR090',
      createdDate: '07/11/2024',
      lastUpdated: '07/11/2024',
      planName: 'Plan de recuperación de la cirugía de rodilla',
      patients: 13,
    },
    {
      id: 'KNR090',
      createdDate: '07/11/2024',
      lastUpdated: '07/11/2024',
      planName: 'Plan de recuperación de la cirugía de rodilla',
      patients: 13,
    },
    // Agrega más filas aquí si es necesario
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#fff' }}
      headerImage={
        <Image
          source={require('@/assets/images/GetBetter-icon.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Plans</ThemedText>
      </ThemedView>

      <ThemedView>
        <ScrollView horizontal>
          <ThemedView style={styles.table}>
            {/* Encabezados de la tabla */}
            <ThemedView style={styles.headerRow}>
              <ThemedText style={styles.headerCell}>Plan ID</ThemedText>
              <ThemedText style={styles.headerCell}>Fecha de creación</ThemedText>
              <ThemedText style={styles.headerCell}>Última actualización</ThemedText>
              <ThemedText style={styles.headerCell}>Nombre del plan</ThemedText>
              <ThemedText style={styles.headerCell}>Número de pacientes</ThemedText>
            </ThemedView>

            {/* Filas dinámicas */}
            {data.map((row, index) => (
              <ThemedView style={styles.row} key={index}>
                <Text style={styles.cell}>{row.id}</Text>
                <Text style={styles.cell}>{row.createdDate}</Text>
                <Text style={styles.cell}>{row.lastUpdated}</Text>
                <TouchableOpacity>
                  <Text style={[styles.cell, styles.link]}>{row.planName}</Text>
                </TouchableOpacity>
                <Text style={styles.cell}>{row.patients}</Text>
              </ThemedView>
            ))}
          </ThemedView>
        </ScrollView>
      </ThemedView>

      <ThemedView style={styles.ContainerButton}>
        {/* Botones */}
        <TouchableOpacity style={styles.Button}>
          <ThemedText style={styles.ButtonText}>Aceptar Paciente</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button}>
          <ThemedText style={styles.ButtonText}>Crear Nuevo Plan</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button}>
          <ThemedText style={styles.ButtonText}>Editar Plan</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button}>
          <ThemedText style={styles.ButtonText}>Eliminar Plan</ThemedText>
        </TouchableOpacity>
      </ThemedView >
    </ParallaxScrollView >
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

  //tabla
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    width: 1500
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#808080', // Color similar al encabezado morado claro
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
  },
  link: {
    color: '#007bff', // Color de enlace azul
    textDecorationLine: 'underline',
  },

  // botones
  ContainerButton: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'space-around',
    gap: 8,
  },
  Button: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  ButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
