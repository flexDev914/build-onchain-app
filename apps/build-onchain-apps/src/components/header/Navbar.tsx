import { forwardRef } from 'react';
import { ChevronDownIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import NextLink from 'next/link';
import styles from './Header.module.css';

export function NavbarLink({
  href,
  children,
  target,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
}) {
  return (
    <NextLink
      href={href}
      className={clsx('px-0', 'font-robotoMono text-white text-center text-base font-normal')}
      target={target}
    >
      {children}
    </NextLink>
  );
}

const ListItem = forwardRef(function ListItem(
  {
    children,
    target,
    href,
  }: {
    href: string;
    children: React.ReactNode;
    target?: string;
  },
  ref: React.Ref<HTMLAnchorElement>,
) {
  return (
    <div className="inline-flex items-center justify-start gap-8">
      <NavigationMenu.Link asChild className="flex items-center justify-start gap-1">
        <a
          href={href}
          className={clsx('font-robotoMono text-white text-base font-normal')}
          ref={ref}
          target={target}
        >
          {children}
        </a>
      </NavigationMenu.Link>
    </div>
  );
});

function Navbar() {
  return (
    <ul className="hidden items-center justify-start gap-8 md:flex">
      <li className="flex">
        <NavbarLink href="https://github.com/coinbase/build-onchain-apps" target="_blank">
          <GitHubLogoIcon width="24" height="24" />
        </NavbarLink>
      </li>
      <li className="flex">
        <NavbarLink href="/#get-started">Get Started</NavbarLink>
      </li>
      <li className="flex">
        <NavigationMenu.Root className="relative">
          <NavigationMenu.List className={clsx('flex flex-row space-x-2')}>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className={clsx(
                  styles.NavigationMenuTrigger,
                  'flex items-center justify-start gap-1',
                )}
              >
                <span className="font-robotoMono text-white text-center text-base font-normal">
                  Experiences
                </span>
                <ChevronDownIcon
                  className={clsx('transform transition duration-200 ease-in-out')}
                  width="16"
                  height="16"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content
                className={clsx(
                  'h-38 inline-flex w-48 flex-col items-start justify-start gap-6',
                  'bg-neutral-900 rounded-lg bg-opacity-90 p-6 shadow backdrop-blur-2xl',
                )}
              >
                <ListItem href="/buy-me-coffee">Buy Me Coffee</ListItem>
                <ListItem href="/mint">Mint NFT</ListItem>
                <ListItem href="/signature-mint">Signature Mint</ListItem>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.Viewport
            className={clsx('absolute flex justify-center', 'left-[-20%] top-[100%] w-[140%]')}
          />
        </NavigationMenu.Root>
      </li>
    </ul>
  );
}

export default Navbar;
