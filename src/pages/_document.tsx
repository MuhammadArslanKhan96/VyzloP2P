import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-G3YXX8FZND"
          ></script>
          <script
            src="https://telegram.org/js/telegram-web-app.js"
            async
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', 'G-G3YXX8FZND');
              `,
            }}
          />
          <meta name="twitter:card" content="app"></meta>
          <meta name="twitter:site" content="@vyzlo"></meta>
          <meta
            name="twitter:description"
            content="decentralise crypto marketplace for buy sell trade and earn"
          />
          <meta name="twitter:app:name:iphone" content="vyzlo" />
          <meta name="twitter:app:id:iphone" content=""></meta>
          <meta name="twitter:app:name:ipad" content="vyzlo"></meta>
          <meta name="twitter:app:id:ipad" content=""></meta>
          <meta name="twitter:app:name:googleplay" content="vyzlo"></meta>
          <meta name="twitter:app:id:googleplay" content=""></meta>
          <meta name="twitter:app:country" content=""></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
