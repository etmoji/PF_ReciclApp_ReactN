import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const categories = [
  { title: 'Papel', image: require('../assets/images/paper.jpg'), route: 'PaperScreen' },
  { title: 'Metal', image: require('../assets/images/metal.jpg'), route: 'MetalScreen' },
  { title: 'Cartón', image: require('../assets/images/cardboard.jpg'), route: 'CardboardScreen' },
  { title: 'Plástico', image: require('../assets/images/plastic.jpeg'), route: 'PlasticScreen' },
  { title: 'Vidrio', image: require('../assets/images/glass.jpeg'), route: 'GlassScreen' },
  { title: 'Composta', image: require('../assets/images/compost.jpeg'), route: 'CompostScreen' },
  { title: 'Otros', image: require('../assets/images/others.jpeg'), route: 'OtherScreen' },
];

export default function HomeScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Basura');

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(item.route)}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>Información sobre {item.title}...</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ReciclaApp</Text>
      <Text style={styles.subtitle}>Encuentra puntos de acopio de reciclaje</Text>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Basura' && styles.selectedTab]}
          onPress={() => setSelectedTab('Basura')}
        >
          <Text style={[styles.tabText, selectedTab === 'Basura' && styles.selectedTabText]}>Basura</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Acopio' && styles.selectedTab]}
          onPress={() => setSelectedTab('Acopio')}
        >
          <Text style={[styles.tabText, selectedTab === 'Acopio' && styles.selectedTabText]}>Puntos de acopio</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'Basura' ? (
        <FlatList data={categories} keyExtractor={(item) => item.title} renderItem={renderCard} />
      ) : (
        <Text style={{ padding: 16 }}>Aquí se listarán los centros de acopio desde un archivo o API.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 60, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#212121', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#4E342E', textAlign: 'center', marginBottom: 20 },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6B8E23',
    marginHorizontal: 6,
  },
  selectedTab: {
    backgroundColor: '#6B8E23',
  },
  tabText: {
    color: '#6B8E23',
    fontWeight: '600',
  },
  selectedTabText: {
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    padding: 12,
  },
  cardImage: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
  },
  cardText: {
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#777',
  },
});
// Este código define una pantalla de inicio para una aplicación de reciclaje.
// Muestra una lista de categorías de reciclaje con imágenes y permite navegar a pantallas específicas