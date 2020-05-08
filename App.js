import React,{Component} from 'react';
import { View } from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import AddEntry from './components/AddEntry';
import reducer from './store/reducers/index';

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View>
          <AddEntry />
        </View>
      </Provider>
      
    );
  }
}
