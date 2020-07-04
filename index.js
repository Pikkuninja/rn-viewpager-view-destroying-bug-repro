import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, View, Text } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ViewPager from '@react-native-community/viewpager';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ViewPagerScreen = ({navigation}) => {
  return (
    <ViewPager style={{ flex: 1}} initialPage={0}>
      <View key={1} style={{backgroundColor: '#aaccaa'}}>
        <Text>First page</Text>
        <TouchableOpacity onPress={() => navigation.navigate("NestedStack")}>
          <Text>Goto NestedStack</Text>
        </TouchableOpacity>
      </View>
      <View key={2} style={{backgroundColor: '#aaaacc'}}>
        <Text>Second page</Text>
      </View>
    </ViewPager>
  );
};

const AppNavigator = createStackNavigator({
  Home: {
    screen: ViewPagerScreen,
  },
  NestedStack: createStackNavigator({
    SomeScreen: {
      screen: ViewPagerScreen
    }
  })
});

AppRegistry.registerComponent("ViewpagerViewDestroyingRepro", () => createAppContainer(AppNavigator));
