import app from '$/config/app.js';
import type { Post } from '$/routes/api/posts/types.js';

export async function GET({ fetch }) {
  const response = await fetch('api/posts');
  const posts: Post[] = await response.json();

  const headers = { 'Content-Type': 'application/xml' };

  const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${app.name} - Blog</title>
				<description>Learn more about ${app.name}</description>
				<link>${app.url}</link>
				<atom:link href="${app.url}/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
          .map(
            (post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.description}</description>
							<link>${app.url}/blog/${post.slug}</link>
							<guid isPermaLink="true">${app.url}/blog/${post.slug}</guid>
							<pubDate>${new Date(post.date).toUTCString()}</pubDate>
						</item>
					`
          )
          .join('')}
			</channel>
		</rss>
	`.trim();

  return new Response(xml, { headers });
}
