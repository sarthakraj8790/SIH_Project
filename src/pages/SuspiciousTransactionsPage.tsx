import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Search, MapPin, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface Transaction {
  id: string;
  transactionHash: string;
  walletAddress: string;
  ipAddress: string;
  latitude: number;
  longitude: number;
  location: string;
  riskScore: number;
  timestamp: Date;
  details: any;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    transactionHash: '0x1234...5678',
    walletAddress: '0xabcd...efgh',
    ipAddress: '192.168.1.1',
    latitude: 40.7128,
    longitude: -74.0060,
    location: 'New York, USA',
    riskScore: 85,
    timestamp: new Date(),
    details: {
      amount: '5.2 ETH',
      type: 'High-value transfer',
    },
  },
];

const defaultCenter: [number, number] = [40.7128, -74.0060];

function MapComponent({ selectedTransaction }: { selectedTransaction: Transaction | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedTransaction) {
      map.setView(
        [selectedTransaction.latitude, selectedTransaction.longitude],
        14,
        { animate: true }
      );
    }
  }, [selectedTransaction, map]);

  return null;
}

function SearchBox({ onLocationFound }: { onLocationFound: (lat: number, lng: number) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const provider = new OpenStreetMapProvider();

  const handleSearch = async () => {
    if (!query) return;
    const searchResults = await provider.search({ query });
    setResults(searchResults);
  };

  const handleSelect = (result: any) => {
    onLocationFound(parseFloat(result.y), parseFloat(result.x));
    setResults([]);
    setQuery('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search locations..."
          className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {results.length > 0 && (
        <ul className="absolute z-50 w-full bg-gray-700 mt-1 rounded-lg shadow-lg">
          {results.map((result) => (
            <li
              key={result.raw.place_id}
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-gray-200"
              onClick={() => handleSelect(result)}
            >
              {result.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SuspiciousTransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleLocationFound = (lat: number, lng: number) => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 14);
    }
  };

  const mapRef = React.useRef<L.Map>(null);

  return (
    <div className="h-full grid grid-cols-12 gap-6">
      <div className="col-span-4 bg-gray-800 rounded-lg p-6 overflow-hidden">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Suspicious Transactions</h2>
          <SearchBox onLocationFound={handleLocationFound} />
        </div>

        <div className="space-y-4 h-[calc(100%-8rem)] overflow-y-auto">
          {mockTransactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              className={`bg-gray-700 p-4 rounded-lg cursor-pointer transition-colors ${
                selectedTransaction?.id === transaction.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleTransactionClick(transaction)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="text-red-500" size={16} />
                    <span className="text-white font-medium">
                      Risk Score: {transaction.riskScore}%
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">
                    TX: {transaction.transactionHash}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    {format(transaction.timestamp, 'PPpp')}
                  </p>
                </div>
                <MapPin className="text-gray-400" size={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="col-span-8 bg-gray-800 rounded-lg overflow-hidden">
        <MapContainer
          center={defaultCenter}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapComponent selectedTransaction={selectedTransaction} />
          {mockTransactions.map((transaction) => (
            <Marker
              key={transaction.id}
              position={[transaction.latitude, transaction.longitude]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Suspicious Transaction Details
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Location: {transaction.location}</p>
                    <p>IP Address: {transaction.ipAddress}</p>
                    <p>Amount: {transaction.details.amount}</p>
                    <p>Type: {transaction.details.type}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}