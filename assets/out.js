var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports2) {
    "use strict";
    exports2.byteLength = byteLength;
    exports2.toByteArray = toByteArray;
    exports2.fromByteArray = fromByteArray;
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
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
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
      var output2 = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output2.push(tripletToBase64(tmp));
      }
      return output2.join("");
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

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports2) {
    exports2.read = function(buffer, offset, isLE2, mLen, nBytes) {
      var e, m2;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE2 ? nBytes - 1 : 0;
      var d = isLE2 ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m2 = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m2 = m2 * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m2 ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m2 = m2 + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m2 * Math.pow(2, e - mLen);
    };
    exports2.write = function(buffer, value4, offset, isLE2, mLen, nBytes) {
      var e, m2, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE2 ? 0 : nBytes - 1;
      var d = isLE2 ? 1 : -1;
      var s = value4 < 0 || value4 === 0 && 1 / value4 < 0 ? 1 : 0;
      value4 = Math.abs(value4);
      if (isNaN(value4) || value4 === Infinity) {
        m2 = isNaN(value4) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value4) / Math.LN2);
        if (value4 * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value4 += rt / c;
        } else {
          value4 += rt * Math.pow(2, 1 - eBias);
        }
        if (value4 * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m2 = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m2 = (value4 * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m2 = value4 * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m2 & 255, i += d, m2 /= 256, mLen -= 8) {
      }
      e = e << mLen | m2;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports2) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports2.Buffer = Buffer3;
    exports2.SlowBuffer = SlowBuffer;
    exports2.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports2.kMaxLength = K_MAX_LENGTH;
    Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
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
    Object.defineProperty(Buffer3.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer3.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function Buffer3(arg, encodingOrOffset, length) {
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
    Buffer3.poolSize = 8192;
    function from(value4, encodingOrOffset, length) {
      if (typeof value4 === "string") {
        return fromString(value4, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value4)) {
        return fromArrayView(value4);
      }
      if (value4 == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value4
        );
      }
      if (isInstance(value4, ArrayBuffer) || value4 && isInstance(value4.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value4, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value4, SharedArrayBuffer) || value4 && isInstance(value4.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value4, encodingOrOffset, length);
      }
      if (typeof value4 === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value4.valueOf && value4.valueOf();
      if (valueOf != null && valueOf !== value4) {
        return Buffer3.from(valueOf, encodingOrOffset, length);
      }
      const b2 = fromObject(value4);
      if (b2)
        return b2;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value4[Symbol.toPrimitive] === "function") {
        return Buffer3.from(value4[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value4
      );
    }
    Buffer3.from = function(value4, encodingOrOffset, length) {
      return from(value4, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer3, Uint8Array);
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
    Buffer3.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer3.isEncoding(encoding)) {
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
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer3.isBuffer(obj)) {
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
      return Buffer3.alloc(+length);
    }
    Buffer3.isBuffer = function isBuffer(b2) {
      return b2 != null && b2._isBuffer === true && b2 !== Buffer3.prototype;
    };
    Buffer3.compare = function compare2(a, b2) {
      if (isInstance(a, Uint8Array))
        a = Buffer3.from(a, a.offset, a.byteLength);
      if (isInstance(b2, Uint8Array))
        b2 = Buffer3.from(b2, b2.offset, b2.byteLength);
      if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b2)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b2)
        return 0;
      let x2 = a.length;
      let y = b2.length;
      for (let i = 0, len = Math.min(x2, y); i < len; ++i) {
        if (a[i] !== b2[i]) {
          x2 = a[i];
          y = b2[i];
          break;
        }
      }
      if (x2 < y)
        return -1;
      if (y < x2)
        return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding(encoding) {
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
    Buffer3.concat = function concat3(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer3.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer3.isBuffer(buf))
              buf = Buffer3.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer3.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer3.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
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
    Buffer3.byteLength = byteLength;
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
      if (!encoding)
        encoding = "utf8";
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
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.prototype._isBuffer = true;
    function swap(b2, n, m2) {
      const i = b2[n];
      b2[n] = b2[m2];
      b2[m2] = i;
    }
    Buffer3.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap32() {
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
    Buffer3.prototype.swap64 = function swap64() {
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
    Buffer3.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
    Buffer3.prototype.equals = function equals(b2) {
      if (!Buffer3.isBuffer(b2))
        throw new TypeError("Argument must be a Buffer");
      if (this === b2)
        return true;
      return Buffer3.compare(this, b2) === 0;
    };
    Buffer3.prototype.inspect = function inspect() {
      let str = "";
      const max = exports2.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
    }
    Buffer3.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer3.from(target, target.offset, target.byteLength);
      }
      if (!Buffer3.isBuffer(target)) {
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
      if (this === target)
        return 0;
      let x2 = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x2, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x2 = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x2 < y)
        return -1;
      if (y < x2)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
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
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer3.from(val, encoding);
      }
      if (Buffer3.isBuffer(val)) {
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
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j2 = 0; j2 < valLength; j2++) {
            if (read(arr, i + j2) !== read(val, j2)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
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
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
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
    Buffer3.prototype.write = function write(string, offset, length, encoding) {
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
          if (encoding === void 0)
            encoding = "utf8";
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
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
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
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
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
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes2 = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes2.length - 1; i += 2) {
        res += String.fromCharCode(bytes2[i] + bytes2[i + 1] * 256);
      }
      return res;
    }
    Buffer3.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer3.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE2(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
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
    Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
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
    Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
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
    Buffer3.prototype.readIntLE = function readIntLE2(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
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
    Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
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
    Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value4, offset, ext, max, min) {
      if (!Buffer3.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value4 > max || value4 < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE2(value4, offset, byteLength2, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value4, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value4 & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value4 / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value4, offset, byteLength2, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value4, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value4 & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value4 / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 1, 255, 0);
      this[offset] = value4 & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 2, 65535, 0);
      this[offset] = value4 & 255;
      this[offset + 1] = value4 >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 2, 65535, 0);
      this[offset] = value4 >>> 8;
      this[offset + 1] = value4 & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 4, 4294967295, 0);
      this[offset + 3] = value4 >>> 24;
      this[offset + 2] = value4 >>> 16;
      this[offset + 1] = value4 >>> 8;
      this[offset] = value4 & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 4, 4294967295, 0);
      this[offset] = value4 >>> 24;
      this[offset + 1] = value4 >>> 16;
      this[offset + 2] = value4 >>> 8;
      this[offset + 3] = value4 & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value4, offset, min, max) {
      checkIntBI(value4, min, max, buf, offset, 7);
      let lo = Number(value4 & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value4 >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value4, offset, min, max) {
      checkIntBI(value4, min, max, buf, offset, 7);
      let lo = Number(value4 & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value4 >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value4, offset = 0) {
      return wrtBigUInt64LE(this, value4, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value4, offset = 0) {
      return wrtBigUInt64BE(this, value4, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeIntLE = function writeIntLE2(value4, offset, byteLength2, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value4, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value4 & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value4 < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value4 / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE(value4, offset, byteLength2, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value4, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value4 & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value4 < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value4 / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeInt8 = function writeInt8(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 1, 127, -128);
      if (value4 < 0)
        value4 = 255 + value4 + 1;
      this[offset] = value4 & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 2, 32767, -32768);
      this[offset] = value4 & 255;
      this[offset + 1] = value4 >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 2, 32767, -32768);
      this[offset] = value4 >>> 8;
      this[offset + 1] = value4 & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 4, 2147483647, -2147483648);
      this[offset] = value4 & 255;
      this[offset + 1] = value4 >>> 8;
      this[offset + 2] = value4 >>> 16;
      this[offset + 3] = value4 >>> 24;
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 4, 2147483647, -2147483648);
      if (value4 < 0)
        value4 = 4294967295 + value4 + 1;
      this[offset] = value4 >>> 24;
      this[offset + 1] = value4 >>> 16;
      this[offset + 2] = value4 >>> 8;
      this[offset + 3] = value4 & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value4, offset = 0) {
      return wrtBigUInt64LE(this, value4, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value4, offset = 0) {
      return wrtBigUInt64BE(this, value4, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value4, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value4, offset, littleEndian, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value4, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value4, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer3.prototype.writeFloatLE = function writeFloatLE(value4, offset, noAssert) {
      return writeFloat(this, value4, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE(value4, offset, noAssert) {
      return writeFloat(this, value4, offset, false, noAssert);
    };
    function writeDouble(buf, value4, offset, littleEndian, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value4, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value4, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value4, offset, noAssert) {
      return writeDouble(this, value4, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value4, offset, noAssert) {
      return writeDouble(this, value4, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer3.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
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
    Buffer3.prototype.fill = function fill(val, start, end, encoding) {
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
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
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
      if (!val)
        val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes2 = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
        const len = bytes2.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes2[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value4) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value: value4,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
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
    function checkIntBI(value4, min, max, buf, offset, byteLength2) {
      if (value4 > max || value4 < min) {
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
        throw new errors.ERR_OUT_OF_RANGE("value", range, value4);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value4, name) {
      if (typeof value4 !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value4);
      }
    }
    function boundsError(value4, length, type) {
      if (Math.floor(value4) !== value4) {
        validateNumber(value4, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value4);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value4
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
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
      const bytes2 = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes2.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes2.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes2.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes2.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes2.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes2.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes2.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes2.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes2;
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
        if ((units -= 2) < 0)
          break;
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
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet2 = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j2 = 0; j2 < 16; ++j2) {
          table[i16 + j2] = alphabet2[i] + alphabet2[j2];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/@dfinity/principal/lib/esm/utils/base32.js
function encode(input) {
  let skip = 0;
  let bits = 0;
  let output2 = "";
  function encodeByte(byte) {
    if (skip < 0) {
      bits |= byte >> -skip;
    } else {
      bits = byte << skip & 248;
    }
    if (skip > 3) {
      skip -= 8;
      return 1;
    }
    if (skip < 4) {
      output2 += alphabet[bits >> 3];
      skip += 5;
    }
    return 0;
  }
  for (let i = 0; i < input.length; ) {
    i += encodeByte(input[i]);
  }
  return output2 + (skip < 0 ? alphabet[bits >> 3] : "");
}
function decode(input) {
  let skip = 0;
  let byte = 0;
  const output2 = new Uint8Array(input.length * 4 / 3 | 0);
  let o = 0;
  function decodeChar(char) {
    let val = lookupTable[char.toLowerCase()];
    if (val === void 0) {
      throw new Error(`Invalid character: ${JSON.stringify(char)}`);
    }
    val <<= 3;
    byte |= val >>> skip;
    skip += 5;
    if (skip >= 8) {
      output2[o++] = byte;
      skip -= 8;
      if (skip > 0) {
        byte = val << 5 - skip & 255;
      } else {
        byte = 0;
      }
    }
  }
  for (const c of input) {
    decodeChar(c);
  }
  return output2.slice(0, o);
}
var alphabet, lookupTable;
var init_base32 = __esm({
  "node_modules/@dfinity/principal/lib/esm/utils/base32.js"() {
    alphabet = "abcdefghijklmnopqrstuvwxyz234567";
    lookupTable = /* @__PURE__ */ Object.create(null);
    for (let i = 0; i < alphabet.length; i++) {
      lookupTable[alphabet[i]] = i;
    }
    lookupTable["0"] = lookupTable.o;
    lookupTable["1"] = lookupTable.i;
  }
});

// node_modules/@dfinity/principal/lib/esm/utils/getCrc.js
function getCrc32(buf) {
  const b2 = new Uint8Array(buf);
  let crc = -1;
  for (let i = 0; i < b2.length; i++) {
    const byte = b2[i];
    const t = (byte ^ crc) & 255;
    crc = lookUpTable[t] ^ crc >>> 8;
  }
  return (crc ^ -1) >>> 0;
}
var lookUpTable;
var init_getCrc = __esm({
  "node_modules/@dfinity/principal/lib/esm/utils/getCrc.js"() {
    lookUpTable = new Uint32Array([
      0,
      1996959894,
      3993919788,
      2567524794,
      124634137,
      1886057615,
      3915621685,
      2657392035,
      249268274,
      2044508324,
      3772115230,
      2547177864,
      162941995,
      2125561021,
      3887607047,
      2428444049,
      498536548,
      1789927666,
      4089016648,
      2227061214,
      450548861,
      1843258603,
      4107580753,
      2211677639,
      325883990,
      1684777152,
      4251122042,
      2321926636,
      335633487,
      1661365465,
      4195302755,
      2366115317,
      997073096,
      1281953886,
      3579855332,
      2724688242,
      1006888145,
      1258607687,
      3524101629,
      2768942443,
      901097722,
      1119000684,
      3686517206,
      2898065728,
      853044451,
      1172266101,
      3705015759,
      2882616665,
      651767980,
      1373503546,
      3369554304,
      3218104598,
      565507253,
      1454621731,
      3485111705,
      3099436303,
      671266974,
      1594198024,
      3322730930,
      2970347812,
      795835527,
      1483230225,
      3244367275,
      3060149565,
      1994146192,
      31158534,
      2563907772,
      4023717930,
      1907459465,
      112637215,
      2680153253,
      3904427059,
      2013776290,
      251722036,
      2517215374,
      3775830040,
      2137656763,
      141376813,
      2439277719,
      3865271297,
      1802195444,
      476864866,
      2238001368,
      4066508878,
      1812370925,
      453092731,
      2181625025,
      4111451223,
      1706088902,
      314042704,
      2344532202,
      4240017532,
      1658658271,
      366619977,
      2362670323,
      4224994405,
      1303535960,
      984961486,
      2747007092,
      3569037538,
      1256170817,
      1037604311,
      2765210733,
      3554079995,
      1131014506,
      879679996,
      2909243462,
      3663771856,
      1141124467,
      855842277,
      2852801631,
      3708648649,
      1342533948,
      654459306,
      3188396048,
      3373015174,
      1466479909,
      544179635,
      3110523913,
      3462522015,
      1591671054,
      702138776,
      2966460450,
      3352799412,
      1504918807,
      783551873,
      3082640443,
      3233442989,
      3988292384,
      2596254646,
      62317068,
      1957810842,
      3939845945,
      2647816111,
      81470997,
      1943803523,
      3814918930,
      2489596804,
      225274430,
      2053790376,
      3826175755,
      2466906013,
      167816743,
      2097651377,
      4027552580,
      2265490386,
      503444072,
      1762050814,
      4150417245,
      2154129355,
      426522225,
      1852507879,
      4275313526,
      2312317920,
      282753626,
      1742555852,
      4189708143,
      2394877945,
      397917763,
      1622183637,
      3604390888,
      2714866558,
      953729732,
      1340076626,
      3518719985,
      2797360999,
      1068828381,
      1219638859,
      3624741850,
      2936675148,
      906185462,
      1090812512,
      3747672003,
      2825379669,
      829329135,
      1181335161,
      3412177804,
      3160834842,
      628085408,
      1382605366,
      3423369109,
      3138078467,
      570562233,
      1426400815,
      3317316542,
      2998733608,
      733239954,
      1555261956,
      3268935591,
      3050360625,
      752459403,
      1541320221,
      2607071920,
      3965973030,
      1969922972,
      40735498,
      2617837225,
      3943577151,
      1913087877,
      83908371,
      2512341634,
      3803740692,
      2075208622,
      213261112,
      2463272603,
      3855990285,
      2094854071,
      198958881,
      2262029012,
      4057260610,
      1759359992,
      534414190,
      2176718541,
      4139329115,
      1873836001,
      414664567,
      2282248934,
      4279200368,
      1711684554,
      285281116,
      2405801727,
      4167216745,
      1634467795,
      376229701,
      2685067896,
      3608007406,
      1308918612,
      956543938,
      2808555105,
      3495958263,
      1231636301,
      1047427035,
      2932959818,
      3654703836,
      1088359270,
      936918e3,
      2847714899,
      3736837829,
      1202900863,
      817233897,
      3183342108,
      3401237130,
      1404277552,
      615818150,
      3134207493,
      3453421203,
      1423857449,
      601450431,
      3009837614,
      3294710456,
      1567103746,
      711928724,
      3020668471,
      3272380065,
      1510334235,
      755167117
    ]);
  }
});

// node_modules/@noble/hashes/esm/_assert.js
function isBytes(a) {
  return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
}
function bytes(b2, ...lengths) {
  if (!isBytes(b2))
    throw new Error("Expected Uint8Array");
  if (lengths.length > 0 && !lengths.includes(b2.length))
    throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b2.length}`);
}
function exists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function output(out, instance) {
  bytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}
var init_assert = __esm({
  "node_modules/@noble/hashes/esm/_assert.js"() {
  }
});

// node_modules/@noble/hashes/esm/crypto.js
var crypto2;
var init_crypto = __esm({
  "node_modules/@noble/hashes/esm/crypto.js"() {
    crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
  }
});

// node_modules/@noble/hashes/esm/utils.js
function isBytes2(a) {
  return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  if (!isBytes2(data))
    throw new Error(`expected Uint8Array, got ${typeof data}`);
  return data;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    if (!isBytes2(a))
      throw new Error("Uint8Array expected");
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
function wrapConstructor(hashCons) {
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
  throw new Error("crypto.getRandomValues must be defined");
}
var createView, rotr, isLE, Hash, toStr;
var init_utils = __esm({
  "node_modules/@noble/hashes/esm/utils.js"() {
    init_crypto();
    createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    rotr = (word, shift) => word << 32 - shift | word >>> shift;
    isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    if (!isLE)
      throw new Error("Non little-endian hardware is not supported");
    Hash = class {
      // Safe version that clones internal state
      clone() {
        return this._cloneInto();
      }
    };
    toStr = {}.toString;
  }
});

// node_modules/@noble/hashes/esm/_sha2.js
function setBigUint64(view, byteOffset, value4, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value4, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value4 >> _32n2 & _u32_max);
  const wl = Number(value4 & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
var SHA2;
var init_sha2 = __esm({
  "node_modules/@noble/hashes/esm/_sha2.js"() {
    init_assert();
    init_utils();
    SHA2 = class extends Hash {
      constructor(blockLen, outputLen, padOffset, isLE2) {
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE2;
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.buffer = new Uint8Array(blockLen);
        this.view = createView(this.buffer);
      }
      update(data) {
        exists(this);
        const { view, buffer, blockLen } = this;
        data = toBytes(data);
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          if (take === blockLen) {
            const dataView = createView(data);
            for (; blockLen <= len - pos; pos += blockLen)
              this.process(dataView, pos);
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
        exists(this);
        output(out, this);
        this.finished = true;
        const { buffer, view, blockLen, isLE: isLE2 } = this;
        let { pos } = this;
        buffer[pos++] = 128;
        this.buffer.subarray(pos).fill(0);
        if (this.padOffset > blockLen - pos) {
          this.process(view, 0);
          pos = 0;
        }
        for (let i = pos; i < blockLen; i++)
          buffer[i] = 0;
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
        this.process(view, 0);
        const oview = createView(out);
        const len = this.outputLen;
        if (len % 4)
          throw new Error("_sha2: outputLen should be aligned to 32bit");
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length)
          throw new Error("_sha2: outputLen bigger than state");
        for (let i = 0; i < outLen; i++)
          oview.setUint32(4 * i, state[i], isLE2);
      }
      digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
      }
      _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.length = length;
        to.pos = pos;
        to.finished = finished;
        to.destroyed = destroyed;
        if (length % blockLen)
          to.buffer.set(buffer);
        return to;
      }
    };
  }
});

// node_modules/@noble/hashes/esm/sha256.js
var Chi, Maj, SHA256_K, IV, SHA256_W, SHA256, SHA224, sha256, sha224;
var init_sha256 = __esm({
  "node_modules/@noble/hashes/esm/sha256.js"() {
    init_sha2();
    init_utils();
    Chi = (a, b2, c) => a & b2 ^ ~a & c;
    Maj = (a, b2, c) => a & b2 ^ a & c ^ b2 & c;
    SHA256_K = /* @__PURE__ */ new Uint32Array([
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
    IV = /* @__PURE__ */ new Uint32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
    SHA256_W = /* @__PURE__ */ new Uint32Array(64);
    SHA256 = class extends SHA2 {
      constructor() {
        super(64, 32, 8, false);
        this.A = IV[0] | 0;
        this.B = IV[1] | 0;
        this.C = IV[2] | 0;
        this.D = IV[3] | 0;
        this.E = IV[4] | 0;
        this.F = IV[5] | 0;
        this.G = IV[6] | 0;
        this.H = IV[7] | 0;
      }
      get() {
        const { A: A2, B, C, D: D2, E, F, G, H } = this;
        return [A2, B, C, D2, E, F, G, H];
      }
      // prettier-ignore
      set(A2, B, C, D2, E, F, G, H) {
        this.A = A2 | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D2 | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
      }
      process(view, offset) {
        for (let i = 0; i < 16; i++, offset += 4)
          SHA256_W[i] = view.getUint32(offset, false);
        for (let i = 16; i < 64; i++) {
          const W15 = SHA256_W[i - 15];
          const W2 = SHA256_W[i - 2];
          const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
          const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
          SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
        }
        let { A: A2, B, C, D: D2, E, F, G, H } = this;
        for (let i = 0; i < 64; i++) {
          const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
          const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
          const sigma0 = rotr(A2, 2) ^ rotr(A2, 13) ^ rotr(A2, 22);
          const T2 = sigma0 + Maj(A2, B, C) | 0;
          H = G;
          G = F;
          F = E;
          E = D2 + T1 | 0;
          D2 = C;
          C = B;
          B = A2;
          A2 = T1 + T2 | 0;
        }
        A2 = A2 + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D2 = D2 + this.D | 0;
        E = E + this.E | 0;
        F = F + this.F | 0;
        G = G + this.G | 0;
        H = H + this.H | 0;
        this.set(A2, B, C, D2, E, F, G, H);
      }
      roundClean() {
        SHA256_W.fill(0);
      }
      destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        this.buffer.fill(0);
      }
    };
    SHA224 = class extends SHA256 {
      constructor() {
        super();
        this.A = 3238371032 | 0;
        this.B = 914150663 | 0;
        this.C = 812702999 | 0;
        this.D = 4144912697 | 0;
        this.E = 4290775857 | 0;
        this.F = 1750603025 | 0;
        this.G = 1694076839 | 0;
        this.H = 3204075428 | 0;
        this.outputLen = 28;
      }
    };
    sha256 = /* @__PURE__ */ wrapConstructor(() => new SHA256());
    sha224 = /* @__PURE__ */ wrapConstructor(() => new SHA224());
  }
});

// node_modules/@dfinity/principal/lib/esm/utils/sha224.js
function sha2242(data) {
  return sha224.create().update(new Uint8Array(data)).digest();
}
var init_sha224 = __esm({
  "node_modules/@dfinity/principal/lib/esm/utils/sha224.js"() {
    init_sha256();
  }
});

// node_modules/@dfinity/principal/lib/esm/index.js
var JSON_KEY_PRINCIPAL, SELF_AUTHENTICATING_SUFFIX, ANONYMOUS_SUFFIX, MANAGEMENT_CANISTER_PRINCIPAL_HEX_STR, fromHexString, toHexString, Principal2;
var init_esm = __esm({
  "node_modules/@dfinity/principal/lib/esm/index.js"() {
    init_base32();
    init_getCrc();
    init_sha224();
    JSON_KEY_PRINCIPAL = "__principal__";
    SELF_AUTHENTICATING_SUFFIX = 2;
    ANONYMOUS_SUFFIX = 4;
    MANAGEMENT_CANISTER_PRINCIPAL_HEX_STR = "aaaaa-aa";
    fromHexString = (hexString) => {
      var _a2;
      return new Uint8Array(((_a2 = hexString.match(/.{1,2}/g)) !== null && _a2 !== void 0 ? _a2 : []).map((byte) => parseInt(byte, 16)));
    };
    toHexString = (bytes2) => bytes2.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
    Principal2 = class _Principal {
      constructor(_arr) {
        this._arr = _arr;
        this._isPrincipal = true;
      }
      static anonymous() {
        return new this(new Uint8Array([ANONYMOUS_SUFFIX]));
      }
      /**
       * Utility method, returning the principal representing the management canister, decoded from the hex string `'aaaaa-aa'`
       * @returns {Principal} principal of the management canister
       */
      static managementCanister() {
        return this.fromHex(MANAGEMENT_CANISTER_PRINCIPAL_HEX_STR);
      }
      static selfAuthenticating(publicKey) {
        const sha = sha2242(publicKey);
        return new this(new Uint8Array([...sha, SELF_AUTHENTICATING_SUFFIX]));
      }
      static from(other) {
        if (typeof other === "string") {
          return _Principal.fromText(other);
        } else if (Object.getPrototypeOf(other) === Uint8Array.prototype) {
          return new _Principal(other);
        } else if (typeof other === "object" && other !== null && other._isPrincipal === true) {
          return new _Principal(other._arr);
        }
        throw new Error(`Impossible to convert ${JSON.stringify(other)} to Principal.`);
      }
      static fromHex(hex) {
        return new this(fromHexString(hex));
      }
      static fromText(text) {
        let maybePrincipal = text;
        if (text.includes(JSON_KEY_PRINCIPAL)) {
          const obj = JSON.parse(text);
          if (JSON_KEY_PRINCIPAL in obj) {
            maybePrincipal = obj[JSON_KEY_PRINCIPAL];
          }
        }
        const canisterIdNoDash = maybePrincipal.toLowerCase().replace(/-/g, "");
        let arr = decode(canisterIdNoDash);
        arr = arr.slice(4, arr.length);
        const principal = new this(arr);
        if (principal.toText() !== maybePrincipal) {
          throw new Error(`Principal "${principal.toText()}" does not have a valid checksum (original value "${maybePrincipal}" may not be a valid Principal ID).`);
        }
        return principal;
      }
      static fromUint8Array(arr) {
        return new this(arr);
      }
      isAnonymous() {
        return this._arr.byteLength === 1 && this._arr[0] === ANONYMOUS_SUFFIX;
      }
      toUint8Array() {
        return this._arr;
      }
      toHex() {
        return toHexString(this._arr).toUpperCase();
      }
      toText() {
        const checksumArrayBuf = new ArrayBuffer(4);
        const view = new DataView(checksumArrayBuf);
        view.setUint32(0, getCrc32(this._arr));
        const checksum = new Uint8Array(checksumArrayBuf);
        const bytes2 = Uint8Array.from(this._arr);
        const array = new Uint8Array([...checksum, ...bytes2]);
        const result = encode(array);
        const matches = result.match(/.{1,5}/g);
        if (!matches) {
          throw new Error();
        }
        return matches.join("-");
      }
      toString() {
        return this.toText();
      }
      /**
       * Serializes to JSON
       * @returns {JsonnablePrincipal} a JSON object with a single key, {@link JSON_KEY_PRINCIPAL}, whose value is the principal as a string
       */
      toJSON() {
        return { [JSON_KEY_PRINCIPAL]: this.toText() };
      }
      /**
       * Utility method taking a Principal to compare against. Used for determining canister ranges in certificate verification
       * @param {Principal} other - a {@link Principal} to compare
       * @returns {'lt' | 'eq' | 'gt'} `'lt' | 'eq' | 'gt'` a string, representing less than, equal to, or greater than
       */
      compareTo(other) {
        for (let i = 0; i < Math.min(this._arr.length, other._arr.length); i++) {
          if (this._arr[i] < other._arr[i])
            return "lt";
          else if (this._arr[i] > other._arr[i])
            return "gt";
        }
        if (this._arr.length < other._arr.length)
          return "lt";
        if (this._arr.length > other._arr.length)
          return "gt";
        return "eq";
      }
      /**
       * Utility method checking whether a provided Principal is less than or equal to the current one using the {@link Principal.compareTo} method
       * @param other a {@link Principal} to compare
       * @returns {boolean} boolean
       */
      ltEq(other) {
        const cmp = this.compareTo(other);
        return cmp == "lt" || cmp == "eq";
      }
      /**
       * Utility method checking whether a provided Principal is greater than or equal to the current one using the {@link Principal.compareTo} method
       * @param other a {@link Principal} to compare
       * @returns {boolean} boolean
       */
      gtEq(other) {
        const cmp = this.compareTo(other);
        return cmp == "gt" || cmp == "eq";
      }
    };
  }
});

// node_modules/@dfinity/agent/lib/esm/errors.js
var AgentError;
var init_errors = __esm({
  "node_modules/@dfinity/agent/lib/esm/errors.js"() {
    AgentError = class _AgentError extends Error {
      constructor(message) {
        super(message);
        this.message = message;
        Object.setPrototypeOf(this, _AgentError.prototype);
      }
    };
  }
});

// node_modules/@dfinity/candid/lib/esm/utils/buffer.js
function concat(...buffers) {
  const result = new Uint8Array(buffers.reduce((acc, curr) => acc + curr.byteLength, 0));
  let index = 0;
  for (const b2 of buffers) {
    result.set(new Uint8Array(b2), index);
    index += b2.byteLength;
  }
  return result;
}
function uint8ToBuf(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength).buffer;
}
function bufFromBufLike(bufLike) {
  if (bufLike instanceof Uint8Array) {
    return uint8ToBuf(bufLike);
  }
  if (bufLike instanceof ArrayBuffer) {
    return bufLike;
  }
  if ("buffer" in bufLike) {
    return bufLike.buffer;
  }
  return new Uint8Array(bufLike);
}
var PipeArrayBuffer;
var init_buffer = __esm({
  "node_modules/@dfinity/candid/lib/esm/utils/buffer.js"() {
    PipeArrayBuffer = class {
      /**
       * Creates a new instance of a pipe
       * @param buffer an optional buffer to start with
       * @param length an optional amount of bytes to use for the length.
       */
      constructor(buffer, length = (buffer === null || buffer === void 0 ? void 0 : buffer.byteLength) || 0) {
        this._buffer = bufFromBufLike(buffer || new ArrayBuffer(0));
        this._view = new Uint8Array(this._buffer, 0, length);
      }
      get buffer() {
        return bufFromBufLike(this._view.slice());
      }
      get byteLength() {
        return this._view.byteLength;
      }
      /**
       * Read `num` number of bytes from the front of the pipe.
       * @param num The number of bytes to read.
       */
      read(num) {
        const result = this._view.subarray(0, num);
        this._view = this._view.subarray(num);
        return result.slice().buffer;
      }
      readUint8() {
        const result = this._view[0];
        this._view = this._view.subarray(1);
        return result;
      }
      /**
       * Write a buffer to the end of the pipe.
       * @param buf The bytes to write.
       */
      write(buf) {
        const b2 = new Uint8Array(buf);
        const offset = this._view.byteLength;
        if (this._view.byteOffset + this._view.byteLength + b2.byteLength >= this._buffer.byteLength) {
          this.alloc(b2.byteLength);
        } else {
          this._view = new Uint8Array(this._buffer, this._view.byteOffset, this._view.byteLength + b2.byteLength);
        }
        this._view.set(b2, offset);
      }
      /**
       * Whether or not there is more data to read from the buffer
       */
      get end() {
        return this._view.byteLength === 0;
      }
      /**
       * Allocate a fixed amount of memory in the buffer. This does not affect the view.
       * @param amount A number of bytes to add to the buffer.
       */
      alloc(amount) {
        const b2 = new ArrayBuffer((this._buffer.byteLength + amount) * 1.2 | 0);
        const v2 = new Uint8Array(b2, 0, this._view.byteLength + amount);
        v2.set(this._view);
        this._buffer = b2;
        this._view = v2;
      }
    };
  }
});

// node_modules/@dfinity/candid/lib/esm/utils/hash.js
function idlHash(s) {
  const utf8encoder = new TextEncoder();
  const array = utf8encoder.encode(s);
  let h = 0;
  for (const c of array) {
    h = (h * 223 + c) % 2 ** 32;
  }
  return h;
}
function idlLabelToId(label) {
  if (/^_\d+_$/.test(label) || /^_0x[0-9a-fA-F]+_$/.test(label)) {
    const num = +label.slice(1, -1);
    if (Number.isSafeInteger(num) && num >= 0 && num < 2 ** 32) {
      return num;
    }
  }
  return idlHash(label);
}
var init_hash = __esm({
  "node_modules/@dfinity/candid/lib/esm/utils/hash.js"() {
  }
});

// node_modules/@dfinity/candid/lib/esm/utils/leb128.js
function eob() {
  throw new Error("unexpected end of buffer");
}
function safeRead(pipe, num) {
  if (pipe.byteLength < num) {
    eob();
  }
  return pipe.read(num);
}
function safeReadUint8(pipe) {
  const byte = pipe.readUint8();
  if (byte === void 0) {
    eob();
  }
  return byte;
}
function lebEncode(value4) {
  if (typeof value4 === "number") {
    value4 = BigInt(value4);
  }
  if (value4 < BigInt(0)) {
    throw new Error("Cannot leb encode negative values.");
  }
  const byteLength = (value4 === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(value4)))) + 1;
  const pipe = new PipeArrayBuffer(new ArrayBuffer(byteLength), 0);
  while (true) {
    const i = Number(value4 & BigInt(127));
    value4 /= BigInt(128);
    if (value4 === BigInt(0)) {
      pipe.write(new Uint8Array([i]));
      break;
    } else {
      pipe.write(new Uint8Array([i | 128]));
    }
  }
  return pipe.buffer;
}
function lebDecode(pipe) {
  let weight = BigInt(1);
  let value4 = BigInt(0);
  let byte;
  do {
    byte = safeReadUint8(pipe);
    value4 += BigInt(byte & 127).valueOf() * weight;
    weight *= BigInt(128);
  } while (byte >= 128);
  return value4;
}
function slebEncode(value4) {
  if (typeof value4 === "number") {
    value4 = BigInt(value4);
  }
  const isNeg = value4 < BigInt(0);
  if (isNeg) {
    value4 = -value4 - BigInt(1);
  }
  const byteLength = (value4 === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(value4)))) + 1;
  const pipe = new PipeArrayBuffer(new ArrayBuffer(byteLength), 0);
  while (true) {
    const i = getLowerBytes(value4);
    value4 /= BigInt(128);
    if (isNeg && value4 === BigInt(0) && (i & 64) !== 0 || !isNeg && value4 === BigInt(0) && (i & 64) === 0) {
      pipe.write(new Uint8Array([i]));
      break;
    } else {
      pipe.write(new Uint8Array([i | 128]));
    }
  }
  function getLowerBytes(num) {
    const bytes2 = num % BigInt(128);
    if (isNeg) {
      return Number(BigInt(128) - bytes2 - BigInt(1));
    } else {
      return Number(bytes2);
    }
  }
  return pipe.buffer;
}
function slebDecode(pipe) {
  const pipeView = new Uint8Array(pipe.buffer);
  let len = 0;
  for (; len < pipeView.byteLength; len++) {
    if (pipeView[len] < 128) {
      if ((pipeView[len] & 64) === 0) {
        return lebDecode(pipe);
      }
      break;
    }
  }
  const bytes2 = new Uint8Array(safeRead(pipe, len + 1));
  let value4 = BigInt(0);
  for (let i = bytes2.byteLength - 1; i >= 0; i--) {
    value4 = value4 * BigInt(128) + BigInt(128 - (bytes2[i] & 127) - 1);
  }
  return -value4 - BigInt(1);
}
function writeUIntLE(value4, byteLength) {
  if (BigInt(value4) < BigInt(0)) {
    throw new Error("Cannot write negative values.");
  }
  return writeIntLE(value4, byteLength);
}
function writeIntLE(value4, byteLength) {
  value4 = BigInt(value4);
  const pipe = new PipeArrayBuffer(new ArrayBuffer(Math.min(1, byteLength)), 0);
  let i = 0;
  let mul = BigInt(256);
  let sub = BigInt(0);
  let byte = Number(value4 % mul);
  pipe.write(new Uint8Array([byte]));
  while (++i < byteLength) {
    if (value4 < 0 && sub === BigInt(0) && byte !== 0) {
      sub = BigInt(1);
    }
    byte = Number((value4 / mul - sub) % BigInt(256));
    pipe.write(new Uint8Array([byte]));
    mul *= BigInt(256);
  }
  return pipe.buffer;
}
function readUIntLE(pipe, byteLength) {
  let val = BigInt(safeReadUint8(pipe));
  let mul = BigInt(1);
  let i = 0;
  while (++i < byteLength) {
    mul *= BigInt(256);
    const byte = BigInt(safeReadUint8(pipe));
    val = val + mul * byte;
  }
  return val;
}
function readIntLE(pipe, byteLength) {
  let val = readUIntLE(pipe, byteLength);
  const mul = BigInt(2) ** (BigInt(8) * BigInt(byteLength - 1) + BigInt(7));
  if (val >= mul) {
    val -= mul * BigInt(2);
  }
  return val;
}
var init_leb128 = __esm({
  "node_modules/@dfinity/candid/lib/esm/utils/leb128.js"() {
    init_buffer();
  }
});

// node_modules/@dfinity/candid/lib/esm/utils/bigint-math.js
function iexp2(n) {
  const nBig = BigInt(n);
  if (n < 0) {
    throw new RangeError("Input must be non-negative");
  }
  return BigInt(1) << nBig;
}
var init_bigint_math = __esm({
  "node_modules/@dfinity/candid/lib/esm/utils/bigint-math.js"() {
  }
});

// node_modules/@dfinity/candid/lib/esm/idl.js
var idl_exports = {};
__export(idl_exports, {
  Bool: () => Bool,
  BoolClass: () => BoolClass,
  ConstructType: () => ConstructType,
  Empty: () => Empty,
  EmptyClass: () => EmptyClass,
  FixedIntClass: () => FixedIntClass,
  FixedNatClass: () => FixedNatClass,
  Float32: () => Float32,
  Float64: () => Float64,
  FloatClass: () => FloatClass,
  Func: () => Func,
  FuncClass: () => FuncClass,
  Int: () => Int,
  Int16: () => Int16,
  Int32: () => Int32,
  Int64: () => Int64,
  Int8: () => Int8,
  IntClass: () => IntClass,
  Nat: () => Nat,
  Nat16: () => Nat16,
  Nat32: () => Nat32,
  Nat64: () => Nat64,
  Nat8: () => Nat8,
  NatClass: () => NatClass,
  Null: () => Null,
  NullClass: () => NullClass,
  Opt: () => Opt,
  OptClass: () => OptClass,
  PrimitiveType: () => PrimitiveType,
  Principal: () => Principal3,
  PrincipalClass: () => PrincipalClass,
  Rec: () => Rec,
  RecClass: () => RecClass,
  Record: () => Record,
  RecordClass: () => RecordClass,
  Reserved: () => Reserved,
  ReservedClass: () => ReservedClass,
  Service: () => Service,
  ServiceClass: () => ServiceClass,
  Text: () => Text,
  TextClass: () => TextClass,
  Tuple: () => Tuple,
  TupleClass: () => TupleClass,
  Type: () => Type,
  Unknown: () => Unknown,
  UnknownClass: () => UnknownClass,
  Variant: () => Variant,
  VariantClass: () => VariantClass,
  Vec: () => Vec,
  VecClass: () => VecClass,
  Visitor: () => Visitor,
  decode: () => decode2,
  encode: () => encode2
});
function zipWith(xs, ys, f) {
  return xs.map((x2, i) => f(x2, ys[i]));
}
function decodePrincipalId(b2) {
  const x2 = safeReadUint8(b2);
  if (x2 !== 1) {
    throw new Error("Cannot decode principal");
  }
  const len = Number(lebDecode(b2));
  return Principal2.fromUint8Array(new Uint8Array(safeRead(b2, len)));
}
function toReadableString(x2) {
  const str = JSON.stringify(x2, (_key, value4) => typeof value4 === "bigint" ? `BigInt(${value4})` : value4);
  return str && str.length > toReadableString_max ? str.substring(0, toReadableString_max - 3) + "..." : str;
}
function encode2(argTypes, args) {
  if (args.length < argTypes.length) {
    throw Error("Wrong number of message arguments");
  }
  const typeTable = new TypeTable();
  argTypes.forEach((t) => t.buildTypeTable(typeTable));
  const magic = new TextEncoder().encode(magicNumber);
  const table = typeTable.encode();
  const len = lebEncode(args.length);
  const typs = concat(...argTypes.map((t) => t.encodeType(typeTable)));
  const vals = concat(...zipWith(argTypes, args, (t, x2) => {
    try {
      t.covariant(x2);
    } catch (e) {
      const err = new Error(e.message + "\n\n");
      throw err;
    }
    return t.encodeValue(x2);
  }));
  return concat(magic, table, len, typs, vals);
}
function decode2(retTypes, bytes2) {
  const b2 = new PipeArrayBuffer(bytes2);
  if (bytes2.byteLength < magicNumber.length) {
    throw new Error("Message length smaller than magic number");
  }
  const magicBuffer = safeRead(b2, magicNumber.length);
  const magic = new TextDecoder().decode(magicBuffer);
  if (magic !== magicNumber) {
    throw new Error("Wrong magic number: " + JSON.stringify(magic));
  }
  function readTypeTable(pipe) {
    const typeTable = [];
    const len = Number(lebDecode(pipe));
    for (let i = 0; i < len; i++) {
      const ty = Number(slebDecode(pipe));
      switch (ty) {
        case -18:
        case -19: {
          const t = Number(slebDecode(pipe));
          typeTable.push([ty, t]);
          break;
        }
        case -20:
        case -21: {
          const fields = [];
          let objectLength = Number(lebDecode(pipe));
          let prevHash;
          while (objectLength--) {
            const hash2 = Number(lebDecode(pipe));
            if (hash2 >= Math.pow(2, 32)) {
              throw new Error("field id out of 32-bit range");
            }
            if (typeof prevHash === "number" && prevHash >= hash2) {
              throw new Error("field id collision or not sorted");
            }
            prevHash = hash2;
            const t = Number(slebDecode(pipe));
            fields.push([hash2, t]);
          }
          typeTable.push([ty, fields]);
          break;
        }
        case -22: {
          const args = [];
          let argLength = Number(lebDecode(pipe));
          while (argLength--) {
            args.push(Number(slebDecode(pipe)));
          }
          const returnValues = [];
          let returnValuesLength = Number(lebDecode(pipe));
          while (returnValuesLength--) {
            returnValues.push(Number(slebDecode(pipe)));
          }
          const annotations = [];
          let annotationLength = Number(lebDecode(pipe));
          while (annotationLength--) {
            const annotation = Number(lebDecode(pipe));
            switch (annotation) {
              case 1: {
                annotations.push("query");
                break;
              }
              case 2: {
                annotations.push("oneway");
                break;
              }
              case 3: {
                annotations.push("composite_query");
                break;
              }
              default:
                throw new Error("unknown annotation");
            }
          }
          typeTable.push([ty, [args, returnValues, annotations]]);
          break;
        }
        case -23: {
          let servLength = Number(lebDecode(pipe));
          const methods = [];
          while (servLength--) {
            const nameLength = Number(lebDecode(pipe));
            const funcName = new TextDecoder().decode(safeRead(pipe, nameLength));
            const funcType = slebDecode(pipe);
            methods.push([funcName, funcType]);
          }
          typeTable.push([ty, methods]);
          break;
        }
        default:
          throw new Error("Illegal op_code: " + ty);
      }
    }
    const rawList = [];
    const length = Number(lebDecode(pipe));
    for (let i = 0; i < length; i++) {
      rawList.push(Number(slebDecode(pipe)));
    }
    return [typeTable, rawList];
  }
  const [rawTable, rawTypes] = readTypeTable(b2);
  if (rawTypes.length < retTypes.length) {
    throw new Error("Wrong number of return values");
  }
  const table = rawTable.map((_) => Rec());
  function getType(t) {
    if (t < -24) {
      throw new Error("future value not supported");
    }
    if (t < 0) {
      switch (t) {
        case -1:
          return Null;
        case -2:
          return Bool;
        case -3:
          return Nat;
        case -4:
          return Int;
        case -5:
          return Nat8;
        case -6:
          return Nat16;
        case -7:
          return Nat32;
        case -8:
          return Nat64;
        case -9:
          return Int8;
        case -10:
          return Int16;
        case -11:
          return Int32;
        case -12:
          return Int64;
        case -13:
          return Float32;
        case -14:
          return Float64;
        case -15:
          return Text;
        case -16:
          return Reserved;
        case -17:
          return Empty;
        case -24:
          return Principal3;
        default:
          throw new Error("Illegal op_code: " + t);
      }
    }
    if (t >= rawTable.length) {
      throw new Error("type index out of range");
    }
    return table[t];
  }
  function buildType(entry) {
    switch (entry[0]) {
      case -19: {
        const ty = getType(entry[1]);
        return Vec(ty);
      }
      case -18: {
        const ty = getType(entry[1]);
        return Opt(ty);
      }
      case -20: {
        const fields = {};
        for (const [hash2, ty] of entry[1]) {
          const name = `_${hash2}_`;
          fields[name] = getType(ty);
        }
        const record = Record(fields);
        const tuple = record.tryAsTuple();
        if (Array.isArray(tuple)) {
          return Tuple(...tuple);
        } else {
          return record;
        }
      }
      case -21: {
        const fields = {};
        for (const [hash2, ty] of entry[1]) {
          const name = `_${hash2}_`;
          fields[name] = getType(ty);
        }
        return Variant(fields);
      }
      case -22: {
        const [args, returnValues, annotations] = entry[1];
        return Func(args.map((t) => getType(t)), returnValues.map((t) => getType(t)), annotations);
      }
      case -23: {
        const rec = {};
        const methods = entry[1];
        for (const [name, typeRef] of methods) {
          let type = getType(typeRef);
          if (type instanceof RecClass) {
            type = type.getType();
          }
          if (!(type instanceof FuncClass)) {
            throw new Error("Illegal service definition: services can only contain functions");
          }
          rec[name] = type;
        }
        return Service(rec);
      }
      default:
        throw new Error("Illegal op_code: " + entry[0]);
    }
  }
  rawTable.forEach((entry, i) => {
    if (entry[0] === -22) {
      const t = buildType(entry);
      table[i].fill(t);
    }
  });
  rawTable.forEach((entry, i) => {
    if (entry[0] !== -22) {
      const t = buildType(entry);
      table[i].fill(t);
    }
  });
  const types = rawTypes.map((t) => getType(t));
  const output2 = retTypes.map((t, i) => {
    return t.decodeValue(b2, types[i]);
  });
  for (let ind = retTypes.length; ind < types.length; ind++) {
    types[ind].decodeValue(b2, types[ind]);
  }
  if (b2.byteLength > 0) {
    throw new Error("decode: Left-over bytes");
  }
  return output2;
}
function Tuple(...types) {
  return new TupleClass(types);
}
function Vec(t) {
  return new VecClass(t);
}
function Opt(t) {
  return new OptClass(t);
}
function Record(t) {
  return new RecordClass(t);
}
function Variant(fields) {
  return new VariantClass(fields);
}
function Rec() {
  return new RecClass();
}
function Func(args, ret, annotations = []) {
  return new FuncClass(args, ret, annotations);
}
function Service(t) {
  return new ServiceClass(t);
}
var magicNumber, toReadableString_max, TypeTable, Visitor, Type, PrimitiveType, ConstructType, EmptyClass, UnknownClass, BoolClass, NullClass, ReservedClass, TextClass, IntClass, NatClass, FloatClass, FixedIntClass, FixedNatClass, VecClass, OptClass, RecordClass, TupleClass, VariantClass, RecClass, PrincipalClass, FuncClass, ServiceClass, Empty, Reserved, Unknown, Bool, Null, Text, Int, Nat, Float32, Float64, Int8, Int16, Int32, Int64, Nat8, Nat16, Nat32, Nat64, Principal3;
var init_idl = __esm({
  "node_modules/@dfinity/candid/lib/esm/idl.js"() {
    init_esm();
    init_buffer();
    init_hash();
    init_leb128();
    init_bigint_math();
    magicNumber = "DIDL";
    toReadableString_max = 400;
    TypeTable = class {
      constructor() {
        this._typs = [];
        this._idx = /* @__PURE__ */ new Map();
      }
      has(obj) {
        return this._idx.has(obj.name);
      }
      add(type, buf) {
        const idx = this._typs.length;
        this._idx.set(type.name, idx);
        this._typs.push(buf);
      }
      merge(obj, knot) {
        const idx = this._idx.get(obj.name);
        const knotIdx = this._idx.get(knot);
        if (idx === void 0) {
          throw new Error("Missing type index for " + obj);
        }
        if (knotIdx === void 0) {
          throw new Error("Missing type index for " + knot);
        }
        this._typs[idx] = this._typs[knotIdx];
        this._typs.splice(knotIdx, 1);
        this._idx.delete(knot);
      }
      encode() {
        const len = lebEncode(this._typs.length);
        const buf = concat(...this._typs);
        return concat(len, buf);
      }
      indexOf(typeName) {
        if (!this._idx.has(typeName)) {
          throw new Error("Missing type index for " + typeName);
        }
        return slebEncode(this._idx.get(typeName) || 0);
      }
    };
    Visitor = class {
      visitType(t, data) {
        throw new Error("Not implemented");
      }
      visitPrimitive(t, data) {
        return this.visitType(t, data);
      }
      visitEmpty(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitBool(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitNull(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitReserved(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitText(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitNumber(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitInt(t, data) {
        return this.visitNumber(t, data);
      }
      visitNat(t, data) {
        return this.visitNumber(t, data);
      }
      visitFloat(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitFixedInt(t, data) {
        return this.visitNumber(t, data);
      }
      visitFixedNat(t, data) {
        return this.visitNumber(t, data);
      }
      visitPrincipal(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitConstruct(t, data) {
        return this.visitType(t, data);
      }
      visitVec(t, ty, data) {
        return this.visitConstruct(t, data);
      }
      visitOpt(t, ty, data) {
        return this.visitConstruct(t, data);
      }
      visitRecord(t, fields, data) {
        return this.visitConstruct(t, data);
      }
      visitTuple(t, components, data) {
        const fields = components.map((ty, i) => [`_${i}_`, ty]);
        return this.visitRecord(t, fields, data);
      }
      visitVariant(t, fields, data) {
        return this.visitConstruct(t, data);
      }
      visitRec(t, ty, data) {
        return this.visitConstruct(ty, data);
      }
      visitFunc(t, data) {
        return this.visitConstruct(t, data);
      }
      visitService(t, data) {
        return this.visitConstruct(t, data);
      }
    };
    Type = class {
      /* Display type name */
      display() {
        return this.name;
      }
      valueToString(x2) {
        return toReadableString(x2);
      }
      /* Implement `T` in the IDL spec, only needed for non-primitive types */
      buildTypeTable(typeTable) {
        if (!typeTable.has(this)) {
          this._buildTypeTableImpl(typeTable);
        }
      }
    };
    PrimitiveType = class extends Type {
      checkType(t) {
        if (this.name !== t.name) {
          throw new Error(`type mismatch: type on the wire ${t.name}, expect type ${this.name}`);
        }
        return t;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _buildTypeTableImpl(typeTable) {
        return;
      }
    };
    ConstructType = class extends Type {
      checkType(t) {
        if (t instanceof RecClass) {
          const ty = t.getType();
          if (typeof ty === "undefined") {
            throw new Error("type mismatch with uninitialized type");
          }
          return ty;
        }
        throw new Error(`type mismatch: type on the wire ${t.name}, expect type ${this.name}`);
      }
      encodeType(typeTable) {
        return typeTable.indexOf(this.name);
      }
    };
    EmptyClass = class extends PrimitiveType {
      accept(v2, d) {
        return v2.visitEmpty(this, d);
      }
      covariant(x2) {
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue() {
        throw new Error("Empty cannot appear as a function argument");
      }
      valueToString() {
        throw new Error("Empty cannot appear as a value");
      }
      encodeType() {
        return slebEncode(
          -17
          /* IDLTypeIds.Empty */
        );
      }
      decodeValue() {
        throw new Error("Empty cannot appear as an output");
      }
      get name() {
        return "empty";
      }
    };
    UnknownClass = class extends Type {
      checkType(t) {
        throw new Error("Method not implemented for unknown.");
      }
      accept(v2, d) {
        throw v2.visitType(this, d);
      }
      covariant(x2) {
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue() {
        throw new Error("Unknown cannot appear as a function argument");
      }
      valueToString() {
        throw new Error("Unknown cannot appear as a value");
      }
      encodeType() {
        throw new Error("Unknown cannot be serialized");
      }
      decodeValue(b2, t) {
        let decodedValue = t.decodeValue(b2, t);
        if (Object(decodedValue) !== decodedValue) {
          decodedValue = Object(decodedValue);
        }
        let typeFunc;
        if (t instanceof RecClass) {
          typeFunc = () => t.getType();
        } else {
          typeFunc = () => t;
        }
        Object.defineProperty(decodedValue, "type", {
          value: typeFunc,
          writable: true,
          enumerable: false,
          configurable: true
        });
        return decodedValue;
      }
      _buildTypeTableImpl() {
        throw new Error("Unknown cannot be serialized");
      }
      get name() {
        return "Unknown";
      }
    };
    BoolClass = class extends PrimitiveType {
      accept(v2, d) {
        return v2.visitBool(this, d);
      }
      covariant(x2) {
        if (typeof x2 === "boolean")
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        return new Uint8Array([x2 ? 1 : 0]);
      }
      encodeType() {
        return slebEncode(
          -2
          /* IDLTypeIds.Bool */
        );
      }
      decodeValue(b2, t) {
        this.checkType(t);
        switch (safeReadUint8(b2)) {
          case 0:
            return false;
          case 1:
            return true;
          default:
            throw new Error("Boolean value out of range");
        }
      }
      get name() {
        return "bool";
      }
    };
    NullClass = class extends PrimitiveType {
      accept(v2, d) {
        return v2.visitNull(this, d);
      }
      covariant(x2) {
        if (x2 === null)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue() {
        return new ArrayBuffer(0);
      }
      encodeType() {
        return slebEncode(
          -1
          /* IDLTypeIds.Null */
        );
      }
      decodeValue(b2, t) {
        this.checkType(t);
        return null;
      }
      get name() {
        return "null";
      }
    };
    ReservedClass = class extends PrimitiveType {
      accept(v2, d) {
        return v2.visitReserved(this, d);
      }
      covariant(x2) {
        return true;
      }
      encodeValue() {
        return new ArrayBuffer(0);
      }
      encodeType() {
        return slebEncode(
          -16
          /* IDLTypeIds.Reserved */
        );
      }
      decodeValue(b2, t) {
        if (t.name !== this.name) {
          t.decodeValue(b2, t);
        }
        return null;
      }
      get name() {
        return "reserved";
      }
    };
    TextClass = class extends PrimitiveType {
      accept(v2, d) {
        return v2.visitText(this, d);
      }
      covariant(x2) {
        if (typeof x2 === "string")
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        const buf = new TextEncoder().encode(x2);
        const len = lebEncode(buf.byteLength);
        return concat(len, buf);
      }
      encodeType() {
        return slebEncode(
          -15
          /* IDLTypeIds.Text */
        );
      }
      decodeValue(b2, t) {
        this.checkType(t);
        const len = lebDecode(b2);
        const buf = safeRead(b2, Number(len));
        const decoder = new TextDecoder("utf8", { fatal: true });
        return decoder.decode(buf);
      }
      get name() {
        return "text";
      }
      valueToString(x2) {
        return '"' + x2 + '"';
      }
    };
    IntClass = class extends PrimitiveType {
      accept(v2, d) {
        return v2.visitInt(this, d);
      }
      covariant(x2) {
        if (typeof x2 === "bigint" || Number.isInteger(x2))
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        return slebEncode(x2);
      }
      encodeType() {
        return slebEncode(
          -4
          /* IDLTypeIds.Int */
        );
      }
      decodeValue(b2, t) {
        this.checkType(t);
        return slebDecode(b2);
      }
      get name() {
        return "int";
      }
      valueToString(x2) {
        return x2.toString();
      }
    };
    NatClass = class extends PrimitiveType {
      accept(v2, d) {
        return v2.visitNat(this, d);
      }
      covariant(x2) {
        if (typeof x2 === "bigint" && x2 >= BigInt(0) || Number.isInteger(x2) && x2 >= 0)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        return lebEncode(x2);
      }
      encodeType() {
        return slebEncode(
          -3
          /* IDLTypeIds.Nat */
        );
      }
      decodeValue(b2, t) {
        this.checkType(t);
        return lebDecode(b2);
      }
      get name() {
        return "nat";
      }
      valueToString(x2) {
        return x2.toString();
      }
    };
    FloatClass = class extends PrimitiveType {
      constructor(_bits) {
        super();
        this._bits = _bits;
        if (_bits !== 32 && _bits !== 64) {
          throw new Error("not a valid float type");
        }
      }
      accept(v2, d) {
        return v2.visitFloat(this, d);
      }
      covariant(x2) {
        if (typeof x2 === "number" || x2 instanceof Number)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        const buf = new ArrayBuffer(this._bits / 8);
        const view = new DataView(buf);
        if (this._bits === 32) {
          view.setFloat32(0, x2, true);
        } else {
          view.setFloat64(0, x2, true);
        }
        return buf;
      }
      encodeType() {
        const opcode = this._bits === 32 ? -13 : -14;
        return slebEncode(opcode);
      }
      decodeValue(b2, t) {
        this.checkType(t);
        const bytes2 = safeRead(b2, this._bits / 8);
        const view = new DataView(bytes2);
        if (this._bits === 32) {
          return view.getFloat32(0, true);
        } else {
          return view.getFloat64(0, true);
        }
      }
      get name() {
        return "float" + this._bits;
      }
      valueToString(x2) {
        return x2.toString();
      }
    };
    FixedIntClass = class extends PrimitiveType {
      constructor(_bits) {
        super();
        this._bits = _bits;
      }
      accept(v2, d) {
        return v2.visitFixedInt(this, d);
      }
      covariant(x2) {
        const min = iexp2(this._bits - 1) * BigInt(-1);
        const max = iexp2(this._bits - 1) - BigInt(1);
        let ok = false;
        if (typeof x2 === "bigint") {
          ok = x2 >= min && x2 <= max;
        } else if (Number.isInteger(x2)) {
          const v2 = BigInt(x2);
          ok = v2 >= min && v2 <= max;
        } else {
          ok = false;
        }
        if (ok)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        return writeIntLE(x2, this._bits / 8);
      }
      encodeType() {
        const offset = Math.log2(this._bits) - 3;
        return slebEncode(-9 - offset);
      }
      decodeValue(b2, t) {
        this.checkType(t);
        const num = readIntLE(b2, this._bits / 8);
        if (this._bits <= 32) {
          return Number(num);
        } else {
          return num;
        }
      }
      get name() {
        return `int${this._bits}`;
      }
      valueToString(x2) {
        return x2.toString();
      }
    };
    FixedNatClass = class extends PrimitiveType {
      constructor(_bits) {
        super();
        this._bits = _bits;
      }
      accept(v2, d) {
        return v2.visitFixedNat(this, d);
      }
      covariant(x2) {
        const max = iexp2(this._bits);
        let ok = false;
        if (typeof x2 === "bigint" && x2 >= BigInt(0)) {
          ok = x2 < max;
        } else if (Number.isInteger(x2) && x2 >= 0) {
          const v2 = BigInt(x2);
          ok = v2 < max;
        } else {
          ok = false;
        }
        if (ok)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        return writeUIntLE(x2, this._bits / 8);
      }
      encodeType() {
        const offset = Math.log2(this._bits) - 3;
        return slebEncode(-5 - offset);
      }
      decodeValue(b2, t) {
        this.checkType(t);
        const num = readUIntLE(b2, this._bits / 8);
        if (this._bits <= 32) {
          return Number(num);
        } else {
          return num;
        }
      }
      get name() {
        return `nat${this._bits}`;
      }
      valueToString(x2) {
        return x2.toString();
      }
    };
    VecClass = class _VecClass extends ConstructType {
      constructor(_type) {
        super();
        this._type = _type;
        this._blobOptimization = false;
        if (_type instanceof FixedNatClass && _type._bits === 8) {
          this._blobOptimization = true;
        }
      }
      accept(v2, d) {
        return v2.visitVec(this, this._type, d);
      }
      covariant(x2) {
        const bits = this._type instanceof FixedNatClass ? this._type._bits : this._type instanceof FixedIntClass ? this._type._bits : 0;
        if (ArrayBuffer.isView(x2) && bits == x2.BYTES_PER_ELEMENT * 8 || Array.isArray(x2) && x2.every((v2, idx) => {
          try {
            return this._type.covariant(v2);
          } catch (e) {
            throw new Error(`Invalid ${this.display()} argument: 

index ${idx} -> ${e.message}`);
          }
        }))
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        const len = lebEncode(x2.length);
        if (this._blobOptimization) {
          return concat(len, new Uint8Array(x2));
        }
        if (ArrayBuffer.isView(x2)) {
          return concat(len, new Uint8Array(x2.buffer));
        }
        const buf = new PipeArrayBuffer(new ArrayBuffer(len.byteLength + x2.length), 0);
        buf.write(len);
        for (const d of x2) {
          const encoded = this._type.encodeValue(d);
          buf.write(new Uint8Array(encoded));
        }
        return buf.buffer;
      }
      _buildTypeTableImpl(typeTable) {
        this._type.buildTypeTable(typeTable);
        const opCode = slebEncode(
          -19
          /* IDLTypeIds.Vector */
        );
        const buffer = this._type.encodeType(typeTable);
        typeTable.add(this, concat(opCode, buffer));
      }
      decodeValue(b2, t) {
        const vec = this.checkType(t);
        if (!(vec instanceof _VecClass)) {
          throw new Error("Not a vector type");
        }
        const len = Number(lebDecode(b2));
        if (this._type instanceof FixedNatClass) {
          if (this._type._bits == 8) {
            return new Uint8Array(b2.read(len));
          }
          if (this._type._bits == 16) {
            return new Uint16Array(b2.read(len * 2));
          }
          if (this._type._bits == 32) {
            return new Uint32Array(b2.read(len * 4));
          }
          if (this._type._bits == 64) {
            return new BigUint64Array(b2.read(len * 8));
          }
        }
        if (this._type instanceof FixedIntClass) {
          if (this._type._bits == 8) {
            return new Int8Array(b2.read(len));
          }
          if (this._type._bits == 16) {
            return new Int16Array(b2.read(len * 2));
          }
          if (this._type._bits == 32) {
            return new Int32Array(b2.read(len * 4));
          }
          if (this._type._bits == 64) {
            return new BigInt64Array(b2.read(len * 8));
          }
        }
        const rets = [];
        for (let i = 0; i < len; i++) {
          rets.push(this._type.decodeValue(b2, vec._type));
        }
        return rets;
      }
      get name() {
        return `vec ${this._type.name}`;
      }
      display() {
        return `vec ${this._type.display()}`;
      }
      valueToString(x2) {
        const elements = x2.map((e) => this._type.valueToString(e));
        return "vec {" + elements.join("; ") + "}";
      }
    };
    OptClass = class _OptClass extends ConstructType {
      constructor(_type) {
        super();
        this._type = _type;
      }
      accept(v2, d) {
        return v2.visitOpt(this, this._type, d);
      }
      covariant(x2) {
        try {
          if (Array.isArray(x2) && (x2.length === 0 || x2.length === 1 && this._type.covariant(x2[0])))
            return true;
        } catch (e) {
          throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)} 

-> ${e.message}`);
        }
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        if (x2.length === 0) {
          return new Uint8Array([0]);
        } else {
          return concat(new Uint8Array([1]), this._type.encodeValue(x2[0]));
        }
      }
      _buildTypeTableImpl(typeTable) {
        this._type.buildTypeTable(typeTable);
        const opCode = slebEncode(
          -18
          /* IDLTypeIds.Opt */
        );
        const buffer = this._type.encodeType(typeTable);
        typeTable.add(this, concat(opCode, buffer));
      }
      decodeValue(b2, t) {
        const opt = this.checkType(t);
        if (!(opt instanceof _OptClass)) {
          throw new Error("Not an option type");
        }
        switch (safeReadUint8(b2)) {
          case 0:
            return [];
          case 1:
            return [this._type.decodeValue(b2, opt._type)];
          default:
            throw new Error("Not an option value");
        }
      }
      get name() {
        return `opt ${this._type.name}`;
      }
      display() {
        return `opt ${this._type.display()}`;
      }
      valueToString(x2) {
        if (x2.length === 0) {
          return "null";
        } else {
          return `opt ${this._type.valueToString(x2[0])}`;
        }
      }
    };
    RecordClass = class _RecordClass extends ConstructType {
      constructor(fields = {}) {
        super();
        this._fields = Object.entries(fields).sort((a, b2) => idlLabelToId(a[0]) - idlLabelToId(b2[0]));
      }
      accept(v2, d) {
        return v2.visitRecord(this, this._fields, d);
      }
      tryAsTuple() {
        const res = [];
        for (let i = 0; i < this._fields.length; i++) {
          const [key, type] = this._fields[i];
          if (key !== `_${i}_`) {
            return null;
          }
          res.push(type);
        }
        return res;
      }
      covariant(x2) {
        if (typeof x2 === "object" && this._fields.every(([k2, t]) => {
          if (!x2.hasOwnProperty(k2)) {
            throw new Error(`Record is missing key "${k2}".`);
          }
          try {
            return t.covariant(x2[k2]);
          } catch (e) {
            throw new Error(`Invalid ${this.display()} argument: 

field ${k2} -> ${e.message}`);
          }
        }))
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        const values = this._fields.map(([key]) => x2[key]);
        const bufs = zipWith(this._fields, values, ([, c], d) => c.encodeValue(d));
        return concat(...bufs);
      }
      _buildTypeTableImpl(T) {
        this._fields.forEach(([_, value4]) => value4.buildTypeTable(T));
        const opCode = slebEncode(
          -20
          /* IDLTypeIds.Record */
        );
        const len = lebEncode(this._fields.length);
        const fields = this._fields.map(([key, value4]) => concat(lebEncode(idlLabelToId(key)), value4.encodeType(T)));
        T.add(this, concat(opCode, len, concat(...fields)));
      }
      decodeValue(b2, t) {
        const record = this.checkType(t);
        if (!(record instanceof _RecordClass)) {
          throw new Error("Not a record type");
        }
        const x2 = {};
        let expectedRecordIdx = 0;
        let actualRecordIdx = 0;
        while (actualRecordIdx < record._fields.length) {
          const [hash2, type] = record._fields[actualRecordIdx];
          if (expectedRecordIdx >= this._fields.length) {
            type.decodeValue(b2, type);
            actualRecordIdx++;
            continue;
          }
          const [expectKey, expectType] = this._fields[expectedRecordIdx];
          const expectedId = idlLabelToId(this._fields[expectedRecordIdx][0]);
          const actualId = idlLabelToId(hash2);
          if (expectedId === actualId) {
            x2[expectKey] = expectType.decodeValue(b2, type);
            expectedRecordIdx++;
            actualRecordIdx++;
          } else if (actualId > expectedId) {
            if (expectType instanceof OptClass || expectType instanceof ReservedClass) {
              x2[expectKey] = [];
              expectedRecordIdx++;
            } else {
              throw new Error("Cannot find required field " + expectKey);
            }
          } else {
            type.decodeValue(b2, type);
            actualRecordIdx++;
          }
        }
        for (const [expectKey, expectType] of this._fields.slice(expectedRecordIdx)) {
          if (expectType instanceof OptClass || expectType instanceof ReservedClass) {
            x2[expectKey] = [];
          } else {
            throw new Error("Cannot find required field " + expectKey);
          }
        }
        return x2;
      }
      get name() {
        const fields = this._fields.map(([key, value4]) => key + ":" + value4.name);
        return `record {${fields.join("; ")}}`;
      }
      display() {
        const fields = this._fields.map(([key, value4]) => key + ":" + value4.display());
        return `record {${fields.join("; ")}}`;
      }
      valueToString(x2) {
        const values = this._fields.map(([key]) => x2[key]);
        const fields = zipWith(this._fields, values, ([k2, c], d) => k2 + "=" + c.valueToString(d));
        return `record {${fields.join("; ")}}`;
      }
    };
    TupleClass = class _TupleClass extends RecordClass {
      constructor(_components) {
        const x2 = {};
        _components.forEach((e, i) => x2["_" + i + "_"] = e);
        super(x2);
        this._components = _components;
      }
      accept(v2, d) {
        return v2.visitTuple(this, this._components, d);
      }
      covariant(x2) {
        if (Array.isArray(x2) && x2.length >= this._fields.length && this._components.every((t, i) => {
          try {
            return t.covariant(x2[i]);
          } catch (e) {
            throw new Error(`Invalid ${this.display()} argument: 

index ${i} -> ${e.message}`);
          }
        }))
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        const bufs = zipWith(this._components, x2, (c, d) => c.encodeValue(d));
        return concat(...bufs);
      }
      decodeValue(b2, t) {
        const tuple = this.checkType(t);
        if (!(tuple instanceof _TupleClass)) {
          throw new Error("not a tuple type");
        }
        if (tuple._components.length < this._components.length) {
          throw new Error("tuple mismatch");
        }
        const res = [];
        for (const [i, wireType] of tuple._components.entries()) {
          if (i >= this._components.length) {
            wireType.decodeValue(b2, wireType);
          } else {
            res.push(this._components[i].decodeValue(b2, wireType));
          }
        }
        return res;
      }
      display() {
        const fields = this._components.map((value4) => value4.display());
        return `record {${fields.join("; ")}}`;
      }
      valueToString(values) {
        const fields = zipWith(this._components, values, (c, d) => c.valueToString(d));
        return `record {${fields.join("; ")}}`;
      }
    };
    VariantClass = class _VariantClass extends ConstructType {
      constructor(fields = {}) {
        super();
        this._fields = Object.entries(fields).sort((a, b2) => idlLabelToId(a[0]) - idlLabelToId(b2[0]));
      }
      accept(v2, d) {
        return v2.visitVariant(this, this._fields, d);
      }
      covariant(x2) {
        if (typeof x2 === "object" && Object.entries(x2).length === 1 && this._fields.every(([k2, v2]) => {
          try {
            return !x2.hasOwnProperty(k2) || v2.covariant(x2[k2]);
          } catch (e) {
            throw new Error(`Invalid ${this.display()} argument: 

variant ${k2} -> ${e.message}`);
          }
        }))
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        for (let i = 0; i < this._fields.length; i++) {
          const [name, type] = this._fields[i];
          if (x2.hasOwnProperty(name)) {
            const idx = lebEncode(i);
            const buf = type.encodeValue(x2[name]);
            return concat(idx, buf);
          }
        }
        throw Error("Variant has no data: " + x2);
      }
      _buildTypeTableImpl(typeTable) {
        this._fields.forEach(([, type]) => {
          type.buildTypeTable(typeTable);
        });
        const opCode = slebEncode(
          -21
          /* IDLTypeIds.Variant */
        );
        const len = lebEncode(this._fields.length);
        const fields = this._fields.map(([key, value4]) => concat(lebEncode(idlLabelToId(key)), value4.encodeType(typeTable)));
        typeTable.add(this, concat(opCode, len, ...fields));
      }
      decodeValue(b2, t) {
        const variant = this.checkType(t);
        if (!(variant instanceof _VariantClass)) {
          throw new Error("Not a variant type");
        }
        const idx = Number(lebDecode(b2));
        if (idx >= variant._fields.length) {
          throw Error("Invalid variant index: " + idx);
        }
        const [wireHash, wireType] = variant._fields[idx];
        for (const [key, expectType] of this._fields) {
          if (idlLabelToId(wireHash) === idlLabelToId(key)) {
            const value4 = expectType.decodeValue(b2, wireType);
            return { [key]: value4 };
          }
        }
        throw new Error("Cannot find field hash " + wireHash);
      }
      get name() {
        const fields = this._fields.map(([key, type]) => key + ":" + type.name);
        return `variant {${fields.join("; ")}}`;
      }
      display() {
        const fields = this._fields.map(([key, type]) => key + (type.name === "null" ? "" : `:${type.display()}`));
        return `variant {${fields.join("; ")}}`;
      }
      valueToString(x2) {
        for (const [name, type] of this._fields) {
          if (x2.hasOwnProperty(name)) {
            const value4 = type.valueToString(x2[name]);
            if (value4 === "null") {
              return `variant {${name}}`;
            } else {
              return `variant {${name}=${value4}}`;
            }
          }
        }
        throw new Error("Variant has no data: " + x2);
      }
    };
    RecClass = class _RecClass extends ConstructType {
      constructor() {
        super(...arguments);
        this._id = _RecClass._counter++;
        this._type = void 0;
      }
      accept(v2, d) {
        if (!this._type) {
          throw Error("Recursive type uninitialized.");
        }
        return v2.visitRec(this, this._type, d);
      }
      fill(t) {
        this._type = t;
      }
      getType() {
        return this._type;
      }
      covariant(x2) {
        if (this._type ? this._type.covariant(x2) : false)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        if (!this._type) {
          throw Error("Recursive type uninitialized.");
        }
        return this._type.encodeValue(x2);
      }
      _buildTypeTableImpl(typeTable) {
        if (!this._type) {
          throw Error("Recursive type uninitialized.");
        }
        typeTable.add(this, new Uint8Array([]));
        this._type.buildTypeTable(typeTable);
        typeTable.merge(this, this._type.name);
      }
      decodeValue(b2, t) {
        if (!this._type) {
          throw Error("Recursive type uninitialized.");
        }
        return this._type.decodeValue(b2, t);
      }
      get name() {
        return `rec_${this._id}`;
      }
      display() {
        if (!this._type) {
          throw Error("Recursive type uninitialized.");
        }
        return `\u03BC${this.name}.${this._type.name}`;
      }
      valueToString(x2) {
        if (!this._type) {
          throw Error("Recursive type uninitialized.");
        }
        return this._type.valueToString(x2);
      }
    };
    RecClass._counter = 0;
    PrincipalClass = class extends PrimitiveType {
      accept(v2, d) {
        return v2.visitPrincipal(this, d);
      }
      covariant(x2) {
        if (x2 && x2._isPrincipal)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        const buf = x2.toUint8Array();
        const len = lebEncode(buf.byteLength);
        return concat(new Uint8Array([1]), len, buf);
      }
      encodeType() {
        return slebEncode(
          -24
          /* IDLTypeIds.Principal */
        );
      }
      decodeValue(b2, t) {
        this.checkType(t);
        return decodePrincipalId(b2);
      }
      get name() {
        return "principal";
      }
      valueToString(x2) {
        return `${this.name} "${x2.toText()}"`;
      }
    };
    FuncClass = class extends ConstructType {
      constructor(argTypes, retTypes, annotations = []) {
        super();
        this.argTypes = argTypes;
        this.retTypes = retTypes;
        this.annotations = annotations;
      }
      static argsToString(types, v2) {
        if (types.length !== v2.length) {
          throw new Error("arity mismatch");
        }
        return "(" + types.map((t, i) => t.valueToString(v2[i])).join(", ") + ")";
      }
      accept(v2, d) {
        return v2.visitFunc(this, d);
      }
      covariant(x2) {
        if (Array.isArray(x2) && x2.length === 2 && x2[0] && x2[0]._isPrincipal && typeof x2[1] === "string")
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue([principal, methodName]) {
        const buf = principal.toUint8Array();
        const len = lebEncode(buf.byteLength);
        const canister = concat(new Uint8Array([1]), len, buf);
        const method2 = new TextEncoder().encode(methodName);
        const methodLen = lebEncode(method2.byteLength);
        return concat(new Uint8Array([1]), canister, methodLen, method2);
      }
      _buildTypeTableImpl(T) {
        this.argTypes.forEach((arg) => arg.buildTypeTable(T));
        this.retTypes.forEach((arg) => arg.buildTypeTable(T));
        const opCode = slebEncode(
          -22
          /* IDLTypeIds.Func */
        );
        const argLen = lebEncode(this.argTypes.length);
        const args = concat(...this.argTypes.map((arg) => arg.encodeType(T)));
        const retLen = lebEncode(this.retTypes.length);
        const rets = concat(...this.retTypes.map((arg) => arg.encodeType(T)));
        const annLen = lebEncode(this.annotations.length);
        const anns = concat(...this.annotations.map((a) => this.encodeAnnotation(a)));
        T.add(this, concat(opCode, argLen, args, retLen, rets, annLen, anns));
      }
      decodeValue(b2) {
        const x2 = safeReadUint8(b2);
        if (x2 !== 1) {
          throw new Error("Cannot decode function reference");
        }
        const canister = decodePrincipalId(b2);
        const mLen = Number(lebDecode(b2));
        const buf = safeRead(b2, mLen);
        const decoder = new TextDecoder("utf8", { fatal: true });
        const method2 = decoder.decode(buf);
        return [canister, method2];
      }
      get name() {
        const args = this.argTypes.map((arg) => arg.name).join(", ");
        const rets = this.retTypes.map((arg) => arg.name).join(", ");
        const annon = " " + this.annotations.join(" ");
        return `(${args}) -> (${rets})${annon}`;
      }
      valueToString([principal, str]) {
        return `func "${principal.toText()}".${str}`;
      }
      display() {
        const args = this.argTypes.map((arg) => arg.display()).join(", ");
        const rets = this.retTypes.map((arg) => arg.display()).join(", ");
        const annon = " " + this.annotations.join(" ");
        return `(${args}) \u2192 (${rets})${annon}`;
      }
      encodeAnnotation(ann) {
        if (ann === "query") {
          return new Uint8Array([1]);
        } else if (ann === "oneway") {
          return new Uint8Array([2]);
        } else if (ann === "composite_query") {
          return new Uint8Array([3]);
        } else {
          throw new Error("Illegal function annotation");
        }
      }
    };
    ServiceClass = class extends ConstructType {
      constructor(fields) {
        super();
        this._fields = Object.entries(fields).sort((a, b2) => {
          if (a[0] < b2[0]) {
            return -1;
          }
          if (a[0] > b2[0]) {
            return 1;
          }
          return 0;
        });
      }
      accept(v2, d) {
        return v2.visitService(this, d);
      }
      covariant(x2) {
        if (x2 && x2._isPrincipal)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
      }
      encodeValue(x2) {
        const buf = x2.toUint8Array();
        const len = lebEncode(buf.length);
        return concat(new Uint8Array([1]), len, buf);
      }
      _buildTypeTableImpl(T) {
        this._fields.forEach(([_, func]) => func.buildTypeTable(T));
        const opCode = slebEncode(
          -23
          /* IDLTypeIds.Service */
        );
        const len = lebEncode(this._fields.length);
        const meths = this._fields.map(([label, func]) => {
          const labelBuf = new TextEncoder().encode(label);
          const labelLen = lebEncode(labelBuf.length);
          return concat(labelLen, labelBuf, func.encodeType(T));
        });
        T.add(this, concat(opCode, len, ...meths));
      }
      decodeValue(b2) {
        return decodePrincipalId(b2);
      }
      get name() {
        const fields = this._fields.map(([key, value4]) => key + ":" + value4.name);
        return `service {${fields.join("; ")}}`;
      }
      valueToString(x2) {
        return `service "${x2.toText()}"`;
      }
    };
    Empty = new EmptyClass();
    Reserved = new ReservedClass();
    Unknown = new UnknownClass();
    Bool = new BoolClass();
    Null = new NullClass();
    Text = new TextClass();
    Int = new IntClass();
    Nat = new NatClass();
    Float32 = new FloatClass(32);
    Float64 = new FloatClass(64);
    Int8 = new FixedIntClass(8);
    Int16 = new FixedIntClass(16);
    Int32 = new FixedIntClass(32);
    Int64 = new FixedIntClass(64);
    Nat8 = new FixedNatClass(8);
    Nat16 = new FixedNatClass(16);
    Nat32 = new FixedNatClass(32);
    Nat64 = new FixedNatClass(64);
    Principal3 = new PrincipalClass();
  }
});

// node_modules/@dfinity/candid/lib/esm/candid-core.js
var init_candid_core = __esm({
  "node_modules/@dfinity/candid/lib/esm/candid-core.js"() {
  }
});

// node_modules/@dfinity/candid/lib/esm/candid-ui.js
var init_candid_ui = __esm({
  "node_modules/@dfinity/candid/lib/esm/candid-ui.js"() {
    init_idl();
    init_esm();
    init_candid_core();
  }
});

// node_modules/@dfinity/candid/lib/esm/types.js
var init_types = __esm({
  "node_modules/@dfinity/candid/lib/esm/types.js"() {
  }
});

// node_modules/@dfinity/candid/lib/esm/index.js
var init_esm2 = __esm({
  "node_modules/@dfinity/candid/lib/esm/index.js"() {
    init_candid_ui();
    init_candid_core();
    init_idl();
    init_hash();
    init_leb128();
    init_buffer();
    init_types();
  }
});

// node_modules/borc/node_modules/buffer/index.js
var require_buffer2 = __commonJS({
  "node_modules/borc/node_modules/buffer/index.js"(exports2) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports2.Buffer = Buffer3;
    exports2.SlowBuffer = SlowBuffer;
    exports2.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports2.kMaxLength = K_MAX_LENGTH;
    Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        var arr = new Uint8Array(1);
        var proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer3.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer3.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      var buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function Buffer3(arg, encodingOrOffset, length) {
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
    Buffer3.poolSize = 8192;
    function from(value4, encodingOrOffset, length) {
      if (typeof value4 === "string") {
        return fromString(value4, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value4)) {
        return fromArrayView(value4);
      }
      if (value4 == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value4
        );
      }
      if (isInstance(value4, ArrayBuffer) || value4 && isInstance(value4.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value4, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value4, SharedArrayBuffer) || value4 && isInstance(value4.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value4, encodingOrOffset, length);
      }
      if (typeof value4 === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      var valueOf = value4.valueOf && value4.valueOf();
      if (valueOf != null && valueOf !== value4) {
        return Buffer3.from(valueOf, encodingOrOffset, length);
      }
      var b2 = fromObject(value4);
      if (b2)
        return b2;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value4[Symbol.toPrimitive] === "function") {
        return Buffer3.from(
          value4[Symbol.toPrimitive]("string"),
          encodingOrOffset,
          length
        );
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value4
      );
    }
    Buffer3.from = function(value4, encodingOrOffset, length) {
      return from(value4, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer3, Uint8Array);
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
    Buffer3.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      var length = byteLength(string, encoding) | 0;
      var buf = createBuffer(length);
      var actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      var buf = createBuffer(length);
      for (var i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        var copy = new Uint8Array(arrayView);
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
      var buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer3.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        var buf = createBuffer(len);
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
      return Buffer3.alloc(+length);
    }
    Buffer3.isBuffer = function isBuffer(b2) {
      return b2 != null && b2._isBuffer === true && b2 !== Buffer3.prototype;
    };
    Buffer3.compare = function compare2(a, b2) {
      if (isInstance(a, Uint8Array))
        a = Buffer3.from(a, a.offset, a.byteLength);
      if (isInstance(b2, Uint8Array))
        b2 = Buffer3.from(b2, b2.offset, b2.byteLength);
      if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b2)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b2)
        return 0;
      var x2 = a.length;
      var y = b2.length;
      for (var i = 0, len = Math.min(x2, y); i < len; ++i) {
        if (a[i] !== b2[i]) {
          x2 = a[i];
          y = b2[i];
          break;
        }
      }
      if (x2 < y)
        return -1;
      if (y < x2)
        return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding(encoding) {
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
    Buffer3.concat = function concat3(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      var i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      var buffer = Buffer3.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            Buffer3.from(buf).copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer3.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer3.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      var len = string.length;
      var mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      var loweredCase = false;
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
    Buffer3.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      var loweredCase = false;
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
      if (!encoding)
        encoding = "utf8";
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
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.prototype._isBuffer = true;
    function swap(b2, n, m2) {
      var i = b2[n];
      b2[n] = b2[m2];
      b2[m2] = i;
    }
    Buffer3.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer3.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer3.prototype.toString = function toString() {
      var length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
    Buffer3.prototype.equals = function equals(b2) {
      if (!Buffer3.isBuffer(b2))
        throw new TypeError("Argument must be a Buffer");
      if (this === b2)
        return true;
      return Buffer3.compare(this, b2) === 0;
    };
    Buffer3.prototype.inspect = function inspect() {
      var str = "";
      var max = exports2.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
    }
    Buffer3.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer3.from(target, target.offset, target.byteLength);
      }
      if (!Buffer3.isBuffer(target)) {
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
      if (this === target)
        return 0;
      var x2 = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x2, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x2 = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x2 < y)
        return -1;
      if (y < x2)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
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
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer3.from(val, encoding);
      }
      if (Buffer3.isBuffer(val)) {
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
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;
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
      var i;
      if (dir) {
        var foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          var found = true;
          for (var j2 = 0; j2 < valLength; j2++) {
            if (read(arr, i + j2) !== read(val, j2)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      var strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
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
    Buffer3.prototype.write = function write(string, offset, length, encoding) {
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
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      var loweredCase = false;
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
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
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
      var res = [];
      var i = start;
      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;
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
      var len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      var res = "";
      var i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      var out = "";
      for (var i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      var bytes2 = buf.slice(start, end);
      var res = "";
      for (var i = 0; i < bytes2.length - 1; i += 2) {
        res += String.fromCharCode(bytes2[i] + bytes2[i + 1] * 256);
      }
      return res;
    }
    Buffer3.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      var newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer3.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE2(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer3.prototype.readIntLE = function readIntLE2(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var i = byteLength2;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value4, offset, ext, max, min) {
      if (!Buffer3.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value4 > max || value4 < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE2(value4, offset, byteLength2, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value4, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i = 0;
      this[offset] = value4 & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value4 / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value4, offset, byteLength2, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value4, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      this[offset + i] = value4 & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value4 / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 1, 255, 0);
      this[offset] = value4 & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 2, 65535, 0);
      this[offset] = value4 & 255;
      this[offset + 1] = value4 >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 2, 65535, 0);
      this[offset] = value4 >>> 8;
      this[offset + 1] = value4 & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 4, 4294967295, 0);
      this[offset + 3] = value4 >>> 24;
      this[offset + 2] = value4 >>> 16;
      this[offset + 1] = value4 >>> 8;
      this[offset] = value4 & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 4, 4294967295, 0);
      this[offset] = value4 >>> 24;
      this[offset + 1] = value4 >>> 16;
      this[offset + 2] = value4 >>> 8;
      this[offset + 3] = value4 & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeIntLE = function writeIntLE2(value4, offset, byteLength2, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value4, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value4 & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value4 < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value4 / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE(value4, offset, byteLength2, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value4, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value4 & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value4 < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value4 / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeInt8 = function writeInt8(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 1, 127, -128);
      if (value4 < 0)
        value4 = 255 + value4 + 1;
      this[offset] = value4 & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 2, 32767, -32768);
      this[offset] = value4 & 255;
      this[offset + 1] = value4 >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 2, 32767, -32768);
      this[offset] = value4 >>> 8;
      this[offset + 1] = value4 & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 4, 2147483647, -2147483648);
      this[offset] = value4 & 255;
      this[offset + 1] = value4 >>> 8;
      this[offset + 2] = value4 >>> 16;
      this[offset + 3] = value4 >>> 24;
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE(value4, offset, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value4, offset, 4, 2147483647, -2147483648);
      if (value4 < 0)
        value4 = 4294967295 + value4 + 1;
      this[offset] = value4 >>> 24;
      this[offset + 1] = value4 >>> 16;
      this[offset + 2] = value4 >>> 8;
      this[offset + 3] = value4 & 255;
      return offset + 4;
    };
    function checkIEEE754(buf, value4, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value4, offset, littleEndian, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value4, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value4, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer3.prototype.writeFloatLE = function writeFloatLE(value4, offset, noAssert) {
      return writeFloat(this, value4, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE(value4, offset, noAssert) {
      return writeFloat(this, value4, offset, false, noAssert);
    };
    function writeDouble(buf, value4, offset, littleEndian, noAssert) {
      value4 = +value4;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value4, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value4, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value4, offset, noAssert) {
      return writeDouble(this, value4, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value4, offset, noAssert) {
      return writeDouble(this, value4, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer3.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
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
    Buffer3.prototype.fill = function fill(val, start, end, encoding) {
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
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
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
      if (!val)
        val = 0;
      var i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes2 = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
        var len = bytes2.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes2[i % len];
        }
      }
      return this;
    };
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes2(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes2 = [];
      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes2.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes2.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes2.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes2.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes2.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes2.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes2.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes2.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes2;
    }
    function asciiToBytes(str) {
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      var c, hi, lo;
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
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
      for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      var alphabet2 = "0123456789abcdef";
      var table = new Array(256);
      for (var i = 0; i < 16; ++i) {
        var i16 = i * 16;
        for (var j2 = 0; j2 < 16; ++j2) {
          table[i16 + j2] = alphabet2[i] + alphabet2[j2];
        }
      }
      return table;
    }();
  }
});

// node_modules/bignumber.js/bignumber.js
var require_bignumber = __commonJS({
  "node_modules/bignumber.js/bignumber.js"(exports2, module2) {
    (function(globalObject) {
      "use strict";
      var BigNumber, isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
      function clone(configObject) {
        var div, convertBase, parseNumeric, P = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: "\xA0",
          // non-breaking space
          suffix: ""
        }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
        function BigNumber2(v2, b2) {
          var alphabet2, c, caseChanged, e, i, isNum, len, str, x2 = this;
          if (!(x2 instanceof BigNumber2))
            return new BigNumber2(v2, b2);
          if (b2 == null) {
            if (v2 && v2._isBigNumber === true) {
              x2.s = v2.s;
              if (!v2.c || v2.e > MAX_EXP) {
                x2.c = x2.e = null;
              } else if (v2.e < MIN_EXP) {
                x2.c = [x2.e = 0];
              } else {
                x2.e = v2.e;
                x2.c = v2.c.slice();
              }
              return;
            }
            if ((isNum = typeof v2 == "number") && v2 * 0 == 0) {
              x2.s = 1 / v2 < 0 ? (v2 = -v2, -1) : 1;
              if (v2 === ~~v2) {
                for (e = 0, i = v2; i >= 10; i /= 10, e++)
                  ;
                if (e > MAX_EXP) {
                  x2.c = x2.e = null;
                } else {
                  x2.e = e;
                  x2.c = [v2];
                }
                return;
              }
              str = String(v2);
            } else {
              if (!isNumeric.test(str = String(v2)))
                return parseNumeric(x2, str, isNum);
              x2.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
            }
            if ((e = str.indexOf(".")) > -1)
              str = str.replace(".", "");
            if ((i = str.search(/e/i)) > 0) {
              if (e < 0)
                e = i;
              e += +str.slice(i + 1);
              str = str.substring(0, i);
            } else if (e < 0) {
              e = str.length;
            }
          } else {
            intCheck(b2, 2, ALPHABET.length, "Base");
            if (b2 == 10 && alphabetHasNormalDecimalDigits) {
              x2 = new BigNumber2(v2);
              return round(x2, DECIMAL_PLACES + x2.e + 1, ROUNDING_MODE);
            }
            str = String(v2);
            if (isNum = typeof v2 == "number") {
              if (v2 * 0 != 0)
                return parseNumeric(x2, str, isNum, b2);
              x2.s = 1 / v2 < 0 ? (str = str.slice(1), -1) : 1;
              if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
                throw Error(tooManyDigits + v2);
              }
            } else {
              x2.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
            }
            alphabet2 = ALPHABET.slice(0, b2);
            e = i = 0;
            for (len = str.length; i < len; i++) {
              if (alphabet2.indexOf(c = str.charAt(i)) < 0) {
                if (c == ".") {
                  if (i > e) {
                    e = len;
                    continue;
                  }
                } else if (!caseChanged) {
                  if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                    caseChanged = true;
                    i = -1;
                    e = 0;
                    continue;
                  }
                }
                return parseNumeric(x2, String(v2), isNum, b2);
              }
            }
            isNum = false;
            str = convertBase(str, b2, 10, x2.s);
            if ((e = str.indexOf(".")) > -1)
              str = str.replace(".", "");
            else
              e = str.length;
          }
          for (i = 0; str.charCodeAt(i) === 48; i++)
            ;
          for (len = str.length; str.charCodeAt(--len) === 48; )
            ;
          if (str = str.slice(i, ++len)) {
            len -= i;
            if (isNum && BigNumber2.DEBUG && len > 15 && (v2 > MAX_SAFE_INTEGER || v2 !== mathfloor(v2))) {
              throw Error(tooManyDigits + x2.s * v2);
            }
            if ((e = e - i - 1) > MAX_EXP) {
              x2.c = x2.e = null;
            } else if (e < MIN_EXP) {
              x2.c = [x2.e = 0];
            } else {
              x2.e = e;
              x2.c = [];
              i = (e + 1) % LOG_BASE;
              if (e < 0)
                i += LOG_BASE;
              if (i < len) {
                if (i)
                  x2.c.push(+str.slice(0, i));
                for (len -= LOG_BASE; i < len; ) {
                  x2.c.push(+str.slice(i, i += LOG_BASE));
                }
                i = LOG_BASE - (str = str.slice(i)).length;
              } else {
                i -= len;
              }
              for (; i--; str += "0")
                ;
              x2.c.push(+str);
            }
          } else {
            x2.c = [x2.e = 0];
          }
        }
        BigNumber2.clone = clone;
        BigNumber2.ROUND_UP = 0;
        BigNumber2.ROUND_DOWN = 1;
        BigNumber2.ROUND_CEIL = 2;
        BigNumber2.ROUND_FLOOR = 3;
        BigNumber2.ROUND_HALF_UP = 4;
        BigNumber2.ROUND_HALF_DOWN = 5;
        BigNumber2.ROUND_HALF_EVEN = 6;
        BigNumber2.ROUND_HALF_CEIL = 7;
        BigNumber2.ROUND_HALF_FLOOR = 8;
        BigNumber2.EUCLID = 9;
        BigNumber2.config = BigNumber2.set = function(obj) {
          var p, v2;
          if (obj != null) {
            if (typeof obj == "object") {
              if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
                v2 = obj[p];
                intCheck(v2, 0, MAX, p);
                DECIMAL_PLACES = v2;
              }
              if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
                v2 = obj[p];
                intCheck(v2, 0, 8, p);
                ROUNDING_MODE = v2;
              }
              if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
                v2 = obj[p];
                if (v2 && v2.pop) {
                  intCheck(v2[0], -MAX, 0, p);
                  intCheck(v2[1], 0, MAX, p);
                  TO_EXP_NEG = v2[0];
                  TO_EXP_POS = v2[1];
                } else {
                  intCheck(v2, -MAX, MAX, p);
                  TO_EXP_NEG = -(TO_EXP_POS = v2 < 0 ? -v2 : v2);
                }
              }
              if (obj.hasOwnProperty(p = "RANGE")) {
                v2 = obj[p];
                if (v2 && v2.pop) {
                  intCheck(v2[0], -MAX, -1, p);
                  intCheck(v2[1], 1, MAX, p);
                  MIN_EXP = v2[0];
                  MAX_EXP = v2[1];
                } else {
                  intCheck(v2, -MAX, MAX, p);
                  if (v2) {
                    MIN_EXP = -(MAX_EXP = v2 < 0 ? -v2 : v2);
                  } else {
                    throw Error(bignumberError + p + " cannot be zero: " + v2);
                  }
                }
              }
              if (obj.hasOwnProperty(p = "CRYPTO")) {
                v2 = obj[p];
                if (v2 === !!v2) {
                  if (v2) {
                    if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                      CRYPTO = v2;
                    } else {
                      CRYPTO = !v2;
                      throw Error(bignumberError + "crypto unavailable");
                    }
                  } else {
                    CRYPTO = v2;
                  }
                } else {
                  throw Error(bignumberError + p + " not true or false: " + v2);
                }
              }
              if (obj.hasOwnProperty(p = "MODULO_MODE")) {
                v2 = obj[p];
                intCheck(v2, 0, 9, p);
                MODULO_MODE = v2;
              }
              if (obj.hasOwnProperty(p = "POW_PRECISION")) {
                v2 = obj[p];
                intCheck(v2, 0, MAX, p);
                POW_PRECISION = v2;
              }
              if (obj.hasOwnProperty(p = "FORMAT")) {
                v2 = obj[p];
                if (typeof v2 == "object")
                  FORMAT = v2;
                else
                  throw Error(bignumberError + p + " not an object: " + v2);
              }
              if (obj.hasOwnProperty(p = "ALPHABET")) {
                v2 = obj[p];
                if (typeof v2 == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v2)) {
                  alphabetHasNormalDecimalDigits = v2.slice(0, 10) == "0123456789";
                  ALPHABET = v2;
                } else {
                  throw Error(bignumberError + p + " invalid: " + v2);
                }
              }
            } else {
              throw Error(bignumberError + "Object expected: " + obj);
            }
          }
          return {
            DECIMAL_PLACES,
            ROUNDING_MODE,
            EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
            RANGE: [MIN_EXP, MAX_EXP],
            CRYPTO,
            MODULO_MODE,
            POW_PRECISION,
            FORMAT,
            ALPHABET
          };
        };
        BigNumber2.isBigNumber = function(v2) {
          if (!v2 || v2._isBigNumber !== true)
            return false;
          if (!BigNumber2.DEBUG)
            return true;
          var i, n, c = v2.c, e = v2.e, s = v2.s;
          out:
            if ({}.toString.call(c) == "[object Array]") {
              if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
                if (c[0] === 0) {
                  if (e === 0 && c.length === 1)
                    return true;
                  break out;
                }
                i = (e + 1) % LOG_BASE;
                if (i < 1)
                  i += LOG_BASE;
                if (String(c[0]).length == i) {
                  for (i = 0; i < c.length; i++) {
                    n = c[i];
                    if (n < 0 || n >= BASE || n !== mathfloor(n))
                      break out;
                  }
                  if (n !== 0)
                    return true;
                }
              }
            } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
              return true;
            }
          throw Error(bignumberError + "Invalid BigNumber: " + v2);
        };
        BigNumber2.maximum = BigNumber2.max = function() {
          return maxOrMin(arguments, -1);
        };
        BigNumber2.minimum = BigNumber2.min = function() {
          return maxOrMin(arguments, 1);
        };
        BigNumber2.random = function() {
          var pow2_53 = 9007199254740992;
          var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
            return mathfloor(Math.random() * pow2_53);
          } : function() {
            return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
          };
          return function(dp) {
            var a, b2, e, k2, v2, i = 0, c = [], rand = new BigNumber2(ONE);
            if (dp == null)
              dp = DECIMAL_PLACES;
            else
              intCheck(dp, 0, MAX);
            k2 = mathceil(dp / LOG_BASE);
            if (CRYPTO) {
              if (crypto.getRandomValues) {
                a = crypto.getRandomValues(new Uint32Array(k2 *= 2));
                for (; i < k2; ) {
                  v2 = a[i] * 131072 + (a[i + 1] >>> 11);
                  if (v2 >= 9e15) {
                    b2 = crypto.getRandomValues(new Uint32Array(2));
                    a[i] = b2[0];
                    a[i + 1] = b2[1];
                  } else {
                    c.push(v2 % 1e14);
                    i += 2;
                  }
                }
                i = k2 / 2;
              } else if (crypto.randomBytes) {
                a = crypto.randomBytes(k2 *= 7);
                for (; i < k2; ) {
                  v2 = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
                  if (v2 >= 9e15) {
                    crypto.randomBytes(7).copy(a, i);
                  } else {
                    c.push(v2 % 1e14);
                    i += 7;
                  }
                }
                i = k2 / 7;
              } else {
                CRYPTO = false;
                throw Error(bignumberError + "crypto unavailable");
              }
            }
            if (!CRYPTO) {
              for (; i < k2; ) {
                v2 = random53bitInt();
                if (v2 < 9e15)
                  c[i++] = v2 % 1e14;
              }
            }
            k2 = c[--i];
            dp %= LOG_BASE;
            if (k2 && dp) {
              v2 = POWS_TEN[LOG_BASE - dp];
              c[i] = mathfloor(k2 / v2) * v2;
            }
            for (; c[i] === 0; c.pop(), i--)
              ;
            if (i < 0) {
              c = [e = 0];
            } else {
              for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE)
                ;
              for (i = 1, v2 = c[0]; v2 >= 10; v2 /= 10, i++)
                ;
              if (i < LOG_BASE)
                e -= LOG_BASE - i;
            }
            rand.e = e;
            rand.c = c;
            return rand;
          };
        }();
        BigNumber2.sum = function() {
          var i = 1, args = arguments, sum = new BigNumber2(args[0]);
          for (; i < args.length; )
            sum = sum.plus(args[i++]);
          return sum;
        };
        convertBase = /* @__PURE__ */ function() {
          var decimal = "0123456789";
          function toBaseOut(str, baseIn, baseOut, alphabet2) {
            var j2, arr = [0], arrL, i = 0, len = str.length;
            for (; i < len; ) {
              for (arrL = arr.length; arrL--; arr[arrL] *= baseIn)
                ;
              arr[0] += alphabet2.indexOf(str.charAt(i++));
              for (j2 = 0; j2 < arr.length; j2++) {
                if (arr[j2] > baseOut - 1) {
                  if (arr[j2 + 1] == null)
                    arr[j2 + 1] = 0;
                  arr[j2 + 1] += arr[j2] / baseOut | 0;
                  arr[j2] %= baseOut;
                }
              }
            }
            return arr.reverse();
          }
          return function(str, baseIn, baseOut, sign, callerIsToString) {
            var alphabet2, d, e, k2, r, x2, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
            if (i >= 0) {
              k2 = POW_PRECISION;
              POW_PRECISION = 0;
              str = str.replace(".", "");
              y = new BigNumber2(baseIn);
              x2 = y.pow(str.length - i);
              POW_PRECISION = k2;
              y.c = toBaseOut(
                toFixedPoint(coeffToString(x2.c), x2.e, "0"),
                10,
                baseOut,
                decimal
              );
              y.e = y.c.length;
            }
            xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet2 = ALPHABET, decimal) : (alphabet2 = decimal, ALPHABET));
            e = k2 = xc.length;
            for (; xc[--k2] == 0; xc.pop())
              ;
            if (!xc[0])
              return alphabet2.charAt(0);
            if (i < 0) {
              --e;
            } else {
              x2.c = xc;
              x2.e = e;
              x2.s = sign;
              x2 = div(x2, y, dp, rm, baseOut);
              xc = x2.c;
              r = x2.r;
              e = x2.e;
            }
            d = e + dp + 1;
            i = xc[d];
            k2 = baseOut / 2;
            r = r || d < 0 || xc[d + 1] != null;
            r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x2.s < 0 ? 3 : 2)) : i > k2 || i == k2 && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x2.s < 0 ? 8 : 7));
            if (d < 1 || !xc[0]) {
              str = r ? toFixedPoint(alphabet2.charAt(1), -dp, alphabet2.charAt(0)) : alphabet2.charAt(0);
            } else {
              xc.length = d;
              if (r) {
                for (--baseOut; ++xc[--d] > baseOut; ) {
                  xc[d] = 0;
                  if (!d) {
                    ++e;
                    xc = [1].concat(xc);
                  }
                }
              }
              for (k2 = xc.length; !xc[--k2]; )
                ;
              for (i = 0, str = ""; i <= k2; str += alphabet2.charAt(xc[i++]))
                ;
              str = toFixedPoint(str, e, alphabet2.charAt(0));
            }
            return str;
          };
        }();
        div = /* @__PURE__ */ function() {
          function multiply(x2, k2, base) {
            var m2, temp, xlo, xhi, carry = 0, i = x2.length, klo = k2 % SQRT_BASE, khi = k2 / SQRT_BASE | 0;
            for (x2 = x2.slice(); i--; ) {
              xlo = x2[i] % SQRT_BASE;
              xhi = x2[i] / SQRT_BASE | 0;
              m2 = khi * xlo + xhi * klo;
              temp = klo * xlo + m2 % SQRT_BASE * SQRT_BASE + carry;
              carry = (temp / base | 0) + (m2 / SQRT_BASE | 0) + khi * xhi;
              x2[i] = temp % base;
            }
            if (carry)
              x2 = [carry].concat(x2);
            return x2;
          }
          function compare3(a, b2, aL, bL) {
            var i, cmp;
            if (aL != bL) {
              cmp = aL > bL ? 1 : -1;
            } else {
              for (i = cmp = 0; i < aL; i++) {
                if (a[i] != b2[i]) {
                  cmp = a[i] > b2[i] ? 1 : -1;
                  break;
                }
              }
            }
            return cmp;
          }
          function subtract(a, b2, aL, base) {
            var i = 0;
            for (; aL--; ) {
              a[aL] -= i;
              i = a[aL] < b2[aL] ? 1 : 0;
              a[aL] = i * base + a[aL] - b2[aL];
            }
            for (; !a[0] && a.length > 1; a.splice(0, 1))
              ;
          }
          return function(x2, y, dp, rm, base) {
            var cmp, e, i, more, n, prod, prodL, q2, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x2.s == y.s ? 1 : -1, xc = x2.c, yc = y.c;
            if (!xc || !xc[0] || !yc || !yc[0]) {
              return new BigNumber2(
                // Return NaN if either NaN, or both Infinity or 0.
                !x2.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
                  // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                  xc && xc[0] == 0 || !yc ? s * 0 : s / 0
                )
              );
            }
            q2 = new BigNumber2(s);
            qc = q2.c = [];
            e = x2.e - y.e;
            s = dp + e + 1;
            if (!base) {
              base = BASE;
              e = bitFloor(x2.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
              s = s / LOG_BASE | 0;
            }
            for (i = 0; yc[i] == (xc[i] || 0); i++)
              ;
            if (yc[i] > (xc[i] || 0))
              e--;
            if (s < 0) {
              qc.push(1);
              more = true;
            } else {
              xL = xc.length;
              yL = yc.length;
              i = 0;
              s += 2;
              n = mathfloor(base / (yc[0] + 1));
              if (n > 1) {
                yc = multiply(yc, n, base);
                xc = multiply(xc, n, base);
                yL = yc.length;
                xL = xc.length;
              }
              xi = yL;
              rem = xc.slice(0, yL);
              remL = rem.length;
              for (; remL < yL; rem[remL++] = 0)
                ;
              yz = yc.slice();
              yz = [0].concat(yz);
              yc0 = yc[0];
              if (yc[1] >= base / 2)
                yc0++;
              do {
                n = 0;
                cmp = compare3(yc, rem, yL, remL);
                if (cmp < 0) {
                  rem0 = rem[0];
                  if (yL != remL)
                    rem0 = rem0 * base + (rem[1] || 0);
                  n = mathfloor(rem0 / yc0);
                  if (n > 1) {
                    if (n >= base)
                      n = base - 1;
                    prod = multiply(yc, n, base);
                    prodL = prod.length;
                    remL = rem.length;
                    while (compare3(prod, rem, prodL, remL) == 1) {
                      n--;
                      subtract(prod, yL < prodL ? yz : yc, prodL, base);
                      prodL = prod.length;
                      cmp = 1;
                    }
                  } else {
                    if (n == 0) {
                      cmp = n = 1;
                    }
                    prod = yc.slice();
                    prodL = prod.length;
                  }
                  if (prodL < remL)
                    prod = [0].concat(prod);
                  subtract(rem, prod, remL, base);
                  remL = rem.length;
                  if (cmp == -1) {
                    while (compare3(yc, rem, yL, remL) < 1) {
                      n++;
                      subtract(rem, yL < remL ? yz : yc, remL, base);
                      remL = rem.length;
                    }
                  }
                } else if (cmp === 0) {
                  n++;
                  rem = [0];
                }
                qc[i++] = n;
                if (rem[0]) {
                  rem[remL++] = xc[xi] || 0;
                } else {
                  rem = [xc[xi]];
                  remL = 1;
                }
              } while ((xi++ < xL || rem[0] != null) && s--);
              more = rem[0] != null;
              if (!qc[0])
                qc.splice(0, 1);
            }
            if (base == BASE) {
              for (i = 1, s = qc[0]; s >= 10; s /= 10, i++)
                ;
              round(q2, dp + (q2.e = i + e * LOG_BASE - 1) + 1, rm, more);
            } else {
              q2.e = e;
              q2.r = +more;
            }
            return q2;
          };
        }();
        function format(n, i, rm, id) {
          var c0, e, ne2, len, str;
          if (rm == null)
            rm = ROUNDING_MODE;
          else
            intCheck(rm, 0, 8);
          if (!n.c)
            return n.toString();
          c0 = n.c[0];
          ne2 = n.e;
          if (i == null) {
            str = coeffToString(n.c);
            str = id == 1 || id == 2 && (ne2 <= TO_EXP_NEG || ne2 >= TO_EXP_POS) ? toExponential(str, ne2) : toFixedPoint(str, ne2, "0");
          } else {
            n = round(new BigNumber2(n), i, rm);
            e = n.e;
            str = coeffToString(n.c);
            len = str.length;
            if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
              for (; len < i; str += "0", len++)
                ;
              str = toExponential(str, e);
            } else {
              i -= ne2;
              str = toFixedPoint(str, e, "0");
              if (e + 1 > len) {
                if (--i > 0)
                  for (str += "."; i--; str += "0")
                    ;
              } else {
                i += e - len;
                if (i > 0) {
                  if (e + 1 == len)
                    str += ".";
                  for (; i--; str += "0")
                    ;
                }
              }
            }
          }
          return n.s < 0 && c0 ? "-" + str : str;
        }
        function maxOrMin(args, n) {
          var k2, y, i = 1, x2 = new BigNumber2(args[0]);
          for (; i < args.length; i++) {
            y = new BigNumber2(args[i]);
            if (!y.s || (k2 = compare2(x2, y)) === n || k2 === 0 && x2.s === n) {
              x2 = y;
            }
          }
          return x2;
        }
        function normalise(n, c, e) {
          var i = 1, j2 = c.length;
          for (; !c[--j2]; c.pop())
            ;
          for (j2 = c[0]; j2 >= 10; j2 /= 10, i++)
            ;
          if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
            n.c = n.e = null;
          } else if (e < MIN_EXP) {
            n.c = [n.e = 0];
          } else {
            n.e = e;
            n.c = c;
          }
          return n;
        }
        parseNumeric = /* @__PURE__ */ function() {
          var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
          return function(x2, str, isNum, b2) {
            var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
            if (isInfinityOrNaN.test(s)) {
              x2.s = isNaN(s) ? null : s < 0 ? -1 : 1;
            } else {
              if (!isNum) {
                s = s.replace(basePrefix, function(m2, p1, p2) {
                  base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
                  return !b2 || b2 == base ? p1 : m2;
                });
                if (b2) {
                  base = b2;
                  s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
                }
                if (str != s)
                  return new BigNumber2(s, base);
              }
              if (BigNumber2.DEBUG) {
                throw Error(bignumberError + "Not a" + (b2 ? " base " + b2 : "") + " number: " + str);
              }
              x2.s = null;
            }
            x2.c = x2.e = null;
          };
        }();
        function round(x2, sd, rm, r) {
          var d, i, j2, k2, n, ni, rd, xc = x2.c, pows10 = POWS_TEN;
          if (xc) {
            out: {
              for (d = 1, k2 = xc[0]; k2 >= 10; k2 /= 10, d++)
                ;
              i = sd - d;
              if (i < 0) {
                i += LOG_BASE;
                j2 = sd;
                n = xc[ni = 0];
                rd = mathfloor(n / pows10[d - j2 - 1] % 10);
              } else {
                ni = mathceil((i + 1) / LOG_BASE);
                if (ni >= xc.length) {
                  if (r) {
                    for (; xc.length <= ni; xc.push(0))
                      ;
                    n = rd = 0;
                    d = 1;
                    i %= LOG_BASE;
                    j2 = i - LOG_BASE + 1;
                  } else {
                    break out;
                  }
                } else {
                  n = k2 = xc[ni];
                  for (d = 1; k2 >= 10; k2 /= 10, d++)
                    ;
                  i %= LOG_BASE;
                  j2 = i - LOG_BASE + d;
                  rd = j2 < 0 ? 0 : mathfloor(n / pows10[d - j2 - 1] % 10);
                }
              }
              r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
              // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
              // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
              xc[ni + 1] != null || (j2 < 0 ? n : n % pows10[d - j2 - 1]);
              r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x2.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
              (i > 0 ? j2 > 0 ? n / pows10[d - j2] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x2.s < 0 ? 8 : 7));
              if (sd < 1 || !xc[0]) {
                xc.length = 0;
                if (r) {
                  sd -= x2.e + 1;
                  xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                  x2.e = -sd || 0;
                } else {
                  xc[0] = x2.e = 0;
                }
                return x2;
              }
              if (i == 0) {
                xc.length = ni;
                k2 = 1;
                ni--;
              } else {
                xc.length = ni + 1;
                k2 = pows10[LOG_BASE - i];
                xc[ni] = j2 > 0 ? mathfloor(n / pows10[d - j2] % pows10[j2]) * k2 : 0;
              }
              if (r) {
                for (; ; ) {
                  if (ni == 0) {
                    for (i = 1, j2 = xc[0]; j2 >= 10; j2 /= 10, i++)
                      ;
                    j2 = xc[0] += k2;
                    for (k2 = 1; j2 >= 10; j2 /= 10, k2++)
                      ;
                    if (i != k2) {
                      x2.e++;
                      if (xc[0] == BASE)
                        xc[0] = 1;
                    }
                    break;
                  } else {
                    xc[ni] += k2;
                    if (xc[ni] != BASE)
                      break;
                    xc[ni--] = 0;
                    k2 = 1;
                  }
                }
              }
              for (i = xc.length; xc[--i] === 0; xc.pop())
                ;
            }
            if (x2.e > MAX_EXP) {
              x2.c = x2.e = null;
            } else if (x2.e < MIN_EXP) {
              x2.c = [x2.e = 0];
            }
          }
          return x2;
        }
        function valueOf(n) {
          var str, e = n.e;
          if (e === null)
            return n.toString();
          str = coeffToString(n.c);
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
          return n.s < 0 ? "-" + str : str;
        }
        P.absoluteValue = P.abs = function() {
          var x2 = new BigNumber2(this);
          if (x2.s < 0)
            x2.s = 1;
          return x2;
        };
        P.comparedTo = function(y, b2) {
          return compare2(this, new BigNumber2(y, b2));
        };
        P.decimalPlaces = P.dp = function(dp, rm) {
          var c, n, v2, x2 = this;
          if (dp != null) {
            intCheck(dp, 0, MAX);
            if (rm == null)
              rm = ROUNDING_MODE;
            else
              intCheck(rm, 0, 8);
            return round(new BigNumber2(x2), dp + x2.e + 1, rm);
          }
          if (!(c = x2.c))
            return null;
          n = ((v2 = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
          if (v2 = c[v2])
            for (; v2 % 10 == 0; v2 /= 10, n--)
              ;
          if (n < 0)
            n = 0;
          return n;
        };
        P.dividedBy = P.div = function(y, b2) {
          return div(this, new BigNumber2(y, b2), DECIMAL_PLACES, ROUNDING_MODE);
        };
        P.dividedToIntegerBy = P.idiv = function(y, b2) {
          return div(this, new BigNumber2(y, b2), 0, 1);
        };
        P.exponentiatedBy = P.pow = function(n, m2) {
          var half, isModExp, i, k2, more, nIsBig, nIsNeg, nIsOdd, y, x2 = this;
          n = new BigNumber2(n);
          if (n.c && !n.isInteger()) {
            throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
          }
          if (m2 != null)
            m2 = new BigNumber2(m2);
          nIsBig = n.e > 14;
          if (!x2.c || !x2.c[0] || x2.c[0] == 1 && !x2.e && x2.c.length == 1 || !n.c || !n.c[0]) {
            y = new BigNumber2(Math.pow(+valueOf(x2), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
            return m2 ? y.mod(m2) : y;
          }
          nIsNeg = n.s < 0;
          if (m2) {
            if (m2.c ? !m2.c[0] : !m2.s)
              return new BigNumber2(NaN);
            isModExp = !nIsNeg && x2.isInteger() && m2.isInteger();
            if (isModExp)
              x2 = x2.mod(m2);
          } else if (n.e > 9 && (x2.e > 0 || x2.e < -1 || (x2.e == 0 ? x2.c[0] > 1 || nIsBig && x2.c[1] >= 24e7 : x2.c[0] < 8e13 || nIsBig && x2.c[0] <= 9999975e7))) {
            k2 = x2.s < 0 && isOdd(n) ? -0 : 0;
            if (x2.e > -1)
              k2 = 1 / k2;
            return new BigNumber2(nIsNeg ? 1 / k2 : k2);
          } else if (POW_PRECISION) {
            k2 = mathceil(POW_PRECISION / LOG_BASE + 2);
          }
          if (nIsBig) {
            half = new BigNumber2(0.5);
            if (nIsNeg)
              n.s = 1;
            nIsOdd = isOdd(n);
          } else {
            i = Math.abs(+valueOf(n));
            nIsOdd = i % 2;
          }
          y = new BigNumber2(ONE);
          for (; ; ) {
            if (nIsOdd) {
              y = y.times(x2);
              if (!y.c)
                break;
              if (k2) {
                if (y.c.length > k2)
                  y.c.length = k2;
              } else if (isModExp) {
                y = y.mod(m2);
              }
            }
            if (i) {
              i = mathfloor(i / 2);
              if (i === 0)
                break;
              nIsOdd = i % 2;
            } else {
              n = n.times(half);
              round(n, n.e + 1, 1);
              if (n.e > 14) {
                nIsOdd = isOdd(n);
              } else {
                i = +valueOf(n);
                if (i === 0)
                  break;
                nIsOdd = i % 2;
              }
            }
            x2 = x2.times(x2);
            if (k2) {
              if (x2.c && x2.c.length > k2)
                x2.c.length = k2;
            } else if (isModExp) {
              x2 = x2.mod(m2);
            }
          }
          if (isModExp)
            return y;
          if (nIsNeg)
            y = ONE.div(y);
          return m2 ? y.mod(m2) : k2 ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
        };
        P.integerValue = function(rm) {
          var n = new BigNumber2(this);
          if (rm == null)
            rm = ROUNDING_MODE;
          else
            intCheck(rm, 0, 8);
          return round(n, n.e + 1, rm);
        };
        P.isEqualTo = P.eq = function(y, b2) {
          return compare2(this, new BigNumber2(y, b2)) === 0;
        };
        P.isFinite = function() {
          return !!this.c;
        };
        P.isGreaterThan = P.gt = function(y, b2) {
          return compare2(this, new BigNumber2(y, b2)) > 0;
        };
        P.isGreaterThanOrEqualTo = P.gte = function(y, b2) {
          return (b2 = compare2(this, new BigNumber2(y, b2))) === 1 || b2 === 0;
        };
        P.isInteger = function() {
          return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
        };
        P.isLessThan = P.lt = function(y, b2) {
          return compare2(this, new BigNumber2(y, b2)) < 0;
        };
        P.isLessThanOrEqualTo = P.lte = function(y, b2) {
          return (b2 = compare2(this, new BigNumber2(y, b2))) === -1 || b2 === 0;
        };
        P.isNaN = function() {
          return !this.s;
        };
        P.isNegative = function() {
          return this.s < 0;
        };
        P.isPositive = function() {
          return this.s > 0;
        };
        P.isZero = function() {
          return !!this.c && this.c[0] == 0;
        };
        P.minus = function(y, b2) {
          var i, j2, t, xLTy, x2 = this, a = x2.s;
          y = new BigNumber2(y, b2);
          b2 = y.s;
          if (!a || !b2)
            return new BigNumber2(NaN);
          if (a != b2) {
            y.s = -b2;
            return x2.plus(y);
          }
          var xe = x2.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x2.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc)
              return xc ? (y.s = -b2, y) : new BigNumber2(yc ? x2 : NaN);
            if (!xc[0] || !yc[0]) {
              return yc[0] ? (y.s = -b2, y) : new BigNumber2(xc[0] ? x2 : (
                // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                ROUNDING_MODE == 3 ? -0 : 0
              ));
            }
          }
          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (xLTy = a < 0) {
              a = -a;
              t = xc;
            } else {
              ye = xe;
              t = yc;
            }
            t.reverse();
            for (b2 = a; b2--; t.push(0))
              ;
            t.reverse();
          } else {
            j2 = (xLTy = (a = xc.length) < (b2 = yc.length)) ? a : b2;
            for (a = b2 = 0; b2 < j2; b2++) {
              if (xc[b2] != yc[b2]) {
                xLTy = xc[b2] < yc[b2];
                break;
              }
            }
          }
          if (xLTy) {
            t = xc;
            xc = yc;
            yc = t;
            y.s = -y.s;
          }
          b2 = (j2 = yc.length) - (i = xc.length);
          if (b2 > 0)
            for (; b2--; xc[i++] = 0)
              ;
          b2 = BASE - 1;
          for (; j2 > a; ) {
            if (xc[--j2] < yc[j2]) {
              for (i = j2; i && !xc[--i]; xc[i] = b2)
                ;
              --xc[i];
              xc[j2] += BASE;
            }
            xc[j2] -= yc[j2];
          }
          for (; xc[0] == 0; xc.splice(0, 1), --ye)
            ;
          if (!xc[0]) {
            y.s = ROUNDING_MODE == 3 ? -1 : 1;
            y.c = [y.e = 0];
            return y;
          }
          return normalise(y, xc, ye);
        };
        P.modulo = P.mod = function(y, b2) {
          var q2, s, x2 = this;
          y = new BigNumber2(y, b2);
          if (!x2.c || !y.s || y.c && !y.c[0]) {
            return new BigNumber2(NaN);
          } else if (!y.c || x2.c && !x2.c[0]) {
            return new BigNumber2(x2);
          }
          if (MODULO_MODE == 9) {
            s = y.s;
            y.s = 1;
            q2 = div(x2, y, 0, 3);
            y.s = s;
            q2.s *= s;
          } else {
            q2 = div(x2, y, 0, MODULO_MODE);
          }
          y = x2.minus(q2.times(y));
          if (!y.c[0] && MODULO_MODE == 1)
            y.s = x2.s;
          return y;
        };
        P.multipliedBy = P.times = function(y, b2) {
          var c, e, i, j2, k2, m2, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x2 = this, xc = x2.c, yc = (y = new BigNumber2(y, b2)).c;
          if (!xc || !yc || !xc[0] || !yc[0]) {
            if (!x2.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
              y.c = y.e = y.s = null;
            } else {
              y.s *= x2.s;
              if (!xc || !yc) {
                y.c = y.e = null;
              } else {
                y.c = [0];
                y.e = 0;
              }
            }
            return y;
          }
          e = bitFloor(x2.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
          y.s *= x2.s;
          xcL = xc.length;
          ycL = yc.length;
          if (xcL < ycL) {
            zc = xc;
            xc = yc;
            yc = zc;
            i = xcL;
            xcL = ycL;
            ycL = i;
          }
          for (i = xcL + ycL, zc = []; i--; zc.push(0))
            ;
          base = BASE;
          sqrtBase = SQRT_BASE;
          for (i = ycL; --i >= 0; ) {
            c = 0;
            ylo = yc[i] % sqrtBase;
            yhi = yc[i] / sqrtBase | 0;
            for (k2 = xcL, j2 = i + k2; j2 > i; ) {
              xlo = xc[--k2] % sqrtBase;
              xhi = xc[k2] / sqrtBase | 0;
              m2 = yhi * xlo + xhi * ylo;
              xlo = ylo * xlo + m2 % sqrtBase * sqrtBase + zc[j2] + c;
              c = (xlo / base | 0) + (m2 / sqrtBase | 0) + yhi * xhi;
              zc[j2--] = xlo % base;
            }
            zc[j2] = c;
          }
          if (c) {
            ++e;
          } else {
            zc.splice(0, 1);
          }
          return normalise(y, zc, e);
        };
        P.negated = function() {
          var x2 = new BigNumber2(this);
          x2.s = -x2.s || null;
          return x2;
        };
        P.plus = function(y, b2) {
          var t, x2 = this, a = x2.s;
          y = new BigNumber2(y, b2);
          b2 = y.s;
          if (!a || !b2)
            return new BigNumber2(NaN);
          if (a != b2) {
            y.s = -b2;
            return x2.minus(y);
          }
          var xe = x2.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x2.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc)
              return new BigNumber2(a / 0);
            if (!xc[0] || !yc[0])
              return yc[0] ? y : new BigNumber2(xc[0] ? x2 : a * 0);
          }
          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (a > 0) {
              ye = xe;
              t = yc;
            } else {
              a = -a;
              t = xc;
            }
            t.reverse();
            for (; a--; t.push(0))
              ;
            t.reverse();
          }
          a = xc.length;
          b2 = yc.length;
          if (a - b2 < 0) {
            t = yc;
            yc = xc;
            xc = t;
            b2 = a;
          }
          for (a = 0; b2; ) {
            a = (xc[--b2] = xc[b2] + yc[b2] + a) / BASE | 0;
            xc[b2] = BASE === xc[b2] ? 0 : xc[b2] % BASE;
          }
          if (a) {
            xc = [a].concat(xc);
            ++ye;
          }
          return normalise(y, xc, ye);
        };
        P.precision = P.sd = function(sd, rm) {
          var c, n, v2, x2 = this;
          if (sd != null && sd !== !!sd) {
            intCheck(sd, 1, MAX);
            if (rm == null)
              rm = ROUNDING_MODE;
            else
              intCheck(rm, 0, 8);
            return round(new BigNumber2(x2), sd, rm);
          }
          if (!(c = x2.c))
            return null;
          v2 = c.length - 1;
          n = v2 * LOG_BASE + 1;
          if (v2 = c[v2]) {
            for (; v2 % 10 == 0; v2 /= 10, n--)
              ;
            for (v2 = c[0]; v2 >= 10; v2 /= 10, n++)
              ;
          }
          if (sd && x2.e + 1 > n)
            n = x2.e + 1;
          return n;
        };
        P.shiftedBy = function(k2) {
          intCheck(k2, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
          return this.times("1e" + k2);
        };
        P.squareRoot = P.sqrt = function() {
          var m2, n, r, rep, t, x2 = this, c = x2.c, s = x2.s, e = x2.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
          if (s !== 1 || !c || !c[0]) {
            return new BigNumber2(!s || s < 0 && (!c || c[0]) ? NaN : c ? x2 : 1 / 0);
          }
          s = Math.sqrt(+valueOf(x2));
          if (s == 0 || s == 1 / 0) {
            n = coeffToString(c);
            if ((n.length + e) % 2 == 0)
              n += "0";
            s = Math.sqrt(+n);
            e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
            if (s == 1 / 0) {
              n = "5e" + e;
            } else {
              n = s.toExponential();
              n = n.slice(0, n.indexOf("e") + 1) + e;
            }
            r = new BigNumber2(n);
          } else {
            r = new BigNumber2(s + "");
          }
          if (r.c[0]) {
            e = r.e;
            s = e + dp;
            if (s < 3)
              s = 0;
            for (; ; ) {
              t = r;
              r = half.times(t.plus(div(x2, t, dp, 1)));
              if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
                if (r.e < e)
                  --s;
                n = n.slice(s - 3, s + 1);
                if (n == "9999" || !rep && n == "4999") {
                  if (!rep) {
                    round(t, t.e + DECIMAL_PLACES + 2, 0);
                    if (t.times(t).eq(x2)) {
                      r = t;
                      break;
                    }
                  }
                  dp += 4;
                  s += 4;
                  rep = 1;
                } else {
                  if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                    round(r, r.e + DECIMAL_PLACES + 2, 1);
                    m2 = !r.times(r).eq(x2);
                  }
                  break;
                }
              }
            }
          }
          return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m2);
        };
        P.toExponential = function(dp, rm) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp++;
          }
          return format(this, dp, rm, 1);
        };
        P.toFixed = function(dp, rm) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp = dp + this.e + 1;
          }
          return format(this, dp, rm);
        };
        P.toFormat = function(dp, rm, format2) {
          var str, x2 = this;
          if (format2 == null) {
            if (dp != null && rm && typeof rm == "object") {
              format2 = rm;
              rm = null;
            } else if (dp && typeof dp == "object") {
              format2 = dp;
              dp = rm = null;
            } else {
              format2 = FORMAT;
            }
          } else if (typeof format2 != "object") {
            throw Error(bignumberError + "Argument not an object: " + format2);
          }
          str = x2.toFixed(dp, rm);
          if (x2.c) {
            var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x2.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
            if (g2) {
              i = g1;
              g1 = g2;
              g2 = i;
              len -= i;
            }
            if (g1 > 0 && len > 0) {
              i = len % g1 || g1;
              intPart = intDigits.substr(0, i);
              for (; i < len; i += g1)
                intPart += groupSeparator + intDigits.substr(i, g1);
              if (g2 > 0)
                intPart += groupSeparator + intDigits.slice(i);
              if (isNeg)
                intPart = "-" + intPart;
            }
            str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
              new RegExp("\\d{" + g2 + "}\\B", "g"),
              "$&" + (format2.fractionGroupSeparator || "")
            ) : fractionPart) : intPart;
          }
          return (format2.prefix || "") + str + (format2.suffix || "");
        };
        P.toFraction = function(md) {
          var d, d0, d1, d2, e, exp, n, n0, n1, q2, r, s, x2 = this, xc = x2.c;
          if (md != null) {
            n = new BigNumber2(md);
            if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
              throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
            }
          }
          if (!xc)
            return new BigNumber2(x2);
          d = new BigNumber2(ONE);
          n1 = d0 = new BigNumber2(ONE);
          d1 = n0 = new BigNumber2(ONE);
          s = coeffToString(xc);
          e = d.e = s.length - x2.e - 1;
          d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
          md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
          exp = MAX_EXP;
          MAX_EXP = 1 / 0;
          n = new BigNumber2(s);
          n0.c[0] = 0;
          for (; ; ) {
            q2 = div(n, d, 0, 1);
            d2 = d0.plus(q2.times(d1));
            if (d2.comparedTo(md) == 1)
              break;
            d0 = d1;
            d1 = d2;
            n1 = n0.plus(q2.times(d2 = n1));
            n0 = d2;
            d = n.minus(q2.times(d2 = d));
            n = d2;
          }
          d2 = div(md.minus(d0), d1, 0, 1);
          n0 = n0.plus(d2.times(n1));
          d0 = d0.plus(d2.times(d1));
          n0.s = n1.s = x2.s;
          e = e * 2;
          r = div(n1, d1, e, ROUNDING_MODE).minus(x2).abs().comparedTo(
            div(n0, d0, e, ROUNDING_MODE).minus(x2).abs()
          ) < 1 ? [n1, d1] : [n0, d0];
          MAX_EXP = exp;
          return r;
        };
        P.toNumber = function() {
          return +valueOf(this);
        };
        P.toPrecision = function(sd, rm) {
          if (sd != null)
            intCheck(sd, 1, MAX);
          return format(this, sd, rm, 2);
        };
        P.toString = function(b2) {
          var str, n = this, s = n.s, e = n.e;
          if (e === null) {
            if (s) {
              str = "Infinity";
              if (s < 0)
                str = "-" + str;
            } else {
              str = "NaN";
            }
          } else {
            if (b2 == null) {
              str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
            } else if (b2 === 10 && alphabetHasNormalDecimalDigits) {
              n = round(new BigNumber2(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
              str = toFixedPoint(coeffToString(n.c), n.e, "0");
            } else {
              intCheck(b2, 2, ALPHABET.length, "Base");
              str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b2, s, true);
            }
            if (s < 0 && n.c[0])
              str = "-" + str;
          }
          return str;
        };
        P.valueOf = P.toJSON = function() {
          return valueOf(this);
        };
        P._isBigNumber = true;
        if (configObject != null)
          BigNumber2.set(configObject);
        return BigNumber2;
      }
      function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
      }
      function coeffToString(a) {
        var s, z2, i = 1, j2 = a.length, r = a[0] + "";
        for (; i < j2; ) {
          s = a[i++] + "";
          z2 = LOG_BASE - s.length;
          for (; z2--; s = "0" + s)
            ;
          r += s;
        }
        for (j2 = r.length; r.charCodeAt(--j2) === 48; )
          ;
        return r.slice(0, j2 + 1 || 1);
      }
      function compare2(x2, y) {
        var a, b2, xc = x2.c, yc = y.c, i = x2.s, j2 = y.s, k2 = x2.e, l = y.e;
        if (!i || !j2)
          return null;
        a = xc && !xc[0];
        b2 = yc && !yc[0];
        if (a || b2)
          return a ? b2 ? 0 : -j2 : i;
        if (i != j2)
          return i;
        a = i < 0;
        b2 = k2 == l;
        if (!xc || !yc)
          return b2 ? 0 : !xc ^ a ? 1 : -1;
        if (!b2)
          return k2 > l ^ a ? 1 : -1;
        j2 = (k2 = xc.length) < (l = yc.length) ? k2 : l;
        for (i = 0; i < j2; i++)
          if (xc[i] != yc[i])
            return xc[i] > yc[i] ^ a ? 1 : -1;
        return k2 == l ? 0 : k2 > l ^ a ? 1 : -1;
      }
      function intCheck(n, min, max, name) {
        if (n < min || n > max || n !== mathfloor(n)) {
          throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
        }
      }
      function isOdd(n) {
        var k2 = n.c.length - 1;
        return bitFloor(n.e / LOG_BASE) == k2 && n.c[k2] % 2 != 0;
      }
      function toExponential(str, e) {
        return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
      }
      function toFixedPoint(str, e, z2) {
        var len, zs;
        if (e < 0) {
          for (zs = z2 + "."; ++e; zs += z2)
            ;
          str = zs + str;
        } else {
          len = str.length;
          if (++e > len) {
            for (zs = z2, e -= len; --e; zs += z2)
              ;
            str += zs;
          } else if (e < len) {
            str = str.slice(0, e) + "." + str.slice(e);
          }
        }
        return str;
      }
      BigNumber = clone();
      BigNumber["default"] = BigNumber.BigNumber = BigNumber;
      if (typeof define == "function" && define.amd) {
        define(function() {
          return BigNumber;
        });
      } else if (typeof module2 != "undefined" && module2.exports) {
        module2.exports = BigNumber;
      } else {
        if (!globalObject) {
          globalObject = typeof self != "undefined" && self ? self : window;
        }
        globalObject.BigNumber = BigNumber;
      }
    })(exports2);
  }
});

// node_modules/borc/src/decoder.asm.js
var require_decoder_asm = __commonJS({
  "node_modules/borc/src/decoder.asm.js"(exports2, module2) {
    module2.exports = function decodeAsm(stdlib, foreign, buffer) {
      ;
      var heap = new stdlib.Uint8Array(buffer);
      var pushInt = foreign.pushInt;
      var pushInt32 = foreign.pushInt32;
      var pushInt32Neg = foreign.pushInt32Neg;
      var pushInt64 = foreign.pushInt64;
      var pushInt64Neg = foreign.pushInt64Neg;
      var pushFloat = foreign.pushFloat;
      var pushFloatSingle = foreign.pushFloatSingle;
      var pushFloatDouble = foreign.pushFloatDouble;
      var pushTrue = foreign.pushTrue;
      var pushFalse = foreign.pushFalse;
      var pushUndefined = foreign.pushUndefined;
      var pushNull = foreign.pushNull;
      var pushInfinity = foreign.pushInfinity;
      var pushInfinityNeg = foreign.pushInfinityNeg;
      var pushNaN = foreign.pushNaN;
      var pushNaNNeg = foreign.pushNaNNeg;
      var pushArrayStart = foreign.pushArrayStart;
      var pushArrayStartFixed = foreign.pushArrayStartFixed;
      var pushArrayStartFixed32 = foreign.pushArrayStartFixed32;
      var pushArrayStartFixed64 = foreign.pushArrayStartFixed64;
      var pushObjectStart = foreign.pushObjectStart;
      var pushObjectStartFixed = foreign.pushObjectStartFixed;
      var pushObjectStartFixed32 = foreign.pushObjectStartFixed32;
      var pushObjectStartFixed64 = foreign.pushObjectStartFixed64;
      var pushByteString = foreign.pushByteString;
      var pushByteStringStart = foreign.pushByteStringStart;
      var pushUtf8String = foreign.pushUtf8String;
      var pushUtf8StringStart = foreign.pushUtf8StringStart;
      var pushSimpleUnassigned = foreign.pushSimpleUnassigned;
      var pushTagStart = foreign.pushTagStart;
      var pushTagStart4 = foreign.pushTagStart4;
      var pushTagStart8 = foreign.pushTagStart8;
      var pushTagUnassigned = foreign.pushTagUnassigned;
      var pushBreak = foreign.pushBreak;
      var pow3 = stdlib.Math.pow;
      var offset = 0;
      var inputLength = 0;
      var code = 0;
      function parse(input) {
        input = input | 0;
        offset = 0;
        inputLength = input;
        while ((offset | 0) < (inputLength | 0)) {
          code = jumpTable[heap[offset] & 255](heap[offset] | 0) | 0;
          if ((code | 0) > 0) {
            break;
          }
        }
        return code | 0;
      }
      function checkOffset(n) {
        n = n | 0;
        if (((offset | 0) + (n | 0) | 0) < (inputLength | 0)) {
          return 0;
        }
        return 1;
      }
      function readUInt16(n) {
        n = n | 0;
        return heap[n | 0] << 8 | heap[n + 1 | 0] | 0;
      }
      function readUInt32(n) {
        n = n | 0;
        return heap[n | 0] << 24 | heap[n + 1 | 0] << 16 | heap[n + 2 | 0] << 8 | heap[n + 3 | 0] | 0;
      }
      function INT_P(octet) {
        octet = octet | 0;
        pushInt(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function UINT_P_8(octet) {
        octet = octet | 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        pushInt(heap[offset + 1 | 0] | 0);
        offset = offset + 2 | 0;
        return 0;
      }
      function UINT_P_16(octet) {
        octet = octet | 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        pushInt(
          readUInt16(offset + 1 | 0) | 0
        );
        offset = offset + 3 | 0;
        return 0;
      }
      function UINT_P_32(octet) {
        octet = octet | 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        pushInt32(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0
        );
        offset = offset + 5 | 0;
        return 0;
      }
      function UINT_P_64(octet) {
        octet = octet | 0;
        if (checkOffset(8) | 0) {
          return 1;
        }
        pushInt64(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0,
          readUInt16(offset + 5 | 0) | 0,
          readUInt16(offset + 7 | 0) | 0
        );
        offset = offset + 9 | 0;
        return 0;
      }
      function INT_N(octet) {
        octet = octet | 0;
        pushInt(-1 - (octet - 32 | 0) | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function UINT_N_8(octet) {
        octet = octet | 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        pushInt(
          -1 - (heap[offset + 1 | 0] | 0) | 0
        );
        offset = offset + 2 | 0;
        return 0;
      }
      function UINT_N_16(octet) {
        octet = octet | 0;
        var val = 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        val = readUInt16(offset + 1 | 0) | 0;
        pushInt(-1 - (val | 0) | 0);
        offset = offset + 3 | 0;
        return 0;
      }
      function UINT_N_32(octet) {
        octet = octet | 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        pushInt32Neg(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0
        );
        offset = offset + 5 | 0;
        return 0;
      }
      function UINT_N_64(octet) {
        octet = octet | 0;
        if (checkOffset(8) | 0) {
          return 1;
        }
        pushInt64Neg(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0,
          readUInt16(offset + 5 | 0) | 0,
          readUInt16(offset + 7 | 0) | 0
        );
        offset = offset + 9 | 0;
        return 0;
      }
      function BYTE_STRING(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var step = 0;
        step = octet - 64 | 0;
        if (checkOffset(step | 0) | 0) {
          return 1;
        }
        start = offset + 1 | 0;
        end = (offset + 1 | 0) + (step | 0) | 0;
        pushByteString(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function BYTE_STRING_8(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var length = 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        length = heap[offset + 1 | 0] | 0;
        start = offset + 2 | 0;
        end = (offset + 2 | 0) + (length | 0) | 0;
        if (checkOffset(length + 1 | 0) | 0) {
          return 1;
        }
        pushByteString(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function BYTE_STRING_16(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var length = 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        length = readUInt16(offset + 1 | 0) | 0;
        start = offset + 3 | 0;
        end = (offset + 3 | 0) + (length | 0) | 0;
        if (checkOffset(length + 2 | 0) | 0) {
          return 1;
        }
        pushByteString(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function BYTE_STRING_32(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var length = 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        length = readUInt32(offset + 1 | 0) | 0;
        start = offset + 5 | 0;
        end = (offset + 5 | 0) + (length | 0) | 0;
        if (checkOffset(length + 4 | 0) | 0) {
          return 1;
        }
        pushByteString(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function BYTE_STRING_64(octet) {
        octet = octet | 0;
        return 1;
      }
      function BYTE_STRING_BREAK(octet) {
        octet = octet | 0;
        pushByteStringStart();
        offset = offset + 1 | 0;
        return 0;
      }
      function UTF8_STRING(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var step = 0;
        step = octet - 96 | 0;
        if (checkOffset(step | 0) | 0) {
          return 1;
        }
        start = offset + 1 | 0;
        end = (offset + 1 | 0) + (step | 0) | 0;
        pushUtf8String(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function UTF8_STRING_8(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var length = 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        length = heap[offset + 1 | 0] | 0;
        start = offset + 2 | 0;
        end = (offset + 2 | 0) + (length | 0) | 0;
        if (checkOffset(length + 1 | 0) | 0) {
          return 1;
        }
        pushUtf8String(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function UTF8_STRING_16(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var length = 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        length = readUInt16(offset + 1 | 0) | 0;
        start = offset + 3 | 0;
        end = (offset + 3 | 0) + (length | 0) | 0;
        if (checkOffset(length + 2 | 0) | 0) {
          return 1;
        }
        pushUtf8String(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function UTF8_STRING_32(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var length = 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        length = readUInt32(offset + 1 | 0) | 0;
        start = offset + 5 | 0;
        end = (offset + 5 | 0) + (length | 0) | 0;
        if (checkOffset(length + 4 | 0) | 0) {
          return 1;
        }
        pushUtf8String(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function UTF8_STRING_64(octet) {
        octet = octet | 0;
        return 1;
      }
      function UTF8_STRING_BREAK(octet) {
        octet = octet | 0;
        pushUtf8StringStart();
        offset = offset + 1 | 0;
        return 0;
      }
      function ARRAY(octet) {
        octet = octet | 0;
        pushArrayStartFixed(octet - 128 | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function ARRAY_8(octet) {
        octet = octet | 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        pushArrayStartFixed(heap[offset + 1 | 0] | 0);
        offset = offset + 2 | 0;
        return 0;
      }
      function ARRAY_16(octet) {
        octet = octet | 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        pushArrayStartFixed(
          readUInt16(offset + 1 | 0) | 0
        );
        offset = offset + 3 | 0;
        return 0;
      }
      function ARRAY_32(octet) {
        octet = octet | 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        pushArrayStartFixed32(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0
        );
        offset = offset + 5 | 0;
        return 0;
      }
      function ARRAY_64(octet) {
        octet = octet | 0;
        if (checkOffset(8) | 0) {
          return 1;
        }
        pushArrayStartFixed64(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0,
          readUInt16(offset + 5 | 0) | 0,
          readUInt16(offset + 7 | 0) | 0
        );
        offset = offset + 9 | 0;
        return 0;
      }
      function ARRAY_BREAK(octet) {
        octet = octet | 0;
        pushArrayStart();
        offset = offset + 1 | 0;
        return 0;
      }
      function MAP(octet) {
        octet = octet | 0;
        var step = 0;
        step = octet - 160 | 0;
        if (checkOffset(step | 0) | 0) {
          return 1;
        }
        pushObjectStartFixed(step | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function MAP_8(octet) {
        octet = octet | 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        pushObjectStartFixed(heap[offset + 1 | 0] | 0);
        offset = offset + 2 | 0;
        return 0;
      }
      function MAP_16(octet) {
        octet = octet | 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        pushObjectStartFixed(
          readUInt16(offset + 1 | 0) | 0
        );
        offset = offset + 3 | 0;
        return 0;
      }
      function MAP_32(octet) {
        octet = octet | 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        pushObjectStartFixed32(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0
        );
        offset = offset + 5 | 0;
        return 0;
      }
      function MAP_64(octet) {
        octet = octet | 0;
        if (checkOffset(8) | 0) {
          return 1;
        }
        pushObjectStartFixed64(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0,
          readUInt16(offset + 5 | 0) | 0,
          readUInt16(offset + 7 | 0) | 0
        );
        offset = offset + 9 | 0;
        return 0;
      }
      function MAP_BREAK(octet) {
        octet = octet | 0;
        pushObjectStart();
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_KNOWN(octet) {
        octet = octet | 0;
        pushTagStart(octet - 192 | 0 | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_BIGNUM_POS(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_BIGNUM_NEG(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_FRAC(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_BIGNUM_FLOAT(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_UNASSIGNED(octet) {
        octet = octet | 0;
        pushTagStart(octet - 192 | 0 | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_BASE64_URL(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_BASE64(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_BASE16(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_MORE_1(octet) {
        octet = octet | 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        pushTagStart(heap[offset + 1 | 0] | 0);
        offset = offset + 2 | 0;
        return 0;
      }
      function TAG_MORE_2(octet) {
        octet = octet | 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        pushTagStart(
          readUInt16(offset + 1 | 0) | 0
        );
        offset = offset + 3 | 0;
        return 0;
      }
      function TAG_MORE_4(octet) {
        octet = octet | 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        pushTagStart4(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0
        );
        offset = offset + 5 | 0;
        return 0;
      }
      function TAG_MORE_8(octet) {
        octet = octet | 0;
        if (checkOffset(8) | 0) {
          return 1;
        }
        pushTagStart8(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0,
          readUInt16(offset + 5 | 0) | 0,
          readUInt16(offset + 7 | 0) | 0
        );
        offset = offset + 9 | 0;
        return 0;
      }
      function SIMPLE_UNASSIGNED(octet) {
        octet = octet | 0;
        pushSimpleUnassigned((octet | 0) - 224 | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function SIMPLE_FALSE(octet) {
        octet = octet | 0;
        pushFalse();
        offset = offset + 1 | 0;
        return 0;
      }
      function SIMPLE_TRUE(octet) {
        octet = octet | 0;
        pushTrue();
        offset = offset + 1 | 0;
        return 0;
      }
      function SIMPLE_NULL(octet) {
        octet = octet | 0;
        pushNull();
        offset = offset + 1 | 0;
        return 0;
      }
      function SIMPLE_UNDEFINED(octet) {
        octet = octet | 0;
        pushUndefined();
        offset = offset + 1 | 0;
        return 0;
      }
      function SIMPLE_BYTE(octet) {
        octet = octet | 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        pushSimpleUnassigned(heap[offset + 1 | 0] | 0);
        offset = offset + 2 | 0;
        return 0;
      }
      function SIMPLE_FLOAT_HALF(octet) {
        octet = octet | 0;
        var f = 0;
        var g = 0;
        var sign = 1;
        var exp = 0;
        var mant = 0;
        var r = 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        f = heap[offset + 1 | 0] | 0;
        g = heap[offset + 2 | 0] | 0;
        if ((f | 0) & 128) {
          sign = -1;
        }
        exp = +(((f | 0) & 124) >> 2);
        mant = +(((f | 0) & 3) << 8 | g);
        if (+exp == 0) {
          pushFloat(+(+sign * 5960464477539063e-23 * +mant));
        } else if (+exp == 31) {
          if (+sign == 1) {
            if (+mant > 0) {
              pushNaN();
            } else {
              pushInfinity();
            }
          } else {
            if (+mant > 0) {
              pushNaNNeg();
            } else {
              pushInfinityNeg();
            }
          }
        } else {
          pushFloat(+(+sign * pow3(2, +(+exp - 25)) * +(1024 + mant)));
        }
        offset = offset + 3 | 0;
        return 0;
      }
      function SIMPLE_FLOAT_SINGLE(octet) {
        octet = octet | 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        pushFloatSingle(
          heap[offset + 1 | 0] | 0,
          heap[offset + 2 | 0] | 0,
          heap[offset + 3 | 0] | 0,
          heap[offset + 4 | 0] | 0
        );
        offset = offset + 5 | 0;
        return 0;
      }
      function SIMPLE_FLOAT_DOUBLE(octet) {
        octet = octet | 0;
        if (checkOffset(8) | 0) {
          return 1;
        }
        pushFloatDouble(
          heap[offset + 1 | 0] | 0,
          heap[offset + 2 | 0] | 0,
          heap[offset + 3 | 0] | 0,
          heap[offset + 4 | 0] | 0,
          heap[offset + 5 | 0] | 0,
          heap[offset + 6 | 0] | 0,
          heap[offset + 7 | 0] | 0,
          heap[offset + 8 | 0] | 0
        );
        offset = offset + 9 | 0;
        return 0;
      }
      function ERROR2(octet) {
        octet = octet | 0;
        return 1;
      }
      function BREAK(octet) {
        octet = octet | 0;
        pushBreak();
        offset = offset + 1 | 0;
        return 0;
      }
      var jumpTable = [
        // Integer 0x00..0x17 (0..23)
        INT_P,
        // 0x00
        INT_P,
        // 0x01
        INT_P,
        // 0x02
        INT_P,
        // 0x03
        INT_P,
        // 0x04
        INT_P,
        // 0x05
        INT_P,
        // 0x06
        INT_P,
        // 0x07
        INT_P,
        // 0x08
        INT_P,
        // 0x09
        INT_P,
        // 0x0A
        INT_P,
        // 0x0B
        INT_P,
        // 0x0C
        INT_P,
        // 0x0D
        INT_P,
        // 0x0E
        INT_P,
        // 0x0F
        INT_P,
        // 0x10
        INT_P,
        // 0x11
        INT_P,
        // 0x12
        INT_P,
        // 0x13
        INT_P,
        // 0x14
        INT_P,
        // 0x15
        INT_P,
        // 0x16
        INT_P,
        // 0x17
        // Unsigned integer (one-byte uint8_t follows)
        UINT_P_8,
        // 0x18
        // Unsigned integer (two-byte uint16_t follows)
        UINT_P_16,
        // 0x19
        // Unsigned integer (four-byte uint32_t follows)
        UINT_P_32,
        // 0x1a
        // Unsigned integer (eight-byte uint64_t follows)
        UINT_P_64,
        // 0x1b
        ERROR2,
        // 0x1c
        ERROR2,
        // 0x1d
        ERROR2,
        // 0x1e
        ERROR2,
        // 0x1f
        // Negative integer -1-0x00..-1-0x17 (-1..-24)
        INT_N,
        // 0x20
        INT_N,
        // 0x21
        INT_N,
        // 0x22
        INT_N,
        // 0x23
        INT_N,
        // 0x24
        INT_N,
        // 0x25
        INT_N,
        // 0x26
        INT_N,
        // 0x27
        INT_N,
        // 0x28
        INT_N,
        // 0x29
        INT_N,
        // 0x2A
        INT_N,
        // 0x2B
        INT_N,
        // 0x2C
        INT_N,
        // 0x2D
        INT_N,
        // 0x2E
        INT_N,
        // 0x2F
        INT_N,
        // 0x30
        INT_N,
        // 0x31
        INT_N,
        // 0x32
        INT_N,
        // 0x33
        INT_N,
        // 0x34
        INT_N,
        // 0x35
        INT_N,
        // 0x36
        INT_N,
        // 0x37
        // Negative integer -1-n (one-byte uint8_t for n follows)
        UINT_N_8,
        // 0x38
        // Negative integer -1-n (two-byte uint16_t for n follows)
        UINT_N_16,
        // 0x39
        // Negative integer -1-n (four-byte uint32_t for nfollows)
        UINT_N_32,
        // 0x3a
        // Negative integer -1-n (eight-byte uint64_t for n follows)
        UINT_N_64,
        // 0x3b
        ERROR2,
        // 0x3c
        ERROR2,
        // 0x3d
        ERROR2,
        // 0x3e
        ERROR2,
        // 0x3f
        // byte string (0x00..0x17 bytes follow)
        BYTE_STRING,
        // 0x40
        BYTE_STRING,
        // 0x41
        BYTE_STRING,
        // 0x42
        BYTE_STRING,
        // 0x43
        BYTE_STRING,
        // 0x44
        BYTE_STRING,
        // 0x45
        BYTE_STRING,
        // 0x46
        BYTE_STRING,
        // 0x47
        BYTE_STRING,
        // 0x48
        BYTE_STRING,
        // 0x49
        BYTE_STRING,
        // 0x4A
        BYTE_STRING,
        // 0x4B
        BYTE_STRING,
        // 0x4C
        BYTE_STRING,
        // 0x4D
        BYTE_STRING,
        // 0x4E
        BYTE_STRING,
        // 0x4F
        BYTE_STRING,
        // 0x50
        BYTE_STRING,
        // 0x51
        BYTE_STRING,
        // 0x52
        BYTE_STRING,
        // 0x53
        BYTE_STRING,
        // 0x54
        BYTE_STRING,
        // 0x55
        BYTE_STRING,
        // 0x56
        BYTE_STRING,
        // 0x57
        // byte string (one-byte uint8_t for n, and then n bytes follow)
        BYTE_STRING_8,
        // 0x58
        // byte string (two-byte uint16_t for n, and then n bytes follow)
        BYTE_STRING_16,
        // 0x59
        // byte string (four-byte uint32_t for n, and then n bytes follow)
        BYTE_STRING_32,
        // 0x5a
        // byte string (eight-byte uint64_t for n, and then n bytes follow)
        BYTE_STRING_64,
        // 0x5b
        ERROR2,
        // 0x5c
        ERROR2,
        // 0x5d
        ERROR2,
        // 0x5e
        // byte string, byte strings follow, terminated by "break"
        BYTE_STRING_BREAK,
        // 0x5f
        // UTF-8 string (0x00..0x17 bytes follow)
        UTF8_STRING,
        // 0x60
        UTF8_STRING,
        // 0x61
        UTF8_STRING,
        // 0x62
        UTF8_STRING,
        // 0x63
        UTF8_STRING,
        // 0x64
        UTF8_STRING,
        // 0x65
        UTF8_STRING,
        // 0x66
        UTF8_STRING,
        // 0x67
        UTF8_STRING,
        // 0x68
        UTF8_STRING,
        // 0x69
        UTF8_STRING,
        // 0x6A
        UTF8_STRING,
        // 0x6B
        UTF8_STRING,
        // 0x6C
        UTF8_STRING,
        // 0x6D
        UTF8_STRING,
        // 0x6E
        UTF8_STRING,
        // 0x6F
        UTF8_STRING,
        // 0x70
        UTF8_STRING,
        // 0x71
        UTF8_STRING,
        // 0x72
        UTF8_STRING,
        // 0x73
        UTF8_STRING,
        // 0x74
        UTF8_STRING,
        // 0x75
        UTF8_STRING,
        // 0x76
        UTF8_STRING,
        // 0x77
        // UTF-8 string (one-byte uint8_t for n, and then n bytes follow)
        UTF8_STRING_8,
        // 0x78
        // UTF-8 string (two-byte uint16_t for n, and then n bytes follow)
        UTF8_STRING_16,
        // 0x79
        // UTF-8 string (four-byte uint32_t for n, and then n bytes follow)
        UTF8_STRING_32,
        // 0x7a
        // UTF-8 string (eight-byte uint64_t for n, and then n bytes follow)
        UTF8_STRING_64,
        // 0x7b
        // UTF-8 string, UTF-8 strings follow, terminated by "break"
        ERROR2,
        // 0x7c
        ERROR2,
        // 0x7d
        ERROR2,
        // 0x7e
        UTF8_STRING_BREAK,
        // 0x7f
        // array (0x00..0x17 data items follow)
        ARRAY,
        // 0x80
        ARRAY,
        // 0x81
        ARRAY,
        // 0x82
        ARRAY,
        // 0x83
        ARRAY,
        // 0x84
        ARRAY,
        // 0x85
        ARRAY,
        // 0x86
        ARRAY,
        // 0x87
        ARRAY,
        // 0x88
        ARRAY,
        // 0x89
        ARRAY,
        // 0x8A
        ARRAY,
        // 0x8B
        ARRAY,
        // 0x8C
        ARRAY,
        // 0x8D
        ARRAY,
        // 0x8E
        ARRAY,
        // 0x8F
        ARRAY,
        // 0x90
        ARRAY,
        // 0x91
        ARRAY,
        // 0x92
        ARRAY,
        // 0x93
        ARRAY,
        // 0x94
        ARRAY,
        // 0x95
        ARRAY,
        // 0x96
        ARRAY,
        // 0x97
        // array (one-byte uint8_t fo, and then n data items follow)
        ARRAY_8,
        // 0x98
        // array (two-byte uint16_t for n, and then n data items follow)
        ARRAY_16,
        // 0x99
        // array (four-byte uint32_t for n, and then n data items follow)
        ARRAY_32,
        // 0x9a
        // array (eight-byte uint64_t for n, and then n data items follow)
        ARRAY_64,
        // 0x9b
        // array, data items follow, terminated by "break"
        ERROR2,
        // 0x9c
        ERROR2,
        // 0x9d
        ERROR2,
        // 0x9e
        ARRAY_BREAK,
        // 0x9f
        // map (0x00..0x17 pairs of data items follow)
        MAP,
        // 0xa0
        MAP,
        // 0xa1
        MAP,
        // 0xa2
        MAP,
        // 0xa3
        MAP,
        // 0xa4
        MAP,
        // 0xa5
        MAP,
        // 0xa6
        MAP,
        // 0xa7
        MAP,
        // 0xa8
        MAP,
        // 0xa9
        MAP,
        // 0xaA
        MAP,
        // 0xaB
        MAP,
        // 0xaC
        MAP,
        // 0xaD
        MAP,
        // 0xaE
        MAP,
        // 0xaF
        MAP,
        // 0xb0
        MAP,
        // 0xb1
        MAP,
        // 0xb2
        MAP,
        // 0xb3
        MAP,
        // 0xb4
        MAP,
        // 0xb5
        MAP,
        // 0xb6
        MAP,
        // 0xb7
        // map (one-byte uint8_t for n, and then n pairs of data items follow)
        MAP_8,
        // 0xb8
        // map (two-byte uint16_t for n, and then n pairs of data items follow)
        MAP_16,
        // 0xb9
        // map (four-byte uint32_t for n, and then n pairs of data items follow)
        MAP_32,
        // 0xba
        // map (eight-byte uint64_t for n, and then n pairs of data items follow)
        MAP_64,
        // 0xbb
        ERROR2,
        // 0xbc
        ERROR2,
        // 0xbd
        ERROR2,
        // 0xbe
        // map, pairs of data items follow, terminated by "break"
        MAP_BREAK,
        // 0xbf
        // Text-based date/time (data item follows; see Section 2.4.1)
        TAG_KNOWN,
        // 0xc0
        // Epoch-based date/time (data item follows; see Section 2.4.1)
        TAG_KNOWN,
        // 0xc1
        // Positive bignum (data item "byte string" follows)
        TAG_KNOWN,
        // 0xc2
        // Negative bignum (data item "byte string" follows)
        TAG_KNOWN,
        // 0xc3
        // Decimal Fraction (data item "array" follows; see Section 2.4.3)
        TAG_KNOWN,
        // 0xc4
        // Bigfloat (data item "array" follows; see Section 2.4.3)
        TAG_KNOWN,
        // 0xc5
        // (tagged item)
        TAG_UNASSIGNED,
        // 0xc6
        TAG_UNASSIGNED,
        // 0xc7
        TAG_UNASSIGNED,
        // 0xc8
        TAG_UNASSIGNED,
        // 0xc9
        TAG_UNASSIGNED,
        // 0xca
        TAG_UNASSIGNED,
        // 0xcb
        TAG_UNASSIGNED,
        // 0xcc
        TAG_UNASSIGNED,
        // 0xcd
        TAG_UNASSIGNED,
        // 0xce
        TAG_UNASSIGNED,
        // 0xcf
        TAG_UNASSIGNED,
        // 0xd0
        TAG_UNASSIGNED,
        // 0xd1
        TAG_UNASSIGNED,
        // 0xd2
        TAG_UNASSIGNED,
        // 0xd3
        TAG_UNASSIGNED,
        // 0xd4
        // Expected Conversion (data item follows; see Section 2.4.4.2)
        TAG_UNASSIGNED,
        // 0xd5
        TAG_UNASSIGNED,
        // 0xd6
        TAG_UNASSIGNED,
        // 0xd7
        // (more tagged items, 1/2/4/8 bytes and then a data item follow)
        TAG_MORE_1,
        // 0xd8
        TAG_MORE_2,
        // 0xd9
        TAG_MORE_4,
        // 0xda
        TAG_MORE_8,
        // 0xdb
        ERROR2,
        // 0xdc
        ERROR2,
        // 0xdd
        ERROR2,
        // 0xde
        ERROR2,
        // 0xdf
        // (simple value)
        SIMPLE_UNASSIGNED,
        // 0xe0
        SIMPLE_UNASSIGNED,
        // 0xe1
        SIMPLE_UNASSIGNED,
        // 0xe2
        SIMPLE_UNASSIGNED,
        // 0xe3
        SIMPLE_UNASSIGNED,
        // 0xe4
        SIMPLE_UNASSIGNED,
        // 0xe5
        SIMPLE_UNASSIGNED,
        // 0xe6
        SIMPLE_UNASSIGNED,
        // 0xe7
        SIMPLE_UNASSIGNED,
        // 0xe8
        SIMPLE_UNASSIGNED,
        // 0xe9
        SIMPLE_UNASSIGNED,
        // 0xea
        SIMPLE_UNASSIGNED,
        // 0xeb
        SIMPLE_UNASSIGNED,
        // 0xec
        SIMPLE_UNASSIGNED,
        // 0xed
        SIMPLE_UNASSIGNED,
        // 0xee
        SIMPLE_UNASSIGNED,
        // 0xef
        SIMPLE_UNASSIGNED,
        // 0xf0
        SIMPLE_UNASSIGNED,
        // 0xf1
        SIMPLE_UNASSIGNED,
        // 0xf2
        SIMPLE_UNASSIGNED,
        // 0xf3
        // False
        SIMPLE_FALSE,
        // 0xf4
        // True
        SIMPLE_TRUE,
        // 0xf5
        // Null
        SIMPLE_NULL,
        // 0xf6
        // Undefined
        SIMPLE_UNDEFINED,
        // 0xf7
        // (simple value, one byte follows)
        SIMPLE_BYTE,
        // 0xf8
        // Half-Precision Float (two-byte IEEE 754)
        SIMPLE_FLOAT_HALF,
        // 0xf9
        // Single-Precision Float (four-byte IEEE 754)
        SIMPLE_FLOAT_SINGLE,
        // 0xfa
        // Double-Precision Float (eight-byte IEEE 754)
        SIMPLE_FLOAT_DOUBLE,
        // 0xfb
        ERROR2,
        // 0xfc
        ERROR2,
        // 0xfd
        ERROR2,
        // 0xfe
        // "break" stop code
        BREAK
        // 0xff
      ];
      return {
        parse
      };
    };
  }
});

// node_modules/borc/src/constants.js
var require_constants = __commonJS({
  "node_modules/borc/src/constants.js"(exports2) {
    "use strict";
    var Bignumber = require_bignumber().BigNumber;
    exports2.MT = {
      POS_INT: 0,
      NEG_INT: 1,
      BYTE_STRING: 2,
      UTF8_STRING: 3,
      ARRAY: 4,
      MAP: 5,
      TAG: 6,
      SIMPLE_FLOAT: 7
    };
    exports2.TAG = {
      DATE_STRING: 0,
      DATE_EPOCH: 1,
      POS_BIGINT: 2,
      NEG_BIGINT: 3,
      DECIMAL_FRAC: 4,
      BIGFLOAT: 5,
      BASE64URL_EXPECTED: 21,
      BASE64_EXPECTED: 22,
      BASE16_EXPECTED: 23,
      CBOR: 24,
      URI: 32,
      BASE64URL: 33,
      BASE64: 34,
      REGEXP: 35,
      MIME: 36
    };
    exports2.NUMBYTES = {
      ZERO: 0,
      ONE: 24,
      TWO: 25,
      FOUR: 26,
      EIGHT: 27,
      INDEFINITE: 31
    };
    exports2.SIMPLE = {
      FALSE: 20,
      TRUE: 21,
      NULL: 22,
      UNDEFINED: 23
    };
    exports2.SYMS = {
      NULL: Symbol("null"),
      UNDEFINED: Symbol("undef"),
      PARENT: Symbol("parent"),
      BREAK: Symbol("break"),
      STREAM: Symbol("stream")
    };
    exports2.SHIFT32 = Math.pow(2, 32);
    exports2.SHIFT16 = Math.pow(2, 16);
    exports2.MAX_SAFE_HIGH = 2097151;
    exports2.NEG_ONE = new Bignumber(-1);
    exports2.TEN = new Bignumber(10);
    exports2.TWO = new Bignumber(2);
    exports2.PARENT = {
      ARRAY: 0,
      OBJECT: 1,
      MAP: 2,
      TAG: 3,
      BYTE_STRING: 4,
      UTF8_STRING: 5
    };
  }
});

// node_modules/borc/src/utils.js
var require_utils = __commonJS({
  "node_modules/borc/src/utils.js"(exports2) {
    "use strict";
    var { Buffer: Buffer3 } = require_buffer2();
    var Bignumber = require_bignumber().BigNumber;
    var constants = require_constants();
    var SHIFT32 = constants.SHIFT32;
    var SHIFT16 = constants.SHIFT16;
    var MAX_SAFE_HIGH = 2097151;
    exports2.parseHalf = function parseHalf(buf) {
      var exp, mant, sign;
      sign = buf[0] & 128 ? -1 : 1;
      exp = (buf[0] & 124) >> 2;
      mant = (buf[0] & 3) << 8 | buf[1];
      if (!exp) {
        return sign * 5960464477539063e-23 * mant;
      } else if (exp === 31) {
        return sign * (mant ? 0 / 0 : Infinity);
      } else {
        return sign * Math.pow(2, exp - 25) * (1024 + mant);
      }
    };
    function toHex2(n) {
      if (n < 16) {
        return "0" + n.toString(16);
      }
      return n.toString(16);
    }
    exports2.arrayBufferToBignumber = function(buf) {
      const len = buf.byteLength;
      let res = "";
      for (let i = 0; i < len; i++) {
        res += toHex2(buf[i]);
      }
      return new Bignumber(res, 16);
    };
    exports2.buildMap = (obj) => {
      const res = /* @__PURE__ */ new Map();
      const keys = Object.keys(obj);
      const length = keys.length;
      for (let i = 0; i < length; i++) {
        res.set(keys[i], obj[keys[i]]);
      }
      return res;
    };
    exports2.buildInt32 = (f, g) => {
      return f * SHIFT16 + g;
    };
    exports2.buildInt64 = (f1, f2, g1, g2) => {
      const f = exports2.buildInt32(f1, f2);
      const g = exports2.buildInt32(g1, g2);
      if (f > MAX_SAFE_HIGH) {
        return new Bignumber(f).times(SHIFT32).plus(g);
      } else {
        return f * SHIFT32 + g;
      }
    };
    exports2.writeHalf = function writeHalf(buf, half) {
      const u32 = Buffer3.allocUnsafe(4);
      u32.writeFloatBE(half, 0);
      const u = u32.readUInt32BE(0);
      if ((u & 8191) !== 0) {
        return false;
      }
      var s16 = u >> 16 & 32768;
      const exp = u >> 23 & 255;
      const mant = u & 8388607;
      if (exp >= 113 && exp <= 142) {
        s16 += (exp - 112 << 10) + (mant >> 13);
      } else if (exp >= 103 && exp < 113) {
        if (mant & (1 << 126 - exp) - 1) {
          return false;
        }
        s16 += mant + 8388608 >> 126 - exp;
      } else {
        return false;
      }
      buf.writeUInt16BE(s16, 0);
      return true;
    };
    exports2.keySorter = function(a, b2) {
      var lenA = a[0].byteLength;
      var lenB = b2[0].byteLength;
      if (lenA > lenB) {
        return 1;
      }
      if (lenB > lenA) {
        return -1;
      }
      return a[0].compare(b2[0]);
    };
    exports2.isNegativeZero = (x2) => {
      return x2 === 0 && 1 / x2 < 0;
    };
    exports2.nextPowerOf2 = (n) => {
      let count = 0;
      if (n && !(n & n - 1)) {
        return n;
      }
      while (n !== 0) {
        n >>= 1;
        count += 1;
      }
      return 1 << count;
    };
  }
});

// node_modules/borc/src/simple.js
var require_simple = __commonJS({
  "node_modules/borc/src/simple.js"(exports2, module2) {
    "use strict";
    var constants = require_constants();
    var MT = constants.MT;
    var SIMPLE = constants.SIMPLE;
    var SYMS = constants.SYMS;
    var Simple = class _Simple {
      /**
       * Creates an instance of Simple.
       *
       * @param {integer} value - the simple value's integer value
       */
      constructor(value4) {
        if (typeof value4 !== "number") {
          throw new Error("Invalid Simple type: " + typeof value4);
        }
        if (value4 < 0 || value4 > 255 || (value4 | 0) !== value4) {
          throw new Error("value must be a small positive integer: " + value4);
        }
        this.value = value4;
      }
      /**
       * Debug string for simple value
       *
       * @returns {string} simple(value)
       */
      toString() {
        return "simple(" + this.value + ")";
      }
      /**
       * Debug string for simple value
       *
       * @returns {string} simple(value)
       */
      inspect() {
        return "simple(" + this.value + ")";
      }
      /**
       * Push the simple value onto the CBOR stream
       *
       * @param {cbor.Encoder} gen The generator to push onto
       * @returns {number}
       */
      encodeCBOR(gen) {
        return gen._pushInt(this.value, MT.SIMPLE_FLOAT);
      }
      /**
       * Is the given object a Simple?
       *
       * @param {any} obj - object to test
       * @returns {bool} - is it Simple?
       */
      static isSimple(obj) {
        return obj instanceof _Simple;
      }
      /**
       * Decode from the CBOR additional information into a JavaScript value.
       * If the CBOR item has no parent, return a "safe" symbol instead of
       * `null` or `undefined`, so that the value can be passed through a
       * stream in object mode.
       *
       * @param {Number} val - the CBOR additional info to convert
       * @param {bool} hasParent - Does the CBOR item have a parent?
       * @returns {(null|undefined|Boolean|Symbol)} - the decoded value
       */
      static decode(val, hasParent) {
        if (hasParent == null) {
          hasParent = true;
        }
        switch (val) {
          case SIMPLE.FALSE:
            return false;
          case SIMPLE.TRUE:
            return true;
          case SIMPLE.NULL:
            if (hasParent) {
              return null;
            } else {
              return SYMS.NULL;
            }
          case SIMPLE.UNDEFINED:
            if (hasParent) {
              return void 0;
            } else {
              return SYMS.UNDEFINED;
            }
          case -1:
            if (!hasParent) {
              throw new Error("Invalid BREAK");
            }
            return SYMS.BREAK;
          default:
            return new _Simple(val);
        }
      }
    };
    module2.exports = Simple;
  }
});

// node_modules/borc/src/tagged.js
var require_tagged = __commonJS({
  "node_modules/borc/src/tagged.js"(exports2, module2) {
    "use strict";
    var Tagged = class _Tagged {
      /**
       * Creates an instance of Tagged.
       *
       * @param {Number} tag - the number of the tag
       * @param {any} value - the value inside the tag
       * @param {Error} err - the error that was thrown parsing the tag, or null
       */
      constructor(tag, value4, err) {
        this.tag = tag;
        this.value = value4;
        this.err = err;
        if (typeof this.tag !== "number") {
          throw new Error("Invalid tag type (" + typeof this.tag + ")");
        }
        if (this.tag < 0 || (this.tag | 0) !== this.tag) {
          throw new Error("Tag must be a positive integer: " + this.tag);
        }
      }
      /**
       * Convert to a String
       *
       * @returns {String} string of the form '1(2)'
       */
      toString() {
        return `${this.tag}(${JSON.stringify(this.value)})`;
      }
      /**
       * Push the simple value onto the CBOR stream
       *
       * @param {cbor.Encoder} gen The generator to push onto
       * @returns {number}
       */
      encodeCBOR(gen) {
        gen._pushTag(this.tag);
        return gen.pushAny(this.value);
      }
      /**
       * If we have a converter for this type, do the conversion.  Some converters
       * are built-in.  Additional ones can be passed in.  If you want to remove
       * a built-in converter, pass a converter in whose value is 'null' instead
       * of a function.
       *
       * @param {Object} converters - keys in the object are a tag number, the value
       *   is a function that takes the decoded CBOR and returns a JavaScript value
       *   of the appropriate type.  Throw an exception in the function on errors.
       * @returns {any} - the converted item
       */
      convert(converters) {
        var er2, f;
        f = converters != null ? converters[this.tag] : void 0;
        if (typeof f !== "function") {
          f = _Tagged["_tag" + this.tag];
          if (typeof f !== "function") {
            return this;
          }
        }
        try {
          return f.call(_Tagged, this.value);
        } catch (error) {
          er2 = error;
          this.err = er2;
          return this;
        }
      }
    };
    module2.exports = Tagged;
  }
});

// node_modules/iso-url/src/url-browser.js
var require_url_browser = __commonJS({
  "node_modules/iso-url/src/url-browser.js"(exports2, module2) {
    "use strict";
    var defaultBase = self.location ? self.location.protocol + "//" + self.location.host : "";
    var URL2 = self.URL;
    var URLWithLegacySupport = class {
      constructor(url = "", base = defaultBase) {
        this.super = new URL2(url, base);
        this.path = this.pathname + this.search;
        this.auth = this.username && this.password ? this.username + ":" + this.password : null;
        this.query = this.search && this.search.startsWith("?") ? this.search.slice(1) : null;
      }
      get hash() {
        return this.super.hash;
      }
      get host() {
        return this.super.host;
      }
      get hostname() {
        return this.super.hostname;
      }
      get href() {
        return this.super.href;
      }
      get origin() {
        return this.super.origin;
      }
      get password() {
        return this.super.password;
      }
      get pathname() {
        return this.super.pathname;
      }
      get port() {
        return this.super.port;
      }
      get protocol() {
        return this.super.protocol;
      }
      get search() {
        return this.super.search;
      }
      get searchParams() {
        return this.super.searchParams;
      }
      get username() {
        return this.super.username;
      }
      set hash(hash2) {
        this.super.hash = hash2;
      }
      set host(host) {
        this.super.host = host;
      }
      set hostname(hostname) {
        this.super.hostname = hostname;
      }
      set href(href) {
        this.super.href = href;
      }
      set origin(origin) {
        this.super.origin = origin;
      }
      set password(password) {
        this.super.password = password;
      }
      set pathname(pathname) {
        this.super.pathname = pathname;
      }
      set port(port) {
        this.super.port = port;
      }
      set protocol(protocol) {
        this.super.protocol = protocol;
      }
      set search(search) {
        this.super.search = search;
      }
      set searchParams(searchParams) {
        this.super.searchParams = searchParams;
      }
      set username(username) {
        this.super.username = username;
      }
      createObjectURL(o) {
        return this.super.createObjectURL(o);
      }
      revokeObjectURL(o) {
        this.super.revokeObjectURL(o);
      }
      toJSON() {
        return this.super.toJSON();
      }
      toString() {
        return this.super.toString();
      }
      format() {
        return this.toString();
      }
    };
    function format(obj) {
      if (typeof obj === "string") {
        const url = new URL2(obj);
        return url.toString();
      }
      if (!(obj instanceof URL2)) {
        const userPass = obj.username && obj.password ? `${obj.username}:${obj.password}@` : "";
        const auth = obj.auth ? obj.auth + "@" : "";
        const port = obj.port ? ":" + obj.port : "";
        const protocol = obj.protocol ? obj.protocol + "//" : "";
        const host = obj.host || "";
        const hostname = obj.hostname || "";
        const search = obj.search || (obj.query ? "?" + obj.query : "");
        const hash2 = obj.hash || "";
        const pathname = obj.pathname || "";
        const path = obj.path || pathname + search;
        return `${protocol}${userPass || auth}${host || hostname + port}${path}${hash2}`;
      }
    }
    module2.exports = {
      URLWithLegacySupport,
      URLSearchParams: self.URLSearchParams,
      defaultBase,
      format
    };
  }
});

// node_modules/iso-url/src/relative.js
var require_relative = __commonJS({
  "node_modules/iso-url/src/relative.js"(exports2, module2) {
    "use strict";
    var { URLWithLegacySupport, format } = require_url_browser();
    module2.exports = (url, location2 = {}, protocolMap = {}, defaultProtocol) => {
      let protocol = location2.protocol ? location2.protocol.replace(":", "") : "http";
      protocol = (protocolMap[protocol] || defaultProtocol || protocol) + ":";
      let urlParsed;
      try {
        urlParsed = new URLWithLegacySupport(url);
      } catch (err) {
        urlParsed = {};
      }
      const base = Object.assign({}, location2, {
        protocol: protocol || urlParsed.protocol,
        host: location2.host || urlParsed.host
      });
      return new URLWithLegacySupport(url, format(base)).toString();
    };
  }
});

// node_modules/iso-url/index.js
var require_iso_url = __commonJS({
  "node_modules/iso-url/index.js"(exports2, module2) {
    "use strict";
    var {
      URLWithLegacySupport,
      format,
      URLSearchParams,
      defaultBase
    } = require_url_browser();
    var relative = require_relative();
    module2.exports = {
      URL: URLWithLegacySupport,
      URLSearchParams,
      format,
      relative,
      defaultBase
    };
  }
});

// node_modules/borc/src/decoder.js
var require_decoder = __commonJS({
  "node_modules/borc/src/decoder.js"(exports2, module2) {
    "use strict";
    var { Buffer: Buffer3 } = require_buffer2();
    var ieee754 = require_ieee754();
    var Bignumber = require_bignumber().BigNumber;
    var parser = require_decoder_asm();
    var utils = require_utils();
    var c = require_constants();
    var Simple = require_simple();
    var Tagged = require_tagged();
    var { URL: URL2 } = require_iso_url();
    var Decoder = class _Decoder {
      /**
       * @param {Object} [opts={}]
       * @param {number} [opts.size=65536] - Size of the allocated heap.
       */
      constructor(opts) {
        opts = opts || {};
        if (!opts.size || opts.size < 65536) {
          opts.size = 65536;
        } else {
          opts.size = utils.nextPowerOf2(opts.size);
        }
        this._heap = new ArrayBuffer(opts.size);
        this._heap8 = new Uint8Array(this._heap);
        this._buffer = Buffer3.from(this._heap);
        this._reset();
        this._knownTags = Object.assign({
          0: (val) => new Date(val),
          1: (val) => new Date(val * 1e3),
          2: (val) => utils.arrayBufferToBignumber(val),
          3: (val) => c.NEG_ONE.minus(utils.arrayBufferToBignumber(val)),
          4: (v2) => {
            return c.TEN.pow(v2[0]).times(v2[1]);
          },
          5: (v2) => {
            return c.TWO.pow(v2[0]).times(v2[1]);
          },
          32: (val) => new URL2(val),
          35: (val) => new RegExp(val)
        }, opts.tags);
        this.parser = parser(window, {
          // eslint-disable-next-line no-console
          log: console.log.bind(console),
          pushInt: this.pushInt.bind(this),
          pushInt32: this.pushInt32.bind(this),
          pushInt32Neg: this.pushInt32Neg.bind(this),
          pushInt64: this.pushInt64.bind(this),
          pushInt64Neg: this.pushInt64Neg.bind(this),
          pushFloat: this.pushFloat.bind(this),
          pushFloatSingle: this.pushFloatSingle.bind(this),
          pushFloatDouble: this.pushFloatDouble.bind(this),
          pushTrue: this.pushTrue.bind(this),
          pushFalse: this.pushFalse.bind(this),
          pushUndefined: this.pushUndefined.bind(this),
          pushNull: this.pushNull.bind(this),
          pushInfinity: this.pushInfinity.bind(this),
          pushInfinityNeg: this.pushInfinityNeg.bind(this),
          pushNaN: this.pushNaN.bind(this),
          pushNaNNeg: this.pushNaNNeg.bind(this),
          pushArrayStart: this.pushArrayStart.bind(this),
          pushArrayStartFixed: this.pushArrayStartFixed.bind(this),
          pushArrayStartFixed32: this.pushArrayStartFixed32.bind(this),
          pushArrayStartFixed64: this.pushArrayStartFixed64.bind(this),
          pushObjectStart: this.pushObjectStart.bind(this),
          pushObjectStartFixed: this.pushObjectStartFixed.bind(this),
          pushObjectStartFixed32: this.pushObjectStartFixed32.bind(this),
          pushObjectStartFixed64: this.pushObjectStartFixed64.bind(this),
          pushByteString: this.pushByteString.bind(this),
          pushByteStringStart: this.pushByteStringStart.bind(this),
          pushUtf8String: this.pushUtf8String.bind(this),
          pushUtf8StringStart: this.pushUtf8StringStart.bind(this),
          pushSimpleUnassigned: this.pushSimpleUnassigned.bind(this),
          pushTagUnassigned: this.pushTagUnassigned.bind(this),
          pushTagStart: this.pushTagStart.bind(this),
          pushTagStart4: this.pushTagStart4.bind(this),
          pushTagStart8: this.pushTagStart8.bind(this),
          pushBreak: this.pushBreak.bind(this)
        }, this._heap);
      }
      get _depth() {
        return this._parents.length;
      }
      get _currentParent() {
        return this._parents[this._depth - 1];
      }
      get _ref() {
        return this._currentParent.ref;
      }
      // Finish the current parent
      _closeParent() {
        var p = this._parents.pop();
        if (p.length > 0) {
          throw new Error(`Missing ${p.length} elements`);
        }
        switch (p.type) {
          case c.PARENT.TAG:
            this._push(
              this.createTag(p.ref[0], p.ref[1])
            );
            break;
          case c.PARENT.BYTE_STRING:
            this._push(this.createByteString(p.ref, p.length));
            break;
          case c.PARENT.UTF8_STRING:
            this._push(this.createUtf8String(p.ref, p.length));
            break;
          case c.PARENT.MAP:
            if (p.values % 2 > 0) {
              throw new Error("Odd number of elements in the map");
            }
            this._push(this.createMap(p.ref, p.length));
            break;
          case c.PARENT.OBJECT:
            if (p.values % 2 > 0) {
              throw new Error("Odd number of elements in the map");
            }
            this._push(this.createObject(p.ref, p.length));
            break;
          case c.PARENT.ARRAY:
            this._push(this.createArray(p.ref, p.length));
            break;
          default:
            break;
        }
        if (this._currentParent && this._currentParent.type === c.PARENT.TAG) {
          this._dec();
        }
      }
      // Reduce the expected length of the current parent by one
      _dec() {
        const p = this._currentParent;
        if (p.length < 0) {
          return;
        }
        p.length--;
        if (p.length === 0) {
          this._closeParent();
        }
      }
      // Push any value to the current parent
      _push(val, hasChildren) {
        const p = this._currentParent;
        p.values++;
        switch (p.type) {
          case c.PARENT.ARRAY:
          case c.PARENT.BYTE_STRING:
          case c.PARENT.UTF8_STRING:
            if (p.length > -1) {
              this._ref[this._ref.length - p.length] = val;
            } else {
              this._ref.push(val);
            }
            this._dec();
            break;
          case c.PARENT.OBJECT:
            if (p.tmpKey != null) {
              this._ref[p.tmpKey] = val;
              p.tmpKey = null;
              this._dec();
            } else {
              p.tmpKey = val;
              if (typeof p.tmpKey !== "string") {
                p.type = c.PARENT.MAP;
                p.ref = utils.buildMap(p.ref);
              }
            }
            break;
          case c.PARENT.MAP:
            if (p.tmpKey != null) {
              this._ref.set(p.tmpKey, val);
              p.tmpKey = null;
              this._dec();
            } else {
              p.tmpKey = val;
            }
            break;
          case c.PARENT.TAG:
            this._ref.push(val);
            if (!hasChildren) {
              this._dec();
            }
            break;
          default:
            throw new Error("Unknown parent type");
        }
      }
      // Create a new parent in the parents list
      _createParent(obj, type, len) {
        this._parents[this._depth] = {
          type,
          length: len,
          ref: obj,
          values: 0,
          tmpKey: null
        };
      }
      // Reset all state back to the beginning, also used for initiatlization
      _reset() {
        this._res = [];
        this._parents = [{
          type: c.PARENT.ARRAY,
          length: -1,
          ref: this._res,
          values: 0,
          tmpKey: null
        }];
      }
      // -- Interface to customize deoding behaviour
      createTag(tagNumber, value4) {
        const typ = this._knownTags[tagNumber];
        if (!typ) {
          return new Tagged(tagNumber, value4);
        }
        return typ(value4);
      }
      createMap(obj, len) {
        return obj;
      }
      createObject(obj, len) {
        return obj;
      }
      createArray(arr, len) {
        return arr;
      }
      createByteString(raw, len) {
        return Buffer3.concat(raw);
      }
      createByteStringFromHeap(start, end) {
        if (start === end) {
          return Buffer3.alloc(0);
        }
        return Buffer3.from(this._heap.slice(start, end));
      }
      createInt(val) {
        return val;
      }
      createInt32(f, g) {
        return utils.buildInt32(f, g);
      }
      createInt64(f1, f2, g1, g2) {
        return utils.buildInt64(f1, f2, g1, g2);
      }
      createFloat(val) {
        return val;
      }
      createFloatSingle(a, b2, c2, d) {
        return ieee754.read([a, b2, c2, d], 0, false, 23, 4);
      }
      createFloatDouble(a, b2, c2, d, e, f, g, h) {
        return ieee754.read([a, b2, c2, d, e, f, g, h], 0, false, 52, 8);
      }
      createInt32Neg(f, g) {
        return -1 - utils.buildInt32(f, g);
      }
      createInt64Neg(f1, f2, g1, g2) {
        const f = utils.buildInt32(f1, f2);
        const g = utils.buildInt32(g1, g2);
        if (f > c.MAX_SAFE_HIGH) {
          return c.NEG_ONE.minus(new Bignumber(f).times(c.SHIFT32).plus(g));
        }
        return -1 - (f * c.SHIFT32 + g);
      }
      createTrue() {
        return true;
      }
      createFalse() {
        return false;
      }
      createNull() {
        return null;
      }
      createUndefined() {
        return void 0;
      }
      createInfinity() {
        return Infinity;
      }
      createInfinityNeg() {
        return -Infinity;
      }
      createNaN() {
        return NaN;
      }
      createNaNNeg() {
        return NaN;
      }
      createUtf8String(raw, len) {
        return raw.join("");
      }
      createUtf8StringFromHeap(start, end) {
        if (start === end) {
          return "";
        }
        return this._buffer.toString("utf8", start, end);
      }
      createSimpleUnassigned(val) {
        return new Simple(val);
      }
      // -- Interface for decoder.asm.js
      pushInt(val) {
        this._push(this.createInt(val));
      }
      pushInt32(f, g) {
        this._push(this.createInt32(f, g));
      }
      pushInt64(f1, f2, g1, g2) {
        this._push(this.createInt64(f1, f2, g1, g2));
      }
      pushFloat(val) {
        this._push(this.createFloat(val));
      }
      pushFloatSingle(a, b2, c2, d) {
        this._push(this.createFloatSingle(a, b2, c2, d));
      }
      pushFloatDouble(a, b2, c2, d, e, f, g, h) {
        this._push(this.createFloatDouble(a, b2, c2, d, e, f, g, h));
      }
      pushInt32Neg(f, g) {
        this._push(this.createInt32Neg(f, g));
      }
      pushInt64Neg(f1, f2, g1, g2) {
        this._push(this.createInt64Neg(f1, f2, g1, g2));
      }
      pushTrue() {
        this._push(this.createTrue());
      }
      pushFalse() {
        this._push(this.createFalse());
      }
      pushNull() {
        this._push(this.createNull());
      }
      pushUndefined() {
        this._push(this.createUndefined());
      }
      pushInfinity() {
        this._push(this.createInfinity());
      }
      pushInfinityNeg() {
        this._push(this.createInfinityNeg());
      }
      pushNaN() {
        this._push(this.createNaN());
      }
      pushNaNNeg() {
        this._push(this.createNaNNeg());
      }
      pushArrayStart() {
        this._createParent([], c.PARENT.ARRAY, -1);
      }
      pushArrayStartFixed(len) {
        this._createArrayStartFixed(len);
      }
      pushArrayStartFixed32(len1, len2) {
        const len = utils.buildInt32(len1, len2);
        this._createArrayStartFixed(len);
      }
      pushArrayStartFixed64(len1, len2, len3, len4) {
        const len = utils.buildInt64(len1, len2, len3, len4);
        this._createArrayStartFixed(len);
      }
      pushObjectStart() {
        this._createObjectStartFixed(-1);
      }
      pushObjectStartFixed(len) {
        this._createObjectStartFixed(len);
      }
      pushObjectStartFixed32(len1, len2) {
        const len = utils.buildInt32(len1, len2);
        this._createObjectStartFixed(len);
      }
      pushObjectStartFixed64(len1, len2, len3, len4) {
        const len = utils.buildInt64(len1, len2, len3, len4);
        this._createObjectStartFixed(len);
      }
      pushByteStringStart() {
        this._parents[this._depth] = {
          type: c.PARENT.BYTE_STRING,
          length: -1,
          ref: [],
          values: 0,
          tmpKey: null
        };
      }
      pushByteString(start, end) {
        this._push(this.createByteStringFromHeap(start, end));
      }
      pushUtf8StringStart() {
        this._parents[this._depth] = {
          type: c.PARENT.UTF8_STRING,
          length: -1,
          ref: [],
          values: 0,
          tmpKey: null
        };
      }
      pushUtf8String(start, end) {
        this._push(this.createUtf8StringFromHeap(start, end));
      }
      pushSimpleUnassigned(val) {
        this._push(this.createSimpleUnassigned(val));
      }
      pushTagStart(tag) {
        this._parents[this._depth] = {
          type: c.PARENT.TAG,
          length: 1,
          ref: [tag]
        };
      }
      pushTagStart4(f, g) {
        this.pushTagStart(utils.buildInt32(f, g));
      }
      pushTagStart8(f1, f2, g1, g2) {
        this.pushTagStart(utils.buildInt64(f1, f2, g1, g2));
      }
      pushTagUnassigned(tagNumber) {
        this._push(this.createTag(tagNumber));
      }
      pushBreak() {
        if (this._currentParent.length > -1) {
          throw new Error("Unexpected break");
        }
        this._closeParent();
      }
      _createObjectStartFixed(len) {
        if (len === 0) {
          this._push(this.createObject({}));
          return;
        }
        this._createParent({}, c.PARENT.OBJECT, len);
      }
      _createArrayStartFixed(len) {
        if (len === 0) {
          this._push(this.createArray([]));
          return;
        }
        this._createParent(new Array(len), c.PARENT.ARRAY, len);
      }
      _decode(input) {
        if (input.byteLength === 0) {
          throw new Error("Input too short");
        }
        this._reset();
        this._heap8.set(input);
        const code = this.parser.parse(input.byteLength);
        if (this._depth > 1) {
          while (this._currentParent.length === 0) {
            this._closeParent();
          }
          if (this._depth > 1) {
            throw new Error("Undeterminated nesting");
          }
        }
        if (code > 0) {
          throw new Error("Failed to parse");
        }
        if (this._res.length === 0) {
          throw new Error("No valid result");
        }
      }
      // -- Public Interface
      decodeFirst(input) {
        this._decode(input);
        return this._res[0];
      }
      decodeAll(input) {
        this._decode(input);
        return this._res;
      }
      /**
       * Decode the first cbor object.
       *
       * @param {Buffer|string} input
       * @param {string} [enc='hex'] - Encoding used if a string is passed.
       * @returns {*}
       */
      static decode(input, enc) {
        if (typeof input === "string") {
          input = Buffer3.from(input, enc || "hex");
        }
        const dec = new _Decoder({ size: input.length });
        return dec.decodeFirst(input);
      }
      /**
       * Decode all cbor objects.
       *
       * @param {Buffer|string} input
       * @param {string} [enc='hex'] - Encoding used if a string is passed.
       * @returns {Array<*>}
       */
      static decodeAll(input, enc) {
        if (typeof input === "string") {
          input = Buffer3.from(input, enc || "hex");
        }
        const dec = new _Decoder({ size: input.length });
        return dec.decodeAll(input);
      }
    };
    Decoder.decodeFirst = Decoder.decode;
    module2.exports = Decoder;
  }
});

// node_modules/borc/src/diagnose.js
var require_diagnose = __commonJS({
  "node_modules/borc/src/diagnose.js"(exports2, module2) {
    "use strict";
    var { Buffer: Buffer3 } = require_buffer2();
    var Decoder = require_decoder();
    var utils = require_utils();
    var Diagnose = class _Diagnose extends Decoder {
      createTag(tagNumber, value4) {
        return `${tagNumber}(${value4})`;
      }
      createInt(val) {
        return super.createInt(val).toString();
      }
      createInt32(f, g) {
        return super.createInt32(f, g).toString();
      }
      createInt64(f1, f2, g1, g2) {
        return super.createInt64(f1, f2, g1, g2).toString();
      }
      createInt32Neg(f, g) {
        return super.createInt32Neg(f, g).toString();
      }
      createInt64Neg(f1, f2, g1, g2) {
        return super.createInt64Neg(f1, f2, g1, g2).toString();
      }
      createTrue() {
        return "true";
      }
      createFalse() {
        return "false";
      }
      createFloat(val) {
        const fl = super.createFloat(val);
        if (utils.isNegativeZero(val)) {
          return "-0_1";
        }
        return `${fl}_1`;
      }
      createFloatSingle(a, b2, c, d) {
        const fl = super.createFloatSingle(a, b2, c, d);
        return `${fl}_2`;
      }
      createFloatDouble(a, b2, c, d, e, f, g, h) {
        const fl = super.createFloatDouble(a, b2, c, d, e, f, g, h);
        return `${fl}_3`;
      }
      createByteString(raw, len) {
        const val = raw.join(", ");
        if (len === -1) {
          return `(_ ${val})`;
        }
        return `h'${val}`;
      }
      createByteStringFromHeap(start, end) {
        const val = Buffer3.from(
          super.createByteStringFromHeap(start, end)
        ).toString("hex");
        return `h'${val}'`;
      }
      createInfinity() {
        return "Infinity_1";
      }
      createInfinityNeg() {
        return "-Infinity_1";
      }
      createNaN() {
        return "NaN_1";
      }
      createNaNNeg() {
        return "-NaN_1";
      }
      createNull() {
        return "null";
      }
      createUndefined() {
        return "undefined";
      }
      createSimpleUnassigned(val) {
        return `simple(${val})`;
      }
      createArray(arr, len) {
        const val = super.createArray(arr, len);
        if (len === -1) {
          return `[_ ${val.join(", ")}]`;
        }
        return `[${val.join(", ")}]`;
      }
      createMap(map, len) {
        const val = super.createMap(map);
        const list = Array.from(val.keys()).reduce(collectObject(val), "");
        if (len === -1) {
          return `{_ ${list}}`;
        }
        return `{${list}}`;
      }
      createObject(obj, len) {
        const val = super.createObject(obj);
        const map = Object.keys(val).reduce(collectObject(val), "");
        if (len === -1) {
          return `{_ ${map}}`;
        }
        return `{${map}}`;
      }
      createUtf8String(raw, len) {
        const val = raw.join(", ");
        if (len === -1) {
          return `(_ ${val})`;
        }
        return `"${val}"`;
      }
      createUtf8StringFromHeap(start, end) {
        const val = Buffer3.from(
          super.createUtf8StringFromHeap(start, end)
        ).toString("utf8");
        return `"${val}"`;
      }
      static diagnose(input, enc) {
        if (typeof input === "string") {
          input = Buffer3.from(input, enc || "hex");
        }
        const dec = new _Diagnose();
        return dec.decodeFirst(input);
      }
    };
    module2.exports = Diagnose;
    function collectObject(val) {
      return (acc, key) => {
        if (acc) {
          return `${acc}, ${key}: ${val[key]}`;
        }
        return `${key}: ${val[key]}`;
      };
    }
  }
});

// node_modules/borc/src/encoder.js
var require_encoder = __commonJS({
  "node_modules/borc/src/encoder.js"(exports2, module2) {
    "use strict";
    var { Buffer: Buffer3 } = require_buffer2();
    var { URL: URL2 } = require_iso_url();
    var Bignumber = require_bignumber().BigNumber;
    var utils = require_utils();
    var constants = require_constants();
    var MT = constants.MT;
    var NUMBYTES = constants.NUMBYTES;
    var SHIFT32 = constants.SHIFT32;
    var SYMS = constants.SYMS;
    var TAG = constants.TAG;
    var HALF = constants.MT.SIMPLE_FLOAT << 5 | constants.NUMBYTES.TWO;
    var FLOAT = constants.MT.SIMPLE_FLOAT << 5 | constants.NUMBYTES.FOUR;
    var DOUBLE = constants.MT.SIMPLE_FLOAT << 5 | constants.NUMBYTES.EIGHT;
    var TRUE = constants.MT.SIMPLE_FLOAT << 5 | constants.SIMPLE.TRUE;
    var FALSE = constants.MT.SIMPLE_FLOAT << 5 | constants.SIMPLE.FALSE;
    var UNDEFINED = constants.MT.SIMPLE_FLOAT << 5 | constants.SIMPLE.UNDEFINED;
    var NULL = constants.MT.SIMPLE_FLOAT << 5 | constants.SIMPLE.NULL;
    var MAXINT_BN = new Bignumber("0x20000000000000");
    var BUF_NAN = Buffer3.from("f97e00", "hex");
    var BUF_INF_NEG = Buffer3.from("f9fc00", "hex");
    var BUF_INF_POS = Buffer3.from("f97c00", "hex");
    function toType(obj) {
      return {}.toString.call(obj).slice(8, -1);
    }
    var Encoder = class _Encoder {
      /**
       * @param {Object} [options={}]
       * @param {function(Buffer)} options.stream
       */
      constructor(options) {
        options = options || {};
        this.streaming = typeof options.stream === "function";
        this.onData = options.stream;
        this.semanticTypes = [
          [URL2, this._pushUrl],
          [Bignumber, this._pushBigNumber]
        ];
        const addTypes = options.genTypes || [];
        const len = addTypes.length;
        for (let i = 0; i < len; i++) {
          this.addSemanticType(
            addTypes[i][0],
            addTypes[i][1]
          );
        }
        this._reset();
      }
      addSemanticType(type, fun) {
        const len = this.semanticTypes.length;
        for (let i = 0; i < len; i++) {
          const typ = this.semanticTypes[i][0];
          if (typ === type) {
            const old = this.semanticTypes[i][1];
            this.semanticTypes[i][1] = fun;
            return old;
          }
        }
        this.semanticTypes.push([type, fun]);
        return null;
      }
      push(val) {
        if (!val) {
          return true;
        }
        this.result[this.offset] = val;
        this.resultMethod[this.offset] = 0;
        this.resultLength[this.offset] = val.length;
        this.offset++;
        if (this.streaming) {
          this.onData(this.finalize());
        }
        return true;
      }
      pushWrite(val, method2, len) {
        this.result[this.offset] = val;
        this.resultMethod[this.offset] = method2;
        this.resultLength[this.offset] = len;
        this.offset++;
        if (this.streaming) {
          this.onData(this.finalize());
        }
        return true;
      }
      _pushUInt8(val) {
        return this.pushWrite(val, 1, 1);
      }
      _pushUInt16BE(val) {
        return this.pushWrite(val, 2, 2);
      }
      _pushUInt32BE(val) {
        return this.pushWrite(val, 3, 4);
      }
      _pushDoubleBE(val) {
        return this.pushWrite(val, 4, 8);
      }
      _pushNaN() {
        return this.push(BUF_NAN);
      }
      _pushInfinity(obj) {
        const half = obj < 0 ? BUF_INF_NEG : BUF_INF_POS;
        return this.push(half);
      }
      _pushFloat(obj) {
        const b2 = Buffer3.allocUnsafe(2);
        if (utils.writeHalf(b2, obj)) {
          if (utils.parseHalf(b2) === obj) {
            return this._pushUInt8(HALF) && this.push(b2);
          }
        }
        const b4 = Buffer3.allocUnsafe(4);
        b4.writeFloatBE(obj, 0);
        if (b4.readFloatBE(0) === obj) {
          return this._pushUInt8(FLOAT) && this.push(b4);
        }
        return this._pushUInt8(DOUBLE) && this._pushDoubleBE(obj);
      }
      _pushInt(obj, mt, orig) {
        const m2 = mt << 5;
        if (obj < 24) {
          return this._pushUInt8(m2 | obj);
        }
        if (obj <= 255) {
          return this._pushUInt8(m2 | NUMBYTES.ONE) && this._pushUInt8(obj);
        }
        if (obj <= 65535) {
          return this._pushUInt8(m2 | NUMBYTES.TWO) && this._pushUInt16BE(obj);
        }
        if (obj <= 4294967295) {
          return this._pushUInt8(m2 | NUMBYTES.FOUR) && this._pushUInt32BE(obj);
        }
        if (obj <= Number.MAX_SAFE_INTEGER) {
          return this._pushUInt8(m2 | NUMBYTES.EIGHT) && this._pushUInt32BE(Math.floor(obj / SHIFT32)) && this._pushUInt32BE(obj % SHIFT32);
        }
        if (mt === MT.NEG_INT) {
          return this._pushFloat(orig);
        }
        return this._pushFloat(obj);
      }
      _pushIntNum(obj) {
        if (obj < 0) {
          return this._pushInt(-obj - 1, MT.NEG_INT, obj);
        } else {
          return this._pushInt(obj, MT.POS_INT);
        }
      }
      _pushNumber(obj) {
        switch (false) {
          case obj === obj:
            return this._pushNaN(obj);
          case isFinite(obj):
            return this._pushInfinity(obj);
          case obj % 1 !== 0:
            return this._pushIntNum(obj);
          default:
            return this._pushFloat(obj);
        }
      }
      _pushString(obj) {
        const len = Buffer3.byteLength(obj, "utf8");
        return this._pushInt(len, MT.UTF8_STRING) && this.pushWrite(obj, 5, len);
      }
      _pushBoolean(obj) {
        return this._pushUInt8(obj ? TRUE : FALSE);
      }
      _pushUndefined(obj) {
        return this._pushUInt8(UNDEFINED);
      }
      _pushArray(gen, obj) {
        const len = obj.length;
        if (!gen._pushInt(len, MT.ARRAY)) {
          return false;
        }
        for (let j2 = 0; j2 < len; j2++) {
          if (!gen.pushAny(obj[j2])) {
            return false;
          }
        }
        return true;
      }
      _pushTag(tag) {
        return this._pushInt(tag, MT.TAG);
      }
      _pushDate(gen, obj) {
        return gen._pushTag(TAG.DATE_EPOCH) && gen.pushAny(Math.round(obj / 1e3));
      }
      _pushBuffer(gen, obj) {
        return gen._pushInt(obj.length, MT.BYTE_STRING) && gen.push(obj);
      }
      _pushNoFilter(gen, obj) {
        return gen._pushBuffer(gen, obj.slice());
      }
      _pushRegexp(gen, obj) {
        return gen._pushTag(TAG.REGEXP) && gen.pushAny(obj.source);
      }
      _pushSet(gen, obj) {
        if (!gen._pushInt(obj.size, MT.ARRAY)) {
          return false;
        }
        for (const x2 of obj) {
          if (!gen.pushAny(x2)) {
            return false;
          }
        }
        return true;
      }
      _pushUrl(gen, obj) {
        return gen._pushTag(TAG.URI) && gen.pushAny(obj.format());
      }
      _pushBigint(obj) {
        let tag = TAG.POS_BIGINT;
        if (obj.isNegative()) {
          obj = obj.negated().minus(1);
          tag = TAG.NEG_BIGINT;
        }
        let str = obj.toString(16);
        if (str.length % 2) {
          str = "0" + str;
        }
        const buf = Buffer3.from(str, "hex");
        return this._pushTag(tag) && this._pushBuffer(this, buf);
      }
      _pushBigNumber(gen, obj) {
        if (obj.isNaN()) {
          return gen._pushNaN();
        }
        if (!obj.isFinite()) {
          return gen._pushInfinity(obj.isNegative() ? -Infinity : Infinity);
        }
        if (obj.isInteger()) {
          return gen._pushBigint(obj);
        }
        if (!(gen._pushTag(TAG.DECIMAL_FRAC) && gen._pushInt(2, MT.ARRAY))) {
          return false;
        }
        const dec = obj.decimalPlaces();
        const slide = obj.multipliedBy(new Bignumber(10).pow(dec));
        if (!gen._pushIntNum(-dec)) {
          return false;
        }
        if (slide.abs().isLessThan(MAXINT_BN)) {
          return gen._pushIntNum(slide.toNumber());
        } else {
          return gen._pushBigint(slide);
        }
      }
      _pushMap(gen, obj) {
        if (!gen._pushInt(obj.size, MT.MAP)) {
          return false;
        }
        return this._pushRawMap(
          obj.size,
          Array.from(obj)
        );
      }
      _pushObject(obj) {
        if (!obj) {
          return this._pushUInt8(NULL);
        }
        var len = this.semanticTypes.length;
        for (var i = 0; i < len; i++) {
          if (obj instanceof this.semanticTypes[i][0]) {
            return this.semanticTypes[i][1].call(obj, this, obj);
          }
        }
        var f = obj.encodeCBOR;
        if (typeof f === "function") {
          return f.call(obj, this);
        }
        var keys = Object.keys(obj);
        var keyLength = keys.length;
        if (!this._pushInt(keyLength, MT.MAP)) {
          return false;
        }
        return this._pushRawMap(
          keyLength,
          keys.map((k2) => [k2, obj[k2]])
        );
      }
      _pushRawMap(len, map) {
        map = map.map(function(a) {
          a[0] = _Encoder.encode(a[0]);
          return a;
        }).sort(utils.keySorter);
        for (var j2 = 0; j2 < len; j2++) {
          if (!this.push(map[j2][0])) {
            return false;
          }
          if (!this.pushAny(map[j2][1])) {
            return false;
          }
        }
        return true;
      }
      /**
       * Alias for `.pushAny`
       *
       * @param {*} obj
       * @returns {boolean} true on success
       */
      write(obj) {
        return this.pushAny(obj);
      }
      /**
       * Push any supported type onto the encoded stream
       *
       * @param {any} obj
       * @returns {boolean} true on success
       */
      pushAny(obj) {
        var typ = toType(obj);
        switch (typ) {
          case "Number":
            return this._pushNumber(obj);
          case "String":
            return this._pushString(obj);
          case "Boolean":
            return this._pushBoolean(obj);
          case "Object":
            return this._pushObject(obj);
          case "Array":
            return this._pushArray(this, obj);
          case "Uint8Array":
            return this._pushBuffer(this, Buffer3.isBuffer(obj) ? obj : Buffer3.from(obj));
          case "Null":
            return this._pushUInt8(NULL);
          case "Undefined":
            return this._pushUndefined(obj);
          case "Map":
            return this._pushMap(this, obj);
          case "Set":
            return this._pushSet(this, obj);
          case "URL":
            return this._pushUrl(this, obj);
          case "BigNumber":
            return this._pushBigNumber(this, obj);
          case "Date":
            return this._pushDate(this, obj);
          case "RegExp":
            return this._pushRegexp(this, obj);
          case "Symbol":
            switch (obj) {
              case SYMS.NULL:
                return this._pushObject(null);
              case SYMS.UNDEFINED:
                return this._pushUndefined(void 0);
              default:
                throw new Error("Unknown symbol: " + obj.toString());
            }
          default:
            throw new Error("Unknown type: " + typeof obj + ", " + (obj ? obj.toString() : ""));
        }
      }
      finalize() {
        if (this.offset === 0) {
          return null;
        }
        var result = this.result;
        var resultLength = this.resultLength;
        var resultMethod = this.resultMethod;
        var offset = this.offset;
        var size = 0;
        var i = 0;
        for (; i < offset; i++) {
          size += resultLength[i];
        }
        var res = Buffer3.allocUnsafe(size);
        var index = 0;
        var length = 0;
        for (i = 0; i < offset; i++) {
          length = resultLength[i];
          switch (resultMethod[i]) {
            case 0:
              result[i].copy(res, index);
              break;
            case 1:
              res.writeUInt8(result[i], index, true);
              break;
            case 2:
              res.writeUInt16BE(result[i], index, true);
              break;
            case 3:
              res.writeUInt32BE(result[i], index, true);
              break;
            case 4:
              res.writeDoubleBE(result[i], index, true);
              break;
            case 5:
              res.write(result[i], index, length, "utf8");
              break;
            default:
              throw new Error("unkown method");
          }
          index += length;
        }
        var tmp = res;
        this._reset();
        return tmp;
      }
      _reset() {
        this.result = [];
        this.resultMethod = [];
        this.resultLength = [];
        this.offset = 0;
      }
      /**
       * Encode the given value
       * @param {*} o
       * @returns {Buffer}
       */
      static encode(o) {
        const enc = new _Encoder();
        const ret = enc.pushAny(o);
        if (!ret) {
          throw new Error("Failed to encode input");
        }
        return enc.finalize();
      }
    };
    module2.exports = Encoder;
  }
});

// node_modules/borc/src/index.js
var require_src = __commonJS({
  "node_modules/borc/src/index.js"(exports2) {
    "use strict";
    exports2.Diagnose = require_diagnose();
    exports2.Decoder = require_decoder();
    exports2.Encoder = require_encoder();
    exports2.Simple = require_simple();
    exports2.Tagged = require_tagged();
    exports2.decodeAll = exports2.Decoder.decodeAll;
    exports2.decodeFirst = exports2.Decoder.decodeFirst;
    exports2.diagnose = exports2.Diagnose.diagnose;
    exports2.encode = exports2.Encoder.encode;
    exports2.decode = exports2.Decoder.decode;
    exports2.leveldb = {
      decode: exports2.Decoder.decodeAll,
      encode: exports2.Encoder.encode,
      buffer: true,
      name: "cbor"
    };
  }
});

// node_modules/@dfinity/agent/lib/esm/utils/buffer.js
function concat2(...buffers) {
  const result = new Uint8Array(buffers.reduce((acc, curr) => acc + curr.byteLength, 0));
  let index = 0;
  for (const b2 of buffers) {
    result.set(new Uint8Array(b2), index);
    index += b2.byteLength;
  }
  return result.buffer;
}
function toHex(buffer) {
  return [...new Uint8Array(buffer)].map((x2) => x2.toString(16).padStart(2, "0")).join("");
}
function fromHex(hex) {
  if (!hexRe.test(hex)) {
    throw new Error("Invalid hexadecimal string.");
  }
  const buffer = [...hex].reduce((acc, curr, i) => {
    acc[i / 2 | 0] = (acc[i / 2 | 0] || "") + curr;
    return acc;
  }, []).map((x2) => Number.parseInt(x2, 16));
  return new Uint8Array(buffer).buffer;
}
function compare(b1, b2) {
  if (b1.byteLength !== b2.byteLength) {
    return b1.byteLength - b2.byteLength;
  }
  const u1 = new Uint8Array(b1);
  const u2 = new Uint8Array(b2);
  for (let i = 0; i < u1.length; i++) {
    if (u1[i] !== u2[i]) {
      return u1[i] - u2[i];
    }
  }
  return 0;
}
function bufEquals(b1, b2) {
  return compare(b1, b2) === 0;
}
function uint8ToBuf2(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength).buffer;
}
function bufFromBufLike2(bufLike) {
  if (bufLike instanceof Uint8Array) {
    return uint8ToBuf2(bufLike);
  }
  if (bufLike instanceof ArrayBuffer) {
    return bufLike;
  }
  if ("buffer" in bufLike) {
    return bufLike.buffer;
  }
  return new Uint8Array(bufLike);
}
var hexRe;
var init_buffer2 = __esm({
  "node_modules/@dfinity/agent/lib/esm/utils/buffer.js"() {
    hexRe = new RegExp(/^[0-9a-fA-F]+$/);
  }
});

// node_modules/@dfinity/agent/lib/esm/request_id.js
function hash(data) {
  return uint8ToBuf2(sha256.create().update(new Uint8Array(data)).digest());
}
function hashValue(value4) {
  if (value4 instanceof import_borc.default.Tagged) {
    return hashValue(value4.value);
  } else if (typeof value4 === "string") {
    return hashString(value4);
  } else if (typeof value4 === "number") {
    return hash(lebEncode(value4));
  } else if (value4 instanceof ArrayBuffer || ArrayBuffer.isView(value4)) {
    return hash(value4);
  } else if (Array.isArray(value4)) {
    const vals = value4.map(hashValue);
    return hash(concat2(...vals));
  } else if (value4 && typeof value4 === "object" && value4._isPrincipal) {
    return hash(value4.toUint8Array());
  } else if (typeof value4 === "object" && value4 !== null && typeof value4.toHash === "function") {
    return hashValue(value4.toHash());
  } else if (typeof value4 === "object") {
    return hashOfMap(value4);
  } else if (typeof value4 === "bigint") {
    return hash(lebEncode(value4));
  }
  throw Object.assign(new Error(`Attempt to hash a value of unsupported type: ${value4}`), {
    // include so logs/callers can understand the confusing value.
    // (when stringified in error message, prototype info is lost)
    value: value4
  });
}
function requestIdOf(request2) {
  return hashOfMap(request2);
}
function hashOfMap(map) {
  const hashed = Object.entries(map).filter(([, value4]) => value4 !== void 0).map(([key, value4]) => {
    const hashedKey = hashString(key);
    const hashedValue = hashValue(value4);
    return [hashedKey, hashedValue];
  });
  const traversed = hashed;
  const sorted = traversed.sort(([k1], [k2]) => {
    return compare(k1, k2);
  });
  const concatenated = concat2(...sorted.map((x2) => concat2(...x2)));
  const result = hash(concatenated);
  return result;
}
var import_borc, hashString;
var init_request_id = __esm({
  "node_modules/@dfinity/agent/lib/esm/request_id.js"() {
    init_esm2();
    import_borc = __toESM(require_src());
    init_sha256();
    init_buffer2();
    hashString = (value4) => {
      const encoded = new TextEncoder().encode(value4);
      return hash(encoded);
    };
  }
});

// node_modules/simple-cbor/src/value.js
var require_value = __commonJS({
  "node_modules/simple-cbor/src/value.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var MAX_U64_NUMBER = 9007199254740992;
    function _concat(a, ...args) {
      const newBuffer = new Uint8Array(a.byteLength + args.reduce((acc, b2) => acc + b2.byteLength, 0));
      newBuffer.set(new Uint8Array(a), 0);
      let i = a.byteLength;
      for (const b2 of args) {
        newBuffer.set(new Uint8Array(b2), i);
        i += b2.byteLength;
      }
      return newBuffer.buffer;
    }
    function _serializeValue(major, minor, value4) {
      value4 = value4.replace(/[^0-9a-fA-F]/g, "");
      const length = 2 ** (minor - 24);
      value4 = value4.slice(-length * 2).padStart(length * 2, "0");
      const bytes3 = [(major << 5) + minor].concat(value4.match(/../g).map((byte) => parseInt(byte, 16)));
      return new Uint8Array(bytes3).buffer;
    }
    function _serializeNumber(major, value4) {
      if (value4 < 24) {
        return new Uint8Array([(major << 5) + value4]).buffer;
      } else {
        const minor = value4 <= 255 ? 24 : value4 <= 65535 ? 25 : value4 <= 4294967295 ? 26 : 27;
        return _serializeValue(major, minor, value4.toString(16));
      }
    }
    function _serializeString(str) {
      const utf8 = [];
      for (let i = 0; i < str.length; i++) {
        let charcode = str.charCodeAt(i);
        if (charcode < 128) {
          utf8.push(charcode);
        } else if (charcode < 2048) {
          utf8.push(192 | charcode >> 6, 128 | charcode & 63);
        } else if (charcode < 55296 || charcode >= 57344) {
          utf8.push(224 | charcode >> 12, 128 | charcode >> 6 & 63, 128 | charcode & 63);
        } else {
          i++;
          charcode = (charcode & 1023) << 10 | str.charCodeAt(i) & 1023;
          utf8.push(240 | charcode >> 18, 128 | charcode >> 12 & 63, 128 | charcode >> 6 & 63, 128 | charcode & 63);
        }
      }
      return _concat(new Uint8Array(_serializeNumber(3, str.length)), new Uint8Array(utf8));
    }
    function tagged(tag, value4) {
      if (tag == 14277111) {
        return _concat(new Uint8Array([217, 217, 247]), value4);
      }
      if (tag < 24) {
        return _concat(new Uint8Array([(6 << 5) + tag]), value4);
      } else {
        const minor = tag <= 255 ? 24 : tag <= 65535 ? 25 : tag <= 4294967295 ? 26 : 27;
        const length = 2 ** (minor - 24);
        const value5 = tag.toString(16).slice(-length * 2).padStart(length * 2, "0");
        const bytes3 = [(6 << 5) + minor].concat(value5.match(/../g).map((byte) => parseInt(byte, 16)));
        return new Uint8Array(bytes3).buffer;
      }
    }
    exports2.tagged = tagged;
    function raw(bytes3) {
      return new Uint8Array(bytes3).buffer;
    }
    exports2.raw = raw;
    function uSmall(n) {
      if (isNaN(n)) {
        throw new RangeError("Invalid number.");
      }
      n = Math.min(Math.max(0, n), 23);
      const bytes3 = [(0 << 5) + n];
      return new Uint8Array(bytes3).buffer;
    }
    exports2.uSmall = uSmall;
    function u8(u82, radix) {
      u82 = parseInt("" + u82, radix);
      if (isNaN(u82)) {
        throw new RangeError("Invalid number.");
      }
      u82 = Math.min(Math.max(0, u82), 255);
      u82 = u82.toString(16);
      return _serializeValue(0, 24, u82);
    }
    exports2.u8 = u8;
    function u16(u162, radix) {
      u162 = parseInt("" + u162, radix);
      if (isNaN(u162)) {
        throw new RangeError("Invalid number.");
      }
      u162 = Math.min(Math.max(0, u162), 65535);
      u162 = u162.toString(16);
      return _serializeValue(0, 25, u162);
    }
    exports2.u16 = u16;
    function u32(u322, radix) {
      u322 = parseInt("" + u322, radix);
      if (isNaN(u322)) {
        throw new RangeError("Invalid number.");
      }
      u322 = Math.min(Math.max(0, u322), 4294967295);
      u322 = u322.toString(16);
      return _serializeValue(0, 26, u322);
    }
    exports2.u32 = u32;
    function u642(u643, radix) {
      if (typeof u643 == "string" && radix == 16) {
        if (u643.match(/[^0-9a-fA-F]/)) {
          throw new RangeError("Invalid number.");
        }
        return _serializeValue(0, 27, u643);
      }
      u643 = parseInt("" + u643, radix);
      if (isNaN(u643)) {
        throw new RangeError("Invalid number.");
      }
      u643 = Math.min(Math.max(0, u643), MAX_U64_NUMBER);
      u643 = u643.toString(16);
      return _serializeValue(0, 27, u643);
    }
    exports2.u64 = u642;
    function iSmall(n) {
      if (isNaN(n)) {
        throw new RangeError("Invalid number.");
      }
      if (n === 0) {
        return uSmall(0);
      }
      n = Math.min(Math.max(0, -n), 24) - 1;
      const bytes3 = [(1 << 5) + n];
      return new Uint8Array(bytes3).buffer;
    }
    exports2.iSmall = iSmall;
    function i8(i82, radix) {
      i82 = parseInt("" + i82, radix);
      if (isNaN(i82)) {
        throw new RangeError("Invalid number.");
      }
      i82 = Math.min(Math.max(0, -i82 - 1), 255);
      i82 = i82.toString(16);
      return _serializeValue(1, 24, i82);
    }
    exports2.i8 = i8;
    function i16(i162, radix) {
      i162 = parseInt("" + i162, radix);
      if (isNaN(i162)) {
        throw new RangeError("Invalid number.");
      }
      i162 = Math.min(Math.max(0, -i162 - 1), 65535);
      i162 = i162.toString(16);
      return _serializeValue(1, 25, i162);
    }
    exports2.i16 = i16;
    function i32(i322, radix) {
      i322 = parseInt("" + i322, radix);
      if (isNaN(i322)) {
        throw new RangeError("Invalid number.");
      }
      i322 = Math.min(Math.max(0, -i322 - 1), 4294967295);
      i322 = i322.toString(16);
      return _serializeValue(1, 26, i322);
    }
    exports2.i32 = i32;
    function i64(i642, radix) {
      if (typeof i642 == "string" && radix == 16) {
        if (i642.startsWith("-")) {
          i642 = i642.slice(1);
        } else {
          i642 = "0";
        }
        if (i642.match(/[^0-9a-fA-F]/) || i642.length > 16) {
          throw new RangeError("Invalid number.");
        }
        let done = false;
        let newI64 = i642.split("").reduceRight((acc, x2) => {
          if (done) {
            return x2 + acc;
          }
          let n = parseInt(x2, 16) - 1;
          if (n >= 0) {
            done = true;
            return n.toString(16) + acc;
          } else {
            return "f" + acc;
          }
        }, "");
        if (!done) {
          return u642(0);
        }
        return _serializeValue(1, 27, newI64);
      }
      i642 = parseInt("" + i642, radix);
      if (isNaN(i642)) {
        throw new RangeError("Invalid number.");
      }
      i642 = Math.min(Math.max(0, -i642 - 1), 9007199254740992);
      i642 = i642.toString(16);
      return _serializeValue(1, 27, i642);
    }
    exports2.i64 = i64;
    function number(n) {
      if (n >= 0) {
        if (n < 24) {
          return uSmall(n);
        } else if (n <= 255) {
          return u8(n);
        } else if (n <= 65535) {
          return u16(n);
        } else if (n <= 4294967295) {
          return u32(n);
        } else {
          return u642(n);
        }
      } else {
        if (n >= -24) {
          return iSmall(n);
        } else if (n >= -255) {
          return i8(n);
        } else if (n >= -65535) {
          return i16(n);
        } else if (n >= -4294967295) {
          return i32(n);
        } else {
          return i64(n);
        }
      }
    }
    exports2.number = number;
    function bytes2(bytes3) {
      return _concat(_serializeNumber(2, bytes3.byteLength), bytes3);
    }
    exports2.bytes = bytes2;
    function string(str) {
      return _serializeString(str);
    }
    exports2.string = string;
    function array(items) {
      return _concat(_serializeNumber(4, items.length), ...items);
    }
    exports2.array = array;
    function map(items, stable = false) {
      if (!(items instanceof Map)) {
        items = new Map(Object.entries(items));
      }
      let entries = Array.from(items.entries());
      if (stable) {
        entries = entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
      }
      return _concat(_serializeNumber(5, items.size), ...entries.map(([k2, v2]) => _concat(_serializeString(k2), v2)));
    }
    exports2.map = map;
    function singleFloat(f) {
      const single = new Float32Array([f]);
      return _concat(new Uint8Array([(7 << 5) + 26]), new Uint8Array(single.buffer));
    }
    exports2.singleFloat = singleFloat;
    function doubleFloat(f) {
      const single = new Float64Array([f]);
      return _concat(new Uint8Array([(7 << 5) + 27]), new Uint8Array(single.buffer));
    }
    exports2.doubleFloat = doubleFloat;
    function bool(v2) {
      return v2 ? true_() : false_();
    }
    exports2.bool = bool;
    function true_() {
      return raw(new Uint8Array([(7 << 5) + 21]));
    }
    exports2.true_ = true_;
    function false_() {
      return raw(new Uint8Array([(7 << 5) + 20]));
    }
    exports2.false_ = false_;
    function null_() {
      return raw(new Uint8Array([(7 << 5) + 22]));
    }
    exports2.null_ = null_;
    function undefined_() {
      return raw(new Uint8Array([(7 << 5) + 23]));
    }
    exports2.undefined_ = undefined_;
  }
});

// node_modules/simple-cbor/src/serializer.js
var require_serializer = __commonJS({
  "node_modules/simple-cbor/src/serializer.js"(exports2) {
    "use strict";
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k2 in mod2)
          if (Object.hasOwnProperty.call(mod2, k2))
            result[k2] = mod2[k2];
      }
      result["default"] = mod2;
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cbor4 = __importStar(require_value());
    var BufferClasses = [
      ArrayBuffer,
      Uint8Array,
      Uint16Array,
      Uint32Array,
      Int8Array,
      Int16Array,
      Int32Array,
      Float32Array,
      Float64Array
    ];
    var JsonDefaultCborEncoder = class {
      // @param _serializer The CBOR Serializer to use.
      // @param _stable Whether or not keys from objects should be sorted (stable). This is
      //     particularly useful when testing encodings between JSON objects.
      constructor(_serializer, _stable = false) {
        this._serializer = _serializer;
        this._stable = _stable;
        this.name = "jsonDefault";
        this.priority = -100;
      }
      match(value4) {
        return ["undefined", "boolean", "number", "string", "object"].indexOf(typeof value4) != -1;
      }
      encode(value4) {
        switch (typeof value4) {
          case "undefined":
            return cbor4.undefined_();
          case "boolean":
            return cbor4.bool(value4);
          case "number":
            if (Math.floor(value4) === value4) {
              return cbor4.number(value4);
            } else {
              return cbor4.doubleFloat(value4);
            }
          case "string":
            return cbor4.string(value4);
          case "object":
            if (value4 === null) {
              return cbor4.null_();
            } else if (Array.isArray(value4)) {
              return cbor4.array(value4.map((x2) => this._serializer.serializeValue(x2)));
            } else if (BufferClasses.find((x2) => value4 instanceof x2)) {
              return cbor4.bytes(value4.buffer);
            } else if (Object.getOwnPropertyNames(value4).indexOf("toJSON") !== -1) {
              return this.encode(value4.toJSON());
            } else if (value4 instanceof Map) {
              const m2 = /* @__PURE__ */ new Map();
              for (const [key, item] of value4.entries()) {
                m2.set(key, this._serializer.serializeValue(item));
              }
              return cbor4.map(m2, this._stable);
            } else {
              const m2 = /* @__PURE__ */ new Map();
              for (const [key, item] of Object.entries(value4)) {
                m2.set(key, this._serializer.serializeValue(item));
              }
              return cbor4.map(m2, this._stable);
            }
          default:
            throw new Error("Invalid value.");
        }
      }
    };
    exports2.JsonDefaultCborEncoder = JsonDefaultCborEncoder;
    var ToCborEncoder = class {
      constructor() {
        this.name = "cborEncoder";
        this.priority = -90;
      }
      match(value4) {
        return typeof value4 == "object" && typeof value4["toCBOR"] == "function";
      }
      encode(value4) {
        return value4.toCBOR();
      }
    };
    exports2.ToCborEncoder = ToCborEncoder;
    var CborSerializer = class {
      constructor() {
        this._encoders = /* @__PURE__ */ new Set();
      }
      static withDefaultEncoders(stable = false) {
        const s = new this();
        s.addEncoder(new JsonDefaultCborEncoder(s, stable));
        s.addEncoder(new ToCborEncoder());
        return s;
      }
      removeEncoder(name) {
        for (const encoder of this._encoders.values()) {
          if (encoder.name == name) {
            this._encoders.delete(encoder);
          }
        }
      }
      addEncoder(encoder) {
        this._encoders.add(encoder);
      }
      getEncoderFor(value4) {
        let chosenEncoder = null;
        for (const encoder of this._encoders) {
          if (!chosenEncoder || encoder.priority > chosenEncoder.priority) {
            if (encoder.match(value4)) {
              chosenEncoder = encoder;
            }
          }
        }
        if (chosenEncoder === null) {
          throw new Error("Could not find an encoder for value.");
        }
        return chosenEncoder;
      }
      serializeValue(value4) {
        return this.getEncoderFor(value4).encode(value4);
      }
      serialize(value4) {
        return this.serializeValue(value4);
      }
    };
    exports2.CborSerializer = CborSerializer;
    var SelfDescribeCborSerializer2 = class extends CborSerializer {
      serialize(value4) {
        return cbor4.raw(new Uint8Array([
          // Self describe CBOR.
          ...new Uint8Array([217, 217, 247]),
          ...new Uint8Array(super.serializeValue(value4))
        ]));
      }
    };
    exports2.SelfDescribeCborSerializer = SelfDescribeCborSerializer2;
  }
});

// node_modules/simple-cbor/src/index.js
var require_src2 = __commonJS({
  "node_modules/simple-cbor/src/index.js"(exports2) {
    "use strict";
    function __export2(m2) {
      for (var p in m2)
        if (!exports2.hasOwnProperty(p))
          exports2[p] = m2[p];
    }
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k2 in mod2)
          if (Object.hasOwnProperty.call(mod2, k2))
            result[k2] = mod2[k2];
      }
      result["default"] = mod2;
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __export2(require_serializer());
    var value4 = __importStar(require_value());
    exports2.value = value4;
  }
});

// node_modules/@dfinity/agent/lib/esm/cbor.js
function encode3(value4) {
  return serializer.serialize(value4);
}
function decodePositiveBigInt(buf) {
  const len = buf.byteLength;
  let res = BigInt(0);
  for (let i = 0; i < len; i++) {
    res = res * BigInt(256) + BigInt(buf[i]);
  }
  return res;
}
function decode3(input) {
  const buffer = new Uint8Array(input);
  const decoder = new Uint8ArrayDecoder({
    size: buffer.byteLength,
    tags: {
      // Override tags 2 and 3 for BigInt support (borc supports only BigNumber).
      2: (val) => decodePositiveBigInt(val),
      3: (val) => -decodePositiveBigInt(val),
      [CborTag.Semantic]: (value4) => value4
    }
  });
  return decoder.decodeFirst(buffer);
}
var import_borc2, cbor, import_simple_cbor, PrincipalEncoder, BufferEncoder, BigIntEncoder, serializer, CborTag, Uint8ArrayDecoder;
var init_cbor = __esm({
  "node_modules/@dfinity/agent/lib/esm/cbor.js"() {
    import_borc2 = __toESM(require_src());
    cbor = __toESM(require_src2());
    import_simple_cbor = __toESM(require_src2());
    init_buffer2();
    PrincipalEncoder = class {
      get name() {
        return "Principal";
      }
      get priority() {
        return 0;
      }
      match(value4) {
        return value4 && value4._isPrincipal === true;
      }
      encode(v2) {
        return cbor.value.bytes(v2.toUint8Array());
      }
    };
    BufferEncoder = class {
      get name() {
        return "Buffer";
      }
      get priority() {
        return 1;
      }
      match(value4) {
        return value4 instanceof ArrayBuffer || ArrayBuffer.isView(value4);
      }
      encode(v2) {
        return cbor.value.bytes(new Uint8Array(v2));
      }
    };
    BigIntEncoder = class {
      get name() {
        return "BigInt";
      }
      get priority() {
        return 1;
      }
      match(value4) {
        return typeof value4 === `bigint`;
      }
      encode(v2) {
        if (v2 > BigInt(0)) {
          return cbor.value.tagged(2, cbor.value.bytes(fromHex(v2.toString(16))));
        } else {
          return cbor.value.tagged(3, cbor.value.bytes(fromHex((BigInt("-1") * v2).toString(16))));
        }
      }
    };
    serializer = import_simple_cbor.SelfDescribeCborSerializer.withDefaultEncoders(true);
    serializer.addEncoder(new PrincipalEncoder());
    serializer.addEncoder(new BufferEncoder());
    serializer.addEncoder(new BigIntEncoder());
    (function(CborTag2) {
      CborTag2[CborTag2["Uint64LittleEndian"] = 71] = "Uint64LittleEndian";
      CborTag2[CborTag2["Semantic"] = 55799] = "Semantic";
    })(CborTag || (CborTag = {}));
    Uint8ArrayDecoder = class extends import_borc2.default.Decoder {
      createByteString(raw) {
        return concat2(...raw);
      }
      createByteStringFromHeap(start, end) {
        if (start === end) {
          return new ArrayBuffer(0);
        }
        return new Uint8Array(this._heap.slice(start, end));
      }
    };
  }
});

// node_modules/base64-arraybuffer/lib/base64-arraybuffer.js
var require_base64_arraybuffer = __commonJS({
  "node_modules/base64-arraybuffer/lib/base64-arraybuffer.js"(exports2) {
    (function() {
      "use strict";
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var lookup = new Uint8Array(256);
      for (var i = 0; i < chars.length; i++) {
        lookup[chars.charCodeAt(i)] = i;
      }
      exports2.encode = function(arraybuffer) {
        var bytes2 = new Uint8Array(arraybuffer), i2, len = bytes2.length, base64 = "";
        for (i2 = 0; i2 < len; i2 += 3) {
          base64 += chars[bytes2[i2] >> 2];
          base64 += chars[(bytes2[i2] & 3) << 4 | bytes2[i2 + 1] >> 4];
          base64 += chars[(bytes2[i2 + 1] & 15) << 2 | bytes2[i2 + 2] >> 6];
          base64 += chars[bytes2[i2 + 2] & 63];
        }
        if (len % 3 === 2) {
          base64 = base64.substring(0, base64.length - 1) + "=";
        } else if (len % 3 === 1) {
          base64 = base64.substring(0, base64.length - 2) + "==";
        }
        return base64;
      };
      exports2.decode = function(base64) {
        var bufferLength = base64.length * 0.75, len = base64.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
        if (base64[base64.length - 1] === "=") {
          bufferLength--;
          if (base64[base64.length - 2] === "=") {
            bufferLength--;
          }
        }
        var arraybuffer = new ArrayBuffer(bufferLength), bytes2 = new Uint8Array(arraybuffer);
        for (i2 = 0; i2 < len; i2 += 4) {
          encoded1 = lookup[base64.charCodeAt(i2)];
          encoded2 = lookup[base64.charCodeAt(i2 + 1)];
          encoded3 = lookup[base64.charCodeAt(i2 + 2)];
          encoded4 = lookup[base64.charCodeAt(i2 + 3)];
          bytes2[p++] = encoded1 << 2 | encoded2 >> 4;
          bytes2[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
          bytes2[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
        }
        return arraybuffer;
      };
    })();
  }
});

// node_modules/@dfinity/agent/lib/esm/vendor/bls/wasm.js
var wasmBytesBase64;
var init_wasm = __esm({
  "node_modules/@dfinity/agent/lib/esm/vendor/bls/wasm.js"() {
    wasmBytesBase64 = `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akE4ENABGiACQbgDakEBNgIAIAJBwANqQTgQ0AEaIAJB+ANqQQE2AgAgAkGABGpBOBDQARogAkEBNgK4BCACQcAEakE4ENABGiACQfgEakEBNgIAIAJBgAVqQTgQ0AEaIAJBuAVqQQE2AgAgAkHABWpBOBDQARogAkH4BWpBATYCACACQYAGakE4ENABGiACQQE2ArgGIAJBwAZqQTgQ0AEaIAJB+AZqQQE2AgAgAkGAB2pBOBDQARogAkG4B2pBATYCACACQcAHakE4ENABGiACQfgHakEBNgIAIAIgARAYAkAgASgCgAZBBEYNACAAKAKABkEERg0AIAJBgARqIgMgAEGAAmoQlgEgAyABQYACahAYDAYLIAJBwAxqIgdBOBDQARogAkEBNgL4DCACQYANakE4ENABGiACQbgNakEBNgIAIAJBgAhqIgRBOBDQARogAkEBNgK4CCACQcAIakE4ENABGiACQfgIakEBNgIAIAJBgApqIgMgAEGAA2oiBRBeIAQgAxCZASADIAFBgANqIgYQXiAEIAMQESAHELYBIAEoAoAGQQRHDQMMBAsgACABEAMMBgsgAkHADGoiAyABQYAFahBeIAJBgAxqIgQgA0HAABDRARogAkGABmogBBCnAQsgAkGABmoQZCACQYAIaiIDIAIQlgEgAxArIAJBgAJqIgQgAxCXASAGIAQQlgEgAkGABGoiByADEJYBIAMgABCWASADIAUQlwEgAxCwASACQYAKaiIEIAEQlgEgBCABQYAEahCXASAEELABIAMgBBAYIAcgAxCXASADIAUQlgECQCABKAKABkECRwRAIAJBwAxqIgMgAUGABWoQXiACQYAIaiADEKYBDAELIAJBwAxqIgMgAUGABWoQXiACQYAMaiIBIANBwAAQ0QEaIAJBgAhqIAEQpwELIAJBgAhqIgEQZCACQYAKaiIDIAEQlgEgAxArIAUgAkGABGoQlgEgBSADEJcBIAJBgAZqIgQgAxCXASABEGQgBiABEJcBIAQQsAEgBBBkIAAgAhCWASAAIAQQlwEMAwsgAkGACmoiAyAFEF4gAkHADGoiBCADEJkBIAMgAUGAAmoQXiAEIAMQEQsgACgCgAZBBEcEQCACQYAKaiIDIABBgAJqEF4gAkHADGoiBCADEJkBIAMgBhBeIAQgAxARCyACQYAEaiIDIAJBwAxqIAJBgAhqEKUBIAMQZAsgAkGACGoiAyAAEIwBIAJBgApqIgQgARCMASADIABBgAJqIgUQlwEgAxCwASAEIAFBgAJqIggQlwEgBBCwASACQYACaiIJIAMQlgEgCSAEEBggAyAFEJYBIAMgAEGABGoiBhCXASADELABIAQgCBCWASAEIAFBgARqIggQlwEgBBCwASACQYAGaiIHIAMQlgEgByAEEBggAyACEJYBIAMQKyAEIAJBgARqIgoQlgEgBBArIAkgAxCXASAFIAkQlgEgBSAEEJcBIAcgBBCXASAKIAMQlwEgAyAAEJYBIAMgBhCXASADELABIAQgARCWASAEIAgQlwEgBBCwASADIAQQGCAKIAMQlwEgAyAGEJYBIAMgCBAYIAQgAxCWASAEECsgBiAKEJYBIAYgBBCXASAHIAQQlwEgAxBkIAUgAxCXASAHELABIAcQZCAAIAIQlgEgACAHEJcBCyAAQQU2AoAGIAAQnQELIAJBwA1qJAALqAsBEX8jAEGAC2siAiQAIAJBCGoQZyACQcgBaiIKQTgQ0AEaIAJBATYCgAIgAkGIAmoiD0E4ENABGiACQQE2AsACIAJByAJqIhBBOBDQARogAkEBNgKAAyACQYgDaiIJQTgQ0AEaIAJBATYCwAMgAkHIA2oiDkE4ENABGiACQQE2AoAEIAJBiARqIhFBARA5IAJByARqIgtBOBDQARogAkEBNgKABSACQYgFaiIEQTgQ0AEaIAJBATYCwAUgAkHIBWoiBSABEJABIAJBiAZqIgNBOBDQARogAkEBNgLABiACQcgGaiIGQTgQ0AEaIAJBATYCgAcgAkGIB2oiDEE4ENABGiACQQE2AsAHIAJByAdqIghBOBDQARogAkEBNgKACCAFEFYhEiACQcgJaiINQZCCwAAQSSACQYgKaiIHIA0QjgEgCiAHEK4BIA1ByILAABBJIAcgDRCOASAPIAcQrgEgBRBMIAVBCxA0IAMgBRCuASADIBEQdyADEEIgAyAFEEogBCAKEK4BIAQgAxBKIAMgERB3IAJBiAZqEEIgAyAPEEogAxBDIAJBiAZqEEIgCSADEK4BIA4gBRCuASAOIAkQSiAIIAkQrgEgCBBMIAYgBBCuASAGEEwgAyAKEK4BIAMgBhBKIAggAxB3IAgQQiAIIAkQSiAGIAQQSiADIA8QrgEgAyAGEEogCCADEHcgAkHIB2oQQiADIAgQrgEgAyAEEEogAyAMEFohCiAEIAMQrgEgBCAMEDMgBCAIEEogCSAEEEogDiAEEEogBSABEEogBiAEEK4BIAYQTCAEIAYQrgEgBCAFEEogBSADEK4BIAVBCxA0IA1BgIPAABBJIAcgDRCOASAQIAcQrgEgECAMEEogCSAOQQEgCmsiARByIAYgBCABEHIgAyAFIAEQciAMIBAgARByIAcgAyAMECMgCyAHEK4BIAsgBhBKIAsQViEBIAMgCxCuASADEEMgAkGIBmoQQiALIAMgASAScxByIAdBuIPAABBJIAJBiAhqIAcQjgFBOCEBA0AgAUGgBUZFBEAgAkGICGoiAyACQYgDahBKIAJByAlqIgQgAUG4g8AAahBJIAFBOGohASACQYgKaiIFIAQQjgEgAkGIBmoiBCAFEK4BIAMgBBB3IAMQQgwBCwsgAkHICGoiASACQYgDahCQASACQcgJaiIDQdiIwAAQSSACQYgKaiIEIAMQjgEgAkGIBmoiAyAEEK4BIAEgAxB3IAEQQkEAIQEDQCABQfgDRkUEQCACQcgIaiIDIAJBiANqEEogAkHICWoiBCABQZCJwABqEEkgAUE4aiEBIAJBiApqIgUgBBCOASACQYgGaiIEIAUQrgEgAyAEEHcgAxBCDAELCyACQYgKaiIBQYiNwAAQSSACQYgJaiABEI4BQQAhAQNAIAFByAZGRQRAIAJBiAlqIgMgAkGIA2oQSiACQcgJaiIEIAFBwI3AAGoQSSABQThqIQEgAkGICmoiBSAEEI4BIAJBiAZqIgQgBRCuASADIAQQdyADEEIMAQsLIAJByAlqIgEgAkGIA2oQkAEgAkHICmoiA0GIlMAAEEkgAkGICmoiBCADEI4BIAJBiAZqIgMgBBCuASABIAMQdyABEEJBACEBA0AgAUGQBkYEQCACQYgJaiIDIAJByARqEEogAkGIBmoiASACQYgIahCuASABIAJByAlqIgQQSiACQQhqIgUgARCuASABIAMQrgEgASACQcgIaiIDEEogAkHIAGogARCuASABIAMQrgEgASAEEEogAkGIAWogARCuASAAIAVBwAEQ0QEaIAJBgAtqJAAFIAJByAlqIgMgAkGIA2oQSiACQcgKaiIEIAFBwJTAAGoQSSABQThqIQEgAkGICmoiBSAEEI4BIAJBiAZqIgQgBRCuASADIAQQdyADEEIMAQsLC/oGAQx/IwBBgAlrIgMkACADQYAIaiICIAAQXiADIAIQXiACIABBgAFqIgoQXiADQYABaiIEIAIQXiACIAEQXiADIAIQESACIAFBgAFqIgsQXiAEIAIQEQJAIAEoAoAGIgJBAkYgACgCgAYiBEECRnJFBEAgA0GACGoiAiAAQYAFahBeIANBgAJqIgQgAhBeIAIgAUGABWoQXiAEIAIQEQwBCyACQQJGIARBAkZxRQRAIAJBAkYEQCADQYAIaiICIABBgAVqEF4gA0GAAmoiBCACEF4gAiABQYAFahBeIANBgAdqIgUgAkHAABDRARogBCAFEKoBDAILIANBgAhqIgIgAUGABWoQXiADQYACaiIEIAIQXiACIABBgAVqEF4gA0GAB2oiBSACQcAAENEBGiAEIAUQqgEMAQsgA0GACGoiAiAAQYAFahBeIANBgAdqIgQgAkHAABDRARogA0GABmoiBSAEEJABIAIgAUGABWoQXiAEIAJBwAAQ0QEaIAUgBBBKIANBgAJqQTgQ0AEiAkEBNgI4IAJBQGtBOBDQASACQfgAakEBNgIAIAIgBRCuARDBAQsgA0GACGoiAiAAEF4gA0GAA2oiBCACEF4gAiABEF4gA0GABGoiBSACEF4gAiAKEF4gBCACEJoBIAQQqQEgAiALEF4gBSACEJoBIAUQqQEgA0GABWoiByAEEF4gByAFEBEgA0GABmoiBiADEF4gBiADQYABaiIIEJoBIAYQNiAHIAYQmgEgAiAAEF4gBCACEJkBIAIgAEGABWoiDBBeIAQgAhCaASAEEKkBIAIgARBeIAUgAhCZASACIAFBgAVqIg0QXiAFIAIQmgEgBRCpASADQYAHaiIJIAQQXiAJIAUQESAGIAMQmQEgBiADQYACaiIBEJoBIAYQNiAJIAYQmgEgAiAKEF4gBCACEJkBIAIgDBBeIAQgAhCaASAEEKkBIAIgCxBeIAUgAhCZASACIA0QXiAFIAIQmgEgBRCpASACIAQQXiACIAUQESAGIAgQmQEgBiABEJoBIAYQNiACIAYQmgEgCBB8IAMgCBCaASAAIAMgBxClASABEHwgARCpASAAQYACaiIEQYABaiABEJkBIAQQtgEgAhCpASACEHwgAEGABGoiASACIAkQpQEgABCwASABELABIABBBDYCgAYgA0GACWokAAuHBwEFfyAAENUBIgAgABDLASICENIBIQECQAJAAkAgABDMAQ0AIAAoAgAhAwJAIAAQxAFFBEAgAiADaiECIAAgAxDTASIAQfS+wAAoAgBHDQEgASgCBEEDcUEDRw0CQey+wAAgAjYCACAAIAIgARCDAQ8LIAIgA2pBEGohAAwCCyADQYACTwRAIAAQFwwBCyAAQQxqKAIAIgQgAEEIaigCACIFRwRAIAUgBDYCDCAEIAU2AggMAQtB3LvAAEHcu8AAKAIAQX4gA0EDdndxNgIACwJAIAEQvAEEQCAAIAIgARCDAQwBCwJAAkACQEH4vsAAKAIAIAFHBEAgAUH0vsAAKAIARw0BQfS+wAAgADYCAEHsvsAAQey+wAAoAgAgAmoiATYCACAAIAEQoAEPC0H4vsAAIAA2AgBB8L7AAEHwvsAAKAIAIAJqIgE2AgAgACABQQFyNgIEIABB9L7AACgCAEYNAQwCCyABEMsBIgMgAmohAgJAIANBgAJPBEAgARAXDAELIAFBDGooAgAiBCABQQhqKAIAIgFHBEAgASAENgIMIAQgATYCCAwBC0Hcu8AAQdy7wAAoAgBBfiADQQN2d3E2AgALIAAgAhCgASAAQfS+wAAoAgBHDQJB7L7AACACNgIADAMLQey+wABBADYCAEH0vsAAQQA2AgALQZS/wAAoAgAgAU8NAUGAgHxBCEEIEKMBQRRBCBCjAWpBEEEIEKMBamtBd3FBA2siAEEAQRBBCBCjAUECdGsiASAAIAFJG0UNAUH4vsAAKAIARQ0BQQhBCBCjASEAQRRBCBCjASEBQRBBCBCjASECQQACQEHwvsAAKAIAIgQgAiABIABBCGtqaiICTQ0AQfi+wAAoAgAhAUGEv8AAIQACQANAIAEgACgCAE8EQCAAEMYBIAFLDQILIAAoAggiAA0AC0EAIQALIAAQzQENACAAQQxqKAIAGgwAC0EAEBlrRw0BQfC+wAAoAgBBlL/AACgCAE0NAUGUv8AAQX82AgAPCyACQYACSQ0BIAAgAhAWQZy/wABBnL/AACgCAEEBayIANgIAIAANABAZGg8LDwsgAkEDdiIDQQN0QeS7wABqIQECf0Hcu8AAKAIAIgJBASADdCIDcQRAIAEoAggMAQtB3LvAACACIANyNgIAIAELIQMgASAANgIIIAMgADYCDCAAIAE2AgwgACADNgIIC4kHAgV+EH8jAEGQAmsiCSQAIABB6AAQ0AEhEiAJQTBqIgBB4AEQ0AEaA0AgCEE4RgRAIAFBCGohFCACQQhqIRUgAiENIAEhE0EBIQsgCSkDMCIDIQYgCUE4aikDACIEIQcFIAlBIGogAiAIaikDACIDIANCP4cgASAIaikDACIDIANCP4cQLyAAIAlBKGopAwA3AwggACAJKQMgNwMAIABBEGohACAIQQhqIQgMAQsLA0AgEiAQQQN0aiADQv//////////A4M3AwAgBEIGhiADQjqIhCEDIARCOochBAJAAkACQCALQQdGBEBBByEKQQAhDkEGIQsMAQsgECALQQF2IgBrIQwgDSAAQQN0IhFrIRYgEyARayEXIAQgCUEwaiALQQR0aiIKQQhqKQMAIAd8IAopAwAiBCAGfCIGIARUrXwiB3wgAyAGfCIDIAZUrXwhBCALQQFqIQ9BMCEIIBQhCiAVIQ4DQCAAIAtPDQMgCCARRg0CIAxBB0kEQCAJQRBqIAggFmpBMGspAwAgDiARaikDAH0iBSAFQj+HIAogEWopAwAgCCAXakEwaykDAH0iBSAFQj+HEC8gCSkDECIFIAN8IgMgBVStIAlBGGopAwAgBHx8IQQgAEEBaiEAIAxBAWshDCAKQQhqIQogDkEIaiEOIAhBCGshCAwBCwsgDEEHQdSbwAAQOwALA0ACQCAKQQ1HBEAgCyAKQQF2Ig1rIQwgDiANQQN0IgBrIQggAEEIaiEAIAQgByAKQQR0IAlqQUBqIg9BCGopAwB9IAYgDykDACIEVK19Igd8IAYgBH0iBiADfCIDIAZUrXwhBCAKQQFqIQ8DQCANQQVLDQIgDEEGTQRAIAkgAiAIakEwaikDACAAIAJqKQMAfSIFIAVCP4cgACABaikDACABIAhqQTBqKQMAfSIFIAVCP4cQLyAJKQMAIgUgA3wiAyAFVK0gCUEIaikDACAEfHwhBCANQQFqIQ0gCEEIayEIIAxBAWshDCAAQQhqIQAMAQsLIAxBB0Hkm8AAEDsACyASIAM3A2ggCUGQAmokAA8LIBIgCkEDdGogA0L//////////wODNwMAIARCBoYgA0I6iIQhAyAOQQhqIQ4gC0EBaiELIARCOochBCAPIQoMAAsAC0EHQQdBxJvAABA7AAsgDUEIaiENIBNBCGohEyAQQQFqIRAgDyELDAALAAuqAwEBfyMAQdAGayIGJAAgBkHAABDQASIGQUBrQagCENABEEQDQCABBEAgBkFAa0EAEDwgAUEBayEBDAEFIAIEQCAGQUBrIAIgAxB0CwsLIAQEQCAGQUBrIAQgBRB0CyAGQZAGaiIDQgA3AAAgA0EYakIANwAAIANBEGpCADcAACADQQhqQgA3AAAgBkFAayIBKAIEIQQgASgCACEFQYABIQIDQCABIAIQPEEAIQIgASgCAEH/A3FBwANHDQALIAFB5ABqIAU2AgAgAUHgAGogBDYCACABEA9BACEEA0AgAkEgRgRAIAEQRAUgAiADaiABIAJBfHFqQQhqKAIAIARBf3NBGHF2OgAAIARBCGohBCACQQFqIQIMAQsLQQAhAQNAIAFBIEcEQCABIAZqIAZBkAZqIAFqLQAAOgAAIAFBAWohAQwBCwtBACEBAkACQANAAkAgAUEgRg0DIAFBwABGDQAgAUHAAEYNAiAAIAFqIAEgBmotAAA6AAAgAUEBaiEBDAELC0HAAEHAAEH8qsAAEDsAC0HAAEHAAEGMq8AAEDsACyAGQdAGaiQAC74EAQl/IwBBgAxrIgIkACACIAAQjAEgAkGAAmoiCUE4ENABGiACQQE2ArgCIAJBwAJqQTgQ0AEaIAJB+AJqQQE2AgAgAkGAA2pBOBDQARogAkG4A2pBATYCACACQcADakE4ENABGiACQfgDakEBNgIAIAJBgARqIgYgAEGAAmoiBxCMASACQYAGaiIFQTgQ0AEaIAJBATYCuAYgAkHABmpBOBDQARogAkH4BmpBATYCACACQYAHakE4ENABGiACQbgHakEBNgIAIAJBwAdqQTgQ0AEaIAJB+AdqQQE2AgAgAkGACGoiAyAAEIwBIAJBgApqIgQgARCMASACIAEQGCAGIAFBgAJqIggQGCADIAcQlwEgBCAIEJcBIAMQsAEgBBCwASAJIAMQlgEgCSAEEBggAyAHEJYBIAMgAEGABGoiChCXASAEIAgQlgEgBCABQYAEaiIIEJcBIAMQsAEgBBCwASAFIAMQlgEgBSAEEBggAyACEJYBIAMQKyAEIAYQlgEgBBArIAkgAxCXASAHIAkQlgEgByAEEJcBIAUgBBCXASAGIAMQlwEgAyAAEJYBIAMgChCXASADELABIAQgARCWASAEIAgQlwEgBBCwASADIAQQGCAGIAMQlwEgAyAKEJYBIAMgCBAYIAQgAxCWASAEECsgCiAGEJYBIAogBBCXASAFIAQQlwEgAxBkIAcgAxCXASAFELABIAUQZCAAIAIQlgEgACAFEJcBIABBBTYCgAYgABCdASACQYAMaiQAC4oEAQp/IwBBgAhrIgIkACACIAAQXiACIAEQESACQYABaiIHIABBgAFqIgkQXiAHIAFBgAFqIgQQESACQYACaiIGIABBgAJqIgoQXiAGIAFBgAJqIgsQESACQYADaiIIIAAQXiAIIAkQmgEgCBCpASACQYAEaiIFIAEQXiAFIAQQmgEgBRCpASAIIAUQESAFIAIQmQEgBSAHEJoBIAggBRB7IAgQqQEgBSAJEJkBIAUgChCaASAFEKkBIAJBgAVqIgMgBBBeIAMgCxCaASADEKkBIAUgAxARIAMgBxCZASADIAYQmgEgBSADEHsgBRCpASADIAAQmQEgAyAKEJoBIAMQqQEgAkGABmoiBCABEF4gBCALEJoBIAQQqQEgAyAEEBEgBCACEJkBIAQgBhCaASAEIAMQvwEgBBCpASADIAIQmQEgAyACEJoBIAIgAxCaASACEKkBIAZBDBCrASAGEHwgBhCpASACQYAHaiIBIAcQXiABIAYQmgEgARCpASAHIAYQeyAHEKkBIARBDBCrASAEEHwgBBCpASADIAQQmQEgAyAFEBEgBiAIEJkBIAYgBxARIAMgBhC/ASAEIAIQESAHIAEQESAEIAcQmgEgAiAIEBEgASAFEBEgASACEJoBIAAgAxCZASAAEKkBIAkgBBCZASAJEKkBIAogARCZASAKEKkBIAJBgAhqJAAL8gMBCn8jAEGABGsiAiQAIAIgABCQASACIAEQSiACQUBrIgYgAEFAayIJEJABIAYgAUFAayIEEEogAkGAAWoiByAAQYABaiIKEJABIAcgAUGAAWoiCxBKIAJBwAFqIgggABCQASAIIAkQdyAIEEIgAkGAAmoiBSABEJABIAUgBBB3IAUQQiAIIAUQSiAFIAIQrgEgBSAGEHcgCCAFEH4gAkHAAWoQQiAFIAkQrgEgBSAKEHcgAkGAAmoQQiACQcACaiIDIAQQkAEgAyALEHcgAxBCIAUgAxBKIAMgBhCuASADIAcQdyAFIAMQfiACQYACahBCIAMgABCuASADIAoQdyACQcACahBCIAJBgANqIgQgARCQASAEIAsQdyAEEEIgAyAEEEogBCACEK4BIAQgBxB3IAQgAxDCASACQYADahBCIAMgAhCuASADIAIQdyACIAMQdyACEEIgB0EMEDQgAkHAA2oiASAGEJABIAEgBxB3IAEQQiAGIAcQfiAGEEIgBEEMEDQgAyAEEK4BIAMgBRBKIAcgCBCuASAHIAYQSiADIAcQwgEgBCACEEogBiABEEogBCAGEHcgAiAIEEogASAFEEogASACEHcgACADEK4BIAAQQiAJIAQQrgEgCRBCIAogARCuASAKEEIgAkGABGokAAu/BQEJfyMAQYALayIHJAAgB0E4ENABIgVBATYCOCAFQUBrQTgQ0AEaIAVB+ABqQQE2AgAgBUGAAWpBOBDQARogBUG4AWpBATYCACAFQcABakE4ENABGiAFQfgBakEBNgIAIAVBgAJqIg1BOBDQARogBUEBNgK4AiAFQcACakE4ENABGiAFQfgCakEBNgIAIAVBgANqQTgQ0AEaIAVBuANqQQE2AgAgBUHAA2pBOBDQARogBUH4A2pBATYCACAFQYAEaiILQTgQ0AEaIAVBATYCuAQgBUHABGpBOBDQARogBUH4BGpBATYCACAFQYAFakE4ENABGiAFQbgFakEBNgIAIAVBwAVqQTgQ0AEaIAVB+AVqQQE2AgAgBUGABmoiCEE4ENABGiAFQQE2ArgGIAVBwAZqQTgQ0AEaIAVB+AZqQQE2AgAgBUGAB2oiCUE4ENABGiAFQQE2ArgHIAVBwAdqQTgQ0AEaIAVB+AdqQQE2AgAgBUGACGoiB0E4ENABGiAFQQE2ArgIIAVBwAhqQTgQ0AEaIAVB+AhqQQE2AgAjAEGAAmsiCiQAIApBgAFqIgYgARBeIAggBhCZASAGIAFBgAFqEF4gByAGEJkBIAYgAUGAAmoiDBBeIAogBhBeIAYgDBBeIAkgBhCZASAGIAJBgAFqIgwQXiAKIAYQESAGIAIQXiAJIAYQESAIIAkQeyAIEKkBIAcgChB7IAcQqQEgCiAIEJkBIAgQfCAIEKkBIAYgDBBeIAogBhARIAkgBxCZASAGIAIQXiAJIAYQESAJIAoQeyAJEKkBIAcQNiAHEKkBIAEgAhAIIApBgAJqJAAgByADEKoBIAggBBCqASAFQYAJaiIBIAggCRCVASAFIAEQlgEgASAHEKEBIAsgARCWASALEGQgACAFIA0gCxB1IABBAzYCgAYgBUGAC2okAAuJBQEIfyMAQYALayIFJAAgBUE4ENABIgRBATYCOCAEQUBrQTgQ0AEaIARB+ABqQQE2AgAgBEGAAWpBOBDQARogBEG4AWpBATYCACAEQcABakE4ENABGiAEQfgBakEBNgIAIARBgAJqIgtBOBDQARogBEEBNgK4AiAEQcACakE4ENABGiAEQfgCakEBNgIAIARBgANqQTgQ0AEaIARBuANqQQE2AgAgBEHAA2pBOBDQARogBEH4A2pBATYCACAEQYAEaiIKQTgQ0AEaIARBATYCuAQgBEHABGpBOBDQARogBEH4BGpBATYCACAEQYAFakE4ENABGiAEQbgFakEBNgIAIARBwAVqQTgQ0AEaIARB+AVqQQE2AgAgBEGABmoiBkE4ENABGiAEQQE2ArgGIARBwAZqQTgQ0AEaIARB+AZqQQE2AgAgBEGAB2oiBUE4ENABGiAEQQE2ArgHIARBwAdqQTgQ0AEaIARB+AdqQQE2AgAgBEGACGoiCEE4ENABGiAEQQE2ArgIIARBwAhqQTgQ0AEaIARB+AhqQQE2AgAjAEGAAmsiByQAIAdBgAFqIgkgARBeIAggCRCZASAJIAFBgAFqEF4gByAJEF4gCSABQYACahBeIAUgCRCZASAGIAcQmQEgBiAFEBEgCBAtIAcQLSAFEC0gBhC4ASAGEDYgBhCpASAGEHwgBhCpASAFQQwQqwEgCEEDEKsBIAUQfCAFEKkBIAUgBxB7IAUQqQEgARASIAdBgAJqJAAgCCACEKoBIAYgAxCqASAEQYAJaiIBIAYgBRCVASAEIAEQlgEgASAIEKEBIAogARCWASAKEGQgACAEIAsgChB1IABBAzYCgAYgBEGAC2okAAuBBQELfyMAQTBrIgIkACACQSRqQai1wAA2AgAgAkEDOgAoIAJCgICAgIAENwMIIAIgADYCICACQQA2AhggAkEANgIQAkACQAJAIAEoAggiCkUEQCABQRRqKAIAIgRFDQEgASgCACEDIAEoAhAhACAEQQFrQf////8BcUEBaiIHIQUDQCADQQRqKAIAIgQEQCACKAIgIAMoAgAgBCACKAIkKAIMEQUADQQLIAAoAgAgAkEIaiAAQQRqKAIAEQQADQMgAEEIaiEAIANBCGohAyAFQQFrIgUNAAsMAQsgAUEMaigCACIARQ0AIABBBXQhCyAAQQFrQf///z9xQQFqIQcgASgCACEDA0AgA0EEaigCACIABEAgAigCICADKAIAIAAgAigCJCgCDBEFAA0DCyACIAUgCmoiBEEcai0AADoAKCACIARBBGopAgBCIIk3AwggBEEYaigCACEGIAEoAhAhCEEAIQlBACEAAkACQAJAIARBFGooAgBBAWsOAgACAQsgBkEDdCAIaiIMKAIEQQ9HDQEgDCgCACgCACEGC0EBIQALIAIgBjYCFCACIAA2AhAgBEEQaigCACEAAkACQAJAIARBDGooAgBBAWsOAgACAQsgAEEDdCAIaiIGKAIEQQ9HDQEgBigCACgCACEAC0EBIQkLIAIgADYCHCACIAk2AhggCCAEKAIAQQN0aiIAKAIAIAJBCGogACgCBBEEAA0CIANBCGohAyALIAVBIGoiBUcNAAsLQQAhACAHIAEoAgRJIgNFDQEgAigCICABKAIAIAdBA3RqQQAgAxsiASgCACABKAIEIAIoAiQoAgwRBQBFDQELQQEhAAsgAkEwaiQAIAAL1wQBBH8gACABENIBIQICQAJAAkAgABDMAQ0AIAAoAgAhAwJAIAAQxAFFBEAgASADaiEBIAAgAxDTASIAQfS+wAAoAgBHDQEgAigCBEEDcUEDRw0CQey+wAAgATYCACAAIAEgAhCDAQ8LIAEgA2pBEGohAAwCCyADQYACTwRAIAAQFwwBCyAAQQxqKAIAIgQgAEEIaigCACIFRwRAIAUgBDYCDCAEIAU2AggMAQtB3LvAAEHcu8AAKAIAQX4gA0EDdndxNgIACyACELwBBEAgACABIAIQgwEMAgsCQEH4vsAAKAIAIAJHBEAgAkH0vsAAKAIARw0BQfS+wAAgADYCAEHsvsAAQey+wAAoAgAgAWoiATYCACAAIAEQoAEPC0H4vsAAIAA2AgBB8L7AAEHwvsAAKAIAIAFqIgE2AgAgACABQQFyNgIEIABB9L7AACgCAEcNAUHsvsAAQQA2AgBB9L7AAEEANgIADwsgAhDLASIDIAFqIQECQCADQYACTwRAIAIQFwwBCyACQQxqKAIAIgQgAkEIaigCACICRwRAIAIgBDYCDCAEIAI2AggMAQtB3LvAAEHcu8AAKAIAQX4gA0EDdndxNgIACyAAIAEQoAEgAEH0vsAAKAIARw0BQey+wAAgATYCAAsPCyABQYACTwRAIAAgARAWDwsgAUEDdiICQQN0QeS7wABqIQECf0Hcu8AAKAIAIgNBASACdCICcQRAIAEoAggMAQtB3LvAACACIANyNgIAIAELIQIgASAANgIIIAIgADYCDCAAIAE2AgwgACACNgIIC+UDAQN/IwBB0CJrIgMkACADQcAWaiIEQcitwAAQSSADQcgcaiIFQYCuwAAQSSADQQhqIAQgBRBLIANBiAFqQTgQ0AEaIANBwAFqQTgQ0AEaIANB+AFqED0CQCACEIYBBEAgABBVDAELIANB+ARqIgQQPSAEIAEQfSAEEEcgA0H4B2oiARBnIAEgAhB4IAEQRiADQcgcaiICIAEQkAEgA0G4CWogAhCQASACIANBuAhqEJABIANB+AlqIAIQkAEgA0G4CmoiARA9IANBuA1qEFUgASAEEH0gA0HAE2oiARA9IAEgBBB9IAEQogEgA0HAAWogA0GIAWoQUEECayECA0AgAkEBakEBTQRAIANBuA1qIgEQngEgACABQYgGENEBGgUgA0G4DWoQGiADQcAWaiADQbgKaiADQbgJaiADQfgJahALAkACQAJAIANBwAFqIAIQUyADQYgBaiACEFNrQQFqDgMBAgACCyADQcgcaiIBIANBuApqIANB+ARqIANBuAlqIANB+AlqEAogA0HAFmogARADDAELIANByBxqIgEgA0G4CmogA0HAE2ogA0G4CWogA0H4CWoQCiADQcAWaiABEAMLIAJBAWshAiADQbgNaiADQcAWahABDAELCwsgA0HQImokAAvBAwEVfwNAIANBwAFGBEACQCAAQShqIQsgAEEUaigCACIMIQggAEEQaigCACINIQIgAEEMaigCACIOIQEgACgCCCIPIQMgAEEYaigCACIQIQogAEEcaigCACIRIQQgAEEgaigCACISIQcgAEEkaigCACITIQYDQCAHIQkgBCEHIAohBCAFQYACRg0BIAEgAnEhFCABIAJzIRUgBSALaigCACAFQcCiwABqKAIAIAkgBEF/c3EgBCAHcXIgBmogBEEadyAEQRV3cyAEQQd3c2pqaiIGIAhqIQogBUEEaiEFIAIhCCABIQIgAyIBQR53IAFBE3dzIAFBCndzIBQgASAVcXNqIAZqIQMgCSEGDAALAAsFIAAgA2oiAkHoAGogAkEoaigCACACQcwAaigCACACQeAAaigCACIBQQ93IAFBDXdzIAFBCnZzamogAkEsaigCACIBQRl3IAFBDndzIAFBA3ZzajYCACADQQRqIQMMAQsLIAAgBiATajYCJCAAIAkgEmo2AiAgACAHIBFqNgIcIAAgBCAQajYCGCAAIAggDGo2AhQgACACIA1qNgIQIAAgASAOajYCDCAAIAMgD2o2AggL5AEBAn8jAEGAA2siAyQAIAMQPSAAIAEgAkEfdSIEIAJzIARBf3NqQQJtIgJBAWtBH3YQbyAAIAFBgANqIAJBAXNBAWtBH3YQbyAAIAFBgAZqIAJBAnNBAWtBH3YQbyAAIAFBgAlqIAJBA3NBAWtBH3YQbyAAIAFBgAxqIAJBBHNBAWtBH3YQbyAAIAFBgA9qIAJBBXNBAWtBH3YQbyAAIAFBgBJqIAJBBnNBAWtBH3YQbyAAIAFBgBVqIAJBB3NBAWtBH3YQbyADIAAQfSADEKIBIAAgAyAEQQFxEG8gA0GAA2okAAvlAwEIfyMAQZAGayICJAAgAEFAayEIAkAgAUH4AGooAgAgASgCOGqsIABB+ABqKAIAIgcgACgCOCIEaqx+Qv///w9XDQAgBEEBSgR/IAAQHiAAKAJ4BSAHC0EBTA0AIAgQHgsgAkHYpMAAEEkgAkE4aiIHQfAAENABGiACIQNBACECA0AgAkE4RgRAAkAgB0E4aiEEQQAhAgNAIAJBOEYNASACIARqIAIgA2opAwA3AwAgAkEIaiECDAALAAsFIAIgB2pCADcDACACQQhqIQIMAQsLIANBqAFqIgYgABBdIANB4AFqIgUgARBdIANBmAJqIgIgACABEAUgA0GIA2oiBCAIIAFBQGsiARAFIAYgCBBgIAYQQiAFIAEQYCAFEEIgA0H4A2oiCSAGIAUQBUEAIQEgA0HoBGoiBkHwABDQASEFA0AgAUHwAEcEQCABIAVqIAEgAmopAwA3AwAgAUEIaiEBDAELCyAGIAQQYkEAIQEDQCABQfAARwRAIAEgBGoiBSABIAdqKQMAIAUpAwB9NwMAIAFBCGohAQwBCwsgAiAEEGIgAhBIIAkgBhBjIAkQSCADQdgFaiIBIAIQayAAIAEQaiAAQQM2AjggASAJEGsgCCABEGogAEECNgJ4IANBkAZqJAALowIBCH8jAEGABmsiAiQAIAIgAEGAAWoiBxBeIAJBgAFqIgQgBxBeIAQQLSACQYACaiIFIAIQXiAFIABBgAJqIgMQESACQYADaiIBIAMQXiABEC0gAyAEEJkBIAMgBBCaASADEKkBIAMQuAEgAxC4ASADEKkBIAFBDBCrASABEHwgARCpASACQYAEaiIIIAEQXiAIIAMQESACQYAFaiIGIAQQXiAGIAEQmgEgBhCpASADIAUQESAFIAEQmQEgBSABEJoBIAEgBRCaASABEKkBIAQgARB7IAQQqQEgBiAEEBEgBiAIEJoBIAUgABCZASAFIAIQESAAIAQQmQEgABCpASAAIAUQESAAELgBIAAQqQEgByAGEJkBIAcQqQEgAkGABmokAAu8AgEGfyMAQYAIayIBJAAgASAAEIwBIAFBgAJqIgMgAEGABGoiBRCMASABQYAEaiIEIABBgAJqIgYQjAEgAUGABmoiAkE4ENABGiABQQE2ArgGIAFBwAZqQTgQ0AEaIAFB+AZqQQE2AgAgAUGAB2pBOBDQARogAUG4B2pBATYCACABQcAHakE4ENABGiABQfgHakEBNgIAIAAQISACIAAQlgEgAiAAEJcBIAAgAhCXASAAELABIAEQyQEgARCzASAAIAEQlwEgAxAhIAMQZCACIAMQlgEgAiADEJcBIAMgAhCXASADELABIAQQISACIAQQlgEgAiAEEJcBIAQgAhCXASAEELABIAYQsgEgBhCzASAFEMkBIAUQswEgBiADEJcBIAUgBBCXASAAQQU2AoAGIAAQnAEgAUGACGokAAv/AQEHfyMAQcACayIBJAAgASAAQUBrIgYQkAEgARBMIAFBQGsiAyAGEJABIAMgAEGAAWoiAhBKIAFBgAFqIgQgAhCQASAEEEwgAiABEK4BIAIgARB3IAIQQiACEIIBIAIQggEgAhBCIARBDBA0IAFBwAFqIgcgBBCQASAHIAIQSiABQYACaiIFIAEQkAEgBSAEEHcgBRBCIAIgAxBKIAMgBBCuASADIAQQdyAEIAMQdyABIAQQfiABEEIgBSABEEogBSAHEHcgAyAAEK4BIAMgBhBKIAAgARCuASAAEEIgACADEEogABCCASAAEEIgBiAFEK4BIAYQQiABQcACaiQAC84CAgd/An4CQAJAAkBBDSABQTpuIgJrIgRBDU0EQEEMIAJrIgNBDk8NASAAIAAgA0EDdGopAwBBOiABIAJBOmxrIgNrrSIKhyAAIARBA3RqKQMAIAOtIgmGhDcDaCAEQQ1rIQUgAEHgAGohBCACQQFqIQZBACACQQN0ayEHQQshAwNAAkAgA0ECaiAGTQRAIAFBrAZPDQEgACACQQN0aiAAKQMAIAmGQv//////////A4M3AwADQCACRQ0HIABCADcDACACQQFrIQIgAEEIaiEADAALAAsgAyAFakEOTw0EIAQgBCAHaiIIQQhrKQMAIAqHIAgpAwAgCYZC//////////8Dg4Q3AwAgA0EBayEDIARBCGshBAwBCwsgAkEOQYCywAAQOwALIARBDkHQscAAEDsACyADQQ5B4LHAABA7AAtBf0EOQfCxwAAQOwALC6cCAQR/IABCADcCECAAAn9BACABQYACSQ0AGkEfIAFB////B0sNABogAUEGIAFBCHZnIgNrdkEBcSADQQF0a0E+agsiBDYCHCAEQQJ0Qey9wABqIQMgACECAkACQAJAAkBB4LvAACgCACIAQQEgBHQiBXEEQCADKAIAIQMgBBCfASEAIAMQywEgAUcNASADIQAMAgtB4LvAACAAIAVyNgIAIAMgAjYCAAwDCyABIAB0IQQDQCADIARBHXZBBHFqQRBqIgUoAgAiAEUNAiAEQQF0IQQgACIDEMsBIAFHDQALCyAAKAIIIgEgAjYCDCAAIAI2AgggAiAANgIMIAIgATYCCCACQQA2AhgPCyAFIAI2AgALIAIgAzYCGCACIAI2AgggAiACNgIMC7YCAQV/IAAoAhghBAJAAkAgACAAKAIMRgRAIABBFEEQIABBFGoiASgCACIDG2ooAgAiAg0BQQAhAQwCCyAAKAIIIgIgACgCDCIBNgIMIAEgAjYCCAwBCyABIABBEGogAxshAwNAIAMhBSACIgFBFGoiAygCACICRQRAIAFBEGohAyABKAIQIQILIAINAAsgBUEANgIACwJAIARFDQACQCAAIAAoAhxBAnRB7L3AAGoiAigCAEcEQCAEQRBBFCAEKAIQIABGG2ogATYCACABDQEMAgsgAiABNgIAIAENAEHgu8AAQeC7wAAoAgBBfiAAKAIcd3E2AgAPCyABIAQ2AhggACgCECICBEAgASACNgIQIAIgATYCGAsgAEEUaigCACIARQ0AIAFBFGogADYCACAAIAE2AhgLC+UBAQZ/IwBBgARrIgIkACACIAAQXiACQYABaiIFIABBgAFqIgYQXiACQYACaiIDQTgQ0AEaIAJBATYCuAIgAkHAAmpBOBDQARogAkH4AmpBATYCACACQYADaiIEIAYQXiACIAEQESAFIAFBgAFqIgcQESADIAcQmQEgAyABEJoBIAQgABCaASADEKkBIAQQqQEgBCADEBEgAyACEJkBIAMQNiAEIAMQmgEgBBCpASADIAUQmQEgAxA2IAYgBBCZASAGIAMQmgEgBRB8IAAgBRCZASAAIAIQmgEgABCwASACQYAEaiQAC28BDH9BjL/AACgCACICRQRAQZy/wABB/x82AgBBAA8LQYS/wAAhBgNAIAIiASgCCCECIAEoAgQhAyABKAIAIQQgAUEMaigCABogASEGIAVBAWohBSACDQALQZy/wAAgBUH/HyAFQf8fSxs2AgBBAAuAAgEGfyMAQYAIayIBJAAgACgCgAZBAUcEQCABIAAQjAEgAUGAAmoiAiAAQYACaiIEEIwBIAFBgARqIgUgAEGABGoiAxCMASABQYAGaiIGIAAQjAEgARAhIAIgAxAYIAIQswEgAhCwASAFECEgBiAEEBggBhCzASADIAAQlwEgAyAEEJcBIAMQsAEgAxAhIAAgARCWASABIAIQlwEgARCwASABIAUQlwEgASAGEJcBIAEQsAEgARArIAIQZCAFEGQgACACEJcBIAQgBRCWASAEIAYQlwEgAyABEJcBIABBBEEFIAAoAoAGQX5xQQJGGzYCgAYgABCdAQsgAUGACGokAAuZAgEBfyMAQYANayIDJAAgAyABEGkgAxCdASADQYgGaiIBIAIQXSABEEIgA0HABmoiAiABEF0gAkEDECkaIAIQQiADQfgGaiADEGkCQCACEFdFBEAgA0HABmoQKkECayECA0AgAkEBakEBTQRAIANB+AZqIgEQnAEMAwUgA0H4BmoQEwJAAkACQCADQcAGaiACEFMgA0GIBmogAhBTa0EBag4DAQIAAgsgA0H4BmogAxAHDAELIAMQngEgA0H4BmogAxAHIAMQngELIAJBAWshAgwBCwALAAsgA0H4BmoiARC3ASABQYABahC2ASABQYACahCxASABQYAEahCxASABQQE2AoAGCyAAIAFBiAYQ0QEaIANBgA1qJAALhgICBH8BfiMAQTBrIgIkACABQQRqIQQgASgCBEUEQCABKAIAIQMgAkEQaiIFQQA2AgAgAkIBNwMIIAIgAkEIajYCFCACQShqIANBEGopAgA3AwAgAkEgaiADQQhqKQIANwMAIAIgAykCADcDGCACQRRqIAJBGGoQDBogBEEIaiAFKAIANgIAIAQgAikDCDcCAAsgAkEgaiIDIARBCGooAgA2AgAgAUEMakEANgIAIAQpAgAhBiABQgE3AgQgAiAGNwMYQQxBBBC5ASIBRQRAQQxBBBDPAQALIAEgAikDGDcCACABQQhqIAMoAgA2AgAgAEGEt8AANgIEIAAgATYCACACQTBqJAAL5AEBAn8jAEHAAWsiAyQAIAMQZyAAIAEgAkEfdSIEIAJzIARBf3NqQQJtIgJBAWtBH3YQbiAAIAFBwAFqIAJBAXNBAWtBH3YQbiAAIAFBgANqIAJBAnNBAWtBH3YQbiAAIAFBwARqIAJBA3NBAWtBH3YQbiAAIAFBgAZqIAJBBHNBAWtBH3YQbiAAIAFBwAdqIAJBBXNBAWtBH3YQbiAAIAFBgAlqIAJBBnNBAWtBH3YQbiAAIAFBwApqIAJBB3NBAWtBH3YQbiADIAAQeCADEKQBIAAgAyAEQQFxEG4gA0HAAWokAAvDAwIGfwN+IwBB8ABrIgEkACABQcCywAAQSSABQThqIAEQXSAAEEICQAJAAkAgAQJ/IAAoAjgiAkEQTARAIAJBAWsQNQwBCyABKQMwIghCAXwiByAIVA0BIAApAzAiCEKAgICAgICAgIB/USAHQn9RcQ0CIAFBOGoiAiAIIAd/pxApIQcgASABKQNoIAdCOoZ8NwNoIAAgAhBhIAAQQkECCyIEECgDQCAERQ0DQQAhAyABIAEpAwgiCEI5hkKAgICAgICAgAKDIAEpAwBCAYeEIgc3AwAgACkDACAHfSEHIABBCGohBSAAIAFBOGoiAkEBA38gAiADaiAHQv//////////A4M3AwAgB0I6hyEHIANBKEYEfyABIAEpAzBCAYciCDcDMCACIAApAzAgCH0gB3wiBzcDMCAHQj+IpwUgASADaiIGQQhqIAhCAYcgBkEQaikDACIIQjmGQoCAgICAgICAAoOEIgk3AwAgAyAFaikDACAHfCAJfSEHIANBCGohAwwBCwtrEDAgBEEBayEEDAALAAtB4LPAAEEZQcSzwAAQWQALQYC0wABBH0HEs8AAEFkACyAAQQE2AjggAUHwAGokAAvuAQECfyMAQbABayIDJAAgA0EwENABIQMCQAJAA0AgAkEwRgRAIANBMGogAxBwIAFBMGohAUEAIQIDQCACQTBGDQMgAkEwRg0EIAIgA2ogASACai0AADoAACACQQFqIQIMAAsACyACQeAARwRAIAIgA2ogASACai0AADoAACACQQFqIQIMAQsLQeAAQeAAQYCmwAAQOwALIANB8ABqIgEgAxBwIABBOBDQASIAQQE2AjggAEFAa0E4ENABIABB+ABqQQE2AgAgACABEK4BIANBMGoQrgEgA0GwAWokAA8LIAJBMGpB4ABBkKbAABA7AAuPAgEDfyMAQSBrIgUkAEEBIQZB2LvAAEHYu8AAKAIAIgdBAWo2AgACQEGgv8AALQAABEBBpL/AACgCAEEBaiEGDAELQaC/wABBAToAAAtBpL/AACAGNgIAAkACQCAHQQBIIAZBAktyDQAgBSAEOgAYIAUgAzYCFCAFIAI2AhBBzLvAACgCACICQQBIDQBBzLvAACACQQFqIgI2AgBBzLvAAEHUu8AAKAIAIgMEf0HQu8AAKAIAIAUgACABKAIQEQAAIAUgBSkDADcDCCAFQQhqIAMoAhQRAABBzLvAACgCAAUgAgtBAWs2AgAgBkEBSw0AIAQNAQsACyMAQRBrIgIkACACIAE2AgwgAiAANgIIAAucAQEEfyMAQYADayICJAAgAiAAEF4gAkGAAWoiASAAQYABaiIEEF4gAkGAAmoiAyAAEF4gAyAEEBEgAiAEEJoBIAEQfCABIAAQmgEgAhCpASABEKkBIAAgAhCZASAAIAEQESABIAMQmQEgARB8IAEgAxCaASABEKkBIAEQNiAAIAEQmgEgAxC4ASAEIAMQmQEgABCwASACQYADaiQAC7kBAQJ/IwBBIGsiAyQAAkAgASABIAJqIgFLDQAgAEEEaigCACICQQF0IgQgASABIARJGyIBQQggAUEISxshAQJAIAIEQCADQRhqQQE2AgAgAyACNgIUIAMgACgCADYCEAwBCyADQQA2AhALIAMgASADQRBqECYgAygCAARAIANBCGooAgAiAEUNASADKAIEIAAQzwEACyADKAIEIQIgAEEEaiABNgIAIAAgAjYCACADQSBqJAAPCxBlAAusAQECfyMAQYADayIDJAAgA0EIaiABEJABAkAgAgRAIANBCGogAhCuAQwBCyADQQhqEDoLIANByABqIgJB8LTAABBJIANBgAFqIAIQjgEgA0HAAWoiAiADQQhqIgQQkAEgAhBMIAIgARBKIAAgARCQASAAIAQQSiADQYACaiACEJABIAAQViEBIANBwAJqIgIgABCQASACEEMgAhBCIAAgAiABEHIgA0GAA2okAAueAQEFfyMAQYABayICJAAgAkE4ENABIgJBATYCOCACQUBrIgNBOBDQARogAkEBNgJ4IAIgABCuASACIAFBgAFqIgUQSiADIAEQrgEgAyAAQYABaiIGEEoCQCACIAMQWEUNACACIABBQGsQrgEgAiAFEEogAkFAayIAIAFBQGsQrgEgACAGEEogAiAAEFhFDQBBASEECyACQYABaiQAIAQLpwEBA38jAEEwayICJAAgAUEEaiEDIAEoAgRFBEAgASgCACEBIAJBEGoiBEEANgIAIAJCATcDCCACIAJBCGo2AhQgAkEoaiABQRBqKQIANwMAIAJBIGogAUEIaikCADcDACACIAEpAgA3AxggAkEUaiACQRhqEAwaIANBCGogBCgCADYCACADIAIpAwg3AgALIABBhLfAADYCBCAAIAM2AgAgAkEwaiQAC5UBAQJ/AkACQAJAAkACfwJAAkACf0EBIgMgAUEASA0AGiACKAIAIgRFDQEgAigCBCICDQQgAQ0CQQEMAwshA0EAIQEMBgsgAQ0AQQEMAQsgAUEBELkBCyICRQ0BDAILIAQgARCsASICDQELIAAgATYCBEEBIQEMAQsgACACNgIEQQAhAwsgACADNgIAIABBCGogATYCAAvvMwISfwV+IwBBMGsiDiQAIA5BEGogACABEFsgDiAOKAIUIgA2AhwgDiAOKAIQIgg2AhggDkEIaiACIAMQWyAOIA4oAgwiATYCJCAOIA4oAggiAzYCICAOIAQgBRBbIA4gDigCBCIFNgIsIA4gDigCACINNgIoIAAhBCMAQZAVayICJAAjAEGwBmsiCiQAIApBEGpBOBDQARogCkHQAGpBOBDQASEVIApBiAFqQQE2AgAgCkEBNgJIIApBkAFqIgBB2KTAABBJIAAQKiEPIApByAFqIhNBgAIQ0AEaIApB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ABBJAkACQAJAAkADQAJAIAxBMEYEQCAAIAAtAABBH3E6AAAgAEHoAGogABC+ASAEDQFBAEEAQZiBwAAQOwALIAQgDEYNAiAAIAxqIAggDGotAAA6AAAgDEEBaiEMDAELC0EAIQwgCCwAACIJQQBIDQIgCEEwaiEDIARBMCAEQTBLG0EwayEIA0AgDEEwRgRAIABBoAFqIgQgABC+ASMAQYABayIDJAAgARBnIAEgAEHoAGoQwAEgAUFAayIIIAQQwAEgAUGAAWoQygEgARBCIAMgARBPIANBQGsiBCAIEJABIAQQTCAEIAMQWEUEQCABEJIBCyADQYABaiQADAULIAggDEYNAiAAIAxqIAMgDGotAAA6AAAgDEEBaiEMDAALAAsgBCAEQYiBwAAQOwALIAxBMGogBEGogcAAEDsACyMAQcABayIDJAAgAEGgAWoiBBBnIANBOBDQASIDQQE2AjggBCAAQegAahDAASAEEEIgBEGAAWoQygEgA0FAayIIIAQQTwJAAkACQCAIIAMQWkEBRgRAIANBgAFqIgggA0FAayADECMgCBBWDQEMAgsgBBCSAQwCCyADQYABaiIIEEMgCBBCCyAEQUBrIANBgAFqEK4BCyADQcABaiQAIAlBIHEiA0EAIABB4AFqEE0iBEEBRxtBASADIARBAUdyGwRAIABBoAFqEKQBCyABIABBoAFqQcABENEBGgsgAEHgAmokAAJ/QQAhAyMAQcAFayIAJAACQCABEIYBDQAgAEEIaiIIQZCtwAAQSSAAQYAEaiIEQbiuwAAQSSAAQUBrIgkgBBCOASAAQYABaiIEEGcgBCABEHggBCAJEEogAEHAAmoiBCABIAgQvQEgASAEECQNACAAQYAEaiIEIABBwAJqIgEgAEEIahC9ASABIARBwAEQ0QEaIAEQpAEgAEGAAWogARAkRQ0AQQEhAwsgAEHABWokAEF/IANFDQAaIAJBwAFqEKQBIAJBgANqIQhBACEAIwBB4ARrIgEkACABQeAAENABIQECQCAFBEADQCAAQeAARgRAIAEgAS0AAEEfcToAACABQeAAaiABEB9BACEAAkAgDSwAACILQQBOBEAgDUHgAGohAyAFQeAAIAVB4ABLG0HgAGshBANAIABB4ABGBEAgAUHgAWoiACABEB8gCCABQeAAaiAAED8MAwsgACAERwRA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AWoQmQEgACAEEBEgAEGAAWoiASAFQYABahCZASABIAgQESAAIAEQeg0BC0EADAELQQELIQEgAEGAAmokACANQcAHaiQAQX8gAUUNABojAEHgA2siACQAIABBgAFqIgFBwKjAABBJIABBuAFqIgNB+KjAABBJIAAgASADEEsgAEHwAmoiAUGwqcAAEEkgAEGoA2oiA0HoqcAAEEkgAEHwAWoiBCABIAMQSyACQYAGaiIBIAAgBBA/IABB4ANqJAAgAkGACWohByACQYADaiEIIwBBkDRrIgAkACAAQYAoaiIDQcitwAAQSSAAQYguaiIEQYCuwAAQSSAAIAMgBBBLIABBgAFqQTgQ0AEaIABBuAFqQTgQ0AEaIABB8AFqED0CQCACQcABaiIEEIYBRQRAIAIQhgEEQCAHIAEgBBAODAILIABB8ARqIgMQPSADIAEQfSADEEcgAEHwB2oiBRBnIAUgBBB4IAUQRiAAQbAJaiIEED0gBCAIEH0gBBBHIABBsAxqIggQZyAIIAIQeCAIEEYgAEGILmoiASAFEJABIABB8A1qIAEQkAEgASAAQbAIahCQASAAQbAOaiABEJABIAEgCBCQASAAQfAOaiABEJABIAEgAEHwDGoQkAEgAEGwD2ogARCQASAAQfAPaiIBED0gAEHwEmoiBRA9IABB8BVqEFUgASADEH0gBSAEEH0gAEH4G2oiARA9IAEgAxB9IAEQogEgAEH4HmoiARA9IAEgBBB9IAEQogEgAEG4AWogAEGAAWoQUEECayEBA0AgAUEBakEBTQRAIABB8BVqIgEQngEgByABQYgGENEBGgwDBSAAQfAVaiIEEBogAEH4IWoiAyAAQfAPaiAAQfANaiAAQbAOahALIABBgChqIgUgAEHwEmogAEHwDmogAEGwD2oQCyADIAUQAyAEIAMQAQJAAkACQCAAQbgBaiABEFMgAEGAAWogARBTa0EBag4DAQIAAgsgAEGILmoiAyAAQfAPaiAAQfAEaiAAQfANaiAAQbAOahAKIABB+CFqIgQgA0GIBhDRARogAyAAQfASaiAAQbAJaiAAQfAOaiAAQbAPahAKIAQgAxADIABB8BVqIAQQAQwBCyAAQYguaiIDIABB8A9qIABB+BtqIABB8A1qIABBsA5qEAogAEH4IWoiBCADQYgGENEBGiADIABB8BJqIABB+B5qIABB8A5qIABBsA9qEAogBCADEAMgAEHwFWogBBABCyABQQFrIQEMAQsACwALIAcgCCACEA4LIABBkDRqJAAjAEHgH2siCCQAIAhB0BNqIgFByK3AABBJIAhB2BlqIg1BgK7AABBJIAggASANEEsgCEGAAWoiC0GQrcAAEEkgAkGID2oiACAHEGkgCEG4AWoiBSAAEGkjAEGACGsiAyQAIAMgBRCMASADQYACaiIJIAVBgAJqIg8QjAEgA0GABGoiCiAFEIwBIANBgAZqIgRBOBDQARogA0EBNgK4BiADQcAGakE4ENABGiADQfgGakEBNgIAIANBgAdqQTgQ0AEaIANBuAdqQQE2AgAgA0HAB2pBOBDQARogA0H4B2pBATYCACAFEJ0BIAMQISAJIAVBgARqIgwQGCAJEGQgAyAJEHkgAxCwASAJIAwQlgEgCRAhIAkQZCAKIA8QGCAJIAoQeSAJELABIAogDxCWASAKECEgBCAFEJYBIAQgDBAYIAogBBB5IAoQsAEgBCAPEJYBIAQgChAYIAQQZCAFIAMQGCAEIAUQlwEgDCAJEBggDBBkIAQgDBCXASAEELABIwBBgAJrIgYkACAGIAQQXiAGQYABaiIQIARBgAFqIhIQXiAGEC0gEBAtIBAQfCAQEKkBIAYgEBB7IAYQPiAEIAYQESAGEDYgBhCpASASIAYQESAGQYACaiQAIAUgAxCWASAFIAQQGCAPIAkQlgEgDyAEEBggDCAKEJYBIAwgBBAYIAVBBTYCgAYgA0GACGokACAAEJ4BIAAgBRAHIAUgABBtIAAgCBAyIAAgCBAyIAAgBRAHIAhBwAdqIgQgABBpIAQQEyAEIAAQByANIAAgCxAbIAhByA1qIgMgDRBpIAMQngEgASAAEGkgARCeASAAIAMQbSAAIAEQByANIAAgCxAbIAMgDRBtIAMQngEgASAAEG0gARCeASAAIAMQbSAAIAEQByANIAAgCxAbIAMgDRBtIAMQngEgASAAEG0gASAIEDIgACADEG0gACABEAcgDSAAIAsQGyADIA0QbSANIAMgCxAbIAMgDRBtIAEgABBtIAEgCBAyIAEgCBAyIAMgARAHIAEgABBtIAEQngEgACADEG0gACABEAcgACAEEAcgABCcASAIQeAfaiQAIAcgAEGIBhDRARpBACEAIwBBgAJrIgEkACABEGwCQCAHIAEQegR/IAdBgAFqIAFBgAFqEHoFQQALRQ0AIAdBgAJqEIcBRQ0AIAdBgARqEIcBIQALIAFBgAJqJABBACAADQAaQX8LIAJBkBVqJAAgDkEoahC0ASAOQSBqELQBIA5BGGoQtAEgDkEwaiQAC58BAgJ/BX4gAEEwaiICKQMAIAFBP3GtIgSGIQUgACkDKCIGQTogAWtBP3GtIgiHIQdBBiEBA38gAiAFIAeENwMAIAFBAU0EfyAAIAApAwAgBIZC//////////8DgzcDACAAKQMwQiSHpwUgAUEBayEBIAJBEGsiA0EIaiECIAYgBIZC//////////8DgyEHIAMpAwAiBiAIhyEFDAELCxoLiAECA34DfyMAQRBrIgUkAAN+IAZBOEYEfiAFQRBqJAAgAwUgBSAAIAZqIgcpAwAiAiACQj+HIAGsIgIgAkI/hxAvIAcgBSkDACIEIAN8IgJC//////////8DgzcDACACIARUrSAFQQhqKQMAIANCP4d8fEIGhiACQjqIhCEDIAZBCGohBgwBCwsLigECA38BfiMAQUBqIgIkACACQQhqIgEgABBdIAEQQiACQThqIQFBBiEDQdwCIQACQAJAA0AgA0EATgRAIAEpAwAiBEIAUg0CIAFBCGshASAAQTprIQAgA0EBayEDDAELC0EAIQAMAQsDQCAEUA0BIABBAWohACAEQgJ/IQQMAAsACyACQUBrJAAgAAuHAQEDfyMAQYACayIBJAAgABCwASABIAAQXiABQYABaiICQTgQ0AEaIAFBATYCuAEgAUHAAWpBOBDQARogAUH4AWpBATYCACABIABBgAFqIgMQmgEgARA2IAIgARCZASACIAMQmgEgAyABEJkBIAMgABCaASAAIAIQmQEgABCwASABQYACaiQAC30CBH4BfyABQT9xrSECQTogAWtBP3GtIQRBACEBIAApAwAiBSEDA38gAUEwRgR/IAAgACkDMCAChzcDMCAFQn8gAoZCf4WDpwUgACABaiIGIAMgAocgBkEIaikDACIDIASGQv//////////A4OENwMAIAFBCGohAQwBCwsaC2kBBH8jAEHAAWsiASQAIAEgABCQASABQUBrIgIgABCQASABQYABaiIDIABBQGsiBBCQASABIAQQdyACIAAQdyACEEIgBCACEEogAxBDIAAgAxB3IAEQQiAAEEIgACABEEogAUHAAWokAAuCAQIBfwF+IABB8AAQ0AEhAANAIAJBOEYEQAJAIAAgASkDMCIDQjqHNwM4IAAgA0L//////////wODNwMwIABBQGshAEEAIQIDQCACQTBGDQEgACACakIANwMAIAJBCGohAgwACwALBSAAIAJqIAEgAmopAwA3AwAgAkEIaiECDAELCwtuAQZ+IAAgA0L/////D4MiBSABQv////8PgyIGfiIHIAUgAUIgiCIIfiIJIAYgA0IgiCIGfnwiBUIghnwiCjcDACAAIAcgClatIAYgCH4gBSAJVK1CIIYgBUIgiIR8fCABIAR+IAIgA358fDcDCAtqAgF/BX4gASkDCCAAKQMAhSIGQgGGQgGHIQdBACACa6whCAN+IANBOEYEfiAFBSAAIANqIgIgAikDACIEIAaFIAEgA2opAwAgBIUgCIOFIgQgB4U3AwAgBCAFhSEFIANBCGohAwwBCwsaC18CAX8EfkIBIQNBMCECA38gAkF4RgR/IARCAYYgA3ynQQFrBSABIAJqKQMAIgUgACACaikDACIGfUI6hyADgyAEhCEEIAJBCGshAiAFIAaFQgF9QjqHIAODIQMMAQsLC2kBBH8jAEGAAmsiAiQAIAIgARBeIAJBgAFqIgMgARBeIAIQLSADIAIQESAAIAMQmAEgAEGAAmoiBCADEJgBIABBgARqIgUgAxCYASAEIAEQpgEgBSACEKYBIABBBTYCgAYgAkGAAmokAAtiAQJ/IwBBQGoiAiQAIAAQQiACIAAQkAECQCABBEAgACABEK4BDAELIAAQOgtBACEBA0AgA0UEQCAAEExBASABQQFqIAFBAUYiAxshAQwBCwsgACACEEogABAeIAJBQGskAAtnAQJ/IwBBQGoiAyQAAkAgASABQR91IgJqIAJzIgIgACgCOGxBgICAEE4EQCADIAIQOSAAIAMQSgwBCyAAIAIQKRogACAAKAI4IAJsNgI4CyABQQBIBEAgABBDIAAQQgsgA0FAayQAC2cAIABBAXYgAHIiAEECdiAAciIAQQR2IAByIgBBCHYgAHIiAEEQdiAAciIAIABBAXZB1arVqgVxayIAQQJ2QbPmzJkDcSAAQbPmzJkDcWoiAEEEdiAAakGPnrz4AHFBgYKECGxBGHYLYQEDfyMAQYABayIBJAAgASAAEJABIAFBQGsiAkE4ENABGiABQQE2AnggASAAQUBrIgMQdyABEEMgAiABEK4BIAIgAxB3IAMgARCuASADIAAQdyAAIAIQrgEgAUGAAWokAAtVAgJ/AX4jAEHwAGsiASQAIAFBwLLAABBJIAApAwAhAyABQThqIgIgABBdIABBARAsIAIgARBgIAIQQiACQQEQLCAAIAIgA0ICgacQMCABQfAAaiQAC5gBAQZ/IwBBwAFrIgMkACAAIAEQXiAAEC0gA0GIAWoiBkHop8AAEEkjAEFAaiIEJAAgA0EIaiICQTgQ0AEiBUEBNgI4IAVBQGtBOBDQASAFQfgAakEBNgIAIAQgBhCOASAFIAQQrgEQwQEgBEFAayQAIAIQqQEgAhB8IAIQqQEgACABEBEgACACEJoBIAAQtQEgA0HAAWokAAtZAQJ/IwBBQGoiAyQAIABBOBDQASIAQQE2AjgCQCABQQBOBEAgACABEJMBDAELIANBCGoiAkHAssAAEEkgAiABEJMBIAIQQiAAIAIQagsgABBUIANBQGskAAu9CAEKfyMAQYABayIHJAAgB0EIaiIDQcCywAAQSSADQQEQlAECQAJAA0AgAUEwRgRAIANBMGogAykDMEIBhzcDACADQThqIQEDQCACRQ0EIAFCADcDACACQQFrIQIgAUEIaiEBDAALAAsgAUE4Rg0BIAFBOEcEQCABIANqIAEgA2oiBEEIaikDAEI5hkL//////////wODIAQpAwBCAYeENwMAIAVBAWohBSABQQhqIQEMAQsLQQdBB0GEm8AAEDsACyAFQQdB9JrAABA7AAsgA0EBEJQBIANBARAsIAdBQGshBUEAIQIjAEGgCmsiASQAIAFBOBDQASIBQUBrQTgQ0AEhBiABQYABakE4ENABGiABQcABakE4ENABGiABQYACakE4ENABGiABQcACakE4ENABGiABQYADakE4ENABGiABQcADakE4ENABGiABQYAEakE4ENABGiABQcAEakE4ENABGiABQYAFakE4ENABGiABQcAFakE4ENABGiABQYAGakE4ENABGiABQcAGakE4ENABGiABQYAHakE4ENABGiABQcAHakE4ENABGiABQfgHakEBNgIAIAFBuAdqQQE2AgAgAUH4BmpBATYCACABQbgGakEBNgIAIAFB+AVqQQE2AgAgAUG4BWpBATYCACABQfgEakEBNgIAIAFBuARqQQE2AgAgAUH4A2pBATYCACABQbgDakEBNgIAIAFB+AJqQQE2AgAgAUG4AmpBATYCACABQfgBakEBNgIAIAFBuAFqQQE2AgAgAUH4AGpBATYCACABQQE2AjggAUGBCGpB5wAQ0AEaIAFB6AhqIgQgABCQASAEEEIgAUGoCWoiBCADEF0gBBBCIAQQKkEDaiIIQQJ2IgNBAWohCQJAA0AgAiAJRgRAIAEQygEgBiABQegIahCuASABQeAJakE4ENABGiABQQE2ApgKQYB5IQIMAgsgAUGoCWoiBCAEQQQQjwEiChCUASAEEEIgAkHnAEcEQCABQYEIaiACaiAKOgAAIAFBqAlqQQQQLCACQQFqIQIMAQsLQecAQecAQaC0wAAQOwALA0AgAgRAIAFB4AlqIgQgASACaiIGQcAHahCuASAGQYAIaiIGIAQQrgEgBiABQegIahBKIAJBQGshAgwBCwsCQAJAAkACQCAIQZwDSQRAIAFBgQhqIANqLAAAIgJBEE8NASAFIAEgAkEGdGoQkAEgA0EBayICQeYASyEEA0AgAkF/Rg0DIAUQTCAFEEwgBRBMIAUQTCAEDQQgAUGBCGogAmotAAAiA0EQSQRAIAUgASADQQZ0ahBKIAJBAWshAgwBCwsgA0EYdEEYdUEQQeC0wAAQOwALIANB5wBBsLTAABA7AAsgAkEQQcC0wAAQOwALIAUQHiABQaAKaiQADAELIAJB5wBB0LTAABA7AAsgACAFEK4BIAdBgAFqJAALbAEBfyMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBHGpBAjYCACADQSxqQQE2AgAgA0ICNwIMIANB2LjAADYCCCADQQE2AiQgAyADQSBqNgIYIAMgAzYCKCADIANBBGo2AiAgA0EIaiACEGYAC2UBAn8gACAAKAIAIgJBCGoiAzYCACAAIAJBA3ZBPHFqQShqIgIgAUH/AXEgAigCAEEIdHI2AgACQAJAIANFBEAgAEEANgIAIAAgACgCBEEBajYCBAwBCyADQf8DcQ0BCyAAEA8LC1wAIABBOBDQASIAQQE2AjggAEFAa0E4ENABGiAAQfgAakEBNgIAIABBgAFqEFEgAEGAAmpBOBDQARogAEG4AmpBATYCACAAQcACakE4ENABGiAAQfgCakEBNgIAC1sBA38jAEGAAWsiASQAIAAQqQEgASAAEJABIAFBQGsiAiAAQUBrIgMQkAEgARBMIAIQTCABIAIQdyABQQAQMyAAIAEQSiABEEMgARBCIAMgARBKIAFBgAFqJAALYQEBfyMAQYACayIDJAAgABA9IAAgARCZASAAQYABaiIBIAIQmQEgAEGAAmoQtwEgABCpASADIAAQOCADQYABaiICIAEQXiACEC0gAiADEHpFBEAgABCbAQsgA0GAAmokAAtUAQF/IwBBIGsiAiQAIAIgACgCADYCBCACQRhqIAFBEGopAgA3AwAgAkEQaiABQQhqKQIANwMAIAIgASkCADcDCCACQQRqIAJBCGoQDCACQSBqJAALZwAjAEEwayIBJABBpLvAAC0AAARAIAFBHGpBATYCACABQgI3AgwgAUGQtsAANgIIIAFBATYCJCABIAA2AiwgASABQSBqNgIYIAEgAUEsajYCICABQQhqQbi2wAAQZgALIAFBMGokAAtiAgF+An8gACkDACEBA34gACACaiIDIAFC//////////8DgzcDACABQjqHIQEgAkEoRgR+IAAgACkDMCABfCIBNwMwIAFCJIcFIAJBCGohAiADQQhqKQMAIAF8IQEMAQsLGgt8AQV/IwBBQGoiAyQAIANBCGoiAkHAssAAEEkgAiAAKAI4QQFrEDUiBBAoA0AgAUE4RwRAIAAgAWoiBSABIAJqKQMAIAUpAwB9NwMAIAFBCGohAQwBCwsgAEEBIARBAWp0IgI2AjggAkH///8PSgRAIAAQHgsgA0FAayQAC3sBAn8gAEEoaiECA0AgAUGAAkYEQCAAQufMp9DW0Ouzu383AgggAEIANwIAIABBIGpCq7OP/JGjs/DbADcCACAAQRhqQv+kuYjFkdqCm383AgAgAEEQakLy5rvjo6f9p6V/NwIABSABIAJqQQA2AgAgAUEEaiEBDAELCwtUACAAQTgQ0AEiAEEBNgI4IABBQGtBOBDQARogAEH4AGpBATYCACAAQYABakE4ENABGiAAQbgBakEBNgIAIABBwAFqQTgQ0AEaIABB+AFqQQE2AgALWAECfyMAQUBqIgEkAAJAIAAQhgENACABQQEQOSAAQYABaiICIAEQWA0AIAJBABAzIAAgAhBKIAAQHiAAQUBrIgAgAhBKIAAQHiACIAEQrgELIAFBQGskAAtZAQJ/IwBBgAFrIgEkAAJAIAAQigENACABEFEgAEGAAmoiAiABEHoNACACED4gACACEBEgABC1ASAAQYABaiIAIAIQESAAELUBIAIgARCZAQsgAUGAAWokAAtbAgF+An8gACkDACEBA0AgACACaiIDIAFC//////////8DgzcDACABQjqHIQEgAkHgAEYEQCAAIAApA2ggAXw3A2gFIAJBCGohAiADQQhqKQMAIAF8IQEMAQsLC08BAX8gAEE4ENABGgJAA0AgAkEHRwRAIAJBB0YNAiAAIAEpAwA3AwAgAEEIaiEAIAFBCGohASACQQFqIQIMAQsLDwtBB0EHQeSawAAQOwALVAECfyMAQbABayICJAAgATQCOCAANAI4fkL///8PVQRAIAAQHgsgAkEIaiIDIAAgARAFIAJB+ABqIgEgAxBrIAAgARBqIABBAjYCOCACQbABaiQAC1EBAn8jAEFAaiIDJAAgAEE4ENABIgBBATYCOCAAQUBrQTgQ0AEgAEH4AGpBATYCACADIAEQjgEgACADEK4BIAMgAhCOASADEK4BIANBQGskAAvwDAIRfwh+IwBBsAFrIg8kACAANAI4IhIgEn5C////D1YEQCAAEB4LIwBB0AFrIgEkACAPQQhqIgZBCGpB0AAQ0AEaIAFBwAFqIAApAwAiFyAXQj+HIhYgFyAWEC8gBiABKQPAASISQv//////////A4M3AwAgAUHIAWopAwAiFUIGhiASQjqIhCETIBVCOoghGCAAQQhqIgwhDSAAIQlBASEKQQEhBwJAA0AgCkEERgRAIABBGGohCiAAQRBqIQkgAEEoaiEMIAApAzAhF0EHIQUgAUHIAGohCwNAIAVBC0kEQCABQUBrIAVBA3QiCCAAakEwaykDACISIBJCP4cgFyAXQj+HIhYQLyAFQQFqIg1BAXYhByALKQMAIRUgASkDQCESIAkhAiAMIQQgBUEFayIOIQMDQCADIAdJBEAgASACKQMAIhQgFEI/hyAEKQMAIhQgFEI/hxAvIAEpAwAiFCASfCISIBRUrSABQQhqKQMAIBV8fCEVIAJBCGohAiAEQQhrIQQgA0EBaiEDDAELCyAGIAhqIBJCAYYiFCATfCITQv//////////A4M3AwAgAUEwaiAAIA5BA3RqKQMAIhkgGUI/hyAXIBYQLyATIBRU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aikDADcDACACQQhqIQIMAQsLC4QJAg1/Cn4jAEFAaiILJAAgC0EIaiIJQcCywAAQSSMAQZACayICJAAgAEEwENABIQogAkHoAGpB8AAQ0AEaIAJB4AFqQTAQ0AEaIAoQcSACIAEiDCkDACIQQv3/8//P///5AX5C//////////8DgyISNwPYASACQdgAaiASQgAgCSkDACIXIBdCP4ciGBAvIBAgAikDWCIPfCITIA9UrSACQeAAaikDACAQQj+HfHwiEEI6hyABKQMIIg9CP4d8IA8gEEIGhiATQjqIhCITfCIQIBNUrXwhD0EBIQBCACETAkACQANAAkAgAEEHRgRAQQYhB0EAIQhBByEADAELIABBAXYiAUEBaiEGIAggAWshAyABQQN0IgFBCGohBCAHIAFrIQUgAkHIAGogCSAAQQN0Ig1qKQMAIhUgFUI/hyIWIBJCABAvIAJB0ABqKQMAIBAgECATfCIRVq0gDyAUfHx8IBEgAikDSHwiDyARVK18IRAgAEEBaiEBA0AgACAGTQRAIAJB2AFqIA1qIA9C/f/z/8////kBfkL//////////wODIhE3AwAgAkE4aiARQgAgFyAYEC8gAkEoaiARQgAgFSAWEC8gAkHoAGogAEEEdGoiACACQTBqKQMAIhE3AwggACACKQMoIhU3AwAgDyACKQM4IhZ8Ig8gFlStIAJBQGspAwAgEHx8IhBCOocgDCABQQN0aikDACIWQj+HfCAWIBBCBoYgD0I6iIQiD3wiECAPVK18IQ8gEyAVfCITIBVUrSARIBR8fCEUIAdBCGohByAIQQFqIQggASEADAMLIANBB08NAyACQRhqIAQgCWopAwAgBSAJaikDAH0iESARQj+HIAJB2AFqIg4gBWopAwAgBCAOaikDAH0iESARQj+HEC8gAikDGCIRIA98Ig8gEVStIAJBIGopAwAgEHx8IRAgBkEBaiEGIARBCGohBCAFQQhrIQUgA0EBayEDDAALAAsLA0ACQAJAIABBDUcEQCAHIABBAXYiBmshAyAIIAZBA3QiAWshBCABQQhqIQUgDyAUfCAQIBN8Ig8gEFStfCEQIABBAWohAQNAIAZBBUsNAyADQQdPDQIgAkEIaiAFIAlqKQMAIAQgCWpBMGopAwB9IhIgEkI/hyACIARqQYgCaikDACACQdgBaiAFaikDAH0iEiASQj+HEC8gAikDCCISIA98Ig8gElStIAJBEGopAwAgEHx8IRAgBkEBaiEGIARBCGshBCADQQFrIQMgBUEIaiEFDAALAAsgCiAQQv//////////A4M3AzAgAkGQAmokAAwECyADQQdBpJzAABA7AAsgAEEDdCAKakE4ayAPQv//////////A4M3AwAgEEI6hyAMIAFBA3RqKQMAIhJCP4d8IBIgEEIGhiAPQjqIhCIPfCIQIA9UrXwhDyAUIABBBHQgAmpBCGoiAEEIaikDAH0gEyAAKQMAIhJUrX0hFCAIQQhqIQggB0EBaiEHIBMgEn0hEyABIQAMAAsACyADQQdBlJzAABA7AAsgC0FAayQACy4BAX8jAEGAAWsiASQAIAAQRSABEFEgACABEJkBIABBgAFqELYBIAFBgAFqJAALMwAgACABEJYBIABBgAJqIAFBgAJqEJYBIABBgARqIAFBgARqEJYBIAAgASgCgAY2AoAGCygAIAAgASACEHIgAEFAayABQUBrIAIQciAAQYABaiABQYABaiACEHILLQAgACABIAIQjQEgAEGAAWogAUGAAWogAhCNASAAQYACaiABQYACaiACEI0BCycBAn8jAEFAaiICJAAgAkEIaiIDIAEQvgEgACADEI4BIAJBQGskAAsiAQF/A0AgAUE4RwRAIAAgAWpCADcDACABQQhqIQEMAQsLCyUAIAAgASACEDAgAEEAIAJrIAAoAjgiACABKAI4c3EgAHM2AjgLJwAgACAAKAIEQQFxIAFyQQJyNgIEIAAgAWoiACAAKAIEQQFyNgIECyMAA0AgAgRAIAAgAS0AABA8IAJBAWshAiABQQFqIQEMAQsLCywAIAAQiwEgACABEJYBIABBgAJqIAIQlgEgAEGABGogAxCWASAAQQU2AoAGCyMBAX8jAEFAaiIBJAAgASAAEJABIAEQHiABEFcgAUFAayQACykAIAAgARBgIAAgACgCOCABKAI4aiIBNgI4IAFB////D0oEQCAAEB4LCyUAIAAgARCuASAAQUBrIAFBQGsQrgEgAEGAAWogAUGAAWoQrgELKAEBfyMAQYACayICJAAgAiABEIwBIAIQKyAAIAIQlwEgAkGAAmokAAscAQF/IAAgARBYBH8gAEFAayABQUBrEFgFQQALCycBAX8jAEGAAWsiAiQAIAIg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DCELDQALCyAMpyICQeMASwRAIABBAmsiACAGQQlqaiAMpyICIAJB//8DcUHkAG4iAkHkAGxrQf//A3FBAXRB6LjAAGovAAA7AAALAkAgAkEKTwRAIABBAmsiACAGQQlqaiACQQF0Qei4wABqLwAAOwAADAELIABBAWsiACAGQQlqaiACQTBqOgAACwJ/IAZBCWogAGohCEErQYCAxAAgASgCACIDQQFxIgIbIQQgAkEnIABrIglqIQJBlLjAAEEAIANBBHEbIQUCQAJAIAEoAghFBEBBASEAIAEgBCAFEFINAQwCCwJAAkACQAJAIAIgAUEMaigCACIDSQRAIAEtAABBCHENBEEAIQAgAyACayICIQNBASABLQAgIgcgB0EDRhtBA3FBAWsOAgECAwtBASEAIAEgBCAFEFINBAwFC0EAIQMgAiEADAELIAJBAXYhACACQQFqQQF2IQMLIABBAWohACABQRxqKAIAIQcgASgCBCECIAEoAhghCgJAA0AgAEEBayIARQ0BIAogAiAHKAIQEQQARQ0AC0EBDAQLQQEhACACQYCAxABGDQEgASAEIAUQUg0BIAEoAhggCCAJIAEoAhwoAgwRBQANASABKAIcIQQgASgCGCEBQQAhAAJ/A0AgAyAAIANGDQEaIABBAWohACABIAIgBCgCEBEEAEUNAAsgAEEBawsgA0khAAwBCyABKAIEIQcgAUEwNgIEIAEtACAhCkEBIQAgAUEBOgAgIAEgBCAFEFINAEEAIQAgAyACayICIQMCQAJAAkBBASABLQAgIgQgBEEDRhtBA3FBAWsOAgABAgtBACEDIAIhAAwBCyACQQF2IQAgAkEBakEBdiEDCyAAQQFqIQAgAUEcaigCACECIAEoAgQhBCABKAIYIQUCQANAIABBAWsiAEUNASAFIAQgAigCEBEEAEUNAAtBAQwDC0EBIQAgBEGAgMQARg0AIAEoAhggCCAJIAEoAhwoAgwRBQANACABKAIcIQAgASgCGCEFQQAhAgJAA0AgAiADRg0BIAJBAWohAiAFIAQgACgCEBEEAEUNAAtBASEAIAJBAWsgA0kNAQsgASAKOgAgIAEgBzYCBEEADAILIAAMAQsgASgCGCAIIAkgAUEcaigCACgCDBEFAAsgBkEwaiQACwsAIAAQNiAAELABCysCAX8BfkIBIQIDQCAAIAFq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AAANAEHgs8AAC8EHYXR0ZW1wdCB0byBkaXZpZGUgYnkgemVybwAAAAAAAABhdHRlbXB0IHRvIGRpdmlkZSB3aXRoIG92ZXJmbG93ALAZEAASAAAADAIAAA0AAACwGRAAEgAAABgCAAAmAAAAsBkQABIAAAAYAgAAIwAAALAZEAASAAAAHgIAABcAAACwGRAAEgAAAB4CAAAUAAAAqqr//////gHu//9UrP//AupBYg9rDyoBw5z9ShTOEwJLd2TXrEtDAu3pxpKm+V8Cox4RoAEAAAADAAAABAAAAAQAAAAEAAAABQAAAAYAAABjYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlbWVtb3J5IGFsbG9jYXRpb24gb2YgIGJ5dGVzIGZhaWxlZAoAAOsaEAAVAAAAABsQAA4AAABsaWJyYXJ5L3N0ZC9zcmMvYWxsb2MucnMgGxAAGAAAAEkBAAAJAAAAbGlicmFyeS9zdGQvc3JjL3Bhbmlja2luZy5yc0gbEAAcAAAARgIAAB8AAABIGxAAHAAAAEcCAAAeAAAABwAAAAwAAAAEAAAACAAAAAMAAAAIAAAABAAAAAkAAAAKAAAAEAAAAAQAAAALAAAADAAAAAMAAAAIAAAABAAAAA0AAAAOAAAAbGlicmFyeS9hbGxvYy9zcmMvcmF3X3ZlYy5yc2NhcGFjaXR5IG92ZXJmbG93AAAA6BsQABEAAADMGxAAHAAAAAUCAAAFAAAAEAAAAAAAAAABAAAAEQAAAGluZGV4IG91dCBvZiBib3VuZHM6IHRoZSBsZW4gaXMgIGJ1dCB0aGUgaW5kZXggaXMgAAAkHBAAIAAAAEQcEAASAAAAMDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTkgb3V0IG9mIHJhbmdlIGZvciBzbGljZSBvZiBsZW5ndGggbGlicmFyeS9jb3JlL3NyYy9zbGljZS9pbmRleC5yc3JhbmdlIGVuZCBpbmRleCAAAABxHRAAEAAAADAdEAAiAAAAUh0QAB8AAABJAAAABQB7CXByb2R1Y2VycwIIbGFuZ3VhZ2UBBFJ1c3QADHByb2Nlc3NlZC1ieQMFcnVzdGMdMS42MS4wIChmZTViMTNkNjggMjAyMi0wNS0xOCkGd2FscnVzBjAuMTkuMAx3YXNtLWJpbmRnZW4SMC4yLjgxICgwNjJhYTVmNzAp`;
  }
});

// node_modules/@dfinity/agent/lib/esm/vendor/bls/bls.js
function bls_init() {
  let ret = wasm.bls_init();
  return ret;
}
function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0().set(arg, ptr / 1);
  return [ptr, arg.length];
}
function bls_verify(sig, m2, w2) {
  const [ptr0, len0] = passArray8ToWasm0(sig, wasm.__wbindgen_malloc);
  const [ptr1, len1] = passArray8ToWasm0(m2, wasm.__wbindgen_malloc);
  const [ptr2, len2] = passArray8ToWasm0(w2, wasm.__wbindgen_malloc);
  const ret = wasm.bls_verify(ptr0, len0, ptr1, len1, ptr2, len2);
  return ret;
}
async function load(module2, imports) {
  if (typeof Response === "function" && module2 instanceof Response) {
    const bytes2 = await module2.arrayBuffer();
    return await WebAssembly.instantiate(bytes2, imports);
  } else {
    const instance = await WebAssembly.instantiate(module2, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module: module2 };
    } else {
      return instance;
    }
  }
}
async function init() {
  const imports = {};
  const { instance, module: module2 } = await load(wasmBytes, imports);
  wasm = instance.exports;
  init.__wbindgen_wasm_module = module2;
  return wasm;
}
var base64Arraybuffer, wasm, wasmBytes, cachegetUint8Memory0, bls_default;
var init_bls = __esm({
  "node_modules/@dfinity/agent/lib/esm/vendor/bls/bls.js"() {
    base64Arraybuffer = __toESM(require_base64_arraybuffer());
    init_wasm();
    wasmBytes = base64Arraybuffer.decode(wasmBytesBase64);
    cachegetUint8Memory0 = null;
    bls_default = init;
  }
});

// node_modules/@dfinity/agent/lib/esm/utils/bls.js
async function blsVerify(pk, sig, msg) {
  if (!verify) {
    await bls_default();
    if (bls_init() !== 0) {
      throw new Error("Cannot initialize BLS");
    }
    verify = (pk1, sig1, msg1) => {
      return bls_verify(sig1, msg1, pk1) === 0;
    };
  }
  return verify(pk, sig, msg);
}
var verify;
var init_bls2 = __esm({
  "node_modules/@dfinity/agent/lib/esm/utils/bls.js"() {
    init_bls();
  }
});

// node_modules/@dfinity/agent/lib/esm/utils/leb.js
var decodeLeb128, decodeTime;
var init_leb = __esm({
  "node_modules/@dfinity/agent/lib/esm/utils/leb.js"() {
    init_esm2();
    decodeLeb128 = (buf) => {
      return lebDecode(new PipeArrayBuffer(buf));
    };
    decodeTime = (buf) => {
      const decoded = decodeLeb128(buf);
      return new Date(Number(decoded) / 1e6);
    };
  }
});

// node_modules/@dfinity/agent/lib/esm/certificate.js
function isBufferEqual(a, b2) {
  if (a.byteLength !== b2.byteLength) {
    return false;
  }
  const a8 = new Uint8Array(a);
  const b8 = new Uint8Array(b2);
  for (let i = 0; i < a8.length; i++) {
    if (a8[i] !== b8[i]) {
      return false;
    }
  }
  return true;
}
function extractDER(buf) {
  const expectedLength = DER_PREFIX.byteLength + KEY_LENGTH;
  if (buf.byteLength !== expectedLength) {
    throw new TypeError(`BLS DER-encoded public key must be ${expectedLength} bytes long`);
  }
  const prefix = buf.slice(0, DER_PREFIX.byteLength);
  if (!isBufferEqual(prefix, DER_PREFIX)) {
    throw new TypeError(`BLS DER-encoded public key is invalid. Expect the following prefix: ${DER_PREFIX}, but get ${prefix}`);
  }
  return buf.slice(DER_PREFIX.byteLength);
}
function lookupResultToBuffer(result) {
  if (result instanceof ArrayBuffer) {
    return result;
  } else if (result instanceof Uint8Array) {
    return result.buffer;
  }
  return void 0;
}
async function reconstruct(t) {
  switch (t[0]) {
    case NodeId.Empty:
      return hash(domain_sep("ic-hashtree-empty"));
    case NodeId.Pruned:
      return t[1];
    case NodeId.Leaf:
      return hash(concat2(domain_sep("ic-hashtree-leaf"), t[1]));
    case NodeId.Labeled:
      return hash(concat2(domain_sep("ic-hashtree-labeled"), t[1], await reconstruct(t[2])));
    case NodeId.Fork:
      return hash(concat2(domain_sep("ic-hashtree-fork"), await reconstruct(t[1]), await reconstruct(t[2])));
    default:
      throw new Error("unreachable");
  }
}
function domain_sep(s) {
  const len = new Uint8Array([s.length]);
  const str = new TextEncoder().encode(s);
  return concat2(len, str);
}
function lookup_path(path, tree) {
  if (path.length === 0) {
    switch (tree[0]) {
      case NodeId.Leaf: {
        if (!tree[1])
          throw new Error("Invalid tree structure for leaf");
        if (tree[1] instanceof ArrayBuffer) {
          return tree[1];
        } else if (tree[1] instanceof Uint8Array) {
          return tree[1].buffer;
        } else
          return tree[1];
      }
      case NodeId.Fork: {
        return tree;
      }
      default: {
        return tree;
      }
    }
  }
  const label = typeof path[0] === "string" ? new TextEncoder().encode(path[0]) : path[0];
  const t = find_label(label, flatten_forks(tree));
  if (t) {
    return lookup_path(path.slice(1), t);
  }
}
function flatten_forks(t) {
  switch (t[0]) {
    case NodeId.Empty:
      return [];
    case NodeId.Fork:
      return flatten_forks(t[1]).concat(flatten_forks(t[2]));
    default:
      return [t];
  }
}
function find_label(l, trees) {
  if (trees.length === 0) {
    return void 0;
  }
  for (const t of trees) {
    if (t[0] === NodeId.Labeled) {
      const p = t[1];
      if (isBufferEqual(l, p)) {
        return t[2];
      }
    }
  }
}
function check_canister_ranges(params) {
  const { canisterId, subnetId, tree } = params;
  const rangeLookup = lookup_path(["subnet", subnetId.toUint8Array(), "canister_ranges"], tree);
  if (!rangeLookup || !(rangeLookup instanceof ArrayBuffer)) {
    throw new Error(`Could not find canister ranges for subnet ${subnetId}`);
  }
  const ranges_arr = decode3(rangeLookup);
  const ranges = ranges_arr.map((v2) => [
    Principal2.fromUint8Array(v2[0]),
    Principal2.fromUint8Array(v2[1])
  ]);
  const canisterInRange = ranges.some((r) => r[0].ltEq(canisterId) && r[1].gtEq(canisterId));
  return canisterInRange;
}
var CertificateVerificationError, NodeId, Certificate, DER_PREFIX, KEY_LENGTH;
var init_certificate = __esm({
  "node_modules/@dfinity/agent/lib/esm/certificate.js"() {
    init_cbor();
    init_errors();
    init_request_id();
    init_buffer2();
    init_esm();
    init_bls2();
    init_leb();
    CertificateVerificationError = class extends AgentError {
      constructor(reason) {
        super(`Invalid certificate: ${reason}`);
      }
    };
    NodeId = {
      Empty: 0,
      Fork: 1,
      Labeled: 2,
      Leaf: 3,
      Pruned: 4
    };
    Certificate = class _Certificate {
      constructor(certificate, _rootKey, _canisterId, _blsVerify, _maxAgeInMinutes = 5) {
        this._rootKey = _rootKey;
        this._canisterId = _canisterId;
        this._blsVerify = _blsVerify;
        this._maxAgeInMinutes = _maxAgeInMinutes;
        this.cert = decode3(new Uint8Array(certificate));
      }
      /**
       * Create a new instance of a certificate, automatically verifying it. Throws a
       * CertificateVerificationError if the certificate cannot be verified.
       * @constructs  Certificate
       * @param {CreateCertificateOptions} options {@link CreateCertificateOptions}
       * @param {ArrayBuffer} options.certificate The bytes of the certificate
       * @param {ArrayBuffer} options.rootKey The root key to verify against
       * @param {Principal} options.canisterId The effective or signing canister ID
       * @param {number} options.maxAgeInMinutes The maximum age of the certificate in minutes. Default is 5 minutes.
       * @throws {CertificateVerificationError}
       */
      static async create(options) {
        const cert = _Certificate.createUnverified(options);
        await cert.verify();
        return cert;
      }
      static createUnverified(options) {
        let blsVerify2 = options.blsVerify;
        if (!blsVerify2) {
          blsVerify2 = blsVerify;
        }
        return new _Certificate(options.certificate, options.rootKey, options.canisterId, blsVerify2, options.maxAgeInMinutes);
      }
      lookup(path) {
        return lookupResultToBuffer(lookup_path(path, this.cert.tree));
      }
      lookup_label(label) {
        return this.lookup([label]);
      }
      async verify() {
        const rootHash = await reconstruct(this.cert.tree);
        const derKey = await this._checkDelegationAndGetKey(this.cert.delegation);
        const sig = this.cert.signature;
        const key = extractDER(derKey);
        const msg = concat2(domain_sep("ic-state-root"), rootHash);
        let sigVer = false;
        const lookupTime = this.lookup(["time"]);
        if (!lookupTime) {
          throw new CertificateVerificationError("Certificate does not contain a time");
        }
        const FIVE_MINUTES_IN_MSEC2 = 5 * 60 * 1e3;
        const MAX_AGE_IN_MSEC = this._maxAgeInMinutes * 60 * 1e3;
        const now = Date.now();
        const earliestCertificateTime = now - MAX_AGE_IN_MSEC;
        const fiveMinutesFromNow = now + FIVE_MINUTES_IN_MSEC2;
        const certTime = decodeTime(lookupTime);
        if (certTime.getTime() < earliestCertificateTime) {
          throw new CertificateVerificationError(`Certificate is signed more than ${this._maxAgeInMinutes} minutes in the past. Certificate time: ` + certTime.toISOString() + " Current time: " + new Date(now).toISOString());
        } else if (certTime.getTime() > fiveMinutesFromNow) {
          throw new CertificateVerificationError("Certificate is signed more than 5 minutes in the future. Certificate time: " + certTime.toISOString() + " Current time: " + new Date(now).toISOString());
        }
        try {
          sigVer = await this._blsVerify(new Uint8Array(key), new Uint8Array(sig), new Uint8Array(msg));
        } catch (err) {
          sigVer = false;
        }
        if (!sigVer) {
          throw new CertificateVerificationError("Signature verification failed");
        }
      }
      async _checkDelegationAndGetKey(d) {
        if (!d) {
          return this._rootKey;
        }
        const cert = await _Certificate.createUnverified({
          certificate: d.certificate,
          rootKey: this._rootKey,
          canisterId: this._canisterId,
          blsVerify: this._blsVerify,
          // Do not check max age for delegation certificates
          maxAgeInMinutes: Infinity
        });
        if (cert.cert.delegation) {
          throw new CertificateVerificationError("Delegation certificates cannot be nested");
        }
        await cert.verify();
        const canisterInRange = check_canister_ranges({
          canisterId: this._canisterId,
          subnetId: Principal2.fromUint8Array(new Uint8Array(d.subnet_id)),
          tree: cert.cert.tree
        });
        if (!canisterInRange) {
          throw new CertificateVerificationError(`Canister ${this._canisterId} not in range of delegations for subnet 0x${toHex(d.subnet_id)}`);
        }
        const publicKeyLookup = cert.lookup(["subnet", d.subnet_id, "public_key"]);
        if (!publicKeyLookup) {
          throw new Error(`Could not find subnet key for subnet 0x${toHex(d.subnet_id)}`);
        }
        return publicKeyLookup;
      }
    };
    DER_PREFIX = fromHex("308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100");
    KEY_LENGTH = 96;
  }
});

// node_modules/@dfinity/agent/lib/esm/canisterStatus/index.js
var canisterStatus_exports = {};
__export(canisterStatus_exports, {
  encodePath: () => encodePath,
  fetchNodeKeys: () => fetchNodeKeys,
  request: () => request
});
var request, fetchNodeKeys, encodePath, decodeHex, decodeCbor, decodeUtf8, decodeControllers;
var init_canisterStatus = __esm({
  "node_modules/@dfinity/agent/lib/esm/canisterStatus/index.js"() {
    init_esm();
    init_errors();
    init_certificate();
    init_buffer2();
    init_cbor();
    init_leb();
    request = async (options) => {
      const { agent, paths } = options;
      const canisterId = Principal2.from(options.canisterId);
      const uniquePaths = [...new Set(paths)];
      const encodedPaths = uniquePaths.map((path) => {
        return encodePath(path, canisterId);
      });
      const status = /* @__PURE__ */ new Map();
      const promises = uniquePaths.map((path, index) => {
        return (async () => {
          var _a2;
          try {
            const response = await agent.readState(canisterId, {
              paths: [encodedPaths[index]]
            });
            const cert = await Certificate.create({
              certificate: response.certificate,
              rootKey: agent.rootKey,
              canisterId
            });
            const lookup = (cert2, path3) => {
              if (path3 === "subnet") {
                const data2 = fetchNodeKeys(response.certificate, canisterId, agent.rootKey);
                return {
                  path: path3,
                  data: data2
                };
              } else {
                return {
                  path: path3,
                  data: lookupResultToBuffer(cert2.lookup(encodePath(path3, canisterId)))
                };
              }
            };
            const { path: path2, data } = lookup(cert, uniquePaths[index]);
            if (!data) {
              console.warn(`Expected to find result for path ${path2}, but instead found nothing.`);
              if (typeof path2 === "string") {
                status.set(path2, null);
              } else {
                status.set(path2.key, null);
              }
            } else {
              switch (path2) {
                case "time": {
                  status.set(path2, decodeTime(data));
                  break;
                }
                case "controllers": {
                  status.set(path2, decodeControllers(data));
                  break;
                }
                case "module_hash": {
                  status.set(path2, decodeHex(data));
                  break;
                }
                case "subnet": {
                  status.set(path2, data);
                  break;
                }
                case "candid": {
                  status.set(path2, new TextDecoder().decode(data));
                  break;
                }
                default: {
                  if (typeof path2 !== "string" && "key" in path2 && "path" in path2) {
                    switch (path2.decodeStrategy) {
                      case "raw":
                        status.set(path2.key, data);
                        break;
                      case "leb128": {
                        status.set(path2.key, decodeLeb128(data));
                        break;
                      }
                      case "cbor": {
                        status.set(path2.key, decodeCbor(data));
                        break;
                      }
                      case "hex": {
                        status.set(path2.key, decodeHex(data));
                        break;
                      }
                      case "utf-8": {
                        status.set(path2.key, decodeUtf8(data));
                      }
                    }
                  }
                }
              }
            }
          } catch (error) {
            if ((_a2 = error === null || error === void 0 ? void 0 : error.message) === null || _a2 === void 0 ? void 0 : _a2.includes("Invalid certificate")) {
              throw new AgentError(error.message);
            }
            if (typeof path !== "string" && "key" in path && "path" in path) {
              status.set(path.key, null);
            } else {
              status.set(path, null);
            }
            console.group();
            console.warn(`Expected to find result for path ${path}, but instead found nothing.`);
            console.warn(error);
            console.groupEnd();
          }
        })();
      });
      await Promise.all(promises);
      return status;
    };
    fetchNodeKeys = (certificate, canisterId, root_key) => {
      if (!canisterId._isPrincipal) {
        throw new Error("Invalid canisterId");
      }
      const cert = decode3(new Uint8Array(certificate));
      const tree = cert.tree;
      let delegation = cert.delegation;
      let subnetId;
      if (delegation && delegation.subnet_id) {
        subnetId = Principal2.fromUint8Array(new Uint8Array(delegation.subnet_id));
      } else if (!delegation && typeof root_key !== "undefined") {
        subnetId = Principal2.selfAuthenticating(new Uint8Array(root_key));
        delegation = {
          subnet_id: subnetId.toUint8Array(),
          certificate: new ArrayBuffer(0)
        };
      } else {
        subnetId = Principal2.selfAuthenticating(Principal2.fromText("tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe").toUint8Array());
        delegation = {
          subnet_id: subnetId.toUint8Array(),
          certificate: new ArrayBuffer(0)
        };
      }
      const canisterInRange = check_canister_ranges({ canisterId, subnetId, tree });
      if (!canisterInRange) {
        throw new Error("Canister not in range");
      }
      const nodeTree = lookup_path(["subnet", delegation === null || delegation === void 0 ? void 0 : delegation.subnet_id, "node"], tree);
      const nodeForks = flatten_forks(nodeTree);
      nodeForks.length;
      const nodeKeys = /* @__PURE__ */ new Map();
      nodeForks.forEach((fork) => {
        Object.getPrototypeOf(new Uint8Array(fork[1]));
        const node_id = Principal2.from(new Uint8Array(fork[1])).toText();
        const derEncodedPublicKey = lookup_path(["public_key"], fork[2]);
        if (derEncodedPublicKey.byteLength !== 44) {
          throw new Error("Invalid public key length");
        } else {
          nodeKeys.set(node_id, derEncodedPublicKey);
        }
      });
      return {
        subnetId: Principal2.fromUint8Array(new Uint8Array(delegation.subnet_id)).toText(),
        nodeKeys
      };
    };
    encodePath = (path, canisterId) => {
      const encoder = new TextEncoder();
      const encode4 = (arg) => {
        return new DataView(encoder.encode(arg).buffer).buffer;
      };
      const canisterBuffer = new DataView(canisterId.toUint8Array().buffer).buffer;
      switch (path) {
        case "time":
          return [encode4("time")];
        case "controllers":
          return [encode4("canister"), canisterBuffer, encode4("controllers")];
        case "module_hash":
          return [encode4("canister"), canisterBuffer, encode4("module_hash")];
        case "subnet":
          return [encode4("subnet")];
        case "candid":
          return [encode4("canister"), canisterBuffer, encode4("metadata"), encode4("candid:service")];
        default: {
          if ("key" in path && "path" in path) {
            if (typeof path["path"] === "string" || path["path"] instanceof ArrayBuffer) {
              const metaPath = path.path;
              const encoded = typeof metaPath === "string" ? encode4(metaPath) : metaPath;
              return [encode4("canister"), canisterBuffer, encode4("metadata"), encoded];
            } else {
              return path["path"];
            }
          }
        }
      }
      throw new Error(`An unexpeected error was encountered while encoding your path for canister status. Please ensure that your path, ${path} was formatted correctly.`);
    };
    decodeHex = (buf) => {
      return toHex(buf);
    };
    decodeCbor = (buf) => {
      return decode3(buf);
    };
    decodeUtf8 = (buf) => {
      return new TextDecoder().decode(buf);
    };
    decodeControllers = (buf) => {
      const controllersRaw = decodeCbor(buf);
      return controllersRaw.map((buf2) => {
        return Principal2.fromUint8Array(new Uint8Array(buf2));
      });
    };
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/principal/lib/cjs/utils/getCrc.js
var require_getCrc = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/principal/lib/cjs/utils/getCrc.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getCrc32 = void 0;
    var lookUpTable2 = new Uint32Array([
      0,
      1996959894,
      3993919788,
      2567524794,
      124634137,
      1886057615,
      3915621685,
      2657392035,
      249268274,
      2044508324,
      3772115230,
      2547177864,
      162941995,
      2125561021,
      3887607047,
      2428444049,
      498536548,
      1789927666,
      4089016648,
      2227061214,
      450548861,
      1843258603,
      4107580753,
      2211677639,
      325883990,
      1684777152,
      4251122042,
      2321926636,
      335633487,
      1661365465,
      4195302755,
      2366115317,
      997073096,
      1281953886,
      3579855332,
      2724688242,
      1006888145,
      1258607687,
      3524101629,
      2768942443,
      901097722,
      1119000684,
      3686517206,
      2898065728,
      853044451,
      1172266101,
      3705015759,
      2882616665,
      651767980,
      1373503546,
      3369554304,
      3218104598,
      565507253,
      1454621731,
      3485111705,
      3099436303,
      671266974,
      1594198024,
      3322730930,
      2970347812,
      795835527,
      1483230225,
      3244367275,
      3060149565,
      1994146192,
      31158534,
      2563907772,
      4023717930,
      1907459465,
      112637215,
      2680153253,
      3904427059,
      2013776290,
      251722036,
      2517215374,
      3775830040,
      2137656763,
      141376813,
      2439277719,
      3865271297,
      1802195444,
      476864866,
      2238001368,
      4066508878,
      1812370925,
      453092731,
      2181625025,
      4111451223,
      1706088902,
      314042704,
      2344532202,
      4240017532,
      1658658271,
      366619977,
      2362670323,
      4224994405,
      1303535960,
      984961486,
      2747007092,
      3569037538,
      1256170817,
      1037604311,
      2765210733,
      3554079995,
      1131014506,
      879679996,
      2909243462,
      3663771856,
      1141124467,
      855842277,
      2852801631,
      3708648649,
      1342533948,
      654459306,
      3188396048,
      3373015174,
      1466479909,
      544179635,
      3110523913,
      3462522015,
      1591671054,
      702138776,
      2966460450,
      3352799412,
      1504918807,
      783551873,
      3082640443,
      3233442989,
      3988292384,
      2596254646,
      62317068,
      1957810842,
      3939845945,
      2647816111,
      81470997,
      1943803523,
      3814918930,
      2489596804,
      225274430,
      2053790376,
      3826175755,
      2466906013,
      167816743,
      2097651377,
      4027552580,
      2265490386,
      503444072,
      1762050814,
      4150417245,
      2154129355,
      426522225,
      1852507879,
      4275313526,
      2312317920,
      282753626,
      1742555852,
      4189708143,
      2394877945,
      397917763,
      1622183637,
      3604390888,
      2714866558,
      953729732,
      1340076626,
      3518719985,
      2797360999,
      1068828381,
      1219638859,
      3624741850,
      2936675148,
      906185462,
      1090812512,
      3747672003,
      2825379669,
      829329135,
      1181335161,
      3412177804,
      3160834842,
      628085408,
      1382605366,
      3423369109,
      3138078467,
      570562233,
      1426400815,
      3317316542,
      2998733608,
      733239954,
      1555261956,
      3268935591,
      3050360625,
      752459403,
      1541320221,
      2607071920,
      3965973030,
      1969922972,
      40735498,
      2617837225,
      3943577151,
      1913087877,
      83908371,
      2512341634,
      3803740692,
      2075208622,
      213261112,
      2463272603,
      3855990285,
      2094854071,
      198958881,
      2262029012,
      4057260610,
      1759359992,
      534414190,
      2176718541,
      4139329115,
      1873836001,
      414664567,
      2282248934,
      4279200368,
      1711684554,
      285281116,
      2405801727,
      4167216745,
      1634467795,
      376229701,
      2685067896,
      3608007406,
      1308918612,
      956543938,
      2808555105,
      3495958263,
      1231636301,
      1047427035,
      2932959818,
      3654703836,
      1088359270,
      936918e3,
      2847714899,
      3736837829,
      1202900863,
      817233897,
      3183342108,
      3401237130,
      1404277552,
      615818150,
      3134207493,
      3453421203,
      1423857449,
      601450431,
      3009837614,
      3294710456,
      1567103746,
      711928724,
      3020668471,
      3272380065,
      1510334235,
      755167117
    ]);
    function getCrc322(buf) {
      const b2 = new Uint8Array(buf);
      let crc = -1;
      for (let i = 0; i < b2.length; i++) {
        const byte = b2[i];
        const t = (byte ^ crc) & 255;
        crc = lookUpTable2[t] ^ crc >>> 8;
      }
      return (crc ^ -1) >>> 0;
    }
    exports2.getCrc32 = getCrc322;
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/node_modules/js-sha256/src/sha256.js
var require_sha256 = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/node_modules/js-sha256/src/sha256.js"(exports, module) {
    (function() {
      "use strict";
      var ERROR = "input is invalid type";
      var WINDOW = typeof window === "object";
      var root = WINDOW ? window : {};
      if (root.JS_SHA256_NO_WINDOW) {
        WINDOW = false;
      }
      var WEB_WORKER = !WINDOW && typeof self === "object";
      var NODE_JS = !root.JS_SHA256_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
      if (NODE_JS) {
        root = window;
      } else if (WEB_WORKER) {
        root = self;
      }
      var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && typeof module === "object" && module.exports;
      var AMD = typeof define === "function" && define.amd;
      var ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
      var HEX_CHARS = "0123456789abcdef".split("");
      var EXTRA = [-2147483648, 8388608, 32768, 128];
      var SHIFT = [24, 16, 8, 0];
      var K = [
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
      ];
      var OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"];
      var blocks = [];
      if (root.JS_SHA256_NO_NODE_JS || !Array.isArray) {
        Array.isArray = function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
      }
      if (ARRAY_BUFFER && (root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
        ArrayBuffer.isView = function(obj) {
          return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
        };
      }
      var createOutputMethod = function(outputType, is2242) {
        return function(message) {
          return new Sha256(is2242, true).update(message)[outputType]();
        };
      };
      var createMethod = function(is2242) {
        var method2 = createOutputMethod("hex", is2242);
        if (NODE_JS) {
          method2 = nodeWrap(method2, is2242);
        }
        method2.create = function() {
          return new Sha256(is2242);
        };
        method2.update = function(message) {
          return method2.create().update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
          var type = OUTPUT_TYPES[i];
          method2[type] = createOutputMethod(type, is2242);
        }
        return method2;
      };
      var nodeWrap = function(method, is224) {
        var crypto = eval("require('crypto')");
        var Buffer = eval("require('buffer').Buffer");
        var algorithm = is224 ? "sha224" : "sha256";
        var nodeMethod = function(message) {
          if (typeof message === "string") {
            return crypto.createHash(algorithm).update(message, "utf8").digest("hex");
          } else {
            if (message === null || message === void 0) {
              throw new Error(ERROR);
            } else if (message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            }
          }
          if (Array.isArray(message) || ArrayBuffer.isView(message) || message.constructor === Buffer) {
            return crypto.createHash(algorithm).update(new Buffer(message)).digest("hex");
          } else {
            return method(message);
          }
        };
        return nodeMethod;
      };
      var createHmacOutputMethod = function(outputType, is2242) {
        return function(key, message) {
          return new HmacSha256(key, is2242, true).update(message)[outputType]();
        };
      };
      var createHmacMethod = function(is2242) {
        var method2 = createHmacOutputMethod("hex", is2242);
        method2.create = function(key) {
          return new HmacSha256(key, is2242);
        };
        method2.update = function(key, message) {
          return method2.create(key).update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
          var type = OUTPUT_TYPES[i];
          method2[type] = createHmacOutputMethod(type, is2242);
        }
        return method2;
      };
      function Sha256(is2242, sharedMemory) {
        if (sharedMemory) {
          blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
          this.blocks = blocks;
        } else {
          this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        if (is2242) {
          this.h0 = 3238371032;
          this.h1 = 914150663;
          this.h2 = 812702999;
          this.h3 = 4144912697;
          this.h4 = 4290775857;
          this.h5 = 1750603025;
          this.h6 = 1694076839;
          this.h7 = 3204075428;
        } else {
          this.h0 = 1779033703;
          this.h1 = 3144134277;
          this.h2 = 1013904242;
          this.h3 = 2773480762;
          this.h4 = 1359893119;
          this.h5 = 2600822924;
          this.h6 = 528734635;
          this.h7 = 1541459225;
        }
        this.block = this.start = this.bytes = this.hBytes = 0;
        this.finalized = this.hashed = false;
        this.first = true;
        this.is224 = is2242;
      }
      Sha256.prototype.update = function(message) {
        if (this.finalized) {
          return;
        }
        var notString, type = typeof message;
        if (type !== "string") {
          if (type === "object") {
            if (message === null) {
              throw new Error(ERROR);
            } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            } else if (!Array.isArray(message)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
                throw new Error(ERROR);
              }
            }
          } else {
            throw new Error(ERROR);
          }
          notString = true;
        }
        var code, index = 0, i, length = message.length, blocks2 = this.blocks;
        while (index < length) {
          if (this.hashed) {
            this.hashed = false;
            blocks2[0] = this.block;
            blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
          }
          if (notString) {
            for (i = this.start; index < length && i < 64; ++index) {
              blocks2[i >> 2] |= message[index] << SHIFT[i++ & 3];
            }
          } else {
            for (i = this.start; index < length && i < 64; ++index) {
              code = message.charCodeAt(index);
              if (code < 128) {
                blocks2[i >> 2] |= code << SHIFT[i++ & 3];
              } else if (code < 2048) {
                blocks2[i >> 2] |= (192 | code >> 6) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              } else if (code < 55296 || code >= 57344) {
                blocks2[i >> 2] |= (224 | code >> 12) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              } else {
                code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                blocks2[i >> 2] |= (240 | code >> 18) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code >> 12 & 63) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              }
            }
          }
          this.lastByteIndex = i;
          this.bytes += i - this.start;
          if (i >= 64) {
            this.block = blocks2[16];
            this.start = i - 64;
            this.hash();
            this.hashed = true;
          } else {
            this.start = i;
          }
        }
        if (this.bytes > 4294967295) {
          this.hBytes += this.bytes / 4294967296 << 0;
          this.bytes = this.bytes % 4294967296;
        }
        return this;
      };
      Sha256.prototype.finalize = function() {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        var blocks2 = this.blocks, i = this.lastByteIndex;
        blocks2[16] = this.block;
        blocks2[i >> 2] |= EXTRA[i & 3];
        this.block = blocks2[16];
        if (i >= 56) {
          if (!this.hashed) {
            this.hash();
          }
          blocks2[0] = this.block;
          blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
        }
        blocks2[14] = this.hBytes << 3 | this.bytes >>> 29;
        blocks2[15] = this.bytes << 3;
        this.hash();
      };
      Sha256.prototype.hash = function() {
        var a = this.h0, b2 = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6, h = this.h7, blocks2 = this.blocks, j2, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;
        for (j2 = 16; j2 < 64; ++j2) {
          t1 = blocks2[j2 - 15];
          s0 = (t1 >>> 7 | t1 << 25) ^ (t1 >>> 18 | t1 << 14) ^ t1 >>> 3;
          t1 = blocks2[j2 - 2];
          s1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
          blocks2[j2] = blocks2[j2 - 16] + s0 + blocks2[j2 - 7] + s1 << 0;
        }
        bc = b2 & c;
        for (j2 = 0; j2 < 64; j2 += 4) {
          if (this.first) {
            if (this.is224) {
              ab = 300032;
              t1 = blocks2[0] - 1413257819;
              h = t1 - 150054599 << 0;
              d = t1 + 24177077 << 0;
            } else {
              ab = 704751109;
              t1 = blocks2[0] - 210244248;
              h = t1 - 1521486534 << 0;
              d = t1 + 143694565 << 0;
            }
            this.first = false;
          } else {
            s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
            s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
            ab = a & b2;
            maj = ab ^ a & c ^ bc;
            ch = e & f ^ ~e & g;
            t1 = h + s1 + ch + K[j2] + blocks2[j2];
            t2 = s0 + maj;
            h = d + t1 << 0;
            d = t1 + t2 << 0;
          }
          s0 = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10);
          s1 = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7);
          da = d & a;
          maj = da ^ d & b2 ^ ab;
          ch = h & e ^ ~h & f;
          t1 = g + s1 + ch + K[j2 + 1] + blocks2[j2 + 1];
          t2 = s0 + maj;
          g = c + t1 << 0;
          c = t1 + t2 << 0;
          s0 = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10);
          s1 = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7);
          cd = c & d;
          maj = cd ^ c & a ^ da;
          ch = g & h ^ ~g & e;
          t1 = f + s1 + ch + K[j2 + 2] + blocks2[j2 + 2];
          t2 = s0 + maj;
          f = b2 + t1 << 0;
          b2 = t1 + t2 << 0;
          s0 = (b2 >>> 2 | b2 << 30) ^ (b2 >>> 13 | b2 << 19) ^ (b2 >>> 22 | b2 << 10);
          s1 = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7);
          bc = b2 & c;
          maj = bc ^ b2 & d ^ cd;
          ch = f & g ^ ~f & h;
          t1 = e + s1 + ch + K[j2 + 3] + blocks2[j2 + 3];
          t2 = s0 + maj;
          e = a + t1 << 0;
          a = t1 + t2 << 0;
        }
        this.h0 = this.h0 + a << 0;
        this.h1 = this.h1 + b2 << 0;
        this.h2 = this.h2 + c << 0;
        this.h3 = this.h3 + d << 0;
        this.h4 = this.h4 + e << 0;
        this.h5 = this.h5 + f << 0;
        this.h6 = this.h6 + g << 0;
        this.h7 = this.h7 + h << 0;
      };
      Sha256.prototype.hex = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
        var hex = HEX_CHARS[h0 >> 28 & 15] + HEX_CHARS[h0 >> 24 & 15] + HEX_CHARS[h0 >> 20 & 15] + HEX_CHARS[h0 >> 16 & 15] + HEX_CHARS[h0 >> 12 & 15] + HEX_CHARS[h0 >> 8 & 15] + HEX_CHARS[h0 >> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h1 >> 28 & 15] + HEX_CHARS[h1 >> 24 & 15] + HEX_CHARS[h1 >> 20 & 15] + HEX_CHARS[h1 >> 16 & 15] + HEX_CHARS[h1 >> 12 & 15] + HEX_CHARS[h1 >> 8 & 15] + HEX_CHARS[h1 >> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h2 >> 28 & 15] + HEX_CHARS[h2 >> 24 & 15] + HEX_CHARS[h2 >> 20 & 15] + HEX_CHARS[h2 >> 16 & 15] + HEX_CHARS[h2 >> 12 & 15] + HEX_CHARS[h2 >> 8 & 15] + HEX_CHARS[h2 >> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h3 >> 28 & 15] + HEX_CHARS[h3 >> 24 & 15] + HEX_CHARS[h3 >> 20 & 15] + HEX_CHARS[h3 >> 16 & 15] + HEX_CHARS[h3 >> 12 & 15] + HEX_CHARS[h3 >> 8 & 15] + HEX_CHARS[h3 >> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h4 >> 28 & 15] + HEX_CHARS[h4 >> 24 & 15] + HEX_CHARS[h4 >> 20 & 15] + HEX_CHARS[h4 >> 16 & 15] + HEX_CHARS[h4 >> 12 & 15] + HEX_CHARS[h4 >> 8 & 15] + HEX_CHARS[h4 >> 4 & 15] + HEX_CHARS[h4 & 15] + HEX_CHARS[h5 >> 28 & 15] + HEX_CHARS[h5 >> 24 & 15] + HEX_CHARS[h5 >> 20 & 15] + HEX_CHARS[h5 >> 16 & 15] + HEX_CHARS[h5 >> 12 & 15] + HEX_CHARS[h5 >> 8 & 15] + HEX_CHARS[h5 >> 4 & 15] + HEX_CHARS[h5 & 15] + HEX_CHARS[h6 >> 28 & 15] + HEX_CHARS[h6 >> 24 & 15] + HEX_CHARS[h6 >> 20 & 15] + HEX_CHARS[h6 >> 16 & 15] + HEX_CHARS[h6 >> 12 & 15] + HEX_CHARS[h6 >> 8 & 15] + HEX_CHARS[h6 >> 4 & 15] + HEX_CHARS[h6 & 15];
        if (!this.is224) {
          hex += HEX_CHARS[h7 >> 28 & 15] + HEX_CHARS[h7 >> 24 & 15] + HEX_CHARS[h7 >> 20 & 15] + HEX_CHARS[h7 >> 16 & 15] + HEX_CHARS[h7 >> 12 & 15] + HEX_CHARS[h7 >> 8 & 15] + HEX_CHARS[h7 >> 4 & 15] + HEX_CHARS[h7 & 15];
        }
        return hex;
      };
      Sha256.prototype.toString = Sha256.prototype.hex;
      Sha256.prototype.digest = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
        var arr = [
          h0 >> 24 & 255,
          h0 >> 16 & 255,
          h0 >> 8 & 255,
          h0 & 255,
          h1 >> 24 & 255,
          h1 >> 16 & 255,
          h1 >> 8 & 255,
          h1 & 255,
          h2 >> 24 & 255,
          h2 >> 16 & 255,
          h2 >> 8 & 255,
          h2 & 255,
          h3 >> 24 & 255,
          h3 >> 16 & 255,
          h3 >> 8 & 255,
          h3 & 255,
          h4 >> 24 & 255,
          h4 >> 16 & 255,
          h4 >> 8 & 255,
          h4 & 255,
          h5 >> 24 & 255,
          h5 >> 16 & 255,
          h5 >> 8 & 255,
          h5 & 255,
          h6 >> 24 & 255,
          h6 >> 16 & 255,
          h6 >> 8 & 255,
          h6 & 255
        ];
        if (!this.is224) {
          arr.push(h7 >> 24 & 255, h7 >> 16 & 255, h7 >> 8 & 255, h7 & 255);
        }
        return arr;
      };
      Sha256.prototype.array = Sha256.prototype.digest;
      Sha256.prototype.arrayBuffer = function() {
        this.finalize();
        var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
        var dataView = new DataView(buffer);
        dataView.setUint32(0, this.h0);
        dataView.setUint32(4, this.h1);
        dataView.setUint32(8, this.h2);
        dataView.setUint32(12, this.h3);
        dataView.setUint32(16, this.h4);
        dataView.setUint32(20, this.h5);
        dataView.setUint32(24, this.h6);
        if (!this.is224) {
          dataView.setUint32(28, this.h7);
        }
        return buffer;
      };
      function HmacSha256(key, is2242, sharedMemory) {
        var i, type = typeof key;
        if (type === "string") {
          var bytes2 = [], length = key.length, index = 0, code;
          for (i = 0; i < length; ++i) {
            code = key.charCodeAt(i);
            if (code < 128) {
              bytes2[index++] = code;
            } else if (code < 2048) {
              bytes2[index++] = 192 | code >> 6;
              bytes2[index++] = 128 | code & 63;
            } else if (code < 55296 || code >= 57344) {
              bytes2[index++] = 224 | code >> 12;
              bytes2[index++] = 128 | code >> 6 & 63;
              bytes2[index++] = 128 | code & 63;
            } else {
              code = 65536 + ((code & 1023) << 10 | key.charCodeAt(++i) & 1023);
              bytes2[index++] = 240 | code >> 18;
              bytes2[index++] = 128 | code >> 12 & 63;
              bytes2[index++] = 128 | code >> 6 & 63;
              bytes2[index++] = 128 | code & 63;
            }
          }
          key = bytes2;
        } else {
          if (type === "object") {
            if (key === null) {
              throw new Error(ERROR);
            } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
              key = new Uint8Array(key);
            } else if (!Array.isArray(key)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
                throw new Error(ERROR);
              }
            }
          } else {
            throw new Error(ERROR);
          }
        }
        if (key.length > 64) {
          key = new Sha256(is2242, true).update(key).array();
        }
        var oKeyPad = [], iKeyPad = [];
        for (i = 0; i < 64; ++i) {
          var b2 = key[i] || 0;
          oKeyPad[i] = 92 ^ b2;
          iKeyPad[i] = 54 ^ b2;
        }
        Sha256.call(this, is2242, sharedMemory);
        this.update(iKeyPad);
        this.oKeyPad = oKeyPad;
        this.inner = true;
        this.sharedMemory = sharedMemory;
      }
      HmacSha256.prototype = new Sha256();
      HmacSha256.prototype.finalize = function() {
        Sha256.prototype.finalize.call(this);
        if (this.inner) {
          this.inner = false;
          var innerHash = this.array();
          Sha256.call(this, this.is224, this.sharedMemory);
          this.update(this.oKeyPad);
          this.update(innerHash);
          Sha256.prototype.finalize.call(this);
        }
      };
      var exports = createMethod();
      exports.sha256 = exports;
      exports.sha224 = createMethod(true);
      exports.sha256.hmac = createHmacMethod();
      exports.sha224.hmac = createHmacMethod(true);
      if (COMMON_JS) {
        module.exports = exports;
      } else {
        root.sha256 = exports.sha256;
        root.sha224 = exports.sha224;
        if (AMD) {
          define(function() {
            return exports;
          });
        }
      }
    })();
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/principal/lib/cjs/utils/sha224.js
var require_sha224 = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/principal/lib/cjs/utils/sha224.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sha224 = void 0;
    var js_sha256_1 = require_sha256();
    function sha2243(data) {
      const shaObj = js_sha256_1.sha224.create();
      shaObj.update(data);
      return new Uint8Array(shaObj.array());
    }
    exports2.sha224 = sha2243;
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/principal/lib/cjs/utils/base32.js
var require_base32 = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/principal/lib/cjs/utils/base32.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decode = exports2.encode = void 0;
    var alphabet2 = "abcdefghijklmnopqrstuvwxyz234567";
    var lookupTable2 = /* @__PURE__ */ Object.create(null);
    for (let i = 0; i < alphabet2.length; i++) {
      lookupTable2[alphabet2[i]] = i;
    }
    lookupTable2["0"] = lookupTable2.o;
    lookupTable2["1"] = lookupTable2.i;
    function encode4(input) {
      let skip = 0;
      let bits = 0;
      let output2 = "";
      function encodeByte(byte) {
        if (skip < 0) {
          bits |= byte >> -skip;
        } else {
          bits = byte << skip & 248;
        }
        if (skip > 3) {
          skip -= 8;
          return 1;
        }
        if (skip < 4) {
          output2 += alphabet2[bits >> 3];
          skip += 5;
        }
        return 0;
      }
      for (let i = 0; i < input.length; ) {
        i += encodeByte(input[i]);
      }
      return output2 + (skip < 0 ? alphabet2[bits >> 3] : "");
    }
    exports2.encode = encode4;
    function decode5(input) {
      let skip = 0;
      let byte = 0;
      const output2 = new Uint8Array(input.length * 4 / 3 | 0);
      let o = 0;
      function decodeChar(char) {
        let val = lookupTable2[char.toLowerCase()];
        if (val === void 0) {
          throw new Error(`Invalid character: ${JSON.stringify(char)}`);
        }
        val <<= 3;
        byte |= val >>> skip;
        skip += 5;
        if (skip >= 8) {
          output2[o++] = byte;
          skip -= 8;
          if (skip > 0) {
            byte = val << 5 - skip & 255;
          } else {
            byte = 0;
          }
        }
      }
      for (const c of input) {
        decodeChar(c);
      }
      return output2.slice(0, o);
    }
    exports2.decode = decode5;
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/principal/lib/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/principal/lib/cjs/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Principal = void 0;
    var base32_1 = require_base32();
    var getCrc_1 = require_getCrc();
    var sha224_1 = require_sha224();
    var SELF_AUTHENTICATING_SUFFIX2 = 2;
    var ANONYMOUS_SUFFIX2 = 4;
    var MANAGEMENT_CANISTER_PRINCIPAL_HEX_STR2 = "aaaaa-aa";
    var fromHexString2 = (hexString) => {
      var _a2;
      return new Uint8Array(((_a2 = hexString.match(/.{1,2}/g)) !== null && _a2 !== void 0 ? _a2 : []).map((byte) => parseInt(byte, 16)));
    };
    var toHexString2 = (bytes2) => bytes2.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
    var Principal4 = class _Principal {
      constructor(_arr) {
        this._arr = _arr;
        this._isPrincipal = true;
      }
      static anonymous() {
        return new this(new Uint8Array([ANONYMOUS_SUFFIX2]));
      }
      /**
       * Utility method, returning the principal representing the management canister, decoded from the hex string `'aaaaa-aa'`
       * @returns {Principal} principal of the management canister
       */
      static managementCanister() {
        return this.fromHex(MANAGEMENT_CANISTER_PRINCIPAL_HEX_STR2);
      }
      static selfAuthenticating(publicKey) {
        const sha = (0, sha224_1.sha224)(publicKey);
        return new this(new Uint8Array([...sha, SELF_AUTHENTICATING_SUFFIX2]));
      }
      static from(other) {
        if (typeof other === "string") {
          return _Principal.fromText(other);
        } else if (typeof other === "object" && other !== null && other._isPrincipal === true) {
          return new _Principal(other._arr);
        }
        throw new Error(`Impossible to convert ${JSON.stringify(other)} to Principal.`);
      }
      static fromHex(hex) {
        return new this(fromHexString2(hex));
      }
      static fromText(text) {
        const canisterIdNoDash = text.toLowerCase().replace(/-/g, "");
        let arr = (0, base32_1.decode)(canisterIdNoDash);
        arr = arr.slice(4, arr.length);
        const principal = new this(arr);
        if (principal.toText() !== text) {
          throw new Error(`Principal "${principal.toText()}" does not have a valid checksum (original value "${text}" may not be a valid Principal ID).`);
        }
        return principal;
      }
      static fromUint8Array(arr) {
        return new this(arr);
      }
      isAnonymous() {
        return this._arr.byteLength === 1 && this._arr[0] === ANONYMOUS_SUFFIX2;
      }
      toUint8Array() {
        return this._arr;
      }
      toHex() {
        return toHexString2(this._arr).toUpperCase();
      }
      toText() {
        const checksumArrayBuf = new ArrayBuffer(4);
        const view = new DataView(checksumArrayBuf);
        view.setUint32(0, (0, getCrc_1.getCrc32)(this._arr));
        const checksum = new Uint8Array(checksumArrayBuf);
        const bytes2 = Uint8Array.from(this._arr);
        const array = new Uint8Array([...checksum, ...bytes2]);
        const result = (0, base32_1.encode)(array);
        const matches = result.match(/.{1,5}/g);
        if (!matches) {
          throw new Error();
        }
        return matches.join("-");
      }
      toString() {
        return this.toText();
      }
      /**
       * Utility method taking a Principal to compare against. Used for determining canister ranges in certificate verification
       * @param {Principal} other - a {@link Principal} to compare
       * @returns {'lt' | 'eq' | 'gt'} `'lt' | 'eq' | 'gt'` a string, representing less than, equal to, or greater than
       */
      compareTo(other) {
        for (let i = 0; i < Math.min(this._arr.length, other._arr.length); i++) {
          if (this._arr[i] < other._arr[i])
            return "lt";
          else if (this._arr[i] > other._arr[i])
            return "gt";
        }
        if (this._arr.length < other._arr.length)
          return "lt";
        if (this._arr.length > other._arr.length)
          return "gt";
        return "eq";
      }
      /**
       * Utility method checking whether a provided Principal is less than or equal to the current one using the {@link Principal.compareTo} method
       * @param other a {@link Principal} to compare
       * @returns {boolean} boolean
       */
      ltEq(other) {
        const cmp = this.compareTo(other);
        return cmp == "lt" || cmp == "eq";
      }
      /**
       * Utility method checking whether a provided Principal is greater than or equal to the current one using the {@link Principal.compareTo} method
       * @param other a {@link Principal} to compare
       * @returns {boolean} boolean
       */
      gtEq(other) {
        const cmp = this.compareTo(other);
        return cmp == "gt" || cmp == "eq";
      }
    };
    exports2.Principal = Principal4;
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports2, module2) {
    var buffer = require_buffer();
    var Buffer3 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer3.from && Buffer3.alloc && Buffer3.allocUnsafe && Buffer3.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer3(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer3.prototype);
    copyProps(Buffer3, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer3(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer3(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer3(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/base-x/src/index.js
var require_src3 = __commonJS({
  "node_modules/base-x/src/index.js"(exports2, module2) {
    "use strict";
    var _Buffer = require_safe_buffer().Buffer;
    function base(ALPHABET) {
      if (ALPHABET.length >= 255) {
        throw new TypeError("Alphabet too long");
      }
      var BASE_MAP = new Uint8Array(256);
      for (var j2 = 0; j2 < BASE_MAP.length; j2++) {
        BASE_MAP[j2] = 255;
      }
      for (var i = 0; i < ALPHABET.length; i++) {
        var x2 = ALPHABET.charAt(i);
        var xc = x2.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
          throw new TypeError(x2 + " is ambiguous");
        }
        BASE_MAP[xc] = i;
      }
      var BASE = ALPHABET.length;
      var LEADER = ALPHABET.charAt(0);
      var FACTOR = Math.log(BASE) / Math.log(256);
      var iFACTOR = Math.log(256) / Math.log(BASE);
      function encode4(source) {
        if (Array.isArray(source) || source instanceof Uint8Array) {
          source = _Buffer.from(source);
        }
        if (!_Buffer.isBuffer(source)) {
          throw new TypeError("Expected Buffer");
        }
        if (source.length === 0) {
          return "";
        }
        var zeroes = 0;
        var length = 0;
        var pbegin = 0;
        var pend = source.length;
        while (pbegin !== pend && source[pbegin] === 0) {
          pbegin++;
          zeroes++;
        }
        var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
        var b58 = new Uint8Array(size);
        while (pbegin !== pend) {
          var carry = source[pbegin];
          var i2 = 0;
          for (var it1 = size - 1; (carry !== 0 || i2 < length) && it1 !== -1; it1--, i2++) {
            carry += 256 * b58[it1] >>> 0;
            b58[it1] = carry % BASE >>> 0;
            carry = carry / BASE >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          pbegin++;
        }
        var it2 = size - length;
        while (it2 !== size && b58[it2] === 0) {
          it2++;
        }
        var str = LEADER.repeat(zeroes);
        for (; it2 < size; ++it2) {
          str += ALPHABET.charAt(b58[it2]);
        }
        return str;
      }
      function decodeUnsafe(source) {
        if (typeof source !== "string") {
          throw new TypeError("Expected String");
        }
        if (source.length === 0) {
          return _Buffer.alloc(0);
        }
        var psz = 0;
        var zeroes = 0;
        var length = 0;
        while (source[psz] === LEADER) {
          zeroes++;
          psz++;
        }
        var size = (source.length - psz) * FACTOR + 1 >>> 0;
        var b256 = new Uint8Array(size);
        while (source[psz]) {
          var carry = BASE_MAP[source.charCodeAt(psz)];
          if (carry === 255) {
            return;
          }
          var i2 = 0;
          for (var it3 = size - 1; (carry !== 0 || i2 < length) && it3 !== -1; it3--, i2++) {
            carry += BASE * b256[it3] >>> 0;
            b256[it3] = carry % 256 >>> 0;
            carry = carry / 256 >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          psz++;
        }
        var it4 = size - length;
        while (it4 !== size && b256[it4] === 0) {
          it4++;
        }
        var vch = _Buffer.allocUnsafe(zeroes + (size - it4));
        vch.fill(0, 0, zeroes);
        var j3 = zeroes;
        while (it4 !== size) {
          vch[j3++] = b256[it4++];
        }
        return vch;
      }
      function decode5(string) {
        var buffer = decodeUnsafe(string);
        if (buffer) {
          return buffer;
        }
        throw new Error("Non-base" + BASE + " character");
      }
      return {
        encode: encode4,
        decodeUnsafe,
        decode: decode5
      };
    }
    module2.exports = base;
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/candid/lib/cjs/utils/buffer.js
var require_buffer3 = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/candid/lib/cjs/utils/buffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PipeArrayBuffer = exports2.fromHexString = exports2.toHexString = exports2.concat = void 0;
    function concat3(...buffers) {
      const result = new Uint8Array(buffers.reduce((acc, curr) => acc + curr.byteLength, 0));
      let index = 0;
      for (const b2 of buffers) {
        result.set(new Uint8Array(b2), index);
        index += b2.byteLength;
      }
      return result;
    }
    exports2.concat = concat3;
    function toHexString2(bytes2) {
      return new Uint8Array(bytes2).reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
    }
    exports2.toHexString = toHexString2;
    function fromHexString2(hexString) {
      var _a2;
      return new Uint8Array(((_a2 = hexString.match(/.{1,2}/g)) !== null && _a2 !== void 0 ? _a2 : []).map((byte) => parseInt(byte, 16)));
    }
    exports2.fromHexString = fromHexString2;
    var PipeArrayBuffer2 = class {
      /**
       * Creates a new instance of a pipe
       * @param buffer an optional buffer to start with
       * @param length an optional amount of bytes to use for the length.
       */
      constructor(buffer, length = (buffer === null || buffer === void 0 ? void 0 : buffer.byteLength) || 0) {
        this._buffer = buffer || new ArrayBuffer(0);
        this._view = new Uint8Array(this._buffer, 0, length);
      }
      get buffer() {
        return this._view.slice();
      }
      get byteLength() {
        return this._view.byteLength;
      }
      /**
       * Read `num` number of bytes from the front of the pipe.
       * @param num The number of bytes to read.
       */
      read(num) {
        const result = this._view.subarray(0, num);
        this._view = this._view.subarray(num);
        return result.slice().buffer;
      }
      readUint8() {
        const result = this._view[0];
        this._view = this._view.subarray(1);
        return result;
      }
      /**
       * Write a buffer to the end of the pipe.
       * @param buf The bytes to write.
       */
      write(buf) {
        const b2 = new Uint8Array(buf);
        const offset = this._view.byteLength;
        if (this._view.byteOffset + this._view.byteLength + b2.byteLength >= this._buffer.byteLength) {
          this.alloc(b2.byteLength);
        } else {
          this._view = new Uint8Array(this._buffer, this._view.byteOffset, this._view.byteLength + b2.byteLength);
        }
        this._view.set(b2, offset);
      }
      /**
       * Whether or not there is more data to read from the buffer
       */
      get end() {
        return this._view.byteLength === 0;
      }
      /**
       * Allocate a fixed amount of memory in the buffer. This does not affect the view.
       * @param amount A number of bytes to add to the buffer.
       */
      alloc(amount) {
        const b2 = new ArrayBuffer((this._buffer.byteLength + amount) * 1.2 | 0);
        const v2 = new Uint8Array(b2, 0, this._view.byteLength + amount);
        v2.set(this._view);
        this._buffer = b2;
        this._view = v2;
      }
    };
    exports2.PipeArrayBuffer = PipeArrayBuffer2;
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/candid/lib/cjs/utils/hash.js
var require_hash = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/candid/lib/cjs/utils/hash.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.idlLabelToId = void 0;
    function idlHash2(s) {
      const utf8encoder = new TextEncoder();
      const array = utf8encoder.encode(s);
      let h = 0;
      for (const c of array) {
        h = (h * 223 + c) % 2 ** 32;
      }
      return h;
    }
    function idlLabelToId2(label) {
      if (/^_\d+_$/.test(label) || /^_0x[0-9a-fA-F]+_$/.test(label)) {
        const num = +label.slice(1, -1);
        if (Number.isSafeInteger(num) && num >= 0 && num < 2 ** 32) {
          return num;
        }
      }
      return idlHash2(label);
    }
    exports2.idlLabelToId = idlLabelToId2;
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/candid/lib/cjs/utils/leb128.js
var require_leb128 = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/candid/lib/cjs/utils/leb128.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readIntLE = exports2.readUIntLE = exports2.writeIntLE = exports2.writeUIntLE = exports2.slebDecode = exports2.slebEncode = exports2.lebDecode = exports2.lebEncode = exports2.safeReadUint8 = exports2.safeRead = void 0;
    var buffer_1 = require_buffer3();
    function eob2() {
      throw new Error("unexpected end of buffer");
    }
    function safeRead2(pipe, num) {
      if (pipe.byteLength < num) {
        eob2();
      }
      return pipe.read(num);
    }
    exports2.safeRead = safeRead2;
    function safeReadUint82(pipe) {
      const byte = pipe.readUint8();
      if (byte === void 0) {
        eob2();
      }
      return byte;
    }
    exports2.safeReadUint8 = safeReadUint82;
    function lebEncode2(value4) {
      if (typeof value4 === "number") {
        value4 = BigInt(value4);
      }
      if (value4 < BigInt(0)) {
        throw new Error("Cannot leb encode negative values.");
      }
      const byteLength = (value4 === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(value4)))) + 1;
      const pipe = new buffer_1.PipeArrayBuffer(new ArrayBuffer(byteLength), 0);
      while (true) {
        const i = Number(value4 & BigInt(127));
        value4 /= BigInt(128);
        if (value4 === BigInt(0)) {
          pipe.write(new Uint8Array([i]));
          break;
        } else {
          pipe.write(new Uint8Array([i | 128]));
        }
      }
      return pipe.buffer;
    }
    exports2.lebEncode = lebEncode2;
    function lebDecode2(pipe) {
      let weight = BigInt(1);
      let value4 = BigInt(0);
      let byte;
      do {
        byte = safeReadUint82(pipe);
        value4 += BigInt(byte & 127).valueOf() * weight;
        weight *= BigInt(128);
      } while (byte >= 128);
      return value4;
    }
    exports2.lebDecode = lebDecode2;
    function slebEncode2(value4) {
      if (typeof value4 === "number") {
        value4 = BigInt(value4);
      }
      const isNeg = value4 < BigInt(0);
      if (isNeg) {
        value4 = -value4 - BigInt(1);
      }
      const byteLength = (value4 === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(value4)))) + 1;
      const pipe = new buffer_1.PipeArrayBuffer(new ArrayBuffer(byteLength), 0);
      while (true) {
        const i = getLowerBytes(value4);
        value4 /= BigInt(128);
        if (isNeg && value4 === BigInt(0) && (i & 64) !== 0 || !isNeg && value4 === BigInt(0) && (i & 64) === 0) {
          pipe.write(new Uint8Array([i]));
          break;
        } else {
          pipe.write(new Uint8Array([i | 128]));
        }
      }
      function getLowerBytes(num) {
        const bytes2 = num % BigInt(128);
        if (isNeg) {
          return Number(BigInt(128) - bytes2 - BigInt(1));
        } else {
          return Number(bytes2);
        }
      }
      return pipe.buffer;
    }
    exports2.slebEncode = slebEncode2;
    function slebDecode2(pipe) {
      const pipeView = new Uint8Array(pipe.buffer);
      let len = 0;
      for (; len < pipeView.byteLength; len++) {
        if (pipeView[len] < 128) {
          if ((pipeView[len] & 64) === 0) {
            return lebDecode2(pipe);
          }
          break;
        }
      }
      const bytes2 = new Uint8Array(safeRead2(pipe, len + 1));
      let value4 = BigInt(0);
      for (let i = bytes2.byteLength - 1; i >= 0; i--) {
        value4 = value4 * BigInt(128) + BigInt(128 - (bytes2[i] & 127) - 1);
      }
      return -value4 - BigInt(1);
    }
    exports2.slebDecode = slebDecode2;
    function writeUIntLE2(value4, byteLength) {
      if (BigInt(value4) < BigInt(0)) {
        throw new Error("Cannot write negative values.");
      }
      return writeIntLE2(value4, byteLength);
    }
    exports2.writeUIntLE = writeUIntLE2;
    function writeIntLE2(value4, byteLength) {
      value4 = BigInt(value4);
      const pipe = new buffer_1.PipeArrayBuffer(new ArrayBuffer(Math.min(1, byteLength)), 0);
      let i = 0;
      let mul = BigInt(256);
      let sub = BigInt(0);
      let byte = Number(value4 % mul);
      pipe.write(new Uint8Array([byte]));
      while (++i < byteLength) {
        if (value4 < 0 && sub === BigInt(0) && byte !== 0) {
          sub = BigInt(1);
        }
        byte = Number((value4 / mul - sub) % BigInt(256));
        pipe.write(new Uint8Array([byte]));
        mul *= BigInt(256);
      }
      return pipe.buffer;
    }
    exports2.writeIntLE = writeIntLE2;
    function readUIntLE2(pipe, byteLength) {
      let val = BigInt(safeReadUint82(pipe));
      let mul = BigInt(1);
      let i = 0;
      while (++i < byteLength) {
        mul *= BigInt(256);
        const byte = BigInt(safeReadUint82(pipe));
        val = val + mul * byte;
      }
      return val;
    }
    exports2.readUIntLE = readUIntLE2;
    function readIntLE2(pipe, byteLength) {
      let val = readUIntLE2(pipe, byteLength);
      const mul = BigInt(2) ** (BigInt(8) * BigInt(byteLength - 1) + BigInt(7));
      if (val >= mul) {
        val -= mul * BigInt(2);
      }
      return val;
    }
    exports2.readIntLE = readIntLE2;
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/candid/lib/cjs/utils/bigint-math.js
var require_bigint_math = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/candid/lib/cjs/utils/bigint-math.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.iexp2 = exports2.ilog2 = void 0;
    function ilog2(n) {
      const nBig = BigInt(n);
      if (n <= 0) {
        throw new RangeError("Input must be positive");
      }
      return nBig.toString(2).length - 1;
    }
    exports2.ilog2 = ilog2;
    function iexp22(n) {
      const nBig = BigInt(n);
      if (n < 0) {
        throw new RangeError("Input must be non-negative");
      }
      return BigInt(1) << nBig;
    }
    exports2.iexp2 = iexp22;
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/candid/lib/cjs/idl.js
var require_idl = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/node_modules/@dfinity/candid/lib/cjs/idl.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Variant = exports2.Record = exports2.Opt = exports2.Vec = exports2.Tuple = exports2.Principal = exports2.Nat64 = exports2.Nat32 = exports2.Nat16 = exports2.Nat8 = exports2.Int64 = exports2.Int32 = exports2.Int16 = exports2.Int8 = exports2.Float64 = exports2.Float32 = exports2.Nat = exports2.Int = exports2.Text = exports2.Null = exports2.Bool = exports2.Unknown = exports2.Reserved = exports2.Empty = exports2.decode = exports2.encode = exports2.ServiceClass = exports2.FuncClass = exports2.PrincipalClass = exports2.RecClass = exports2.VariantClass = exports2.TupleClass = exports2.RecordClass = exports2.OptClass = exports2.VecClass = exports2.FixedNatClass = exports2.FixedIntClass = exports2.FloatClass = exports2.NatClass = exports2.IntClass = exports2.TextClass = exports2.ReservedClass = exports2.NullClass = exports2.BoolClass = exports2.UnknownClass = exports2.EmptyClass = exports2.ConstructType = exports2.PrimitiveType = exports2.Type = exports2.Visitor = void 0;
    exports2.Service = exports2.Func = exports2.Rec = void 0;
    var principal_1 = require_cjs();
    var buffer_1 = require_buffer3();
    var hash_1 = require_hash();
    var leb128_1 = require_leb128();
    var bigint_math_1 = require_bigint_math();
    var magicNumber2 = "DIDL";
    var toReadableString_max2 = 400;
    function zipWith2(xs, ys, f) {
      return xs.map((x2, i) => f(x2, ys[i]));
    }
    var TypeTable2 = class {
      constructor() {
        this._typs = [];
        this._idx = /* @__PURE__ */ new Map();
      }
      has(obj) {
        return this._idx.has(obj.name);
      }
      add(type, buf) {
        const idx = this._typs.length;
        this._idx.set(type.name, idx);
        this._typs.push(buf);
      }
      merge(obj, knot) {
        const idx = this._idx.get(obj.name);
        const knotIdx = this._idx.get(knot);
        if (idx === void 0) {
          throw new Error("Missing type index for " + obj);
        }
        if (knotIdx === void 0) {
          throw new Error("Missing type index for " + knot);
        }
        this._typs[idx] = this._typs[knotIdx];
        this._typs.splice(knotIdx, 1);
        this._idx.delete(knot);
      }
      encode() {
        const len = (0, leb128_1.lebEncode)(this._typs.length);
        const buf = (0, buffer_1.concat)(...this._typs);
        return (0, buffer_1.concat)(len, buf);
      }
      indexOf(typeName) {
        if (!this._idx.has(typeName)) {
          throw new Error("Missing type index for " + typeName);
        }
        return (0, leb128_1.slebEncode)(this._idx.get(typeName) || 0);
      }
    };
    var Visitor2 = class {
      visitType(t, data) {
        throw new Error("Not implemented");
      }
      visitPrimitive(t, data) {
        return this.visitType(t, data);
      }
      visitEmpty(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitBool(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitNull(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitReserved(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitText(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitNumber(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitInt(t, data) {
        return this.visitNumber(t, data);
      }
      visitNat(t, data) {
        return this.visitNumber(t, data);
      }
      visitFloat(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitFixedInt(t, data) {
        return this.visitNumber(t, data);
      }
      visitFixedNat(t, data) {
        return this.visitNumber(t, data);
      }
      visitPrincipal(t, data) {
        return this.visitPrimitive(t, data);
      }
      visitConstruct(t, data) {
        return this.visitType(t, data);
      }
      visitVec(t, ty, data) {
        return this.visitConstruct(t, data);
      }
      visitOpt(t, ty, data) {
        return this.visitConstruct(t, data);
      }
      visitRecord(t, fields, data) {
        return this.visitConstruct(t, data);
      }
      visitTuple(t, components, data) {
        const fields = components.map((ty, i) => [`_${i}_`, ty]);
        return this.visitRecord(t, fields, data);
      }
      visitVariant(t, fields, data) {
        return this.visitConstruct(t, data);
      }
      visitRec(t, ty, data) {
        return this.visitConstruct(ty, data);
      }
      visitFunc(t, data) {
        return this.visitConstruct(t, data);
      }
      visitService(t, data) {
        return this.visitConstruct(t, data);
      }
    };
    exports2.Visitor = Visitor2;
    var Type2 = class {
      /* Display type name */
      display() {
        return this.name;
      }
      valueToString(x2) {
        return toReadableString2(x2);
      }
      /* Implement `T` in the IDL spec, only needed for non-primitive types */
      buildTypeTable(typeTable) {
        if (!typeTable.has(this)) {
          this._buildTypeTableImpl(typeTable);
        }
      }
    };
    exports2.Type = Type2;
    var PrimitiveType2 = class extends Type2 {
      checkType(t) {
        if (this.name !== t.name) {
          throw new Error(`type mismatch: type on the wire ${t.name}, expect type ${this.name}`);
        }
        return t;
      }
      _buildTypeTableImpl(typeTable) {
        return;
      }
    };
    exports2.PrimitiveType = PrimitiveType2;
    var ConstructType2 = class extends Type2 {
      checkType(t) {
        if (t instanceof RecClass2) {
          const ty = t.getType();
          if (typeof ty === "undefined") {
            throw new Error("type mismatch with uninitialized type");
          }
          return ty;
        }
        throw new Error(`type mismatch: type on the wire ${t.name}, expect type ${this.name}`);
      }
      encodeType(typeTable) {
        return typeTable.indexOf(this.name);
      }
    };
    exports2.ConstructType = ConstructType2;
    var EmptyClass2 = class extends PrimitiveType2 {
      accept(v2, d) {
        return v2.visitEmpty(this, d);
      }
      covariant(x2) {
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue() {
        throw new Error("Empty cannot appear as a function argument");
      }
      valueToString() {
        throw new Error("Empty cannot appear as a value");
      }
      encodeType() {
        return (0, leb128_1.slebEncode)(
          -17
          /* IDLTypeIds.Empty */
        );
      }
      decodeValue() {
        throw new Error("Empty cannot appear as an output");
      }
      get name() {
        return "empty";
      }
    };
    exports2.EmptyClass = EmptyClass2;
    var UnknownClass2 = class extends Type2 {
      checkType(t) {
        throw new Error("Method not implemented for unknown.");
      }
      accept(v2, d) {
        throw v2.visitType(this, d);
      }
      covariant(x2) {
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue() {
        throw new Error("Unknown cannot appear as a function argument");
      }
      valueToString() {
        throw new Error("Unknown cannot appear as a value");
      }
      encodeType() {
        throw new Error("Unknown cannot be serialized");
      }
      decodeValue(b2, t) {
        let decodedValue = t.decodeValue(b2, t);
        if (Object(decodedValue) !== decodedValue) {
          decodedValue = Object(decodedValue);
        }
        let typeFunc;
        if (t instanceof RecClass2) {
          typeFunc = () => t.getType();
        } else {
          typeFunc = () => t;
        }
        Object.defineProperty(decodedValue, "type", {
          value: typeFunc,
          writable: true,
          enumerable: false,
          configurable: true
        });
        return decodedValue;
      }
      _buildTypeTableImpl() {
        throw new Error("Unknown cannot be serialized");
      }
      get name() {
        return "Unknown";
      }
    };
    exports2.UnknownClass = UnknownClass2;
    var BoolClass2 = class extends PrimitiveType2 {
      accept(v2, d) {
        return v2.visitBool(this, d);
      }
      covariant(x2) {
        if (typeof x2 === "boolean")
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        return new Uint8Array([x2 ? 1 : 0]);
      }
      encodeType() {
        return (0, leb128_1.slebEncode)(
          -2
          /* IDLTypeIds.Bool */
        );
      }
      decodeValue(b2, t) {
        this.checkType(t);
        switch ((0, leb128_1.safeReadUint8)(b2)) {
          case 0:
            return false;
          case 1:
            return true;
          default:
            throw new Error("Boolean value out of range");
        }
      }
      get name() {
        return "bool";
      }
    };
    exports2.BoolClass = BoolClass2;
    var NullClass2 = class extends PrimitiveType2 {
      accept(v2, d) {
        return v2.visitNull(this, d);
      }
      covariant(x2) {
        if (x2 === null)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue() {
        return new ArrayBuffer(0);
      }
      encodeType() {
        return (0, leb128_1.slebEncode)(
          -1
          /* IDLTypeIds.Null */
        );
      }
      decodeValue(b2, t) {
        this.checkType(t);
        return null;
      }
      get name() {
        return "null";
      }
    };
    exports2.NullClass = NullClass2;
    var ReservedClass2 = class extends PrimitiveType2 {
      accept(v2, d) {
        return v2.visitReserved(this, d);
      }
      covariant(x2) {
        return true;
      }
      encodeValue() {
        return new ArrayBuffer(0);
      }
      encodeType() {
        return (0, leb128_1.slebEncode)(
          -16
          /* IDLTypeIds.Reserved */
        );
      }
      decodeValue(b2, t) {
        if (t.name !== this.name) {
          t.decodeValue(b2, t);
        }
        return null;
      }
      get name() {
        return "reserved";
      }
    };
    exports2.ReservedClass = ReservedClass2;
    var TextClass2 = class extends PrimitiveType2 {
      accept(v2, d) {
        return v2.visitText(this, d);
      }
      covariant(x2) {
        if (typeof x2 === "string")
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        const buf = new TextEncoder().encode(x2);
        const len = (0, leb128_1.lebEncode)(buf.byteLength);
        return (0, buffer_1.concat)(len, buf);
      }
      encodeType() {
        return (0, leb128_1.slebEncode)(
          -15
          /* IDLTypeIds.Text */
        );
      }
      decodeValue(b2, t) {
        this.checkType(t);
        const len = (0, leb128_1.lebDecode)(b2);
        const buf = (0, leb128_1.safeRead)(b2, Number(len));
        const decoder = new TextDecoder("utf8", { fatal: true });
        return decoder.decode(buf);
      }
      get name() {
        return "text";
      }
      valueToString(x2) {
        return '"' + x2 + '"';
      }
    };
    exports2.TextClass = TextClass2;
    var IntClass2 = class extends PrimitiveType2 {
      accept(v2, d) {
        return v2.visitInt(this, d);
      }
      covariant(x2) {
        if (typeof x2 === "bigint" || Number.isInteger(x2))
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        return (0, leb128_1.slebEncode)(x2);
      }
      encodeType() {
        return (0, leb128_1.slebEncode)(
          -4
          /* IDLTypeIds.Int */
        );
      }
      decodeValue(b2, t) {
        this.checkType(t);
        return (0, leb128_1.slebDecode)(b2);
      }
      get name() {
        return "int";
      }
      valueToString(x2) {
        return x2.toString();
      }
    };
    exports2.IntClass = IntClass2;
    var NatClass2 = class extends PrimitiveType2 {
      accept(v2, d) {
        return v2.visitNat(this, d);
      }
      covariant(x2) {
        if (typeof x2 === "bigint" && x2 >= BigInt(0) || Number.isInteger(x2) && x2 >= 0)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        return (0, leb128_1.lebEncode)(x2);
      }
      encodeType() {
        return (0, leb128_1.slebEncode)(
          -3
          /* IDLTypeIds.Nat */
        );
      }
      decodeValue(b2, t) {
        this.checkType(t);
        return (0, leb128_1.lebDecode)(b2);
      }
      get name() {
        return "nat";
      }
      valueToString(x2) {
        return x2.toString();
      }
    };
    exports2.NatClass = NatClass2;
    var FloatClass2 = class extends PrimitiveType2 {
      constructor(_bits) {
        super();
        this._bits = _bits;
        if (_bits !== 32 && _bits !== 64) {
          throw new Error("not a valid float type");
        }
      }
      accept(v2, d) {
        return v2.visitFloat(this, d);
      }
      covariant(x2) {
        if (typeof x2 === "number" || x2 instanceof Number)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        const buf = new ArrayBuffer(this._bits / 8);
        const view = new DataView(buf);
        if (this._bits === 32) {
          view.setFloat32(0, x2, true);
        } else {
          view.setFloat64(0, x2, true);
        }
        return buf;
      }
      encodeType() {
        const opcode = this._bits === 32 ? -13 : -14;
        return (0, leb128_1.slebEncode)(opcode);
      }
      decodeValue(b2, t) {
        this.checkType(t);
        const bytes2 = (0, leb128_1.safeRead)(b2, this._bits / 8);
        const view = new DataView(bytes2);
        if (this._bits === 32) {
          return view.getFloat32(0, true);
        } else {
          return view.getFloat64(0, true);
        }
      }
      get name() {
        return "float" + this._bits;
      }
      valueToString(x2) {
        return x2.toString();
      }
    };
    exports2.FloatClass = FloatClass2;
    var FixedIntClass2 = class extends PrimitiveType2 {
      constructor(_bits) {
        super();
        this._bits = _bits;
      }
      accept(v2, d) {
        return v2.visitFixedInt(this, d);
      }
      covariant(x2) {
        const min = (0, bigint_math_1.iexp2)(this._bits - 1) * BigInt(-1);
        const max = (0, bigint_math_1.iexp2)(this._bits - 1) - BigInt(1);
        let ok = false;
        if (typeof x2 === "bigint") {
          ok = x2 >= min && x2 <= max;
        } else if (Number.isInteger(x2)) {
          const v2 = BigInt(x2);
          ok = v2 >= min && v2 <= max;
        } else {
          ok = false;
        }
        if (ok)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        return (0, leb128_1.writeIntLE)(x2, this._bits / 8);
      }
      encodeType() {
        const offset = Math.log2(this._bits) - 3;
        return (0, leb128_1.slebEncode)(-9 - offset);
      }
      decodeValue(b2, t) {
        this.checkType(t);
        const num = (0, leb128_1.readIntLE)(b2, this._bits / 8);
        if (this._bits <= 32) {
          return Number(num);
        } else {
          return num;
        }
      }
      get name() {
        return `int${this._bits}`;
      }
      valueToString(x2) {
        return x2.toString();
      }
    };
    exports2.FixedIntClass = FixedIntClass2;
    var FixedNatClass2 = class extends PrimitiveType2 {
      constructor(_bits) {
        super();
        this._bits = _bits;
      }
      accept(v2, d) {
        return v2.visitFixedNat(this, d);
      }
      covariant(x2) {
        const max = (0, bigint_math_1.iexp2)(this._bits);
        let ok = false;
        if (typeof x2 === "bigint" && x2 >= BigInt(0)) {
          ok = x2 < max;
        } else if (Number.isInteger(x2) && x2 >= 0) {
          const v2 = BigInt(x2);
          ok = v2 < max;
        } else {
          ok = false;
        }
        if (ok)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        return (0, leb128_1.writeUIntLE)(x2, this._bits / 8);
      }
      encodeType() {
        const offset = Math.log2(this._bits) - 3;
        return (0, leb128_1.slebEncode)(-5 - offset);
      }
      decodeValue(b2, t) {
        this.checkType(t);
        const num = (0, leb128_1.readUIntLE)(b2, this._bits / 8);
        if (this._bits <= 32) {
          return Number(num);
        } else {
          return num;
        }
      }
      get name() {
        return `nat${this._bits}`;
      }
      valueToString(x2) {
        return x2.toString();
      }
    };
    exports2.FixedNatClass = FixedNatClass2;
    var VecClass2 = class _VecClass extends ConstructType2 {
      constructor(_type) {
        super();
        this._type = _type;
        this._blobOptimization = false;
        if (_type instanceof FixedNatClass2 && _type._bits === 8) {
          this._blobOptimization = true;
        }
      }
      accept(v2, d) {
        return v2.visitVec(this, this._type, d);
      }
      covariant(x2) {
        const bits = this._type instanceof FixedNatClass2 ? this._type._bits : this._type instanceof FixedIntClass2 ? this._type._bits : 0;
        if (ArrayBuffer.isView(x2) && bits == x2.BYTES_PER_ELEMENT * 8 || Array.isArray(x2) && x2.every((v2, idx) => {
          try {
            return this._type.covariant(v2);
          } catch (e) {
            throw new Error(`Invalid ${this.display()} argument: 

index ${idx} -> ${e.message}`);
          }
        }))
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        const len = (0, leb128_1.lebEncode)(x2.length);
        if (this._blobOptimization) {
          return (0, buffer_1.concat)(len, new Uint8Array(x2));
        }
        if (ArrayBuffer.isView(x2)) {
          return (0, buffer_1.concat)(len, new Uint8Array(x2.buffer));
        }
        const buf = new buffer_1.PipeArrayBuffer(new ArrayBuffer(len.byteLength + x2.length), 0);
        buf.write(len);
        for (const d of x2) {
          const encoded = this._type.encodeValue(d);
          buf.write(new Uint8Array(encoded));
        }
        return buf.buffer;
      }
      _buildTypeTableImpl(typeTable) {
        this._type.buildTypeTable(typeTable);
        const opCode = (0, leb128_1.slebEncode)(
          -19
          /* IDLTypeIds.Vector */
        );
        const buffer = this._type.encodeType(typeTable);
        typeTable.add(this, (0, buffer_1.concat)(opCode, buffer));
      }
      decodeValue(b2, t) {
        const vec = this.checkType(t);
        if (!(vec instanceof _VecClass)) {
          throw new Error("Not a vector type");
        }
        const len = Number((0, leb128_1.lebDecode)(b2));
        if (this._type instanceof FixedNatClass2) {
          if (this._type._bits == 8) {
            return new Uint8Array(b2.read(len));
          }
          if (this._type._bits == 16) {
            return new Uint16Array(b2.read(len * 2));
          }
          if (this._type._bits == 32) {
            return new Uint32Array(b2.read(len * 4));
          }
          if (this._type._bits == 64) {
            return new BigUint64Array(b2.read(len * 8));
          }
        }
        if (this._type instanceof FixedIntClass2) {
          if (this._type._bits == 8) {
            return new Int8Array(b2.read(len));
          }
          if (this._type._bits == 16) {
            return new Int16Array(b2.read(len * 2));
          }
          if (this._type._bits == 32) {
            return new Int32Array(b2.read(len * 4));
          }
          if (this._type._bits == 64) {
            return new BigInt64Array(b2.read(len * 8));
          }
        }
        const rets = [];
        for (let i = 0; i < len; i++) {
          rets.push(this._type.decodeValue(b2, vec._type));
        }
        return rets;
      }
      get name() {
        return `vec ${this._type.name}`;
      }
      display() {
        return `vec ${this._type.display()}`;
      }
      valueToString(x2) {
        const elements = x2.map((e) => this._type.valueToString(e));
        return "vec {" + elements.join("; ") + "}";
      }
    };
    exports2.VecClass = VecClass2;
    var OptClass2 = class _OptClass extends ConstructType2 {
      constructor(_type) {
        super();
        this._type = _type;
      }
      accept(v2, d) {
        return v2.visitOpt(this, this._type, d);
      }
      covariant(x2) {
        try {
          if (Array.isArray(x2) && (x2.length === 0 || x2.length === 1 && this._type.covariant(x2[0])))
            return true;
        } catch (e) {
          throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)} 

-> ${e.message}`);
        }
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        if (x2.length === 0) {
          return new Uint8Array([0]);
        } else {
          return (0, buffer_1.concat)(new Uint8Array([1]), this._type.encodeValue(x2[0]));
        }
      }
      _buildTypeTableImpl(typeTable) {
        this._type.buildTypeTable(typeTable);
        const opCode = (0, leb128_1.slebEncode)(
          -18
          /* IDLTypeIds.Opt */
        );
        const buffer = this._type.encodeType(typeTable);
        typeTable.add(this, (0, buffer_1.concat)(opCode, buffer));
      }
      decodeValue(b2, t) {
        const opt = this.checkType(t);
        if (!(opt instanceof _OptClass)) {
          throw new Error("Not an option type");
        }
        switch ((0, leb128_1.safeReadUint8)(b2)) {
          case 0:
            return [];
          case 1:
            return [this._type.decodeValue(b2, opt._type)];
          default:
            throw new Error("Not an option value");
        }
      }
      get name() {
        return `opt ${this._type.name}`;
      }
      display() {
        return `opt ${this._type.display()}`;
      }
      valueToString(x2) {
        if (x2.length === 0) {
          return "null";
        } else {
          return `opt ${this._type.valueToString(x2[0])}`;
        }
      }
    };
    exports2.OptClass = OptClass2;
    var RecordClass2 = class _RecordClass extends ConstructType2 {
      constructor(fields = {}) {
        super();
        this._fields = Object.entries(fields).sort((a, b2) => (0, hash_1.idlLabelToId)(a[0]) - (0, hash_1.idlLabelToId)(b2[0]));
      }
      accept(v2, d) {
        return v2.visitRecord(this, this._fields, d);
      }
      tryAsTuple() {
        const res = [];
        for (let i = 0; i < this._fields.length; i++) {
          const [key, type] = this._fields[i];
          if (key !== `_${i}_`) {
            return null;
          }
          res.push(type);
        }
        return res;
      }
      covariant(x2) {
        if (typeof x2 === "object" && this._fields.every(([k2, t]) => {
          if (!x2.hasOwnProperty(k2)) {
            throw new Error(`Record is missing key "${k2}".`);
          }
          try {
            return t.covariant(x2[k2]);
          } catch (e) {
            throw new Error(`Invalid ${this.display()} argument: 

field ${k2} -> ${e.message}`);
          }
        }))
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        const values = this._fields.map(([key]) => x2[key]);
        const bufs = zipWith2(this._fields, values, ([, c], d) => c.encodeValue(d));
        return (0, buffer_1.concat)(...bufs);
      }
      _buildTypeTableImpl(T) {
        this._fields.forEach(([_, value4]) => value4.buildTypeTable(T));
        const opCode = (0, leb128_1.slebEncode)(
          -20
          /* IDLTypeIds.Record */
        );
        const len = (0, leb128_1.lebEncode)(this._fields.length);
        const fields = this._fields.map(([key, value4]) => (0, buffer_1.concat)((0, leb128_1.lebEncode)((0, hash_1.idlLabelToId)(key)), value4.encodeType(T)));
        T.add(this, (0, buffer_1.concat)(opCode, len, (0, buffer_1.concat)(...fields)));
      }
      decodeValue(b2, t) {
        const record = this.checkType(t);
        if (!(record instanceof _RecordClass)) {
          throw new Error("Not a record type");
        }
        const x2 = {};
        let expectedRecordIdx = 0;
        let actualRecordIdx = 0;
        while (actualRecordIdx < record._fields.length) {
          const [hash2, type] = record._fields[actualRecordIdx];
          if (expectedRecordIdx >= this._fields.length) {
            type.decodeValue(b2, type);
            actualRecordIdx++;
            continue;
          }
          const [expectKey, expectType] = this._fields[expectedRecordIdx];
          const expectedId = (0, hash_1.idlLabelToId)(this._fields[expectedRecordIdx][0]);
          const actualId = (0, hash_1.idlLabelToId)(hash2);
          if (expectedId === actualId) {
            x2[expectKey] = expectType.decodeValue(b2, type);
            expectedRecordIdx++;
            actualRecordIdx++;
          } else if (actualId > expectedId) {
            if (expectType instanceof OptClass2 || expectType instanceof ReservedClass2) {
              x2[expectKey] = [];
              expectedRecordIdx++;
            } else {
              throw new Error("Cannot find required field " + expectKey);
            }
          } else {
            type.decodeValue(b2, type);
            actualRecordIdx++;
          }
        }
        for (const [expectKey, expectType] of this._fields.slice(expectedRecordIdx)) {
          if (expectType instanceof OptClass2 || expectType instanceof ReservedClass2) {
            x2[expectKey] = [];
          } else {
            throw new Error("Cannot find required field " + expectKey);
          }
        }
        return x2;
      }
      get name() {
        const fields = this._fields.map(([key, value4]) => key + ":" + value4.name);
        return `record {${fields.join("; ")}}`;
      }
      display() {
        const fields = this._fields.map(([key, value4]) => key + ":" + value4.display());
        return `record {${fields.join("; ")}}`;
      }
      valueToString(x2) {
        const values = this._fields.map(([key]) => x2[key]);
        const fields = zipWith2(this._fields, values, ([k2, c], d) => k2 + "=" + c.valueToString(d));
        return `record {${fields.join("; ")}}`;
      }
    };
    exports2.RecordClass = RecordClass2;
    var TupleClass2 = class _TupleClass extends RecordClass2 {
      constructor(_components) {
        const x2 = {};
        _components.forEach((e, i) => x2["_" + i + "_"] = e);
        super(x2);
        this._components = _components;
      }
      accept(v2, d) {
        return v2.visitTuple(this, this._components, d);
      }
      covariant(x2) {
        if (Array.isArray(x2) && x2.length >= this._fields.length && this._components.every((t, i) => {
          try {
            return t.covariant(x2[i]);
          } catch (e) {
            throw new Error(`Invalid ${this.display()} argument: 

index ${i} -> ${e.message}`);
          }
        }))
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        const bufs = zipWith2(this._components, x2, (c, d) => c.encodeValue(d));
        return (0, buffer_1.concat)(...bufs);
      }
      decodeValue(b2, t) {
        const tuple = this.checkType(t);
        if (!(tuple instanceof _TupleClass)) {
          throw new Error("not a tuple type");
        }
        if (tuple._components.length < this._components.length) {
          throw new Error("tuple mismatch");
        }
        const res = [];
        for (const [i, wireType] of tuple._components.entries()) {
          if (i >= this._components.length) {
            wireType.decodeValue(b2, wireType);
          } else {
            res.push(this._components[i].decodeValue(b2, wireType));
          }
        }
        return res;
      }
      display() {
        const fields = this._components.map((value4) => value4.display());
        return `record {${fields.join("; ")}}`;
      }
      valueToString(values) {
        const fields = zipWith2(this._components, values, (c, d) => c.valueToString(d));
        return `record {${fields.join("; ")}}`;
      }
    };
    exports2.TupleClass = TupleClass2;
    var VariantClass2 = class _VariantClass extends ConstructType2 {
      constructor(fields = {}) {
        super();
        this._fields = Object.entries(fields).sort((a, b2) => (0, hash_1.idlLabelToId)(a[0]) - (0, hash_1.idlLabelToId)(b2[0]));
      }
      accept(v2, d) {
        return v2.visitVariant(this, this._fields, d);
      }
      covariant(x2) {
        if (typeof x2 === "object" && Object.entries(x2).length === 1 && this._fields.every(([k2, v2]) => {
          try {
            return !x2.hasOwnProperty(k2) || v2.covariant(x2[k2]);
          } catch (e) {
            throw new Error(`Invalid ${this.display()} argument: 

variant ${k2} -> ${e.message}`);
          }
        }))
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        for (let i = 0; i < this._fields.length; i++) {
          const [name, type] = this._fields[i];
          if (x2.hasOwnProperty(name)) {
            const idx = (0, leb128_1.lebEncode)(i);
            const buf = type.encodeValue(x2[name]);
            return (0, buffer_1.concat)(idx, buf);
          }
        }
        throw Error("Variant has no data: " + x2);
      }
      _buildTypeTableImpl(typeTable) {
        this._fields.forEach(([, type]) => {
          type.buildTypeTable(typeTable);
        });
        const opCode = (0, leb128_1.slebEncode)(
          -21
          /* IDLTypeIds.Variant */
        );
        const len = (0, leb128_1.lebEncode)(this._fields.length);
        const fields = this._fields.map(([key, value4]) => (0, buffer_1.concat)((0, leb128_1.lebEncode)((0, hash_1.idlLabelToId)(key)), value4.encodeType(typeTable)));
        typeTable.add(this, (0, buffer_1.concat)(opCode, len, ...fields));
      }
      decodeValue(b2, t) {
        const variant = this.checkType(t);
        if (!(variant instanceof _VariantClass)) {
          throw new Error("Not a variant type");
        }
        const idx = Number((0, leb128_1.lebDecode)(b2));
        if (idx >= variant._fields.length) {
          throw Error("Invalid variant index: " + idx);
        }
        const [wireHash, wireType] = variant._fields[idx];
        for (const [key, expectType] of this._fields) {
          if ((0, hash_1.idlLabelToId)(wireHash) === (0, hash_1.idlLabelToId)(key)) {
            const value4 = expectType.decodeValue(b2, wireType);
            return { [key]: value4 };
          }
        }
        throw new Error("Cannot find field hash " + wireHash);
      }
      get name() {
        const fields = this._fields.map(([key, type]) => key + ":" + type.name);
        return `variant {${fields.join("; ")}}`;
      }
      display() {
        const fields = this._fields.map(([key, type]) => key + (type.name === "null" ? "" : `:${type.display()}`));
        return `variant {${fields.join("; ")}}`;
      }
      valueToString(x2) {
        for (const [name, type] of this._fields) {
          if (x2.hasOwnProperty(name)) {
            const value4 = type.valueToString(x2[name]);
            if (value4 === "null") {
              return `variant {${name}}`;
            } else {
              return `variant {${name}=${value4}}`;
            }
          }
        }
        throw new Error("Variant has no data: " + x2);
      }
    };
    exports2.VariantClass = VariantClass2;
    var RecClass2 = class _RecClass extends ConstructType2 {
      constructor() {
        super(...arguments);
        this._id = _RecClass._counter++;
        this._type = void 0;
      }
      accept(v2, d) {
        if (!this._type) {
          throw Error("Recursive type uninitialized.");
        }
        return v2.visitRec(this, this._type, d);
      }
      fill(t) {
        this._type = t;
      }
      getType() {
        return this._type;
      }
      covariant(x2) {
        if (this._type ? this._type.covariant(x2) : false)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        if (!this._type) {
          throw Error("Recursive type uninitialized.");
        }
        return this._type.encodeValue(x2);
      }
      _buildTypeTableImpl(typeTable) {
        if (!this._type) {
          throw Error("Recursive type uninitialized.");
        }
        typeTable.add(this, new Uint8Array([]));
        this._type.buildTypeTable(typeTable);
        typeTable.merge(this, this._type.name);
      }
      decodeValue(b2, t) {
        if (!this._type) {
          throw Error("Recursive type uninitialized.");
        }
        return this._type.decodeValue(b2, t);
      }
      get name() {
        return `rec_${this._id}`;
      }
      display() {
        if (!this._type) {
          throw Error("Recursive type uninitialized.");
        }
        return `\u03BC${this.name}.${this._type.name}`;
      }
      valueToString(x2) {
        if (!this._type) {
          throw Error("Recursive type uninitialized.");
        }
        return this._type.valueToString(x2);
      }
    };
    exports2.RecClass = RecClass2;
    RecClass2._counter = 0;
    function decodePrincipalId2(b2) {
      const x2 = (0, leb128_1.safeReadUint8)(b2);
      if (x2 !== 1) {
        throw new Error("Cannot decode principal");
      }
      const len = Number((0, leb128_1.lebDecode)(b2));
      return principal_1.Principal.fromUint8Array(new Uint8Array((0, leb128_1.safeRead)(b2, len)));
    }
    var PrincipalClass2 = class extends PrimitiveType2 {
      accept(v2, d) {
        return v2.visitPrincipal(this, d);
      }
      covariant(x2) {
        if (x2 && x2._isPrincipal)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        const buf = x2.toUint8Array();
        const len = (0, leb128_1.lebEncode)(buf.byteLength);
        return (0, buffer_1.concat)(new Uint8Array([1]), len, buf);
      }
      encodeType() {
        return (0, leb128_1.slebEncode)(
          -24
          /* IDLTypeIds.Principal */
        );
      }
      decodeValue(b2, t) {
        this.checkType(t);
        return decodePrincipalId2(b2);
      }
      get name() {
        return "principal";
      }
      valueToString(x2) {
        return `${this.name} "${x2.toText()}"`;
      }
    };
    exports2.PrincipalClass = PrincipalClass2;
    var FuncClass2 = class extends ConstructType2 {
      constructor(argTypes, retTypes, annotations = []) {
        super();
        this.argTypes = argTypes;
        this.retTypes = retTypes;
        this.annotations = annotations;
      }
      static argsToString(types, v2) {
        if (types.length !== v2.length) {
          throw new Error("arity mismatch");
        }
        return "(" + types.map((t, i) => t.valueToString(v2[i])).join(", ") + ")";
      }
      accept(v2, d) {
        return v2.visitFunc(this, d);
      }
      covariant(x2) {
        if (Array.isArray(x2) && x2.length === 2 && x2[0] && x2[0]._isPrincipal && typeof x2[1] === "string")
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue([principal, methodName]) {
        const buf = principal.toUint8Array();
        const len = (0, leb128_1.lebEncode)(buf.byteLength);
        const canister = (0, buffer_1.concat)(new Uint8Array([1]), len, buf);
        const method2 = new TextEncoder().encode(methodName);
        const methodLen = (0, leb128_1.lebEncode)(method2.byteLength);
        return (0, buffer_1.concat)(new Uint8Array([1]), canister, methodLen, method2);
      }
      _buildTypeTableImpl(T) {
        this.argTypes.forEach((arg) => arg.buildTypeTable(T));
        this.retTypes.forEach((arg) => arg.buildTypeTable(T));
        const opCode = (0, leb128_1.slebEncode)(
          -22
          /* IDLTypeIds.Func */
        );
        const argLen = (0, leb128_1.lebEncode)(this.argTypes.length);
        const args = (0, buffer_1.concat)(...this.argTypes.map((arg) => arg.encodeType(T)));
        const retLen = (0, leb128_1.lebEncode)(this.retTypes.length);
        const rets = (0, buffer_1.concat)(...this.retTypes.map((arg) => arg.encodeType(T)));
        const annLen = (0, leb128_1.lebEncode)(this.annotations.length);
        const anns = (0, buffer_1.concat)(...this.annotations.map((a) => this.encodeAnnotation(a)));
        T.add(this, (0, buffer_1.concat)(opCode, argLen, args, retLen, rets, annLen, anns));
      }
      decodeValue(b2) {
        const x2 = (0, leb128_1.safeReadUint8)(b2);
        if (x2 !== 1) {
          throw new Error("Cannot decode function reference");
        }
        const canister = decodePrincipalId2(b2);
        const mLen = Number((0, leb128_1.lebDecode)(b2));
        const buf = (0, leb128_1.safeRead)(b2, mLen);
        const decoder = new TextDecoder("utf8", { fatal: true });
        const method2 = decoder.decode(buf);
        return [canister, method2];
      }
      get name() {
        const args = this.argTypes.map((arg) => arg.name).join(", ");
        const rets = this.retTypes.map((arg) => arg.name).join(", ");
        const annon = " " + this.annotations.join(" ");
        return `(${args}) -> (${rets})${annon}`;
      }
      valueToString([principal, str]) {
        return `func "${principal.toText()}".${str}`;
      }
      display() {
        const args = this.argTypes.map((arg) => arg.display()).join(", ");
        const rets = this.retTypes.map((arg) => arg.display()).join(", ");
        const annon = " " + this.annotations.join(" ");
        return `(${args}) \u2192 (${rets})${annon}`;
      }
      encodeAnnotation(ann) {
        if (ann === "query") {
          return new Uint8Array([1]);
        } else if (ann === "oneway") {
          return new Uint8Array([2]);
        } else {
          throw new Error("Illegal function annotation");
        }
      }
    };
    exports2.FuncClass = FuncClass2;
    var ServiceClass2 = class extends ConstructType2 {
      constructor(fields) {
        super();
        this._fields = Object.entries(fields).sort((a, b2) => (0, hash_1.idlLabelToId)(a[0]) - (0, hash_1.idlLabelToId)(b2[0]));
      }
      accept(v2, d) {
        return v2.visitService(this, d);
      }
      covariant(x2) {
        if (x2 && x2._isPrincipal)
          return true;
        throw new Error(`Invalid ${this.display()} argument: ${toReadableString2(x2)}`);
      }
      encodeValue(x2) {
        const buf = x2.toUint8Array();
        const len = (0, leb128_1.lebEncode)(buf.length);
        return (0, buffer_1.concat)(new Uint8Array([1]), len, buf);
      }
      _buildTypeTableImpl(T) {
        this._fields.forEach(([_, func]) => func.buildTypeTable(T));
        const opCode = (0, leb128_1.slebEncode)(
          -23
          /* IDLTypeIds.Service */
        );
        const len = (0, leb128_1.lebEncode)(this._fields.length);
        const meths = this._fields.map(([label, func]) => {
          const labelBuf = new TextEncoder().encode(label);
          const labelLen = (0, leb128_1.lebEncode)(labelBuf.length);
          return (0, buffer_1.concat)(labelLen, labelBuf, func.encodeType(T));
        });
        T.add(this, (0, buffer_1.concat)(opCode, len, ...meths));
      }
      decodeValue(b2) {
        return decodePrincipalId2(b2);
      }
      get name() {
        const fields = this._fields.map(([key, value4]) => key + ":" + value4.name);
        return `service {${fields.join("; ")}}`;
      }
      valueToString(x2) {
        return `service "${x2.toText()}"`;
      }
    };
    exports2.ServiceClass = ServiceClass2;
    function toReadableString2(x2) {
      const str = JSON.stringify(x2, (_key, value4) => typeof value4 === "bigint" ? `BigInt(${value4})` : value4);
      return str && str.length > toReadableString_max2 ? str.substring(0, toReadableString_max2 - 3) + "..." : str;
    }
    function encode4(argTypes, args) {
      if (args.length < argTypes.length) {
        throw Error("Wrong number of message arguments");
      }
      const typeTable = new TypeTable2();
      argTypes.forEach((t) => t.buildTypeTable(typeTable));
      const magic = new TextEncoder().encode(magicNumber2);
      const table = typeTable.encode();
      const len = (0, leb128_1.lebEncode)(args.length);
      const typs = (0, buffer_1.concat)(...argTypes.map((t) => t.encodeType(typeTable)));
      const vals = (0, buffer_1.concat)(...zipWith2(argTypes, args, (t, x2) => {
        try {
          t.covariant(x2);
        } catch (e) {
          const err = new Error(e.message + "\n\n");
          throw err;
        }
        return t.encodeValue(x2);
      }));
      return (0, buffer_1.concat)(magic, table, len, typs, vals);
    }
    exports2.encode = encode4;
    function decode5(retTypes, bytes2) {
      const b2 = new buffer_1.PipeArrayBuffer(bytes2);
      if (bytes2.byteLength < magicNumber2.length) {
        throw new Error("Message length smaller than magic number");
      }
      const magicBuffer = (0, leb128_1.safeRead)(b2, magicNumber2.length);
      const magic = new TextDecoder().decode(magicBuffer);
      if (magic !== magicNumber2) {
        throw new Error("Wrong magic number: " + JSON.stringify(magic));
      }
      function readTypeTable(pipe) {
        const typeTable = [];
        const len = Number((0, leb128_1.lebDecode)(pipe));
        for (let i = 0; i < len; i++) {
          const ty = Number((0, leb128_1.slebDecode)(pipe));
          switch (ty) {
            case -18:
            case -19: {
              const t = Number((0, leb128_1.slebDecode)(pipe));
              typeTable.push([ty, t]);
              break;
            }
            case -20:
            case -21: {
              const fields = [];
              let objectLength = Number((0, leb128_1.lebDecode)(pipe));
              let prevHash;
              while (objectLength--) {
                const hash2 = Number((0, leb128_1.lebDecode)(pipe));
                if (hash2 >= Math.pow(2, 32)) {
                  throw new Error("field id out of 32-bit range");
                }
                if (typeof prevHash === "number" && prevHash >= hash2) {
                  throw new Error("field id collision or not sorted");
                }
                prevHash = hash2;
                const t = Number((0, leb128_1.slebDecode)(pipe));
                fields.push([hash2, t]);
              }
              typeTable.push([ty, fields]);
              break;
            }
            case -22: {
              const args = [];
              let argLength = Number((0, leb128_1.lebDecode)(pipe));
              while (argLength--) {
                args.push(Number((0, leb128_1.slebDecode)(pipe)));
              }
              const returnValues = [];
              let returnValuesLength = Number((0, leb128_1.lebDecode)(pipe));
              while (returnValuesLength--) {
                returnValues.push(Number((0, leb128_1.slebDecode)(pipe)));
              }
              const annotations = [];
              let annotationLength = Number((0, leb128_1.lebDecode)(pipe));
              while (annotationLength--) {
                const annotation = Number((0, leb128_1.lebDecode)(pipe));
                switch (annotation) {
                  case 1: {
                    annotations.push("query");
                    break;
                  }
                  case 2: {
                    annotations.push("oneway");
                    break;
                  }
                  default:
                    throw new Error("unknown annotation");
                }
              }
              typeTable.push([ty, [args, returnValues, annotations]]);
              break;
            }
            case -23: {
              let servLength = Number((0, leb128_1.lebDecode)(pipe));
              const methods = [];
              while (servLength--) {
                const nameLength = Number((0, leb128_1.lebDecode)(pipe));
                const funcName = new TextDecoder().decode((0, leb128_1.safeRead)(pipe, nameLength));
                const funcType = (0, leb128_1.slebDecode)(pipe);
                methods.push([funcName, funcType]);
              }
              typeTable.push([ty, methods]);
              break;
            }
            default:
              throw new Error("Illegal op_code: " + ty);
          }
        }
        const rawList = [];
        const length = Number((0, leb128_1.lebDecode)(pipe));
        for (let i = 0; i < length; i++) {
          rawList.push(Number((0, leb128_1.slebDecode)(pipe)));
        }
        return [typeTable, rawList];
      }
      const [rawTable, rawTypes] = readTypeTable(b2);
      if (rawTypes.length < retTypes.length) {
        throw new Error("Wrong number of return values");
      }
      const table = rawTable.map((_) => Rec2());
      function getType(t) {
        if (t < -24) {
          throw new Error("future value not supported");
        }
        if (t < 0) {
          switch (t) {
            case -1:
              return exports2.Null;
            case -2:
              return exports2.Bool;
            case -3:
              return exports2.Nat;
            case -4:
              return exports2.Int;
            case -5:
              return exports2.Nat8;
            case -6:
              return exports2.Nat16;
            case -7:
              return exports2.Nat32;
            case -8:
              return exports2.Nat64;
            case -9:
              return exports2.Int8;
            case -10:
              return exports2.Int16;
            case -11:
              return exports2.Int32;
            case -12:
              return exports2.Int64;
            case -13:
              return exports2.Float32;
            case -14:
              return exports2.Float64;
            case -15:
              return exports2.Text;
            case -16:
              return exports2.Reserved;
            case -17:
              return exports2.Empty;
            case -24:
              return exports2.Principal;
            default:
              throw new Error("Illegal op_code: " + t);
          }
        }
        if (t >= rawTable.length) {
          throw new Error("type index out of range");
        }
        return table[t];
      }
      function buildType(entry) {
        switch (entry[0]) {
          case -19: {
            const ty = getType(entry[1]);
            return Vec2(ty);
          }
          case -18: {
            const ty = getType(entry[1]);
            return Opt2(ty);
          }
          case -20: {
            const fields = {};
            for (const [hash2, ty] of entry[1]) {
              const name = `_${hash2}_`;
              fields[name] = getType(ty);
            }
            const record = Record2(fields);
            const tuple = record.tryAsTuple();
            if (Array.isArray(tuple)) {
              return Tuple2(...tuple);
            } else {
              return record;
            }
          }
          case -21: {
            const fields = {};
            for (const [hash2, ty] of entry[1]) {
              const name = `_${hash2}_`;
              fields[name] = getType(ty);
            }
            return Variant2(fields);
          }
          case -22: {
            const [args, returnValues, annotations] = entry[1];
            return Func2(args.map((t) => getType(t)), returnValues.map((t) => getType(t)), annotations);
          }
          case -23: {
            const rec = {};
            const methods = entry[1];
            for (const [name, typeRef] of methods) {
              let type = getType(typeRef);
              if (type instanceof RecClass2) {
                type = type.getType();
              }
              if (!(type instanceof FuncClass2)) {
                throw new Error("Illegal service definition: services can only contain functions");
              }
              rec[name] = type;
            }
            return Service2(rec);
          }
          default:
            throw new Error("Illegal op_code: " + entry[0]);
        }
      }
      rawTable.forEach((entry, i) => {
        const t = buildType(entry);
        table[i].fill(t);
      });
      const types = rawTypes.map((t) => getType(t));
      const output2 = retTypes.map((t, i) => {
        return t.decodeValue(b2, types[i]);
      });
      for (let ind = retTypes.length; ind < types.length; ind++) {
        types[ind].decodeValue(b2, types[ind]);
      }
      if (b2.byteLength > 0) {
        throw new Error("decode: Left-over bytes");
      }
      return output2;
    }
    exports2.decode = decode5;
    exports2.Empty = new EmptyClass2();
    exports2.Reserved = new ReservedClass2();
    exports2.Unknown = new UnknownClass2();
    exports2.Bool = new BoolClass2();
    exports2.Null = new NullClass2();
    exports2.Text = new TextClass2();
    exports2.Int = new IntClass2();
    exports2.Nat = new NatClass2();
    exports2.Float32 = new FloatClass2(32);
    exports2.Float64 = new FloatClass2(64);
    exports2.Int8 = new FixedIntClass2(8);
    exports2.Int16 = new FixedIntClass2(16);
    exports2.Int32 = new FixedIntClass2(32);
    exports2.Int64 = new FixedIntClass2(64);
    exports2.Nat8 = new FixedNatClass2(8);
    exports2.Nat16 = new FixedNatClass2(16);
    exports2.Nat32 = new FixedNatClass2(32);
    exports2.Nat64 = new FixedNatClass2(64);
    exports2.Principal = new PrincipalClass2();
    function Tuple2(...types) {
      return new TupleClass2(types);
    }
    exports2.Tuple = Tuple2;
    function Vec2(t) {
      return new VecClass2(t);
    }
    exports2.Vec = Vec2;
    function Opt2(t) {
      return new OptClass2(t);
    }
    exports2.Opt = Opt2;
    function Record2(t) {
      return new RecordClass2(t);
    }
    exports2.Record = Record2;
    function Variant2(fields) {
      return new VariantClass2(fields);
    }
    exports2.Variant = Variant2;
    function Rec2() {
      return new RecClass2();
    }
    exports2.Rec = Rec2;
    function Func2(args, ret, annotations = []) {
      return new FuncClass2(args, ret, annotations);
    }
    exports2.Func = Func2;
    function Service2(t) {
      return new ServiceClass2(t);
    }
    exports2.Service = Service2;
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/cjs/data.js
var require_data = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/cjs/data.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.uploadFile = exports2.toHexString = exports2.numberToBytesArray = exports2.jsonToNat8 = exports2.generateKeyHashPair = exports2.fromHexString = exports2.err2text = exports2.encodeLink = exports2.encodeArrayBuffer = exports2.djb2xor = exports2.decodeLink = exports2.chunkBlob = exports2.bytesToBase58 = exports2.bytesArrayToNumber = exports2.blobPrepare = exports2.base58ToBytes = exports2.SerializableIC = exports2.BigIntToString = void 0;
    var _baseX = _interopRequireDefault(require_src3());
    var _sha = require_sha224();
    var _idl = require_idl();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    var bs58 = (0, _baseX.default)(BASE58);
    var bytesArrayToNumber = (a) => {
      let n = 0;
      for (let i = a.length - 1; i >= 0; i--) {
        n += Math.pow(256, a.length - i - 1) * a[i];
      }
      return n;
    };
    exports2.bytesArrayToNumber = bytesArrayToNumber;
    var SerializableIC = (x2) => {
      if (x2 === void 0 || x2 === null)
        return x2;
      if (typeof x2 === "bigint")
        return x2.toString();
      if (ArrayBuffer.isView(x2) || x2 instanceof ArrayBuffer)
        return [...x2].map((y) => SerializableIC(y));
      if (Array.isArray(x2)) {
        return x2.map((y) => SerializableIC(y));
      }
      if (typeof x2 === "object") {
        if ("toText" in x2)
          return x2.toText();
        return Object.fromEntries(Object.keys(x2).map((k2) => {
          return [k2, SerializableIC(x2[k2])];
        }));
      }
      return x2;
    };
    exports2.SerializableIC = SerializableIC;
    var BigIntToString = (x2) => {
      if (typeof x2 === "bigint")
        return x2.toString();
      if (Array.isArray(x2)) {
        return x2.map((y) => BigIntToString(y));
      }
      if (typeof x2 === "object")
        return Object.fromEntries(Object.keys(x2).map((k2) => {
          return [k2, BigIntToString(x2[k2])];
        }));
      return x2;
    };
    exports2.BigIntToString = BigIntToString;
    var numberToBytesArray = (n, size) => {
      n = Number(n);
      const a = Array(size).fill(0);
      for (let i = 0; i < size; i++) {
        a[i] = n & 255;
        n = n >>> 8;
      }
      return new Uint8Array(a.reverse());
    };
    exports2.numberToBytesArray = numberToBytesArray;
    var generateKeyHashPair = function() {
      let getRandomValues = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      let key = getRandomValues ? getRandomValues(new Uint8Array(20)) : window.crypto.getRandomValues(new Uint8Array(20));
      var hash2 = (0, _sha.sha224)(key);
      return {
        key,
        hash: hash2
      };
    };
    exports2.generateKeyHashPair = generateKeyHashPair;
    var decodeLink = (code) => {
      let buf = bs58.decode(code);
      let slot = bytesArrayToNumber(buf.slice(0, 3));
      let tokenIndex = bytesArrayToNumber(buf.slice(3, 5));
      let key = buf.slice(5);
      return {
        slot,
        tokenIndex,
        key
      };
    };
    exports2.decodeLink = decodeLink;
    var encodeLink = (slot, tokenIndex, key) => {
      let a = numberToBytesArray(slot, 3);
      let b2 = numberToBytesArray(tokenIndex, 2);
      let x2 = new Uint8Array([...a, ...b2, ...key]);
      return bs58.encode(x2);
    };
    exports2.encodeLink = encodeLink;
    var bytesToBase58 = (bytes2) => {
      return bs58.encode(new Uint8Array([...bytes2]));
    };
    exports2.bytesToBase58 = bytesToBase58;
    var base58ToBytes = (x2) => {
      return [...bs58.decode(x2)];
    };
    exports2.base58ToBytes = base58ToBytes;
    var encodeArrayBuffer = (file) => Array.from(new Uint8Array(file));
    exports2.encodeArrayBuffer = encodeArrayBuffer;
    var jsonToNat8 = async (json) => {
      const bl = new Blob([JSON.stringify(json)], {
        type: "application/json"
      });
      const buffer = await bl.arrayBuffer();
      const arr = encodeArrayBuffer(buffer);
      return arr;
    };
    exports2.jsonToNat8 = jsonToNat8;
    var fromHexString2 = (hexString) => hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16));
    exports2.fromHexString = fromHexString2;
    var toHexString2 = (bytes2) => bytes2.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
    exports2.toHexString = toHexString2;
    var chunkBlob = async (url_or_blob) => {
      let blob;
      if (typeof url_or_blob === "string")
        blob = await fetch(url_or_blob).then((r2) => r2.blob());
      else
        blob = url_or_blob;
      let size = blob.size;
      let chunkSize = 1024 * 512;
      let chunks = Math.ceil(size / chunkSize);
      let r = [];
      for (let i = 0; i < chunks; i++) {
        r.push(blob.slice(i * chunkSize, (i + 1) * chunkSize));
      }
      return r;
    };
    exports2.chunkBlob = chunkBlob;
    var err2text = (e) => {
      if (e === null || e === void 0)
        return e;
      if (e instanceof Error)
        return e.message;
      if (typeof e === "string")
        return e;
      if (Object.keys(e).length === 1) {
        let key = Object.keys(e)[0];
        if (e[key] === null)
          return key;
        if (typeof e[key] === "string" || "toString" in e[key])
          return `${key}: ${e[key]}`;
        return key;
      }
    };
    exports2.err2text = err2text;
    var blobPrepare = async (chunk) => Array.from(new Uint8Array(await chunk.arrayBuffer()));
    exports2.blobPrepare = blobPrepare;
    var djb2xor = (str) => {
      let len = str.length;
      let h = 5381;
      for (let i = 0; i < len; i++) {
        h = h * 33 ^ str.charCodeAt(i);
      }
      return h >>> 0;
    };
    exports2.djb2xor = djb2xor;
    var uploadFile = async function(nft, tokenIndex, position, chunks, subaccount) {
      let tried = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
      try {
        await Promise.all(chunks.map(async (chunk, idx) => {
          return nft.upload_chunk({
            subaccount,
            position: {
              [position]: null
            },
            chunkIdx: idx,
            tokenIndex,
            data: await blobPrepare(chunk)
          });
        })).then((re2) => {
        });
      } catch (e) {
        await delay(2e3 + tried * 1e3);
        if (tried < 3)
          return await uploadFile(nft, tokenIndex, position, chunks, subaccount, tried + 1);
        else
          throw e;
      }
    };
    exports2.uploadFile = uploadFile;
    var delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/cjs/principal.js
var require_principal = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/cjs/principal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.PrincipalToSlot = exports2.PrincipalToIdx = exports2.PrincipalFromSlot = exports2.PrincipalFromIdx = void 0;
    var _principal = require_cjs();
    var _data = require_data();
    var PrincipalFromIdx = (idx) => {
      return _principal.Principal.fromUint8Array([...(0, _data.numberToBytesArray)(idx, 8), 1, 1]);
    };
    exports2.PrincipalFromIdx = PrincipalFromIdx;
    var PrincipalFromSlot = (space, idx) => {
      let start = Number(space[0][0]);
      return PrincipalFromIdx(start + Number(idx));
    };
    exports2.PrincipalFromSlot = PrincipalFromSlot;
    var PrincipalToIdx = (p) => {
      let a = [...p.toUint8Array()].slice(0, -2);
      let idx = (0, _data.bytesArrayToNumber)(a);
      return idx;
    };
    exports2.PrincipalToIdx = PrincipalToIdx;
    var PrincipalToSlot = (space, p) => {
      let idx = PrincipalToIdx(p);
      let start = Number(space[0][0]);
      return idx - start;
    };
    exports2.PrincipalToSlot = PrincipalToSlot;
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/cjs/token.js
var require_token = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/cjs/token.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.tokenUrl = exports2.tokenToText = exports2.tokenFromText = exports2.tokenFromBlob = exports2.principalToAccountIdentifier = exports2.neuronStakeAccountIdentifier = exports2.ipfsTokenUrl = exports2.getSubAccountArray = exports2.fungibleUrl = exports2.encodeTokenId = exports2.encodeChunkId = exports2.decodeTokenId = void 0;
    var _getCrc = require_getCrc();
    var _sha = require_sha224();
    var _principal = require_cjs();
    var _data = require_data();
    var _principal2 = require_principal();
    var _baseX = _interopRequireDefault(require_src3());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var token_base = (0, _baseX.default)("0123456789ABCDEFGHJKLMNPQRSTUVWXYZ");
    var neuronStakeAccountIdentifier = (p, s) => {
      const padding = [12, 110, 101, 117, 114, 111, 110, 45, 115, 116, 97, 107, 101];
      const array = new Uint8Array([...padding, ..._principal.Principal.fromText(p).toUint8Array(), ...getSubAccountArray2(s)]);
      const hash2 = (0, _sha.sha224)(array);
      const checksum = to32bits((0, _getCrc.getCrc32)(hash2));
      const array2 = new Uint8Array([...checksum, ...hash2]);
      return (0, _data.toHexString)(array2);
    };
    exports2.neuronStakeAccountIdentifier = neuronStakeAccountIdentifier;
    var principalToAccountIdentifier2 = (p, s) => {
      const padding = [10, 97, 99, 99, 111, 117, 110, 116, 45, 105, 100];
      const array = new Uint8Array([...padding, ..._principal.Principal.fromText(p).toUint8Array(), ...getSubAccountArray2(s)]);
      const hash2 = (0, _sha.sha224)(array);
      const checksum = to32bits((0, _getCrc.getCrc32)(hash2));
      const array2 = new Uint8Array([...checksum, ...hash2]);
      return (0, _data.toHexString)(array2);
    };
    exports2.principalToAccountIdentifier = principalToAccountIdentifier2;
    var getSubAccountArray2 = (s) => {
      if (Array.isArray(s)) {
        return s.concat(Array(32 - s.length).fill(0));
      } else {
        return Array(28).fill(0).concat(to32bits(s ? s : 0));
      }
    };
    exports2.getSubAccountArray = getSubAccountArray2;
    var to32bits = (num) => {
      let b2 = new ArrayBuffer(4);
      new DataView(b2).setUint32(0, num);
      return Array.from(new Uint8Array(b2));
    };
    var encodeTokenId = (slot, index) => {
      let t = Number(slot) << 16 | Number(index);
      return t;
    };
    exports2.encodeTokenId = encodeTokenId;
    var decodeTokenId = (t) => {
      t = Number(t);
      let slot = t >> 16;
      let index = t & 65535;
      return {
        slot,
        index
      };
    };
    exports2.decodeTokenId = decodeTokenId;
    var tokenToText = (tid) => {
      if (tid === 0n || tid === 0)
        return false;
      let p = new Uint8Array([...(0, _data.numberToBytesArray)((0, _getCrc.getCrc32)((0, _data.numberToBytesArray)(tid, 8)) & 65535, 2), ...(0, _data.numberToBytesArray)(tid, 8)]);
      return ("NFTA" + token_base.encode(p)).toLowerCase();
    };
    exports2.tokenToText = tokenToText;
    var tokenFromText = (str) => {
      str = str.toUpperCase();
      if (str.slice(0, 4) !== "NFTA")
        return null;
      let p = [...token_base.decode(str.slice(4))];
      let t = (0, _data.bytesArrayToNumber)(p.splice(-8));
      return t;
    };
    exports2.tokenFromText = tokenFromText;
    var tokenFromBlob = (b2) => {
      return _principal.Principal.fromUint8Array(b2).toText();
    };
    exports2.tokenFromBlob = tokenFromBlob;
    var bitShiftLeft = (x2, l) => {
      return x2 << l >>> 0;
    };
    var bitShiftRight = (x2, l) => {
      return x2 >>> l;
    };
    var bitUnsignedFix = (x2) => {
      return x2 >>> 0;
    };
    var encodeChunkId = (tokenIndex, chunkIndex, ctype) => {
      let r = bitUnsignedFix(bitShiftLeft(tokenIndex, 16) | bitUnsignedFix(bitShiftRight(chunkIndex & 255, 2) | ctype));
      return r;
    };
    exports2.encodeChunkId = encodeChunkId;
    var ipfsTokenUrl = (cid) => {
      return "https://ipfs.io/ipfs/" + cid;
    };
    exports2.ipfsTokenUrl = ipfsTokenUrl;
    var fungibleUrl = (map, tid) => {
      let key = tid.toString(16).padStart(5, 0);
      let canister = (0, _principal2.PrincipalFromSlot)(map.space, map.tokenregistry).toText();
      if (process.env.REACT_APP_LOCAL_BACKEND) {
        return "http://" + map.tokenregistry + ".lvh.me:8453/" + key;
      } else {
        return "https://" + canister + ".raw.ic0.app/" + key;
      }
    };
    exports2.fungibleUrl = fungibleUrl;
    var tokenUrl = (space, tid, type) => {
      let {
        index,
        slot
      } = decodeTokenId(tid);
      let canister = (0, _principal2.PrincipalFromSlot)(space, slot).toText();
      if (process.env.REACT_APP_LOCAL_BACKEND) {
        return "http://" + slot + ".lvh.me:8453/" + encodeChunkId(index, 0, type === "content" ? 0 : 1).toString(16);
      } else {
        return "https://" + canister + ".raw.ic0.app/" + encodeChunkId(index, 0, type === "content" ? 0 : 1).toString(16);
      }
    };
    exports2.tokenUrl = tokenUrl;
  }
});

// node_modules/@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js
var require_accountidentifier = __commonJS({
  "node_modules/@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.ArrayToText = ArrayToText2;
    exports2.TextToArray = TextToArray;
    exports2.TextToSlot = TextToSlot;
    exports2.anvToE = anvToE;
    exports2.createBigIntDecimal = createBigIntDecimal;
    exports2.e8sToIcp = e8sToIcp;
    exports2.e8sToPwr = e8sToPwr;
    exports2.eToAnv = eToAnv;
    exports2.icpToE8s = icpToE8s;
    exports2.placeDecimal = placeDecimal;
    exports2.pwrToE8s = pwrToE8s;
    exports2.removeDecimal = removeDecimal;
    var _data = require_data();
    function TextToArray(x2) {
      if (!x2 || !x2.length)
        return null;
      return (0, _data.fromHexString)(x2);
    }
    function ArrayToText2(x2) {
      return (0, _data.toHexString)(x2);
    }
    function e8sToIcp(x2) {
      if (!x2)
        return null;
      return (Number(BigInt(x2) * 10000n / 100000000n) / 1e4).toFixed(4);
    }
    function icpToE8s(x2) {
      try {
        return BigInt(Math.round(x2 * 1e8));
      } catch (e) {
        return 0n;
      }
    }
    function createBigIntDecimal(dec) {
      return BigInt("1" + "".padStart(dec, 0));
    }
    function placeDecimal(x2, dec, precision) {
      if (!x2)
        return null;
      if (precision > dec)
        precision = dec;
      let precisionTmp = createBigIntDecimal(precision);
      return (Number(BigInt(x2) * precisionTmp / createBigIntDecimal(dec)) / Number(precisionTmp)).toFixed(precision);
    }
    function removeDecimal(x2, dec) {
      try {
        return BigInt(Math.round(x2 * Number(createBigIntDecimal(dec))));
      } catch (e) {
        return 0n;
      }
    }
    function e8sToPwr(x2) {
      if (!x2)
        return null;
      return (Number(BigInt(x2) * 100n / 100000n) / 100).toFixed(2);
    }
    function pwrToE8s(x2) {
      try {
        return BigInt(Math.round(x2 * 1e5));
      } catch (e) {
        return 0n;
      }
    }
    function eToAnv(x2) {
      if (!x2)
        return null;
      return (Number(BigInt(x2) * 10000n / 100000000n) / 1e4).toFixed(4);
    }
    function anvToE(x2) {
      try {
        return BigInt(Math.round(x2 * 1e8));
      } catch (e) {
        return 0n;
      }
    }
    function TextToSlot(aid, range) {
      return Number(range[0]) + (0, _data.bytesArrayToNumber)((0, _data.fromHexString)(aid).slice(-4)) % (1 + Number(range[1] - range[0]));
    }
  }
});

// node_modules/global/window.js
var require_window = __commonJS({
  "node_modules/global/window.js"(exports2, module2) {
    var win;
    if (typeof window !== "undefined") {
      win = window;
    } else if (typeof window !== "undefined") {
      win = window;
    } else if (typeof self !== "undefined") {
      win = self;
    } else {
      win = {};
    }
    module2.exports = win;
  }
});

// (disabled):crypto
var require_crypto = __commonJS({
  "(disabled):crypto"() {
  }
});

// node_modules/get-random-values/index.js
var require_get_random_values = __commonJS({
  "node_modules/get-random-values/index.js"(exports2, module2) {
    var window2 = require_window();
    var nodeCrypto = require_crypto();
    function getRandomValues(buf) {
      if (window2.crypto && window2.crypto.getRandomValues) {
        return window2.crypto.getRandomValues(buf);
      }
      if (typeof window2.msCrypto === "object" && typeof window2.msCrypto.getRandomValues === "function") {
        return window2.msCrypto.getRandomValues(buf);
      }
      if (nodeCrypto.randomBytes) {
        if (!(buf instanceof Uint8Array)) {
          throw new TypeError("expected Uint8Array");
        }
        if (buf.length > 65536) {
          var e = new Error();
          e.code = 22;
          e.message = "Failed to execute 'getRandomValues' on 'Crypto': The ArrayBufferView's byte length (" + buf.length + ") exceeds the number of bytes of entropy available via this API (65536).";
          e.name = "QuotaExceededError";
          throw e;
        }
        var bytes2 = nodeCrypto.randomBytes(buf.length);
        buf.set(bytes2);
        return buf;
      } else {
        throw new Error("No secure random number generator available.");
      }
    }
    module2.exports = getRandomValues;
  }
});

// (disabled):node_modules/buffer/index.js
var require_buffer4 = __commonJS({
  "(disabled):node_modules/buffer/index.js"() {
  }
});

// node_modules/js-sha256/src/sha256.js
var require_sha2562 = __commonJS({
  "node_modules/js-sha256/src/sha256.js"(exports2, module2) {
    (function() {
      "use strict";
      var ERROR2 = "input is invalid type";
      var WINDOW2 = typeof window === "object";
      var root2 = WINDOW2 ? window : {};
      if (root2.JS_SHA256_NO_WINDOW) {
        WINDOW2 = false;
      }
      var WEB_WORKER2 = !WINDOW2 && typeof self === "object";
      var NODE_JS2 = !root2.JS_SHA256_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
      if (NODE_JS2) {
        root2 = window;
      } else if (WEB_WORKER2) {
        root2 = self;
      }
      var COMMON_JS2 = !root2.JS_SHA256_NO_COMMON_JS && typeof module2 === "object" && module2.exports;
      var AMD2 = typeof define === "function" && define.amd;
      var ARRAY_BUFFER2 = !root2.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
      var HEX_CHARS2 = "0123456789abcdef".split("");
      var EXTRA2 = [-2147483648, 8388608, 32768, 128];
      var SHIFT2 = [24, 16, 8, 0];
      var K2 = [
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
      ];
      var OUTPUT_TYPES2 = ["hex", "array", "digest", "arrayBuffer"];
      var blocks2 = [];
      if (root2.JS_SHA256_NO_NODE_JS || !Array.isArray) {
        Array.isArray = function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
      }
      if (ARRAY_BUFFER2 && (root2.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
        ArrayBuffer.isView = function(obj) {
          return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
        };
      }
      var createOutputMethod2 = function(outputType, is2242) {
        return function(message) {
          return new Sha2562(is2242, true).update(message)[outputType]();
        };
      };
      var createMethod2 = function(is2242) {
        var method2 = createOutputMethod2("hex", is2242);
        if (NODE_JS2) {
          method2 = nodeWrap2(method2, is2242);
        }
        method2.create = function() {
          return new Sha2562(is2242);
        };
        method2.update = function(message) {
          return method2.create().update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES2.length; ++i) {
          var type = OUTPUT_TYPES2[i];
          method2[type] = createOutputMethod2(type, is2242);
        }
        return method2;
      };
      var nodeWrap2 = function(method2, is2242) {
        var crypto3 = require_crypto();
        var Buffer3 = require_buffer4().Buffer;
        var algorithm2 = is2242 ? "sha224" : "sha256";
        var bufferFrom;
        if (Buffer3.from && !root2.JS_SHA256_NO_BUFFER_FROM) {
          bufferFrom = Buffer3.from;
        } else {
          bufferFrom = function(message) {
            return new Buffer3(message);
          };
        }
        var nodeMethod2 = function(message) {
          if (typeof message === "string") {
            return crypto3.createHash(algorithm2).update(message, "utf8").digest("hex");
          } else {
            if (message === null || message === void 0) {
              throw new Error(ERROR2);
            } else if (message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            }
          }
          if (Array.isArray(message) || ArrayBuffer.isView(message) || message.constructor === Buffer3) {
            return crypto3.createHash(algorithm2).update(bufferFrom(message)).digest("hex");
          } else {
            return method2(message);
          }
        };
        return nodeMethod2;
      };
      var createHmacOutputMethod2 = function(outputType, is2242) {
        return function(key, message) {
          return new HmacSha2562(key, is2242, true).update(message)[outputType]();
        };
      };
      var createHmacMethod2 = function(is2242) {
        var method2 = createHmacOutputMethod2("hex", is2242);
        method2.create = function(key) {
          return new HmacSha2562(key, is2242);
        };
        method2.update = function(key, message) {
          return method2.create(key).update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES2.length; ++i) {
          var type = OUTPUT_TYPES2[i];
          method2[type] = createHmacOutputMethod2(type, is2242);
        }
        return method2;
      };
      function Sha2562(is2242, sharedMemory) {
        if (sharedMemory) {
          blocks2[0] = blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
          this.blocks = blocks2;
        } else {
          this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        if (is2242) {
          this.h0 = 3238371032;
          this.h1 = 914150663;
          this.h2 = 812702999;
          this.h3 = 4144912697;
          this.h4 = 4290775857;
          this.h5 = 1750603025;
          this.h6 = 1694076839;
          this.h7 = 3204075428;
        } else {
          this.h0 = 1779033703;
          this.h1 = 3144134277;
          this.h2 = 1013904242;
          this.h3 = 2773480762;
          this.h4 = 1359893119;
          this.h5 = 2600822924;
          this.h6 = 528734635;
          this.h7 = 1541459225;
        }
        this.block = this.start = this.bytes = this.hBytes = 0;
        this.finalized = this.hashed = false;
        this.first = true;
        this.is224 = is2242;
      }
      Sha2562.prototype.update = function(message) {
        if (this.finalized) {
          return;
        }
        var notString, type = typeof message;
        if (type !== "string") {
          if (type === "object") {
            if (message === null) {
              throw new Error(ERROR2);
            } else if (ARRAY_BUFFER2 && message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            } else if (!Array.isArray(message)) {
              if (!ARRAY_BUFFER2 || !ArrayBuffer.isView(message)) {
                throw new Error(ERROR2);
              }
            }
          } else {
            throw new Error(ERROR2);
          }
          notString = true;
        }
        var code, index = 0, i, length = message.length, blocks3 = this.blocks;
        while (index < length) {
          if (this.hashed) {
            this.hashed = false;
            blocks3[0] = this.block;
            this.block = blocks3[16] = blocks3[1] = blocks3[2] = blocks3[3] = blocks3[4] = blocks3[5] = blocks3[6] = blocks3[7] = blocks3[8] = blocks3[9] = blocks3[10] = blocks3[11] = blocks3[12] = blocks3[13] = blocks3[14] = blocks3[15] = 0;
          }
          if (notString) {
            for (i = this.start; index < length && i < 64; ++index) {
              blocks3[i >>> 2] |= message[index] << SHIFT2[i++ & 3];
            }
          } else {
            for (i = this.start; index < length && i < 64; ++index) {
              code = message.charCodeAt(index);
              if (code < 128) {
                blocks3[i >>> 2] |= code << SHIFT2[i++ & 3];
              } else if (code < 2048) {
                blocks3[i >>> 2] |= (192 | code >>> 6) << SHIFT2[i++ & 3];
                blocks3[i >>> 2] |= (128 | code & 63) << SHIFT2[i++ & 3];
              } else if (code < 55296 || code >= 57344) {
                blocks3[i >>> 2] |= (224 | code >>> 12) << SHIFT2[i++ & 3];
                blocks3[i >>> 2] |= (128 | code >>> 6 & 63) << SHIFT2[i++ & 3];
                blocks3[i >>> 2] |= (128 | code & 63) << SHIFT2[i++ & 3];
              } else {
                code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                blocks3[i >>> 2] |= (240 | code >>> 18) << SHIFT2[i++ & 3];
                blocks3[i >>> 2] |= (128 | code >>> 12 & 63) << SHIFT2[i++ & 3];
                blocks3[i >>> 2] |= (128 | code >>> 6 & 63) << SHIFT2[i++ & 3];
                blocks3[i >>> 2] |= (128 | code & 63) << SHIFT2[i++ & 3];
              }
            }
          }
          this.lastByteIndex = i;
          this.bytes += i - this.start;
          if (i >= 64) {
            this.block = blocks3[16];
            this.start = i - 64;
            this.hash();
            this.hashed = true;
          } else {
            this.start = i;
          }
        }
        if (this.bytes > 4294967295) {
          this.hBytes += this.bytes / 4294967296 << 0;
          this.bytes = this.bytes % 4294967296;
        }
        return this;
      };
      Sha2562.prototype.finalize = function() {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        var blocks3 = this.blocks, i = this.lastByteIndex;
        blocks3[16] = this.block;
        blocks3[i >>> 2] |= EXTRA2[i & 3];
        this.block = blocks3[16];
        if (i >= 56) {
          if (!this.hashed) {
            this.hash();
          }
          blocks3[0] = this.block;
          blocks3[16] = blocks3[1] = blocks3[2] = blocks3[3] = blocks3[4] = blocks3[5] = blocks3[6] = blocks3[7] = blocks3[8] = blocks3[9] = blocks3[10] = blocks3[11] = blocks3[12] = blocks3[13] = blocks3[14] = blocks3[15] = 0;
        }
        blocks3[14] = this.hBytes << 3 | this.bytes >>> 29;
        blocks3[15] = this.bytes << 3;
        this.hash();
      };
      Sha2562.prototype.hash = function() {
        var a = this.h0, b2 = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6, h = this.h7, blocks3 = this.blocks, j2, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;
        for (j2 = 16; j2 < 64; ++j2) {
          t1 = blocks3[j2 - 15];
          s0 = (t1 >>> 7 | t1 << 25) ^ (t1 >>> 18 | t1 << 14) ^ t1 >>> 3;
          t1 = blocks3[j2 - 2];
          s1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
          blocks3[j2] = blocks3[j2 - 16] + s0 + blocks3[j2 - 7] + s1 << 0;
        }
        bc = b2 & c;
        for (j2 = 0; j2 < 64; j2 += 4) {
          if (this.first) {
            if (this.is224) {
              ab = 300032;
              t1 = blocks3[0] - 1413257819;
              h = t1 - 150054599 << 0;
              d = t1 + 24177077 << 0;
            } else {
              ab = 704751109;
              t1 = blocks3[0] - 210244248;
              h = t1 - 1521486534 << 0;
              d = t1 + 143694565 << 0;
            }
            this.first = false;
          } else {
            s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
            s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
            ab = a & b2;
            maj = ab ^ a & c ^ bc;
            ch = e & f ^ ~e & g;
            t1 = h + s1 + ch + K2[j2] + blocks3[j2];
            t2 = s0 + maj;
            h = d + t1 << 0;
            d = t1 + t2 << 0;
          }
          s0 = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10);
          s1 = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7);
          da = d & a;
          maj = da ^ d & b2 ^ ab;
          ch = h & e ^ ~h & f;
          t1 = g + s1 + ch + K2[j2 + 1] + blocks3[j2 + 1];
          t2 = s0 + maj;
          g = c + t1 << 0;
          c = t1 + t2 << 0;
          s0 = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10);
          s1 = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7);
          cd = c & d;
          maj = cd ^ c & a ^ da;
          ch = g & h ^ ~g & e;
          t1 = f + s1 + ch + K2[j2 + 2] + blocks3[j2 + 2];
          t2 = s0 + maj;
          f = b2 + t1 << 0;
          b2 = t1 + t2 << 0;
          s0 = (b2 >>> 2 | b2 << 30) ^ (b2 >>> 13 | b2 << 19) ^ (b2 >>> 22 | b2 << 10);
          s1 = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7);
          bc = b2 & c;
          maj = bc ^ b2 & d ^ cd;
          ch = f & g ^ ~f & h;
          t1 = e + s1 + ch + K2[j2 + 3] + blocks3[j2 + 3];
          t2 = s0 + maj;
          e = a + t1 << 0;
          a = t1 + t2 << 0;
          this.chromeBugWorkAround = true;
        }
        this.h0 = this.h0 + a << 0;
        this.h1 = this.h1 + b2 << 0;
        this.h2 = this.h2 + c << 0;
        this.h3 = this.h3 + d << 0;
        this.h4 = this.h4 + e << 0;
        this.h5 = this.h5 + f << 0;
        this.h6 = this.h6 + g << 0;
        this.h7 = this.h7 + h << 0;
      };
      Sha2562.prototype.hex = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
        var hex = HEX_CHARS2[h0 >>> 28 & 15] + HEX_CHARS2[h0 >>> 24 & 15] + HEX_CHARS2[h0 >>> 20 & 15] + HEX_CHARS2[h0 >>> 16 & 15] + HEX_CHARS2[h0 >>> 12 & 15] + HEX_CHARS2[h0 >>> 8 & 15] + HEX_CHARS2[h0 >>> 4 & 15] + HEX_CHARS2[h0 & 15] + HEX_CHARS2[h1 >>> 28 & 15] + HEX_CHARS2[h1 >>> 24 & 15] + HEX_CHARS2[h1 >>> 20 & 15] + HEX_CHARS2[h1 >>> 16 & 15] + HEX_CHARS2[h1 >>> 12 & 15] + HEX_CHARS2[h1 >>> 8 & 15] + HEX_CHARS2[h1 >>> 4 & 15] + HEX_CHARS2[h1 & 15] + HEX_CHARS2[h2 >>> 28 & 15] + HEX_CHARS2[h2 >>> 24 & 15] + HEX_CHARS2[h2 >>> 20 & 15] + HEX_CHARS2[h2 >>> 16 & 15] + HEX_CHARS2[h2 >>> 12 & 15] + HEX_CHARS2[h2 >>> 8 & 15] + HEX_CHARS2[h2 >>> 4 & 15] + HEX_CHARS2[h2 & 15] + HEX_CHARS2[h3 >>> 28 & 15] + HEX_CHARS2[h3 >>> 24 & 15] + HEX_CHARS2[h3 >>> 20 & 15] + HEX_CHARS2[h3 >>> 16 & 15] + HEX_CHARS2[h3 >>> 12 & 15] + HEX_CHARS2[h3 >>> 8 & 15] + HEX_CHARS2[h3 >>> 4 & 15] + HEX_CHARS2[h3 & 15] + HEX_CHARS2[h4 >>> 28 & 15] + HEX_CHARS2[h4 >>> 24 & 15] + HEX_CHARS2[h4 >>> 20 & 15] + HEX_CHARS2[h4 >>> 16 & 15] + HEX_CHARS2[h4 >>> 12 & 15] + HEX_CHARS2[h4 >>> 8 & 15] + HEX_CHARS2[h4 >>> 4 & 15] + HEX_CHARS2[h4 & 15] + HEX_CHARS2[h5 >>> 28 & 15] + HEX_CHARS2[h5 >>> 24 & 15] + HEX_CHARS2[h5 >>> 20 & 15] + HEX_CHARS2[h5 >>> 16 & 15] + HEX_CHARS2[h5 >>> 12 & 15] + HEX_CHARS2[h5 >>> 8 & 15] + HEX_CHARS2[h5 >>> 4 & 15] + HEX_CHARS2[h5 & 15] + HEX_CHARS2[h6 >>> 28 & 15] + HEX_CHARS2[h6 >>> 24 & 15] + HEX_CHARS2[h6 >>> 20 & 15] + HEX_CHARS2[h6 >>> 16 & 15] + HEX_CHARS2[h6 >>> 12 & 15] + HEX_CHARS2[h6 >>> 8 & 15] + HEX_CHARS2[h6 >>> 4 & 15] + HEX_CHARS2[h6 & 15];
        if (!this.is224) {
          hex += HEX_CHARS2[h7 >>> 28 & 15] + HEX_CHARS2[h7 >>> 24 & 15] + HEX_CHARS2[h7 >>> 20 & 15] + HEX_CHARS2[h7 >>> 16 & 15] + HEX_CHARS2[h7 >>> 12 & 15] + HEX_CHARS2[h7 >>> 8 & 15] + HEX_CHARS2[h7 >>> 4 & 15] + HEX_CHARS2[h7 & 15];
        }
        return hex;
      };
      Sha2562.prototype.toString = Sha2562.prototype.hex;
      Sha2562.prototype.digest = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
        var arr = [
          h0 >>> 24 & 255,
          h0 >>> 16 & 255,
          h0 >>> 8 & 255,
          h0 & 255,
          h1 >>> 24 & 255,
          h1 >>> 16 & 255,
          h1 >>> 8 & 255,
          h1 & 255,
          h2 >>> 24 & 255,
          h2 >>> 16 & 255,
          h2 >>> 8 & 255,
          h2 & 255,
          h3 >>> 24 & 255,
          h3 >>> 16 & 255,
          h3 >>> 8 & 255,
          h3 & 255,
          h4 >>> 24 & 255,
          h4 >>> 16 & 255,
          h4 >>> 8 & 255,
          h4 & 255,
          h5 >>> 24 & 255,
          h5 >>> 16 & 255,
          h5 >>> 8 & 255,
          h5 & 255,
          h6 >>> 24 & 255,
          h6 >>> 16 & 255,
          h6 >>> 8 & 255,
          h6 & 255
        ];
        if (!this.is224) {
          arr.push(h7 >>> 24 & 255, h7 >>> 16 & 255, h7 >>> 8 & 255, h7 & 255);
        }
        return arr;
      };
      Sha2562.prototype.array = Sha2562.prototype.digest;
      Sha2562.prototype.arrayBuffer = function() {
        this.finalize();
        var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
        var dataView = new DataView(buffer);
        dataView.setUint32(0, this.h0);
        dataView.setUint32(4, this.h1);
        dataView.setUint32(8, this.h2);
        dataView.setUint32(12, this.h3);
        dataView.setUint32(16, this.h4);
        dataView.setUint32(20, this.h5);
        dataView.setUint32(24, this.h6);
        if (!this.is224) {
          dataView.setUint32(28, this.h7);
        }
        return buffer;
      };
      function HmacSha2562(key, is2242, sharedMemory) {
        var i, type = typeof key;
        if (type === "string") {
          var bytes2 = [], length = key.length, index = 0, code;
          for (i = 0; i < length; ++i) {
            code = key.charCodeAt(i);
            if (code < 128) {
              bytes2[index++] = code;
            } else if (code < 2048) {
              bytes2[index++] = 192 | code >>> 6;
              bytes2[index++] = 128 | code & 63;
            } else if (code < 55296 || code >= 57344) {
              bytes2[index++] = 224 | code >>> 12;
              bytes2[index++] = 128 | code >>> 6 & 63;
              bytes2[index++] = 128 | code & 63;
            } else {
              code = 65536 + ((code & 1023) << 10 | key.charCodeAt(++i) & 1023);
              bytes2[index++] = 240 | code >>> 18;
              bytes2[index++] = 128 | code >>> 12 & 63;
              bytes2[index++] = 128 | code >>> 6 & 63;
              bytes2[index++] = 128 | code & 63;
            }
          }
          key = bytes2;
        } else {
          if (type === "object") {
            if (key === null) {
              throw new Error(ERROR2);
            } else if (ARRAY_BUFFER2 && key.constructor === ArrayBuffer) {
              key = new Uint8Array(key);
            } else if (!Array.isArray(key)) {
              if (!ARRAY_BUFFER2 || !ArrayBuffer.isView(key)) {
                throw new Error(ERROR2);
              }
            }
          } else {
            throw new Error(ERROR2);
          }
        }
        if (key.length > 64) {
          key = new Sha2562(is2242, true).update(key).array();
        }
        var oKeyPad = [], iKeyPad = [];
        for (i = 0; i < 64; ++i) {
          var b2 = key[i] || 0;
          oKeyPad[i] = 92 ^ b2;
          iKeyPad[i] = 54 ^ b2;
        }
        Sha2562.call(this, is2242, sharedMemory);
        this.update(iKeyPad);
        this.oKeyPad = oKeyPad;
        this.inner = true;
        this.sharedMemory = sharedMemory;
      }
      HmacSha2562.prototype = new Sha2562();
      HmacSha2562.prototype.finalize = function() {
        Sha2562.prototype.finalize.call(this);
        if (this.inner) {
          this.inner = false;
          var innerHash = this.array();
          Sha2562.call(this, this.is224, this.sharedMemory);
          this.update(this.oKeyPad);
          this.update(innerHash);
          Sha2562.prototype.finalize.call(this);
        }
      };
      var exports3 = createMethod2();
      exports3.sha256 = exports3;
      exports3.sha224 = createMethod2(true);
      exports3.sha256.hmac = createHmacMethod2();
      exports3.sha224.hmac = createHmacMethod2(true);
      if (COMMON_JS2) {
        module2.exports = exports3;
      } else {
        root2.sha256 = exports3.sha256;
        root2.sha224 = exports3.sha224;
        if (AMD2) {
          define(function() {
            return exports3;
          });
        }
      }
    })();
  }
});

// node_modules/@dfinity/agent/lib/esm/actor.js
var import_buffer12 = __toESM(require_buffer());

// node_modules/@dfinity/agent/lib/esm/agent/api.js
var ReplicaRejectCode;
(function(ReplicaRejectCode2) {
  ReplicaRejectCode2[ReplicaRejectCode2["SysFatal"] = 1] = "SysFatal";
  ReplicaRejectCode2[ReplicaRejectCode2["SysTransient"] = 2] = "SysTransient";
  ReplicaRejectCode2[ReplicaRejectCode2["DestinationInvalid"] = 3] = "DestinationInvalid";
  ReplicaRejectCode2[ReplicaRejectCode2["CanisterReject"] = 4] = "CanisterReject";
  ReplicaRejectCode2[ReplicaRejectCode2["CanisterError"] = 5] = "CanisterError";
})(ReplicaRejectCode || (ReplicaRejectCode = {}));

// node_modules/@dfinity/agent/lib/esm/agent/http/index.js
init_esm();
init_errors();

// node_modules/@dfinity/agent/lib/esm/auth.js
init_esm();
init_request_id();
init_buffer2();
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var domainSeparator = new TextEncoder().encode("\nic-request");
var SignIdentity = class {
  /**
   * Get the principal represented by this identity. Normally should be a
   * `Principal.selfAuthenticating()`.
   */
  getPrincipal() {
    if (!this._principal) {
      this._principal = Principal2.selfAuthenticating(new Uint8Array(this.getPublicKey().toDer()));
    }
    return this._principal;
  }
  /**
   * Transform a request into a signed version of the request. This is done last
   * after the transforms on the body of a request. The returned object can be
   * anything, but must be serializable to CBOR.
   * @param request - internet computer request to transform
   */
  async transformRequest(request2) {
    const { body } = request2, fields = __rest(request2, ["body"]);
    const requestId = await requestIdOf(body);
    return Object.assign(Object.assign({}, fields), { body: {
      content: body,
      sender_pubkey: this.getPublicKey().toDer(),
      sender_sig: await this.sign(concat2(domainSeparator, requestId))
    } });
  }
};
var AnonymousIdentity = class {
  getPrincipal() {
    return Principal2.anonymous();
  }
  async transformRequest(request2) {
    return Object.assign(Object.assign({}, request2), { body: { content: request2.body } });
  }
};

// node_modules/@dfinity/agent/lib/esm/agent/http/index.js
init_cbor();
init_request_id();
init_buffer2();

// node_modules/@dfinity/agent/lib/esm/agent/http/transforms.js
init_esm2();
var cbor2 = __toESM(require_src2());

// node_modules/@dfinity/agent/lib/esm/utils/random.js
var randomNumber = () => {
  if (typeof window !== "undefined" && !!window.crypto && !!window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0];
  }
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0];
  }
  if (typeof crypto !== "undefined" && crypto.randomInt) {
    return crypto.randomInt(0, 4294967295);
  }
  return Math.floor(Math.random() * 4294967295);
};

// node_modules/@dfinity/agent/lib/esm/agent/http/types.js
var SubmitRequestType;
(function(SubmitRequestType2) {
  SubmitRequestType2["Call"] = "call";
})(SubmitRequestType || (SubmitRequestType = {}));
function makeNonce() {
  const buffer = new ArrayBuffer(16);
  const view = new DataView(buffer);
  const rand1 = randomNumber();
  const rand2 = randomNumber();
  const rand3 = randomNumber();
  const rand4 = randomNumber();
  view.setUint32(0, rand1);
  view.setUint32(4, rand2);
  view.setUint32(8, rand3);
  view.setUint32(12, rand4);
  return buffer;
}

// node_modules/@dfinity/agent/lib/esm/agent/http/transforms.js
var NANOSECONDS_PER_MILLISECONDS = BigInt(1e6);
var REPLICA_PERMITTED_DRIFT_MILLISECONDS = 60 * 1e3;
var Expiry = class {
  constructor(deltaInMSec) {
    const raw_value = BigInt(Math.floor(Date.now() + deltaInMSec - REPLICA_PERMITTED_DRIFT_MILLISECONDS)) * NANOSECONDS_PER_MILLISECONDS;
    const ingress_as_seconds = raw_value / BigInt(1e9);
    const ingress_as_minutes = ingress_as_seconds / BigInt(60);
    const rounded_down_nanos = ingress_as_minutes * BigInt(60) * BigInt(1e9);
    this._value = rounded_down_nanos;
  }
  toCBOR() {
    return cbor2.value.u64(this._value.toString(16), 16);
  }
  toHash() {
    return lebEncode(this._value);
  }
};
function makeNonceTransform(nonceFn = makeNonce) {
  return async (request2) => {
    const headers = request2.request.headers;
    request2.request.headers = headers;
    if (request2.endpoint === "call") {
      request2.body.nonce = nonceFn();
    }
  };
}
function httpHeadersTransform(headers) {
  const headerFields = [];
  headers.forEach((value4, key) => {
    headerFields.push([key, value4]);
  });
  return headerFields;
}

// node_modules/@dfinity/agent/lib/esm/agent/http/errors.js
var AgentHTTPResponseError = class extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
};

// node_modules/@dfinity/agent/lib/esm/agent/http/index.js
init_canisterStatus();
init_certificate();

// node_modules/@noble/hashes/esm/sha512.js
init_sha2();

// node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i = 0; i < lst.length; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
var shrSH = (h, _l, s) => h >>> s;
var shrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
var rotr32H = (_h, l) => l;
var rotr32L = (h, _l) => h;
var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
var u64 = {
  fromBig,
  split,
  toBig,
  shrSH,
  shrSL,
  rotrSH,
  rotrSL,
  rotrBH,
  rotrBL,
  rotr32H,
  rotr32L,
  rotlSH,
  rotlSL,
  rotlBH,
  rotlBL,
  add,
  add3L,
  add3H,
  add4L,
  add4H,
  add5H,
  add5L
};
var u64_default = u64;

// node_modules/@noble/hashes/esm/sha512.js
init_utils();
var [SHA512_Kh, SHA512_Kl] = /* @__PURE__ */ (() => u64_default.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n) => BigInt(n))))();
var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
var SHA512 = class extends SHA2 {
  constructor() {
    super(128, 64, 16, false);
    this.Ah = 1779033703 | 0;
    this.Al = 4089235720 | 0;
    this.Bh = 3144134277 | 0;
    this.Bl = 2227873595 | 0;
    this.Ch = 1013904242 | 0;
    this.Cl = 4271175723 | 0;
    this.Dh = 2773480762 | 0;
    this.Dl = 1595750129 | 0;
    this.Eh = 1359893119 | 0;
    this.El = 2917565137 | 0;
    this.Fh = 2600822924 | 0;
    this.Fl = 725511199 | 0;
    this.Gh = 528734635 | 0;
    this.Gl = 4215389547 | 0;
    this.Hh = 1541459225 | 0;
    this.Hl = 327033209 | 0;
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4) {
      SHA512_W_H[i] = view.getUint32(offset);
      SHA512_W_L[i] = view.getUint32(offset += 4);
    }
    for (let i = 16; i < 80; i++) {
      const W15h = SHA512_W_H[i - 15] | 0;
      const W15l = SHA512_W_L[i - 15] | 0;
      const s0h = u64_default.rotrSH(W15h, W15l, 1) ^ u64_default.rotrSH(W15h, W15l, 8) ^ u64_default.shrSH(W15h, W15l, 7);
      const s0l = u64_default.rotrSL(W15h, W15l, 1) ^ u64_default.rotrSL(W15h, W15l, 8) ^ u64_default.shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i - 2] | 0;
      const W2l = SHA512_W_L[i - 2] | 0;
      const s1h = u64_default.rotrSH(W2h, W2l, 19) ^ u64_default.rotrBH(W2h, W2l, 61) ^ u64_default.shrSH(W2h, W2l, 6);
      const s1l = u64_default.rotrSL(W2h, W2l, 19) ^ u64_default.rotrBL(W2h, W2l, 61) ^ u64_default.shrSL(W2h, W2l, 6);
      const SUMl = u64_default.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
      const SUMh = u64_default.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
      SHA512_W_H[i] = SUMh | 0;
      SHA512_W_L[i] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i = 0; i < 80; i++) {
      const sigma1h = u64_default.rotrSH(Eh, El, 14) ^ u64_default.rotrSH(Eh, El, 18) ^ u64_default.rotrBH(Eh, El, 41);
      const sigma1l = u64_default.rotrSL(Eh, El, 14) ^ u64_default.rotrSL(Eh, El, 18) ^ u64_default.rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = u64_default.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
      const T1h = u64_default.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
      const T1l = T1ll | 0;
      const sigma0h = u64_default.rotrSH(Ah, Al, 28) ^ u64_default.rotrBH(Ah, Al, 34) ^ u64_default.rotrBH(Ah, Al, 39);
      const sigma0l = u64_default.rotrSL(Ah, Al, 28) ^ u64_default.rotrBL(Ah, Al, 34) ^ u64_default.rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = u64_default.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = u64_default.add3L(T1l, sigma0l, MAJl);
      Ah = u64_default.add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = u64_default.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = u64_default.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = u64_default.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = u64_default.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = u64_default.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = u64_default.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = u64_default.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = u64_default.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    SHA512_W_H.fill(0);
    SHA512_W_L.fill(0);
  }
  destroy() {
    this.buffer.fill(0);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var sha512 = /* @__PURE__ */ wrapConstructor(() => new SHA512());

// node_modules/@noble/curves/esm/ed25519.js
init_utils();

// node_modules/@noble/curves/esm/abstract/utils.js
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
function isBytes3(a) {
  return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
}
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes2) {
  if (!isBytes3(bytes2))
    throw new Error("Uint8Array expected");
  let hex = "";
  for (let i = 0; i < bytes2.length; i++) {
    hex += hexes[bytes2[i]];
  }
  return hex;
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return BigInt(hex === "" ? "0" : `0x${hex}`);
}
var asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function asciiToBase16(char) {
  if (char >= asciis._0 && char <= asciis._9)
    return char - asciis._0;
  if (char >= asciis._A && char <= asciis._F)
    return char - (asciis._A - 10);
  if (char >= asciis._a && char <= asciis._f)
    return char - (asciis._a - 10);
  return;
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + hl);
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
function bytesToNumberBE(bytes2) {
  return hexToNumber(bytesToHex(bytes2));
}
function bytesToNumberLE(bytes2) {
  if (!isBytes3(bytes2))
    throw new Error("Uint8Array expected");
  return hexToNumber(bytesToHex(Uint8Array.from(bytes2).reverse()));
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
      throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
    }
  } else if (isBytes3(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(`${title} must be hex string or Uint8Array`);
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
  return res;
}
function concatBytes2(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    if (!isBytes3(a))
      throw new Error("Uint8Array expected");
    sum += a.length;
  }
  let res = new Uint8Array(sum);
  let pad = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad);
    pad += a.length;
  }
  return res;
}
var bitMask = (n) => (_2n << BigInt(n - 1)) - _1n;
var validatorFns = {
  bigint: (val) => typeof val === "bigint",
  function: (val) => typeof val === "function",
  boolean: (val) => typeof val === "boolean",
  string: (val) => typeof val === "string",
  stringOrUint8Array: (val) => typeof val === "string" || isBytes3(val),
  isSafeInteger: (val) => Number.isSafeInteger(val),
  array: (val) => Array.isArray(val),
  field: (val, object) => object.Fp.isValid(val),
  hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
};
function validateObject(object, validators, optValidators = {}) {
  const checkField = (fieldName, type, isOptional) => {
    const checkVal = validatorFns[type];
    if (typeof checkVal !== "function")
      throw new Error(`Invalid validator "${type}", expected function`);
    const val = object[fieldName];
    if (isOptional && val === void 0)
      return;
    if (!checkVal(val, object)) {
      throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
    }
  };
  for (const [fieldName, type] of Object.entries(validators))
    checkField(fieldName, type, false);
  for (const [fieldName, type] of Object.entries(optValidators))
    checkField(fieldName, type, true);
  return object;
}

// node_modules/@noble/curves/esm/abstract/modular.js
var _0n2 = BigInt(0);
var _1n2 = BigInt(1);
var _2n2 = BigInt(2);
var _3n = BigInt(3);
var _4n = BigInt(4);
var _5n = BigInt(5);
var _8n = BigInt(8);
var _9n = BigInt(9);
var _16n = BigInt(16);
function mod(a, b2) {
  const result = a % b2;
  return result >= _0n2 ? result : b2 + result;
}
function pow(num, power, modulo) {
  if (modulo <= _0n2 || power < _0n2)
    throw new Error("Expected power/modulo > 0");
  if (modulo === _1n2)
    return _0n2;
  let res = _1n2;
  while (power > _0n2) {
    if (power & _1n2)
      res = res * num % modulo;
    num = num * num % modulo;
    power >>= _1n2;
  }
  return res;
}
function pow2(x2, power, modulo) {
  let res = x2;
  while (power-- > _0n2) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number, modulo) {
  if (number === _0n2 || modulo <= _0n2) {
    throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
  }
  let a = mod(number, modulo);
  let b2 = modulo;
  let x2 = _0n2, y = _1n2, u = _1n2, v2 = _0n2;
  while (a !== _0n2) {
    const q2 = b2 / a;
    const r = b2 % a;
    const m2 = x2 - u * q2;
    const n = y - v2 * q2;
    b2 = a, a = r, x2 = u, y = v2, u = m2, v2 = n;
  }
  const gcd = b2;
  if (gcd !== _1n2)
    throw new Error("invert: does not exist");
  return mod(x2, modulo);
}
function tonelliShanks(P) {
  const legendreC = (P - _1n2) / _2n2;
  let Q2, S2, Z2;
  for (Q2 = P - _1n2, S2 = 0; Q2 % _2n2 === _0n2; Q2 /= _2n2, S2++)
    ;
  for (Z2 = _2n2; Z2 < P && pow(Z2, legendreC, P) !== P - _1n2; Z2++)
    ;
  if (S2 === 1) {
    const p1div4 = (P + _1n2) / _4n;
    return function tonelliFast(Fp2, n) {
      const root2 = Fp2.pow(n, p1div4);
      if (!Fp2.eql(Fp2.sqr(root2), n))
        throw new Error("Cannot find square root");
      return root2;
    };
  }
  const Q1div2 = (Q2 + _1n2) / _2n2;
  return function tonelliSlow(Fp2, n) {
    if (Fp2.pow(n, legendreC) === Fp2.neg(Fp2.ONE))
      throw new Error("Cannot find square root");
    let r = S2;
    let g = Fp2.pow(Fp2.mul(Fp2.ONE, Z2), Q2);
    let x2 = Fp2.pow(n, Q1div2);
    let b2 = Fp2.pow(n, Q2);
    while (!Fp2.eql(b2, Fp2.ONE)) {
      if (Fp2.eql(b2, Fp2.ZERO))
        return Fp2.ZERO;
      let m2 = 1;
      for (let t2 = Fp2.sqr(b2); m2 < r; m2++) {
        if (Fp2.eql(t2, Fp2.ONE))
          break;
        t2 = Fp2.sqr(t2);
      }
      const ge2 = Fp2.pow(g, _1n2 << BigInt(r - m2 - 1));
      g = Fp2.sqr(ge2);
      x2 = Fp2.mul(x2, ge2);
      b2 = Fp2.mul(b2, g);
      r = m2;
    }
    return x2;
  };
}
function FpSqrt(P) {
  if (P % _4n === _3n) {
    const p1div4 = (P + _1n2) / _4n;
    return function sqrt3mod4(Fp2, n) {
      const root2 = Fp2.pow(n, p1div4);
      if (!Fp2.eql(Fp2.sqr(root2), n))
        throw new Error("Cannot find square root");
      return root2;
    };
  }
  if (P % _8n === _5n) {
    const c1 = (P - _5n) / _8n;
    return function sqrt5mod8(Fp2, n) {
      const n2 = Fp2.mul(n, _2n2);
      const v2 = Fp2.pow(n2, c1);
      const nv = Fp2.mul(n, v2);
      const i = Fp2.mul(Fp2.mul(nv, _2n2), v2);
      const root2 = Fp2.mul(nv, Fp2.sub(i, Fp2.ONE));
      if (!Fp2.eql(Fp2.sqr(root2), n))
        throw new Error("Cannot find square root");
      return root2;
    };
  }
  if (P % _16n === _9n) {
  }
  return tonelliShanks(P);
}
var isNegativeLE = (num, modulo) => (mod(num, modulo) & _1n2) === _1n2;
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
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  return validateObject(field, opts);
}
function FpPow(f, num, power) {
  if (power < _0n2)
    throw new Error("Expected power > 0");
  if (power === _0n2)
    return f.ONE;
  if (power === _1n2)
    return num;
  let p = f.ONE;
  let d = num;
  while (power > _0n2) {
    if (power & _1n2)
      p = f.mul(p, d);
    d = f.sqr(d);
    power >>= _1n2;
  }
  return p;
}
function FpInvertBatch(f, nums) {
  const tmp = new Array(nums.length);
  const lastMultiplied = nums.reduce((acc, num, i) => {
    if (f.is0(num))
      return acc;
    tmp[i] = acc;
    return f.mul(acc, num);
  }, f.ONE);
  const inverted = f.inv(lastMultiplied);
  nums.reduceRight((acc, num, i) => {
    if (f.is0(num))
      return acc;
    tmp[i] = f.mul(acc, tmp[i]);
    return f.mul(acc, num);
  }, inverted);
  return tmp;
}
function nLength(n, nBitLength) {
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLen, isLE2 = false, redef = {}) {
  if (ORDER <= _0n2)
    throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen);
  if (BYTES > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const sqrtP = FpSqrt(ORDER);
  const f = Object.freeze({
    ORDER,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n2,
    ONE: _1n2,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof num}`);
      return _0n2 <= num && num < ORDER;
    },
    is0: (num) => num === _0n2,
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
    sqrt: redef.sqrt || ((n) => sqrtP(f, n)),
    invertBatch: (lst) => FpInvertBatch(f, lst),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (a, b2, c) => c ? b2 : a,
    toBytes: (num) => isLE2 ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes2) => {
      if (bytes2.length !== BYTES)
        throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes2.length}`);
      return isLE2 ? bytesToNumberLE(bytes2) : bytesToNumberBE(bytes2);
    }
  });
  return Object.freeze(f);
}
function FpSqrtEven(Fp2, elm) {
  if (!Fp2.isOdd)
    throw new Error(`Field doesn't have isOdd`);
  const root2 = Fp2.sqrt(elm);
  return Fp2.isOdd(root2) ? Fp2.neg(root2) : root2;
}

// node_modules/@noble/curves/esm/abstract/curve.js
var _0n3 = BigInt(0);
var _1n3 = BigInt(1);
function wNAF(c, bits) {
  const constTimeNegate = (condition, item) => {
    const neg = item.negate();
    return condition ? neg : item;
  };
  const opts = (W) => {
    const windows = Math.ceil(bits / W) + 1;
    const windowSize = 2 ** (W - 1);
    return { windows, windowSize };
  };
  return {
    constTimeNegate,
    // non-const time multiplication ladder
    unsafeLadder(elm, n) {
      let p = c.ZERO;
      let d = elm;
      while (n > _0n3) {
        if (n & _1n3)
          p = p.add(d);
        d = d.double();
        n >>= _1n3;
      }
      return p;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(elm, W) {
      const { windows, windowSize } = opts(W);
      const points = [];
      let p = elm;
      let base = p;
      for (let window2 = 0; window2 < windows; window2++) {
        base = p;
        points.push(base);
        for (let i = 1; i < windowSize; i++) {
          base = base.add(p);
          points.push(base);
        }
        p = base.double();
      }
      return points;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(W, precomputes, n) {
      const { windows, windowSize } = opts(W);
      let p = c.ZERO;
      let f = c.BASE;
      const mask = BigInt(2 ** W - 1);
      const maxNumber = 2 ** W;
      const shiftBy = BigInt(W);
      for (let window2 = 0; window2 < windows; window2++) {
        const offset = window2 * windowSize;
        let wbits = Number(n & mask);
        n >>= shiftBy;
        if (wbits > windowSize) {
          wbits -= maxNumber;
          n += _1n3;
        }
        const offset1 = offset;
        const offset2 = offset + Math.abs(wbits) - 1;
        const cond1 = window2 % 2 !== 0;
        const cond2 = wbits < 0;
        if (wbits === 0) {
          f = f.add(constTimeNegate(cond1, precomputes[offset1]));
        } else {
          p = p.add(constTimeNegate(cond2, precomputes[offset2]));
        }
      }
      return { p, f };
    },
    wNAFCached(P, precomputesMap, n, transform) {
      const W = P._WINDOW_SIZE || 1;
      let comp = precomputesMap.get(P);
      if (!comp) {
        comp = this.precomputeWindow(P, W);
        if (W !== 1) {
          precomputesMap.set(P, transform(comp));
        }
      }
      return this.wNAF(W, comp, n);
    }
  };
}
function validateBasic(curve) {
  validateField(curve.Fp);
  validateObject(curve, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  });
  return Object.freeze({
    ...nLength(curve.n, curve.nBitLength),
    ...curve,
    ...{ p: curve.Fp.ORDER }
  });
}

// node_modules/@noble/curves/esm/abstract/edwards.js
var _0n4 = BigInt(0);
var _1n4 = BigInt(1);
var _2n3 = BigInt(2);
var _8n2 = BigInt(8);
var VERIFY_DEFAULT = { zip215: true };
function validateOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(curve, {
    hash: "function",
    a: "bigint",
    d: "bigint",
    randomBytes: "function"
  }, {
    adjustScalarBytes: "function",
    domain: "function",
    uvRatio: "function",
    mapToCurve: "function"
  });
  return Object.freeze({ ...opts });
}
function twistedEdwards(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { Fp: Fp2, n: CURVE_ORDER, prehash, hash: cHash, randomBytes: randomBytes2, nByteLength, h: cofactor } = CURVE;
  const MASK = _2n3 << BigInt(nByteLength * 8) - _1n4;
  const modP = Fp2.create;
  const uvRatio2 = CURVE.uvRatio || ((u, v2) => {
    try {
      return { isValid: true, value: Fp2.sqrt(u * Fp2.inv(v2)) };
    } catch (e) {
      return { isValid: false, value: _0n4 };
    }
  });
  const adjustScalarBytes2 = CURVE.adjustScalarBytes || ((bytes2) => bytes2);
  const domain = CURVE.domain || ((data, ctx, phflag) => {
    if (ctx.length || phflag)
      throw new Error("Contexts/pre-hash are not supported");
    return data;
  });
  const inBig = (n) => typeof n === "bigint" && _0n4 < n;
  const inRange = (n, max) => inBig(n) && inBig(max) && n < max;
  const in0MaskRange = (n) => n === _0n4 || inRange(n, MASK);
  function assertInRange(n, max) {
    if (inRange(n, max))
      return n;
    throw new Error(`Expected valid scalar < ${max}, got ${typeof n} ${n}`);
  }
  function assertGE0(n) {
    return n === _0n4 ? n : assertInRange(n, CURVE_ORDER);
  }
  const pointPrecomputes = /* @__PURE__ */ new Map();
  function isPoint(other) {
    if (!(other instanceof Point))
      throw new Error("ExtendedPoint expected");
  }
  class Point {
    constructor(ex, ey, ez, et) {
      this.ex = ex;
      this.ey = ey;
      this.ez = ez;
      this.et = et;
      if (!in0MaskRange(ex))
        throw new Error("x required");
      if (!in0MaskRange(ey))
        throw new Error("y required");
      if (!in0MaskRange(ez))
        throw new Error("z required");
      if (!in0MaskRange(et))
        throw new Error("t required");
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(p) {
      if (p instanceof Point)
        throw new Error("extended point not allowed");
      const { x: x2, y } = p || {};
      if (!in0MaskRange(x2) || !in0MaskRange(y))
        throw new Error("invalid affine point");
      return new Point(x2, y, _1n4, modP(x2 * y));
    }
    static normalizeZ(points) {
      const toInv = Fp2.invertBatch(points.map((p) => p.ez));
      return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      this._WINDOW_SIZE = windowSize;
      pointPrecomputes.delete(this);
    }
    // Not required for fromHex(), which always creates valid points.
    // Could be useful for fromAffine().
    assertValidity() {
      const { a, d } = CURVE;
      if (this.is0())
        throw new Error("bad point: ZERO");
      const { ex: X2, ey: Y2, ez: Z2, et: T } = this;
      const X22 = modP(X2 * X2);
      const Y22 = modP(Y2 * Y2);
      const Z22 = modP(Z2 * Z2);
      const Z4 = modP(Z22 * Z22);
      const aX2 = modP(X22 * a);
      const left = modP(Z22 * modP(aX2 + Y22));
      const right = modP(Z4 + modP(d * modP(X22 * Y22)));
      if (left !== right)
        throw new Error("bad point: equation left != right (1)");
      const XY = modP(X2 * Y2);
      const ZT = modP(Z2 * T);
      if (XY !== ZT)
        throw new Error("bad point: equation left != right (2)");
    }
    // Compare one point to another.
    equals(other) {
      isPoint(other);
      const { ex: X1, ey: Y1, ez: Z1 } = this;
      const { ex: X2, ey: Y2, ez: Z2 } = other;
      const X1Z2 = modP(X1 * Z2);
      const X2Z1 = modP(X2 * Z1);
      const Y1Z2 = modP(Y1 * Z2);
      const Y2Z1 = modP(Y2 * Z1);
      return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    negate() {
      return new Point(modP(-this.ex), this.ey, this.ez, modP(-this.et));
    }
    // Fast algo for doubling Extended Point.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
    // Cost: 4M + 4S + 1*a + 6add + 1*2.
    double() {
      const { a } = CURVE;
      const { ex: X1, ey: Y1, ez: Z1 } = this;
      const A2 = modP(X1 * X1);
      const B = modP(Y1 * Y1);
      const C = modP(_2n3 * modP(Z1 * Z1));
      const D2 = modP(a * A2);
      const x1y1 = X1 + Y1;
      const E = modP(modP(x1y1 * x1y1) - A2 - B);
      const G2 = D2 + B;
      const F = G2 - C;
      const H = D2 - B;
      const X3 = modP(E * F);
      const Y3 = modP(G2 * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G2);
      return new Point(X3, Y3, Z3, T3);
    }
    // Fast algo for adding 2 Extended Points.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
    // Cost: 9M + 1*a + 1*d + 7add.
    add(other) {
      isPoint(other);
      const { a, d } = CURVE;
      const { ex: X1, ey: Y1, ez: Z1, et: T1 } = this;
      const { ex: X2, ey: Y2, ez: Z2, et: T2 } = other;
      if (a === BigInt(-1)) {
        const A3 = modP((Y1 - X1) * (Y2 + X2));
        const B2 = modP((Y1 + X1) * (Y2 - X2));
        const F2 = modP(B2 - A3);
        if (F2 === _0n4)
          return this.double();
        const C2 = modP(Z1 * _2n3 * T2);
        const D3 = modP(T1 * _2n3 * Z2);
        const E2 = D3 + C2;
        const G3 = B2 + A3;
        const H2 = D3 - C2;
        const X32 = modP(E2 * F2);
        const Y32 = modP(G3 * H2);
        const T32 = modP(E2 * H2);
        const Z32 = modP(F2 * G3);
        return new Point(X32, Y32, Z32, T32);
      }
      const A2 = modP(X1 * X2);
      const B = modP(Y1 * Y2);
      const C = modP(T1 * d * T2);
      const D2 = modP(Z1 * Z2);
      const E = modP((X1 + Y1) * (X2 + Y2) - A2 - B);
      const F = D2 - C;
      const G2 = D2 + C;
      const H = modP(B - a * A2);
      const X3 = modP(E * F);
      const Y3 = modP(G2 * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G2);
      return new Point(X3, Y3, Z3, T3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    wNAF(n) {
      return wnaf.wNAFCached(this, pointPrecomputes, n, Point.normalizeZ);
    }
    // Constant-time multiplication.
    multiply(scalar) {
      const { p, f } = this.wNAF(assertInRange(scalar, CURVE_ORDER));
      return Point.normalizeZ([p, f])[0];
    }
    // Non-constant-time multiplication. Uses double-and-add algorithm.
    // It's faster, but should only be used when you don't care about
    // an exposed private key e.g. sig verification.
    // Does NOT allow scalars higher than CURVE.n.
    multiplyUnsafe(scalar) {
      let n = assertGE0(scalar);
      if (n === _0n4)
        return I2;
      if (this.equals(I2) || n === _1n4)
        return this;
      if (this.equals(G))
        return this.wNAF(n).p;
      return wnaf.unsafeLadder(this, n);
    }
    // Checks if point is of small order.
    // If you add something to small order point, you will have "dirty"
    // point with torsion component.
    // Multiplies point by cofactor and checks if the result is 0.
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    // Multiplies point by curve order and checks if the result is 0.
    // Returns `false` is the point is dirty.
    isTorsionFree() {
      return wnaf.unsafeLadder(this, CURVE_ORDER).is0();
    }
    // Converts Extended point to default (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    toAffine(iz) {
      const { ex: x2, ey: y, ez: z2 } = this;
      const is0 = this.is0();
      if (iz == null)
        iz = is0 ? _8n2 : Fp2.inv(z2);
      const ax = modP(x2 * iz);
      const ay = modP(y * iz);
      const zz = modP(z2 * iz);
      if (is0)
        return { x: _0n4, y: _1n4 };
      if (zz !== _1n4)
        throw new Error("invZ was invalid");
      return { x: ax, y: ay };
    }
    clearCofactor() {
      const { h: cofactor2 } = CURVE;
      if (cofactor2 === _1n4)
        return this;
      return this.multiplyUnsafe(cofactor2);
    }
    // Converts hash string or Uint8Array to Point.
    // Uses algo from RFC8032 5.1.3.
    static fromHex(hex, zip215 = false) {
      const { d, a } = CURVE;
      const len = Fp2.BYTES;
      hex = ensureBytes("pointHex", hex, len);
      const normed = hex.slice();
      const lastByte = hex[len - 1];
      normed[len - 1] = lastByte & ~128;
      const y = bytesToNumberLE(normed);
      if (y === _0n4) {
      } else {
        if (zip215)
          assertInRange(y, MASK);
        else
          assertInRange(y, Fp2.ORDER);
      }
      const y2 = modP(y * y);
      const u = modP(y2 - _1n4);
      const v2 = modP(d * y2 - a);
      let { isValid, value: x2 } = uvRatio2(u, v2);
      if (!isValid)
        throw new Error("Point.fromHex: invalid y coordinate");
      const isXOdd = (x2 & _1n4) === _1n4;
      const isLastByteOdd = (lastByte & 128) !== 0;
      if (!zip215 && x2 === _0n4 && isLastByteOdd)
        throw new Error("Point.fromHex: x=0 and x_0=1");
      if (isLastByteOdd !== isXOdd)
        x2 = modP(-x2);
      return Point.fromAffine({ x: x2, y });
    }
    static fromPrivateKey(privKey) {
      return getExtendedPublicKey(privKey).point;
    }
    toRawBytes() {
      const { x: x2, y } = this.toAffine();
      const bytes2 = numberToBytesLE(y, Fp2.BYTES);
      bytes2[bytes2.length - 1] |= x2 & _1n4 ? 128 : 0;
      return bytes2;
    }
    toHex() {
      return bytesToHex(this.toRawBytes());
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, _1n4, modP(CURVE.Gx * CURVE.Gy));
  Point.ZERO = new Point(_0n4, _1n4, _1n4, _0n4);
  const { BASE: G, ZERO: I2 } = Point;
  const wnaf = wNAF(Point, nByteLength * 8);
  function modN(a) {
    return mod(a, CURVE_ORDER);
  }
  function modN_LE(hash2) {
    return modN(bytesToNumberLE(hash2));
  }
  function getExtendedPublicKey(key) {
    const len = nByteLength;
    key = ensureBytes("private key", key, len);
    const hashed = ensureBytes("hashed private key", cHash(key), 2 * len);
    const head = adjustScalarBytes2(hashed.slice(0, len));
    const prefix = hashed.slice(len, 2 * len);
    const scalar = modN_LE(head);
    const point = G.multiply(scalar);
    const pointBytes = point.toRawBytes();
    return { head, prefix, scalar, point, pointBytes };
  }
  function getPublicKey(privKey) {
    return getExtendedPublicKey(privKey).pointBytes;
  }
  function hashDomainToScalar(context = new Uint8Array(), ...msgs) {
    const msg = concatBytes2(...msgs);
    return modN_LE(cHash(domain(msg, ensureBytes("context", context), !!prehash)));
  }
  function sign(msg, privKey, options = {}) {
    msg = ensureBytes("message", msg);
    if (prehash)
      msg = prehash(msg);
    const { prefix, scalar, pointBytes } = getExtendedPublicKey(privKey);
    const r = hashDomainToScalar(options.context, prefix, msg);
    const R = G.multiply(r).toRawBytes();
    const k2 = hashDomainToScalar(options.context, R, pointBytes, msg);
    const s = modN(r + k2 * scalar);
    assertGE0(s);
    const res = concatBytes2(R, numberToBytesLE(s, Fp2.BYTES));
    return ensureBytes("result", res, nByteLength * 2);
  }
  const verifyOpts = VERIFY_DEFAULT;
  function verify2(sig, msg, publicKey, options = verifyOpts) {
    const { context, zip215 } = options;
    const len = Fp2.BYTES;
    sig = ensureBytes("signature", sig, 2 * len);
    msg = ensureBytes("message", msg);
    if (prehash)
      msg = prehash(msg);
    const s = bytesToNumberLE(sig.slice(len, 2 * len));
    let A2, R, SB;
    try {
      A2 = Point.fromHex(publicKey, zip215);
      R = Point.fromHex(sig.slice(0, len), zip215);
      SB = G.multiplyUnsafe(s);
    } catch (error) {
      return false;
    }
    if (!zip215 && A2.isSmallOrder())
      return false;
    const k2 = hashDomainToScalar(context, R.toRawBytes(), A2.toRawBytes(), msg);
    const RkA = R.add(A2.multiplyUnsafe(k2));
    return RkA.subtract(SB).clearCofactor().equals(Point.ZERO);
  }
  G._setWindowSize(8);
  const utils = {
    getExtendedPublicKey,
    // ed25519 private keys are uniform 32b. No need to check for modulo bias, like in secp256k1.
    randomPrivateKey: () => randomBytes2(Fp2.BYTES),
    /**
     * We're doing scalar multiplication (used in getPublicKey etc) with precomputed BASE_POINT
     * values. This slows down first getPublicKey() by milliseconds (see Speed section),
     * but allows to speed-up subsequent getPublicKey() calls up to 20x.
     * @param windowSize 2, 4, 8, 16
     */
    precompute(windowSize = 8, point = Point.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  return {
    CURVE,
    getPublicKey,
    sign,
    verify: verify2,
    ExtendedPoint: Point,
    utils
  };
}

// node_modules/@noble/curves/esm/ed25519.js
var ED25519_P = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
var ED25519_SQRT_M1 = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
var _0n5 = BigInt(0);
var _1n5 = BigInt(1);
var _2n4 = BigInt(2);
var _5n2 = BigInt(5);
var _10n = BigInt(10);
var _20n = BigInt(20);
var _40n = BigInt(40);
var _80n = BigInt(80);
function ed25519_pow_2_252_3(x2) {
  const P = ED25519_P;
  const x22 = x2 * x2 % P;
  const b2 = x22 * x2 % P;
  const b4 = pow2(b2, _2n4, P) * b2 % P;
  const b5 = pow2(b4, _1n5, P) * x2 % P;
  const b10 = pow2(b5, _5n2, P) * b5 % P;
  const b20 = pow2(b10, _10n, P) * b10 % P;
  const b40 = pow2(b20, _20n, P) * b20 % P;
  const b80 = pow2(b40, _40n, P) * b40 % P;
  const b160 = pow2(b80, _80n, P) * b80 % P;
  const b240 = pow2(b160, _80n, P) * b80 % P;
  const b250 = pow2(b240, _10n, P) * b10 % P;
  const pow_p_5_8 = pow2(b250, _2n4, P) * x2 % P;
  return { pow_p_5_8, b2 };
}
function adjustScalarBytes(bytes2) {
  bytes2[0] &= 248;
  bytes2[31] &= 127;
  bytes2[31] |= 64;
  return bytes2;
}
function uvRatio(u, v2) {
  const P = ED25519_P;
  const v3 = mod(v2 * v2 * v2, P);
  const v7 = mod(v3 * v3 * v2, P);
  const pow3 = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
  let x2 = mod(u * v3 * pow3, P);
  const vx2 = mod(v2 * x2 * x2, P);
  const root1 = x2;
  const root2 = mod(x2 * ED25519_SQRT_M1, P);
  const useRoot1 = vx2 === u;
  const useRoot2 = vx2 === mod(-u, P);
  const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P);
  if (useRoot1)
    x2 = root1;
  if (useRoot2 || noRoot)
    x2 = root2;
  if (isNegativeLE(x2, P))
    x2 = mod(-x2, P);
  return { isValid: useRoot1 || useRoot2, value: x2 };
}
var Fp = Field(ED25519_P, void 0, true);
var ed25519Defaults = {
  // Param: a
  a: BigInt(-1),
  // Fp.create(-1) is proper; our way still works and is faster
  // d is equal to -121665/121666 over finite field.
  // Negative number is P - number, and division is invert(number, P)
  d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
  // Finite field 𝔽p over which we'll do calculations; 2n**255n - 19n
  Fp,
  // Subgroup order: how many points curve has
  // 2n**252n + 27742317777372353535851937790883648493n;
  n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
  // Cofactor
  h: BigInt(8),
  // Base point (x, y) aka generator point
  Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
  Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
  hash: sha512,
  randomBytes,
  adjustScalarBytes,
  // dom2
  // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
  // Constant-time, u/√v
  uvRatio
};
var ed25519 = /* @__PURE__ */ twistedEdwards(ed25519Defaults);
function ed25519_domain(data, ctx, phflag) {
  if (ctx.length > 255)
    throw new Error("Context is too big");
  return concatBytes(utf8ToBytes("SigEd25519 no Ed25519 collisions"), new Uint8Array([phflag ? 1 : 0, ctx.length]), ctx, data);
}
var ed25519ctx = /* @__PURE__ */ twistedEdwards({
  ...ed25519Defaults,
  domain: ed25519_domain
});
var ed25519ph = /* @__PURE__ */ twistedEdwards({
  ...ed25519Defaults,
  domain: ed25519_domain,
  prehash: sha512
});
var ELL2_C1 = (Fp.ORDER + BigInt(3)) / BigInt(8);
var ELL2_C2 = Fp.pow(_2n4, ELL2_C1);
var ELL2_C3 = Fp.sqrt(Fp.neg(Fp.ONE));
var ELL2_C4 = (Fp.ORDER - BigInt(5)) / BigInt(8);
var ELL2_J = BigInt(486662);
var ELL2_C1_EDWARDS = FpSqrtEven(Fp, Fp.neg(BigInt(486664)));
var SQRT_AD_MINUS_ONE = BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
var INVSQRT_A_MINUS_D = BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
var ONE_MINUS_D_SQ = BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
var D_MINUS_ONE_SQ = BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
var MAX_255B = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

// node_modules/@dfinity/agent/lib/esm/utils/expirableMap.js
var __classPrivateFieldSet = function(receiver, state, value4, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value4) : f ? f.value = value4 : state.set(receiver, value4), value4;
};
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ExpirableMap_inner;
var _ExpirableMap_expirationTime;
var _a;
var _b;
var ExpirableMap = class {
  /**
   * Create a new ExpirableMap.
   * @param {ExpirableMapOptions<any, any>} options - options for the map.
   * @param {Iterable<[any, any]>} options.source - an optional source of entries to initialize the map with.
   * @param {number} options.expirationTime - the time in milliseconds after which entries will expire.
   */
  constructor(options = {}) {
    _ExpirableMap_inner.set(this, void 0);
    _ExpirableMap_expirationTime.set(this, void 0);
    this[_a] = this.entries.bind(this);
    this[_b] = "ExpirableMap";
    const { source = [], expirationTime = 10 * 60 * 1e3 } = options;
    const currentTime = Date.now();
    __classPrivateFieldSet(this, _ExpirableMap_inner, new Map([...source].map(([key, value4]) => [key, { value: value4, timestamp: currentTime }])), "f");
    __classPrivateFieldSet(this, _ExpirableMap_expirationTime, expirationTime, "f");
  }
  /**
   * Prune removes all expired entries.
   */
  prune() {
    const currentTime = Date.now();
    for (const [key, entry] of __classPrivateFieldGet(this, _ExpirableMap_inner, "f").entries()) {
      if (currentTime - entry.timestamp > __classPrivateFieldGet(this, _ExpirableMap_expirationTime, "f")) {
        __classPrivateFieldGet(this, _ExpirableMap_inner, "f").delete(key);
      }
    }
    return this;
  }
  // Implementing the Map interface
  /**
   * Set the value for the given key. Prunes expired entries.
   * @param key for the entry
   * @param value of the entry
   * @returns this
   */
  set(key, value4) {
    this.prune();
    const entry = {
      value: value4,
      timestamp: Date.now()
    };
    __classPrivateFieldGet(this, _ExpirableMap_inner, "f").set(key, entry);
    return this;
  }
  /**
   * Get the value associated with the key, if it exists and has not expired.
   * @param key K
   * @returns the value associated with the key, or undefined if the key is not present or has expired.
   */
  get(key) {
    const entry = __classPrivateFieldGet(this, _ExpirableMap_inner, "f").get(key);
    if (entry === void 0) {
      return void 0;
    }
    if (Date.now() - entry.timestamp > __classPrivateFieldGet(this, _ExpirableMap_expirationTime, "f")) {
      __classPrivateFieldGet(this, _ExpirableMap_inner, "f").delete(key);
      return void 0;
    }
    return entry.value;
  }
  /**
   * Clear all entries.
   */
  clear() {
    __classPrivateFieldGet(this, _ExpirableMap_inner, "f").clear();
  }
  /**
   * Entries returns the entries of the map, without the expiration time.
   * @returns an iterator over the entries of the map.
   */
  entries() {
    const iterator = __classPrivateFieldGet(this, _ExpirableMap_inner, "f").entries();
    const generator = function* () {
      for (const [key, value4] of iterator) {
        yield [key, value4.value];
      }
    };
    return generator();
  }
  /**
   * Values returns the values of the map, without the expiration time.
   * @returns an iterator over the values of the map.
   */
  values() {
    const iterator = __classPrivateFieldGet(this, _ExpirableMap_inner, "f").values();
    const generator = function* () {
      for (const value4 of iterator) {
        yield value4.value;
      }
    };
    return generator();
  }
  /**
   * Keys returns the keys of the map
   * @returns an iterator over the keys of the map.
   */
  keys() {
    return __classPrivateFieldGet(this, _ExpirableMap_inner, "f").keys();
  }
  /**
   * forEach calls the callbackfn on each entry of the map.
   * @param callbackfn to call on each entry
   * @param thisArg to use as this when calling the callbackfn
   */
  forEach(callbackfn, thisArg) {
    for (const [key, value4] of __classPrivateFieldGet(this, _ExpirableMap_inner, "f").entries()) {
      callbackfn.call(thisArg, value4.value, key, this);
    }
  }
  /**
   * has returns true if the key exists and has not expired.
   * @param key K
   * @returns true if the key exists and has not expired.
   */
  has(key) {
    return __classPrivateFieldGet(this, _ExpirableMap_inner, "f").has(key);
  }
  /**
   * delete the entry for the given key.
   * @param key K
   * @returns true if the key existed and has been deleted.
   */
  delete(key) {
    return __classPrivateFieldGet(this, _ExpirableMap_inner, "f").delete(key);
  }
  /**
   * get size of the map.
   * @returns the size of the map.
   */
  get size() {
    return __classPrivateFieldGet(this, _ExpirableMap_inner, "f").size;
  }
};
_ExpirableMap_inner = /* @__PURE__ */ new WeakMap(), _ExpirableMap_expirationTime = /* @__PURE__ */ new WeakMap(), _a = Symbol.iterator, _b = Symbol.toStringTag;

// node_modules/@dfinity/agent/lib/esm/der.js
init_buffer2();
var encodeLenBytes = (len) => {
  if (len <= 127) {
    return 1;
  } else if (len <= 255) {
    return 2;
  } else if (len <= 65535) {
    return 3;
  } else if (len <= 16777215) {
    return 4;
  } else {
    throw new Error("Length too long (> 4 bytes)");
  }
};
var encodeLen = (buf, offset, len) => {
  if (len <= 127) {
    buf[offset] = len;
    return 1;
  } else if (len <= 255) {
    buf[offset] = 129;
    buf[offset + 1] = len;
    return 2;
  } else if (len <= 65535) {
    buf[offset] = 130;
    buf[offset + 1] = len >> 8;
    buf[offset + 2] = len;
    return 3;
  } else if (len <= 16777215) {
    buf[offset] = 131;
    buf[offset + 1] = len >> 16;
    buf[offset + 2] = len >> 8;
    buf[offset + 3] = len;
    return 4;
  } else {
    throw new Error("Length too long (> 4 bytes)");
  }
};
var decodeLenBytes = (buf, offset) => {
  if (buf[offset] < 128)
    return 1;
  if (buf[offset] === 128)
    throw new Error("Invalid length 0");
  if (buf[offset] === 129)
    return 2;
  if (buf[offset] === 130)
    return 3;
  if (buf[offset] === 131)
    return 4;
  throw new Error("Length too long (> 4 bytes)");
};
var decodeLen = (buf, offset) => {
  const lenBytes = decodeLenBytes(buf, offset);
  if (lenBytes === 1)
    return buf[offset];
  else if (lenBytes === 2)
    return buf[offset + 1];
  else if (lenBytes === 3)
    return (buf[offset + 1] << 8) + buf[offset + 2];
  else if (lenBytes === 4)
    return (buf[offset + 1] << 16) + (buf[offset + 2] << 8) + buf[offset + 3];
  throw new Error("Length too long (> 4 bytes)");
};
var DER_COSE_OID = Uint8Array.from([
  ...[48, 12],
  ...[6, 10],
  ...[43, 6, 1, 4, 1, 131, 184, 67, 1, 1]
  // DER encoded COSE
]);
var ED25519_OID = Uint8Array.from([
  ...[48, 5],
  ...[6, 3],
  ...[43, 101, 112]
  // id-Ed25519 OID
]);
var SECP256K1_OID = Uint8Array.from([
  ...[48, 16],
  ...[6, 7],
  ...[42, 134, 72, 206, 61, 2, 1],
  ...[6, 5],
  ...[43, 129, 4, 0, 10]
  // OID secp256k1
]);
function wrapDER(payload, oid) {
  const bitStringHeaderLength = 2 + encodeLenBytes(payload.byteLength + 1);
  const len = oid.byteLength + bitStringHeaderLength + payload.byteLength;
  let offset = 0;
  const buf = new Uint8Array(1 + encodeLenBytes(len) + len);
  buf[offset++] = 48;
  offset += encodeLen(buf, offset, len);
  buf.set(oid, offset);
  offset += oid.byteLength;
  buf[offset++] = 3;
  offset += encodeLen(buf, offset, payload.byteLength + 1);
  buf[offset++] = 0;
  buf.set(new Uint8Array(payload), offset);
  return buf;
}
var unwrapDER = (derEncoded, oid) => {
  let offset = 0;
  const expect = (n, msg) => {
    if (buf[offset++] !== n) {
      throw new Error("Expected: " + msg);
    }
  };
  const buf = new Uint8Array(derEncoded);
  expect(48, "sequence");
  offset += decodeLenBytes(buf, offset);
  if (!bufEquals(buf.slice(offset, offset + oid.byteLength), oid)) {
    throw new Error("Not the expected OID.");
  }
  offset += oid.byteLength;
  expect(3, "bit string");
  const payloadLen = decodeLen(buf, offset) - 1;
  offset += decodeLenBytes(buf, offset);
  expect(0, "0 padding");
  const result = buf.slice(offset);
  if (payloadLen !== result.length) {
    throw new Error(`DER payload mismatch: Expected length ${payloadLen} actual length ${result.length}`);
  }
  return result;
};

// node_modules/@dfinity/agent/lib/esm/public_key.js
var __classPrivateFieldSet2 = function(receiver, state, value4, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value4) : f ? f.value = value4 : state.set(receiver, value4), value4;
};
var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Ed25519PublicKey_rawKey;
var _Ed25519PublicKey_derKey;
var Ed25519PublicKey = class _Ed25519PublicKey {
  // `fromRaw` and `fromDer` should be used for instantiation, not this constructor.
  constructor(key) {
    _Ed25519PublicKey_rawKey.set(this, void 0);
    _Ed25519PublicKey_derKey.set(this, void 0);
    if (key.byteLength !== _Ed25519PublicKey.RAW_KEY_LENGTH) {
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    }
    __classPrivateFieldSet2(this, _Ed25519PublicKey_rawKey, key, "f");
    __classPrivateFieldSet2(this, _Ed25519PublicKey_derKey, _Ed25519PublicKey.derEncode(key), "f");
  }
  static from(key) {
    return this.fromDer(key.toDer());
  }
  static fromRaw(rawKey) {
    return new _Ed25519PublicKey(rawKey);
  }
  static fromDer(derKey) {
    return new _Ed25519PublicKey(this.derDecode(derKey));
  }
  static derEncode(publicKey) {
    return wrapDER(publicKey, ED25519_OID).buffer;
  }
  static derDecode(key) {
    const unwrapped = unwrapDER(key, ED25519_OID);
    if (unwrapped.length !== this.RAW_KEY_LENGTH) {
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    }
    return unwrapped;
  }
  get rawKey() {
    return __classPrivateFieldGet2(this, _Ed25519PublicKey_rawKey, "f");
  }
  get derKey() {
    return __classPrivateFieldGet2(this, _Ed25519PublicKey_derKey, "f");
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
};
_Ed25519PublicKey_rawKey = /* @__PURE__ */ new WeakMap(), _Ed25519PublicKey_derKey = /* @__PURE__ */ new WeakMap();
Ed25519PublicKey.RAW_KEY_LENGTH = 32;

// node_modules/@dfinity/agent/lib/esm/agent/http/index.js
var __classPrivateFieldSet3 = function(receiver, state, value4, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value4) : f ? f.value = value4 : state.set(receiver, value4), value4;
};
var __classPrivateFieldGet3 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HttpAgent_queryPipeline;
var _HttpAgent_updatePipeline;
var _HttpAgent_subnetKeys;
var _HttpAgent_verifyQuerySignatures;
var _HttpAgent_verifyQueryResponse;
var RequestStatusResponseStatus;
(function(RequestStatusResponseStatus2) {
  RequestStatusResponseStatus2["Received"] = "received";
  RequestStatusResponseStatus2["Processing"] = "processing";
  RequestStatusResponseStatus2["Replied"] = "replied";
  RequestStatusResponseStatus2["Rejected"] = "rejected";
  RequestStatusResponseStatus2["Unknown"] = "unknown";
  RequestStatusResponseStatus2["Done"] = "done";
})(RequestStatusResponseStatus || (RequestStatusResponseStatus = {}));
var DEFAULT_INGRESS_EXPIRY_DELTA_IN_MSECS = 5 * 60 * 1e3;
var IC_ROOT_KEY = "308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100814c0e6ec71fab583b08bd81373c255c3c371b2e84863c98a4f1e08b74235d14fb5d9c0cd546d9685f913a0c0b2cc5341583bf4b4392e467db96d65b9bb4cb717112f8472e0d5a4d14505ffd7484b01291091c5f87b98883463f98091a0baaae";
var IC0_DOMAIN = "ic0.app";
var IC0_SUB_DOMAIN = ".ic0.app";
var ICP0_DOMAIN = "icp0.io";
var ICP0_SUB_DOMAIN = ".icp0.io";
var ICP_API_DOMAIN = "icp-api.io";
var ICP_API_SUB_DOMAIN = ".icp-api.io";
var HttpDefaultFetchError = class extends AgentError {
  constructor(message) {
    super(message);
    this.message = message;
  }
};
var IdentityInvalidError = class extends AgentError {
  constructor(message) {
    super(message);
    this.message = message;
  }
};
function getDefaultFetch() {
  let defaultFetch;
  if (typeof window !== "undefined") {
    if (window.fetch) {
      defaultFetch = window.fetch.bind(window);
    } else {
      throw new HttpDefaultFetchError("Fetch implementation was not available. You appear to be in a browser context, but window.fetch was not present.");
    }
  } else if (typeof window !== "undefined") {
    if (window.fetch) {
      defaultFetch = window.fetch.bind(window);
    } else {
      throw new HttpDefaultFetchError("Fetch implementation was not available. You appear to be in a Node.js context, but global.fetch was not available.");
    }
  } else if (typeof self !== "undefined") {
    if (self.fetch) {
      defaultFetch = self.fetch.bind(self);
    }
  }
  if (defaultFetch) {
    return defaultFetch;
  }
  throw new HttpDefaultFetchError("Fetch implementation was not available. Please provide fetch to the HttpAgent constructor, or ensure it is available in the window or global context.");
}
var HttpAgent = class _HttpAgent {
  constructor(options = {}) {
    this.rootKey = fromHex(IC_ROOT_KEY);
    this._timeDiffMsecs = 0;
    this._rootKeyFetched = false;
    this._isAgent = true;
    _HttpAgent_queryPipeline.set(this, []);
    _HttpAgent_updatePipeline.set(this, []);
    _HttpAgent_subnetKeys.set(this, new ExpirableMap({
      expirationTime: 5 * 60 * 1e3
      // 5 minutes
    }));
    _HttpAgent_verifyQuerySignatures.set(this, true);
    _HttpAgent_verifyQueryResponse.set(this, (queryResponse, subnetStatus) => {
      if (__classPrivateFieldGet3(this, _HttpAgent_verifyQuerySignatures, "f") === false) {
        return queryResponse;
      }
      if (!subnetStatus) {
        throw new CertificateVerificationError("Invalid signature from replica signed query: no matching node key found.");
      }
      const { status, signatures = [], requestId } = queryResponse;
      const domainSeparator3 = new TextEncoder().encode("\vic-response");
      for (const sig of signatures) {
        const { timestamp, identity } = sig;
        const nodeId = Principal2.fromUint8Array(identity).toText();
        let hash2;
        if (status === "replied") {
          const { reply } = queryResponse;
          hash2 = hashOfMap({
            status,
            reply,
            timestamp: BigInt(timestamp),
            request_id: requestId
          });
        } else if (status === "rejected") {
          const { reject_code, reject_message, error_code } = queryResponse;
          hash2 = hashOfMap({
            status,
            reject_code,
            reject_message,
            error_code,
            timestamp: BigInt(timestamp),
            request_id: requestId
          });
        } else {
          throw new Error(`Unknown status: ${status}`);
        }
        const separatorWithHash = concat2(domainSeparator3, new Uint8Array(hash2));
        const pubKey = subnetStatus === null || subnetStatus === void 0 ? void 0 : subnetStatus.nodeKeys.get(nodeId);
        if (!pubKey) {
          throw new CertificateVerificationError("Invalid signature from replica signed query: no matching node key found.");
        }
        const rawKey = Ed25519PublicKey.fromDer(pubKey).rawKey;
        const valid = ed25519.verify(sig.signature, new Uint8Array(separatorWithHash), new Uint8Array(rawKey));
        if (valid)
          return queryResponse;
        throw new CertificateVerificationError(`Invalid signature from replica ${nodeId} signed query.`);
      }
      return queryResponse;
    });
    if (options.source) {
      if (!(options.source instanceof _HttpAgent)) {
        throw new Error("An Agent's source can only be another HttpAgent");
      }
      this._identity = options.source._identity;
      this._fetch = options.source._fetch;
      this._host = options.source._host;
      this._credentials = options.source._credentials;
    } else {
      this._fetch = options.fetch || getDefaultFetch() || fetch.bind(window);
      this._fetchOptions = options.fetchOptions;
      this._callOptions = options.callOptions;
    }
    if (options.host !== void 0) {
      if (!options.host.match(/^[a-z]+:/) && typeof window !== "undefined") {
        this._host = new URL(window.location.protocol + "//" + options.host);
      } else {
        this._host = new URL(options.host);
      }
    } else if (options.source !== void 0) {
      this._host = options.source._host;
    } else {
      const location2 = typeof window !== "undefined" ? window.location : void 0;
      if (!location2) {
        this._host = new URL("https://icp-api.io");
        console.warn("Could not infer host from window.location, defaulting to mainnet gateway of https://icp-api.io. Please provide a host to the HttpAgent constructor to avoid this warning.");
      }
      const knownHosts = ["ic0.app", "icp0.io", "127.0.0.1", "localhost"];
      const remoteHosts = [".github.dev", ".gitpod.io"];
      const hostname = location2 === null || location2 === void 0 ? void 0 : location2.hostname;
      let knownHost;
      if (hostname && typeof hostname === "string") {
        if (remoteHosts.some((host) => hostname.endsWith(host))) {
          knownHost = hostname;
        } else {
          knownHost = knownHosts.find((host) => hostname.endsWith(host));
        }
      }
      if (location2 && knownHost) {
        this._host = new URL(`${location2.protocol}//${knownHost}${location2.port ? ":" + location2.port : ""}`);
      } else {
        this._host = new URL("https://icp-api.io");
        console.warn("Could not infer host from window.location, defaulting to mainnet gateway of https://icp-api.io. Please provide a host to the HttpAgent constructor to avoid this warning.");
      }
    }
    if (options.verifyQuerySignatures !== void 0) {
      __classPrivateFieldSet3(this, _HttpAgent_verifyQuerySignatures, options.verifyQuerySignatures, "f");
    }
    this._retryTimes = options.retryTimes !== void 0 && options.retryTimes >= 0 ? options.retryTimes : 3;
    if (this._host.hostname.endsWith(IC0_SUB_DOMAIN)) {
      this._host.hostname = IC0_DOMAIN;
    } else if (this._host.hostname.endsWith(ICP0_SUB_DOMAIN)) {
      this._host.hostname = ICP0_DOMAIN;
    } else if (this._host.hostname.endsWith(ICP_API_SUB_DOMAIN)) {
      this._host.hostname = ICP_API_DOMAIN;
    }
    if (options.credentials) {
      const { name, password } = options.credentials;
      this._credentials = `${name}${password ? ":" + password : ""}`;
    }
    this._identity = Promise.resolve(options.identity || new AnonymousIdentity());
    this.addTransform("update", makeNonceTransform(makeNonce));
    if (options.useQueryNonces) {
      this.addTransform("query", makeNonceTransform(makeNonce));
    }
  }
  isLocal() {
    const hostname = this._host.hostname;
    return hostname === "127.0.0.1" || hostname.endsWith("127.0.0.1");
  }
  addTransform(type, fn, priority = fn.priority || 0) {
    if (type === "update") {
      const i = __classPrivateFieldGet3(this, _HttpAgent_updatePipeline, "f").findIndex((x2) => (x2.priority || 0) < priority);
      __classPrivateFieldGet3(this, _HttpAgent_updatePipeline, "f").splice(i >= 0 ? i : __classPrivateFieldGet3(this, _HttpAgent_updatePipeline, "f").length, 0, Object.assign(fn, { priority }));
    } else if (type === "query") {
      const i = __classPrivateFieldGet3(this, _HttpAgent_queryPipeline, "f").findIndex((x2) => (x2.priority || 0) < priority);
      __classPrivateFieldGet3(this, _HttpAgent_queryPipeline, "f").splice(i >= 0 ? i : __classPrivateFieldGet3(this, _HttpAgent_queryPipeline, "f").length, 0, Object.assign(fn, { priority }));
    }
  }
  async getPrincipal() {
    if (!this._identity) {
      throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
    }
    return (await this._identity).getPrincipal();
  }
  async call(canisterId, options, identity) {
    const id = await (identity !== void 0 ? await identity : await this._identity);
    if (!id) {
      throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
    }
    const canister = Principal2.from(canisterId);
    const ecid = options.effectiveCanisterId ? Principal2.from(options.effectiveCanisterId) : canister;
    const sender = id.getPrincipal() || Principal2.anonymous();
    let ingress_expiry = new Expiry(DEFAULT_INGRESS_EXPIRY_DELTA_IN_MSECS);
    if (Math.abs(this._timeDiffMsecs) > 1e3 * 30) {
      ingress_expiry = new Expiry(DEFAULT_INGRESS_EXPIRY_DELTA_IN_MSECS + this._timeDiffMsecs);
    }
    const submit = {
      request_type: SubmitRequestType.Call,
      canister_id: canister,
      method_name: options.methodName,
      arg: options.arg,
      sender,
      ingress_expiry
    };
    let transformedRequest = await this._transform({
      request: {
        body: null,
        method: "POST",
        headers: Object.assign({ "Content-Type": "application/cbor" }, this._credentials ? { Authorization: "Basic " + btoa(this._credentials) } : {})
      },
      endpoint: "call",
      body: submit
    });
    transformedRequest = await id.transformRequest(transformedRequest);
    const body = encode3(transformedRequest.body);
    const request2 = this._requestAndRetry(() => this._fetch("" + new URL(`/api/v2/canister/${ecid.toText()}/call`, this._host), Object.assign(Object.assign(Object.assign({}, this._callOptions), transformedRequest.request), { body })));
    const [response, requestId] = await Promise.all([request2, requestIdOf(submit)]);
    const responseBuffer = await response.arrayBuffer();
    const responseBody = response.status === 200 && responseBuffer.byteLength > 0 ? decode3(responseBuffer) : null;
    return {
      requestId,
      response: {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        body: responseBody,
        headers: httpHeadersTransform(response.headers)
      }
    };
  }
  async _requestAndRetry(request2, tries = 0) {
    let response;
    try {
      response = await request2();
    } catch (error) {
      if (this._retryTimes > tries) {
        console.warn(`Caught exception while attempting to make request:
  ${error}
  Retrying request.`);
        return await this._requestAndRetry(request2, tries + 1);
      }
      throw error;
    }
    if (response.ok) {
      return response;
    }
    const responseText = await response.clone().text();
    const errorMessage = `Server returned an error:
  Code: ${response.status} (${response.statusText})
  Body: ${responseText}
`;
    if (this._retryTimes > tries) {
      console.warn(errorMessage + `  Retrying request.`);
      return await this._requestAndRetry(request2, tries + 1);
    }
    throw new AgentHTTPResponseError(errorMessage, {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: httpHeadersTransform(response.headers)
    });
  }
  async query(canisterId, fields, identity) {
    const makeQuery = async () => {
      const id = await (identity !== void 0 ? await identity : await this._identity);
      if (!id) {
        throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
      }
      const canister = Principal2.from(canisterId);
      const sender = (id === null || id === void 0 ? void 0 : id.getPrincipal()) || Principal2.anonymous();
      const request2 = {
        request_type: "query",
        canister_id: canister,
        method_name: fields.methodName,
        arg: fields.arg,
        sender,
        ingress_expiry: new Expiry(DEFAULT_INGRESS_EXPIRY_DELTA_IN_MSECS)
      };
      const requestId = await requestIdOf(request2);
      let transformedRequest = await this._transform({
        request: {
          method: "POST",
          headers: Object.assign({ "Content-Type": "application/cbor" }, this._credentials ? { Authorization: "Basic " + btoa(this._credentials) } : {})
        },
        endpoint: "read",
        body: request2
      });
      transformedRequest = await (id === null || id === void 0 ? void 0 : id.transformRequest(transformedRequest));
      const body = encode3(transformedRequest.body);
      const response = await this._requestAndRetry(() => this._fetch("" + new URL(`/api/v2/canister/${canister.toText()}/query`, this._host), Object.assign(Object.assign(Object.assign({}, this._fetchOptions), transformedRequest.request), { body })));
      const queryResponse = decode3(await response.arrayBuffer());
      return Object.assign(Object.assign({}, queryResponse), { httpDetails: {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        headers: httpHeadersTransform(response.headers)
      }, requestId });
    };
    const getSubnetStatus = async () => {
      if (!__classPrivateFieldGet3(this, _HttpAgent_verifyQuerySignatures, "f")) {
        return void 0;
      }
      const subnetStatus2 = __classPrivateFieldGet3(this, _HttpAgent_subnetKeys, "f").get(canisterId.toString());
      if (subnetStatus2) {
        return subnetStatus2;
      }
      await this.fetchSubnetKeys(canisterId.toString());
      return __classPrivateFieldGet3(this, _HttpAgent_subnetKeys, "f").get(canisterId.toString());
    };
    const [query, subnetStatus] = await Promise.all([makeQuery(), getSubnetStatus()]);
    if (!__classPrivateFieldGet3(this, _HttpAgent_verifyQuerySignatures, "f")) {
      return query;
    }
    try {
      return __classPrivateFieldGet3(this, _HttpAgent_verifyQueryResponse, "f").call(this, query, subnetStatus);
    } catch (_) {
      console.warn("Query response verification failed. Retrying with fresh subnet keys.");
      __classPrivateFieldGet3(this, _HttpAgent_subnetKeys, "f").delete(canisterId.toString());
      await this.fetchSubnetKeys(canisterId.toString());
      const updatedSubnetStatus = __classPrivateFieldGet3(this, _HttpAgent_subnetKeys, "f").get(canisterId.toString());
      if (!updatedSubnetStatus) {
        throw new CertificateVerificationError("Invalid signature from replica signed query: no matching node key found.");
      }
      return __classPrivateFieldGet3(this, _HttpAgent_verifyQueryResponse, "f").call(this, query, updatedSubnetStatus);
    }
  }
  async createReadStateRequest(fields, identity) {
    const id = await (identity !== void 0 ? await identity : await this._identity);
    if (!id) {
      throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
    }
    const sender = (id === null || id === void 0 ? void 0 : id.getPrincipal()) || Principal2.anonymous();
    const transformedRequest = await this._transform({
      request: {
        method: "POST",
        headers: Object.assign({ "Content-Type": "application/cbor" }, this._credentials ? { Authorization: "Basic " + btoa(this._credentials) } : {})
      },
      endpoint: "read_state",
      body: {
        request_type: "read_state",
        paths: fields.paths,
        sender,
        ingress_expiry: new Expiry(DEFAULT_INGRESS_EXPIRY_DELTA_IN_MSECS)
      }
    });
    return id === null || id === void 0 ? void 0 : id.transformRequest(transformedRequest);
  }
  async readState(canisterId, fields, identity, request2) {
    const canister = typeof canisterId === "string" ? Principal2.fromText(canisterId) : canisterId;
    const transformedRequest = request2 !== null && request2 !== void 0 ? request2 : await this.createReadStateRequest(fields, identity);
    const body = encode3(transformedRequest.body);
    const response = await this._requestAndRetry(() => this._fetch("" + new URL(`/api/v2/canister/${canister}/read_state`, this._host), Object.assign(Object.assign(Object.assign({}, this._fetchOptions), transformedRequest.request), { body })));
    if (!response.ok) {
      throw new Error(`Server returned an error:
  Code: ${response.status} (${response.statusText})
  Body: ${await response.text()}
`);
    }
    return decode3(await response.arrayBuffer());
  }
  /**
   * Allows agent to sync its time with the network. Can be called during intialization or mid-lifecycle if the device's clock has drifted away from the network time. This is necessary to set the Expiry for a request
   * @param {Principal} canisterId - Pass a canister ID if you need to sync the time with a particular replica. Uses the management canister by default
   */
  async syncTime(canisterId) {
    const CanisterStatus = await Promise.resolve().then(() => (init_canisterStatus(), canisterStatus_exports));
    const callTime = Date.now();
    try {
      if (!canisterId) {
        console.log("Syncing time with the IC. No canisterId provided, so falling back to ryjl3-tyaaa-aaaaa-aaaba-cai");
      }
      const status = await CanisterStatus.request({
        // Fall back with canisterId of the ICP Ledger
        canisterId: canisterId !== null && canisterId !== void 0 ? canisterId : Principal2.from("ryjl3-tyaaa-aaaaa-aaaba-cai"),
        agent: this,
        paths: ["time"]
      });
      const replicaTime = status.get("time");
      if (replicaTime) {
        this._timeDiffMsecs = Number(replicaTime) - Number(callTime);
      }
    } catch (error) {
      console.error("Caught exception while attempting to sync time:", error);
    }
  }
  async status() {
    const headers = this._credentials ? {
      Authorization: "Basic " + btoa(this._credentials)
    } : {};
    const response = await this._requestAndRetry(() => this._fetch("" + new URL(`/api/v2/status`, this._host), Object.assign({ headers }, this._fetchOptions)));
    return decode3(await response.arrayBuffer());
  }
  async fetchRootKey() {
    if (!this._rootKeyFetched) {
      this.rootKey = (await this.status()).root_key;
      this._rootKeyFetched = true;
    }
    return this.rootKey;
  }
  invalidateIdentity() {
    this._identity = null;
  }
  replaceIdentity(identity) {
    this._identity = Promise.resolve(identity);
  }
  async fetchSubnetKeys(canisterId) {
    const effectiveCanisterId = Principal2.from(canisterId);
    const response = await request({
      canisterId: effectiveCanisterId,
      paths: ["subnet"],
      agent: this
    });
    const subnetResponse = response.get("subnet");
    if (subnetResponse && typeof subnetResponse === "object" && "nodeKeys" in subnetResponse) {
      __classPrivateFieldGet3(this, _HttpAgent_subnetKeys, "f").set(effectiveCanisterId.toText(), subnetResponse);
      return subnetResponse;
    }
    return void 0;
  }
  _transform(request2) {
    let p = Promise.resolve(request2);
    if (request2.endpoint === "call") {
      for (const fn of __classPrivateFieldGet3(this, _HttpAgent_updatePipeline, "f")) {
        p = p.then((r) => fn(r).then((r2) => r2 || r));
      }
    } else {
      for (const fn of __classPrivateFieldGet3(this, _HttpAgent_queryPipeline, "f")) {
        p = p.then((r) => fn(r).then((r2) => r2 || r));
      }
    }
    return p;
  }
};
_HttpAgent_queryPipeline = /* @__PURE__ */ new WeakMap(), _HttpAgent_updatePipeline = /* @__PURE__ */ new WeakMap(), _HttpAgent_subnetKeys = /* @__PURE__ */ new WeakMap(), _HttpAgent_verifyQuerySignatures = /* @__PURE__ */ new WeakMap(), _HttpAgent_verifyQueryResponse = /* @__PURE__ */ new WeakMap();

// node_modules/@dfinity/agent/lib/esm/agent/proxy.js
init_esm();
var ProxyMessageKind;
(function(ProxyMessageKind2) {
  ProxyMessageKind2["Error"] = "err";
  ProxyMessageKind2["GetPrincipal"] = "gp";
  ProxyMessageKind2["GetPrincipalResponse"] = "gpr";
  ProxyMessageKind2["Query"] = "q";
  ProxyMessageKind2["QueryResponse"] = "qr";
  ProxyMessageKind2["Call"] = "c";
  ProxyMessageKind2["CallResponse"] = "cr";
  ProxyMessageKind2["ReadState"] = "rs";
  ProxyMessageKind2["ReadStateResponse"] = "rsr";
  ProxyMessageKind2["Status"] = "s";
  ProxyMessageKind2["StatusResponse"] = "sr";
})(ProxyMessageKind || (ProxyMessageKind = {}));

// node_modules/@dfinity/agent/lib/esm/agent/index.js
function getDefaultAgent() {
  const agent = typeof window === "undefined" ? typeof window === "undefined" ? typeof self === "undefined" ? void 0 : self.ic.agent : window.ic.agent : window.ic.agent;
  if (!agent) {
    throw new Error("No Agent could be found.");
  }
  return agent;
}

// node_modules/@dfinity/agent/lib/esm/actor.js
init_errors();
init_esm2();

// node_modules/@dfinity/agent/lib/esm/polling/index.js
init_certificate();
init_buffer2();

// node_modules/@dfinity/agent/lib/esm/polling/strategy.js
var strategy_exports = {};
__export(strategy_exports, {
  backoff: () => backoff,
  chain: () => chain,
  conditionalDelay: () => conditionalDelay,
  defaultStrategy: () => defaultStrategy,
  maxAttempts: () => maxAttempts,
  once: () => once,
  throttle: () => throttle,
  timeout: () => timeout
});
init_buffer2();
var FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function maxAttempts(count) {
  let attempts = count;
  return async (canisterId, requestId, status) => {
    if (--attempts <= 0) {
      throw new Error(`Failed to retrieve a reply for request after ${count} attempts:
  Request ID: ${toHex(requestId)}
  Request status: ${status}
`);
    }
  };
}
function throttle(throttleInMsec) {
  return () => new Promise((resolve) => setTimeout(resolve, throttleInMsec));
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw new Error(`Request timed out after ${timeInMsec} msec:
  Request ID: ${toHex(requestId)}
  Request status: ${status}
`);
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}

// node_modules/@dfinity/agent/lib/esm/polling/index.js
async function pollForResponse(agent, canisterId, requestId, strategy, request2, blsVerify2) {
  var _a2;
  const path = [new TextEncoder().encode("request_status"), requestId];
  const currentRequest = request2 !== null && request2 !== void 0 ? request2 : await ((_a2 = agent.createReadStateRequest) === null || _a2 === void 0 ? void 0 : _a2.call(agent, { paths: [path] }));
  const state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  if (agent.rootKey == null)
    throw new Error("Agent root key not initialized before polling");
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: blsVerify2
  });
  const maybeBuf = cert.lookup([...path, new TextEncoder().encode("status")]);
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return cert.lookup([...path, "reply"]);
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing:
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, strategy, currentRequest);
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(cert.lookup([...path, "reject_code"]))[0];
      const rejectMessage = new TextDecoder().decode(cert.lookup([...path, "reject_message"]));
      throw new Error(`Call was rejected:
  Request ID: ${toHex(requestId)}
  Reject code: ${rejectCode}
  Reject text: ${rejectMessage}
`);
    }
    case RequestStatusResponseStatus.Done:
      throw new Error(`Call was marked as done but we never saw the reply:
  Request ID: ${toHex(requestId)}
`);
  }
  throw new Error("unreachable");
}

// node_modules/@dfinity/agent/lib/esm/actor.js
init_esm();
init_buffer2();

// node_modules/@dfinity/agent/lib/esm/canisters/management_idl.js
var management_idl_default = ({ IDL }) => {
  const canister_id = IDL.Principal;
  const definite_canister_settings = IDL.Record({
    controllers: IDL.Vec(IDL.Principal),
    freezing_threshold: IDL.Nat,
    memory_allocation: IDL.Nat,
    compute_allocation: IDL.Nat
  });
  const canister_settings = IDL.Record({
    controllers: IDL.Opt(IDL.Vec(IDL.Principal)),
    freezing_threshold: IDL.Opt(IDL.Nat),
    memory_allocation: IDL.Opt(IDL.Nat),
    compute_allocation: IDL.Opt(IDL.Nat)
  });
  const wasm_module = IDL.Vec(IDL.Nat8);
  return IDL.Service({
    canister_status: IDL.Func([IDL.Record({ canister_id })], [
      IDL.Record({
        status: IDL.Variant({
          stopped: IDL.Null,
          stopping: IDL.Null,
          running: IDL.Null
        }),
        memory_size: IDL.Nat,
        cycles: IDL.Nat,
        settings: definite_canister_settings,
        module_hash: IDL.Opt(IDL.Vec(IDL.Nat8))
      })
    ], []),
    create_canister: IDL.Func([IDL.Record({ settings: IDL.Opt(canister_settings) })], [IDL.Record({ canister_id })], []),
    delete_canister: IDL.Func([IDL.Record({ canister_id })], [], []),
    deposit_cycles: IDL.Func([IDL.Record({ canister_id })], [], []),
    install_code: IDL.Func([
      IDL.Record({
        arg: IDL.Vec(IDL.Nat8),
        wasm_module,
        mode: IDL.Variant({
          reinstall: IDL.Null,
          upgrade: IDL.Null,
          install: IDL.Null
        }),
        canister_id
      })
    ], [], []),
    provisional_create_canister_with_cycles: IDL.Func([
      IDL.Record({
        settings: IDL.Opt(canister_settings),
        amount: IDL.Opt(IDL.Nat)
      })
    ], [IDL.Record({ canister_id })], []),
    provisional_top_up_canister: IDL.Func([IDL.Record({ canister_id, amount: IDL.Nat })], [], []),
    raw_rand: IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
    start_canister: IDL.Func([IDL.Record({ canister_id })], [], []),
    stop_canister: IDL.Func([IDL.Record({ canister_id })], [], []),
    uninstall_code: IDL.Func([IDL.Record({ canister_id })], [], []),
    update_settings: IDL.Func([
      IDL.Record({
        canister_id: IDL.Principal,
        settings: canister_settings
      })
    ], [], [])
  });
};

// node_modules/@dfinity/agent/lib/esm/actor.js
var ActorCallError = class extends AgentError {
  constructor(canisterId, methodName, type, props) {
    super([
      `Call failed:`,
      `  Canister: ${canisterId.toText()}`,
      `  Method: ${methodName} (${type})`,
      ...Object.getOwnPropertyNames(props).map((n) => `  "${n}": ${JSON.stringify(props[n])}`)
    ].join("\n"));
    this.canisterId = canisterId;
    this.methodName = methodName;
    this.type = type;
    this.props = props;
  }
};
var QueryCallRejectedError = class extends ActorCallError {
  constructor(canisterId, methodName, result) {
    var _a2;
    super(canisterId, methodName, "query", {
      Status: result.status,
      Code: (_a2 = ReplicaRejectCode[result.reject_code]) !== null && _a2 !== void 0 ? _a2 : `Unknown Code "${result.reject_code}"`,
      Message: result.reject_message
    });
    this.result = result;
  }
};
var UpdateCallRejectedError = class extends ActorCallError {
  constructor(canisterId, methodName, requestId, response) {
    super(canisterId, methodName, "update", Object.assign({ "Request ID": toHex(requestId) }, response.body ? Object.assign(Object.assign({}, response.body.error_code ? {
      "Error code": response.body.error_code
    } : {}), { "Reject code": String(response.body.reject_code), "Reject message": response.body.reject_message }) : {
      "HTTP status code": response.status.toString(),
      "HTTP status text": response.statusText
    }));
    this.requestId = requestId;
    this.response = response;
  }
};
var CanisterInstallMode;
(function(CanisterInstallMode2) {
  CanisterInstallMode2["Install"] = "install";
  CanisterInstallMode2["Reinstall"] = "reinstall";
  CanisterInstallMode2["Upgrade"] = "upgrade";
})(CanisterInstallMode || (CanisterInstallMode = {}));
var metadataSymbol = Symbol.for("ic-agent-metadata");
var Actor = class _Actor {
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal2.from(actor[metadataSymbol].config.canisterId);
  }
  static async install(fields, config) {
    const mode = fields.mode === void 0 ? CanisterInstallMode.Install : fields.mode;
    const arg = fields.arg ? [...new Uint8Array(fields.arg)] : [];
    const wasmModule = [...new Uint8Array(fields.module)];
    const canisterId = typeof config.canisterId === "string" ? Principal2.fromText(config.canisterId) : config.canisterId;
    await getManagementCanister(config).install_code({
      mode: { [mode]: null },
      arg,
      wasm_module: wasmModule,
      canister_id: canisterId
    });
  }
  static async createCanister(config) {
    const { canister_id: canisterId } = await getManagementCanister(config || {}).provisional_create_canister_with_cycles({ amount: [], settings: [] });
    return canisterId;
  }
  static async createAndInstallCanister(interfaceFactory, fields, config) {
    const canisterId = await this.createCanister(config);
    await this.install(Object.assign({}, fields), Object.assign(Object.assign({}, config), { canisterId }));
    return this.createActor(interfaceFactory, Object.assign(Object.assign({}, config), { canisterId }));
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL: idl_exports });
    class CanisterActor extends _Actor {
      constructor(config) {
        if (!config.canisterId)
          throw new AgentError(`Canister ID is required, but received ${typeof config.canisterId} instead. If you are using automatically generated declarations, this may be because your application is not setting the canister ID in process.env correctly.`);
        const canisterId = typeof config.canisterId === "string" ? Principal2.fromText(config.canisterId) : config.canisterId;
        super({
          config: Object.assign(Object.assign(Object.assign({}, DEFAULT_ACTOR_CONFIG), config), { canisterId }),
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options === null || options === void 0 ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw new AgentError(`Canister ID is required, but received ${typeof configuration.canisterId} instead. If you are using automatically generated declarations, this may be because your application is not setting the canister ID in process.env correctly.`);
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
};
function decodeReturnValue(types, msg) {
  const returnValues = idl_exports.decode(types, import_buffer12.Buffer.from(msg));
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
var DEFAULT_ACTOR_CONFIG = {
  pollingStrategyFactory: strategy_exports.defaultStrategy
};
var ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
function _createActorMethod(actor, methodName, func, blsVerify2) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a2, _b2;
      options = Object.assign(Object.assign({}, options), (_b2 = (_a2 = actor[metadataSymbol].config).queryTransform) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, methodName, args, Object.assign(Object.assign({}, actor[metadataSymbol].config), options)));
      const agent = options.agent || actor[metadataSymbol].config.agent || getDefaultAgent();
      const cid = Principal2.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = idl_exports.encode(func.argTypes, args);
      const result = await agent.query(cid, { methodName, arg });
      switch (result.status) {
        case "rejected":
          throw new QueryCallRejectedError(cid, methodName, result);
        case "replied":
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails: result.httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a2, _b2;
      options = Object.assign(Object.assign({}, options), (_b2 = (_a2 = actor[metadataSymbol].config).callTransform) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, methodName, args, Object.assign(Object.assign({}, actor[metadataSymbol].config), options)));
      const agent = options.agent || actor[metadataSymbol].config.agent || getDefaultAgent();
      const { canisterId, effectiveCanisterId, pollingStrategyFactory } = Object.assign(Object.assign(Object.assign({}, DEFAULT_ACTOR_CONFIG), actor[metadataSymbol].config), options);
      const cid = Principal2.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal2.from(effectiveCanisterId) : cid;
      const arg = idl_exports.encode(func.argTypes, args);
      const { requestId, response } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid
      });
      if (!response.ok || response.body) {
        throw new UpdateCallRejectedError(cid, methodName, requestId, response);
      }
      const pollStrategy = pollingStrategyFactory();
      const responseBytes = await pollForResponse(agent, ecid, requestId, pollStrategy, blsVerify2);
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      if (responseBytes !== void 0) {
        return shouldIncludeHttpDetails ? {
          httpDetails: response,
          result: decodeReturnValue(func.retTypes, responseBytes)
        } : decodeReturnValue(func.retTypes, responseBytes);
      } else if (func.retTypes.length === 0) {
        return shouldIncludeHttpDetails ? {
          httpDetails: response,
          result: void 0
        } : void 0;
      } else {
        throw new Error(`Call was returned undefined, but type [${func.retTypes.join(",")}].`);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
function getManagementCanister(config) {
  function transform(_methodName, args, _callConfig) {
    const first = args[0];
    let effectiveCanisterId = Principal2.fromHex("");
    if (first && typeof first === "object" && first.canister_id) {
      effectiveCanisterId = Principal2.from(first.canister_id);
    }
    return { effectiveCanisterId };
  }
  return Actor.createActor(management_idl_default, Object.assign(Object.assign(Object.assign({}, config), { canisterId: Principal2.fromHex("") }), {
    callTransform: transform,
    queryTransform: transform
  }));
}

// node_modules/@dfinity/agent/lib/esm/index.js
init_certificate();

// node_modules/@dfinity/agent/lib/esm/fetch_candid.js
init_esm();
init_canisterStatus();

// node_modules/@dfinity/agent/lib/esm/index.js
init_request_id();
init_bls2();
init_buffer2();
init_canisterStatus();
init_cbor();

// node_modules/@dfinity/identity/lib/esm/identity/ed25519.js
var __classPrivateFieldSet4 = function(receiver, state, value4, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value4) : f ? f.value = value4 : state.set(receiver, value4), value4;
};
var __classPrivateFieldGet4 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Ed25519PublicKey_rawKey2;
var _Ed25519PublicKey_derKey2;
var _Ed25519KeyIdentity_publicKey;
var _Ed25519KeyIdentity_privateKey;
function isObject(value4) {
  return value4 !== null && typeof value4 === "object";
}
var Ed25519PublicKey2 = class _Ed25519PublicKey {
  // `fromRaw` and `fromDer` should be used for instantiation, not this constructor.
  constructor(key) {
    _Ed25519PublicKey_rawKey2.set(this, void 0);
    _Ed25519PublicKey_derKey2.set(this, void 0);
    if (key.byteLength !== _Ed25519PublicKey.RAW_KEY_LENGTH) {
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    }
    __classPrivateFieldSet4(this, _Ed25519PublicKey_rawKey2, key, "f");
    __classPrivateFieldSet4(this, _Ed25519PublicKey_derKey2, _Ed25519PublicKey.derEncode(key), "f");
  }
  /**
   * Construct Ed25519PublicKey from an existing PublicKey
   * @param {unknown} maybeKey - existing PublicKey, ArrayBuffer, DerEncodedPublicKey, or hex string
   * @returns {Ed25519PublicKey} Instance of Ed25519PublicKey
   */
  static from(maybeKey) {
    if (typeof maybeKey === "string") {
      const key = fromHex(maybeKey);
      return this.fromRaw(key);
    } else if (isObject(maybeKey)) {
      const key = maybeKey;
      if (isObject(key) && Object.hasOwnProperty.call(key, "__derEncodedPublicKey__")) {
        return this.fromDer(key);
      } else if (ArrayBuffer.isView(key)) {
        const view = key;
        return this.fromRaw(bufFromBufLike2(view.buffer));
      } else if (key instanceof ArrayBuffer) {
        return this.fromRaw(key);
      } else if ("rawKey" in key) {
        return this.fromRaw(key.rawKey);
      } else if ("derKey" in key) {
        return this.fromDer(key.derKey);
      } else if ("toDer" in key) {
        return this.fromDer(key.toDer());
      }
    }
    throw new Error("Cannot construct Ed25519PublicKey from the provided key.");
  }
  static fromRaw(rawKey) {
    return new _Ed25519PublicKey(rawKey);
  }
  static fromDer(derKey) {
    return new _Ed25519PublicKey(this.derDecode(derKey));
  }
  static derEncode(publicKey) {
    const key = wrapDER(publicKey, ED25519_OID).buffer;
    key.__derEncodedPublicKey__ = void 0;
    return key;
  }
  static derDecode(key) {
    const unwrapped = unwrapDER(key, ED25519_OID);
    if (unwrapped.length !== this.RAW_KEY_LENGTH) {
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    }
    return unwrapped;
  }
  get rawKey() {
    return __classPrivateFieldGet4(this, _Ed25519PublicKey_rawKey2, "f");
  }
  get derKey() {
    return __classPrivateFieldGet4(this, _Ed25519PublicKey_derKey2, "f");
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
};
_Ed25519PublicKey_rawKey2 = /* @__PURE__ */ new WeakMap(), _Ed25519PublicKey_derKey2 = /* @__PURE__ */ new WeakMap();
Ed25519PublicKey2.RAW_KEY_LENGTH = 32;
var Ed25519KeyIdentity = class _Ed25519KeyIdentity extends SignIdentity {
  // `fromRaw` and `fromDer` should be used for instantiation, not this constructor.
  constructor(publicKey, privateKey) {
    super();
    _Ed25519KeyIdentity_publicKey.set(this, void 0);
    _Ed25519KeyIdentity_privateKey.set(this, void 0);
    __classPrivateFieldSet4(this, _Ed25519KeyIdentity_publicKey, Ed25519PublicKey2.from(publicKey), "f");
    __classPrivateFieldSet4(this, _Ed25519KeyIdentity_privateKey, new Uint8Array(privateKey), "f");
  }
  static generate(seed = new Uint8Array(32)) {
    if (seed && seed.length !== 32) {
      throw new Error("Ed25519 Seed needs to be 32 bytes long.");
    }
    if (!seed)
      seed = ed25519.utils.randomPrivateKey();
    const sk = new Uint8Array(32);
    for (let i = 0; i < 32; i++)
      sk[i] = new Uint8Array(seed)[i];
    const pk = ed25519.getPublicKey(sk);
    return _Ed25519KeyIdentity.fromKeyPair(pk, sk);
  }
  static fromParsedJson(obj) {
    const [publicKeyDer, privateKeyRaw] = obj;
    return new _Ed25519KeyIdentity(Ed25519PublicKey2.fromDer(fromHex(publicKeyDer)), fromHex(privateKeyRaw));
  }
  static fromJSON(json) {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      if (typeof parsed[0] === "string" && typeof parsed[1] === "string") {
        return this.fromParsedJson([parsed[0], parsed[1]]);
      } else {
        throw new Error("Deserialization error: JSON must have at least 2 items.");
      }
    }
    throw new Error(`Deserialization error: Invalid JSON type for string: ${JSON.stringify(json)}`);
  }
  static fromKeyPair(publicKey, privateKey) {
    return new _Ed25519KeyIdentity(Ed25519PublicKey2.fromRaw(publicKey), privateKey);
  }
  static fromSecretKey(secretKey) {
    const publicKey = ed25519.getPublicKey(new Uint8Array(secretKey));
    return _Ed25519KeyIdentity.fromKeyPair(publicKey, secretKey);
  }
  /**
   * Serialize this key to JSON.
   */
  toJSON() {
    return [toHex(__classPrivateFieldGet4(this, _Ed25519KeyIdentity_publicKey, "f").toDer()), toHex(__classPrivateFieldGet4(this, _Ed25519KeyIdentity_privateKey, "f"))];
  }
  /**
   * Return a copy of the key pair.
   */
  getKeyPair() {
    return {
      secretKey: __classPrivateFieldGet4(this, _Ed25519KeyIdentity_privateKey, "f"),
      publicKey: __classPrivateFieldGet4(this, _Ed25519KeyIdentity_publicKey, "f")
    };
  }
  /**
   * Return the public key.
   */
  getPublicKey() {
    return __classPrivateFieldGet4(this, _Ed25519KeyIdentity_publicKey, "f");
  }
  /**
   * Signs a blob of data, with this identity's private key.
   * @param challenge - challenge to sign with this identity's secretKey, producing a signature
   */
  async sign(challenge) {
    const blob = new Uint8Array(challenge);
    const signature = uint8ToBuf2(ed25519.sign(blob, __classPrivateFieldGet4(this, _Ed25519KeyIdentity_privateKey, "f").slice(0, 32)));
    Object.defineProperty(signature, "__signature__", {
      enumerable: false,
      value: void 0
    });
    return signature;
  }
  /**
   * Verify
   * @param sig - signature to verify
   * @param msg - message to verify
   * @param pk - public key
   * @returns - true if the signature is valid, false otherwise
   */
  static verify(sig, msg, pk) {
    const [signature, message, publicKey] = [sig, msg, pk].map((x2) => {
      if (typeof x2 === "string") {
        x2 = fromHex(x2);
      }
      if (x2 instanceof Uint8Array) {
        x2 = x2.buffer;
      }
      return new Uint8Array(x2);
    });
    return ed25519.verify(message, signature, publicKey);
  }
};
_Ed25519KeyIdentity_publicKey = /* @__PURE__ */ new WeakMap(), _Ed25519KeyIdentity_privateKey = /* @__PURE__ */ new WeakMap();

// node_modules/@dfinity/identity/lib/esm/identity/ecdsa.js
var CryptoError = class _CryptoError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, _CryptoError.prototype);
  }
};
function _getEffectiveCrypto(subtleCrypto) {
  if (typeof window !== "undefined" && window["crypto"] && window["crypto"]["subtle"]) {
    return window["crypto"]["subtle"];
  }
  if (subtleCrypto) {
    return subtleCrypto;
  } else if (typeof crypto !== "undefined" && crypto["subtle"]) {
    return crypto.subtle;
  } else {
    throw new CryptoError("Global crypto was not available and none was provided. Please inlcude a SubtleCrypto implementation. See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto");
  }
}
var ECDSAKeyIdentity = class _ECDSAKeyIdentity extends SignIdentity {
  // `fromKeyPair` and `generate` should be used for instantiation, not this constructor.
  constructor(keyPair, derKey, subtleCrypto) {
    super();
    this._keyPair = keyPair;
    this._derKey = derKey;
    this._subtleCrypto = subtleCrypto;
  }
  /**
   * Generates a randomly generated identity for use in calls to the Internet Computer.
   * @param {CryptoKeyOptions} options optional settings
   * @param {CryptoKeyOptions['extractable']} options.extractable - whether the key should allow itself to be used. Set to false for maximum security.
   * @param {CryptoKeyOptions['keyUsages']} options.keyUsages - a list of key usages that the key can be used for
   * @param {CryptoKeyOptions['subtleCrypto']} options.subtleCrypto interface
   * @constructs ECDSAKeyIdentity
   * @returns a {@link ECDSAKeyIdentity}
   */
  static async generate(options) {
    const { extractable = false, keyUsages = ["sign", "verify"], subtleCrypto } = options !== null && options !== void 0 ? options : {};
    const effectiveCrypto = _getEffectiveCrypto(subtleCrypto);
    const keyPair = await effectiveCrypto.generateKey({
      name: "ECDSA",
      namedCurve: "P-256"
    }, extractable, keyUsages);
    const derKey = await effectiveCrypto.exportKey("spki", keyPair.publicKey);
    return new this(keyPair, derKey, effectiveCrypto);
  }
  /**
   * generates an identity from a public and private key. Please ensure that you are generating these keys securely and protect the user's private key
   * @param keyPair a CryptoKeyPair
   * @param subtleCrypto - a SubtleCrypto interface in case one is not available globally
   * @returns an {@link ECDSAKeyIdentity}
   */
  static async fromKeyPair(keyPair, subtleCrypto) {
    const effectiveCrypto = _getEffectiveCrypto(subtleCrypto);
    const derKey = await effectiveCrypto.exportKey("spki", keyPair.publicKey);
    return new _ECDSAKeyIdentity(keyPair, derKey, effectiveCrypto);
  }
  /**
   * Return the internally-used key pair.
   * @returns a CryptoKeyPair
   */
  getKeyPair() {
    return this._keyPair;
  }
  /**
   * Return the public key.
   * @returns an {@link PublicKey & DerCryptoKey}
   */
  getPublicKey() {
    const derKey = this._derKey;
    const key = Object.create(this._keyPair.publicKey);
    key.toDer = function() {
      return derKey;
    };
    return key;
  }
  /**
   * Signs a blob of data, with this identity's private key.
   * @param {ArrayBuffer} challenge - challenge to sign with this identity's secretKey, producing a signature
   * @returns {Promise<Signature>} signature
   */
  async sign(challenge) {
    const params = {
      name: "ECDSA",
      hash: { name: "SHA-256" }
    };
    this._keyPair.privateKey;
    const signature = await this._subtleCrypto.sign(params, this._keyPair.privateKey, challenge);
    return signature;
  }
};

// node_modules/@dfinity/identity/lib/esm/identity/delegation.js
init_esm();
var cbor3 = __toESM(require_src2());

// node_modules/@dfinity/identity/lib/esm/identity/partial.js
init_esm();
var __classPrivateFieldSet5 = function(receiver, state, value4, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value4) : f ? f.value = value4 : state.set(receiver, value4), value4;
};
var __classPrivateFieldGet5 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PartialIdentity_inner;
var PartialIdentity = class {
  constructor(inner) {
    _PartialIdentity_inner.set(this, void 0);
    __classPrivateFieldSet5(this, _PartialIdentity_inner, inner, "f");
  }
  /**
   * The raw public key of this identity.
   */
  get rawKey() {
    return __classPrivateFieldGet5(this, _PartialIdentity_inner, "f").rawKey;
  }
  /**
   * The DER-encoded public key of this identity.
   */
  get derKey() {
    return __classPrivateFieldGet5(this, _PartialIdentity_inner, "f").derKey;
  }
  /**
   * The DER-encoded public key of this identity.
   */
  toDer() {
    return __classPrivateFieldGet5(this, _PartialIdentity_inner, "f").toDer();
  }
  /**
   * The inner {@link PublicKey} used by this identity.
   */
  getPublicKey() {
    return __classPrivateFieldGet5(this, _PartialIdentity_inner, "f");
  }
  /**
   * The {@link Principal} of this identity.
   */
  getPrincipal() {
    return Principal2.from(__classPrivateFieldGet5(this, _PartialIdentity_inner, "f").rawKey);
  }
  /**
   * Required for the Identity interface, but cannot implemented for just a public key.
   */
  transformRequest() {
    return Promise.reject("Not implemented. You are attempting to use a partial identity to sign calls, but this identity only has access to the public key.To sign calls, use a DelegationIdentity instead.");
  }
};
_PartialIdentity_inner = /* @__PURE__ */ new WeakMap();

// node_modules/@dfinity/identity/lib/esm/identity/delegation.js
var __classPrivateFieldSet6 = function(receiver, state, value4, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value4) : f ? f.value = value4 : state.set(receiver, value4), value4;
};
var __classPrivateFieldGet6 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __rest2 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var _PartialDelegationIdentity_delegation;
var domainSeparator2 = new TextEncoder().encode("ic-request-auth-delegation");
var requestDomainSeparator = new TextEncoder().encode("\nic-request");
function _parseBlob(value4) {
  if (typeof value4 !== "string" || value4.length < 64) {
    throw new Error("Invalid public key.");
  }
  return fromHex(value4);
}
var Delegation = class {
  constructor(pubkey, expiration, targets) {
    this.pubkey = pubkey;
    this.expiration = expiration;
    this.targets = targets;
  }
  toCBOR() {
    return cbor3.value.map(Object.assign({ pubkey: cbor3.value.bytes(this.pubkey), expiration: cbor3.value.u64(this.expiration.toString(16), 16) }, this.targets && {
      targets: cbor3.value.array(this.targets.map((t) => cbor3.value.bytes(t.toUint8Array())))
    }));
  }
  toJSON() {
    return Object.assign({ expiration: this.expiration.toString(16), pubkey: toHex(this.pubkey) }, this.targets && { targets: this.targets.map((p) => p.toHex()) });
  }
};
async function _createSingleDelegation(from, to, expiration, targets) {
  const delegation = new Delegation(
    to.toDer(),
    BigInt(+expiration) * BigInt(1e6),
    // In nanoseconds.
    targets
  );
  const challenge = new Uint8Array([
    ...domainSeparator2,
    ...new Uint8Array(requestIdOf(delegation))
  ]);
  const signature = await from.sign(challenge);
  return {
    delegation,
    signature
  };
}
var DelegationChain = class _DelegationChain {
  constructor(delegations, publicKey) {
    this.delegations = delegations;
    this.publicKey = publicKey;
  }
  /**
   * Create a delegation chain between two (or more) keys. By default, the expiration time
   * will be very short (15 minutes).
   *
   * To build a chain of more than 2 identities, this function needs to be called multiple times,
   * passing the previous delegation chain into the options argument. For example:
   * @example
   * const rootKey = createKey();
   * const middleKey = createKey();
   * const bottomeKey = createKey();
   *
   * const rootToMiddle = await DelegationChain.create(
   *   root, middle.getPublicKey(), Date.parse('2100-01-01'),
   * );
   * const middleToBottom = await DelegationChain.create(
   *   middle, bottom.getPublicKey(), Date.parse('2100-01-01'), { previous: rootToMiddle },
   * );
   *
   * // We can now use a delegation identity that uses the delegation above:
   * const identity = DelegationIdentity.fromDelegation(bottomKey, middleToBottom);
   * @param from The identity that will delegate.
   * @param to The identity that gets delegated. It can now sign messages as if it was the
   *           identity above.
   * @param expiration The length the delegation is valid. By default, 15 minutes from calling
   *                   this function.
   * @param options A set of options for this delegation. expiration and previous
   * @param options.previous - Another DelegationChain that this chain should start with.
   * @param options.targets - targets that scope the delegation (e.g. Canister Principals)
   */
  static async create(from, to, expiration = new Date(Date.now() + 15 * 60 * 1e3), options = {}) {
    var _a2, _b2;
    const delegation = await _createSingleDelegation(from, to, expiration, options.targets);
    return new _DelegationChain([...((_a2 = options.previous) === null || _a2 === void 0 ? void 0 : _a2.delegations) || [], delegation], ((_b2 = options.previous) === null || _b2 === void 0 ? void 0 : _b2.publicKey) || from.getPublicKey().toDer());
  }
  /**
   * Creates a DelegationChain object from a JSON string.
   * @param json The JSON string to parse.
   */
  static fromJSON(json) {
    const { publicKey, delegations } = typeof json === "string" ? JSON.parse(json) : json;
    if (!Array.isArray(delegations)) {
      throw new Error("Invalid delegations.");
    }
    const parsedDelegations = delegations.map((signedDelegation) => {
      const { delegation, signature } = signedDelegation;
      const { pubkey, expiration, targets } = delegation;
      if (targets !== void 0 && !Array.isArray(targets)) {
        throw new Error("Invalid targets.");
      }
      return {
        delegation: new Delegation(
          _parseBlob(pubkey),
          BigInt("0x" + expiration),
          // expiration in JSON is an hexa string (See toJSON() below).
          targets && targets.map((t) => {
            if (typeof t !== "string") {
              throw new Error("Invalid target.");
            }
            return Principal2.fromHex(t);
          })
        ),
        signature: _parseBlob(signature)
      };
    });
    return new this(parsedDelegations, _parseBlob(publicKey));
  }
  /**
   * Creates a DelegationChain object from a list of delegations and a DER-encoded public key.
   * @param delegations The list of delegations.
   * @param publicKey The DER-encoded public key of the key-pair signing the first delegation.
   */
  static fromDelegations(delegations, publicKey) {
    return new this(delegations, publicKey);
  }
  toJSON() {
    return {
      delegations: this.delegations.map((signedDelegation) => {
        const { delegation, signature } = signedDelegation;
        const { targets } = delegation;
        return {
          delegation: Object.assign({ expiration: delegation.expiration.toString(16), pubkey: toHex(delegation.pubkey) }, targets && {
            targets: targets.map((t) => t.toHex())
          }),
          signature: toHex(signature)
        };
      }),
      publicKey: toHex(this.publicKey)
    };
  }
};
var DelegationIdentity = class extends SignIdentity {
  constructor(_inner, _delegation) {
    super();
    this._inner = _inner;
    this._delegation = _delegation;
  }
  /**
   * Create a delegation without having access to delegateKey.
   * @param key The key used to sign the reqyests.
   * @param delegation A delegation object created using `createDelegation`.
   */
  static fromDelegation(key, delegation) {
    return new this(key, delegation);
  }
  getDelegation() {
    return this._delegation;
  }
  getPublicKey() {
    return {
      derKey: this._delegation.publicKey,
      toDer: () => this._delegation.publicKey
    };
  }
  sign(blob) {
    return this._inner.sign(blob);
  }
  async transformRequest(request2) {
    const { body } = request2, fields = __rest2(request2, ["body"]);
    const requestId = await requestIdOf(body);
    return Object.assign(Object.assign({}, fields), { body: {
      content: body,
      sender_sig: await this.sign(new Uint8Array([...requestDomainSeparator, ...new Uint8Array(requestId)])),
      sender_delegation: this._delegation.delegations,
      sender_pubkey: this._delegation.publicKey
    } });
  }
};
var PartialDelegationIdentity = class _PartialDelegationIdentity extends PartialIdentity {
  constructor(inner, delegation) {
    super(inner);
    _PartialDelegationIdentity_delegation.set(this, void 0);
    __classPrivateFieldSet6(this, _PartialDelegationIdentity_delegation, delegation, "f");
  }
  /**
   * The Delegation Chain of this identity.
   */
  get delegation() {
    return __classPrivateFieldGet6(this, _PartialDelegationIdentity_delegation, "f");
  }
  /**
   * Create a {@link PartialDelegationIdentity} from a {@link PublicKey} and a {@link DelegationChain}.
   * @param key The {@link PublicKey} to delegate to.
   * @param delegation a {@link DelegationChain} targeting the inner key.
   * @constructs PartialDelegationIdentity
   */
  static fromDelegation(key, delegation) {
    return new _PartialDelegationIdentity(key, delegation);
  }
};
_PartialDelegationIdentity_delegation = /* @__PURE__ */ new WeakMap();
function isDelegationValid(chain2, checks) {
  for (const { delegation } of chain2.delegations) {
    if (+new Date(Number(delegation.expiration / BigInt(1e6))) <= +Date.now()) {
      return false;
    }
  }
  const scopes = [];
  const maybeScope = checks === null || checks === void 0 ? void 0 : checks.scope;
  if (maybeScope) {
    if (Array.isArray(maybeScope)) {
      scopes.push(...maybeScope.map((s) => typeof s === "string" ? Principal2.fromText(s) : s));
    } else {
      scopes.push(typeof maybeScope === "string" ? Principal2.fromText(maybeScope) : maybeScope);
    }
  }
  for (const s of scopes) {
    const scope = s.toText();
    for (const { delegation } of chain2.delegations) {
      if (delegation.targets === void 0) {
        continue;
      }
      let none = true;
      for (const target of delegation.targets) {
        if (target.toText() === scope) {
          none = false;
          break;
        }
      }
      if (none) {
        return false;
      }
    }
  }
  return true;
}

// node_modules/@dfinity/identity/lib/esm/identity/webauthn.js
var import_borc3 = __toESM(require_src());
var PubKeyCoseAlgo;
(function(PubKeyCoseAlgo2) {
  PubKeyCoseAlgo2[PubKeyCoseAlgo2["ECDSA_WITH_SHA256"] = -7] = "ECDSA_WITH_SHA256";
})(PubKeyCoseAlgo || (PubKeyCoseAlgo = {}));

// dropscript.js
var import_token = __toESM(require_token(), 1);
var AccountIdentifier = __toESM(require_accountidentifier(), 1);

// node_modules/@infu/icblast/esm/browser.js
init_esm2();
init_esm();
init_esm();

// node_modules/yocto-queue/index.js
var Node = class {
  value;
  next;
  constructor(value4) {
    this.value = value4;
  }
};
var Queue = class {
  #head;
  #tail;
  #size;
  constructor() {
    this.clear();
  }
  enqueue(value4) {
    const node = new Node(value4);
    if (this.#head) {
      this.#tail.next = node;
      this.#tail = node;
    } else {
      this.#head = node;
      this.#tail = node;
    }
    this.#size++;
  }
  dequeue() {
    const current = this.#head;
    if (!current) {
      return;
    }
    this.#head = this.#head.next;
    this.#size--;
    return current.value;
  }
  clear() {
    this.#head = void 0;
    this.#tail = void 0;
    this.#size = 0;
  }
  get size() {
    return this.#size;
  }
  *[Symbol.iterator]() {
    let current = this.#head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
};

// node_modules/p-limit/async-hooks-stub.js
var AsyncResource = {
  bind(fn, _type, thisArg) {
    return fn.bind(thisArg);
  }
};

// node_modules/p-limit/index.js
function pLimit(concurrency) {
  if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  }
  const queue = new Queue();
  let activeCount = 0;
  const next = () => {
    activeCount--;
    if (queue.size > 0) {
      queue.dequeue()();
    }
  };
  const run = async (function_, resolve, arguments_) => {
    activeCount++;
    const result = (async () => function_(...arguments_))();
    resolve(result);
    try {
      await result;
    } catch {
    }
    next();
  };
  const enqueue = (function_, resolve, arguments_) => {
    queue.enqueue(
      AsyncResource.bind(run.bind(void 0, function_, resolve, arguments_))
    );
    (async () => {
      await Promise.resolve();
      if (activeCount < concurrency && queue.size > 0) {
        queue.dequeue()();
      }
    })();
  };
  const generator = (function_, ...arguments_) => new Promise((resolve) => {
    enqueue(function_, resolve, arguments_);
  });
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue.size
    },
    clearQueue: {
      value() {
        queue.clear();
      }
    }
  });
  return generator;
}

// node_modules/@infu/icblast/esm/browser.js
var import_get_random_values = __toESM(require_get_random_values(), 1);

// node_modules/@dfinity/auth-client/lib/esm/idleManager.js
var events = ["mousedown", "mousemove", "keydown", "touchstart", "wheel"];
var IdleManager = class {
  /**
   * @protected
   * @param options {@link IdleManagerOptions}
   */
  constructor(options = {}) {
    var _a2;
    this.callbacks = [];
    this.idleTimeout = 10 * 60 * 1e3;
    this.timeoutID = void 0;
    const { onIdle, idleTimeout = 10 * 60 * 1e3 } = options || {};
    this.callbacks = onIdle ? [onIdle] : [];
    this.idleTimeout = idleTimeout;
    const _resetTimer = this._resetTimer.bind(this);
    window.addEventListener("load", _resetTimer, true);
    events.forEach(function(name) {
      document.addEventListener(name, _resetTimer, true);
    });
    const debounce = (func, wait) => {
      let timeout2;
      return (...args) => {
        const context = this;
        const later = function() {
          timeout2 = void 0;
          func.apply(context, args);
        };
        clearTimeout(timeout2);
        timeout2 = window.setTimeout(later, wait);
      };
    };
    if (options === null || options === void 0 ? void 0 : options.captureScroll) {
      const scroll = debounce(_resetTimer, (_a2 = options === null || options === void 0 ? void 0 : options.scrollDebounce) !== null && _a2 !== void 0 ? _a2 : 100);
      window.addEventListener("scroll", scroll, true);
    }
    _resetTimer();
  }
  /**
   * Creates an {@link IdleManager}
   * @param {IdleManagerOptions} options Optional configuration
   * @see {@link IdleManagerOptions}
   * @param options.onIdle Callback once user has been idle. Use to prompt for fresh login, and use `Actor.agentOf(your_actor).invalidateIdentity()` to protect the user
   * @param options.idleTimeout timeout in ms
   * @param options.captureScroll capture scroll events
   * @param options.scrollDebounce scroll debounce time in ms
   */
  static create(options = {}) {
    return new this(options);
  }
  /**
   * @param {IdleCB} callback function to be called when user goes idle
   */
  registerCallback(callback) {
    this.callbacks.push(callback);
  }
  /**
   * Cleans up the idle manager and its listeners
   */
  exit() {
    clearTimeout(this.timeoutID);
    window.removeEventListener("load", this._resetTimer, true);
    const _resetTimer = this._resetTimer.bind(this);
    events.forEach(function(name) {
      document.removeEventListener(name, _resetTimer, true);
    });
    this.callbacks.forEach((cb) => cb());
  }
  /**
   * Resets the timeouts during cleanup
   */
  _resetTimer() {
    const exit = this.exit.bind(this);
    window.clearTimeout(this.timeoutID);
    this.timeoutID = window.setTimeout(exit, this.idleTimeout);
  }
};

// node_modules/idb/build/wrap-idb-value.js
var instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
var idbProxyableTypes;
var cursorAdvanceMethods;
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
var cursorRequestMap = /* @__PURE__ */ new WeakMap();
var transactionDoneMap = /* @__PURE__ */ new WeakMap();
var transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
var transformCache = /* @__PURE__ */ new WeakMap();
var reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request2) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request2.removeEventListener("success", success);
      request2.removeEventListener("error", error);
    };
    const success = () => {
      resolve(wrap(request2.result));
      unlisten();
    };
    const error = () => {
      reject(request2.error);
      unlisten();
    };
    request2.addEventListener("success", success);
    request2.addEventListener("error", error);
  });
  promise.then((value4) => {
    if (value4 instanceof IDBCursor) {
      cursorRequestMap.set(value4, request2);
    }
  }).catch(() => {
  });
  reverseTransformCache.set(promise, request2);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener("complete", complete);
      tx.removeEventListener("error", error);
      tx.removeEventListener("abort", error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError"));
      unlisten();
    };
    tx.addEventListener("complete", complete);
    tx.addEventListener("error", error);
    tx.addEventListener("abort", error);
  });
  transactionDoneMap.set(tx, done);
}
var idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      if (prop === "done")
        return transactionDoneMap.get(target);
      if (prop === "objectStoreNames") {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      }
      if (prop === "store") {
        return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    return wrap(target[prop]);
  },
  set(target, prop, value4) {
    target[prop] = value4;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
    return function(storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  }
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }
  return function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value4) {
  if (typeof value4 === "function")
    return wrapFunction(value4);
  if (value4 instanceof IDBTransaction)
    cacheDonePromiseForTransaction(value4);
  if (instanceOfAny(value4, getIdbProxyableTypes()))
    return new Proxy(value4, idbProxyTraps);
  return value4;
}
function wrap(value4) {
  if (value4 instanceof IDBRequest)
    return promisifyRequest(value4);
  if (transformCache.has(value4))
    return transformCache.get(value4);
  const newValue = transformCachableValue(value4);
  if (newValue !== value4) {
    transformCache.set(value4, newValue);
    reverseTransformCache.set(newValue, value4);
  }
  return newValue;
}
var unwrap = (value4) => reverseTransformCache.get(value4);

// node_modules/idb/build/index.js
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
  const request2 = indexedDB.open(name, version);
  const openPromise = wrap(request2);
  if (upgrade) {
    request2.addEventListener("upgradeneeded", (event) => {
      upgrade(wrap(request2.result), event.oldVersion, event.newVersion, wrap(request2.transaction), event);
    });
  }
  if (blocked) {
    request2.addEventListener("blocked", (event) => blocked(
      // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
      event.oldVersion,
      event.newVersion,
      event
    ));
  }
  openPromise.then((db) => {
    if (terminated)
      db.addEventListener("close", () => terminated());
    if (blocking) {
      db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {
  });
  return openPromise;
}
var readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
var writeMethods = ["put", "add", "delete", "clear"];
var cachedMethods = /* @__PURE__ */ new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
    return;
  }
  if (cachedMethods.get(prop))
    return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, "");
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
  ) {
    return;
  }
  const method2 = async function(storeName, ...args) {
    const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
    let target2 = tx.store;
    if (useIndex)
      target2 = target2.index(args.shift());
    return (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  cachedMethods.set(prop, method2);
  return method2;
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));

// node_modules/@dfinity/auth-client/lib/esm/db.js
var AUTH_DB_NAME = "auth-client-db";
var OBJECT_STORE_NAME = "ic-keyval";
var _openDbStore = async (dbName = AUTH_DB_NAME, storeName = OBJECT_STORE_NAME, version) => {
  if (isBrowser && (localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem(KEY_STORAGE_DELEGATION))) {
    localStorage.removeItem(KEY_STORAGE_DELEGATION);
    localStorage.removeItem(KEY_STORAGE_KEY);
  }
  return await openDB(dbName, version, {
    upgrade: (database) => {
      database.objectStoreNames;
      if (database.objectStoreNames.contains(storeName)) {
        database.clear(storeName);
      }
      database.createObjectStore(storeName);
    }
  });
};
async function _getValue(db, storeName, key) {
  return await db.get(storeName, key);
}
async function _setValue(db, storeName, key, value4) {
  return await db.put(storeName, value4, key);
}
async function _removeValue(db, storeName, key) {
  return await db.delete(storeName, key);
}
var IdbKeyVal = class _IdbKeyVal {
  // Do not use - instead prefer create
  constructor(_db, _storeName) {
    this._db = _db;
    this._storeName = _storeName;
  }
  /**
   * @param {DBCreateOptions} options - DBCreateOptions
   * @param {DBCreateOptions['dbName']} options.dbName name for the indexeddb database
   * @default
   * @param {DBCreateOptions['storeName']} options.storeName name for the indexeddb Data Store
   * @default
   * @param {DBCreateOptions['version']} options.version version of the database. Increment to safely upgrade
   * @constructs an {@link IdbKeyVal}
   */
  static async create(options) {
    const { dbName = AUTH_DB_NAME, storeName = OBJECT_STORE_NAME, version = 1 } = options !== null && options !== void 0 ? options : {};
    const db = await _openDbStore(dbName, storeName, version);
    return new _IdbKeyVal(db, storeName);
  }
  /**
   * Basic setter
   * @param {IDBValidKey} key string | number | Date | BufferSource | IDBValidKey[]
   * @param value value to set
   * @returns void
   */
  async set(key, value4) {
    return await _setValue(this._db, this._storeName, key, value4);
  }
  /**
   * Basic getter
   * Pass in a type T for type safety if you know the type the value will have if it is found
   * @param {IDBValidKey} key string | number | Date | BufferSource | IDBValidKey[]
   * @returns `Promise<T | null>`
   * @example
   * await get<string>('exampleKey') -> 'exampleValue'
   */
  async get(key) {
    var _a2;
    return (_a2 = await _getValue(this._db, this._storeName, key)) !== null && _a2 !== void 0 ? _a2 : null;
  }
  /**
   * Remove a key
   * @param key {@link IDBValidKey}
   * @returns void
   */
  async remove(key) {
    return await _removeValue(this._db, this._storeName, key);
  }
};

// node_modules/@dfinity/auth-client/lib/esm/storage.js
var KEY_STORAGE_KEY = "identity";
var KEY_STORAGE_DELEGATION = "delegation";
var KEY_VECTOR = "iv";
var DB_VERSION = 1;
var isBrowser = typeof window !== "undefined";
var LocalStorage = class {
  constructor(prefix = "ic-", _localStorage) {
    this.prefix = prefix;
    this._localStorage = _localStorage;
  }
  get(key) {
    return Promise.resolve(this._getLocalStorage().getItem(this.prefix + key));
  }
  set(key, value4) {
    this._getLocalStorage().setItem(this.prefix + key, value4);
    return Promise.resolve();
  }
  remove(key) {
    this._getLocalStorage().removeItem(this.prefix + key);
    return Promise.resolve();
  }
  _getLocalStorage() {
    if (this._localStorage) {
      return this._localStorage;
    }
    const ls = typeof window === "undefined" ? typeof window === "undefined" ? typeof self === "undefined" ? void 0 : self.localStorage : window.localStorage : window.localStorage;
    if (!ls) {
      throw new Error("Could not find local storage.");
    }
    return ls;
  }
};
var IdbStorage = class {
  get _db() {
    return new Promise((resolve) => {
      if (this.initializedDb) {
        resolve(this.initializedDb);
        return;
      }
      IdbKeyVal.create({ version: DB_VERSION }).then((db) => {
        this.initializedDb = db;
        resolve(db);
      });
    });
  }
  async get(key) {
    const db = await this._db;
    return await db.get(key);
  }
  async set(key, value4) {
    const db = await this._db;
    await db.set(key, value4);
  }
  async remove(key) {
    const db = await this._db;
    await db.remove(key);
  }
};

// node_modules/@dfinity/auth-client/lib/esm/index.js
var IDENTITY_PROVIDER_DEFAULT = "https://identity.ic0.app";
var IDENTITY_PROVIDER_ENDPOINT = "#authorize";
var ECDSA_KEY_LABEL = "ECDSA";
var ED25519_KEY_LABEL = "Ed25519";
var INTERRUPT_CHECK_INTERVAL = 500;
var ERROR_USER_INTERRUPT = "UserInterrupt";
var AuthClient = class {
  constructor(_identity, _key, _chain, _storage, idleManager, _createOptions, _idpWindow, _eventHandler) {
    this._identity = _identity;
    this._key = _key;
    this._chain = _chain;
    this._storage = _storage;
    this.idleManager = idleManager;
    this._createOptions = _createOptions;
    this._idpWindow = _idpWindow;
    this._eventHandler = _eventHandler;
    this._registerDefaultIdleCallback();
  }
  /**
   * Create an AuthClient to manage authentication and identity
   * @constructs
   * @param {AuthClientCreateOptions} options - Options for creating an {@link AuthClient}
   * @see {@link AuthClientCreateOptions}
   * @param options.identity Optional Identity to use as the base
   * @see {@link SignIdentity}
   * @param options.storage Storage mechanism for delegration credentials
   * @see {@link AuthClientStorage}
   * @param options.keyType Type of key to use for the base key
   * @param {IdleOptions} options.idleOptions Configures an {@link IdleManager}
   * @see {@link IdleOptions}
   * Default behavior is to clear stored identity and reload the page when a user goes idle, unless you set the disableDefaultIdleCallback flag or pass in a custom idle callback.
   * @example
   * const authClient = await AuthClient.create({
   *   idleOptions: {
   *     disableIdle: true
   *   }
   * })
   */
  static async create(options = {}) {
    var _a2, _b2, _c;
    const storage = (_a2 = options.storage) !== null && _a2 !== void 0 ? _a2 : new IdbStorage();
    const keyType = (_b2 = options.keyType) !== null && _b2 !== void 0 ? _b2 : ECDSA_KEY_LABEL;
    let key = null;
    if (options.identity) {
      key = options.identity;
    } else {
      let maybeIdentityStorage = await storage.get(KEY_STORAGE_KEY);
      if (!maybeIdentityStorage && isBrowser) {
        try {
          const fallbackLocalStorage = new LocalStorage();
          const localChain = await fallbackLocalStorage.get(KEY_STORAGE_DELEGATION);
          const localKey = await fallbackLocalStorage.get(KEY_STORAGE_KEY);
          if (localChain && localKey && keyType === ECDSA_KEY_LABEL) {
            console.log("Discovered an identity stored in localstorage. Migrating to IndexedDB");
            await storage.set(KEY_STORAGE_DELEGATION, localChain);
            await storage.set(KEY_STORAGE_KEY, localKey);
            maybeIdentityStorage = localChain;
            await fallbackLocalStorage.remove(KEY_STORAGE_DELEGATION);
            await fallbackLocalStorage.remove(KEY_STORAGE_KEY);
          }
        } catch (error) {
          console.error("error while attempting to recover localstorage: " + error);
        }
      }
      if (maybeIdentityStorage) {
        try {
          if (typeof maybeIdentityStorage === "object") {
            if (keyType === ED25519_KEY_LABEL && typeof maybeIdentityStorage === "string") {
              key = await Ed25519KeyIdentity.fromJSON(maybeIdentityStorage);
            } else {
              key = await ECDSAKeyIdentity.fromKeyPair(maybeIdentityStorage);
            }
          } else if (typeof maybeIdentityStorage === "string") {
            key = Ed25519KeyIdentity.fromJSON(maybeIdentityStorage);
          }
        } catch (e) {
        }
      }
    }
    let identity = new AnonymousIdentity();
    let chain2 = null;
    if (key) {
      try {
        const chainStorage = await storage.get(KEY_STORAGE_DELEGATION);
        if (typeof chainStorage === "object" && chainStorage !== null) {
          throw new Error("Delegation chain is incorrectly stored. A delegation chain should be stored as a string.");
        }
        if (options.identity) {
          identity = options.identity;
        } else if (chainStorage) {
          chain2 = DelegationChain.fromJSON(chainStorage);
          if (!isDelegationValid(chain2)) {
            await _deleteStorage(storage);
            key = null;
          } else {
            if ("toDer" in key) {
              identity = PartialDelegationIdentity.fromDelegation(key, chain2);
            } else {
              identity = DelegationIdentity.fromDelegation(key, chain2);
            }
          }
        }
      } catch (e) {
        console.error(e);
        await _deleteStorage(storage);
        key = null;
      }
    }
    let idleManager = void 0;
    if ((_c = options.idleOptions) === null || _c === void 0 ? void 0 : _c.disableIdle) {
      idleManager = void 0;
    } else if (chain2 || options.identity) {
      idleManager = IdleManager.create(options.idleOptions);
    }
    if (!key) {
      if (keyType === ED25519_KEY_LABEL) {
        key = await Ed25519KeyIdentity.generate();
        await storage.set(KEY_STORAGE_KEY, JSON.stringify(key.toJSON()));
      } else {
        if (options.storage && keyType === ECDSA_KEY_LABEL) {
          console.warn(`You are using a custom storage provider that may not support CryptoKey storage. If you are using a custom storage provider that does not support CryptoKey storage, you should use '${ED25519_KEY_LABEL}' as the key type, as it can serialize to a string`);
        }
        key = await ECDSAKeyIdentity.generate();
        await storage.set(KEY_STORAGE_KEY, key.getKeyPair());
      }
    }
    return new this(identity, key, chain2, storage, idleManager, options);
  }
  _registerDefaultIdleCallback() {
    var _a2, _b2;
    const idleOptions = (_a2 = this._createOptions) === null || _a2 === void 0 ? void 0 : _a2.idleOptions;
    if (!(idleOptions === null || idleOptions === void 0 ? void 0 : idleOptions.onIdle) && !(idleOptions === null || idleOptions === void 0 ? void 0 : idleOptions.disableDefaultIdleCallback)) {
      (_b2 = this.idleManager) === null || _b2 === void 0 ? void 0 : _b2.registerCallback(() => {
        this.logout();
        location.reload();
      });
    }
  }
  async _handleSuccess(message, onSuccess) {
    var _a2, _b2;
    const delegations = message.delegations.map((signedDelegation) => {
      return {
        delegation: new Delegation(signedDelegation.delegation.pubkey, signedDelegation.delegation.expiration, signedDelegation.delegation.targets),
        signature: signedDelegation.signature.buffer
      };
    });
    const delegationChain = DelegationChain.fromDelegations(delegations, message.userPublicKey.buffer);
    const key = this._key;
    if (!key) {
      return;
    }
    this._chain = delegationChain;
    if ("toDer" in key) {
      this._identity = PartialDelegationIdentity.fromDelegation(key, this._chain);
    } else {
      this._identity = DelegationIdentity.fromDelegation(key, this._chain);
    }
    (_a2 = this._idpWindow) === null || _a2 === void 0 ? void 0 : _a2.close();
    const idleOptions = (_b2 = this._createOptions) === null || _b2 === void 0 ? void 0 : _b2.idleOptions;
    if (!this.idleManager && !(idleOptions === null || idleOptions === void 0 ? void 0 : idleOptions.disableIdle)) {
      this.idleManager = IdleManager.create(idleOptions);
      this._registerDefaultIdleCallback();
    }
    this._removeEventListener();
    delete this._idpWindow;
    if (this._chain) {
      await this._storage.set(KEY_STORAGE_DELEGATION, JSON.stringify(this._chain.toJSON()));
    }
    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
  }
  getIdentity() {
    return this._identity;
  }
  async isAuthenticated() {
    return !this.getIdentity().getPrincipal().isAnonymous() && this._chain !== null;
  }
  /**
   * AuthClient Login -
   * Opens up a new window to authenticate with Internet Identity
   * @param {AuthClientLoginOptions} options - Options for logging in
   * @param options.identityProvider Identity provider
   * @param options.maxTimeToLive Expiration of the authentication in nanoseconds
   * @param options.derivationOrigin Origin for Identity Provider to use while generating the delegated identity
   * @param options.windowOpenerFeatures Configures the opened authentication window
   * @param options.onSuccess Callback once login has completed
   * @param options.onError Callback in case authentication fails
   * @example
   * const authClient = await AuthClient.create();
   * authClient.login({
   *  identityProvider: 'http://<canisterID>.127.0.0.1:8000',
   *  maxTimeToLive: BigInt (7) * BigInt(24) * BigInt(3_600_000_000_000), // 1 week
   *  windowOpenerFeatures: "toolbar=0,location=0,menubar=0,width=500,height=500,left=100,top=100",
   *  onSuccess: () => {
   *    console.log('Login Successful!');
   *  },
   *  onError: (error) => {
   *    console.error('Login Failed: ', error);
   *  }
   * });
   */
  async login(options) {
    var _a2, _b2, _c, _d;
    const defaultTimeToLive = (
      /* hours */
      BigInt(8) * /* nanoseconds */
      BigInt(36e11)
    );
    const identityProviderUrl = new URL(((_a2 = options === null || options === void 0 ? void 0 : options.identityProvider) === null || _a2 === void 0 ? void 0 : _a2.toString()) || IDENTITY_PROVIDER_DEFAULT);
    identityProviderUrl.hash = IDENTITY_PROVIDER_ENDPOINT;
    (_b2 = this._idpWindow) === null || _b2 === void 0 ? void 0 : _b2.close();
    this._removeEventListener();
    this._eventHandler = this._getEventHandler(identityProviderUrl, Object.assign({ maxTimeToLive: (_c = options === null || options === void 0 ? void 0 : options.maxTimeToLive) !== null && _c !== void 0 ? _c : defaultTimeToLive }, options));
    window.addEventListener("message", this._eventHandler);
    this._idpWindow = (_d = window.open(identityProviderUrl.toString(), "idpWindow", options === null || options === void 0 ? void 0 : options.windowOpenerFeatures)) !== null && _d !== void 0 ? _d : void 0;
    const checkInterruption = () => {
      if (this._idpWindow) {
        if (this._idpWindow.closed) {
          this._handleFailure(ERROR_USER_INTERRUPT, options === null || options === void 0 ? void 0 : options.onError);
        } else {
          setTimeout(checkInterruption, INTERRUPT_CHECK_INTERVAL);
        }
      }
    };
    checkInterruption();
  }
  _getEventHandler(identityProviderUrl, options) {
    return async (event) => {
      var _a2, _b2, _c;
      if (event.origin !== identityProviderUrl.origin) {
        console.warn(`WARNING: expected origin '${identityProviderUrl.origin}', got '${event.origin}' (ignoring)`);
        return;
      }
      const message = event.data;
      switch (message.kind) {
        case "authorize-ready": {
          const request2 = {
            kind: "authorize-client",
            sessionPublicKey: new Uint8Array((_a2 = this._key) === null || _a2 === void 0 ? void 0 : _a2.getPublicKey().toDer()),
            maxTimeToLive: options === null || options === void 0 ? void 0 : options.maxTimeToLive,
            derivationOrigin: (_b2 = options === null || options === void 0 ? void 0 : options.derivationOrigin) === null || _b2 === void 0 ? void 0 : _b2.toString()
          };
          (_c = this._idpWindow) === null || _c === void 0 ? void 0 : _c.postMessage(request2, identityProviderUrl.origin);
          break;
        }
        case "authorize-client-success":
          try {
            await this._handleSuccess(message, options === null || options === void 0 ? void 0 : options.onSuccess);
          } catch (err) {
            this._handleFailure(err.message, options === null || options === void 0 ? void 0 : options.onError);
          }
          break;
        case "authorize-client-failure":
          this._handleFailure(message.text, options === null || options === void 0 ? void 0 : options.onError);
          break;
        default:
          break;
      }
    };
  }
  _handleFailure(errorMessage, onError) {
    var _a2;
    (_a2 = this._idpWindow) === null || _a2 === void 0 ? void 0 : _a2.close();
    onError === null || onError === void 0 ? void 0 : onError(errorMessage);
    this._removeEventListener();
    delete this._idpWindow;
  }
  _removeEventListener() {
    if (this._eventHandler) {
      window.removeEventListener("message", this._eventHandler);
    }
    this._eventHandler = void 0;
  }
  async logout(options = {}) {
    await _deleteStorage(this._storage);
    this._identity = new AnonymousIdentity();
    this._chain = null;
    if (options.returnTo) {
      try {
        window.history.pushState({}, "", options.returnTo);
      } catch (e) {
        window.location.href = options.returnTo;
      }
    }
  }
};
async function _deleteStorage(storage) {
  await storage.remove(KEY_STORAGE_KEY);
  await storage.remove(KEY_STORAGE_DELEGATION);
  await storage.remove(KEY_VECTOR);
}

// node_modules/@infu/icblast/esm/browser.js
var import_js_sha256 = __toESM(require_sha2562(), 1);
var Wt = Object.defineProperty;
var Ut = (e, t) => {
  for (var n in t)
    Wt(e, n, { get: t[n], enumerable: true });
};
var Oe = ({ IDL: e }) => e.Service({ __get_candid_interface_tmp_hack: e.Func([], [e.Text], ["query"]) });
var Ee = (e, t, n = false) => {
  let o = new HttpAgent({ ...t?.agentOptions });
  return n && o.fetchRootKey().catch((a) => {
    console.warn("Unable to fetch root key. Check to ensure that your local replica is running"), console.error(a);
  }), Actor.createActor(Oe, { agent: o, canisterId: e.toText ? e.toText() : e, ...t?.actorOptions });
};
var Be = {};
Ut(Be, { convert: () => se, convertBack: () => we, explainer: () => ce, initArg: () => Xt, toState: () => ae, wrapActor: () => he, xBase: () => m, xBigInt: () => v, xBool: () => re, xFloat: () => ne, xInt: () => ee, xInt16: () => Y, xInt32: () => Z, xInt64: () => D, xInt8: () => X, xNat: () => L, xNat16: () => J, xNat32: () => Q, xNat64: () => I, xNat8: () => M, xNull: () => z, xOpt: () => x, xPrincipal: () => $, xRec: () => oe, xRecord: () => A, xText: () => j, xTime: () => te, xTuple: () => q, xVariant: () => b, xVec: () => S });
var m = class {
  constructor(t) {
    this.val = t;
  }
  static fromState(t) {
    return t;
  }
};
var v = class {
  constructor(t) {
    this.val = t;
  }
  static fromState(t) {
    return typeof t == "string" ? BigInt(t) : t;
  }
};
var j = class extends m {
  constructor(t) {
    super(t);
  }
};
var S = class extends m {
  constructor(t) {
    super(t);
  }
  fromState(t) {
    return this.val === M && typeof t == "string" && $t(t) ? Jt(t) : t;
  }
};
var x = class extends m {
  constructor(t) {
    super(t);
  }
};
var b = class extends m {
  constructor(t) {
    super(t);
  }
};
var z = class extends m {
  constructor(t) {
    super(t);
  }
};
var $ = class extends m {
  constructor(t) {
    super(t);
  }
  static fromState(t) {
    return typeof t == "string" ? Principal2.from(t) : t;
  }
};
var M = class extends m {
  constructor(t) {
    super(t);
  }
};
var J = class extends m {
  constructor(t) {
    super(t);
  }
};
var Q = class extends m {
  constructor(t) {
    super(t);
  }
};
var X = class extends m {
  constructor(t) {
    super(t);
  }
};
var Y = class extends m {
  constructor(t) {
    super(t);
  }
};
var Z = class extends m {
  constructor(t) {
    super(t);
  }
};
var I = class extends v {
  constructor(t) {
    super(t);
  }
};
var D = class extends v {
  constructor(t) {
    super(t);
  }
};
var L = class extends v {
  constructor(t) {
    super(t);
  }
};
var ee = class extends v {
  constructor(t) {
    super(t);
  }
};
var te = class extends v {
  constructor(t) {
    super(t);
  }
};
var ne = class extends m {
  constructor(t) {
    super(t);
  }
};
var re = class extends m {
  constructor(t) {
    super(t);
  }
};
var A = class extends m {
  constructor(t) {
    super(t);
  }
};
var q = class extends m {
  constructor(t) {
    super(t);
  }
};
var oe = class extends m {
  constructor(t) {
    super(t);
  }
  fill(t) {
    Object.setPrototypeOf(this, t.constructor.prototype), Object.assign(this, t);
  }
};
var ge = class {
  Text = j;
  Null = z;
  Principal = $;
  Nat8 = M;
  Nat16 = J;
  Nat32 = Q;
  Nat64 = I;
  Nat = L;
  Int8 = X;
  Int16 = Y;
  Int32 = Z;
  Int64 = D;
  Int = ee;
  Float64 = ne;
  Bool = re;
  Time = te;
  Service(t) {
    return t;
  }
  Func(t, n, o) {
    return { input: t, output: n };
  }
  Record(t) {
    return new A(t);
  }
  Tuple(...t) {
    return new q(t);
  }
  Rec() {
    return new oe();
  }
  Vec(t) {
    return new S(t);
  }
  Variant(t) {
    return new b(t);
  }
  Opt(t) {
    return new x(t);
  }
};
var Gt = new ge();
var ce = (e) => e({ IDL: Gt });
function se(e, t) {
  function n(a, r, c) {
    try {
      if (c instanceof x)
        return r === void 0 ? [] : r === null ? [] : [n("(opt)", r, c.val)];
      if (c instanceof S) {
        if (r = c.fromState(r), ArrayBuffer.isView(r) || r instanceof ArrayBuffer)
          return r;
        if (!Array.isArray(r))
          throw "(array expected)";
        return r.map((i, s) => n(s, i, c.val));
      } else if (c instanceof q) {
        if (!Array.isArray(r))
          throw "(array expected)";
        return r.map((i, s) => n(s, i, c.val[s]));
      } else if (c instanceof b) {
        let i = Object.keys(r)[0];
        return { [i]: n(i, r[i], c.val[i]) };
      } else if (c instanceof A) {
        let i = {};
        for (let s in c.val) {
          let l = c.val[s] instanceof x;
          if (r.hasOwnProperty(s))
            i[s] = n(s, r[s], c.val[s]);
          else if (l)
            i[s] = [];
          else
            throw `${s} (missing)`;
        }
        return i;
      } else
        return c.fromState(r);
    } catch (i) {
      throw a + "." + i;
    }
  }
  return e.map((a, r) => n("arg" + r, a, t[r]));
}
function we(e, t) {
  function n(a, r, c) {
    try {
      if (c instanceof x)
        return r === null ? null : r.length === 0 ? void 0 : n("(opt)", r[0], c.val);
      if (c instanceof S) {
        if (ArrayBuffer.isView(r) || r instanceof ArrayBuffer)
          return r;
        if (!Array.isArray(r))
          throw "(array expected)";
        return r.map((i, s) => n(s, i, c.val));
      } else if (c instanceof q) {
        if (!Array.isArray(r))
          throw "(array expected)";
        return r.map((i, s) => n(s, i, c.val[s]));
      } else if (c instanceof b) {
        let i = Object.keys(r)[0];
        return { [i]: n(i, r[i], c.val[i]) };
      } else if (c instanceof A) {
        let i = {};
        for (let s in c.val) {
          let l = c.val[s] instanceof x;
          if (r.hasOwnProperty(s)) {
            let u = n(s, r[s], c.val[s]);
            u !== null && (i[s] = u);
          } else if (!l)
            throw `${s} (missing)`;
        }
        return i;
      } else
        return r;
    } catch (i) {
      throw a + "." + i;
    }
  }
  let o = n("ret", e, t !== null ? t[0] : true);
  if (t[0] && t[0] instanceof b && "Ok" in t[0].val && "Err" in t[0].val && Object.keys(t[0].val).length == 2) {
    if ("Ok" in o)
      return o.Ok;
    throw o.Err;
  }
  return o;
}
var jt = (e, t, n) => async (...o) => {
  let a = se(o, n[t].input), r = await e(...a);
  return we(r, n[t].output);
};
var he = (e, t) => {
  let n = ce(t), o = {};
  for (let a in e)
    typeof e[a] == "function" ? o[a] = jt(e[a], a, n) : o[a] = e[a];
  return zt(o, t, n), o;
};
var zt = (e, t, n) => {
  let o = t({ IDL: idl_exports });
  for (let [a, r] of o._fields)
    e[a + "$"] = (...c) => [...idl_exports.encode(r.argTypes, se(c, n[a].input))], e["$" + a] = (c) => we(idl_exports.decode(r.retTypes, Buffer.from(c))[0], n[a].output);
};
var ae = (e) => e == null ? e : typeof e == "bigint" ? e.toString() : e instanceof Uint8Array ? Qt(e) : e instanceof Uint16Array || e instanceof Int16Array || e instanceof Uint32Array || e instanceof Int32Array ? Array.from(e) : e instanceof BigInt64Array ? Array.from(e, (t) => t.toString()) : e instanceof BigUint64Array ? Array.from(e, (t) => t.toString()) : ArrayBuffer.isView(e) || e instanceof ArrayBuffer ? [...e] : Array.isArray(e) ? e.map((t) => ae(t)) : typeof e == "object" ? e instanceof Principal2 || e.constructor?.name === "Principal" ? e.toText() : Object.fromEntries(Object.keys(e).map((t) => [t, ae(e[t])])) : e;
function $t(e) {
  return /^[0-9a-fA-F]+$/.test(e);
}
function Jt(e) {
  if (e.length % 2 !== 0)
    throw new Error("Invalid hex string length.");
  let t = e.length / 2, n = new Uint8Array(t);
  for (let o = 0; o < t; o++) {
    let a = parseInt(e.slice(o * 2, o * 2 + 2), 16);
    n[o] = a;
  }
  return n;
}
function Qt(e) {
  let t = "";
  for (let n = 0; n < e.length; n++) {
    let a = e[n].toString(16).padStart(2, "0");
    t += a;
  }
  return t;
}
function Xt(e, t) {
  let n = ce(e);
  if (!Array.isArray(t))
    throw new Error("args is not array");
  let o = se(t, n), a = e({ IDL: idl_exports });
  return idl_exports.encode(a, o);
}
var We = ({ IDL: e }) => {
  let t = e.Variant({ mainnet: e.Null, testnet: e.Null }), n = e.Text, o = e.Record({ network: t, address: n, min_confirmations: e.Opt(e.Nat32) }), a = e.Nat64, r = e.Record({ network: t }), c = e.Nat64, i = e.Record({ network: t, filter: e.Opt(e.Variant({ page: e.Vec(e.Nat8), min_confirmations: e.Nat32 })), address: n }), s = e.Vec(e.Nat8), l = e.Record({ txid: e.Vec(e.Nat8), vout: e.Nat32 }), u = e.Record({ height: e.Nat32, value: a, outpoint: l }), N = e.Record({ next_page: e.Opt(e.Vec(e.Nat8)), tip_height: e.Nat32, tip_block_hash: s, utxos: e.Vec(u) }), p = e.Record({ transaction: e.Vec(e.Nat8), network: t }), d = e.Principal, f = e.Record({ freezing_threshold: e.Nat, controllers: e.Vec(e.Principal), memory_allocation: e.Nat, compute_allocation: e.Nat }), _ = e.Record({ freezing_threshold: e.Opt(e.Nat), controllers: e.Opt(e.Vec(e.Principal)), memory_allocation: e.Opt(e.Nat), compute_allocation: e.Opt(e.Nat) }), y = e.Variant({ secp256k1: e.Null }), O = e.Record({ value: e.Text, name: e.Text }), R = e.Record({ status: e.Nat, body: e.Vec(e.Nat8), headers: e.Vec(O) }), h = e.Vec(e.Nat8), g = e.Variant({ bls12_381: e.Null });
  return e.Service({ bitcoin_get_balance: e.Func([o], [a], []), bitcoin_get_current_fee_percentiles: e.Func([r], [e.Vec(c)], []), bitcoin_get_utxos: e.Func([i], [N], []), bitcoin_send_transaction: e.Func([p], [], []), canister_status: e.Func([e.Record({ canister_id: d })], [e.Record({ status: e.Variant({ stopped: e.Null, stopping: e.Null, running: e.Null }), memory_size: e.Nat, cycles: e.Nat, settings: f, idle_cycles_burned_per_day: e.Nat, module_hash: e.Opt(e.Vec(e.Nat8)) })], []), create_canister: e.Func([e.Record({ settings: e.Opt(_) })], [e.Record({ canister_id: d })], []), delete_canister: e.Func([e.Record({ canister_id: d })], [], []), deposit_cycles: e.Func([e.Record({ canister_id: d })], [], []), ecdsa_public_key: e.Func([e.Record({ key_id: e.Record({ name: e.Text, curve: y }), canister_id: e.Opt(d), derivation_path: e.Vec(e.Vec(e.Nat8)) })], [e.Record({ public_key: e.Vec(e.Nat8), chain_code: e.Vec(e.Nat8) })], []), http_request: e.Func([e.Record({ url: e.Text, method: e.Variant({ get: e.Null, head: e.Null, post: e.Null }), max_response_bytes: e.Opt(e.Nat64), body: e.Opt(e.Vec(e.Nat8)), transform: e.Opt(e.Record({ function: e.Func([e.Record({ context: e.Vec(e.Nat8), response: R })], [R], ["query"]), context: e.Vec(e.Nat8) })), headers: e.Vec(O) })], [R], []), install_code: e.Func([e.Record({ arg: e.Vec(e.Nat8), wasm_module: h, mode: e.Variant({ reinstall: e.Null, upgrade: e.Null, install: e.Null }), canister_id: d })], [], []), provisional_create_canister_with_cycles: e.Func([e.Record({ settings: e.Opt(_), specified_id: e.Opt(d), amount: e.Opt(e.Nat) })], [e.Record({ canister_id: d })], []), provisional_top_up_canister: e.Func([e.Record({ canister_id: d, amount: e.Nat })], [], []), raw_rand: e.Func([], [e.Vec(e.Nat8)], []), sign_with_ecdsa: e.Func([e.Record({ key_id: e.Record({ name: e.Text, curve: y }), derivation_path: e.Vec(e.Vec(e.Nat8)), message_hash: e.Vec(e.Nat8) })], [e.Record({ signature: e.Vec(e.Nat8) })], []), start_canister: e.Func([e.Record({ canister_id: d })], [], []), stop_canister: e.Func([e.Record({ canister_id: d })], [], []), uninstall_code: e.Func([e.Record({ canister_id: d })], [], []), update_settings: e.Func([e.Record({ canister_id: e.Principal, settings: _ })], [], []), vetkd_encrypted_key: e.Func([e.Record({ key_id: e.Record({ name: e.Text, curve: g }), derivation_id: e.Vec(e.Nat8), encryption_public_key: e.Vec(e.Nat8), public_key_derivation_path: e.Vec(e.Vec(e.Nat8)) })], [e.Record({ encrypted_key: e.Vec(e.Nat8) })], []), vetkd_public_key: e.Func([e.Record({ key_id: e.Record({ name: e.Text, curve: g }), canister_id: e.Opt(d), derivation_path: e.Vec(e.Vec(e.Nat8)) })], [e.Record({ public_key: e.Vec(e.Nat8) })], []) });
};
var Ue = ({ IDL: e }) => {
  let t = e.Variant({ User: e.Null, Canister: e.Null, Unknown: e.Null }), n = e.Variant({ Custodian: e.Null, Contact: e.Null, Controller: e.Null }), o = e.Record({ id: e.Principal, kind: t, name: e.Opt(e.Text), role: n }), a = e.Variant({ Ok: e.Null, Err: e.Text }), r = e.Variant({ CyclesReceived: e.Record({ from: e.Principal, amount: e.Nat64 }), CanisterCreated: e.Record({ cycles: e.Nat64, canister: e.Principal }), CanisterCalled: e.Record({ cycles: e.Nat64, method_name: e.Text, canister: e.Principal }), CyclesSent: e.Record({ to: e.Principal, amount: e.Nat64, refund: e.Nat64 }), AddressRemoved: e.Record({ id: e.Principal }), WalletDeployed: e.Record({ canister: e.Principal }), AddressAdded: e.Record({ id: e.Principal, name: e.Opt(e.Text), role: n }) }), c = e.Record({ id: e.Nat32, kind: r, timestamp: e.Nat64 }), i = e.Tuple(e.Text, e.Text), s = e.Record({ url: e.Text, method: e.Text, body: e.Vec(e.Nat8), headers: e.Vec(i) }), l = e.Record({}), u = e.Record({ token: e.Opt(l), body: e.Vec(e.Nat8) }), N = e.Variant({ Callback: e.Record({ token: l, callback: e.Func([l], [u], ["query"]) }) }), p = e.Record({ body: e.Vec(e.Nat8), headers: e.Vec(i), streaming_strategy: e.Opt(N), status_code: e.Nat16 }), d = e.Variant({ Ok: e.Record({ return: e.Vec(e.Nat8) }), Err: e.Text }), f = e.Record({ controller: e.Opt(e.Principal), freezing_threshold: e.Opt(e.Nat), memory_allocation: e.Opt(e.Nat), compute_allocation: e.Opt(e.Nat) }), _ = e.Record({ cycles: e.Nat64, settings: f }), y = e.Variant({ Ok: e.Record({ canister_id: e.Principal }), Err: e.Text });
  return e.Service({ add_address: e.Func([o], [], []), add_controller: e.Func([e.Principal], [], []), authorize: e.Func([e.Principal], [], []), deauthorize: e.Func([e.Principal], [a], []), get_chart: e.Func([e.Opt(e.Record({ count: e.Opt(e.Nat32), precision: e.Opt(e.Nat64) }))], [e.Vec(e.Tuple(e.Nat64, e.Nat64))], ["query"]), get_controllers: e.Func([], [e.Vec(e.Principal)], ["query"]), get_custodians: e.Func([], [e.Vec(e.Principal)], ["query"]), get_events: e.Func([e.Opt(e.Record({ to: e.Opt(e.Nat32), from: e.Opt(e.Nat32) }))], [e.Vec(c)], ["query"]), http_request: e.Func([s], [p], ["query"]), list_addresses: e.Func([], [e.Vec(o)], ["query"]), name: e.Func([], [e.Opt(e.Text)], ["query"]), remove_address: e.Func([e.Principal], [a], []), remove_controller: e.Func([e.Principal], [a], []), set_name: e.Func([e.Text], [], []), wallet_balance: e.Func([], [e.Record({ amount: e.Nat64 })], ["query"]), wallet_call: e.Func([e.Record({ args: e.Vec(e.Nat8), cycles: e.Nat64, method_name: e.Text, canister: e.Principal })], [d], []), wallet_create_canister: e.Func([_], [y], []), wallet_create_wallet: e.Func([_], [y], []), wallet_receive: e.Func([], [], []), wallet_send: e.Func([e.Record({ canister: e.Principal, amount: e.Nat64 })], [a], []), wallet_store_wallet_wasm: e.Func([e.Record({ wasm_module: e.Vec(e.Nat8) })], [], []) });
};
var He = ({ IDL: e }) => e.Service({ binding: e.Func([e.Text, e.Text], [e.Opt(e.Text)], ["query"]), did_to_js: e.Func([e.Text], [e.Opt(e.Text)], ["query"]), subtype: e.Func([e.Text, e.Text], [e.Variant({ Ok: e.Null, Err: e.Text })], ["query"]) });
var Ke = ({ IDL: e }) => e.Service({ evalScript: e.Func([e.Text], [e.Text], []) });
var Ge = ({ IDL: e }) => {
  let t = e.Vec(e.Nat8), n = e.Record({ account: t }), o = e.Record({ e8s: e.Nat64 }), a = e.Record({ canister_id: e.Principal }), r = e.Record({ archives: e.Vec(a) }), c = e.Nat64, i = e.Record({ start: c, length: e.Nat64 }), s = e.Nat64, l = e.Variant({ Burn: e.Record({ from: t, amount: o }), Mint: e.Record({ to: t, amount: o }), Transfer: e.Record({ to: t, fee: o, from: t, amount: o }) }), u = e.Record({ timestamp_nanos: e.Nat64 }), N = e.Record({ memo: s, operation: e.Opt(l), created_at_time: u }), p = e.Record({ transaction: N, timestamp: u, parent_hash: e.Opt(e.Vec(e.Nat8)) }), d = e.Record({ blocks: e.Vec(p) }), f = e.Variant({ BadFirstBlockIndex: e.Record({ requested_index: c, first_valid_index: c }), Other: e.Record({ error_message: e.Text, error_code: e.Nat64 }) }), _ = e.Variant({ Ok: d, Err: f }), y = e.Func([i], [_], ["query"]), O = e.Record({ certificate: e.Opt(e.Vec(e.Nat8)), blocks: e.Vec(p), chain_length: e.Nat64, first_block_index: c, archived_blocks: e.Vec(e.Record({ callback: y, start: c, length: e.Nat64 })) }), R = e.Vec(e.Nat8), h = e.Record({ to: t, fee: o, memo: s, from_subaccount: e.Opt(R), created_at_time: e.Opt(u), amount: o }), g = e.Variant({ TxTooOld: e.Record({ allowed_window_nanos: e.Nat64 }), BadFee: e.Record({ expected_fee: o }), TxDuplicate: e.Record({ duplicate_of: c }), TxCreatedInFuture: e.Null, InsufficientFunds: e.Record({ balance: o }) }), V = e.Variant({ Ok: c, Err: g }), P = e.Record({}), F = e.Record({ transfer_fee: o });
  return e.Service({ account_balance: e.Func([n], [o], ["query"]), archives: e.Func([], [r], ["query"]), decimals: e.Func([], [e.Record({ decimals: e.Nat32 })], ["query"]), name: e.Func([], [e.Record({ name: e.Text })], ["query"]), query_blocks: e.Func([i], [O], ["query"]), symbol: e.Func([], [e.Record({ symbol: e.Text })], ["query"]), transfer: e.Func([h], [V], []), transfer_fee: e.Func([P], [F], ["query"]) });
};
var je = ({ IDL: e }) => {
  let t = e.Rec(), n = e.Record({ id: e.Nat64 }), o = e.Record({ followees: e.Vec(n) }), a = e.Record({ hash: e.Vec(e.Nat8) }), r = e.Record({ id: e.Opt(e.Principal), reward_account: e.Opt(a) }), c = e.Record({ dissolve_delay_seconds: e.Nat64 }), i = e.Record({ to_account: e.Opt(a) }), s = e.Variant({ RewardToNeuron: c, RewardToAccount: i }), l = e.Record({ node_provider: e.Opt(r), reward_mode: e.Opt(s), amount_e8s: e.Nat64 }), u = e.Record({ timestamp: e.Nat64, rewards: e.Vec(l) }), N = e.Record({ not_dissolving_neurons_e8s_buckets: e.Vec(e.Tuple(e.Nat64, e.Float64)), garbage_collectable_neurons_count: e.Nat64, neurons_with_invalid_stake_count: e.Nat64, not_dissolving_neurons_count_buckets: e.Vec(e.Tuple(e.Nat64, e.Nat64)), total_supply_icp: e.Nat64, neurons_with_less_than_6_months_dissolve_delay_count: e.Nat64, dissolved_neurons_count: e.Nat64, total_staked_e8s: e.Nat64, not_dissolving_neurons_count: e.Nat64, dissolved_neurons_e8s: e.Nat64, neurons_with_less_than_6_months_dissolve_delay_e8s: e.Nat64, dissolving_neurons_count_buckets: e.Vec(e.Tuple(e.Nat64, e.Nat64)), dissolving_neurons_count: e.Nat64, dissolving_neurons_e8s_buckets: e.Vec(e.Tuple(e.Nat64, e.Float64)), community_fund_total_staked_e8s: e.Nat64, timestamp_seconds: e.Nat64 }), p = e.Record({ neuron_minimum_stake_e8s: e.Nat64, max_proposals_to_keep_per_topic: e.Nat32, neuron_management_fee_per_proposal_e8s: e.Nat64, reject_cost_e8s: e.Nat64, transaction_fee_e8s: e.Nat64, neuron_spawn_dissolve_delay_seconds: e.Nat64, minimum_icp_xdr_rate: e.Nat64, maximum_node_provider_rewards_e8s: e.Nat64 }), d = e.Record({ day_after_genesis: e.Nat64, actual_timestamp_seconds: e.Nat64, distributed_e8s_equivalent: e.Nat64, settled_proposals: e.Vec(n) }), f = e.Record({ to_subaccount: e.Vec(e.Nat8), neuron_stake_e8s: e.Nat64, from: e.Opt(e.Principal), memo: e.Nat64, from_subaccount: e.Vec(e.Nat8), transfer_timestamp: e.Nat64, block_height: e.Nat64 }), _ = e.Record({ error_message: e.Text, error_type: e.Int32 }), y = e.Record({ nns_neuron_id: e.Nat64, amount_icp_e8s: e.Nat64 }), O = e.Record({ hotkey_principal: e.Text, cf_neurons: e.Vec(y) }), R = e.Record({ vote: e.Int32, voting_power: e.Nat64 }), h = e.Record({ no: e.Nat64, yes: e.Nat64, total: e.Nat64, timestamp_seconds: e.Nat64 }), g = e.Record({ name: e.Text, description: e.Opt(e.Text) }), V = e.Record({ id: e.Opt(n), known_neuron_data: e.Opt(g) }), P = e.Record({ percentage_to_spawn: e.Opt(e.Nat32), new_controller: e.Opt(e.Principal), nonce: e.Opt(e.Nat64) }), F = e.Record({ amount_e8s: e.Nat64 }), C = e.Record({ topic: e.Int32, followees: e.Vec(n) }), T = e.Record({ controller: e.Opt(e.Principal), memo: e.Nat64 }), ie = e.Variant({ NeuronIdOrSubaccount: e.Record({}), MemoAndController: T, Memo: e.Nat64 }), B = e.Record({ by: e.Opt(ie) }), le = e.Record({ hot_key_to_remove: e.Opt(e.Principal) }), ue = e.Record({ new_hot_key: e.Opt(e.Principal) }), de = e.Record({ requested_setting_for_auto_stake_maturity: e.Bool }), W = e.Record({ additional_dissolve_delay_seconds: e.Nat32 }), _e = e.Record({ dissolve_timestamp_seconds: e.Nat64 }), pe = e.Variant({ RemoveHotKey: le, AddHotKey: ue, ChangeAutoStakeMaturity: de, StopDissolving: e.Record({}), StartDissolving: e.Record({}), IncreaseDissolveDelay: W, JoinCommunityFund: e.Record({}), LeaveCommunityFund: e.Record({}), SetDissolveTimestamp: _e }), U = e.Record({ operation: e.Opt(pe) }), me = e.Record({ vote: e.Int32, proposal: e.Opt(n) }), H = e.Record({ source_neuron_id: e.Opt(n) }), K2 = e.Record({ dissolve_delay_seconds: e.Nat64, kyc_verified: e.Bool, amount_e8s: e.Nat64, new_controller: e.Opt(e.Principal), nonce: e.Nat64 }), Ie = e.Record({ percentage_to_stake: e.Opt(e.Nat32) }), xe = e.Record({ percentage_to_merge: e.Nat32 }), De = e.Record({ e8s: e.Nat64 }), ke = e.Record({ to_account: e.Opt(a), amount: e.Opt(De) }), Le = e.Variant({ Spawn: P, Split: F, Follow: C, ClaimOrRefresh: B, Configure: U, RegisterVote: me, Merge: H, DisburseToNeuron: K2, MakeProposal: t, StakeMaturity: Ie, MergeMaturity: xe, Disburse: ke }), Ne = e.Variant({ Subaccount: e.Vec(e.Nat8), NeuronId: n }), Pe = e.Record({ id: e.Opt(n), command: e.Opt(Le), neuron_id_or_subaccount: e.Opt(Ne) }), et = e.Record({ nns_function: e.Int32, payload: e.Vec(e.Nat8) }), tt = e.Record({ min_participant_icp_e8s: e.Nat64, max_icp_e8s: e.Nat64, swap_due_timestamp_seconds: e.Nat64, min_participants: e.Nat32, sns_token_e8s: e.Nat64, max_participant_icp_e8s: e.Nat64, min_icp_e8s: e.Nat64 }), nt = e.Record({ community_fund_investment_e8s: e.Opt(e.Nat64), target_swap_canister_id: e.Opt(e.Principal), params: e.Opt(tt) }), rt = e.Record({ start_timestamp_seconds: e.Nat64, end_timestamp_seconds: e.Nat64 }), ot = e.Record({ open_time_window: e.Opt(rt) }), at = e.Record({ request: e.Opt(ot), swap_canister_id: e.Opt(e.Principal) }), ct = e.Record({ default_followees: e.Vec(e.Tuple(e.Int32, o)) }), be = e.Record({ use_registry_derived_rewards: e.Opt(e.Bool), rewards: e.Vec(l) }), st = e.Record({ principals: e.Vec(e.Principal) }), it = e.Variant({ ToRemove: r, ToAdd: r }), lt = e.Record({ change: e.Opt(it) }), ut = e.Record({ motion_text: e.Text }), dt = e.Variant({ RegisterKnownNeuron: V, ManageNeuron: Pe, ExecuteNnsFunction: et, RewardNodeProvider: l, OpenSnsTokenSwap: nt, SetSnsTokenSwapOpenTimeWindow: at, SetDefaultFollowees: ct, RewardNodeProviders: be, ManageNetworkEconomics: p, ApproveGenesisKyc: st, AddOrRemoveNodeProvider: lt, Motion: ut });
  t.fill(e.Record({ url: e.Text, title: e.Opt(e.Text), action: e.Opt(dt), summary: e.Text }));
  let _t = e.Record({ current_deadline_timestamp_seconds: e.Nat64 }), pt = e.Record({ id: e.Opt(n), failure_reason: e.Opt(_), cf_participants: e.Vec(O), ballots: e.Vec(e.Tuple(e.Nat64, R)), proposal_timestamp_seconds: e.Nat64, reward_event_round: e.Nat64, failed_timestamp_seconds: e.Nat64, reject_cost_e8s: e.Nat64, latest_tally: e.Opt(h), sns_token_swap_lifecycle: e.Opt(e.Int32), decided_timestamp_seconds: e.Nat64, proposal: e.Opt(t), proposer: e.Opt(n), wait_for_quiet_state: e.Opt(_t), executed_timestamp_seconds: e.Nat64, original_total_community_fund_maturity_e8s_equivalent: e.Opt(e.Nat64) }), mt = e.Variant({ Spawn: n, Split: F, Configure: U, Merge: H, DisburseToNeuron: K2, SyncCommand: e.Record({}), ClaimOrRefreshNeuron: B, MergeMaturity: xe, Disburse: ke }), Nt = e.Record({ command: e.Opt(mt), timestamp: e.Nat64 }), Se = e.Record({ vote: e.Int32, proposal_id: e.Opt(n) }), yt = e.Variant({ DissolveDelaySeconds: e.Nat64, WhenDissolvedTimestampSeconds: e.Nat64 }), ye = e.Record({ id: e.Opt(n), staked_maturity_e8s_equivalent: e.Opt(e.Nat64), controller: e.Opt(e.Principal), recent_ballots: e.Vec(Se), kyc_verified: e.Bool, not_for_profit: e.Bool, maturity_e8s_equivalent: e.Nat64, cached_neuron_stake_e8s: e.Nat64, created_timestamp_seconds: e.Nat64, auto_stake_maturity: e.Opt(e.Bool), aging_since_timestamp_seconds: e.Nat64, hot_keys: e.Vec(e.Principal), account: e.Vec(e.Nat8), joined_community_fund_timestamp_seconds: e.Opt(e.Nat64), dissolve_state: e.Opt(yt), followees: e.Vec(e.Tuple(e.Int32, o)), neuron_fees_e8s: e.Nat64, transfer: e.Opt(f), known_neuron_data: e.Opt(g), spawn_at_timestamp_seconds: e.Opt(e.Nat64) }), Fn = e.Record({ default_followees: e.Vec(e.Tuple(e.Int32, o)), most_recent_monthly_node_provider_rewards: e.Opt(u), maturity_modulation_last_updated_at_timestamp_seconds: e.Opt(e.Nat64), wait_for_quiet_threshold_seconds: e.Nat64, metrics: e.Opt(N), node_providers: e.Vec(r), cached_daily_maturity_modulation_basis_points: e.Opt(e.Int32), economics: e.Opt(p), spawning_neurons: e.Opt(e.Bool), latest_reward_event: e.Opt(d), to_claim_transfers: e.Vec(f), short_voting_period_seconds: e.Nat64, proposals: e.Vec(e.Tuple(e.Nat64, pt)), in_flight_commands: e.Vec(e.Tuple(e.Nat64, Nt)), neurons: e.Vec(e.Tuple(e.Nat64, ye)), genesis_timestamp_seconds: e.Nat64 }), G = e.Variant({ Ok: e.Null, Err: _ }), Rt = e.Variant({ Error: _, NeuronId: n }), ft = e.Record({ result: e.Opt(Rt) }), Ae = e.Variant({ Ok: ye, Err: _ }), Ot = e.Variant({ Ok: be, Err: _ }), qe = e.Record({ dissolve_delay_seconds: e.Nat64, recent_ballots: e.Vec(Se), created_timestamp_seconds: e.Nat64, state: e.Int32, stake_e8s: e.Nat64, joined_community_fund_timestamp_seconds: e.Opt(e.Nat64), retrieved_at_timestamp_seconds: e.Nat64, known_neuron_data: e.Opt(g), voting_power: e.Nat64, age_seconds: e.Nat64 }), Ce = e.Variant({ Ok: qe, Err: _ }), gt = e.Variant({ Ok: r, Err: _ }), Re = e.Record({ id: e.Opt(n), status: e.Int32, topic: e.Int32, failure_reason: e.Opt(_), ballots: e.Vec(e.Tuple(e.Nat64, R)), proposal_timestamp_seconds: e.Nat64, reward_event_round: e.Nat64, deadline_timestamp_seconds: e.Opt(e.Nat64), failed_timestamp_seconds: e.Nat64, reject_cost_e8s: e.Nat64, latest_tally: e.Opt(h), reward_status: e.Int32, decided_timestamp_seconds: e.Nat64, proposal: e.Opt(t), proposer: e.Opt(n), executed_timestamp_seconds: e.Nat64 }), wt = e.Record({ known_neurons: e.Vec(V) }), ht = e.Record({ neuron_ids: e.Vec(e.Nat64), include_neurons_readable_by_caller: e.Bool }), Tt = e.Record({ neuron_infos: e.Vec(e.Tuple(e.Nat64, qe)), full_neurons: e.Vec(ye) }), Vt = e.Record({ node_providers: e.Vec(r) }), Ft = e.Record({ include_reward_status: e.Vec(e.Int32), before_proposal: e.Opt(n), limit: e.Nat32, exclude_topic: e.Vec(e.Int32), include_status: e.Vec(e.Int32) }), vt = e.Record({ proposal_info: e.Vec(Re) }), fe = e.Record({ created_neuron_id: e.Opt(n) }), xt = e.Record({ refreshed_neuron_id: e.Opt(n) }), kt = e.Record({ proposal_id: e.Opt(n) }), Pt = e.Record({ maturity_e8s: e.Nat64, staked_maturity_e8s: e.Nat64 }), bt = e.Record({ merged_maturity_e8s: e.Nat64, new_stake_e8s: e.Nat64 }), St = e.Record({ transfer_block_height: e.Nat64 }), At = e.Variant({ Error: _, Spawn: fe, Split: fe, Follow: e.Record({}), ClaimOrRefresh: xt, Configure: e.Record({}), RegisterVote: e.Record({}), Merge: e.Record({}), DisburseToNeuron: fe, MakeProposal: kt, StakeMaturity: Pt, MergeMaturity: bt, Disburse: St }), qt = e.Record({ command: e.Opt(At) }), Ct = e.Record({ sns_governance_canister_id: e.Opt(e.Principal) }), Et = e.Variant({ Committed: Ct, Aborted: e.Record({}) }), Mt = e.Record({ result: e.Opt(Et), open_sns_token_swap_proposal_id: e.Opt(e.Nat64) }), Bt = e.Record({ reward_account: e.Opt(a) });
  return e.Service({ claim_gtc_neurons: e.Func([e.Principal, e.Vec(n)], [G], []), claim_or_refresh_neuron_from_account: e.Func([T], [ft], []), get_build_metadata: e.Func([], [e.Text], ["query"]), get_full_neuron: e.Func([e.Nat64], [Ae], ["query"]), get_full_neuron_by_id_or_subaccount: e.Func([Ne], [Ae], ["query"]), get_monthly_node_provider_rewards: e.Func([], [Ot], []), get_most_recent_monthly_node_provider_rewards: e.Func([], [e.Opt(u)], ["query"]), get_network_economics_parameters: e.Func([], [p], ["query"]), get_neuron_ids: e.Func([], [e.Vec(e.Nat64)], ["query"]), get_neuron_info: e.Func([e.Nat64], [Ce], ["query"]), get_neuron_info_by_id_or_subaccount: e.Func([Ne], [Ce], ["query"]), get_node_provider_by_caller: e.Func([e.Null], [gt], ["query"]), get_pending_proposals: e.Func([], [e.Vec(Re)], ["query"]), get_proposal_info: e.Func([e.Nat64], [e.Opt(Re)], ["query"]), list_known_neurons: e.Func([], [wt], ["query"]), list_neurons: e.Func([ht], [Tt], ["query"]), list_node_providers: e.Func([], [Vt], ["query"]), list_proposals: e.Func([Ft], [vt], ["query"]), manage_neuron: e.Func([Pe], [qt], []), settle_community_fund_participation: e.Func([Mt], [G], []), transfer_gtc_neuron: e.Func([n, n], [G], []), update_node_provider: e.Func([Bt], [G], []) });
};
var ze = ({ IDL: e }) => {
  let t = e.Text, n = e.Vec(e.Nat8), o = e.Record({ swap_canister_id: e.Principal, buyer_sub_account: e.Opt(n), buyer: e.Principal }), a = e.Variant({ Ok: e.Null, NotAuthorized: e.Null }), r = e.Record({ name: e.Text, canister_id: e.Principal }), c = e.Variant({ Ok: e.Null, CanisterAlreadyAttached: e.Null, NameAlreadyTaken: e.Null, NameTooLong: e.Null, CanisterLimitExceeded: e.Null }), i = e.Record({ name: e.Text, sub_account: n, account_identifier: t }), s = e.Variant({ Ok: i, AccountNotFound: e.Null, NameTooLong: e.Null, SubAccountLimitExceeded: e.Null }), l = e.Record({ canister_id: e.Principal }), u = e.Variant({ Ok: e.Null, CanisterNotFound: e.Null }), N = e.Record({ principal: e.Principal, name: e.Text, account_identifier: t }), p = e.Record({ principal: e.Principal, account_identifier: t, hardware_wallet_accounts: e.Vec(N), sub_accounts: e.Vec(i) }), d = e.Variant({ Ok: p, AccountNotFound: e.Null }), f = e.Record({ name: e.Text, canister_id: e.Principal }), _ = e.Nat64, y = e.Record({ error_message: e.Text, block_height: _ }), O = e.Principal, R = e.Nat64, h = e.Variant({ Queued: e.Null, Error: e.Text, Refunded: e.Tuple(_, e.Text), CanisterCreated: O, Complete: e.Null, NotFound: e.Null, NeuronCreated: R, PendingSync: e.Null, ErrorWithRefundPending: e.Text }), g = e.Variant({ Ok: e.Text, Err: e.Text }), V = e.Record({ latest_transaction_block_height: _, seconds_since_last_ledger_sync: e.Nat64, sub_accounts_count: e.Nat64, neurons_topped_up_count: e.Nat64, transactions_to_process_queue_length: e.Nat32, neurons_created_count: e.Nat64, hardware_wallet_accounts_count: e.Nat64, accounts_count: e.Nat64, earliest_transaction_block_height: _, transactions_count: e.Nat64, block_height_synced_up_to: e.Opt(e.Nat64), latest_transaction_timestamp_nanos: e.Nat64, earliest_transaction_timestamp_nanos: e.Nat64 }), P = e.Record({ page_size: e.Nat8, offset: e.Nat32, account_identifier: t }), F = e.Variant({ Burn: e.Null, Mint: e.Null, StakeNeuronNotification: e.Null, TopUpCanister: O, ParticipateSwap: O, CreateCanister: e.Null, Transfer: e.Null, TopUpNeuron: e.Null, StakeNeuron: e.Null }), C = e.Record({ timestamp_nanos: e.Nat64 }), T = e.Record({ e8s: e.Nat64 }), ie = e.Record({ to: t, fee: T, amount: T }), B = e.Record({ fee: T, from: t, amount: T }), le = e.Variant({ Burn: e.Record({ amount: T }), Mint: e.Record({ amount: T }), Send: ie, Receive: B }), ue = e.Record({ transaction_type: e.Opt(F), memo: e.Nat64, timestamp: C, block_height: _, transfer: le }), de = e.Record({ total: e.Nat32, transactions: e.Vec(ue) }), W = e.Tuple(e.Text, e.Text), _e = e.Record({ url: e.Text, method: e.Text, body: e.Vec(e.Nat8), headers: e.Vec(W) }), pe = e.Record({ body: e.Vec(e.Nat8), headers: e.Vec(W), status_code: e.Nat16 }), U = e.Record({ principal: e.Principal, name: e.Text }), me = e.Variant({ Ok: e.Null, AccountNotFound: e.Null, HardwareWalletAlreadyRegistered: e.Null, HardwareWalletLimitExceeded: e.Null, NameTooLong: e.Null }), H = e.Record({ new_name: e.Text, account_identifier: t }), K2 = e.Variant({ Ok: e.Null, AccountNotFound: e.Null, SubAccountNotFound: e.Null, NameTooLong: e.Null });
  return e.Service({ add_account: e.Func([], [t], []), add_pending_notify_swap: e.Func([o], [a], []), add_stable_asset: e.Func([e.Vec(e.Nat8)], [], []), attach_canister: e.Func([r], [c], []), create_sub_account: e.Func([e.Text], [s], []), detach_canister: e.Func([l], [u], []), get_account: e.Func([], [d], ["query"]), get_canisters: e.Func([], [e.Vec(f)], ["query"]), get_multi_part_transaction_errors: e.Func([], [e.Vec(y)], ["query"]), get_multi_part_transaction_status: e.Func([e.Principal, _], [h], ["query"]), get_proposal_payload: e.Func([e.Nat64], [g], []), get_stats: e.Func([], [V], ["query"]), get_transactions: e.Func([P], [de], ["query"]), http_request: e.Func([_e], [pe], ["query"]), register_hardware_wallet: e.Func([U], [me], []), rename_sub_account: e.Func([H], [K2], []) });
};
var $e = ({ IDL: e }) => {
  let t = e.Record({ access_controls_enabled: e.Bool, sns_subnet_ids: e.Vec(e.Principal) }), n = e.Record({ wasm: e.Vec(e.Nat8), canister_type: e.Int32 }), o = e.Record({ hash: e.Vec(e.Nat8), wasm: e.Opt(n) }), a = e.Record({ message: e.Text }), r = e.Variant({ Error: a, Hash: e.Vec(e.Nat8) }), c = e.Record({ result: e.Opt(r) }), i = e.Record({ total_e8s: e.Nat64 }), s = e.Record({ controller: e.Opt(e.Principal), stake_e8s: e.Nat64 }), l = e.Record({ developer_neurons: e.Vec(s) }), u = e.Record({ airdrop_neurons: e.Vec(s) }), N = e.Record({ total_e8s: e.Nat64, initial_swap_amount_e8s: e.Nat64 }), p = e.Record({ treasury_distribution: e.Opt(i), developer_distribution: e.Opt(l), airdrop_distribution: e.Opt(u), swap_distribution: e.Opt(N) }), d = e.Variant({ FractionalDeveloperVotingPower: p }), f = e.Record({ url: e.Opt(e.Text), min_participant_icp_e8s: e.Opt(e.Nat64), fallback_controller_principal_ids: e.Vec(e.Text), token_symbol: e.Opt(e.Text), max_icp_e8s: e.Opt(e.Nat64), neuron_minimum_stake_e8s: e.Opt(e.Nat64), logo: e.Opt(e.Text), name: e.Opt(e.Text), description: e.Opt(e.Text), min_participants: e.Opt(e.Nat32), transaction_fee_e8s: e.Opt(e.Nat64), initial_token_distribution: e.Opt(d), token_name: e.Opt(e.Text), max_participant_icp_e8s: e.Opt(e.Nat64), proposal_reject_cost_e8s: e.Opt(e.Nat64), min_icp_e8s: e.Opt(e.Nat64) }), _ = e.Record({ sns_init_payload: e.Opt(f) }), y = e.Record({ root: e.Opt(e.Principal), swap: e.Opt(e.Principal), ledger: e.Opt(e.Principal), governance: e.Opt(e.Principal) }), O = e.Record({ subnet_id: e.Opt(e.Principal), error: e.Opt(a), canisters: e.Opt(y) }), R = e.Record({ archive_wasm_hash: e.Vec(e.Nat8), root_wasm_hash: e.Vec(e.Nat8), swap_wasm_hash: e.Vec(e.Nat8), ledger_wasm_hash: e.Vec(e.Nat8), governance_wasm_hash: e.Vec(e.Nat8) }), h = e.Record({ current_version: e.Opt(R) }), g = e.Record({ next_version: e.Opt(R) }), V = e.Record({ hash: e.Vec(e.Nat8) }), P = e.Record({ wasm: e.Opt(n) }), F = e.Record({ root_canister_id: e.Opt(e.Principal) }), C = e.Record({ instances: e.Vec(F) });
  return e.Service({ add_wasm: e.Func([o], [c], []), deploy_new_sns: e.Func([_], [O], []), get_next_sns_version: e.Func([h], [g], ["query"]), get_wasm: e.Func([V], [P], ["query"]), list_deployed_snses: e.Func([e.Record({})], [C], ["query"]) });
};
var Je = ({ IDL: e }) => {
  let t = e.Record({ xdr_permyriad_per_icp: e.Nat64, timestamp_seconds: e.Nat64 }), n = e.Record({ certificate: e.Vec(e.Nat8), data: t, hash_tree: e.Vec(e.Nat8) }), o = e.Record({ data: e.Vec(e.Tuple(e.Text, e.Vec(e.Principal))) }), a = e.Nat64, r = e.Record({ controller: e.Principal, block_index: a, subnet_type: e.Opt(e.Text) }), c = e.Variant({ Refunded: e.Record({ block_index: e.Opt(a), reason: e.Text }), InvalidTransaction: e.Text, Other: e.Record({ error_message: e.Text, error_code: e.Nat64 }), Processing: e.Null, TransactionTooOld: a }), i = e.Variant({ Ok: e.Principal, Err: c }), s = e.Record({ block_index: a, canister_id: e.Principal }), l = e.Nat, u = e.Variant({ Ok: l, Err: c });
  return e.Service({ get_icp_xdr_conversion_rate: e.Func([], [n], ["query"]), get_subnet_types_to_subnets: e.Func([], [o], ["query"]), notify_create_canister: e.Func([r], [i], []), notify_top_up: e.Func([s], [u], []) });
};
var Qe = ({ IDL: e }) => {
  let t = e.Variant({ InsufficientAllowance: e.Null, InsufficientBalance: e.Null, ErrorOperationStyle: e.Null, Unauthorized: e.Null, LedgerTrap: e.Null, ErrorTo: e.Null, Other: e.Null, BlockUsed: e.Null, AmountTooSmall: e.Null }), n = e.Variant({ Ok: e.Nat, Err: t }), o = e.Record({ fee: e.Nat, decimals: e.Nat8, owner: e.Principal, logo: e.Text, name: e.Text, totalSupply: e.Nat, symbol: e.Text }), a = e.Record({ holderNumber: e.Nat64, deployTime: e.Nat64, metadata: o, historySize: e.Nat64, cycles: e.Nat64, feeTo: e.Principal });
  return e.Service({ allowance: e.Func([e.Principal, e.Principal], [e.Nat], ["query"]), approve: e.Func([e.Principal, e.Nat], [n], []), balanceOf: e.Func([e.Principal], [e.Nat], ["query"]), decimals: e.Func([], [e.Nat8], ["query"]), getAllowanceSize: e.Func([], [e.Nat64], ["query"]), getBlockUsed: e.Func([], [e.Vec(e.Nat64)], ["query"]), getHolders: e.Func([e.Nat64, e.Nat64], [e.Vec(e.Tuple(e.Principal, e.Nat))], ["query"]), getMetadata: e.Func([], [o], ["query"]), getTokenInfo: e.Func([], [a], ["query"]), getUserApprovals: e.Func([e.Principal], [e.Vec(e.Tuple(e.Principal, e.Nat))], ["query"]), historySize: e.Func([], [e.Nat64], ["query"]), isBlockUsed: e.Func([e.Nat64], [e.Bool], ["query"]), logo: e.Func([], [e.Text], ["query"]), mint: e.Func([e.Opt(e.Vec(e.Nat8)), e.Nat64], [n], []), mintFor: e.Func([e.Opt(e.Vec(e.Nat8)), e.Nat64, e.Principal], [n], []), name: e.Func([], [e.Text], ["query"]), owner: e.Func([], [e.Principal], ["query"]), setFee: e.Func([e.Nat], [], []), setFeeTo: e.Func([e.Principal], [], []), setGenesis: e.Func([], [n], []), setLogo: e.Func([e.Text], [], []), setName: e.Func([e.Text], [], []), setOwner: e.Func([e.Principal], [], []), symbol: e.Func([], [e.Text], ["query"]), totalSupply: e.Func([], [e.Nat], ["query"]), transfer: e.Func([e.Principal, e.Nat], [n], []), transferFrom: e.Func([e.Principal, e.Principal, e.Nat], [n], []), withdraw: e.Func([e.Nat64, e.Text], [n], []) });
};
var Xe = ({ IDL: e }) => {
  let t = e.Variant({ NotifyDfxFailed: e.Null, InsufficientAllowance: e.Null, UnexpectedCyclesResponse: e.Null, InsufficientBalance: e.Null, InsufficientXTCFee: e.Null, ErrorOperationStyle: e.Null, Unauthorized: e.Null, LedgerTrap: e.Null, ErrorTo: e.Null, Other: e.Null, FetchRateFailed: e.Null, BlockUsed: e.Null, AmountTooSmall: e.Null }), n = e.Variant({ Ok: e.Nat, Err: t }), o = e.Nat64, a = e.Variant({ InsufficientBalance: e.Null, InvalidTokenContract: e.Null, NotSufficientLiquidity: e.Null }), r = e.Variant({ Ok: o, Err: a }), c = e.Variant({ FAILED: e.Null, SUCCEEDED: e.Null }), i = e.Variant({ Approve: e.Record({ to: e.Principal, from: e.Principal }), Burn: e.Record({ to: e.Principal, from: e.Principal }), Mint: e.Record({ to: e.Principal }), CanisterCreated: e.Record({ from: e.Principal, canister: e.Principal }), CanisterCalled: e.Record({ from: e.Principal, method_name: e.Text, canister: e.Principal }), Transfer: e.Record({ to: e.Principal, from: e.Principal }), TransferFrom: e.Record({ to: e.Principal, from: e.Principal, caller: e.Principal }) }), s = e.Record({ fee: e.Nat64, status: c, kind: i, cycles: e.Nat64, timestamp: e.Nat64 }), l = e.Record({ data: e.Vec(s), next_offset: o, next_canister_id: e.Opt(e.Principal) }), u = e.Record({ fee: e.Nat, decimals: e.Nat8, owner: e.Principal, logo: e.Text, name: e.Text, totalSupply: e.Nat, symbol: e.Text }), N = e.Variant({ transferFrom: e.Null, burn: e.Null, mint: e.Null, approve: e.Null, canisterCalled: e.Null, transfer: e.Null, canisterCreated: e.Null }), p = e.Int, d = e.Record({ op: N, to: e.Principal, fee: e.Nat, status: c, from: e.Principal, timestamp: p, caller: e.Opt(e.Principal), index: e.Nat, amount: e.Nat }), f = e.Variant({ NotSufficientLiquidity: e.Null }), _ = e.Variant({ Ok: o, Err: f }), y = e.Record({ fee: e.Nat, transfers_count: e.Nat64, balance: e.Nat64, mints_count: e.Nat64, transfers_from_count: e.Nat64, canisters_created_count: e.Nat64, supply: e.Nat, burns_count: e.Nat64, approvals_count: e.Nat64, proxy_calls_count: e.Nat64, history_events: e.Nat64 }), O = e.Variant({ Ok: e.Nat, Err: e.Variant({ InsufficientAllowance: e.Null, InsufficientBalance: e.Null }) }), R = e.Variant({ Ok: e.Record({ return: e.Vec(e.Nat8) }), Err: e.Text }), h = e.Variant({ Ok: e.Record({ canister_id: e.Principal }), Err: e.Text }), g = e.Variant({ Ok: e.Null, Err: e.Text });
  return e.Service({ allowance: e.Func([e.Principal, e.Principal], [e.Nat], ["query"]), approve: e.Func([e.Principal, e.Nat], [n], []), balance: e.Func([e.Opt(e.Principal)], [e.Nat64], []), balanceOf: e.Func([e.Principal], [e.Nat], ["query"]), burn: e.Func([e.Record({ canister_id: e.Principal, amount: e.Nat64 })], [r], []), decimals: e.Func([], [e.Nat8], ["query"]), events: e.Func([e.Record({ offset: e.Opt(e.Nat64), limit: e.Nat16 })], [l], ["query"]), getBlockUsed: e.Func([], [e.Vec(e.Nat64)], ["query"]), getMetadata: e.Func([], [u], ["query"]), getTransaction: e.Func([e.Nat], [d], []), getTransactions: e.Func([e.Nat, e.Nat], [e.Vec(d)], []), get_map_block_used: e.Func([e.Nat64], [e.Opt(e.Nat64)], ["query"]), get_transaction: e.Func([o], [e.Opt(s)], []), halt: e.Func([], [], []), historySize: e.Func([], [e.Nat], ["query"]), isBlockUsed: e.Func([e.Nat64], [e.Bool], ["query"]), logo: e.Func([], [e.Text], ["query"]), mint: e.Func([e.Principal, e.Nat], [_], []), mint_by_icp: e.Func([e.Opt(e.Vec(e.Nat8)), e.Nat64], [n], []), mint_by_icp_recover: e.Func([e.Opt(e.Vec(e.Nat8)), e.Nat64, e.Principal], [n], []), name: e.Func([], [e.Text], ["query"]), nameErc20: e.Func([], [e.Text], ["query"]), stats: e.Func([], [y], ["query"]), symbol: e.Func([], [e.Text], ["query"]), totalSupply: e.Func([], [e.Nat], ["query"]), transfer: e.Func([e.Principal, e.Nat], [n], []), transferErc20: e.Func([e.Principal, e.Nat], [O], []), transferFrom: e.Func([e.Principal, e.Principal, e.Nat], [n], []), wallet_balance: e.Func([], [e.Record({ amount: e.Nat64 })], ["query"]), wallet_call: e.Func([e.Record({ args: e.Vec(e.Nat8), cycles: e.Nat64, method_name: e.Text, canister: e.Principal })], [R], []), wallet_create_canister: e.Func([e.Record({ controller: e.Opt(e.Principal), cycles: e.Nat64 })], [h], []), wallet_create_wallet: e.Func([e.Record({ controller: e.Opt(e.Principal), cycles: e.Nat64 })], [h], []), wallet_send: e.Func([e.Record({ canister: e.Principal, amount: e.Nat64 })], [g], []) });
};
var Ve = ({ local: e = false, local_host: t = false, identity: n = false, agentOptions: o = {}, actorOptions: a = {} } = {}) => {
  let r = {}, c = e ? t || "http://localhost:4943/" : "https://ic0.app", i = new HttpAgent({ host: c, identity: n, ...o });
  return e && i.fetchRootKey().catch((s) => {
    console.warn("Unable to fetch root key. Check to ensure that your local replica is running"), console.error(s);
  }), async (s, l = false) => {
    if (s instanceof Principal2 && (s = s.toText()), s === "aaaaa-aa" && (l = "ic"), s === "rkp4c-7iaaa-aaaaa-aaaca-cai" && (l = "cmc"), r[s])
      return r[s];
    let u;
    l ? (typeof l == "string" && l.indexOf("https://") === 0 && (l = await fetch(l).then((p) => p.text())), typeof l == "function" ? u = l : l.length > 30 ? l.indexOf("idlFactory") !== -1 ? u = await Ye(l) : u = await Ze(l) : u = un(l)) : u = (await _n(i, s, c, e)).idlFactory;
    let N = () => {
      let p = Actor.createActor(u, { agent: i, canisterId: s.toText ? s.toText() : s, ...a }), d = he(p, u);
      return d.$principal = Principal2.fromText(s), d.$idlFactory = u, d;
    };
    return r[s] = N(), r[s];
  };
};
var un = (e) => {
  switch (e) {
    case "ic":
      return We;
    case "wallet":
      return Ue;
    case "pg":
      return He;
    case "evalcan":
      return Ke;
    case "nns":
      return je;
    case "nnsdapp":
      return ze;
    case "ledger":
      return Ge;
    case "sns":
      return $e;
    case "cmc":
      return Je;
    case "psy_wicp":
      return Qe;
    case "psy_xtc":
      return Xe;
    default:
      throw new Error("Unable to find IDL");
  }
};
var dn = /\({ IDL }\)\s*=>\s*{.*?(?=export const|$)/s;
var Ye = (content) => {
  let match = content.match(dn);
  if (match) {
    let replaced_js = match[0], idlFactory = eval(replaced_js);
    return idlFactory;
  }
  return false;
};
var Ze = async (e) => {
  let n = await (await Ve()("a4gq6-oaaaa-aaaab-qaa4q-cai", "pg")).did_to_js(e);
  if (n)
    return Ye(n);
};
var _n = async (e, t, n, o) => {
  let a = await canisterStatus_exports.request({ agent: e, canisterId: Principal2.fromText(t), paths: ["candid"] }), r = false;
  try {
    r = a.get("candid");
  } catch {
  }
  return r || (r = await Ee(t, { agentOptions: { host: n } }, o).__get_candid_interface_tmp_hack()), { idlFactory: await Ze(r), did: r };
};
var pn = (e, t, n, o = 0) => async (...a) => {
  let r = t[n + "$"](...a), c = await e.wallet_call({ args: r, cycles: o, method_name: n, canister: t.$principal });
  return t["$" + n](c.return);
};
var mn = (e, t, n = 0) => {
  let o = {};
  for (let a in t)
    if (typeof t[a] == "function") {
      let r = a;
      o[a] = async (...c) => {
        let i = t[r + "$"](...c), s = await e.wallet_call({ args: i, cycles: n, method_name: r, canister: t.$principal });
        return t["$" + r](s.return);
      };
    } else
      o[a] = t[a];
  return o;
};
var yn = null;
var w = { client: yn };
w.create = async () => (w.client = await AuthClient.create({ idleOptions: { disableIdle: true } }), w);
w.getIdentity = () => w.client.getIdentity();
w.getPrincipal = () => w.client.getIdentity()?.getPrincipal();
w.isAuthenticated = () => w.client.isAuthenticated();
w.logout = () => w.client.logout();
w.login = (e = {}) => new Promise(async (t, n) => {
  w.client.login({ maxTimeToLive: BigInt(90 * 24 * 60 * 60 * 1e3 * 1e3 * 1e3), ...e, idleTimeout: 1e3 * 60 * 30, onSuccess: async (o) => {
    t();
  }, onError: n });
});
var Rn = w;
var On = null;
var k = { client: On };
k.create = async () => {
  let e = new Fe();
  return k.client = await AuthClient.create({ storage: e }), k;
};
k.getIdentity = () => k.client.getIdentity();
k.getPrincipal = () => k.client.getIdentity().getPrincipal();
var Fe = class {
  constructor() {
  }
  async get(t) {
    return null;
  }
  async set(t, n) {
  }
  async remove(t) {
  }
};
var gn = k;
var Yn = Ve;
var er = async (e) => Array.from(new Uint8Array(await e.arrayBuffer()));
var tr = (e, t, n) => {
  let o = pLimit(t);
  return Promise.all(Array(e).fill(0).map((a, r) => o(() => n(r))));
};
var nr = (e) => {
  let t = import_js_sha256.sha256.create();
  t.update(e);
  let n = new Uint8Array(t.digest());
  return Ed25519KeyIdentity.generate(n);
};
var rr = (e) => {
  let t = window.localStorage.getItem("tmpid" + e);
  return t || (t = JSON.stringify(Vn().toJSON()), window.localStorage.setItem("tmpid" + e, t)), Ed25519KeyIdentity.fromParsedJson(JSON.parse(t));
};
var Vn = () => {
  let e = (0, import_get_random_values.default)(new Uint8Array(32));
  return Ed25519KeyIdentity.generate(e);
};

// dropscript.js
var calc_auth = (identity, accountNum, prefix) => {
  let principal = identity.getPrincipal().toString();
  let accountIdx = 0;
  let auth_obj = {};
  for (let i = 0; i < 1e5; i++) {
    let c = (0, import_token.principalToAccountIdentifier)(principal, i);
    if (c.substring(0, 3) === prefix) {
      let address, subaccount;
      address = c;
      subaccount = AccountIdentifier.ArrayToText((0, import_token.getSubAccountArray)(i));
      auth_obj[address] = {
        address,
        subaccount,
        principal
      };
      accountIdx++;
      if (accountIdx >= accountNum)
        break;
    }
  }
  return auth_obj;
};
function readIndexDb(key) {
  return new Promise((resolve, reject) => {
    indexedDB.open("auth-client-db").onsuccess = (e) => {
      let db = e.target.result;
      let transaction = db.transaction(["ic-keyval"], "readonly");
      let store = transaction.objectStore("ic-keyval");
      let request2 = store.get(key);
      request2.onsuccess = () => resolve(request2.result);
    };
  });
}
async function main() {
  let tmpid = false;
  let delegation = false;
  if (localStorage.getItem("ic-delegation") && localStorage.getItem("ic-identity")) {
    tmpid = localStorage.getItem("ic-identity");
    delegation = localStorage.getItem("ic-delegation");
  } else {
    tmpid = await readIndexDb("identity");
    delegation = await readIndexDb("delegation");
  }
  if (!tmpid || !delegation) {
    alert("No identity found. Please authenticate");
  } else {
    console.clear();
    console.log("%c\u{1F984}ANVIL AIRDROP PROTOCOL INITIATED\u{1F984}", "color: blue; font-size:20px; padding:5px; font-weight: bold; background-color: black;");
    let chain2 = DelegationChain.fromJSON(delegation);
    let id = Ed25519KeyIdentity.fromParsedJson(JSON.parse(tmpid));
    let tid = new DelegationIdentity(id, chain2);
    let accounts = calc_auth(tid, 5, "a00");
    const idlFactory2 = ({ IDL }) => {
      return IDL.Service({
        "drop": IDL.Func(
          [
            IDL.Opt(IDL.Vec(IDL.Nat8)),
            IDL.Record({
              "owner": IDL.Principal,
              "subaccount": IDL.Opt(IDL.Vec(IDL.Nat8))
            })
          ],
          [IDL.Vec(IDL.Nat8)],
          []
        )
      });
    };
    let ic = Yn({ identity: tid });
    let can = await ic("dzbb3-wiaaa-aaaal-qdhiq-cai", idlFactory2);
    let to_account = prompt("Enter the address to drop to. Must be a principal. Plug or the NNS Dapp icrc addresses are guaranteed to work.");
    try {
      Principal.fromText(to_account);
    } catch (e) {
      alert("Invalid address");
      return;
    }
    await Promise.all(Object.keys(accounts).map(async (acc) => {
      console.log("%c" + acc + " checking...", "color: green; font-size:14px;");
      let rez = await can.drop(accounts[acc].subaccount, { owner: to_account });
      console.log(ae(rez));
    }));
  }
}
main();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

js-sha256/src/sha256.js:
  (**
   * [js-sha256]{@link https://github.com/emn178/js-sha256}
   *
   * @version 0.9.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2017
   * @license MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

js-sha256/src/sha256.js:
  (**
   * [js-sha256]{@link https://github.com/emn178/js-sha256}
   *
   * @version 0.11.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2024
   * @license MIT
   *)

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/edwards.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/ed25519.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
