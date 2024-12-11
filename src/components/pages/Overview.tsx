import React from 'react';
import CryptoCard from '../CryptoCard';
import ChartSection from '../ChartSection';
import ActivitySection from '../ActivitySection';
import TransactionSection from '../TransactionSection';

export default function Overview() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <CryptoCard
          name="Bitcoin"
          symbol="BTC"
          price="52,291"
          change="+0.25%"
          trend="up"
        />
        <CryptoCard
          name="Litecoin"
          symbol="LTC"
          price="8,291"
          change="+0.25%"
          trend="up"
        />
        <CryptoCard
          name="Ethereum"
          symbol="ETH"
          price="28,291"
          change="+0.25%"
          trend="up"
        />
        <CryptoCard
          name="Solana"
          symbol="SOL"
          price="14,291"
          change="-0.25%"
          trend="down"
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <ChartSection />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <TransactionSection />
        </div>
      </div>

      <div className="mt-6">
        <ActivitySection />
      </div>
    </div>
  );
}