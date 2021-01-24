import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'next-auth/client';

import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <Provider session={pageProps.session}>
                <Component {...pageProps} />
                <GlobalStyle />
            </Provider>
        </ThemeProvider>
    );
};

export default MyApp;
