export interface Configuration {
  frontPage: {
    paragraphs: string[];
  };
  nav: {
    links: NavLink[];
  };
  site: {
    name: string;
  };
  socials: {
    github: string;
    linkedin: string;
  };
  other: {
    sourceCodeUrl: string;
  };
}

export interface NavLink {
  text: string;
  href: string;
}


// ---
// frontPage:
//   paragraphs:
//     - Hi, I'm a software engineer located near Philadelphia PA. Here you'll find things I've learned, documented, and placed here for my reference and yours
// nav:  
//   links:
//     - text: Home
//       href: /
//     - text: Introduction
//       href: /p/john
//     - text: About
//       href: /p/a
// site:
//   name: Software Dev Tips
// socials:
//   github: https://github.com/J888
//   linkedin: https://www.linkedin.com/in/john-hyland-0/
// other:
//   sourceCodeUrl: https://github.com/J888/minimal-blog
