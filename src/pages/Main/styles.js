import styled from 'styled-components/native';

import Logo from '~/assets/logo.png';

export const Container = styled.View`
  background-color: #f0f0f5;
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  background-color: #121214;
  padding: 10px 20px 10px;
`;

export const HeaderImage = styled.Image.attrs({
  source: Logo,
  resizeMode: 'contain',
})`
  width: 165px;
`;

export const Form = styled.View`
  width: 100%;
  margin-top: 20px;
`;

export const Label = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-left: 4px;
`;

export const Search = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 5px;
  position: relative;
`;

export const Button = styled.TouchableOpacity`
  padding: 5px;
  position: absolute;
  right: 7px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#73738044',
})`
  background-color: #232325;
  border-radius: 6px;
  color: #737380;
  flex: 1;
  height: 50px;
  padding: 0px 50px 0px 15px;
`;

export const Error = styled.Text`
  color: #e23337;
  margin-left: 5px;
  margin-top: 7px;
  text-align: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 10,
  },
})`
  padding: 10px 0px 50px;
`;

export const User = styled.TouchableOpacity`
  background-color: #ffffff;
  border-radius: 10px;
  flex-direction: row;
  margin: 0px 20px 10px;
  padding: 8px;
`;

export const Avatar = styled.Image`
  background-color: #eee;
  border-radius: 10px;
  height: 58px;
  width: 58px;
`;

export const About = styled.View`
  flex: 1;
  align-items: flex-start;
  margin-left: 10px;
  justify-content: center;
`;

export const Name = styled.Text`
  color: #333;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: #999;
  font-size: 13px;
  line-height: 17px;
`;

export const Actions = styled.View`
  justify-content: center;
  width: 30px;
`;

export const Action = styled.TouchableOpacity`
  border-radius: 20px;
  background-color: #dfdfdf;
  padding: 5px;
  width: 25px;
`;
