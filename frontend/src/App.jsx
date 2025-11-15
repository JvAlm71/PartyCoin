import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PartyCoinABI from './artifacts/contracts/PartyCoin.sol/PartyCoin.json';
import './App.css';

// COLE O ENDEREÇO QUE APARECEU NO DEPLOY AQUI
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 



function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState('');

  // Conectar carteira MetaMask
  async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      alert('Por favor, instale o MetaMask!\nhttps://metamask.io');
      return;
    }

    try {
      // Solicitar conexão
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const net = await provider.getNetwork();
      setNetwork(net.name);

      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        PartyCoinABI.abi,
        signer
      );
      setContract(contractInstance);

      // Buscar saldo
      const bal = await contractInstance.balanceOf(accounts[0]);
      setBalance(ethers.formatEther(bal));
    } catch (error) {
      console.error('Erro ao conectar:', error);
      alert('Erro: ' + error.message);
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

      <div className="contract-info">
        <p><strong>📜 Contrato:</strong></p>
        <p className="contract-address">{CONTRACT_ADDRESS}</p>
      </div>
    </div>
  );
}

export default App;
