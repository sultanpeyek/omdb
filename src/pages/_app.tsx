import '../styles/globals.css'

import type {AppProps} from 'next/app'
import Head from 'next/head'

import {ApplicationProvider} from '@/contexts/application'

import {SITE_URL, TITLE, DESCRIPTION, TWITTER_USERNAME} from '@/constants'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ApplicationProvider>
      <Head>
        <title>{TITLE}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content={DESCRIPTION} />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <meta name="theme-color" content="#000" />
        <meta property="og:url" content={`${SITE_URL}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta
          property="og:image"
          itemProp="image"
          content={`${SITE_URL}/og-image-general.png`}
        />
        <meta
          property="og:image:secure_url"
          content={`${SITE_URL}/og-image-general.png`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={`${TWITTER_USERNAME}`} />
        <meta name="twitter:creator" content={`${TWITTER_USERNAME}`} />
        <meta name="twitter:url" content={`${SITE_URL}`} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/og-image-general.png`}
        />
      </Head>
      <Component {...pageProps} />
    </ApplicationProvider>
  )
}

export default MyApp
