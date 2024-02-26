import * as fs from 'fs';
import * as path from 'path';
import { EnvVar } from './getUserInput';

export function setupEnvFiles(projectDir: string, envVar: EnvVar) {
  if (envVar === undefined) return;

  const envLocalPath = path.join(projectDir, './web/.env.local');
  const content = `
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
  NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=${
    envVar.walletConnectProjectID ?? 'NOT_CONFIGURED'
  }
  NEXT_PUBLIC_RPC_URL="GET_FROM_COINBASE_CLOUD"
  NEXT_PUBLIC_PAYMASTER_URL="GET_FROM_COINBASE_CLOUD"
  NEXT_PUBLIC_PRIVY_ID="GET_FROM_PRIVY"
  ENVIRONMENT=localhost
`;
  fs.writeFileSync(envLocalPath, content);

  const envPath = path.join(projectDir, './contracts/.env');
  const content2 = `PRIVATE_KEY=
BLOCK_EXPLORER_API_KEY=${envVar.blockExplorerApiKey ?? ''}
`;
  fs.writeFileSync(envPath, content2);
}
