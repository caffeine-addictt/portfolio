
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
  technologies: SkillsItem[];
  timeframe: {
    start: Date;
    end?: Date;
  };
}


export interface SkillsItem {
  name: string;
  href: string;
  start_time: ReturnType<typeof Date.prototype.toISOString>;
  icon: {
    dark: any;
    light: any;
  }
}
