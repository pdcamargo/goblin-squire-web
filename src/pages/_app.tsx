import { AppProps } from 'next/app';

import { FadeInBox } from '~/components';
import { ThemeContainer } from '~/contexts';

// eslint-disable-next-line import/no-absolute-path
import '../assets/teall/dice.css';

function App({ Component, pageProps, router }: AppProps): React.ReactNode {
  return (
    <ThemeContainer>
      <FadeInBox key={router.route}>
        <Component {...pageProps} />
      </FadeInBox>
    </ThemeContainer>
  );
}
export default App;
