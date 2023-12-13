
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayBlogPost();
});

async function fetchAndDisplayBlogPost() {
    try {
        
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        if (!postId) {
            throw new Error('Post ID not provided in URL');
        }

        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching blog post. Status: ${response.status}`);
        }

        const blogPost = await response.json();

        const postDate = new Date(blogPost.date);
        const tags = blogPost.tags ? blogPost.tags.join(', ') : 'No tags';
        
        document.getElementById('postTitle').innerText = blogPost.title;
        document.getElementById('postAuthor').innerText = `Author: ${blogPost.author}`;
        document.getElementById('postDate').innerText = `Date: ${postDate.getFullYear()}-${postDate.getMonth() + 1}-${postDate.getDate()} ${postDate.toLocaleTimeString()}`;
        document.getElementById('postContent').innerText = blogPost.content;
        document.getElementById('postTags').innerText = `Tags: ${tags}`;
    } catch (error) {
        console.error(error);
    }
};
