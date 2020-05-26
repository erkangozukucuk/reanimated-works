import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import Data from './DataProvider';
import Metrics from '../Metrics';
import VideoModal from './VideoModal';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  timing,
  Extrapolate,
  Value,
} from 'react-native-reanimated';

const AvatarSize = 50;

const Home = () => {
  const [video, setVideo] = useState(null);
  const [animationValue, setAnimationValue] = useState(new Value(0));

  useEffect(() => {
    if (video) {
      timing(animationValue, {
        duration: 300,
        toValue: 1,
        easing: Easing.inOut(Easing.ease),
      }).start(() => {});
    }
  }, [video]);

  const translateContainerY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Metrics.Height, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Data.map((d, i) => {
          return (
            <TouchableWithoutFeedback
              key={i}
              onPress={() => {
                setVideo(d);
              }}>
              <View style={{marginBottom: 20}}>
                <Image source={d.thumbnail} style={styles.thumbnail}></Image>
                <View style={styles.detailContainer}>
                  <Image source={d.thumbnail} style={styles.avatar}></Image>
                  <View style={{flex: 1}}>
                    <Text style={styles.name}>{d.name}</Text>
                    <Text style={styles.info}>
                      <Text>{d.owner + ' * '}</Text>
                      <Text>{d.watching + ' * '}</Text>
                      <Text>{d.uploadTime}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
      {video && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'white',
              transform: [
                {
                  translateY: translateContainerY,
                },
              ],
            },
          ]}>
          <VideoModal video={video}></VideoModal>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: Metrics.Width,
    height: (Metrics.Width * 720) / 1280,
    resizeMode: 'contain',
  },
  detailContainer: {flexDirection: 'row', padding: 10},
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
export default Home;
