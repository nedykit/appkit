import { useState } from 'react'

import { useAppKitAccount, useAppKitProvider } from "@nedykit/appkit/react";

import type { Provider } from "@nedykit/appkit-adapter-solana";
import { Connection } from '@solana/web3.js';
const TOKEN_MINT = 'BomroFd4tDAGmSRcNCt7TZLkeaeH815KYzfCpSTjHSfP'
const endpoint = `https://api.devnet.solana.com`

export default function TokenTransfer() {
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("solana");
  const connection = new Connection(endpoint, 'confirmed')

  const [recipient, setRecipient] = useState('2grKcZPjxKbNKkc8S6nmrSXtXTXJih4utVMa7jBwRcFf');
  const [amount, setAmount] = useState(1.0);
  const [isLoading, setIsLoading] = useState(false)
  const [signature, setSignature] = useState('')

  const onClick = async () => {
    if (!address || !walletProvider.signAndSendTransferTransaction) return

    setIsLoading(true)

    try {
      const signature = await walletProvider.signAndSendTransferTransaction(TOKEN_MINT, address, recipient, amount, connection)
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
      <h2 style={{ marginBottom: '10px' }}>Token Transfer</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <label style={{ marginBottom: '10px' }}>Recipient</label>
      <input style={{ marginBottom: '10px', width: '240px', backgroundColor: 'white', padding: '10px', borderRadius: '5px', color: 'black' }} type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient" />
      <label style={{ marginBottom: '10px' }}>Amount</label>
      <input style={{ marginBottom: '10px', width: '240px', backgroundColor: 'white', padding: '10px', borderRadius: '5px', color: 'black' }} type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Amount" />
      <button style={{ width: '240px', cursor: 'pointer' }} onClick={onClick} disabled={!address}>
          {isLoading ? 'Loading' : 'Gasless Transfer'}
        </button>
      </div>
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
