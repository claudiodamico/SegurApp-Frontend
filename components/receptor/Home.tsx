import {Text} from 'react-native-paper';

const Home = ({messages}: {messages: MessageReceived[]}) => {
  if (messages.length) {
    return (
      <>
        {messages.map((m, i) => (
          <Text variant="bodyLarge" key={i}>
            {m.emisor.fullName} {m.message.description} {m.latitude}{' '}
            {m.longitude}
          </Text>
        ))}
      </>
    );
  }
};

export default Home;
