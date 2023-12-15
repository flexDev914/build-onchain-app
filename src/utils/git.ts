import { execSync } from 'child_process';

export function isGitInstalled() {
  try {
    execSync('git --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

export function initGit(appDir: string) {
  try {
    execSync('git init', { cwd: appDir, stdio: 'ignore' });
    execSync(
      'git submodule add https://github.com/openzeppelin/openzeppelin-contracts contracts/lib/openzeppelin-contracts',
      {
        cwd: appDir,
      }
    );
    execSync(
      'git submodule add https://github.com/foundry-rs/forge-std contracts/lib/forge-std',
      {
        cwd: appDir,
      }
    );
    return true;
  } catch (e) {
    return false;
  }
}
