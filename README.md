# Wireless-Intrusion-Detection-System-WIDS-

Developing a Wireless Intrusion Detection System (WIDS) involves capturing Wi-Fi traffic in monitor mode to detect threats such as Evil Twin attacks, deauthentication (deauth) attacks, and WPA2 cracking attempts. Integrating tools like Zeek, Suricata, or AI models can enhance detection capabilities.

# Deployed at Netlify : 
https://fabulous-dieffenbachia-9d3a55.netlify.app/


The **Wireless Intrusion Detection System (WIDS)** project aims to monitor and analyze Wi-Fi traffic to detect potential security threats such as Evil Twin attacks, deauthentication (deauth) attacks, and WPA2 cracking attempts. By capturing Wi-Fi traffic in monitor mode and integrating with tools like Zeek, Suricata, or AI models, the system enhances its detection capabilities.

---

## **Table of Contents**

1. [Introduction](#introduction)
2. [Features](#features)
3. [System Requirements](#system-requirements)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [Detection Mechanisms](#detection-mechanisms)
8. [Integration with Zeek and Suricata](#integration-with-zeek-and-suricata)
9. [AI Model Integration](#ai-model-integration)
10. [Testing and Validation](#testing-and-validation)
11. [Contributing](#contributing)
12. [License](#license)
13. [Acknowledgements](#acknowledgements)

---

## **1. Introduction**

Wireless networks are susceptible to various security threats. This WIDS project is designed to monitor Wi-Fi traffic, detect malicious activities, and alert administrators in real-time. By leveraging packet capturing and analysis tools, the system provides a robust solution for wireless network security.

---

## **2. Features**

- **Real-Time Monitoring**: Continuously captures and analyzes Wi-Fi traffic.
- **Threat Detection**: Identifies Evil Twin attacks, deauth attacks, and WPA2 cracking attempts.
- **Integration**: Compatible with Zeek, Suricata, and AI models for enhanced analysis.
- **Alerting**: Notifies administrators upon detecting potential threats.

---

## **3. System Requirements**

- **Hardware**:
  - A computer with a wireless network interface card (NIC) that supports monitor mode.

- **Operating System**:
  - Linux-based distributions (e.g., Ubuntu, Kali Linux).

- **Software Dependencies**:
  - Python 3.x
  - Libpcap
  - Zeek (formerly Bro)
  - Suricata
  - AI/ML libraries (if integrating AI models)

---

## **4. Installation**

### **4.1. Clone the Repository**

```bash
git clone https://github.com/Karthikkkunal/Wireless-Intrusion-Detection-System-WIDS-.git
cd Wireless-Intrusion-Detection-System-WIDS-
```

### **4.2. Install Dependencies**

Ensure that Python 3.x and pip are installed on your system. Then, install the required Python packages:

```bash
pip install -r requirements.txt
```

### **4.3. Set Up Zeek and Suricata**

Follow the official installation guides for [Zeek](https://docs.zeek.org/en/current/install.html) and [Suricata](https://suricata.readthedocs.io/en/suricata-6.0.0/install.html) to set up these tools on your system.

---

## **5. Configuration**

Configure the system by editing the `config.yaml` file to specify parameters such as the network interface to monitor, alerting preferences, and integration settings for Zeek, Suricata, or AI models.

---

## **6. Usage**

1. **Start Monitoring**:
   - Run the main script to begin capturing and analyzing Wi-Fi traffic.

2. **View Alerts**:
   - Monitor the console or log files for alerts on detected threats.

3. **Analyze Data**:
   - Use integrated tools like Zeek or Suricata for in-depth traffic analysis.

---

## **7. Detection Mechanisms**

- **Evil Twin Attack Detection**:
  - Identifies multiple access points broadcasting the same SSID but with different MAC addresses.

- **Deauthentication Attack Detection**:
  - Detects an unusually high number of deauthentication frames within a short time frame.

- **WPA2 Cracking Attempt Detection**:
  - Monitors for patterns indicative of WPA2 handshake capture attempts.

---

## **8. Integration with Zeek and Suricata**

The system can forward captured traffic to Zeek and Suricata for advanced analysis:

- **Zeek**:
  - Processes traffic to identify complex attack patterns and generates detailed logs.

- **Suricata**:
  - Utilizes signature-based detection to identify known threats in the traffic.

---

## **9. AI Model Integration**

For enhanced detection capabilities, integrate AI models trained to recognize malicious traffic patterns:

1. **Data Collection**:
   - Gather labeled datasets of normal and malicious Wi-Fi traffic.

2. **Feature Extraction**:
   - Extract relevant features from the captured traffic for model training.

3. **Model Training**:
   - Train machine learning models using frameworks like TensorFlow or PyTorch.

4. **Deployment**:
   - Integrate the trained models into the detection pipeline for real-time analysis.

---

## **10. Testing and Validation**

To ensure the system's effectiveness:

- **Simulate Attacks**:
  - Conduct controlled tests by simulating Evil Twin, deauth, and WPA2 cracking attacks.

- **Evaluate Detection**:
  - Verify that the system accurately detects and alerts on these simulated threats.

- **Performance Monitoring**:
  - Assess the system's performance under various network conditions and loads.

---

## **11. Contributing**

Contributions are welcome! Please fork the repository, create a new branch for your feature or bug fix, and submit a pull 
