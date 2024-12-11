import Web3 from 'web3';

const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);

export async function analyzeWallet(address) {
  try {
    const balance = await web3.eth.getBalance(address);
    const transactions = await web3.eth.getPastLogs({
      fromBlock: 'latest',
      toBlock: 'latest',
      address,
    });

    // Mock analysis for demonstration
    const riskScore = Math.random() * 100;
    const flags = ['Suspicious activity', 'High-value transfers'];
    const patterns = ['Frequent small transfers', 'Round number transactions'];

    return {
      riskScore,
      flags,
      patterns,
      balance: web3.utils.fromWei(balance, 'ether'),
      transactionCount: transactions.length,
    };
  } catch (error) {
    throw new Error('Analysis failed');
  }
}