"use strict";
import webpageData from './web-data';

(function(){

    const { itemCatalog } = webpageData;
    const { itemImageMapping } = webpageData;

    const PAGES = {
        PRODUCT : 'product'
    };

    const renderFor = {
        [PAGES.PRODUCT]: renderProducts,
    };

    function calculateTotal(){
        let sum = 0;
        Object.entries(state.cart).map(product => {
            sum += (product[1].quantity * product[1].price);
          })
        return sum;
    }

    const state = {
        cart : {},
        page : PAGES.PRODUCT,
        hideCartShow : false,
        viewCartShow : true,
        showCheckoutCart : true 
    };

    
    const appEl = document.querySelector("#app");

    addEventListeners();
    render();

    function render() {
        renderFor[state.page]();
    }

    function getTotalItems(){
        let sum = 0;
        Object.entries(state.cart).map(item => {
            sum += (item[1].quantity);
            })
        return sum;
    }

    function renderProducts(){
        const itemCards = itemCatalog.map( (item, index) => {
            return `<li class="product">
                <div class="card">
                    <img src=${item.imageUrl} alt=${item.name}>
                     
                        <form action="" class="add-product">             
                            <span class="span1" data-index="${item.name}">${item.name}</span>
                            <span class="span1" data-index="${item.price}">$${item.price}</span>
                            <button data-index=${index} class="add-to-cart" type="submit">Add To Cart</button>
                        </form>
                    </div>
                </li>`;
        }).join('');

        const checkoutItemList = Object.entries(state.cart).map( (item, index) => {
                            return `<li class="cart-item"> 
                                        <img src=${itemImageMapping[item[0]]} alt=${item[0]}>
                                        <span class="span" > ${item[0]} </span>
                                        <input type="number" min="0" class="quantity-input" data-index="${index}" data-target=${item[0]} value="${item[1].quantity}">
                                        <button data-index="${index}" class="delete" type="button">X</button>
                                </li>`
                        }).join('');

        const noOfItems = getTotalItems();
        const cartTotal = Number.parseFloat(calculateTotal()).toFixed(2);
        const viewCartStatus = !state.viewCartShow ? "hidden" : "";
        const hideCartStatus = !state.hideCartShow ? "hidden" : "";
        let checkoutStatus = !state.showCheckoutCart ? "hidden" : "";
        let messageToShow = "";
        if(cartTotal > 0){
            messageToShow = `Total Price : $${cartTotal}`;
            checkoutStatus = "";
        }else{
            messageToShow = "Please, add an item to the cart";
            checkoutStatus = "hidden";
        }


        appEl.innerHTML = `
            <nav class="nav">
                <ol class="item-menu">
                    <li><button class="view-cart page ${viewCartStatus}" data-target="view-cart">View Cart(${noOfItems})</button></li>
                    <li><button class="hide-cart page ${hideCartStatus}" data-target="hide-cart">Hide Cart</button></li>
                </ol>

            </nav>
            <ul class="products">
                ${itemCards}
            </ul>
            <div class="checkout-area">
                <ul class="checkout-items ${hideCartStatus}">
                    ${checkoutItemList}
                </ul>
                <span class="span2 ${hideCartStatus}"> ${messageToShow} </span>
                <button class="checkout-btn ${checkoutStatus} ${hideCartStatus}" data-target="checkout">Checkout</buttton>
            </div>    
        `;
    }

    function addEventListeners(){
        appEl.addEventListener('click', (e)=>{
            if( e.target.classList.contains('add-to-cart') ){
                const index = e.target.dataset.index;
                const productObj = itemCatalog[index];
                if (state.cart[productObj.name] === undefined){
                    state.cart[productObj.name] = {quantity : 1, price : productObj.price};
                }
                else{
                    state.cart[productObj.name]['quantity']++;
                }
                render();
                return;
            }

            if(e.target.classList.contains('page')){
                const target = e.target.dataset.target;
                
                if (target == 'view-cart'){
                 
                    state.hideCartShow = true;
                    state.viewCartShow = false;
                }else{
                   
                    state.hideCartShow = false;
                    state.viewCartShow = true;
                }
                render();
                return;
            }

            if(e.target.classList.contains('checkout-btn')){
               
                state.showCheckoutCart = false;
                state.cart = {};
                render();
                return;
            }

            if(e.target.classList.contains('quantity-input')){
                const target = e.target.dataset.target;
                const inputQuantity = document.querySelector(`[data-target="${target}"]`).value;
                state.cart[target]['quantity'] = parseInt(inputQuantity);
                if (parseInt(inputQuantity) === 0){
                    state.cart = Object.keys(state.cart).filter(key =>
                        key !== target).reduce((obj, key) =>
                        {
                            obj[key] = state.cart[key];
                            return obj;
                        }, {}
                    );
                }
                
                render();
                return;
            }

            if( e.target.classList.contains('delete')){
                const index = e.target.dataset.index;
                const deleteKey = Object.keys(state.cart)[index];
                state.cart = Object.keys(state.cart).filter(key =>
                    key !== deleteKey).reduce((obj, key) =>
                    {
                        obj[key] = state.cart[key];
                        return obj;
                    }, {}
                );
                render();
                return;
            }
        });
    }
    

})();


