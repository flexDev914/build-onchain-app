import { SmartAccountClient } from 'permissionless';
import { PublicClient } from 'viem';

import { PaymasterBundlerABI } from '../_contracts/PaymasterBundlerABI';
import { NFTType } from '../types';

export default async function fetchNFTs(smartAccount: SmartAccountClient, client: PublicClient) {
  // Get # of NFTs owned by address
  const address = smartAccount.account?.address;

  const numTokens = await client.readContract({
    address: '0x66519FCAee1Ed65bc9e0aCc25cCD900668D3eD49',
    abi: PaymasterBundlerABI,
    functionName: 'balanceOf',
    args: [address],
  });

  // Get the token IDs and metadata by token ID
  var tokens = [] as string[];

  for (let i = 0; i < Number(numTokens); i++) {
    const tokenID = await client.readContract({
      address: '0x66519FCAee1Ed65bc9e0aCc25cCD900668D3eD49',
      abi: PaymasterBundlerABI,
      functionName: 'tokenOfOwnerByIndex',
      args: [address, i],
    });

    const tokenJSONLink = await client.readContract({
      address: '0x66519FCAee1Ed65bc9e0aCc25cCD900668D3eD49',
      abi: PaymasterBundlerABI,
      functionName: 'tokenURI',
      args: [Number(tokenID)],
    });

    tokens.push(tokenJSONLink as string);
  }

  const fetchOps = [] as Promise<unknown>[];
  const tokenJSONs = [] as NFTType[];

  tokens.forEach((token) => {
    fetchOps.push(
      (async () => {
        try {
          const tokenResponse = await fetch(token);
          const parsedToken = (await tokenResponse.json()) as NFTType;

          tokenJSONs.push(parsedToken);
        } catch (e) {
          console.error('Error parsing JSON');
        }
      })(),
    );
  });

  await Promise.all(fetchOps);

  return tokenJSONs;
}
