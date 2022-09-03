

const loadNews = async () => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url);
        const data = await res.json();
        addNews(data.data.news_category)
    }

    catch (error) {
        console.log('there is something fishy')

    }

}

const addNews = news => {
    const newsTopic = document.getElementById('newsTopic-container');
    
    news.forEach(neWs => {
        const newsDiv = document.createElement('div');
        
        newsDiv.innerHTML = `
        
        <a class="nav-link fw-bold text-dark" href="#" oonclick="loadNewsDetails(${neWs.category_id})">${neWs.category_name}</a>
        
        `;
        newsTopic.appendChild(newsDiv);

    });
}

const loadNewsDetails = async (id) => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
    }

    catch (error) {
        console.log('there is something fishy')

    }

}


loadNews();