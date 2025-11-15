import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PartyCoinABI from './artifacts/contracts/PartyCoin.sol/PartyCoin.json';
import './App.css';
import contractAddress from './contract-address.json'; // ← gerado pelo deploy

// Endereço do contrato vindo do JSON gerado pelo script de deploy
const CONTRACT_ADDRESS = contractAddress.PartyCoin;

// Parâmetros da rede local do Hardhat (31337)
const HARDHAT_PARAMS = {
  chainId: '0x7a69',
  chainName: 'Hardhat Local',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['http://127.0.0.1:8545'],
  blockExplorerUrls: []
};

function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState('');
  const [error, setError] = useState('');

  // Conectar carteira MetaMask
  async function connectWallet() {
    setError('');
    if (typeof window.ethereum === 'undefined') {
      alert('Por favor, instale o MetaMask!\nhttps://metamask.io');
      return;
    }

    try {
      // Garantir rede 31337
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: HARDHAT_PARAMS.chainId }]
        });
      } catch (e) {
        if (e.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [HARDHAT_PARAMS]
          });
        } else {
          throw e;
        }
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const net = await provider.getNetwork();
      setNetwork(net.chainId === 31337n ? 'Hardhat Local' : net.name);

      if (net.chainId !== 31337n) {
        setError('Troque para a rede Hardhat Local (31337).');
        return;
      }

      // Checar se há bytecode no endereço do contrato
      const code = await provider.getCode(CONTRACT_ADDRESS);
      if (code === '0x') {
        setError(`Contrato não encontrado no endereço ${CONTRACT_ADDRESS} na rede 31337. Faça o deploy novamente.`);
        return;
      }

      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, PartyCoinABI.abi, signer);

      // Chamada simples para validar a ABI
      await contractInstance.totalSupply();

      setContract(contractInstance);

      const bal = await contractInstance.balanceOf(accounts[0]);
      setBalance(ethers.formatEther(bal));
    } catch (error) {
      console.error('Erro ao conectar:', error);
      const msg = error.code === 'BAD_DATA'
        ? 'Contrato/ABI inválidos para este endereço. Faça o deploy e atualize o frontend.'
        : (error.message || 'Erro desconhecido.');
      setError(msg);
      alert('Erro: ' + msg);
    }
  }

  // Atualizar saldo automaticamente
  useEffect(() => {
    if (contract && account) {
      const interval = setInterval(async () => {
        try {
          const bal = await contract.balanceOf(account);
          setBalance(ethers.formatEther(bal));
        } catch (err) {
          console.error(err);
        }
      }, 3000); // atualiza a cada 3s

      return () => clearInterval(interval);
    }
  }, [contract, account]);

  // Transferir tokens
  async function transferTokens() {
    if (!contract) return;

    const toAddress = prompt('Endereço de destino:');
    const amount = prompt('Quantidade de PRTY (ex: 100):');

    if (!toAddress || !amount) return;

    try {
      setLoading(true);
      const tx = await contract.transfer(
        toAddress,
        ethers.parseEther(amount)
      );
      console.log('Transação enviada:', tx.hash);
      await tx.wait();
      alert('✅ Transferência concluída!');
      
      // Atualizar saldo
      const bal = await contract.balanceOf(account);
      setBalance(ethers.formatEther(bal));
    } catch (error) {
      console.error('Erro:', error);
      alert('❌ Erro: ' + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  }

  // Reagir a trocas de rede/conta no MetaMask
  useEffect(() => {
    if (!window.ethereum) return;
    const handleChainChanged = () => window.location.reload();
    const handleAccountsChanged = (accs) => setAccount(accs[0] || '');
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
      window.ethereum.removeListener('chainChanged', handleChainChanged);
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  return (
    <div className="App">
      <h1>🎉 PartyCoin (PRTY)</h1>
      <p className="subtitle">Token ERC-20 na Blockchain</p>

      {!account ? (
        <div className="connect-section">
          <button onClick={connectWallet} className="btn-connect">
            🦊 Conectar MetaMask
          </button>
          <p className="hint">
            Use a rede <strong>Localhost 8545</strong> no MetaMask
          </p>
        </div>
      ) : (
        <div className="wallet-info">
          <div className="info-card">
            <label>🔑 Carteira</label>
            <p className="address">
              {account.slice(0, 6)}...{account.slice(-4)}
            </p>
          </div>

          <div className="info-card">
            <label>💰 Saldo</label>
            <p className="balance">{parseFloat(balance).toLocaleString('pt-BR')} PRTY</p>
          </div>

          <div className="info-card">
            <label>🌐 Rede</label>
            <p>{network || 'Localhost'}</p>
          </div>

          <button
            onClick={transferTokens}
            disabled={loading}
            className="btn-transfer"
          >
            {loading ? '⏳ Processando...' : '📤 Transferir Tokens'}
          </button>
        </div>
      )}

      {error && (
        <div style={{background: 'rgba(255,0,0,0.15)', border: '1px solid #ff4d4f', color: '#fff', padding: '10px', borderRadius: 8, marginBottom: 16}}>
          {error}
        </div>
      )}

      <div className="contract-info">
        <p><strong>📜 Contrato:</strong></p>
        <p className="contract-address">{CONTRACT_ADDRESS}</p>
      </div>
    </div>
  );
}

export default App;
