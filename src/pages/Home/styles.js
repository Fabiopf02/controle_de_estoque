import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
`;

export const Item = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  background-color: ${props => props.bg};
  margin-horizontal: 5px;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

export const BigItem = styled(Item)`
  width: 55%;
  height: 150px;
  margin-bottom: 25px;
  background-color: transparent;
`;

export const ItemText = styled.Text`
  font-size: 18px;
  color: #444444;
  font-weight: bold;
  letter-spacing: 0.5px;
  bottom: -26px;
  position: absolute;
  text-align: center;
  width: 110%;
  color: #7159c1;
`;

export const BigItemText = styled(ItemText)`
  font-size: 22px;
  bottom: -5px;
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const Col = styled.View`
  flex: 1;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #eeeeee;
`;

export const Lottie = styled(LottieView)`
  width: 90px;
`;

export const Block = styled.View`
  width: 100%;
  padding-vertical: 25px;
  margin-vertical: 10px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: #ffffff80;
`;

export const BlockText = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: #444444;
  margin-bottom: 4px;
  margin-left: 4px;
`;
