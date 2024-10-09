export const fetchDataAndCreateMock = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const posts = await response.json();

        const mockData = posts.map((post: any, index: number) => {
            const randomRule = Math.floor(Math.random() * 10);

            return {
                id: post.id,
                image: `https://picsum.photos/200/300?random=${index + 1}`,
                productTitle: `Product${post.id}`,
                rules: randomRule,
                lastUpdate: new Date().toISOString(),
                status: randomRule !== 0 ? 'Active' : 'No Rule',
            };
        });

        return mockData;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};
