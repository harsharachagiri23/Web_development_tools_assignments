/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLIENT": () => (/* binding */ CLIENT),
/* harmony export */   "MESSAGES": () => (/* binding */ MESSAGES),
/* harmony export */   "SERVER": () => (/* binding */ SERVER)
/* harmony export */ });
var _MESSAGES;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Constants benefits
// - reduces risk of typos (IDE can code-complete)
// - easier to confirm it is correct (easier to check properties than strings)
// - If a value changes, you can change it in one place and the rest of the code can continue to use the constant
// Might be SERVER_CODES and CLIENT_CODES if we had more and different constants
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message-input'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = (_MESSAGES = {}, _defineProperty(_MESSAGES, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network.  Please try again'), _defineProperty(_MESSAGES, SERVER.AUTH_INSUFFICIENT, 'Your username/password combination does not match any records, please try again.'), _defineProperty(_MESSAGES, SERVER.REQUIRED_USERNAME, 'Please enter a valid (letters and/or numbers) username'), _defineProperty(_MESSAGES, SERVER.REQUIRED_MESSAGE, 'Please enter the task to do'), _defineProperty(_MESSAGES, "default", 'Something went wrong.  Please try again'), _MESSAGES);

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addAbilityToAddMessage": () => (/* binding */ addAbilityToAddMessage),
/* harmony export */   "addAbilityToLogin": () => (/* binding */ addAbilityToLogin),
/* harmony export */   "addAbilityToLogout": () => (/* binding */ addAbilityToLogout),
/* harmony export */   "addAbilityToRefresh": () => (/* binding */ addAbilityToRefresh),
/* harmony export */   "addAbilityToRemoveTodo": () => (/* binding */ addAbilityToRemoveTodo),
/* harmony export */   "addAbilityToToggleComplete": () => (/* binding */ addAbilityToToggleComplete)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");



function addAbilityToLogin(_ref) {
  var state = _ref.state,
      appEl = _ref.appEl;
  // Using 'submit' so we can get both submit via button-click and by "enter"
  appEl.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!e.target.classList.contains('Form')) {
      return;
    }

    var username = appEl.querySelector('.Username').value;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnchat)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    }); // show loading state

    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (todos) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(username);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setchat)(todos);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy

      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToLogout(_ref2) {
  var state = _ref2.state,
      appEl = _ref2.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('logout')) {
      return;
    }

    var username = state.username;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)() // We don't really care about results
    ["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy

      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToRefresh(_ref3) {
  var state = _ref3.state,
      appEl = _ref3.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('refresh_class')) {
      return;
    }

    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnchat)(); // Show loading state

    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchChat)().then(function (chat) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setchat)(chat);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy

      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToToggleComplete(_ref4) {
  var state = _ref4.state,
      appEl = _ref4.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('todo__toggle')) {
      return;
    }

    var id = e.target.dataset.id; // Here I elect not show a waiting status...what impact could that have?

    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUpdateTodo)(id, {
      done: !state.todos[id].done
    }).then(function (todo) {
      // Service call returns the updated todo
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.updateTodo)({
        id: id,
        todo: todo
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      console.log(err);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy

      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToAddMessage(_ref5) {
  var state = _ref5.state,
      appEl = _ref5.appEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('add__form')) {
      return;
    }

    var textMessage = appEl.querySelector('.add__message').value; // Here I elect not show a waiting status...what impact could that have?

    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchAddChat)(textMessage).then(function (todo) {
      // Notice we get the id of the new todo from the returned todo
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.addChat)(textMessage);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      console.log(err);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy

      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToRemoveTodo(_ref6) {
  var state = _ref6.state,
      appEl = _ref6.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('todo__delete')) {
      return;
    }

    var id = e.target.dataset.id;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnchat)(); // Show loading state

    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchDeleteTodo)(id).then(function () {
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchChat)(); // Return the promise so we can chain
    }).then(function (todos) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setchat)(todos);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy

      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function render(_ref) {
  var state = _ref.state,
      appEl = _ref.appEl;
  var html = "\n   <main class=\"main\">\n     ".concat(generateLoginHtml(state), "\n     ").concat(generateContentHtml(state), "\n   </main>\n  ");
  appEl.innerHTML = html;
}

function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return "\n      <div class=\"login__Loading\">Loading user...</div>\n    ";
  }

  if (state.isLoggedIn) {
    return "";
  }

  return "\n      <div class=\"login_class\">\n        <form class=\"Form\" action=\"#/login\">\n          <label>\n            <span class=\"label\">Username:</span>\n            <input class=\"Username\" placeholder=\" Type a name\" value=\"\">\n          </label>\n          <button class=\"Button\" type=\"submit\">Login</button>\n        </form>\n      </div>\n      <div class=\"Status\">".concat(state.error, "</div>\n     \n  ");
}

function showActiveUsers(state) {
  var messagesHtml = " <h3 class=\"Active_user\">Users to chat with:</h3>" + Object.values(state.chat.activeUsers).map(function (username) {
    return "\n        <ul class=\"Act_users\">\n          <li>\n              <div class= \"Act_user\">\n                <span class=\"username\"> ".concat(username, " </span>\n              </div>\n          </li>\n        </ul>\n    ");
  }).join("") || 0;
  return messagesHtml;
}

function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }

  if (state.isTodoPending) {
    return "\n      <div class=\"Text\">\n        ".concat(generateControlsHtml(state), "\n        <div class=\"todos__waiting\">Loading Todos...</div>\n      </div>\n    ");
  }

  return "\n      <div class=\"Text\">\n        ".concat(showActiveUsers(state), "\n        ").concat(generateControlsHtml(state), "\n        <ul class=\"Chat\">").concat(createMessage(state), "</ul>\n        ").concat(createMessageInputHtml(state), "\n      </div>\n  ");
}

function generateControlsHtml(state) {
  return "\n        <div class=\"remote\">\n          <button class=\"refresh_class\">Refresh</button>\n          <button class=\"logout\">Logout</button>\n        </div>\n  ";
}

function createMessage(state) {
  var messagesHtml = Object.values(state.chat.userChat).map(function (chat) {
    return "\n      <ul class=\"chats\">\n        <li>\n          <div class= \"chat\">\n            <div class=\"chat_info\">      \n              <span class=\"chat_username\">".concat(chat.username, "</span>\n            </div>\n            <p class=\"chat_text\"> --> ").concat(chat.message, "</p>\n          </div>\n        </li>\n      </ul>\n      ");
  }).join("") || "<p class=\"no_chat\"> Start the conversation!</p>";
  return messagesHtml;
}

function createMessageInputHtml(state) {
  return "\n        <form class=\"add__form\" action=\"#/add\">\n          <input class=\"add__message\" name=\"message\">\n          <button type=\"submit\" class=\"add__button\">Send Message</button>\n        </form>\n  ";
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAddChat": () => (/* binding */ fetchAddChat),
/* harmony export */   "fetchChat": () => (/* binding */ fetchChat),
/* harmony export */   "fetchDeleteTodo": () => (/* binding */ fetchDeleteTodo),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession),
/* harmony export */   "fetchUpdateTodo": () => (/* binding */ fetchUpdateTodo)
/* harmony export */ });
function fetchAddChat(message) {
  return fetch('/api/v1/chat', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      message: message
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchDeleteTodo(id) {
  return fetch("/api/todos/".concat(id), {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchUpdateTodo(id, todoUpdates) {
  return fetch("/api/todos/".concat(id), {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify(todoUpdates)
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchChat() {
  return fetch('/api/v1/chat')["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addActiveUser": () => (/* binding */ addActiveUser),
/* harmony export */   "addChat": () => (/* binding */ addChat),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "setError": () => (/* binding */ setError),
/* harmony export */   "setchat": () => (/* binding */ setchat),
/* harmony export */   "updateTodo": () => (/* binding */ updateTodo),
/* harmony export */   "waitOnLogin": () => (/* binding */ waitOnLogin),
/* harmony export */   "waitOnchat": () => (/* binding */ waitOnchat)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  chat: {},
  activeUsers: {},
  isLoggedIn: false,
  isLoginPending: true,
  username: '',
  lastAddedTodoId: '',
  error: ''
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.error = '';
}
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.error = '';
}
function waitOnchat() {
  state.error = '';
}
function setchat(chat) {
  state.chat = chat;
  state.isTodoPending = false;
  state.error = '';
}
function updateTodo(_ref) {
  var id = _ref.id,
      todo = _ref.todo;
  state.chat[id] = todo;
  state.error = '';
}
function addChat(message) {
  state.chat.userChat.push({
    'username': state.username,
    'message': message
  });
  state.error = '';
}
function addActiveUser(_ref2) {
  var username = _ref2.username;
  state.activeUsers = username;
}
function setError(error) {
  console.log(error);

  if (!error) {
    state.error = '';
    return;
  }

  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

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
/*!*********************!*\
  !*** ./src/chat.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");




 // Main code
// This is where someone new to the code will see what happens on load
// You want to make it easy to see the big picture
// and easy to find the part you care about
// - Why did you come here? To fix a bug? Add a feature?
// - Make it easy to find the relevant code
// - skimmable

var appEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogin)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogout)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToRefresh)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToToggleComplete)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToAddMessage)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToRemoveTodo)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
checkForSession(); //////////

function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchSession)().then(function (session) {
    // The returned object from the service call
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username); // We do not have todos yet!

    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    }); // Show we are logged in but don't have todos

    return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchChat)(); // By returning this promise we can chain the original promise
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_0__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION
      }); // Expected, not a problem
    }

    return Promise.reject(err); // Pass any other error unchanged
  }).then(function (todos) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setchat)(todos);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION) {
      // expected "error"
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)(); // No longer waiting, set to logged out case

      (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
      return;
    } // For unexpected errors, report them


    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy

    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map