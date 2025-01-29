export interface WifiNetwork {
  ssid: string;
  bssid: string;
  channel: number;
  signalStrength: number;
  encryption: 'WPA2' | 'WPA3' | 'Open';
  clients: number;
  suspicious: boolean;
}

export interface Alert {
  id: string;
  timestamp: Date;
  type: 'Evil Twin' | 'Deauth Attack' | 'WPA Cracking' | 'Rogue AP';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  network: string;
  status: 'New' | 'Investigating' | 'Resolved';
}

export interface NetworkStats {
  totalNetworks: number;
  authorizedAPs: number;
  rogueAPs: number;
  activeClients: number;
  alertsLast24h: number;
}