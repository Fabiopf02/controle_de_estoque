import styled from 'styled-components/native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

import {Lottie} from '../Home/styles';
import * as ScanAnim from '../../assets/scan.json';

export const Container = styled.View`
  flex: 1;
  background-color: #000000;
`;

export const Camera = styled(RNCamera).attrs({
  captureAudio: false,
  autoFocus: 'on',
  googleVisionBarcodeType:
    RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.EAN_13,
  googleVisionBarcodeMode:
    RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode.NORMAL,
  barCodeTypes: [RNCamera.Constants.BarCodeType.ean13],
  type: RNCamera.Constants.Type.back,
})`
  flex: 1;
`;

export const Scan = styled(Lottie).attrs({
  source: ScanAnim,
  loop: true,
  autoPlay: true,
})`
  position: absolute;
  z-index: 5;
  width: 100%;
  top: 0px;
  bottom: 0px;
`;

export const View = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 6,
  },
})`
  flex: 1.5;
  background-color: #7159c1;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const ViewText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const TextInput = styled.TextInput.attrs({
  multiline: true,
  placeholderTextColor: '#aaaaaa',
  maxLength: 70,
  returnKeyType: 'next',
})`
  width: 80%;
  min-height: 40px;
  background-color: #eeeeee;
  color: #555555;
  border-radius: 4px;
  font-size: 18px;
`;
export const NumberInput = styled.TextInput.attrs({
  placeholderTextColor: '#aaaaaa',
  maxLength: 10,
  keyboardType: 'numeric',
  returnKeyType: 'next',
})`
  width: 40%;
  min-height: 40px;
  background-color: #eeeeee;
  color: #555555;
  border-radius: 4px;
  font-size: 20px;
  text-align: center;
`;

export const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  left: 0px;
  right: 0px;
`;

export const Center = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ConfirmButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 68%;
  height: 50px;
  border-radius: 12px;
  margin-top: 8px;
  background-color: #8888ff;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 2px;
`;

export const ConfirmButtonText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
`;

export const CancelButton = styled(ConfirmButton)`
  width: 30%;
  background-color: #ff9999;
`;

export const CameraIcon = styled(Icon).attrs({
  name: 'camera-outline',
})`
  font-size: 24px;
  color: #5dc97a;
`;

export const TakeButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding-horizontal: 4px;
  border-radius: 4px;
  background-color: #5dc97a44;
  flex-direction: row;
`;

export const TakeText = styled.Text`
  color: #5dc97a;
  font-size: 18px;
`;
