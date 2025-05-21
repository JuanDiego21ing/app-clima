import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { obtenerClimaActual, obtenerPronostico } from './api/apiClima';
import TarjetaClima from './componentes/TarjetaClima';

export default function App() {
  const [clima, setClima] = useState(null);
  const [pronostico, setPronostico] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const climaActual = await obtenerClimaActual();
        const datosPronostico = await obtenerPronostico();
        setClima(climaActual);
        setPronostico(datosPronostico.list.slice(0, 4)); // 4 horarios
      } catch (error) {
        console.error('Error al obtener datos del clima:', error);
      }
    };
    cargarDatos();
  }, []);

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.ciudad}>Londres</Text>
      {clima && <TarjetaClima clima={clima} />}
      <Text style={estilos.tituloSeccion}>Próximas horas</Text>
      <ScrollView horizontal style={estilos.scrollPronostico}>
        {pronostico.map((item, index) => (
          <View key={index} style={estilos.itemPronostico}>
            <Text style={estilos.hora}>
              {item.dt_txt.split(' ')[1].slice(0, 5)}
            </Text>
            <Text>{Math.round(item.main.temp)}°</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#87CEFA', // azul claro
    paddingTop: 60,
    alignItems: 'center',
  },
  ciudad: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tituloSeccion: {
    marginTop: 20,
    fontSize: 20,
    color: '#fff',
  },
  scrollPronostico: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  itemPronostico: {
    backgroundColor: '#ffffffaa',
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  hora: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
