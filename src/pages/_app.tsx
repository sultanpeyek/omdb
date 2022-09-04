import {WalletAdapterNetwork} from '@solana/wallet-adapter-base'
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react'
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {useMemo} from 'react'
import {Provider} from 'react-redux'
import {ToastContainer} from 'react-toastify'

import {makeStore} from '@/app/store'
import {
  DESCRIPTION,
  RPC_MAINNET_PRIMARY,
  SITE_URL,
  TITLE,
  TWITTER_USERNAME,
} from '@/constants'
import {ApplicationProvider} from '@/contexts/application'

// Intentionally using require to make sure the CSS is loaded with the correct order.
require('@solana/wallet-adapter-react-ui/styles.css')
require('react-toastify/dist/ReactToastify.css')
require('../styles/globals.css')

const store = makeStore()

function MyApp({Component, pageProps}: AppProps) {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({network})],
    [network],
  )

  return (
    <Provider store={store}>
      <ConnectionProvider endpoint={RPC_MAINNET_PRIMARY}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
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
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      <ToastContainer />
    </Provider>
  )
}

export default MyApp
