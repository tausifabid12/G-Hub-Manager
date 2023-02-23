import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '@/utilities/ApolloClientConnection/ApolloClientConnection';

export default function App({ Component, pageProps }: AppProps) {
  console.log(process.env.GITHUB_ACCESS_TOKEN, 'jkkkkkk');

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
