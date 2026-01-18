import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
            <Icon name="keyboard-arrow-left" color="#FFF" size={20} />
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
