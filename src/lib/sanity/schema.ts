
export interface ProjectItem {
  slug: string;
  title: string;
  description: {
    short: string;
    long: any[];
  };
  images: {
    image?: any;
    icon?: any;
  };
  links: {
    demo?: string;
    repo?: string;
    extra: {
      title: string;
      url: string;
    };
  };
  technologies: any[];
  timeframe: {
    start: Date;
    end?: Date;
  };
}
