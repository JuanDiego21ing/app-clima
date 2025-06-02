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
    backgroundColor: "rgba(29, 29, 29, 0.25)", 
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  encabezado: {
    alignItems: "center",
    marginBottom: 10,
  },
  ciudad: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff", 
  },
  descripcion: {
    fontSize: 16,
    color: "#ecf0f1",
    textTransform: "capitalize",
  },
  contenido: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  iconoContenedor: {
    position: "absolute",
    left: 40,
  },
  icono: {
    width: 80,
    height: 60,
  },
  temperaturas: {
    alignItems: "center",
  },
  temperatura: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  minmax: {
    fontSize: 14,
    color: "#f1f1f1",
    marginTop: 2,
  },
  viento: {
    fontSize: 14,
    color: "#d0e6f7",
    marginTop: 2,
  },
});
