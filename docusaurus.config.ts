import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ANHTUANK7C',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://anhtuank7c.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'anhtuank7c', // Usually your GitHub org/user name.
  projectName: 'anhtuank7c.github.io', // Usually your repo name.

  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/anhtuank7c/anhtuank7c.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/anhtuank7c/anhtuank7c.github.io/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        googleTagManager: {
          containerId: 'G-2MJXZZ175P'
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content: 'anhtuank7c, reactjs, react native, expo, svelte, sveltekit, solid principles, clean architecture, tutorials, dev, lập trình'
      },
    ],
    headTags: [
      {
        tagName: 'script',
        attributes: {
          type: 'application/ld+json'
        },
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Person',
          familyName: 'Nguyễn Anh',
          givenName: 'Tuấn',
          name: "Tuấn",
          jobTitle: "Senior Software Engineering",
          colleague: [
            "https://www.youtube.com/@anhtuank7c",
            "https://tiktok.com/@anhtuank7c",
            "https://twitter.com/anhtuank7c",
            "https://www.facebook.com/tuanna065",
            "https://www.github.com/anhtuank7c",
          ],
          offers: {
            "@type": "Offer",
            url: "/pricing",
            price: 30,
            priceCurrency: "USD",
            avaibility: "https://schema.org/InStock"
          },
          email: "mailto:anhtuank7c@hotmail.com",
          url: 'https://anhtuank7c.dev/',
          address: {
            "@type": "PostalAddress",
            addressLocality: "Quảng Ninh",
            addressRegion: "QN",
            postalCode: "02211",
            streetAddress: "63 Vạn Triều, Minh Thành, Quảng Yên, Quảng Ninh, Việt Nam"
          },
        })
      }
    ],
    // Replace with your project's social card
    image: 'img/anhtuank7c-cover.webp',
    navbar: {
      title: 'ANHTUANK7C',
      logo: {
        alt: 'ANHTUANK7C Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://www.youtube.com/@anhtuank7c',
          label: 'Youtube',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'About',
        //   items: [
        //     {
        //       label: 'My Resume',
        //       to: '/resume',
        //     },
        //   ],
        // },
        {
          title: 'Follow',
          items: [
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/@anhtuank7c',
            },
            {
              label: 'Tiktok',
              href: 'https://www.tiktok.com/@anhtuank7c',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/anhtuank7c',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/tuanna065',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/anhtuank7c',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Nguyễn Anh Tuấn`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
