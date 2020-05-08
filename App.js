import React,{Component} from 'react';
import { View } from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import AddEntry from './components/AddEntry';
import reducer from './store/reducers/index';
import History from './components/History';

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          {/* <AddEntry /> */}
          <View style={{height:20}} />
          <History />
        </View>
      </Provider>
      
    );
  }
}
