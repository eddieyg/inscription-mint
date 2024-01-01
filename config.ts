import type { Inscription } from './types'

const rpc = [
  'https://avalanche.public-rpc.com',
]

const inscription: Record<string, Inscription> = {
  shenlong: {
    maxPerGas: '0.0006',
    mintText: 'data:,{"p":"asc-20","op":"mint","tick":"ShenLong","amt":"1"}',
  }
}

export default{
  rpc,
  inscription
}
