 (() => { 
	"use strict";
	var __webpack_modules__ = ({

 "./src/web-data.js":
/*!*************************!*\
  !*** ./src/web-data.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var itemCatalog = [{
  name: "Fluffball",
  price: 0.99,
  imageUrl: "http://placekitten.com/150/150?image=1"
}, {
  name: "Meyhem",
  price: 3.14,
  imageUrl: "http://placekitten.com/150/150?image=2"
}, {
  name: "Charlie",
  price: 2.73,
  imageUrl: "http://placekitten.com/150/150?image=3"
}];
var itemImageMapping = {
  "Fluffball": "http://placekitten.com/50/50?image=1",
  "Meyhem": "http://placekitten.com/50/50?image=2",
  "Charlie": "http://placekitten.com/50/50?image=3"
};
var webpageData = {
  itemCatalog: itemCatalog,
  itemImageMapping: itemImageMapping
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (webpageData);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/web-shopping.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web-data */ "./src/web-data.js");


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



(function () {
  var itemCatalog = _web_data__WEBPACK_IMPORTED_MODULE_0__["default"].itemCatalog;
  var itemImageMapping = _web_data__WEBPACK_IMPORTED_MODULE_0__["default"].itemImageMapping;
  var PAGES = {
    PRODUCT: 'product'
  };

  var renderFor = _defineProperty({}, PAGES.PRODUCT, renderProducts);

  function calculateTotal() {
    var sum = 0;
    Object.entries(state.cart).map(function (product) {
      sum += product[1].quantity * product[1].price;
    });
    return sum;
  }

  var state = {
    cart: {},
    page: PAGES.PRODUCT,
    hideCartShow: false,
    viewCartShow: true,
    showCheckoutCart: true
  };
  var appEl = document.querySelector("#app");
  addEventListeners();
  render();

  function render() {
    renderFor[state.page]();
  }

  function getTotalItems() {
    var sum = 0;
    Object.entries(state.cart).map(function (item) {
      sum += item[1].quantity;
    });
    return sum;
  }

  function renderProducts() {
    var itemCards = itemCatalog.map(function (item, index) {
      return "<li class=\"product\">\n                <div class=\"card\">\n                    <img src=".concat(item.imageUrl, " alt=").concat(item.name, ">\n                     \n                        <form action=\"\" class=\"add-product\">             \n                            <span class=\"span1\" data-index=\"").concat(item.name, "\">").concat(item.name, "</span>\n                            <span class=\"span1\" data-index=\"").concat(item.price, "\">$").concat(item.price, "</span>\n                            <button data-index=").concat(index, " class=\"add-to-cart\" type=\"submit\">Add To Cart</button>\n                        </form>\n                    </div>\n                </li>");
    }).join('');
    var checkoutItemList = Object.entries(state.cart).map(function (item, index) {
      return "<li class=\"cart-item\"> \n                                        <img src=".concat(itemImageMapping[item[0]], " alt=").concat(item[0], ">\n                                        <span class=\"span\" > ").concat(item[0], " </span>\n                                        <input type=\"number\" min=\"0\" class=\"quantity-input\" data-index=\"").concat(index, "\" data-target=").concat(item[0], " value=\"").concat(item[1].quantity, "\">\n                                        <button data-index=\"").concat(index, "\" class=\"delete\" type=\"button\">X</button>\n                                </li>");
    }).join('');
    var noOfItems = getTotalItems();
    var cartTotal = Number.parseFloat(calculateTotal()).toFixed(2);
    var viewCartStatus = !state.viewCartShow ? "hidden" : "";
    var hideCartStatus = !state.hideCartShow ? "hidden" : "";
    var checkoutStatus = !state.showCheckoutCart ? "hidden" : "";
    var messageToShow = "";

    if (cartTotal > 0) {
      messageToShow = "Total Price : $".concat(cartTotal);
      checkoutStatus = "";
    } else {
      messageToShow = "Please, add an item to the cart";
      checkoutStatus = "hidden";
    }

    appEl.innerHTML = "\n            <nav class=\"nav\">\n                <ol class=\"item-menu\">\n                    <li><button class=\"view-cart page ".concat(viewCartStatus, "\" data-target=\"view-cart\">View Cart(").concat(noOfItems, ")</button></li>\n                    <li><button class=\"hide-cart page ").concat(hideCartStatus, "\" data-target=\"hide-cart\">Hide Cart</button></li>\n                </ol>\n\n            </nav>\n            <ul class=\"products\">\n                ").concat(itemCards, "\n            </ul>\n            <div class=\"checkout-area\">\n                <ul class=\"checkout-items ").concat(hideCartStatus, "\">\n                    ").concat(checkoutItemList, "\n                </ul>\n                <span class=\"span2 ").concat(hideCartStatus, "\"> ").concat(messageToShow, " </span>\n                <button class=\"checkout-btn ").concat(checkoutStatus, " ").concat(hideCartStatus, "\" data-target=\"checkout\">Checkout</buttton>\n            </div>    \n        ");
  }

  function addEventListeners() {
    appEl.addEventListener('click', function (e) {
      if (e.target.classList.contains('add-to-cart')) {
        var index = e.target.dataset.index;
        var productObj = itemCatalog[index];

        if (state.cart[productObj.name] === undefined) {
          state.cart[productObj.name] = {
            quantity: 1,
            price: productObj.price
          };
        } else {
          state.cart[productObj.name]['quantity']++;
        }

        render();
        return;
      }

      if (e.target.classList.contains('page')) {
        var target = e.target.dataset.target;
        console.log("Selected Traget : ", target);

        if (target == 'view-cart') {
          console.log("Clicked View Cart Button");
          state.hideCartShow = true;
          state.viewCartShow = false;
        } else {
          console.log("Clicked Hide Cart Button");
          state.hideCartShow = false;
          state.viewCartShow = true;
        }

        render();
        return;
      }

      if (e.target.classList.contains('checkout-btn')) {
        console.log("Clicked Checkout Button");
        state.showCheckoutCart = false;
        state.cart = {};
        render();
        return;
      }

      if (e.target.classList.contains('quantity-input')) {
        var _target = e.target.dataset.target;
        var inputQuantity = document.querySelector("[data-target=\"".concat(_target, "\"]")).value;
        state.cart[_target]['quantity'] = parseInt(inputQuantity);

        if (parseInt(inputQuantity) === 0) {
          state.cart = Object.keys(state.cart).filter(function (key) {
            return key !== _target;
          }).reduce(function (obj, key) {
            obj[key] = state.cart[key];
            return obj;
          }, {});
        }

        render();
        return;
      }

      if (e.target.classList.contains('delete')) {
        var _index = e.target.dataset.index;

        var deleteKey = Object.keys(state.cart)[_index];

        state.cart = Object.keys(state.cart).filter(function (key) {
          return key !== deleteKey;
        }).reduce(function (obj, key) {
          obj[key] = state.cart[key];
          return obj;
        }, {});
        render();
        return;
      }
    });
  }
})();
})();

/******/ })()
;
//# sourceMappingURL=web-shopping.js.map