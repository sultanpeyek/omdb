import {WalletMultiButton} from '@solana/wallet-adapter-react-ui'

const WalletConnect = () => {
  return (
    <div className="container my-8">
      <div className="py-8 bg-yellow-100">
        <div className="mb-4 text-lg text-center">
          Please connect your wallet which holds the eligible NFTs to unlock the
          page.
        </div>
        <div className="flex flex-row justify-center mx-auto">
          <WalletMultiButton className="bg-black" />
        </div>
      </div>
    </div>
  )
}

export default WalletConnect
