import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CompostScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/compost.jpeg')} // Asegúrate de que exista
          style={styles.headerImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.headerText}>Composta Orgánica</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader text="Residuos comunes para composta" />
        <TextList
          items={[
            'Cáscaras de frutas y verduras',
            'Hojas secas y pasto',
            'Bolsas de té y café',
            'Cáscaras de huevo',
            'Restos de comida natural sin procesar',
          ]}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader text="¿Qué evitar en la composta?" />
        <TextList
          items={[
            'Carne, pescado o lácteos',
            'Aceites o grasas',
            'Materiales tratados químicamente',
            'Excremento de mascotas',
          ]}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Instrucciones para compostar" />
        <TextList
          items={[
            'Separar los residuos orgánicos de los inorgánicos.',
            'Mezclar residuos húmedos (verdes) y secos (cafés) en proporción equilibrada.',
            'Airear la mezcla una vez por semana.',
            'Mantener la humedad parecida a una esponja exprimida.',
            'En 2-3 meses se obtiene composta lista para abonar.',
          ]}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Beneficios ambientales" />
        <Text style={styles.normalText}>
          Compostar ayuda a reducir hasta un 50% los residuos domiciliarios, mejora la fertilidad del suelo, y
          disminuye la emisión de gases contaminantes como el metano en basureros.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function SectionHeader({ text }) {
  return <Text style={styles.sectionHeader}>{text}</Text>;
}

function TextList({ items }) {
  return (
    <View style={{ marginTop: 4 }}>
      {items.map((item, index) => (
        <Text key={index} style={styles.normalText}>
          {index + 1}. {item}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerContainer: {
    position: 'relative',
    width: '100%',
    height: 260,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerText: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    fontWeight: '600',
    fontSize: 17,
    color: '#1B5E20',
    marginBottom: 6,
  },
  normalText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: 4,
  },
  button: {
    marginTop: 28,
    marginHorizontal: 20,
    height: 50,
    backgroundColor: '#6B8E23',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
// Este código define una pantalla de composta orgánica para una aplicación de reciclaje. Muestra información sobre qué residuos se pueden compostar, qué evitar, instrucciones para compostar y los beneficios ambientales de esta práctica. También incluye un botón para volver a la pantalla principal. La interfaz es limpia y fácil de navegar, con un diseño atractivo y funcional.