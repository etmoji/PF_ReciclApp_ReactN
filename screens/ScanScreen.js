import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const categories = ['Papel', 'Vidrio', 'Cartón', 'Metal', 'Composta', 'Plástico', 'Otros'];

export default function ScanScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const pickImage = async (fromCamera = false) => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permisos requeridos', 'Se necesita permiso de cámara');
      return;
    }

    let pickerResult = fromCamera
      ? await ImagePicker.launchCameraAsync({ base64: true })
      : await ImagePicker.launchImageLibraryAsync({ base64: true });

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
      simulateClassification(); // Simula predicción
    }
  };

  const simulateClassification = () => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const confidence = (Math.random() * 100).toFixed(1);
    setResult({ category, confidence });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clasificación</Text>
      <Text style={styles.subtitle}>
        Toma una foto o elige una imagen para clasificar el tipo de residuo
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonGreen} onPress={() => pickImage(true)}>
          <Text style={styles.buttonText}>Tomar foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBlue} onPress={() => pickImage(false)}>
          <Text style={styles.buttonText}>Galería</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Resultado:</Text>
              <Text style={styles.resultText}>{result.category}</Text>
              <Text style={styles.resultConfidence}>Confianza: {result.confidence}%</Text>

              <TouchableOpacity
                style={styles.buttonAcopio}
                onPress={() => navigation.navigate('Map')}
              >
                <Text style={styles.buttonText}>Ver centros de acopio</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 20 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  buttonGreen: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
  },
  buttonBlue: {
    backgroundColor: '#03A9F4',
    padding: 12,
    borderRadius: 8,
  },
  buttonAcopio: {
    marginTop: 20,
    backgroundColor: '#6B8E23',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  image: { width: '100%', height: 250, marginTop: 20, borderRadius: 10 },
  resultCard: { marginTop: 20, padding: 20, backgroundColor: '#E8F5E9', borderRadius: 10, width: '100%' },
  resultTitle: { fontWeight: 'bold', fontSize: 18 },
  resultText: { fontSize: 22, fontWeight: 'bold', color: '#4CAF50', marginTop: 8 },
  resultConfidence: { fontSize: 16, color: '#555', marginTop: 4 },
});
// Este código es una pantalla de escaneo que permite al usuario tomar una foto o seleccionar una imagen de la galería para clasificar el tipo de residuo. Utiliza la biblioteca Expo ImagePicker para manejar la selección de imágenes y simula una clasificación aleatoria de residuos. Además, muestra un botón para navegar a un mapa de centros de acopio. La interfaz es simple y amigable, con botones estilizados y un diseño limpio.
// Asegúrate de tener instaladas las dependencias necesarias y de configurar correctamente tu proyecto de React Native con Expo para que este código funcione correctamente. Puedes personalizar aún más los estilos y la lógica de clasificación según tus necesidades.
// Recuerda que este es un ejemplo básico y la lógica de clasificación real debería ser implementada con un modelo de machine learning entrenado para clasificar residuos. Puedes integrar bibliotecas como TensorFlow.js o usar servicios externos para realizar la clasificación real de imágenes.
// Además, asegúrate de manejar adecuadamente los permisos de cámara y galería en tu aplicación, ya que es fundamental para la funcionalidad de captura de imágenes. También puedes mejorar la experiencia del usuario añadiendo mensajes de carga o errores en caso de que algo salga mal durante la selección de imágenes o la clasificación.
// No olvides probar la aplicación en diferentes dispositivos para asegurarte de que la interfaz se vea