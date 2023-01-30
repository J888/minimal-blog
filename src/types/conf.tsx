export interface Configuration {
  defaults: {
    post: {
      displayImage: {
        url: string;
      }
    }
  }
  frontPage: {
    paragraphs: string[];
  };
  nav: {
    logo: {
      desktop: string;
      mobile: string;
    }
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
