// Projectitems
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
    extra?: {
      title: string;
      url: string;
    }[];
  };
  technologies: SkillsItem[];
  timeframe: {
    start: ReturnType<typeof Date.prototype.toISOString>;
    end?: ReturnType<typeof Date.prototype.toISOString>;
  };
}

export const ensureProjectItem = (proj: ProjectItem): ProjectItem =>
  ({
    slug: proj.slug || '',
    title: proj.title || '',
    description: {
      short: proj.description?.short || '',
      long: proj.description?.long || [],
    },
    images: proj.images || {},
    links: proj.links || {},
    technologies: proj.technologies
      ? proj.technologies.map((skill) => ensureSkillsItem(skill))
      : [],
    timeframe: {
      ...proj.timeframe,
      start: proj.timeframe.start || '',
    },
  }) satisfies ProjectItem;

// Blogs
export interface BlogItem {
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
  estimatedReadingTime: number;
  technologies: SkillsItem[];
  timeframe: {
    published: ReturnType<typeof Date.prototype.toISOString>;
    updated: ReturnType<typeof Date.prototype.toISOString>;
  };
}

export const ensureBlogItem = (blog: BlogItem): BlogItem =>
  ({
    slug: blog.slug || '',
    title: blog.title || '',
    description: {
      short: blog.description?.short || '',
      long: blog.description?.long || [],
    },
    images: blog.images || {},
    estimatedReadingTime: blog.estimatedReadingTime || 0,
    technologies: blog.technologies
      ? blog.technologies.map((skill) => ensureSkillsItem(skill))
      : [],
    timeframe: {
      ...blog.timeframe,
      published: blog.timeframe.published || '',
      updated: blog.timeframe.updated || '',
    },
  }) satisfies BlogItem;

// SkillsItems
export interface SkillsItem {
  name: string;
  href: string;
  start_time: ReturnType<typeof Date.prototype.toISOString>;
  icon: {
    dark: any;
    light: any;
  };
}

export const ensureSkillsItem = (skill: SkillsItem): SkillsItem =>
  ({
    name: skill.name || '',
    href: skill.href || '',
    start_time: skill.start_time || '',
    icon: skill.icon || {},
  }) satisfies SkillsItem;
