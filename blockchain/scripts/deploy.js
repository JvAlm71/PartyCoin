// blockchain/scripts/deploy.js
const hre = require("hardhat");
const { ethers } = require('hardhat');

/**
 * Função principal de deploy do contrato PartyCoin
 * 
 * Fluxo:
 * 1. Obtém a conta que fará o deploy (Account #0 do Hardhat)
 * 2. Mostra informações da conta (endereço e saldo)
 * 3. Compila e faz deploy do contrato
 * 4. Aguarda confirmação na blockchain
 * 5. Mostra informações do contrato deployado
 * 
 * Uso:
 * - Rede local: npx hardhat run scripts/deploy.js --network localhost
 * - Sepolia: npx hardhat run scripts/deploy.js --network sepolia
 */

async function main() {
  // ============ PREPARAÇÃO ============
  
  // Obtém o primeiro signer (conta que assinará as transações)
  // Em rede local: Account #0 com 10.000 ETH
  // Em testnet/mainnet: conta definida no hardhat.config.js
  const [deployer] = await ethers.getSigners();
  
  console.log('\n=================================');
  console.log('🚀 DEPLOYING PARTYCOIN');
  console.log('=================================');
  console.log('Deploying with account:', deployer.address);
  
  // Mostrar saldo
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('Account balance:', ethers.formatEther(balance), 'ETH');
  
  console.log('\nDeploying contract...');
  const PartyCoin = await ethers.getContractFactory('PartyCoin');
  const contract = await PartyCoin.deploy(deployer.address);
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  
  console.log('\n✅ PartyCoin deployed successfully!');
  console.log('=================================');
  console.log('Contract address:', contractAddress);
  console.log('Network:', hre.network.name);
  console.log('Chain ID:', hre.network.config.chainId);
  console.log('=================================\n');
  
  // Mostrar supply inicial
  const totalSupply = await contract.totalSupply();
  console.log('Total Supply:', ethers.formatEther(totalSupply), 'PRTY');
  console.log('Owner:', deployer.address);
  
  console.log('\n📋 COPIE ESTE ENDEREÇO PARA O FRONTEND:');
  console.log(contractAddress);
  console.log('=================================\n');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});