# 🎉 PartyCoin (PRTY) — Token ERC‑20 na Ethereum

![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?logo=solidity)
![Hardhat](https://img.shields.io/badge/Hardhat-2.22.0-yellow)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Ethers](https://img.shields.io/badge/ethers-6.x-253cdd)
![License](https://img.shields.io/badge/License-MIT-green)

Aplicação completa (smart contract + frontend) de um token ERC‑20 chamado PartyCoin (PRTY), com deploy via Hardhat e interface React integrada ao MetaMask.

---

## ✨ Visão Geral

- Token fungível padrão ERC‑20 (OpenZeppelin)
- Deploy local (Hardhat) e suporte opcional a testnet (Sepolia)
- Frontend em React (Vite) com ethers.js v6
- Autoatualização do frontend com o endereço do contrato após o deploy
- Conectar carteira, consultar saldo, transferir tokens

---

## 🧱 Arquitetura

```
PartyCoin/
├─ blockchain/            # Hardhat + Solidity
│  ├─ contracts/PartyCoin.sol
│  ├─ scripts/deploy.js   # Faz o deploy e escreve o endereço p/ o frontend
│  └─ hardhat.config.js
└─ frontend/              # React + Vite + ethers
   └─ src/
      ├─ App.jsx
      ├─ artifacts/      # ABI copiada do Hardhat
      └─ contract-address.json  # Gerado pelo deploy, usado no App.jsx
```

Fluxo:
1) Hardhat node sobe na porta 8545
2) Script de deploy implanta PartyCoin e grava o endereço no `frontend/src/contract-address.json`
3) Frontend lê o JSON, conecta ao contrato e ao MetaMask (auto “switch/add” da rede 31337)

---

## 🔧 Requisitos

- Node.js 18+ (recomendado 20+) e npm
- MetaMask (extensão do navegador)
- Linux/macOS/WSL2

---

## 🚀 Executando localmente (rede Hardhat)

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

MetaMask:
- Selecione/adicione a rede “Hardhat Local”
  - RPC: http://127.0.0.1:8545
  - Chain ID: 31337
  - Symbol: ETH
- Importe a Account #0 (apenas para uso local)
  - 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Observação: O App.jsx tenta automaticamente mudar/adicionar a rede 31337 no MetaMask.

---

## 🧪 Uso

No site:
- Conectar MetaMask
- Ver saldo de PRTY da conta conectada
- Transferir PRTY para outro endereço

No console do Hardhat (opcional):
```bash
cd blockchain
npx hardhat console --network localhost
> const Party = await ethers.getContractFactory("PartyCoin");
> const c = Party.attach(require("../frontend/src/contract-address.json").PartyCoin);
> (await c.totalSupply()).toString()
```

---

## 📦 Deploy em testnet (opcional: Sepolia)

1) Crie `.env` em `blockchain/` com:
```env
SEPOLIA_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/SUA_API_KEY"
PRIVATE_KEY="SUA_CHAVE_PRIVADA_SEM_0x"
```

2) Configure a rede no `hardhat.config.js` (se ainda não estiver).

3) Deploy:
```bash
cd blockchain
npx hardhat run scripts/deploy.js --network sepolia
```

4) Atualize manualmente o `frontend/src/contract-address.json` com o endereço de Sepolia, mude a rede do MetaMask e rode `npm run dev`.

---

## 🛡️ Segurança

- Nunca publique `.env` ou chaves privadas no Git.
- Se algum segredo vazou, revogue e gere um novo imediatamente.
- Mantenha apenas carteiras de teste em ambientes de desenvolvimento.

Sugestão de `.gitignore` na raiz:
```gitignore
# Sensíveis
.env
*.env*
# Node
node_modules/
**/node_modules/
# Hardhat
blockchain/artifacts/
blockchain/cache/
blockchain/coverage/
# Vite/React
frontend/dist/
frontend/.vite/
frontend/coverage/
# Logs
*.log
# VS Code
.vscode/
```

Para remover `.env` do histórico (caso tenha sido commitado):
```bash
git rm --cached .env
git commit -m "chore: stop tracking .env"
# Reescrever histórico (opcional, avançado)
git filter-repo --path .env --invert-paths
git push --force
```

---

## 🐛 Troubleshooting (erros comuns)

- HH108 / ECONNREFUSED 127.0.0.1:8545  
  Inicie primeiro: `npx hardhat node`

- BAD_DATA / “missing revert data” ao conectar  
  Contrato não existe nesse endereço na rede atual. Faça deploy novamente e garanta que o frontend usa o endereço gerado em `frontend/src/contract-address.json`.

- “Received invalid block tag … Latest block number is …”  
  O nó foi reiniciado. Pare tudo, suba `npx hardhat node`, faça o deploy novamente, reinicie o frontend e faça hard reload do navegador (Ctrl+Shift+R). Se necessário, MetaMask → Settings → Advanced → Clear activity tab data.

- Saldo não aparece  
  Garanta que a rede é “Hardhat Local” (31337) e a conta é a que recebeu os tokens no deploy.

---

## 🧰 Stack

- Solidity ^0.8.20, OpenZeppelin Contracts
- Hardhat 2.22.x, ethers.js 6.x
- React 18, Vite
- MetaMask

---

## 📄 Licença

MIT