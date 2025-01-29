import { WifiNetwork, Alert, NetworkStats } from '../types';

// Enhanced network simulation with more realistic data
export function generateSimulatedNetworks(): WifiNetwork[] {
  const networks: WifiNetwork[] = [
    {
      ssid: 'Corporate-WiFi',
      bssid: '00:11:22:33:44:55',
      channel: 6,
      signalStrength: -55 + Math.floor(Math.random() * 10),
      encryption: 'WPA3',
      clients: 15 + Math.floor(Math.random() * 5),
      suspicious: false
    },
    {
      ssid: 'Corporate-WiFi',
      bssid: '00:11:22:33:44:56',
      channel: 6,
      signalStrength: -58 + Math.floor(Math.random() * 10),
      encryption: 'WPA2',
      clients: 2 + Math.floor(Math.random() * 3),
      suspicious: true
    },
    {
      ssid: 'Guest-Network',
      bssid: '00:11:22:33:44:57',
      channel: 11,
      signalStrength: -65 + Math.floor(Math.random() * 10),
      encryption: 'WPA2',
      clients: 8 + Math.floor(Math.random() * 4),
      suspicious: false
    },
    {
      ssid: 'IoT-Network',
      bssid: '00:11:22:33:44:58',
      channel: 1,
      signalStrength: -70 + Math.floor(Math.random() * 10),
      encryption: 'WPA2',
      clients: 12 + Math.floor(Math.random() * 6),
      suspicious: false
    },
    {
      ssid: 'Free-WiFi',
      bssid: '00:11:22:33:44:59',
      channel: 6,
      signalStrength: -75 + Math.floor(Math.random() * 10),
      encryption: 'Open',
      clients: 1 + Math.floor(Math.random() * 2),
      suspicious: true
    }
  ];
  
  return networks;
}

export function generateSimulatedAlerts(): Alert[] {
  const alerts: Alert[] = [
    {
      id: '1',
      timestamp: new Date(),
      type: 'Evil Twin',
      severity: 'Critical',
      description: 'Potential evil twin attack detected. Duplicate SSID with different BSSID.',
      network: 'Corporate-WiFi',
      status: 'New'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 1800000),
      type: 'Deauth Attack',
      severity: 'High',
      description: 'Multiple deauthentication frames detected from unauthorized device.',
      network: 'Guest-Network',
      status: 'Investigating'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 3600000),
      type: 'WPA Cracking',
      severity: 'Critical',
      description: 'Suspicious WPA handshake capture attempts detected.',
      network: 'IoT-Network',
      status: 'New'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 7200000),
      type: 'Rogue AP',
      severity: 'High',
      description: 'Unauthorized access point detected in the network vicinity.',
      network: 'Free-WiFi',
      status: 'New'
    }
  ];

  // Randomly remove some alerts to simulate dynamic updates
  return alerts.filter(() => Math.random() > 0.3);
}

export function generateNetworkStats(): NetworkStats {
  const baseStats = {
    totalNetworks: 5,
    authorizedAPs: 3,
    rogueAPs: 2,
    activeClients: 38,
    alertsLast24h: 4
  };

  // Add some random variation
  return {
    totalNetworks: baseStats.totalNetworks,
    authorizedAPs: baseStats.authorizedAPs,
    rogueAPs: baseStats.rogueAPs,
    activeClients: baseStats.activeClients + Math.floor(Math.random() * 10),
    alertsLast24h: baseStats.alertsLast24h + Math.floor(Math.random() * 3)
  };
}