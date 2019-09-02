import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Header = styled.View`
  align-items: center;
  border-bottom-width: 1px;
  border-color: #eee;
  padding-bottom: 20px;
`;

export const Avatar = styled.Image`
  background-color: #eee;
  border-radius: 50px;
  height: 100px;
  width: 100px;
`;

export const Name = styled.Text`
  color: #333;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const Bio = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
  padding-bottom: 50px;
`;

export const Starred = styled(RectButton)`
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  flex-direction: row;
  margin-bottom: 20px;
  padding: 10px 15px;
`;

export const OwnerAvatar = styled.Image`
  background-color: #eee;
  border-radius: 21px;
  height: 42px;
  width: 42px;
`;

export const Info = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #333;
  font-size: 15px;
  font-weight: bold;
`;

export const Author = styled.Text`
  color: #666;
  font-size: 13px;
  margin-top: 2px;
`;

export const Loading = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;
