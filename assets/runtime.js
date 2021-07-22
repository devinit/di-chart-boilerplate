(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

  /***/ "./node_modules/ansi-html/index.js":
  /*!*****************************************!*\
    !*** ./node_modules/ansi-html/index.js ***!
    \*****************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  module.exports = ansiHTML

  // Reference to https://github.com/sindresorhus/ansi-regex
  var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

  var _defColors = {
    reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
    black: '000',
    red: 'ff0000',
    green: '209805',
    yellow: 'e8bf03',
    blue: '0000ff',
    magenta: 'ff00ff',
    cyan: '00ffee',
    lightgrey: 'f0f0f0',
    darkgrey: '888'
  }
  var _styles = {
    30: 'black',
    31: 'red',
    32: 'green',
    33: 'yellow',
    34: 'blue',
    35: 'magenta',
    36: 'cyan',
    37: 'lightgrey'
  }
  var _openTags = {
    '1': 'font-weight:bold', // bold
    '2': 'opacity:0.5', // dim
    '3': '<i>', // italic
    '4': '<u>', // underscore
    '8': 'display:none', // hidden
    '9': '<del>' // delete
  }
  var _closeTags = {
    '23': '</i>', // reset italic
    '24': '</u>', // reset underscore
    '29': '</del>' // reset delete
  }

  ;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
    _closeTags[n] = '</span>'
  })

  /**
   * Converts text with ANSI color codes to HTML markup.
   * @param {String} text
   * @returns {*}
   */
  function ansiHTML (text) {
    // Returns the text if the string has no ANSI escape code.
    if (!_regANSI.test(text)) {
      return text
    }

    // Cache opened sequence.
    var ansiCodes = []
    // Replace with markup.
    var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
      var ot = _openTags[seq]
      if (ot) {
        // If current sequence has been opened, close it.
        if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
          ansiCodes.pop()
          return '</span>'
        }
        // Open tag.
        ansiCodes.push(seq)
        return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
      }

      var ct = _closeTags[seq]
      if (ct) {
        // Pop sequence
        ansiCodes.pop()
        return ct
      }
      return ''
    })

    // Make sure tags are closed.
    var l = ansiCodes.length
    ;(l > 0) && (ret += Array(l + 1).join('</span>'))

    return ret
  }

  /**
   * Customize colors.
   * @param {Object} colors reference to _defColors
   */
  ansiHTML.setColors = function (colors) {
    if (typeof colors !== 'object') {
      throw new Error('`colors` parameter must be an Object.')
    }

    var _finalColors = {}
    for (var key in _defColors) {
      var hex = colors.hasOwnProperty(key) ? colors[key] : null
      if (!hex) {
        _finalColors[key] = _defColors[key]
        continue
      }
      if ('reset' === key) {
        if (typeof hex === 'string') {
          hex = [hex]
        }
        if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
          return typeof h !== 'string'
        })) {
          throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
        }
        var defHexColor = _defColors[key]
        if (!hex[0]) {
          hex[0] = defHexColor[0]
        }
        if (hex.length === 1 || !hex[1]) {
          hex = [hex[0]]
          hex.push(defHexColor[1])
        }

        hex = hex.slice(0, 2)
      } else if (typeof hex !== 'string') {
        throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
      }
      _finalColors[key] = hex
    }
    _setTags(_finalColors)
  }

  /**
   * Reset colors.
   */
  ansiHTML.reset = function () {
    _setTags(_defColors)
  }

  /**
   * Expose tags, including open and close.
   * @type {Object}
   */
  ansiHTML.tags = {}

  if (Object.defineProperty) {
    Object.defineProperty(ansiHTML.tags, 'open', {
      get: function () { return _openTags }
    })
    Object.defineProperty(ansiHTML.tags, 'close', {
      get: function () { return _closeTags }
    })
  } else {
    ansiHTML.tags.open = _openTags
    ansiHTML.tags.close = _closeTags
  }

  function _setTags (colors) {
    // reset all
    _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
    // inverse
    _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
    // dark grey
    _openTags['90'] = 'color:#' + colors.darkgrey

    for (var code in _styles) {
      var color = _styles[code]
      var oriColor = colors[color] || '000'
      _openTags[code] = 'color:#' + oriColor
      code = parseInt(code)
      _openTags[(code + 10).toString()] = 'background:#' + oriColor
    }
  }

  ansiHTML.reset()


  /***/ }),

  /***/ "./node_modules/core-js/internals/a-function.js":
  /*!******************************************************!*\
    !*** ./node_modules/core-js/internals/a-function.js ***!
    \******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/a-possible-prototype.js":
  /*!****************************************************************!*\
    !*** ./node_modules/core-js/internals/a-possible-prototype.js ***!
    \****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

  module.exports = function (it) {
    if (!isObject(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/add-to-unscopables.js":
  /*!**************************************************************!*\
    !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
    \**************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
  var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
  var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  module.exports = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/an-instance.js":
  /*!*******************************************************!*\
    !*** ./node_modules/core-js/internals/an-instance.js ***!
    \*******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    } return it;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/an-object.js":
  /*!*****************************************************!*\
    !*** ./node_modules/core-js/internals/an-object.js ***!
    \*****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

  module.exports = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/array-from.js":
  /*!******************************************************!*\
    !*** ./node_modules/core-js/internals/array-from.js ***!
    \******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
  var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js");
  var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");
  var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
  var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
  var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = iteratorMethod.call(O);
      next = iterator.next;
      result = new C();
      for (;!(step = next.call(iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = toLength(O.length);
      result = new C(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/array-includes.js":
  /*!**********************************************************!*\
    !*** ./node_modules/core-js/internals/array-includes.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
  var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
  var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  module.exports = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/array-iteration.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/internals/array-iteration.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
  var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
  var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
  var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
  var createMethod = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_OUT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = IndexedObject(O);
      var boundFunction = bind(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push.call(target, value); // filterOut
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  module.exports = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod(6),
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod(7)
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/array-species-create.js":
  /*!****************************************************************!*\
    !*** ./node_modules/core-js/internals/array-species-create.js ***!
    \****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
  var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

  var SPECIES = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  module.exports = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js":
  /*!****************************************************************************!*\
    !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
    \****************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ "./node_modules/core-js/internals/iterator-close.js");

  // call something on iterator step with safe closing on error
  module.exports = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/check-correctness-of-iteration.js":
  /*!**************************************************************************!*\
    !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
    \**************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

  var ITERATOR = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  module.exports = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/classof-raw.js":
  /*!*******************************************************!*\
    !*** ./node_modules/core-js/internals/classof-raw.js ***!
    \*******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  var toString = {}.toString;

  module.exports = function (it) {
    return toString.call(it).slice(8, -1);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/classof.js":
  /*!***************************************************!*\
    !*** ./node_modules/core-js/internals/classof.js ***!
    \***************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
  var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/collection-add-all.js":
  /*!**************************************************************!*\
    !*** ./node_modules/core-js/internals/collection-add-all.js ***!
    \**************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

  // https://github.com/tc39/collection-methods
  module.exports = function (/* ...elements */) {
    var set = anObject(this);
    var adder = aFunction(set.add);
    for (var k = 0, len = arguments.length; k < len; k++) {
      adder.call(set, arguments[k]);
    }
    return set;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/collection-delete-all.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/core-js/internals/collection-delete-all.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

  // https://github.com/tc39/collection-methods
  module.exports = function (/* ...elements */) {
    var collection = anObject(this);
    var remover = aFunction(collection['delete']);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remover.call(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    }
    return !!allDeleted;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/collection-from.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/internals/collection-from.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  // https://tc39.github.io/proposal-setmap-offrom/
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  module.exports = function from(source /* , mapFn, thisArg */) {
    var length = arguments.length;
    var mapFn = length > 1 ? arguments[1] : undefined;
    var mapping, array, n, boundFunction;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    array = [];
    if (mapping) {
      n = 0;
      boundFunction = bind(mapFn, length > 2 ? arguments[2] : undefined, 2);
      iterate(source, function (nextItem) {
        array.push(boundFunction(nextItem, n++));
      });
    } else {
      iterate(source, array.push, { that: array });
    }
    return new this(array);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/collection-of.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/internals/collection-of.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  // https://tc39.github.io/proposal-setmap-offrom/
  module.exports = function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/collection-strong.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/internals/collection-strong.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
  var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
  var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
  var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");
  var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js/internals/set-species.js");
  var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
  var fastKey = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js").fastKey;
  var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

  var setInternalState = InternalStateModule.set;
  var internalStateGetterFor = InternalStateModule.getterFor;

  module.exports = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState(that, {
          type: CONSTRUCTOR_NAME,
          index: create(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!DESCRIPTORS) that.size = 0;
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
        // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (DESCRIPTORS) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        } return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll(C.prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (DESCRIPTORS) state.size = 0;
          else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (DESCRIPTORS) state.size--;
            else that.size--;
          } return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });

      redefineAll(C.prototype, IS_MAP ? {
        // `Map.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-map.prototype.get
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // `Map.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-map.prototype.set
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // `Set.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-set.prototype.add
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
      return C;
    },
    setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
      defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return { value: undefined, done: true };
        }
        // return step by kind
        if (kind == 'keys') return { value: entry.key, done: false };
        if (kind == 'values') return { value: entry.value, done: false };
        return { value: [entry.key, entry.value], done: false };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species
      setSpecies(CONSTRUCTOR_NAME);
    }
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/collection-weak.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/internals/collection-weak.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
  var getWeakData = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js").getWeakData;
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
  var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
  var ArrayIterationModule = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js");
  var $has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

  var setInternalState = InternalStateModule.set;
  var internalStateGetterFor = InternalStateModule.getterFor;
  var find = ArrayIterationModule.find;
  var findIndex = ArrayIterationModule.findIndex;
  var id = 0;

  // fallback for uncaught frozen keys
  var uncaughtFrozenStore = function (store) {
    return store.frozen || (store.frozen = new UncaughtFrozenStore());
  };

  var UncaughtFrozenStore = function () {
    this.entries = [];
  };

  var findUncaughtFrozen = function (store, key) {
    return find(store.entries, function (it) {
      return it[0] === key;
    });
  };

  UncaughtFrozenStore.prototype = {
    get: function (key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has: function (key) {
      return !!findUncaughtFrozen(this, key);
    },
    set: function (key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;
      else this.entries.push([key, value]);
    },
    'delete': function (key) {
      var index = findIndex(this.entries, function (it) {
        return it[0] === key;
      });
      if (~index) this.entries.splice(index, 1);
      return !!~index;
    }
  };

  module.exports = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState(that, {
          type: CONSTRUCTOR_NAME,
          id: id++,
          frozen: undefined
        });
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var data = getWeakData(anObject(key), true);
        if (data === true) uncaughtFrozenStore(state).set(key, value);
        else data[state.id] = value;
        return that;
      };

      redefineAll(C.prototype, {
        // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
        // https://tc39.es/ecma262/#sec-weakset.prototype.delete
        'delete': function (key) {
          var state = getInternalState(this);
          if (!isObject(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state)['delete'](key);
          return data && $has(data, state.id) && delete data[state.id];
        },
        // `{ WeakMap, WeakSet }.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.has
        // https://tc39.es/ecma262/#sec-weakset.prototype.has
        has: function has(key) {
          var state = getInternalState(this);
          if (!isObject(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).has(key);
          return data && $has(data, state.id);
        }
      });

      redefineAll(C.prototype, IS_MAP ? {
        // `WeakMap.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-weakmap.prototype.get
        get: function get(key) {
          var state = getInternalState(this);
          if (isObject(key)) {
            var data = getWeakData(key);
            if (data === true) return uncaughtFrozenStore(state).get(key);
            return data ? data[state.id] : undefined;
          }
        },
        // `WeakMap.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-weakmap.prototype.set
        set: function set(key, value) {
          return define(this, key, value);
        }
      } : {
        // `WeakSet.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-weakset.prototype.add
        add: function add(value) {
          return define(this, value, true);
        }
      });

      return C;
    }
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/collection.js":
  /*!******************************************************!*\
    !*** ./node_modules/core-js/internals/collection.js ***!
    \******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");
  var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
  var InternalMetadataModule = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
  var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
  var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
  var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");
  var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
  var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "./node_modules/core-js/internals/inherit-if-required.js");

  module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var nativeMethod = NativePrototype[KEY];
      redefine(NativePrototype, KEY,
        KEY == 'add' ? function add(value) {
          nativeMethod.call(this, value === 0 ? 0 : value);
          return this;
        } : KEY == 'delete' ? function (key) {
          return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'get' ? function get(key) {
          return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'has' ? function has(key) {
          return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : function set(key, value) {
          nativeMethod.call(this, key === 0 ? 0 : key, value);
          return this;
        }
      );
    };

    var REPLACE = isForced(
      CONSTRUCTOR_NAME,
      typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
        new NativeConstructor().entries().next();
      }))
    );

    if (REPLACE) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      InternalMetadataModule.REQUIRED = true;
    } else if (isForced(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
          var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
          if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    $({ global: true, forced: Constructor != NativeConstructor }, exported);

    setToStringTag(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/composite-key.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/internals/composite-key.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
  var Map = __webpack_require__(/*! ../modules/es.map */ "./node_modules/core-js/modules/es.map.js");
  var WeakMap = __webpack_require__(/*! ../modules/es.weak-map */ "./node_modules/core-js/modules/es.weak-map.js");
  var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

  var Node = function () {
    // keys
    this.object = null;
    this.symbol = null;
    // child nodes
    this.primitives = null;
    this.objectsByIndex = create(null);
  };

  Node.prototype.get = function (key, initializer) {
    return this[key] || (this[key] = initializer());
  };

  Node.prototype.next = function (i, it, IS_OBJECT) {
    var store = IS_OBJECT
      ? this.objectsByIndex[i] || (this.objectsByIndex[i] = new WeakMap())
      : this.primitives || (this.primitives = new Map());
    var entry = store.get(it);
    if (!entry) store.set(it, entry = new Node());
    return entry;
  };

  var root = new Node();

  module.exports = function () {
    var active = root;
    var length = arguments.length;
    var i, it;
    // for prevent leaking, start from objects
    for (i = 0; i < length; i++) {
      if (isObject(it = arguments[i])) active = active.next(i, it, true);
    }
    if (this === Object && active === root) throw TypeError('Composite keys must contain a non-primitive component');
    for (i = 0; i < length; i++) {
      if (!isObject(it = arguments[i])) active = active.next(i, it, false);
    } return active;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
  /*!***********************************************************************!*\
    !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
    \***********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
  var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
  var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

  module.exports = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
  /*!********************************************************************!*\
    !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

  module.exports = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });


  /***/ }),

  /***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
  /*!***********************************************************************!*\
    !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
    \***********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js").IteratorPrototype;
  var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
  var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
  var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
  var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

  var returnThis = function () { return this; };

  module.exports = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
    Iterators[TO_STRING_TAG] = returnThis;
    return IteratorConstructor;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
  /*!**************************************************************************!*\
    !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
    \**************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
  var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
  var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

  module.exports = DESCRIPTORS ? function (object, key, value) {
    return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/create-property-descriptor.js":
  /*!**********************************************************************!*\
    !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
    \**********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/create-property.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/internals/create-property.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
  var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
  var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

  module.exports = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/define-iterator.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/internals/define-iterator.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
  var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
  var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
  var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
  var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
  var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
  var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js");

  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf) {
            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
            createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
        if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
      createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
    }
    Iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/define-well-known-symbol.js":
  /*!********************************************************************!*\
    !*** ./node_modules/core-js/internals/define-well-known-symbol.js ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
  var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/well-known-symbol-wrapped */ "./node_modules/core-js/internals/well-known-symbol-wrapped.js");
  var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;

  module.exports = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule.f(NAME)
    });
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/descriptors.js":
  /*!*******************************************************!*\
    !*** ./node_modules/core-js/internals/descriptors.js ***!
    \*******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

  // Detect IE8's incomplete defineProperty implementation
  module.exports = !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });


  /***/ }),

  /***/ "./node_modules/core-js/internals/document-create-element.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/core-js/internals/document-create-element.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

  var document = global.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document) && isObject(document.createElement);

  module.exports = function (it) {
    return EXISTS ? document.createElement(it) : {};
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/engine-is-ios.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/internals/engine-is-ios.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

  module.exports = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent);


  /***/ }),

  /***/ "./node_modules/core-js/internals/engine-is-node.js":
  /*!**********************************************************!*\
    !*** ./node_modules/core-js/internals/engine-is-node.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

  module.exports = classof(global.process) == 'process';


  /***/ }),

  /***/ "./node_modules/core-js/internals/engine-user-agent.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/internals/engine-user-agent.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

  module.exports = getBuiltIn('navigator', 'userAgent') || '';


  /***/ }),

  /***/ "./node_modules/core-js/internals/engine-v8-version.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/internals/engine-v8-version.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

  var process = global.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] < 4 ? 1 : match[0] + match[1];
  } else if (userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  module.exports = version && +version;


  /***/ }),

  /***/ "./node_modules/core-js/internals/enum-bug-keys.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  // IE8- don't enum bug keys
  module.exports = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];


  /***/ }),

  /***/ "./node_modules/core-js/internals/export.js":
  /*!**************************************************!*\
    !*** ./node_modules/core-js/internals/export.js ***!
    \**************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
  var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
  var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
  var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
  var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
  var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  module.exports = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global;
    } else if (STATIC) {
      target = global[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/fails.js":
  /*!*************************************************!*\
    !*** ./node_modules/core-js/internals/fails.js ***!
    \*************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/freezing.js":
  /*!****************************************************!*\
    !*** ./node_modules/core-js/internals/freezing.js ***!
    \****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

  module.exports = !fails(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });


  /***/ }),

  /***/ "./node_modules/core-js/internals/function-bind-context.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/core-js/internals/function-bind-context.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

  // optional / simple context binding
  module.exports = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/get-built-in.js":
  /*!********************************************************!*\
    !*** ./node_modules/core-js/internals/get-built-in.js ***!
    \********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  module.exports = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
      : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/get-iterator-method.js":
  /*!***************************************************************!*\
    !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
    \***************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
  var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

  var ITERATOR = wellKnownSymbol('iterator');

  module.exports = function (it) {
    if (it != undefined) return it[ITERATOR]
      || it['@@iterator']
      || Iterators[classof(it)];
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/get-iterator.js":
  /*!********************************************************!*\
    !*** ./node_modules/core-js/internals/get-iterator.js ***!
    \********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");

  module.exports = function (it) {
    var iteratorMethod = getIteratorMethod(it);
    if (typeof iteratorMethod != 'function') {
      throw TypeError(String(it) + ' is not iterable');
    } return anObject(iteratorMethod.call(it));
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/get-map-iterator.js":
  /*!************************************************************!*\
    !*** ./node_modules/core-js/internals/get-map-iterator.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var getIterator = __webpack_require__(/*! ../internals/get-iterator */ "./node_modules/core-js/internals/get-iterator.js");

  module.exports = IS_PURE ? getIterator : function (it) {
    // eslint-disable-next-line es/no-map -- safe
    return Map.prototype.entries.call(it);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/get-set-iterator.js":
  /*!************************************************************!*\
    !*** ./node_modules/core-js/internals/get-set-iterator.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var getIterator = __webpack_require__(/*! ../internals/get-iterator */ "./node_modules/core-js/internals/get-iterator.js");

  module.exports = IS_PURE ? getIterator : function (it) {
    // eslint-disable-next-line es/no-set -- safe
    return Set.prototype.values.call(it);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/global.js":
  /*!**************************************************!*\
    !*** ./node_modules/core-js/internals/global.js ***!
    \**************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  module.exports =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof global == 'object' && global) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

  /***/ }),

  /***/ "./node_modules/core-js/internals/has.js":
  /*!***********************************************!*\
    !*** ./node_modules/core-js/internals/has.js ***!
    \***********************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

  var hasOwnProperty = {}.hasOwnProperty;

  module.exports = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty.call(toObject(it), key);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/hidden-keys.js":
  /*!*******************************************************!*\
    !*** ./node_modules/core-js/internals/hidden-keys.js ***!
    \*******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = {};


  /***/ }),

  /***/ "./node_modules/core-js/internals/host-report-errors.js":
  /*!**************************************************************!*\
    !*** ./node_modules/core-js/internals/host-report-errors.js ***!
    \**************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

  module.exports = function (a, b) {
    var console = global.console;
    if (console && console.error) {
      arguments.length === 1 ? console.error(a) : console.error(a, b);
    }
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/html.js":
  /*!************************************************!*\
    !*** ./node_modules/core-js/internals/html.js ***!
    \************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

  module.exports = getBuiltIn('document', 'documentElement');


  /***/ }),

  /***/ "./node_modules/core-js/internals/ie8-dom-define.js":
  /*!**********************************************************!*\
    !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
  var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
  var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

  // Thank's IE8 for his funny defineProperty
  module.exports = !DESCRIPTORS && !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });


  /***/ }),

  /***/ "./node_modules/core-js/internals/indexed-object.js":
  /*!**********************************************************!*\
    !*** ./node_modules/core-js/internals/indexed-object.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
  var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  module.exports = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;


  /***/ }),

  /***/ "./node_modules/core-js/internals/inherit-if-required.js":
  /*!***************************************************************!*\
    !*** ./node_modules/core-js/internals/inherit-if-required.js ***!
    \***************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
  var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");

  // makes subclassing work correct for wrapped built-ins
  module.exports = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      setPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      typeof (NewTarget = dummy.constructor) == 'function' &&
      NewTarget !== Wrapper &&
      isObject(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) setPrototypeOf($this, NewTargetPrototype);
    return $this;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/inspect-source.js":
  /*!**********************************************************!*\
    !*** ./node_modules/core-js/internals/inspect-source.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

  var functionToString = Function.toString;

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof store.inspectSource != 'function') {
    store.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  module.exports = store.inspectSource;


  /***/ }),

  /***/ "./node_modules/core-js/internals/internal-metadata.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/internals/internal-metadata.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
  var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
  var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
  var FREEZING = __webpack_require__(/*! ../internals/freezing */ "./node_modules/core-js/internals/freezing.js");

  var METADATA = uid('meta');
  var id = 0;

  // eslint-disable-next-line es/no-object-isextensible -- safe
  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty(it, METADATA, { value: {
      objectID: 'O' + id++, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
    // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
    // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = module.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };

  hiddenKeys[METADATA] = true;


  /***/ }),

  /***/ "./node_modules/core-js/internals/internal-state.js":
  /*!**********************************************************!*\
    !*** ./node_modules/core-js/internals/internal-state.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
  var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
  var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var shared = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");
  var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
  var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap = global.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set = function (it, metadata) {
      if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store, it) || {};
    };
    has = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return objectHas(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return objectHas(it, STATE);
    };
  }

  module.exports = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
  /*!********************************************************************!*\
    !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
  var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

  var ITERATOR = wellKnownSymbol('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  module.exports = function (it) {
    return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/is-array.js":
  /*!****************************************************!*\
    !*** ./node_modules/core-js/internals/is-array.js ***!
    \****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  module.exports = Array.isArray || function isArray(arg) {
    return classof(arg) == 'Array';
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/is-forced.js":
  /*!*****************************************************!*\
    !*** ./node_modules/core-js/internals/is-forced.js ***!
    \*****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  module.exports = isForced;


  /***/ }),

  /***/ "./node_modules/core-js/internals/is-object.js":
  /*!*****************************************************!*\
    !*** ./node_modules/core-js/internals/is-object.js ***!
    \*****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/is-pure.js":
  /*!***************************************************!*\
    !*** ./node_modules/core-js/internals/is-pure.js ***!
    \***************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = false;


  /***/ }),

  /***/ "./node_modules/core-js/internals/iterate.js":
  /*!***************************************************!*\
    !*** ./node_modules/core-js/internals/iterate.js ***!
    \***************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");
  var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");
  var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ "./node_modules/core-js/internals/iterator-close.js");

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  module.exports = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength(iterable.length); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && result instanceof Result) return result;
        } return new Result(false);
      }
      iterator = iterFn.call(iterable);
    }

    next = iterator.next;
    while (!(step = next.call(iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator);
        throw error;
      }
      if (typeof result == 'object' && result && result instanceof Result) return result;
    } return new Result(false);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/iterator-close.js":
  /*!**********************************************************!*\
    !*** ./node_modules/core-js/internals/iterator-close.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

  module.exports = function (iterator) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) {
      return anObject(returnMethod.call(iterator)).value;
    }
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/iterators-core.js":
  /*!**********************************************************!*\
    !*** ./node_modules/core-js/internals/iterators-core.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
  var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
  var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
  var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

  var ITERATOR = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS = false;

  var returnThis = function () { return this; };

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype[ITERATOR].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
    createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
  }

  module.exports = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/iterators.js":
  /*!*****************************************************!*\
    !*** ./node_modules/core-js/internals/iterators.js ***!
    \*****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = {};


  /***/ }),

  /***/ "./node_modules/core-js/internals/math-fround.js":
  /*!*******************************************************!*\
    !*** ./node_modules/core-js/internals/math-fround.js ***!
    \*******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var sign = __webpack_require__(/*! ../internals/math-sign */ "./node_modules/core-js/internals/math-sign.js");

  var abs = Math.abs;
  var pow = Math.pow;
  var EPSILON = pow(2, -52);
  var EPSILON32 = pow(2, -23);
  var MAX32 = pow(2, 127) * (2 - EPSILON32);
  var MIN32 = pow(2, -126);

  var roundTiesToEven = function (n) {
    return n + 1 / EPSILON - 1 / EPSILON;
  };

  // `Math.fround` method implementation
  // https://tc39.es/ecma262/#sec-math.fround
  // eslint-disable-next-line es/no-math-fround -- safe
  module.exports = Math.fround || function fround(x) {
    var $abs = abs(x);
    var $sign = sign(x);
    var a, result;
    if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    // eslint-disable-next-line no-self-compare -- NaN check
    if (result > MAX32 || result != result) return $sign * Infinity;
    return $sign * result;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/math-scale.js":
  /*!******************************************************!*\
    !*** ./node_modules/core-js/internals/math-scale.js ***!
    \******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  // `Math.scale` method implementation
  // https://rwaldron.github.io/proposal-math-extensions/
  module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
    if (
      arguments.length === 0
        /* eslint-disable no-self-compare -- NaN check */
        || x != x
        || inLow != inLow
        || inHigh != inHigh
        || outLow != outLow
        || outHigh != outHigh
        /* eslint-enable no-self-compare -- NaN check */
    ) return NaN;
    if (x === Infinity || x === -Infinity) return x;
    return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/math-sign.js":
  /*!*****************************************************!*\
    !*** ./node_modules/core-js/internals/math-sign.js ***!
    \*****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  // `Math.sign` method implementation
  // https://tc39.es/ecma262/#sec-math.sign
  // eslint-disable-next-line es/no-math-sign -- safe
  module.exports = Math.sign || function sign(x) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/native-symbol.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/internals/native-symbol.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  /* eslint-disable es/no-symbol -- required for testing */
  var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");
  var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION && V8_VERSION < 41;
  });


  /***/ }),

  /***/ "./node_modules/core-js/internals/native-url.js":
  /*!******************************************************!*\
    !*** ./node_modules/core-js/internals/native-url.js ***!
    \******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

  var ITERATOR = wellKnownSymbol('iterator');

  module.exports = !fails(function () {
    var url = new URL('b?a=1&b=2&c=3', 'http://a');
    var searchParams = url.searchParams;
    var result = '';
    url.pathname = 'c%20d';
    searchParams.forEach(function (value, key) {
      searchParams['delete']('b');
      result += key + value;
    });
    return (IS_PURE && !url.toJSON)
      || !searchParams.sort
      || url.href !== 'http://a/c%20d?a=1&c=3'
      || searchParams.get('c') !== '3'
      || String(new URLSearchParams('?a=1')) !== 'a=1'
      || !searchParams[ITERATOR]
      // throws in Edge
      || new URL('https://a@b').username !== 'a'
      || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
      // not punycoded in Edge
      || new URL('http://тест').host !== 'xn--e1aybc'
      // not escaped in Chrome 62-
      || new URL('http://a#б').hash !== '#%D0%B1'
      // fails in Chrome 66-
      || result !== 'a1c3'
      // throws in Safari
      || new URL('http://x', undefined).host !== 'x';
  });


  /***/ }),

  /***/ "./node_modules/core-js/internals/native-weak-map.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/internals/native-weak-map.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

  var WeakMap = global.WeakMap;

  module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


  /***/ }),

  /***/ "./node_modules/core-js/internals/new-promise-capability.js":
  /*!******************************************************************!*\
    !*** ./node_modules/core-js/internals/new-promise-capability.js ***!
    \******************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aFunction(resolve);
    this.reject = aFunction(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  module.exports.f = function (C) {
    return new PromiseCapability(C);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/number-is-finite.js":
  /*!************************************************************!*\
    !*** ./node_modules/core-js/internals/number-is-finite.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

  var globalIsFinite = global.isFinite;

  // `Number.isFinite` method
  // https://tc39.es/ecma262/#sec-number.isfinite
  // eslint-disable-next-line es/no-number-isfinite -- safe
  module.exports = Number.isFinite || function isFinite(it) {
    return typeof it == 'number' && globalIsFinite(it);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/number-parse-int.js":
  /*!************************************************************!*\
    !*** ./node_modules/core-js/internals/number-parse-int.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var trim = __webpack_require__(/*! ../internals/string-trim */ "./node_modules/core-js/internals/string-trim.js").trim;
  var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js/internals/whitespaces.js");

  var $parseInt = global.parseInt;
  var hex = /^[+-]?0[Xx]/;
  var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  module.exports = FORCED ? function parseInt(string, radix) {
    var S = trim(String(string));
    return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
  } : $parseInt;


  /***/ }),

  /***/ "./node_modules/core-js/internals/object-assign.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/internals/object-assign.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
  var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
  var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
  var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
  var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
  var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
  var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");

  // eslint-disable-next-line es/no-object-assign -- safe
  var $assign = Object.assign;
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  var defineProperty = Object.defineProperty;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  module.exports = !$assign || fails(function () {
    // should have correct order of operations (Edge bug)
    if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), { b: 2 })).b !== 1) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line es/no-symbol -- safe
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    var propertyIsEnumerable = propertyIsEnumerableModule.f;
    while (argumentsLength > index) {
      var S = IndexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
      }
    } return T;
  } : $assign;


  /***/ }),

  /***/ "./node_modules/core-js/internals/object-create.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/internals/object-create.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
  var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");
  var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
  var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
  var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
  var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      /* global ActiveXObject -- old IE */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  module.exports = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : defineProperties(result, Properties);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/object-define-properties.js":
  /*!********************************************************************!*\
    !*** ./node_modules/core-js/internals/object-define-properties.js ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
  var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
    return O;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/object-define-property.js":
  /*!******************************************************************!*\
    !*** ./node_modules/core-js/internals/object-define-property.js ***!
    \******************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
  var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
  /*!******************************************************************************!*\
    !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
    \******************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
  var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
  var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
  var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
  var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
  var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (IE8_DOM_DEFINE) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
  /*!*************************************************************************!*\
    !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
    \*************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
  var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

  var hiddenKeys = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
  /*!***************************************************************************!*\
    !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
    \***************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  exports.f = Object.getOwnPropertySymbols;


  /***/ }),

  /***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
  var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
  var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");

  var IE_PROTO = sharedKey('IE_PROTO');
  var ObjectPrototype = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
    O = toObject(O);
    if (has(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype : null;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/object-keys-internal.js":
  /*!****************************************************************!*\
    !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
    \****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
  var indexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf;
  var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

  module.exports = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/object-keys.js":
  /*!*******************************************************!*\
    !*** ./node_modules/core-js/internals/object-keys.js ***!
    \*******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
  var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  module.exports = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
  /*!*************************************************************************!*\
    !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
    \*************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;


  /***/ }),

  /***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  /* eslint-disable no-proto -- safe */
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "./node_modules/core-js/internals/a-possible-prototype.js");

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);


  /***/ }),

  /***/ "./node_modules/core-js/internals/own-keys.js":
  /*!****************************************************!*\
    !*** ./node_modules/core-js/internals/own-keys.js ***!
    \****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
  var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

  // all object keys, includes non-enumerable and symbols
  module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/path.js":
  /*!************************************************!*\
    !*** ./node_modules/core-js/internals/path.js ***!
    \************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

  module.exports = global;


  /***/ }),

  /***/ "./node_modules/core-js/internals/perform.js":
  /*!***************************************************!*\
    !*** ./node_modules/core-js/internals/perform.js ***!
    \***************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/redefine-all.js":
  /*!********************************************************!*\
    !*** ./node_modules/core-js/internals/redefine-all.js ***!
    \********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

  module.exports = function (target, src, options) {
    for (var key in src) redefine(target, key, src[key], options);
    return target;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/redefine.js":
  /*!****************************************************!*\
    !*** ./node_modules/core-js/internals/redefine.js ***!
    \****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
  var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
  var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
  var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

  var getInternalState = InternalStateModule.get;
  var enforceInternalState = InternalStateModule.enforce;
  var TEMPLATE = String(String).split('String');

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) {
        createNonEnumerableProperty(value, 'name', key);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }
    if (O === global) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
  });


  /***/ }),

  /***/ "./node_modules/core-js/internals/reflect-metadata.js":
  /*!************************************************************!*\
    !*** ./node_modules/core-js/internals/reflect-metadata.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
  var Map = __webpack_require__(/*! ../modules/es.map */ "./node_modules/core-js/modules/es.map.js");
  var WeakMap = __webpack_require__(/*! ../modules/es.weak-map */ "./node_modules/core-js/modules/es.weak-map.js");
  var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");

  var metadata = shared('metadata');
  var store = metadata.store || (metadata.store = new WeakMap());

  var getOrCreateMetadataMap = function (target, targetKey, create) {
    var targetMetadata = store.get(target);
    if (!targetMetadata) {
      if (!create) return;
      store.set(target, targetMetadata = new Map());
    }
    var keyMetadata = targetMetadata.get(targetKey);
    if (!keyMetadata) {
      if (!create) return;
      targetMetadata.set(targetKey, keyMetadata = new Map());
    } return keyMetadata;
  };

  var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
    var metadataMap = getOrCreateMetadataMap(O, P, false);
    return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
  };

  var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
    var metadataMap = getOrCreateMetadataMap(O, P, false);
    return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
  };

  var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
    getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
  };

  var ordinaryOwnMetadataKeys = function (target, targetKey) {
    var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
    var keys = [];
    if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
    return keys;
  };

  var toMetadataKey = function (it) {
    return it === undefined || typeof it == 'symbol' ? it : String(it);
  };

  module.exports = {
    store: store,
    getMap: getOrCreateMetadataMap,
    has: ordinaryHasOwnMetadata,
    get: ordinaryGetOwnMetadata,
    set: ordinaryDefineOwnMetadata,
    keys: ordinaryOwnMetadataKeys,
    toKey: toMetadataKey
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/require-object-coercible.js":
  /*!********************************************************************!*\
    !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  module.exports = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/same-value-zero.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/internals/same-value-zero.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  // `SameValueZero` abstract operation
  // https://tc39.es/ecma262/#sec-samevaluezero
  module.exports = function (x, y) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return x === y || x != x && y != y;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/set-global.js":
  /*!******************************************************!*\
    !*** ./node_modules/core-js/internals/set-global.js ***!
    \******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

  module.exports = function (key, value) {
    try {
      createNonEnumerableProperty(global, key, value);
    } catch (error) {
      global[key] = value;
    } return value;
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/set-species.js":
  /*!*******************************************************!*\
    !*** ./node_modules/core-js/internals/set-species.js ***!
    \*******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
  var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

  var SPECIES = wellKnownSymbol('species');

  module.exports = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule.f;

    if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
      defineProperty(Constructor, SPECIES, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/set-to-string-tag.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
  var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');

  module.exports = function (it, TAG, STATIC) {
    if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
      defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/shared-key.js":
  /*!******************************************************!*\
    !*** ./node_modules/core-js/internals/shared-key.js ***!
    \******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
  var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

  var keys = shared('keys');

  module.exports = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/shared-store.js":
  /*!********************************************************!*\
    !*** ./node_modules/core-js/internals/shared-store.js ***!
    \********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

  var SHARED = '__core-js_shared__';
  var store = global[SHARED] || setGlobal(SHARED, {});

  module.exports = store;


  /***/ }),

  /***/ "./node_modules/core-js/internals/shared.js":
  /*!**************************************************!*\
    !*** ./node_modules/core-js/internals/shared.js ***!
    \**************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.15.2',
    mode: IS_PURE ? 'pure' : 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });


  /***/ }),

  /***/ "./node_modules/core-js/internals/species-constructor.js":
  /*!***************************************************************!*\
    !*** ./node_modules/core-js/internals/species-constructor.js ***!
    \***************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

  var SPECIES = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  module.exports = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/string-multibyte.js":
  /*!************************************************************!*\
    !*** ./node_modules/core-js/internals/string-multibyte.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
  var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  module.exports = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod(true)
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/string-punycode-to-ascii.js":
  /*!********************************************************************!*\
    !*** ./node_modules/core-js/internals/string-punycode-to-ascii.js ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  // based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
  var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128; // 0x80
  var delimiter = '-'; // '\x2D'
  var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
  var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
  var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
  var baseMinusTMin = base - tMin;
  var floor = Math.floor;
  var stringFromCharCode = String.fromCharCode;

  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   */
  var ucs2decode = function (string) {
    var output = [];
    var counter = 0;
    var length = string.length;
    while (counter < length) {
      var value = string.charCodeAt(counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // It's a high surrogate, and there is a next character.
        var extra = string.charCodeAt(counter++);
        if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // It's an unmatched surrogate; only append this code unit, in case the
          // next code unit is the high surrogate of a surrogate pair.
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  };

  /**
   * Converts a digit/integer into a basic code point.
   */
  var digitToBasic = function (digit) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26);
  };

  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   */
  var adapt = function (delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for (; delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }
    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  };

  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   */
  // eslint-disable-next-line max-statements -- TODO
  var encode = function (input) {
    var output = [];

    // Convert the input in UCS-2 to an array of Unicode code points.
    input = ucs2decode(input);

    // Cache the length.
    var inputLength = input.length;

    // Initialize the state.
    var n = initialN;
    var delta = 0;
    var bias = initialBias;
    var i, currentValue;

    // Handle the basic code points.
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }

    var basicLength = output.length; // number of basic code points.
    var handledCPCount = basicLength; // number of code points that have been handled;

    // Finish the basic string with a delimiter unless it's empty.
    if (basicLength) {
      output.push(delimiter);
    }

    // Main encoding loop:
    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next larger one:
      var m = maxInt;
      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }

      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
      var handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        throw RangeError(OVERFLOW_ERROR);
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue < n && ++delta > maxInt) {
          throw RangeError(OVERFLOW_ERROR);
        }
        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer.
          var q = delta;
          for (var k = base; /* no condition */; k += base) {
            var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
            if (q < t) break;
            var qMinusT = q - t;
            var baseMinusT = base - t;
            output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
            q = floor(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode(digitToBasic(q)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;
    }
    return output.join('');
  };

  module.exports = function (input) {
    var encoded = [];
    var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
    var i, label;
    for (i = 0; i < labels.length; i++) {
      label = labels[i];
      encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
    }
    return encoded.join('.');
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/string-trim.js":
  /*!*******************************************************!*\
    !*** ./node_modules/core-js/internals/string-trim.js ***!
    \*******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
  var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js/internals/whitespaces.js");

  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod = function (TYPE) {
    return function ($this) {
      var string = String(requireObjectCoercible($this));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };
  };

  module.exports = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod(3)
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/task.js":
  /*!************************************************!*\
    !*** ./node_modules/core-js/internals/task.js ***!
    \************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
  var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
  var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "./node_modules/core-js/internals/engine-is-ios.js");
  var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");

  var location = global.location;
  var set = global.setImmediate;
  var clear = global.clearImmediate;
  var process = global.process;
  var MessageChannel = global.MessageChannel;
  var Dispatch = global.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var defer, channel, port;

  var run = function (id) {
    // eslint-disable-next-line no-prototype-builtins -- safe
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var listener = function (event) {
    run(event.data);
  };

  var post = function (id) {
    // old engines have not location.origin
    global.postMessage(id + '', location.protocol + '//' + location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set || !clear) {
    set = function setImmediate(fn) {
      var args = [];
      var i = 1;
      while (arguments.length > i) args.push(arguments[i++]);
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func -- spec requirement
        (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (IS_NODE) {
      defer = function (id) {
        process.nextTick(runner(id));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !IS_IOS) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = bind(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global.addEventListener &&
      typeof postMessage == 'function' &&
      !global.importScripts &&
      location && location.protocol !== 'file:' &&
      !fails(post)
    ) {
      defer = post;
      global.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) {
      defer = function (id) {
        html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
          html.removeChild(this);
          run(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  module.exports = {
    set: set,
    clear: clear
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/to-absolute-index.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

  var max = Math.max;
  var min = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  module.exports = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min(integer, length);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/to-indexed-object.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
  var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

  module.exports = function (it) {
    return IndexedObject(requireObjectCoercible(it));
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/to-integer.js":
  /*!******************************************************!*\
    !*** ./node_modules/core-js/internals/to-integer.js ***!
    \******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  module.exports = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/to-length.js":
  /*!*****************************************************!*\
    !*** ./node_modules/core-js/internals/to-length.js ***!
    \*****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  module.exports = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/to-object.js":
  /*!*****************************************************!*\
    !*** ./node_modules/core-js/internals/to-object.js ***!
    \*****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  module.exports = function (argument) {
    return Object(requireObjectCoercible(argument));
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/to-primitive.js":
  /*!********************************************************!*\
    !*** ./node_modules/core-js/internals/to-primitive.js ***!
    \********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  module.exports = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/to-string-tag-support.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG] = 'z';

  module.exports = String(test) === '[object z]';


  /***/ }),

  /***/ "./node_modules/core-js/internals/uid.js":
  /*!***********************************************!*\
    !*** ./node_modules/core-js/internals/uid.js ***!
    \***********************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  var id = 0;
  var postfix = Math.random();

  module.exports = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

  module.exports = NATIVE_SYMBOL
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';


  /***/ }),

  /***/ "./node_modules/core-js/internals/well-known-symbol-wrapped.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/core-js/internals/well-known-symbol-wrapped.js ***!
    \*********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

  exports.f = wellKnownSymbol;


  /***/ }),

  /***/ "./node_modules/core-js/internals/well-known-symbol.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
  var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
  var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
  var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

  var WellKnownSymbolsStore = shared('wks');
  var Symbol = global.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

  module.exports = function (name) {
    if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
      if (NATIVE_SYMBOL && has(Symbol, name)) {
        WellKnownSymbolsStore[name] = Symbol[name];
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
      }
    } return WellKnownSymbolsStore[name];
  };


  /***/ }),

  /***/ "./node_modules/core-js/internals/whitespaces.js":
  /*!*******************************************************!*\
    !*** ./node_modules/core-js/internals/whitespaces.js ***!
    \*******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  // a string of all valid unicode whitespaces
  module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


  /***/ }),

  /***/ "./node_modules/core-js/modules/es.array.iterator.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/es.array.iterator.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
  var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");
  var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
  var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
  var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == 'keys') return { value: index, done: false };
    if (kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  Iterators.Arguments = Iterators.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');


  /***/ }),

  /***/ "./node_modules/core-js/modules/es.map.js":
  /*!************************************************!*\
    !*** ./node_modules/core-js/modules/es.map.js ***!
    \************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var collection = __webpack_require__(/*! ../internals/collection */ "./node_modules/core-js/internals/collection.js");
  var collectionStrong = __webpack_require__(/*! ../internals/collection-strong */ "./node_modules/core-js/internals/collection-strong.js");

  // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects
  module.exports = collection('Map', function (init) {
    return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);


  /***/ }),

  /***/ "./node_modules/core-js/modules/es.set.js":
  /*!************************************************!*\
    !*** ./node_modules/core-js/modules/es.set.js ***!
    \************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var collection = __webpack_require__(/*! ../internals/collection */ "./node_modules/core-js/internals/collection.js");
  var collectionStrong = __webpack_require__(/*! ../internals/collection-strong */ "./node_modules/core-js/internals/collection-strong.js");

  // `Set` constructor
  // https://tc39.es/ecma262/#sec-set-objects
  module.exports = collection('Set', function (init) {
    return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);


  /***/ }),

  /***/ "./node_modules/core-js/modules/es.string.iterator.js":
  /*!************************************************************!*\
    !*** ./node_modules/core-js/modules/es.string.iterator.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt;
  var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
  var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/es.weak-map.js":
  /*!*****************************************************!*\
    !*** ./node_modules/core-js/modules/es.weak-map.js ***!
    \*****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
  var InternalMetadataModule = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js");
  var collection = __webpack_require__(/*! ../internals/collection */ "./node_modules/core-js/internals/collection.js");
  var collectionWeak = __webpack_require__(/*! ../internals/collection-weak */ "./node_modules/core-js/internals/collection-weak.js");
  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
  var enforceIternalState = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js").enforce;
  var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");

  var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
  // eslint-disable-next-line es/no-object-isextensible -- safe
  var isExtensible = Object.isExtensible;
  var InternalWeakMap;

  var wrapper = function (init) {
    return function WeakMap() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  };

  // `WeakMap` constructor
  // https://tc39.es/ecma262/#sec-weakmap-constructor
  var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);

  // IE11 WeakMap frozen keys fix
  // We can't use feature detection because it crash some old IE builds
  // https://github.com/zloirock/core-js/issues/485
  if (NATIVE_WEAK_MAP && IS_IE11) {
    InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
    InternalMetadataModule.REQUIRED = true;
    var WeakMapPrototype = $WeakMap.prototype;
    var nativeDelete = WeakMapPrototype['delete'];
    var nativeHas = WeakMapPrototype.has;
    var nativeGet = WeakMapPrototype.get;
    var nativeSet = WeakMapPrototype.set;
    redefineAll(WeakMapPrototype, {
      'delete': function (key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeDelete.call(this, key) || state.frozen['delete'](key);
        } return nativeDelete.call(this, key);
      },
      has: function has(key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) || state.frozen.has(key);
        } return nativeHas.call(this, key);
      },
      get: function get(key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
        } return nativeGet.call(this, key);
      },
      set: function set(key, value) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
        } else nativeSet.call(this, key, value);
        return this;
      }
    });
  }


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.array.last-index.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.array.last-index.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
  var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");
  var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
  var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
  var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;

  // `Array.prototype.lastIndex` getter
  // https://github.com/keithamus/proposal-array-last
  if (DESCRIPTORS && !('lastIndex' in [])) {
    defineProperty(Array.prototype, 'lastIndex', {
      configurable: true,
      get: function lastIndex() {
        var O = toObject(this);
        var len = toLength(O.length);
        return len == 0 ? 0 : len - 1;
      }
    });

    addToUnscopables('lastIndex');
  }


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.array.last-item.js":
  /*!****************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.array.last-item.js ***!
    \****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
  var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");
  var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
  var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
  var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;

  // `Array.prototype.lastIndex` accessor
  // https://github.com/keithamus/proposal-array-last
  if (DESCRIPTORS && !('lastItem' in [])) {
    defineProperty(Array.prototype, 'lastItem', {
      configurable: true,
      get: function lastItem() {
        var O = toObject(this);
        var len = toLength(O.length);
        return len == 0 ? undefined : O[len - 1];
      },
      set: function lastItem(value) {
        var O = toObject(this);
        var len = toLength(O.length);
        return O[len == 0 ? 0 : len - 1] = value;
      }
    });

    addToUnscopables('lastItem');
  }


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.composite-key.js":
  /*!**************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.composite-key.js ***!
    \**************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var getCompositeKeyNode = __webpack_require__(/*! ../internals/composite-key */ "./node_modules/core-js/internals/composite-key.js");
  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");

  var initializer = function () {
    var freeze = getBuiltIn('Object', 'freeze');
    return freeze ? freeze(create(null)) : create(null);
  };

  // https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey
  $({ global: true }, {
    compositeKey: function compositeKey() {
      return getCompositeKeyNode.apply(Object, arguments).get('object', initializer);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.composite-symbol.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.composite-symbol.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var getCompositeKeyNode = __webpack_require__(/*! ../internals/composite-key */ "./node_modules/core-js/internals/composite-key.js");
  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

  // https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey
  $({ global: true }, {
    compositeSymbol: function compositeSymbol() {
      if (arguments.length === 1 && typeof arguments[0] === 'string') return getBuiltIn('Symbol')['for'](arguments[0]);
      return getCompositeKeyNode.apply(null, arguments).get('symbol', getBuiltIn('Symbol'));
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.delete-all.js":
  /*!***************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.delete-all.js ***!
    \***************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var collectionDeleteAll = __webpack_require__(/*! ../internals/collection-delete-all */ "./node_modules/core-js/internals/collection-delete-all.js");

  // `Map.prototype.deleteAll` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
    deleteAll: function deleteAll(/* ...elements */) {
      return collectionDeleteAll.apply(this, arguments);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.every.js":
  /*!**********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.every.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var getMapIterator = __webpack_require__(/*! ../internals/get-map-iterator */ "./node_modules/core-js/internals/get-map-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Map.prototype.every` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
    every: function every(callbackfn /* , thisArg */) {
      var map = anObject(this);
      var iterator = getMapIterator(map);
      var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return !iterate(iterator, function (key, value, stop) {
        if (!boundFunction(value, key, map)) return stop();
      }, { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }).stopped;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.filter.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.filter.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
  var getMapIterator = __webpack_require__(/*! ../internals/get-map-iterator */ "./node_modules/core-js/internals/get-map-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Map.prototype.filter` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
    filter: function filter(callbackfn /* , thisArg */) {
      var map = anObject(this);
      var iterator = getMapIterator(map);
      var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
      var setter = aFunction(newMap.set);
      iterate(iterator, function (key, value) {
        if (boundFunction(value, key, map)) setter.call(newMap, key, value);
      }, { AS_ENTRIES: true, IS_ITERATOR: true });
      return newMap;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.find-key.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.find-key.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var getMapIterator = __webpack_require__(/*! ../internals/get-map-iterator */ "./node_modules/core-js/internals/get-map-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Map.prototype.findKey` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
    findKey: function findKey(callbackfn /* , thisArg */) {
      var map = anObject(this);
      var iterator = getMapIterator(map);
      var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return iterate(iterator, function (key, value, stop) {
        if (boundFunction(value, key, map)) return stop(key);
      }, { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }).result;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.find.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.find.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var getMapIterator = __webpack_require__(/*! ../internals/get-map-iterator */ "./node_modules/core-js/internals/get-map-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Map.prototype.find` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
    find: function find(callbackfn /* , thisArg */) {
      var map = anObject(this);
      var iterator = getMapIterator(map);
      var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return iterate(iterator, function (key, value, stop) {
        if (boundFunction(value, key, map)) return stop(value);
      }, { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }).result;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.from.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.from.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var from = __webpack_require__(/*! ../internals/collection-from */ "./node_modules/core-js/internals/collection-from.js");

  // `Map.from` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
  $({ target: 'Map', stat: true }, {
    from: from
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.group-by.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.group-by.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

  // `Map.groupBy` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', stat: true }, {
    groupBy: function groupBy(iterable, keyDerivative) {
      var newMap = new this();
      aFunction(keyDerivative);
      var has = aFunction(newMap.has);
      var get = aFunction(newMap.get);
      var set = aFunction(newMap.set);
      iterate(iterable, function (element) {
        var derivedKey = keyDerivative(element);
        if (!has.call(newMap, derivedKey)) set.call(newMap, derivedKey, [element]);
        else get.call(newMap, derivedKey).push(element);
      });
      return newMap;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.includes.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.includes.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var getMapIterator = __webpack_require__(/*! ../internals/get-map-iterator */ "./node_modules/core-js/internals/get-map-iterator.js");
  var sameValueZero = __webpack_require__(/*! ../internals/same-value-zero */ "./node_modules/core-js/internals/same-value-zero.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Map.prototype.includes` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
    includes: function includes(searchElement) {
      return iterate(getMapIterator(anObject(this)), function (key, value, stop) {
        if (sameValueZero(value, searchElement)) return stop();
      }, { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }).stopped;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.key-by.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.key-by.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

  // `Map.keyBy` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', stat: true }, {
    keyBy: function keyBy(iterable, keyDerivative) {
      var newMap = new this();
      aFunction(keyDerivative);
      var setter = aFunction(newMap.set);
      iterate(iterable, function (element) {
        setter.call(newMap, keyDerivative(element), element);
      });
      return newMap;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.key-of.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.key-of.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var getMapIterator = __webpack_require__(/*! ../internals/get-map-iterator */ "./node_modules/core-js/internals/get-map-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Map.prototype.includes` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
    keyOf: function keyOf(searchElement) {
      return iterate(getMapIterator(anObject(this)), function (key, value, stop) {
        if (value === searchElement) return stop(key);
      }, { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }).result;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.map-keys.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.map-keys.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
  var getMapIterator = __webpack_require__(/*! ../internals/get-map-iterator */ "./node_modules/core-js/internals/get-map-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Map.prototype.mapKeys` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
    mapKeys: function mapKeys(callbackfn /* , thisArg */) {
      var map = anObject(this);
      var iterator = getMapIterator(map);
      var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
      var setter = aFunction(newMap.set);
      iterate(iterator, function (key, value) {
        setter.call(newMap, boundFunction(value, key, map), value);
      }, { AS_ENTRIES: true, IS_ITERATOR: true });
      return newMap;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.map-values.js":
  /*!***************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.map-values.js ***!
    \***************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
  var getMapIterator = __webpack_require__(/*! ../internals/get-map-iterator */ "./node_modules/core-js/internals/get-map-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Map.prototype.mapValues` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
    mapValues: function mapValues(callbackfn /* , thisArg */) {
      var map = anObject(this);
      var iterator = getMapIterator(map);
      var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
      var setter = aFunction(newMap.set);
      iterate(iterator, function (key, value) {
        setter.call(newMap, key, boundFunction(value, key, map));
      }, { AS_ENTRIES: true, IS_ITERATOR: true });
      return newMap;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.merge.js":
  /*!**********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.merge.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Map.prototype.merge` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    merge: function merge(iterable /* ...iterbles */) {
      var map = anObject(this);
      var setter = aFunction(map.set);
      var i = 0;
      while (i < arguments.length) {
        iterate(arguments[i++], setter, { that: map, AS_ENTRIES: true });
      }
      return map;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.of.js":
  /*!*******************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.of.js ***!
    \*******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var of = __webpack_require__(/*! ../internals/collection-of */ "./node_modules/core-js/internals/collection-of.js");

  // `Map.of` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
  $({ target: 'Map', stat: true }, {
    of: of
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.reduce.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.reduce.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var getMapIterator = __webpack_require__(/*! ../internals/get-map-iterator */ "./node_modules/core-js/internals/get-map-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Map.prototype.reduce` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
    reduce: function reduce(callbackfn /* , initialValue */) {
      var map = anObject(this);
      var iterator = getMapIterator(map);
      var noInitial = arguments.length < 2;
      var accumulator = noInitial ? undefined : arguments[1];
      aFunction(callbackfn);
      iterate(iterator, function (key, value) {
        if (noInitial) {
          noInitial = false;
          accumulator = value;
        } else {
          accumulator = callbackfn(accumulator, value, key, map);
        }
      }, { AS_ENTRIES: true, IS_ITERATOR: true });
      if (noInitial) throw TypeError('Reduce of empty map with no initial value');
      return accumulator;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.some.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.some.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var getMapIterator = __webpack_require__(/*! ../internals/get-map-iterator */ "./node_modules/core-js/internals/get-map-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.some` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
    some: function some(callbackfn /* , thisArg */) {
      var map = anObject(this);
      var iterator = getMapIterator(map);
      var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return iterate(iterator, function (key, value, stop) {
        if (boundFunction(value, key, map)) return stop();
      }, { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }).stopped;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.map.update.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.map.update.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

  // `Set.prototype.update` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
    update: function update(key, callback /* , thunk */) {
      var map = anObject(this);
      var length = arguments.length;
      aFunction(callback);
      var isPresentInMap = map.has(key);
      if (!isPresentInMap && length < 3) {
        throw TypeError('Updating absent value');
      }
      var value = isPresentInMap ? map.get(key) : aFunction(length > 2 ? arguments[2] : undefined)(key, map);
      map.set(key, callback(value, key, map));
      return map;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.math.clamp.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.math.clamp.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

  var min = Math.min;
  var max = Math.max;

  // `Math.clamp` method
  // https://rwaldron.github.io/proposal-math-extensions/
  $({ target: 'Math', stat: true }, {
    clamp: function clamp(x, lower, upper) {
      return min(upper, max(lower, x));
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.math.deg-per-rad.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.math.deg-per-rad.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

  // `Math.DEG_PER_RAD` constant
  // https://rwaldron.github.io/proposal-math-extensions/
  $({ target: 'Math', stat: true }, {
    DEG_PER_RAD: Math.PI / 180
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.math.degrees.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.math.degrees.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

  var RAD_PER_DEG = 180 / Math.PI;

  // `Math.degrees` method
  // https://rwaldron.github.io/proposal-math-extensions/
  $({ target: 'Math', stat: true }, {
    degrees: function degrees(radians) {
      return radians * RAD_PER_DEG;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.math.fscale.js":
  /*!************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.math.fscale.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

  var scale = __webpack_require__(/*! ../internals/math-scale */ "./node_modules/core-js/internals/math-scale.js");
  var fround = __webpack_require__(/*! ../internals/math-fround */ "./node_modules/core-js/internals/math-fround.js");

  // `Math.fscale` method
  // https://rwaldron.github.io/proposal-math-extensions/
  $({ target: 'Math', stat: true }, {
    fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
      return fround(scale(x, inLow, inHigh, outLow, outHigh));
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.math.iaddh.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.math.iaddh.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

  // `Math.iaddh` method
  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
  // TODO: Remove from `core-js@4`
  $({ target: 'Math', stat: true }, {
    iaddh: function iaddh(x0, x1, y0, y1) {
      var $x0 = x0 >>> 0;
      var $x1 = x1 >>> 0;
      var $y0 = y0 >>> 0;
      return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.math.imulh.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.math.imulh.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

  // `Math.imulh` method
  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
  // TODO: Remove from `core-js@4`
  $({ target: 'Math', stat: true }, {
    imulh: function imulh(u, v) {
      var UINT16 = 0xFFFF;
      var $u = +u;
      var $v = +v;
      var u0 = $u & UINT16;
      var v0 = $v & UINT16;
      var u1 = $u >> 16;
      var v1 = $v >> 16;
      var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
      return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.math.isubh.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.math.isubh.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

  // `Math.isubh` method
  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
  // TODO: Remove from `core-js@4`
  $({ target: 'Math', stat: true }, {
    isubh: function isubh(x0, x1, y0, y1) {
      var $x0 = x0 >>> 0;
      var $x1 = x1 >>> 0;
      var $y0 = y0 >>> 0;
      return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.math.rad-per-deg.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.math.rad-per-deg.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

  // `Math.RAD_PER_DEG` constant
  // https://rwaldron.github.io/proposal-math-extensions/
  $({ target: 'Math', stat: true }, {
    RAD_PER_DEG: 180 / Math.PI
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.math.radians.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.math.radians.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

  var DEG_PER_RAD = Math.PI / 180;

  // `Math.radians` method
  // https://rwaldron.github.io/proposal-math-extensions/
  $({ target: 'Math', stat: true }, {
    radians: function radians(degrees) {
      return degrees * DEG_PER_RAD;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.math.scale.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.math.scale.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var scale = __webpack_require__(/*! ../internals/math-scale */ "./node_modules/core-js/internals/math-scale.js");

  // `Math.scale` method
  // https://rwaldron.github.io/proposal-math-extensions/
  $({ target: 'Math', stat: true }, {
    scale: scale
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.math.seeded-prng.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.math.seeded-prng.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var numberIsFinite = __webpack_require__(/*! ../internals/number-is-finite */ "./node_modules/core-js/internals/number-is-finite.js");
  var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
  var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

  var SEEDED_RANDOM = 'Seeded Random';
  var SEEDED_RANDOM_GENERATOR = SEEDED_RANDOM + ' Generator';
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(SEEDED_RANDOM_GENERATOR);
  var SEED_TYPE_ERROR = 'Math.seededPRNG() argument should have a "seed" field with a finite value.';

  var $SeededRandomGenerator = createIteratorConstructor(function SeededRandomGenerator(seed) {
    setInternalState(this, {
      type: SEEDED_RANDOM_GENERATOR,
      seed: seed % 2147483647
    });
  }, SEEDED_RANDOM, function next() {
    var state = getInternalState(this);
    var seed = state.seed = (state.seed * 1103515245 + 12345) % 2147483647;
    return { value: (seed & 1073741823) / 1073741823, done: false };
  });

  // `Math.seededPRNG` method
  // https://github.com/tc39/proposal-seeded-random
  // based on https://github.com/tc39/proposal-seeded-random/blob/78b8258835b57fc2100d076151ab506bc3202ae6/demo.html
  $({ target: 'Math', stat: true, forced: true }, {
    seededPRNG: function seededPRNG(it) {
      var seed = anObject(it).seed;
      if (!numberIsFinite(seed)) throw TypeError(SEED_TYPE_ERROR);
      return new $SeededRandomGenerator(seed);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.math.signbit.js":
  /*!*************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.math.signbit.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

  // `Math.signbit` method
  // https://github.com/tc39/proposal-Math.signbit
  $({ target: 'Math', stat: true }, {
    signbit: function signbit(x) {
      return (x = +x) == x && x == 0 ? 1 / x == -Infinity : x < 0;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.math.umulh.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.math.umulh.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

  // `Math.umulh` method
  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
  // TODO: Remove from `core-js@4`
  $({ target: 'Math', stat: true }, {
    umulh: function umulh(u, v) {
      var UINT16 = 0xFFFF;
      var $u = +u;
      var $v = +v;
      var u0 = $u & UINT16;
      var v0 = $v & UINT16;
      var u1 = $u >>> 16;
      var v1 = $v >>> 16;
      var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
      return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.number.from-string.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.number.from-string.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
  var parseInt = __webpack_require__(/*! ../internals/number-parse-int */ "./node_modules/core-js/internals/number-parse-int.js");

  var INVALID_NUMBER_REPRESENTATION = 'Invalid number representation';
  var INVALID_RADIX = 'Invalid radix';
  var valid = /^[\da-z]+$/;

  // `Number.fromString` method
  // https://github.com/tc39/proposal-number-fromstring
  $({ target: 'Number', stat: true }, {
    fromString: function fromString(string, radix) {
      var sign = 1;
      var R, mathNum;
      if (typeof string != 'string') throw TypeError(INVALID_NUMBER_REPRESENTATION);
      if (!string.length) throw SyntaxError(INVALID_NUMBER_REPRESENTATION);
      if (string.charAt(0) == '-') {
        sign = -1;
        string = string.slice(1);
        if (!string.length) throw SyntaxError(INVALID_NUMBER_REPRESENTATION);
      }
      R = radix === undefined ? 10 : toInteger(radix);
      if (R < 2 || R > 36) throw RangeError(INVALID_RADIX);
      if (!valid.test(string) || (mathNum = parseInt(string, R)).toString(R) !== string) {
        throw SyntaxError(INVALID_NUMBER_REPRESENTATION);
      }
      return sign * mathNum;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.observable.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.observable.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  // https://github.com/tc39/proposal-observable
  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
  var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js/internals/set-species.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
  var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
  var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
  var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
  var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
  var getIterator = __webpack_require__(/*! ../internals/get-iterator */ "./node_modules/core-js/internals/get-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
  var hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ "./node_modules/core-js/internals/host-report-errors.js");
  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
  var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

  var OBSERVABLE = wellKnownSymbol('observable');
  var getInternalState = InternalStateModule.get;
  var setInternalState = InternalStateModule.set;

  var getMethod = function (fn) {
    return fn == null ? undefined : aFunction(fn);
  };

  var cleanupSubscription = function (subscriptionState) {
    var cleanup = subscriptionState.cleanup;
    if (cleanup) {
      subscriptionState.cleanup = undefined;
      try {
        cleanup();
      } catch (error) {
        hostReportErrors(error);
      }
    }
  };

  var subscriptionClosed = function (subscriptionState) {
    return subscriptionState.observer === undefined;
  };

  var close = function (subscriptionState) {
    var subscription = subscriptionState.facade;
    if (!DESCRIPTORS) {
      subscription.closed = true;
      var subscriptionObserver = subscriptionState.subscriptionObserver;
      if (subscriptionObserver) subscriptionObserver.closed = true;
    } subscriptionState.observer = undefined;
  };

  var Subscription = function (observer, subscriber) {
    var subscriptionState = setInternalState(this, {
      cleanup: undefined,
      observer: anObject(observer),
      subscriptionObserver: undefined
    });
    var start;
    if (!DESCRIPTORS) this.closed = false;
    try {
      if (start = getMethod(observer.start)) start.call(observer, this);
    } catch (error) {
      hostReportErrors(error);
    }
    if (subscriptionClosed(subscriptionState)) return;
    var subscriptionObserver = subscriptionState.subscriptionObserver = new SubscriptionObserver(this);
    try {
      var cleanup = subscriber(subscriptionObserver);
      var subscription = cleanup;
      if (cleanup != null) subscriptionState.cleanup = typeof cleanup.unsubscribe === 'function'
        ? function () { subscription.unsubscribe(); }
        : aFunction(cleanup);
    } catch (error) {
      subscriptionObserver.error(error);
      return;
    } if (subscriptionClosed(subscriptionState)) cleanupSubscription(subscriptionState);
  };

  Subscription.prototype = redefineAll({}, {
    unsubscribe: function unsubscribe() {
      var subscriptionState = getInternalState(this);
      if (!subscriptionClosed(subscriptionState)) {
        close(subscriptionState);
        cleanupSubscription(subscriptionState);
      }
    }
  });

  if (DESCRIPTORS) defineProperty(Subscription.prototype, 'closed', {
    configurable: true,
    get: function () {
      return subscriptionClosed(getInternalState(this));
    }
  });

  var SubscriptionObserver = function (subscription) {
    setInternalState(this, { subscription: subscription });
    if (!DESCRIPTORS) this.closed = false;
  };

  SubscriptionObserver.prototype = redefineAll({}, {
    next: function next(value) {
      var subscriptionState = getInternalState(getInternalState(this).subscription);
      if (!subscriptionClosed(subscriptionState)) {
        var observer = subscriptionState.observer;
        try {
          var nextMethod = getMethod(observer.next);
          if (nextMethod) nextMethod.call(observer, value);
        } catch (error) {
          hostReportErrors(error);
        }
      }
    },
    error: function error(value) {
      var subscriptionState = getInternalState(getInternalState(this).subscription);
      if (!subscriptionClosed(subscriptionState)) {
        var observer = subscriptionState.observer;
        close(subscriptionState);
        try {
          var errorMethod = getMethod(observer.error);
          if (errorMethod) errorMethod.call(observer, value);
          else hostReportErrors(value);
        } catch (err) {
          hostReportErrors(err);
        } cleanupSubscription(subscriptionState);
      }
    },
    complete: function complete() {
      var subscriptionState = getInternalState(getInternalState(this).subscription);
      if (!subscriptionClosed(subscriptionState)) {
        var observer = subscriptionState.observer;
        close(subscriptionState);
        try {
          var completeMethod = getMethod(observer.complete);
          if (completeMethod) completeMethod.call(observer);
        } catch (error) {
          hostReportErrors(error);
        } cleanupSubscription(subscriptionState);
      }
    }
  });

  if (DESCRIPTORS) defineProperty(SubscriptionObserver.prototype, 'closed', {
    configurable: true,
    get: function () {
      return subscriptionClosed(getInternalState(getInternalState(this).subscription));
    }
  });

  var $Observable = function Observable(subscriber) {
    anInstance(this, $Observable, 'Observable');
    setInternalState(this, { subscriber: aFunction(subscriber) });
  };

  redefineAll($Observable.prototype, {
    subscribe: function subscribe(observer) {
      var length = arguments.length;
      return new Subscription(typeof observer === 'function' ? {
        next: observer,
        error: length > 1 ? arguments[1] : undefined,
        complete: length > 2 ? arguments[2] : undefined
      } : isObject(observer) ? observer : {}, getInternalState(this).subscriber);
    }
  });

  redefineAll($Observable, {
    from: function from(x) {
      var C = typeof this === 'function' ? this : $Observable;
      var observableMethod = getMethod(anObject(x)[OBSERVABLE]);
      if (observableMethod) {
        var observable = anObject(observableMethod.call(x));
        return observable.constructor === C ? observable : new C(function (observer) {
          return observable.subscribe(observer);
        });
      }
      var iterator = getIterator(x);
      return new C(function (observer) {
        iterate(iterator, function (it, stop) {
          observer.next(it);
          if (observer.closed) return stop();
        }, { IS_ITERATOR: true, INTERRUPTED: true });
        observer.complete();
      });
    },
    of: function of() {
      var C = typeof this === 'function' ? this : $Observable;
      var length = arguments.length;
      var items = new Array(length);
      var index = 0;
      while (index < length) items[index] = arguments[index++];
      return new C(function (observer) {
        for (var i = 0; i < length; i++) {
          observer.next(items[i]);
          if (observer.closed) return;
        } observer.complete();
      });
    }
  });

  createNonEnumerableProperty($Observable.prototype, OBSERVABLE, function () { return this; });

  $({ global: true }, {
    Observable: $Observable
  });

  setSpecies('Observable');


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.promise.try.js":
  /*!************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.promise.try.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");
  var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js/internals/perform.js");

  // `Promise.try` method
  // https://github.com/tc39/proposal-promise-try
  $({ target: 'Promise', stat: true }, {
    'try': function (callbackfn) {
      var promiseCapability = newPromiseCapabilityModule.f(this);
      var result = perform(callbackfn);
      (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
      return promiseCapability.promise;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.reflect.define-metadata.js":
  /*!************************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.reflect.define-metadata.js ***!
    \************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var ReflectMetadataModule = __webpack_require__(/*! ../internals/reflect-metadata */ "./node_modules/core-js/internals/reflect-metadata.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

  var toMetadataKey = ReflectMetadataModule.toKey;
  var ordinaryDefineOwnMetadata = ReflectMetadataModule.set;

  // `Reflect.defineMetadata` method
  // https://github.com/rbuckton/reflect-metadata
  $({ target: 'Reflect', stat: true }, {
    defineMetadata: function defineMetadata(metadataKey, metadataValue, target /* , targetKey */) {
      var targetKey = arguments.length < 4 ? undefined : toMetadataKey(arguments[3]);
      ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), targetKey);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.reflect.delete-metadata.js":
  /*!************************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.reflect.delete-metadata.js ***!
    \************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var ReflectMetadataModule = __webpack_require__(/*! ../internals/reflect-metadata */ "./node_modules/core-js/internals/reflect-metadata.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

  var toMetadataKey = ReflectMetadataModule.toKey;
  var getOrCreateMetadataMap = ReflectMetadataModule.getMap;
  var store = ReflectMetadataModule.store;

  // `Reflect.deleteMetadata` method
  // https://github.com/rbuckton/reflect-metadata
  $({ target: 'Reflect', stat: true }, {
    deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
      var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
      if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
      if (metadataMap.size) return true;
      var targetMetadata = store.get(target);
      targetMetadata['delete'](targetKey);
      return !!targetMetadata.size || store['delete'](target);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.reflect.get-metadata-keys.js":
  /*!**************************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.reflect.get-metadata-keys.js ***!
    \**************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
  var Set = __webpack_require__(/*! ../modules/es.set */ "./node_modules/core-js/modules/es.set.js");
  var ReflectMetadataModule = __webpack_require__(/*! ../internals/reflect-metadata */ "./node_modules/core-js/internals/reflect-metadata.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  var ordinaryOwnMetadataKeys = ReflectMetadataModule.keys;
  var toMetadataKey = ReflectMetadataModule.toKey;

  var from = function (iter) {
    var result = [];
    iterate(iter, result.push, { that: result });
    return result;
  };

  var ordinaryMetadataKeys = function (O, P) {
    var oKeys = ordinaryOwnMetadataKeys(O, P);
    var parent = getPrototypeOf(O);
    if (parent === null) return oKeys;
    var pKeys = ordinaryMetadataKeys(parent, P);
    return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
  };

  // `Reflect.getMetadataKeys` method
  // https://github.com/rbuckton/reflect-metadata
  $({ target: 'Reflect', stat: true }, {
    getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
      var targetKey = arguments.length < 2 ? undefined : toMetadataKey(arguments[1]);
      return ordinaryMetadataKeys(anObject(target), targetKey);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.reflect.get-metadata.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.reflect.get-metadata.js ***!
    \*********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var ReflectMetadataModule = __webpack_require__(/*! ../internals/reflect-metadata */ "./node_modules/core-js/internals/reflect-metadata.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");

  var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
  var ordinaryGetOwnMetadata = ReflectMetadataModule.get;
  var toMetadataKey = ReflectMetadataModule.toKey;

  var ordinaryGetMetadata = function (MetadataKey, O, P) {
    var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
    if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
    var parent = getPrototypeOf(O);
    return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
  };

  // `Reflect.getMetadata` method
  // https://github.com/rbuckton/reflect-metadata
  $({ target: 'Reflect', stat: true }, {
    getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
      return ordinaryGetMetadata(metadataKey, anObject(target), targetKey);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.reflect.get-own-metadata-keys.js":
  /*!******************************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.reflect.get-own-metadata-keys.js ***!
    \******************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var ReflectMetadataModule = __webpack_require__(/*! ../internals/reflect-metadata */ "./node_modules/core-js/internals/reflect-metadata.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

  var ordinaryOwnMetadataKeys = ReflectMetadataModule.keys;
  var toMetadataKey = ReflectMetadataModule.toKey;

  // `Reflect.getOwnMetadataKeys` method
  // https://github.com/rbuckton/reflect-metadata
  $({ target: 'Reflect', stat: true }, {
    getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
      var targetKey = arguments.length < 2 ? undefined : toMetadataKey(arguments[1]);
      return ordinaryOwnMetadataKeys(anObject(target), targetKey);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.reflect.get-own-metadata.js":
  /*!*************************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.reflect.get-own-metadata.js ***!
    \*************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var ReflectMetadataModule = __webpack_require__(/*! ../internals/reflect-metadata */ "./node_modules/core-js/internals/reflect-metadata.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

  var ordinaryGetOwnMetadata = ReflectMetadataModule.get;
  var toMetadataKey = ReflectMetadataModule.toKey;

  // `Reflect.getOwnMetadata` method
  // https://github.com/rbuckton/reflect-metadata
  $({ target: 'Reflect', stat: true }, {
    getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
      return ordinaryGetOwnMetadata(metadataKey, anObject(target), targetKey);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.reflect.has-metadata.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.reflect.has-metadata.js ***!
    \*********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var ReflectMetadataModule = __webpack_require__(/*! ../internals/reflect-metadata */ "./node_modules/core-js/internals/reflect-metadata.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");

  var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
  var toMetadataKey = ReflectMetadataModule.toKey;

  var ordinaryHasMetadata = function (MetadataKey, O, P) {
    var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
    if (hasOwn) return true;
    var parent = getPrototypeOf(O);
    return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
  };

  // `Reflect.hasMetadata` method
  // https://github.com/rbuckton/reflect-metadata
  $({ target: 'Reflect', stat: true }, {
    hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
      return ordinaryHasMetadata(metadataKey, anObject(target), targetKey);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.reflect.has-own-metadata.js":
  /*!*************************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.reflect.has-own-metadata.js ***!
    \*************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var ReflectMetadataModule = __webpack_require__(/*! ../internals/reflect-metadata */ "./node_modules/core-js/internals/reflect-metadata.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

  var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
  var toMetadataKey = ReflectMetadataModule.toKey;

  // `Reflect.hasOwnMetadata` method
  // https://github.com/rbuckton/reflect-metadata
  $({ target: 'Reflect', stat: true }, {
    hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
      return ordinaryHasOwnMetadata(metadataKey, anObject(target), targetKey);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.reflect.metadata.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.reflect.metadata.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var ReflectMetadataModule = __webpack_require__(/*! ../internals/reflect-metadata */ "./node_modules/core-js/internals/reflect-metadata.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

  var toMetadataKey = ReflectMetadataModule.toKey;
  var ordinaryDefineOwnMetadata = ReflectMetadataModule.set;

  // `Reflect.metadata` method
  // https://github.com/rbuckton/reflect-metadata
  $({ target: 'Reflect', stat: true }, {
    metadata: function metadata(metadataKey, metadataValue) {
      return function decorator(target, key) {
        ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetadataKey(key));
      };
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.add-all.js":
  /*!************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.add-all.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var collectionAddAll = __webpack_require__(/*! ../internals/collection-add-all */ "./node_modules/core-js/internals/collection-add-all.js");

  // `Set.prototype.addAll` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    addAll: function addAll(/* ...elements */) {
      return collectionAddAll.apply(this, arguments);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.delete-all.js":
  /*!***************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.delete-all.js ***!
    \***************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var collectionDeleteAll = __webpack_require__(/*! ../internals/collection-delete-all */ "./node_modules/core-js/internals/collection-delete-all.js");

  // `Set.prototype.deleteAll` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    deleteAll: function deleteAll(/* ...elements */) {
      return collectionDeleteAll.apply(this, arguments);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.difference.js":
  /*!***************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.difference.js ***!
    \***************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.difference` method
  // https://github.com/tc39/proposal-set-methods
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    difference: function difference(iterable) {
      var set = anObject(this);
      var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
      var remover = aFunction(newSet['delete']);
      iterate(iterable, function (value) {
        remover.call(newSet, value);
      });
      return newSet;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.every.js":
  /*!**********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.every.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var getSetIterator = __webpack_require__(/*! ../internals/get-set-iterator */ "./node_modules/core-js/internals/get-set-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.every` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    every: function every(callbackfn /* , thisArg */) {
      var set = anObject(this);
      var iterator = getSetIterator(set);
      var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return !iterate(iterator, function (value, stop) {
        if (!boundFunction(value, value, set)) return stop();
      }, { IS_ITERATOR: true, INTERRUPTED: true }).stopped;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.filter.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.filter.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
  var getSetIterator = __webpack_require__(/*! ../internals/get-set-iterator */ "./node_modules/core-js/internals/get-set-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.filter` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    filter: function filter(callbackfn /* , thisArg */) {
      var set = anObject(this);
      var iterator = getSetIterator(set);
      var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
      var adder = aFunction(newSet.add);
      iterate(iterator, function (value) {
        if (boundFunction(value, value, set)) adder.call(newSet, value);
      }, { IS_ITERATOR: true });
      return newSet;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.find.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.find.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var getSetIterator = __webpack_require__(/*! ../internals/get-set-iterator */ "./node_modules/core-js/internals/get-set-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.find` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    find: function find(callbackfn /* , thisArg */) {
      var set = anObject(this);
      var iterator = getSetIterator(set);
      var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return iterate(iterator, function (value, stop) {
        if (boundFunction(value, value, set)) return stop(value);
      }, { IS_ITERATOR: true, INTERRUPTED: true }).result;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.from.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.from.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var from = __webpack_require__(/*! ../internals/collection-from */ "./node_modules/core-js/internals/collection-from.js");

  // `Set.from` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
  $({ target: 'Set', stat: true }, {
    from: from
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.intersection.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.intersection.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.intersection` method
  // https://github.com/tc39/proposal-set-methods
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    intersection: function intersection(iterable) {
      var set = anObject(this);
      var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
      var hasCheck = aFunction(set.has);
      var adder = aFunction(newSet.add);
      iterate(iterable, function (value) {
        if (hasCheck.call(set, value)) adder.call(newSet, value);
      });
      return newSet;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.is-disjoint-from.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.is-disjoint-from.js ***!
    \*********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.isDisjointFrom` method
  // https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    isDisjointFrom: function isDisjointFrom(iterable) {
      var set = anObject(this);
      var hasCheck = aFunction(set.has);
      return !iterate(iterable, function (value, stop) {
        if (hasCheck.call(set, value) === true) return stop();
      }, { INTERRUPTED: true }).stopped;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.is-subset-of.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.is-subset-of.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var getIterator = __webpack_require__(/*! ../internals/get-iterator */ "./node_modules/core-js/internals/get-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.isSubsetOf` method
  // https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    isSubsetOf: function isSubsetOf(iterable) {
      var iterator = getIterator(this);
      var otherSet = anObject(iterable);
      var hasCheck = otherSet.has;
      if (typeof hasCheck != 'function') {
        otherSet = new (getBuiltIn('Set'))(iterable);
        hasCheck = aFunction(otherSet.has);
      }
      return !iterate(iterator, function (value, stop) {
        if (hasCheck.call(otherSet, value) === false) return stop();
      }, { IS_ITERATOR: true, INTERRUPTED: true }).stopped;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.is-superset-of.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.is-superset-of.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.isSupersetOf` method
  // https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    isSupersetOf: function isSupersetOf(iterable) {
      var set = anObject(this);
      var hasCheck = aFunction(set.has);
      return !iterate(iterable, function (value, stop) {
        if (hasCheck.call(set, value) === false) return stop();
      }, { INTERRUPTED: true }).stopped;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.join.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.join.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var getSetIterator = __webpack_require__(/*! ../internals/get-set-iterator */ "./node_modules/core-js/internals/get-set-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.join` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    join: function join(separator) {
      var set = anObject(this);
      var iterator = getSetIterator(set);
      var sep = separator === undefined ? ',' : String(separator);
      var result = [];
      iterate(iterator, result.push, { that: result, IS_ITERATOR: true });
      return result.join(sep);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.map.js":
  /*!********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.map.js ***!
    \********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
  var getSetIterator = __webpack_require__(/*! ../internals/get-set-iterator */ "./node_modules/core-js/internals/get-set-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.map` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    map: function map(callbackfn /* , thisArg */) {
      var set = anObject(this);
      var iterator = getSetIterator(set);
      var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
      var adder = aFunction(newSet.add);
      iterate(iterator, function (value) {
        adder.call(newSet, boundFunction(value, value, set));
      }, { IS_ITERATOR: true });
      return newSet;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.of.js":
  /*!*******************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.of.js ***!
    \*******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var of = __webpack_require__(/*! ../internals/collection-of */ "./node_modules/core-js/internals/collection-of.js");

  // `Set.of` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
  $({ target: 'Set', stat: true }, {
    of: of
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.reduce.js":
  /*!***********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.reduce.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var getSetIterator = __webpack_require__(/*! ../internals/get-set-iterator */ "./node_modules/core-js/internals/get-set-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.reduce` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    reduce: function reduce(callbackfn /* , initialValue */) {
      var set = anObject(this);
      var iterator = getSetIterator(set);
      var noInitial = arguments.length < 2;
      var accumulator = noInitial ? undefined : arguments[1];
      aFunction(callbackfn);
      iterate(iterator, function (value) {
        if (noInitial) {
          noInitial = false;
          accumulator = value;
        } else {
          accumulator = callbackfn(accumulator, value, value, set);
        }
      }, { IS_ITERATOR: true });
      if (noInitial) throw TypeError('Reduce of empty set with no initial value');
      return accumulator;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.some.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.some.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var getSetIterator = __webpack_require__(/*! ../internals/get-set-iterator */ "./node_modules/core-js/internals/get-set-iterator.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.some` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    some: function some(callbackfn /* , thisArg */) {
      var set = anObject(this);
      var iterator = getSetIterator(set);
      var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
      return iterate(iterator, function (value, stop) {
        if (boundFunction(value, value, set)) return stop();
      }, { IS_ITERATOR: true, INTERRUPTED: true }).stopped;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.symmetric-difference.js":
  /*!*************************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.symmetric-difference.js ***!
    \*************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.symmetricDifference` method
  // https://github.com/tc39/proposal-set-methods
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    symmetricDifference: function symmetricDifference(iterable) {
      var set = anObject(this);
      var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
      var remover = aFunction(newSet['delete']);
      var adder = aFunction(newSet.add);
      iterate(iterable, function (value) {
        remover.call(newSet, value) || adder.call(newSet, value);
      });
      return newSet;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.set.union.js":
  /*!**********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.set.union.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
  var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
  var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

  // `Set.prototype.union` method
  // https://github.com/tc39/proposal-set-methods
  $({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
    union: function union(iterable) {
      var set = anObject(this);
      var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
      iterate(iterable, aFunction(newSet.add), { that: newSet });
      return newSet;
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.string.at.js":
  /*!**********************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.string.at.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt;
  var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

  var FORCED = fails(function () {
    return '𠮷'.at(0) !== '𠮷';
  });

  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  $({ target: 'String', proto: true, forced: FORCED }, {
    at: function at(pos) {
      return charAt(this, pos);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.string.code-points.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.string.code-points.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
  var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
  var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
  var StringMultibyteModule = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js");

  var codeAt = StringMultibyteModule.codeAt;
  var charAt = StringMultibyteModule.charAt;
  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

  // TODO: unify with String#@@iterator
  var $StringIterator = createIteratorConstructor(function StringIterator(string) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: string,
      index: 0
    });
  }, 'String', function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: { codePoint: codeAt(point, 0), position: index }, done: false };
  });

  // `String.prototype.codePoints` method
  // https://github.com/tc39/proposal-string-prototype-codepoints
  $({ target: 'String', proto: true }, {
    codePoints: function codePoints() {
      return new $StringIterator(String(requireObjectCoercible(this)));
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.symbol.dispose.js":
  /*!***************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.symbol.dispose.js ***!
    \***************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "./node_modules/core-js/internals/define-well-known-symbol.js");

  // `Symbol.dispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement
  defineWellKnownSymbol('dispose');


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.symbol.observable.js":
  /*!******************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.symbol.observable.js ***!
    \******************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "./node_modules/core-js/internals/define-well-known-symbol.js");

  // `Symbol.observable` well-known symbol
  // https://github.com/tc39/proposal-observable
  defineWellKnownSymbol('observable');


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.symbol.pattern-match.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.symbol.pattern-match.js ***!
    \*********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  // TODO: remove from `core-js@4`
  var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "./node_modules/core-js/internals/define-well-known-symbol.js");

  // `Symbol.patternMatch` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching
  defineWellKnownSymbol('patternMatch');


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.weak-map.delete-all.js":
  /*!********************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.weak-map.delete-all.js ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var collectionDeleteAll = __webpack_require__(/*! ../internals/collection-delete-all */ "./node_modules/core-js/internals/collection-delete-all.js");

  // `WeakMap.prototype.deleteAll` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'WeakMap', proto: true, real: true, forced: IS_PURE }, {
    deleteAll: function deleteAll(/* ...elements */) {
      return collectionDeleteAll.apply(this, arguments);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.weak-map.from.js":
  /*!**************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.weak-map.from.js ***!
    \**************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var from = __webpack_require__(/*! ../internals/collection-from */ "./node_modules/core-js/internals/collection-from.js");

  // `WeakMap.from` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
  $({ target: 'WeakMap', stat: true }, {
    from: from
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.weak-map.of.js":
  /*!************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.weak-map.of.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var of = __webpack_require__(/*! ../internals/collection-of */ "./node_modules/core-js/internals/collection-of.js");

  // `WeakMap.of` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
  $({ target: 'WeakMap', stat: true }, {
    of: of
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.weak-set.add-all.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.weak-set.add-all.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var collectionAddAll = __webpack_require__(/*! ../internals/collection-add-all */ "./node_modules/core-js/internals/collection-add-all.js");

  // `WeakSet.prototype.addAll` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'WeakSet', proto: true, real: true, forced: IS_PURE }, {
    addAll: function addAll(/* ...elements */) {
      return collectionAddAll.apply(this, arguments);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.weak-set.delete-all.js":
  /*!********************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.weak-set.delete-all.js ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
  var collectionDeleteAll = __webpack_require__(/*! ../internals/collection-delete-all */ "./node_modules/core-js/internals/collection-delete-all.js");

  // `WeakSet.prototype.deleteAll` method
  // https://github.com/tc39/proposal-collection-methods
  $({ target: 'WeakSet', proto: true, real: true, forced: IS_PURE }, {
    deleteAll: function deleteAll(/* ...elements */) {
      return collectionDeleteAll.apply(this, arguments);
    }
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.weak-set.from.js":
  /*!**************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.weak-set.from.js ***!
    \**************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var from = __webpack_require__(/*! ../internals/collection-from */ "./node_modules/core-js/internals/collection-from.js");

  // `WeakSet.from` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
  $({ target: 'WeakSet', stat: true }, {
    from: from
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/esnext.weak-set.of.js":
  /*!************************************************************!*\
    !*** ./node_modules/core-js/modules/esnext.weak-set.of.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var of = __webpack_require__(/*! ../internals/collection-of */ "./node_modules/core-js/internals/collection-of.js");

  // `WeakSet.of` method
  // https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
  $({ target: 'WeakSet', stat: true }, {
    of: of
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/web.immediate.js":
  /*!*******************************************************!*\
    !*** ./node_modules/core-js/modules/web.immediate.js ***!
    \*******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var task = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js");

  var FORCED = !global.setImmediate || !global.clearImmediate;

  // http://w3c.github.io/setImmediate/
  $({ global: true, bind: true, enumerable: true, forced: FORCED }, {
    // `setImmediate` method
    // http://w3c.github.io/setImmediate/#si-setImmediate
    setImmediate: task.set,
    // `clearImmediate` method
    // http://w3c.github.io/setImmediate/#si-clearImmediate
    clearImmediate: task.clear
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/web.url-search-params.js":
  /*!***************************************************************!*\
    !*** ./node_modules/core-js/modules/web.url-search-params.js ***!
    \***************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
  __webpack_require__(/*! ../modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
  var USE_NATIVE_URL = __webpack_require__(/*! ../internals/native-url */ "./node_modules/core-js/internals/native-url.js");
  var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
  var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
  var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
  var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
  var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
  var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
  var hasOwn = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
  var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
  var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
  var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
  var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
  var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
  var getIterator = __webpack_require__(/*! ../internals/get-iterator */ "./node_modules/core-js/internals/get-iterator.js");
  var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");
  var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

  var $fetch = getBuiltIn('fetch');
  var Headers = getBuiltIn('Headers');
  var ITERATOR = wellKnownSymbol('iterator');
  var URL_SEARCH_PARAMS = 'URLSearchParams';
  var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
  var setInternalState = InternalStateModule.set;
  var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
  var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

  var plus = /\+/g;
  var sequences = Array(4);

  var percentSequence = function (bytes) {
    return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
  };

  var percentDecode = function (sequence) {
    try {
      return decodeURIComponent(sequence);
    } catch (error) {
      return sequence;
    }
  };

  var deserialize = function (it) {
    var result = it.replace(plus, ' ');
    var bytes = 4;
    try {
      return decodeURIComponent(result);
    } catch (error) {
      while (bytes) {
        result = result.replace(percentSequence(bytes--), percentDecode);
      }
      return result;
    }
  };

  var find = /[!'()~]|%20/g;

  var replace = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+'
  };

  var replacer = function (match) {
    return replace[match];
  };

  var serialize = function (it) {
    return encodeURIComponent(it).replace(find, replacer);
  };

  var parseSearchParams = function (result, query) {
    if (query) {
      var attributes = query.split('&');
      var index = 0;
      var attribute, entry;
      while (index < attributes.length) {
        attribute = attributes[index++];
        if (attribute.length) {
          entry = attribute.split('=');
          result.push({
            key: deserialize(entry.shift()),
            value: deserialize(entry.join('='))
          });
        }
      }
    }
  };

  var updateSearchParams = function (query) {
    this.entries.length = 0;
    parseSearchParams(this.entries, query);
  };

  var validateArgumentsLength = function (passed, required) {
    if (passed < required) throw TypeError('Not enough arguments');
  };

  var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
    setInternalState(this, {
      type: URL_SEARCH_PARAMS_ITERATOR,
      iterator: getIterator(getInternalParamsState(params).entries),
      kind: kind
    });
  }, 'Iterator', function next() {
    var state = getInternalIteratorState(this);
    var kind = state.kind;
    var step = state.iterator.next();
    var entry = step.value;
    if (!step.done) {
      step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
    } return step;
  });

  // `URLSearchParams` constructor
  // https://url.spec.whatwg.org/#interface-urlsearchparams
  var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
    anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
    var init = arguments.length > 0 ? arguments[0] : undefined;
    var that = this;
    var entries = [];
    var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

    setInternalState(that, {
      type: URL_SEARCH_PARAMS,
      entries: entries,
      updateURL: function () { /* empty */ },
      updateSearchParams: updateSearchParams
    });

    if (init !== undefined) {
      if (isObject(init)) {
        iteratorMethod = getIteratorMethod(init);
        if (typeof iteratorMethod === 'function') {
          iterator = iteratorMethod.call(init);
          next = iterator.next;
          while (!(step = next.call(iterator)).done) {
            entryIterator = getIterator(anObject(step.value));
            entryNext = entryIterator.next;
            if (
              (first = entryNext.call(entryIterator)).done ||
              (second = entryNext.call(entryIterator)).done ||
              !entryNext.call(entryIterator).done
            ) throw TypeError('Expected sequence with length 2');
            entries.push({ key: first.value + '', value: second.value + '' });
          }
        } else for (key in init) if (hasOwn(init, key)) entries.push({ key: key, value: init[key] + '' });
      } else {
        parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
      }
    }
  };

  var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

  redefineAll(URLSearchParamsPrototype, {
    // `URLSearchParams.prototype.append` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-append
    append: function append(name, value) {
      validateArgumentsLength(arguments.length, 2);
      var state = getInternalParamsState(this);
      state.entries.push({ key: name + '', value: value + '' });
      state.updateURL();
    },
    // `URLSearchParams.prototype.delete` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
    'delete': function (name) {
      validateArgumentsLength(arguments.length, 1);
      var state = getInternalParamsState(this);
      var entries = state.entries;
      var key = name + '';
      var index = 0;
      while (index < entries.length) {
        if (entries[index].key === key) entries.splice(index, 1);
        else index++;
      }
      state.updateURL();
    },
    // `URLSearchParams.prototype.get` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-get
    get: function get(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = name + '';
      var index = 0;
      for (; index < entries.length; index++) {
        if (entries[index].key === key) return entries[index].value;
      }
      return null;
    },
    // `URLSearchParams.prototype.getAll` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
    getAll: function getAll(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = name + '';
      var result = [];
      var index = 0;
      for (; index < entries.length; index++) {
        if (entries[index].key === key) result.push(entries[index].value);
      }
      return result;
    },
    // `URLSearchParams.prototype.has` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-has
    has: function has(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = name + '';
      var index = 0;
      while (index < entries.length) {
        if (entries[index++].key === key) return true;
      }
      return false;
    },
    // `URLSearchParams.prototype.set` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-set
    set: function set(name, value) {
      validateArgumentsLength(arguments.length, 1);
      var state = getInternalParamsState(this);
      var entries = state.entries;
      var found = false;
      var key = name + '';
      var val = value + '';
      var index = 0;
      var entry;
      for (; index < entries.length; index++) {
        entry = entries[index];
        if (entry.key === key) {
          if (found) entries.splice(index--, 1);
          else {
            found = true;
            entry.value = val;
          }
        }
      }
      if (!found) entries.push({ key: key, value: val });
      state.updateURL();
    },
    // `URLSearchParams.prototype.sort` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
    sort: function sort() {
      var state = getInternalParamsState(this);
      var entries = state.entries;
      // Array#sort is not stable in some engines
      var slice = entries.slice();
      var entry, entriesIndex, sliceIndex;
      entries.length = 0;
      for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
        entry = slice[sliceIndex];
        for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
          if (entries[entriesIndex].key > entry.key) {
            entries.splice(entriesIndex, 0, entry);
            break;
          }
        }
        if (entriesIndex === sliceIndex) entries.push(entry);
      }
      state.updateURL();
    },
    // `URLSearchParams.prototype.forEach` method
    forEach: function forEach(callback /* , thisArg */) {
      var entries = getInternalParamsState(this).entries;
      var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
      var index = 0;
      var entry;
      while (index < entries.length) {
        entry = entries[index++];
        boundFunction(entry.value, entry.key, this);
      }
    },
    // `URLSearchParams.prototype.keys` method
    keys: function keys() {
      return new URLSearchParamsIterator(this, 'keys');
    },
    // `URLSearchParams.prototype.values` method
    values: function values() {
      return new URLSearchParamsIterator(this, 'values');
    },
    // `URLSearchParams.prototype.entries` method
    entries: function entries() {
      return new URLSearchParamsIterator(this, 'entries');
    }
  }, { enumerable: true });

  // `URLSearchParams.prototype[@@iterator]` method
  redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);

  // `URLSearchParams.prototype.toString` method
  // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
  redefine(URLSearchParamsPrototype, 'toString', function toString() {
    var entries = getInternalParamsState(this).entries;
    var result = [];
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      result.push(serialize(entry.key) + '=' + serialize(entry.value));
    } return result.join('&');
  }, { enumerable: true });

  setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

  $({ global: true, forced: !USE_NATIVE_URL }, {
    URLSearchParams: URLSearchParamsConstructor
  });

  // Wrap `fetch` for correct work with polyfilled `URLSearchParams`
  // https://github.com/zloirock/core-js/issues/674
  if (!USE_NATIVE_URL && typeof $fetch == 'function' && typeof Headers == 'function') {
    $({ global: true, enumerable: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        var args = [input];
        var init, body, headers;
        if (arguments.length > 1) {
          init = arguments[1];
          if (isObject(init)) {
            body = init.body;
            if (classof(body) === URL_SEARCH_PARAMS) {
              headers = init.headers ? new Headers(init.headers) : new Headers();
              if (!headers.has('content-type')) {
                headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
              }
              init = create(init, {
                body: createPropertyDescriptor(0, String(body)),
                headers: createPropertyDescriptor(0, headers)
              });
            }
          }
          args.push(init);
        } return $fetch.apply(this, args);
      }
    });
  }

  module.exports = {
    URLSearchParams: URLSearchParamsConstructor,
    getState: getInternalParamsState
  };


  /***/ }),

  /***/ "./node_modules/core-js/modules/web.url.js":
  /*!*************************************************!*\
    !*** ./node_modules/core-js/modules/web.url.js ***!
    \*************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
  __webpack_require__(/*! ../modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
  var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
  var USE_NATIVE_URL = __webpack_require__(/*! ../internals/native-url */ "./node_modules/core-js/internals/native-url.js");
  var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
  var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
  var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
  var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
  var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
  var assign = __webpack_require__(/*! ../internals/object-assign */ "./node_modules/core-js/internals/object-assign.js");
  var arrayFrom = __webpack_require__(/*! ../internals/array-from */ "./node_modules/core-js/internals/array-from.js");
  var codeAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").codeAt;
  var toASCII = __webpack_require__(/*! ../internals/string-punycode-to-ascii */ "./node_modules/core-js/internals/string-punycode-to-ascii.js");
  var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
  var URLSearchParamsModule = __webpack_require__(/*! ../modules/web.url-search-params */ "./node_modules/core-js/modules/web.url-search-params.js");
  var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

  var NativeURL = global.URL;
  var URLSearchParams = URLSearchParamsModule.URLSearchParams;
  var getInternalSearchParamsState = URLSearchParamsModule.getState;
  var setInternalState = InternalStateModule.set;
  var getInternalURLState = InternalStateModule.getterFor('URL');
  var floor = Math.floor;
  var pow = Math.pow;

  var INVALID_AUTHORITY = 'Invalid authority';
  var INVALID_SCHEME = 'Invalid scheme';
  var INVALID_HOST = 'Invalid host';
  var INVALID_PORT = 'Invalid port';

  var ALPHA = /[A-Za-z]/;
  // eslint-disable-next-line regexp/no-obscure-range -- safe
  var ALPHANUMERIC = /[\d+-.A-Za-z]/;
  var DIGIT = /\d/;
  var HEX_START = /^0x/i;
  var OCT = /^[0-7]+$/;
  var DEC = /^\d+$/;
  var HEX = /^[\dA-Fa-f]+$/;
  /* eslint-disable no-control-regex -- safe */
  var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
  var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
  var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
  var TAB_AND_NEW_LINE = /[\t\n\r]/g;
  /* eslint-enable no-control-regex -- safe */
  var EOF;

  var parseHost = function (url, input) {
    var result, codePoints, index;
    if (input.charAt(0) == '[') {
      if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
      result = parseIPv6(input.slice(1, -1));
      if (!result) return INVALID_HOST;
      url.host = result;
    // opaque host
    } else if (!isSpecial(url)) {
      if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
      result = '';
      codePoints = arrayFrom(input);
      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }
      url.host = result;
    } else {
      input = toASCII(input);
      if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null) return INVALID_HOST;
      url.host = result;
    }
  };

  var parseIPv4 = function (input) {
    var parts = input.split('.');
    var partsLength, numbers, index, part, radix, number, ipv4;
    if (parts.length && parts[parts.length - 1] == '') {
      parts.pop();
    }
    partsLength = parts.length;
    if (partsLength > 4) return input;
    numbers = [];
    for (index = 0; index < partsLength; index++) {
      part = parts[index];
      if (part == '') return input;
      radix = 10;
      if (part.length > 1 && part.charAt(0) == '0') {
        radix = HEX_START.test(part) ? 16 : 8;
        part = part.slice(radix == 8 ? 1 : 2);
      }
      if (part === '') {
        number = 0;
      } else {
        if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
        number = parseInt(part, radix);
      }
      numbers.push(number);
    }
    for (index = 0; index < partsLength; index++) {
      number = numbers[index];
      if (index == partsLength - 1) {
        if (number >= pow(256, 5 - partsLength)) return null;
      } else if (number > 255) return null;
    }
    ipv4 = numbers.pop();
    for (index = 0; index < numbers.length; index++) {
      ipv4 += numbers[index] * pow(256, 3 - index);
    }
    return ipv4;
  };

  // eslint-disable-next-line max-statements -- TODO
  var parseIPv6 = function (input) {
    var address = [0, 0, 0, 0, 0, 0, 0, 0];
    var pieceIndex = 0;
    var compress = null;
    var pointer = 0;
    var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

    var char = function () {
      return input.charAt(pointer);
    };

    if (char() == ':') {
      if (input.charAt(1) != ':') return;
      pointer += 2;
      pieceIndex++;
      compress = pieceIndex;
    }
    while (char()) {
      if (pieceIndex == 8) return;
      if (char() == ':') {
        if (compress !== null) return;
        pointer++;
        pieceIndex++;
        compress = pieceIndex;
        continue;
      }
      value = length = 0;
      while (length < 4 && HEX.test(char())) {
        value = value * 16 + parseInt(char(), 16);
        pointer++;
        length++;
      }
      if (char() == '.') {
        if (length == 0) return;
        pointer -= length;
        if (pieceIndex > 6) return;
        numbersSeen = 0;
        while (char()) {
          ipv4Piece = null;
          if (numbersSeen > 0) {
            if (char() == '.' && numbersSeen < 4) pointer++;
            else return;
          }
          if (!DIGIT.test(char())) return;
          while (DIGIT.test(char())) {
            number = parseInt(char(), 10);
            if (ipv4Piece === null) ipv4Piece = number;
            else if (ipv4Piece == 0) return;
            else ipv4Piece = ipv4Piece * 10 + number;
            if (ipv4Piece > 255) return;
            pointer++;
          }
          address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
          numbersSeen++;
          if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
        }
        if (numbersSeen != 4) return;
        break;
      } else if (char() == ':') {
        pointer++;
        if (!char()) return;
      } else if (char()) return;
      address[pieceIndex++] = value;
    }
    if (compress !== null) {
      swaps = pieceIndex - compress;
      pieceIndex = 7;
      while (pieceIndex != 0 && swaps > 0) {
        swap = address[pieceIndex];
        address[pieceIndex--] = address[compress + swaps - 1];
        address[compress + --swaps] = swap;
      }
    } else if (pieceIndex != 8) return;
    return address;
  };

  var findLongestZeroSequence = function (ipv6) {
    var maxIndex = null;
    var maxLength = 1;
    var currStart = null;
    var currLength = 0;
    var index = 0;
    for (; index < 8; index++) {
      if (ipv6[index] !== 0) {
        if (currLength > maxLength) {
          maxIndex = currStart;
          maxLength = currLength;
        }
        currStart = null;
        currLength = 0;
      } else {
        if (currStart === null) currStart = index;
        ++currLength;
      }
    }
    if (currLength > maxLength) {
      maxIndex = currStart;
      maxLength = currLength;
    }
    return maxIndex;
  };

  var serializeHost = function (host) {
    var result, index, compress, ignore0;
    // ipv4
    if (typeof host == 'number') {
      result = [];
      for (index = 0; index < 4; index++) {
        result.unshift(host % 256);
        host = floor(host / 256);
      } return result.join('.');
    // ipv6
    } else if (typeof host == 'object') {
      result = '';
      compress = findLongestZeroSequence(host);
      for (index = 0; index < 8; index++) {
        if (ignore0 && host[index] === 0) continue;
        if (ignore0) ignore0 = false;
        if (compress === index) {
          result += index ? ':' : '::';
          ignore0 = true;
        } else {
          result += host[index].toString(16);
          if (index < 7) result += ':';
        }
      }
      return '[' + result + ']';
    } return host;
  };

  var C0ControlPercentEncodeSet = {};
  var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
    ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
  });
  var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
    '#': 1, '?': 1, '{': 1, '}': 1
  });
  var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
    '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
  });

  var percentEncode = function (char, set) {
    var code = codeAt(char, 0);
    return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
  };

  var specialSchemes = {
    ftp: 21,
    file: null,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
  };

  var isSpecial = function (url) {
    return has(specialSchemes, url.scheme);
  };

  var includesCredentials = function (url) {
    return url.username != '' || url.password != '';
  };

  var cannotHaveUsernamePasswordPort = function (url) {
    return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
  };

  var isWindowsDriveLetter = function (string, normalized) {
    var second;
    return string.length == 2 && ALPHA.test(string.charAt(0))
      && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
  };

  var startsWithWindowsDriveLetter = function (string) {
    var third;
    return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
      string.length == 2 ||
      ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
    );
  };

  var shortenURLsPath = function (url) {
    var path = url.path;
    var pathSize = path.length;
    if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
      path.pop();
    }
  };

  var isSingleDot = function (segment) {
    return segment === '.' || segment.toLowerCase() === '%2e';
  };

  var isDoubleDot = function (segment) {
    segment = segment.toLowerCase();
    return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
  };

  // States:
  var SCHEME_START = {};
  var SCHEME = {};
  var NO_SCHEME = {};
  var SPECIAL_RELATIVE_OR_AUTHORITY = {};
  var PATH_OR_AUTHORITY = {};
  var RELATIVE = {};
  var RELATIVE_SLASH = {};
  var SPECIAL_AUTHORITY_SLASHES = {};
  var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
  var AUTHORITY = {};
  var HOST = {};
  var HOSTNAME = {};
  var PORT = {};
  var FILE = {};
  var FILE_SLASH = {};
  var FILE_HOST = {};
  var PATH_START = {};
  var PATH = {};
  var CANNOT_BE_A_BASE_URL_PATH = {};
  var QUERY = {};
  var FRAGMENT = {};

  // eslint-disable-next-line max-statements -- TODO
  var parseURL = function (url, input, stateOverride, base) {
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, char, bufferCodePoints, failure;

    if (!stateOverride) {
      url.scheme = '';
      url.username = '';
      url.password = '';
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
    }

    input = input.replace(TAB_AND_NEW_LINE, '');

    codePoints = arrayFrom(input);

    while (pointer <= codePoints.length) {
      char = codePoints[pointer];
      switch (state) {
        case SCHEME_START:
          if (char && ALPHA.test(char)) {
            buffer += char.toLowerCase();
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else return INVALID_SCHEME;
          break;

        case SCHEME:
          if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
            buffer += char.toLowerCase();
          } else if (char == ':') {
            if (stateOverride && (
              (isSpecial(url) != has(specialSchemes, buffer)) ||
              (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
              (url.scheme == 'file' && !url.host)
            )) return;
            url.scheme = buffer;
            if (stateOverride) {
              if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
              return;
            }
            buffer = '';
            if (url.scheme == 'file') {
              state = FILE;
            } else if (isSpecial(url) && base && base.scheme == url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (isSpecial(url)) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] == '/') {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              url.path.push('');
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = '';
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME;
          break;

        case NO_SCHEME:
          if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
          if (base.cannotBeABaseURL && char == '#') {
            url.scheme = base.scheme;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }
          state = base.scheme == 'file' ? FILE : RELATIVE;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (char == '/' && codePoints[pointer + 1] == '/') {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          } break;

        case PATH_OR_AUTHORITY:
          if (char == '/') {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }

        case RELATIVE:
          url.scheme = base.scheme;
          if (char == EOF) {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '/' || (char == '\\' && isSpecial(url))) {
            state = RELATIVE_SLASH;
          } else if (char == '?') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = base.path.slice();
            url.path.pop();
            state = PATH;
            continue;
          } break;

        case RELATIVE_SLASH:
          if (isSpecial(url) && (char == '/' || char == '\\')) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (char == '/') {
            state = AUTHORITY;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH;
            continue;
          } break;

        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (char != '/' && char != '\\') {
            state = AUTHORITY;
            continue;
          } break;

        case AUTHORITY:
          if (char == '@') {
            if (seenAt) buffer = '%40' + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);
            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];
              if (codePoint == ':' && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }
              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
              if (seenPasswordToken) url.password += encodedCodePoints;
              else url.username += encodedCodePoints;
            }
            buffer = '';
          } else if (
            char == EOF || char == '/' || char == '?' || char == '#' ||
            (char == '\\' && isSpecial(url))
          ) {
            if (seenAt && buffer == '') return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = '';
            state = HOST;
          } else buffer += char;
          break;

        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme == 'file') {
            state = FILE_HOST;
            continue;
          } else if (char == ':' && !seenBracket) {
            if (buffer == '') return INVALID_HOST;
            failure = parseHost(url, buffer);
            if (failure) return failure;
            buffer = '';
            state = PORT;
            if (stateOverride == HOSTNAME) return;
          } else if (
            char == EOF || char == '/' || char == '?' || char == '#' ||
            (char == '\\' && isSpecial(url))
          ) {
            if (isSpecial(url) && buffer == '') return INVALID_HOST;
            if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
            failure = parseHost(url, buffer);
            if (failure) return failure;
            buffer = '';
            state = PATH_START;
            if (stateOverride) return;
            continue;
          } else {
            if (char == '[') seenBracket = true;
            else if (char == ']') seenBracket = false;
            buffer += char;
          } break;

        case PORT:
          if (DIGIT.test(char)) {
            buffer += char;
          } else if (
            char == EOF || char == '/' || char == '?' || char == '#' ||
            (char == '\\' && isSpecial(url)) ||
            stateOverride
          ) {
            if (buffer != '') {
              var port = parseInt(buffer, 10);
              if (port > 0xFFFF) return INVALID_PORT;
              url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
              buffer = '';
            }
            if (stateOverride) return;
            state = PATH_START;
            continue;
          } else return INVALID_PORT;
          break;

        case FILE:
          url.scheme = 'file';
          if (char == '/' || char == '\\') state = FILE_SLASH;
          else if (base && base.scheme == 'file') {
            if (char == EOF) {
              url.host = base.host;
              url.path = base.path.slice();
              url.query = base.query;
            } else if (char == '?') {
              url.host = base.host;
              url.path = base.path.slice();
              url.query = '';
              state = QUERY;
            } else if (char == '#') {
              url.host = base.host;
              url.path = base.path.slice();
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT;
            } else {
              if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
                url.host = base.host;
                url.path = base.path.slice();
                shortenURLsPath(url);
              }
              state = PATH;
              continue;
            }
          } else {
            state = PATH;
            continue;
          } break;

        case FILE_SLASH:
          if (char == '/' || char == '\\') {
            state = FILE_HOST;
            break;
          }
          if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
            if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
            else url.host = base.host;
          }
          state = PATH;
          continue;

        case FILE_HOST:
          if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer == '') {
              url.host = '';
              if (stateOverride) return;
              state = PATH_START;
            } else {
              failure = parseHost(url, buffer);
              if (failure) return failure;
              if (url.host == 'localhost') url.host = '';
              if (stateOverride) return;
              buffer = '';
              state = PATH_START;
            } continue;
          } else buffer += char;
          break;

        case PATH_START:
          if (isSpecial(url)) {
            state = PATH;
            if (char != '/' && char != '\\') continue;
          } else if (!stateOverride && char == '?') {
            url.query = '';
            state = QUERY;
          } else if (!stateOverride && char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (char != EOF) {
            state = PATH;
            if (char != '/') continue;
          } break;

        case PATH:
          if (
            char == EOF || char == '/' ||
            (char == '\\' && isSpecial(url)) ||
            (!stateOverride && (char == '?' || char == '#'))
          ) {
            if (isDoubleDot(buffer)) {
              shortenURLsPath(url);
              if (char != '/' && !(char == '\\' && isSpecial(url))) {
                url.path.push('');
              }
            } else if (isSingleDot(buffer)) {
              if (char != '/' && !(char == '\\' && isSpecial(url))) {
                url.path.push('');
              }
            } else {
              if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                if (url.host) url.host = '';
                buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
              }
              url.path.push(buffer);
            }
            buffer = '';
            if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
              while (url.path.length > 1 && url.path[0] === '') {
                url.path.shift();
              }
            }
            if (char == '?') {
              url.query = '';
              state = QUERY;
            } else if (char == '#') {
              url.fragment = '';
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(char, pathPercentEncodeSet);
          } break;

        case CANNOT_BE_A_BASE_URL_PATH:
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (char != EOF) {
            url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
          } break;

        case QUERY:
          if (!stateOverride && char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (char != EOF) {
            if (char == "'" && isSpecial(url)) url.query += '%27';
            else if (char == '#') url.query += '%23';
            else url.query += percentEncode(char, C0ControlPercentEncodeSet);
          } break;

        case FRAGMENT:
          if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
          break;
      }

      pointer++;
    }
  };

  // `URL` constructor
  // https://url.spec.whatwg.org/#url-class
  var URLConstructor = function URL(url /* , base */) {
    var that = anInstance(this, URLConstructor, 'URL');
    var base = arguments.length > 1 ? arguments[1] : undefined;
    var urlString = String(url);
    var state = setInternalState(that, { type: 'URL' });
    var baseState, failure;
    if (base !== undefined) {
      if (base instanceof URLConstructor) baseState = getInternalURLState(base);
      else {
        failure = parseURL(baseState = {}, String(base));
        if (failure) throw TypeError(failure);
      }
    }
    failure = parseURL(state, urlString, null, baseState);
    if (failure) throw TypeError(failure);
    var searchParams = state.searchParams = new URLSearchParams();
    var searchParamsState = getInternalSearchParamsState(searchParams);
    searchParamsState.updateSearchParams(state.query);
    searchParamsState.updateURL = function () {
      state.query = String(searchParams) || null;
    };
    if (!DESCRIPTORS) {
      that.href = serializeURL.call(that);
      that.origin = getOrigin.call(that);
      that.protocol = getProtocol.call(that);
      that.username = getUsername.call(that);
      that.password = getPassword.call(that);
      that.host = getHost.call(that);
      that.hostname = getHostname.call(that);
      that.port = getPort.call(that);
      that.pathname = getPathname.call(that);
      that.search = getSearch.call(that);
      that.searchParams = getSearchParams.call(that);
      that.hash = getHash.call(that);
    }
  };

  var URLPrototype = URLConstructor.prototype;

  var serializeURL = function () {
    var url = getInternalURLState(this);
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ':';
    if (host !== null) {
      output += '//';
      if (includesCredentials(url)) {
        output += username + (password ? ':' + password : '') + '@';
      }
      output += serializeHost(host);
      if (port !== null) output += ':' + port;
    } else if (scheme == 'file') output += '//';
    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
    if (query !== null) output += '?' + query;
    if (fragment !== null) output += '#' + fragment;
    return output;
  };

  var getOrigin = function () {
    var url = getInternalURLState(this);
    var scheme = url.scheme;
    var port = url.port;
    if (scheme == 'blob') try {
      return new URLConstructor(scheme.path[0]).origin;
    } catch (error) {
      return 'null';
    }
    if (scheme == 'file' || !isSpecial(url)) return 'null';
    return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
  };

  var getProtocol = function () {
    return getInternalURLState(this).scheme + ':';
  };

  var getUsername = function () {
    return getInternalURLState(this).username;
  };

  var getPassword = function () {
    return getInternalURLState(this).password;
  };

  var getHost = function () {
    var url = getInternalURLState(this);
    var host = url.host;
    var port = url.port;
    return host === null ? ''
      : port === null ? serializeHost(host)
      : serializeHost(host) + ':' + port;
  };

  var getHostname = function () {
    var host = getInternalURLState(this).host;
    return host === null ? '' : serializeHost(host);
  };

  var getPort = function () {
    var port = getInternalURLState(this).port;
    return port === null ? '' : String(port);
  };

  var getPathname = function () {
    var url = getInternalURLState(this);
    var path = url.path;
    return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  };

  var getSearch = function () {
    var query = getInternalURLState(this).query;
    return query ? '?' + query : '';
  };

  var getSearchParams = function () {
    return getInternalURLState(this).searchParams;
  };

  var getHash = function () {
    var fragment = getInternalURLState(this).fragment;
    return fragment ? '#' + fragment : '';
  };

  var accessorDescriptor = function (getter, setter) {
    return { get: getter, set: setter, configurable: true, enumerable: true };
  };

  if (DESCRIPTORS) {
    defineProperties(URLPrototype, {
      // `URL.prototype.href` accessors pair
      // https://url.spec.whatwg.org/#dom-url-href
      href: accessorDescriptor(serializeURL, function (href) {
        var url = getInternalURLState(this);
        var urlString = String(href);
        var failure = parseURL(url, urlString);
        if (failure) throw TypeError(failure);
        getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
      }),
      // `URL.prototype.origin` getter
      // https://url.spec.whatwg.org/#dom-url-origin
      origin: accessorDescriptor(getOrigin),
      // `URL.prototype.protocol` accessors pair
      // https://url.spec.whatwg.org/#dom-url-protocol
      protocol: accessorDescriptor(getProtocol, function (protocol) {
        var url = getInternalURLState(this);
        parseURL(url, String(protocol) + ':', SCHEME_START);
      }),
      // `URL.prototype.username` accessors pair
      // https://url.spec.whatwg.org/#dom-url-username
      username: accessorDescriptor(getUsername, function (username) {
        var url = getInternalURLState(this);
        var codePoints = arrayFrom(String(username));
        if (cannotHaveUsernamePasswordPort(url)) return;
        url.username = '';
        for (var i = 0; i < codePoints.length; i++) {
          url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
        }
      }),
      // `URL.prototype.password` accessors pair
      // https://url.spec.whatwg.org/#dom-url-password
      password: accessorDescriptor(getPassword, function (password) {
        var url = getInternalURLState(this);
        var codePoints = arrayFrom(String(password));
        if (cannotHaveUsernamePasswordPort(url)) return;
        url.password = '';
        for (var i = 0; i < codePoints.length; i++) {
          url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
        }
      }),
      // `URL.prototype.host` accessors pair
      // https://url.spec.whatwg.org/#dom-url-host
      host: accessorDescriptor(getHost, function (host) {
        var url = getInternalURLState(this);
        if (url.cannotBeABaseURL) return;
        parseURL(url, String(host), HOST);
      }),
      // `URL.prototype.hostname` accessors pair
      // https://url.spec.whatwg.org/#dom-url-hostname
      hostname: accessorDescriptor(getHostname, function (hostname) {
        var url = getInternalURLState(this);
        if (url.cannotBeABaseURL) return;
        parseURL(url, String(hostname), HOSTNAME);
      }),
      // `URL.prototype.port` accessors pair
      // https://url.spec.whatwg.org/#dom-url-port
      port: accessorDescriptor(getPort, function (port) {
        var url = getInternalURLState(this);
        if (cannotHaveUsernamePasswordPort(url)) return;
        port = String(port);
        if (port == '') url.port = null;
        else parseURL(url, port, PORT);
      }),
      // `URL.prototype.pathname` accessors pair
      // https://url.spec.whatwg.org/#dom-url-pathname
      pathname: accessorDescriptor(getPathname, function (pathname) {
        var url = getInternalURLState(this);
        if (url.cannotBeABaseURL) return;
        url.path = [];
        parseURL(url, pathname + '', PATH_START);
      }),
      // `URL.prototype.search` accessors pair
      // https://url.spec.whatwg.org/#dom-url-search
      search: accessorDescriptor(getSearch, function (search) {
        var url = getInternalURLState(this);
        search = String(search);
        if (search == '') {
          url.query = null;
        } else {
          if ('?' == search.charAt(0)) search = search.slice(1);
          url.query = '';
          parseURL(url, search, QUERY);
        }
        getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
      }),
      // `URL.prototype.searchParams` getter
      // https://url.spec.whatwg.org/#dom-url-searchparams
      searchParams: accessorDescriptor(getSearchParams),
      // `URL.prototype.hash` accessors pair
      // https://url.spec.whatwg.org/#dom-url-hash
      hash: accessorDescriptor(getHash, function (hash) {
        var url = getInternalURLState(this);
        hash = String(hash);
        if (hash == '') {
          url.fragment = null;
          return;
        }
        if ('#' == hash.charAt(0)) hash = hash.slice(1);
        url.fragment = '';
        parseURL(url, hash, FRAGMENT);
      })
    });
  }

  // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson
  redefine(URLPrototype, 'toJSON', function toJSON() {
    return serializeURL.call(this);
  }, { enumerable: true });

  // `URL.prototype.toString` method
  // https://url.spec.whatwg.org/#URL-stringification-behavior
  redefine(URLPrototype, 'toString', function toString() {
    return serializeURL.call(this);
  }, { enumerable: true });

  if (NativeURL) {
    var nativeCreateObjectURL = NativeURL.createObjectURL;
    var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
    // `URL.createObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
      return nativeCreateObjectURL.apply(NativeURL, arguments);
    });
    // `URL.revokeObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
      return nativeRevokeObjectURL.apply(NativeURL, arguments);
    });
  }

  setToStringTag(URLConstructor, 'URL');

  $({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
    URL: URLConstructor
  });


  /***/ }),

  /***/ "./node_modules/core-js/modules/web.url.to-json.js":
  /*!*********************************************************!*\
    !*** ./node_modules/core-js/modules/web.url.to-json.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

  // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson
  $({ target: 'URL', proto: true, enumerable: true }, {
    toJSON: function toJSON() {
      return URL.prototype.toString.call(this);
    }
  });


  /***/ }),

  /***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/styles/styles.css":
  /*!***************************************************************************************************************************!*\
    !*** ./node_modules/css-loader/dist/cjs.js??ref--11-1!./node_modules/postcss-loader/src??postcss!./src/styles/styles.css ***!
    \***************************************************************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  // Imports
  var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
  exports = ___CSS_LOADER_API_IMPORT___(false);
  // Module
  exports.push([module.i, ".dicharts--boilerplate-chart {\n  width: 100%;\n  min-height: 450px;\n}\n\n.spotlight-banner.data-selector--wrapper {\n  padding: 1em 2em;\n}\n\n.spotlight-banner .labelled-data-selector--wrapper .data-selector {\n  left: 0;\n}\n\n.labelled-data-selector--wrapper {\n  display: inline-block;\n}\n", ""]);
  // Exports
  module.exports = exports;


  /***/ }),

  /***/ "./node_modules/css-loader/dist/runtime/api.js":
  /*!*****************************************************!*\
    !*** ./node_modules/css-loader/dist/runtime/api.js ***!
    \*****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  // eslint-disable-next-line func-names
  module.exports = function (useSourceMap) {
    var list = []; // return the list of modules as css string

    list.toString = function toString() {
      return this.map(function (item) {
        var content = cssWithMappingToString(item, useSourceMap);

        if (item[2]) {
          return "@media ".concat(item[2], " {").concat(content, "}");
        }

        return content;
      }).join('');
    }; // import a list of modules into the list
    // eslint-disable-next-line func-names


    list.i = function (modules, mediaQuery, dedupe) {
      if (typeof modules === 'string') {
        // eslint-disable-next-line no-param-reassign
        modules = [[null, modules, '']];
      }

      var alreadyImportedModules = {};

      if (dedupe) {
        for (var i = 0; i < this.length; i++) {
          // eslint-disable-next-line prefer-destructuring
          var id = this[i][0];

          if (id != null) {
            alreadyImportedModules[id] = true;
          }
        }
      }

      for (var _i = 0; _i < modules.length; _i++) {
        var item = [].concat(modules[_i]);

        if (dedupe && alreadyImportedModules[item[0]]) {
          // eslint-disable-next-line no-continue
          continue;
        }

        if (mediaQuery) {
          if (!item[2]) {
            item[2] = mediaQuery;
          } else {
            item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
          }
        }

        list.push(item);
      }
    };

    return list;
  };

  function cssWithMappingToString(item, useSourceMap) {
    var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

    var cssMapping = item[3];

    if (!cssMapping) {
      return content;
    }

    if (useSourceMap && typeof btoa === 'function') {
      var sourceMapping = toComment(cssMapping);
      var sourceURLs = cssMapping.sources.map(function (source) {
        return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
      });
      return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
    }

    return [content].join('\n');
  } // Adapted from convert-source-map (MIT)


  function toComment(sourceMap) {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    return "/*# ".concat(data, " */");
  }

  /***/ }),

  /***/ "./node_modules/deepmerge/dist/cjs.js":
  /*!********************************************!*\
    !*** ./node_modules/deepmerge/dist/cjs.js ***!
    \********************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  var isMergeableObject = function isMergeableObject(value) {
    return isNonNullObject(value)
      && !isSpecial(value)
  };

  function isNonNullObject(value) {
    return !!value && typeof value === 'object'
  }

  function isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);

    return stringValue === '[object RegExp]'
      || stringValue === '[object Date]'
      || isReactElement(value)
  }

  // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
  var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

  function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE
  }

  function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
  }

  function cloneUnlessOtherwiseSpecified(value, options) {
    return (options.clone !== false && options.isMergeableObject(value))
      ? deepmerge(emptyTarget(value), value, options)
      : value
  }

  function defaultArrayMerge(target, source, options) {
    return target.concat(source).map(function(element) {
      return cloneUnlessOtherwiseSpecified(element, options)
    })
  }

  function getMergeFunction(key, options) {
    if (!options.customMerge) {
      return deepmerge
    }
    var customMerge = options.customMerge(key);
    return typeof customMerge === 'function' ? customMerge : deepmerge
  }

  function getEnumerableOwnPropertySymbols(target) {
    return Object.getOwnPropertySymbols
      ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return target.propertyIsEnumerable(symbol)
      })
      : []
  }

  function getKeys(target) {
    return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
  }

  function propertyIsOnObject(object, property) {
    try {
      return property in object
    } catch(_) {
      return false
    }
  }

  // Protects from prototype poisoning and unexpected merging up the prototype chain.
  function propertyIsUnsafe(target, key) {
    return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
      && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
        && Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
  }

  function mergeObject(target, source, options) {
    var destination = {};
    if (options.isMergeableObject(target)) {
      getKeys(target).forEach(function(key) {
        destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
      });
    }
    getKeys(source).forEach(function(key) {
      if (propertyIsUnsafe(target, key)) {
        return
      }

      if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
        destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
      } else {
        destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
      }
    });
    return destination
  }

  function deepmerge(target, source, options) {
    options = options || {};
    options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    options.isMergeableObject = options.isMergeableObject || isMergeableObject;
    // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
    // implementations can use it. The caller may not replace it.
    options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
      return cloneUnlessOtherwiseSpecified(source, options)
    } else if (sourceIsArray) {
      return options.arrayMerge(target, source, options)
    } else {
      return mergeObject(target, source, options)
    }
  }

  deepmerge.all = function deepmergeAll(array, options) {
    if (!Array.isArray(array)) {
      throw new Error('first argument should be an array')
    }

    return array.reduce(function(prev, next) {
      return deepmerge(prev, next, options)
    }, {})
  };

  var deepmerge_1 = deepmerge;

  module.exports = deepmerge_1;


  /***/ }),

  /***/ "./node_modules/events/events.js":
  /*!***************************************!*\
    !*** ./node_modules/events/events.js ***!
    \***************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.



  var R = typeof Reflect === 'object' ? Reflect : null
  var ReflectApply = R && typeof R.apply === 'function'
    ? R.apply
    : function ReflectApply(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    }

  var ReflectOwnKeys
  if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target)
        .concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target);
    };
  }

  function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
  }

  var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
  }

  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  module.exports = EventEmitter;
  module.exports.once = once;

  // Backwards-compat with node 0.10.x
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  var defaultMaxListeners = 10;

  function checkListener(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
  }

  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
      }
      defaultMaxListeners = arg;
    }
  });

  EventEmitter.init = function() {

    if (this._events === undefined ||
        this._events === Object.getPrototypeOf(this)._events) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  };

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }
    this._maxListeners = n;
    return this;
  };

  function _getMaxListeners(that) {
    if (that._maxListeners === undefined)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
  };

  EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
    var doError = (type === 'error');

    var events = this._events;
    if (events !== undefined)
      doError = (doError && events.error === undefined);
    else if (!doError)
      return false;

    // If there is no 'error' event listener then throw.
    if (doError) {
      var er;
      if (args.length > 0)
        er = args[0];
      if (er instanceof Error) {
        // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
      }
      // At least give some kind of context to the user
      var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
      err.context = er;
      throw err; // Unhandled 'error' event
    }

    var handler = events[type];

    if (handler === undefined)
      return false;

    if (typeof handler === 'function') {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        ReflectApply(listeners[i], this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    checkListener(listener);

    events = target._events;
    if (events === undefined) {
      events = target._events = Object.create(null);
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener !== undefined) {
        target.emit('newListener', type,
                    listener.listener ? listener.listener : listener);

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }

    if (existing === undefined) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
        // If we've already got an array, just append.
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }

      // Check for listener leak
      m = _getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        // No error code for this since it is a Warning
        // eslint-disable-next-line no-restricted-syntax
        var w = new Error('Possible EventEmitter memory leak detected. ' +
                            existing.length + ' ' + String(type) + ' listeners ' +
                            'added. Use emitter.setMaxListeners() to ' +
                            'increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }

    return target;
  }

  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener =
      function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };

  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      if (arguments.length === 0)
        return this.listener.call(this.target);
      return this.listener.apply(this.target, arguments);
    }
  }

  function _onceWrap(target, type, listener) {
    var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener =
      function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };

  // Emits a 'removeListener' event if and only if the listener was removed.
  EventEmitter.prototype.removeListener =
      function removeListener(type, listener) {
        var list, events, position, i, originalListener;

        checkListener(listener);

        events = this._events;
        if (events === undefined)
          return this;

        list = events[type];
        if (list === undefined)
          return this;

        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit('removeListener', type, list.listener || listener);
          }
        } else if (typeof list !== 'function') {
          position = -1;

          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }

          if (position < 0)
            return this;

          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }

          if (list.length === 1)
            events[type] = list[0];

          if (events.removeListener !== undefined)
            this.emit('removeListener', type, originalListener || listener);
        }

        return this;
      };

  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

  EventEmitter.prototype.removeAllListeners =
      function removeAllListeners(type) {
        var listeners, events, i;

        events = this._events;
        if (events === undefined)
          return this;

        // not listening for removeListener, no need to emit
        if (events.removeListener === undefined) {
          if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0)
              this._events = Object.create(null);
            else
              delete events[type];
          }
          return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = Object.create(null);
          this._eventsCount = 0;
          return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
          this.removeListener(type, listeners);
        } else if (listeners !== undefined) {
          // LIFO order
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }

        return this;
      };

  function _listeners(target, type, unwrap) {
    var events = target._events;

    if (events === undefined)
      return [];

    var evlistener = events[type];
    if (evlistener === undefined)
      return [];

    if (typeof evlistener === 'function')
      return unwrap ? [evlistener.listener || evlistener] : [evlistener];

    return unwrap ?
      unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }

  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };

  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };

  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events = this._events;

    if (events !== undefined) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener !== undefined) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };

  function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
      copy[i] = arr[i];
    return copy;
  }

  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
      list[index] = list[index + 1];
    list.pop();
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }

  function once(emitter, name) {
    return new Promise(function (resolve, reject) {
      function errorListener(err) {
        emitter.removeListener(name, resolver);
        reject(err);
      }

      function resolver() {
        if (typeof emitter.removeListener === 'function') {
          emitter.removeListener('error', errorListener);
        }
        resolve([].slice.call(arguments));
      };

      eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
      if (name !== 'error') {
        addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
      }
    });
  }

  function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === 'function') {
      eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
    }
  }

  function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === 'function') {
      if (flags.once) {
        emitter.once(name, listener);
      } else {
        emitter.on(name, listener);
      }
    } else if (typeof emitter.addEventListener === 'function') {
      // EventTarget does not have `error` event semantics like Node
      // EventEmitters, we do not listen for `error` events here.
      emitter.addEventListener(name, function wrapListener(arg) {
        // IE does not have builtin `{ once: true }` support so we
        // have to do it manually.
        if (flags.once) {
          emitter.removeEventListener(name, wrapListener);
        }
        listener(arg);
      });
    } else {
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
  }


  /***/ }),

  /***/ "./node_modules/html-entities/lib/html4-entities.js":
  /*!**********************************************************!*\
    !*** ./node_modules/html-entities/lib/html4-entities.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
  var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'AElig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
  var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
  var alphaIndex = {};
  var numIndex = {};
  (function () {
      var i = 0;
      var length = HTML_ALPHA.length;
      while (i < length) {
          var a = HTML_ALPHA[i];
          var c = HTML_CODES[i];
          alphaIndex[a] = String.fromCharCode(c);
          numIndex[c] = a;
          i++;
      }
  })();
  var Html4Entities = /** @class */ (function () {
      function Html4Entities() {
      }
      Html4Entities.prototype.decode = function (str) {
          if (!str || !str.length) {
              return '';
          }
          return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
              var chr;
              if (entity.charAt(0) === "#") {
                  var code = entity.charAt(1).toLowerCase() === 'x' ?
                      parseInt(entity.substr(2), 16) :
                      parseInt(entity.substr(1));
                  if (!isNaN(code) || code >= -32768) {
                      if (code <= 65535) {
                          chr = String.fromCharCode(code);
                      }
                      else {
                          chr = surrogate_pairs_1.fromCodePoint(code);
                      }
                  }
              }
              else {
                  chr = alphaIndex[entity];
              }
              return chr || s;
          });
      };
      Html4Entities.decode = function (str) {
          return new Html4Entities().decode(str);
      };
      Html4Entities.prototype.encode = function (str) {
          if (!str || !str.length) {
              return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
              var alpha = numIndex[str.charCodeAt(i)];
              result += alpha ? "&" + alpha + ";" : str.charAt(i);
              i++;
          }
          return result;
      };
      Html4Entities.encode = function (str) {
          return new Html4Entities().encode(str);
      };
      Html4Entities.prototype.encodeNonUTF = function (str) {
          if (!str || !str.length) {
              return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
              var cc = str.charCodeAt(i);
              var alpha = numIndex[cc];
              if (alpha) {
                  result += "&" + alpha + ";";
              }
              else if (cc < 32 || cc > 126) {
                  if (cc >= surrogate_pairs_1.highSurrogateFrom && cc <= surrogate_pairs_1.highSurrogateTo) {
                      result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
                      i++;
                  }
                  else {
                      result += '&#' + cc + ';';
                  }
              }
              else {
                  result += str.charAt(i);
              }
              i++;
          }
          return result;
      };
      Html4Entities.encodeNonUTF = function (str) {
          return new Html4Entities().encodeNonUTF(str);
      };
      Html4Entities.prototype.encodeNonASCII = function (str) {
          if (!str || !str.length) {
              return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
              var c = str.charCodeAt(i);
              if (c <= 255) {
                  result += str[i++];
                  continue;
              }
              if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
                  result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
                  i++;
              }
              else {
                  result += '&#' + c + ';';
              }
              i++;
          }
          return result;
      };
      Html4Entities.encodeNonASCII = function (str) {
          return new Html4Entities().encodeNonASCII(str);
      };
      return Html4Entities;
  }());
  exports.Html4Entities = Html4Entities;


  /***/ }),

  /***/ "./node_modules/html-entities/lib/html5-entities.js":
  /*!**********************************************************!*\
    !*** ./node_modules/html-entities/lib/html5-entities.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
  var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
  var DECODE_ONLY_ENTITIES = [['NewLine', [10]]];
  var alphaIndex = {};
  var charIndex = {};
  createIndexes(alphaIndex, charIndex);
  var Html5Entities = /** @class */ (function () {
      function Html5Entities() {
      }
      Html5Entities.prototype.decode = function (str) {
          if (!str || !str.length) {
              return '';
          }
          return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
              var chr;
              if (entity.charAt(0) === "#") {
                  var code = entity.charAt(1) === 'x' ?
                      parseInt(entity.substr(2).toLowerCase(), 16) :
                      parseInt(entity.substr(1));
                  if (!isNaN(code) || code >= -32768) {
                      if (code <= 65535) {
                          chr = String.fromCharCode(code);
                      }
                      else {
                          chr = surrogate_pairs_1.fromCodePoint(code);
                      }
                  }
              }
              else {
                  chr = alphaIndex[entity];
              }
              return chr || s;
          });
      };
      Html5Entities.decode = function (str) {
          return new Html5Entities().decode(str);
      };
      Html5Entities.prototype.encode = function (str) {
          if (!str || !str.length) {
              return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
              var charInfo = charIndex[str.charCodeAt(i)];
              if (charInfo) {
                  var alpha = charInfo[str.charCodeAt(i + 1)];
                  if (alpha) {
                      i++;
                  }
                  else {
                      alpha = charInfo[''];
                  }
                  if (alpha) {
                      result += "&" + alpha + ";";
                      i++;
                      continue;
                  }
              }
              result += str.charAt(i);
              i++;
          }
          return result;
      };
      Html5Entities.encode = function (str) {
          return new Html5Entities().encode(str);
      };
      Html5Entities.prototype.encodeNonUTF = function (str) {
          if (!str || !str.length) {
              return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
              var c = str.charCodeAt(i);
              var charInfo = charIndex[c];
              if (charInfo) {
                  var alpha = charInfo[str.charCodeAt(i + 1)];
                  if (alpha) {
                      i++;
                  }
                  else {
                      alpha = charInfo[''];
                  }
                  if (alpha) {
                      result += "&" + alpha + ";";
                      i++;
                      continue;
                  }
              }
              if (c < 32 || c > 126) {
                  if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
                      result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
                      i++;
                  }
                  else {
                      result += '&#' + c + ';';
                  }
              }
              else {
                  result += str.charAt(i);
              }
              i++;
          }
          return result;
      };
      Html5Entities.encodeNonUTF = function (str) {
          return new Html5Entities().encodeNonUTF(str);
      };
      Html5Entities.prototype.encodeNonASCII = function (str) {
          if (!str || !str.length) {
              return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
              var c = str.charCodeAt(i);
              if (c <= 255) {
                  result += str[i++];
                  continue;
              }
              if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
                  result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
                  i += 2;
              }
              else {
                  result += '&#' + c + ';';
                  i++;
              }
          }
          return result;
      };
      Html5Entities.encodeNonASCII = function (str) {
          return new Html5Entities().encodeNonASCII(str);
      };
      return Html5Entities;
  }());
  exports.Html5Entities = Html5Entities;
  function createIndexes(alphaIndex, charIndex) {
      var i = ENTITIES.length;
      while (i--) {
          var _a = ENTITIES[i], alpha = _a[0], _b = _a[1], chr = _b[0], chr2 = _b[1];
          var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
          var charInfo = void 0;
          if (addChar) {
              charInfo = charIndex[chr] = charIndex[chr] || {};
          }
          if (chr2) {
              alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
              addChar && (charInfo[chr2] = alpha);
          }
          else {
              alphaIndex[alpha] = String.fromCharCode(chr);
              addChar && (charInfo[''] = alpha);
          }
      }
      i = DECODE_ONLY_ENTITIES.length;
      while (i--) {
          var _c = DECODE_ONLY_ENTITIES[i], alpha = _c[0], _d = _c[1], chr = _d[0], chr2 = _d[1];
          alphaIndex[alpha] = String.fromCharCode(chr) + (chr2 ? String.fromCharCode(chr2) : '');
      }
  }


  /***/ }),

  /***/ "./node_modules/html-entities/lib/index.js":
  /*!*************************************************!*\
    !*** ./node_modules/html-entities/lib/index.js ***!
    \*************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var xml_entities_1 = __webpack_require__(/*! ./xml-entities */ "./node_modules/html-entities/lib/xml-entities.js");
  exports.XmlEntities = xml_entities_1.XmlEntities;
  var html4_entities_1 = __webpack_require__(/*! ./html4-entities */ "./node_modules/html-entities/lib/html4-entities.js");
  exports.Html4Entities = html4_entities_1.Html4Entities;
  var html5_entities_1 = __webpack_require__(/*! ./html5-entities */ "./node_modules/html-entities/lib/html5-entities.js");
  exports.Html5Entities = html5_entities_1.Html5Entities;
  exports.AllHtmlEntities = html5_entities_1.Html5Entities;


  /***/ }),

  /***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
  /*!***********************************************************!*\
    !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  exports.fromCodePoint = String.fromCodePoint || function (astralCodePoint) {
      return String.fromCharCode(Math.floor((astralCodePoint - 0x10000) / 0x400) + 0xD800, (astralCodePoint - 0x10000) % 0x400 + 0xDC00);
  };
  exports.getCodePoint = String.prototype.codePointAt ?
      function (input, position) {
          return input.codePointAt(position);
      } :
      function (input, position) {
          return (input.charCodeAt(position) - 0xD800) * 0x400
              + input.charCodeAt(position + 1) - 0xDC00 + 0x10000;
      };
  exports.highSurrogateFrom = 0xD800;
  exports.highSurrogateTo = 0xDBFF;


  /***/ }),

  /***/ "./node_modules/html-entities/lib/xml-entities.js":
  /*!********************************************************!*\
    !*** ./node_modules/html-entities/lib/xml-entities.js ***!
    \********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
  var ALPHA_INDEX = {
      '&lt': '<',
      '&gt': '>',
      '&quot': '"',
      '&apos': '\'',
      '&amp': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&apos;': '\'',
      '&amp;': '&'
  };
  var CHAR_INDEX = {
      60: 'lt',
      62: 'gt',
      34: 'quot',
      39: 'apos',
      38: 'amp'
  };
  var CHAR_S_INDEX = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&apos;',
      '&': '&amp;'
  };
  var XmlEntities = /** @class */ (function () {
      function XmlEntities() {
      }
      XmlEntities.prototype.encode = function (str) {
          if (!str || !str.length) {
              return '';
          }
          return str.replace(/[<>"'&]/g, function (s) {
              return CHAR_S_INDEX[s];
          });
      };
      XmlEntities.encode = function (str) {
          return new XmlEntities().encode(str);
      };
      XmlEntities.prototype.decode = function (str) {
          if (!str || !str.length) {
              return '';
          }
          return str.replace(/&#?[0-9a-zA-Z]+;?/g, function (s) {
              if (s.charAt(1) === '#') {
                  var code = s.charAt(2).toLowerCase() === 'x' ?
                      parseInt(s.substr(3), 16) :
                      parseInt(s.substr(2));
                  if (!isNaN(code) || code >= -32768) {
                      if (code <= 65535) {
                          return String.fromCharCode(code);
                      }
                      else {
                          return surrogate_pairs_1.fromCodePoint(code);
                      }
                  }
                  return '';
              }
              return ALPHA_INDEX[s] || s;
          });
      };
      XmlEntities.decode = function (str) {
          return new XmlEntities().decode(str);
      };
      XmlEntities.prototype.encodeNonUTF = function (str) {
          if (!str || !str.length) {
              return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
              var c = str.charCodeAt(i);
              var alpha = CHAR_INDEX[c];
              if (alpha) {
                  result += "&" + alpha + ";";
                  i++;
                  continue;
              }
              if (c < 32 || c > 126) {
                  if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
                      result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
                      i++;
                  }
                  else {
                      result += '&#' + c + ';';
                  }
              }
              else {
                  result += str.charAt(i);
              }
              i++;
          }
          return result;
      };
      XmlEntities.encodeNonUTF = function (str) {
          return new XmlEntities().encodeNonUTF(str);
      };
      XmlEntities.prototype.encodeNonASCII = function (str) {
          if (!str || !str.length) {
              return '';
          }
          var strLength = str.length;
          var result = '';
          var i = 0;
          while (i < strLength) {
              var c = str.charCodeAt(i);
              if (c <= 255) {
                  result += str[i++];
                  continue;
              }
              if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
                  result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
                  i++;
              }
              else {
                  result += '&#' + c + ';';
              }
              i++;
          }
          return result;
      };
      XmlEntities.encodeNonASCII = function (str) {
          return new XmlEntities().encodeNonASCII(str);
      };
      return XmlEntities;
  }());
  exports.XmlEntities = XmlEntities;


  /***/ }),

  /***/ "./node_modules/loglevel/lib/loglevel.js":
  /*!***********************************************!*\
    !*** ./node_modules/loglevel/lib/loglevel.js ***!
    \***********************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
  * loglevel - https://github.com/pimterry/loglevel
  *
  * Copyright (c) 2013 Tim Perry
  * Licensed under the MIT license.
  */
  (function (root, definition) {
      "use strict";
      if (true) {
          !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
          __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
          (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
          __WEBPACK_AMD_DEFINE_FACTORY__),
          __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      } else {}
  }(this, function () {
      "use strict";

      // Slightly dubious tricks to cut down minimized file size
      var noop = function() {};
      var undefinedType = "undefined";
      var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
          /Trident\/|MSIE /.test(window.navigator.userAgent)
      );

      var logMethods = [
          "trace",
          "debug",
          "info",
          "warn",
          "error"
      ];

      // Cross-browser bind equivalent that works at least back to IE6
      function bindMethod(obj, methodName) {
          var method = obj[methodName];
          if (typeof method.bind === 'function') {
              return method.bind(obj);
          } else {
              try {
                  return Function.prototype.bind.call(method, obj);
              } catch (e) {
                  // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                  return function() {
                      return Function.prototype.apply.apply(method, [obj, arguments]);
                  };
              }
          }
      }

      // Trace() doesn't print the message in IE, so for that case we need to wrap it
      function traceForIE() {
          if (console.log) {
              if (console.log.apply) {
                  console.log.apply(console, arguments);
              } else {
                  // In old IE, native console methods themselves don't have apply().
                  Function.prototype.apply.apply(console.log, [console, arguments]);
              }
          }
          if (console.trace) console.trace();
      }

      // Build the best logging method possible for this env
      // Wherever possible we want to bind, not wrap, to preserve stack traces
      function realMethod(methodName) {
          if (methodName === 'debug') {
              methodName = 'log';
          }

          if (typeof console === undefinedType) {
              return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
          } else if (methodName === 'trace' && isIE) {
              return traceForIE;
          } else if (console[methodName] !== undefined) {
              return bindMethod(console, methodName);
          } else if (console.log !== undefined) {
              return bindMethod(console, 'log');
          } else {
              return noop;
          }
      }

      // These private functions always need `this` to be set properly

      function replaceLoggingMethods(level, loggerName) {
          /*jshint validthis:true */
          for (var i = 0; i < logMethods.length; i++) {
              var methodName = logMethods[i];
              this[methodName] = (i < level) ?
                  noop :
                  this.methodFactory(methodName, level, loggerName);
          }

          // Define log.log as an alias for log.debug
          this.log = this.debug;
      }

      // In old IE versions, the console isn't present until you first open it.
      // We build realMethod() replacements here that regenerate logging methods
      function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
          return function () {
              if (typeof console !== undefinedType) {
                  replaceLoggingMethods.call(this, level, loggerName);
                  this[methodName].apply(this, arguments);
              }
          };
      }

      // By default, we use closely bound real methods wherever possible, and
      // otherwise we wait for a console to appear, and then try again.
      function defaultMethodFactory(methodName, level, loggerName) {
          /*jshint validthis:true */
          return realMethod(methodName) ||
                 enableLoggingWhenConsoleArrives.apply(this, arguments);
      }

      function Logger(name, defaultLevel, factory) {
        var self = this;
        var currentLevel;

        var storageKey = "loglevel";
        if (typeof name === "string") {
          storageKey += ":" + name;
        } else if (typeof name === "symbol") {
          storageKey = undefined;
        }

        function persistLevelIfPossible(levelNum) {
            var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

            if (typeof window === undefinedType || !storageKey) return;

            // Use localStorage if available
            try {
                window.localStorage[storageKey] = levelName;
                return;
            } catch (ignore) {}

            // Use session cookie as fallback
            try {
                window.document.cookie =
                  encodeURIComponent(storageKey) + "=" + levelName + ";";
            } catch (ignore) {}
        }

        function getPersistedLevel() {
            var storedLevel;

            if (typeof window === undefinedType || !storageKey) return;

            try {
                storedLevel = window.localStorage[storageKey];
            } catch (ignore) {}

            // Fallback to cookies if local storage gives us nothing
            if (typeof storedLevel === undefinedType) {
                try {
                    var cookie = window.document.cookie;
                    var location = cookie.indexOf(
                        encodeURIComponent(storageKey) + "=");
                    if (location !== -1) {
                        storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                    }
                } catch (ignore) {}
            }

            // If the stored level is not valid, treat it as if nothing was stored.
            if (self.levels[storedLevel] === undefined) {
                storedLevel = undefined;
            }

            return storedLevel;
        }

        /*
         *
         * Public logger API - see https://github.com/pimterry/loglevel for details
         *
         */

        self.name = name;

        self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
            "ERROR": 4, "SILENT": 5};

        self.methodFactory = factory || defaultMethodFactory;

        self.getLevel = function () {
            return currentLevel;
        };

        self.setLevel = function (level, persist) {
            if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
                level = self.levels[level.toUpperCase()];
            }
            if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
                currentLevel = level;
                if (persist !== false) {  // defaults to true
                    persistLevelIfPossible(level);
                }
                replaceLoggingMethods.call(self, level, name);
                if (typeof console === undefinedType && level < self.levels.SILENT) {
                    return "No console available for logging";
                }
            } else {
                throw "log.setLevel() called with invalid level: " + level;
            }
        };

        self.setDefaultLevel = function (level) {
            if (!getPersistedLevel()) {
                self.setLevel(level, false);
            }
        };

        self.enableAll = function(persist) {
            self.setLevel(self.levels.TRACE, persist);
        };

        self.disableAll = function(persist) {
            self.setLevel(self.levels.SILENT, persist);
        };

        // Initialize with the right level
        var initialLevel = getPersistedLevel();
        if (initialLevel == null) {
            initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
        }
        self.setLevel(initialLevel, false);
      }

      /*
       *
       * Top-level API
       *
       */

      var defaultLogger = new Logger();

      var _loggersByName = {};
      defaultLogger.getLogger = function getLogger(name) {
          if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
            throw new TypeError("You must supply a name when creating a logger.");
          }

          var logger = _loggersByName[name];
          if (!logger) {
            logger = _loggersByName[name] = new Logger(
              name, defaultLogger.getLevel(), defaultLogger.methodFactory);
          }
          return logger;
      };

      // Grab the current global log variable in case of overwrite
      var _log = (typeof window !== undefinedType) ? window.log : undefined;
      defaultLogger.noConflict = function() {
          if (typeof window !== undefinedType &&
                 window.log === defaultLogger) {
              window.log = _log;
          }

          return defaultLogger;
      };

      defaultLogger.getLoggers = function getLoggers() {
          return _loggersByName;
      };

      // ES6 default export, for compatibility
      defaultLogger['default'] = defaultLogger;

      return defaultLogger;
  }));


  /***/ }),

  /***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
  /*!**************************************************************************!*\
    !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
    \**************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
  ;(function(root) {

    /** Detect free variables */
    var freeExports =  true && exports &&
      !exports.nodeType && exports;
    var freeModule =  true && module &&
      !module.nodeType && module;
    var freeGlobal = typeof global == 'object' && global;
    if (
      freeGlobal.global === freeGlobal ||
      freeGlobal.window === freeGlobal ||
      freeGlobal.self === freeGlobal
    ) {
      root = freeGlobal;
    }

    /**
     * The `punycode` object.
     * @name punycode
     * @type Object
     */
    var punycode,

    /** Highest positive signed 32-bit float value */
    maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

    /** Bootstring parameters */
    base = 36,
    tMin = 1,
    tMax = 26,
    skew = 38,
    damp = 700,
    initialBias = 72,
    initialN = 128, // 0x80
    delimiter = '-', // '\x2D'

    /** Regular expressions */
    regexPunycode = /^xn--/,
    regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

    /** Error messages */
    errors = {
      'overflow': 'Overflow: input needs wider integers to process',
      'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
      'invalid-input': 'Invalid input'
    },

    /** Convenience shortcuts */
    baseMinusTMin = base - tMin,
    floor = Math.floor,
    stringFromCharCode = String.fromCharCode,

    /** Temporary variable */
    key;

    /*--------------------------------------------------------------------------*/

    /**
     * A generic error utility function.
     * @private
     * @param {String} type The error type.
     * @returns {Error} Throws a `RangeError` with the applicable error message.
     */
    function error(type) {
      throw new RangeError(errors[type]);
    }

    /**
     * A generic `Array#map` utility function.
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} callback The function that gets called for every array
     * item.
     * @returns {Array} A new array of values returned by the callback function.
     */
    function map(array, fn) {
      var length = array.length;
      var result = [];
      while (length--) {
        result[length] = fn(array[length]);
      }
      return result;
    }

    /**
     * A simple `Array#map`-like wrapper to work with domain name strings or email
     * addresses.
     * @private
     * @param {String} domain The domain name or email address.
     * @param {Function} callback The function that gets called for every
     * character.
     * @returns {Array} A new string of characters returned by the callback
     * function.
     */
    function mapDomain(string, fn) {
      var parts = string.split('@');
      var result = '';
      if (parts.length > 1) {
        // In email addresses, only the domain name should be punycoded. Leave
        // the local part (i.e. everything up to `@`) intact.
        result = parts[0] + '@';
        string = parts[1];
      }
      // Avoid `split(regex)` for IE8 compatibility. See #17.
      string = string.replace(regexSeparators, '\x2E');
      var labels = string.split('.');
      var encoded = map(labels, fn).join('.');
      return result + encoded;
    }

    /**
     * Creates an array containing the numeric code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     * @see `punycode.ucs2.encode`
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode.ucs2
     * @name decode
     * @param {String} string The Unicode input string (UCS-2).
     * @returns {Array} The new array of code points.
     */
    function ucs2decode(string) {
      var output = [],
          counter = 0,
          length = string.length,
          value,
          extra;
      while (counter < length) {
        value = string.charCodeAt(counter++);
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
          // high surrogate, and there is a next character
          extra = string.charCodeAt(counter++);
          if ((extra & 0xFC00) == 0xDC00) { // low surrogate
            output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
          } else {
            // unmatched surrogate; only append this code unit, in case the next
            // code unit is the high surrogate of a surrogate pair
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
      return output;
    }

    /**
     * Creates a string based on an array of numeric code points.
     * @see `punycode.ucs2.decode`
     * @memberOf punycode.ucs2
     * @name encode
     * @param {Array} codePoints The array of numeric code points.
     * @returns {String} The new Unicode string (UCS-2).
     */
    function ucs2encode(array) {
      return map(array, function(value) {
        var output = '';
        if (value > 0xFFFF) {
          value -= 0x10000;
          output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
          value = 0xDC00 | value & 0x3FF;
        }
        output += stringFromCharCode(value);
        return output;
      }).join('');
    }

    /**
     * Converts a basic code point into a digit/integer.
     * @see `digitToBasic()`
     * @private
     * @param {Number} codePoint The basic numeric code point value.
     * @returns {Number} The numeric value of a basic code point (for use in
     * representing integers) in the range `0` to `base - 1`, or `base` if
     * the code point does not represent a value.
     */
    function basicToDigit(codePoint) {
      if (codePoint - 48 < 10) {
        return codePoint - 22;
      }
      if (codePoint - 65 < 26) {
        return codePoint - 65;
      }
      if (codePoint - 97 < 26) {
        return codePoint - 97;
      }
      return base;
    }

    /**
     * Converts a digit/integer into a basic code point.
     * @see `basicToDigit()`
     * @private
     * @param {Number} digit The numeric value of a basic code point.
     * @returns {Number} The basic code point whose value (when used for
     * representing integers) is `digit`, which needs to be in the range
     * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
     * used; else, the lowercase form is used. The behavior is undefined
     * if `flag` is non-zero and `digit` has no uppercase form.
     */
    function digitToBasic(digit, flag) {
      //  0..25 map to ASCII a..z or A..Z
      // 26..35 map to ASCII 0..9
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    }

    /**
     * Bias adaptation function as per section 3.4 of RFC 3492.
     * https://tools.ietf.org/html/rfc3492#section-3.4
     * @private
     */
    function adapt(delta, numPoints, firstTime) {
      var k = 0;
      delta = firstTime ? floor(delta / damp) : delta >> 1;
      delta += floor(delta / numPoints);
      for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
        delta = floor(delta / baseMinusTMin);
      }
      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    }

    /**
     * Converts a Punycode string of ASCII-only symbols to a string of Unicode
     * symbols.
     * @memberOf punycode
     * @param {String} input The Punycode string of ASCII-only symbols.
     * @returns {String} The resulting string of Unicode symbols.
     */
    function decode(input) {
      // Don't use UCS-2
      var output = [],
          inputLength = input.length,
          out,
          i = 0,
          n = initialN,
          bias = initialBias,
          basic,
          j,
          index,
          oldi,
          w,
          k,
          digit,
          t,
          /** Cached calculation results */
          baseMinusT;

      // Handle the basic code points: let `basic` be the number of input code
      // points before the last delimiter, or `0` if there is none, then copy
      // the first basic code points to the output.

      basic = input.lastIndexOf(delimiter);
      if (basic < 0) {
        basic = 0;
      }

      for (j = 0; j < basic; ++j) {
        // if it's not a basic code point
        if (input.charCodeAt(j) >= 0x80) {
          error('not-basic');
        }
        output.push(input.charCodeAt(j));
      }

      // Main decoding loop: start just after the last delimiter if any basic code
      // points were copied; start at the beginning otherwise.

      for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

        // `index` is the index of the next character to be consumed.
        // Decode a generalized variable-length integer into `delta`,
        // which gets added to `i`. The overflow checking is easier
        // if we increase `i` as we go, then subtract off its starting
        // value at the end to obtain `delta`.
        for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

          if (index >= inputLength) {
            error('invalid-input');
          }

          digit = basicToDigit(input.charCodeAt(index++));

          if (digit >= base || digit > floor((maxInt - i) / w)) {
            error('overflow');
          }

          i += digit * w;
          t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

          if (digit < t) {
            break;
          }

          baseMinusT = base - t;
          if (w > floor(maxInt / baseMinusT)) {
            error('overflow');
          }

          w *= baseMinusT;

        }

        out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0);

        // `i` was supposed to wrap around from `out` to `0`,
        // incrementing `n` each time, so we'll fix that now:
        if (floor(i / out) > maxInt - n) {
          error('overflow');
        }

        n += floor(i / out);
        i %= out;

        // Insert `n` at position `i` of the output
        output.splice(i++, 0, n);

      }

      return ucs2encode(output);
    }

    /**
     * Converts a string of Unicode symbols (e.g. a domain name label) to a
     * Punycode string of ASCII-only symbols.
     * @memberOf punycode
     * @param {String} input The string of Unicode symbols.
     * @returns {String} The resulting Punycode string of ASCII-only symbols.
     */
    function encode(input) {
      var n,
          delta,
          handledCPCount,
          basicLength,
          bias,
          j,
          m,
          q,
          k,
          t,
          currentValue,
          output = [],
          /** `inputLength` will hold the number of code points in `input`. */
          inputLength,
          /** Cached calculation results */
          handledCPCountPlusOne,
          baseMinusT,
          qMinusT;

      // Convert the input in UCS-2 to Unicode
      input = ucs2decode(input);

      // Cache the length
      inputLength = input.length;

      // Initialize the state
      n = initialN;
      delta = 0;
      bias = initialBias;

      // Handle the basic code points
      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue < 0x80) {
          output.push(stringFromCharCode(currentValue));
        }
      }

      handledCPCount = basicLength = output.length;

      // `handledCPCount` is the number of code points that have been handled;
      // `basicLength` is the number of basic code points.

      // Finish the basic string - if it is not empty - with a delimiter
      if (basicLength) {
        output.push(delimiter);
      }

      // Main encoding loop:
      while (handledCPCount < inputLength) {

        // All non-basic code points < n have been handled already. Find the next
        // larger one:
        for (m = maxInt, j = 0; j < inputLength; ++j) {
          currentValue = input[j];
          if (currentValue >= n && currentValue < m) {
            m = currentValue;
          }
        }

        // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
        // but guard against overflow
        handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
          error('overflow');
        }

        delta += (m - n) * handledCPCountPlusOne;
        n = m;

        for (j = 0; j < inputLength; ++j) {
          currentValue = input[j];

          if (currentValue < n && ++delta > maxInt) {
            error('overflow');
          }

          if (currentValue == n) {
            // Represent delta as a generalized variable-length integer
            for (q = delta, k = base; /* no condition */; k += base) {
              t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
              if (q < t) {
                break;
              }
              qMinusT = q - t;
              baseMinusT = base - t;
              output.push(
                stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
              );
              q = floor(qMinusT / baseMinusT);
            }

            output.push(stringFromCharCode(digitToBasic(q, 0)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
            delta = 0;
            ++handledCPCount;
          }
        }

        ++delta;
        ++n;

      }
      return output.join('');
    }

    /**
     * Converts a Punycode string representing a domain name or an email address
     * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
     * it doesn't matter if you call it on a string that has already been
     * converted to Unicode.
     * @memberOf punycode
     * @param {String} input The Punycoded domain name or email address to
     * convert to Unicode.
     * @returns {String} The Unicode representation of the given Punycode
     * string.
     */
    function toUnicode(input) {
      return mapDomain(input, function(string) {
        return regexPunycode.test(string)
          ? decode(string.slice(4).toLowerCase())
          : string;
      });
    }

    /**
     * Converts a Unicode string representing a domain name or an email address to
     * Punycode. Only the non-ASCII parts of the domain name will be converted,
     * i.e. it doesn't matter if you call it with a domain that's already in
     * ASCII.
     * @memberOf punycode
     * @param {String} input The domain name or email address to convert, as a
     * Unicode string.
     * @returns {String} The Punycode representation of the given domain name or
     * email address.
     */
    function toASCII(input) {
      return mapDomain(input, function(string) {
        return regexNonASCII.test(string)
          ? 'xn--' + encode(string)
          : string;
      });
    }

    /*--------------------------------------------------------------------------*/

    /** Define the public API */
    punycode = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      'version': '1.4.1',
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      'ucs2': {
        'decode': ucs2decode,
        'encode': ucs2encode
      },
      'decode': decode,
      'encode': encode,
      'toASCII': toASCII,
      'toUnicode': toUnicode
    };

    /** Expose `punycode` */
    // Some AMD build optimizers, like r.js, check for specific condition patterns
    // like the following:
    if (
      true
    ) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return punycode;
      }).call(exports, __webpack_require__, exports, module),
          __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}

  }(this));

  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

  /***/ }),

  /***/ "./node_modules/querystring-es3/decode.js":
  /*!************************************************!*\
    !*** ./node_modules/querystring-es3/decode.js ***!
    \************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.



  // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  module.exports = function(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }

    var regexp = /\+/g;
    qs = qs.split(sep);

    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }

    var len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }

    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
          idx = x.indexOf(eq),
          kstr, vstr, k, v;

      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }

      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);

      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  };

  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };


  /***/ }),

  /***/ "./node_modules/querystring-es3/encode.js":
  /*!************************************************!*\
    !*** ./node_modules/querystring-es3/encode.js ***!
    \************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.



  var stringifyPrimitive = function(v) {
    switch (typeof v) {
      case 'string':
        return v;

      case 'boolean':
        return v ? 'true' : 'false';

      case 'number':
        return isFinite(v) ? v : '';

      default:
        return '';
    }
  };

  module.exports = function(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
      obj = undefined;
    }

    if (typeof obj === 'object') {
      return map(objectKeys(obj), function(k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (isArray(obj[k])) {
          return map(obj[k], function(v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);

    }

    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
           encodeURIComponent(stringifyPrimitive(obj));
  };

  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };

  function map (xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      res.push(f(xs[i], i));
    }
    return res;
  }

  var objectKeys = Object.keys || function (obj) {
    var res = [];
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
    }
    return res;
  };


  /***/ }),

  /***/ "./node_modules/querystring-es3/index.js":
  /*!***********************************************!*\
    !*** ./node_modules/querystring-es3/index.js ***!
    \***********************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
  exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


  /***/ }),

  /***/ "./node_modules/sockjs-client/dist/sockjs.js":
  /*!***************************************************!*\
    !*** ./node_modules/sockjs-client/dist/sockjs.js ***!
    \***************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(global) {var require;var require;/* sockjs-client v1.4.0 | http://sockjs.org | MIT license */
  (function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  (function (global){
  'use strict';

  var transportList = require('./transport-list');

  module.exports = require('./main')(transportList);

  // TODO can't get rid of this until all servers do
  if ('_sockjs_onload' in global) {
    setTimeout(global._sockjs_onload, 1);
  }

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"./main":14,"./transport-list":16}],2:[function(require,module,exports){
  'use strict';

  var inherits = require('inherits')
    , Event = require('./event')
    ;

  function CloseEvent() {
    Event.call(this);
    this.initEvent('close', false, false);
    this.wasClean = false;
    this.code = 0;
    this.reason = '';
  }

  inherits(CloseEvent, Event);

  module.exports = CloseEvent;

  },{"./event":4,"inherits":57}],3:[function(require,module,exports){
  'use strict';

  var inherits = require('inherits')
    , EventTarget = require('./eventtarget')
    ;

  function EventEmitter() {
    EventTarget.call(this);
  }

  inherits(EventEmitter, EventTarget);

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (type) {
      delete this._listeners[type];
    } else {
      this._listeners = {};
    }
  };

  EventEmitter.prototype.once = function(type, listener) {
    var self = this
      , fired = false;

    function g() {
      self.removeListener(type, g);

      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    }

    this.on(type, g);
  };

  EventEmitter.prototype.emit = function() {
    var type = arguments[0];
    var listeners = this._listeners[type];
    if (!listeners) {
      return;
    }
    // equivalent of Array.prototype.slice.call(arguments, 1);
    var l = arguments.length;
    var args = new Array(l - 1);
    for (var ai = 1; ai < l; ai++) {
      args[ai - 1] = arguments[ai];
    }
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args);
    }
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
  EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;

  module.exports.EventEmitter = EventEmitter;

  },{"./eventtarget":5,"inherits":57}],4:[function(require,module,exports){
  'use strict';

  function Event(eventType) {
    this.type = eventType;
  }

  Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
    this.type = eventType;
    this.bubbles = canBubble;
    this.cancelable = cancelable;
    this.timeStamp = +new Date();
    return this;
  };

  Event.prototype.stopPropagation = function() {};
  Event.prototype.preventDefault = function() {};

  Event.CAPTURING_PHASE = 1;
  Event.AT_TARGET = 2;
  Event.BUBBLING_PHASE = 3;

  module.exports = Event;

  },{}],5:[function(require,module,exports){
  'use strict';

  /* Simplified implementation of DOM2 EventTarget.
   *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
   */

  function EventTarget() {
    this._listeners = {};
  }

  EventTarget.prototype.addEventListener = function(eventType, listener) {
    if (!(eventType in this._listeners)) {
      this._listeners[eventType] = [];
    }
    var arr = this._listeners[eventType];
    // #4
    if (arr.indexOf(listener) === -1) {
      // Make a copy so as not to interfere with a current dispatchEvent.
      arr = arr.concat([listener]);
    }
    this._listeners[eventType] = arr;
  };

  EventTarget.prototype.removeEventListener = function(eventType, listener) {
    var arr = this._listeners[eventType];
    if (!arr) {
      return;
    }
    var idx = arr.indexOf(listener);
    if (idx !== -1) {
      if (arr.length > 1) {
        // Make a copy so as not to interfere with a current dispatchEvent.
        this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
      } else {
        delete this._listeners[eventType];
      }
      return;
    }
  };

  EventTarget.prototype.dispatchEvent = function() {
    var event = arguments[0];
    var t = event.type;
    // equivalent of Array.prototype.slice.call(arguments, 0);
    var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
    // TODO: This doesn't match the real behavior; per spec, onfoo get
    // their place in line from the /first/ time they're set from
    // non-null. Although WebKit bumps it to the end every time it's
    // set.
    if (this['on' + t]) {
      this['on' + t].apply(this, args);
    }
    if (t in this._listeners) {
      // Grab a reference to the listeners list. removeEventListener may alter the list.
      var listeners = this._listeners[t];
      for (var i = 0; i < listeners.length; i++) {
        listeners[i].apply(this, args);
      }
    }
  };

  module.exports = EventTarget;

  },{}],6:[function(require,module,exports){
  'use strict';

  var inherits = require('inherits')
    , Event = require('./event')
    ;

  function TransportMessageEvent(data) {
    Event.call(this);
    this.initEvent('message', false, false);
    this.data = data;
  }

  inherits(TransportMessageEvent, Event);

  module.exports = TransportMessageEvent;

  },{"./event":4,"inherits":57}],7:[function(require,module,exports){
  'use strict';

  var JSON3 = require('json3')
    , iframeUtils = require('./utils/iframe')
    ;

  function FacadeJS(transport) {
    this._transport = transport;
    transport.on('message', this._transportMessage.bind(this));
    transport.on('close', this._transportClose.bind(this));
  }

  FacadeJS.prototype._transportClose = function(code, reason) {
    iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
  };
  FacadeJS.prototype._transportMessage = function(frame) {
    iframeUtils.postMessage('t', frame);
  };
  FacadeJS.prototype._send = function(data) {
    this._transport.send(data);
  };
  FacadeJS.prototype._close = function() {
    this._transport.close();
    this._transport.removeAllListeners();
  };

  module.exports = FacadeJS;

  },{"./utils/iframe":47,"json3":58}],8:[function(require,module,exports){
  (function (process){
  'use strict';

  var urlUtils = require('./utils/url')
    , eventUtils = require('./utils/event')
    , JSON3 = require('json3')
    , FacadeJS = require('./facade')
    , InfoIframeReceiver = require('./info-iframe-receiver')
    , iframeUtils = require('./utils/iframe')
    , loc = require('./location')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:iframe-bootstrap');
  }

  module.exports = function(SockJS, availableTransports) {
    var transportMap = {};
    availableTransports.forEach(function(at) {
      if (at.facadeTransport) {
        transportMap[at.facadeTransport.transportName] = at.facadeTransport;
      }
    });

    // hard-coded for the info iframe
    // TODO see if we can make this more dynamic
    transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
    var parentOrigin;

    /* eslint-disable camelcase */
    SockJS.bootstrap_iframe = function() {
      /* eslint-enable camelcase */
      var facade;
      iframeUtils.currentWindowId = loc.hash.slice(1);
      var onMessage = function(e) {
        if (e.source !== parent) {
          return;
        }
        if (typeof parentOrigin === 'undefined') {
          parentOrigin = e.origin;
        }
        if (e.origin !== parentOrigin) {
          return;
        }

        var iframeMessage;
        try {
          iframeMessage = JSON3.parse(e.data);
        } catch (ignored) {
          debug('bad json', e.data);
          return;
        }

        if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
          return;
        }
        switch (iframeMessage.type) {
        case 's':
          var p;
          try {
            p = JSON3.parse(iframeMessage.data);
          } catch (ignored) {
            debug('bad json', iframeMessage.data);
            break;
          }
          var version = p[0];
          var transport = p[1];
          var transUrl = p[2];
          var baseUrl = p[3];
          debug(version, transport, transUrl, baseUrl);
          // change this to semver logic
          if (version !== SockJS.version) {
            throw new Error('Incompatible SockJS! Main site uses:' +
                      ' "' + version + '", the iframe:' +
                      ' "' + SockJS.version + '".');
          }

          if (!urlUtils.isOriginEqual(transUrl, loc.href) ||
              !urlUtils.isOriginEqual(baseUrl, loc.href)) {
            throw new Error('Can\'t connect to different domain from within an ' +
                      'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
          }
          facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
          break;
        case 'm':
          facade._send(iframeMessage.data);
          break;
        case 'c':
          if (facade) {
            facade._close();
          }
          facade = null;
          break;
        }
      };

      eventUtils.attachEvent('message', onMessage);

      // Start
      iframeUtils.postMessage('s');
    };
  };

  }).call(this,{ env: {} })

  },{"./facade":7,"./info-iframe-receiver":10,"./location":13,"./utils/event":46,"./utils/iframe":47,"./utils/url":52,"debug":55,"json3":58}],9:[function(require,module,exports){
  (function (process){
  'use strict';

  var EventEmitter = require('events').EventEmitter
    , inherits = require('inherits')
    , JSON3 = require('json3')
    , objectUtils = require('./utils/object')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:info-ajax');
  }

  function InfoAjax(url, AjaxObject) {
    EventEmitter.call(this);

    var self = this;
    var t0 = +new Date();
    this.xo = new AjaxObject('GET', url);

    this.xo.once('finish', function(status, text) {
      var info, rtt;
      if (status === 200) {
        rtt = (+new Date()) - t0;
        if (text) {
          try {
            info = JSON3.parse(text);
          } catch (e) {
            debug('bad json', text);
          }
        }

        if (!objectUtils.isObject(info)) {
          info = {};
        }
      }
      self.emit('finish', info, rtt);
      self.removeAllListeners();
    });
  }

  inherits(InfoAjax, EventEmitter);

  InfoAjax.prototype.close = function() {
    this.removeAllListeners();
    this.xo.close();
  };

  module.exports = InfoAjax;

  }).call(this,{ env: {} })

  },{"./utils/object":49,"debug":55,"events":3,"inherits":57,"json3":58}],10:[function(require,module,exports){
  'use strict';

  var inherits = require('inherits')
    , EventEmitter = require('events').EventEmitter
    , JSON3 = require('json3')
    , XHRLocalObject = require('./transport/sender/xhr-local')
    , InfoAjax = require('./info-ajax')
    ;

  function InfoReceiverIframe(transUrl) {
    var self = this;
    EventEmitter.call(this);

    this.ir = new InfoAjax(transUrl, XHRLocalObject);
    this.ir.once('finish', function(info, rtt) {
      self.ir = null;
      self.emit('message', JSON3.stringify([info, rtt]));
    });
  }

  inherits(InfoReceiverIframe, EventEmitter);

  InfoReceiverIframe.transportName = 'iframe-info-receiver';

  InfoReceiverIframe.prototype.close = function() {
    if (this.ir) {
      this.ir.close();
      this.ir = null;
    }
    this.removeAllListeners();
  };

  module.exports = InfoReceiverIframe;

  },{"./info-ajax":9,"./transport/sender/xhr-local":37,"events":3,"inherits":57,"json3":58}],11:[function(require,module,exports){
  (function (process,global){
  'use strict';

  var EventEmitter = require('events').EventEmitter
    , inherits = require('inherits')
    , JSON3 = require('json3')
    , utils = require('./utils/event')
    , IframeTransport = require('./transport/iframe')
    , InfoReceiverIframe = require('./info-iframe-receiver')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:info-iframe');
  }

  function InfoIframe(baseUrl, url) {
    var self = this;
    EventEmitter.call(this);

    var go = function() {
      var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);

      ifr.once('message', function(msg) {
        if (msg) {
          var d;
          try {
            d = JSON3.parse(msg);
          } catch (e) {
            debug('bad json', msg);
            self.emit('finish');
            self.close();
            return;
          }

          var info = d[0], rtt = d[1];
          self.emit('finish', info, rtt);
        }
        self.close();
      });

      ifr.once('close', function() {
        self.emit('finish');
        self.close();
      });
    };

    // TODO this seems the same as the 'needBody' from transports
    if (!global.document.body) {
      utils.attachEvent('load', go);
    } else {
      go();
    }
  }

  inherits(InfoIframe, EventEmitter);

  InfoIframe.enabled = function() {
    return IframeTransport.enabled();
  };

  InfoIframe.prototype.close = function() {
    if (this.ifr) {
      this.ifr.close();
    }
    this.removeAllListeners();
    this.ifr = null;
  };

  module.exports = InfoIframe;

  }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"./info-iframe-receiver":10,"./transport/iframe":22,"./utils/event":46,"debug":55,"events":3,"inherits":57,"json3":58}],12:[function(require,module,exports){
  (function (process){
  'use strict';

  var EventEmitter = require('events').EventEmitter
    , inherits = require('inherits')
    , urlUtils = require('./utils/url')
    , XDR = require('./transport/sender/xdr')
    , XHRCors = require('./transport/sender/xhr-cors')
    , XHRLocal = require('./transport/sender/xhr-local')
    , XHRFake = require('./transport/sender/xhr-fake')
    , InfoIframe = require('./info-iframe')
    , InfoAjax = require('./info-ajax')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:info-receiver');
  }

  function InfoReceiver(baseUrl, urlInfo) {
    debug(baseUrl);
    var self = this;
    EventEmitter.call(this);

    setTimeout(function() {
      self.doXhr(baseUrl, urlInfo);
    }, 0);
  }

  inherits(InfoReceiver, EventEmitter);

  // TODO this is currently ignoring the list of available transports and the whitelist

  InfoReceiver._getReceiver = function(baseUrl, url, urlInfo) {
    // determine method of CORS support (if needed)
    if (urlInfo.sameOrigin) {
      return new InfoAjax(url, XHRLocal);
    }
    if (XHRCors.enabled) {
      return new InfoAjax(url, XHRCors);
    }
    if (XDR.enabled && urlInfo.sameScheme) {
      return new InfoAjax(url, XDR);
    }
    if (InfoIframe.enabled()) {
      return new InfoIframe(baseUrl, url);
    }
    return new InfoAjax(url, XHRFake);
  };

  InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
    var self = this
      , url = urlUtils.addPath(baseUrl, '/info')
      ;
    debug('doXhr', url);

    this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

    this.timeoutRef = setTimeout(function() {
      debug('timeout');
      self._cleanup(false);
      self.emit('finish');
    }, InfoReceiver.timeout);

    this.xo.once('finish', function(info, rtt) {
      debug('finish', info, rtt);
      self._cleanup(true);
      self.emit('finish', info, rtt);
    });
  };

  InfoReceiver.prototype._cleanup = function(wasClean) {
    debug('_cleanup');
    clearTimeout(this.timeoutRef);
    this.timeoutRef = null;
    if (!wasClean && this.xo) {
      this.xo.close();
    }
    this.xo = null;
  };

  InfoReceiver.prototype.close = function() {
    debug('close');
    this.removeAllListeners();
    this._cleanup(false);
  };

  InfoReceiver.timeout = 8000;

  module.exports = InfoReceiver;

  }).call(this,{ env: {} })

  },{"./info-ajax":9,"./info-iframe":11,"./transport/sender/xdr":34,"./transport/sender/xhr-cors":35,"./transport/sender/xhr-fake":36,"./transport/sender/xhr-local":37,"./utils/url":52,"debug":55,"events":3,"inherits":57}],13:[function(require,module,exports){
  (function (global){
  'use strict';

  module.exports = global.location || {
    origin: 'http://localhost:80'
  , protocol: 'http:'
  , host: 'localhost'
  , port: 80
  , href: 'http://localhost/'
  , hash: ''
  };

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{}],14:[function(require,module,exports){
  (function (process,global){
  'use strict';

  require('./shims');

  var URL = require('url-parse')
    , inherits = require('inherits')
    , JSON3 = require('json3')
    , random = require('./utils/random')
    , escape = require('./utils/escape')
    , urlUtils = require('./utils/url')
    , eventUtils = require('./utils/event')
    , transport = require('./utils/transport')
    , objectUtils = require('./utils/object')
    , browser = require('./utils/browser')
    , log = require('./utils/log')
    , Event = require('./event/event')
    , EventTarget = require('./event/eventtarget')
    , loc = require('./location')
    , CloseEvent = require('./event/close')
    , TransportMessageEvent = require('./event/trans-message')
    , InfoReceiver = require('./info-receiver')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:main');
  }

  var transports;

  // follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
  function SockJS(url, protocols, options) {
    if (!(this instanceof SockJS)) {
      return new SockJS(url, protocols, options);
    }
    if (arguments.length < 1) {
      throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
    }
    EventTarget.call(this);

    this.readyState = SockJS.CONNECTING;
    this.extensions = '';
    this.protocol = '';

    // non-standard extension
    options = options || {};
    if (options.protocols_whitelist) {
      log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
    }
    this._transportsWhitelist = options.transports;
    this._transportOptions = options.transportOptions || {};
    this._timeout = options.timeout || 0;

    var sessionId = options.sessionId || 8;
    if (typeof sessionId === 'function') {
      this._generateSessionId = sessionId;
    } else if (typeof sessionId === 'number') {
      this._generateSessionId = function() {
        return random.string(sessionId);
      };
    } else {
      throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
    }

    this._server = options.server || random.numberString(1000);

    // Step 1 of WS spec - parse and validate the url. Issue #8
    var parsedUrl = new URL(url);
    if (!parsedUrl.host || !parsedUrl.protocol) {
      throw new SyntaxError("The URL '" + url + "' is invalid");
    } else if (parsedUrl.hash) {
      throw new SyntaxError('The URL must not contain a fragment');
    } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
    }

    var secure = parsedUrl.protocol === 'https:';
    // Step 2 - don't allow secure origin with an insecure protocol
    if (loc.protocol === 'https:' && !secure) {
      throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
    }

    // Step 3 - check port access - no need here
    // Step 4 - parse protocols argument
    if (!protocols) {
      protocols = [];
    } else if (!Array.isArray(protocols)) {
      protocols = [protocols];
    }

    // Step 5 - check protocols argument
    var sortedProtocols = protocols.sort();
    sortedProtocols.forEach(function(proto, i) {
      if (!proto) {
        throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
      }
      if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
        throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
      }
    });

    // Step 6 - convert origin
    var o = urlUtils.getOrigin(loc.href);
    this._origin = o ? o.toLowerCase() : null;

    // remove the trailing slash
    parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

    // store the sanitized url
    this.url = parsedUrl.href;
    debug('using url', this.url);

    // Step 7 - start connection in background
    // obtain server info
    // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
    this._urlInfo = {
      nullOrigin: !browser.hasDomain()
    , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
    , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
    };

    this._ir = new InfoReceiver(this.url, this._urlInfo);
    this._ir.once('finish', this._receiveInfo.bind(this));
  }

  inherits(SockJS, EventTarget);

  function userSetCode(code) {
    return code === 1000 || (code >= 3000 && code <= 4999);
  }

  SockJS.prototype.close = function(code, reason) {
    // Step 1
    if (code && !userSetCode(code)) {
      throw new Error('InvalidAccessError: Invalid code');
    }
    // Step 2.4 states the max is 123 bytes, but we are just checking length
    if (reason && reason.length > 123) {
      throw new SyntaxError('reason argument has an invalid length');
    }

    // Step 3.1
    if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
      return;
    }

    // TODO look at docs to determine how to set this
    var wasClean = true;
    this._close(code || 1000, reason || 'Normal closure', wasClean);
  };

  SockJS.prototype.send = function(data) {
    // #13 - convert anything non-string to string
    // TODO this currently turns objects into [object Object]
    if (typeof data !== 'string') {
      data = '' + data;
    }
    if (this.readyState === SockJS.CONNECTING) {
      throw new Error('InvalidStateError: The connection has not been established yet');
    }
    if (this.readyState !== SockJS.OPEN) {
      return;
    }
    this._transport.send(escape.quote(data));
  };

  SockJS.version = require('./version');

  SockJS.CONNECTING = 0;
  SockJS.OPEN = 1;
  SockJS.CLOSING = 2;
  SockJS.CLOSED = 3;

  SockJS.prototype._receiveInfo = function(info, rtt) {
    debug('_receiveInfo', rtt);
    this._ir = null;
    if (!info) {
      this._close(1002, 'Cannot connect to server');
      return;
    }

    // establish a round-trip timeout (RTO) based on the
    // round-trip time (RTT)
    this._rto = this.countRTO(rtt);
    // allow server to override url used for the actual transport
    this._transUrl = info.base_url ? info.base_url : this.url;
    info = objectUtils.extend(info, this._urlInfo);
    debug('info', info);
    // determine list of desired and supported transports
    var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
    this._transports = enabledTransports.main;
    debug(this._transports.length + ' enabled transports');

    this._connect();
  };

  SockJS.prototype._connect = function() {
    for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
      debug('attempt', Transport.transportName);
      if (Transport.needBody) {
        if (!global.document.body ||
            (typeof global.document.readyState !== 'undefined' &&
              global.document.readyState !== 'complete' &&
              global.document.readyState !== 'interactive')) {
          debug('waiting for body');
          this._transports.unshift(Transport);
          eventUtils.attachEvent('load', this._connect.bind(this));
          return;
        }
      }

      // calculate timeout based on RTO and round trips. Default to 5s
      var timeoutMs = Math.max(this._timeout, (this._rto * Transport.roundTrips) || 5000);
      this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
      debug('using timeout', timeoutMs);

      var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
      var options = this._transportOptions[Transport.transportName];
      debug('transport url', transportUrl);
      var transportObj = new Transport(transportUrl, this._transUrl, options);
      transportObj.on('message', this._transportMessage.bind(this));
      transportObj.once('close', this._transportClose.bind(this));
      transportObj.transportName = Transport.transportName;
      this._transport = transportObj;

      return;
    }
    this._close(2000, 'All transports failed', false);
  };

  SockJS.prototype._transportTimeout = function() {
    debug('_transportTimeout');
    if (this.readyState === SockJS.CONNECTING) {
      if (this._transport) {
        this._transport.close();
      }

      this._transportClose(2007, 'Transport timed out');
    }
  };

  SockJS.prototype._transportMessage = function(msg) {
    debug('_transportMessage', msg);
    var self = this
      , type = msg.slice(0, 1)
      , content = msg.slice(1)
      , payload
      ;

    // first check for messages that don't need a payload
    switch (type) {
      case 'o':
        this._open();
        return;
      case 'h':
        this.dispatchEvent(new Event('heartbeat'));
        debug('heartbeat', this.transport);
        return;
    }

    if (content) {
      try {
        payload = JSON3.parse(content);
      } catch (e) {
        debug('bad json', content);
      }
    }

    if (typeof payload === 'undefined') {
      debug('empty payload', content);
      return;
    }

    switch (type) {
      case 'a':
        if (Array.isArray(payload)) {
          payload.forEach(function(p) {
            debug('message', self.transport, p);
            self.dispatchEvent(new TransportMessageEvent(p));
          });
        }
        break;
      case 'm':
        debug('message', this.transport, payload);
        this.dispatchEvent(new TransportMessageEvent(payload));
        break;
      case 'c':
        if (Array.isArray(payload) && payload.length === 2) {
          this._close(payload[0], payload[1], true);
        }
        break;
    }
  };

  SockJS.prototype._transportClose = function(code, reason) {
    debug('_transportClose', this.transport, code, reason);
    if (this._transport) {
      this._transport.removeAllListeners();
      this._transport = null;
      this.transport = null;
    }

    if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
      this._connect();
      return;
    }

    this._close(code, reason);
  };

  SockJS.prototype._open = function() {
    debug('_open', this._transport && this._transport.transportName, this.readyState);
    if (this.readyState === SockJS.CONNECTING) {
      if (this._transportTimeoutId) {
        clearTimeout(this._transportTimeoutId);
        this._transportTimeoutId = null;
      }
      this.readyState = SockJS.OPEN;
      this.transport = this._transport.transportName;
      this.dispatchEvent(new Event('open'));
      debug('connected', this.transport);
    } else {
      // The server might have been restarted, and lost track of our
      // connection.
      this._close(1006, 'Server lost session');
    }
  };

  SockJS.prototype._close = function(code, reason, wasClean) {
    debug('_close', this.transport, code, reason, wasClean, this.readyState);
    var forceFail = false;

    if (this._ir) {
      forceFail = true;
      this._ir.close();
      this._ir = null;
    }
    if (this._transport) {
      this._transport.close();
      this._transport = null;
      this.transport = null;
    }

    if (this.readyState === SockJS.CLOSED) {
      throw new Error('InvalidStateError: SockJS has already been closed');
    }

    this.readyState = SockJS.CLOSING;
    setTimeout(function() {
      this.readyState = SockJS.CLOSED;

      if (forceFail) {
        this.dispatchEvent(new Event('error'));
      }

      var e = new CloseEvent('close');
      e.wasClean = wasClean || false;
      e.code = code || 1000;
      e.reason = reason;

      this.dispatchEvent(e);
      this.onmessage = this.onclose = this.onerror = null;
      debug('disconnected');
    }.bind(this), 0);
  };

  // See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
  // and RFC 2988.
  SockJS.prototype.countRTO = function(rtt) {
    // In a local environment, when using IE8/9 and the `jsonp-polling`
    // transport the time needed to establish a connection (the time that pass
    // from the opening of the transport to the call of `_dispatchOpen`) is
    // around 200msec (the lower bound used in the article above) and this
    // causes spurious timeouts. For this reason we calculate a value slightly
    // larger than that used in the article.
    if (rtt > 100) {
      return 4 * rtt; // rto > 400msec
    }
    return 300 + rtt; // 300msec < rto <= 400msec
  };

  module.exports = function(availableTransports) {
    transports = transport(availableTransports);
    require('./iframe-bootstrap')(SockJS, availableTransports);
    return SockJS;
  };

  }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"./event/close":2,"./event/event":4,"./event/eventtarget":5,"./event/trans-message":6,"./iframe-bootstrap":8,"./info-receiver":12,"./location":13,"./shims":15,"./utils/browser":44,"./utils/escape":45,"./utils/event":46,"./utils/log":48,"./utils/object":49,"./utils/random":50,"./utils/transport":51,"./utils/url":52,"./version":53,"debug":55,"inherits":57,"json3":58,"url-parse":61}],15:[function(require,module,exports){
  /* eslint-disable */
  /* jscs: disable */
  'use strict';

  // pulled specific shims from https://github.com/es-shims/es5-shim

  var ArrayPrototype = Array.prototype;
  var ObjectPrototype = Object.prototype;
  var FunctionPrototype = Function.prototype;
  var StringPrototype = String.prototype;
  var array_slice = ArrayPrototype.slice;

  var _toString = ObjectPrototype.toString;
  var isFunction = function (val) {
      return ObjectPrototype.toString.call(val) === '[object Function]';
  };
  var isArray = function isArray(obj) {
      return _toString.call(obj) === '[object Array]';
  };
  var isString = function isString(obj) {
      return _toString.call(obj) === '[object String]';
  };

  var supportsDescriptors = Object.defineProperty && (function () {
      try {
          Object.defineProperty({}, 'x', {});
          return true;
      } catch (e) { /* this is ES3 */
          return false;
      }
  }());

  // Define configurable, writable and non-enumerable props
  // if they don't exist.
  var defineProperty;
  if (supportsDescriptors) {
      defineProperty = function (object, name, method, forceAssign) {
          if (!forceAssign && (name in object)) { return; }
          Object.defineProperty(object, name, {
              configurable: true,
              enumerable: false,
              writable: true,
              value: method
          });
      };
  } else {
      defineProperty = function (object, name, method, forceAssign) {
          if (!forceAssign && (name in object)) { return; }
          object[name] = method;
      };
  }
  var defineProperties = function (object, map, forceAssign) {
      for (var name in map) {
          if (ObjectPrototype.hasOwnProperty.call(map, name)) {
            defineProperty(object, name, map[name], forceAssign);
          }
      }
  };

  var toObject = function (o) {
      if (o == null) { // this matches both null and undefined
          throw new TypeError("can't convert " + o + ' to object');
      }
      return Object(o);
  };

  //
  // Util
  // ======
  //

  // ES5 9.4
  // http://es5.github.com/#x9.4
  // http://jsperf.com/to-integer

  function toInteger(num) {
      var n = +num;
      if (n !== n) { // isNaN
          n = 0;
      } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
      return n;
  }

  function ToUint32(x) {
      return x >>> 0;
  }

  //
  // Function
  // ========
  //

  // ES-5 15.3.4.5
  // http://es5.github.com/#x15.3.4.5

  function Empty() {}

  defineProperties(FunctionPrototype, {
      bind: function bind(that) { // .length is 1
          // 1. Let Target be the this value.
          var target = this;
          // 2. If IsCallable(Target) is false, throw a TypeError exception.
          if (!isFunction(target)) {
              throw new TypeError('Function.prototype.bind called on incompatible ' + target);
          }
          // 3. Let A be a new (possibly empty) internal list of all of the
          //   argument values provided after thisArg (arg1, arg2 etc), in order.
          // XXX slicedArgs will stand in for "A" if used
          var args = array_slice.call(arguments, 1); // for normal call
          // 4. Let F be a new native ECMAScript object.
          // 11. Set the [[Prototype]] internal property of F to the standard
          //   built-in Function prototype object as specified in 15.3.3.1.
          // 12. Set the [[Call]] internal property of F as described in
          //   15.3.4.5.1.
          // 13. Set the [[Construct]] internal property of F as described in
          //   15.3.4.5.2.
          // 14. Set the [[HasInstance]] internal property of F as described in
          //   15.3.4.5.3.
          var binder = function () {

              if (this instanceof bound) {
                  // 15.3.4.5.2 [[Construct]]
                  // When the [[Construct]] internal method of a function object,
                  // F that was created using the bind function is called with a
                  // list of arguments ExtraArgs, the following steps are taken:
                  // 1. Let target be the value of F's [[TargetFunction]]
                  //   internal property.
                  // 2. If target has no [[Construct]] internal method, a
                  //   TypeError exception is thrown.
                  // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                  //   property.
                  // 4. Let args be a new list containing the same values as the
                  //   list boundArgs in the same order followed by the same
                  //   values as the list ExtraArgs in the same order.
                  // 5. Return the result of calling the [[Construct]] internal
                  //   method of target providing args as the arguments.

                  var result = target.apply(
                      this,
                      args.concat(array_slice.call(arguments))
                  );
                  if (Object(result) === result) {
                      return result;
                  }
                  return this;

              } else {
                  // 15.3.4.5.1 [[Call]]
                  // When the [[Call]] internal method of a function object, F,
                  // which was created using the bind function is called with a
                  // this value and a list of arguments ExtraArgs, the following
                  // steps are taken:
                  // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                  //   property.
                  // 2. Let boundThis be the value of F's [[BoundThis]] internal
                  //   property.
                  // 3. Let target be the value of F's [[TargetFunction]] internal
                  //   property.
                  // 4. Let args be a new list containing the same values as the
                  //   list boundArgs in the same order followed by the same
                  //   values as the list ExtraArgs in the same order.
                  // 5. Return the result of calling the [[Call]] internal method
                  //   of target providing boundThis as the this value and
                  //   providing args as the arguments.

                  // equiv: target.call(this, ...boundArgs, ...args)
                  return target.apply(
                      that,
                      args.concat(array_slice.call(arguments))
                  );

              }

          };

          // 15. If the [[Class]] internal property of Target is "Function", then
          //     a. Let L be the length property of Target minus the length of A.
          //     b. Set the length own property of F to either 0 or L, whichever is
          //       larger.
          // 16. Else set the length own property of F to 0.

          var boundLength = Math.max(0, target.length - args.length);

          // 17. Set the attributes of the length own property of F to the values
          //   specified in 15.3.5.1.
          var boundArgs = [];
          for (var i = 0; i < boundLength; i++) {
              boundArgs.push('$' + i);
          }

          // XXX Build a dynamic function with desired amount of arguments is the only
          // way to set the length property of a function.
          // In environments where Content Security Policies enabled (Chrome extensions,
          // for ex.) all use of eval or Function costructor throws an exception.
          // However in all of these environments Function.prototype.bind exists
          // and so this code will never be executed.
          var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

          if (target.prototype) {
              Empty.prototype = target.prototype;
              bound.prototype = new Empty();
              // Clean up dangling references.
              Empty.prototype = null;
          }

          // TODO
          // 18. Set the [[Extensible]] internal property of F to true.

          // TODO
          // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
          // 20. Call the [[DefineOwnProperty]] internal method of F with
          //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
          //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
          //   false.
          // 21. Call the [[DefineOwnProperty]] internal method of F with
          //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
          //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
          //   and false.

          // TODO
          // NOTE Function objects created using Function.prototype.bind do not
          // have a prototype property or the [[Code]], [[FormalParameters]], and
          // [[Scope]] internal properties.
          // XXX can't delete prototype in pure-js.

          // 22. Return F.
          return bound;
      }
  });

  //
  // Array
  // =====
  //

  // ES5 15.4.3.2
  // http://es5.github.com/#x15.4.3.2
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
  defineProperties(Array, { isArray: isArray });


  var boxedString = Object('a');
  var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

  var properlyBoxesContext = function properlyBoxed(method) {
      // Check node 0.6.21 bug where third parameter is not boxed
      var properlyBoxesNonStrict = true;
      var properlyBoxesStrict = true;
      if (method) {
          method.call('foo', function (_, __, context) {
              if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
          });

          method.call([1], function () {
              'use strict';
              properlyBoxesStrict = typeof this === 'string';
          }, 'x');
      }
      return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
  };

  defineProperties(ArrayPrototype, {
      forEach: function forEach(fun /*, thisp*/) {
          var object = toObject(this),
              self = splitString && isString(this) ? this.split('') : object,
              thisp = arguments[1],
              i = -1,
              length = self.length >>> 0;

          // If no callback function or if callback is not a callable function
          if (!isFunction(fun)) {
              throw new TypeError(); // TODO message
          }

          while (++i < length) {
              if (i in self) {
                  // Invoke the callback function with call, passing arguments:
                  // context, property value, property key, thisArg object
                  // context
                  fun.call(thisp, self[i], i, object);
              }
          }
      }
  }, !properlyBoxesContext(ArrayPrototype.forEach));

  // ES5 15.4.4.14
  // http://es5.github.com/#x15.4.4.14
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
  var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
  defineProperties(ArrayPrototype, {
      indexOf: function indexOf(sought /*, fromIndex */ ) {
          var self = splitString && isString(this) ? this.split('') : toObject(this),
              length = self.length >>> 0;

          if (!length) {
              return -1;
          }

          var i = 0;
          if (arguments.length > 1) {
              i = toInteger(arguments[1]);
          }

          // handle negative indices
          i = i >= 0 ? i : Math.max(0, length + i);
          for (; i < length; i++) {
              if (i in self && self[i] === sought) {
                  return i;
              }
          }
          return -1;
      }
  }, hasFirefox2IndexOfBug);

  //
  // String
  // ======
  //

  // ES5 15.5.4.14
  // http://es5.github.com/#x15.5.4.14

  // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
  // Many browsers do not split properly with regular expressions or they
  // do not perform the split correctly under obscure conditions.
  // See http://blog.stevenlevithan.com/archives/cross-browser-split
  // I've tested in many browsers and this seems to cover the deviant ones:
  //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
  //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
  //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
  //       [undefined, "t", undefined, "e", ...]
  //    ''.split(/.?/) should be [], not [""]
  //    '.'.split(/()()/) should be ["."], not ["", "", "."]

  var string_split = StringPrototype.split;
  if (
      'ab'.split(/(?:ab)*/).length !== 2 ||
      '.'.split(/(.?)(.?)/).length !== 4 ||
      'tesst'.split(/(s)*/)[1] === 't' ||
      'test'.split(/(?:)/, -1).length !== 4 ||
      ''.split(/.?/).length ||
      '.'.split(/()()/).length > 1
  ) {
      (function () {
          var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group

          StringPrototype.split = function (separator, limit) {
              var string = this;
              if (separator === void 0 && limit === 0) {
                  return [];
              }

              // If `separator` is not a regex, use native split
              if (_toString.call(separator) !== '[object RegExp]') {
                  return string_split.call(this, separator, limit);
              }

              var output = [],
                  flags = (separator.ignoreCase ? 'i' : '') +
                          (separator.multiline  ? 'm' : '') +
                          (separator.extended   ? 'x' : '') + // Proposed for ES6
                          (separator.sticky     ? 'y' : ''), // Firefox 3+
                  lastLastIndex = 0,
                  // Make `global` and avoid `lastIndex` issues by working with a copy
                  separator2, match, lastIndex, lastLength;
              separator = new RegExp(separator.source, flags + 'g');
              string += ''; // Type-convert
              if (!compliantExecNpcg) {
                  // Doesn't need flags gy, but they don't hurt
                  separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
              }
              /* Values for `limit`, per the spec:
               * If undefined: 4294967295 // Math.pow(2, 32) - 1
               * If 0, Infinity, or NaN: 0
               * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
               * If negative number: 4294967296 - Math.floor(Math.abs(limit))
               * If other: Type-convert, then use the above rules
               */
              limit = limit === void 0 ?
                  -1 >>> 0 : // Math.pow(2, 32) - 1
                  ToUint32(limit);
              while (match = separator.exec(string)) {
                  // `separator.lastIndex` is not reliable cross-browser
                  lastIndex = match.index + match[0].length;
                  if (lastIndex > lastLastIndex) {
                      output.push(string.slice(lastLastIndex, match.index));
                      // Fix browsers whose `exec` methods don't consistently return `undefined` for
                      // nonparticipating capturing groups
                      if (!compliantExecNpcg && match.length > 1) {
                          match[0].replace(separator2, function () {
                              for (var i = 1; i < arguments.length - 2; i++) {
                                  if (arguments[i] === void 0) {
                                      match[i] = void 0;
                                  }
                              }
                          });
                      }
                      if (match.length > 1 && match.index < string.length) {
                          ArrayPrototype.push.apply(output, match.slice(1));
                      }
                      lastLength = match[0].length;
                      lastLastIndex = lastIndex;
                      if (output.length >= limit) {
                          break;
                      }
                  }
                  if (separator.lastIndex === match.index) {
                      separator.lastIndex++; // Avoid an infinite loop
                  }
              }
              if (lastLastIndex === string.length) {
                  if (lastLength || !separator.test('')) {
                      output.push('');
                  }
              } else {
                  output.push(string.slice(lastLastIndex));
              }
              return output.length > limit ? output.slice(0, limit) : output;
          };
      }());

  // [bugfix, chrome]
  // If separator is undefined, then the result array contains just one String,
  // which is the this value (converted to a String). If limit is not undefined,
  // then the output array is truncated so that it contains no more than limit
  // elements.
  // "0".split(undefined, 0) -> []
  } else if ('0'.split(void 0, 0).length) {
      StringPrototype.split = function split(separator, limit) {
          if (separator === void 0 && limit === 0) { return []; }
          return string_split.call(this, separator, limit);
      };
  }

  // ECMA-262, 3rd B.2.3
  // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
  // non-normative section suggesting uniform semantics and it should be
  // normalized across all browsers
  // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
  var string_substr = StringPrototype.substr;
  var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
  defineProperties(StringPrototype, {
      substr: function substr(start, length) {
          return string_substr.call(
              this,
              start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
              length
          );
      }
  }, hasNegativeSubstrBug);

  },{}],16:[function(require,module,exports){
  'use strict';

  module.exports = [
    // streaming transports
    require('./transport/websocket')
  , require('./transport/xhr-streaming')
  , require('./transport/xdr-streaming')
  , require('./transport/eventsource')
  , require('./transport/lib/iframe-wrap')(require('./transport/eventsource'))

    // polling transports
  , require('./transport/htmlfile')
  , require('./transport/lib/iframe-wrap')(require('./transport/htmlfile'))
  , require('./transport/xhr-polling')
  , require('./transport/xdr-polling')
  , require('./transport/lib/iframe-wrap')(require('./transport/xhr-polling'))
  , require('./transport/jsonp-polling')
  ];

  },{"./transport/eventsource":20,"./transport/htmlfile":21,"./transport/jsonp-polling":23,"./transport/lib/iframe-wrap":26,"./transport/websocket":38,"./transport/xdr-polling":39,"./transport/xdr-streaming":40,"./transport/xhr-polling":41,"./transport/xhr-streaming":42}],17:[function(require,module,exports){
  (function (process,global){
  'use strict';

  var EventEmitter = require('events').EventEmitter
    , inherits = require('inherits')
    , utils = require('../../utils/event')
    , urlUtils = require('../../utils/url')
    , XHR = global.XMLHttpRequest
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:browser:xhr');
  }

  function AbstractXHRObject(method, url, payload, opts) {
    debug(method, url);
    var self = this;
    EventEmitter.call(this);

    setTimeout(function () {
      self._start(method, url, payload, opts);
    }, 0);
  }

  inherits(AbstractXHRObject, EventEmitter);

  AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
    var self = this;

    try {
      this.xhr = new XHR();
    } catch (x) {
      // intentionally empty
    }

    if (!this.xhr) {
      debug('no xhr');
      this.emit('finish', 0, 'no xhr support');
      this._cleanup();
      return;
    }

    // several browsers cache POSTs
    url = urlUtils.addQuery(url, 't=' + (+new Date()));

    // Explorer tends to keep connection open, even after the
    // tab gets closed: http://bugs.jquery.com/ticket/5280
    this.unloadRef = utils.unloadAdd(function() {
      debug('unload cleanup');
      self._cleanup(true);
    });
    try {
      this.xhr.open(method, url, true);
      if (this.timeout && 'timeout' in this.xhr) {
        this.xhr.timeout = this.timeout;
        this.xhr.ontimeout = function() {
          debug('xhr timeout');
          self.emit('finish', 0, '');
          self._cleanup(false);
        };
      }
    } catch (e) {
      debug('exception', e);
      // IE raises an exception on wrong port.
      this.emit('finish', 0, '');
      this._cleanup(false);
      return;
    }

    if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
      debug('withCredentials');
      // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
      // "This never affects same-site requests."

      this.xhr.withCredentials = true;
    }
    if (opts && opts.headers) {
      for (var key in opts.headers) {
        this.xhr.setRequestHeader(key, opts.headers[key]);
      }
    }

    this.xhr.onreadystatechange = function() {
      if (self.xhr) {
        var x = self.xhr;
        var text, status;
        debug('readyState', x.readyState);
        switch (x.readyState) {
        case 3:
          // IE doesn't like peeking into responseText or status
          // on Microsoft.XMLHTTP and readystate=3
          try {
            status = x.status;
            text = x.responseText;
          } catch (e) {
            // intentionally empty
          }
          debug('status', status);
          // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
          if (status === 1223) {
            status = 204;
          }

          // IE does return readystate == 3 for 404 answers.
          if (status === 200 && text && text.length > 0) {
            debug('chunk');
            self.emit('chunk', status, text);
          }
          break;
        case 4:
          status = x.status;
          debug('status', status);
          // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
          if (status === 1223) {
            status = 204;
          }
          // IE returns this for a bad port
          // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
          if (status === 12005 || status === 12029) {
            status = 0;
          }

          debug('finish', status, x.responseText);
          self.emit('finish', status, x.responseText);
          self._cleanup(false);
          break;
        }
      }
    };

    try {
      self.xhr.send(payload);
    } catch (e) {
      self.emit('finish', 0, '');
      self._cleanup(false);
    }
  };

  AbstractXHRObject.prototype._cleanup = function(abort) {
    debug('cleanup');
    if (!this.xhr) {
      return;
    }
    this.removeAllListeners();
    utils.unloadDel(this.unloadRef);

    // IE needs this field to be a function
    this.xhr.onreadystatechange = function() {};
    if (this.xhr.ontimeout) {
      this.xhr.ontimeout = null;
    }

    if (abort) {
      try {
        this.xhr.abort();
      } catch (x) {
        // intentionally empty
      }
    }
    this.unloadRef = this.xhr = null;
  };

  AbstractXHRObject.prototype.close = function() {
    debug('close');
    this._cleanup(true);
  };

  AbstractXHRObject.enabled = !!XHR;
  // override XMLHttpRequest for IE6/7
  // obfuscate to avoid firewalls
  var axo = ['Active'].concat('Object').join('X');
  if (!AbstractXHRObject.enabled && (axo in global)) {
    debug('overriding xmlhttprequest');
    XHR = function() {
      try {
        return new global[axo]('Microsoft.XMLHTTP');
      } catch (e) {
        return null;
      }
    };
    AbstractXHRObject.enabled = !!new XHR();
  }

  var cors = false;
  try {
    cors = 'withCredentials' in new XHR();
  } catch (ignored) {
    // intentionally empty
  }

  AbstractXHRObject.supportsCORS = cors;

  module.exports = AbstractXHRObject;

  }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],18:[function(require,module,exports){
  (function (global){
  module.exports = global.EventSource;

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{}],19:[function(require,module,exports){
  (function (global){
  'use strict';

  var Driver = global.WebSocket || global.MozWebSocket;
  if (Driver) {
    module.exports = function WebSocketBrowserDriver(url) {
      return new Driver(url);
    };
  } else {
    module.exports = undefined;
  }

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{}],20:[function(require,module,exports){
  'use strict';

  var inherits = require('inherits')
    , AjaxBasedTransport = require('./lib/ajax-based')
    , EventSourceReceiver = require('./receiver/eventsource')
    , XHRCorsObject = require('./sender/xhr-cors')
    , EventSourceDriver = require('eventsource')
    ;

  function EventSourceTransport(transUrl) {
    if (!EventSourceTransport.enabled()) {
      throw new Error('Transport created when disabled');
    }

    AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
  }

  inherits(EventSourceTransport, AjaxBasedTransport);

  EventSourceTransport.enabled = function() {
    return !!EventSourceDriver;
  };

  EventSourceTransport.transportName = 'eventsource';
  EventSourceTransport.roundTrips = 2;

  module.exports = EventSourceTransport;

  },{"./lib/ajax-based":24,"./receiver/eventsource":29,"./sender/xhr-cors":35,"eventsource":18,"inherits":57}],21:[function(require,module,exports){
  'use strict';

  var inherits = require('inherits')
    , HtmlfileReceiver = require('./receiver/htmlfile')
    , XHRLocalObject = require('./sender/xhr-local')
    , AjaxBasedTransport = require('./lib/ajax-based')
    ;

  function HtmlFileTransport(transUrl) {
    if (!HtmlfileReceiver.enabled) {
      throw new Error('Transport created when disabled');
    }
    AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
  }

  inherits(HtmlFileTransport, AjaxBasedTransport);

  HtmlFileTransport.enabled = function(info) {
    return HtmlfileReceiver.enabled && info.sameOrigin;
  };

  HtmlFileTransport.transportName = 'htmlfile';
  HtmlFileTransport.roundTrips = 2;

  module.exports = HtmlFileTransport;

  },{"./lib/ajax-based":24,"./receiver/htmlfile":30,"./sender/xhr-local":37,"inherits":57}],22:[function(require,module,exports){
  (function (process){
  'use strict';

  // Few cool transports do work only for same-origin. In order to make
  // them work cross-domain we shall use iframe, served from the
  // remote domain. New browsers have capabilities to communicate with
  // cross domain iframe using postMessage(). In IE it was implemented
  // from IE 8+, but of course, IE got some details wrong:
  //    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
  //    http://stevesouders.com/misc/test-postmessage.php

  var inherits = require('inherits')
    , JSON3 = require('json3')
    , EventEmitter = require('events').EventEmitter
    , version = require('../version')
    , urlUtils = require('../utils/url')
    , iframeUtils = require('../utils/iframe')
    , eventUtils = require('../utils/event')
    , random = require('../utils/random')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:transport:iframe');
  }

  function IframeTransport(transport, transUrl, baseUrl) {
    if (!IframeTransport.enabled()) {
      throw new Error('Transport created when disabled');
    }
    EventEmitter.call(this);

    var self = this;
    this.origin = urlUtils.getOrigin(baseUrl);
    this.baseUrl = baseUrl;
    this.transUrl = transUrl;
    this.transport = transport;
    this.windowId = random.string(8);

    var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
    debug(transport, transUrl, iframeUrl);

    this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
      debug('err callback');
      self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
      self.close();
    });

    this.onmessageCallback = this._message.bind(this);
    eventUtils.attachEvent('message', this.onmessageCallback);
  }

  inherits(IframeTransport, EventEmitter);

  IframeTransport.prototype.close = function() {
    debug('close');
    this.removeAllListeners();
    if (this.iframeObj) {
      eventUtils.detachEvent('message', this.onmessageCallback);
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        this.postMessage('c');
      } catch (x) {
        // intentionally empty
      }
      this.iframeObj.cleanup();
      this.iframeObj = null;
      this.onmessageCallback = this.iframeObj = null;
    }
  };

  IframeTransport.prototype._message = function(e) {
    debug('message', e.data);
    if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
      debug('not same origin', e.origin, this.origin);
      return;
    }

    var iframeMessage;
    try {
      iframeMessage = JSON3.parse(e.data);
    } catch (ignored) {
      debug('bad json', e.data);
      return;
    }

    if (iframeMessage.windowId !== this.windowId) {
      debug('mismatched window id', iframeMessage.windowId, this.windowId);
      return;
    }

    switch (iframeMessage.type) {
    case 's':
      this.iframeObj.loaded();
      // window global dependency
      this.postMessage('s', JSON3.stringify([
        version
      , this.transport
      , this.transUrl
      , this.baseUrl
      ]));
      break;
    case 't':
      this.emit('message', iframeMessage.data);
      break;
    case 'c':
      var cdata;
      try {
        cdata = JSON3.parse(iframeMessage.data);
      } catch (ignored) {
        debug('bad json', iframeMessage.data);
        return;
      }
      this.emit('close', cdata[0], cdata[1]);
      this.close();
      break;
    }
  };

  IframeTransport.prototype.postMessage = function(type, data) {
    debug('postMessage', type, data);
    this.iframeObj.post(JSON3.stringify({
      windowId: this.windowId
    , type: type
    , data: data || ''
    }), this.origin);
  };

  IframeTransport.prototype.send = function(message) {
    debug('send', message);
    this.postMessage('m', message);
  };

  IframeTransport.enabled = function() {
    return iframeUtils.iframeEnabled;
  };

  IframeTransport.transportName = 'iframe';
  IframeTransport.roundTrips = 2;

  module.exports = IframeTransport;

  }).call(this,{ env: {} })

  },{"../utils/event":46,"../utils/iframe":47,"../utils/random":50,"../utils/url":52,"../version":53,"debug":55,"events":3,"inherits":57,"json3":58}],23:[function(require,module,exports){
  (function (global){
  'use strict';

  // The simplest and most robust transport, using the well-know cross
  // domain hack - JSONP. This transport is quite inefficient - one
  // message could use up to one http request. But at least it works almost
  // everywhere.
  // Known limitations:
  //   o you will get a spinning cursor
  //   o for Konqueror a dumb timer is needed to detect errors

  var inherits = require('inherits')
    , SenderReceiver = require('./lib/sender-receiver')
    , JsonpReceiver = require('./receiver/jsonp')
    , jsonpSender = require('./sender/jsonp')
    ;

  function JsonPTransport(transUrl) {
    if (!JsonPTransport.enabled()) {
      throw new Error('Transport created when disabled');
    }
    SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
  }

  inherits(JsonPTransport, SenderReceiver);

  JsonPTransport.enabled = function() {
    return !!global.document;
  };

  JsonPTransport.transportName = 'jsonp-polling';
  JsonPTransport.roundTrips = 1;
  JsonPTransport.needBody = true;

  module.exports = JsonPTransport;

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"./lib/sender-receiver":28,"./receiver/jsonp":31,"./sender/jsonp":33,"inherits":57}],24:[function(require,module,exports){
  (function (process){
  'use strict';

  var inherits = require('inherits')
    , urlUtils = require('../../utils/url')
    , SenderReceiver = require('./sender-receiver')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:ajax-based');
  }

  function createAjaxSender(AjaxObject) {
    return function(url, payload, callback) {
      debug('create ajax sender', url, payload);
      var opt = {};
      if (typeof payload === 'string') {
        opt.headers = {'Content-type': 'text/plain'};
      }
      var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
      var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
      xo.once('finish', function(status) {
        debug('finish', status);
        xo = null;

        if (status !== 200 && status !== 204) {
          return callback(new Error('http status ' + status));
        }
        callback();
      });
      return function() {
        debug('abort');
        xo.close();
        xo = null;

        var err = new Error('Aborted');
        err.code = 1000;
        callback(err);
      };
    };
  }

  function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
    SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
  }

  inherits(AjaxBasedTransport, SenderReceiver);

  module.exports = AjaxBasedTransport;

  }).call(this,{ env: {} })

  },{"../../utils/url":52,"./sender-receiver":28,"debug":55,"inherits":57}],25:[function(require,module,exports){
  (function (process){
  'use strict';

  var inherits = require('inherits')
    , EventEmitter = require('events').EventEmitter
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:buffered-sender');
  }

  function BufferedSender(url, sender) {
    debug(url);
    EventEmitter.call(this);
    this.sendBuffer = [];
    this.sender = sender;
    this.url = url;
  }

  inherits(BufferedSender, EventEmitter);

  BufferedSender.prototype.send = function(message) {
    debug('send', message);
    this.sendBuffer.push(message);
    if (!this.sendStop) {
      this.sendSchedule();
    }
  };

  // For polling transports in a situation when in the message callback,
  // new message is being send. If the sending connection was started
  // before receiving one, it is possible to saturate the network and
  // timeout due to the lack of receiving socket. To avoid that we delay
  // sending messages by some small time, in order to let receiving
  // connection be started beforehand. This is only a halfmeasure and
  // does not fix the big problem, but it does make the tests go more
  // stable on slow networks.
  BufferedSender.prototype.sendScheduleWait = function() {
    debug('sendScheduleWait');
    var self = this;
    var tref;
    this.sendStop = function() {
      debug('sendStop');
      self.sendStop = null;
      clearTimeout(tref);
    };
    tref = setTimeout(function() {
      debug('timeout');
      self.sendStop = null;
      self.sendSchedule();
    }, 25);
  };

  BufferedSender.prototype.sendSchedule = function() {
    debug('sendSchedule', this.sendBuffer.length);
    var self = this;
    if (this.sendBuffer.length > 0) {
      var payload = '[' + this.sendBuffer.join(',') + ']';
      this.sendStop = this.sender(this.url, payload, function(err) {
        self.sendStop = null;
        if (err) {
          debug('error', err);
          self.emit('close', err.code || 1006, 'Sending error: ' + err);
          self.close();
        } else {
          self.sendScheduleWait();
        }
      });
      this.sendBuffer = [];
    }
  };

  BufferedSender.prototype._cleanup = function() {
    debug('_cleanup');
    this.removeAllListeners();
  };

  BufferedSender.prototype.close = function() {
    debug('close');
    this._cleanup();
    if (this.sendStop) {
      this.sendStop();
      this.sendStop = null;
    }
  };

  module.exports = BufferedSender;

  }).call(this,{ env: {} })

  },{"debug":55,"events":3,"inherits":57}],26:[function(require,module,exports){
  (function (global){
  'use strict';

  var inherits = require('inherits')
    , IframeTransport = require('../iframe')
    , objectUtils = require('../../utils/object')
    ;

  module.exports = function(transport) {

    function IframeWrapTransport(transUrl, baseUrl) {
      IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
    }

    inherits(IframeWrapTransport, IframeTransport);

    IframeWrapTransport.enabled = function(url, info) {
      if (!global.document) {
        return false;
      }

      var iframeInfo = objectUtils.extend({}, info);
      iframeInfo.sameOrigin = true;
      return transport.enabled(iframeInfo) && IframeTransport.enabled();
    };

    IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
    IframeWrapTransport.needBody = true;
    IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

    IframeWrapTransport.facadeTransport = transport;

    return IframeWrapTransport;
  };

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"../../utils/object":49,"../iframe":22,"inherits":57}],27:[function(require,module,exports){
  (function (process){
  'use strict';

  var inherits = require('inherits')
    , EventEmitter = require('events').EventEmitter
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:polling');
  }

  function Polling(Receiver, receiveUrl, AjaxObject) {
    debug(receiveUrl);
    EventEmitter.call(this);
    this.Receiver = Receiver;
    this.receiveUrl = receiveUrl;
    this.AjaxObject = AjaxObject;
    this._scheduleReceiver();
  }

  inherits(Polling, EventEmitter);

  Polling.prototype._scheduleReceiver = function() {
    debug('_scheduleReceiver');
    var self = this;
    var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

    poll.on('message', function(msg) {
      debug('message', msg);
      self.emit('message', msg);
    });

    poll.once('close', function(code, reason) {
      debug('close', code, reason, self.pollIsClosing);
      self.poll = poll = null;

      if (!self.pollIsClosing) {
        if (reason === 'network') {
          self._scheduleReceiver();
        } else {
          self.emit('close', code || 1006, reason);
          self.removeAllListeners();
        }
      }
    });
  };

  Polling.prototype.abort = function() {
    debug('abort');
    this.removeAllListeners();
    this.pollIsClosing = true;
    if (this.poll) {
      this.poll.abort();
    }
  };

  module.exports = Polling;

  }).call(this,{ env: {} })

  },{"debug":55,"events":3,"inherits":57}],28:[function(require,module,exports){
  (function (process){
  'use strict';

  var inherits = require('inherits')
    , urlUtils = require('../../utils/url')
    , BufferedSender = require('./buffered-sender')
    , Polling = require('./polling')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:sender-receiver');
  }

  function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
    var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
    debug(pollUrl);
    var self = this;
    BufferedSender.call(this, transUrl, senderFunc);

    this.poll = new Polling(Receiver, pollUrl, AjaxObject);
    this.poll.on('message', function(msg) {
      debug('poll message', msg);
      self.emit('message', msg);
    });
    this.poll.once('close', function(code, reason) {
      debug('poll close', code, reason);
      self.poll = null;
      self.emit('close', code, reason);
      self.close();
    });
  }

  inherits(SenderReceiver, BufferedSender);

  SenderReceiver.prototype.close = function() {
    BufferedSender.prototype.close.call(this);
    debug('close');
    this.removeAllListeners();
    if (this.poll) {
      this.poll.abort();
      this.poll = null;
    }
  };

  module.exports = SenderReceiver;

  }).call(this,{ env: {} })

  },{"../../utils/url":52,"./buffered-sender":25,"./polling":27,"debug":55,"inherits":57}],29:[function(require,module,exports){
  (function (process){
  'use strict';

  var inherits = require('inherits')
    , EventEmitter = require('events').EventEmitter
    , EventSourceDriver = require('eventsource')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:receiver:eventsource');
  }

  function EventSourceReceiver(url) {
    debug(url);
    EventEmitter.call(this);

    var self = this;
    var es = this.es = new EventSourceDriver(url);
    es.onmessage = function(e) {
      debug('message', e.data);
      self.emit('message', decodeURI(e.data));
    };
    es.onerror = function(e) {
      debug('error', es.readyState, e);
      // ES on reconnection has readyState = 0 or 1.
      // on network error it's CLOSED = 2
      var reason = (es.readyState !== 2 ? 'network' : 'permanent');
      self._cleanup();
      self._close(reason);
    };
  }

  inherits(EventSourceReceiver, EventEmitter);

  EventSourceReceiver.prototype.abort = function() {
    debug('abort');
    this._cleanup();
    this._close('user');
  };

  EventSourceReceiver.prototype._cleanup = function() {
    debug('cleanup');
    var es = this.es;
    if (es) {
      es.onmessage = es.onerror = null;
      es.close();
      this.es = null;
    }
  };

  EventSourceReceiver.prototype._close = function(reason) {
    debug('close', reason);
    var self = this;
    // Safari and chrome < 15 crash if we close window before
    // waiting for ES cleanup. See:
    // https://code.google.com/p/chromium/issues/detail?id=89155
    setTimeout(function() {
      self.emit('close', null, reason);
      self.removeAllListeners();
    }, 200);
  };

  module.exports = EventSourceReceiver;

  }).call(this,{ env: {} })

  },{"debug":55,"events":3,"eventsource":18,"inherits":57}],30:[function(require,module,exports){
  (function (process,global){
  'use strict';

  var inherits = require('inherits')
    , iframeUtils = require('../../utils/iframe')
    , urlUtils = require('../../utils/url')
    , EventEmitter = require('events').EventEmitter
    , random = require('../../utils/random')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:receiver:htmlfile');
  }

  function HtmlfileReceiver(url) {
    debug(url);
    EventEmitter.call(this);
    var self = this;
    iframeUtils.polluteGlobalNamespace();

    this.id = 'a' + random.string(6);
    url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));

    debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
    var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
        iframeUtils.createHtmlfile : iframeUtils.createIframe;

    global[iframeUtils.WPrefix][this.id] = {
      start: function() {
        debug('start');
        self.iframeObj.loaded();
      }
    , message: function(data) {
        debug('message', data);
        self.emit('message', data);
      }
    , stop: function() {
        debug('stop');
        self._cleanup();
        self._close('network');
      }
    };
    this.iframeObj = constructFunc(url, function() {
      debug('callback');
      self._cleanup();
      self._close('permanent');
    });
  }

  inherits(HtmlfileReceiver, EventEmitter);

  HtmlfileReceiver.prototype.abort = function() {
    debug('abort');
    this._cleanup();
    this._close('user');
  };

  HtmlfileReceiver.prototype._cleanup = function() {
    debug('_cleanup');
    if (this.iframeObj) {
      this.iframeObj.cleanup();
      this.iframeObj = null;
    }
    delete global[iframeUtils.WPrefix][this.id];
  };

  HtmlfileReceiver.prototype._close = function(reason) {
    debug('_close', reason);
    this.emit('close', null, reason);
    this.removeAllListeners();
  };

  HtmlfileReceiver.htmlfileEnabled = false;

  // obfuscate to avoid firewalls
  var axo = ['Active'].concat('Object').join('X');
  if (axo in global) {
    try {
      HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
    } catch (x) {
      // intentionally empty
    }
  }

  HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;

  module.exports = HtmlfileReceiver;

  }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],31:[function(require,module,exports){
  (function (process,global){
  'use strict';

  var utils = require('../../utils/iframe')
    , random = require('../../utils/random')
    , browser = require('../../utils/browser')
    , urlUtils = require('../../utils/url')
    , inherits = require('inherits')
    , EventEmitter = require('events').EventEmitter
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:receiver:jsonp');
  }

  function JsonpReceiver(url) {
    debug(url);
    var self = this;
    EventEmitter.call(this);

    utils.polluteGlobalNamespace();

    this.id = 'a' + random.string(6);
    var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

    global[utils.WPrefix][this.id] = this._callback.bind(this);
    this._createScript(urlWithId);

    // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
    this.timeoutId = setTimeout(function() {
      debug('timeout');
      self._abort(new Error('JSONP script loaded abnormally (timeout)'));
    }, JsonpReceiver.timeout);
  }

  inherits(JsonpReceiver, EventEmitter);

  JsonpReceiver.prototype.abort = function() {
    debug('abort');
    if (global[utils.WPrefix][this.id]) {
      var err = new Error('JSONP user aborted read');
      err.code = 1000;
      this._abort(err);
    }
  };

  JsonpReceiver.timeout = 35000;
  JsonpReceiver.scriptErrorTimeout = 1000;

  JsonpReceiver.prototype._callback = function(data) {
    debug('_callback', data);
    this._cleanup();

    if (this.aborting) {
      return;
    }

    if (data) {
      debug('message', data);
      this.emit('message', data);
    }
    this.emit('close', null, 'network');
    this.removeAllListeners();
  };

  JsonpReceiver.prototype._abort = function(err) {
    debug('_abort', err);
    this._cleanup();
    this.aborting = true;
    this.emit('close', err.code, err.message);
    this.removeAllListeners();
  };

  JsonpReceiver.prototype._cleanup = function() {
    debug('_cleanup');
    clearTimeout(this.timeoutId);
    if (this.script2) {
      this.script2.parentNode.removeChild(this.script2);
      this.script2 = null;
    }
    if (this.script) {
      var script = this.script;
      // Unfortunately, you can't really abort script loading of
      // the script.
      script.parentNode.removeChild(script);
      script.onreadystatechange = script.onerror =
          script.onload = script.onclick = null;
      this.script = null;
    }
    delete global[utils.WPrefix][this.id];
  };

  JsonpReceiver.prototype._scriptError = function() {
    debug('_scriptError');
    var self = this;
    if (this.errorTimer) {
      return;
    }

    this.errorTimer = setTimeout(function() {
      if (!self.loadedOkay) {
        self._abort(new Error('JSONP script loaded abnormally (onerror)'));
      }
    }, JsonpReceiver.scriptErrorTimeout);
  };

  JsonpReceiver.prototype._createScript = function(url) {
    debug('_createScript', url);
    var self = this;
    var script = this.script = global.document.createElement('script');
    var script2;  // Opera synchronous load trick.

    script.id = 'a' + random.string(8);
    script.src = url;
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.onerror = this._scriptError.bind(this);
    script.onload = function() {
      debug('onload');
      self._abort(new Error('JSONP script loaded abnormally (onload)'));
    };

    // IE9 fires 'error' event after onreadystatechange or before, in random order.
    // Use loadedOkay to determine if actually errored
    script.onreadystatechange = function() {
      debug('onreadystatechange', script.readyState);
      if (/loaded|closed/.test(script.readyState)) {
        if (script && script.htmlFor && script.onclick) {
          self.loadedOkay = true;
          try {
            // In IE, actually execute the script.
            script.onclick();
          } catch (x) {
            // intentionally empty
          }
        }
        if (script) {
          self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
        }
      }
    };
    // IE: event/htmlFor/onclick trick.
    // One can't rely on proper order for onreadystatechange. In order to
    // make sure, set a 'htmlFor' and 'event' properties, so that
    // script code will be installed as 'onclick' handler for the
    // script object. Later, onreadystatechange, manually execute this
    // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
    // set. For reference see:
    //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
    // Also, read on that about script ordering:
    //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
    if (typeof script.async === 'undefined' && global.document.attachEvent) {
      // According to mozilla docs, in recent browsers script.async defaults
      // to 'true', so we may use it to detect a good browser:
      // https://developer.mozilla.org/en/HTML/Element/script
      if (!browser.isOpera()) {
        // Naively assume we're in IE
        try {
          script.htmlFor = script.id;
          script.event = 'onclick';
        } catch (x) {
          // intentionally empty
        }
        script.async = true;
      } else {
        // Opera, second sync script hack
        script2 = this.script2 = global.document.createElement('script');
        script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
        script.async = script2.async = false;
      }
    }
    if (typeof script.async !== 'undefined') {
      script.async = true;
    }

    var head = global.document.getElementsByTagName('head')[0];
    head.insertBefore(script, head.firstChild);
    if (script2) {
      head.insertBefore(script2, head.firstChild);
    }
  };

  module.exports = JsonpReceiver;

  }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"../../utils/browser":44,"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],32:[function(require,module,exports){
  (function (process){
  'use strict';

  var inherits = require('inherits')
    , EventEmitter = require('events').EventEmitter
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:receiver:xhr');
  }

  function XhrReceiver(url, AjaxObject) {
    debug(url);
    EventEmitter.call(this);
    var self = this;

    this.bufferPosition = 0;

    this.xo = new AjaxObject('POST', url, null);
    this.xo.on('chunk', this._chunkHandler.bind(this));
    this.xo.once('finish', function(status, text) {
      debug('finish', status, text);
      self._chunkHandler(status, text);
      self.xo = null;
      var reason = status === 200 ? 'network' : 'permanent';
      debug('close', reason);
      self.emit('close', null, reason);
      self._cleanup();
    });
  }

  inherits(XhrReceiver, EventEmitter);

  XhrReceiver.prototype._chunkHandler = function(status, text) {
    debug('_chunkHandler', status);
    if (status !== 200 || !text) {
      return;
    }

    for (var idx = -1; ; this.bufferPosition += idx + 1) {
      var buf = text.slice(this.bufferPosition);
      idx = buf.indexOf('\n');
      if (idx === -1) {
        break;
      }
      var msg = buf.slice(0, idx);
      if (msg) {
        debug('message', msg);
        this.emit('message', msg);
      }
    }
  };

  XhrReceiver.prototype._cleanup = function() {
    debug('_cleanup');
    this.removeAllListeners();
  };

  XhrReceiver.prototype.abort = function() {
    debug('abort');
    if (this.xo) {
      this.xo.close();
      debug('close');
      this.emit('close', null, 'user');
      this.xo = null;
    }
    this._cleanup();
  };

  module.exports = XhrReceiver;

  }).call(this,{ env: {} })

  },{"debug":55,"events":3,"inherits":57}],33:[function(require,module,exports){
  (function (process,global){
  'use strict';

  var random = require('../../utils/random')
    , urlUtils = require('../../utils/url')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:sender:jsonp');
  }

  var form, area;

  function createIframe(id) {
    debug('createIframe', id);
    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      return global.document.createElement('<iframe name="' + id + '">');
    } catch (x) {
      var iframe = global.document.createElement('iframe');
      iframe.name = id;
      return iframe;
    }
  }

  function createForm() {
    debug('createForm');
    form = global.document.createElement('form');
    form.style.display = 'none';
    form.style.position = 'absolute';
    form.method = 'POST';
    form.enctype = 'application/x-www-form-urlencoded';
    form.acceptCharset = 'UTF-8';

    area = global.document.createElement('textarea');
    area.name = 'd';
    form.appendChild(area);

    global.document.body.appendChild(form);
  }

  module.exports = function(url, payload, callback) {
    debug(url, payload);
    if (!form) {
      createForm();
    }
    var id = 'a' + random.string(8);
    form.target = id;
    form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);

    var iframe = createIframe(id);
    iframe.id = id;
    iframe.style.display = 'none';
    form.appendChild(iframe);

    try {
      area.value = payload;
    } catch (e) {
      // seriously broken browsers get here
    }
    form.submit();

    var completed = function(err) {
      debug('completed', id, err);
      if (!iframe.onerror) {
        return;
      }
      iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
      // Opera mini doesn't like if we GC iframe
      // immediately, thus this timeout.
      setTimeout(function() {
        debug('cleaning up', id);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
      }, 500);
      area.value = '';
      // It is not possible to detect if the iframe succeeded or
      // failed to submit our form.
      callback(err);
    };
    iframe.onerror = function() {
      debug('onerror', id);
      completed();
    };
    iframe.onload = function() {
      debug('onload', id);
      completed();
    };
    iframe.onreadystatechange = function(e) {
      debug('onreadystatechange', id, iframe.readyState, e);
      if (iframe.readyState === 'complete') {
        completed();
      }
    };
    return function() {
      debug('aborted', id);
      completed(new Error('Aborted'));
    };
  };

  }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"../../utils/random":50,"../../utils/url":52,"debug":55}],34:[function(require,module,exports){
  (function (process,global){
  'use strict';

  var EventEmitter = require('events').EventEmitter
    , inherits = require('inherits')
    , eventUtils = require('../../utils/event')
    , browser = require('../../utils/browser')
    , urlUtils = require('../../utils/url')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:sender:xdr');
  }

  // References:
  //   http://ajaxian.com/archives/100-line-ajax-wrapper
  //   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

  function XDRObject(method, url, payload) {
    debug(method, url);
    var self = this;
    EventEmitter.call(this);

    setTimeout(function() {
      self._start(method, url, payload);
    }, 0);
  }

  inherits(XDRObject, EventEmitter);

  XDRObject.prototype._start = function(method, url, payload) {
    debug('_start');
    var self = this;
    var xdr = new global.XDomainRequest();
    // IE caches even POSTs
    url = urlUtils.addQuery(url, 't=' + (+new Date()));

    xdr.onerror = function() {
      debug('onerror');
      self._error();
    };
    xdr.ontimeout = function() {
      debug('ontimeout');
      self._error();
    };
    xdr.onprogress = function() {
      debug('progress', xdr.responseText);
      self.emit('chunk', 200, xdr.responseText);
    };
    xdr.onload = function() {
      debug('load');
      self.emit('finish', 200, xdr.responseText);
      self._cleanup(false);
    };
    this.xdr = xdr;
    this.unloadRef = eventUtils.unloadAdd(function() {
      self._cleanup(true);
    });
    try {
      // Fails with AccessDenied if port number is bogus
      this.xdr.open(method, url);
      if (this.timeout) {
        this.xdr.timeout = this.timeout;
      }
      this.xdr.send(payload);
    } catch (x) {
      this._error();
    }
  };

  XDRObject.prototype._error = function() {
    this.emit('finish', 0, '');
    this._cleanup(false);
  };

  XDRObject.prototype._cleanup = function(abort) {
    debug('cleanup', abort);
    if (!this.xdr) {
      return;
    }
    this.removeAllListeners();
    eventUtils.unloadDel(this.unloadRef);

    this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
    if (abort) {
      try {
        this.xdr.abort();
      } catch (x) {
        // intentionally empty
      }
    }
    this.unloadRef = this.xdr = null;
  };

  XDRObject.prototype.close = function() {
    debug('close');
    this._cleanup(true);
  };

  // IE 8/9 if the request target uses the same scheme - #79
  XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());

  module.exports = XDRObject;

  }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"../../utils/browser":44,"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],35:[function(require,module,exports){
  'use strict';

  var inherits = require('inherits')
    , XhrDriver = require('../driver/xhr')
    ;

  function XHRCorsObject(method, url, payload, opts) {
    XhrDriver.call(this, method, url, payload, opts);
  }

  inherits(XHRCorsObject, XhrDriver);

  XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

  module.exports = XHRCorsObject;

  },{"../driver/xhr":17,"inherits":57}],36:[function(require,module,exports){
  'use strict';

  var EventEmitter = require('events').EventEmitter
    , inherits = require('inherits')
    ;

  function XHRFake(/* method, url, payload, opts */) {
    var self = this;
    EventEmitter.call(this);

    this.to = setTimeout(function() {
      self.emit('finish', 200, '{}');
    }, XHRFake.timeout);
  }

  inherits(XHRFake, EventEmitter);

  XHRFake.prototype.close = function() {
    clearTimeout(this.to);
  };

  XHRFake.timeout = 2000;

  module.exports = XHRFake;

  },{"events":3,"inherits":57}],37:[function(require,module,exports){
  'use strict';

  var inherits = require('inherits')
    , XhrDriver = require('../driver/xhr')
    ;

  function XHRLocalObject(method, url, payload /*, opts */) {
    XhrDriver.call(this, method, url, payload, {
      noCredentials: true
    });
  }

  inherits(XHRLocalObject, XhrDriver);

  XHRLocalObject.enabled = XhrDriver.enabled;

  module.exports = XHRLocalObject;

  },{"../driver/xhr":17,"inherits":57}],38:[function(require,module,exports){
  (function (process){
  'use strict';

  var utils = require('../utils/event')
    , urlUtils = require('../utils/url')
    , inherits = require('inherits')
    , EventEmitter = require('events').EventEmitter
    , WebsocketDriver = require('./driver/websocket')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:websocket');
  }

  function WebSocketTransport(transUrl, ignore, options) {
    if (!WebSocketTransport.enabled()) {
      throw new Error('Transport created when disabled');
    }

    EventEmitter.call(this);
    debug('constructor', transUrl);

    var self = this;
    var url = urlUtils.addPath(transUrl, '/websocket');
    if (url.slice(0, 5) === 'https') {
      url = 'wss' + url.slice(5);
    } else {
      url = 'ws' + url.slice(4);
    }
    this.url = url;

    this.ws = new WebsocketDriver(this.url, [], options);
    this.ws.onmessage = function(e) {
      debug('message event', e.data);
      self.emit('message', e.data);
    };
    // Firefox has an interesting bug. If a websocket connection is
    // created after onunload, it stays alive even when user
    // navigates away from the page. In such situation let's lie -
    // let's not open the ws connection at all. See:
    // https://github.com/sockjs/sockjs-client/issues/28
    // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
    this.unloadRef = utils.unloadAdd(function() {
      debug('unload');
      self.ws.close();
    });
    this.ws.onclose = function(e) {
      debug('close event', e.code, e.reason);
      self.emit('close', e.code, e.reason);
      self._cleanup();
    };
    this.ws.onerror = function(e) {
      debug('error event', e);
      self.emit('close', 1006, 'WebSocket connection broken');
      self._cleanup();
    };
  }

  inherits(WebSocketTransport, EventEmitter);

  WebSocketTransport.prototype.send = function(data) {
    var msg = '[' + data + ']';
    debug('send', msg);
    this.ws.send(msg);
  };

  WebSocketTransport.prototype.close = function() {
    debug('close');
    var ws = this.ws;
    this._cleanup();
    if (ws) {
      ws.close();
    }
  };

  WebSocketTransport.prototype._cleanup = function() {
    debug('_cleanup');
    var ws = this.ws;
    if (ws) {
      ws.onmessage = ws.onclose = ws.onerror = null;
    }
    utils.unloadDel(this.unloadRef);
    this.unloadRef = this.ws = null;
    this.removeAllListeners();
  };

  WebSocketTransport.enabled = function() {
    debug('enabled');
    return !!WebsocketDriver;
  };
  WebSocketTransport.transportName = 'websocket';

  // In theory, ws should require 1 round trip. But in chrome, this is
  // not very stable over SSL. Most likely a ws connection requires a
  // separate SSL connection, in which case 2 round trips are an
  // absolute minumum.
  WebSocketTransport.roundTrips = 2;

  module.exports = WebSocketTransport;

  }).call(this,{ env: {} })

  },{"../utils/event":46,"../utils/url":52,"./driver/websocket":19,"debug":55,"events":3,"inherits":57}],39:[function(require,module,exports){
  'use strict';

  var inherits = require('inherits')
    , AjaxBasedTransport = require('./lib/ajax-based')
    , XdrStreamingTransport = require('./xdr-streaming')
    , XhrReceiver = require('./receiver/xhr')
    , XDRObject = require('./sender/xdr')
    ;

  function XdrPollingTransport(transUrl) {
    if (!XDRObject.enabled) {
      throw new Error('Transport created when disabled');
    }
    AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
  }

  inherits(XdrPollingTransport, AjaxBasedTransport);

  XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
  XdrPollingTransport.transportName = 'xdr-polling';
  XdrPollingTransport.roundTrips = 2; // preflight, ajax

  module.exports = XdrPollingTransport;

  },{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"./xdr-streaming":40,"inherits":57}],40:[function(require,module,exports){
  'use strict';

  var inherits = require('inherits')
    , AjaxBasedTransport = require('./lib/ajax-based')
    , XhrReceiver = require('./receiver/xhr')
    , XDRObject = require('./sender/xdr')
    ;

  // According to:
  //   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
  //   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

  function XdrStreamingTransport(transUrl) {
    if (!XDRObject.enabled) {
      throw new Error('Transport created when disabled');
    }
    AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
  }

  inherits(XdrStreamingTransport, AjaxBasedTransport);

  XdrStreamingTransport.enabled = function(info) {
    if (info.cookie_needed || info.nullOrigin) {
      return false;
    }
    return XDRObject.enabled && info.sameScheme;
  };

  XdrStreamingTransport.transportName = 'xdr-streaming';
  XdrStreamingTransport.roundTrips = 2; // preflight, ajax

  module.exports = XdrStreamingTransport;

  },{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"inherits":57}],41:[function(require,module,exports){
  'use strict';

  var inherits = require('inherits')
    , AjaxBasedTransport = require('./lib/ajax-based')
    , XhrReceiver = require('./receiver/xhr')
    , XHRCorsObject = require('./sender/xhr-cors')
    , XHRLocalObject = require('./sender/xhr-local')
    ;

  function XhrPollingTransport(transUrl) {
    if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
      throw new Error('Transport created when disabled');
    }
    AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
  }

  inherits(XhrPollingTransport, AjaxBasedTransport);

  XhrPollingTransport.enabled = function(info) {
    if (info.nullOrigin) {
      return false;
    }

    if (XHRLocalObject.enabled && info.sameOrigin) {
      return true;
    }
    return XHRCorsObject.enabled;
  };

  XhrPollingTransport.transportName = 'xhr-polling';
  XhrPollingTransport.roundTrips = 2; // preflight, ajax

  module.exports = XhrPollingTransport;

  },{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],42:[function(require,module,exports){
  (function (global){
  'use strict';

  var inherits = require('inherits')
    , AjaxBasedTransport = require('./lib/ajax-based')
    , XhrReceiver = require('./receiver/xhr')
    , XHRCorsObject = require('./sender/xhr-cors')
    , XHRLocalObject = require('./sender/xhr-local')
    , browser = require('../utils/browser')
    ;

  function XhrStreamingTransport(transUrl) {
    if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
      throw new Error('Transport created when disabled');
    }
    AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
  }

  inherits(XhrStreamingTransport, AjaxBasedTransport);

  XhrStreamingTransport.enabled = function(info) {
    if (info.nullOrigin) {
      return false;
    }
    // Opera doesn't support xhr-streaming #60
    // But it might be able to #92
    if (browser.isOpera()) {
      return false;
    }

    return XHRCorsObject.enabled;
  };

  XhrStreamingTransport.transportName = 'xhr-streaming';
  XhrStreamingTransport.roundTrips = 2; // preflight, ajax

  // Safari gets confused when a streaming ajax request is started
  // before onload. This causes the load indicator to spin indefinetely.
  // Only require body when used in a browser
  XhrStreamingTransport.needBody = !!global.document;

  module.exports = XhrStreamingTransport;

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"../utils/browser":44,"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],43:[function(require,module,exports){
  (function (global){
  'use strict';

  if (global.crypto && global.crypto.getRandomValues) {
    module.exports.randomBytes = function(length) {
      var bytes = new Uint8Array(length);
      global.crypto.getRandomValues(bytes);
      return bytes;
    };
  } else {
    module.exports.randomBytes = function(length) {
      var bytes = new Array(length);
      for (var i = 0; i < length; i++) {
        bytes[i] = Math.floor(Math.random() * 256);
      }
      return bytes;
    };
  }

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{}],44:[function(require,module,exports){
  (function (global){
  'use strict';

  module.exports = {
    isOpera: function() {
      return global.navigator &&
        /opera/i.test(global.navigator.userAgent);
    }

  , isKonqueror: function() {
      return global.navigator &&
        /konqueror/i.test(global.navigator.userAgent);
    }

    // #187 wrap document.domain in try/catch because of WP8 from file:///
  , hasDomain: function () {
      // non-browser client always has a domain
      if (!global.document) {
        return true;
      }

      try {
        return !!global.document.domain;
      } catch (e) {
        return false;
      }
    }
  };

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{}],45:[function(require,module,exports){
  'use strict';

  var JSON3 = require('json3');

  // Some extra characters that Chrome gets wrong, and substitutes with
  // something else on the wire.
  // eslint-disable-next-line no-control-regex
  var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g
    , extraLookup;

  // This may be quite slow, so let's delay until user actually uses bad
  // characters.
  var unrollLookup = function(escapable) {
    var i;
    var unrolled = {};
    var c = [];
    for (i = 0; i < 65536; i++) {
      c.push( String.fromCharCode(i) );
    }
    escapable.lastIndex = 0;
    c.join('').replace(escapable, function(a) {
      unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      return '';
    });
    escapable.lastIndex = 0;
    return unrolled;
  };

  // Quote string, also taking care of unicode characters that browsers
  // often break. Especially, take care of unicode surrogates:
  // http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
  module.exports = {
    quote: function(string) {
      var quoted = JSON3.stringify(string);

      // In most cases this should be very fast and good enough.
      extraEscapable.lastIndex = 0;
      if (!extraEscapable.test(quoted)) {
        return quoted;
      }

      if (!extraLookup) {
        extraLookup = unrollLookup(extraEscapable);
      }

      return quoted.replace(extraEscapable, function(a) {
        return extraLookup[a];
      });
    }
  };

  },{"json3":58}],46:[function(require,module,exports){
  (function (global){
  'use strict';

  var random = require('./random');

  var onUnload = {}
    , afterUnload = false
      // detect google chrome packaged apps because they don't allow the 'unload' event
    , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
    ;

  module.exports = {
    attachEvent: function(event, listener) {
      if (typeof global.addEventListener !== 'undefined') {
        global.addEventListener(event, listener, false);
      } else if (global.document && global.attachEvent) {
        // IE quirks.
        // According to: http://stevesouders.com/misc/test-postmessage.php
        // the message gets delivered only to 'document', not 'window'.
        global.document.attachEvent('on' + event, listener);
        // I get 'window' for ie8.
        global.attachEvent('on' + event, listener);
      }
    }

  , detachEvent: function(event, listener) {
      if (typeof global.addEventListener !== 'undefined') {
        global.removeEventListener(event, listener, false);
      } else if (global.document && global.detachEvent) {
        global.document.detachEvent('on' + event, listener);
        global.detachEvent('on' + event, listener);
      }
    }

  , unloadAdd: function(listener) {
      if (isChromePackagedApp) {
        return null;
      }

      var ref = random.string(8);
      onUnload[ref] = listener;
      if (afterUnload) {
        setTimeout(this.triggerUnloadCallbacks, 0);
      }
      return ref;
    }

  , unloadDel: function(ref) {
      if (ref in onUnload) {
        delete onUnload[ref];
      }
    }

  , triggerUnloadCallbacks: function() {
      for (var ref in onUnload) {
        onUnload[ref]();
        delete onUnload[ref];
      }
    }
  };

  var unloadTriggered = function() {
    if (afterUnload) {
      return;
    }
    afterUnload = true;
    module.exports.triggerUnloadCallbacks();
  };

  // 'unload' alone is not reliable in opera within an iframe, but we
  // can't use `beforeunload` as IE fires it on javascript: links.
  if (!isChromePackagedApp) {
    module.exports.attachEvent('unload', unloadTriggered);
  }

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"./random":50}],47:[function(require,module,exports){
  (function (process,global){
  'use strict';

  var eventUtils = require('./event')
    , JSON3 = require('json3')
    , browser = require('./browser')
    ;

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:utils:iframe');
  }

  module.exports = {
    WPrefix: '_jp'
  , currentWindowId: null

  , polluteGlobalNamespace: function() {
      if (!(module.exports.WPrefix in global)) {
        global[module.exports.WPrefix] = {};
      }
    }

  , postMessage: function(type, data) {
      if (global.parent !== global) {
        global.parent.postMessage(JSON3.stringify({
          windowId: module.exports.currentWindowId
        , type: type
        , data: data || ''
        }), '*');
      } else {
        debug('Cannot postMessage, no parent window.', type, data);
      }
    }

  , createIframe: function(iframeUrl, errorCallback) {
      var iframe = global.document.createElement('iframe');
      var tref, unloadRef;
      var unattach = function() {
        debug('unattach');
        clearTimeout(tref);
        // Explorer had problems with that.
        try {
          iframe.onload = null;
        } catch (x) {
          // intentionally empty
        }
        iframe.onerror = null;
      };
      var cleanup = function() {
        debug('cleanup');
        if (iframe) {
          unattach();
          // This timeout makes chrome fire onbeforeunload event
          // within iframe. Without the timeout it goes straight to
          // onunload.
          setTimeout(function() {
            if (iframe) {
              iframe.parentNode.removeChild(iframe);
            }
            iframe = null;
          }, 0);
          eventUtils.unloadDel(unloadRef);
        }
      };
      var onerror = function(err) {
        debug('onerror', err);
        if (iframe) {
          cleanup();
          errorCallback(err);
        }
      };
      var post = function(msg, origin) {
        debug('post', msg, origin);
        setTimeout(function() {
          try {
            // When the iframe is not loaded, IE raises an exception
            // on 'contentWindow'.
            if (iframe && iframe.contentWindow) {
              iframe.contentWindow.postMessage(msg, origin);
            }
          } catch (x) {
            // intentionally empty
          }
        }, 0);
      };

      iframe.src = iframeUrl;
      iframe.style.display = 'none';
      iframe.style.position = 'absolute';
      iframe.onerror = function() {
        onerror('onerror');
      };
      iframe.onload = function() {
        debug('onload');
        // `onload` is triggered before scripts on the iframe are
        // executed. Give it few seconds to actually load stuff.
        clearTimeout(tref);
        tref = setTimeout(function() {
          onerror('onload timeout');
        }, 2000);
      };
      global.document.body.appendChild(iframe);
      tref = setTimeout(function() {
        onerror('timeout');
      }, 15000);
      unloadRef = eventUtils.unloadAdd(cleanup);
      return {
        post: post
      , cleanup: cleanup
      , loaded: unattach
      };
    }

  /* eslint no-undef: "off", new-cap: "off" */
  , createHtmlfile: function(iframeUrl, errorCallback) {
      var axo = ['Active'].concat('Object').join('X');
      var doc = new global[axo]('htmlfile');
      var tref, unloadRef;
      var iframe;
      var unattach = function() {
        clearTimeout(tref);
        iframe.onerror = null;
      };
      var cleanup = function() {
        if (doc) {
          unattach();
          eventUtils.unloadDel(unloadRef);
          iframe.parentNode.removeChild(iframe);
          iframe = doc = null;
          CollectGarbage();
        }
      };
      var onerror = function(r) {
        debug('onerror', r);
        if (doc) {
          cleanup();
          errorCallback(r);
        }
      };
      var post = function(msg, origin) {
        try {
          // When the iframe is not loaded, IE raises an exception
          // on 'contentWindow'.
          setTimeout(function() {
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(msg, origin);
            }
          }, 0);
        } catch (x) {
          // intentionally empty
        }
      };

      doc.open();
      doc.write('<html><s' + 'cript>' +
                'document.domain="' + global.document.domain + '";' +
                '</s' + 'cript></html>');
      doc.close();
      doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
      var c = doc.createElement('div');
      doc.body.appendChild(c);
      iframe = doc.createElement('iframe');
      c.appendChild(iframe);
      iframe.src = iframeUrl;
      iframe.onerror = function() {
        onerror('onerror');
      };
      tref = setTimeout(function() {
        onerror('timeout');
      }, 15000);
      unloadRef = eventUtils.unloadAdd(cleanup);
      return {
        post: post
      , cleanup: cleanup
      , loaded: unattach
      };
    }
  };

  module.exports.iframeEnabled = false;
  if (global.document) {
    // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
    // huge delay, or not at all.
    module.exports.iframeEnabled = (typeof global.postMessage === 'function' ||
      typeof global.postMessage === 'object') && (!browser.isKonqueror());
  }

  }).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"./browser":44,"./event":46,"debug":55,"json3":58}],48:[function(require,module,exports){
  (function (global){
  'use strict';

  var logObject = {};
  ['log', 'debug', 'warn'].forEach(function (level) {
    var levelExists;

    try {
      levelExists = global.console && global.console[level] && global.console[level].apply;
    } catch(e) {
      // do nothing
    }

    logObject[level] = levelExists ? function () {
      return global.console[level].apply(global.console, arguments);
    } : (level === 'log' ? function () {} : logObject.log);
  });

  module.exports = logObject;

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{}],49:[function(require,module,exports){
  'use strict';

  module.exports = {
    isObject: function(obj) {
      var type = typeof obj;
      return type === 'function' || type === 'object' && !!obj;
    }

  , extend: function(obj) {
      if (!this.isObject(obj)) {
        return obj;
      }
      var source, prop;
      for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
          if (Object.prototype.hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
          }
        }
      }
      return obj;
    }
  };

  },{}],50:[function(require,module,exports){
  'use strict';

  /* global crypto:true */
  var crypto = require('crypto');

  // This string has length 32, a power of 2, so the modulus doesn't introduce a
  // bias.
  var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
  module.exports = {
    string: function(length) {
      var max = _randomStringChars.length;
      var bytes = crypto.randomBytes(length);
      var ret = [];
      for (var i = 0; i < length; i++) {
        ret.push(_randomStringChars.substr(bytes[i] % max, 1));
      }
      return ret.join('');
    }

  , number: function(max) {
      return Math.floor(Math.random() * max);
    }

  , numberString: function(max) {
      var t = ('' + (max - 1)).length;
      var p = new Array(t + 1).join('0');
      return (p + this.number(max)).slice(-t);
    }
  };

  },{"crypto":43}],51:[function(require,module,exports){
  (function (process){
  'use strict';

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:utils:transport');
  }

  module.exports = function(availableTransports) {
    return {
      filterToEnabled: function(transportsWhitelist, info) {
        var transports = {
          main: []
        , facade: []
        };
        if (!transportsWhitelist) {
          transportsWhitelist = [];
        } else if (typeof transportsWhitelist === 'string') {
          transportsWhitelist = [transportsWhitelist];
        }

        availableTransports.forEach(function(trans) {
          if (!trans) {
            return;
          }

          if (trans.transportName === 'websocket' && info.websocket === false) {
            debug('disabled from server', 'websocket');
            return;
          }

          if (transportsWhitelist.length &&
              transportsWhitelist.indexOf(trans.transportName) === -1) {
            debug('not in whitelist', trans.transportName);
            return;
          }

          if (trans.enabled(info)) {
            debug('enabled', trans.transportName);
            transports.main.push(trans);
            if (trans.facadeTransport) {
              transports.facade.push(trans.facadeTransport);
            }
          } else {
            debug('disabled', trans.transportName);
          }
        });
        return transports;
      }
    };
  };

  }).call(this,{ env: {} })

  },{"debug":55}],52:[function(require,module,exports){
  (function (process){
  'use strict';

  var URL = require('url-parse');

  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:utils:url');
  }

  module.exports = {
    getOrigin: function(url) {
      if (!url) {
        return null;
      }

      var p = new URL(url);
      if (p.protocol === 'file:') {
        return null;
      }

      var port = p.port;
      if (!port) {
        port = (p.protocol === 'https:') ? '443' : '80';
      }

      return p.protocol + '//' + p.hostname + ':' + port;
    }

  , isOriginEqual: function(a, b) {
      var res = this.getOrigin(a) === this.getOrigin(b);
      debug('same', a, b, res);
      return res;
    }

  , isSchemeEqual: function(a, b) {
      return (a.split(':')[0] === b.split(':')[0]);
    }

  , addPath: function (url, path) {
      var qs = url.split('?');
      return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
    }

  , addQuery: function (url, q) {
      return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
    }
  };

  }).call(this,{ env: {} })

  },{"debug":55,"url-parse":61}],53:[function(require,module,exports){
  module.exports = '1.4.0';

  },{}],54:[function(require,module,exports){
  /**
   * Helpers.
   */

  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse(val);
    } else if (type === 'number' && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;
      case 'weeks':
      case 'week':
      case 'w':
        return n * w;
      case 'days':
      case 'day':
      case 'd':
        return n * d;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
  }

  },{}],55:[function(require,module,exports){
  (function (process){
  "use strict";

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  /* eslint-env browser */

  /**
   * This is the web browser implementation of `debug()`.
   */
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  /**
   * Colors.
   */

  exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */
  // eslint-disable-next-line complexity

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
      return true;
    } // Internet Explorer and Edge do not support colors.


    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    } // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */


  function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

    if (!this.useColors) {
      return;
    }

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into

    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function (match) {
      if (match === '%%') {
        return;
      }

      index++;

      if (match === '%c') {
        // We only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */


  function log() {
    var _console;

    // This hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
  }
  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */


  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem('debug', namespaces);
      } else {
        exports.storage.removeItem('debug');
      }
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }
  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */


  function load() {
    var r;

    try {
      r = exports.storage.getItem('debug');
    } catch (error) {} // Swallow
    // XXX (@Qix-) should we be logging these?
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }
  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */


  function localstorage() {
    try {
      // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
      // The Browser also has localStorage in the global context.
      return localStorage;
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }

  module.exports = require('./common')(exports);
  var formatters = module.exports.formatters;
  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  formatters.j = function (v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return '[UnexpectedJSONParseError]: ' + error.message;
    }
  };


  }).call(this,{ env: {} })

  },{"./common":56}],56:[function(require,module,exports){
  "use strict";

  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   */
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = require('ms');
    Object.keys(env).forEach(function (key) {
      createDebug[key] = env[key];
    });
    /**
    * Active `debug` instances.
    */

    createDebug.instances = [];
    /**
    * The currently active debug mode names, and names to skip.
    */

    createDebug.names = [];
    createDebug.skips = [];
    /**
    * Map of special "%n" handling functions, for the debug "format" argument.
    *
    * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
    */

    createDebug.formatters = {};
    /**
    * Selects a color for a debug namespace
    * @param {String} namespace The namespace string for the for the debug instance to be colored
    * @return {Number|String} An ANSI color code for the given namespace
    * @api private
    */

    function selectColor(namespace) {
      var hash = 0;

      for (var i = 0; i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }

      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }

    createDebug.selectColor = selectColor;
    /**
    * Create a debugger with the given `namespace`.
    *
    * @param {String} namespace
    * @return {Function}
    * @api public
    */

    function createDebug(namespace) {
      var prevTime;

      function debug() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        // Disabled?
        if (!debug.enabled) {
          return;
        }

        var self = debug; // Set `diff` timestamp

        var curr = Number(new Date());
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);

        if (typeof args[0] !== 'string') {
          // Anything else let's inspect with %O
          args.unshift('%O');
        } // Apply any `formatters` transformations


        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
          // If we encounter an escaped % then don't increase the array index
          if (match === '%%') {
            return match;
          }

          index++;
          var formatter = createDebug.formatters[format];

          if (typeof formatter === 'function') {
            var val = args[index];
            match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

            args.splice(index, 1);
            index--;
          }

          return match;
        }); // Apply env-specific formatting (colors, etc.)

        createDebug.formatArgs.call(self, args);
        var logFn = self.log || createDebug.log;
        logFn.apply(self, args);
      }

      debug.namespace = namespace;
      debug.enabled = createDebug.enabled(namespace);
      debug.useColors = createDebug.useColors();
      debug.color = selectColor(namespace);
      debug.destroy = destroy;
      debug.extend = extend; // Debug.formatArgs = formatArgs;
      // debug.rawLog = rawLog;
      // env-specific initialization logic for debug instances

      if (typeof createDebug.init === 'function') {
        createDebug.init(debug);
      }

      createDebug.instances.push(debug);
      return debug;
    }

    function destroy() {
      var index = createDebug.instances.indexOf(this);

      if (index !== -1) {
        createDebug.instances.splice(index, 1);
        return true;
      }

      return false;
    }

    function extend(namespace, delimiter) {
      return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
    }
    /**
    * Enables a debug mode by namespaces. This can include modes
    * separated by a colon and wildcards.
    *
    * @param {String} namespaces
    * @api public
    */


    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.names = [];
      createDebug.skips = [];
      var i;
      var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
      var len = split.length;

      for (i = 0; i < len; i++) {
        if (!split[i]) {
          // ignore empty strings
          continue;
        }

        namespaces = split[i].replace(/\*/g, '.*?');

        if (namespaces[0] === '-') {
          createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
        } else {
          createDebug.names.push(new RegExp('^' + namespaces + '$'));
        }
      }

      for (i = 0; i < createDebug.instances.length; i++) {
        var instance = createDebug.instances[i];
        instance.enabled = createDebug.enabled(instance.namespace);
      }
    }
    /**
    * Disable debug output.
    *
    * @api public
    */


    function disable() {
      createDebug.enable('');
    }
    /**
    * Returns true if the given mode name is enabled, false otherwise.
    *
    * @param {String} name
    * @return {Boolean}
    * @api public
    */


    function enabled(name) {
      if (name[name.length - 1] === '*') {
        return true;
      }

      var i;
      var len;

      for (i = 0, len = createDebug.skips.length; i < len; i++) {
        if (createDebug.skips[i].test(name)) {
          return false;
        }
      }

      for (i = 0, len = createDebug.names.length; i < len; i++) {
        if (createDebug.names[i].test(name)) {
          return true;
        }
      }

      return false;
    }
    /**
    * Coerce `val`.
    *
    * @param {Mixed} val
    * @return {Mixed}
    * @api private
    */


    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }

      return val;
    }

    createDebug.enable(createDebug.load());
    return createDebug;
  }

  module.exports = setup;


  },{"ms":54}],57:[function(require,module,exports){
  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }

  },{}],58:[function(require,module,exports){
  (function (global){
  /*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
  ;(function () {
    // Detect the `define` function exposed by asynchronous module loaders. The
    // strict `define` check is necessary for compatibility with `r.js`.
    var isLoader = typeof define === "function" && define.amd;

    // A set of types used to distinguish objects from primitives.
    var objectTypes = {
      "function": true,
      "object": true
    };

    // Detect the `exports` object exposed by CommonJS implementations.
    var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

    // Use the `global` object exposed by Node (including Browserify via
    // `insert-module-globals`), Narwhal, and Ringo as the default context,
    // and the `window` object in browsers. Rhino exports a `global` function
    // instead.
    var root = objectTypes[typeof window] && window || this,
        freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

    if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
      root = freeGlobal;
    }

    // Public: Initializes JSON 3 using the given `context` object, attaching the
    // `stringify` and `parse` functions to the specified `exports` object.
    function runInContext(context, exports) {
      context || (context = root["Object"]());
      exports || (exports = root["Object"]());

      // Native constructor aliases.
      var Number = context["Number"] || root["Number"],
          String = context["String"] || root["String"],
          Object = context["Object"] || root["Object"],
          Date = context["Date"] || root["Date"],
          SyntaxError = context["SyntaxError"] || root["SyntaxError"],
          TypeError = context["TypeError"] || root["TypeError"],
          Math = context["Math"] || root["Math"],
          nativeJSON = context["JSON"] || root["JSON"];

      // Delegate to the native `stringify` and `parse` implementations.
      if (typeof nativeJSON == "object" && nativeJSON) {
        exports.stringify = nativeJSON.stringify;
        exports.parse = nativeJSON.parse;
      }

      // Convenience aliases.
      var objectProto = Object.prototype,
          getClass = objectProto.toString,
          isProperty, forEach, undef;

      // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
      var isExtended = new Date(-3509827334573292);
      try {
        // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
        // results for certain dates in Opera >= 10.53.
        isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
          // Safari < 2.0.2 stores the internal millisecond time value correctly,
          // but clips the values returned by the date methods to the range of
          // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
          isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
      } catch (exception) {}

      // Internal: Determines whether the native `JSON.stringify` and `parse`
      // implementations are spec-compliant. Based on work by Ken Snyder.
      function has(name) {
        if (has[name] !== undef) {
          // Return cached feature test result.
          return has[name];
        }
        var isSupported;
        if (name == "bug-string-char-index") {
          // IE <= 7 doesn't support accessing string characters using square
          // bracket notation. IE 8 only supports this for primitives.
          isSupported = "a"[0] != "a";
        } else if (name == "json") {
          // Indicates whether both `JSON.stringify` and `JSON.parse` are
          // supported.
          isSupported = has("json-stringify") && has("json-parse");
        } else {
          var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
          // Test `JSON.stringify`.
          if (name == "json-stringify") {
            var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
            if (stringifySupported) {
              // A test function object with a custom `toJSON` method.
              (value = function () {
                return 1;
              }).toJSON = value;
              try {
                stringifySupported =
                  // Firefox 3.1b1 and b2 serialize string, number, and boolean
                  // primitives as object literals.
                  stringify(0) === "0" &&
                  // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                  // literals.
                  stringify(new Number()) === "0" &&
                  stringify(new String()) == '""' &&
                  // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                  // does not define a canonical JSON representation (this applies to
                  // objects with `toJSON` properties as well, *unless* they are nested
                  // within an object or array).
                  stringify(getClass) === undef &&
                  // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                  // FF 3.1b3 pass this test.
                  stringify(undef) === undef &&
                  // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                  // respectively, if the value is omitted entirely.
                  stringify() === undef &&
                  // FF 3.1b1, 2 throw an error if the given value is not a number,
                  // string, array, object, Boolean, or `null` literal. This applies to
                  // objects with custom `toJSON` methods as well, unless they are nested
                  // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                  // methods entirely.
                  stringify(value) === "1" &&
                  stringify([value]) == "[1]" &&
                  // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                  // `"[null]"`.
                  stringify([undef]) == "[null]" &&
                  // YUI 3.0.0b1 fails to serialize `null` literals.
                  stringify(null) == "null" &&
                  // FF 3.1b1, 2 halts serialization if an array contains a function:
                  // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                  // elides non-JSON values from objects and arrays, unless they
                  // define custom `toJSON` methods.
                  stringify([undef, getClass, null]) == "[null,null,null]" &&
                  // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                  // where character escape codes are expected (e.g., `\b` => `\u0008`).
                  stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                  // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                  stringify(null, value) === "1" &&
                  stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                  // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                  // serialize extended years.
                  stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                  // The milliseconds are optional in ES 5, but required in 5.1.
                  stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                  // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                  // four-digit years instead of six-digit years. Credits: @Yaffle.
                  stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                  // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                  // values less than 1000. Credits: @Yaffle.
                  stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
              } catch (exception) {
                stringifySupported = false;
              }
            }
            isSupported = stringifySupported;
          }
          // Test `JSON.parse`.
          if (name == "json-parse") {
            var parse = exports.parse;
            if (typeof parse == "function") {
              try {
                // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                // Conforming implementations should also coerce the initial argument to
                // a string prior to parsing.
                if (parse("0") === 0 && !parse(false)) {
                  // Simple parsing test.
                  value = parse(serialized);
                  var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                  if (parseSupported) {
                    try {
                      // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                      parseSupported = !parse('"\t"');
                    } catch (exception) {}
                    if (parseSupported) {
                      try {
                        // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                        // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                        // certain octal literals.
                        parseSupported = parse("01") !== 1;
                      } catch (exception) {}
                    }
                    if (parseSupported) {
                      try {
                        // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                        // points. These environments, along with FF 3.1b1 and 2,
                        // also allow trailing commas in JSON objects and arrays.
                        parseSupported = parse("1.") !== 1;
                      } catch (exception) {}
                    }
                  }
                }
              } catch (exception) {
                parseSupported = false;
              }
            }
            isSupported = parseSupported;
          }
        }
        return has[name] = !!isSupported;
      }

      if (!has("json")) {
        // Common `[[Class]]` name aliases.
        var functionClass = "[object Function]",
            dateClass = "[object Date]",
            numberClass = "[object Number]",
            stringClass = "[object String]",
            arrayClass = "[object Array]",
            booleanClass = "[object Boolean]";

        // Detect incomplete support for accessing string characters by index.
        var charIndexBuggy = has("bug-string-char-index");

        // Define additional utility methods if the `Date` methods are buggy.
        if (!isExtended) {
          var floor = Math.floor;
          // A mapping between the months of the year and the number of days between
          // January 1st and the first of the respective month.
          var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
          // Internal: Calculates the number of days between the Unix epoch and the
          // first day of the given month.
          var getDay = function (year, month) {
            return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
          };
        }

        // Internal: Determines if a property is a direct property of the given
        // object. Delegates to the native `Object#hasOwnProperty` method.
        if (!(isProperty = objectProto.hasOwnProperty)) {
          isProperty = function (property) {
            var members = {}, constructor;
            if ((members.__proto__ = null, members.__proto__ = {
              // The *proto* property cannot be set multiple times in recent
              // versions of Firefox and SeaMonkey.
              "toString": 1
            }, members).toString != getClass) {
              // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
              // supports the mutable *proto* property.
              isProperty = function (property) {
                // Capture and break the object's prototype chain (see section 8.6.2
                // of the ES 5.1 spec). The parenthesized expression prevents an
                // unsafe transformation by the Closure Compiler.
                var original = this.__proto__, result = property in (this.__proto__ = null, this);
                // Restore the original prototype chain.
                this.__proto__ = original;
                return result;
              };
            } else {
              // Capture a reference to the top-level `Object` constructor.
              constructor = members.constructor;
              // Use the `constructor` property to simulate `Object#hasOwnProperty` in
              // other environments.
              isProperty = function (property) {
                var parent = (this.constructor || constructor).prototype;
                return property in this && !(property in parent && this[property] === parent[property]);
              };
            }
            members = null;
            return isProperty.call(this, property);
          };
        }

        // Internal: Normalizes the `for...in` iteration algorithm across
        // environments. Each enumerated key is yielded to a `callback` function.
        forEach = function (object, callback) {
          var size = 0, Properties, members, property;

          // Tests for bugs in the current environment's `for...in` algorithm. The
          // `valueOf` property inherits the non-enumerable flag from
          // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
          (Properties = function () {
            this.valueOf = 0;
          }).prototype.valueOf = 0;

          // Iterate over a new instance of the `Properties` class.
          members = new Properties();
          for (property in members) {
            // Ignore all properties inherited from `Object.prototype`.
            if (isProperty.call(members, property)) {
              size++;
            }
          }
          Properties = members = null;

          // Normalize the iteration algorithm.
          if (!size) {
            // A list of non-enumerable properties inherited from `Object.prototype`.
            members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
            // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
            // properties.
            forEach = function (object, callback) {
              var isFunction = getClass.call(object) == functionClass, property, length;
              var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
              for (property in object) {
                // Gecko <= 1.0 enumerates the `prototype` property of functions under
                // certain conditions; IE does not.
                if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                  callback(property);
                }
              }
              // Manually invoke the callback for each non-enumerable property.
              for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
            };
          } else if (size == 2) {
            // Safari <= 2.0.4 enumerates shadowed properties twice.
            forEach = function (object, callback) {
              // Create a set of iterated properties.
              var members = {}, isFunction = getClass.call(object) == functionClass, property;
              for (property in object) {
                // Store each property name to prevent double enumeration. The
                // `prototype` property of functions is not enumerated due to cross-
                // environment inconsistencies.
                if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                  callback(property);
                }
              }
            };
          } else {
            // No bugs detected; use the standard `for...in` algorithm.
            forEach = function (object, callback) {
              var isFunction = getClass.call(object) == functionClass, property, isConstructor;
              for (property in object) {
                if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                  callback(property);
                }
              }
              // Manually invoke the callback for the `constructor` property due to
              // cross-environment inconsistencies.
              if (isConstructor || isProperty.call(object, (property = "constructor"))) {
                callback(property);
              }
            };
          }
          return forEach(object, callback);
        };

        // Public: Serializes a JavaScript `value` as a JSON string. The optional
        // `filter` argument may specify either a function that alters how object and
        // array members are serialized, or an array of strings and numbers that
        // indicates which properties should be serialized. The optional `width`
        // argument may be either a string or number that specifies the indentation
        // level of the output.
        if (!has("json-stringify")) {
          // Internal: A map of control characters and their escaped equivalents.
          var Escapes = {
            92: "\\\\",
            34: '\\"',
            8: "\\b",
            12: "\\f",
            10: "\\n",
            13: "\\r",
            9: "\\t"
          };

          // Internal: Converts `value` into a zero-padded string such that its
          // length is at least equal to `width`. The `width` must be <= 6.
          var leadingZeroes = "000000";
          var toPaddedString = function (width, value) {
            // The `|| 0` expression is necessary to work around a bug in
            // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
            return (leadingZeroes + (value || 0)).slice(-width);
          };

          // Internal: Double-quotes a string `value`, replacing all ASCII control
          // characters (characters with code unit values between 0 and 31) with
          // their escaped equivalents. This is an implementation of the
          // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
          var unicodePrefix = "\\u00";
          var quote = function (value) {
            var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
            var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
            for (; index < length; index++) {
              var charCode = value.charCodeAt(index);
              // If the character is a control character, append its Unicode or
              // shorthand escape sequence; otherwise, append the character as-is.
              switch (charCode) {
                case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                  result += Escapes[charCode];
                  break;
                default:
                  if (charCode < 32) {
                    result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                    break;
                  }
                  result += useCharIndex ? symbols[index] : value.charAt(index);
              }
            }
            return result + '"';
          };

          // Internal: Recursively serializes an object. Implements the
          // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
          var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
            var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
            try {
              // Necessary for host object support.
              value = object[property];
            } catch (exception) {}
            if (typeof value == "object" && value) {
              className = getClass.call(value);
              if (className == dateClass && !isProperty.call(value, "toJSON")) {
                if (value > -1 / 0 && value < 1 / 0) {
                  // Dates are serialized according to the `Date#toJSON` method
                  // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                  // for the ISO 8601 date time string format.
                  if (getDay) {
                    // Manually compute the year, month, date, hours, minutes,
                    // seconds, and milliseconds if the `getUTC*` methods are
                    // buggy. Adapted from @Yaffle's `date-shim` project.
                    date = floor(value / 864e5);
                    for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                    for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                    date = 1 + date - getDay(year, month);
                    // The `time` value specifies the time within the day (see ES
                    // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                    // to compute `A modulo B`, as the `%` operator does not
                    // correspond to the `modulo` operation for negative numbers.
                    time = (value % 864e5 + 864e5) % 864e5;
                    // The hours, minutes, seconds, and milliseconds are obtained by
                    // decomposing the time within the day. See section 15.9.1.10.
                    hours = floor(time / 36e5) % 24;
                    minutes = floor(time / 6e4) % 60;
                    seconds = floor(time / 1e3) % 60;
                    milliseconds = time % 1e3;
                  } else {
                    year = value.getUTCFullYear();
                    month = value.getUTCMonth();
                    date = value.getUTCDate();
                    hours = value.getUTCHours();
                    minutes = value.getUTCMinutes();
                    seconds = value.getUTCSeconds();
                    milliseconds = value.getUTCMilliseconds();
                  }
                  // Serialize extended years correctly.
                  value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                    "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                    // Months, dates, hours, minutes, and seconds should have two
                    // digits; milliseconds should have three.
                    "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                    // Milliseconds are optional in ES 5.0, but required in 5.1.
                    "." + toPaddedString(3, milliseconds) + "Z";
                } else {
                  value = null;
                }
              } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
                // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
                // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
                // ignores all `toJSON` methods on these objects unless they are
                // defined directly on an instance.
                value = value.toJSON(property);
              }
            }
            if (callback) {
              // If a replacement function was provided, call it to obtain the value
              // for serialization.
              value = callback.call(object, property, value);
            }
            if (value === null) {
              return "null";
            }
            className = getClass.call(value);
            if (className == booleanClass) {
              // Booleans are represented literally.
              return "" + value;
            } else if (className == numberClass) {
              // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
              // `"null"`.
              return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
            } else if (className == stringClass) {
              // Strings are double-quoted and escaped.
              return quote("" + value);
            }
            // Recursively serialize objects and arrays.
            if (typeof value == "object") {
              // Check for cyclic structures. This is a linear search; performance
              // is inversely proportional to the number of unique nested objects.
              for (length = stack.length; length--;) {
                if (stack[length] === value) {
                  // Cyclic structures cannot be serialized by `JSON.stringify`.
                  throw TypeError();
                }
              }
              // Add the object to the stack of traversed objects.
              stack.push(value);
              results = [];
              // Save the current indentation level and indent one additional level.
              prefix = indentation;
              indentation += whitespace;
              if (className == arrayClass) {
                // Recursively serialize array elements.
                for (index = 0, length = value.length; index < length; index++) {
                  element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                  results.push(element === undef ? "null" : element);
                }
                result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
              } else {
                // Recursively serialize object members. Members are selected from
                // either a user-specified list of property names, or the object
                // itself.
                forEach(properties || value, function (property) {
                  var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                  if (element !== undef) {
                    // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                    // is not the empty string, let `member` {quote(property) + ":"}
                    // be the concatenation of `member` and the `space` character."
                    // The "`space` character" refers to the literal space
                    // character, not the `space` {width} argument provided to
                    // `JSON.stringify`.
                    results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                  }
                });
                result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
              }
              // Remove the object from the traversed object stack.
              stack.pop();
              return result;
            }
          };

          // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
          exports.stringify = function (source, filter, width) {
            var whitespace, callback, properties, className;
            if (objectTypes[typeof filter] && filter) {
              if ((className = getClass.call(filter)) == functionClass) {
                callback = filter;
              } else if (className == arrayClass) {
                // Convert the property names array into a makeshift set.
                properties = {};
                for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
              }
            }
            if (width) {
              if ((className = getClass.call(width)) == numberClass) {
                // Convert the `width` to an integer and create a string containing
                // `width` number of space characters.
                if ((width -= width % 1) > 0) {
                  for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
                }
              } else if (className == stringClass) {
                whitespace = width.length <= 10 ? width : width.slice(0, 10);
              }
            }
            // Opera <= 7.54u2 discards the values associated with empty string keys
            // (`""`) only if they are used directly within an object member list
            // (e.g., `!("" in { "": 1})`).
            return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
          };
        }

        // Public: Parses a JSON source string.
        if (!has("json-parse")) {
          var fromCharCode = String.fromCharCode;

          // Internal: A map of escaped control characters and their unescaped
          // equivalents.
          var Unescapes = {
            92: "\\",
            34: '"',
            47: "/",
            98: "\b",
            116: "\t",
            110: "\n",
            102: "\f",
            114: "\r"
          };

          // Internal: Stores the parser state.
          var Index, Source;

          // Internal: Resets the parser state and throws a `SyntaxError`.
          var abort = function () {
            Index = Source = null;
            throw SyntaxError();
          };

          // Internal: Returns the next token, or `"$"` if the parser has reached
          // the end of the source string. A token may be a string, number, `null`
          // literal, or Boolean literal.
          var lex = function () {
            var source = Source, length = source.length, value, begin, position, isSigned, charCode;
            while (Index < length) {
              charCode = source.charCodeAt(Index);
              switch (charCode) {
                case 9: case 10: case 13: case 32:
                  // Skip whitespace tokens, including tabs, carriage returns, line
                  // feeds, and space characters.
                  Index++;
                  break;
                case 123: case 125: case 91: case 93: case 58: case 44:
                  // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                  // the current position.
                  value = charIndexBuggy ? source.charAt(Index) : source[Index];
                  Index++;
                  return value;
                case 34:
                  // `"` delimits a JSON string; advance to the next character and
                  // begin parsing the string. String tokens are prefixed with the
                  // sentinel `@` character to distinguish them from punctuators and
                  // end-of-string tokens.
                  for (value = "@", Index++; Index < length;) {
                    charCode = source.charCodeAt(Index);
                    if (charCode < 32) {
                      // Unescaped ASCII control characters (those with a code unit
                      // less than the space character) are not permitted.
                      abort();
                    } else if (charCode == 92) {
                      // A reverse solidus (`\`) marks the beginning of an escaped
                      // control character (including `"`, `\`, and `/`) or Unicode
                      // escape sequence.
                      charCode = source.charCodeAt(++Index);
                      switch (charCode) {
                        case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                          // Revive escaped control characters.
                          value += Unescapes[charCode];
                          Index++;
                          break;
                        case 117:
                          // `\u` marks the beginning of a Unicode escape sequence.
                          // Advance to the first character and validate the
                          // four-digit code point.
                          begin = ++Index;
                          for (position = Index + 4; Index < position; Index++) {
                            charCode = source.charCodeAt(Index);
                            // A valid sequence comprises four hexdigits (case-
                            // insensitive) that form a single hexadecimal value.
                            if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                              // Invalid Unicode escape sequence.
                              abort();
                            }
                          }
                          // Revive the escaped character.
                          value += fromCharCode("0x" + source.slice(begin, Index));
                          break;
                        default:
                          // Invalid escape sequence.
                          abort();
                      }
                    } else {
                      if (charCode == 34) {
                        // An unescaped double-quote character marks the end of the
                        // string.
                        break;
                      }
                      charCode = source.charCodeAt(Index);
                      begin = Index;
                      // Optimize for the common case where a string is valid.
                      while (charCode >= 32 && charCode != 92 && charCode != 34) {
                        charCode = source.charCodeAt(++Index);
                      }
                      // Append the string as-is.
                      value += source.slice(begin, Index);
                    }
                  }
                  if (source.charCodeAt(Index) == 34) {
                    // Advance to the next character and return the revived string.
                    Index++;
                    return value;
                  }
                  // Unterminated string.
                  abort();
                default:
                  // Parse numbers and literals.
                  begin = Index;
                  // Advance past the negative sign, if one is specified.
                  if (charCode == 45) {
                    isSigned = true;
                    charCode = source.charCodeAt(++Index);
                  }
                  // Parse an integer or floating-point value.
                  if (charCode >= 48 && charCode <= 57) {
                    // Leading zeroes are interpreted as octal literals.
                    if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                      // Illegal octal literal.
                      abort();
                    }
                    isSigned = false;
                    // Parse the integer component.
                    for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                    // Floats cannot contain a leading decimal point; however, this
                    // case is already accounted for by the parser.
                    if (source.charCodeAt(Index) == 46) {
                      position = ++Index;
                      // Parse the decimal component.
                      for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                      if (position == Index) {
                        // Illegal trailing decimal.
                        abort();
                      }
                      Index = position;
                    }
                    // Parse exponents. The `e` denoting the exponent is
                    // case-insensitive.
                    charCode = source.charCodeAt(Index);
                    if (charCode == 101 || charCode == 69) {
                      charCode = source.charCodeAt(++Index);
                      // Skip past the sign following the exponent, if one is
                      // specified.
                      if (charCode == 43 || charCode == 45) {
                        Index++;
                      }
                      // Parse the exponential component.
                      for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                      if (position == Index) {
                        // Illegal empty exponent.
                        abort();
                      }
                      Index = position;
                    }
                    // Coerce the parsed value to a JavaScript number.
                    return +source.slice(begin, Index);
                  }
                  // A negative sign may only precede numbers.
                  if (isSigned) {
                    abort();
                  }
                  // `true`, `false`, and `null` literals.
                  if (source.slice(Index, Index + 4) == "true") {
                    Index += 4;
                    return true;
                  } else if (source.slice(Index, Index + 5) == "false") {
                    Index += 5;
                    return false;
                  } else if (source.slice(Index, Index + 4) == "null") {
                    Index += 4;
                    return null;
                  }
                  // Unrecognized token.
                  abort();
              }
            }
            // Return the sentinel `$` character if the parser has reached the end
            // of the source string.
            return "$";
          };

          // Internal: Parses a JSON `value` token.
          var get = function (value) {
            var results, hasMembers;
            if (value == "$") {
              // Unexpected end of input.
              abort();
            }
            if (typeof value == "string") {
              if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                // Remove the sentinel `@` character.
                return value.slice(1);
              }
              // Parse object and array literals.
              if (value == "[") {
                // Parses a JSON array, returning a new JavaScript array.
                results = [];
                for (;; hasMembers || (hasMembers = true)) {
                  value = lex();
                  // A closing square bracket marks the end of the array literal.
                  if (value == "]") {
                    break;
                  }
                  // If the array literal contains elements, the current token
                  // should be a comma separating the previous element from the
                  // next.
                  if (hasMembers) {
                    if (value == ",") {
                      value = lex();
                      if (value == "]") {
                        // Unexpected trailing `,` in array literal.
                        abort();
                      }
                    } else {
                      // A `,` must separate each array element.
                      abort();
                    }
                  }
                  // Elisions and leading commas are not permitted.
                  if (value == ",") {
                    abort();
                  }
                  results.push(get(value));
                }
                return results;
              } else if (value == "{") {
                // Parses a JSON object, returning a new JavaScript object.
                results = {};
                for (;; hasMembers || (hasMembers = true)) {
                  value = lex();
                  // A closing curly brace marks the end of the object literal.
                  if (value == "}") {
                    break;
                  }
                  // If the object literal contains members, the current token
                  // should be a comma separator.
                  if (hasMembers) {
                    if (value == ",") {
                      value = lex();
                      if (value == "}") {
                        // Unexpected trailing `,` in object literal.
                        abort();
                      }
                    } else {
                      // A `,` must separate each object member.
                      abort();
                    }
                  }
                  // Leading commas are not permitted, object property names must be
                  // double-quoted strings, and a `:` must separate each property
                  // name and value.
                  if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                    abort();
                  }
                  results[value.slice(1)] = get(lex());
                }
                return results;
              }
              // Unexpected token encountered.
              abort();
            }
            return value;
          };

          // Internal: Updates a traversed object member.
          var update = function (source, property, callback) {
            var element = walk(source, property, callback);
            if (element === undef) {
              delete source[property];
            } else {
              source[property] = element;
            }
          };

          // Internal: Recursively traverses a parsed JSON object, invoking the
          // `callback` function for each value. This is an implementation of the
          // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
          var walk = function (source, property, callback) {
            var value = source[property], length;
            if (typeof value == "object" && value) {
              // `forEach` can't be used to traverse an array in Opera <= 8.54
              // because its `Object#hasOwnProperty` implementation returns `false`
              // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
              if (getClass.call(value) == arrayClass) {
                for (length = value.length; length--;) {
                  update(value, length, callback);
                }
              } else {
                forEach(value, function (property) {
                  update(value, property, callback);
                });
              }
            }
            return callback.call(source, property, value);
          };

          // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
          exports.parse = function (source, callback) {
            var result, value;
            Index = 0;
            Source = "" + source;
            result = get(lex());
            // If a JSON string contains multiple tokens, it is invalid.
            if (lex() != "$") {
              abort();
            }
            // Reset the parser state.
            Index = Source = null;
            return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
          };
        }
      }

      exports["runInContext"] = runInContext;
      return exports;
    }

    if (freeExports && !isLoader) {
      // Export for CommonJS environments.
      runInContext(root, freeExports);
    } else {
      // Export for web browsers and JavaScript engines.
      var nativeJSON = root.JSON,
          previousJSON = root["JSON3"],
          isRestored = false;

      var JSON3 = runInContext(root, (root["JSON3"] = {
        // Public: Restores the original value of the global `JSON` object and
        // returns a reference to the `JSON3` object.
        "noConflict": function () {
          if (!isRestored) {
            isRestored = true;
            root.JSON = nativeJSON;
            root["JSON3"] = previousJSON;
            nativeJSON = previousJSON = null;
          }
          return JSON3;
        }
      }));

      root.JSON = {
        "parse": JSON3.parse,
        "stringify": JSON3.stringify
      };
    }

    // Export for asynchronous module loaders.
    if (isLoader) {
      define(function () {
        return JSON3;
      });
    }
  }).call(this);

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{}],59:[function(require,module,exports){
  'use strict';

  var has = Object.prototype.hasOwnProperty;

  /**
   * Decode a URI encoded string.
   *
   * @param {String} input The URI encoded string.
   * @returns {String} The decoded string.
   * @api private
   */
  function decode(input) {
    return decodeURIComponent(input.replace(/\+/g, ' '));
  }

  /**
   * Simple query string parser.
   *
   * @param {String} query The query string that needs to be parsed.
   * @returns {Object}
   * @api public
   */
  function querystring(query) {
    var parser = /([^=?&]+)=?([^&]*)/g
      , result = {}
      , part;

    while (part = parser.exec(query)) {
      var key = decode(part[1])
        , value = decode(part[2]);

      //
      // Prevent overriding of existing properties. This ensures that build-in
      // methods like `toString` or __proto__ are not overriden by malicious
      // querystrings.
      //
      if (key in result) continue;
      result[key] = value;
    }

    return result;
  }

  /**
   * Transform a query string to an object.
   *
   * @param {Object} obj Object that should be transformed.
   * @param {String} prefix Optional prefix.
   * @returns {String}
   * @api public
   */
  function querystringify(obj, prefix) {
    prefix = prefix || '';

    var pairs = [];

    //
    // Optionally prefix with a '?' if needed
    //
    if ('string' !== typeof prefix) prefix = '?';

    for (var key in obj) {
      if (has.call(obj, key)) {
        pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
      }
    }

    return pairs.length ? prefix + pairs.join('&') : '';
  }

  //
  // Expose the module.
  //
  exports.stringify = querystringify;
  exports.parse = querystring;

  },{}],60:[function(require,module,exports){
  'use strict';

  /**
   * Check if we're required to add a port number.
   *
   * @see https://url.spec.whatwg.org/#default-port
   * @param {Number|String} port Port number we need to check
   * @param {String} protocol Protocol we need to check against.
   * @returns {Boolean} Is it a default port for the given protocol
   * @api private
   */
  module.exports = function required(port, protocol) {
    protocol = protocol.split(':')[0];
    port = +port;

    if (!port) return false;

    switch (protocol) {
      case 'http':
      case 'ws':
      return port !== 80;

      case 'https':
      case 'wss':
      return port !== 443;

      case 'ftp':
      return port !== 21;

      case 'gopher':
      return port !== 70;

      case 'file':
      return false;
    }

    return port !== 0;
  };

  },{}],61:[function(require,module,exports){
  (function (global){
  'use strict';

  var required = require('requires-port')
    , qs = require('querystringify')
    , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
    , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

  /**
   * These are the parse rules for the URL parser, it informs the parser
   * about:
   *
   * 0. The char it Needs to parse, if it's a string it should be done using
   *    indexOf, RegExp using exec and NaN means set as current value.
   * 1. The property we should set when parsing this value.
   * 2. Indication if it's backwards or forward parsing, when set as number it's
   *    the value of extra chars that should be split off.
   * 3. Inherit from location if non existing in the parser.
   * 4. `toLowerCase` the resulting value.
   */
  var rules = [
    ['#', 'hash'],                        // Extract from the back.
    ['?', 'query'],                       // Extract from the back.
    function sanitize(address) {          // Sanitize what is left of the address
      return address.replace('\\', '/');
    },
    ['/', 'pathname'],                    // Extract from the back.
    ['@', 'auth', 1],                     // Extract from the front.
    [NaN, 'host', undefined, 1, 1],       // Set left over value.
    [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
    [NaN, 'hostname', undefined, 1, 1]    // Set left over.
  ];

  /**
   * These properties should not be copied or inherited from. This is only needed
   * for all non blob URL's as a blob URL does not include a hash, only the
   * origin.
   *
   * @type {Object}
   * @private
   */
  var ignore = { hash: 1, query: 1 };

  /**
   * The location object differs when your code is loaded through a normal page,
   * Worker or through a worker using a blob. And with the blobble begins the
   * trouble as the location object will contain the URL of the blob, not the
   * location of the page where our code is loaded in. The actual origin is
   * encoded in the `pathname` so we can thankfully generate a good "default"
   * location from it so we can generate proper relative URL's again.
   *
   * @param {Object|String} loc Optional default location object.
   * @returns {Object} lolcation object.
   * @public
   */
  function lolcation(loc) {
    var location = global && global.location || {};
    loc = loc || location;

    var finaldestination = {}
      , type = typeof loc
      , key;

    if ('blob:' === loc.protocol) {
      finaldestination = new Url(unescape(loc.pathname), {});
    } else if ('string' === type) {
      finaldestination = new Url(loc, {});
      for (key in ignore) delete finaldestination[key];
    } else if ('object' === type) {
      for (key in loc) {
        if (key in ignore) continue;
        finaldestination[key] = loc[key];
      }

      if (finaldestination.slashes === undefined) {
        finaldestination.slashes = slashes.test(loc.href);
      }
    }

    return finaldestination;
  }

  /**
   * @typedef ProtocolExtract
   * @type Object
   * @property {String} protocol Protocol matched in the URL, in lowercase.
   * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
   * @property {String} rest Rest of the URL that is not part of the protocol.
   */

  /**
   * Extract protocol information from a URL with/without double slash ("//").
   *
   * @param {String} address URL we want to extract from.
   * @return {ProtocolExtract} Extracted information.
   * @private
   */
  function extractProtocol(address) {
    var match = protocolre.exec(address);

    return {
      protocol: match[1] ? match[1].toLowerCase() : '',
      slashes: !!match[2],
      rest: match[3]
    };
  }

  /**
   * Resolve a relative URL pathname against a base URL pathname.
   *
   * @param {String} relative Pathname of the relative URL.
   * @param {String} base Pathname of the base URL.
   * @return {String} Resolved pathname.
   * @private
   */
  function resolve(relative, base) {
    var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
      , i = path.length
      , last = path[i - 1]
      , unshift = false
      , up = 0;

    while (i--) {
      if (path[i] === '.') {
        path.splice(i, 1);
      } else if (path[i] === '..') {
        path.splice(i, 1);
        up++;
      } else if (up) {
        if (i === 0) unshift = true;
        path.splice(i, 1);
        up--;
      }
    }

    if (unshift) path.unshift('');
    if (last === '.' || last === '..') path.push('');

    return path.join('/');
  }

  /**
   * The actual URL instance. Instead of returning an object we've opted-in to
   * create an actual constructor as it's much more memory efficient and
   * faster and it pleases my OCD.
   *
   * It is worth noting that we should not use `URL` as class name to prevent
   * clashes with the global URL instance that got introduced in browsers.
   *
   * @constructor
   * @param {String} address URL we want to parse.
   * @param {Object|String} location Location defaults for relative paths.
   * @param {Boolean|Function} parser Parser for the query string.
   * @private
   */
  function Url(address, location, parser) {
    if (!(this instanceof Url)) {
      return new Url(address, location, parser);
    }

    var relative, extracted, parse, instruction, index, key
      , instructions = rules.slice()
      , type = typeof location
      , url = this
      , i = 0;

    //
    // The following if statements allows this module two have compatibility with
    // 2 different API:
    //
    // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
    //    where the boolean indicates that the query string should also be parsed.
    //
    // 2. The `URL` interface of the browser which accepts a URL, object as
    //    arguments. The supplied object will be used as default values / fall-back
    //    for relative paths.
    //
    if ('object' !== type && 'string' !== type) {
      parser = location;
      location = null;
    }

    if (parser && 'function' !== typeof parser) parser = qs.parse;

    location = lolcation(location);

    //
    // Extract protocol information before running the instructions.
    //
    extracted = extractProtocol(address || '');
    relative = !extracted.protocol && !extracted.slashes;
    url.slashes = extracted.slashes || relative && location.slashes;
    url.protocol = extracted.protocol || location.protocol || '';
    address = extracted.rest;

    //
    // When the authority component is absent the URL starts with a path
    // component.
    //
    if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

    for (; i < instructions.length; i++) {
      instruction = instructions[i];

      if (typeof instruction === 'function') {
        address = instruction(address);
        continue;
      }

      parse = instruction[0];
      key = instruction[1];

      if (parse !== parse) {
        url[key] = address;
      } else if ('string' === typeof parse) {
        if (~(index = address.indexOf(parse))) {
          if ('number' === typeof instruction[2]) {
            url[key] = address.slice(0, index);
            address = address.slice(index + instruction[2]);
          } else {
            url[key] = address.slice(index);
            address = address.slice(0, index);
          }
        }
      } else if ((index = parse.exec(address))) {
        url[key] = index[1];
        address = address.slice(0, index.index);
      }

      url[key] = url[key] || (
        relative && instruction[3] ? location[key] || '' : ''
      );

      //
      // Hostname, host and protocol should be lowercased so they can be used to
      // create a proper `origin`.
      //
      if (instruction[4]) url[key] = url[key].toLowerCase();
    }

    //
    // Also parse the supplied query string in to an object. If we're supplied
    // with a custom parser as function use that instead of the default build-in
    // parser.
    //
    if (parser) url.query = parser(url.query);

    //
    // If the URL is relative, resolve the pathname against the base URL.
    //
    if (
        relative
      && location.slashes
      && url.pathname.charAt(0) !== '/'
      && (url.pathname !== '' || location.pathname !== '')
    ) {
      url.pathname = resolve(url.pathname, location.pathname);
    }

    //
    // We should not add port numbers if they are already the default port number
    // for a given protocol. As the host also contains the port number we're going
    // override it with the hostname which contains no port number.
    //
    if (!required(url.port, url.protocol)) {
      url.host = url.hostname;
      url.port = '';
    }

    //
    // Parse down the `auth` for the username and password.
    //
    url.username = url.password = '';
    if (url.auth) {
      instruction = url.auth.split(':');
      url.username = instruction[0] || '';
      url.password = instruction[1] || '';
    }

    url.origin = url.protocol && url.host && url.protocol !== 'file:'
      ? url.protocol +'//'+ url.host
      : 'null';

    //
    // The href is just the compiled result.
    //
    url.href = url.toString();
  }

  /**
   * This is convenience method for changing properties in the URL instance to
   * insure that they all propagate correctly.
   *
   * @param {String} part          Property we need to adjust.
   * @param {Mixed} value          The newly assigned value.
   * @param {Boolean|Function} fn  When setting the query, it will be the function
   *                               used to parse the query.
   *                               When setting the protocol, double slash will be
   *                               removed from the final url if it is true.
   * @returns {URL} URL instance for chaining.
   * @public
   */
  function set(part, value, fn) {
    var url = this;

    switch (part) {
      case 'query':
        if ('string' === typeof value && value.length) {
          value = (fn || qs.parse)(value);
        }

        url[part] = value;
        break;

      case 'port':
        url[part] = value;

        if (!required(value, url.protocol)) {
          url.host = url.hostname;
          url[part] = '';
        } else if (value) {
          url.host = url.hostname +':'+ value;
        }

        break;

      case 'hostname':
        url[part] = value;

        if (url.port) value += ':'+ url.port;
        url.host = value;
        break;

      case 'host':
        url[part] = value;

        if (/:\d+$/.test(value)) {
          value = value.split(':');
          url.port = value.pop();
          url.hostname = value.join(':');
        } else {
          url.hostname = value;
          url.port = '';
        }

        break;

      case 'protocol':
        url.protocol = value.toLowerCase();
        url.slashes = !fn;
        break;

      case 'pathname':
      case 'hash':
        if (value) {
          var char = part === 'pathname' ? '/' : '#';
          url[part] = value.charAt(0) !== char ? char + value : value;
        } else {
          url[part] = value;
        }
        break;

      default:
        url[part] = value;
    }

    for (var i = 0; i < rules.length; i++) {
      var ins = rules[i];

      if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
    }

    url.origin = url.protocol && url.host && url.protocol !== 'file:'
      ? url.protocol +'//'+ url.host
      : 'null';

    url.href = url.toString();

    return url;
  }

  /**
   * Transform the properties back in to a valid and full URL string.
   *
   * @param {Function} stringify Optional query stringify function.
   * @returns {String} Compiled version of the URL.
   * @public
   */
  function toString(stringify) {
    if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

    var query
      , url = this
      , protocol = url.protocol;

    if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

    var result = protocol + (url.slashes ? '//' : '');

    if (url.username) {
      result += url.username;
      if (url.password) result += ':'+ url.password;
      result += '@';
    }

    result += url.host + url.pathname;

    query = 'object' === typeof url.query ? stringify(url.query) : url.query;
    if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

    if (url.hash) result += url.hash;

    return result;
  }

  Url.prototype = { set: set, toString: toString };

  //
  // Expose the URL parser and some additional properties that might be useful for
  // others or testing.
  //
  Url.extractProtocol = extractProtocol;
  Url.location = lolcation;
  Url.qs = qs;

  module.exports = Url;

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  },{"querystringify":59,"requires-port":60}]},{},[1])(1)
  });


  //# sourceMappingURL=sockjs.js.map

  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

  /***/ }),

  /***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
  /*!****************************************************************************!*\
    !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
    \****************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  var isOldIE = function isOldIE() {
    var memo;
    return function memorize() {
      if (typeof memo === 'undefined') {
        // Test for IE <= 9 as proposed by Browserhacks
        // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
        // Tests for existence of standard globals is to allow style-loader
        // to operate correctly into non-standard environments
        // @see https://github.com/webpack-contrib/style-loader/issues/177
        memo = Boolean(window && document && document.all && !window.atob);
      }

      return memo;
    };
  }();

  var getTarget = function getTarget() {
    var memo = {};
    return function memorize(target) {
      if (typeof memo[target] === 'undefined') {
        var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

        if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
          try {
            // This will throw an exception if access to iframe is blocked
            // due to cross-origin restrictions
            styleTarget = styleTarget.contentDocument.head;
          } catch (e) {
            // istanbul ignore next
            styleTarget = null;
          }
        }

        memo[target] = styleTarget;
      }

      return memo[target];
    };
  }();

  var stylesInDom = [];

  function getIndexByIdentifier(identifier) {
    var result = -1;

    for (var i = 0; i < stylesInDom.length; i++) {
      if (stylesInDom[i].identifier === identifier) {
        result = i;
        break;
      }
    }

    return result;
  }

  function modulesToDom(list, options) {
    var idCountMap = {};
    var identifiers = [];

    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      var id = options.base ? item[0] + options.base : item[0];
      var count = idCountMap[id] || 0;
      var identifier = "".concat(id, " ").concat(count);
      idCountMap[id] = count + 1;
      var index = getIndexByIdentifier(identifier);
      var obj = {
        css: item[1],
        media: item[2],
        sourceMap: item[3]
      };

      if (index !== -1) {
        stylesInDom[index].references++;
        stylesInDom[index].updater(obj);
      } else {
        stylesInDom.push({
          identifier: identifier,
          updater: addStyle(obj, options),
          references: 1
        });
      }

      identifiers.push(identifier);
    }

    return identifiers;
  }

  function insertStyleElement(options) {
    var style = document.createElement('style');
    var attributes = options.attributes || {};

    if (typeof attributes.nonce === 'undefined') {
      var nonce =  true ? __webpack_require__.nc : undefined;

      if (nonce) {
        attributes.nonce = nonce;
      }
    }

    Object.keys(attributes).forEach(function (key) {
      style.setAttribute(key, attributes[key]);
    });

    if (typeof options.insert === 'function') {
      options.insert(style);
    } else {
      var target = getTarget(options.insert || 'head');

      if (!target) {
        throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
      }

      target.appendChild(style);
    }

    return style;
  }

  function removeStyleElement(style) {
    // istanbul ignore if
    if (style.parentNode === null) {
      return false;
    }

    style.parentNode.removeChild(style);
  }
  /* istanbul ignore next  */


  var replaceText = function replaceText() {
    var textStore = [];
    return function replace(index, replacement) {
      textStore[index] = replacement;
      return textStore.filter(Boolean).join('\n');
    };
  }();

  function applyToSingletonTag(style, index, remove, obj) {
    var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

    /* istanbul ignore if  */

    if (style.styleSheet) {
      style.styleSheet.cssText = replaceText(index, css);
    } else {
      var cssNode = document.createTextNode(css);
      var childNodes = style.childNodes;

      if (childNodes[index]) {
        style.removeChild(childNodes[index]);
      }

      if (childNodes.length) {
        style.insertBefore(cssNode, childNodes[index]);
      } else {
        style.appendChild(cssNode);
      }
    }
  }

  function applyToTag(style, options, obj) {
    var css = obj.css;
    var media = obj.media;
    var sourceMap = obj.sourceMap;

    if (media) {
      style.setAttribute('media', media);
    } else {
      style.removeAttribute('media');
    }

    if (sourceMap && btoa) {
      css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
    } // For old IE

    /* istanbul ignore if  */


    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      while (style.firstChild) {
        style.removeChild(style.firstChild);
      }

      style.appendChild(document.createTextNode(css));
    }
  }

  var singleton = null;
  var singletonCounter = 0;

  function addStyle(obj, options) {
    var style;
    var update;
    var remove;

    if (options.singleton) {
      var styleIndex = singletonCounter++;
      style = singleton || (singleton = insertStyleElement(options));
      update = applyToSingletonTag.bind(null, style, styleIndex, false);
      remove = applyToSingletonTag.bind(null, style, styleIndex, true);
    } else {
      style = insertStyleElement(options);
      update = applyToTag.bind(null, style, options);

      remove = function remove() {
        removeStyleElement(style);
      };
    }

    update(obj);
    return function updateStyle(newObj) {
      if (newObj) {
        if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
          return;
        }

        update(obj = newObj);
      } else {
        remove();
      }
    };
  }

  module.exports = function (list, options) {
    options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
    // tags it will allow on a page

    if (!options.singleton && typeof options.singleton !== 'boolean') {
      options.singleton = isOldIE();
    }

    list = list || [];
    var lastIdentifiers = modulesToDom(list, options);
    return function update(newList) {
      newList = newList || [];

      if (Object.prototype.toString.call(newList) !== '[object Array]') {
        return;
      }

      for (var i = 0; i < lastIdentifiers.length; i++) {
        var identifier = lastIdentifiers[i];
        var index = getIndexByIdentifier(identifier);
        stylesInDom[index].references--;
      }

      var newLastIdentifiers = modulesToDom(newList, options);

      for (var _i = 0; _i < lastIdentifiers.length; _i++) {
        var _identifier = lastIdentifiers[_i];

        var _index = getIndexByIdentifier(_identifier);

        if (stylesInDom[_index].references === 0) {
          stylesInDom[_index].updater();

          stylesInDom.splice(_index, 1);
        }
      }

      lastIdentifiers = newLastIdentifiers;
    };
  };

  /***/ }),

  /***/ "./node_modules/url/url.js":
  /*!*********************************!*\
    !*** ./node_modules/url/url.js ***!
    \*********************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.



  var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
  var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

  exports.parse = urlParse;
  exports.resolve = urlResolve;
  exports.resolveObject = urlResolveObject;
  exports.format = urlFormat;

  exports.Url = Url;

  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  }

  // Reference: RFC 3986, RFC 1808, RFC 2396

  // define these here so at least they only have to be
  // compiled once on the first module load.
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
      portPattern = /:[0-9]*$/,

      // Special case for a simple path URL
      simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

      // RFC 2396: characters reserved for delimiting URLs.
      // We actually just auto-escape these.
      delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

      // RFC 2396: characters not allowed for various reasons.
      unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

      // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
      autoEscape = ['\''].concat(unwise),
      // Characters that are never ever allowed in a hostname.
      // Note that any invalid chars are also handled, but these
      // are the ones that are *expected* to be seen, so we fast-path
      // them.
      nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
      hostEndingChars = ['/', '?', '#'],
      hostnameMaxLen = 255,
      hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
      hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
      // protocols that can allow "unsafe" and "unwise" chars.
      unsafeProtocol = {
        'javascript': true,
        'javascript:': true
      },
      // protocols that never have a hostname.
      hostlessProtocol = {
        'javascript': true,
        'javascript:': true
      },
      // protocols that always contain a // bit.
      slashedProtocol = {
        'http': true,
        'https': true,
        'ftp': true,
        'gopher': true,
        'file': true,
        'http:': true,
        'https:': true,
        'ftp:': true,
        'gopher:': true,
        'file:': true
      },
      querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && util.isObject(url) && url instanceof Url) return url;

    var u = new Url;
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
  }

  Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
    if (!util.isString(url)) {
      throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    var queryIndex = url.indexOf('?'),
        splitter =
            (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
        uSplit = url.split(splitter),
        slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, '/');
    url = uSplit.join(splitter);

    var rest = url;

    // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
    rest = rest.trim();

    if (!slashesDenoteHost && url.split('#').length === 1) {
      // Try fast path regexp
      var simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        this.path = rest;
        this.href = rest;
        this.pathname = simplePath[1];
        if (simplePath[2]) {
          this.search = simplePath[2];
          if (parseQueryString) {
            this.query = querystring.parse(this.search.substr(1));
          } else {
            this.query = this.search.substr(1);
          }
        } else if (parseQueryString) {
          this.search = '';
          this.query = {};
        }
        return this;
      }
    }

    var proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      var lowerProto = proto.toLowerCase();
      this.protocol = lowerProto;
      rest = rest.substr(proto.length);
    }

    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === '//';
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        this.slashes = true;
      }
    }

    if (!hostlessProtocol[proto] &&
        (slashes || (proto && !slashedProtocol[proto]))) {

      // there's a hostname.
      // the first instance of /, ?, ;, or # ends the host.
      //
      // If there is an @ in the hostname, then non-host chars *are* allowed
      // to the left of the last @ sign, unless some host-ending character
      // comes *before* the @-sign.
      // URLs are obnoxious.
      //
      // ex:
      // http://a@b@c/ => user:a@b host:c
      // http://a@b?@c => user:a host:c path:/?@c

      // v0.12 TODO(isaacs): This is not quite how Chrome does things.
      // Review our test case against browsers more comprehensively.

      // find the first instance of any hostEndingChars
      var hostEnd = -1;
      for (var i = 0; i < hostEndingChars.length; i++) {
        var hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }

      // at this point, either we have an explicit point where the
      // auth portion cannot go past, or the last @ char is the decider.
      var auth, atSign;
      if (hostEnd === -1) {
        // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
      } else {
        // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
      }

      // Now we have a portion which is definitely the auth.
      // Pull that off.
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        this.auth = decodeURIComponent(auth);
      }

      // the host is the remaining to the left of the first non-host char
      hostEnd = -1;
      for (var i = 0; i < nonHostChars.length; i++) {
        var hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }
      // if we still have not hit it, then the entire thing is a host.
      if (hostEnd === -1)
        hostEnd = rest.length;

      this.host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);

      // pull out port.
      this.parseHost();

      // we've indicated that there is a hostname,
      // so even if it's empty, it has to be present.
      this.hostname = this.hostname || '';

      // if hostname begins with [ and ends with ]
      // assume that it's an IPv6 address.
      var ipv6Hostname = this.hostname[0] === '[' &&
          this.hostname[this.hostname.length - 1] === ']';

      // validate a little.
      if (!ipv6Hostname) {
        var hostparts = this.hostname.split(/\./);
        for (var i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part) continue;
          if (!part.match(hostnamePartPattern)) {
            var newpart = '';
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                // we replace non-ASCII char with a temporary placeholder
                // we need this to make sure size of hostname is not
                // broken by replacing non-ASCII by nothing
                newpart += 'x';
              } else {
                newpart += part[j];
              }
            }
            // we test again with ASCII char only
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = '/' + notHost.join('.') + rest;
              }
              this.hostname = validParts.join('.');
              break;
            }
          }
        }
      }

      if (this.hostname.length > hostnameMaxLen) {
        this.hostname = '';
      } else {
        // hostnames are always lower case.
        this.hostname = this.hostname.toLowerCase();
      }

      if (!ipv6Hostname) {
        // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        this.hostname = punycode.toASCII(this.hostname);
      }

      var p = this.port ? ':' + this.port : '';
      var h = this.hostname || '';
      this.host = h + p;
      this.href += this.host;

      // strip [ and ] from the hostname
      // the host field still retains them, though
      if (ipv6Hostname) {
        this.hostname = this.hostname.substr(1, this.hostname.length - 2);
        if (rest[0] !== '/') {
          rest = '/' + rest;
        }
      }
    }

    // now rest is set to the post-host stuff.
    // chop off any delim chars.
    if (!unsafeProtocol[lowerProto]) {

      // First, make 100% sure that any "autoEscape" chars get
      // escaped, even if encodeURIComponent doesn't think they
      // need to be.
      for (var i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1)
          continue;
        var esc = encodeURIComponent(ae);
        if (esc === ae) {
          esc = escape(ae);
        }
        rest = rest.split(ae).join(esc);
      }
    }


    // chop off from the tail first.
    var hash = rest.indexOf('#');
    if (hash !== -1) {
      // got a fragment string.
      this.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf('?');
    if (qm !== -1) {
      this.search = rest.substr(qm);
      this.query = rest.substr(qm + 1);
      if (parseQueryString) {
        this.query = querystring.parse(this.query);
      }
      rest = rest.slice(0, qm);
    } else if (parseQueryString) {
      // no query string, but parseQueryString still requested
      this.search = '';
      this.query = {};
    }
    if (rest) this.pathname = rest;
    if (slashedProtocol[lowerProto] &&
        this.hostname && !this.pathname) {
      this.pathname = '/';
    }

    //to support http.request
    if (this.pathname || this.search) {
      var p = this.pathname || '';
      var s = this.search || '';
      this.path = p + s;
    }

    // finally, reconstruct the href based on what has been validated.
    this.href = this.format();
    return this;
  };

  // format a parsed object into a url string
  function urlFormat(obj) {
    // ensure it's an object, and not a string url.
    // If it's an obj, this is a no-op.
    // this way, you can call url_format() on strings
    // to clean up potentially wonky urls.
    if (util.isString(obj)) obj = urlParse(obj);
    if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
    return obj.format();
  }

  Url.prototype.format = function() {
    var auth = this.auth || '';
    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ':');
      auth += '@';
    }

    var protocol = this.protocol || '',
        pathname = this.pathname || '',
        hash = this.hash || '',
        host = false,
        query = '';

    if (this.host) {
      host = auth + this.host;
    } else if (this.hostname) {
      host = auth + (this.hostname.indexOf(':') === -1 ?
          this.hostname :
          '[' + this.hostname + ']');
      if (this.port) {
        host += ':' + this.port;
      }
    }

    if (this.query &&
        util.isObject(this.query) &&
        Object.keys(this.query).length) {
      query = querystring.stringify(this.query);
    }

    var search = this.search || (query && ('?' + query)) || '';

    if (protocol && protocol.substr(-1) !== ':') protocol += ':';

    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (this.slashes ||
        (!protocol || slashedProtocol[protocol]) && host !== false) {
      host = '//' + (host || '');
      if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
    } else if (!host) {
      host = '';
    }

    if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
    if (search && search.charAt(0) !== '?') search = '?' + search;

    pathname = pathname.replace(/[?#]/g, function(match) {
      return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');

    return protocol + host + pathname + search + hash;
  };

  function urlResolve(source, relative) {
    return urlParse(source, false, true).resolve(relative);
  }

  Url.prototype.resolve = function(relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
  };

  function urlResolveObject(source, relative) {
    if (!source) return relative;
    return urlParse(source, false, true).resolveObject(relative);
  }

  Url.prototype.resolveObject = function(relative) {
    if (util.isString(relative)) {
      var rel = new Url();
      rel.parse(relative, false, true);
      relative = rel;
    }

    var result = new Url();
    var tkeys = Object.keys(this);
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk];
      result[tkey] = this[tkey];
    }

    // hash is always overridden, no matter what.
    // even href="" will remove it.
    result.hash = relative.hash;

    // if the relative url is empty, then there's nothing left to do here.
    if (relative.href === '') {
      result.href = result.format();
      return result;
    }

    // hrefs like //foo/bar always cut to the protocol.
    if (relative.slashes && !relative.protocol) {
      // take everything except the protocol from relative
      var rkeys = Object.keys(relative);
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk];
        if (rkey !== 'protocol')
          result[rkey] = relative[rkey];
      }

      //urlParse appends trailing / to urls like http://www.example.com
      if (slashedProtocol[result.protocol] &&
          result.hostname && !result.pathname) {
        result.path = result.pathname = '/';
      }

      result.href = result.format();
      return result;
    }

    if (relative.protocol && relative.protocol !== result.protocol) {
      // if it's a known url protocol, then changing
      // the protocol does weird things
      // first, if it's not file:, then we MUST have a host,
      // and if there was a path
      // to begin with, then we MUST have a path.
      // if it is file:, then the host is dropped,
      // because that's known to be hostless.
      // anything else is assumed to be absolute.
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative);
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v];
          result[k] = relative[k];
        }
        result.href = result.format();
        return result;
      }

      result.protocol = relative.protocol;
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        var relPath = (relative.pathname || '').split('/');
        while (relPath.length && !(relative.host = relPath.shift()));
        if (!relative.host) relative.host = '';
        if (!relative.hostname) relative.hostname = '';
        if (relPath[0] !== '') relPath.unshift('');
        if (relPath.length < 2) relPath.unshift('');
        result.pathname = relPath.join('/');
      } else {
        result.pathname = relative.pathname;
      }
      result.search = relative.search;
      result.query = relative.query;
      result.host = relative.host || '';
      result.auth = relative.auth;
      result.hostname = relative.hostname || relative.host;
      result.port = relative.port;
      // to support http.request
      if (result.pathname || result.search) {
        var p = result.pathname || '';
        var s = result.search || '';
        result.path = p + s;
      }
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    }

    var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
        isRelAbs = (
            relative.host ||
            relative.pathname && relative.pathname.charAt(0) === '/'
        ),
        mustEndAbs = (isRelAbs || isSourceAbs ||
                      (result.host && relative.pathname)),
        removeAllDots = mustEndAbs,
        srcPath = result.pathname && result.pathname.split('/') || [],
        relPath = relative.pathname && relative.pathname.split('/') || [],
        psychotic = result.protocol && !slashedProtocol[result.protocol];

    // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.
    if (psychotic) {
      result.hostname = '';
      result.port = null;
      if (result.host) {
        if (srcPath[0] === '') srcPath[0] = result.host;
        else srcPath.unshift(result.host);
      }
      result.host = '';
      if (relative.protocol) {
        relative.hostname = null;
        relative.port = null;
        if (relative.host) {
          if (relPath[0] === '') relPath[0] = relative.host;
          else relPath.unshift(relative.host);
        }
        relative.host = null;
      }
      mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
    }

    if (isRelAbs) {
      // it's absolute.
      result.host = (relative.host || relative.host === '') ?
                    relative.host : result.host;
      result.hostname = (relative.hostname || relative.hostname === '') ?
                        relative.hostname : result.hostname;
      result.search = relative.search;
      result.query = relative.query;
      srcPath = relPath;
      // fall through to the dot-handling below.
    } else if (relPath.length) {
      // it's relative
      // throw away the existing file, and take the new path instead.
      if (!srcPath) srcPath = [];
      srcPath.pop();
      srcPath = srcPath.concat(relPath);
      result.search = relative.search;
      result.query = relative.query;
    } else if (!util.isNullOrUndefined(relative.search)) {
      // just pull out the search.
      // like href='?foo'.
      // Put this after the other two cases because it simplifies the booleans
      if (psychotic) {
        result.hostname = result.host = srcPath.shift();
        //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
        var authInHost = result.host && result.host.indexOf('@') > 0 ?
                         result.host.split('@') : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      result.search = relative.search;
      result.query = relative.query;
      //to support http.request
      if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : '') +
                      (result.search ? result.search : '');
      }
      result.href = result.format();
      return result;
    }

    if (!srcPath.length) {
      // no path at all.  easy.
      // we've already handled the other stuff above.
      result.pathname = null;
      //to support http.request
      if (result.search) {
        result.path = '/' + result.search;
      } else {
        result.path = null;
      }
      result.href = result.format();
      return result;
    }

    // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (
        (result.host || relative.host || srcPath.length > 1) &&
        (last === '.' || last === '..') || last === '');

    // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i];
      if (last === '.') {
        srcPath.splice(i, 1);
      } else if (last === '..') {
        srcPath.splice(i, 1);
        up++;
      } else if (up) {
        srcPath.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift('..');
      }
    }

    if (mustEndAbs && srcPath[0] !== '' &&
        (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
      srcPath.unshift('');
    }

    if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
      srcPath.push('');
    }

    var isAbsolute = srcPath[0] === '' ||
        (srcPath[0] && srcPath[0].charAt(0) === '/');

    // put the host back
    if (psychotic) {
      result.hostname = result.host = isAbsolute ? '' :
                                      srcPath.length ? srcPath.shift() : '';
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }

    mustEndAbs = mustEndAbs || (result.host && srcPath.length);

    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift('');
    }

    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join('/');
    }

    //to support request.http
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  };

  Url.prototype.parseHost = function() {
    var host = this.host;
    var port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ':') {
        this.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host) this.hostname = host;
  };


  /***/ }),

  /***/ "./node_modules/url/util.js":
  /*!**********************************!*\
    !*** ./node_modules/url/util.js ***!
    \**********************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  module.exports = {
    isString: function(arg) {
      return typeof(arg) === 'string';
    },
    isObject: function(arg) {
      return typeof(arg) === 'object' && arg !== null;
    },
    isNull: function(arg) {
      return arg === null;
    },
    isNullOrUndefined: function(arg) {
      return arg == null;
    }
  };


  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/clients/BaseClient.js":
  /*!*********************************************************!*\
    !*** (webpack)-dev-server/client/clients/BaseClient.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  /* eslint-disable
    no-unused-vars
  */

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  module.exports = /*#__PURE__*/function () {
    function BaseClient() {
      _classCallCheck(this, BaseClient);
    }

    _createClass(BaseClient, null, [{
      key: "getClientPath",
      value: function getClientPath(options) {
        throw new Error('Client needs implementation');
      }
    }]);

    return BaseClient;
  }();

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js":
  /*!***********************************************************!*\
    !*** (webpack)-dev-server/client/clients/SockJSClient.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  /* eslint-disable
    no-unused-vars
  */

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  var SockJS = __webpack_require__(/*! sockjs-client/dist/sockjs */ "./node_modules/sockjs-client/dist/sockjs.js");

  var BaseClient = __webpack_require__(/*! ./BaseClient */ "./node_modules/webpack-dev-server/client/clients/BaseClient.js");

  module.exports = /*#__PURE__*/function (_BaseClient) {
    _inherits(SockJSClient, _BaseClient);

    var _super = _createSuper(SockJSClient);

    function SockJSClient(url) {
      var _this;

      _classCallCheck(this, SockJSClient);

      _this = _super.call(this);
      _this.sock = new SockJS(url);

      _this.sock.onerror = function (err) {// TODO: use logger to log the error event once client and client-src
        // are reorganized to have the same directory structure
      };

      return _this;
    }

    _createClass(SockJSClient, [{
      key: "onOpen",
      value: function onOpen(f) {
        this.sock.onopen = f;
      }
    }, {
      key: "onClose",
      value: function onClose(f) {
        this.sock.onclose = f;
      } // call f with the message string as the first argument

    }, {
      key: "onMessage",
      value: function onMessage(f) {
        this.sock.onmessage = function (e) {
          f(e.data);
        };
      }
    }], [{
      key: "getClientPath",
      value: function getClientPath(options) {
        return /*require.resolve*/(/*! ./SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
      }
    }]);

    return SockJSClient;
  }(BaseClient);

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/index.js?/":
  /*!*************************************!*\
    !*** (webpack)-dev-server/client?/ ***!
    \*************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  /* WEBPACK VAR INJECTION */(function(__resourceQuery) {
  /* global __resourceQuery WorkerGlobalScope self */

  /* eslint prefer-destructuring: off */

  var stripAnsi = __webpack_require__(/*! strip-ansi */ "./node_modules/webpack-dev-server/node_modules/strip-ansi/index.js");

  var socket = __webpack_require__(/*! ./socket */ "./node_modules/webpack-dev-server/client/socket.js");

  var overlay = __webpack_require__(/*! ./overlay */ "./node_modules/webpack-dev-server/client/overlay.js");

  var _require = __webpack_require__(/*! ./utils/log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
      log = _require.log,
      setLogLevel = _require.setLogLevel;

  var sendMessage = __webpack_require__(/*! ./utils/sendMessage */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");

  var reloadApp = __webpack_require__(/*! ./utils/reloadApp */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");

  var createSocketUrl = __webpack_require__(/*! ./utils/createSocketUrl */ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js");

  var status = {
    isUnloading: false,
    currentHash: ''
  };
  var options = {
    hot: false,
    hotReload: true,
    liveReload: false,
    initial: true,
    useWarningOverlay: false,
    useErrorOverlay: false,
    useProgress: false
  };
  var socketUrl = createSocketUrl(__resourceQuery);
  self.addEventListener('beforeunload', function () {
    status.isUnloading = true;
  });

  if (typeof window !== 'undefined') {
    var qs = window.location.search.toLowerCase();
    options.hotReload = qs.indexOf('hotreload=false') === -1;
  }

  var onSocketMessage = {
    hot: function hot() {
      options.hot = true;
      log.info('[WDS] Hot Module Replacement enabled.');
    },
    liveReload: function liveReload() {
      options.liveReload = true;
      log.info('[WDS] Live Reloading enabled.');
    },
    invalid: function invalid() {
      log.info('[WDS] App updated. Recompiling...'); // fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

      if (options.useWarningOverlay || options.useErrorOverlay) {
        overlay.clear();
      }

      sendMessage('Invalid');
    },
    hash: function hash(_hash) {
      status.currentHash = _hash;
    },
    'still-ok': function stillOk() {
      log.info('[WDS] Nothing changed.');

      if (options.useWarningOverlay || options.useErrorOverlay) {
        overlay.clear();
      }

      sendMessage('StillOk');
    },
    'log-level': function logLevel(level) {
      var hotCtx = __webpack_require__("./node_modules/webpack/hot sync ^\\.\\/log$");

      if (hotCtx.keys().indexOf('./log') !== -1) {
        hotCtx('./log').setLogLevel(level);
      }

      setLogLevel(level);
    },
    overlay: function overlay(value) {
      if (typeof document !== 'undefined') {
        if (typeof value === 'boolean') {
          options.useWarningOverlay = false;
          options.useErrorOverlay = value;
        } else if (value) {
          options.useWarningOverlay = value.warnings;
          options.useErrorOverlay = value.errors;
        }
      }
    },
    progress: function progress(_progress) {
      if (typeof document !== 'undefined') {
        options.useProgress = _progress;
      }
    },
    'progress-update': function progressUpdate(data) {
      if (options.useProgress) {
        log.info("[WDS] ".concat(data.percent, "% - ").concat(data.msg, "."));
      }

      sendMessage('Progress', data);
    },
    ok: function ok() {
      sendMessage('Ok');

      if (options.useWarningOverlay || options.useErrorOverlay) {
        overlay.clear();
      }

      if (options.initial) {
        return options.initial = false;
      } // eslint-disable-line no-return-assign


      reloadApp(options, status);
    },
    'content-changed': function contentChanged() {
      log.info('[WDS] Content base changed. Reloading...');
      self.location.reload();
    },
    warnings: function warnings(_warnings) {
      log.warn('[WDS] Warnings while compiling.');

      var strippedWarnings = _warnings.map(function (warning) {
        return stripAnsi(warning);
      });

      sendMessage('Warnings', strippedWarnings);

      for (var i = 0; i < strippedWarnings.length; i++) {
        log.warn(strippedWarnings[i]);
      }

      if (options.useWarningOverlay) {
        overlay.showMessage(_warnings);
      }

      if (options.initial) {
        return options.initial = false;
      } // eslint-disable-line no-return-assign


      reloadApp(options, status);
    },
    errors: function errors(_errors) {
      log.error('[WDS] Errors while compiling. Reload prevented.');

      var strippedErrors = _errors.map(function (error) {
        return stripAnsi(error);
      });

      sendMessage('Errors', strippedErrors);

      for (var i = 0; i < strippedErrors.length; i++) {
        log.error(strippedErrors[i]);
      }

      if (options.useErrorOverlay) {
        overlay.showMessage(_errors);
      }

      options.initial = false;
    },
    error: function error(_error) {
      log.error(_error);
    },
    close: function close() {
      log.error('[WDS] Disconnected!');
      sendMessage('Close');
    }
  };
  socket(socketUrl, onSocketMessage);
  /* WEBPACK VAR INJECTION */}.call(this, "?/"))

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/index.js?http://localhost":
  /*!****************************************************!*\
    !*** (webpack)-dev-server/client?http://localhost ***!
    \****************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  /* WEBPACK VAR INJECTION */(function(__resourceQuery) {
  /* global __resourceQuery WorkerGlobalScope self */

  /* eslint prefer-destructuring: off */

  var stripAnsi = __webpack_require__(/*! strip-ansi */ "./node_modules/webpack-dev-server/node_modules/strip-ansi/index.js");

  var socket = __webpack_require__(/*! ./socket */ "./node_modules/webpack-dev-server/client/socket.js");

  var overlay = __webpack_require__(/*! ./overlay */ "./node_modules/webpack-dev-server/client/overlay.js");

  var _require = __webpack_require__(/*! ./utils/log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
      log = _require.log,
      setLogLevel = _require.setLogLevel;

  var sendMessage = __webpack_require__(/*! ./utils/sendMessage */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");

  var reloadApp = __webpack_require__(/*! ./utils/reloadApp */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");

  var createSocketUrl = __webpack_require__(/*! ./utils/createSocketUrl */ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js");

  var status = {
    isUnloading: false,
    currentHash: ''
  };
  var options = {
    hot: false,
    hotReload: true,
    liveReload: false,
    initial: true,
    useWarningOverlay: false,
    useErrorOverlay: false,
    useProgress: false
  };
  var socketUrl = createSocketUrl(__resourceQuery);
  self.addEventListener('beforeunload', function () {
    status.isUnloading = true;
  });

  if (typeof window !== 'undefined') {
    var qs = window.location.search.toLowerCase();
    options.hotReload = qs.indexOf('hotreload=false') === -1;
  }

  var onSocketMessage = {
    hot: function hot() {
      options.hot = true;
      log.info('[WDS] Hot Module Replacement enabled.');
    },
    liveReload: function liveReload() {
      options.liveReload = true;
      log.info('[WDS] Live Reloading enabled.');
    },
    invalid: function invalid() {
      log.info('[WDS] App updated. Recompiling...'); // fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

      if (options.useWarningOverlay || options.useErrorOverlay) {
        overlay.clear();
      }

      sendMessage('Invalid');
    },
    hash: function hash(_hash) {
      status.currentHash = _hash;
    },
    'still-ok': function stillOk() {
      log.info('[WDS] Nothing changed.');

      if (options.useWarningOverlay || options.useErrorOverlay) {
        overlay.clear();
      }

      sendMessage('StillOk');
    },
    'log-level': function logLevel(level) {
      var hotCtx = __webpack_require__("./node_modules/webpack/hot sync ^\\.\\/log$");

      if (hotCtx.keys().indexOf('./log') !== -1) {
        hotCtx('./log').setLogLevel(level);
      }

      setLogLevel(level);
    },
    overlay: function overlay(value) {
      if (typeof document !== 'undefined') {
        if (typeof value === 'boolean') {
          options.useWarningOverlay = false;
          options.useErrorOverlay = value;
        } else if (value) {
          options.useWarningOverlay = value.warnings;
          options.useErrorOverlay = value.errors;
        }
      }
    },
    progress: function progress(_progress) {
      if (typeof document !== 'undefined') {
        options.useProgress = _progress;
      }
    },
    'progress-update': function progressUpdate(data) {
      if (options.useProgress) {
        log.info("[WDS] ".concat(data.percent, "% - ").concat(data.msg, "."));
      }

      sendMessage('Progress', data);
    },
    ok: function ok() {
      sendMessage('Ok');

      if (options.useWarningOverlay || options.useErrorOverlay) {
        overlay.clear();
      }

      if (options.initial) {
        return options.initial = false;
      } // eslint-disable-line no-return-assign


      reloadApp(options, status);
    },
    'content-changed': function contentChanged() {
      log.info('[WDS] Content base changed. Reloading...');
      self.location.reload();
    },
    warnings: function warnings(_warnings) {
      log.warn('[WDS] Warnings while compiling.');

      var strippedWarnings = _warnings.map(function (warning) {
        return stripAnsi(warning);
      });

      sendMessage('Warnings', strippedWarnings);

      for (var i = 0; i < strippedWarnings.length; i++) {
        log.warn(strippedWarnings[i]);
      }

      if (options.useWarningOverlay) {
        overlay.showMessage(_warnings);
      }

      if (options.initial) {
        return options.initial = false;
      } // eslint-disable-line no-return-assign


      reloadApp(options, status);
    },
    errors: function errors(_errors) {
      log.error('[WDS] Errors while compiling. Reload prevented.');

      var strippedErrors = _errors.map(function (error) {
        return stripAnsi(error);
      });

      sendMessage('Errors', strippedErrors);

      for (var i = 0; i < strippedErrors.length; i++) {
        log.error(strippedErrors[i]);
      }

      if (options.useErrorOverlay) {
        overlay.showMessage(_errors);
      }

      options.initial = false;
    },
    error: function error(_error) {
      log.error(_error);
    },
    close: function close() {
      log.error('[WDS] Disconnected!');
      sendMessage('Close');
    }
  };
  socket(socketUrl, onSocketMessage);
  /* WEBPACK VAR INJECTION */}.call(this, "?http://localhost"))

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/overlay.js":
  /*!**********************************************!*\
    !*** (webpack)-dev-server/client/overlay.js ***!
    \**********************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
   // The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
  // They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).

  var ansiHTML = __webpack_require__(/*! ansi-html */ "./node_modules/ansi-html/index.js");

  var _require = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js"),
      AllHtmlEntities = _require.AllHtmlEntities;

  var entities = new AllHtmlEntities();
  var colors = {
    reset: ['transparent', 'transparent'],
    black: '181818',
    red: 'E36049',
    green: 'B3CB74',
    yellow: 'FFD080',
    blue: '7CAFC2',
    magenta: '7FACCA',
    cyan: 'C3C2EF',
    lightgrey: 'EBE7E3',
    darkgrey: '6D7891'
  };
  var overlayIframe = null;
  var overlayDiv = null;
  var lastOnOverlayDivReady = null;
  ansiHTML.setColors(colors);

  function createOverlayIframe(onIframeLoad) {
    var iframe = document.createElement('iframe');
    iframe.id = 'webpack-dev-server-client-overlay';
    iframe.src = 'about:blank';
    iframe.style.position = 'fixed';
    iframe.style.left = 0;
    iframe.style.top = 0;
    iframe.style.right = 0;
    iframe.style.bottom = 0;
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.style.zIndex = 9999999999;
    iframe.onload = onIframeLoad;
    return iframe;
  }

  function addOverlayDivTo(iframe) {
    var div = iframe.contentDocument.createElement('div');
    div.id = 'webpack-dev-server-client-overlay-div';
    div.style.position = 'fixed';
    div.style.boxSizing = 'border-box';
    div.style.left = 0;
    div.style.top = 0;
    div.style.right = 0;
    div.style.bottom = 0;
    div.style.width = '100vw';
    div.style.height = '100vh';
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    div.style.color = '#E8E8E8';
    div.style.fontFamily = 'Menlo, Consolas, monospace';
    div.style.fontSize = 'large';
    div.style.padding = '2rem';
    div.style.lineHeight = '1.2';
    div.style.whiteSpace = 'pre-wrap';
    div.style.overflow = 'auto';
    iframe.contentDocument.body.appendChild(div);
    return div;
  }

  function ensureOverlayDivExists(onOverlayDivReady) {
    if (overlayDiv) {
      // Everything is ready, call the callback right away.
      onOverlayDivReady(overlayDiv);
      return;
    } // Creating an iframe may be asynchronous so we'll schedule the callback.
    // In case of multiple calls, last callback wins.


    lastOnOverlayDivReady = onOverlayDivReady;

    if (overlayIframe) {
      // We've already created it.
      return;
    } // Create iframe and, when it is ready, a div inside it.


    overlayIframe = createOverlayIframe(function () {
      overlayDiv = addOverlayDivTo(overlayIframe); // Now we can talk!

      lastOnOverlayDivReady(overlayDiv);
    }); // Zalgo alert: onIframeLoad() will be called either synchronously
    // or asynchronously depending on the browser.
    // We delay adding it so `overlayIframe` is set when `onIframeLoad` fires.

    document.body.appendChild(overlayIframe);
  } // Successful compilation.


  function clear() {
    if (!overlayDiv) {
      // It is not there in the first place.
      return;
    } // Clean up and reset internal state.


    document.body.removeChild(overlayIframe);
    overlayDiv = null;
    overlayIframe = null;
    lastOnOverlayDivReady = null;
  } // Compilation with errors (e.g. syntax error or missing modules).


  function showMessage(messages) {
    ensureOverlayDivExists(function (div) {
      // Make it look similar to our terminal.
      div.innerHTML = "<span style=\"color: #".concat(colors.red, "\">Failed to compile.</span><br><br>").concat(ansiHTML(entities.encode(messages[0])));
    });
  }

  module.exports = {
    clear: clear,
    showMessage: showMessage
  };

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/socket.js":
  /*!*********************************************!*\
    !*** (webpack)-dev-server/client/socket.js ***!
    \*********************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  /* WEBPACK VAR INJECTION */(function(__webpack_dev_server_client__) {
  /* global __webpack_dev_server_client__ */

  /* eslint-disable
    camelcase
  */
  // this SockJSClient is here as a default fallback, in case inline mode
  // is off or the client is not injected. This will be switched to
  // WebsocketClient when it becomes the default
  // important: the path to SockJSClient here is made to work in the 'client'
  // directory, but is updated via the webpack compilation when compiled from
  // the 'client-src' directory

  var Client = typeof __webpack_dev_server_client__ !== 'undefined' ? __webpack_dev_server_client__ : // eslint-disable-next-line import/no-unresolved
  __webpack_require__(/*! ./clients/SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
  var retries = 0;
  var client = null;

  var socket = function initSocket(url, handlers) {
    client = new Client(url);
    client.onOpen(function () {
      retries = 0;
    });
    client.onClose(function () {
      if (retries === 0) {
        handlers.close();
      } // Try to reconnect.


      client = null; // After 10 retries stop trying, to prevent logspam.

      if (retries <= 10) {
        // Exponentially increase timeout to reconnect.
        // Respectfully copied from the package `got`.
        // eslint-disable-next-line no-mixed-operators, no-restricted-properties
        var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
        retries += 1;
        setTimeout(function () {
          socket(url, handlers);
        }, retryInMs);
      }
    });
    client.onMessage(function (data) {
      var msg = JSON.parse(data);

      if (handlers[msg.type]) {
        handlers[msg.type](msg.data);
      }
    });
  };

  module.exports = socket;
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)-dev-server/client/clients/SockJSClient.js */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js")))

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js":
  /*!************************************************************!*\
    !*** (webpack)-dev-server/client/utils/createSocketUrl.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  /* global self */

  var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

  var getCurrentScriptSource = __webpack_require__(/*! ./getCurrentScriptSource */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");

  function createSocketUrl(resourceQuery, currentLocation) {
    var urlParts;

    if (typeof resourceQuery === 'string' && resourceQuery !== '') {
      // If this bundle is inlined, use the resource query to get the correct url.
      // format is like `?http://0.0.0.0:8096&sockPort=8097&sockHost=localhost`
      urlParts = url.parse(resourceQuery // strip leading `?` from query string to get a valid URL
      .substr(1) // replace first `&` with `?` to have a valid query string
      .replace('&', '?'), true);
    } else {
      // Else, get the url from the <script> this file was called with.
      var scriptHost = getCurrentScriptSource();
      urlParts = url.parse(scriptHost || '/', true, true);
    } // Use parameter to allow passing location in unit tests


    if (typeof currentLocation === 'string' && currentLocation !== '') {
      currentLocation = url.parse(currentLocation);
    } else {
      currentLocation = self.location;
    }

    return getSocketUrl(urlParts, currentLocation);
  }
  /*
   * Gets socket URL based on Script Source/Location
   * (scriptSrc: URL, location: URL) -> URL
   */


  function getSocketUrl(urlParts, loc) {
    var auth = urlParts.auth,
        query = urlParts.query;
    var hostname = urlParts.hostname,
        protocol = urlParts.protocol,
        port = urlParts.port;

    if (!port || port === '0') {
      port = loc.port;
    } // check ipv4 and ipv6 `all hostname`
    // why do we need this check?
    // hostname n/a for file protocol (example, when using electron, ionic)
    // see: https://github.com/webpack/webpack-dev-server/pull/384


    if ((hostname === '0.0.0.0' || hostname === '::') && loc.hostname && loc.protocol.indexOf('http') === 0) {
      hostname = loc.hostname;
    } // `hostname` can be empty when the script path is relative. In that case, specifying
    // a protocol would result in an invalid URL.
    // When https is used in the app, secure websockets are always necessary
    // because the browser doesn't accept non-secure websockets.


    if (hostname && hostname !== '127.0.0.1' && (loc.protocol === 'https:' || urlParts.hostname === '0.0.0.0')) {
      protocol = loc.protocol;
    } // all of these sock url params are optionally passed in through
    // resourceQuery, so we need to fall back to the default if
    // they are not provided


    var sockHost = query.sockHost || hostname;
    var sockPath = query.sockPath || '/sockjs-node';
    var sockPort = query.sockPort || port;

    if (sockPort === 'location') {
      sockPort = loc.port;
    }

    return url.format({
      protocol: protocol,
      auth: auth,
      hostname: sockHost,
      port: sockPort,
      // If sockPath is provided it'll be passed in via the resourceQuery as a
      // query param so it has to be parsed out of the querystring in order for the
      // client to open the socket to the correct location.
      pathname: sockPath
    });
  }

  module.exports = createSocketUrl;

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
  /*!*******************************************************************!*\
    !*** (webpack)-dev-server/client/utils/getCurrentScriptSource.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  function getCurrentScriptSource() {
    // `document.currentScript` is the most accurate way to find the current script,
    // but is not supported in all browsers.
    if (document.currentScript) {
      return document.currentScript.getAttribute('src');
    } // Fall back to getting all scripts in the document.


    var scriptElements = document.scripts || [];
    var currentScript = scriptElements[scriptElements.length - 1];

    if (currentScript) {
      return currentScript.getAttribute('src');
    } // Fail as there was no script to use.


    throw new Error('[WDS] Failed to get current script source.');
  }

  module.exports = getCurrentScriptSource;

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/utils/log.js":
  /*!************************************************!*\
    !*** (webpack)-dev-server/client/utils/log.js ***!
    \************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  var log = __webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js").getLogger('webpack-dev-server');

  var INFO = 'info';
  var WARN = 'warn';
  var ERROR = 'error';
  var DEBUG = 'debug';
  var TRACE = 'trace';
  var SILENT = 'silent'; // deprecated
  // TODO: remove these at major released
  // https://github.com/webpack/webpack-dev-server/pull/1825

  var WARNING = 'warning';
  var NONE = 'none'; // Set the default log level

  log.setDefaultLevel(INFO);

  function setLogLevel(level) {
    switch (level) {
      case INFO:
      case WARN:
      case ERROR:
      case DEBUG:
      case TRACE:
        log.setLevel(level);
        break;
      // deprecated

      case WARNING:
        // loglevel's warning name is different from webpack's
        log.setLevel('warn');
        break;
      // deprecated

      case NONE:
      case SILENT:
        log.disableAll();
        break;

      default:
        log.error("[WDS] Unknown clientLogLevel '".concat(level, "'"));
    }
  }

  module.exports = {
    log: log,
    setLogLevel: setLogLevel
  };

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
  /*!******************************************************!*\
    !*** (webpack)-dev-server/client/utils/reloadApp.js ***!
    \******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  /* global WorkerGlobalScope self */

  var _require = __webpack_require__(/*! ./log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
      log = _require.log;

  function reloadApp(_ref, _ref2) {
    var hotReload = _ref.hotReload,
        hot = _ref.hot,
        liveReload = _ref.liveReload;
    var isUnloading = _ref2.isUnloading,
        currentHash = _ref2.currentHash;

    if (isUnloading || !hotReload) {
      return;
    }

    if (hot) {
      log.info('[WDS] App hot update...');

      var hotEmitter = __webpack_require__(/*! webpack/hot/emitter */ "./node_modules/webpack/hot/emitter.js");

      hotEmitter.emit('webpackHotUpdate', currentHash);

      if (typeof self !== 'undefined' && self.window) {
        // broadcast update to window
        self.postMessage("webpackHotUpdate".concat(currentHash), '*');
      }
    } // allow refreshing the page only if liveReload isn't disabled
    else if (liveReload) {
        var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

        var intervalId = self.setInterval(function () {
          if (rootWindow.location.protocol !== 'about:') {
            // reload immediately if protocol is valid
            applyReload(rootWindow, intervalId);
          } else {
            rootWindow = rootWindow.parent;

            if (rootWindow.parent === rootWindow) {
              // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
              applyReload(rootWindow, intervalId);
            }
          }
        });
      }

    function applyReload(rootWindow, intervalId) {
      clearInterval(intervalId);
      log.info('[WDS] App updated. Reloading...');
      rootWindow.location.reload();
    }
  }

  module.exports = reloadApp;

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
  /*!********************************************************!*\
    !*** (webpack)-dev-server/client/utils/sendMessage.js ***!
    \********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  /* global __resourceQuery WorkerGlobalScope self */
  // Send messages to the outside, so plugins can consume it.

  function sendMsg(type, data) {
    if (typeof self !== 'undefined' && (typeof WorkerGlobalScope === 'undefined' || !(self instanceof WorkerGlobalScope))) {
      self.postMessage({
        type: "webpack".concat(type),
        data: data
      }, '*');
    }
  }

  module.exports = sendMsg;

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/node_modules/ansi-regex/index.js":
  /*!*************************************************************!*\
    !*** (webpack)-dev-server/node_modules/ansi-regex/index.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  module.exports = function () {
    return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
  };


  /***/ }),

  /***/ "./node_modules/webpack-dev-server/node_modules/strip-ansi/index.js":
  /*!*************************************************************!*\
    !*** (webpack)-dev-server/node_modules/strip-ansi/index.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var ansiRegex = __webpack_require__(/*! ansi-regex */ "./node_modules/webpack-dev-server/node_modules/ansi-regex/index.js")();

  module.exports = function (str) {
    return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
  };


  /***/ }),

  /***/ "./node_modules/webpack/buildin/global.js":
  /*!***********************************!*\
    !*** (webpack)/buildin/global.js ***!
    \***********************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  var g;

  // This works in non-strict mode
  g = (function() {
    return this;
  })();

  try {
    // This works if eval is allowed (see CSP)
    g = g || new Function("return this")();
  } catch (e) {
    // This works if the window reference is available
    if (typeof window === "object") g = window;
  }

  // g can still be undefined, but nothing to do about it...
  // We return undefined, instead of nothing here, so it's
  // easier to handle this case. if(!global) { ...}

  module.exports = g;


  /***/ }),

  /***/ "./node_modules/webpack/buildin/module.js":
  /*!***********************************!*\
    !*** (webpack)/buildin/module.js ***!
    \***********************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = function(module) {
    if (!module.webpackPolyfill) {
      module.deprecate = function() {};
      module.paths = [];
      // module.parent = undefined by default
      if (!module.children) module.children = [];
      Object.defineProperty(module, "loaded", {
        enumerable: true,
        get: function() {
          return module.l;
        }
      });
      Object.defineProperty(module, "id", {
        enumerable: true,
        get: function() {
          return module.i;
        }
      });
      module.webpackPolyfill = 1;
    }
    return module;
  };


  /***/ }),

  /***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
  /*!*************************************************!*\
    !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
    \*************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var map = {
    "./log": "./node_modules/webpack/hot/log.js"
  };


  function webpackContext(req) {
    var id = webpackContextResolve(req);
    return __webpack_require__(id);
  }
  function webpackContextResolve(req) {
    if(!__webpack_require__.o(map, req)) {
      var e = new Error("Cannot find module '" + req + "'");
      e.code = 'MODULE_NOT_FOUND';
      throw e;
    }
    return map[req];
  }
  webpackContext.keys = function webpackContextKeys() {
    return Object.keys(map);
  };
  webpackContext.resolve = webpackContextResolve;
  module.exports = webpackContext;
  webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

  /***/ }),

  /***/ "./node_modules/webpack/hot/dev-server.js":
  /*!***********************************!*\
    !*** (webpack)/hot/dev-server.js ***!
    \***********************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */
  /*globals window __webpack_hash__ */
  if (true) {
    var lastHash;
    var upToDate = function upToDate() {
      return lastHash.indexOf(__webpack_require__.h()) >= 0;
    };
    var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
    var check = function check() {
      module.hot
        .check(true)
        .then(function(updatedModules) {
          if (!updatedModules) {
            log("warning", "[HMR] Cannot find update. Need to do a full reload!");
            log(
              "warning",
              "[HMR] (Probably because of restarting the webpack-dev-server)"
            );
            window.location.reload();
            return;
          }

          if (!upToDate()) {
            check();
          }

          __webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

          if (upToDate()) {
            log("info", "[HMR] App is up to date.");
          }
        })
        .catch(function(err) {
          var status = module.hot.status();
          if (["abort", "fail"].indexOf(status) >= 0) {
            log(
              "warning",
              "[HMR] Cannot apply update. Need to do a full reload!"
            );
            log("warning", "[HMR] " + log.formatError(err));
            window.location.reload();
          } else {
            log("warning", "[HMR] Update failed: " + log.formatError(err));
          }
        });
    };
    var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
    hotEmitter.on("webpackHotUpdate", function(currentHash) {
      lastHash = currentHash;
      if (!upToDate() && module.hot.status() === "idle") {
        log("info", "[HMR] Checking for updates on the server...");
        check();
      }
    });
    log("info", "[HMR] Waiting for update signal from WDS...");
  } else {}


  /***/ }),

  /***/ "./node_modules/webpack/hot/emitter.js":
  /*!********************************!*\
    !*** (webpack)/hot/emitter.js ***!
    \********************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
  module.exports = new EventEmitter();


  /***/ }),

  /***/ "./node_modules/webpack/hot/log-apply-result.js":
  /*!*****************************************!*\
    !*** (webpack)/hot/log-apply-result.js ***!
    \*****************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */
  module.exports = function(updatedModules, renewedModules) {
    var unacceptedModules = updatedModules.filter(function(moduleId) {
      return renewedModules && renewedModules.indexOf(moduleId) < 0;
    });
    var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

    if (unacceptedModules.length > 0) {
      log(
        "warning",
        "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
      );
      unacceptedModules.forEach(function(moduleId) {
        log("warning", "[HMR]  - " + moduleId);
      });
    }

    if (!renewedModules || renewedModules.length === 0) {
      log("info", "[HMR] Nothing hot updated.");
    } else {
      log("info", "[HMR] Updated modules:");
      renewedModules.forEach(function(moduleId) {
        if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
          var parts = moduleId.split("!");
          log.groupCollapsed("info", "[HMR]  - " + parts.pop());
          log("info", "[HMR]  - " + moduleId);
          log.groupEnd("info");
        } else {
          log("info", "[HMR]  - " + moduleId);
        }
      });
      var numberIds = renewedModules.every(function(moduleId) {
        return typeof moduleId === "number";
      });
      if (numberIds)
        log(
          "info",
          "[HMR] Consider using the NamedModulesPlugin for module names."
        );
    }
  };


  /***/ }),

  /***/ "./node_modules/webpack/hot/log.js":
  /*!****************************!*\
    !*** (webpack)/hot/log.js ***!
    \****************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  var logLevel = "info";

  function dummy() {}

  function shouldLog(level) {
    var shouldLog =
      (logLevel === "info" && level === "info") ||
      (["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
      (["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
    return shouldLog;
  }

  function logGroup(logFn) {
    return function(level, msg) {
      if (shouldLog(level)) {
        logFn(msg);
      }
    };
  }

  module.exports = function(level, msg) {
    if (shouldLog(level)) {
      if (level === "info") {
        console.log(msg);
      } else if (level === "warning") {
        console.warn(msg);
      } else if (level === "error") {
        console.error(msg);
      }
    }
  };

  /* eslint-disable node/no-unsupported-features/node-builtins */
  var group = console.group || dummy;
  var groupCollapsed = console.groupCollapsed || dummy;
  var groupEnd = console.groupEnd || dummy;
  /* eslint-enable node/no-unsupported-features/node-builtins */

  module.exports.group = logGroup(group);

  module.exports.groupCollapsed = logGroup(groupCollapsed);

  module.exports.groupEnd = logGroup(groupEnd);

  module.exports.setLogLevel = function(level) {
    logLevel = level;
  };

  module.exports.formatError = function(err) {
    var message = err.message;
    var stack = err.stack;
    if (!stack) {
      return message;
    } else if (stack.indexOf(message) < 0) {
      return message + "\n" + stack;
    } else {
      return stack;
    }
  };


  /***/ }),

  /***/ "./src/charts/echarts/index.js":
  /*!*************************************!*\
    !*** ./src/charts/echarts/index.js ***!
    \*************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  const colorways = {
    rainbow: ['#e84439', '#eb642b', '#f49b21', '#109e68', '#0089cc', '#893f90', '#c2135b', '#f8c1b2', '#f6bb9d', '#fccc8e', '#92cba9', '#88bae5', '#c189bb', '#e4819b'],
    default: ['#6c120a', '#a21e25', '#cd2b2a', '#dc372d', '#ec6250', '#f6b0a0', '#fbd7cb', '#fce3dc'],
    sunflower: ['#7d4712', '#ba6b15', '#df8000', '#f7a838', '#fac47e', '#fedcab', '#fee7c1', '#feedd4'],
    marigold: ['#7a2e05', '#ac4622', '#cb5730', '#ee7644', '#f4a57c', '#facbad', '#fcdbbf', '#fde5d4'],
    rose: ['#65093d', '#8d0e56', '#9f1459', '#d12568', '#e05c86', '#f3a5b6', '#f6b8c1', '#f9cdd0'],
    lavendar: ['#42184c', '#632572', '#732c85', '#994d98', '#af73ae', '#cb98c4', '#deb5d6', '#ebcfe5'],
    bluebell: ['#0a3a64', '#00538e', '#1060a3', '#4397d3', '#77adde', '#a3c7eb', '#bcd4f0', '#d3e0f4'],
    leaf: ['#08492f', '#005b3e', '#00694a', '#3b8c62', '#74bf93', '#a2d1b0', '#b1d8bb', '#c5e1cb']
  }; // default echart options for DI charts

  const defaultOptions = {
    color: colorways.rainbow.concat(colorways.default),
    legend: {
      top: 10,
      textStyle: {
        fontFamily: 'Geomanist Regular,sans-serif'
      }
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontFamily: 'Geomanist Regular,sans-serif'
      }
    },
    toolbox: {
      showTitle: false,
      feature: {
        saveAsImage: {
          title: 'Save as image',
          pixelRatio: 2
        }
      },
      right: 20,
      tooltip: {
        show: true,
        textStyle: {
          fontFamily: 'Geomanist Regular,sans-serif',

          formatter(param) {
            return `<div>${param.title}</div>`; // user-defined DOM structure
          }

        }
      }
    },
    xAxis: {
      axisLabel: {
        fontFamily: 'Geomanist Regular,sans-serif',
        fontSize: 13
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      axisLabel: {
        fontFamily: 'Geomanist Regular,sans-serif',
        fontSize: 13
      },
      splitLine: {
        show: false
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  };
  /* harmony default export */ __webpack_exports__["default"] = (defaultOptions);

  /***/ }),

  /***/ "./src/index.js":
  /*!**********************!*\
    !*** ./src/index.js ***!
    \**********************/
  /*! no exports provided */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var core_js_modules_esnext_array_last_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/esnext.array.last-index */ "./node_modules/core-js/modules/esnext.array.last-index.js");
  /* harmony import */ var core_js_modules_esnext_array_last_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_array_last_index__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var core_js_modules_esnext_array_last_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/esnext.array.last-item */ "./node_modules/core-js/modules/esnext.array.last-item.js");
  /* harmony import */ var core_js_modules_esnext_array_last_item__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_array_last_item__WEBPACK_IMPORTED_MODULE_1__);
  /* harmony import */ var core_js_modules_esnext_composite_key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/esnext.composite-key */ "./node_modules/core-js/modules/esnext.composite-key.js");
  /* harmony import */ var core_js_modules_esnext_composite_key__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_composite_key__WEBPACK_IMPORTED_MODULE_2__);
  /* harmony import */ var core_js_modules_esnext_composite_symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/esnext.composite-symbol */ "./node_modules/core-js/modules/esnext.composite-symbol.js");
  /* harmony import */ var core_js_modules_esnext_composite_symbol__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_composite_symbol__WEBPACK_IMPORTED_MODULE_3__);
  /* harmony import */ var core_js_modules_esnext_map_delete_all__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/esnext.map.delete-all */ "./node_modules/core-js/modules/esnext.map.delete-all.js");
  /* harmony import */ var core_js_modules_esnext_map_delete_all__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_delete_all__WEBPACK_IMPORTED_MODULE_4__);
  /* harmony import */ var core_js_modules_esnext_map_every__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/esnext.map.every */ "./node_modules/core-js/modules/esnext.map.every.js");
  /* harmony import */ var core_js_modules_esnext_map_every__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_every__WEBPACK_IMPORTED_MODULE_5__);
  /* harmony import */ var core_js_modules_esnext_map_filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/esnext.map.filter */ "./node_modules/core-js/modules/esnext.map.filter.js");
  /* harmony import */ var core_js_modules_esnext_map_filter__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_filter__WEBPACK_IMPORTED_MODULE_6__);
  /* harmony import */ var core_js_modules_esnext_map_find__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/esnext.map.find */ "./node_modules/core-js/modules/esnext.map.find.js");
  /* harmony import */ var core_js_modules_esnext_map_find__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_find__WEBPACK_IMPORTED_MODULE_7__);
  /* harmony import */ var core_js_modules_esnext_map_find_key__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/esnext.map.find-key */ "./node_modules/core-js/modules/esnext.map.find-key.js");
  /* harmony import */ var core_js_modules_esnext_map_find_key__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_find_key__WEBPACK_IMPORTED_MODULE_8__);
  /* harmony import */ var core_js_modules_esnext_map_from__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/esnext.map.from */ "./node_modules/core-js/modules/esnext.map.from.js");
  /* harmony import */ var core_js_modules_esnext_map_from__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_from__WEBPACK_IMPORTED_MODULE_9__);
  /* harmony import */ var core_js_modules_esnext_map_group_by__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/esnext.map.group-by */ "./node_modules/core-js/modules/esnext.map.group-by.js");
  /* harmony import */ var core_js_modules_esnext_map_group_by__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_group_by__WEBPACK_IMPORTED_MODULE_10__);
  /* harmony import */ var core_js_modules_esnext_map_includes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/esnext.map.includes */ "./node_modules/core-js/modules/esnext.map.includes.js");
  /* harmony import */ var core_js_modules_esnext_map_includes__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_includes__WEBPACK_IMPORTED_MODULE_11__);
  /* harmony import */ var core_js_modules_esnext_map_key_by__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/esnext.map.key-by */ "./node_modules/core-js/modules/esnext.map.key-by.js");
  /* harmony import */ var core_js_modules_esnext_map_key_by__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_key_by__WEBPACK_IMPORTED_MODULE_12__);
  /* harmony import */ var core_js_modules_esnext_map_key_of__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/esnext.map.key-of */ "./node_modules/core-js/modules/esnext.map.key-of.js");
  /* harmony import */ var core_js_modules_esnext_map_key_of__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_key_of__WEBPACK_IMPORTED_MODULE_13__);
  /* harmony import */ var core_js_modules_esnext_map_map_keys__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/esnext.map.map-keys */ "./node_modules/core-js/modules/esnext.map.map-keys.js");
  /* harmony import */ var core_js_modules_esnext_map_map_keys__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_map_keys__WEBPACK_IMPORTED_MODULE_14__);
  /* harmony import */ var core_js_modules_esnext_map_map_values__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/esnext.map.map-values */ "./node_modules/core-js/modules/esnext.map.map-values.js");
  /* harmony import */ var core_js_modules_esnext_map_map_values__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_map_values__WEBPACK_IMPORTED_MODULE_15__);
  /* harmony import */ var core_js_modules_esnext_map_merge__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/esnext.map.merge */ "./node_modules/core-js/modules/esnext.map.merge.js");
  /* harmony import */ var core_js_modules_esnext_map_merge__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_merge__WEBPACK_IMPORTED_MODULE_16__);
  /* harmony import */ var core_js_modules_esnext_map_of__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/esnext.map.of */ "./node_modules/core-js/modules/esnext.map.of.js");
  /* harmony import */ var core_js_modules_esnext_map_of__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_of__WEBPACK_IMPORTED_MODULE_17__);
  /* harmony import */ var core_js_modules_esnext_map_reduce__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/esnext.map.reduce */ "./node_modules/core-js/modules/esnext.map.reduce.js");
  /* harmony import */ var core_js_modules_esnext_map_reduce__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_reduce__WEBPACK_IMPORTED_MODULE_18__);
  /* harmony import */ var core_js_modules_esnext_map_some__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/esnext.map.some */ "./node_modules/core-js/modules/esnext.map.some.js");
  /* harmony import */ var core_js_modules_esnext_map_some__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_some__WEBPACK_IMPORTED_MODULE_19__);
  /* harmony import */ var core_js_modules_esnext_map_update__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/esnext.map.update */ "./node_modules/core-js/modules/esnext.map.update.js");
  /* harmony import */ var core_js_modules_esnext_map_update__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_update__WEBPACK_IMPORTED_MODULE_20__);
  /* harmony import */ var core_js_modules_esnext_math_clamp__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/esnext.math.clamp */ "./node_modules/core-js/modules/esnext.math.clamp.js");
  /* harmony import */ var core_js_modules_esnext_math_clamp__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_clamp__WEBPACK_IMPORTED_MODULE_21__);
  /* harmony import */ var core_js_modules_esnext_math_deg_per_rad__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/esnext.math.deg-per-rad */ "./node_modules/core-js/modules/esnext.math.deg-per-rad.js");
  /* harmony import */ var core_js_modules_esnext_math_deg_per_rad__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_deg_per_rad__WEBPACK_IMPORTED_MODULE_22__);
  /* harmony import */ var core_js_modules_esnext_math_degrees__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/esnext.math.degrees */ "./node_modules/core-js/modules/esnext.math.degrees.js");
  /* harmony import */ var core_js_modules_esnext_math_degrees__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_degrees__WEBPACK_IMPORTED_MODULE_23__);
  /* harmony import */ var core_js_modules_esnext_math_fscale__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/esnext.math.fscale */ "./node_modules/core-js/modules/esnext.math.fscale.js");
  /* harmony import */ var core_js_modules_esnext_math_fscale__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_fscale__WEBPACK_IMPORTED_MODULE_24__);
  /* harmony import */ var core_js_modules_esnext_math_iaddh__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/esnext.math.iaddh */ "./node_modules/core-js/modules/esnext.math.iaddh.js");
  /* harmony import */ var core_js_modules_esnext_math_iaddh__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_iaddh__WEBPACK_IMPORTED_MODULE_25__);
  /* harmony import */ var core_js_modules_esnext_math_imulh__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/esnext.math.imulh */ "./node_modules/core-js/modules/esnext.math.imulh.js");
  /* harmony import */ var core_js_modules_esnext_math_imulh__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_imulh__WEBPACK_IMPORTED_MODULE_26__);
  /* harmony import */ var core_js_modules_esnext_math_isubh__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/esnext.math.isubh */ "./node_modules/core-js/modules/esnext.math.isubh.js");
  /* harmony import */ var core_js_modules_esnext_math_isubh__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_isubh__WEBPACK_IMPORTED_MODULE_27__);
  /* harmony import */ var core_js_modules_esnext_math_rad_per_deg__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! core-js/modules/esnext.math.rad-per-deg */ "./node_modules/core-js/modules/esnext.math.rad-per-deg.js");
  /* harmony import */ var core_js_modules_esnext_math_rad_per_deg__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_rad_per_deg__WEBPACK_IMPORTED_MODULE_28__);
  /* harmony import */ var core_js_modules_esnext_math_radians__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! core-js/modules/esnext.math.radians */ "./node_modules/core-js/modules/esnext.math.radians.js");
  /* harmony import */ var core_js_modules_esnext_math_radians__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_radians__WEBPACK_IMPORTED_MODULE_29__);
  /* harmony import */ var core_js_modules_esnext_math_scale__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! core-js/modules/esnext.math.scale */ "./node_modules/core-js/modules/esnext.math.scale.js");
  /* harmony import */ var core_js_modules_esnext_math_scale__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_scale__WEBPACK_IMPORTED_MODULE_30__);
  /* harmony import */ var core_js_modules_esnext_math_seeded_prng__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! core-js/modules/esnext.math.seeded-prng */ "./node_modules/core-js/modules/esnext.math.seeded-prng.js");
  /* harmony import */ var core_js_modules_esnext_math_seeded_prng__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_seeded_prng__WEBPACK_IMPORTED_MODULE_31__);
  /* harmony import */ var core_js_modules_esnext_math_signbit__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! core-js/modules/esnext.math.signbit */ "./node_modules/core-js/modules/esnext.math.signbit.js");
  /* harmony import */ var core_js_modules_esnext_math_signbit__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_signbit__WEBPACK_IMPORTED_MODULE_32__);
  /* harmony import */ var core_js_modules_esnext_math_umulh__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! core-js/modules/esnext.math.umulh */ "./node_modules/core-js/modules/esnext.math.umulh.js");
  /* harmony import */ var core_js_modules_esnext_math_umulh__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_umulh__WEBPACK_IMPORTED_MODULE_33__);
  /* harmony import */ var core_js_modules_esnext_number_from_string__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! core-js/modules/esnext.number.from-string */ "./node_modules/core-js/modules/esnext.number.from-string.js");
  /* harmony import */ var core_js_modules_esnext_number_from_string__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_number_from_string__WEBPACK_IMPORTED_MODULE_34__);
  /* harmony import */ var core_js_modules_esnext_observable__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! core-js/modules/esnext.observable */ "./node_modules/core-js/modules/esnext.observable.js");
  /* harmony import */ var core_js_modules_esnext_observable__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_observable__WEBPACK_IMPORTED_MODULE_35__);
  /* harmony import */ var core_js_modules_esnext_promise_try__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! core-js/modules/esnext.promise.try */ "./node_modules/core-js/modules/esnext.promise.try.js");
  /* harmony import */ var core_js_modules_esnext_promise_try__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_promise_try__WEBPACK_IMPORTED_MODULE_36__);
  /* harmony import */ var core_js_modules_esnext_reflect_define_metadata__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! core-js/modules/esnext.reflect.define-metadata */ "./node_modules/core-js/modules/esnext.reflect.define-metadata.js");
  /* harmony import */ var core_js_modules_esnext_reflect_define_metadata__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_define_metadata__WEBPACK_IMPORTED_MODULE_37__);
  /* harmony import */ var core_js_modules_esnext_reflect_delete_metadata__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! core-js/modules/esnext.reflect.delete-metadata */ "./node_modules/core-js/modules/esnext.reflect.delete-metadata.js");
  /* harmony import */ var core_js_modules_esnext_reflect_delete_metadata__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_delete_metadata__WEBPACK_IMPORTED_MODULE_38__);
  /* harmony import */ var core_js_modules_esnext_reflect_get_metadata__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! core-js/modules/esnext.reflect.get-metadata */ "./node_modules/core-js/modules/esnext.reflect.get-metadata.js");
  /* harmony import */ var core_js_modules_esnext_reflect_get_metadata__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_get_metadata__WEBPACK_IMPORTED_MODULE_39__);
  /* harmony import */ var core_js_modules_esnext_reflect_get_metadata_keys__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! core-js/modules/esnext.reflect.get-metadata-keys */ "./node_modules/core-js/modules/esnext.reflect.get-metadata-keys.js");
  /* harmony import */ var core_js_modules_esnext_reflect_get_metadata_keys__WEBPACK_IMPORTED_MODULE_40___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_get_metadata_keys__WEBPACK_IMPORTED_MODULE_40__);
  /* harmony import */ var core_js_modules_esnext_reflect_get_own_metadata__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! core-js/modules/esnext.reflect.get-own-metadata */ "./node_modules/core-js/modules/esnext.reflect.get-own-metadata.js");
  /* harmony import */ var core_js_modules_esnext_reflect_get_own_metadata__WEBPACK_IMPORTED_MODULE_41___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_get_own_metadata__WEBPACK_IMPORTED_MODULE_41__);
  /* harmony import */ var core_js_modules_esnext_reflect_get_own_metadata_keys__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! core-js/modules/esnext.reflect.get-own-metadata-keys */ "./node_modules/core-js/modules/esnext.reflect.get-own-metadata-keys.js");
  /* harmony import */ var core_js_modules_esnext_reflect_get_own_metadata_keys__WEBPACK_IMPORTED_MODULE_42___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_get_own_metadata_keys__WEBPACK_IMPORTED_MODULE_42__);
  /* harmony import */ var core_js_modules_esnext_reflect_has_metadata__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! core-js/modules/esnext.reflect.has-metadata */ "./node_modules/core-js/modules/esnext.reflect.has-metadata.js");
  /* harmony import */ var core_js_modules_esnext_reflect_has_metadata__WEBPACK_IMPORTED_MODULE_43___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_has_metadata__WEBPACK_IMPORTED_MODULE_43__);
  /* harmony import */ var core_js_modules_esnext_reflect_has_own_metadata__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! core-js/modules/esnext.reflect.has-own-metadata */ "./node_modules/core-js/modules/esnext.reflect.has-own-metadata.js");
  /* harmony import */ var core_js_modules_esnext_reflect_has_own_metadata__WEBPACK_IMPORTED_MODULE_44___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_has_own_metadata__WEBPACK_IMPORTED_MODULE_44__);
  /* harmony import */ var core_js_modules_esnext_reflect_metadata__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! core-js/modules/esnext.reflect.metadata */ "./node_modules/core-js/modules/esnext.reflect.metadata.js");
  /* harmony import */ var core_js_modules_esnext_reflect_metadata__WEBPACK_IMPORTED_MODULE_45___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_metadata__WEBPACK_IMPORTED_MODULE_45__);
  /* harmony import */ var core_js_modules_esnext_set_add_all__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! core-js/modules/esnext.set.add-all */ "./node_modules/core-js/modules/esnext.set.add-all.js");
  /* harmony import */ var core_js_modules_esnext_set_add_all__WEBPACK_IMPORTED_MODULE_46___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_add_all__WEBPACK_IMPORTED_MODULE_46__);
  /* harmony import */ var core_js_modules_esnext_set_delete_all__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! core-js/modules/esnext.set.delete-all */ "./node_modules/core-js/modules/esnext.set.delete-all.js");
  /* harmony import */ var core_js_modules_esnext_set_delete_all__WEBPACK_IMPORTED_MODULE_47___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_delete_all__WEBPACK_IMPORTED_MODULE_47__);
  /* harmony import */ var core_js_modules_esnext_set_difference__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! core-js/modules/esnext.set.difference */ "./node_modules/core-js/modules/esnext.set.difference.js");
  /* harmony import */ var core_js_modules_esnext_set_difference__WEBPACK_IMPORTED_MODULE_48___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_difference__WEBPACK_IMPORTED_MODULE_48__);
  /* harmony import */ var core_js_modules_esnext_set_every__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! core-js/modules/esnext.set.every */ "./node_modules/core-js/modules/esnext.set.every.js");
  /* harmony import */ var core_js_modules_esnext_set_every__WEBPACK_IMPORTED_MODULE_49___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_every__WEBPACK_IMPORTED_MODULE_49__);
  /* harmony import */ var core_js_modules_esnext_set_filter__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! core-js/modules/esnext.set.filter */ "./node_modules/core-js/modules/esnext.set.filter.js");
  /* harmony import */ var core_js_modules_esnext_set_filter__WEBPACK_IMPORTED_MODULE_50___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_filter__WEBPACK_IMPORTED_MODULE_50__);
  /* harmony import */ var core_js_modules_esnext_set_find__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! core-js/modules/esnext.set.find */ "./node_modules/core-js/modules/esnext.set.find.js");
  /* harmony import */ var core_js_modules_esnext_set_find__WEBPACK_IMPORTED_MODULE_51___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_find__WEBPACK_IMPORTED_MODULE_51__);
  /* harmony import */ var core_js_modules_esnext_set_from__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! core-js/modules/esnext.set.from */ "./node_modules/core-js/modules/esnext.set.from.js");
  /* harmony import */ var core_js_modules_esnext_set_from__WEBPACK_IMPORTED_MODULE_52___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_from__WEBPACK_IMPORTED_MODULE_52__);
  /* harmony import */ var core_js_modules_esnext_set_intersection__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! core-js/modules/esnext.set.intersection */ "./node_modules/core-js/modules/esnext.set.intersection.js");
  /* harmony import */ var core_js_modules_esnext_set_intersection__WEBPACK_IMPORTED_MODULE_53___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_intersection__WEBPACK_IMPORTED_MODULE_53__);
  /* harmony import */ var core_js_modules_esnext_set_is_disjoint_from__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! core-js/modules/esnext.set.is-disjoint-from */ "./node_modules/core-js/modules/esnext.set.is-disjoint-from.js");
  /* harmony import */ var core_js_modules_esnext_set_is_disjoint_from__WEBPACK_IMPORTED_MODULE_54___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_is_disjoint_from__WEBPACK_IMPORTED_MODULE_54__);
  /* harmony import */ var core_js_modules_esnext_set_is_subset_of__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! core-js/modules/esnext.set.is-subset-of */ "./node_modules/core-js/modules/esnext.set.is-subset-of.js");
  /* harmony import */ var core_js_modules_esnext_set_is_subset_of__WEBPACK_IMPORTED_MODULE_55___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_is_subset_of__WEBPACK_IMPORTED_MODULE_55__);
  /* harmony import */ var core_js_modules_esnext_set_is_superset_of__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! core-js/modules/esnext.set.is-superset-of */ "./node_modules/core-js/modules/esnext.set.is-superset-of.js");
  /* harmony import */ var core_js_modules_esnext_set_is_superset_of__WEBPACK_IMPORTED_MODULE_56___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_is_superset_of__WEBPACK_IMPORTED_MODULE_56__);
  /* harmony import */ var core_js_modules_esnext_set_join__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! core-js/modules/esnext.set.join */ "./node_modules/core-js/modules/esnext.set.join.js");
  /* harmony import */ var core_js_modules_esnext_set_join__WEBPACK_IMPORTED_MODULE_57___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_join__WEBPACK_IMPORTED_MODULE_57__);
  /* harmony import */ var core_js_modules_esnext_set_map__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! core-js/modules/esnext.set.map */ "./node_modules/core-js/modules/esnext.set.map.js");
  /* harmony import */ var core_js_modules_esnext_set_map__WEBPACK_IMPORTED_MODULE_58___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_map__WEBPACK_IMPORTED_MODULE_58__);
  /* harmony import */ var core_js_modules_esnext_set_of__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! core-js/modules/esnext.set.of */ "./node_modules/core-js/modules/esnext.set.of.js");
  /* harmony import */ var core_js_modules_esnext_set_of__WEBPACK_IMPORTED_MODULE_59___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_of__WEBPACK_IMPORTED_MODULE_59__);
  /* harmony import */ var core_js_modules_esnext_set_reduce__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! core-js/modules/esnext.set.reduce */ "./node_modules/core-js/modules/esnext.set.reduce.js");
  /* harmony import */ var core_js_modules_esnext_set_reduce__WEBPACK_IMPORTED_MODULE_60___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_reduce__WEBPACK_IMPORTED_MODULE_60__);
  /* harmony import */ var core_js_modules_esnext_set_some__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! core-js/modules/esnext.set.some */ "./node_modules/core-js/modules/esnext.set.some.js");
  /* harmony import */ var core_js_modules_esnext_set_some__WEBPACK_IMPORTED_MODULE_61___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_some__WEBPACK_IMPORTED_MODULE_61__);
  /* harmony import */ var core_js_modules_esnext_set_symmetric_difference__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! core-js/modules/esnext.set.symmetric-difference */ "./node_modules/core-js/modules/esnext.set.symmetric-difference.js");
  /* harmony import */ var core_js_modules_esnext_set_symmetric_difference__WEBPACK_IMPORTED_MODULE_62___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_symmetric_difference__WEBPACK_IMPORTED_MODULE_62__);
  /* harmony import */ var core_js_modules_esnext_set_union__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! core-js/modules/esnext.set.union */ "./node_modules/core-js/modules/esnext.set.union.js");
  /* harmony import */ var core_js_modules_esnext_set_union__WEBPACK_IMPORTED_MODULE_63___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_union__WEBPACK_IMPORTED_MODULE_63__);
  /* harmony import */ var core_js_modules_esnext_string_at__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! core-js/modules/esnext.string.at */ "./node_modules/core-js/modules/esnext.string.at.js");
  /* harmony import */ var core_js_modules_esnext_string_at__WEBPACK_IMPORTED_MODULE_64___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_string_at__WEBPACK_IMPORTED_MODULE_64__);
  /* harmony import */ var core_js_modules_esnext_string_code_points__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! core-js/modules/esnext.string.code-points */ "./node_modules/core-js/modules/esnext.string.code-points.js");
  /* harmony import */ var core_js_modules_esnext_string_code_points__WEBPACK_IMPORTED_MODULE_65___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_string_code_points__WEBPACK_IMPORTED_MODULE_65__);
  /* harmony import */ var core_js_modules_esnext_symbol_dispose__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! core-js/modules/esnext.symbol.dispose */ "./node_modules/core-js/modules/esnext.symbol.dispose.js");
  /* harmony import */ var core_js_modules_esnext_symbol_dispose__WEBPACK_IMPORTED_MODULE_66___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_symbol_dispose__WEBPACK_IMPORTED_MODULE_66__);
  /* harmony import */ var core_js_modules_esnext_symbol_observable__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! core-js/modules/esnext.symbol.observable */ "./node_modules/core-js/modules/esnext.symbol.observable.js");
  /* harmony import */ var core_js_modules_esnext_symbol_observable__WEBPACK_IMPORTED_MODULE_67___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_symbol_observable__WEBPACK_IMPORTED_MODULE_67__);
  /* harmony import */ var core_js_modules_esnext_symbol_pattern_match__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! core-js/modules/esnext.symbol.pattern-match */ "./node_modules/core-js/modules/esnext.symbol.pattern-match.js");
  /* harmony import */ var core_js_modules_esnext_symbol_pattern_match__WEBPACK_IMPORTED_MODULE_68___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_symbol_pattern_match__WEBPACK_IMPORTED_MODULE_68__);
  /* harmony import */ var core_js_modules_esnext_weak_map_delete_all__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! core-js/modules/esnext.weak-map.delete-all */ "./node_modules/core-js/modules/esnext.weak-map.delete-all.js");
  /* harmony import */ var core_js_modules_esnext_weak_map_delete_all__WEBPACK_IMPORTED_MODULE_69___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_map_delete_all__WEBPACK_IMPORTED_MODULE_69__);
  /* harmony import */ var core_js_modules_esnext_weak_map_from__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! core-js/modules/esnext.weak-map.from */ "./node_modules/core-js/modules/esnext.weak-map.from.js");
  /* harmony import */ var core_js_modules_esnext_weak_map_from__WEBPACK_IMPORTED_MODULE_70___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_map_from__WEBPACK_IMPORTED_MODULE_70__);
  /* harmony import */ var core_js_modules_esnext_weak_map_of__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! core-js/modules/esnext.weak-map.of */ "./node_modules/core-js/modules/esnext.weak-map.of.js");
  /* harmony import */ var core_js_modules_esnext_weak_map_of__WEBPACK_IMPORTED_MODULE_71___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_map_of__WEBPACK_IMPORTED_MODULE_71__);
  /* harmony import */ var core_js_modules_esnext_weak_set_add_all__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! core-js/modules/esnext.weak-set.add-all */ "./node_modules/core-js/modules/esnext.weak-set.add-all.js");
  /* harmony import */ var core_js_modules_esnext_weak_set_add_all__WEBPACK_IMPORTED_MODULE_72___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_set_add_all__WEBPACK_IMPORTED_MODULE_72__);
  /* harmony import */ var core_js_modules_esnext_weak_set_delete_all__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! core-js/modules/esnext.weak-set.delete-all */ "./node_modules/core-js/modules/esnext.weak-set.delete-all.js");
  /* harmony import */ var core_js_modules_esnext_weak_set_delete_all__WEBPACK_IMPORTED_MODULE_73___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_set_delete_all__WEBPACK_IMPORTED_MODULE_73__);
  /* harmony import */ var core_js_modules_esnext_weak_set_from__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! core-js/modules/esnext.weak-set.from */ "./node_modules/core-js/modules/esnext.weak-set.from.js");
  /* harmony import */ var core_js_modules_esnext_weak_set_from__WEBPACK_IMPORTED_MODULE_74___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_set_from__WEBPACK_IMPORTED_MODULE_74__);
  /* harmony import */ var core_js_modules_esnext_weak_set_of__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! core-js/modules/esnext.weak-set.of */ "./node_modules/core-js/modules/esnext.weak-set.of.js");
  /* harmony import */ var core_js_modules_esnext_weak_set_of__WEBPACK_IMPORTED_MODULE_75___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_set_of__WEBPACK_IMPORTED_MODULE_75__);
  /* harmony import */ var core_js_modules_web_immediate__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! core-js/modules/web.immediate */ "./node_modules/core-js/modules/web.immediate.js");
  /* harmony import */ var core_js_modules_web_immediate__WEBPACK_IMPORTED_MODULE_76___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_immediate__WEBPACK_IMPORTED_MODULE_76__);
  /* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! core-js/modules/web.url */ "./node_modules/core-js/modules/web.url.js");
  /* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_77___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_77__);
  /* harmony import */ var core_js_modules_web_url_to_json__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! core-js/modules/web.url.to-json */ "./node_modules/core-js/modules/web.url.to-json.js");
  /* harmony import */ var core_js_modules_web_url_to_json__WEBPACK_IMPORTED_MODULE_78___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_to_json__WEBPACK_IMPORTED_MODULE_78__);
  /* harmony import */ var core_js_modules_web_url_search_params__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! core-js/modules/web.url-search-params */ "./node_modules/core-js/modules/web.url-search-params.js");
  /* harmony import */ var core_js_modules_web_url_search_params__WEBPACK_IMPORTED_MODULE_79___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params__WEBPACK_IMPORTED_MODULE_79__);
  /* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js");
  /* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_80___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_80__);
  /* harmony import */ var _charts_echarts__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./charts/echarts */ "./src/charts/echarts/index.js");
  /* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./styles/styles.css */ "./src/styles/styles.css");
  /* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_82___default = /*#__PURE__*/__webpack_require__.n(_styles_styles_css__WEBPACK_IMPORTED_MODULE_82__);
  /* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./utils/data */ "./src/utils/data.js");
  /* harmony import */ var _widgets_filters__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./widgets/filters */ "./src/widgets/filters.js");
  /* harmony import */ var _widgets_pills__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./widgets/pills */ "./src/widgets/pills.js");





















































































   // import d3 from 'd3'; // eslint-disable-line import/no-unresolved
  // Your Code Goes Here i.e. functions

  const cleanData = data => data.map(d => {
    const clean = { ...d
    };
    clean.value = d['USD deflated'].trim() ? Number(d['USD deflated'].replace(',', '').replace(' ', '').trim()) : null;
    return clean;
  });

  const processData = (data, years, donor, channel) => {
    const filteredData = data.filter(d => d.Donor.trim() === donor && d['Delivery Channel'] === channel);
    const sortedData = years.map(year => filteredData.find(d => d.Year === year));
    return sortedData;
  };

  const renderChart = (chartNode, data, {
    donors,
    years,
    channels
  }) => {
    const chart = window.echarts.init(chartNode);
    const option = {
      legend: {
        show: false
      },
      xAxis: {
        type: 'category',
        data: years
      },
      yAxis: {
        type: 'value'
      },
      series: donors.filter(donor => donor !== 'EU Institutions').map(donor => ({
        name: donor,
        data: processData(data, years, donor, channels[0]).map(d => Number(d.value)),
        type: 'bar',
        stack: channels[0],
        emphasis: {
          focus: 'series'
        }
      }))
    };
    chart.setOption(deepmerge__WEBPACK_IMPORTED_MODULE_80___default()(_charts_echarts__WEBPACK_IMPORTED_MODULE_81__["default"], option));
    return chart;
  };
  /**
   * Run your code after the page has loaded
   */


  window.addEventListener('load', () => {
    window.DICharts.handler.addChart({
      className: 'dicharts--boilerplate-chart',
      echarts: {
        onAdd: chartNodes => {
          Array.prototype.forEach.call(chartNodes, chartNode => {
            const dichart = new window.DICharts.Chart(chartNode.parentElement);
            /**
             * ECharts - prefix all browsers global with window
             * i.e window.echarts - echarts won't work without it
             *
             * const chart = window.echarts.init(chartNode);
             */

            const csv = 'https://raw.githubusercontent.com/devinit/di-chart-boilerplate/gha/2021/funding-channels/public/assets/data/GHA/2021/funding-channels-interactive-data.csv';
            Object(_utils_data__WEBPACK_IMPORTED_MODULE_83__["default"])(csv).then(data => {
              const filterWrapper = Object(_widgets_filters__WEBPACK_IMPORTED_MODULE_84__["addFilterWrapper"])(chartNode); // extract unique values

              const donors = [...new Set(data.map(d => d.Donor))];
              const years = [...new Set(data.map(d => d.Year))];
              const channels = [...new Set(data.map(d => d['Delivery Channel']))]; // create UI elements

              const countryFilter = Object(_widgets_filters__WEBPACK_IMPORTED_MODULE_84__["addFilter"])({
                wrapper: filterWrapper,
                options: donors,
                allItemsLabel: 'All Donors',
                className: 'country-filter',
                label: 'Select Donor'
              });
              let activeChannel = channels[0];
              const channelFilter = Object(_widgets_filters__WEBPACK_IMPORTED_MODULE_84__["addFilter"])({
                wrapper: filterWrapper,
                options: channels,
                allItemsLabel: 'All Channels',
                className: 'channel-filter',
                label: 'Channel',
                defaultOption: activeChannel
              });
              const chart = renderChart(chartNode, cleanData(data), {
                donors,
                years,
                channels
              }); // initialise pill widget for the multi-select option

              const pillWidget = new _widgets_pills__WEBPACK_IMPORTED_MODULE_85__["default"]({
                wrapper: filterWrapper,
                colours: chart.getOption().color
              });

              if (pillWidget.pills.length) {
                chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
              }

              const updateChartForDonorSeries = (updatedData, activeDonors, channel) => {
                const cleanedData = cleanData(updatedData);
                chart.setOption({
                  legend: {
                    show: false
                  },
                  series: activeDonors.map(donor => ({
                    name: donor,
                    data: processData(cleanedData, years, donor, channel).map(d => Number(d.value)),
                    type: 'bar',
                    stack: channel,
                    emphasis: {
                      focus: 'series'
                    }
                  }))
                }, {
                  replaceMerge: ['series']
                });
              };

              const updateChartForChannelSeries = (updatedData, donor) => {
                const cleanedData = cleanData(updatedData);
                chart.setOption({
                  legend: {
                    show: true
                  },
                  series: channels.map(channel => ({
                    name: channel,
                    data: processData(cleanedData, years, donor, channel).map(d => Number(d.value)),
                    type: 'bar',
                    stack: donor,
                    emphasis: {
                      focus: 'series'
                    }
                  }))
                }, {
                  replaceMerge: ['series']
                });
              };
              /**
               * Event Listeners/Handlers
               * */


              countryFilter.addEventListener('change', event => {
                const {
                  value
                } = event.currentTarget;

                if (value !== '*') {
                  // if it's the first pill, append pill widget
                  if (!pillWidget.pillNames.length) {
                    chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
                  }

                  if (activeChannel === '*') {
                    pillWidget.removeAll();
                  }

                  pillWidget.add(value);
                } else {
                  pillWidget.removeAll();
                }
              });
              pillWidget.onAdd(value => {
                // filter data to return only the selected items
                const filteredData = value !== '*' ? data.filter(d => pillWidget.pillNames.includes(d.Donor)) : data;

                if (activeChannel === '*') {
                  updateChartForChannelSeries(filteredData, value);
                  return;
                }

                const selectedDonors = pillWidget.pillNames.length ? pillWidget.pillNames : donors;
                updateChartForDonorSeries(filteredData, selectedDonors, activeChannel);
              });
              pillWidget.onRemove(() => {
                const hasPills = !!pillWidget.pillNames.length;
                const filteredData = hasPills ? data.filter(d => pillWidget.pillNames.includes(d.Donor)) : data;

                if (activeChannel === '*') {
                  updateChartForChannelSeries(filteredData, pillWidget.pillNames[0] || donors[0]);
                  return;
                }

                const selectedDonors = hasPills ? pillWidget.pillNames : donors;
                updateChartForDonorSeries(filteredData, selectedDonors, activeChannel);
              });
              channelFilter.addEventListener('change', event => {
                const {
                  value: channel
                } = event.currentTarget;
                activeChannel = channel;

                if (channel === '*') {
                  pillWidget.removeAll();
                  pillWidget.disable();
                  const [firstDonor] = donors;
                  updateChartForChannelSeries(data, firstDonor);
                  countryFilter.value = firstDonor;
                  return;
                }

                pillWidget.enable();
                const selectedDonors = pillWidget.pillNames.length ? pillWidget.pillNames : donors;
                updateChartForDonorSeries(data, selectedDonors, activeChannel);
              });
              dichart.hideLoading();
            });
          });
        }
      }
    });
  });

  /***/ }),

  /***/ "./src/styles/styles.css":
  /*!*******************************!*\
    !*** ./src/styles/styles.css ***!
    \*******************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
              var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--11-1!../../node_modules/postcss-loader/src??postcss!./styles.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/styles/styles.css");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.i, content, '']];
              }

  var options = {};

  options.insert = "head";
  options.singleton = false;

  var update = api(content, options);


  if (true) {
    if (!content.locals || module.hot.invalidate) {
      var isEqualLocals = function isEqualLocals(a, b) {
    if (!a && b || a && !b) {
      return false;
    }

    var p;

    for (p in a) {
      if (a[p] !== b[p]) {
        return false;
      }
    }

    for (p in b) {
      if (!a[p]) {
        return false;
      }
    }

    return true;
  };
      var oldLocals = content.locals;

      module.hot.accept(
        /*! !../../node_modules/css-loader/dist/cjs.js??ref--11-1!../../node_modules/postcss-loader/src??postcss!./styles.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/styles/styles.css",
        function () {
          content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--11-1!../../node_modules/postcss-loader/src??postcss!./styles.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/styles/styles.css");

                content = content.__esModule ? content.default : content;

                if (typeof content === 'string') {
                  content = [[module.i, content, '']];
                }

                if (!isEqualLocals(oldLocals, content.locals)) {
                  module.hot.invalidate();

                  return;
                }

                oldLocals = content.locals;

                update(content);
        }
      )
    }

    module.hot.dispose(function() {
      update();
    });
  }

  module.exports = content.locals || {};

  /***/ }),

  /***/ "./src/utils/data.js":
  /*!***************************!*\
    !*** ./src/utils/data.js ***!
    \***************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  const fetchCSVData = url => new Promise(resolve => {
    window.d3.csv(url, data => resolve(data));
  });

  /* harmony default export */ __webpack_exports__["default"] = (fetchCSVData);

  /***/ }),

  /***/ "./src/widgets/filters.js":
  /*!********************************!*\
    !*** ./src/widgets/filters.js ***!
    \********************************/
  /*! exports provided: addFilterWrapper, createOption, addFilter */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFilterWrapper", function() { return addFilterWrapper; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createOption", function() { return createOption; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFilter", function() { return addFilter; });
  const addFilterWrapper = chartNode => {
    const filterWrapper = document.createElement('div');
    filterWrapper.classList.add(...['spotlight-banner', 'data-selector--wrapper']);
    chartNode.parentElement.insertBefore(filterWrapper, chartNode);
    return filterWrapper;
  };
  const createOption = (selectElement, option, selected = false) => {
    const optionElement = document.createElement('option');
    optionElement.value = typeof option === 'string' ? option : option.value;
    optionElement.text = typeof option === 'string' ? option : option.label;

    if (selected) {
      optionElement.selected = true;
    }

    selectElement.appendChild(optionElement);
  };
  const addFilter = ({
    wrapper,
    options,
    allItemsLabel,
    className,
    label,
    defaultOption = '*'
  }) => {
    const selectElement = document.createElement('select');
    selectElement.classList.add(...['data-selector', 'js-plotly-chart-data-selector', className]);

    if (allItemsLabel) {
      createOption(selectElement, {
        label: allItemsLabel,
        value: '*'
      }, defaultOption === '*');
    }

    options.forEach(option => createOption(selectElement, option, option === defaultOption));
    selectElement.classList.add('data-selector--active');

    if (label) {
      // create labelled filter
      const labelElement = document.createElement('label');
      labelElement.innerHTML = label;
      const selectWrapper = document.createElement('div');
      selectWrapper.classList.add('labelled-data-selector--wrapper');
      selectWrapper.appendChild(labelElement);
      selectWrapper.appendChild(selectElement);
      wrapper.appendChild(selectWrapper);
    } else {
      wrapper.appendChild(selectElement);
    }

    return selectElement;
  };

  /***/ }),

  /***/ "./src/widgets/pills.js":
  /*!******************************!*\
    !*** ./src/widgets/pills.js ***!
    \******************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  const createPill = (pillParent, pill) => {
    // create pill list item
    const pillElement = document.createElement('li');
    pillElement.classList.add('m-pills__item');
    pillElement.innerHTML = pill;
    pillParent.appendChild(pillElement); // create and add remove button

    const removeButton = document.createElement('button');
    removeButton.setAttribute('type', 'button');
    pillElement.appendChild(removeButton); // create button icon

    const icon = document.createElement('i');
    icon.setAttribute('role', 'presentation');
    icon.classList.add(...['ico', 'ico--20', 'ico-cross-slate']);
    removeButton.appendChild(icon);
    return [pillElement, removeButton];
  };

  const createWidget = () => {
    const widgetWrapper = document.createElement('div');
    widgetWrapper.classList.add('spotlight-banner');
    return widgetWrapper;
  };

  const addBorderColours = (elements, colours) => {
    Array.prototype.forEach.call(elements, (element, index) => {
      if (index < colours.length) {
        element.style.borderColor = colours[index]; // eslint-disable-line
      }

      element.style.borderWidth = '2px'; // eslint-disable-line
    });
  };

  function PillWidget(options) {
    let enabled = true;
    const widget = {
      pillNames: options.pills || [],
      onAddListener: options.onAdd,
      onRemoveListener: options.onRemove,
      widget: null,
      pills: [],
      colours: options.colours || [],

      init() {
        this.widget = createWidget();

        if (this.pillNames && this.pillNames.length) {
          this.pillNames.forEach(pillName => this.add(pillName, {
            allowDuplicate: true
          }));
        }
      },

      add(pillName, extra = {}) {
        if (!this.isEnabled() || !extra.allowDuplicate && this.pillNames.includes(pillName)) return;
        this.pillNames.push(pillName); // create pill button

        const [pill, button] = createPill(this.widget, pillName);
        this.pills.push(pill);
        button.addEventListener('click', event => {
          if (!this.isEnabled()) return;
          const parent = event.currentTarget.parentElement;

          if (parent) {
            this.remove(parent.innerText);
          }
        });

        if (this.onAddListener) {
          this.onAddListener(pillName);
        }

        addBorderColours(this.pills, this.colours);
      },

      remove(pillName) {
        if (!enabled) return;
        const index = this.pillNames.indexOf(pillName);
        this.pillNames = this.pillNames.filter(p => p !== pillName);
        const pill = this.pills[index];
        this.pills = this.pills.filter((p, _index) => _index !== index);
        pill.remove();

        if (this.onRemoveListener) {
          this.onRemoveListener(pillName);
        }

        addBorderColours(this.pills, this.colours);
      },

      onAdd(onAddListener) {
        this.onAddListener = onAddListener;
      },

      onRemove(onRemoveListener) {
        this.onRemoveListener = onRemoveListener;
      },

      removeAll() {
        this.pillNames = [];
        this.pills.forEach(button => button.remove());
        this.pills = [];

        if (this.onRemoveListener) {
          this.onRemoveListener();
        }
      },

      enable() {
        enabled = true;
      },

      disable() {
        enabled = false;
      },

      isEnabled() {
        return enabled;
      }

    };
    widget.init();
    return widget;
  }

  /* harmony default export */ __webpack_exports__["default"] = (PillWidget);

  /***/ }),

  /***/ 1:
  /*!***********************************************************************************************************************************!*\
    !*** multi (webpack)-dev-server/client?http://localhost (webpack)/hot/dev-server.js (webpack)-dev-server/client?/ ./src/index.js ***!
    \***********************************************************************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  __webpack_require__(/*! /Users/magezi/Documents/Git/di-chart-boilerplate/node_modules/webpack-dev-server/client/index.js?http://localhost */"./node_modules/webpack-dev-server/client/index.js?http://localhost");
  __webpack_require__(/*! /Users/magezi/Documents/Git/di-chart-boilerplate/node_modules/webpack/hot/dev-server.js */"./node_modules/webpack/hot/dev-server.js");
  __webpack_require__(/*! /Users/magezi/Documents/Git/di-chart-boilerplate/node_modules/webpack-dev-server/client/index.js?/ */"./node_modules/webpack-dev-server/client/index.js?/");
  module.exports = __webpack_require__(/*! /Users/magezi/Documents/Git/di-chart-boilerplate/src/index.js */"./src/index.js");


  /***/ })

  },[[1,"runtime"]]]);
