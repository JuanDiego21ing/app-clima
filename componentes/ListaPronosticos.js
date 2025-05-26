// componentes/ListaPronosticos.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Removimos FlatList de los imports
import PronosticoDia from './PronosticoDia';

const ListaPronosticos = ({ pronostico }) => {
  if (!pronostico || !pronostico.daily || pronostico.daily.length === 0) {
    return <Text style={estilos.mensaje}>No hay datos de pronóstico disponibles.</Text>;
  }

  // Tomamos los próximos 7 días
  const proximosSieteDias = pronostico.daily.slice(0, 7);

  return (
    <View style={estilos.contenedorLista}>
      <Text style={estilos.titulo}>Pronóstico 7 Días</Text>
      {/* Mapeamos directamente los datos en lugar de usar FlatList */}
      {proximosSieteDias.map(item => (
        <PronosticoDia key={item.dt.toString()} diaData={item} />
      ))}
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedorLista: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center', // Para centrar los PronosticoDia si su ancho es menor al 100%
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
  }
});

export default ListaPronosticos;