'use strict';
if (document.getElementById('home')) {
    window.onload = async () => {
        console.log('RR');
        //let LoggedIn = localStorage.getItem('loggedIn');
        let cart = localStorage.getItem('cart');
        let api = await fetch(`/products`);
        let results = await api.json();
        for (let i = 10-1; i > 5; i--) {
            let item = results[i];
            let name = item.product_name;
            let image = item.image1;
            let id = item.product_id;
            let desc = item.description;
            let price = item.price;
            addProducts(name, image,id, desc, price);
        };
        // Login
        let loginApi = await fetch('http://127.0.0.1:3000/user');
        let loginResult = await loginApi.json();
        let currentLoggedIn = {
            id: loginResult.id,
            provider : loginResult.provider,
            name : loginResult.name,
            mail : loginResult.emails[0].value,
            avatar : loginResult.picture
        };
        localStorage.setItem('loggedIn', JSON.stringify(currentLoggedIn));
    }
}
if(document.getElementById('single_product')){
    window.onload = async () =>{
        let params = new URLSearchParams(window.location.search);
        let productIdParam = params.get('id');
        let api = await fetch(`/singleProductData?id=${productIdParam}`)
        .then(resp => resp.json())
        .then(data => {
            document.querySelector('.mainImage').src =
            `../img/squarImg/${data[0].image1}`;
            document.querySelector('.small_img1').src =
            `../img/squarImg/${data[0].image1}`;
            document.querySelector('.small_img2').src =
            `../img/squarImg/${data[0].image2}`;
            document.querySelector('.small_img3').src =
            `../img/squarImg/${data[0].image3}`;


            let productTitle = document.querySelector('#productTitle');
            let productPrice = document.querySelector('#productPrice');
            let productDescription = document.querySelector('#productDescription');
    
            productTitle.innerHTML = data[0].product_name;
            productPrice.innerHTML = `€${data[0].price}`;
            productDescription.innerHTML = data[0].description;
        });
    }
}

/**
 *  Functions
 **/
//  Add products on home page
function addProducts(title, img,id,  desc, price) {
    let link = document.createElement('a');
    let productBox = document.createElement('div');
    productBox.classList.add('product__box');
    productBox.classList.add('col');
    productBox.style.backgroundImage = `url('../img/product/${img}')`
    productBox.style.backgroundPosition = "top";
    productBox.addEventListener('click', () =>{
        window.location.href = `../singleProduct?id=${id}`;
    })

    let productFooter = document.createElement('footer');
    let productTitle = document.createElement('h4');
    let productTitleContent = document.createTextNode(title);
    let productDescription = document.createElement('p');
    let productDescriptionContent = document.createTextNode(desc);

    let productRow = document.createElement('div');
    productRow.classList.add('row');
    let productPrice = document.createElement('p');
    let productPriceContent = document.createTextNode(`€${price}`);
    let productLink = document.createElement('a');
    productLink.classList.add('roundedBtn');
    let productLinkContent = document.createTextNode('Discover');
    productLink.appendChild(productLinkContent);

    productBox.appendChild(productRow);
    productTitle.appendChild(productTitleContent);
    productDescription.appendChild(productDescriptionContent);
    productFooter.appendChild(productTitle);
    productFooter.appendChild(productDescription);

    productRow.appendChild(productLink);
    productPrice.appendChild(productPriceContent)
    productRow.appendChild(productPrice);
    productFooter.appendChild(productRow);
    productBox.appendChild(productFooter);

    let productPresentation = document.querySelector('#presentation');
    productPresentation.appendChild(productBox);
}