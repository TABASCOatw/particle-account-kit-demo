<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" />
  </a>
  <h3>
    Particle Account Kit Demo
  </h3>
</div>

⚡️ Demo application showcasing utilization of [Particle Auth](https://docs.particle.network/developers/auth-service) as a signer within Alchemy's **Account Kit** to facilitate interaction (gasless burn transaction & ownership transfer) of a Light Account instance.

Built using **Alchemy's AA-SDK**, **Particle Auth**, **Ethers**, **Viem**, and **Typescript**

## 🔑 Particle Auth
Particle Auth, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc.

##

👉 Try the demo: https://web-demo.particle.network/connectKit

👉 Learn more about Particle Network: https://particle.network

![Particle Auth Example](https://i.imgur.com/wYSP0sM.png)

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/TABASCOatw/particle-account-kit-demo.git
```

### Install dependencies
```
yarn install
```
OR
```
npm install
```

### Set environment variables
This project requires a number of keys from Particle Network and WalletConnect to be defined in `.env`. The following should be defined:
- `REACT_APP_APP_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `REACT_APP_PROJECT_ID`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `REACT_APP_CLIENT_KEY`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `ALCHEMY_API_KEY`, the API key of the application created in your [Alchemy dashboard](https://dashboard.alchemy.com/).
- `ALCHEMY_POLICY_ID`, the policy ID from a gas policy created within your [Alchemy dashboard](https://dashboard.alchemy.com/).

### Start the project
```
npm run dev
```
OR
```
yarn dev
```

##
Originally featured in "[Leveraging Alchemy's Account Kit with Particle WaaS](https://twitter.com/TABASCOweb3/status/1715034613184147721)"
