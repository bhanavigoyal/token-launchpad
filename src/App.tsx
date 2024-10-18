import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { TokenLaunchpad } from './components/TokenLaunchpad';

function App() {

  return <div className='h-screen bg-zinc-950 text-zinc-100 font-mono flex flex-col items-center pt-11'>
	<ConnectionProvider endpoint='https://api.devnet.solana.com'>
		<WalletProvider wallets={[]} autoConnect>
			<WalletModalProvider>
				<div className='flex p-4 space-x-5'>
					<WalletMultiButton />
					<WalletDisconnectButton/>
				</div>
				<TokenLaunchpad/>
			</WalletModalProvider>
		</WalletProvider>
	</ConnectionProvider>
  </div>
}

export default App
