import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TarjetaClimaCaract({ datos }) {
  return (
    <View style={estilos.tarjeta}>
      <Text style={estilos.titulo}>Condiciones Actuales</Text>

      <View style={estilos.lista}>
        <Text style={estilos.texto}>
          🌡️ Sensación térmica: {datos.sensacionTermica.toFixed(1)}°C
        </Text>
        <Text style={estilos.texto}>💧 Humedad: {datos.humedad}%</Text>
        <Text style={estilos.texto}>
          🌫️ Visibilidad: {datos.visibilidad / 1000} km
        </Text>
        <Text style={estilos.texto}>
          🌬️ Presión atmosférica: {datos.presion} hPa
        </Text>
        <Text style={estilos.texto}>
          💨 Velocidad del viento: {datos.viento} km/h
        </Text>
        <Text style={estilos.texto}>☀️ Índice UV: {datos.indiceUV}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: "rgba(29, 29, 29, 0.25)", 
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    width: "100%",
    alignItems: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  lista: {
    alignSelf: "flex-start",
  },
  texto: {
    fontSize: 16,
    color: "#f0f0f0",
    marginBottom: 4,
  },
});
