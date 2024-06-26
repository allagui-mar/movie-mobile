import { StyleSheet, Text, View } from 'react-native';
import {AntDesign}from '@expo/vector-icons';
const NotFound = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}> 
      <AntDesign name='frowno' size={90} color='black'/>
      <Text style={{marginTop:20,fontSize:20}}>Result Not Found</Text>
    </View>
  )
}

export default NotFound

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        opacity:0.5,
        zIndex:-1
    }
})