import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OtherScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/others.jpeg')} 
          style={styles.headerImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.headerText}>Otros Residuos</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader text="Ejemplos de residuos diversos" />
        <TextList
          items={[
            'Pilas o baterías',
            'Electrodomésticos rotos',
            'Medicamentos caducados',
            'Textiles o ropa dañada',
            'Juguetes plásticos no reciclables',
          ]}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Manejo adecuado" />
        <TextList
          items={[
            'No tirar a la basura común.',
            'Llevar a centros de acopio especializados o campañas municipales.',
            'Consultar con tu municipio o colegio sobre eventos de recolección segura.',
          ]}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Peligros ambientales" />
        <Text style={styles.normalText}>
          Residuos como pilas y electrónicos contienen sustancias tóxicas que contaminan el agua y el suelo.
          Desecharlos incorrectamente daña gravemente la salud humana y el ecosistema.
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
// Este código define una pantalla para mostrar información sobre residuos diversos en una aplicación de reciclaje.
// Incluye una imagen de encabezado, secciones con ejemplos de residuos, manejo adecuado y peligros ambientales.
// También incluye un botón para volver a la pantalla principal.