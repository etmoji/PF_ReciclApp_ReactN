import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CenterScreen = ({ route }) => {
  const navigation = useNavigation();
  const { center } = route.params;

  if (!center) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Datos del centro no disponibles.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const openGoogleMaps = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open Google Maps URL:", err)
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: center.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Título */}
      <Text style={styles.title}>{center.Name}</Text>

      {/* Información */}
      <InfoRow label="Descripción:" info={center.Description} />
      <InfoRow label="Dirección:" info={center.Address} />
      <InfoRow label="Horario:" info={center.Hours} />
      <InfoRow label="Teléfono:" info={center.Phone} />
      <InfoRow label="Materiales reciclados:" info={center.Materials_Recycled} />

      {/* Botón para abrir en Google Maps */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => openGoogleMaps(center.url_google)}
      >
        <Text style={styles.buttonText}>Abrir en Google Maps</Text>
      </TouchableOpacity>

      {/* Botón para regresar */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const InfoRow = ({ label, info }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoText}>{info}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 16,
  },
  infoText: {
    color: '#666666',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#6B8E23',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CenterScreen;
