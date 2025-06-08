'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Coins, TrendingUp, PlusSquare, Clock, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TokenBalanceCard = ({ balance }: { balance: number }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-headline font-medium">Your Wallet</CardTitle>
      <Coins className="h-6 w-6 text-primary" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold font-body">{balance.toLocaleString()} NRT</div>
      <p className="text-xs text-muted-foreground font-body">Nori Reward Tokens</p>
    </CardContent>
  </Card>
);

const StakingInfoCard = ({ staked, rewards, apr }: { staked: number; rewards: number; apr: number }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-headline font-medium">Staking Overview</CardTitle>
      <TrendingUp className="h-6 w-6 text-primary" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground font-body">Currently Staked</p>
          <div className="text-2xl font-bold font-body">{staked.toLocaleString()} NRT</div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground font-body">Live Accruing Rewards</p>
          <div className="text-2xl font-bold text-green-500 font-body">{rewards.toFixed(4)} NRT</div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground font-body">Estimated APY</p>
          <div className="text-2xl font-bold font-body">{apr}%</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const StakeForm = ({ onStake }: { onStake: (amount: number) => void }) => {
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stakeAmount = parseFloat(amount);
    if (isNaN(stakeAmount) || stakeAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a positive number to stake.",
        variant: "destructive",
      });
      return;
    }
    onStake(stakeAmount);
    setAmount('');
    toast({
      title: "Staked Successfully!",
      description: `You have staked ${stakeAmount} NRT.`,
      className: "bg-primary text-primary-foreground",
    });
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-headline font-medium flex items-center">
          <PlusSquare className="h-6 w-6 text-primary mr-2" />
          Stake Your Tokens
        </CardTitle>
        <CardDescription className="font-body">Enter the amount of NRT you want to stake.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="number"
            placeholder="Amount of NRT"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="font-body text-base"
            aria-label="Amount to stake"
          />
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground active:scale-95 transition-transform duration-150 font-headline">
            Stake Now
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const RewardProgress = ({ nextPayoutTime, currentProgress }: { nextPayoutTime: number, currentProgress: number }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-headline font-medium">Reward Cycle</CardTitle>
      <Clock className="h-6 w-6 text-primary" />
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground font-body">
          Next reward distribution in: <span className="font-bold text-foreground">{nextPayoutTime} seconds</span>
        </p>
        <Progress value={currentProgress} className="w-full h-3" />
        <div className="flex items-center text-sm text-muted-foreground font-body mt-2">
          <Gift className="h-4 w-4 mr-2 text-green-500"/> 
          <span>Rewards are distributed periodically. Stay tuned!</span>
        </div>
      </div>
    </CardContent>
  </Card>
);


export default function DashboardPage() {
  const [tokenBalance, setTokenBalance] = useState(1250);
  const [stakedAmount, setStakedAmount] = useState(500);
  const [rewardsEarned, setRewardsEarned] = useState(25.5);
  const annualPercentageRate = 15; // Static APY for example

  const payoutCycleDuration = 60; // seconds
  const [nextPayoutTime, setNextPayoutTime] = useState(payoutCycleDuration);
  const [progress, setProgress] = useState(0);
  
  const { toast } = useToast();

  // Simulate reward accrual
  useEffect(() => {
    if (stakedAmount <= 0) return;

    const accrualRate = (stakedAmount * (annualPercentageRate / 100)) / (365 * 24 * 60 * 60); // NRT per second
    const interval = setInterval(() => {
      setRewardsEarned(prev => prev + accrualRate);
    }, 1000);
    return () => clearInterval(interval);
  }, [stakedAmount, annualPercentageRate]);

  // Simulate payout cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setNextPayoutTime(prevTime => {
        if (prevTime <= 1) {
          // Simulate payout
          if (stakedAmount > 0 && rewardsEarned > 0) {
            setTokenBalance(prev => prev + rewardsEarned);
            setRewardsEarned(0); // Reset pending rewards after payout
             toast({
              title: "Rewards Distributed!",
              description: `You received ${rewardsEarned.toFixed(4)} NRT.`,
              className: "bg-primary text-primary-foreground",
            });
          }
          return payoutCycleDuration;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [stakedAmount, rewardsEarned, toast]); // Added toast to dependencies

  useEffect(() => {
    setProgress(((payoutCycleDuration - nextPayoutTime) / payoutCycleDuration) * 100);
  }, [nextPayoutTime, payoutCycleDuration]);

  const handleStake = useCallback((amount: number) => {
    if (amount > tokenBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough NRT to stake this amount.",
        variant: "destructive",
      });
      return;
    }
    setTokenBalance(prev => prev - amount);
    setStakedAmount(prev => prev + amount);
  }, [tokenBalance, toast]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-headline text-3xl sm:text-4xl font-semibold mb-8 text-center text-foreground">
        NFT Reward Hub Dashboard
      </h1>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <TokenBalanceCard balance={tokenBalance} />
        <StakingInfoCard staked={stakedAmount} rewards={rewardsEarned} apr={annualPercentageRate} />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <StakeForm onStake={handleStake} />
        <RewardProgress nextPayoutTime={nextPayoutTime} currentProgress={progress} />
      </div>
    </div>
  );
}
