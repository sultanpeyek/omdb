import {useWallet} from '@solana/wallet-adapter-react'
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui'

const WalletConnect = (props: any) => {
  const wallet = useWallet()

  return (
    <div className="container my-8">
      <div className="py-8 bg-yellow-100">
        <div className="mb-4 text-lg text-center">
          Please connect your wallet which holds the eligible NFTs to unlock the
          page.
        </div>
        <div className="flex flex-row justify-center mx-auto">
          <WalletMultiButton className="h-12 px-4 py-2 font-sans font-semibold leading-none bg-black" />
        </div>

        <div>
          {props.mints?.length > 0 &&
          wallet.connected &&
          props.checkWalletStatus === 'done' ? (
            <div className="flex flex-col items-center mx-auto mt-4 font-semibold">
              Mints:
              <ul>
                {props.mints.map((mint: string) => (
                  <li key={mint}>{mint}</li>
                ))}
              </ul>
            </div>
          ) : wallet.connected && props.checkWalletStatus === 'done' ? (
            <div className="flex flex-row justify-center mx-auto mt-4 font-semibold">
              No eligible NFTs found in your wallet.
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-row justify-center mx-auto">
          <button
            onClick={props.onByPassWalletConnectClick}
            className="h-12 px-4 py-2 my-4 font-semibold leading-none text-white bg-gray-500 rounded"
          >
            Bypass Wallet Connect
          </button>
        </div>
      </div>
    </div>
  )
}

export default WalletConnect
