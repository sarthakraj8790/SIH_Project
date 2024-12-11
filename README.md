# CryptoGuard - Cryptocurrency Monitoring System

CryptoGuard is a comprehensive blockchain analytics and monitoring system that provides real-time tracking, analysis, and security monitoring for cryptocurrency transactions. Built with modern web technologies, it offers powerful visualization tools and advanced security features.

![CryptoGuard Dashboard](https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000)

## Features

### Transaction Monitoring
- Real-time transaction tracking and analysis
- Interactive graph visualization of wallet connections
- Suspicious activity detection and alerts
- Historical transaction data analysis

### Graph Visualization
- Interactive network graph showing wallet relationships
- Node sizing based on transaction volume
- Edge thickness representing transaction value
- Color-coding for suspicious wallets
- Zoom, pan, and click interactions
- Export capabilities (JPG, CSV)

### Analytics & Reporting
- Customizable dashboard with key metrics
- Transaction pattern analysis
- Risk scoring system
- Automated report generation
- Data export capabilities

### Security Features
- Suspicious activity detection
- Real-time alerts
- Wallet risk assessment
- Pattern recognition for potential threats

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Framer Motion for animations
- Cytoscape.js for graph visualization
- Recharts for data visualization
- Web3.js for blockchain interaction

### Backend
- Node.js with Express
- PostgreSQL with TypeORM
- WebSocket for real-time updates
- JWT authentication
- Rate limiting and security middleware

### APIs & Services
- Infura for Ethereum node access
- Google AI for pattern analysis
- WebSocket for real-time data

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL database

### Environment Setup
Create a `.env` file in the root directory:

```env
VITE_INFURA_API_KEY=your_infura_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key

# Backend Environment Variables
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
DATABASE_URL=your_postgres_database_url
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cryptoguard.git
cd cryptoguard
```

2. Install dependencies:
```bash
npm install
```

3. Run database migrations:
```bash
npm run migration:run
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Graph/          # Graph visualization components
│   │   ├── ChainAnalysis/  # Blockchain analysis components
│   │   └── Notifications/  # Alert and notification components
│   ├── pages/              # Page components
│   ├── store/              # State management
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript types
│   └── services/           # API services
├── server/
│   ├── config/            # Server configuration
│   ├── entities/          # Database entities
│   ├── routes/            # API routes
│   └── utils/             # Server utilities
└── public/                # Static assets
```

## Key Features Documentation

### Graph Visualization

The graph visualization system provides:

- Interactive node-edge representation of blockchain transactions
- Filtering options:
  - Time range (24h, 7d, 30d, all)
  - Minimum transaction amount
  - Suspicious activity filter
- Visual features:
  - Node size based on wallet activity
  - Edge thickness based on transaction value
  - Color coding for suspicious wallets
  - Tooltips with detailed information

### Transaction Analysis

The analysis system includes:

- Pattern detection for suspicious activities
- Risk scoring based on multiple factors
- Historical data analysis
- Real-time monitoring capabilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- All sensitive data is encrypted
- Rate limiting is implemented on all endpoints
- JWT authentication for API access
- Input validation and sanitization
- Regular security audits

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:
- Open an issue in the repository
- Contact support@cryptoguard.com
- Join our Discord community

## Acknowledgments

- [Infura](https://infura.io/) for Ethereum node access
- [Cytoscape.js](https://js.cytoscape.org/) for graph visualization
- [Web3.js](https://web3js.readthedocs.io/) for blockchain interaction