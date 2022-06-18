import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
`;

export const ManualButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: absolute;
  padding: 6px 10px;
  z-index: 10;
  elevation: 3;
  flex-direction: row;
  width: 60px;
  height: 60px;
  bottom: 30px;
  left: ${width / 2 - 30}px;
  background-color: #7159c1;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const Bottom = styled.View`
  position: absolute;
  bottom: 0px;
  width: 105%;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  justify-content: space-evenly;
`;

export const ConfirmButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: 4px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 140px;
  background-color: #5dc97a99;
  flex-direction: row;
  postion: relative;
  z-index: 1;
`;

export const CancelButton = styled(ConfirmButton)`
  background-color: #ff888888;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: 0.8px;
`;

export const Block = styled.View`
  width: 100%;
  height: auto;
  margin-vertical: 5px;
`;

export const OptionButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  position: absolute;
  z-index: 5;
  width: 55px;
  height: 55px;
  background-color: #7159c1;
  top: ${height * 0.65}px;
  left: 10px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  elevation: 3;
`;

export const OptionText = styled.Text`
  font-size: 14px;
  color: #eeeeee;
`;

export const Card = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 6,
    paddingBottom: 65,
  },
})`
  flex: 1;
  background-color: #7159c199;
`;

export const Image = styled.Image`
  width: ${width * 0.4}px;
  height: ${width * 0.4}px;
  border-radius: 6px;
  margin: 8px;
`;

export const CardText = styled.Text`
  font-size: 22px;
  color: #ffffff;
`;

export const Msg = styled(CardText)`
  color: #ff6666;
  text-align: center;
  font-size: 16px;
`;

export const Value = styled(CardText)`
  font-weight: bold;
  padding-left: 4px;
`;

export const AddButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: 4px;
  background-color: #7159c1;
  border-radius: 10px;
`;

export const RemoveButton = styled(AddButton)`
  background-color: #ff555555;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 50%;
  justify-content: space-evenly;
  margin-top: 15px;
`;

export const BigText = styled.Text`
  font-size: 36px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
`;

export const AmountView = styled.View`
  border-radius: 10px;
  background-color: #00000010;
  align-items: center;
  padding-vertical: 20px;
`;

export const PlusIcon = styled(Icon).attrs({
  name: 'add-outline',
})`
  font-size: 32px;
  color: #ffffff;
`;
export const RemoveIcon = styled(Icon).attrs({
  name: 'remove-outline',
})`
  font-size: 32px;
  color: #ffffff;
`;
export const CartIcon = styled(Icon).attrs({
  name: 'cart-outline',
})`
  font-size: 32px;
  color: #ffffff;
`;
export const PencilIcon = styled(Icon).attrs({
  name: 'pencil',
})`
  font-size: 22px;
  color: #ffffff;
  margin-left: 5px;
`;
