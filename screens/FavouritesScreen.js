
import React, { useState, useEffect } from 'react';
import { View,  StyleSheet,FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../store/FavoriteContext';
import FavoriteItem from '../components/favorite/FavoriteItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingFavorite from '../components/favorite/LoadingFavorite';

const FavouritesScreen = () => {
  const navigation = useNavigation();
  const { favorites,setFavorites, removeFavorite } = useFavorites();
  const [loading, setLoading] = useState(true); 

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites!== null) {
        const parsedFavorites = JSON.parse(storedFavorites);
        if (parsedFavorites.length > 0) {
        
          setFavorites(parsedFavorites);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
   
    loadFavorites();
  }, []);

  if (loading) {
    return <LoadingFavorite/>
   
  }

  const renderFavoritesItems = ({ item }) => (
    <FavoriteItem
      item={item}
      onPress={() => navigation.navigate('Details', { movie: item })}
      removeFavorite={removeFavorite}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        numColumns={2}
        columnWrapperStyle={styles.flat}
        renderItem={renderFavoritesItems}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flat: {
    justifyContent: 'space-between',
    marginBottom: 15, 
    margin: 10,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    zIndex: 1,
  },
});

export default FavouritesScreen;







