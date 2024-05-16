
import { Button, View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../store/FavoriteContext';
import { Colors } from '../Constants/Colors';
import RoundIconBtn from './RoundIconBtn';
import { StatusBar } from 'expo-status-bar';
import Butn from './Butn';

const MovieDetail = ({ movie }) => {
  const moviId=movie.route.params
  const navigation = useNavigation();
  const { addFavorite } = useFavorites();
  
  const handleAddToFavorites = () => {
   
    addFavorite(movie);
    navigation.navigate('Favourites');
  };

  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.poster} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={{fontSize:18}}>Rating: {movie.vote_average}</Text>
        </View>
        <View style={styles.innerText}>
        <Text style={styles.text}>duration: {movie.runtime}</Text>
          <Text style={styles.text}>Release Date: {movie.release_date}</Text>
         
          <Text style={styles.text}>Genres: {movie.genre_ids.join(', ')}</Text>
        </View>
      </View>
      <Text style={{ fontSize: 24,padding:15 }}>Overview</Text>
      <View style={styles.containerOverview}>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
      <RoundIconBtn style={styles.btnHeart} 
      antIconName='heart-plus'
        onPress={handleAddToFavorites} 
        size={35}
        color='#fff'
        />
        <Butn style={styles.btnfleche} 
        antIconName='arrowleft'
        onPress={()=>navigation.goBack()}/>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  poster: {
    width: '100%',
    height: 300,
    contentFit: "fill",
    marginBottom: 10,
    resizeMode:'stretch'
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginRight:10,
    flexWrap:'wrap'
  },
  innerText:{
  flexDirection:'column',
  marginLeft:10,
  marginBottom:10
  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  overview: {
   
    fontSize: 20,
    margin: 10,
  },
  containerImage: {
    backgroundColor: Colors.Primary,
  },
  containerOverview: {
    borderColor: Colors.Dark,
    borderWidth: 3,
    padding: 10,
    margin: 10,
  },
  btnHeart:{
    position: 'absolute',
    top: 35,
    right: 30,
    color: Colors.Error,
    backgroundColor: '#11ffee00',
  },
  btnfleche:{
    position: 'absolute',
    top: 35,
     left: 30,
    color: Colors.Dark,
    backgroundColor: '#fff',
  }
});

export default MovieDetail;
