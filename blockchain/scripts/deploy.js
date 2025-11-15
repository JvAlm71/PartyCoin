// blockchain/scripts/deploy.js
const hre = require("hardhat");
const { ethers, artifacts } = require("hardhat");
const fs = require("fs");
const path = require("path");

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
  
  console.log("\n=================================");
  console.log("🚀 DEPLOYING PARTYCOIN");
  console.log("Deployer:", deployer.address);
  console.log("Network:", hre.network.name);
  console.log("=================================\n");

  const PartyCoin = await ethers.getContractFactory('PartyCoin');
  const contract = await PartyCoin.deploy(deployer.address);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("✅ Deployed at:", address, "\n");

  // Grava o endereço para o frontend (Vite pode importar JSON)
  const frontendSrc = path.join(__dirname, "../../frontend/src");
  const outPath = path.join(frontendSrc, "contract-address.json");
  fs.writeFileSync(outPath, JSON.stringify({ PartyCoin: address }, null, 2));
  console.log("📝 Frontend atualizado:", outPath);

  // Exporta ABI atualizado para o frontend
  const artifact = await artifacts.readArtifact("PartyCoin");
  const abiDir = path.join(frontendSrc, "artifacts", "contracts", "PartyCoin.sol");
  fs.mkdirSync(abiDir, { recursive: true });
  fs.writeFileSync(path.join(abiDir, "PartyCoin.json"), JSON.stringify(artifact, null, 2));
  console.log("🧩 ABI copiado para o frontend.\n");

  const totalSupply = await contract.totalSupply();
  console.log("Total Supply:", ethers.formatEther(totalSupply), "PRTY");
  console.log("\n📋 Endereço para uso no frontend:", address);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});