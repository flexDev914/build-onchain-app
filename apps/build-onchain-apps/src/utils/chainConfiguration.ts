import { baseSepolia, Chain, base, sepolia, mainnet } from 'viem/chains';
import { getCurrentEnvironment } from './configuration';
import { Environment } from './environment';

// Note: To access ENS Mainnet info, make sure to keep Mainnet
// in the list of chains supported by the current environment.

// The list of supported Chains for a given environment
export const supportedChains = new Map<Environment, Chain[]>([
  [Environment.localhost, [baseSepolia, sepolia, mainnet]],
  [Environment.development, [baseSepolia, sepolia, mainnet]],
  [Environment.staging, [base, mainnet]],
  [Environment.production, [base, mainnet]],
]);

/**
 * Gets the list of supported chains for a given environment.  Defaults to the current environment.
 * @param env
 */
export function getChainsForEnvironment(env?: Environment): Chain[] | undefined {
  if (!env) {
    env = getCurrentEnvironment();
  }
  return supportedChains.get(env);
}

export function getChainById(chainId: string) {
  const chains = getChainsForEnvironment();
  return chains?.find((c: Chain) => c.id === Number(chainId)) ?? null;
}
