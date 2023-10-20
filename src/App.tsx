import React, { useState } from 'react';
import { ParticleNetwork } from '@particle-network/auth';
import { ParticleProvider } from '@particle-network/provider';
import { AlchemyProvider } from '@alchemy/aa-alchemy';
import { LightSmartContractAccount } from '@alchemy/aa-accounts';
import { WalletClientSigner } from '@alchemy/aa-core';

import { polygonMumbai } from 'viem/chains';
import { encodeFunctionData, createWalletClient, custom } from 'viem';
import { ethers } from 'ethers';

import { notification } from 'antd';
import './App.css';

const App: React.FC = () => {
  const [providerState, setProviderState] = useState<any>(null);
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [ownerAddress, setOwnerAddress] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  const handleLogin = async (preferredAuthType: 'google' | 'twitter') => {
    const particle = new ParticleNetwork({
      projectId: process.env.REACT_APP_PROJECT_ID!,
      clientKey: process.env.REACT_APP_CLIENT_KEY!,
      appId: process.env.REACT_APP_APP_ID!,
      chainName: 'polygon',
      chainId: 80001,
    });

    await particle.auth.login({ preferredAuthType });
    setUserInfo(particle.auth.getUserInfo());

    const provider = new AlchemyProvider({
      apiKey: process.env.ALCHEMY_API_KEY!,
      chain: polygonMumbai,
      entryPointAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    }).connect(rpcClient => new LightSmartContractAccount({
      entryPointAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
      chain: rpcClient.chain,
      owner: new WalletClientSigner(createWalletClient({ transport: custom(new ParticleProvider(particle.auth)) }), "particle"),
      factoryAddress: "0x000000893A26168158fbeaDD9335Be5bC96592E2",
      rpcClient,
    }));

    provider.withAlchemyGasManager({
      policyId: process.env.ALCHEMY_POLICY_ID!,
      entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
    });

    setProviderState(provider);
    setOwnerAddress(await provider.account.owner.getAddress());
    setAccountAddress(await provider.getAddress());
  };

  const getBalance = async () => {
    const balance = await providerState.request({ method: "eth_getBalance", params: [accountAddress] });
    notification.success({
      message: "getBalance successful",
      description: `${ethers.utils.formatEther(balance)} MATIC`
    });
  };

  const executeUserOperation = async () => {
    notification.info({
      message: "User operation pending...",
      duration: 10
    });

    const txHash = await providerState.sendTransaction({
      to: "0x000000000000000000000000000000000000dEaD",
      value: ethers.utils.parseUnits("0.001", "ether")
    });

    notification.success({
      message: "userOp successful",
      description: `Transaction hash: ${txHash}`
    });
  };

  const handleTransferOwnership = async () => {
    const result = await providerState.sendUserOperation({
      target: accountAddress,
      data: encodeFunctionData({
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "transferOwnership",
        args: ["ADDRESS_GOES_HERE"],
      }),
    });

    notification.success({
      message: "Ownership transferred"
    });
  };

  return (
    <div className="App">
      <div className="logo-section">
        <img className="logo" src="https://i.imgur.com/EerK7MS.png"/>
        <img className="logo" src="https://i.imgur.com/EylDr6H.png"/>
      </div>
      {providerState ? (
        <>
          <div className="profile-card">
            <h2>{userInfo.name}</h2>
            <div className="address-section">
              <span>Account Address: </span>
              <span className="address">{accountAddress}</span>
            </div>
            <div className="address-section">
              <span>Owner Address: </span>
              <span className="address">{ownerAddress}</span>
            </div>
            <button className="sign-button balance-button" onClick={getBalance}>Check Balance</button>
            <button 
              style={{ backgroundColor: 'darkblue', color: 'white', marginTop: '10px' }} 
              onClick={executeUserOperation}
            >
              Execute User Operation
            </button>
            <button 
                style={{ backgroundColor: 'red', color: 'white', marginTop: '10px' }} 
                onClick={handleTransferOwnership}
            >
                Transfer Ownership
            </button>

          </div>
        </>
      ) : (
        <div className="login-section">
          <button className="sign-button" onClick={() => handleLogin('google')}>Sign in with Google</button>
          <button className="sign-button" onClick={() => handleLogin('twitter')}>Sign in with Twitter</button>
        </div>
      )}
    </div>
  );
};

export default App;