// jest.mock('./counterAPI', () => ({
//   fetchCount: (amount: number) =>
//     new Promise<{data: number}>(resolve =>
//       setTimeout(() => resolve({data: amount}), 500),
//     ),
// }))
import {WalletAdapterNetwork} from '@solana/wallet-adapter-base'
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react'
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import {render, screen} from '@testing-library/react'
// import user from '@testing-library/user-event'
import {Provider} from 'react-redux'
import {ToastContainer} from 'react-toastify'

import store from '@/app/store'
import Movies from '@/features/movies'

const network = WalletAdapterNetwork.Mainnet

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter({network}),
]

const endpoint = 'https://ssc-dao.genesysgo.net'

describe('<Movies />', () => {
  it('renders the component', () => {
    render(
      <Provider store={store}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <Movies />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
        <ToastContainer />
      </Provider>,
    )

    expect(screen.getByText(/Please connect your wallet/)).toBeInTheDocument()
  })
})
