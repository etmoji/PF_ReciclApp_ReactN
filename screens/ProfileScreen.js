import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [anioNacimiento, setAnioNacimiento] = useState('');
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const nombreGuardado = await AsyncStorage.getItem('nombre');
      const correoGuardado = await AsyncStorage.getItem('correo');
      const anioGuardado = await AsyncStorage.getItem('anioNacimiento');
      if (nombreGuardado) setNombre(nombreGuardado);
      if (correoGuardado) setCorreo(correoGuardado);
      if (anioGuardado) setAnioNacimiento(anioGuardado);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los datos.');
    }
  };

  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem('nombre', nombre);
      await AsyncStorage.setItem('correo', correo);
      await AsyncStorage.setItem('anioNacimiento', anioNacimiento);
      setMensajeConfirmacion('Datos guardados correctamente.');
      setEditando(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron guardar los datos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Configuración del perfil</Text>

      {editando ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={correo}
            onChangeText={setCorreo}
          />
          <TextInput
            style={styles.input}
            placeholder="Año de nacimiento"
            value={anioNacimiento}
            onChangeText={setAnioNacimiento}
            keyboardType="numeric"
          />
          <Button title="Guardar" onPress={guardarDatos} color="#6B8E23" />
        </>
      ) : (
        <>
          <Text style={styles.label}>Nombre: {nombre}</Text>
          <Text style={styles.label}>Correo: {correo}</Text>
          <Text style={styles.label}>Año de nacimiento: {anioNacimiento}</Text>
          <View style={{ marginVertical: 12 }}>
            <Button title="Editar" onPress={() => setEditando(true)} color="#6B8E23" />
          </View>
        </>
      )}

      {mensajeConfirmacion !== '' && (
        <Text style={styles.confirmacion}>{mensajeConfirmacion}</Text>
      )}

      <View style={styles.divisor} />

      <Text style={styles.subtitulo}>Soporte e información</Text>
      <Text style={styles.label}>Versión 1.0.0</Text>
      <Text style={styles.label}>Contacto: storrezo2200@alumno.ipn.mx</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  confirmacion: {
    color: '#6B8E23',
    fontWeight: '500',
    marginTop: 10,
  },
  divisor: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B8E23',
    marginBottom: 10,
  },
});
