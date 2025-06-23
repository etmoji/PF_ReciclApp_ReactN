import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GlassScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/glass.jpeg')} // Asegúrate que la imagen exista
          style={styles.headerImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.headerText}>Reciclaje de Vidrio</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader text="Objetos comunes hechos de vidrio" />
        <TextList
          items={[
            'Botellas de bebidas',
            'Frascos de alimentos',
            'Envases de perfumes',
            'Tarros de cocina',
            'Vidrio plano (en ventanas)',
          ]}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Símbolos de reciclaje más frecuentes" />
        <Text style={styles.normalText}>GL 70 • GL 71 • GL 72</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader text="Instrucciones para reciclar" />
        <TextList
          items={[
            'Enjuagar los frascos antes de desechar.',
            'Quitar tapas y etiquetas si es posible.',
            'Separar vidrio de colores (verde, ámbar, transparente).',
            'Evitar desechar vidrios rotos o planos con los envases comunes.',
          ]}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Impacto ambiental" />
        <Text style={styles.normalText}>
          El vidrio es 100% reciclable y puede reciclarse infinitamente sin perder calidad. Reciclar una botella de
          vidrio ahorra suficiente energía para encender una bombilla de 100W durante 4 horas.
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
// Este código define una pantalla de reciclaje de vidrio en una aplicación móvil.
// Muestra información sobre objetos comunes hechos de vidrio, símbolos de reciclaje, instrucciones para reciclar y el impacto ambiental del reciclaje de vidrio.