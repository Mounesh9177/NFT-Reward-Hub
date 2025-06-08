import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';

const DocumentationPage = () => {
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-headline text-2xl font-semibold mt-6 mb-3 text-primary flex items-center">
      <CheckCircle2 className="h-6 w-6 mr-2" />
      {children}
    </h2>
  );

  const ListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="font-body text-base leading-relaxed ml-5 list-disc">{children}</li>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-headline text-3xl sm:text-4xl font-semibold mb-8 text-center text-foreground">
        Project Documentation
      </h1>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">NFT Reward Hub Overview</CardTitle>
        </CardHeader>
        <CardContent className="font-body text-base leading-relaxed">
          <p>
            The NFT Reward Hub is a system designed for an NFT-based service, similar to "Nori Farm,"
            to distribute rewards to users via smart contracts. This documentation outlines the
            fungible token, reward contract, and setup instructions.
          </p>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Fungible Token (NRT - Nori Reward Token)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-body text-base leading-relaxed mb-4">
            A custom fungible token is created to serve as the reward currency within the ecosystem.
            It can be deployed on Binance Smart Chain (Solidity) or Solana (Rust).
          </p>
          <ul className="space-y-2">
            <ListItem><strong className="font-semibold">Name:</strong> Nori Reward Token</ListItem>
            <ListItem><strong className="font-semibold">Symbol:</strong> NRT</ListItem>
            <ListItem><strong className="font-semibold">Total Supply:</strong> 1,000,000,000 NRT (Example)</ListItem>
            <ListItem>
              <strong className="font-semibold">Allocation Strategy (Example):</strong>
              <ul className="list-inside list-disc ml-5 mt-1 space-y-1">
                <li>Staking Rewards: 50%</li>
                <li>Team & Advisors: 20%</li>
                <li>Ecosystem Development Fund: 15%</li>
                <li>Community Airdrops & Marketing: 10%</li>
                <li>Liquidity Provision: 5%</li>
              </ul>
            </ListItem>
          </ul>
          <SectionTitle>Token Creation & Deployment Steps</SectionTitle>
          <ol className="list-decimal list-inside space-y-2 font-body text-base leading-relaxed">
            <li>Choose your preferred blockchain (Binance Smart Chain or Solana).</li>
            <li>Set up your development environment (e.g., Hardhat/Truffle for Solidity, Anchor for Rust).</li>
            <li>Write the token smart contract defining its properties (name, symbol, supply, decimals).</li>
            <li>Implement standard token functionalities (e.g., ERC20 for Solidity, SPL Token for Solana).</li>
            <li>Compile the smart contract.</li>
            <li>Deploy the compiled contract to the chosen testnet or mainnet.</li>
            <li>Verify the contract on a block explorer.</li>
            <li>Distribute tokens according to the allocation strategy.</li>
          </ol>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Reward Smart Contract</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-body text-base leading-relaxed mb-4">
            A smart contract is developed to distribute the NRT tokens as rewards. This contract
            implements staking logic where users can lock their NRT to earn more over time.
          </p>
          <SectionTitle>Contract Logic & Architecture</SectionTitle>
          <ul className="space-y-2">
            <ListItem>
              <strong className="font-semibold">Type:</strong> Time-based Staking Contract.
            </ListItem>
            <ListItem>
              <strong className="font-semibold">Reward Distribution:</strong> NRT tokens are distributed to stakers based on the amount staked and the duration of staking.
            </ListItem>
            <ListItem>
              <strong className="font-semibold">User Activity Scenarios:</strong>
              <ul className="list-inside list-disc ml-5 mt-1 space-y-1">
                <li>User stakes NRT tokens into the contract.</li>
                <li>Rewards accrue proportionally to the staked amount over time.</li>
                <li>User can claim accrued rewards.</li>
                <li>User can unstake their NRT tokens (rewards might be claimed automatically upon unstaking or require a separate claim).</li>
              </ul>
            </ListItem>
             <ListItem>
              <strong className="font-semibold">Core Functions:</strong>
              <ul className="list-inside list-disc ml-5 mt-1 space-y-1">
                <li>`stake(amount)`: Allows users to deposit NRT tokens.</li>
                <li>`unstake(amount)`: Allows users to withdraw their staked NRT tokens.</li>
                <li>`claimRewards()`: Allows users to claim their accrued NRT rewards.</li>
                <li>`getRewardRate()` / `calculateRewards(userAddress)`: Helper functions for reward calculation.</li>
              </ul>
            </ListItem>
          </ul>
           <SectionTitle>Deployment Instructions</SectionTitle>
           <ol className="list-decimal list-inside space-y-2 font-body text-base leading-relaxed">
            <li>Write the staking smart contract code.</li>
            <li>Ensure the contract can hold and transfer NRT tokens (approve NRT token spending by the staking contract).</li>
            <li>Compile the staking contract.</li>
            <li>Deploy to the chosen blockchain network.</li>
            <li>Fund the staking contract with NRT tokens allocated for rewards.</li>
            <li>Set reward parameters (e.g., reward rate, duration).</li>
            <li>Integrate the contract with the frontend application.</li>
           </ol>
        </CardContent>
      </Card>
      
      <Separator className="my-8" />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Environment Setup</CardTitle>
        </CardHeader>
        <CardContent>
           <p className="font-body text-base leading-relaxed mb-4">
            To develop and deploy the smart contracts and interact with them:
          </p>
          <SectionTitle>For Solidity (Binance Smart Chain / Ethereum-like):</SectionTitle>
          <ul className="space-y-2">
            <ListItem>Node.js and npm/yarn.</ListItem>
            <ListItem>Development framework: Hardhat or Truffle.</ListItem>
            <ListItem>Wallet: MetaMask or similar, configured for the target network (e.g., BSC Testnet).</ListItem>
            <ListItem>Text editor: VS Code with Solidity extensions.</ListItem>
            <ListItem>Access to RPC endpoints for deployment and interaction.</ListItem>
          </ul>
          <SectionTitle>For Rust (Solana):</SectionTitle>
           <ul className="space-y-2">
            <ListItem>Rust toolchain (rustup).</ListItem>
            <ListItem>Solana CLI tools.</ListItem>
            <ListItem>Development framework: Anchor.</ListItem>
            <ListItem>Wallet: Phantom or Solflare, configured for Solana Devnet/Testnet/Mainnet-beta.</ListItem>
            <ListItem>Text editor: VS Code with Rust Analyzer and Solana extensions.</ListItem>
          </ul>
           <SectionTitle>Frontend Application (This Next.js App):</SectionTitle>
           <ul className="space-y-2">
            <ListItem>Node.js and npm/yarn.</ListItem>
            <ListItem>Run `npm install` or `yarn install` to install dependencies.</ListItem>
            <ListItem>Run `npm run dev` or `yarn dev` to start the development server.</ListItem>
            <ListItem>Web3 library for interacting with smart contracts (e.g., ethers.js, web3.js for EVM; @solana/web3.js for Solana). This app currently simulates these interactions.</ListItem>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationPage;
