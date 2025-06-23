import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PaperScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/paper.jpg')} 
          style={styles.headerImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.headerText}>Reciclaje de Papel</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader text="Objetos comunes hechos de papel" />
        <TextList items={[
          'Hojas y cuadernos usados',
          'Cajas de cereal o zapatos',
          'Sobres y revistas',
          'Papel periódico',
          'Cartulinas y empaques'
        ]} />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Símbolos de reciclaje más frecuentes" />
        <Text style={styles.normalText}>♼ PAP 20 • PAP 21 • PAP 22</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader text="Instrucciones para reciclar" />
        <TextList items={[
          'Evita mojar el papel, ya que húmedo no se puede reciclar.',
          'Retira grapas o clips antes de desecharlo.',
          'No mezcles papel con residuos orgánicos.',
          'Cartones muy sucios (como cajas de pizza) no deben reciclarse.'
        ]} />
      </View>

      <View style={styles.section}>
        <SectionHeader text="Impacto ambiental" />
        <Text style={styles.normalText}>
          Reciclar una tonelada de papel puede salvar hasta 17 árboles y ahorrar más de 26,000 litros de agua.
          El papel reciclado genera un 70% menos contaminación del aire que el papel nuevo.
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
// Este código define una pantalla de reciclaje de papel con información y consejos sobre cómo reciclar correctamente.
// Incluye una imagen de encabezado, secciones con encabezados y listas de texto,