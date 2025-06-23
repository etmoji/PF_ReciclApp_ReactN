import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import centersFile from '../assets/data/centers.json';

export default function MapScreen({ route, navigation }) {
  const { location } = route.params || {};
  const defaultMarker = location || { latitude: 19.4326, longitude: -99.1332 };

  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);

  useEffect(() => {
    const loadCenters = async () => {
      setCenters(centersFile);
    };
    loadCenters();
  }, []);

  const handleCenterPress = (center) => {
    setSelectedCenter(center);
  };

  const closeModal = () => {
    setSelectedCenter(null);
  };

  const openInBrowser = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url); // Abre el enlace en el navegador
    } else {
      alert(`No se puede abrir este enlace: ${url}`);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: defaultMarker.latitude,
          longitude: defaultMarker.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={defaultMarker}
          title="Tu ubicación"
          description="Este es tu punto actual"
          pinColor="green"
        />

        {centers.map((center) => (
          <Marker
            key={center.id}
            coordinate={{
              latitude: center.Latitude,
              longitude: center.Longitude,
            }}
            pinColor="red"
            onPress={() => handleCenterPress(center)}
          />
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {selectedCenter && (
        <Modal
          visible={true}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedCenter.imageUrl }}
                style={styles.image}
              />
              <Text style={styles.title}>{selectedCenter.Name}</Text>
              <Text style={styles.description}>{selectedCenter.Description}</Text>
              <Text style={styles.details}>Dirección: {selectedCenter.Address}</Text>
              <Text style={styles.details}>Teléfono: {selectedCenter.Phone}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => openInBrowser(selectedCenter.url_google)}
              >
                <Text style={styles.buttonText}>Abrir en Google Maps</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  description: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
  details: {
    marginVertical: 5,
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#03A9F4',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
