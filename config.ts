import type { MintTask } from './types'

const rpcs = {
  avalanche: 'https://avalanche.public-rpc.com'
}

const mintTasks: MintTask[] = [
  {
    quantity: 8,
    rpc: rpcs.avalanche,
    maxPerGas: '0.0006',
    mintText: 'data:,{"p":"asc-20","op":"mint","tick":"ShenLong","amt":"1"}',
  },
]

export default{
  rpcs,
  mintTasks
}
