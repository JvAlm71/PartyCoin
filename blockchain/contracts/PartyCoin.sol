// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/** 
 * Funcionalidades:
 * - Supply inicial fixo de 1.000.000 tokens
 * - Função de mint restrita ao owner (para expansão futura)
 * - Função purchaseTokens para simular compra de tokens
 * - Herda todas as funcionalidades padrão do ERC-20 (transfer, approve, etc)
 */
contract PartyCoin is ERC20, Ownable {
    event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 amount);

    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 1e18;


       
    /**
     * 1. Define nome "PartyCoin" e símbolo "PRTY"
     * 2. Define o owner (quem pode executar funções restritas)
     * 3. Minta todo o supply inicial para o owner
     */

    constructor(address initialOwner) ERC20("PartyCoin", "PRTY") Ownable(initialOwner) {
        _mint(initialOwner, INITIAL_SUPPLY);
    }


        // ============ FUNÇÕES PÚBLICAS ============
    
    /**
     * - Aceitar ETH via payable
     * - Calcular quantidade de tokens baseado no preço
     * - Enviar ETH recebido para algum lugar seguro
     */

    function purchaseTokens(address beneficiary, uint256 amount) public payable onlyOwner {
        require(beneficiary != address(0), "PartyCoin: beneficiary is the zero address");
        require(amount > 0, "PartyCoin: amount must be greater than 0");
        _mint(beneficiary, amount);
        emit TokensPurchased(msg.sender, beneficiary, amount);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}