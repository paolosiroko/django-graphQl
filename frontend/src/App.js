import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import UserInfo from './Api.js';
import CreateCategory from './CreateCategory.js'

const client = new ApolloClient({
  uri: 'http://127.0.0.1:8000/graphql', // your GraphQL Server
});

function App() {
  return (
  <ApolloProvider client={client}>
    <div style={{
      backgroundColor: '#00000008',
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
      height: '100vh',
      flexDirection: 'column',
    }}>
      <h2>My React-graphql-django using Apollo client  app </h2>
       <CreateCategory />
      <UserInfo />

    </div>
    </ApolloProvider>
  );
}

export default App;
