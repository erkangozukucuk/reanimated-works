import React, {useState} from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import Data from './DataProvider';
import Metrics from '../Metrics';
import VideoModal from './VideoModal';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const AvatarSize = 50;

const Home = () => {
  const [video, setVideo] = useState(null);

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
      {video && <VideoModal {...{video}}></VideoModal>}
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
