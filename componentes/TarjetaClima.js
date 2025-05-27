import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function TarjetaClima({ datos }) {
  const { name, main, weather, wind } = datos;
  const icono = weather[0].icon;
  const urlIcono = `http://openweathermap.org/img/wn/${icono}@2x.png`;

  return (
    <View style={estilos.tarjeta}>
      <View style={estilos.encabezado}>
        <Text style={estilos.ciudad}>{name}</Text>
        <Text style={estilos.descripcion}>{weather[0].description}</Text>
      </View>

      <View style={estilos.contenido}>
        <View style={estilos.iconoContenedor}>
          <Image source={{ uri: urlIcono }} style={estilos.icono} />
        </View>
        <View style={estilos.temperaturas}>
          <Text style={estilos.temperatura}>{main.temp.toFixed(1)}°C</Text>
          <Text style={estilos.minmax}>
            ↓ {main.temp_min}° ↑ {main.temp_max}°
          </Text>
          <Text style={estilos.viento}>💨 {wind.speed} km/h</Text>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    width: "100%",
    alignItems: "center",
  },
  encabezado: {
    alignItems: "center",
    marginBottom: 10,
  },
  ciudad: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  descripcion: {
    fontSize: 16,
    color: "#34495e",
    textTransform: "capitalize",
  },
 contenido: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
},
iconoContenedor: {
  position: 'absolute',
  left: 40,
},
icono: {
  width: 80,
  height: 60,
},
temperaturas: {
  alignItems: 'center',
  marginLeft: 0, 
},
temperatura: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#2c3e50',
},
minmax: {
  fontSize: 14,
  color: '#7f8c8d',
  marginTop: 2,
},
viento: {
  fontSize: 14,
  color: '#2980b9',
  marginTop: 2,
},

});
