import React,{Component} from 'react';
import { View, Platform,StatusBar } from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import {createStackNavigator} from '@react-navigation/stack'

import AddEntry from './components/AddEntry';
import reducer from './store/reducers/index';
import History from './components/History';
import { white, purple } from './utils/color';
import EntryDetails from './components/EntryDetails';

function UdaciStatusBar ({backgroundColor, ...props}){
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = Platform.OS === 'ios' 
  ? createBottomTabNavigator()
  : createMaterialTopTabNavigator()

const RouteConfigs = {
  History:{
    name: "History",
    component: History,
    options: {tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'History'}
  }, 
  AddEntry:{
    component: AddEntry,
    name: "Add Entry",
    options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Entry'}
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};
const TabNav = () =>(
  <Tabs.Navigator {...TabNavigatorConfig}>
    <Tabs.Screen {...RouteConfigs['History']}/>
    <Tabs.Screen {...RouteConfigs['AddEntry']}/>
  </Tabs.Navigator>
)


const Stack = createStackNavigator();
const MainNav = () =>(
  <Stack.Navigator headerMode="screen">
    <Stack.Screen 
      name="Home"
      component={TabNav}
      options={{headerShown:false}} />
    <Stack.Screen
      name="EntryDetail"
      component={EntryDetails}
      options={{
        headerTintColor: white,
        headerStyle:{
          backgroundColor:purple
        }
      }} />

  </Stack.Navigator>
)

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <NavigationContainer>
            <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
      
    );
  }
}
