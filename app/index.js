import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({navigation, route}) {
  React.useEffect(()=>{
    if(route.params?.post){
      console.log(route.params.post)
    }
  }, [route.params?.post])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="View Details" onPress={()=>navigation.navigate('Details', {
        itemId: 20,
        otherParam: "Parameter 21"
      })}/>
      <Button title="Create Post" onPress={()=>navigation.navigate('CreatePost')}/>
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <Button title="Update" onPress={()=>navigation.setParams({
        query: "New Update"
      })}/>
    </View>
  );
}

function Details({route, navigation}){
  const {itemId, otherParam, userId} = route.params
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>User Id: {JSON.stringify(userId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button title='Go to details...again' onPress={()=> navigation.push('Details', {itemId: Math.floor(Math.random()*100)})}/>
      <Button title='Go Home' onPress={()=> navigation.navigate('Home')}/>
      <Button title='Go Back' onPress={()=> navigation.goBack()}/>
      <Button title='Profile' onPress={()=> navigation.navigate('ProfileScreen')}/>
    </View>
  )
}

function CreatePost({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}

function ProfileScreen({route}){
  const {title} = route.params
  return(
    <View>
      <Text>{title}</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator();

function LogoTitle(){
  return (
    <Image style = {{ width: 50, height: 50}} source = {{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
  )
}

export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Home' screenOptions={{
       headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{
        title: 'My Home',
        headerStyle: {
          backgroundColor: '#f4511e'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}/>
      <Stack.Screen name="CreatePost" component={CreatePost} options={{headerTitle: (props)=> <LogoTitle {...props}/>}}/>
      <Stack.Screen name="Details" component={Details} options={{title: "Details"}} initialParams={{ userId: 56}}/>
      <Stack.Screen name="Profile" component={ProfileScreen} options={({route})=>({title:route.params.name})}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
