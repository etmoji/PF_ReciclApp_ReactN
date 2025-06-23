import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CardboardScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/cardboard.jpeg')} // Asegúrate de tener esta imagen
          style={styles.headerImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.headerText}>Reciclaje de Cartón</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader text="Objetos comunes hechos de cartón" />
        <TextList
          items={[
            'Cajas de zapatos',
            'Cajas de cereal o comida',
            'Tubos de papel higiénico',
            'Empaques de cartón',
            'Cajas de embalaje',
          ]}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Símbolos de reciclaje más frecuentes" />
        <Text style={styles.normalText}>♼ PAP 20 (Corrugado) • PAP 21 (No corrugado)</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader text="Instrucciones para reciclar" />
        <TextList
          items={[
            'Dobla o aplasta las cajas para ahorrar espacio.',
            'Evita que se mojen o ensucien con alimentos.',
            'Retira cintas adhesivas o etiquetas si es posible.',
            'No mezcles con cartón encerado o plastificado.',
          ]}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Impacto ambiental" />
        <Text style={styles.normalText}>
          El cartón reciclado ayuda a reducir la tala de árboles y disminuye el uso de energía en procesos
          industriales. Puede reciclarse hasta 7 veces antes de degradarse completamente.
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
// Este código define una pantalla de reciclaje para cartón, con secciones informativas y un botón para volver a la pantalla principal. Utiliza componentes de React Native como ScrollView, Text, Image y TouchableOpacity para crear una interfaz amigable. Las secciones incluyen información sobre objetos comunes de cartón, símbolos de reciclaje, instrucciones y el impacto ambiental del reciclaje de cartón.
