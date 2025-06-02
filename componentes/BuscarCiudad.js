import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function BuscadorCiudad({ onBuscar }) {
  const [ciudad, setCiudad] = useState('');

  const manejarBusqueda = () => {
    if (!ciudad.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre de una ciudad válida.');
      return;
    }
    onBuscar(ciudad.trim());
  };

  return (
    <View style={estilos.contenedor}>
      <TextInput
        placeholder="Escribe una ciudad"
        style={estilos.input}
        value={ciudad}
        onChangeText={setCiudad}
      />
      <Button title="Buscar" onPress={manejarBusqueda} />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
    padding: 5,
  },
});
