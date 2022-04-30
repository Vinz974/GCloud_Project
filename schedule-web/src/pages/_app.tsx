import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import "react/jsx-dev-runtime";
import { createClient, Provider } from 'urql';
import styles from"../components/Metamask.css";
import theme from '../theme'

const client = createClient({ //Client for query with urql
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    headers: {
      AccessControlAllowOrigin:  "*",
      AccessControlAllowMethods: "POST",
      AccessControlAllowHeaders: "Content-Type",
      Authorization:"http://localhost:4000/graphql"
    },
  }
});


function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}> {/*The client needs to be put in a Provider that wraps all the project*/}
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
      </Provider>
  )
}

export default MyApp
