
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

interface PinLocation {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

export function MapScreen() {
  const [markers, setMarkers] = useState<PinLocation[]>([
    {
      id: '1',
      title: '1 - Faculdade Impacta',
      description: 'Av. Rudge, 315 - Barra Funda',
      latitude: -23.5255,
      longitude: -46.6494,
    },
    {
      id: '2',
      title: '2 - Bootcamp MBA',
      description: 'Av. Paulista, 1009 - Bela Vista',
      latitude: -23.5648,
      longitude: -46.6524,
    },
    {
      id: '3',
      title: '3 - Lojão do Macarrão',
      description: 'Ponto de parada / Referência',
      latitude: -23.5450,
      longitude: -46.6380,
    },
  ]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Ative o GPS para visualizar sua posição atual.');
      }
    })();
  }, []);

  function handleMapPress(event: MapPressEvent) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkers((prev) => [
      prev[0],
      prev[1],
      {
        ...prev[2],
        description: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
        latitude,
        longitude,
      },
    ]);
  }

  async function markCurrentLocationAsPin1() {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setMarkers((prev) => [
        {
          ...prev[0],
          description: 'Minha localização atual via GPS',
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        prev[1],
        prev[2],
      ]);
    } catch {
      Alert.alert('Erro', 'Não foi possível obter a localização atual.');
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: -23.545,
          longitude: -46.648,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
        onPress={handleMapPress}
      >
        {markers.map((marker, index) => {
          const isFirst = index === 0;
          const pinColor = isFirst ? '#2196F3' : '#EF5350';

          return (
            <React.Fragment key={`${marker.id}-${marker.latitude}-${marker.longitude}`}>
              {/* 1. Pino nativo colorido do Google Maps */}
              <Marker
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                pinColor={pinColor}
                title={marker.title}
                description={marker.description}
              />

              {/* 2. Plaquinha com o nome posicionada logo acima do pino */}
              <Marker
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                anchor={{ x: 0.5, y: 2.3 }}
                tracksViewChanges={false}
              >
                <View style={[styles.badge, { borderColor: pinColor }]}>
                  <Text style={styles.badgeText}>{marker.title}</Text>
                </View>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.hint}>
          Toque no mapa para mover o Pin 3 (Lojão do Macarrão)
        </Text>
        <TouchableOpacity style={styles.gpsButton} onPress={markCurrentLocationAsPin1}>
          <Ionicons name="locate" size={20} color="#FFFFFF" />
          <Text style={styles.gpsButtonText}>Usar meu GPS na Faculdade Impacta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
  },
  map: {
    flex: 1,
  },
  badge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1.5,
    elevation: 4,
  },
  badgeText: {
    color: '#212121',
    fontSize: 12,
    fontWeight: '700',
  },
  footer: {
    backgroundColor: '#424242',
    padding: 16,
  },
  hint: {
    color: '#E0E0E0',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 10,
  },
  gpsButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
  },
  gpsButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});