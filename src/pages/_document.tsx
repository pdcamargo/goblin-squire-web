import Document, {
  DocumentProps,
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

import { ColorModeScript } from '@chakra-ui/core';

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <style type="text/css">@import "/teall/main.css";</style>
          <style type="text/css">@import "/teall/dice.css";</style>

          <script src="/teall/three.js" />
          <script src="/teall/cannon.js" />
          <script src="/teall/teal.js" />
          <script src="/teall/dice.js" />
        </Head>
        <body>
          <ColorModeScript defaultColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
