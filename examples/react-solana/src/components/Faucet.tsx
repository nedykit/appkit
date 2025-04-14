import { useState } from 'react'

import { useAppKitAccount, useAppKitProvider } from "@nedykit/appkit/react";
import type { Provider } from "@nedykit/appkit-adapter-solana";

const TOKEN_MINT = 'BomroFd4tDAGmSRcNCt7TZLkeaeH815KYzfCpSTjHSfP'
const TOKEN_AMOUNT = 1000000000000
import axios from 'axios'

export default function Faucet() {
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  const [isLoading, setIsLoading] = useState(false)
  const [signature, setSignature] = useState('')

  const onClick = async () => {
    if (!address || !walletProvider.sendTransaction) return

    setIsLoading(true)

    try {
      const response = await axios.post('https://nedykit-relayer-c9a96fa94123.herokuapp.com/api/v1/nedy/faucetSplToken', {
        destination: address,
        amount: TOKEN_AMOUNT,
        token: TOKEN_MINT
      });
      const signature = response.data.data.signature
      setSignature(`https://explorer.solana.com/tx/${signature.toString()}?cluster=devnet`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h2 style={{ marginBottom: '10px' }}>Claim test SPL token</h2>
      
      <button style={{ width: '240px', cursor: 'pointer' }} onClick={onClick} disabled={!address}>
        {isLoading ? 'Loading' : 'Gasless Claim'}
      </button>
      <br />
      {signature && (
        <p>
          Signature:{' '}
          <a href={signature} target="_blank">
            {signature}
          </a>
        </p>
      )}
    </div>
  )
}
