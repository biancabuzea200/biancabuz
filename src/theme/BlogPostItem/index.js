import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogPostItem from '@theme-original/BlogPostItem';
import React, { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function BlogPostItemWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost();

  useEffect(() => {
    // On blog post page, remove intro thumbnail/preview and the decorative border
    if (isBlogPostPage && ExecutionEnvironment.canUseDOM) {
      // Select the rendered markdown article
      const article = document.querySelector('article');
      if (!article) return;

      // Locate the border divider that follows the excerpt
      const borderDiv = article.querySelector('div[style*="border-top"]');
      if (!borderDiv) return;

      // Remove every node that comes before the border (intro image, paragraphs, etc.)
      let node = borderDiv.previousSibling;
      while (node) {
        const prevNode = node.previousSibling;
        if (node.remove) {
          node.remove();
        }
        node = prevNode;
      }
      // Finally, remove the border itself
      borderDiv.remove();
    }
  }, [isBlogPostPage]);

  const containerStyle = !isBlogPostPage ? { marginBottom: '5rem' } : {};

  return (
    <>
      <div style={containerStyle}>
        <BlogPostItem {...props}>
          {props.children}
          {isBlogPostPage && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <a
                href="https://devreluni.substack.com/subscribe"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 2rem',
                  backgroundColor: '#ff6719',
                  color: 'white',
                  borderRadius: '0.375rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Subscribe to DevRel Uni
              </a>
            </div>
          )}
        </BlogPostItem>
      </div>
    </>
  );
}