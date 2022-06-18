import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #28a74599;
  position: absolute;
  z-index: 10;
  elevation: 5;
`;

export const Title = styled.Text`
  font-size: 34px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-vertical: 6px;
  letter-spacing: 0.8px;
`;

export const BlockText = styled(Title)`
  font-size: 26px;
  color: #eeeeee;
`;

export const Block = styled.View`
  width: 90%;
  height: auto;
  margin-left: 5%;
  margin-vertical: 10px;
  padding: 6px;
  border-radius: 10px;
  background-color: #00000010;
  flex-direction: column;
`;

export const Center = styled.View`
  position: absolute;
  width: 100%;
  justify-content: center;
  align-items: center;
  bottom: 8px;
`;

export const FinishButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 90%;
  height: 55px;
  padding: 6px;
  background-color: #3fa796;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  elevation: 2;
`;

export const ProductView = styled.View`
  width: 94%;
  margin-left: 3%;
  background-color: #ffffff10;
  border-radius: 8px;
  margin-vertical: 2px;
  padding: 3px;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 100,
  },
})`
  width: 100%;
  height: 30%;
  background-color: #00000005;
`;

export const ProductText = styled.Text`
  font-size: 18px;
  color: #f5f5f5;
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;
