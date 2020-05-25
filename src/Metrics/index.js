import {Dimensions} from 'react-native';
const dim = Dimensions.get('window');

const Metrics = {
  Width: dim.width,
  Height: dim.height,
};
export default Metrics;
