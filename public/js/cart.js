'use strict';

/*************************
 *     Add to cart       *
 *************************/
if (document.getElementById('single_product')) {
    document.querySelector('#addToCart').addEventListener('click', () => {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');

        if (localStorage.getItem('cart') == null) {
            let cart = [];
            cart.push(id);
            localStorage.setItem('cart', cart);
            console.log(localStorage.getItem('cart'));
        } else {
            let storedCart = localStorage.getItem('cart');
            let cart = storedCart.split(',');
            cart.push(id);
            localStorage.clear();
            localStorage.setItem('cart', cart);
        }
    });
}
/***********************
 *      cart page      *
 ***********************/
if (document.getElementById('cart')) {
    window.onload = async () => {
        let products = localStorage.getItem('cart').split(',').sort();
        let next = 1;
        let qty = 0;
        let tempItem = 0;
        let tempQty = 0;
        let subTotal = 0.0;
        for (let item of products) {
            item = parseInt(item);
            if (item == products[next]) {
                qty++;
                next++;
                tempItem = item;
                tempQty = qty;
            } else {
                if (item == tempItem) {
                    tempQty++;
                    let api = await fetch(`/singleProductData?id=${item}`);
                    let results = await api.json();
                    let img = results[0].image2;
                    let title = results[0].product_name;
                    let price = results[0].price;
                    subTotal += parseFloat(price);
                    subTotal *= tempQty;
                    addProdcutInCart(item, img, title, price, tempQty);
                    tempItem = 0;
                    tempQty = 0;
                } else {
                    qty++;

                    let api = await fetch(`/singleProductData?id=${item}`);
                    let results = await api.json();
                    let img = results[0].image2;
                    let title = results[0].product_name;
                    let price = results[0].price;
                    subTotal += parseFloat(price);
                    subTotal *= qty;
                    addProdcutInCart(item, img, title, price, qty);
                }
                qty = 0;
                next++;

            }
        }
        document.querySelector('#subTotal').innerHTML = `${subTotal.toFixed(2)}`;

        let trashes = document.querySelectorAll('.fa-trash-alt');
        for (let i = 0; i < trashes.length; i++) {
            trashes[i].addEventListener('click', () => {
                let values = document.querySelectorAll('.qty_value');
                let tempValue = values[i].innerHTML;
                tempValue -= 1;
                values[i].innerHTML = tempValue;
                let temp = document.querySelectorAll('.italic')[i].innerHTML;
                let substract = parseFloat(temp.slice(1, temp.length));
                subTotal -= parseFloat(substract);
                document.querySelector('#subTotal').innerHTML = subTotal.toFixed(2);
                let cartViews = document.querySelectorAll('.cart__view');

                if (products.includes(cartViews[i].id)) {
                    let index = products.indexOf(cartViews[i].id);
                    products[index] = -1;
                }

                if (tempValue == 0) {
                    cartViews[i].style.display = "none";
                }
                products = products.sort();
                products = products.reverse();
                while (products.includes(-1)) {
                    products.pop();
                    console.log(products)
                }
                localStorage.setItem('cart', products);
                console.log(`FINAL: ${products}`);
            })
        }
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            //localStorage.removeItem('cart');
            //window.location.href = "../checkout";

            let customerId = JSON.parse(localStorage.loggedIn).id;
            customerId = customerId.slice(6,customerId.length);
            console.log(customerId);
            let rr = document.getElementById('subTotal').innerHTML;
            let orderObj ={
                custId :customerId,
                totalPrice : document.getElementById('subTotal').innerHTML
            }

            fetch('/newOrder', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderObj)
            }).then(data => {
                console.log("Order ID created: ", data);
            }).catch(err => {
                console.error("Order ID not created: ", err);
            });


            //POST request
            console.log("List of products: " + products);
            next = 1;
            let order = {};
            for (let item of products) {
                if (item == products[next]) {
                    next++;
                } else {
                    let el = document.getElementById(parseInt(item));
                    console.log(el);
                    order = {
                        custId: customerId,
                        id: el.getAttribute('id'),
                        price: el.getAttribute('price'),
                        quantity: el.getAttribute('qty'),
                        total: el.getAttribute('price') * el.getAttribute('qty')
                    };
                    console.log(order);
                    fetch('/newOrderProduct', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(order)
                    }).then(data => {
                        console.log("OrderProduct created: ", data);
                    }).catch(err => {
                        console.error("OrderProduct not created: ", err);
                    });
                    next++;
                }
            }
        });
    }
}
/***********************
 *      Checkout       *
 ***********************/
if (document.getElementById('checkout')) {
    window.onload = () => {
        document.getElementById('zoid-paypal-buttons-c0f19575b4_mte6ntm6mju').classList.add('hide');
    }
}
/*************************
 *     Add to cart       *
 *************************/
function addProdcutInCart(id, img, title, price, quantity) {
    let cartView = document.createElement('div');
    cartView.classList.add('cart__view');
    cartView.setAttribute('id', id);
    cartView.setAttribute('price', price);
    cartView.setAttribute('qty', quantity);

    cartView.classList.add('col');

    let cartItem = document.createElement('section');
    cartItem.classList.add('item');
    cartItem.classList.add('row');

    let link = document.createElement('a');
    link.href = `../singleProduct?id=${id}`
    let productImg = document.createElement('img');
    productImg.src = `../img/squarImg/${img}`;
    productImg.style.width = '60px';

    let cartData = document.createElement('div');
    cartData.classList.add('data');
    cartData.classList.add('col');

    let productName = document.createElement('p');
    productName.classList.add('bold');
    let productNameContent = document.createTextNode(title);
    productName.appendChild(productNameContent);

    let productPrice = document.createElement('p');
    productPrice.classList.add('italic');
    let productPriceContent = document.createTextNode(`€${price}`);
    productPrice.appendChild(productPriceContent);

    let qtyBox = document.createElement('div');
    qtyBox.classList.add('qty_box');
    qtyBox.classList.add('col');
    let qty = document.createElement('p');
    let qtyContent = document.createTextNode('Quantity');
    let qtyValue = document.createElement('p');
    qtyValue.classList.add('qty_value');
    let qtyValueContent = document.createTextNode(quantity);
    qtyValue.appendChild(qtyValueContent);
    qty.appendChild(qtyContent);

    let actionBox = document.createElement('div');
    actionBox.classList.add('action_box');
    actionBox.classList.add('row');
    let trash = document.createElement('a');
    trash.classList.add('fas');
    trash.classList.add('fa-trash-alt');


    let current = document.querySelector('#cartItems');
    actionBox.appendChild(trash);
    qtyBox.appendChild(qty);
    qtyBox.appendChild(qtyValue);
    cartData.appendChild(productPrice);
    cartData.appendChild(productName);
    link.appendChild(productImg);
    cartItem.appendChild(link);
    cartItem.appendChild(cartData);
    cartItem.appendChild(qtyBox);
    cartItem.appendChild(actionBox);
    cartView.appendChild(cartItem);
    link.appendChild(productImg);

    current.appendChild(cartView);
}