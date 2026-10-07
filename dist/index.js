var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// vendor/base64-js/index.js
var require_base64_js = __commonJS({
  "vendor/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b642) {
      var len2 = b642.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b642.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b642) {
      var lens = getLens(b642);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b642, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b642) {
      var tmp;
      var lens = getLens(b642);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b642, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b642.charCodeAt(i2)] << 18 | revLookup[b642.charCodeAt(i2 + 1)] << 12 | revLookup[b642.charCodeAt(i2 + 2)] << 6 | revLookup[b642.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b642.charCodeAt(i2)] << 2 | revLookup[b642.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b642.charCodeAt(i2)] << 10 | revLookup[b642.charCodeAt(i2 + 1)] << 4 | revLookup[b642.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// vendor/ieee754/index.js
var require_ieee754 = __commonJS({
  "vendor/ieee754/index.js"(exports) {
    "use strict";
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      let e, m;
      const eLen = nBytes * 8 - mLen - 1;
      const eMax = (1 << eLen) - 1;
      const eBias = eMax >> 1;
      let nBits = -7;
      let i = isLE ? nBytes - 1 : 0;
      const d = isLE ? -1 : 1;
      let s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      while (nBits > 0) {
        e = e * 256 + buffer[offset + i];
        i += d;
        nBits -= 8;
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      while (nBits > 0) {
        m = m * 256 + buffer[offset + i];
        i += d;
        nBits -= 8;
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      let e, m, c;
      let eLen = nBytes * 8 - mLen - 1;
      const eMax = (1 << eLen) - 1;
      const eBias = eMax >> 1;
      const rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      let i = isLE ? 0 : nBytes - 1;
      const d = isLE ? 1 : -1;
      const s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      while (mLen >= 8) {
        buffer[offset + i] = m & 255;
        i += d;
        m /= 256;
        mLen -= 8;
      }
      e = e << mLen | m;
      eLen += mLen;
      while (eLen > 0) {
        buffer[offset + i] = e & 255;
        i += d;
        e /= 256;
        eLen -= 8;
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// vendor/buffer/index.js
var require_buffer = __commonJS({
  "vendor/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer12;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    var K_STRING_MAX_LENGTH = (1 << 28) - 16;
    exports.kStringMaxLength = K_STRING_MAX_LENGTH;
    exports.constants = {
      MAX_LENGTH: K_MAX_LENGTH,
      MAX_STRING_LENGTH: K_STRING_MAX_LENGTH
    };
    exports.Blob = typeof Blob !== "undefined" ? Blob : void 0;
    exports.File = typeof File !== "undefined" ? File : void 0;
    exports.atob = typeof atob !== "undefined" ? atob : void 0;
    exports.btoa = typeof btoa !== "undefined" ? btoa : void 0;
    Buffer12.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer12.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer12.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer12.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer12.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer12.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer12.prototype);
      return buf;
    }
    function Buffer12(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer12.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer12.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer12.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer12.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer12.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer12, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer12.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer12.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer12.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer12.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer12.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer12.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer12.alloc(+length);
    }
    Buffer12.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer12.prototype;
    };
    Buffer12.compare = function compare2(a, b) {
      if (!isInstance(a, Uint8Array) || !isInstance(b, Uint8Array)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b) return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer12.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer12.concat = function concat2(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer12.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer12.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        const buf = list[i];
        if (!isInstance(buf, Uint8Array)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (pos + buf.length > buffer.length) {
          buffer.set(buf.subarray(0, buffer.length - pos), pos);
          break;
        }
        buffer.set(buf, pos);
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof SharedArrayBuffer !== "undefined" && isInstance(string, SharedArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes2(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes2(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer12.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer12.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer12.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer12.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer12.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer12.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer12.prototype.toLocaleString = Buffer12.prototype.toString;
    Buffer12.prototype.equals = function equals(b) {
      if (this === b) return true;
      return Buffer12.compare(this, b) === 0;
    };
    Buffer12.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer12.prototype[customInspectSymbol] = Buffer12.prototype.inspect;
    }
    Buffer12.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (!isInstance(target, Uint8Array)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      for (let i = 0; i < len; ++i) {
        if (this[thisStart + i] !== target[start + i]) {
          x = this[thisStart + i];
          y = target[start + i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer12.from(val, encoding);
      }
      if (Buffer12.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer12.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer12.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer12.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen >>> 1) {
        length = strLen >>> 1;
      }
      for (let i = 0; i < length; ++i) {
        const a = string.charCodeAt(i * 2 + 0);
        const b = string.charCodeAt(i * 2 + 1);
        const hi = hexCharValueTable[a & 127];
        const lo = hexCharValueTable[b & 127];
        if ((a | b | hi | lo) & ~127) {
          return i;
        }
        buf[offset + i] = hi << 4 | lo;
      }
      return length;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes2(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer12.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer12.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer12.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer12.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer12.prototype.readUintLE = Buffer12.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer12.prototype.readUintBE = Buffer12.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer12.prototype.readUint8 = Buffer12.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer12.prototype.readUint16LE = Buffer12.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer12.prototype.readUint16BE = Buffer12.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer12.prototype.readUint32LE = Buffer12.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer12.prototype.readUint32BE = Buffer12.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer12.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer12.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer12.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer12.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer12.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer12.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer12.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer12.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer12.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer12.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer12.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer12.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer12.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer12.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer12.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer12.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer12.prototype.writeUintLE = Buffer12.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer12.prototype.writeUintBE = Buffer12.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer12.prototype.writeUint8 = Buffer12.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer12.prototype.writeUint16LE = Buffer12.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer12.prototype.writeUint16BE = Buffer12.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer12.prototype.writeUint32LE = Buffer12.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer12.prototype.writeUint32BE = Buffer12.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer12.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer12.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer12.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer12.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer12.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer12.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer12.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer12.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer12.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer12.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer12.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer12.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer12.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer12.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer12.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer12.prototype.copy = function copy(target, targetStart, start, end) {
      if (!isInstance(target, Uint8Array)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer12.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer12.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = isInstance(val, Uint8Array) ? val : Buffer12.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      function NodeError() {
        const err = new Base(getMessage.apply(null, arguments));
        Object.setPrototypeOf(err, NodeError.prototype);
        err.code = sym;
        err.name = `${err.name} [${sym}]`;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(err, NodeError);
        }
        err.stack;
        delete err.name;
        return err;
      }
      Object.setPrototypeOf(NodeError.prototype, Base.prototype);
      Object.setPrototypeOf(NodeError, Base);
      NodeError.prototype.toString = function toString() {
        return `${this.name} [${sym}]: ${this.message}`;
      };
      errors[sym] = NodeError;
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes2(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name || type === Uint8Array && Buffer12.isBuffer(obj);
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = (function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    })();
    var hexCharValueTable = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ];
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// src/lib/herald.ts
var import_buffer10 = __toESM(require_buffer(), 1);

// vendor/noble-hashes/src/crypto.ts
var crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

// vendor/noble-hashes/src/utils.ts
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0) throw new Error("positive integer expected, got " + n);
}
function abytes(b, ...lengths) {
  if (!isBytes(b)) throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function ahash(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash should be wrapped by utils.createHasher");
  anumber(h.outputLen);
  anumber(h.blockLen);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed) throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished) throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
var hasHexBuiltin = /* @__PURE__ */ (() => (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
var hexes = /* @__PURE__ */ Array.from(
  { length: 256 },
  (_, i) => i.toString(16).padStart(2, "0")
);
function bytesToHex(bytes) {
  abytes(bytes);
  if (hasHexBuiltin) return bytes.toHex();
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes[bytes[i]];
  }
  return hex;
}
var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
  if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0;
  if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10);
  if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10);
  return;
}
function hexToBytes(hex) {
  if (typeof hex !== "string") throw new Error("hex string expected, got " + typeof hex);
  if (hasHexBuiltin) return Uint8Array.fromHex(hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2) throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
}
var nextTick = async () => {
};
async function asyncLoop(iters, tick, cb) {
  let ts = Date.now();
  for (let i = 0; i < iters; i++) {
    cb(i);
    const diff = Date.now() - ts;
    if (diff >= 0 && diff < tick) continue;
    await nextTick();
    ts += diff;
  }
}
function utf8ToBytes(str) {
  if (typeof str !== "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string") data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function kdfInputToBytes(data) {
  if (typeof data === "string") data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad);
    pad += a.length;
  }
  return res;
}
function checkOpts(defaults, opts) {
  if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
    throw new Error("options should be object or undefined");
  const merged = Object.assign(defaults, opts);
  return merged;
}
var Hash = class {
};
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto2 && typeof crypto2.getRandomValues === "function") {
    return crypto2.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto2 && typeof crypto2.randomBytes === "function") {
    return Uint8Array.from(crypto2.randomBytes(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}

// vendor/noble-hashes/src/_md.ts
function setBigUint64(view, byteOffset, value, isLE) {
  if (typeof view.setBigUint64 === "function") return view.setBigUint64(byteOffset, value, isLE);
  const _32n = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE ? 4 : 0;
  const l = isLE ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE);
  view.setUint32(byteOffset + l, wl, isLE);
}
function Chi(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
var HashMD = class extends Hash {
  blockLen;
  outputLen;
  padOffset;
  isLE;
  // For partial updates less than block size
  buffer;
  view;
  finished = false;
  length = 0;
  pos = 0;
  destroyed = false;
  constructor(blockLen, outputLen, padOffset, isLE) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen) this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++) buffer[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length) throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++) oview.setUint32(4 * i, state[i], isLE);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to ||= new this.constructor();
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (length % blockLen) to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);

// vendor/noble-hashes/src/_u64.ts
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);

// vendor/noble-hashes/src/sha2.ts
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA256 = class extends HashMD {
  // We cannot use array here since array allows indexing by variable
  // which means optimizer/compiler cannot use registers.
  A = SHA256_IV[0] | 0;
  B = SHA256_IV[1] | 0;
  C = SHA256_IV[2] | 0;
  D = SHA256_IV[3] | 0;
  E = SHA256_IV[4] | 0;
  F = SHA256_IV[5] | 0;
  G = SHA256_IV[6] | 0;
  H = SHA256_IV[7] | 0;
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4) SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var sha256 = /* @__PURE__ */ createHasher(() => new SHA256());

// vendor/noble-hashes/src/sha256.ts
var sha2562 = sha256;

// vendor/tlock-js/src/drand/timelock-encrypter.ts
var import_buffer3 = __toESM(require_buffer(), 1);

// vendor/noble-curves/src/utils.ts
var _0n = /* @__PURE__ */ BigInt(0);
var _1n = /* @__PURE__ */ BigInt(1);
function _abool2(value, title = "") {
  if (typeof value !== "boolean") {
    const prefix = title && `"${title}"`;
    throw new Error(prefix + "expected boolean, got type=" + typeof value);
  }
  return value;
}
function _abytes2(value, length, title = "") {
  const bytes = isBytes(value);
  const len = value?.length;
  const needsLen = length !== void 0;
  if (!bytes || needsLen && len !== length) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value}`;
    throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value;
}
function hexToNumber(hex) {
  if (typeof hex !== "string") throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n : BigInt("0x" + hex);
}
function bytesToNumberBE(bytes) {
  return hexToNumber(bytesToHex(bytes));
}
function bytesToNumberLE(bytes) {
  abytes(bytes);
  return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE(n, len) {
  return hexToBytes(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n, len) {
  return numberToBytesBE(n, len).reverse();
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes(hex);
    } catch (e) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
    }
  } else if (isBytes(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
}
var isPosBig = (n) => typeof n === "bigint" && _0n <= n;
function inRange(n, min, max) {
  return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
function bitLen(n) {
  let len;
  for (len = 0; n > _0n; n >>= _1n, len += 1) ;
  return len;
}
function bitGet(n, pos) {
  return n >> BigInt(pos) & _1n;
}
var bitMask = (n) => (_1n << BigInt(n)) - _1n;
function isHash(val) {
  return typeof val === "function" && Number.isSafeInteger(val.outputLen);
}
function _validateObject(object, fields, optFields = {}) {
  if (!object || typeof object !== "object") throw new Error("expected valid options object");
  function checkField(fieldName, expectedType, isOpt) {
    const val = object[fieldName];
    if (isOpt && val === void 0) return;
    const current = typeof val;
    if (current !== expectedType || val === null)
      throw new Error(`param "${fieldName}" is invalid: expected ${expectedType}, got ${current}`);
  }
  Object.entries(fields).forEach(([k, v]) => checkField(k, v, false));
  Object.entries(optFields).forEach(([k, v]) => checkField(k, v, true));
}
var notImplemented = () => {
  throw new Error("not implemented");
};
function memoized(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0) return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}

// vendor/noble-curves/src/abstract/modular.ts
var _0n2 = BigInt(0);
var _1n2 = BigInt(1);
var _2n = /* @__PURE__ */ BigInt(2);
var _3n = /* @__PURE__ */ BigInt(3);
var _4n = /* @__PURE__ */ BigInt(4);
var _5n = /* @__PURE__ */ BigInt(5);
var _7n = /* @__PURE__ */ BigInt(7);
var _8n = /* @__PURE__ */ BigInt(8);
var _9n = /* @__PURE__ */ BigInt(9);
var _16n = /* @__PURE__ */ BigInt(16);
function mod(a, b) {
  const result = a % b;
  return result >= _0n2 ? result : b + result;
}
function invert(number, modulo) {
  if (number === _0n2) throw new Error("invert: expected non-zero number");
  if (modulo <= _0n2) throw new Error("invert: expected positive modulus, got " + modulo);
  let a = mod(number, modulo);
  let b = modulo;
  let x = _0n2, y = _1n2, u = _1n2, v = _0n2;
  while (a !== _0n2) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n;
  }
  const gcd = b;
  if (gcd !== _1n2) throw new Error("invert: does not exist");
  return mod(x, modulo);
}
function assertIsSquare(Fp3, root, n) {
  if (!Fp3.eql(Fp3.sqr(root), n)) throw new Error("Cannot find square root");
}
function sqrt3mod4(Fp3, n) {
  const p1div4 = (Fp3.ORDER + _1n2) / _4n;
  const root = Fp3.pow(n, p1div4);
  assertIsSquare(Fp3, root, n);
  return root;
}
function sqrt5mod8(Fp3, n) {
  const p5div8 = (Fp3.ORDER - _5n) / _8n;
  const n2 = Fp3.mul(n, _2n);
  const v = Fp3.pow(n2, p5div8);
  const nv = Fp3.mul(n, v);
  const i = Fp3.mul(Fp3.mul(nv, _2n), v);
  const root = Fp3.mul(nv, Fp3.sub(i, Fp3.ONE));
  assertIsSquare(Fp3, root, n);
  return root;
}
function sqrt9mod16(P) {
  const Fp_ = Field(P);
  const tn = tonelliShanks(P);
  const c1 = tn(Fp_, Fp_.neg(Fp_.ONE));
  const c2 = tn(Fp_, c1);
  const c3 = tn(Fp_, Fp_.neg(c1));
  const c4 = (P + _7n) / _16n;
  return (Fp3, n) => {
    let tv1 = Fp3.pow(n, c4);
    let tv2 = Fp3.mul(tv1, c1);
    const tv3 = Fp3.mul(tv1, c2);
    const tv4 = Fp3.mul(tv1, c3);
    const e1 = Fp3.eql(Fp3.sqr(tv2), n);
    const e2 = Fp3.eql(Fp3.sqr(tv3), n);
    tv1 = Fp3.cmov(tv1, tv2, e1);
    tv2 = Fp3.cmov(tv4, tv3, e2);
    const e3 = Fp3.eql(Fp3.sqr(tv2), n);
    const root = Fp3.cmov(tv1, tv2, e3);
    assertIsSquare(Fp3, root, n);
    return root;
  };
}
function tonelliShanks(P) {
  if (P < _3n) throw new Error("sqrt is not defined for small field");
  let Q = P - _1n2;
  let S = 0;
  while (Q % _2n === _0n2) {
    Q /= _2n;
    S++;
  }
  let Z = _2n;
  const _Fp = Field(P);
  while (FpLegendre(_Fp, Z) === 1) {
    if (Z++ > 1e3) throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S === 1) return sqrt3mod4;
  let cc = _Fp.pow(Z, Q);
  const Q1div2 = (Q + _1n2) / _2n;
  return function tonelliSlow(Fp3, n) {
    if (Fp3.is0(n)) return n;
    if (FpLegendre(Fp3, n) !== 1) throw new Error("Cannot find square root");
    let M = S;
    let c = Fp3.mul(Fp3.ONE, cc);
    let t = Fp3.pow(n, Q);
    let R = Fp3.pow(n, Q1div2);
    while (!Fp3.eql(t, Fp3.ONE)) {
      if (Fp3.is0(t)) return Fp3.ZERO;
      let i = 1;
      let t_tmp = Fp3.sqr(t);
      while (!Fp3.eql(t_tmp, Fp3.ONE)) {
        i++;
        t_tmp = Fp3.sqr(t_tmp);
        if (i === M) throw new Error("Cannot find square root");
      }
      const exponent = _1n2 << BigInt(M - i - 1);
      const b = Fp3.pow(c, exponent);
      M = i;
      c = Fp3.sqr(b);
      t = Fp3.mul(t, c);
      R = Fp3.mul(R, b);
    }
    return R;
  };
}
function FpSqrt(P) {
  if (P % _4n === _3n) return sqrt3mod4;
  if (P % _8n === _5n) return sqrt5mod8;
  if (P % _16n === _9n) return sqrt9mod16(P);
  return tonelliShanks(P);
}
var FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "number",
    BITS: "number"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  _validateObject(field, opts);
  return field;
}
function FpPow(Fp3, num, power) {
  if (power < _0n2) throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n2) return Fp3.ONE;
  if (power === _1n2) return num;
  let p = Fp3.ONE;
  let d = num;
  while (power > _0n2) {
    if (power & _1n2) p = Fp3.mul(p, d);
    d = Fp3.sqr(d);
    power >>= _1n2;
  }
  return p;
}
function FpInvertBatch(Fp3, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp3.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num, i) => {
    if (Fp3.is0(num)) return acc;
    inverted[i] = acc;
    return Fp3.mul(acc, num);
  }, Fp3.ONE);
  const invertedAcc = Fp3.inv(multipliedAcc);
  nums.reduceRight((acc, num, i) => {
    if (Fp3.is0(num)) return acc;
    inverted[i] = Fp3.mul(acc, inverted[i]);
    return Fp3.mul(acc, num);
  }, invertedAcc);
  return inverted;
}
function FpLegendre(Fp3, n) {
  const p1mod2 = (Fp3.ORDER - _1n2) / _2n;
  const powered = Fp3.pow(n, p1mod2);
  const yes = Fp3.eql(powered, Fp3.ONE);
  const zero = Fp3.eql(powered, Fp3.ZERO);
  const no = Fp3.eql(powered, Fp3.neg(Fp3.ONE));
  if (!yes && !zero && !no) throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero ? 0 : -1;
}
function nLength(n, nBitLength) {
  if (nBitLength !== void 0) anumber(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLenOrOpts, isLE = false, opts = {}) {
  if (ORDER <= _0n2) throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  let _nbitLength = void 0;
  let _sqrt = void 0;
  let modFromBytes = false;
  let allowedLengths = void 0;
  if (typeof bitLenOrOpts === "object" && bitLenOrOpts != null) {
    if (opts.sqrt || isLE) throw new Error("cannot specify opts in two arguments");
    const _opts = bitLenOrOpts;
    if (_opts.BITS) _nbitLength = _opts.BITS;
    if (_opts.sqrt) _sqrt = _opts.sqrt;
    if (typeof _opts.isLE === "boolean") isLE = _opts.isLE;
    if (typeof _opts.modFromBytes === "boolean") modFromBytes = _opts.modFromBytes;
    allowedLengths = _opts.allowedLengths;
  } else {
    if (typeof bitLenOrOpts === "number") _nbitLength = bitLenOrOpts;
    if (opts.sqrt) _sqrt = opts.sqrt;
  }
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, _nbitLength);
  if (BYTES > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f = Object.freeze({
    ORDER,
    isLE,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n2,
    ONE: _1n2,
    allowedLengths,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num);
      return _0n2 <= num && num < ORDER;
    },
    is0: (num) => num === _0n2,
    // is valid and invertible
    isValidNot0: (num) => !f.is0(num) && f.isValid(num),
    isOdd: (num) => (num & _1n2) === _1n2,
    neg: (num) => mod(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod(num * num, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f, num, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: _sqrt || ((n) => {
      if (!sqrtP) sqrtP = FpSqrt(ORDER);
      return sqrtP(f, n);
    }),
    toBytes: (num) => isLE ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes, skipValidation = true) => {
      if (allowedLengths) {
        if (!allowedLengths.includes(bytes.length) || bytes.length > BYTES) {
          throw new Error(
            "Field.fromBytes: expected " + allowedLengths + " bytes, got " + bytes.length
          );
        }
        const padded = new Uint8Array(BYTES);
        padded.set(bytes, isLE ? 0 : padded.length - bytes.length);
        bytes = padded;
      }
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      let scalar = isLE ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
      if (modFromBytes) scalar = mod(scalar, ORDER);
      if (!skipValidation) {
        if (!f.isValid(scalar)) throw new Error("invalid field element: outside of range 0..ORDER");
      }
      return scalar;
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (lst) => FpInvertBatch(f, lst),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (a, b, c) => c ? b : a
  });
  return Object.freeze(f);
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint") throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length = getFieldBytesLength(fieldOrder);
  return length + Math.ceil(length / 2);
}
function mapHashToField(key, fieldOrder, isLE = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num = isLE ? bytesToNumberLE(key) : bytesToNumberBE(key);
  const reduced = mod(num, fieldOrder - _1n2) + _1n2;
  return isLE ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}

// vendor/noble-curves/src/abstract/curve.ts
var _0n3 = BigInt(0);
var _1n3 = BigInt(1);
function negateCt(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function normalizeZ(c, points) {
  const invertedZs = FpInvertBatch(
    c.Fp,
    points.map((p) => p.Z)
  );
  return points.map((p, i) => c.fromAffine(p.toAffine(invertedZs[i])));
}
function validateW(W, bits) {
  if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
}
function calcWOpts(W, scalarBits) {
  validateW(W, scalarBits);
  const windows = Math.ceil(scalarBits / W) + 1;
  const windowSize = 2 ** (W - 1);
  const maxNumber = 2 ** W;
  const mask = bitMask(W);
  const shiftBy = BigInt(W);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets(n, window, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n & mask);
  let nextN = n >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n3;
  }
  const offsetStart = window * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
function validateMSMPoints(points, c) {
  if (!Array.isArray(points)) throw new Error("array expected");
  points.forEach((p, i) => {
    if (!(p instanceof c)) throw new Error("invalid point at index " + i);
  });
}
function validateMSMScalars(scalars, field) {
  if (!Array.isArray(scalars)) throw new Error("array of scalars expected");
  scalars.forEach((s, i) => {
    if (!field.isValid(s)) throw new Error("invalid scalar at index " + i);
  });
}
var pointPrecomputes = /* @__PURE__ */ new WeakMap();
var pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P) {
  return pointWindowSizes.get(P) || 1;
}
function assert0(n) {
  if (n !== _0n3) throw new Error("invalid wNAF");
}
var wNAF = class {
  BASE;
  ZERO;
  Fn;
  bits;
  // Parametrized with a given Point class (not individual point)
  constructor(Point, bits) {
    this.BASE = Point.BASE;
    this.ZERO = Point.ZERO;
    this.Fn = Point.Fn;
    this.bits = bits;
  }
  // non-const time multiplication ladder
  _unsafeLadder(elm, n, p = this.ZERO) {
    let d = elm;
    while (n > _0n3) {
      if (n & _1n3) p = p.add(d);
      d = d.double();
      n >>= _1n3;
    }
    return p;
  }
  /**
   * Creates a wNAF precomputation window. Used for caching.
   * Default window size is set by `utils.precompute()` and is equal to 8.
   * Number of precomputed points depends on the curve size:
   * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
   * - 𝑊 is the window size
   * - 𝑛 is the bitlength of the curve order.
   * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
   * @param point Point instance
   * @param W window size
   * @returns precomputed point tables flattened to a single array
   */
  precomputeWindow(point, W) {
    const { windows, windowSize } = calcWOpts(W, this.bits);
    const points = [];
    let p = point;
    let base = p;
    for (let window = 0; window < windows; window++) {
      base = p;
      points.push(base);
      for (let i = 1; i < windowSize; i++) {
        base = base.add(p);
        points.push(base);
      }
      p = base.double();
    }
    return points;
  }
  /**
   * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
   * More compact implementation:
   * https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
   * @returns real and fake (for const-time) points
   */
  wNAF(W, precomputes, n) {
    if (!this.Fn.isValid(n)) throw new Error("invalid scalar");
    let p = this.ZERO;
    let f = this.BASE;
    const wo = calcWOpts(W, this.bits);
    for (let window = 0; window < wo.windows; window++) {
      const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n, window, wo);
      n = nextN;
      if (isZero) {
        f = f.add(negateCt(isNegF, precomputes[offsetF]));
      } else {
        p = p.add(negateCt(isNeg, precomputes[offset]));
      }
    }
    assert0(n);
    return { p, f };
  }
  /**
   * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
   * @param acc accumulator point to add result of multiplication
   * @returns point
   */
  wNAFUnsafe(W, precomputes, n, acc = this.ZERO) {
    const wo = calcWOpts(W, this.bits);
    for (let window = 0; window < wo.windows; window++) {
      if (n === _0n3) break;
      const { nextN, offset, isZero, isNeg } = calcOffsets(n, window, wo);
      n = nextN;
      if (isZero) {
        continue;
      } else {
        const item = precomputes[offset];
        acc = acc.add(isNeg ? item.negate() : item);
      }
    }
    assert0(n);
    return acc;
  }
  getPrecomputes(W, point, transform) {
    let comp = pointPrecomputes.get(point);
    if (!comp) {
      comp = this.precomputeWindow(point, W);
      if (W !== 1) {
        if (typeof transform === "function") comp = transform(comp);
        pointPrecomputes.set(point, comp);
      }
    }
    return comp;
  }
  cached(point, scalar, transform) {
    const W = getW(point);
    return this.wNAF(W, this.getPrecomputes(W, point, transform), scalar);
  }
  unsafe(point, scalar, transform, prev) {
    const W = getW(point);
    if (W === 1) return this._unsafeLadder(point, scalar, prev);
    return this.wNAFUnsafe(W, this.getPrecomputes(W, point, transform), scalar, prev);
  }
  // We calculate precomputes for elliptic curve point multiplication
  // using windowed method. This specifies window size and
  // stores precomputed values. Usually only base point would be precomputed.
  createCache(P, W) {
    validateW(W, this.bits);
    pointWindowSizes.set(P, W);
    pointPrecomputes.delete(P);
  }
  hasCache(elm) {
    return getW(elm) !== 1;
  }
};
function mulEndoUnsafe(Point, point, k1, k2) {
  let acc = point;
  let p1 = Point.ZERO;
  let p2 = Point.ZERO;
  while (k1 > _0n3 || k2 > _0n3) {
    if (k1 & _1n3) p1 = p1.add(acc);
    if (k2 & _1n3) p2 = p2.add(acc);
    acc = acc.double();
    k1 >>= _1n3;
    k2 >>= _1n3;
  }
  return { p1, p2 };
}
function pippenger(c, fieldN, points, scalars) {
  validateMSMPoints(points, c);
  validateMSMScalars(scalars, fieldN);
  const plength = points.length;
  const slength = scalars.length;
  if (plength !== slength) throw new Error("arrays of points and scalars must have equal length");
  const zero = c.ZERO;
  const wbits = bitLen(BigInt(plength));
  let windowSize = 1;
  if (wbits > 12) windowSize = wbits - 3;
  else if (wbits > 4) windowSize = wbits - 2;
  else if (wbits > 0) windowSize = 2;
  const MASK = bitMask(windowSize);
  const buckets = new Array(Number(MASK) + 1).fill(zero);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero;
  for (let i = lastBits; i >= 0; i -= windowSize) {
    buckets.fill(zero);
    for (let j = 0; j < slength; j++) {
      const scalar = scalars[j];
      const wbits2 = Number(scalar >> BigInt(i) & MASK);
      buckets[wbits2] = buckets[wbits2].add(points[j]);
    }
    let resI = zero;
    for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
      sumI = sumI.add(buckets[j]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i !== 0) for (let j = 0; j < windowSize; j++) sum = sum.double();
  }
  return sum;
}
function createField(order, field, isLE) {
  if (field) {
    if (field.ORDER !== order) throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    validateField(field);
    return field;
  } else {
    return Field(order, { isLE });
  }
}
function _createCurveFields(type, CURVE, curveOpts = {}, FpFnLE) {
  if (FpFnLE === void 0) FpFnLE = type === "edwards";
  if (!CURVE || typeof CURVE !== "object") throw new Error(`expected valid ${type} CURVE object`);
  for (const p of ["p", "n", "h"]) {
    const val = CURVE[p];
    if (!(typeof val === "bigint" && val > _0n3))
      throw new Error(`CURVE.${p} must be positive bigint`);
  }
  const Fp3 = createField(CURVE.p, curveOpts.Fp, FpFnLE);
  const Fn = createField(CURVE.n, curveOpts.Fn, FpFnLE);
  const _b = type === "weierstrass" ? "b" : "d";
  const params = ["Gx", "Gy", "a", _b];
  for (const p of params) {
    if (!Fp3.isValid(CURVE[p]))
      throw new Error(`CURVE.${p} must be valid field element of CURVE.Fp`);
  }
  CURVE = Object.freeze(Object.assign({}, CURVE));
  return { CURVE, Fp: Fp3, Fn };
}

// vendor/noble-curves/src/abstract/hash-to-curve.ts
var os2ip = bytesToNumberBE;
function i2osp(value, length) {
  anum(value);
  anum(length);
  if (value < 0 || value >= 1 << 8 * length) throw new Error("invalid I2OSP input: " + value);
  const res = Array.from({ length }).fill(0);
  for (let i = length - 1; i >= 0; i--) {
    res[i] = value & 255;
    value >>>= 8;
  }
  return new Uint8Array(res);
}
function strxor(a, b) {
  const arr = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i++) {
    arr[i] = a[i] ^ b[i];
  }
  return arr;
}
function anum(item) {
  if (!Number.isSafeInteger(item)) throw new Error("number expected");
}
function normDST(DST) {
  if (!isBytes(DST) && typeof DST !== "string") throw new Error("DST must be Uint8Array or string");
  return typeof DST === "string" ? utf8ToBytes(DST) : DST;
}
function expand_message_xmd(msg, DST, lenInBytes, H) {
  abytes(msg);
  anum(lenInBytes);
  DST = normDST(DST);
  if (DST.length > 255) DST = H(concatBytes(utf8ToBytes("H2C-OVERSIZE-DST-"), DST));
  const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
  const ell = Math.ceil(lenInBytes / b_in_bytes);
  if (lenInBytes > 65535 || ell > 255) throw new Error("expand_message_xmd: invalid lenInBytes");
  const DST_prime = concatBytes(DST, i2osp(DST.length, 1));
  const Z_pad = i2osp(0, r_in_bytes);
  const l_i_b_str = i2osp(lenInBytes, 2);
  const b = new Array(ell);
  const b_0 = H(concatBytes(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
  b[0] = H(concatBytes(b_0, i2osp(1, 1), DST_prime));
  for (let i = 1; i <= ell; i++) {
    const args = [strxor(b_0, b[i - 1]), i2osp(i + 1, 1), DST_prime];
    b[i] = H(concatBytes(...args));
  }
  const pseudo_random_bytes = concatBytes(...b);
  return pseudo_random_bytes.slice(0, lenInBytes);
}
function expand_message_xof(msg, DST, lenInBytes, k, H) {
  abytes(msg);
  anum(lenInBytes);
  DST = normDST(DST);
  if (DST.length > 255) {
    const dkLen = Math.ceil(2 * k / 8);
    DST = H.create({ dkLen }).update(utf8ToBytes("H2C-OVERSIZE-DST-")).update(DST).digest();
  }
  if (lenInBytes > 65535 || DST.length > 255)
    throw new Error("expand_message_xof: invalid lenInBytes");
  return H.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
}
function hash_to_field(msg, count, options) {
  _validateObject(options, {
    p: "bigint",
    m: "number",
    k: "number",
    hash: "function"
  });
  const { p, k, m, hash, expand: expand2, DST } = options;
  if (!isHash(options.hash)) throw new Error("expected valid hash");
  abytes(msg);
  anum(count);
  const log2p = p.toString(2).length;
  const L = Math.ceil((log2p + k) / 8);
  const len_in_bytes = count * m * L;
  let prb;
  if (expand2 === "xmd") {
    prb = expand_message_xmd(msg, DST, len_in_bytes, hash);
  } else if (expand2 === "xof") {
    prb = expand_message_xof(msg, DST, len_in_bytes, k, hash);
  } else if (expand2 === "_internal_pass") {
    prb = msg;
  } else {
    throw new Error('expand must be "xmd" or "xof"');
  }
  const u = new Array(count);
  for (let i = 0; i < count; i++) {
    const e = new Array(m);
    for (let j = 0; j < m; j++) {
      const elm_offset = L * (j + i * m);
      const tv = prb.subarray(elm_offset, elm_offset + L);
      e[j] = mod(os2ip(tv), p);
    }
    u[i] = e;
  }
  return u;
}
function isogenyMap(field, map) {
  const coeff = map.map((i) => Array.from(i).reverse());
  return (x, y) => {
    const [xn, xd, yn, yd] = coeff.map(
      (val) => val.reduce((acc, i) => field.add(field.mul(acc, x), i))
    );
    const [xd_inv, yd_inv] = FpInvertBatch(field, [xd, yd], true);
    x = field.mul(xn, xd_inv);
    y = field.mul(y, field.mul(yn, yd_inv));
    return { x, y };
  };
}
var _DST_scalar = utf8ToBytes("HashToScalar-");
function createHasher2(Point, mapToCurve, defaults) {
  if (typeof mapToCurve !== "function") throw new Error("mapToCurve() must be defined");
  function map(num) {
    return Point.fromAffine(mapToCurve(num));
  }
  function clear(initial) {
    const P = initial.clearCofactor();
    if (P.equals(Point.ZERO)) return Point.ZERO;
    P.assertValidity();
    return P;
  }
  return {
    defaults,
    hashToCurve(msg, options) {
      const opts = Object.assign({}, defaults, options);
      const u = hash_to_field(msg, 2, opts);
      const u0 = map(u[0]);
      const u1 = map(u[1]);
      return clear(u0.add(u1));
    },
    encodeToCurve(msg, options) {
      const optsDst = defaults.encodeDST ? { DST: defaults.encodeDST } : {};
      const opts = Object.assign({}, defaults, optsDst, options);
      const u = hash_to_field(msg, 1, opts);
      const u0 = map(u[0]);
      return clear(u0);
    },
    /** See {@link H2CHasher} */
    mapToCurve(scalars) {
      if (!Array.isArray(scalars)) throw new Error("expected array of bigints");
      for (const i of scalars)
        if (typeof i !== "bigint") throw new Error("expected array of bigints");
      return clear(map(scalars));
    },
    // hash_to_scalar can produce 0: https://www.rfc-editor.org/errata/eid8393
    // RFC 9380, draft-irtf-cfrg-bbs-signatures-08
    hashToScalar(msg, options) {
      const N = Point.Fn.ORDER;
      const opts = Object.assign({}, defaults, { p: N, m: 1, DST: _DST_scalar }, options);
      return hash_to_field(msg, 1, opts)[0][0];
    }
  };
}

// vendor/noble-hashes/src/hmac.ts
var HMAC = class extends Hash {
  oHash;
  iHash;
  blockLen;
  outputLen;
  finished = false;
  destroyed = false;
  constructor(hash, _key) {
    super();
    ahash(hash);
    const key = toBytes(_key);
    this.iHash = hash.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++) pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash.create();
    for (let i = 0; i < pad.length; i++) pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    clean(pad);
  }
  update(buf) {
    aexists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists(this);
    abytes(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to ||= Object.create(Object.getPrototypeOf(this), {});
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
hmac.create = (hash, key) => new HMAC(hash, key);

// vendor/noble-curves/src/abstract/weierstrass.ts
var divNearest = (num, den) => (num + (num >= 0 ? den : -den) / _2n2) / den;
function _splitEndoScalar(k, basis, n) {
  const [[a1, b1], [a2, b2]] = basis;
  const c1 = divNearest(b2 * k, n);
  const c2 = divNearest(-b1 * k, n);
  let k1 = k - c1 * a1 - c2 * a2;
  let k2 = -c1 * b1 - c2 * b2;
  const k1neg = k1 < _0n4;
  const k2neg = k2 < _0n4;
  if (k1neg) k1 = -k1;
  if (k2neg) k2 = -k2;
  const MAX_NUM = bitMask(Math.ceil(bitLen(n) / 2)) + _1n4;
  if (k1 < _0n4 || k1 >= MAX_NUM || k2 < _0n4 || k2 >= MAX_NUM) {
    throw new Error("splitScalar (endomorphism): failed, k=" + k);
  }
  return { k1neg, k1, k2neg, k2 };
}
var _0n4 = BigInt(0);
var _1n4 = BigInt(1);
var _2n2 = BigInt(2);
var _3n2 = BigInt(3);
var _4n2 = BigInt(4);
function _normFnElement(Fn, key) {
  const { BYTES: expected } = Fn;
  let num;
  if (typeof key === "bigint") {
    num = key;
  } else {
    let bytes = ensureBytes("private key", key);
    try {
      num = Fn.fromBytes(bytes);
    } catch (error) {
      throw new Error(`invalid private key: expected ui8a of size ${expected}, got ${typeof key}`);
    }
  }
  if (!Fn.isValidNot0(num)) throw new Error("invalid private key: out of range [1..N-1]");
  return num;
}
function weierstrassN(params, extraOpts = {}) {
  const validated = _createCurveFields("weierstrass", params, extraOpts);
  const { Fp: Fp3, Fn } = validated;
  let CURVE = validated.CURVE;
  const { h: cofactor, n: CURVE_ORDER } = CURVE;
  _validateObject(
    extraOpts,
    {},
    {
      allowInfinityPoint: "boolean",
      clearCofactor: "function",
      isTorsionFree: "function",
      fromBytes: "function",
      toBytes: "function",
      endo: "object",
      wrapPrivateKey: "boolean"
    }
  );
  const { endo } = extraOpts;
  if (endo) {
    if (!Fp3.is0(CURVE.a) || typeof endo.beta !== "bigint" || !Array.isArray(endo.basises)) {
      throw new Error('invalid endo: expected "beta": bigint and "basises": array');
    }
  }
  const lengths = getWLengths(Fp3, Fn);
  function assertCompressionIsSupported() {
    if (!Fp3.isOdd) throw new Error("compression is not supported: Field does not have .isOdd()");
  }
  function pointToBytes(_c, point, isCompressed) {
    const { x, y } = point.toAffine();
    const bx = Fp3.toBytes(x);
    _abool2(isCompressed, "isCompressed");
    if (isCompressed) {
      assertCompressionIsSupported();
      const hasEvenY = !Fp3.isOdd(y);
      return concatBytes(pprefix(hasEvenY), bx);
    } else {
      return concatBytes(Uint8Array.of(4), bx, Fp3.toBytes(y));
    }
  }
  function pointFromBytes(bytes) {
    _abytes2(bytes, void 0, "Point");
    const { publicKey: comp, publicKeyUncompressed: uncomp } = lengths;
    const length = bytes.length;
    const head = bytes[0];
    const tail = bytes.subarray(1);
    if (length === comp && (head === 2 || head === 3)) {
      const x = Fp3.fromBytes(tail);
      if (!Fp3.isValid(x)) throw new Error("bad point: is not on curve, wrong x");
      const y2 = weierstrassEquation(x);
      let y;
      try {
        y = Fp3.sqrt(y2);
      } catch (sqrtError) {
        const err = sqrtError instanceof Error ? ": " + sqrtError.message : "";
        throw new Error("bad point: is not on curve, sqrt error" + err);
      }
      assertCompressionIsSupported();
      const isYOdd = Fp3.isOdd(y);
      const isHeadOdd = (head & 1) === 1;
      if (isHeadOdd !== isYOdd) y = Fp3.neg(y);
      return { x, y };
    } else if (length === uncomp && head === 4) {
      const L = Fp3.BYTES;
      const x = Fp3.fromBytes(tail.subarray(0, L));
      const y = Fp3.fromBytes(tail.subarray(L, L * 2));
      if (!isValidXY(x, y)) throw new Error("bad point: is not on curve");
      return { x, y };
    } else {
      throw new Error(
        `bad point: got length ${length}, expected compressed=${comp} or uncompressed=${uncomp}`
      );
    }
  }
  const encodePoint = extraOpts.toBytes || pointToBytes;
  const decodePoint = extraOpts.fromBytes || pointFromBytes;
  function weierstrassEquation(x) {
    const x2 = Fp3.sqr(x);
    const x3 = Fp3.mul(x2, x);
    return Fp3.add(Fp3.add(x3, Fp3.mul(x, CURVE.a)), CURVE.b);
  }
  function isValidXY(x, y) {
    const left = Fp3.sqr(y);
    const right = weierstrassEquation(x);
    return Fp3.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy)) throw new Error("bad curve params: generator point");
  const _4a3 = Fp3.mul(Fp3.pow(CURVE.a, _3n2), _4n2);
  const _27b2 = Fp3.mul(Fp3.sqr(CURVE.b), BigInt(27));
  if (Fp3.is0(Fp3.add(_4a3, _27b2))) throw new Error("bad curve params: a or b");
  function acoord(title, n, banZero = false) {
    if (!Fp3.isValid(n) || banZero && Fp3.is0(n)) throw new Error(`bad point coordinate ${title}`);
    return n;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point)) throw new Error("ProjectivePoint expected");
  }
  function splitEndoScalarN(k) {
    if (!endo || !endo.basises) throw new Error("no endo");
    return _splitEndoScalar(k, endo.basises, Fn.ORDER);
  }
  const toAffineMemo = memoized((p, iz) => {
    const { X, Y, Z } = p;
    if (Fp3.eql(Z, Fp3.ONE)) return { x: X, y: Y };
    const is0 = p.is0();
    if (iz == null) iz = is0 ? Fp3.ONE : Fp3.inv(Z);
    const x = Fp3.mul(X, iz);
    const y = Fp3.mul(Y, iz);
    const zz = Fp3.mul(Z, iz);
    if (is0) return { x: Fp3.ZERO, y: Fp3.ZERO };
    if (!Fp3.eql(zz, Fp3.ONE)) throw new Error("invZ was invalid");
    return { x, y };
  });
  const assertValidMemo = memoized((p) => {
    if (p.is0()) {
      if (extraOpts.allowInfinityPoint && !Fp3.is0(p.Y)) return;
      throw new Error("bad point: ZERO");
    }
    const { x, y } = p.toAffine();
    if (!Fp3.isValid(x) || !Fp3.isValid(y)) throw new Error("bad point: x or y not field elements");
    if (!isValidXY(x, y)) throw new Error("bad point: equation left != right");
    if (!p.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  function finishEndo(endoBeta, k1p, k2p, k1neg, k2neg) {
    k2p = new Point(Fp3.mul(k2p.X, endoBeta), k2p.Y, k2p.Z);
    k1p = negateCt(k1neg, k1p);
    k2p = negateCt(k2neg, k2p);
    return k1p.add(k2p);
  }
  class Point {
    // base / generator point
    static BASE = new Point(CURVE.Gx, CURVE.Gy, Fp3.ONE);
    // zero / infinity / identity point
    static ZERO = new Point(Fp3.ZERO, Fp3.ONE, Fp3.ZERO);
    // 0, 1, 0
    // math field
    static Fp = Fp3;
    // scalar field
    static Fn = Fn;
    X;
    Y;
    Z;
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    constructor(X, Y, Z) {
      this.X = acoord("x", X);
      this.Y = acoord("y", Y, true);
      this.Z = acoord("z", Z);
      Object.freeze(this);
    }
    static CURVE() {
      return CURVE;
    }
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    static fromAffine(p) {
      const { x, y } = p || {};
      if (!p || !Fp3.isValid(x) || !Fp3.isValid(y)) throw new Error("invalid affine point");
      if (p instanceof Point) throw new Error("projective point not allowed");
      if (Fp3.is0(x) && Fp3.is0(y)) return Point.ZERO;
      return new Point(x, y, Fp3.ONE);
    }
    static fromBytes(bytes) {
      const P = Point.fromAffine(decodePoint(_abytes2(bytes, void 0, "point")));
      P.assertValidity();
      return P;
    }
    static fromHex(hex) {
      return Point.fromBytes(ensureBytes("pointHex", hex));
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     *
     * @param windowSize
     * @param isLazy true will defer table computation until the first multiplication
     * @returns
     */
    precompute(windowSize = 8, isLazy = true) {
      wnaf.createCache(this, windowSize);
      if (!isLazy) this.multiply(_3n2);
      return this;
    }
    // TODO: return `this`
    /** A point on curve is valid if it conforms to equation. */
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (!Fp3.isOdd) throw new Error("Field doesn't support isOdd");
      return !Fp3.isOdd(y);
    }
    /** Compare one point to another. */
    equals(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      const U1 = Fp3.eql(Fp3.mul(X1, Z2), Fp3.mul(X2, Z1));
      const U2 = Fp3.eql(Fp3.mul(Y1, Z2), Fp3.mul(Y2, Z1));
      return U1 && U2;
    }
    /** Flips point to one corresponding to (x, -y) in Affine coordinates. */
    negate() {
      return new Point(this.X, Fp3.neg(this.Y), this.Z);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a, b } = CURVE;
      const b3 = Fp3.mul(b, _3n2);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      let t0 = Fp3.mul(X1, X1);
      let t1 = Fp3.mul(Y1, Y1);
      let t2 = Fp3.mul(Z1, Z1);
      let t3 = Fp3.mul(X1, Y1);
      t3 = Fp3.add(t3, t3);
      Z3 = Fp3.mul(X1, Z1);
      Z3 = Fp3.add(Z3, Z3);
      X3 = Fp3.mul(a, Z3);
      Y3 = Fp3.mul(b3, t2);
      Y3 = Fp3.add(X3, Y3);
      X3 = Fp3.sub(t1, Y3);
      Y3 = Fp3.add(t1, Y3);
      Y3 = Fp3.mul(X3, Y3);
      X3 = Fp3.mul(t3, X3);
      Z3 = Fp3.mul(b3, Z3);
      t2 = Fp3.mul(a, t2);
      t3 = Fp3.sub(t0, t2);
      t3 = Fp3.mul(a, t3);
      t3 = Fp3.add(t3, Z3);
      Z3 = Fp3.add(t0, t0);
      t0 = Fp3.add(Z3, t0);
      t0 = Fp3.add(t0, t2);
      t0 = Fp3.mul(t0, t3);
      Y3 = Fp3.add(Y3, t0);
      t2 = Fp3.mul(Y1, Z1);
      t2 = Fp3.add(t2, t2);
      t0 = Fp3.mul(t2, t3);
      X3 = Fp3.sub(X3, t0);
      Z3 = Fp3.mul(t2, t1);
      Z3 = Fp3.add(Z3, Z3);
      Z3 = Fp3.add(Z3, Z3);
      return new Point(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      const a = CURVE.a;
      const b3 = Fp3.mul(CURVE.b, _3n2);
      let t0 = Fp3.mul(X1, X2);
      let t1 = Fp3.mul(Y1, Y2);
      let t2 = Fp3.mul(Z1, Z2);
      let t3 = Fp3.add(X1, Y1);
      let t4 = Fp3.add(X2, Y2);
      t3 = Fp3.mul(t3, t4);
      t4 = Fp3.add(t0, t1);
      t3 = Fp3.sub(t3, t4);
      t4 = Fp3.add(X1, Z1);
      let t5 = Fp3.add(X2, Z2);
      t4 = Fp3.mul(t4, t5);
      t5 = Fp3.add(t0, t2);
      t4 = Fp3.sub(t4, t5);
      t5 = Fp3.add(Y1, Z1);
      X3 = Fp3.add(Y2, Z2);
      t5 = Fp3.mul(t5, X3);
      X3 = Fp3.add(t1, t2);
      t5 = Fp3.sub(t5, X3);
      Z3 = Fp3.mul(a, t4);
      X3 = Fp3.mul(b3, t2);
      Z3 = Fp3.add(X3, Z3);
      X3 = Fp3.sub(t1, Z3);
      Z3 = Fp3.add(t1, Z3);
      Y3 = Fp3.mul(X3, Z3);
      t1 = Fp3.add(t0, t0);
      t1 = Fp3.add(t1, t0);
      t2 = Fp3.mul(a, t2);
      t4 = Fp3.mul(b3, t4);
      t1 = Fp3.add(t1, t2);
      t2 = Fp3.sub(t0, t2);
      t2 = Fp3.mul(a, t2);
      t4 = Fp3.add(t4, t2);
      t0 = Fp3.mul(t1, t4);
      Y3 = Fp3.add(Y3, t0);
      t0 = Fp3.mul(t5, t4);
      X3 = Fp3.mul(t3, X3);
      X3 = Fp3.sub(X3, t0);
      t0 = Fp3.mul(t3, t1);
      Z3 = Fp3.mul(t5, Z3);
      Z3 = Fp3.add(Z3, t0);
      return new Point(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2 } = extraOpts;
      if (!Fn.isValidNot0(scalar)) throw new Error("invalid scalar: out of range");
      let point, fake;
      const mul = (n) => wnaf.cached(this, n, (p) => normalizeZ(Point, p));
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(scalar);
        const { p: k1p, f: k1f } = mul(k1);
        const { p: k2p, f: k2f } = mul(k2);
        fake = k1f.add(k2f);
        point = finishEndo(endo2.beta, k1p, k2p, k1neg, k2neg);
      } else {
        const { p, f } = mul(scalar);
        point = p;
        fake = f;
      }
      return normalizeZ(Point, [point, fake])[0];
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed secret key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo: endo2 } = extraOpts;
      const p = this;
      if (!Fn.isValid(sc)) throw new Error("invalid scalar: out of range");
      if (sc === _0n4 || p.is0()) return Point.ZERO;
      if (sc === _1n4) return p;
      if (wnaf.hasCache(this)) return this.multiply(sc);
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(sc);
        const { p1, p2 } = mulEndoUnsafe(Point, p, k1, k2);
        return finishEndo(endo2.beta, p1, p2, k1neg, k2neg);
      } else {
        return wnaf.unsafe(p, sc);
      }
    }
    multiplyAndAddUnsafe(Q, a, b) {
      const sum = this.multiplyUnsafe(a).add(Q.multiplyUnsafe(b));
      return sum.is0() ? void 0 : sum;
    }
    /**
     * Converts Projective point to affine (x, y) coordinates.
     * @param invertedZ Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
     */
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    /**
     * Checks whether Point is free of torsion elements (is in prime subgroup).
     * Always torsion-free for cofactor=1 curves.
     */
    isTorsionFree() {
      const { isTorsionFree } = extraOpts;
      if (cofactor === _1n4) return true;
      if (isTorsionFree) return isTorsionFree(Point, this);
      return wnaf.unsafe(this, CURVE_ORDER).is0();
    }
    clearCofactor() {
      const { clearCofactor } = extraOpts;
      if (cofactor === _1n4) return this;
      if (clearCofactor) return clearCofactor(Point, this);
      return this.multiplyUnsafe(cofactor);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    toBytes(isCompressed = true) {
      _abool2(isCompressed, "isCompressed");
      this.assertValidity();
      return encodePoint(Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      return bytesToHex(this.toBytes(isCompressed));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    // TODO: remove
    get px() {
      return this.X;
    }
    get py() {
      return this.X;
    }
    get pz() {
      return this.Z;
    }
    toRawBytes(isCompressed = true) {
      return this.toBytes(isCompressed);
    }
    _setWindowSize(windowSize) {
      this.precompute(windowSize);
    }
    static normalizeZ(points) {
      return normalizeZ(Point, points);
    }
    static msm(points, scalars) {
      return pippenger(Point, Fn, points, scalars);
    }
    static fromPrivateKey(privateKey) {
      return Point.BASE.multiply(_normFnElement(Fn, privateKey));
    }
  }
  const bits = Fn.BITS;
  const wnaf = new wNAF(Point, extraOpts.endo ? Math.ceil(bits / 2) : bits);
  Point.BASE.precompute(8);
  return Point;
}
function pprefix(hasEvenY) {
  return Uint8Array.of(hasEvenY ? 2 : 3);
}
function SWUFpSqrtRatio(Fp3, Z) {
  const q = Fp3.ORDER;
  let l = _0n4;
  for (let o = q - _1n4; o % _2n2 === _0n4; o /= _2n2) l += _1n4;
  const c1 = l;
  const _2n_pow_c1_1 = _2n2 << c1 - _1n4 - _1n4;
  const _2n_pow_c1 = _2n_pow_c1_1 * _2n2;
  const c2 = (q - _1n4) / _2n_pow_c1;
  const c3 = (c2 - _1n4) / _2n2;
  const c4 = _2n_pow_c1 - _1n4;
  const c5 = _2n_pow_c1_1;
  const c6 = Fp3.pow(Z, c2);
  const c7 = Fp3.pow(Z, (c2 + _1n4) / _2n2);
  let sqrtRatio = (u, v) => {
    let tv1 = c6;
    let tv2 = Fp3.pow(v, c4);
    let tv3 = Fp3.sqr(tv2);
    tv3 = Fp3.mul(tv3, v);
    let tv5 = Fp3.mul(u, tv3);
    tv5 = Fp3.pow(tv5, c3);
    tv5 = Fp3.mul(tv5, tv2);
    tv2 = Fp3.mul(tv5, v);
    tv3 = Fp3.mul(tv5, u);
    let tv4 = Fp3.mul(tv3, tv2);
    tv5 = Fp3.pow(tv4, c5);
    let isQR = Fp3.eql(tv5, Fp3.ONE);
    tv2 = Fp3.mul(tv3, c7);
    tv5 = Fp3.mul(tv4, tv1);
    tv3 = Fp3.cmov(tv2, tv3, isQR);
    tv4 = Fp3.cmov(tv5, tv4, isQR);
    for (let i = c1; i > _1n4; i--) {
      let tv52 = i - _2n2;
      tv52 = _2n2 << tv52 - _1n4;
      let tvv5 = Fp3.pow(tv4, tv52);
      const e1 = Fp3.eql(tvv5, Fp3.ONE);
      tv2 = Fp3.mul(tv3, tv1);
      tv1 = Fp3.mul(tv1, tv1);
      tvv5 = Fp3.mul(tv4, tv1);
      tv3 = Fp3.cmov(tv2, tv3, e1);
      tv4 = Fp3.cmov(tvv5, tv4, e1);
    }
    return { isValid: isQR, value: tv3 };
  };
  if (Fp3.ORDER % _4n2 === _3n2) {
    const c12 = (Fp3.ORDER - _3n2) / _4n2;
    const c22 = Fp3.sqrt(Fp3.neg(Z));
    sqrtRatio = (u, v) => {
      let tv1 = Fp3.sqr(v);
      const tv2 = Fp3.mul(u, v);
      tv1 = Fp3.mul(tv1, tv2);
      let y1 = Fp3.pow(tv1, c12);
      y1 = Fp3.mul(y1, tv2);
      const y2 = Fp3.mul(y1, c22);
      const tv3 = Fp3.mul(Fp3.sqr(y1), v);
      const isQR = Fp3.eql(tv3, u);
      let y = Fp3.cmov(y2, y1, isQR);
      return { isValid: isQR, value: y };
    };
  }
  return sqrtRatio;
}
function mapToCurveSimpleSWU(Fp3, opts) {
  validateField(Fp3);
  const { A, B, Z } = opts;
  if (!Fp3.isValid(A) || !Fp3.isValid(B) || !Fp3.isValid(Z))
    throw new Error("mapToCurveSimpleSWU: invalid opts");
  const sqrtRatio = SWUFpSqrtRatio(Fp3, Z);
  if (!Fp3.isOdd) throw new Error("Field does not have .isOdd()");
  return (u) => {
    let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
    tv1 = Fp3.sqr(u);
    tv1 = Fp3.mul(tv1, Z);
    tv2 = Fp3.sqr(tv1);
    tv2 = Fp3.add(tv2, tv1);
    tv3 = Fp3.add(tv2, Fp3.ONE);
    tv3 = Fp3.mul(tv3, B);
    tv4 = Fp3.cmov(Z, Fp3.neg(tv2), !Fp3.eql(tv2, Fp3.ZERO));
    tv4 = Fp3.mul(tv4, A);
    tv2 = Fp3.sqr(tv3);
    tv6 = Fp3.sqr(tv4);
    tv5 = Fp3.mul(tv6, A);
    tv2 = Fp3.add(tv2, tv5);
    tv2 = Fp3.mul(tv2, tv3);
    tv6 = Fp3.mul(tv6, tv4);
    tv5 = Fp3.mul(tv6, B);
    tv2 = Fp3.add(tv2, tv5);
    x = Fp3.mul(tv1, tv3);
    const { isValid, value } = sqrtRatio(tv2, tv6);
    y = Fp3.mul(tv1, u);
    y = Fp3.mul(y, value);
    x = Fp3.cmov(x, tv3, isValid);
    y = Fp3.cmov(y, value, isValid);
    const e1 = Fp3.isOdd(u) === Fp3.isOdd(y);
    y = Fp3.cmov(Fp3.neg(y), y, e1);
    const tv4_inv = FpInvertBatch(Fp3, [tv4], true)[0];
    x = Fp3.mul(x, tv4_inv);
    return { x, y };
  };
}
function getWLengths(Fp3, Fn) {
  return {
    secretKey: Fn.BYTES,
    publicKey: 1 + Fp3.BYTES,
    publicKeyUncompressed: 1 + 2 * Fp3.BYTES,
    publicKeyHasPrefix: true,
    signature: 2 * Fn.BYTES
  };
}
function weierstrassPoints(c) {
  const { CURVE, curveOpts } = _weierstrass_legacy_opts_to_new(c);
  const Point = weierstrassN(CURVE, curveOpts);
  return _weierstrass_new_output_to_legacy(c, Point);
}
function _weierstrass_legacy_opts_to_new(c) {
  const CURVE = {
    a: c.a,
    b: c.b,
    p: c.Fp.ORDER,
    n: c.n,
    h: c.h,
    Gx: c.Gx,
    Gy: c.Gy
  };
  const Fp3 = c.Fp;
  let allowedLengths = c.allowedPrivateKeyLengths ? Array.from(new Set(c.allowedPrivateKeyLengths.map((l) => Math.ceil(l / 2)))) : void 0;
  const Fn = Field(CURVE.n, {
    BITS: c.nBitLength,
    allowedLengths,
    modFromBytes: c.wrapPrivateKey
  });
  const curveOpts = {
    Fp: Fp3,
    Fn,
    allowInfinityPoint: c.allowInfinityPoint,
    endo: c.endo,
    isTorsionFree: c.isTorsionFree,
    clearCofactor: c.clearCofactor,
    fromBytes: c.fromBytes,
    toBytes: c.toBytes
  };
  return { CURVE, curveOpts };
}
function _legacyHelperEquat(Fp3, a, b) {
  function weierstrassEquation(x) {
    const x2 = Fp3.sqr(x);
    const x3 = Fp3.mul(x2, x);
    return Fp3.add(Fp3.add(x3, Fp3.mul(x, a)), b);
  }
  return weierstrassEquation;
}
function _weierstrass_new_output_to_legacy(c, Point) {
  const { Fp: Fp3, Fn } = Point;
  function isWithinCurveOrder(num) {
    return inRange(num, _1n4, Fn.ORDER);
  }
  const weierstrassEquation = _legacyHelperEquat(Fp3, c.a, c.b);
  return Object.assign(
    {},
    {
      CURVE: c,
      Point,
      ProjectivePoint: Point,
      normPrivateKeyToScalar: (key) => _normFnElement(Fn, key),
      weierstrassEquation,
      isWithinCurveOrder
    }
  );
}

// vendor/noble-curves/src/abstract/bls.ts
var _0n5 = BigInt(0);
var _1n5 = BigInt(1);
var _2n3 = BigInt(2);
var _3n3 = BigInt(3);
function NAfDecomposition(a) {
  const res = [];
  for (; a > _1n5; a >>= _1n5) {
    if ((a & _1n5) === _0n5) res.unshift(0);
    else if ((a & _3n3) === _3n3) {
      res.unshift(-1);
      a += _1n5;
    } else res.unshift(1);
  }
  return res;
}
function aNonEmpty(arr) {
  if (!Array.isArray(arr) || arr.length === 0) throw new Error("expected non-empty array");
}
function createBlsPairing(fields, G1, G2, params) {
  const { Fp2: Fp22, Fp12: Fp122 } = fields;
  const { twistType, ateLoopSize, xNegative, postPrecompute } = params;
  let lineFunction;
  if (twistType === "multiplicative") {
    lineFunction = (c0, c1, c2, f, Px, Py) => Fp122.mul014(f, c0, Fp22.mul(c1, Px), Fp22.mul(c2, Py));
  } else if (twistType === "divisive") {
    lineFunction = (c0, c1, c2, f, Px, Py) => Fp122.mul034(f, Fp22.mul(c2, Py), Fp22.mul(c1, Px), c0);
  } else throw new Error("bls: unknown twist type");
  const Fp2div2 = Fp22.div(Fp22.ONE, Fp22.mul(Fp22.ONE, _2n3));
  function pointDouble(ell, Rx, Ry, Rz) {
    const t0 = Fp22.sqr(Ry);
    const t1 = Fp22.sqr(Rz);
    const t2 = Fp22.mulByB(Fp22.mul(t1, _3n3));
    const t3 = Fp22.mul(t2, _3n3);
    const t4 = Fp22.sub(Fp22.sub(Fp22.sqr(Fp22.add(Ry, Rz)), t1), t0);
    const c0 = Fp22.sub(t2, t0);
    const c1 = Fp22.mul(Fp22.sqr(Rx), _3n3);
    const c2 = Fp22.neg(t4);
    ell.push([c0, c1, c2]);
    Rx = Fp22.mul(Fp22.mul(Fp22.mul(Fp22.sub(t0, t3), Rx), Ry), Fp2div2);
    Ry = Fp22.sub(Fp22.sqr(Fp22.mul(Fp22.add(t0, t3), Fp2div2)), Fp22.mul(Fp22.sqr(t2), _3n3));
    Rz = Fp22.mul(t0, t4);
    return { Rx, Ry, Rz };
  }
  function pointAdd(ell, Rx, Ry, Rz, Qx, Qy) {
    const t0 = Fp22.sub(Ry, Fp22.mul(Qy, Rz));
    const t1 = Fp22.sub(Rx, Fp22.mul(Qx, Rz));
    const c0 = Fp22.sub(Fp22.mul(t0, Qx), Fp22.mul(t1, Qy));
    const c1 = Fp22.neg(t0);
    const c2 = t1;
    ell.push([c0, c1, c2]);
    const t2 = Fp22.sqr(t1);
    const t3 = Fp22.mul(t2, t1);
    const t4 = Fp22.mul(t2, Rx);
    const t5 = Fp22.add(Fp22.sub(t3, Fp22.mul(t4, _2n3)), Fp22.mul(Fp22.sqr(t0), Rz));
    Rx = Fp22.mul(t1, t5);
    Ry = Fp22.sub(Fp22.mul(Fp22.sub(t4, t5), t0), Fp22.mul(t3, Ry));
    Rz = Fp22.mul(Rz, t3);
    return { Rx, Ry, Rz };
  }
  const ATE_NAF = NAfDecomposition(ateLoopSize);
  const calcPairingPrecomputes = memoized((point) => {
    const p = point;
    const { x, y } = p.toAffine();
    const Qx = x, Qy = y, negQy = Fp22.neg(y);
    let Rx = Qx, Ry = Qy, Rz = Fp22.ONE;
    const ell = [];
    for (const bit of ATE_NAF) {
      const cur = [];
      ({ Rx, Ry, Rz } = pointDouble(cur, Rx, Ry, Rz));
      if (bit) ({ Rx, Ry, Rz } = pointAdd(cur, Rx, Ry, Rz, Qx, bit === -1 ? negQy : Qy));
      ell.push(cur);
    }
    if (postPrecompute) {
      const last = ell[ell.length - 1];
      postPrecompute(Rx, Ry, Rz, Qx, Qy, pointAdd.bind(null, last));
    }
    return ell;
  });
  function millerLoopBatch(pairs, withFinalExponent = false) {
    let f12 = Fp122.ONE;
    if (pairs.length) {
      const ellLen = pairs[0][0].length;
      for (let i = 0; i < ellLen; i++) {
        f12 = Fp122.sqr(f12);
        for (const [ell, Px, Py] of pairs) {
          for (const [c0, c1, c2] of ell[i]) f12 = lineFunction(c0, c1, c2, f12, Px, Py);
        }
      }
    }
    if (xNegative) f12 = Fp122.conjugate(f12);
    return withFinalExponent ? Fp122.finalExponentiate(f12) : f12;
  }
  function pairingBatch(pairs, withFinalExponent = true) {
    const res = [];
    normalizeZ(
      G1,
      pairs.map(({ g1 }) => g1)
    );
    normalizeZ(
      G2,
      pairs.map(({ g2 }) => g2)
    );
    for (const { g1, g2 } of pairs) {
      if (g1.is0() || g2.is0()) throw new Error("pairing is not available for ZERO point");
      g1.assertValidity();
      g2.assertValidity();
      const Qa = g1.toAffine();
      res.push([calcPairingPrecomputes(g2), Qa.x, Qa.y]);
    }
    return millerLoopBatch(res, withFinalExponent);
  }
  function pairing(Q, P, withFinalExponent = true) {
    return pairingBatch([{ g1: Q, g2: P }], withFinalExponent);
  }
  return {
    Fp12: Fp122,
    // NOTE: we re-export Fp12 here because pairing results are Fp12!
    millerLoopBatch,
    pairing,
    pairingBatch,
    calcPairingPrecomputes
  };
}
function createBlsSig(blsPairing, PubCurve, SigCurve, SignatureCoder, isSigG1) {
  const { Fp12: Fp122, pairingBatch } = blsPairing;
  function normPub(point) {
    return point instanceof PubCurve.Point ? point : PubCurve.Point.fromHex(point);
  }
  function normSig(point) {
    return point instanceof SigCurve.Point ? point : SigCurve.Point.fromHex(point);
  }
  function amsg(m) {
    if (!(m instanceof SigCurve.Point))
      throw new Error(`expected valid message hashed to ${!isSigG1 ? "G2" : "G1"} curve`);
    return m;
  }
  const pair = !isSigG1 ? (a, b) => ({ g1: a, g2: b }) : (a, b) => ({ g1: b, g2: a });
  return {
    // P = pk x G
    getPublicKey(secretKey) {
      const sec = _normFnElement(PubCurve.Point.Fn, secretKey);
      return PubCurve.Point.BASE.multiply(sec);
    },
    // S = pk x H(m)
    sign(message, secretKey, unusedArg) {
      if (unusedArg != null) throw new Error("sign() expects 2 arguments");
      const sec = _normFnElement(PubCurve.Point.Fn, secretKey);
      amsg(message).assertValidity();
      return message.multiply(sec);
    },
    // Checks if pairing of public key & hash is equal to pairing of generator & signature.
    // e(P, H(m)) == e(G, S)
    // e(S, G) == e(H(m), P)
    verify(signature, message, publicKey, unusedArg) {
      if (unusedArg != null) throw new Error("verify() expects 3 arguments");
      signature = normSig(signature);
      publicKey = normPub(publicKey);
      const P = publicKey.negate();
      const G = PubCurve.Point.BASE;
      const Hm = amsg(message);
      const S = signature;
      const exp = pairingBatch([pair(P, Hm), pair(G, S)]);
      return Fp122.eql(exp, Fp122.ONE);
    },
    // https://ethresear.ch/t/fast-verification-of-multiple-bls-signatures/5407
    // e(G, S) = e(G, SUM(n)(Si)) = MUL(n)(e(G, Si))
    // TODO: maybe `{message: G2Hex, publicKey: G1Hex}[]` instead?
    verifyBatch(signature, messages, publicKeys) {
      aNonEmpty(messages);
      if (publicKeys.length !== messages.length)
        throw new Error("amount of public keys and messages should be equal");
      const sig = normSig(signature);
      const nMessages = messages;
      const nPublicKeys = publicKeys.map(normPub);
      const messagePubKeyMap = /* @__PURE__ */ new Map();
      for (let i = 0; i < nPublicKeys.length; i++) {
        const pub = nPublicKeys[i];
        const msg = nMessages[i];
        let keys = messagePubKeyMap.get(msg);
        if (keys === void 0) {
          keys = [];
          messagePubKeyMap.set(msg, keys);
        }
        keys.push(pub);
      }
      const paired = [];
      const G = PubCurve.Point.BASE;
      try {
        for (const [msg, keys] of messagePubKeyMap) {
          const groupPublicKey = keys.reduce((acc, msg2) => acc.add(msg2));
          paired.push(pair(groupPublicKey, msg));
        }
        paired.push(pair(G.negate(), sig));
        return Fp122.eql(pairingBatch(paired), Fp122.ONE);
      } catch {
        return false;
      }
    },
    // Adds a bunch of public key points together.
    // pk1 + pk2 + pk3 = pkA
    aggregatePublicKeys(publicKeys) {
      aNonEmpty(publicKeys);
      publicKeys = publicKeys.map((pub) => normPub(pub));
      const agg = publicKeys.reduce((sum, p) => sum.add(p), PubCurve.Point.ZERO);
      agg.assertValidity();
      return agg;
    },
    // Adds a bunch of signature points together.
    // pk1 + pk2 + pk3 = pkA
    aggregateSignatures(signatures) {
      aNonEmpty(signatures);
      signatures = signatures.map((sig) => normSig(sig));
      const agg = signatures.reduce((sum, s) => sum.add(s), SigCurve.Point.ZERO);
      agg.assertValidity();
      return agg;
    },
    hash(messageBytes, DST) {
      abytes(messageBytes);
      const opts = DST ? { DST } : void 0;
      return SigCurve.hashToCurve(messageBytes, opts);
    },
    Signature: SignatureCoder
  };
}
function bls(CURVE) {
  const { Fp: Fp3, Fr, Fp2: Fp22, Fp6: Fp62, Fp12: Fp122 } = CURVE.fields;
  const G1_ = weierstrassPoints(CURVE.G1);
  const G1 = Object.assign(
    G1_,
    createHasher2(G1_.Point, CURVE.G1.mapToCurve, {
      ...CURVE.htfDefaults,
      ...CURVE.G1.htfDefaults
    })
  );
  const G2_ = weierstrassPoints(CURVE.G2);
  const G2 = Object.assign(
    G2_,
    createHasher2(G2_.Point, CURVE.G2.mapToCurve, {
      ...CURVE.htfDefaults,
      ...CURVE.G2.htfDefaults
    })
  );
  const pairingRes = createBlsPairing(CURVE.fields, G1.Point, G2.Point, {
    ...CURVE.params,
    postPrecompute: CURVE.postPrecompute
  });
  const { millerLoopBatch, pairing, pairingBatch, calcPairingPrecomputes } = pairingRes;
  const longSignatures = createBlsSig(pairingRes, G1, G2, CURVE.G2.Signature, false);
  const shortSignatures = createBlsSig(pairingRes, G2, G1, CURVE.G1.ShortSignature, true);
  const rand = CURVE.randomBytes || randomBytes;
  const randomSecretKey = () => {
    const length = getMinHashLength(Fr.ORDER);
    return mapHashToField(rand(length), Fr.ORDER);
  };
  const utils = {
    randomSecretKey,
    randomPrivateKey: randomSecretKey,
    calcPairingPrecomputes
  };
  const { ShortSignature } = CURVE.G1;
  const { Signature } = CURVE.G2;
  function normP1Hash(point, htfOpts) {
    return point instanceof G1.Point ? point : shortSignatures.hash(ensureBytes("point", point), htfOpts?.DST);
  }
  function normP2Hash(point, htfOpts) {
    return point instanceof G2.Point ? point : longSignatures.hash(ensureBytes("point", point), htfOpts?.DST);
  }
  function getPublicKey(privateKey) {
    return longSignatures.getPublicKey(privateKey).toBytes(true);
  }
  function getPublicKeyForShortSignatures(privateKey) {
    return shortSignatures.getPublicKey(privateKey).toBytes(true);
  }
  function sign(message, privateKey, htfOpts) {
    const Hm = normP2Hash(message, htfOpts);
    const S = longSignatures.sign(Hm, privateKey);
    return message instanceof G2.Point ? S : Signature.toBytes(S);
  }
  function signShortSignature(message, privateKey, htfOpts) {
    const Hm = normP1Hash(message, htfOpts);
    const S = shortSignatures.sign(Hm, privateKey);
    return message instanceof G1.Point ? S : ShortSignature.toBytes(S);
  }
  function verify(signature, message, publicKey, htfOpts) {
    const Hm = normP2Hash(message, htfOpts);
    return longSignatures.verify(signature, Hm, publicKey);
  }
  function verifyShortSignature(signature, message, publicKey, htfOpts) {
    const Hm = normP1Hash(message, htfOpts);
    return shortSignatures.verify(signature, Hm, publicKey);
  }
  function aggregatePublicKeys(publicKeys) {
    const agg = longSignatures.aggregatePublicKeys(publicKeys);
    return publicKeys[0] instanceof G1.Point ? agg : agg.toBytes(true);
  }
  function aggregateSignatures(signatures) {
    const agg = longSignatures.aggregateSignatures(signatures);
    return signatures[0] instanceof G2.Point ? agg : Signature.toBytes(agg);
  }
  function aggregateShortSignatures(signatures) {
    const agg = shortSignatures.aggregateSignatures(signatures);
    return signatures[0] instanceof G1.Point ? agg : ShortSignature.toBytes(agg);
  }
  function verifyBatch(signature, messages, publicKeys, htfOpts) {
    const Hm = messages.map((m) => normP2Hash(m, htfOpts));
    return longSignatures.verifyBatch(signature, Hm, publicKeys);
  }
  G1.Point.BASE.precompute(4);
  return {
    longSignatures,
    shortSignatures,
    millerLoopBatch,
    pairing,
    pairingBatch,
    verifyBatch,
    fields: {
      Fr,
      Fp: Fp3,
      Fp2: Fp22,
      Fp6: Fp62,
      Fp12: Fp122
    },
    params: {
      ateLoopSize: CURVE.params.ateLoopSize,
      twistType: CURVE.params.twistType,
      // deprecated
      r: CURVE.params.r,
      G1b: CURVE.G1.b,
      G2b: CURVE.G2.b
    },
    utils,
    // deprecated
    getPublicKey,
    getPublicKeyForShortSignatures,
    sign,
    signShortSignature,
    verify,
    verifyShortSignature,
    aggregatePublicKeys,
    aggregateSignatures,
    aggregateShortSignatures,
    G1,
    G2,
    Signature,
    ShortSignature
  };
}

// vendor/noble-curves/src/abstract/tower.ts
var _0n6 = BigInt(0);
var _1n6 = BigInt(1);
var _2n4 = BigInt(2);
var _3n4 = BigInt(3);
function calcFrobeniusCoefficients(Fp3, nonResidue, modulus, degree, num = 1, divisor) {
  const _divisor = BigInt(divisor === void 0 ? degree : divisor);
  const towerModulus = modulus ** BigInt(degree);
  const res = [];
  for (let i = 0; i < num; i++) {
    const a = BigInt(i + 1);
    const powers = [];
    for (let j = 0, qPower = _1n6; j < degree; j++) {
      const power = (a * qPower - a) / _divisor % towerModulus;
      powers.push(Fp3.pow(nonResidue, power));
      qPower *= modulus;
    }
    res.push(powers);
  }
  return res;
}
function psiFrobenius(Fp3, Fp22, base) {
  const PSI_X = Fp22.pow(base, (Fp3.ORDER - _1n6) / _3n4);
  const PSI_Y = Fp22.pow(base, (Fp3.ORDER - _1n6) / _2n4);
  function psi(x, y) {
    const x2 = Fp22.mul(Fp22.frobeniusMap(x, 1), PSI_X);
    const y2 = Fp22.mul(Fp22.frobeniusMap(y, 1), PSI_Y);
    return [x2, y2];
  }
  const PSI2_X = Fp22.pow(base, (Fp3.ORDER ** _2n4 - _1n6) / _3n4);
  const PSI2_Y = Fp22.pow(base, (Fp3.ORDER ** _2n4 - _1n6) / _2n4);
  if (!Fp22.eql(PSI2_Y, Fp22.neg(Fp22.ONE))) throw new Error("psiFrobenius: PSI2_Y!==-1");
  function psi2(x, y) {
    return [Fp22.mul(x, PSI2_X), Fp22.neg(y)];
  }
  const mapAffine = (fn) => (c, P) => {
    const affine = P.toAffine();
    const p = fn(affine.x, affine.y);
    return c.fromAffine({ x: p[0], y: p[1] });
  };
  const G2psi3 = mapAffine(psi);
  const G2psi22 = mapAffine(psi2);
  return { psi, psi2, G2psi: G2psi3, G2psi2: G2psi22, PSI_X, PSI_Y, PSI2_X, PSI2_Y };
}
var Fp2fromBigTuple = (Fp3, tuple) => {
  if (tuple.length !== 2) throw new Error("invalid tuple");
  const fps = tuple.map((n) => Fp3.create(n));
  return { c0: fps[0], c1: fps[1] };
};
var _Field2 = class {
  ORDER;
  BITS;
  BYTES;
  isLE;
  MASK = _1n6;
  ZERO;
  ONE;
  Fp;
  NONRESIDUE;
  mulByB;
  Fp_NONRESIDUE;
  Fp_div2;
  FROBENIUS_COEFFICIENTS;
  constructor(Fp3, opts = {}) {
    const ORDER = Fp3.ORDER;
    const FP2_ORDER = ORDER * ORDER;
    this.Fp = Fp3;
    this.ORDER = FP2_ORDER;
    this.BITS = bitLen(FP2_ORDER);
    this.BYTES = Math.ceil(bitLen(FP2_ORDER) / 8);
    this.isLE = Fp3.isLE;
    this.ZERO = { c0: Fp3.ZERO, c1: Fp3.ZERO };
    this.ONE = { c0: Fp3.ONE, c1: Fp3.ZERO };
    this.Fp_NONRESIDUE = Fp3.create(opts.NONRESIDUE || BigInt(-1));
    this.Fp_div2 = Fp3.div(Fp3.ONE, _2n4);
    this.NONRESIDUE = Fp2fromBigTuple(Fp3, opts.FP2_NONRESIDUE);
    this.FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(Fp3, this.Fp_NONRESIDUE, Fp3.ORDER, 2)[0];
    this.mulByB = opts.Fp2mulByB;
    Object.seal(this);
  }
  fromBigTuple(tuple) {
    return Fp2fromBigTuple(this.Fp, tuple);
  }
  create(num) {
    return num;
  }
  isValid({ c0, c1 }) {
    function isValidC(num, ORDER) {
      return typeof num === "bigint" && _0n6 <= num && num < ORDER;
    }
    return isValidC(c0, this.ORDER) && isValidC(c1, this.ORDER);
  }
  is0({ c0, c1 }) {
    return this.Fp.is0(c0) && this.Fp.is0(c1);
  }
  isValidNot0(num) {
    return !this.is0(num) && this.isValid(num);
  }
  eql({ c0, c1 }, { c0: r0, c1: r1 }) {
    return this.Fp.eql(c0, r0) && this.Fp.eql(c1, r1);
  }
  neg({ c0, c1 }) {
    return { c0: this.Fp.neg(c0), c1: this.Fp.neg(c1) };
  }
  pow(num, power) {
    return FpPow(this, num, power);
  }
  invertBatch(nums) {
    return FpInvertBatch(this, nums);
  }
  // Normalized
  add(f1, f2) {
    const { c0, c1 } = f1;
    const { c0: r0, c1: r1 } = f2;
    return {
      c0: this.Fp.add(c0, r0),
      c1: this.Fp.add(c1, r1)
    };
  }
  sub({ c0, c1 }, { c0: r0, c1: r1 }) {
    return {
      c0: this.Fp.sub(c0, r0),
      c1: this.Fp.sub(c1, r1)
    };
  }
  mul({ c0, c1 }, rhs) {
    const { Fp: Fp3 } = this;
    if (typeof rhs === "bigint") return { c0: Fp3.mul(c0, rhs), c1: Fp3.mul(c1, rhs) };
    const { c0: r0, c1: r1 } = rhs;
    let t1 = Fp3.mul(c0, r0);
    let t2 = Fp3.mul(c1, r1);
    const o0 = Fp3.sub(t1, t2);
    const o1 = Fp3.sub(Fp3.mul(Fp3.add(c0, c1), Fp3.add(r0, r1)), Fp3.add(t1, t2));
    return { c0: o0, c1: o1 };
  }
  sqr({ c0, c1 }) {
    const { Fp: Fp3 } = this;
    const a = Fp3.add(c0, c1);
    const b = Fp3.sub(c0, c1);
    const c = Fp3.add(c0, c0);
    return { c0: Fp3.mul(a, b), c1: Fp3.mul(c, c1) };
  }
  // NonNormalized stuff
  addN(a, b) {
    return this.add(a, b);
  }
  subN(a, b) {
    return this.sub(a, b);
  }
  mulN(a, b) {
    return this.mul(a, b);
  }
  sqrN(a) {
    return this.sqr(a);
  }
  // Why inversion for bigint inside Fp instead of Fp2? it is even used in that context?
  div(lhs, rhs) {
    const { Fp: Fp3 } = this;
    return this.mul(lhs, typeof rhs === "bigint" ? Fp3.inv(Fp3.create(rhs)) : this.inv(rhs));
  }
  inv({ c0: a, c1: b }) {
    const { Fp: Fp3 } = this;
    const factor = Fp3.inv(Fp3.create(a * a + b * b));
    return { c0: Fp3.mul(factor, Fp3.create(a)), c1: Fp3.mul(factor, Fp3.create(-b)) };
  }
  sqrt(num) {
    const { Fp: Fp3 } = this;
    const Fp22 = this;
    const { c0, c1 } = num;
    if (Fp3.is0(c1)) {
      if (FpLegendre(Fp3, c0) === 1) return Fp22.create({ c0: Fp3.sqrt(c0), c1: Fp3.ZERO });
      else return Fp22.create({ c0: Fp3.ZERO, c1: Fp3.sqrt(Fp3.div(c0, this.Fp_NONRESIDUE)) });
    }
    const a = Fp3.sqrt(Fp3.sub(Fp3.sqr(c0), Fp3.mul(Fp3.sqr(c1), this.Fp_NONRESIDUE)));
    let d = Fp3.mul(Fp3.add(a, c0), this.Fp_div2);
    const legendre = FpLegendre(Fp3, d);
    if (legendre === -1) d = Fp3.sub(d, a);
    const a0 = Fp3.sqrt(d);
    const candidateSqrt = Fp22.create({ c0: a0, c1: Fp3.div(Fp3.mul(c1, this.Fp_div2), a0) });
    if (!Fp22.eql(Fp22.sqr(candidateSqrt), num)) throw new Error("Cannot find square root");
    const x1 = candidateSqrt;
    const x2 = Fp22.neg(x1);
    const { re: re1, im: im1 } = Fp22.reim(x1);
    const { re: re2, im: im2 } = Fp22.reim(x2);
    if (im1 > im2 || im1 === im2 && re1 > re2) return x1;
    return x2;
  }
  // Same as sgn0_m_eq_2 in RFC 9380
  isOdd(x) {
    const { re: x0, im: x1 } = this.reim(x);
    const sign_0 = x0 % _2n4;
    const zero_0 = x0 === _0n6;
    const sign_1 = x1 % _2n4;
    return BigInt(sign_0 || zero_0 && sign_1) == _1n6;
  }
  // Bytes util
  fromBytes(b) {
    const { Fp: Fp3 } = this;
    if (b.length !== this.BYTES) throw new Error("fromBytes invalid length=" + b.length);
    return { c0: Fp3.fromBytes(b.subarray(0, Fp3.BYTES)), c1: Fp3.fromBytes(b.subarray(Fp3.BYTES)) };
  }
  toBytes({ c0, c1 }) {
    return concatBytes(this.Fp.toBytes(c0), this.Fp.toBytes(c1));
  }
  cmov({ c0, c1 }, { c0: r0, c1: r1 }, c) {
    return {
      c0: this.Fp.cmov(c0, r0, c),
      c1: this.Fp.cmov(c1, r1, c)
    };
  }
  reim({ c0, c1 }) {
    return { re: c0, im: c1 };
  }
  Fp4Square(a, b) {
    const Fp22 = this;
    const a2 = Fp22.sqr(a);
    const b2 = Fp22.sqr(b);
    return {
      first: Fp22.add(Fp22.mulByNonresidue(b2), a2),
      // b² * Nonresidue + a²
      second: Fp22.sub(Fp22.sub(Fp22.sqr(Fp22.add(a, b)), a2), b2)
      // (a + b)² - a² - b²
    };
  }
  // multiply by u + 1
  mulByNonresidue({ c0, c1 }) {
    return this.mul({ c0, c1 }, this.NONRESIDUE);
  }
  frobeniusMap({ c0, c1 }, power) {
    return {
      c0,
      c1: this.Fp.mul(c1, this.FROBENIUS_COEFFICIENTS[power % 2])
    };
  }
};
var _Field6 = class {
  ORDER;
  BITS;
  BYTES;
  isLE;
  MASK = _1n6;
  ZERO;
  ONE;
  Fp2;
  FROBENIUS_COEFFICIENTS_1;
  FROBENIUS_COEFFICIENTS_2;
  constructor(Fp22) {
    this.Fp2 = Fp22;
    this.ORDER = Fp22.ORDER;
    this.BITS = 3 * Fp22.BITS;
    this.BYTES = 3 * Fp22.BYTES;
    this.isLE = Fp22.isLE;
    this.ZERO = { c0: Fp22.ZERO, c1: Fp22.ZERO, c2: Fp22.ZERO };
    this.ONE = { c0: Fp22.ONE, c1: Fp22.ZERO, c2: Fp22.ZERO };
    const { Fp: Fp3 } = Fp22;
    const frob = calcFrobeniusCoefficients(Fp22, Fp22.NONRESIDUE, Fp3.ORDER, 6, 2, 3);
    this.FROBENIUS_COEFFICIENTS_1 = frob[0];
    this.FROBENIUS_COEFFICIENTS_2 = frob[1];
    Object.seal(this);
  }
  add({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.add(c0, r0),
      c1: Fp22.add(c1, r1),
      c2: Fp22.add(c2, r2)
    };
  }
  sub({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.sub(c0, r0),
      c1: Fp22.sub(c1, r1),
      c2: Fp22.sub(c2, r2)
    };
  }
  mul({ c0, c1, c2 }, rhs) {
    const { Fp2: Fp22 } = this;
    if (typeof rhs === "bigint") {
      return {
        c0: Fp22.mul(c0, rhs),
        c1: Fp22.mul(c1, rhs),
        c2: Fp22.mul(c2, rhs)
      };
    }
    const { c0: r0, c1: r1, c2: r2 } = rhs;
    const t0 = Fp22.mul(c0, r0);
    const t1 = Fp22.mul(c1, r1);
    const t2 = Fp22.mul(c2, r2);
    return {
      // t0 + (c1 + c2) * (r1 * r2) - (T1 + T2) * (u + 1)
      c0: Fp22.add(
        t0,
        Fp22.mulByNonresidue(Fp22.sub(Fp22.mul(Fp22.add(c1, c2), Fp22.add(r1, r2)), Fp22.add(t1, t2)))
      ),
      // (c0 + c1) * (r0 + r1) - (T0 + T1) + T2 * (u + 1)
      c1: Fp22.add(
        Fp22.sub(Fp22.mul(Fp22.add(c0, c1), Fp22.add(r0, r1)), Fp22.add(t0, t1)),
        Fp22.mulByNonresidue(t2)
      ),
      // T1 + (c0 + c2) * (r0 + r2) - T0 + T2
      c2: Fp22.sub(Fp22.add(t1, Fp22.mul(Fp22.add(c0, c2), Fp22.add(r0, r2))), Fp22.add(t0, t2))
    };
  }
  sqr({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    let t0 = Fp22.sqr(c0);
    let t1 = Fp22.mul(Fp22.mul(c0, c1), _2n4);
    let t3 = Fp22.mul(Fp22.mul(c1, c2), _2n4);
    let t4 = Fp22.sqr(c2);
    return {
      c0: Fp22.add(Fp22.mulByNonresidue(t3), t0),
      // T3 * (u + 1) + T0
      c1: Fp22.add(Fp22.mulByNonresidue(t4), t1),
      // T4 * (u + 1) + T1
      // T1 + (c0 - c1 + c2)² + T3 - T0 - T4
      c2: Fp22.sub(Fp22.sub(Fp22.add(Fp22.add(t1, Fp22.sqr(Fp22.add(Fp22.sub(c0, c1), c2))), t3), t0), t4)
    };
  }
  addN(a, b) {
    return this.add(a, b);
  }
  subN(a, b) {
    return this.sub(a, b);
  }
  mulN(a, b) {
    return this.mul(a, b);
  }
  sqrN(a) {
    return this.sqr(a);
  }
  create(num) {
    return num;
  }
  isValid({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return Fp22.isValid(c0) && Fp22.isValid(c1) && Fp22.isValid(c2);
  }
  is0({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return Fp22.is0(c0) && Fp22.is0(c1) && Fp22.is0(c2);
  }
  isValidNot0(num) {
    return !this.is0(num) && this.isValid(num);
  }
  neg({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return { c0: Fp22.neg(c0), c1: Fp22.neg(c1), c2: Fp22.neg(c2) };
  }
  eql({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
    const { Fp2: Fp22 } = this;
    return Fp22.eql(c0, r0) && Fp22.eql(c1, r1) && Fp22.eql(c2, r2);
  }
  sqrt(_) {
    return notImplemented();
  }
  // Do we need division by bigint at all? Should be done via order:
  div(lhs, rhs) {
    const { Fp2: Fp22 } = this;
    const { Fp: Fp3 } = Fp22;
    return this.mul(lhs, typeof rhs === "bigint" ? Fp3.inv(Fp3.create(rhs)) : this.inv(rhs));
  }
  pow(num, power) {
    return FpPow(this, num, power);
  }
  invertBatch(nums) {
    return FpInvertBatch(this, nums);
  }
  inv({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    let t0 = Fp22.sub(Fp22.sqr(c0), Fp22.mulByNonresidue(Fp22.mul(c2, c1)));
    let t1 = Fp22.sub(Fp22.mulByNonresidue(Fp22.sqr(c2)), Fp22.mul(c0, c1));
    let t2 = Fp22.sub(Fp22.sqr(c1), Fp22.mul(c0, c2));
    let t4 = Fp22.inv(
      Fp22.add(Fp22.mulByNonresidue(Fp22.add(Fp22.mul(c2, t1), Fp22.mul(c1, t2))), Fp22.mul(c0, t0))
    );
    return { c0: Fp22.mul(t4, t0), c1: Fp22.mul(t4, t1), c2: Fp22.mul(t4, t2) };
  }
  // Bytes utils
  fromBytes(b) {
    const { Fp2: Fp22 } = this;
    if (b.length !== this.BYTES) throw new Error("fromBytes invalid length=" + b.length);
    const B2 = Fp22.BYTES;
    return {
      c0: Fp22.fromBytes(b.subarray(0, B2)),
      c1: Fp22.fromBytes(b.subarray(B2, B2 * 2)),
      c2: Fp22.fromBytes(b.subarray(2 * B2))
    };
  }
  toBytes({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return concatBytes(Fp22.toBytes(c0), Fp22.toBytes(c1), Fp22.toBytes(c2));
  }
  cmov({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }, c) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.cmov(c0, r0, c),
      c1: Fp22.cmov(c1, r1, c),
      c2: Fp22.cmov(c2, r2, c)
    };
  }
  fromBigSix(t) {
    const { Fp2: Fp22 } = this;
    if (!Array.isArray(t) || t.length !== 6) throw new Error("invalid Fp6 usage");
    return {
      c0: Fp22.fromBigTuple(t.slice(0, 2)),
      c1: Fp22.fromBigTuple(t.slice(2, 4)),
      c2: Fp22.fromBigTuple(t.slice(4, 6))
    };
  }
  frobeniusMap({ c0, c1, c2 }, power) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.frobeniusMap(c0, power),
      c1: Fp22.mul(Fp22.frobeniusMap(c1, power), this.FROBENIUS_COEFFICIENTS_1[power % 6]),
      c2: Fp22.mul(Fp22.frobeniusMap(c2, power), this.FROBENIUS_COEFFICIENTS_2[power % 6])
    };
  }
  mulByFp2({ c0, c1, c2 }, rhs) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.mul(c0, rhs),
      c1: Fp22.mul(c1, rhs),
      c2: Fp22.mul(c2, rhs)
    };
  }
  mulByNonresidue({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return { c0: Fp22.mulByNonresidue(c2), c1: c0, c2: c1 };
  }
  // Sparse multiplication
  mul1({ c0, c1, c2 }, b1) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.mulByNonresidue(Fp22.mul(c2, b1)),
      c1: Fp22.mul(c0, b1),
      c2: Fp22.mul(c1, b1)
    };
  }
  // Sparse multiplication
  mul01({ c0, c1, c2 }, b0, b1) {
    const { Fp2: Fp22 } = this;
    let t0 = Fp22.mul(c0, b0);
    let t1 = Fp22.mul(c1, b1);
    return {
      // ((c1 + c2) * b1 - T1) * (u + 1) + T0
      c0: Fp22.add(Fp22.mulByNonresidue(Fp22.sub(Fp22.mul(Fp22.add(c1, c2), b1), t1)), t0),
      // (b0 + b1) * (c0 + c1) - T0 - T1
      c1: Fp22.sub(Fp22.sub(Fp22.mul(Fp22.add(b0, b1), Fp22.add(c0, c1)), t0), t1),
      // (c0 + c2) * b0 - T0 + T1
      c2: Fp22.add(Fp22.sub(Fp22.mul(Fp22.add(c0, c2), b0), t0), t1)
    };
  }
};
var _Field12 = class {
  ORDER;
  BITS;
  BYTES;
  isLE;
  MASK = _1n6;
  ZERO;
  ONE;
  Fp6;
  FROBENIUS_COEFFICIENTS;
  X_LEN;
  finalExponentiate;
  constructor(Fp62, opts) {
    const { Fp2: Fp22 } = Fp62;
    const { Fp: Fp3 } = Fp22;
    this.Fp6 = Fp62;
    this.ORDER = Fp22.ORDER;
    this.BITS = 2 * Fp62.BITS;
    this.BYTES = 2 * Fp62.BYTES;
    this.isLE = Fp62.isLE;
    this.ZERO = { c0: Fp62.ZERO, c1: Fp62.ZERO };
    this.ONE = { c0: Fp62.ONE, c1: Fp62.ZERO };
    this.FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(
      Fp22,
      Fp22.NONRESIDUE,
      Fp3.ORDER,
      12,
      1,
      6
    )[0];
    this.X_LEN = opts.X_LEN;
    this.finalExponentiate = opts.Fp12finalExponentiate;
  }
  create(num) {
    return num;
  }
  isValid({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return Fp62.isValid(c0) && Fp62.isValid(c1);
  }
  is0({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return Fp62.is0(c0) && Fp62.is0(c1);
  }
  isValidNot0(num) {
    return !this.is0(num) && this.isValid(num);
  }
  neg({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return { c0: Fp62.neg(c0), c1: Fp62.neg(c1) };
  }
  eql({ c0, c1 }, { c0: r0, c1: r1 }) {
    const { Fp6: Fp62 } = this;
    return Fp62.eql(c0, r0) && Fp62.eql(c1, r1);
  }
  sqrt(_) {
    notImplemented();
  }
  inv({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    let t = Fp62.inv(Fp62.sub(Fp62.sqr(c0), Fp62.mulByNonresidue(Fp62.sqr(c1))));
    return { c0: Fp62.mul(c0, t), c1: Fp62.neg(Fp62.mul(c1, t)) };
  }
  div(lhs, rhs) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const { Fp: Fp3 } = Fp22;
    return this.mul(lhs, typeof rhs === "bigint" ? Fp3.inv(Fp3.create(rhs)) : this.inv(rhs));
  }
  pow(num, power) {
    return FpPow(this, num, power);
  }
  invertBatch(nums) {
    return FpInvertBatch(this, nums);
  }
  // Normalized
  add({ c0, c1 }, { c0: r0, c1: r1 }) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.add(c0, r0),
      c1: Fp62.add(c1, r1)
    };
  }
  sub({ c0, c1 }, { c0: r0, c1: r1 }) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.sub(c0, r0),
      c1: Fp62.sub(c1, r1)
    };
  }
  mul({ c0, c1 }, rhs) {
    const { Fp6: Fp62 } = this;
    if (typeof rhs === "bigint") return { c0: Fp62.mul(c0, rhs), c1: Fp62.mul(c1, rhs) };
    let { c0: r0, c1: r1 } = rhs;
    let t1 = Fp62.mul(c0, r0);
    let t2 = Fp62.mul(c1, r1);
    return {
      c0: Fp62.add(t1, Fp62.mulByNonresidue(t2)),
      // T1 + T2 * v
      // (c0 + c1) * (r0 + r1) - (T1 + T2)
      c1: Fp62.sub(Fp62.mul(Fp62.add(c0, c1), Fp62.add(r0, r1)), Fp62.add(t1, t2))
    };
  }
  sqr({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    let ab = Fp62.mul(c0, c1);
    return {
      // (c1 * v + c0) * (c0 + c1) - AB - AB * v
      c0: Fp62.sub(
        Fp62.sub(Fp62.mul(Fp62.add(Fp62.mulByNonresidue(c1), c0), Fp62.add(c0, c1)), ab),
        Fp62.mulByNonresidue(ab)
      ),
      c1: Fp62.add(ab, ab)
    };
  }
  // NonNormalized stuff
  addN(a, b) {
    return this.add(a, b);
  }
  subN(a, b) {
    return this.sub(a, b);
  }
  mulN(a, b) {
    return this.mul(a, b);
  }
  sqrN(a) {
    return this.sqr(a);
  }
  // Bytes utils
  fromBytes(b) {
    const { Fp6: Fp62 } = this;
    if (b.length !== this.BYTES) throw new Error("fromBytes invalid length=" + b.length);
    return {
      c0: Fp62.fromBytes(b.subarray(0, Fp62.BYTES)),
      c1: Fp62.fromBytes(b.subarray(Fp62.BYTES))
    };
  }
  toBytes({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return concatBytes(Fp62.toBytes(c0), Fp62.toBytes(c1));
  }
  cmov({ c0, c1 }, { c0: r0, c1: r1 }, c) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.cmov(c0, r0, c),
      c1: Fp62.cmov(c1, r1, c)
    };
  }
  // Utils
  // toString() {
  //   return '' + 'Fp12(' + this.c0 + this.c1 + '* w');
  // },
  // fromTuple(c: [Fp6, Fp6]) {
  //   return new Fp12(...c);
  // }
  fromBigTwelve(t) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.fromBigSix(t.slice(0, 6)),
      c1: Fp62.fromBigSix(t.slice(6, 12))
    };
  }
  // Raises to q**i -th power
  frobeniusMap(lhs, power) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const { c0, c1, c2 } = Fp62.frobeniusMap(lhs.c1, power);
    const coeff = this.FROBENIUS_COEFFICIENTS[power % 12];
    return {
      c0: Fp62.frobeniusMap(lhs.c0, power),
      c1: Fp62.create({
        c0: Fp22.mul(c0, coeff),
        c1: Fp22.mul(c1, coeff),
        c2: Fp22.mul(c2, coeff)
      })
    };
  }
  mulByFp2({ c0, c1 }, rhs) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.mulByFp2(c0, rhs),
      c1: Fp62.mulByFp2(c1, rhs)
    };
  }
  conjugate({ c0, c1 }) {
    return { c0, c1: this.Fp6.neg(c1) };
  }
  // Sparse multiplication
  mul014({ c0, c1 }, o0, o1, o4) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    let t0 = Fp62.mul01(c0, o0, o1);
    let t1 = Fp62.mul1(c1, o4);
    return {
      c0: Fp62.add(Fp62.mulByNonresidue(t1), t0),
      // T1 * v + T0
      // (c1 + c0) * [o0, o1+o4] - T0 - T1
      c1: Fp62.sub(Fp62.sub(Fp62.mul01(Fp62.add(c1, c0), o0, Fp22.add(o1, o4)), t0), t1)
    };
  }
  mul034({ c0, c1 }, o0, o3, o4) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const a = Fp62.create({
      c0: Fp22.mul(c0.c0, o0),
      c1: Fp22.mul(c0.c1, o0),
      c2: Fp22.mul(c0.c2, o0)
    });
    const b = Fp62.mul01(c1, o3, o4);
    const e = Fp62.mul01(Fp62.add(c0, c1), Fp22.add(o0, o3), o4);
    return {
      c0: Fp62.add(Fp62.mulByNonresidue(b), a),
      c1: Fp62.sub(e, Fp62.add(a, b))
    };
  }
  // A cyclotomic group is a subgroup of Fp^n defined by
  //   GΦₙ(p) = {α ∈ Fpⁿ : α^Φₙ(p) = 1}
  // The result of any pairing is in a cyclotomic subgroup
  // https://eprint.iacr.org/2009/565.pdf
  // https://eprint.iacr.org/2010/354.pdf
  _cyclotomicSquare({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const { c0: c0c0, c1: c0c1, c2: c0c2 } = c0;
    const { c0: c1c0, c1: c1c1, c2: c1c2 } = c1;
    const { first: t3, second: t4 } = Fp22.Fp4Square(c0c0, c1c1);
    const { first: t5, second: t6 } = Fp22.Fp4Square(c1c0, c0c2);
    const { first: t7, second: t8 } = Fp22.Fp4Square(c0c1, c1c2);
    const t9 = Fp22.mulByNonresidue(t8);
    return {
      c0: Fp62.create({
        c0: Fp22.add(Fp22.mul(Fp22.sub(t3, c0c0), _2n4), t3),
        // 2 * (T3 - c0c0)  + T3
        c1: Fp22.add(Fp22.mul(Fp22.sub(t5, c0c1), _2n4), t5),
        // 2 * (T5 - c0c1)  + T5
        c2: Fp22.add(Fp22.mul(Fp22.sub(t7, c0c2), _2n4), t7)
      }),
      // 2 * (T7 - c0c2)  + T7
      c1: Fp62.create({
        c0: Fp22.add(Fp22.mul(Fp22.add(t9, c1c0), _2n4), t9),
        // 2 * (T9 + c1c0) + T9
        c1: Fp22.add(Fp22.mul(Fp22.add(t4, c1c1), _2n4), t4),
        // 2 * (T4 + c1c1) + T4
        c2: Fp22.add(Fp22.mul(Fp22.add(t6, c1c2), _2n4), t6)
      })
    };
  }
  // https://eprint.iacr.org/2009/565.pdf
  _cyclotomicExp(num, n) {
    let z = this.ONE;
    for (let i = this.X_LEN - 1; i >= 0; i--) {
      z = this._cyclotomicSquare(z);
      if (bitGet(n, i)) z = this.mul(z, num);
    }
    return z;
  }
};
function tower12(opts) {
  const Fp3 = Field(opts.ORDER);
  const Fp22 = new _Field2(Fp3, opts);
  const Fp62 = new _Field6(Fp22);
  const Fp122 = new _Field12(Fp62, opts);
  return { Fp: Fp3, Fp2: Fp22, Fp6: Fp62, Fp12: Fp122 };
}

// vendor/noble-curves/src/bls12-381.ts
var _0n7 = BigInt(0);
var _1n7 = BigInt(1);
var _2n5 = BigInt(2);
var _3n5 = BigInt(3);
var _4n3 = BigInt(4);
var BLS_X = BigInt("0xd201000000010000");
var BLS_X_LEN = bitLen(BLS_X);
var bls12_381_CURVE_G1 = {
  p: BigInt(
    "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab"
  ),
  n: BigInt("0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001"),
  h: BigInt("0x396c8c005555e1568c00aaab0000aaab"),
  a: _0n7,
  b: _4n3,
  Gx: BigInt(
    "0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb"
  ),
  Gy: BigInt(
    "0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1"
  )
};
var bls12_381_Fr = Field(bls12_381_CURVE_G1.n, {
  modFromBytes: true,
  isLE: true
});
var { Fp, Fp2, Fp6, Fp12 } = tower12({
  ORDER: bls12_381_CURVE_G1.p,
  X_LEN: BLS_X_LEN,
  // Finite extension field over irreducible polynominal.
  // Fp(u) / (u² - β) where β = -1
  FP2_NONRESIDUE: [_1n7, _1n7],
  Fp2mulByB: ({ c0, c1 }) => {
    const t0 = Fp.mul(c0, _4n3);
    const t1 = Fp.mul(c1, _4n3);
    return { c0: Fp.sub(t0, t1), c1: Fp.add(t0, t1) };
  },
  Fp12finalExponentiate: (num) => {
    const x = BLS_X;
    const t0 = Fp12.div(Fp12.frobeniusMap(num, 6), num);
    const t1 = Fp12.mul(Fp12.frobeniusMap(t0, 2), t0);
    const t2 = Fp12.conjugate(Fp12._cyclotomicExp(t1, x));
    const t3 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicSquare(t1)), t2);
    const t4 = Fp12.conjugate(Fp12._cyclotomicExp(t3, x));
    const t5 = Fp12.conjugate(Fp12._cyclotomicExp(t4, x));
    const t6 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicExp(t5, x)), Fp12._cyclotomicSquare(t2));
    const t7 = Fp12.conjugate(Fp12._cyclotomicExp(t6, x));
    const t2_t5_pow_q2 = Fp12.frobeniusMap(Fp12.mul(t2, t5), 2);
    const t4_t1_pow_q3 = Fp12.frobeniusMap(Fp12.mul(t4, t1), 3);
    const t6_t1c_pow_q1 = Fp12.frobeniusMap(Fp12.mul(t6, Fp12.conjugate(t1)), 1);
    const t7_t3c_t1 = Fp12.mul(Fp12.mul(t7, Fp12.conjugate(t3)), t1);
    return Fp12.mul(Fp12.mul(Fp12.mul(t2_t5_pow_q2, t4_t1_pow_q3), t6_t1c_pow_q1), t7_t3c_t1);
  }
});
var { G2psi, G2psi2 } = psiFrobenius(Fp, Fp2, Fp2.div(Fp2.ONE, Fp2.NONRESIDUE));
var htfDefaults = Object.freeze({
  DST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
  encodeDST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
  p: Fp.ORDER,
  m: 2,
  k: 128,
  expand: "xmd",
  hash: sha256
});
var bls12_381_CURVE_G2 = {
  p: Fp2.ORDER,
  n: bls12_381_CURVE_G1.n,
  h: BigInt(
    "0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5"
  ),
  a: Fp2.ZERO,
  b: Fp2.fromBigTuple([_4n3, _4n3]),
  Gx: Fp2.fromBigTuple([
    BigInt(
      "0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8"
    ),
    BigInt(
      "0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e"
    )
  ]),
  Gy: Fp2.fromBigTuple([
    BigInt(
      "0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801"
    ),
    BigInt(
      "0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79be"
    )
  ])
};
var COMPZERO = setMask(Fp.toBytes(_0n7), { infinity: true, compressed: true });
function parseMask(bytes) {
  bytes = bytes.slice();
  const mask = bytes[0] & 224;
  const compressed = !!(mask >> 7 & 1);
  const infinity = !!(mask >> 6 & 1);
  const sort = !!(mask >> 5 & 1);
  bytes[0] &= 31;
  return { compressed, infinity, sort, value: bytes };
}
function setMask(bytes, mask) {
  if (bytes[0] & 224) throw new Error("setMask: non-empty mask");
  if (mask.compressed) bytes[0] |= 128;
  if (mask.infinity) bytes[0] |= 64;
  if (mask.sort) bytes[0] |= 32;
  return bytes;
}
function pointG1ToBytes(_c, point, isComp) {
  const { BYTES: L, ORDER: P } = Fp;
  const is0 = point.is0();
  const { x, y } = point.toAffine();
  if (isComp) {
    if (is0) return COMPZERO.slice();
    const sort = Boolean(y * _2n5 / P);
    return setMask(numberToBytesBE(x, L), { compressed: true, sort });
  } else {
    if (is0) {
      return concatBytes(Uint8Array.of(64), new Uint8Array(2 * L - 1));
    } else {
      return concatBytes(numberToBytesBE(x, L), numberToBytesBE(y, L));
    }
  }
}
function signatureG1ToBytes(point) {
  point.assertValidity();
  const { BYTES: L, ORDER: P } = Fp;
  const { x, y } = point.toAffine();
  if (point.is0()) return COMPZERO.slice();
  const sort = Boolean(y * _2n5 / P);
  return setMask(numberToBytesBE(x, L), { compressed: true, sort });
}
function pointG1FromBytes(bytes) {
  const { compressed, infinity, sort, value } = parseMask(bytes);
  const { BYTES: L, ORDER: P } = Fp;
  if (value.length === 48 && compressed) {
    const compressedValue = bytesToNumberBE(value);
    const x = Fp.create(compressedValue & bitMask(Fp.BITS));
    if (infinity) {
      if (x !== _0n7) throw new Error("invalid G1 point: non-empty, at infinity, with compression");
      return { x: _0n7, y: _0n7 };
    }
    const right = Fp.add(Fp.pow(x, _3n5), Fp.create(bls12_381_CURVE_G1.b));
    let y = Fp.sqrt(right);
    if (!y) throw new Error("invalid G1 point: compressed point");
    if (y * _2n5 / P !== BigInt(sort)) y = Fp.neg(y);
    return { x: Fp.create(x), y: Fp.create(y) };
  } else if (value.length === 96 && !compressed) {
    const x = bytesToNumberBE(value.subarray(0, L));
    const y = bytesToNumberBE(value.subarray(L));
    if (infinity) {
      if (x !== _0n7 || y !== _0n7) throw new Error("G1: non-empty point at infinity");
      return bls12_381.G1.Point.ZERO.toAffine();
    }
    return { x: Fp.create(x), y: Fp.create(y) };
  } else {
    throw new Error("invalid G1 point: expected 48/96 bytes");
  }
}
function signatureG1FromBytes(hex) {
  const { infinity, sort, value } = parseMask(ensureBytes("signatureHex", hex, 48));
  const P = Fp.ORDER;
  const Point = bls12_381.G1.Point;
  const compressedValue = bytesToNumberBE(value);
  if (infinity) return Point.ZERO;
  const x = Fp.create(compressedValue & bitMask(Fp.BITS));
  const right = Fp.add(Fp.pow(x, _3n5), Fp.create(bls12_381_CURVE_G1.b));
  let y = Fp.sqrt(right);
  if (!y) throw new Error("invalid G1 point: compressed");
  const aflag = BigInt(sort);
  if (y * _2n5 / P !== aflag) y = Fp.neg(y);
  const point = Point.fromAffine({ x, y });
  point.assertValidity();
  return point;
}
function pointG2ToBytes(_c, point, isComp) {
  const { BYTES: L, ORDER: P } = Fp;
  const is0 = point.is0();
  const { x, y } = point.toAffine();
  if (isComp) {
    if (is0) return concatBytes(COMPZERO, numberToBytesBE(_0n7, L));
    const flag = Boolean(y.c1 === _0n7 ? y.c0 * _2n5 / P : y.c1 * _2n5 / P);
    return concatBytes(
      setMask(numberToBytesBE(x.c1, L), { compressed: true, sort: flag }),
      numberToBytesBE(x.c0, L)
    );
  } else {
    if (is0) return concatBytes(Uint8Array.of(64), new Uint8Array(4 * L - 1));
    const { re: x0, im: x1 } = Fp2.reim(x);
    const { re: y0, im: y1 } = Fp2.reim(y);
    return concatBytes(
      numberToBytesBE(x1, L),
      numberToBytesBE(x0, L),
      numberToBytesBE(y1, L),
      numberToBytesBE(y0, L)
    );
  }
}
function signatureG2ToBytes(point) {
  point.assertValidity();
  const { BYTES: L } = Fp;
  if (point.is0()) return concatBytes(COMPZERO, numberToBytesBE(_0n7, L));
  const { x, y } = point.toAffine();
  const { re: x0, im: x1 } = Fp2.reim(x);
  const { re: y0, im: y1 } = Fp2.reim(y);
  const tmp = y1 > _0n7 ? y1 * _2n5 : y0 * _2n5;
  const sort = Boolean(tmp / Fp.ORDER & _1n7);
  const z2 = x0;
  return concatBytes(
    setMask(numberToBytesBE(x1, L), { sort, compressed: true }),
    numberToBytesBE(z2, L)
  );
}
function pointG2FromBytes(bytes) {
  const { BYTES: L, ORDER: P } = Fp;
  const { compressed, infinity, sort, value } = parseMask(bytes);
  if (!compressed && !infinity && sort || // 00100000
  !compressed && infinity && sort || // 01100000
  sort && infinity && compressed) {
    throw new Error("invalid encoding flag: " + (bytes[0] & 224));
  }
  const slc = (b, from, to) => bytesToNumberBE(b.slice(from, to));
  if (value.length === 96 && compressed) {
    if (infinity) {
      if (value.reduce((p, c) => p !== 0 ? c + 1 : c, 0) > 0) {
        throw new Error("invalid G2 point: compressed");
      }
      return { x: Fp2.ZERO, y: Fp2.ZERO };
    }
    const x_1 = slc(value, 0, L);
    const x_0 = slc(value, L, 2 * L);
    const x = Fp2.create({ c0: Fp.create(x_0), c1: Fp.create(x_1) });
    const right = Fp2.add(Fp2.pow(x, _3n5), bls12_381_CURVE_G2.b);
    let y = Fp2.sqrt(right);
    const Y_bit = y.c1 === _0n7 ? y.c0 * _2n5 / P : y.c1 * _2n5 / P ? _1n7 : _0n7;
    y = sort && Y_bit > 0 ? y : Fp2.neg(y);
    return { x, y };
  } else if (value.length === 192 && !compressed) {
    if (infinity) {
      if (value.reduce((p, c) => p !== 0 ? c + 1 : c, 0) > 0) {
        throw new Error("invalid G2 point: uncompressed");
      }
      return { x: Fp2.ZERO, y: Fp2.ZERO };
    }
    const x1 = slc(value, 0 * L, 1 * L);
    const x0 = slc(value, 1 * L, 2 * L);
    const y1 = slc(value, 2 * L, 3 * L);
    const y0 = slc(value, 3 * L, 4 * L);
    return { x: Fp2.fromBigTuple([x0, x1]), y: Fp2.fromBigTuple([y0, y1]) };
  } else {
    throw new Error("invalid G2 point: expected 96/192 bytes");
  }
}
function signatureG2FromBytes(hex) {
  const { ORDER: P } = Fp;
  const { infinity, sort, value } = parseMask(ensureBytes("signatureHex", hex));
  const Point = bls12_381.G2.Point;
  const half = value.length / 2;
  if (half !== 48 && half !== 96)
    throw new Error("invalid compressed signature length, expected 96/192 bytes");
  const z1 = bytesToNumberBE(value.slice(0, half));
  const z2 = bytesToNumberBE(value.slice(half));
  if (infinity) return Point.ZERO;
  const x1 = Fp.create(z1 & bitMask(Fp.BITS));
  const x2 = Fp.create(z2);
  const x = Fp2.create({ c0: x2, c1: x1 });
  const y2 = Fp2.add(Fp2.pow(x, _3n5), bls12_381_CURVE_G2.b);
  let y = Fp2.sqrt(y2);
  if (!y) throw new Error("Failed to find a square root");
  const { re: y0, im: y1 } = Fp2.reim(y);
  const aflag1 = BigInt(sort);
  const isGreater = y1 > _0n7 && y1 * _2n5 / P !== aflag1;
  const is0 = y1 === _0n7 && y0 * _2n5 / P !== aflag1;
  if (isGreater || is0) y = Fp2.neg(y);
  const point = Point.fromAffine({ x, y });
  point.assertValidity();
  return point;
}
var bls12_381 = bls({
  // Fields
  fields: {
    Fp,
    Fp2,
    Fp6,
    Fp12,
    Fr: bls12_381_Fr
  },
  // G1: y² = x³ + 4
  G1: {
    ...bls12_381_CURVE_G1,
    Fp,
    htfDefaults: { ...htfDefaults, m: 1, DST: "BLS_SIG_BLS12381G1_XMD:SHA-256_SSWU_RO_NUL_" },
    wrapPrivateKey: true,
    allowInfinityPoint: true,
    // Checks is the point resides in prime-order subgroup.
    // point.isTorsionFree() should return true for valid points
    // It returns false for shitty points.
    // https://eprint.iacr.org/2021/1130.pdf
    isTorsionFree: (c, point) => {
      const beta = BigInt(
        "0x5f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe"
      );
      const phi = new c(Fp.mul(point.X, beta), point.Y, point.Z);
      const xP = point.multiplyUnsafe(BLS_X).negate();
      const u2P = xP.multiplyUnsafe(BLS_X);
      return u2P.equals(phi);
    },
    // Clear cofactor of G1
    // https://eprint.iacr.org/2019/403
    clearCofactor: (_c, point) => {
      return point.multiplyUnsafe(BLS_X).add(point);
    },
    mapToCurve: mapToG1,
    fromBytes: pointG1FromBytes,
    toBytes: pointG1ToBytes,
    ShortSignature: {
      fromBytes(bytes) {
        abytes(bytes);
        return signatureG1FromBytes(bytes);
      },
      fromHex(hex) {
        return signatureG1FromBytes(hex);
      },
      toBytes(point) {
        return signatureG1ToBytes(point);
      },
      toRawBytes(point) {
        return signatureG1ToBytes(point);
      },
      toHex(point) {
        return bytesToHex(signatureG1ToBytes(point));
      }
    }
  },
  G2: {
    ...bls12_381_CURVE_G2,
    Fp: Fp2,
    // https://datatracker.ietf.org/doc/html/rfc9380#name-clearing-the-cofactor
    // https://datatracker.ietf.org/doc/html/rfc9380#name-cofactor-clearing-for-bls12
    hEff: BigInt(
      "0xbc69f08f2ee75b3584c6a0ea91b352888e2a8e9145ad7689986ff031508ffe1329c2f178731db956d82bf015d1212b02ec0ec69d7477c1ae954cbc06689f6a359894c0adebbf6b4e8020005aaa95551"
    ),
    htfDefaults: { ...htfDefaults },
    wrapPrivateKey: true,
    allowInfinityPoint: true,
    mapToCurve: mapToG2,
    // Checks is the point resides in prime-order subgroup.
    // point.isTorsionFree() should return true for valid points
    // It returns false for shitty points.
    // https://eprint.iacr.org/2021/1130.pdf
    // Older version: https://eprint.iacr.org/2019/814.pdf
    isTorsionFree: (c, P) => {
      return P.multiplyUnsafe(BLS_X).negate().equals(G2psi(c, P));
    },
    // Maps the point into the prime-order subgroup G2.
    // clear_cofactor_bls12381_g2 from RFC 9380.
    // https://eprint.iacr.org/2017/419.pdf
    // prettier-ignore
    clearCofactor: (c, P) => {
      const x = BLS_X;
      let t1 = P.multiplyUnsafe(x).negate();
      let t2 = G2psi(c, P);
      let t3 = P.double();
      t3 = G2psi2(c, t3);
      t3 = t3.subtract(t2);
      t2 = t1.add(t2);
      t2 = t2.multiplyUnsafe(x).negate();
      t3 = t3.add(t2);
      t3 = t3.subtract(t1);
      const Q = t3.subtract(P);
      return Q;
    },
    fromBytes: pointG2FromBytes,
    toBytes: pointG2ToBytes,
    Signature: {
      fromBytes(bytes) {
        abytes(bytes);
        return signatureG2FromBytes(bytes);
      },
      fromHex(hex) {
        return signatureG2FromBytes(hex);
      },
      toBytes(point) {
        return signatureG2ToBytes(point);
      },
      toRawBytes(point) {
        return signatureG2ToBytes(point);
      },
      toHex(point) {
        return bytesToHex(signatureG2ToBytes(point));
      }
    }
  },
  params: {
    ateLoopSize: BLS_X,
    // The BLS parameter x for BLS12-381
    r: bls12_381_CURVE_G1.n,
    // order; z⁴ − z² + 1; CURVE.n from other curves
    xNegative: true,
    twistType: "multiplicative"
  },
  htfDefaults,
  hash: sha256
});
var isogenyMapG2 = isogenyMap(
  Fp2,
  [
    // xNum
    [
      [
        "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6",
        "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6"
      ],
      [
        "0x0",
        "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71a"
      ],
      [
        "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71e",
        "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38d"
      ],
      [
        "0x171d6541fa38ccfaed6dea691f5fb614cb14b4e7f4e810aa22d6108f142b85757098e38d0f671c7188e2aaaaaaaa5ed1",
        "0x0"
      ]
    ],
    // xDen
    [
      [
        "0x0",
        "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa63"
      ],
      [
        "0xc",
        "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9f"
      ],
      ["0x1", "0x0"]
      // LAST 1
    ],
    // yNum
    [
      [
        "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706",
        "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706"
      ],
      [
        "0x0",
        "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97be"
      ],
      [
        "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71c",
        "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38f"
      ],
      [
        "0x124c9ad43b6cf79bfbf7043de3811ad0761b0f37a1e26286b0e977c69aa274524e79097a56dc4bd9e1b371c71c718b10",
        "0x0"
      ]
    ],
    // yDen
    [
      [
        "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb",
        "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb"
      ],
      [
        "0x0",
        "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa9d3"
      ],
      [
        "0x12",
        "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa99"
      ],
      ["0x1", "0x0"]
      // LAST 1
    ]
  ].map((i) => i.map((pair) => Fp2.fromBigTuple(pair.map(BigInt))))
);
var isogenyMapG1 = isogenyMap(
  Fp,
  [
    // xNum
    [
      "0x11a05f2b1e833340b809101dd99815856b303e88a2d7005ff2627b56cdb4e2c85610c2d5f2e62d6eaeac1662734649b7",
      "0x17294ed3e943ab2f0588bab22147a81c7c17e75b2f6a8417f565e33c70d1e86b4838f2a6f318c356e834eef1b3cb83bb",
      "0xd54005db97678ec1d1048c5d10a9a1bce032473295983e56878e501ec68e25c958c3e3d2a09729fe0179f9dac9edcb0",
      "0x1778e7166fcc6db74e0609d307e55412d7f5e4656a8dbf25f1b33289f1b330835336e25ce3107193c5b388641d9b6861",
      "0xe99726a3199f4436642b4b3e4118e5499db995a1257fb3f086eeb65982fac18985a286f301e77c451154ce9ac8895d9",
      "0x1630c3250d7313ff01d1201bf7a74ab5db3cb17dd952799b9ed3ab9097e68f90a0870d2dcae73d19cd13c1c66f652983",
      "0xd6ed6553fe44d296a3726c38ae652bfb11586264f0f8ce19008e218f9c86b2a8da25128c1052ecaddd7f225a139ed84",
      "0x17b81e7701abdbe2e8743884d1117e53356de5ab275b4db1a682c62ef0f2753339b7c8f8c8f475af9ccb5618e3f0c88e",
      "0x80d3cf1f9a78fc47b90b33563be990dc43b756ce79f5574a2c596c928c5d1de4fa295f296b74e956d71986a8497e317",
      "0x169b1f8e1bcfa7c42e0c37515d138f22dd2ecb803a0c5c99676314baf4bb1b7fa3190b2edc0327797f241067be390c9e",
      "0x10321da079ce07e272d8ec09d2565b0dfa7dccdde6787f96d50af36003b14866f69b771f8c285decca67df3f1605fb7b",
      "0x6e08c248e260e70bd1e962381edee3d31d79d7e22c837bc23c0bf1bc24c6b68c24b1b80b64d391fa9c8ba2e8ba2d229"
    ],
    // xDen
    [
      "0x8ca8d548cff19ae18b2e62f4bd3fa6f01d5ef4ba35b48ba9c9588617fc8ac62b558d681be343df8993cf9fa40d21b1c",
      "0x12561a5deb559c4348b4711298e536367041e8ca0cf0800c0126c2588c48bf5713daa8846cb026e9e5c8276ec82b3bff",
      "0xb2962fe57a3225e8137e629bff2991f6f89416f5a718cd1fca64e00b11aceacd6a3d0967c94fedcfcc239ba5cb83e19",
      "0x3425581a58ae2fec83aafef7c40eb545b08243f16b1655154cca8abc28d6fd04976d5243eecf5c4130de8938dc62cd8",
      "0x13a8e162022914a80a6f1d5f43e7a07dffdfc759a12062bb8d6b44e833b306da9bd29ba81f35781d539d395b3532a21e",
      "0xe7355f8e4e667b955390f7f0506c6e9395735e9ce9cad4d0a43bcef24b8982f7400d24bc4228f11c02df9a29f6304a5",
      "0x772caacf16936190f3e0c63e0596721570f5799af53a1894e2e073062aede9cea73b3538f0de06cec2574496ee84a3a",
      "0x14a7ac2a9d64a8b230b3f5b074cf01996e7f63c21bca68a81996e1cdf9822c580fa5b9489d11e2d311f7d99bbdcc5a5e",
      "0xa10ecf6ada54f825e920b3dafc7a3cce07f8d1d7161366b74100da67f39883503826692abba43704776ec3a79a1d641",
      "0x95fc13ab9e92ad4476d6e3eb3a56680f682b4ee96f7d03776df533978f31c1593174e4b4b7865002d6384d168ecdd0a",
      "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
      // LAST 1
    ],
    // yNum
    [
      "0x90d97c81ba24ee0259d1f094980dcfa11ad138e48a869522b52af6c956543d3cd0c7aee9b3ba3c2be9845719707bb33",
      "0x134996a104ee5811d51036d776fb46831223e96c254f383d0f906343eb67ad34d6c56711962fa8bfe097e75a2e41c696",
      "0xcc786baa966e66f4a384c86a3b49942552e2d658a31ce2c344be4b91400da7d26d521628b00523b8dfe240c72de1f6",
      "0x1f86376e8981c217898751ad8746757d42aa7b90eeb791c09e4a3ec03251cf9de405aba9ec61deca6355c77b0e5f4cb",
      "0x8cc03fdefe0ff135caf4fe2a21529c4195536fbe3ce50b879833fd221351adc2ee7f8dc099040a841b6daecf2e8fedb",
      "0x16603fca40634b6a2211e11db8f0a6a074a7d0d4afadb7bd76505c3d3ad5544e203f6326c95a807299b23ab13633a5f0",
      "0x4ab0b9bcfac1bbcb2c977d027796b3ce75bb8ca2be184cb5231413c4d634f3747a87ac2460f415ec961f8855fe9d6f2",
      "0x987c8d5333ab86fde9926bd2ca6c674170a05bfe3bdd81ffd038da6c26c842642f64550fedfe935a15e4ca31870fb29",
      "0x9fc4018bd96684be88c9e221e4da1bb8f3abd16679dc26c1e8b6e6a1f20cabe69d65201c78607a360370e577bdba587",
      "0xe1bba7a1186bdb5223abde7ada14a23c42a0ca7915af6fe06985e7ed1e4d43b9b3f7055dd4eba6f2bafaaebca731c30",
      "0x19713e47937cd1be0dfd0b8f1d43fb93cd2fcbcb6caf493fd1183e416389e61031bf3a5cce3fbafce813711ad011c132",
      "0x18b46a908f36f6deb918c143fed2edcc523559b8aaf0c2462e6bfe7f911f643249d9cdf41b44d606ce07c8a4d0074d8e",
      "0xb182cac101b9399d155096004f53f447aa7b12a3426b08ec02710e807b4633f06c851c1919211f20d4c04f00b971ef8",
      "0x245a394ad1eca9b72fc00ae7be315dc757b3b080d4c158013e6632d3c40659cc6cf90ad1c232a6442d9d3f5db980133",
      "0x5c129645e44cf1102a159f748c4a3fc5e673d81d7e86568d9ab0f5d396a7ce46ba1049b6579afb7866b1e715475224b",
      "0x15e6be4e990f03ce4ea50b3b42df2eb5cb181d8f84965a3957add4fa95af01b2b665027efec01c7704b456be69c8b604"
    ],
    // yDen
    [
      "0x16112c4c3a9c98b252181140fad0eae9601a6de578980be6eec3232b5be72e7a07f3688ef60c206d01479253b03663c1",
      "0x1962d75c2381201e1a0cbd6c43c348b885c84ff731c4d59ca4a10356f453e01f78a4260763529e3532f6102c2e49a03d",
      "0x58df3306640da276faaae7d6e8eb15778c4855551ae7f310c35a5dd279cd2eca6757cd636f96f891e2538b53dbf67f2",
      "0x16b7d288798e5395f20d23bf89edb4d1d115c5dbddbcd30e123da489e726af41727364f2c28297ada8d26d98445f5416",
      "0xbe0e079545f43e4b00cc912f8228ddcc6d19c9f0f69bbb0542eda0fc9dec916a20b15dc0fd2ededda39142311a5001d",
      "0x8d9e5297186db2d9fb266eaac783182b70152c65550d881c5ecd87b6f0f5a6449f38db9dfa9cce202c6477faaf9b7ac",
      "0x166007c08a99db2fc3ba8734ace9824b5eecfdfa8d0cf8ef5dd365bc400a0051d5fa9c01a58b1fb93d1a1399126a775c",
      "0x16a3ef08be3ea7ea03bcddfabba6ff6ee5a4375efa1f4fd7feb34fd206357132b920f5b00801dee460ee415a15812ed9",
      "0x1866c8ed336c61231a1be54fd1d74cc4f9fb0ce4c6af5920abc5750c4bf39b4852cfe2f7bb9248836b233d9d55535d4a",
      "0x167a55cda70a6e1cea820597d94a84903216f763e13d87bb5308592e7ea7d4fbc7385ea3d529b35e346ef48bb8913f55",
      "0x4d2f259eea405bd48f010a01ad2911d9c6dd039bb61a6290e591b36e636a5c871a5c29f4f83060400f8b49cba8f6aa8",
      "0xaccbb67481d033ff5852c1e48c50c477f94ff8aefce42d28c0f9a88cea7913516f968986f7ebbea9684b529e2561092",
      "0xad6b9514c767fe3c3613144b45f1496543346d98adf02267d5ceef9a00d9b8693000763e3b90ac11e99b138573345cc",
      "0x2660400eb2e4f3b628bdd0d53cd76f2bf565b94e72927c1cb748df27942480e420517bd8714cc80d1fadc1326ed06f7",
      "0xe0fa1d816ddc03e6b24255e0d7819c171c40f65e273b853324efcd6356caa205ca2f570f13497804415473a1d634b8f",
      "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
      // LAST 1
    ]
  ].map((i) => i.map((j) => BigInt(j)))
);
var G1_SWU = mapToCurveSimpleSWU(Fp, {
  A: Fp.create(
    BigInt(
      "0x144698a3b8e9433d693a02c96d4982b0ea985383ee66a8d8e8981aefd881ac98936f8da0e0f97f5cf428082d584c1d"
    )
  ),
  B: Fp.create(
    BigInt(
      "0x12e2908d11688030018b12e8753eee3b2016c1f0f24f4070a0b9c14fcef35ef55a23215a316ceaa5d1cc48e98e172be0"
    )
  ),
  Z: Fp.create(BigInt(11))
});
var G2_SWU = mapToCurveSimpleSWU(Fp2, {
  A: Fp2.create({ c0: Fp.create(_0n7), c1: Fp.create(BigInt(240)) }),
  // A' = 240 * I
  B: Fp2.create({ c0: Fp.create(BigInt(1012)), c1: Fp.create(BigInt(1012)) }),
  // B' = 1012 * (1 + I)
  Z: Fp2.create({ c0: Fp.create(BigInt(-2)), c1: Fp.create(BigInt(-1)) })
  // Z: -(2 + I)
});
function mapToG1(scalars) {
  const { x, y } = G1_SWU(Fp.create(scalars[0]));
  return isogenyMapG1(x, y);
}
function mapToG2(scalars) {
  const { x, y } = G2_SWU(Fp2.fromBigTuple(scalars));
  return isogenyMapG2(x, y);
}

// vendor/tlock-js/src/crypto/ibe.ts
var import_buffer2 = __toESM(require_buffer(), 1);

// vendor/tlock-js/src/crypto/utils.ts
var import_buffer = __toESM(require_buffer(), 1);
function xor(a, b) {
  if (a.length != b.length) {
    throw new Error("Error: incompatible sizes");
  }
  const ret = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i++) {
    ret[i] = a[i] ^ b[i];
  }
  return ret;
}
function bytesToNumberBE2(uint8a) {
  return BigInt("0x" + bytesToHex2(Uint8Array.from(uint8a)));
}
var hexes2 = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, "0"));
function bytesToHex2(uint8a) {
  let hex = "";
  for (let i = 0; i < uint8a.length; i++) {
    hex += hexes2[uint8a[i]];
  }
  return hex;
}
function fpToBytes(fp) {
  const hex = fp.toString(16).padStart(96, "0");
  const buf = import_buffer.Buffer.alloc(hex.length / 2);
  buf.write(hex, "hex");
  return buf;
}
function fp2ToBytes(fp2) {
  return import_buffer.Buffer.concat([fp2.c1, fp2.c0].map(fpToBytes));
}
function fp6ToBytes(fp6) {
  return import_buffer.Buffer.concat([fp6.c2, fp6.c1, fp6.c0].map(fp2ToBytes));
}
function fp12ToBytes(fp12) {
  return import_buffer.Buffer.concat([fp12.c1, fp12.c0].map(fp6ToBytes));
}

// vendor/tlock-js/src/crypto/ibe.ts
var PointG1 = bls12_381.G1;
var PointG2 = bls12_381.G2;
async function encryptOnG1(master, ID, msg) {
  if (msg.length >> 8 > 1) {
    throw new Error("cannot encrypt messages larger than our hash output: 256 bits.");
  }
  const Qid = PointG2.hashToCurve(ID, { DST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_" });
  const m = PointG1.ProjectivePoint.fromHex(master);
  const Gid = bls12_381.pairing(m, Qid);
  const sigma = randomBytes(msg.length);
  const r = h3(sigma, msg);
  const U = PointG1.ProjectivePoint.BASE.multiply(r);
  const rGid = bls12_381.fields.Fp12.pow(Gid, r);
  const hrGid = gtToHash(rGid, msg.length);
  const V = xor(sigma, hrGid);
  const hsigma = h4(sigma, msg.length);
  const W = xor(msg, hsigma);
  return {
    U: U.toRawBytes(),
    V,
    W
  };
}
async function encryptOnG2(master, ID, msg) {
  return encOnG2(master, ID, msg, "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_");
}
async function encryptOnG2RFC9380(master, ID, msg) {
  return encOnG2(master, ID, msg, "BLS_SIG_BLS12381G1_XMD:SHA-256_SSWU_RO_NUL_");
}
async function encOnG2(master, ID, msg, dst) {
  if (msg.length >> 8 > 1) {
    throw new Error("cannot encrypt messages larger than our hash output: 256 bits.");
  }
  const Qid = PointG1.hashToCurve(ID, { DST: dst });
  const m = PointG2.ProjectivePoint.fromHex(master);
  const Gid = bls12_381.pairing(Qid, m);
  const sigma = randomBytes(msg.length);
  const r = h3(sigma, msg);
  const U = PointG2.ProjectivePoint.BASE.multiply(r);
  const rGid = bls12_381.fields.Fp12.pow(Gid, r);
  const hrGid = gtToHash(rGid, msg.length);
  const V = xor(sigma, hrGid);
  const hsigma = h4(sigma, msg.length);
  const W = xor(msg, hsigma);
  return {
    U: U.toRawBytes(),
    V,
    W
  };
}
async function decryptOnG1(key, ciphertext) {
  const Qid = PointG1.ProjectivePoint.fromHex(ciphertext.U);
  const m = PointG2.ProjectivePoint.fromHex(key);
  const gidt = bls12_381.pairing(Qid, m);
  const hgidt = gtToHash(gidt, ciphertext.W.length);
  if (hgidt.length != ciphertext.V.length) {
    throw new Error("XorSigma is of invalid length");
  }
  const sigma = xor(hgidt, ciphertext.V);
  const hsigma = h4(sigma, ciphertext.W.length);
  const msg = xor(hsigma, ciphertext.W);
  const r = h3(sigma, msg);
  const rP = PointG1.ProjectivePoint.BASE.multiply(r);
  if (!rP.equals(Qid)) {
    throw new Error("invalid proof: rP check failed");
  }
  return msg;
}
async function decryptOnG2(key, ciphertext) {
  const Qid = PointG1.ProjectivePoint.fromHex(key);
  const m = PointG2.ProjectivePoint.fromHex(ciphertext.U);
  const gidt = bls12_381.pairing(Qid, m);
  const hgidt = gtToHash(gidt, ciphertext.W.length);
  if (hgidt.length != ciphertext.V.length) {
    throw new Error("XorSigma is of invalid length");
  }
  const sigma = xor(hgidt, ciphertext.V);
  const hsigma = h4(sigma, ciphertext.W.length);
  const msg = xor(hsigma, ciphertext.W);
  const r = h3(sigma, msg);
  const rP = PointG2.ProjectivePoint.BASE.multiply(r);
  if (!rP.equals(m)) {
    throw new Error("invalid proof: rP check failed");
  }
  return msg;
}
function gtToHash(gt, len) {
  return sha2562.create().update("IBE-H2").update(fp12ToBytes(gt)).digest().slice(0, len);
}
var BitsToMaskForBLS12381 = 1;
function h3(sigma, msg) {
  const h3ret = sha2562.create().update("IBE-H3").update(sigma).update(msg).digest();
  for (let i = 1; i < 65535; i++) {
    let data = h3ret;
    data = sha2562.create().update(create16BitUintBuffer(i)).update(data).digest();
    data[0] = data[0] >> BitsToMaskForBLS12381;
    const n = bytesToNumberBE2(data);
    if (n < bls12_381.fields.Fr.ORDER) {
      return n;
    }
  }
  throw new Error("invalid proof: rP check failed");
}
function h4(sigma, len) {
  const h4sigma = sha2562.create().update("IBE-H4").update(sigma).digest();
  return h4sigma.slice(0, len);
}
function create16BitUintBuffer(input) {
  if (input < 0) {
    throw Error("cannot write a negative value as uint!");
  }
  if (input > 2 ** 16) {
    throw Error("input value too large to fit in a uint16!");
  }
  const buf = import_buffer2.Buffer.alloc(2);
  buf.writeUint16LE(input);
  return buf;
}

// vendor/tlock-js/src/drand/timelock-encrypter.ts
function createTimelockEncrypter(client, roundNumber) {
  if (roundNumber < 1) {
    throw Error("You cannot encrypt for a roundNumber less than 1 (genesis = 0)");
  }
  return async (fileKey) => {
    const chainInfo = await client.chain().info();
    const pk = import_buffer3.Buffer.from(chainInfo.public_key, "hex");
    const id = hashedRoundNumber(roundNumber);
    let ciphertext;
    switch (chainInfo.schemeID) {
      case "pedersen-bls-unchained":
        {
          ciphertext = await encryptOnG1(pk, id, fileKey);
        }
        break;
      case "bls-unchained-on-g1":
        {
          ciphertext = await encryptOnG2(pk, id, fileKey);
        }
        break;
      case "bls-unchained-g1-rfc9380":
        {
          ciphertext = await encryptOnG2RFC9380(pk, id, fileKey);
        }
        break;
      default:
        throw Error(`Unsupported scheme: ${chainInfo.schemeID} - you must use a drand network with an unchained scheme for timelock encryption!`);
    }
    return [{
      type: "tlock",
      args: [`${roundNumber}`, chainInfo.hash],
      body: serialisedCiphertext(ciphertext)
    }];
  };
}
function hashedRoundNumber(round) {
  const roundNumberBuffer = import_buffer3.Buffer.alloc(64 / 8);
  roundNumberBuffer.writeBigUInt64BE(BigInt(round));
  return sha2562(roundNumberBuffer);
}
function serialisedCiphertext(ciphertext) {
  return import_buffer3.Buffer.concat([ciphertext.U, ciphertext.V, ciphertext.W]);
}

// vendor/tlock-js/src/drand/timelock-decrypter.ts
var import_buffer4 = __toESM(require_buffer(), 1);

// src/lib/drand.ts
async function fetchBeacon(client, round) {
  return client.get(round);
}
function roundTime(info, round) {
  const r = round < 0 ? 0 : round;
  return (info.genesis_time + (r - 1) * info.period) * 1e3;
}
function roundAt(time, info) {
  if (time < info.genesis_time * 1e3) throw new Error("Cannot request a round before the genesis time");
  return Math.floor((time - info.genesis_time * 1e3) / (info.period * 1e3)) + 1;
}
var QUICKNET = {
  public_key: "83cf0f2896adee7eb8b5f01fcad3912212c437e0073e911fb90022d3e760183c8c4b450b6a0a6c3ac6a5776a2d1064510d1fec758c921cc22b0e17e63aaf4bcb5ed66304de9cf809bd274ca73bab4af5a6e9c76a4bc09e76eae8991ef5ece45a",
  period: 3,
  genesis_time: 1692803367,
  hash: "52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971",
  groupHash: "f477d5c89f21a17c863a7f937c6a6d15859414d2be09cd448d4279af331c5d3e",
  schemeID: "bls-unchained-g1-rfc9380",
  metadata: { beaconID: "quicknet" }
};
var QUICKNET_RELAYS = [
  "https://api.drand.sh",
  "https://api2.drand.sh",
  "https://api3.drand.sh",
  "https://drand.cloudflare.com"
];
function beaconUrls(info, round, relays = QUICKNET_RELAYS) {
  return relays.map((r) => `${r}/${info.hash}/public/${round}`);
}
function hexToBytes2(hex) {
  const h = hex.trim().replace(/^0x/, "");
  if (h.length % 2 || /[^0-9a-f]/i.test(h)) throw new Error("Invalid hex");
  const out = new Uint8Array(h.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return out;
}
function roundMessage(round) {
  const b = new Uint8Array(8);
  new DataView(b.buffer).setBigUint64(0, BigInt(round));
  return sha256(b);
}
function verifyBeacon(info, round, signatureHex) {
  if (info.schemeID !== "bls-unchained-g1-rfc9380") throw new Error(`Unsupported scheme ${info.schemeID}`);
  try {
    return bls12_381.verifyShortSignature(hexToBytes2(signatureHex), roundMessage(round), hexToBytes2(info.public_key));
  } catch {
    return false;
  }
}
var PinnedChainClient = class {
  constructor(info = QUICKNET, manual, relays = QUICKNET_RELAYS) {
    this.info = info;
    this.manual = manual;
    this.relays = relays;
  }
  chain() {
    return { info: async () => this.info };
  }
  async get(round) {
    const urls = beaconUrls(this.info, round, this.relays);
    for (const url of urls) {
      try {
        const res = await fetch(url, { cache: "force-cache" });
        if (!res.ok) continue;
        const json = await res.json();
        if (json.round === round && verifyBeacon(this.info, round, json.signature)) return json;
      } catch {
      }
    }
    if (!this.manual) throw new Error("Could not reach drand to fetch the beacon for this round.");
    const pasted = await this.manual(round, urls);
    const signature = extractSignature(pasted);
    if (!verifyBeacon(this.info, round, signature)) throw new Error("That beacon signature is not valid for this round.");
    return { round, signature };
  }
};
function extractSignature(input) {
  const t = input.trim();
  if (t.startsWith("{")) {
    const j = JSON.parse(t);
    return j.signature;
  }
  return t;
}

// vendor/tlock-js/src/drand/timelock-decrypter.ts
function createTimelockDecrypter(network) {
  return async (recipients2) => {
    const tlockStanza = recipients2.find((it) => it.type === "tlock");
    if (!tlockStanza) {
      throw Error("You must pass a timelock stanza!");
    }
    const { type, args, body } = tlockStanza;
    if (type !== "tlock") {
      throw Error(`Timelock expects the type of the stanza to be "tlock`);
    }
    if (args.length !== 2) {
      throw Error(`Timelock stanza expected 2 args: roundNumber and chainHash. Only received ${args.length}`);
    }
    const chainInfo = await network.chain().info();
    const roundNumber = parseRoundNumber(args);
    if (roundTime(chainInfo, roundNumber) > Date.now()) {
      throw Error(`It's too early to decrypt the ciphertext - decryptable at round ${roundNumber}`);
    }
    const beacon = await fetchBeacon(network, roundNumber);
    console.log(`beacon received: ${JSON.stringify(beacon)}`);
    switch (chainInfo.schemeID) {
      case "pedersen-bls-unchained": {
        const ciphertext = parseCiphertext(body, bls12_381.G1.ProjectivePoint.BASE);
        return await decryptOnG1(import_buffer4.Buffer.from(beacon.signature, "hex"), ciphertext);
      }
      case "bls-unchained-on-g1": {
        const ciphertext = parseCiphertext(body, bls12_381.G2.ProjectivePoint.BASE);
        return await decryptOnG2(import_buffer4.Buffer.from(beacon.signature, "hex"), ciphertext);
      }
      case "bls-unchained-g1-rfc9380": {
        const ciphertext = parseCiphertext(body, bls12_381.G2.ProjectivePoint.BASE);
        return await decryptOnG2(import_buffer4.Buffer.from(beacon.signature, "hex"), ciphertext);
      }
      default:
        throw Error(`Unsupported scheme: ${chainInfo.schemeID} - you must use a drand network with an unchained scheme for timelock decryption!`);
    }
  };
  function parseRoundNumber(args) {
    const [roundNumber] = args;
    const roundNumberParsed = Number.parseInt(roundNumber);
    if (roundNumberParsed !== roundNumberParsed) {
      throw Error(`Expected the roundNumber arg to be a number, but it was ${roundNumber}!`);
    }
    return roundNumberParsed;
  }
  function parseCiphertext(body, base) {
    const pointLength = base.toRawBytes(true).byteLength;
    const pointBytes = body.subarray(0, pointLength);
    const theRest = body.subarray(pointLength);
    const eachHalf = theRest.length / 2;
    const U = pointBytes;
    const V = theRest.subarray(0, eachHalf);
    const W = theRest.subarray(eachHalf);
    return { U, V, W };
  }
}

// vendor/noble-hashes/src/hkdf.ts
function extract(hash, ikm, salt) {
  ahash(hash);
  if (salt === void 0) salt = new Uint8Array(hash.outputLen);
  return hmac(hash, toBytes(salt), toBytes(ikm));
}
var HKDF_COUNTER = /* @__PURE__ */ Uint8Array.from([0]);
var EMPTY_BUFFER = /* @__PURE__ */ Uint8Array.of();
function expand(hash, prk, info, length = 32) {
  ahash(hash);
  anumber(length);
  const olen = hash.outputLen;
  if (length > 255 * olen) throw new Error("Length should be <= 255*HashLen");
  const blocks = Math.ceil(length / olen);
  if (info === void 0) info = EMPTY_BUFFER;
  const okm = new Uint8Array(blocks * olen);
  const HMAC2 = hmac.create(hash, prk);
  const HMACTmp = HMAC2._cloneInto();
  const T = new Uint8Array(HMAC2.outputLen);
  for (let counter = 0; counter < blocks; counter++) {
    HKDF_COUNTER[0] = counter + 1;
    HMACTmp.update(counter === 0 ? EMPTY_BUFFER : T).update(info).update(HKDF_COUNTER).digestInto(T);
    okm.set(T, olen * counter);
    HMAC2._cloneInto(HMACTmp);
  }
  HMAC2.destroy();
  HMACTmp.destroy();
  clean(T, HKDF_COUNTER);
  return okm.slice(0, length);
}
var hkdf = (hash, ikm, salt, info, length) => expand(hash, extract(hash, ikm, salt), info, length);

// vendor/stablelib/int/int.ts
var isInteger = Number.isInteger;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
var isSafeInteger = Number.isSafeInteger;

// vendor/stablelib/binary/binary.ts
function writeUint32LE(value, out = new Uint8Array(4), offset = 0) {
  out[offset + 0] = value >>> 0;
  out[offset + 1] = value >>> 8;
  out[offset + 2] = value >>> 16;
  out[offset + 3] = value >>> 24;
  return out;
}
function writeUint64LE(value, out = new Uint8Array(8), offset = 0) {
  writeUint32LE(value >>> 0, out, offset);
  writeUint32LE(value / 4294967296 >>> 0, out, offset + 4);
  return out;
}

// vendor/stablelib/wipe/wipe.ts
function wipe(array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = 0;
  }
  return array;
}

// vendor/stablelib/chacha/chacha.ts
var ROUNDS = 20;
function core(out, input, key) {
  let j0 = 1634760805;
  let j1 = 857760878;
  let j2 = 2036477234;
  let j3 = 1797285236;
  let j4 = key[3] << 24 | key[2] << 16 | key[1] << 8 | key[0];
  let j5 = key[7] << 24 | key[6] << 16 | key[5] << 8 | key[4];
  let j6 = key[11] << 24 | key[10] << 16 | key[9] << 8 | key[8];
  let j7 = key[15] << 24 | key[14] << 16 | key[13] << 8 | key[12];
  let j8 = key[19] << 24 | key[18] << 16 | key[17] << 8 | key[16];
  let j9 = key[23] << 24 | key[22] << 16 | key[21] << 8 | key[20];
  let j10 = key[27] << 24 | key[26] << 16 | key[25] << 8 | key[24];
  let j11 = key[31] << 24 | key[30] << 16 | key[29] << 8 | key[28];
  let j12 = input[3] << 24 | input[2] << 16 | input[1] << 8 | input[0];
  let j13 = input[7] << 24 | input[6] << 16 | input[5] << 8 | input[4];
  let j14 = input[11] << 24 | input[10] << 16 | input[9] << 8 | input[8];
  let j15 = input[15] << 24 | input[14] << 16 | input[13] << 8 | input[12];
  let x0 = j0;
  let x1 = j1;
  let x2 = j2;
  let x3 = j3;
  let x4 = j4;
  let x5 = j5;
  let x6 = j6;
  let x7 = j7;
  let x8 = j8;
  let x9 = j9;
  let x10 = j10;
  let x11 = j11;
  let x12 = j12;
  let x13 = j13;
  let x14 = j14;
  let x15 = j15;
  for (let i = 0; i < ROUNDS; i += 2) {
    x0 = x0 + x4 | 0;
    x12 ^= x0;
    x12 = x12 >>> 32 - 16 | x12 << 16;
    x8 = x8 + x12 | 0;
    x4 ^= x8;
    x4 = x4 >>> 32 - 12 | x4 << 12;
    x1 = x1 + x5 | 0;
    x13 ^= x1;
    x13 = x13 >>> 32 - 16 | x13 << 16;
    x9 = x9 + x13 | 0;
    x5 ^= x9;
    x5 = x5 >>> 32 - 12 | x5 << 12;
    x2 = x2 + x6 | 0;
    x14 ^= x2;
    x14 = x14 >>> 32 - 16 | x14 << 16;
    x10 = x10 + x14 | 0;
    x6 ^= x10;
    x6 = x6 >>> 32 - 12 | x6 << 12;
    x3 = x3 + x7 | 0;
    x15 ^= x3;
    x15 = x15 >>> 32 - 16 | x15 << 16;
    x11 = x11 + x15 | 0;
    x7 ^= x11;
    x7 = x7 >>> 32 - 12 | x7 << 12;
    x2 = x2 + x6 | 0;
    x14 ^= x2;
    x14 = x14 >>> 32 - 8 | x14 << 8;
    x10 = x10 + x14 | 0;
    x6 ^= x10;
    x6 = x6 >>> 32 - 7 | x6 << 7;
    x3 = x3 + x7 | 0;
    x15 ^= x3;
    x15 = x15 >>> 32 - 8 | x15 << 8;
    x11 = x11 + x15 | 0;
    x7 ^= x11;
    x7 = x7 >>> 32 - 7 | x7 << 7;
    x1 = x1 + x5 | 0;
    x13 ^= x1;
    x13 = x13 >>> 32 - 8 | x13 << 8;
    x9 = x9 + x13 | 0;
    x5 ^= x9;
    x5 = x5 >>> 32 - 7 | x5 << 7;
    x0 = x0 + x4 | 0;
    x12 ^= x0;
    x12 = x12 >>> 32 - 8 | x12 << 8;
    x8 = x8 + x12 | 0;
    x4 ^= x8;
    x4 = x4 >>> 32 - 7 | x4 << 7;
    x0 = x0 + x5 | 0;
    x15 ^= x0;
    x15 = x15 >>> 32 - 16 | x15 << 16;
    x10 = x10 + x15 | 0;
    x5 ^= x10;
    x5 = x5 >>> 32 - 12 | x5 << 12;
    x1 = x1 + x6 | 0;
    x12 ^= x1;
    x12 = x12 >>> 32 - 16 | x12 << 16;
    x11 = x11 + x12 | 0;
    x6 ^= x11;
    x6 = x6 >>> 32 - 12 | x6 << 12;
    x2 = x2 + x7 | 0;
    x13 ^= x2;
    x13 = x13 >>> 32 - 16 | x13 << 16;
    x8 = x8 + x13 | 0;
    x7 ^= x8;
    x7 = x7 >>> 32 - 12 | x7 << 12;
    x3 = x3 + x4 | 0;
    x14 ^= x3;
    x14 = x14 >>> 32 - 16 | x14 << 16;
    x9 = x9 + x14 | 0;
    x4 ^= x9;
    x4 = x4 >>> 32 - 12 | x4 << 12;
    x2 = x2 + x7 | 0;
    x13 ^= x2;
    x13 = x13 >>> 32 - 8 | x13 << 8;
    x8 = x8 + x13 | 0;
    x7 ^= x8;
    x7 = x7 >>> 32 - 7 | x7 << 7;
    x3 = x3 + x4 | 0;
    x14 ^= x3;
    x14 = x14 >>> 32 - 8 | x14 << 8;
    x9 = x9 + x14 | 0;
    x4 ^= x9;
    x4 = x4 >>> 32 - 7 | x4 << 7;
    x1 = x1 + x6 | 0;
    x12 ^= x1;
    x12 = x12 >>> 32 - 8 | x12 << 8;
    x11 = x11 + x12 | 0;
    x6 ^= x11;
    x6 = x6 >>> 32 - 7 | x6 << 7;
    x0 = x0 + x5 | 0;
    x15 ^= x0;
    x15 = x15 >>> 32 - 8 | x15 << 8;
    x10 = x10 + x15 | 0;
    x5 ^= x10;
    x5 = x5 >>> 32 - 7 | x5 << 7;
  }
  writeUint32LE(x0 + j0 | 0, out, 0);
  writeUint32LE(x1 + j1 | 0, out, 4);
  writeUint32LE(x2 + j2 | 0, out, 8);
  writeUint32LE(x3 + j3 | 0, out, 12);
  writeUint32LE(x4 + j4 | 0, out, 16);
  writeUint32LE(x5 + j5 | 0, out, 20);
  writeUint32LE(x6 + j6 | 0, out, 24);
  writeUint32LE(x7 + j7 | 0, out, 28);
  writeUint32LE(x8 + j8 | 0, out, 32);
  writeUint32LE(x9 + j9 | 0, out, 36);
  writeUint32LE(x10 + j10 | 0, out, 40);
  writeUint32LE(x11 + j11 | 0, out, 44);
  writeUint32LE(x12 + j12 | 0, out, 48);
  writeUint32LE(x13 + j13 | 0, out, 52);
  writeUint32LE(x14 + j14 | 0, out, 56);
  writeUint32LE(x15 + j15 | 0, out, 60);
}
function streamXOR(key, nonce, src, dst, nonceInplaceCounterLength = 0) {
  if (key.length !== 32) {
    throw new Error("ChaCha: key size must be 32 bytes");
  }
  if (dst.length < src.length) {
    throw new Error("ChaCha: destination is shorter than source");
  }
  let nc;
  let counterLength;
  if (nonceInplaceCounterLength === 0) {
    if (nonce.length !== 8 && nonce.length !== 12) {
      throw new Error("ChaCha nonce must be 8 or 12 bytes");
    }
    nc = new Uint8Array(16);
    counterLength = nc.length - nonce.length;
    nc.set(nonce, counterLength);
  } else {
    if (nonce.length !== 16) {
      throw new Error("ChaCha nonce with counter must be 16 bytes");
    }
    nc = nonce;
    counterLength = nonceInplaceCounterLength;
  }
  const block = new Uint8Array(64);
  for (let i = 0; i < src.length; i += 64) {
    core(block, nc, key);
    for (let j = i; j < i + 64 && j < src.length; j++) {
      dst[j] = src[j] ^ block[j - i];
    }
    incrementCounter(nc, 0, counterLength);
  }
  wipe(block);
  if (nonceInplaceCounterLength === 0) {
    wipe(nc);
  }
  return dst;
}
function stream(key, nonce, dst, nonceInplaceCounterLength = 0) {
  wipe(dst);
  return streamXOR(key, nonce, dst, dst, nonceInplaceCounterLength);
}
function incrementCounter(counter, pos, len) {
  let carry = 1;
  while (len--) {
    carry = carry + (counter[pos] & 255) | 0;
    counter[pos] = carry & 255;
    carry >>>= 8;
    pos++;
  }
  if (carry > 0) {
    throw new Error("ChaCha: counter overflow");
  }
}

// vendor/stablelib/constant-time/constant-time.ts
function compare(a, b) {
  if (a.length !== b.length) {
    return 0;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a[i] ^ b[i];
  }
  return 1 & result - 1 >>> 8;
}
function equal(a, b) {
  if (a.length === 0 || b.length === 0) {
    return false;
  }
  return compare(a, b) !== 0;
}

// vendor/stablelib/poly1305/poly1305.ts
var DIGEST_LENGTH = 16;
var Poly1305 = class {
  digestLength = DIGEST_LENGTH;
  _buffer = new Uint8Array(16);
  _r = new Uint16Array(10);
  _h = new Uint16Array(10);
  _pad = new Uint16Array(8);
  _leftover = 0;
  _fin = 0;
  _finished = false;
  constructor(key) {
    let t0 = key[0] | key[1] << 8;
    this._r[0] = t0 & 8191;
    let t1 = key[2] | key[3] << 8;
    this._r[1] = (t0 >>> 13 | t1 << 3) & 8191;
    let t2 = key[4] | key[5] << 8;
    this._r[2] = (t1 >>> 10 | t2 << 6) & 7939;
    let t3 = key[6] | key[7] << 8;
    this._r[3] = (t2 >>> 7 | t3 << 9) & 8191;
    let t4 = key[8] | key[9] << 8;
    this._r[4] = (t3 >>> 4 | t4 << 12) & 255;
    this._r[5] = t4 >>> 1 & 8190;
    let t5 = key[10] | key[11] << 8;
    this._r[6] = (t4 >>> 14 | t5 << 2) & 8191;
    let t6 = key[12] | key[13] << 8;
    this._r[7] = (t5 >>> 11 | t6 << 5) & 8065;
    let t7 = key[14] | key[15] << 8;
    this._r[8] = (t6 >>> 8 | t7 << 8) & 8191;
    this._r[9] = t7 >>> 5 & 127;
    this._pad[0] = key[16] | key[17] << 8;
    this._pad[1] = key[18] | key[19] << 8;
    this._pad[2] = key[20] | key[21] << 8;
    this._pad[3] = key[22] | key[23] << 8;
    this._pad[4] = key[24] | key[25] << 8;
    this._pad[5] = key[26] | key[27] << 8;
    this._pad[6] = key[28] | key[29] << 8;
    this._pad[7] = key[30] | key[31] << 8;
  }
  _blocks(m, mpos, bytes) {
    let hibit = this._fin ? 0 : 1 << 11;
    let h0 = this._h[0], h1 = this._h[1], h2 = this._h[2], h32 = this._h[3], h42 = this._h[4], h5 = this._h[5], h6 = this._h[6], h7 = this._h[7], h8 = this._h[8], h9 = this._h[9];
    let r0 = this._r[0], r1 = this._r[1], r2 = this._r[2], r3 = this._r[3], r4 = this._r[4], r5 = this._r[5], r6 = this._r[6], r7 = this._r[7], r8 = this._r[8], r9 = this._r[9];
    while (bytes >= 16) {
      let t0 = m[mpos + 0] | m[mpos + 1] << 8;
      h0 += t0 & 8191;
      let t1 = m[mpos + 2] | m[mpos + 3] << 8;
      h1 += (t0 >>> 13 | t1 << 3) & 8191;
      let t2 = m[mpos + 4] | m[mpos + 5] << 8;
      h2 += (t1 >>> 10 | t2 << 6) & 8191;
      let t3 = m[mpos + 6] | m[mpos + 7] << 8;
      h32 += (t2 >>> 7 | t3 << 9) & 8191;
      let t4 = m[mpos + 8] | m[mpos + 9] << 8;
      h42 += (t3 >>> 4 | t4 << 12) & 8191;
      h5 += t4 >>> 1 & 8191;
      let t5 = m[mpos + 10] | m[mpos + 11] << 8;
      h6 += (t4 >>> 14 | t5 << 2) & 8191;
      let t6 = m[mpos + 12] | m[mpos + 13] << 8;
      h7 += (t5 >>> 11 | t6 << 5) & 8191;
      let t7 = m[mpos + 14] | m[mpos + 15] << 8;
      h8 += (t6 >>> 8 | t7 << 8) & 8191;
      h9 += t7 >>> 5 | hibit;
      let c = 0;
      let d0 = c;
      d0 += h0 * r0;
      d0 += h1 * (5 * r9);
      d0 += h2 * (5 * r8);
      d0 += h32 * (5 * r7);
      d0 += h42 * (5 * r6);
      c = d0 >>> 13;
      d0 &= 8191;
      d0 += h5 * (5 * r5);
      d0 += h6 * (5 * r4);
      d0 += h7 * (5 * r3);
      d0 += h8 * (5 * r2);
      d0 += h9 * (5 * r1);
      c += d0 >>> 13;
      d0 &= 8191;
      let d1 = c;
      d1 += h0 * r1;
      d1 += h1 * r0;
      d1 += h2 * (5 * r9);
      d1 += h32 * (5 * r8);
      d1 += h42 * (5 * r7);
      c = d1 >>> 13;
      d1 &= 8191;
      d1 += h5 * (5 * r6);
      d1 += h6 * (5 * r5);
      d1 += h7 * (5 * r4);
      d1 += h8 * (5 * r3);
      d1 += h9 * (5 * r2);
      c += d1 >>> 13;
      d1 &= 8191;
      let d2 = c;
      d2 += h0 * r2;
      d2 += h1 * r1;
      d2 += h2 * r0;
      d2 += h32 * (5 * r9);
      d2 += h42 * (5 * r8);
      c = d2 >>> 13;
      d2 &= 8191;
      d2 += h5 * (5 * r7);
      d2 += h6 * (5 * r6);
      d2 += h7 * (5 * r5);
      d2 += h8 * (5 * r4);
      d2 += h9 * (5 * r3);
      c += d2 >>> 13;
      d2 &= 8191;
      let d3 = c;
      d3 += h0 * r3;
      d3 += h1 * r2;
      d3 += h2 * r1;
      d3 += h32 * r0;
      d3 += h42 * (5 * r9);
      c = d3 >>> 13;
      d3 &= 8191;
      d3 += h5 * (5 * r8);
      d3 += h6 * (5 * r7);
      d3 += h7 * (5 * r6);
      d3 += h8 * (5 * r5);
      d3 += h9 * (5 * r4);
      c += d3 >>> 13;
      d3 &= 8191;
      let d4 = c;
      d4 += h0 * r4;
      d4 += h1 * r3;
      d4 += h2 * r2;
      d4 += h32 * r1;
      d4 += h42 * r0;
      c = d4 >>> 13;
      d4 &= 8191;
      d4 += h5 * (5 * r9);
      d4 += h6 * (5 * r8);
      d4 += h7 * (5 * r7);
      d4 += h8 * (5 * r6);
      d4 += h9 * (5 * r5);
      c += d4 >>> 13;
      d4 &= 8191;
      let d5 = c;
      d5 += h0 * r5;
      d5 += h1 * r4;
      d5 += h2 * r3;
      d5 += h32 * r2;
      d5 += h42 * r1;
      c = d5 >>> 13;
      d5 &= 8191;
      d5 += h5 * r0;
      d5 += h6 * (5 * r9);
      d5 += h7 * (5 * r8);
      d5 += h8 * (5 * r7);
      d5 += h9 * (5 * r6);
      c += d5 >>> 13;
      d5 &= 8191;
      let d6 = c;
      d6 += h0 * r6;
      d6 += h1 * r5;
      d6 += h2 * r4;
      d6 += h32 * r3;
      d6 += h42 * r2;
      c = d6 >>> 13;
      d6 &= 8191;
      d6 += h5 * r1;
      d6 += h6 * r0;
      d6 += h7 * (5 * r9);
      d6 += h8 * (5 * r8);
      d6 += h9 * (5 * r7);
      c += d6 >>> 13;
      d6 &= 8191;
      let d7 = c;
      d7 += h0 * r7;
      d7 += h1 * r6;
      d7 += h2 * r5;
      d7 += h32 * r4;
      d7 += h42 * r3;
      c = d7 >>> 13;
      d7 &= 8191;
      d7 += h5 * r2;
      d7 += h6 * r1;
      d7 += h7 * r0;
      d7 += h8 * (5 * r9);
      d7 += h9 * (5 * r8);
      c += d7 >>> 13;
      d7 &= 8191;
      let d8 = c;
      d8 += h0 * r8;
      d8 += h1 * r7;
      d8 += h2 * r6;
      d8 += h32 * r5;
      d8 += h42 * r4;
      c = d8 >>> 13;
      d8 &= 8191;
      d8 += h5 * r3;
      d8 += h6 * r2;
      d8 += h7 * r1;
      d8 += h8 * r0;
      d8 += h9 * (5 * r9);
      c += d8 >>> 13;
      d8 &= 8191;
      let d9 = c;
      d9 += h0 * r9;
      d9 += h1 * r8;
      d9 += h2 * r7;
      d9 += h32 * r6;
      d9 += h42 * r5;
      c = d9 >>> 13;
      d9 &= 8191;
      d9 += h5 * r4;
      d9 += h6 * r3;
      d9 += h7 * r2;
      d9 += h8 * r1;
      d9 += h9 * r0;
      c += d9 >>> 13;
      d9 &= 8191;
      c = (c << 2) + c | 0;
      c = c + d0 | 0;
      d0 = c & 8191;
      c = c >>> 13;
      d1 += c;
      h0 = d0;
      h1 = d1;
      h2 = d2;
      h32 = d3;
      h42 = d4;
      h5 = d5;
      h6 = d6;
      h7 = d7;
      h8 = d8;
      h9 = d9;
      mpos += 16;
      bytes -= 16;
    }
    this._h[0] = h0;
    this._h[1] = h1;
    this._h[2] = h2;
    this._h[3] = h32;
    this._h[4] = h42;
    this._h[5] = h5;
    this._h[6] = h6;
    this._h[7] = h7;
    this._h[8] = h8;
    this._h[9] = h9;
  }
  finish(mac2, macpos = 0) {
    const g = new Uint16Array(10);
    let c;
    let mask;
    let f;
    let i;
    if (this._leftover) {
      i = this._leftover;
      this._buffer[i++] = 1;
      for (; i < 16; i++) {
        this._buffer[i] = 0;
      }
      this._fin = 1;
      this._blocks(this._buffer, 0, 16);
    }
    c = this._h[1] >>> 13;
    this._h[1] &= 8191;
    for (i = 2; i < 10; i++) {
      this._h[i] += c;
      c = this._h[i] >>> 13;
      this._h[i] &= 8191;
    }
    this._h[0] += c * 5;
    c = this._h[0] >>> 13;
    this._h[0] &= 8191;
    this._h[1] += c;
    c = this._h[1] >>> 13;
    this._h[1] &= 8191;
    this._h[2] += c;
    g[0] = this._h[0] + 5;
    c = g[0] >>> 13;
    g[0] &= 8191;
    for (i = 1; i < 10; i++) {
      g[i] = this._h[i] + c;
      c = g[i] >>> 13;
      g[i] &= 8191;
    }
    g[9] -= 1 << 13;
    mask = (c ^ 1) - 1;
    for (i = 0; i < 10; i++) {
      g[i] &= mask;
    }
    mask = ~mask;
    for (i = 0; i < 10; i++) {
      this._h[i] = this._h[i] & mask | g[i];
    }
    this._h[0] = (this._h[0] | this._h[1] << 13) & 65535;
    this._h[1] = (this._h[1] >>> 3 | this._h[2] << 10) & 65535;
    this._h[2] = (this._h[2] >>> 6 | this._h[3] << 7) & 65535;
    this._h[3] = (this._h[3] >>> 9 | this._h[4] << 4) & 65535;
    this._h[4] = (this._h[4] >>> 12 | this._h[5] << 1 | this._h[6] << 14) & 65535;
    this._h[5] = (this._h[6] >>> 2 | this._h[7] << 11) & 65535;
    this._h[6] = (this._h[7] >>> 5 | this._h[8] << 8) & 65535;
    this._h[7] = (this._h[8] >>> 8 | this._h[9] << 5) & 65535;
    f = this._h[0] + this._pad[0];
    this._h[0] = f & 65535;
    for (i = 1; i < 8; i++) {
      f = (this._h[i] + this._pad[i] | 0) + (f >>> 16) | 0;
      this._h[i] = f & 65535;
    }
    mac2[macpos + 0] = this._h[0] >>> 0;
    mac2[macpos + 1] = this._h[0] >>> 8;
    mac2[macpos + 2] = this._h[1] >>> 0;
    mac2[macpos + 3] = this._h[1] >>> 8;
    mac2[macpos + 4] = this._h[2] >>> 0;
    mac2[macpos + 5] = this._h[2] >>> 8;
    mac2[macpos + 6] = this._h[3] >>> 0;
    mac2[macpos + 7] = this._h[3] >>> 8;
    mac2[macpos + 8] = this._h[4] >>> 0;
    mac2[macpos + 9] = this._h[4] >>> 8;
    mac2[macpos + 10] = this._h[5] >>> 0;
    mac2[macpos + 11] = this._h[5] >>> 8;
    mac2[macpos + 12] = this._h[6] >>> 0;
    mac2[macpos + 13] = this._h[6] >>> 8;
    mac2[macpos + 14] = this._h[7] >>> 0;
    mac2[macpos + 15] = this._h[7] >>> 8;
    this._finished = true;
    return this;
  }
  update(m) {
    let mpos = 0;
    let bytes = m.length;
    let want;
    if (this._leftover) {
      want = 16 - this._leftover;
      if (want > bytes) {
        want = bytes;
      }
      for (let i = 0; i < want; i++) {
        this._buffer[this._leftover + i] = m[mpos + i];
      }
      bytes -= want;
      mpos += want;
      this._leftover += want;
      if (this._leftover < 16) {
        return this;
      }
      this._blocks(this._buffer, 0, 16);
      this._leftover = 0;
    }
    if (bytes >= 16) {
      want = bytes - bytes % 16;
      this._blocks(m, mpos, want);
      mpos += want;
      bytes -= want;
    }
    if (bytes) {
      for (let i = 0; i < bytes; i++) {
        this._buffer[this._leftover + i] = m[mpos + i];
      }
      this._leftover += bytes;
    }
    return this;
  }
  digest() {
    if (this._finished) {
      throw new Error("Poly1305 was finished");
    }
    let mac2 = new Uint8Array(16);
    this.finish(mac2);
    return mac2;
  }
  clean() {
    wipe(this._buffer);
    wipe(this._r);
    wipe(this._h);
    wipe(this._pad);
    this._leftover = 0;
    this._fin = 0;
    this._finished = true;
    return this;
  }
};

// vendor/stablelib/chacha20poly1305/chacha20poly1305.ts
var KEY_LENGTH = 32;
var NONCE_LENGTH = 12;
var TAG_LENGTH = 16;
var ZEROS = new Uint8Array(16);
var ChaCha20Poly1305 = class {
  nonceLength = NONCE_LENGTH;
  tagLength = TAG_LENGTH;
  _key;
  /**
   * Creates a new instance with the given 32-byte key.
   */
  constructor(key) {
    if (key.length !== KEY_LENGTH) {
      throw new Error("ChaCha20Poly1305 needs 32-byte key");
    }
    this._key = new Uint8Array(key);
  }
  /**
   * Encrypts and authenticates plaintext, authenticates associated data,
   * and returns sealed ciphertext, which includes authentication tag.
   *
   * RFC7539 specifies 12 bytes for nonce. It may be this 12-byte nonce
   * ("IV"), or full 16-byte counter (called "32-bit fixed-common part")
   * and nonce.
   *
   * If dst is given (it must be the size of plaintext + the size of tag
   * length) the result will be put into it. Dst and plaintext must not
   * overlap.
   */
  seal(nonce, plaintext, associatedData, dst) {
    if (nonce.length > 16) {
      throw new Error("ChaCha20Poly1305: incorrect nonce length");
    }
    const counter = new Uint8Array(16);
    counter.set(nonce, counter.length - nonce.length);
    const authKey = new Uint8Array(32);
    stream(this._key, counter, authKey, 4);
    const resultLength = plaintext.length + this.tagLength;
    let result;
    if (dst) {
      if (dst.length !== resultLength) {
        throw new Error("ChaCha20Poly1305: incorrect destination length");
      }
      result = dst;
    } else {
      result = new Uint8Array(resultLength);
    }
    streamXOR(this._key, counter, plaintext, result, 4);
    this._authenticate(
      result.subarray(result.length - this.tagLength, result.length),
      authKey,
      result.subarray(0, result.length - this.tagLength),
      associatedData
    );
    wipe(counter);
    return result;
  }
  /**
   * Authenticates sealed ciphertext (which includes authentication tag) and
   * associated data, decrypts ciphertext and returns decrypted plaintext.
   *
   * RFC7539 specifies 12 bytes for nonce. It may be this 12-byte nonce
   * ("IV"), or full 16-byte counter (called "32-bit fixed-common part")
   * and nonce.
   *
   * If authentication fails, it returns null.
   *
   * If dst is given (it must be of ciphertext length minus tag length),
   * the result will be put into it. Dst and plaintext must not overlap.
   */
  open(nonce, sealed, associatedData, dst) {
    if (nonce.length > 16) {
      throw new Error("ChaCha20Poly1305: incorrect nonce length");
    }
    if (sealed.length < this.tagLength) {
      return null;
    }
    const counter = new Uint8Array(16);
    counter.set(nonce, counter.length - nonce.length);
    const authKey = new Uint8Array(32);
    stream(this._key, counter, authKey, 4);
    const calculatedTag = new Uint8Array(this.tagLength);
    this._authenticate(
      calculatedTag,
      authKey,
      sealed.subarray(0, sealed.length - this.tagLength),
      associatedData
    );
    if (!equal(
      calculatedTag,
      sealed.subarray(sealed.length - this.tagLength, sealed.length)
    )) {
      return null;
    }
    const resultLength = sealed.length - this.tagLength;
    let result;
    if (dst) {
      if (dst.length !== resultLength) {
        throw new Error("ChaCha20Poly1305: incorrect destination length");
      }
      result = dst;
    } else {
      result = new Uint8Array(resultLength);
    }
    streamXOR(
      this._key,
      counter,
      sealed.subarray(0, sealed.length - this.tagLength),
      result,
      4
    );
    wipe(counter);
    return result;
  }
  clean() {
    wipe(this._key);
    return this;
  }
  _authenticate(tagOut, authKey, ciphertext, associatedData) {
    const h = new Poly1305(authKey);
    if (associatedData) {
      h.update(associatedData);
      if (associatedData.length % 16 > 0) {
        h.update(ZEROS.subarray(associatedData.length % 16));
      }
    }
    h.update(ciphertext);
    if (ciphertext.length % 16 > 0) {
      h.update(ZEROS.subarray(ciphertext.length % 16));
    }
    const length = new Uint8Array(8);
    if (associatedData) {
      writeUint64LE(associatedData.length, length);
    }
    h.update(length);
    writeUint64LE(ciphertext.length, length);
    h.update(length);
    const tag = h.digest();
    for (let i = 0; i < tag.length; i++) {
      tagOut[i] = tag[i];
    }
    h.clean();
    wipe(tag);
    wipe(length);
  }
};

// vendor/tlock-js/src/age/stream-cipher.ts
var CHUNK_SIZE = 64 * 1024;
var TAG_SIZE = 16;
var ENCRYPTED_CHUNK_SIZE = CHUNK_SIZE + TAG_SIZE;
var NONCE_SIZE = 12;
var COUNTER_MAX = Math.pow(2, 32) - 1;
var STREAM = class _STREAM {
  static seal(plaintext, privateKey) {
    const stream2 = new _STREAM(privateKey);
    const chunks = Math.ceil(plaintext.length / CHUNK_SIZE);
    const ciphertext = new Uint8Array(plaintext.length + chunks * TAG_SIZE);
    for (let chunk64kb = 1; chunk64kb <= chunks; chunk64kb++) {
      const start = chunk64kb - 1;
      const end = chunk64kb;
      const isLast = chunk64kb === chunks;
      const input = plaintext.slice(start * CHUNK_SIZE, end * CHUNK_SIZE);
      const output = ciphertext.subarray(start * ENCRYPTED_CHUNK_SIZE, end * ENCRYPTED_CHUNK_SIZE);
      stream2.encryptChunk(input, isLast, output);
    }
    stream2.clear();
    return ciphertext;
  }
  static open(ciphertext, privateKey) {
    const stream2 = new _STREAM(privateKey);
    const chunks = Math.ceil(ciphertext.length / ENCRYPTED_CHUNK_SIZE);
    const plaintext = new Uint8Array(ciphertext.length - chunks * TAG_SIZE);
    for (let chunk64kb = 1; chunk64kb <= chunks; chunk64kb++) {
      const start = chunk64kb - 1;
      const end = chunk64kb;
      const isLast = chunk64kb === chunks;
      const input = ciphertext.slice(start * ENCRYPTED_CHUNK_SIZE, end * ENCRYPTED_CHUNK_SIZE);
      const output = plaintext.subarray(start * CHUNK_SIZE, end * CHUNK_SIZE);
      stream2.decryptChunk(input, isLast, output);
    }
    stream2.clear();
    return plaintext;
  }
  key;
  nonce;
  nonceView;
  counter;
  constructor(key) {
    this.key = key.slice();
    this.nonce = new Uint8Array(NONCE_SIZE);
    this.nonceView = new DataView(this.nonce.buffer);
    this.counter = 0;
  }
  encryptChunk(chunk, isLast, output) {
    if (chunk.length > CHUNK_SIZE) throw new Error("Chunk is too big");
    if (this.nonce[11] === 1) throw new Error("Last chunk has been processed");
    if (isLast) this.nonce[11] = 1;
    const ciphertext = new ChaCha20Poly1305(this.key).seal(this.nonce, chunk);
    output.set(ciphertext);
    this.incrementCounter();
  }
  decryptChunk(chunk, isLast, output) {
    if (chunk.length > ENCRYPTED_CHUNK_SIZE) throw new Error("Chunk is too big");
    if (this.nonce[11] === 1) throw new Error("Last chunk has been processed");
    if (isLast) this.nonce[11] = 1;
    const plaintext = new ChaCha20Poly1305(this.key).open(this.nonce, chunk);
    if (plaintext == null) {
      throw Error("Error during decryption!");
    }
    output.set(plaintext);
    this.incrementCounter();
  }
  // Increments Big Endian Uint8Array-based counter.
  // [0, 0, 0] => [0, 0, 1] ... => [0, 0, 255] => [0, 1, 0]
  incrementCounter() {
    if (this.counter == COUNTER_MAX) {
      throw new Error("Stream cipher counter has already hit max value! Aborting to avoid nonce reuse - tlock only supports payloads up to 256TB");
    }
    this.counter += 1;
    this.nonceView.setUint32(7, this.counter, false);
  }
  clear() {
    function clear(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = 0;
      }
    }
    clear(this.key);
    clear(this.nonce);
    this.counter = 0;
  }
};

// vendor/tlock-js/src/age/no-op-encdec.ts
var noOpType = "no-op";
var NoOpEncDec = class {
  static async wrap(filekey) {
    return [{
      type: noOpType,
      args: [],
      body: filekey
    }];
  }
  static async unwrap(recipients2) {
    if (recipients2.length !== 1) {
      throw Error("NoOpEncDec only expects a single stanza!");
    }
    if (recipients2[0].type !== noOpType) {
      throw Error(`NoOpEncDec expects the type of the stanza to be ${noOpType}`);
    }
    return recipients2[0].body;
  }
};

// vendor/tlock-js/src/age/age-reader-writer.ts
var import_buffer7 = __toESM(require_buffer(), 1);

// vendor/tlock-js/src/age/utils.ts
var import_buffer5 = __toESM(require_buffer(), 1);
function unpaddedBase64(buf) {
  const encodedBuf = import_buffer5.Buffer.from(buf).toString("base64");
  let lastIndex = encodedBuf.length - 1;
  while (encodedBuf[lastIndex] === "=") {
    lastIndex--;
  }
  return encodedBuf.slice(0, lastIndex + 1);
}
function unpaddedBase64Buffer(buf) {
  return import_buffer5.Buffer.from(unpaddedBase64(buf), "base64");
}
function chunked(input, chunkSize, suffix = "") {
  const output = [];
  let currentChunk = "";
  for (let i = 0, chunks = 0; i < input.length; i++) {
    currentChunk += input[i];
    const posInChunk = i - chunks * chunkSize;
    if (posInChunk === chunkSize - 1) {
      output.push(currentChunk + suffix);
      currentChunk = "";
      chunks++;
    } else if (i === input.length - 1) {
      output.push(currentChunk + suffix);
    }
  }
  return output;
}
function sliceUntil(input, searchTerm) {
  let lettersMatched = 0;
  let inputPointer = 0;
  while (inputPointer < input.length && lettersMatched < searchTerm.length) {
    if (input[inputPointer] === searchTerm[lettersMatched]) {
      ++lettersMatched;
    } else if (input[inputPointer] === searchTerm[0]) {
      lettersMatched = 1;
    } else {
      lettersMatched = 0;
    }
    ++inputPointer;
  }
  return input.slice(0, inputPointer);
}

// vendor/tlock-js/src/age/utils-crypto.ts
var import_buffer6 = __toESM(require_buffer(), 1);
function createMacKey(fileKey, macMessage, headerText) {
  const hmacKey = hkdf(sha2562, fileKey, "", import_buffer6.Buffer.from(macMessage, "utf8"), 32);
  return import_buffer6.Buffer.from(hmac(sha2562, hmacKey, import_buffer6.Buffer.from(headerText, "utf8")));
}
async function random(n) {
  return globalThis.crypto.getRandomValues(new Uint8Array(n));
}

// vendor/tlock-js/src/age/age-reader-writer.ts
function writeAge(input) {
  const headerStr = header(input);
  const macKey = mac(createMacKey(input.fileKey, input.headerMacMessage, headerStr));
  const payload = import_buffer7.Buffer.from(input.body).toString("binary");
  return `${headerStr} ${macKey}
${payload}`;
}
function header(input) {
  return `${input.version}
${recipients(input.recipients)}---`;
}
var recipients = (stanzas) => stanzas.map((it) => recipient(it) + "\n");
var recipient = (stanza) => {
  const type = stanza.type;
  const aggregatedArgs = stanza.args.join(" ");
  const encodedBody = unpaddedBase64(stanza.body);
  const chunkedEncodedBody = chunked(encodedBody, 64).join("\n");
  return `-> ${type} ${aggregatedArgs}
` + chunkedEncodedBody;
};
var mac = (macStr) => unpaddedBase64(macStr);
function readAge(input) {
  const [version, ...lines] = input.split("\n");
  const recipients2 = parseRecipients(lines);
  const macStartingTag = "--- ";
  const macLine = lines.shift();
  if (!macLine || !macLine.startsWith(macStartingTag)) {
    throw Error("Expected mac, but there were no more lines left!");
  }
  const mac2 = import_buffer7.Buffer.from(macLine.slice(macStartingTag.length, macLine.length), "base64");
  const ciphertext = import_buffer7.Buffer.from(lines.join("\n") ?? "", "binary");
  return {
    header: { version, recipients: recipients2, mac: mac2 },
    body: ciphertext
  };
}
function validateArguments(args) {
  args.forEach((arg) => {
    for (let i = 0; i < arg.length; i++) {
      const charCode = arg.charCodeAt(i);
      if (charCode < 33 || charCode > 126) {
        throw Error(`Invalid character ${arg[i]} in argument ${arg}`);
      }
    }
  });
}
function parseRecipients(lines) {
  const recipients2 = [];
  for (let current = peek(lines); current != null && current.startsWith("->"); current = peek(lines)) {
    const [type, ...args] = current.slice(3, current.length).split(" ");
    lines.shift();
    validateArguments(args);
    const body = parseRecipientBody(lines);
    if (!body) {
      throw Error(`expected stanza '${type} to have a body, but it didn't`);
    }
    recipients2.push({ type, args, body: import_buffer7.Buffer.from(body, "base64") });
  }
  if (recipients2.length === 0) {
    throw Error("Expected at least one stanza! (beginning with -->)");
  }
  return recipients2;
}
function parseRecipientBody(lines) {
  let body = "";
  for (let next = peek(lines); next != null; next = peek(lines)) {
    body += lines.shift();
    if (next.length < 64) {
      break;
    }
  }
  return body;
}
function peek(arr) {
  return arr[0];
}

// vendor/tlock-js/src/age/age-encrypt-decrypt.ts
var import_buffer8 = __toESM(require_buffer(), 1);
var ageVersion = "age-encryption.org/v1";
var headerMacMessage = "header";
var hkdfBodyMessage = "payload";
var fileKeyLengthBytes = 16;
var bodyHkdfNonceLengthBytes = 16;
var hkdfKeyLengthBytes = 32;
async function encryptAge(plaintext, wrapFileKey = NoOpEncDec.wrap) {
  const fileKey = await random(fileKeyLengthBytes);
  const recipients2 = await wrapFileKey(fileKey);
  const body = await encryptedPayload(fileKey, plaintext);
  return writeAge(
    {
      fileKey,
      version: ageVersion,
      recipients: recipients2,
      headerMacMessage,
      body
    }
  );
}
async function encryptedPayload(fileKey, payload) {
  const nonce = await random(bodyHkdfNonceLengthBytes);
  const hkdfKey = hkdf(sha2562, fileKey, nonce, import_buffer8.Buffer.from(hkdfBodyMessage, "utf8"), hkdfKeyLengthBytes);
  const ciphertext = STREAM.seal(payload, hkdfKey);
  return import_buffer8.Buffer.concat([nonce, ciphertext]);
}
async function decryptAge(payload, unwrapFileKey = NoOpEncDec.unwrap) {
  const encryptedPayload2 = readAge(payload);
  const version = encryptedPayload2.header.version;
  if (version !== ageVersion) {
    throw Error(`The payload version ${version} is not supported, only ${ageVersion}`);
  }
  const fileKey = await unwrapFileKey(encryptedPayload2.header.recipients);
  const header3 = sliceUntil(payload, "---");
  const expectedMac = unpaddedBase64Buffer(createMacKey(fileKey, headerMacMessage, header3));
  const actualMac = encryptedPayload2.header.mac;
  if (import_buffer8.Buffer.compare(actualMac, expectedMac) !== 0) {
    throw Error("The MAC did not validate for the fileKey and payload!");
  }
  const nonce = import_buffer8.Buffer.from(encryptedPayload2.body.slice(0, bodyHkdfNonceLengthBytes));
  const cipherText = encryptedPayload2.body.slice(bodyHkdfNonceLengthBytes);
  const hkdfKey = hkdf(sha2562, fileKey, nonce, import_buffer8.Buffer.from(hkdfBodyMessage, "utf8"), hkdfKeyLengthBytes);
  const plaintext = STREAM.open(cipherText, hkdfKey);
  return import_buffer8.Buffer.from(plaintext);
}

// vendor/tlock-js/src/age/armor.ts
var import_buffer9 = __toESM(require_buffer(), 1);
var header2 = "-----BEGIN AGE ENCRYPTED FILE-----";
var footer = "-----END AGE ENCRYPTED FILE-----";
function encodeArmor(input, chunkSize = 64) {
  const base64Input = import_buffer9.Buffer.from(input, "binary").toString("base64");
  const columnisedInput = chunked(base64Input, chunkSize).join("\n");
  let paddedFooter = footer;
  if (columnisedInput.length > 0 && columnisedInput[columnisedInput.length - 1].length === 64) {
    paddedFooter = "\n" + footer;
  }
  return `${header2}
${columnisedInput}
${paddedFooter}
`;
}
function decodeArmor(armor, chunkSize = 64) {
  armor = armor.trimStart();
  const lengthBeforeEndTrim = armor.length;
  armor = armor.trimEnd();
  const lengthAfterTrim = armor.length;
  const trimmedWhitespace = lengthBeforeEndTrim - lengthAfterTrim;
  if (trimmedWhitespace > 1024) {
    throw Error("too much whitespace at the end of the armor payload");
  }
  if (!armor.startsWith(header2)) {
    throw Error(`Armor cannot be decoded if it does not start with a header! i.e. ${header2}`);
  }
  if (!armor.endsWith(footer)) {
    throw Error(`Armor cannot be decoded if it does not end with a footer! i.e. ${footer}`);
  }
  const base64Payload = armor.slice(header2.length, armor.length - footer.length);
  const lines = base64Payload.split("\n");
  if (lines.some((line) => line.length > chunkSize)) {
    throw Error(`Armor to decode cannot have lines longer than ${chunkSize} (configurable) in order to stop padding attacks`);
  }
  if (lines[lines.length - 1].length >= chunkSize) {
    throw Error(`The last line of an armored payload must be less than ${chunkSize} (configurable) to stop padding attacks`);
  }
  return import_buffer9.Buffer.from(base64Payload, "base64").toString("binary");
}
function isProbablyArmored(input) {
  return input.startsWith(header2);
}

// vendor/noble-hashes/src/pbkdf2.ts
function pbkdf2Init(hash, _password, _salt, _opts) {
  ahash(hash);
  const opts = checkOpts({ dkLen: 32, asyncTick: 10 }, _opts);
  const { c, dkLen, asyncTick } = opts;
  anumber(c);
  anumber(dkLen);
  anumber(asyncTick);
  if (c < 1) throw new Error("iterations (c) should be >= 1");
  const password = kdfInputToBytes(_password);
  const salt = kdfInputToBytes(_salt);
  const DK = new Uint8Array(dkLen);
  const PRF = hmac.create(hash, password);
  const PRFSalt = PRF._cloneInto().update(salt);
  return { c, dkLen, asyncTick, DK, PRF, PRFSalt };
}
function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
  PRF.destroy();
  PRFSalt.destroy();
  if (prfW) prfW.destroy();
  clean(u);
  return DK;
}
async function pbkdf2Async(hash, password, salt, opts) {
  const { c, dkLen, asyncTick, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
  let prfW;
  const arr = new Uint8Array(4);
  const view = createView(arr);
  const u = new Uint8Array(PRF.outputLen);
  for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
    const Ti = DK.subarray(pos, pos + PRF.outputLen);
    view.setInt32(0, ti, false);
    (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
    Ti.set(u.subarray(0, Ti.length));
    await asyncLoop(c - 1, asyncTick, () => {
      PRF._cloneInto(prfW).update(u).digestInto(u);
      for (let i = 0; i < Ti.length; i++) Ti[i] ^= u[i];
    });
  }
  return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
}

// vendor/slip39/wordlist.txt
var wordlist_default = "academic\nacid\nacne\nacquire\nacrobat\nactivity\nactress\nadapt\nadequate\nadjust\nadmit\nadorn\nadult\nadvance\nadvocate\nafraid\nagain\nagency\nagree\naide\naircraft\nairline\nairport\najar\nalarm\nalbum\nalcohol\nalien\nalive\nalpha\nalready\nalto\naluminum\nalways\namazing\nambition\namount\namuse\nanalysis\nanatomy\nancestor\nancient\nangel\nangry\nanimal\nanswer\nantenna\nanxiety\napart\naquatic\narcade\narena\nargue\narmed\nartist\nartwork\naspect\nauction\naugust\naunt\naverage\naviation\navoid\naward\naway\naxis\naxle\nbeam\nbeard\nbeaver\nbecome\nbedroom\nbehavior\nbeing\nbelieve\nbelong\nbenefit\nbest\nbeyond\nbike\nbiology\nbirthday\nbishop\nblack\nblanket\nblessing\nblimp\nblind\nblue\nbody\nbolt\nboring\nborn\nboth\nboundary\nbracelet\nbranch\nbrave\nbreathe\nbriefing\nbroken\nbrother\nbrowser\nbucket\nbudget\nbuilding\nbulb\nbulge\nbumpy\nbundle\nburden\nburning\nbusy\nbuyer\ncage\ncalcium\ncamera\ncampus\ncanyon\ncapacity\ncapital\ncapture\ncarbon\ncards\ncareful\ncargo\ncarpet\ncarve\ncategory\ncause\nceiling\ncenter\nceramic\nchampion\nchange\ncharity\ncheck\nchemical\nchest\nchew\nchubby\ncinema\ncivil\nclass\nclay\ncleanup\nclient\nclimate\nclinic\nclock\nclogs\ncloset\nclothes\nclub\ncluster\ncoal\ncoastal\ncoding\ncolumn\ncompany\ncorner\ncostume\ncounter\ncourse\ncover\ncowboy\ncradle\ncraft\ncrazy\ncredit\ncricket\ncriminal\ncrisis\ncritical\ncrowd\ncrucial\ncrunch\ncrush\ncrystal\ncubic\ncultural\ncurious\ncurly\ncustody\ncylinder\ndaisy\ndamage\ndance\ndarkness\ndatabase\ndaughter\ndeadline\ndeal\ndebris\ndebut\ndecent\ndecision\ndeclare\ndecorate\ndecrease\ndeliver\ndemand\ndensity\ndeny\ndepart\ndepend\ndepict\ndeploy\ndescribe\ndesert\ndesire\ndesktop\ndestroy\ndetailed\ndetect\ndevice\ndevote\ndiagnose\ndictate\ndiet\ndilemma\ndiminish\ndining\ndiploma\ndisaster\ndiscuss\ndisease\ndish\ndismiss\ndisplay\ndistance\ndive\ndivorce\ndocument\ndomain\ndomestic\ndominant\ndough\ndowntown\ndragon\ndramatic\ndream\ndress\ndrift\ndrink\ndrove\ndrug\ndryer\nduckling\nduke\nduration\ndwarf\ndynamic\nearly\nearth\neasel\neasy\necho\neclipse\necology\nedge\neditor\neducate\neither\nelbow\nelder\nelection\nelegant\nelement\nelephant\nelevator\nelite\nelse\nemail\nemerald\nemission\nemperor\nemphasis\nemployer\nempty\nending\nendless\nendorse\nenemy\nenergy\nenforce\nengage\nenjoy\nenlarge\nentrance\nenvelope\nenvy\nepidemic\nepisode\nequation\nequip\neraser\nerode\nescape\nestate\nestimate\nevaluate\nevening\nevidence\nevil\nevoke\nexact\nexample\nexceed\nexchange\nexclude\nexcuse\nexecute\nexercise\nexhaust\nexotic\nexpand\nexpect\nexplain\nexpress\nextend\nextra\neyebrow\nfacility\nfact\nfailure\nfaint\nfake\nfalse\nfamily\nfamous\nfancy\nfangs\nfantasy\nfatal\nfatigue\nfavorite\nfawn\nfiber\nfiction\nfilter\nfinance\nfindings\nfinger\nfirefly\nfirm\nfiscal\nfishing\nfitness\nflame\nflash\nflavor\nflea\nflexible\nflip\nfloat\nfloral\nfluff\nfocus\nforbid\nforce\nforecast\nforget\nformal\nfortune\nforward\nfounder\nfraction\nfragment\nfrequent\nfreshman\nfriar\nfridge\nfriendly\nfrost\nfroth\nfrozen\nfumes\nfunding\nfurl\nfused\ngalaxy\ngame\ngarbage\ngarden\ngarlic\ngasoline\ngather\ngeneral\ngenius\ngenre\ngenuine\ngeology\ngesture\nglad\nglance\nglasses\nglen\nglimpse\ngoat\ngolden\ngraduate\ngrant\ngrasp\ngravity\ngray\ngreatest\ngrief\ngrill\ngrin\ngrocery\ngross\ngroup\ngrownup\ngrumpy\nguard\nguest\nguilt\nguitar\ngums\nhairy\nhamster\nhand\nhanger\nharvest\nhave\nhavoc\nhawk\nhazard\nheadset\nhealth\nhearing\nheat\nhelpful\nherald\nherd\nhesitate\nhobo\nholiday\nholy\nhome\nhormone\nhospital\nhour\nhuge\nhuman\nhumidity\nhunting\nhusband\nhush\nhusky\nhybrid\nidea\nidentify\nidle\nimage\nimpact\nimply\nimprove\nimpulse\ninclude\nincome\nincrease\nindex\nindicate\nindustry\ninfant\ninform\ninherit\ninjury\ninmate\ninsect\ninside\ninstall\nintend\nintimate\ninvasion\ninvolve\niris\nisland\nisolate\nitem\nivory\njacket\njerky\njewelry\njoin\njudicial\njuice\njump\njunction\njunior\njunk\njury\njustice\nkernel\nkeyboard\nkidney\nkind\nkitchen\nknife\nknit\nladen\nladle\nladybug\nlair\nlamp\nlanguage\nlarge\nlaser\nlaundry\nlawsuit\nleader\nleaf\nlearn\nleaves\nlecture\nlegal\nlegend\nlegs\nlend\nlength\nlevel\nliberty\nlibrary\nlicense\nlift\nlikely\nlilac\nlily\nlips\nliquid\nlisten\nliterary\nliving\nlizard\nloan\nlobe\nlocation\nlosing\nloud\nloyalty\nluck\nlunar\nlunch\nlungs\nluxury\nlying\nlyrics\nmachine\nmagazine\nmaiden\nmailman\nmain\nmakeup\nmaking\nmama\nmanager\nmandate\nmansion\nmanual\nmarathon\nmarch\nmarket\nmarvel\nmason\nmaterial\nmath\nmaximum\nmayor\nmeaning\nmedal\nmedical\nmember\nmemory\nmental\nmerchant\nmerit\nmethod\nmetric\nmidst\nmild\nmilitary\nmineral\nminister\nmiracle\nmixed\nmixture\nmobile\nmodern\nmodify\nmoisture\nmoment\nmorning\nmortgage\nmother\nmountain\nmouse\nmove\nmuch\nmule\nmultiple\nmuscle\nmuseum\nmusic\nmustang\nnail\nnational\nnecklace\nnegative\nnervous\nnetwork\nnews\nnuclear\nnumb\nnumerous\nnylon\noasis\nobesity\nobject\nobserve\nobtain\nocean\noften\nolympic\nomit\noral\norange\norbit\norder\nordinary\norganize\nounce\noven\noverall\nowner\npaces\npacific\npackage\npaid\npainting\npajamas\npancake\npants\npapa\npaper\nparcel\nparking\nparty\npatent\npatrol\npayment\npayroll\npeaceful\npeanut\npeasant\npecan\npenalty\npencil\npercent\nperfect\npermit\npetition\nphantom\npharmacy\nphoto\nphrase\nphysics\npickup\npicture\npiece\npile\npink\npipeline\npistol\npitch\nplains\nplan\nplastic\nplatform\nplayoff\npleasure\nplot\nplunge\npractice\nprayer\npreach\npredator\npregnant\npremium\nprepare\npresence\nprevent\npriest\nprimary\npriority\nprisoner\nprivacy\nprize\nproblem\nprocess\nprofile\nprogram\npromise\nprospect\nprovide\nprune\npublic\npulse\npumps\npunish\npuny\npupal\npurchase\npurple\npython\nquantity\nquarter\nquick\nquiet\nrace\nracism\nradar\nrailroad\nrainbow\nraisin\nrandom\nranked\nrapids\nraspy\nreaction\nrealize\nrebound\nrebuild\nrecall\nreceiver\nrecover\nregret\nregular\nreject\nrelate\nremember\nremind\nremove\nrender\nrepair\nrepeat\nreplace\nrequire\nrescue\nresearch\nresident\nresponse\nresult\nretailer\nretreat\nreunion\nrevenue\nreview\nreward\nrhyme\nrhythm\nrich\nrival\nriver\nrobin\nrocky\nromantic\nromp\nroster\nround\nroyal\nruin\nruler\nrumor\nsack\nsafari\nsalary\nsalon\nsalt\nsatisfy\nsatoshi\nsaver\nsays\nscandal\nscared\nscatter\nscene\nscholar\nscience\nscout\nscramble\nscrew\nscript\nscroll\nseafood\nseason\nsecret\nsecurity\nsegment\nsenior\nshadow\nshaft\nshame\nshaped\nsharp\nshelter\nsheriff\nshort\nshould\nshrimp\nsidewalk\nsilent\nsilver\nsimilar\nsimple\nsingle\nsister\nskin\nskunk\nslap\nslavery\nsled\nslice\nslim\nslow\nslush\nsmart\nsmear\nsmell\nsmirk\nsmith\nsmoking\nsmug\nsnake\nsnapshot\nsniff\nsociety\nsoftware\nsoldier\nsolution\nsoul\nsource\nspace\nspark\nspeak\nspecies\nspelling\nspend\nspew\nspider\nspill\nspine\nspirit\nspit\nspray\nsprinkle\nsquare\nsqueeze\nstadium\nstaff\nstandard\nstarting\nstation\nstay\nsteady\nstep\nstick\nstilt\nstory\nstrategy\nstrike\nstyle\nsubject\nsubmit\nsugar\nsuitable\nsunlight\nsuperior\nsurface\nsurprise\nsurvive\nsweater\nswimming\nswing\nswitch\nsymbolic\nsympathy\nsyndrome\nsystem\ntackle\ntactics\ntadpole\ntalent\ntask\ntaste\ntaught\ntaxi\nteacher\nteammate\nteaspoon\ntemple\ntenant\ntendency\ntension\nterminal\ntestify\ntexture\nthank\nthat\ntheater\ntheory\ntherapy\nthorn\nthreaten\nthumb\nthunder\nticket\ntidy\ntimber\ntimely\nting\ntofu\ntogether\ntolerate\ntotal\ntoxic\ntracks\ntraffic\ntraining\ntransfer\ntrash\ntraveler\ntreat\ntrend\ntrial\ntricycle\ntrip\ntriumph\ntrouble\ntrue\ntrust\ntwice\ntwin\ntype\ntypical\nugly\nultimate\numbrella\nuncover\nundergo\nunfair\nunfold\nunhappy\nunion\nuniverse\nunkind\nunknown\nunusual\nunwrap\nupgrade\nupstairs\nusername\nusher\nusual\nvalid\nvaluable\nvampire\nvanish\nvarious\nvegan\nvelvet\nventure\nverdict\nverify\nvery\nveteran\nvexed\nvictim\nvideo\nview\nvintage\nviolence\nviral\nvisitor\nvisual\nvitamins\nvocal\nvoice\nvolume\nvoter\nvoting\nwalnut\nwarmth\nwarn\nwatch\nwavy\nwealthy\nweapon\nwebcam\nwelcome\nwelfare\nwestern\nwidth\nwildlife\nwindow\nwine\nwireless\nwisdom\nwithdraw\nwits\nwolf\nwoman\nwork\nworthy\nwrap\nwrist\nwriting\nwrote\nyear\nyelp\nyield\nyoga\nzero\n";

// src/lib/slip39.ts
var WORDLIST = wordlist_default.trim().split(/\s+/);
if (WORDLIST.length !== 1024) throw new Error("SLIP-39 wordlist must have 1024 words");
var WORD_INDEX = new Map(WORDLIST.map((w, i) => [w, i]));
var RADIX_BITS = 10;
var ID_LENGTH_BITS = 15;
var EXTENDABLE_FLAG_LENGTH_BITS = 1;
var ITERATION_EXP_LENGTH_BITS = 4;
var ID_EXP_LENGTH_WORDS = 2;
var MAX_SHARE_COUNT = 16;
var CHECKSUM_LENGTH_WORDS = 3;
var DIGEST_LENGTH_BYTES = 4;
var CUSTOMIZATION_STRING_ORIG = asciiBytes("shamir");
var CUSTOMIZATION_STRING_EXTENDABLE = asciiBytes("shamir_extendable");
var GROUP_PREFIX_LENGTH_WORDS = ID_EXP_LENGTH_WORDS + 1;
var METADATA_LENGTH_WORDS = ID_EXP_LENGTH_WORDS + 2 + CHECKSUM_LENGTH_WORDS;
var MIN_STRENGTH_BITS = 128;
var MIN_MNEMONIC_LENGTH_WORDS = METADATA_LENGTH_WORDS + Math.ceil(MIN_STRENGTH_BITS / RADIX_BITS);
var BASE_ITERATION_COUNT = 1e4;
var ROUND_COUNT = 4;
var SECRET_INDEX = 255;
var DIGEST_INDEX = 254;
var MnemonicError = class extends Error {
};
function asciiBytes(s) {
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}
function concat(...parts) {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}
function xor2(a, b) {
  const out = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i++) out[i] = a[i] ^ b[i];
  return out;
}
function bytesEqual(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i];
  return d === 0;
}
function randomBytes2(n) {
  const out = new Uint8Array(n);
  crypto.getRandomValues(out);
  return out;
}
var GEN = [14737472, 29474944, 58949888, 117899776, 235798537, 470557714, 940076068, 814808136, 565311632, 66318624];
function polymod(values) {
  let chk = 1;
  for (let j = 0; j < values.length; j++) {
    const b = chk >>> 20;
    chk = ((chk & 1048575) << 10 ^ values[j]) >>> 0;
    for (let i = 0; i < 10; i++) if (b >>> i & 1) chk = (chk ^ GEN[i]) >>> 0;
  }
  return chk;
}
function customizationString(extendable) {
  return extendable ? CUSTOMIZATION_STRING_EXTENDABLE : CUSTOMIZATION_STRING_ORIG;
}
function createChecksum(data, cs) {
  const values = [...cs, ...data, 0, 0, 0];
  const pm = polymod(values) ^ 1;
  return [2, 1, 0].map((i) => pm >>> 10 * i & 1023);
}
function verifyChecksum(data, cs) {
  return polymod([...cs, ...data]) === 1;
}
async function roundFunction(i, passphrase, e, salt, r) {
  return pbkdf2Async(sha256, concat(new Uint8Array([i]), passphrase), concat(salt, r), {
    c: (BASE_ITERATION_COUNT << e) / ROUND_COUNT,
    dkLen: r.length
  });
}
function getSalt(identifier, extendable) {
  if (extendable) return new Uint8Array(0);
  return concat(CUSTOMIZATION_STRING_ORIG, new Uint8Array([identifier >> 8 & 255, identifier & 255]));
}
async function encryptMS(ms, passphrase, e, identifier, extendable) {
  if (ms.length % 2 !== 0) throw new Error("The length of the master secret in bytes must be an even number.");
  let l = ms.slice(0, ms.length / 2);
  let r = ms.slice(ms.length / 2);
  const salt = getSalt(identifier, extendable);
  for (let i = 0; i < ROUND_COUNT; i++) {
    const f = await roundFunction(i, passphrase, e, salt, r);
    [l, r] = [r, xor2(l, f)];
  }
  return concat(r, l);
}
async function decryptEMS(ems, passphrase, e, identifier, extendable) {
  if (ems.length % 2 !== 0) throw new Error("The length of the encrypted master secret in bytes must be an even number.");
  let l = ems.slice(0, ems.length / 2);
  let r = ems.slice(ems.length / 2);
  const salt = getSalt(identifier, extendable);
  for (let i = ROUND_COUNT - 1; i >= 0; i--) {
    const f = await roundFunction(i, passphrase, e, salt, r);
    [l, r] = [r, xor2(l, f)];
  }
  return concat(r, l);
}
var EXP = new Array(255).fill(0);
var LOG = new Array(256).fill(0);
{
  let poly = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = poly;
    LOG[poly] = i;
    poly = poly << 1 ^ poly;
    if (poly & 256) poly ^= 283;
  }
}
function mod255(n) {
  return (n % 255 + 255) % 255;
}
function interpolate(shares, x) {
  const xs = new Set(shares.map((s) => s.x));
  if (xs.size !== shares.length) throw new MnemonicError("Invalid set of shares. Share indices must be unique.");
  const lens = new Set(shares.map((s) => s.data.length));
  if (lens.size !== 1) throw new MnemonicError("Invalid set of shares. All share values must have the same length.");
  if (xs.has(x)) return shares.find((s) => s.x === x).data;
  let logProd = 0;
  for (const s of shares) logProd += LOG[s.x ^ x];
  const result = new Uint8Array(shares[0].data.length);
  for (const s of shares) {
    let sumOthers = 0;
    for (const o of shares) sumOthers += LOG[s.x ^ o.x];
    const logBasisEval = mod255(logProd - LOG[s.x ^ x] - sumOthers);
    for (let k = 0; k < result.length; k++) {
      const v = s.data[k];
      result[k] ^= v !== 0 ? EXP[(LOG[v] + logBasisEval) % 255] : 0;
    }
  }
  return result;
}
function createDigest(randomData, sharedSecret) {
  return hmac(sha256, randomData, sharedSecret).slice(0, DIGEST_LENGTH_BYTES);
}
function splitSecret(threshold, shareCount, sharedSecret) {
  if (threshold < 1) throw new Error("The requested threshold must be a positive integer.");
  if (threshold > shareCount) throw new Error("The requested threshold must not exceed the number of shares.");
  if (shareCount > MAX_SHARE_COUNT) throw new Error(`The requested number of shares must not exceed ${MAX_SHARE_COUNT}.`);
  if (threshold === 1) return Array.from({ length: shareCount }, (_, i) => ({ x: i, data: sharedSecret }));
  const randomShareCount = threshold - 2;
  const shares = Array.from({ length: randomShareCount }, (_, i) => ({ x: i, data: randomBytes2(sharedSecret.length) }));
  const randomPart = randomBytes2(sharedSecret.length - DIGEST_LENGTH_BYTES);
  const digest = createDigest(randomPart, sharedSecret);
  const baseShares = [...shares, { x: DIGEST_INDEX, data: concat(digest, randomPart) }, { x: SECRET_INDEX, data: sharedSecret }];
  for (let i = randomShareCount; i < shareCount; i++) shares.push({ x: i, data: interpolate(baseShares, i) });
  return shares;
}
function recoverSecret(threshold, shares) {
  if (threshold === 1) return shares[0].data;
  const sharedSecret = interpolate(shares, SECRET_INDEX);
  const digestShare = interpolate(shares, DIGEST_INDEX);
  const digest = digestShare.slice(0, DIGEST_LENGTH_BYTES);
  const randomPart = digestShare.slice(DIGEST_LENGTH_BYTES);
  if (!bytesEqual(digest, createDigest(randomPart, sharedSecret))) throw new MnemonicError("Invalid digest of the shared secret.");
  return sharedSecret;
}
function intToIndices(value, length, radixBits) {
  const mask = (1n << BigInt(radixBits)) - 1n;
  const out = [];
  for (let i = length - 1; i >= 0; i--) out.push(Number(value >> BigInt(i * radixBits) & mask));
  return out;
}
function intFromIndices(indices) {
  let v = 0n;
  for (const i of indices) v = v * 1024n + BigInt(i);
  return v;
}
function bytesToBigInt(b) {
  let v = 0n;
  for (const x of b) v = v << 8n | BigInt(x);
  return v;
}
function bigIntToBytes(v, len) {
  if (v >= 1n << BigInt(8 * len)) return null;
  const out = new Uint8Array(len);
  for (let i = len - 1; i >= 0; i--) {
    out[i] = Number(v & 0xffn);
    v >>= 8n;
  }
  return out;
}
function shareToWords(s) {
  let idExp = BigInt(s.identifier) << BigInt(ITERATION_EXP_LENGTH_BITS + EXTENDABLE_FLAG_LENGTH_BITS);
  idExp += BigInt(s.extendable ? 1 : 0) << BigInt(ITERATION_EXP_LENGTH_BITS);
  idExp += BigInt(s.iterationExponent);
  let p = BigInt(s.groupIndex);
  p = (p << 4n) + BigInt(s.groupThreshold - 1);
  p = (p << 4n) + BigInt(s.groupCount - 1);
  p = (p << 4n) + BigInt(s.index);
  p = (p << 4n) + BigInt(s.memberThreshold - 1);
  const valueWordCount = Math.ceil(s.value.length * 8 / RADIX_BITS);
  const data = [
    ...intToIndices(idExp, ID_EXP_LENGTH_WORDS, RADIX_BITS),
    ...intToIndices(p, 2, RADIX_BITS),
    ...intToIndices(bytesToBigInt(s.value), valueWordCount, RADIX_BITS)
  ];
  const checksum = createChecksum(data, customizationString(s.extendable));
  return [...data, ...checksum].map((i) => WORDLIST[i]);
}
function normalizeMnemonic(m) {
  return m.trim().toLowerCase().split(/\s+/).filter(Boolean);
}
function shareFromMnemonic(mnemonic) {
  const words = normalizeMnemonic(mnemonic);
  const data = words.map((w) => {
    const i = WORD_INDEX.get(w);
    if (i === void 0) throw new MnemonicError(`Invalid mnemonic word "${w}".`);
    return i;
  });
  if (data.length < MIN_MNEMONIC_LENGTH_WORDS)
    throw new MnemonicError(`Invalid mnemonic length. The length of each mnemonic must be at least ${MIN_MNEMONIC_LENGTH_WORDS} words.`);
  const paddingLen = RADIX_BITS * (data.length - METADATA_LENGTH_WORDS) % 16;
  if (paddingLen > 8) throw new MnemonicError("Invalid mnemonic length.");
  const idExpInt = Number(intFromIndices(data.slice(0, ID_EXP_LENGTH_WORDS)));
  const identifier = idExpInt >> EXTENDABLE_FLAG_LENGTH_BITS + ITERATION_EXP_LENGTH_BITS;
  const extendable = (idExpInt >> ITERATION_EXP_LENGTH_BITS & 1) === 1;
  const iterationExponent = idExpInt & (1 << ITERATION_EXP_LENGTH_BITS) - 1;
  const prefix = words.slice(0, ID_EXP_LENGTH_WORDS + 2).join(" ");
  if (!verifyChecksum(data, customizationString(extendable))) throw new MnemonicError(`Invalid mnemonic checksum for "${prefix} ...".`);
  const params = intToIndices(intFromIndices(data.slice(ID_EXP_LENGTH_WORDS, ID_EXP_LENGTH_WORDS + 2)), 5, 4);
  const [groupIndex, groupThreshold, groupCount, index, memberThreshold] = params;
  if (groupCount < groupThreshold)
    throw new MnemonicError(`Invalid mnemonic "${prefix} ...". Group threshold cannot be greater than group count.`);
  const valueData = data.slice(ID_EXP_LENGTH_WORDS + 2, data.length - CHECKSUM_LENGTH_WORDS);
  const valueByteCount = Math.ceil((RADIX_BITS * valueData.length - paddingLen) / 8);
  const value = bigIntToBytes(intFromIndices(valueData), valueByteCount);
  if (!value) throw new MnemonicError(`Invalid mnemonic padding for "${prefix} ...".`);
  return {
    identifier,
    extendable,
    iterationExponent,
    groupIndex,
    groupThreshold: groupThreshold + 1,
    groupCount: groupCount + 1,
    index,
    memberThreshold: memberThreshold + 1,
    value
  };
}
function checkPassphrase(passphrase) {
  for (let i = 0; i < passphrase.length; i++) {
    const c = passphrase.charCodeAt(i);
    if (c < 32 || c > 126) throw new Error("The passphrase must contain only printable ASCII characters (code points 32-126).");
  }
  return asciiBytes(passphrase);
}
async function generateMnemonics(masterSecret, opts) {
  const groupThreshold = opts.groupThreshold ?? 1;
  const extendable = opts.extendable ?? true;
  const e = opts.iterationExponent ?? 1;
  const pass = checkPassphrase(opts.passphrase ?? "");
  if (masterSecret.length * 8 < MIN_STRENGTH_BITS) throw new Error("The master secret must be at least 16 bytes.");
  if (groupThreshold > opts.groups.length) throw new Error("The requested group threshold must not exceed the number of groups.");
  if (opts.groups.some(([t, c]) => t === 1 && c > 1)) throw new Error("Creating multiple member shares with member threshold 1 is not allowed. Use 1-of-1 member sharing instead.");
  const idBytes = randomBytes2(2);
  const identifier = (idBytes[0] << 8 | idBytes[1]) & (1 << ID_LENGTH_BITS) - 1;
  const ems = await encryptMS(masterSecret, pass, e, identifier, extendable);
  const groupShares = splitSecret(groupThreshold, opts.groups.length, ems);
  return opts.groups.map(
    ([memberThreshold, memberCount], gi) => splitSecret(memberThreshold, memberCount, groupShares[gi].data).map(
      (raw) => shareToWords({
        identifier,
        extendable,
        iterationExponent: e,
        groupIndex: groupShares[gi].x,
        groupThreshold,
        groupCount: opts.groups.length,
        index: raw.x,
        memberThreshold,
        value: raw.data
      }).join(" ")
    )
  );
}
async function combineMnemonics(mnemonics, passphrase = "", lenient = false) {
  if (!mnemonics.length) throw new MnemonicError("The list of mnemonics is empty.");
  const shares = mnemonics.map(shareFromMnemonic);
  const commonKey = (s) => [s.identifier, s.extendable, s.iterationExponent, s.groupThreshold, s.groupCount].join(",");
  const groupKey = (s) => [commonKey(s), s.groupIndex, s.memberThreshold].join(",");
  if (new Set(shares.map(commonKey)).size !== 1)
    throw new MnemonicError(`Invalid set of mnemonics. All mnemonics must begin with the same ${ID_EXP_LENGTH_WORDS} words, must have the same group threshold and the same group count.`);
  const groups = /* @__PURE__ */ new Map();
  for (const s of shares) {
    const g = groups.get(s.groupIndex) ?? [];
    if (g.length && groupKey(g[0]) !== groupKey(s)) throw new MnemonicError("Invalid set of mnemonics. The group parameters don't match.");
    if (!g.some((o) => o.index === s.index && bytesEqual(o.value, s.value))) g.push(s);
    groups.set(s.groupIndex, g);
  }
  const p = shares[0];
  let groupEntries = [...groups.entries()];
  if (lenient) {
    groupEntries = groupEntries.filter(([, g]) => g.length >= g[0].memberThreshold).map(([gi, g]) => [gi, g.slice(0, g[0].memberThreshold)]).slice(0, p.groupThreshold);
  }
  if (groupEntries.length < p.groupThreshold)
    throw new MnemonicError(`Insufficient number of mnemonic groups. The required number of groups is ${p.groupThreshold}.`);
  if (groupEntries.length !== p.groupThreshold)
    throw new MnemonicError(`Wrong number of mnemonic groups. Expected ${p.groupThreshold} groups, but ${groupEntries.length} were provided.`);
  for (const [, g] of groupEntries) {
    if (g.length !== g[0].memberThreshold) {
      const pre = shareToWords(g[0]).slice(0, GROUP_PREFIX_LENGTH_WORDS).join(" ");
      throw new MnemonicError(`Wrong number of mnemonics. Expected ${g[0].memberThreshold} mnemonics starting with "${pre} ...", but ${g.length} were provided.`);
    }
  }
  const groupShares = groupEntries.map(([gi, g]) => ({
    x: gi,
    data: recoverSecret(g[0].memberThreshold, g.map((s) => ({ x: s.index, data: s.value })))
  }));
  const ems = recoverSecret(p.groupThreshold, groupShares);
  return decryptEMS(ems, checkPassphrase(passphrase), p.iterationExponent, p.identifier, p.extendable);
}

// src/lib/herald.ts
var HEADER = "ALAGAEL HERALD v1";
function b64(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}
function unb64(s) {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function roundForDate(info, date) {
  const r = roundAt(date.getTime(), info);
  return roundTime(info, r) < date.getTime() ? r + 1 : r;
}
async function sealLetter(opts) {
  const { letter, opensAt, client } = opts;
  let { threshold, keepers } = opts;
  if (!letter.trim()) throw new Error("Write the letter first.");
  const info = await client.chain().info();
  if (opensAt.getTime() <= Date.now()) throw new Error("The opening date must be in the future.");
  const round = roundForDate(info, opensAt);
  let key;
  const reuse = opts.existingShares?.map((s) => s.trim()).filter(Boolean) ?? [];
  if (reuse.length) {
    key = await combineMnemonics(reuse, "", true);
    if (key.length !== 32) throw new Error("These shares are not Herald Keeper shares.");
    const s = shareFromMnemonic(reuse[0]);
    threshold = s.memberThreshold;
    keepers = 0;
  } else {
    if (threshold < 1 || threshold > keepers || keepers > 16) throw new Error("Choose between 1 and 16 Keepers, with a threshold no larger than the Keeper count.");
    if (threshold === 1 && keepers > 1) throw new Error("A threshold of 1 with several Keepers gives each Keeper the full key. Use at least 2.");
    key = crypto.getRandomValues(new Uint8Array(32));
  }
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const aesKey = await crypto.subtle.importKey("raw", key, "AES-GCM", false, ["encrypt"]);
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, new TextEncoder().encode(letter)));
  const inner = new TextEncoder().encode(JSON.stringify({ v: 1, alg: "AES-256-GCM", iv: b64(iv), ct: b64(ct) }));
  const age = await encryptAge(import_buffer10.Buffer.from(inner), createTimelockEncrypter(client, round));
  const armored = encodeArmor(age);
  const shares = reuse.length ? [] : (await generateMnemonics(key, { groups: [[threshold, keepers]], iterationExponent: 0 }))[0];
  key.fill(0);
  const opens = new Date(roundTime(info, round));
  const sealed = [
    `# ${HEADER}`,
    `# Opens after: ${opens.toISOString()} (drand quicknet round ${round})`,
    `# Needs: ${threshold}${keepers ? ` of ${keepers}` : ""} Keeper shares`,
    armored.trim(),
    ""
  ].join("\n");
  return { sealed, shares, round, opensAt: opens, threshold };
}
function inspectSealed(sealed) {
  const round = /round (\d+)/.exec(sealed)?.[1];
  const opens = /Opens after: (\S+)/.exec(sealed)?.[1];
  const needs = /Needs: (.+)/.exec(sealed)?.[1];
  return { round: round ? Number(round) : null, opensAt: opens ?? null, needs: needs ?? null };
}
async function openLetter(opts) {
  const body = opts.sealed.split("\n").filter((l) => !l.startsWith("#")).join("\n").trim();
  const cipher = isProbablyArmored(body) ? decodeArmor(body) : body;
  const shares = opts.shares.map((s) => s.trim()).filter(Boolean);
  if (!shares.length) throw new Error("Paste the Keeper shares.");
  const key = await combineMnemonics(shares, "", true);
  const inner = await decryptAge(cipher, createTimelockDecrypter(opts.client));
  const parsed = JSON.parse(new TextDecoder().decode(inner));
  if (parsed.v !== 1) throw new Error("Unknown Herald format.");
  const aesKey = await crypto.subtle.importKey("raw", key, "AES-GCM", false, ["decrypt"]);
  key.fill(0);
  try {
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(parsed.iv) }, aesKey, unb64(parsed.ct));
    return new TextDecoder().decode(pt);
  } catch {
    throw new Error("These Keeper shares belong to a different letter.");
  }
}
export {
  PinnedChainClient,
  QUICKNET,
  QUICKNET_RELAYS,
  inspectSealed,
  openLetter,
  roundForDate,
  sealLetter,
  verifyBeacon
};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
