import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function ScanScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos denegados', 'Se necesita acceso a la ubicación.');
      return null;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
    return currentLocation.coords;
  };

  const pickImage = async (fromCamera = false) => {
    await getLocation();

    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permisos requeridos', 'Se necesita permiso de cámara');
      return;
    }

    let pickerResult = fromCamera
      ? await ImagePicker.launchCameraAsync({ quality: 1 })
      : await ImagePicker.launchImageLibraryAsync({ quality: 1 });

    if (!pickerResult.canceled) {
      const selectedImage = pickerResult.assets[0];
      setImage(selectedImage.uri);
      sendImageToApi(selectedImage.uri);
    }
  };

  const sendImageToApi = async (uri) => {
    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append('image', {
        uri: uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await fetch('http://192.168.1.66:5000/predict', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        Alert.alert('Error', data.error || 'No se pudo obtener la predicción');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con la API');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const items = [
    'Envases de plástico (botellas, tapas)',
    'Papel y cartón (cajas, periódicos)',
    'Desechos orgánicos (frutas, verduras)',
    'Pilas y electrónicos',
    'Envases metálicos',
    'Botellas de vidrio',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clasificación</Text>
      <Text style={styles.subtitle}>
        Toma una foto o elige una imagen para continuar
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonGreen} onPress={() => pickImage(true)}>
          <Text style={styles.buttonText}>Tomar foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBlue} onPress={() => pickImage(false)}>
          <Text style={styles.buttonText}>Galería</Text>
        </TouchableOpacity>
      </View>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      {loading && <ActivityIndicator size="large" color="#03A9F4" style={{ marginTop: 20 }} />}

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Categoría: {result.label}
          </Text>
          <Text style={styles.resultText}>
            Confianza: {(result.confidence * 100).toFixed(2)}%
          </Text>
          <TouchableOpacity
            style={styles.buttonMap}
            onPress={() =>
              navigation.navigate('MapScreen', { location })
            }
          >
            <Text style={styles.buttonText}>Ver en el mapa</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Nuevo recuadro */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>¿Qué puedes escanear?</Text>
        <ScrollView>
          {items.map((item, index) => (
            <Text key={index} style={styles.infoItem}>
              {item}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', paddingHorizontal: 16, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 20 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  buttonGreen: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 8 },
  buttonBlue: { backgroundColor: '#03A9F4', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  image: { width: '100%', height: 250, marginTop: 20, borderRadius: 10 },
  resultContainer: {
    marginTop: 20,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  resultText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  buttonMap: { backgroundColor: '#FF5722', marginTop: 15, padding: 12, borderRadius: 8 },
  infoBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  infoTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  infoItem: { fontSize: 16, color: '#fff', marginVertical: 4 },
});
