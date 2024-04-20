import { MetadataRoute } from 'next';
import { queryProjects, queryBlogs } from '@lib/sanity/client';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const [projects, blogs] = await Promise.all([
    queryProjects({
      fetchAll: true,
      lookingFor: ['"slug": slug.current'],
    }).catch((e) => console.log('Failed to fetch projects at sitemap' + e)),
    queryBlogs({ fetchAll: true, lookingFor: ['"slug": slug.current'] }).catch(
      (e) => console.log('Failed to fetch blogs at sitemap' + e),
    ),
  ]);

  const fetchedData: MetadataRoute.Sitemap = [];
  projects?.forEach((project) => {
    fetchedData.push({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${project.slug}`,
    });
  });
  blogs?.forEach((blog) => {
    fetchedData.push({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`,
    });
  });

  return [
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/up` },
    ...fetchedData,
  ] satisfies MetadataRoute.Sitemap;
};
export default sitemap;
