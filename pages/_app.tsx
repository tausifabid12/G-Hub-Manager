import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/contexts/AuthProvider';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.gitHub_Access_Token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <Toaster position="top-center" reverseOrder={false} />
      </ApolloProvider>
    </AuthProvider>
  );
}
