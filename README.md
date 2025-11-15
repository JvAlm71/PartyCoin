# 🎉 PartyCoin (PRTY) — Token ERC‑20 na Ethereum

![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?logo=solidity)
![Hardhat](https://img.shields.io/badge/Hardhat-2.22.0-yellow)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![ethers.js](https://img.shields.io/badge/ethers-6.x-253cdd)
![License](https://img.shields.io/badge/License-MIT-green)

Aplicação completa (smart contract + frontend) de um token ERC‑20 chamado PartyCoin (PRTY), com deploy via Hardhat e interface React integrada ao MetaMask.

## ✨ Objetivos do Projeto
- Implementar um token ERC‑20 seguro usando OpenZeppelin.
- Disponibilizar uma interface web para conectar carteira, consultar saldo e transferir tokens.
- Automatizar deploy e sincronização do frontend com o endereço do contrato.
- Servir de base didática para DApps mais complexos.

## 🧱 Arquitetura
```
PartyCoin/
├─ blockchain/            # Hardhat + Solidity
│  ├─ contracts/PartyCoin.sol
│  ├─ scripts/deploy.js   # deploy + grava endereço p/ o frontend
│  └─ hardhat.config.js
└─ frontend/              # React + Vite + ethers
   └─ src/
      ├─ App.jsx
      ├─ artifacts/      # ABI copiada do Hardhat
      └─ contract-address.json  # Gerado pelo deploy
```
Fluxo: Hardhat node → deploy gera `frontend/src/contract-address.json` → frontend consome endereço/ABI → MetaMask assina transações.

## 🔧 Requisitos
- Node.js 18+ (recomendado 20+) e npm
- MetaMask (extensão)
- Linux/macOS/WSL2

## 🚀 Execução Local (rede Hardhat)
Abra 3 terminais:

1) Blockchain (mantenha aberto)
```bash
cd blockchain
npx hardhat node
```

2) Deploy do contrato
```bash
cd blockchain
npx hardhat clean
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
# Isso gera/atualiza frontend/src/contract-address.json
```

3) Frontend
```bash
cd frontend
npm install
npm run dev
# Acesse http://localhost:5173
```

MetaMask (se necessário, adicione manualmente):
- RPC: http://127.0.0.1:8545
- Chain ID: 31337
- Symbol: ETH

Conta de teste (Hardhat):
- Private key Account #0 (somente local/dev): 0xac0974...ff80

O App faz auto switch/add para a rede 31337.

## 🧪 Uso
- Conecte a carteira → veja saldo PRTY → transfira PRTY para outro endereço.
- Console Hardhat (opcional):
```bash
cd blockchain
npx hardhat console --network localhost
> const caddr = require("../frontend/src/contract-address.json").PartyCoin
> const Party = await ethers.getContractFactory("PartyCoin")
> const c = Party.attach(caddr)
> (await c.totalSupply()).toString()
```

## 🌐 Deploy em Testnet (Sepolia — opcional)
1) `blockchain/.env`
```env
SEPOLIA_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/SUA_API_KEY"
PRIVATE_KEY="SUA_CHAVE_PRIVADA_SEM_0x"
```
2) Configure a rede em `hardhat.config.js`.
3) Deploy:
```bash
cd blockchain
npx hardhat run scripts/deploy.js --network sepolia
```
4) Atualize `frontend/src/contract-address.json`, troque a rede no MetaMask e rode `npm run dev`.

## 📊 Métricas (gas e LOC)
- LOC:
```bash
# Raiz do projeto
wc -l blockchain/contracts/PartyCoin.sol
wc -l blockchain/scripts/deploy.js
find frontend/src -name "*.jsx" -o -name "*.js" | xargs wc -l
```
- Gas (execução local):
```bash
cd blockchain
npx hardhat run scripts/metrics.js --network localhost
```
O script imprime gas de deploy e de uma transferência de 100 PRTY.

## 🐛 Troubleshooting
- HH108 / ECONNREFUSED: inicie `npx hardhat node` primeiro.
- BAD_DATA / missing revert: endereço antigo. Redeploy + atualize `frontend/src/contract-address.json`.
- “invalid block tag”: nó foi reiniciado. Suba node, redeploy, reinicie frontend, MetaMask → Settings → Advanced → Clear activity tab data.
- Saldo 0: verifique rede 31337 e conta correta.

## 🛡️ Segurança
- Não versionar `.env`. Rotacione chaves se vazarem.
- Usar contas de teste em dev.
- Código baseado em OpenZeppelin.

## 📄 Licença
MIT

## 📎 Links
- Slides: docs/SLIDES.md
- Vídeo (preencha): https://youtu.be/SEU_VIDEO
- GitHub (preencha): https://github.com/SEU_USUARIO/PartyCoin