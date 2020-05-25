import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{backgroundColor: 'pink', padding: 20}}
        onPress={() => {
          navigation.navigate('Youtube');
        }}>
        <Text>Youtube</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
