// componentes/PronosticoDia.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PronosticoDia = ({ diaData }) => {
  if (!diaData) return null;

  const fecha = new Date(diaData.dt * 1000);
  // 'short' para día de la semana y mes, 'numeric' para el día del mes
  const opcionesFecha = { weekday: 'short', day: 'numeric', month: 'short' };
  // Limpiar el punto final que a veces agrega toLocaleDateString en algunas configuraciones
  const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha).replace(/\.$/, '');

  const iconoClima = diaData.weather[0].icon;
  const urlIcono = `http://openweathermap.org/img/wn/${iconoClima}@2x.png`;

  return (
    <View style={estilos.contenedorDia}>
      <View style={estilos.seccionFecha}>
        <Text style={estilos.fecha}>{fechaFormateada}</Text>
      </View>

      <View style={estilos.seccionIcono}>
        <Image source={{ uri: urlIcono }} style={estilos.icono} />
      </View>

      <View style={estilos.seccionDescripcion}>
        <Text style={estilos.descripcion} numberOfLines={1} ellipsizeMode="tail">
          {diaData.weather[0].description}
        </Text>
      </View>

      <View style={estilos.seccionTemperaturas}>
        <Text style={estilos.temperatura}>
          {Math.round(diaData.temp.max)}°
        </Text>
        <Text style={estilos.temperaturaMin}>
          {Math.round(diaData.temp.min)}°
        </Text>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedorDia: {
    flexDirection: 'row', // <--- CLAVE PARA LAYOUT HORIZONTAL
    alignItems: 'center', // Centra los ítems verticalmente dentro de la fila
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Un poco más opaco para mejor legibilidad
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 5, // Espacio entre tarjetas
    width: '100%', // Ocupa el ancho disponible
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  seccionFecha: {
    flex: 2.5, // Proporción del espacio que ocupa
    alignItems: 'flex-start',
  },
  fecha: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50', // Un color más oscuro para el texto principal
    textTransform: 'capitalize',
  },
  seccionIcono: {
    flex: 1.2, // Proporción para el icono
    alignItems: 'center', // Centra el icono en su sección
  },
  icono: {
    width: 45, // Ajusta según tu preferencia
    height: 45,
  },
  seccionDescripcion: {
    flex: 3, // Más espacio para la descripción
    paddingHorizontal: 8, // Espacio alrededor de la descripción
    alignItems: 'flex-start',
  },
  descripcion: {
    fontSize: 14,
    color: '#34495e',
    textTransform: 'capitalize',
  },
  seccionTemperaturas: {
    flex: 1.5, // Espacio para las temperaturas
    alignItems: 'flex-end', // Alinea las temperaturas a la derecha de su sección
  },
  temperatura: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  temperaturaMin: {
    fontSize: 14,
    color: '#7f8c8d', // Un color más suave para la temperatura mínima
  },
});

export default PronosticoDia;