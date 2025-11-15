# 🎉 PartyCoin (PRTY) - Token ERC-20 na Blockchain Ethereum

![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?logo=solidity)
![Hardhat](https://img.shields.io/badge/Hardhat-2.22.0-yellow)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![License](https://img.shields.io/badge/License-MIT-green)

> **Projeto Acadêmico**: Implementação de um token fungível (ERC-20) na blockchain Ethereum com interface web para interação via MetaMask.

---

## 📖 Sobre o Projeto

O **PartyCoin (PRTY)** é um token digital baseado no padrão ERC-20 da blockchain Ethereum. Este projeto foi desenvolvido como trabalho acadêmico para demonstrar:

- ✅ Criação de smart contracts em Solidity
- ✅ Deploy e interação com blockchain
- ✅ Desenvolvimento de DApp (Aplicação Descentralizada)
- ✅ Integração frontend-blockchain via ethers.js
- ✅ Uso de ferramentas modernas (Hardhat, React, Vite)

### 🎯 Características do Token

| Propriedade | Valor |
|-------------|-------|
| **Nome** | PartyCoin |
| **Símbolo** | PRTY |
| **Padrão** | ERC-20 |
| **Supply Inicial** | 1.000.000 PRTY |
| **Decimais** | 18 |
| **Rede** | Ethereum (localhost/Sepolia) |

### 🔧 Funcionalidades

- 💰 **Transferência de tokens** entre carteiras
- 👁️ **Consulta de saldo** em tempo real
- 🔒 **Controle de acesso** (apenas owner pode mintar)
- 📊 **Interface web** intuitiva e responsiva
- 🦊 **Integração com MetaMask**

---

## 🛠️ Tecnologias Utilizadas

### Backend (Blockchain)
- **Solidity ^0.8.20** - Linguagem para smart contracts
- **Hardhat 2.22.0** - Framework de desenvolvimento Ethereum
- **OpenZeppelin Contracts 5.4.0** - Biblioteca de contratos seguros
- **ethers.js 6.x** - Interação com blockchain

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool moderna e rápida
- **ethers.js** - Comunicação com blockchain
- **CSS3** - Estilização responsiva

### Ferramentas
- **Node.js v20+** (gerenciado via nvm)
- **MetaMask** - Carteira Ethereum (browser extension)
- **Git** - Controle de versão

---

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

1. **Node.js v20 ou superior** (recomendado via [nvm](https://github.com/nvm-sh/nvm))
2. **npm** (vem com Node.js)
3. **Git**
4. **MetaMask** ([Instalar extensão](https://metamask.io/download/))
5. **Terminal/Bash** (Linux, macOS, ou WSL2 no Windows)

---

## 🚀 Como Executar o Projeto

### 📦 Passo 1: Clonar e Instalar Dependências

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/PartyCoin.git
cd PartyCoin

# 2. Instalar Node.js via nvm (se não tiver)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc  # ou source ~/.zshrc
nvm install --lts
nvm use --lts

# 3. Instalar dependências do blockchain
cd blockchain
npm install

# 4. Instalar dependências do frontend
cd ../frontend
npm install

# 5. Voltar para raiz
cd ..
```

---

### 🔧 Passo 2: Configurar Ambiente

#### Opção A: Rede Local (Recomendado para Testes)

**Não precisa de configuração adicional!** Pule para o Passo 3.

#### Opção B: Testnet Sepolia (Opcional)

1. Crie conta no [Alchemy](https://www.alchemy.com/) ou [Infura](https://infura.io/)
2. Crie um app Sepolia e copie a **RPC URL**
3. Exporte sua **Private Key** do MetaMask (⚠️ use apenas carteiras de teste!)
4. Edite o arquivo `.env` na raiz do projeto:

```env
SEPOLIA_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/SUA_API_KEY"
PRIVATE_KEY="SUA_CHAVE_PRIVADA_SEM_0x"
```

⚠️ **IMPORTANTE**: Nunca compartilhe seu `.env`! Ele já está no `.gitignore`.

---

### 🎬 Passo 3: Executar o Projeto

Você precisará de **3 terminais abertos** simultaneamente:

#### **Terminal 1: Iniciar Blockchain Local**

```bash
cd blockchain
npx hardhat node
```

**✅ Saída esperada:**
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
...
```

⚠️ **Deixe este terminal rodando!**

---

#### **Terminal 2: Deploy do Contrato**

```bash
cd blockchain

# Compilar contratos
npx hardhat compile

# Deploy na rede local
npx hardhat run scripts/deploy.js --network localhost
```

**✅ Saída esperada:**
```
🚀 DEPLOYING PARTYCOIN
=================================
Deploying with account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Account balance: 10000.0 ETH

Deploying contract...

✅ PartyCoin deployed successfully!
=================================
Contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Network: localhost
Chain ID: 31337
=================================

Total Supply: 1000000.0 PRTY
Owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

📋 COPIE ESTE ENDEREÇO PARA O FRONTEND:
0x5FbDB2315678afecb367f032d93F642f64180aa3
=================================
```

**📋 COPIE o endereço do contrato (ex: `0x5FbDB...`)**

---

#### **Terminal 3: Iniciar Frontend**

```bash
cd frontend

# Edite o arquivo src/App.jsx
# Cole o endereço do contrato na linha:
# const CONTRACT_ADDRESS = '0xSEU_ENDERECO_AQUI';

# Iniciar servidor de desenvolvimento
npm run dev
```

**✅ Saída esperada:**
```
VITE v5.x.x  ready in 300 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**🌐 Acesse:** http://localhost:5173

---

### 🦊 Passo 4: Configurar MetaMask

#### 4.1 Adicionar Rede Hardhat Local

1. Abra o MetaMask
2. Clique no **seletor de redes** (topo)
3. Clique em **"Adicionar rede"** → **"Adicionar rede manualmente"**
4. Preencha:

| Campo | Valor |
|-------|-------|
| **Nome da rede** | Hardhat Local |
| **Nova URL de RPC** | `http://127.0.0.1:8545` |
| **ID da cadeia** | `31337` |
| **Símbolo da moeda** | `ETH` |

5. Clique em **"Salvar"**

#### 4.2 Importar Conta de Teste

1. MetaMask → **Clique no ícone da conta** (círculo colorido)
2. **"Importar conta"** ou **"Import account"**
3. Selecione **"Private Key"**
4. Cole a chave privada da **Account #0**:

```
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

5. Clique em **"Importar"**

✅ **Esta conta tem 10.000 ETH e 1.000.000 PRTY!**

#### 4.3 (Opcional) Importar Segunda Conta para Testes

Repita o processo acima com a **Account #1**:

```
0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

Endereço da Account #1: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`

---

### 🎉 Passo 5: Usar a Aplicação

1. **No navegador** (http://localhost:5173):
   - Certifique-se que MetaMask está na rede **"Hardhat Local"**
   - Clique em **"🦊 Conectar MetaMask"**
   - Aprove a conexão no popup do MetaMask

2. **Visualizar saldo:**
   - Você verá: **1.000.000 PRTY**
   - Este é o saldo da Account #0 (que fez o deploy)

3. **Fazer uma transferência:**
   - Clique em **"📤 Transferir Tokens"**
   - Cole o endereço da Account #1: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
   - Digite quantidade: `100`
   - Confirme no MetaMask
   - Aguarde confirmação (1-2 segundos)

4. **Verificar na segunda conta:**
   - Troque para Account #1 no MetaMask
   - Recarregue a página (F5)
   - Conecte novamente
   - Verá: **100 PRTY**

---

## 📂 Estrutura do Projeto

```
PartyCoin/
│
├── .env                          # Variáveis sensíveis (não versionado)
├── .gitignore                    # Arquivos ignorados
├── README.md                     # Este arquivo
│
├── blockchain/                   # Smart Contracts
│   ├── contracts/
│   │   └── PartyCoin.sol        # Contrato ERC-20
│   ├── scripts/
│   │   └── deploy.js            # Script de deploy
│   ├── cache/                   # Cache do Hardhat
│   ├── hardhat.config.js        # Config do Hardhat
│   └── package.json
│
└── frontend/                     # Interface Web
    ├── src/
    │   ├── App.jsx              # Componente principal
    │   ├── App.css              # Estilos
    │   ├── main.jsx             # Entry point
    │   └── artifacts/           # ABI do contrato
    ├── public/
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🧪 Testes

### Executar testes do smart contract

```bash
cd blockchain
npx hardhat test
```

### Limpar cache e artefatos

```bash
cd blockchain
npx hardhat clean
```

---

## 🌐 Deploy em Testnet (Sepolia)

### 1. Obter ETH de Teste

Acesse um faucet e cole seu endereço:
- https://sepoliafaucet.com/
- https://www.infura.io/faucet/sepolia

### 2. Configurar `.env`

```env
SEPOLIA_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/SUA_API_KEY"
PRIVATE_KEY="SUA_CHAVE_PRIVADA"
```

### 3. Deploy

```bash
cd blockchain
npx hardhat run scripts/deploy.js --network sepolia
```

### 4. Verificar no Etherscan

Acesse: https://sepolia.etherscan.io/address/SEU_ENDERECO_DO_CONTRATO

---

## 📚 Conceitos Utilizados

### Blockchain
- **Descentralização**: Sem autoridade central
- **Imutabilidade**: Transações não podem ser alteradas
- **Transparência**: Todas as transações são públicas
- **Criptografia**: Assinaturas digitais garantem segurança

### Smart Contracts
- **Código Autônomo**: Executa automaticamente sem intermediários
- **Determinístico**: Mesmo input gera mesmo output
- **Gas**: Taxa para executar operações (previne spam)

### ERC-20
- **Token Fungível**: 1 PRTY = 1 PRTY (como dinheiro)
- **Funções Padrão**: `transfer`, `balanceOf`, `approve`, etc
- **Interoperabilidade**: Funciona com qualquer wallet/exchange

### Segurança
- **OpenZeppelin**: Contratos auditados e seguros
- **Access Control**: Funções críticas restritas ao owner
- **Validações**: Checks de endereço zero, overflow, etc

---

## 🎓 Comandos Úteis

```bash
# Compilar contratos
npx hardhat compile

# Limpar artefatos
npx hardhat clean

# Rodar testes
npx hardhat test

# Console interativo
npx hardhat console --network localhost

# Verificar tamanho dos contratos
npx hardhat size-contracts

# Ver contas disponíveis
npx hardhat accounts
```

---

## 🐛 Troubleshooting

### Problema: MetaMask não conecta

**Solução:**
- Verifique se está na rede "Hardhat Local" (Chain ID 31337)
- Certifique-se que `npx hardhat node` está rodando
- Recarregue a página (F5)

### Problema: "insufficient funds"

**Solução:**
- Certifique-se que importou a Account #0 no MetaMask
- Verifique se a rede local está rodando
- A conta deve ter 10.000 ETH

### Problema: "Contract address não encontrado"

**Solução:**
- Verifique se copiou o endereço correto do deploy
- Cole o endereço no `src/App.jsx` na variável `CONTRACT_ADDRESS`
- Recompile se necessário: `npx hardhat compile`

### Problema: Frontend não atualiza

**Solução:**
- Limpe cache do navegador (Ctrl+Shift+R)
- Pare e reinicie o Vite (`npm run dev`)
- Verifique se o endereço do contrato está correto

---

## 🔒 Segurança

⚠️ **IMPORTANTE:**

- **Nunca** compartilhe seu `.env`
- **Nunca** comite chaves privadas no Git
- Use **carteiras de teste** para desenvolvimento
- Em produção, use **hardware wallets**
- Faça **auditoria** antes de deploy em mainnet

---

## 📖 Referências

- [Documentação Solidity](https://docs.soliditylang.org/)
- [Documentação Hardhat](https://hardhat.org/docs)
- [Documentação ethers.js](https://docs.ethers.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [ERC-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [MetaMask Docs](https://docs.metamask.io/)

---

## 👥 Autor

**João Victor**
- GitHub: [JvAlm71](https://github.com/JvAlm71)
- Email: victoralmeidalpl@gmail.com

**Professor:** [Jó Ueyama]  
**Disciplina:** [Criptomoedas e Blockchain]  
**Instituição:** [Universidade de São Paulo]  
**Ano:** 2025



## 🎯 Roadmap Futuro

- [ ] Adicionar testes unitários completos
- [ ] Implementar função de burn (queimar tokens)
- [ ] Criar sistema de governança (DAO)
- [ ] Adicionar staking/yield farming
- [ ] Deploy em mainnet
- [ ] Listagem em DEX (Uniswap)

---

**Desenvolvido com ❤️ para fins educacionais**

[![Made with Solidity](https://img.shields.io/badge/Made%20with-Solidity-363636?logo=solidity)](https://soliditylang.org/)
[![Built with Hardhat](https://img.shields.io/badge/Built%20with-Hardhat-yellow)](https://hardhat.org/)
[![Powered by React](https://img.shields.io/badge/Powered%20by-React-61DAFB?logo=react)](https://react.dev/)