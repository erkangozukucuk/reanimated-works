import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Metrics from '../Metrics';
import Animated, {
  block,
  timing,
  Easing,
  startClock,
  stopClock,
  interpolate,
} from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const {
  Clock,
  Value,
  Extrapolate,
  multiply,
  cond,
  eq,
  add,
  set,
  useCode,
  neq,
  onChange,
  clockRunning,
} = Animated;
const AvatarSize = 50;
const targetPosition = Metrics.Height - 250;
let clock = new Clock();
let translationY = new Value(0);
let offsetY = new Value(0);
let gestureState = new Value(State.UNDETERMINED);

const VideoModal = ({video}) => {
  useEffect(() => {
    clock = new Clock();
    translationY = new Value(0);
    offsetY = new Value(0);
    gestureState = new Value(State.UNDETERMINED);
  }, []);
  const _onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {translationY},
      },
    ],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = Animated.event(
    [
      {
        nativeEvent: {state: gestureState},
      },
    ],
    {useNativeDriver: true},
  );

  const runTiming = (clock, value, dest) => {
    const state = {
      finished: new Value(0),
      position: value,
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: 600,
      toValue: dest,
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]),
      timing(clock, state, config),
      cond(state.finished, stopClock(clock)),
      state.position,
    ]);
  };

  const translateY = cond(
    eq(gestureState, State.END),
    [
      runTiming(clock, translationY, new Value(targetPosition)),
      set(offsetY, translationY),
    ],
    // [add(translationY, offsetY), set(offsetY, translationY)],
    [add(translationY, offsetY)],
  );

  const width = interpolate(translateY, {
    inputRange: [targetPosition / 2, targetPosition],
    outputRange: [Metrics.Width, Metrics.Width / 3],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity = interpolate(translateY, {
    inputRange: [0, targetPosition - 100],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <PanGestureHandler
      onGestureEvent={_onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}>
      <Animated.View
        style={{
          transform: [{translateY}],
        }}>
        <View style={{alignSelf: 'stretch', backgroundColor: 'pink'}}>
          <Animated.Text
            style={{
              width: (Metrics.Width / 3) * 2,
              flexDirection: 'row',
              position: 'absolute',
              alignItems: 'center',
              top: 0,
              bottom: 0,
              right: 0,
            }}>
            <Text style={[styles.name, {flex: 1}]}>{video?.name}</Text>
            <Text style={{fontSize: 30}}>X</Text>
          </Animated.Text>

          <Animated.View style={{aspectRatio: 1280 / 720, width}}>
            <Image source={video?.thumbnail} style={[styles.thumbnail]}></Image>
          </Animated.View>
        </View>
        <Animated.View style={[styles.detailContainer, {opacity}]}>
          <Text style={styles.name}>{video?.name}</Text>
          <Text style={styles.info}>
            <Text>{video?.watching + ' * '}</Text>
            <Text>{video?.uploadTime}</Text>
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.actionColumn}>
              <Text>Like</Text>
            </View>
            <View style={styles.actionColumn}>
              <Text>Dislike</Text>
            </View>
            <View style={styles.actionColumn}>
              <Text>Share</Text>
            </View>
            <View style={styles.actionColumn}>
              <Text>Download</Text>
            </View>
            <View style={styles.actionColumn}>
              <TouchableOpacity
                onPress={() => {
                  startAnimation(false);
                }}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  actionColumn: {
    flex: 1,
    height: 40,
    margin: 5,
    backgroundColor: '#545454',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: Metrics.Width,
    aspectRatio: 1280 / 720,
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: 'red',
  },
  detailContainer: {
    padding: 10,

    // backgroundColor: 'red',
  },
  avatar: {
    width: AvatarSize,
    aspectRatio: 1,
    borderRadius: AvatarSize / 2,
    margin: 10,
    marginLeft: 0,
  },
  name: {fontSize: 16, color: 'black', marginBottom: 10},
  info: {
    flexDirection: 'row',
    fontSize: 12,
    color: '#595959',
  },
});
export default VideoModal;
