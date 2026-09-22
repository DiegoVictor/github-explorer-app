import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import {
  Container,
  HeaderContainer,
  Header,
  BackButton,
  HeaderImage,
} from './styles';

export const Repository = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <Container>
      <HeaderContainer>
        <Header>
          <BackButton onPress={navigation.goBack}>
            <MaterialIcons name="keyboard-arrow-left" color="#FFF" size={20} />
          </BackButton>

          <HeaderImage />
        </Header>
      </HeaderContainer>
      <WebView
        source={{
          uri: route.params.repository.html_url,
        }}
        style={{ flex: 1 }}
      />
    </Container>
  );
};
