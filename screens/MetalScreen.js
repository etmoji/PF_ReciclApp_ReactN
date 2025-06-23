import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MetalScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/metal.jpg')} 
          style={styles.headerImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.headerText}>Reciclaje de Metal</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader text="Objetos comunes hechos de metal" />
        <TextList
          items={[
            'Latas de aluminio',
            'Latas de alimentos en conserva',
            'Tapas de botellas',
            'Cubiertos o utensilios',
            'Chatarra de herramientas o piezas',
          ]}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Símbolos de reciclaje más frecuentes" />
        <Text style={styles.normalText}>ALU • FE • Recyclable Metal</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader text="Instrucciones para reciclar" />
        <TextList
          items={[
            'Lava y seca las latas antes de desecharlas.',
            'Aplasta las latas si es posible para ahorrar espacio.',
            'Evita mezclar con otros materiales no reciclables.',
            'Separa tapas o etiquetas plásticas.',
          ]}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Impacto ambiental" />
        <Text style={styles.normalText}>
          Reciclar una sola lata de aluminio ahorra la energía suficiente para hacer funcionar una televisión durante
          tres horas. El reciclaje de metales reduce la necesidad de extracción minera y disminuye la contaminación del
          suelo.
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
// Este código define una pantalla de reciclaje de metal que muestra información sobre objetos comunes hechos de metal,
// símbolos de reciclaje, instrucciones para reciclar y el impacto ambiental del reciclaje de metal.