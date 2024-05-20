

import { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import axios from 'axios';
import Movie from '../components/Movie';
import { useNavigation } from '@react-navigation/native';
import SearchMovie from '../components/SearchMovie';
import Butn from '../components/Butn';
import { Colors } from '../Constants/Colors';
import NotFound from '../components/favorite/UI/NotFound';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();
  const [resultNotFound, setResultNotFound] = useState(true);

  const fetchData = async () => {
    const result = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=75cc236c758acb8b090acf828728fe53&page=1');
  
    setMovies(result.data.results);
    setResultNotFound(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let isMounted = true;
  
    if (searchTerm === '') {
      if (isMounted) {
        fetchData();
      }
    } else {
      const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      if (filteredMovies.length) {
        setMovies(filteredMovies);
        setResultNotFound(false);
      } else {
        setResultNotFound(true);
      }
    }
  
    return () => {
      isMounted = false;
    };
  }, [searchTerm]);
  

  const handleMovies = ({ item }) => {
  
    return <Movie title={item.title}
      posterPath={item.poster_path}
      AverageRating={item.vote_average}
      
      onPress={() => navigation.navigate('Details', { movieId: item.id })}
    />;
  };

  return (
    <View style={styles.containerHome}>
      <SearchMovie onChangeText={setSearchTerm} value={searchTerm} />

      {!resultNotFound && movies.length>0? 
       <FlatList
       data={movies}
       renderItem={handleMovies}
       keyExtractor={item => item.id.toString()}
       style={{ flex: 1 }}
       numColumns={2}
      
     />
     
      :null}
        {resultNotFound ||!movies.length? 
        <NotFound />
      : null}
      <Butn style={styles.btnHeart} antIconName='heart'
        color='red'
        size={34}
        onPress={() => { navigation.navigate('Favourites') }}/>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    paddingTop: 70
  },
  btnHeart: {
    position: 'absolute',
    top: 25,
    right: 25,
    margin:20,
    color: Colors.Error,
    backgroundColor: Colors.Light,
    shadowColor: 'transparent',
  },
 
});

