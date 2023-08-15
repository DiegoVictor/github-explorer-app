import styled from 'styled-components/native';

import Logo from '../../assets/logo.png';

export const Container = styled.View`
  flex: 1;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  background-color: #121214;
  padding: 10px 20px 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const BackButton = styled.TouchableOpacity`
  left: 0;
  position: absolute;
`;

export const HeaderImage = styled.Image.attrs({
  source: Logo,
  resizeMode: 'contain',
})`
  width: 165px;
`;

export const User = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;

export const Avatar = styled.Image`
  background-color: #eee;
  border-radius: 10px;
  height: 70px;
  width: 70px;
`;

export const Name = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
`;

export const Bio = styled.Text`
  background-color: #232325;
  border-radius: 10px;
  color: #999;
  font-size: 13px;
  line-height: 16px;
  margin-top: 4px;
  padding: 7px 10px;
  text-align: center;
  width: 80%;
`;

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 10,
  },
})`
  padding: 10px 0px 50px;
`;

export const EmptyList = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  margin: 30px 30px;
`;

export const EmptyListText = styled.Text`
  background-color: #eee;
  border-radius: 10px;
  color: #d4d4d4;
  font-size: 18px;
  font-weight: bold;
  padding: 20px;
`;

export const Starred = styled.TouchableOpacity`
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  flex-direction: row;
  margin: 0px 20px 10px;
  padding: 8px;
`;

export const OwnerAvatar = styled.Image`
  background-color: #eee;
  border-radius: 10px;
  height: 56px;
  width: 56px;
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
