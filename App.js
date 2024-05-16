
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { StatusBar } from 'expo-status-bar';

import DetailsScreen from './screens/DetailsScreen ';
import FavouritesScreen from './screens/FavouritesScreen';
import { Colors } from './Constants/Colors';

import  {FavoriteProvider}  from './store/FavoriteContext';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <>
      <StatusBar style='dark'/>
      <FavoriteProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{
                
                headerShown:false,
                title: '',
              }}
            />
            <Stack.Screen 
              name="Details" 
              component={DetailsScreen}
              options={{                
               headerShown:false,
                title: '',
                headerStyle: {backgroundColor: Colors.Primary}
              }}
            />
            <Stack.Screen name='Favourites' component={FavouritesScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </FavoriteProvider>
    </>
  );
};

export default App;
