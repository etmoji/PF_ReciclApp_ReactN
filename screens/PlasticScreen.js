import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PlasticScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/plastic.jpeg')} // Asegúrate que exista
          style={styles.headerImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.headerText}>Reciclaje de Plástico</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader text="Objetos comunes hechos de este material" />
        <TextList items={['Botellas', 'Tapas', 'Bolsas', 'Envases de comida', 'Contenedores de detergente']} />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Símbolos de reciclaje más frecuentes" />
        <Text style={styles.normalText}>PET ① • HDPE ② • LDPE ④</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader text="Instrucciones para reciclar" />
        <TextList
          items={[
            'Enjuagar los envases antes de desechar.',
            'No mezclar con comida ni otros materiales.',
            'Separar tapas o etiquetas si es posible.',
            'Compactar botellas para ahorrar espacio.'
          ]}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Impacto ambiental" />
        <Text style={styles.normalText}>
          Cada año, millones de toneladas de plástico no reciclado contaminan ríos y mares. El plástico puede tardar
          más de 400 años en degradarse y afecta gravemente a la fauna marina.
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
    flex: 1
  },
  headerContainer: {
    position: 'relative',
    width: '100%',
    height: 260,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden'
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
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
});
// Asegúrate de que la imagen 'img_plastic.png' exista en la ruta especificada
// y que el componente esté correctamente importado en tu aplicación.