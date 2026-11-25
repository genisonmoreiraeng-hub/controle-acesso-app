import React, { useState, useCallback, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { User } from '../domain/User';
import { UserService } from '../domain/UserService';
import { AsyncStorageUserRepository } from '../infra/AsyncStorageUserRepository';

type Props = NativeStackScreenProps<RootStackParamList, 'UserList'>;
const userService = new UserService(new AsyncStorageUserRepository());

export function UserListScreen({ navigation }: Props) {
  const [users, setUsers] = useState<User[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Map')}
            style={styles.headerButton}
          >
            <Ionicons name="map-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.replace('Login')}
            style={styles.headerButton}
          >
            <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserForm', {})}
            style={styles.headerButton}
          >
            <Ionicons name="person-add" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      userService.listUsers().then(setUsers);
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('UserForm', { user: item })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.login}>{item.login}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 18,
  },
  item: {
    paddingVertical: 14,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  login: {
    color: '#BDBDBD',
    fontSize: 14,
    marginTop: 2,
  },
});