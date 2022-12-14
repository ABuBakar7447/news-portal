

const loadNews = async () => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url);
        const data = await res.json();
        addNews(data.data.news_category)
    }

    catch (error) {
        console.log(error)

    }

}

const addNews = news => {
    const newsTopic = document.getElementById('newsTopic-container');
    
    news.forEach(neWs => {
        const newsDiv = document.createElement('div');
        
        newsDiv.innerHTML = `
        
        <a class="nav-link fw-bold text-dark hober" onclick="loadNewsDetails('${neWs.category_id ? neWs.category_id : 'No Data Found'}'); togglespinner(true);">${neWs.category_name ? neWs.category_name : 'No Data Found'}</a>
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
        const dataitem = data.data.length;
        totalDataitem(dataitem);
    }

    catch (error) {
        console.log('there is something fishy')

    }

}

const insideNewsDetails = details => {
    const newsDetails = document.getElementById('newsDetails-container');

    newsDetails.innerHTML = '';
    // console.log(details.length);

    details.forEach(detail =>{
        
        const newsDetailsDiv = document.createElement('div');
        newsDetailsDiv.classList.add('col-lg-12', 'col-md-12', 'col-sm-12', 'd-lg-flex', 'd-md-flex');

        
            newsDetailsDiv.innerHTML = `
            <div class="col-lg-4 col-md-4 col-sm-12">
                <img class="w-100 h-100" src="${detail.thumbnail_url
                    ? detail.thumbnail_url
                    : 'No Data Found'}" alt="">
            </div>
            <div class="col-lg-8 col-md-8 col-sm-12 border border-light border-3 rounded px-2 py-4 text-start">
                <h4>${detail.title ? detail.title : 'No Data Found'}</h4>

                <div class="w-100 block-ellipsis >
                    <p class=" h6 fw-semi-bold text-black-50 ">
                    ${detail.details ? detail.details.slice(0,300)+'...' : 'No Data Found'}
                    </p>
                </div>
                

                

                    <div class="row mt-5">
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <div class="row">
                                <div class="col">
                                    <img class="img-fluid rounded-circle" src="${detail.author ? detail.author.img : 'No Data Found'}" alt="">
                                </div>
                                <div class="col">
                                    <p class"">${detail.author ? detail.author.name : 'No Data Found'}<br>${detail.author ? detail.author.published_date : 'No Data Found'}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col mt-4">
                            <div class="row text-center">
                                <div class="col ">
                                    
                                    <p class""><i class="fa-regular fa-eye"></i><span class"ms-5">${detail.total_view ? detail.total_view : 'No Data Found'}</span></p>
                                
                                    
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
                                <button onclick="modalData('${detail._id}')" class="border border-0" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
                                    
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>

                </div>
                    
            </div>
        `
        newsDetails.appendChild(newsDetailsDiv);
        
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

const totalDataitem = itemCount =>{
    const categoryItemDiv = document.getElementById('category-item')
    if (itemCount == 0){
        togglespinner(false)
    }
    
    categoryItemDiv.innerText = `${itemCount} items total found`
}

const modalData = async(data0fModal) =>{
    try {
        const url = `https://openapi.programming-hero.com/api/news/${data0fModal}`;
        const res = await fetch(url);
        const data = await res.json();
        insideModalDetails(data.data);
        
        
    }

    catch (error) {
        console.log(error)

    }
}

const insideModalDetails = modalDatas =>{
    
    const modalTittle = document.getElementById('exampleModalLabel');
    const modalBody = document.getElementById('modal-data');
    modalDatas.forEach(modata=>{
        modalTittle.innerText = modata.title;

        modalBody.innerHTML = `
        <img class="img-fluid" src="${modata.image_url ? modata.image_url : 'No Data Found'}" alt="">
        <p class="">Author Name : ${modata.author ? modata.author.name : 'No author name found' }</p>
        <p class="">Published : ${modata.author ? modata.author.published_date : 'No publish date found'}</p>
        <p class="">Rating : ${modata.rating ? modata.rating.number : 'No rating found'}, Badge : ${modata.rating ? modata.rating.badge : 'No badge found'}</p>
        <p class="">Total View : ${modata.total_view ? modata.total_view : 'No view found'}</p>
        `

    })
    
    
}


loadNews();
loadNewsDetails('01')