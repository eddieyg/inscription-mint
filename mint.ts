import { 
  JsonRpcProvider, 
  Wallet, 
  ethers, 
  formatEther, 
  parseEther, 
  toBigInt,
  toNumber
} from 'ethers'
import type { TransactionLike } from 'ethers'
import BigNumber from 'bignumber.js'
import type { Inscription } from './types'
import config from './config'
import { toNonExponential } from './util'

export async function mint(quantity: number, inscription: Inscription) {
  const startTime = +new Date()
  const provider = new JsonRpcProvider(config.rpc[0])
  const wallet = new Wallet(import.meta.env.PRIVATE_KEY as string, provider)
  const address = await wallet.getAddress()
  const balance = await provider.getBalance(address)
  const fBalance = formatEther(balance)

  console.log('address:', address)
  console.log('balance:', fBalance)

  const [network, feeData] = await Promise.all([
    provider.getNetwork(),
    provider.getFeeData().catch(() => { return undefined }),
  ])
  const data = ethers.hexlify(ethers.toUtf8Bytes(inscription.mintText))
  const gasPrice = feeData?.gasPrice!
  let gasLimit = new BigNumber(inscription.maxPerGas).div(toNumber(gasPrice)).toString()
  gasLimit = toNonExponential(gasLimit)

  const tx: TransactionLike = {
    chainId: network.chainId,
    from: address,
    to: address,
    data,
    value: 0,
    gasPrice,
    gasLimit: parseEther(gasLimit),
  }
  console.log(
    'tx: ',
    tx
  )

  const eGas = formatEther(await provider.estimateGas(tx))
  console.log(
    'gas: ',
    eGas
  )

  const txHashs = []
  let index = 0
  while(index < quantity) {
    const result = await sendMintTx(wallet, tx)
    if (result.ok) {
      console.log(`[${index + 1}] minted: ${result.txHash} ${result.usedTime}s`)
      txHashs.push(result.txHash)
      index++
    } else {
      console.log(`[${index + 1}] mint err: ${result.errMsg}`)
    }
  }
  
  console.log(`mint used time: ${(+new Date - startTime) / 1000}s`)

  return txHashs
}

async function sendMintTx(wallet: Wallet, tx: TransactionLike) {
  const result = {
    ok: false,
    txHash: '',
    errMsg: '',
    usedTime: 0,
  }

  const startTime = +new Date()
  try {
    const nonce = await wallet.getNonce()
    const txRes = await wallet.sendTransaction({
      ...tx,
      nonce,
    })
    await wallet.provider?.waitForTransaction(txRes.hash)
    result.ok = true
    result.txHash = txRes.hash
  } catch (err: any) {
    result.errMsg = err.message
  }
  result.usedTime = (+new Date() - startTime) / 1000

  return result
}
