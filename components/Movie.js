


import { View, Text, Image ,StyleSheet, Pressable, Dimensions} from 'react-native';

const Movie = ({ title, posterPath, AverageRating ,onPress}) => {
  return (
    <View style={styles.container}>
      <Pressable android_ripple={{ color:'black'}}
       onPress={onPress}
       style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
      ]}
      >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
        style={styles.image}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.Title}>{title}</Text>
        <Text style={styles.avgRat}> Rating: {AverageRating}</Text>
        
      </View>

      </Pressable>
    
    </View>
  );
};
 
export default Movie;
const width=Dimensions.get('window').width-30
 const styles=StyleSheet.create({
    container:{
         flex:1,
         flexDirection: 'column',
           marginBottom: 8 ,
           margin: 5,
           borderRadius:8,
           backgroundColor:'#ccc'
        },
        image:{
             width: width/2, 
             height: 200,
             borderRadius:8,
             resizeMode:'stretch'
             },
        innerContainer:{
          flex:1,
          padding:8,
          justifyContent:'center',
          alignItems:'center'
        },
        Title:{
          fontSize:18,
          fontWeight:'bold',
        },
       avgRat: {
        fontSize:16
       },
        button: {
          flex: 1,
        },
        buttonPressed: {
          opacity: 0.5,
        }
    

 })