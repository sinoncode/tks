import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('about', 'routes/about.tsx'),
	route('services', 'routes/services.tsx'),
	route('services/:slug', 'routes/service-detail.tsx'),
	route('industries', 'routes/industries.tsx'),
	route('projects', 'routes/projects.tsx'),
	route('contact', 'routes/contact.tsx'),
	route('careers', 'routes/careers.tsx'),
	route('sitemap.xml', 'routes/sitemap.xml.ts'),
	route('robots.txt', 'routes/robots.txt.ts'),
	route('api/health', 'routes/api.health.ts'),
	route('api/*', 'routes/api.$.ts'),
	route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
