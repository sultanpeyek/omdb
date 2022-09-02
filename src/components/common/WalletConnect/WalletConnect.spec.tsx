import {WalletAdapterNetwork} from '@solana/wallet-adapter-base'
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react'
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'

import store from '@/app/store'
import WalletConnect from '@/components/common/WalletConnect'
import {RPC_MAINNET_PRIMARY} from '@/constants'

const network = WalletAdapterNetwork.Mainnet

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter({network}),
]

describe('<WalletConnect />', () => {
  it('renders the component', () => {
    render(
      <Provider store={store}>
        <ConnectionProvider endpoint={RPC_MAINNET_PRIMARY}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <WalletConnect />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </Provider>,
    )

    expect(screen.getByText(/please connect your wallet/i)).toBeInTheDocument()
  })
})
