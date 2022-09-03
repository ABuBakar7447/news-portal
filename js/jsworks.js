

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
        
        <a class="nav-link fw-bold text-dark" onclick="loadNewsDetails('${neWs.category_id}'); togglespinner(true);">${neWs.category_name}</a>
        `;
        
        
        newsTopic.appendChild(newsDiv);
        
        

    });
}


const loadNewsDetails = async (id) => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        insideNewsDetails(data.data);
        // console.log(data.data)
    }

    catch (error) {
        console.log('there is something fishy')

    }

}

const insideNewsDetails = details => {
    const newsDetails = document.getElementById('newsDetails-container');

    newsDetails.innerHTML = '';

    details.forEach(detail =>{
        
        const newsDetailsDiv = document.createElement('div');
        newsDetailsDiv.classList.add('col-lg-12', 'col-md-12', 'col-sm-12', 'd-lg-flex', 'd-md-flex');

        if(detail.length==0){
            newsDetailsDiv.innerHTML = `
            <p class=" h6 fw-semi-bold text-black-50">
                    Some quick example text to build on the title and make up the bulk of the card
            </p>
            `
        }
        else{
            newsDetailsDiv.innerHTML = `
            <div class="col-lg-4 col-md-4 col-sm-12">
                <img class="w-100 h-100" src="${detail.image_url}" alt="">
            </div>
            <div class="col-lg-8 col-md-8 col-sm-12 border border-light border-3 rounded px-2 py-4 text-start">
                <h4>${detail.title}</h4>

                <div class="w-100 block-ellipsis >
                    <p class=" h6 fw-semi-bold text-black-50 ">
                    ${detail.details.slice(0,300)+'...'}
                    </p>
                </div>
                

                

                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-12">
                            <div class="row">
                                <div class="col">
                                    <img class="img-fluid rounded-circle" src="${detail.author.img}" alt="">
                                </div>
                                <div class="col">
                                    <p class"">${detail.author.name}<br>${detail.author.published_date}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col mt-4">
                            <div class="row text-center">
                                <div class="col ">
                                    
                                    <p class""><i class="fa-regular fa-eye"></i><span class"ms-5">${detail.total_view}</span></p>
                                
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col mt-4">
                            <div class="row">
                                <div class="col">

                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                        
                                </div>
                                
                            </div>
                        </div>
                        <div class="col mt-4">
                            <div class="row">
                                <div class="col">
                                    <i class="fa-solid fa-arrow-right"></i>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>

                </div>
                    
            </div>
        `
        newsDetails.appendChild(newsDetailsDiv);
        }
        togglespinner(false)
    });
    
    
}

const togglespinner = isloading =>{
    const loaderSection = document.getElementById('loader')
    if(isloading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}



loadNews();