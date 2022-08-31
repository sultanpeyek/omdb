import {useWallet} from '@solana/wallet-adapter-react'
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'

const AppBar = () => {
  const wallet = useWallet()

  return (
    <header className="flex bg-gray-900 h-14">
      <div className="container flex items-stretch justify-between">
        <Link href="/" passHref>
          <a href="replace" className="flex items-center text-white">
            <span className="p-2 font-bold leading-none tracking-tighter text-center text-black align-middle bg-yellow-400">
              OMDB
            </span>
            <span className="hidden ml-4 leading-none align-middle md:flex">
              The Open Movie Database
            </span>
          </a>
        </Link>
        {wallet.connected && (
          <div className="flex items-stretch">
            <WalletMultiButton className="h-full bg-transparent rounded-none" />
          </div>
        )}
      </div>
    </header>
  )
}

export default AppBar
