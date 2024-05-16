


import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../store/FavoriteContext'
import { Colors } from '../Constants/Colors';
import { genreMap } from '../data/Genres';
import Butn from '../components/Butn';
import RoundIconBtn from '../components/RoundIconBtn';

const DetailScreen = ({ route }) => {
  const movie = route.params.movie;
 
  const navigation = useNavigation();
  const { addFavorite } = useFavorites();

  const handleAddToFavorites = () => {
    addFavorite(movie);
    navigation.navigate('Favourites');
  };
  const maxGenresToShow = 4;
  const genreIds = [...new Set(movie.genre_ids)]; 
  const genreDescriptions = genreIds.slice(0, maxGenresToShow).map(id => genreMap[id]).join(', ');
 
  return (
  
      
      <View style={styles.container}>
        <View style={{paddingTop:30}}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.poster} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={{ fontSize: 18 }}>Rating: {movie.vote_average}</Text>
          </View>
          <View style={styles.innerText}>
            <View style={styles.duration}>
            <Text style={styles.text}>Duration: {movie.runtime||144} min</Text>
            <Text style={styles.text}>Release Date: {movie.release_date}</Text>
            </View>
            <View style={styles.genresContainer}>
                {genreDescriptions.split(', ').map((genre, index) => (
               <View key={index} style={styles.genreItem}>
                 <Text style={{fontSize:20,padding:6}}>{genre}</Text>
                </View>
                 ))}
             </View>
          </View>
        </View>
        <Text style={{ fontSize: 22,margin:6 }}>Overview</Text>
        <View style={styles.containerOverview}>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>
        <RoundIconBtn style={styles.btnHeart} 
      antIconName='heart-plus'
        onPress={handleAddToFavorites} 
        size={44}
        color='red'
        
        />
       
<Butn 
  style={styles.btnfleche}
  antIconName='arrowleft'
  color='#fff'
  onPress={() => navigation.goBack()} 
/>

      </View>
   
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
    resizeMode: 'stretch',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginRight: 10,
    flexWrap: 'wrap',
   
  },
  innerText: {
    flexDirection: 'column',
    marginLeft: 10,
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  duration:{
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  
  text: {
    fontSize: 19,
    marginBottom: 8,
  },
  overview: {
    fontSize: 20,
    marginLeft: 8,
    
  },
  containerImage: {
    backgroundColor: Colors.Primary,
  },
  containerOverview: {
    borderColor: Colors.Dark,
    borderWidth: 3,
    padding: 7,
    margin: 16,
   
  },
  btnHeart: {
    position:'absolute',
    top: 35,
    right: 25,
    padding:8,
    
  }, 
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  genreItem: {
    backgroundColor: Colors.Primary, 
    borderRadius: 5, 
    paddingHorizontal: 12,
    margin: 5, 
    borderBlockColor:Colors.Dark,
    borderWidth:1,
    borderRadius:20,
  
  },
  btnfleche: {
    position: 'absolute',
    top: 45,
    left: 25,
    padding:8,
     backgroundColor:Colors.Light
   

  },
});

export default DetailScreen;



