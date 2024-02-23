import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CodeBlock from '@/components/code-block/CodeBlock';

const codeStep1 = `\`\`\`bash
$ npx @coinbase/build-onchain-apps@latest create`;

const codeStep3 = `\`\`\`bash
# Install dependencies
yarn

# Run onchain app
yarn dev`;

type TableOfContentsProps = {
  title: {
    href: string;
    label: string;
  };
  contents: {
    href: string;
    label: string;
  }[];
};

function TableOfContents({ title, contents }: TableOfContentsProps) {
  const pathname = usePathname();
  return (
    <aside className="relative hidden xl:block">
      <nav className="sticky top-28 flex flex-col gap-2 border-s-2 py-2 ps-4">
        <h2 className="text-base font-bold">
          <a href={title.href} className="no-underline">
            {title.label}
          </a>
        </h2>
        <ul className="flex flex-col gap-2">
          {contents.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                data-active={pathname.includes(href)}
                className="text-base text-sm font-normal text-zinc-400 no-underline underline-offset-2 hover:underline data-[active=true]:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function H3({ id, children }: { id?: string; children: string }) {
  return (
    <h3 id={id} className="mt-8 scroll-mt-28 text-4xl font-medium text-white">
      {children}
    </h3>
  );
}

function Section({
  id,
  title,
  subtext,
  children,
}: {
  id: string;
  title: string;
  subtext: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-10 flex scroll-mt-28 flex-col">
      <h4 className="text-xl font-normal text-white">{title}</h4>
      <p className="my-4 text-base font-normal text-zinc-400">{subtext}</p>
      {children}
    </section>
  );
}

const tocContent = [
  {
    href: '#step-1',
    label: 'Step 1: Create your onchain app',
  },
  {
    href: '#step-2',
    label: 'Step 2: Run your onchain app',
  },
];

export default function Guide() {
  useEffect(() => {
    function convertRemToPixels(rem: number) {
      return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    function handleScroll() {
      const pageYOffset = window.scrollY;
      let newActiveSectionId = null;

      window.document.querySelectorAll('section[id]').forEach((section) => {
        const sectionOffsetTop = (section as HTMLElement).offsetTop;

        if (pageYOffset >= sectionOffsetTop - convertRemToPixels(7)) {
          newActiveSectionId = section.id;
        }
      });

      window.document
        .querySelectorAll(`aside nav li a[href]`)
        .forEach((linkItem) => linkItem.setAttribute('data-active', 'false'));

      window.document
        .querySelector(`nav li a[href="#${newActiveSectionId}"]`)
        ?.setAttribute('data-active', 'true');
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <H3 id="get-started">Getting started</H3>
      <div className="space-between flex gap-8">
        <div className="w-full">
          <hr className="mt-2 h-px bg-white" />
          {[
            {
              id: 'step-1',
              title: 'Step 1',
              subtext: 'Create your onchain app',
              codeBlock: <CodeBlock code={codeStep1} />,
            },
            {
              id: 'step-2',
              title: 'Step 2',
              subtext: 'Run your onchain app',
              codeBlock: <CodeBlock code={codeStep3} />,
            },
          ].map(({ id, title, subtext, codeBlock }) => (
            <Section key={id} id={id} title={title} subtext={subtext}>
              {codeBlock}
            </Section>
          ))}
        </div>

        <TableOfContents
          title={{
            href: '#get-started',
            label: 'Getting Started',
          }}
          contents={tocContent}
        />
      </div>
    </>
  );
}
