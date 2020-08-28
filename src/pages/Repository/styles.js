import styled from 'styled-components/native';

import Logo from '~/assets/logo.png';

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
