
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayBlogPosts();
});

async function fetchAndDisplayBlogPosts() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');

        if (!response.ok) {
            throw new Error(`Error fetching blog posts. Status: ${response.status}`);
        }

        const blogPosts = await response.json();
        console.log('Blog Posts:', blogPosts);

        const blogList = document.getElementById('blogList');
        blogPosts.forEach(post => {
            const listItem = document.createElement('li');
            
            const postDate = new Date(post.date);

            listItem.innerHTML = `
                <h2>${post.title}</h2>
                <p>Author: ${post.author}</p>
                <p>Date: ${postDate.getFullYear()}-${postDate.getMonth()+1}-${postDate.getDate()} ${postDate.toLocaleTimeString()}</p>
                <p>${post.content.substring(0, 100)}...</p>
                <p>Tags: ${post.tags ? post.tags.join(', ') : 'No tags'}</p>
                <a href="post.html?id=${post._id}">Read more...</a>
            `;
            blogList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
    }
}
