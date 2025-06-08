
# NFT Reward Hub

This is a Next.js starter project for an NFT Reward Hub, a system designed to distribute rewards to users via smart contracts, similar to services like "Nori Farm". This document provides an overview of the fungible token (NRT), the reward smart contract, and setup instructions.

## Table of Contents

- [Project Overview](#project-overview)
- [Fungible Token (NRT - Nori Reward Token)](#fungible-token-nrt---nori-reward-token)
  - [Token Details](#token-details)
  - [Token Creation & Deployment Steps](#token-creation--deployment-steps)
- [Reward Smart Contract](#reward-smart-contract)
  - [Contract Logic & Architecture](#contract-logic--architecture)
  - [Deployment Instructions](#deployment-instructions)
- [Environment Setup](#environment-setup)
  - [For Solidity (Binance Smart Chain / Ethereum-like)](#for-solidity-binance-smart-chain--ethereum-like)
  - [For Rust (Solana)](#for-rust-solana)
  - [Frontend Application (This Next.js App)](#frontend-application-this-nextjs-app)
- [Getting Started with the Frontend](#getting-started-with-the-frontend)

## Project Overview

The NFT Reward Hub aims to provide a simulated interface for interacting with a conceptual NFT-based reward system. Users can (simulate) staking tokens, earning rewards, and viewing their token balance. The core idea is to demonstrate how an NFT service might distribute its custom fungible token rewards through smart contracts.

## Fungible Token (NRT - Nori Reward Token)

A custom fungible token is conceptualized to serve as the reward currency within the ecosystem. It could be deployed on a blockchain like Binance Smart Chain (using Solidity) or Solana (using Rust).

### Token Details

-   **Name:** Nori Reward Token
-   **Symbol:** NRT
-   **Total Supply (Example):** 1,000,000,000 NRT
-   **Allocation Strategy (Example):**
    *   Staking Rewards: 50%
    *   Team & Advisors: 20%
    *   Ecosystem Development Fund: 15%
    *   Community Airdrops & Marketing: 10%
    *   Liquidity Provision: 5%

### Token Creation & Deployment Steps

1.  **Choose Blockchain:** Decide whether to use Binance Smart Chain (Solidity/EVM) or Solana (Rust/SPL).
2.  **Setup Development Environment:**
    *   For Solidity: Install Node.js, npm/yarn. Set up Hardhat or Truffle. Install MetaMask or a similar wallet.
    *   For Rust (Solana): Install Rust toolchain (rustup), Solana CLI tools. Set up Anchor framework. Install Phantom or Solflare wallet.
3.  **Write Smart Contract:**
    *   Define token properties: name, symbol, total supply, decimals.
    *   Implement standard functionalities:
        *   Solidity: ERC-20 standard (functions like `transfer`, `approve`, `balanceOf`, etc.).
        *   Rust (Solana): SPL Token standard.
4.  **Compile Contract:** Use your chosen framework's tools to compile the smart contract code.
    *   Solidity: `npx hardhat compile` (Hardhat) or `truffle compile` (Truffle).
    *   Rust (Anchor): `anchor build`.
5.  **Deploy Contract:**
    *   Configure deployment scripts with your wallet/private key and RPC endpoint for the target network (testnet or mainnet).
    *   Run deployment commands:
        *   Solidity (Hardhat): `npx hardhat run scripts/deploy.js --network <your_network_name>`
        *   Rust (Anchor): `anchor deploy`
6.  **Verify Contract:** (Optional but recommended) Verify the deployed contract on a block explorer (e.g., BscScan for BSC, Solscan for Solana). This makes the source code public and auditable.
7.  **Distribute Tokens:** Transfer tokens from the deployer wallet to other wallets or smart contracts according to your allocation strategy (e.g., to the reward contract, team wallets, liquidity pools).

## Reward Smart Contract

A smart contract is designed to distribute the NRT tokens as rewards. This contract typically implements staking logic, allowing users to lock their NRT to earn more over time.

### Contract Logic & Architecture

*   **Type:** Time-based Staking Contract.
*   **Reward Distribution:** NRT tokens are distributed to stakers based on the amount staked and the duration of staking. The reward rate can be fixed or variable.
*   **User Activity Scenarios:**
    1.  User stakes NRT tokens: The user calls a `stake(amount)` function, transferring NRT from their wallet to the staking contract.
    2.  Rewards accrue: The contract calculates rewards for each staker, often per block or per second, proportional to their staked amount relative to the total amount staked.
    3.  User claims rewards: The user calls a `claimRewards()` function to receive their accrued NRT.
    4.  User unstakes NRT: The user calls an `unstake(amount)` function to withdraw their principal NRT. Accrued rewards might be automatically claimed, or require a separate claim.
*   **Core Functions (Example):**
    *   `stake(uint256 amount)`: Allows users to deposit NRT tokens. Transfers NRT from user to contract. Updates user's stake information.
    *   `unstake(uint256 amount)`: Allows users to withdraw their staked NRT tokens. Transfers NRT from contract to user. Updates user's stake information. May also trigger reward payment.
    *   `claimRewards()`: Allows users to claim their accrued NRT rewards without unstaking. Transfers NRT from contract to user.
    *   `getRewardRate()` or `rewardPerToken()`: A view function to show current reward rate or calculate rewards due.
    *   `balanceOf(address user)`: Shows the staked balance of a user.
    *   `earned(address user)`: Shows the rewards accrued by a user.
*   **Security Considerations:**
    *   Ensure proper access control (e.g., only stakers can claim their rewards).
    *   Protect against reentrancy attacks.
    *   Handle token approvals securely (e.g., users approve the staking contract to spend their NRT before staking).
    *   Consider using established libraries like OpenZeppelin for common patterns.

### Deployment Instructions

1.  **Write Staking Contract Code:** Develop the smart contract logic as described above using Solidity or Rust (Anchor).
2.  **Token Interaction:**
    *   The staking contract must be able to hold NRT tokens.
    *   It will need permission (approval) from users to transfer their NRT tokens into the staking pool.
    *   It will need NRT tokens allocated for reward distribution to be funded into it.
3.  **Compile Contract:** Use your framework's compile command.
4.  **Deploy Contract:** Deploy to the chosen blockchain network (testnet first for testing, then mainnet).
5.  **Fund Contract:** Transfer a significant amount of NRT (from the "Staking Rewards" allocation) to the deployed staking contract address. This pool will be used to pay out rewards.
6.  **Set Parameters:** If your contract has configurable parameters (e.g., reward rate, epoch duration), set them via contract functions (often restricted to an owner/admin role).
7.  **Integrate with Frontend:** The frontend application (like this Next.js app) will need the staking contract's ABI (Application Binary Interface) and its deployed address to interact with it.

## Environment Setup

To develop, deploy, and interact with the smart contracts:

### For Solidity (Binance Smart Chain / Ethereum-like):

*   **Node.js and npm/yarn:** Required for package management and running scripts.
*   **Development Framework:**
    *   **Hardhat (Recommended):** Provides a flexible environment for compiling, deploying, testing, and debugging Ethereum software. `npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-ethers ethers`
    *   **Truffle:** Another popular framework. `npm install -g truffle`
*   **Wallet:** MetaMask browser extension or similar, configured for the target network (e.g., BSC Testnet, local Hardhat network).
*   **Text Editor:** VS Code with Solidity extensions (e.g., `Juan Blanco.solidity`).
*   **RPC Endpoints:** Access to RPC URLs for the desired network (e.g., from Infura, Alchemy, or a public BSC node).

### For Rust (Solana):

*   **Rust Toolchain:** Install via `rustup`. `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
*   **Solana CLI Tools:** Install from Solana's official documentation. `sh -c "$(curl -sSfL https://release.solana.com/v1.18.4/install)"` (check for the latest version).
*   **Development Framework: Anchor:** Simplifies Solana smart contract (program) development. `cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked --force`
*   **Wallet:** Phantom or Solflare browser extension, configured for Solana Devnet, Testnet, or Mainnet-beta.
*   **Text Editor:** VS Code with `rust-analyzer` and Solana extensions.

### Frontend Application (This Next.js App):

*   **Node.js and npm/yarn:** Required for running the Next.js development server and managing packages.
*   **Dependencies:** Install project dependencies: `npm install` or `yarn install`.
*   **Development Server:** Start the app: `npm run dev` or `yarn dev`.
*   **Web3 Libraries:**
    *   For EVM chains (like BSC): `ethers.js` or `web3.js` would be used to interact with smart contracts.
    *   For Solana: `@solana/web3.js`.
    *   This application currently **simulates** these interactions on the client-side for demonstration purposes.

## Getting Started with the Frontend

This project is a Next.js application.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically be available at `http://localhost:9002` (or another port if 9002 is in use).

4.  **Explore the App:**
    *   **Dashboard (`/`):** Simulates token balance, staking, and reward accrual.
    *   **Documentation Page (`/documentation`):** Contains a web version of the information in this README.

This README provides a conceptual guide. Actual smart contract development requires careful coding, extensive testing (unit, integration, and on testnets), and potentially security audits before mainnet deployment.
