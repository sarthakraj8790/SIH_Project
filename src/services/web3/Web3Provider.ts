import Web3 from 'web3';
import { toast } from 'react-hot-toast';

class Web3Provider {
  private static instance: Web3Provider;
  private web3: Web3 | null = null;
  private initialized: boolean = false;
  private initializationPromise: Promise<void> | null = null;
  private retryCount: number = 0;
  private maxRetries: number = 3;

  private constructor() {
    this.initializationPromise = this.initialize();
  }

  private async initialize() {
    try {
      if (!import.meta.env.VITE_INFURA_API_KEY) {
        throw new Error('Infura API key is not configured');
      }

      const provider = new Web3.providers.HttpProvider(
        `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`,
        {
          timeout: 10000, // 10 seconds
          reconnect: {
            auto: true,
            delay: 5000, // 5 seconds
            maxAttempts: 5,
            onTimeout: true
          }
        }
      );

      this.web3 = new Web3(provider);

      // Test connection
      await this.web3.eth.getBlockNumber();
      this.initialized = true;
      this.retryCount = 0;

      console.log('Web3 initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Web3:', error);
      
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(`Retrying Web3 initialization (${this.retryCount}/${this.maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return this.initialize();
      }

      this.initialized = false;
      toast.error('Failed to connect to Ethereum network. Please try again later.');
      throw error;
    }
  }

  public static getInstance(): Web3Provider {
    if (!Web3Provider.instance) {
      Web3Provider.instance = new Web3Provider();
    }
    return Web3Provider.instance;
  }

  public async getWeb3(): Promise<Web3> {
    if (this.initializationPromise) {
      await this.initializationPromise;
    }
    
    if (!this.initialized || !this.web3) {
      await this.reconnect();
    }
    
    if (!this.web3) {
      throw new Error('Web3 is not initialized');
    }
    
    return this.web3;
  }

  public isConnected(): boolean {
    return this.initialized && this.web3?.currentProvider !== null;
  }

  public async reconnect(): Promise<void> {
    this.retryCount = 0;
    this.initializationPromise = this.initialize();
    await this.initializationPromise;
  }
}

export default Web3Provider;