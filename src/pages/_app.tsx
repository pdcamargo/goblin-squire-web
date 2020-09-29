import { AppProps } from 'next/app';

import { FadeInBox } from '~/components';
import { SocketProvider, ThemeContainer } from '~/contexts';

// eslint-disable-next-line import/no-absolute-path
import '../assets/teall/dice.css';

function App({ Component, pageProps, router }: AppProps): React.ReactNode {
  return (
    <SocketProvider>
      <ThemeContainer>
        <FadeInBox key={router.route}>
          <Component {...pageProps} />
        </FadeInBox>
      </ThemeContainer>
    </SocketProvider>
  );
}
export default App;
