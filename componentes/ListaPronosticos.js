// componentes/ListaPronosticos.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import PronosticoDia from './PronosticoDia';

const ListaPronosticos = ({ pronostico }) => {
  if (!pronostico?.daily?.length) {
    return <Text style={estilos.mensaje}>No hay datos de pronóstico disponibles.</Text>;
  }

  const proximosSieteDias = pronostico.daily.slice(0, 7);

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Pronóstico 7 Días</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {proximosSieteDias.map(item => (
          <PronosticoDia key={item.dt.toString()} diaData={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    marginTop: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  mensaje: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
  },
});

export default ListaPronosticos;
