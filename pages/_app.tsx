import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import client from '../apollo-client';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #29292f;
    color: white;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Component {...pageProps} />;
    </ApolloProvider>
  );
}

export default MyApp;
