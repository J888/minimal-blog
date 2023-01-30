import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {
          process.env.GA_ENABLED && !process.env.DEV_MODE && <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEAS_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GA_MEAS_ID}', {
                page_path: window.location.pathname,
              });
            `,
              }}
            />
          </>
        }
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
