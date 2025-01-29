import React, { useState, useEffect, useRef } from 'react';
import { Shield, Wifi, AlertTriangle, Activity, Settings, Radio, Lock, Users, Signal } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Line, Html } from '@react-three/drei';
import { WifiNetwork, Alert, NetworkStats } from '../types';
import { generateSimulatedNetworks, generateSimulatedAlerts, generateNetworkStats } from '../utils/simulationData';

function NetworkNode({ position, color, label, signalStrength, clients, onClick }: { 
  position: [number, number, number]; 
  color: string; 
  label: string;
  signalStrength: number;
  clients: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const size = 0.2 + (clients * 0.02);

  return (
    <group 
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh scale={hovered ? 1.2 : 1}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, size + 0.2, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      {hovered && (
        <Html position={[0, -0.4, 0]}>
          <div className="bg-black/80 text-white p-2 rounded text-sm whitespace-nowrap">
            Signal: {signalStrength} dBm
            <br />
            Clients: {clients}
          </div>
        </Html>
      )}
    </group>
  );
}

function NetworkConnections({ networks }: { networks: WifiNetwork[] }) {
  return (
    <>
      {networks.map((network, i) => 
        networks.slice(i + 1).map((target, j) => {
          if (network.channel === target.channel) {
            const start = [
              Math.cos((i / networks.length) * Math.PI * 2) * 2,
              0,
              Math.sin((i / networks.length) * Math.PI * 2) * 2
            ];
            const end = [
              Math.cos(((i + j + 1) / networks.length) * Math.PI * 2) * 2,
              0,
              Math.sin(((i + j + 1) / networks.length) * Math.PI * 2) * 2
            ];
            return (
              <Line
                key={`${network.bssid}-${target.bssid}`}
                points={[start, end]}
                color={network.suspicious || target.suspicious ? "#ef4444" : "#22c55e"}
                lineWidth={1}
                opacity={0.3}
              />
            );
          }
          return null;
        })
      )}
    </>
  );
}

function NetworkMap({ networks }: { networks: WifiNetwork[] }) {
  const [selectedNetwork, setSelectedNetwork] = useState<WifiNetwork | null>(null);

  return (
    <Canvas camera={{ position: [0, 3, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <NetworkConnections networks={networks} />
      {networks.map((network, index) => {
        const angle = (index / networks.length) * Math.PI * 2;
        const x = Math.cos(angle) * 2;
        const z = Math.sin(angle) * 2;
        return (
          <NetworkNode
            key={network.bssid}
            position={[x, 0, z]}
            color={network.suspicious ? '#ef4444' : '#22c55e'}
            label={network.ssid}
            signalStrength={network.signalStrength}
            clients={network.clients}
            onClick={() => setSelectedNetwork(network)}
          />
        );
      })}
      <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}

export default function Dashboard() {
  const [networks, setNetworks] = useState<WifiNetwork[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState<NetworkStats>({
    totalNetworks: 0,
    authorizedAPs: 0,
    rogueAPs: 0,
    activeClients: 0,
    alertsLast24h: 0
  });
  const [selectedTab, setSelectedTab] = useState<'networks' | 'alerts'>('networks');

  useEffect(() => {
    // Initial load
    setNetworks(generateSimulatedNetworks());
    setAlerts(generateSimulatedAlerts());
    setStats(generateNetworkStats());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setNetworks(generateSimulatedNetworks());
      setAlerts(generateSimulatedAlerts());
      setStats(generateNetworkStats());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-indigo-600 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">WIDS Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white/80">
              <Signal className="h-4 w-4" />
              <span className="text-sm">Monitoring Active</span>
            </div>
            <button className="text-white hover:text-indigo-200">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        {/* 3D Network Map */}
        <div className="bg-gray-800 rounded-lg shadow-lg mb-6 overflow-hidden h-[400px]">
          <NetworkMap networks={networks} />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<Wifi className="h-6 w-6 text-indigo-400" />}
            title="Total Networks"
            value={stats.totalNetworks}
            trend={+5}
          />
          <StatCard
            icon={<Shield className="h-6 w-6 text-green-400" />}
            title="Authorized APs"
            value={stats.authorizedAPs}
            trend={+2}
          />
          <StatCard
            icon={<AlertTriangle className="h-6 w-6 text-red-400" />}
            title="Rogue APs"
            value={stats.rogueAPs}
            trend={-1}
          />
          <StatCard
            icon={<Activity className="h-6 w-6 text-blue-400" />}
            title="Active Clients"
            value={stats.activeClients}
            trend={+8}
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'networks'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => setSelectedTab('networks')}
          >
            Networks
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'alerts'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => setSelectedTab('alerts')}
          >
            Alerts
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedTab === 'networks' ? (
            /* Network List */
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Detected Networks</h2>
                <div className="space-y-4">
                  {networks.map((network) => (
                    <div
                      key={network.bssid}
                      className={`p-4 rounded-lg ${
                        network.suspicious ? 'bg-red-900/50' : 'bg-gray-700/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-white">{network.ssid}</h3>
                            {network.encryption === 'WPA3' && (
                              <Lock className="h-4 w-4 text-green-400" />
                            )}
                            {network.suspicious && (
                              <AlertTriangle className="h-4 w-4 text-red-400" />
                            )}
                          </div>
                          <p className="text-sm text-gray-300">BSSID: {network.bssid}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="flex items-center space-x-1 text-sm text-gray-400">
                              <Radio className="h-4 w-4" />
                              <span>Ch {network.channel}</span>
                            </span>
                            <span className="flex items-center space-x-1 text-sm text-gray-400">
                              <Users className="h-4 w-4" />
                              <span>{network.clients} clients</span>
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <Signal className="h-4 w-4 text-indigo-400" />
                            <p className="text-sm text-gray-300">{network.signalStrength} dBm</p>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{network.encryption}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Alerts */
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Security Alerts</h2>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg ${
                        alert.severity === 'Critical'
                          ? 'bg-red-900/50'
                          : alert.severity === 'High'
                          ? 'bg-orange-900/50'
                          : 'bg-yellow-900/50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-white">{alert.type}</h3>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                alert.severity === 'Critical'
                                  ? 'bg-red-800 text-red-100'
                                  : alert.severity === 'High'
                                  ? 'bg-orange-800 text-orange-100'
                                  : 'bg-yellow-800 text-yellow-100'
                              }`}
                            >
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mt-2">{alert.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <p className="text-sm text-gray-400">
                              Network: {alert.network}
                            </p>
                            <p className="text-sm text-gray-400">
                              Status: {alert.status}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  trend: number;
}

function StatCard({ icon, title, value, trend }: StatCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-semibold mt-1 text-white">{value}</p>
          <div className={`flex items-center space-x-1 mt-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            <span className="text-sm">{trend > 0 ? '+' : ''}{trend}</span>
            <span className="text-xs">vs last hour</span>
          </div>
        </div>
        {icon}
      </div>
    </div>
  );
}