# Inscription Mint

**Install Bun:**  
Download and install from https://bun.sh/docs/installation

**Download Project**

```bash
git clone https://github.com/eddieyg/inscription-mint.git
cd ./inscription-mint
```

**Install Dependencies**
```bash
bun install
```

**Configuring private key**
- Create a new.env file
- And fill in your private key: `PRIVATE_KEY = [your private key]`

**Configuring mint inscription info**
```typescript
// config.ts

const rpcs = {
  avalanche: 'https://avalanche.public-rpc.com'
}

const mintTasks: MintTask[] = [
  {
    quantity: 10,
    rpc: rpcs.avalanche,
    maxPerGas: '0.0006',
    mintText: 'data:,{"p":"asc-20","op":"mint","tick":"ShenLong","amt":"1"}',
  },
]
```

**Start Mint**

```bash
bun run index.ts
```
