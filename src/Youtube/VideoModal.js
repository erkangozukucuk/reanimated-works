import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Metrics from '../Metrics';
const AvatarSize = 50;

const VideoModal = ({video, onClose}) => {
  return (
    <View style={[StyleSheet.absoluteFill, {backgroundColor: 'white'}]}>
      <Image source={video?.thumbnail} style={styles.thumbnail}></Image>
      <View style={styles.detailContainer}>
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
            <TouchableOpacity onPress={onClose}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
    height: (Metrics.Width * 720) / 1280,
    resizeMode: 'contain',
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
