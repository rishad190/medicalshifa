
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.0.2";globalThis.nextVersion = "16.2.10";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__0rl5avo._.js
var require_root_of_the_server_0rl5avo = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__0rl5avo._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__0rl5avo._.js", 51615, (e, r, o) => {
      r.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 78500, (e, r, o) => {
      r.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 38022, (e, r, o) => {
      self._ENTRIES ||= {};
      let n = Promise.resolve().then(() => e.i(42738));
      n.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(n, { get(e2, r2) {
        if ("then" === r2) return (r3, o3) => e2.then(r3, o3);
        let o2 = (...o3) => e2.then((e3) => (0, e3[r2])(...o3));
        return o2.then = (o3, n2) => e2.then((e3) => e3[r2]).then(o3, n2), o2;
      } });
    }]);
  }
});

// .next/server/edge/chunks/node_modules_next_dist_0d_i8t_._.js
var require_node_modules_next_dist_0d_i8t = __commonJS({
  ".next/server/edge/chunks/node_modules_next_dist_0d_i8t_._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_next_dist_0d_i8t_._.js", 74398, (e, t, r) => {
    }, 28042, (e, t, r) => {
      "use strict";
      var i = Object.defineProperty, n = Object.getOwnPropertyDescriptor, a = Object.getOwnPropertyNames, s = Object.prototype.hasOwnProperty, o = {}, l = { RequestCookies: () => m, ResponseCookies: () => g, parseCookie: () => d, parseSetCookie: () => h, stringifyCookie: () => u };
      for (var c in l) i(o, c, { get: l[c], enumerable: true });
      function u(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), i2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? i2 : `${i2}; ${r2.join("; ")}`;
      }
      function d(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [i2, n2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(i2, decodeURIComponent(null != n2 ? n2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function h(e2) {
        if (!e2) return;
        let [[t2, r2], ...i2] = d(e2), { domain: n2, expires: a2, httponly: s2, maxage: o2, path: l2, samesite: c2, secure: u2, partitioned: h2, priority: m2 } = Object.fromEntries(i2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var g2, y, b = { name: t2, value: decodeURIComponent(r2), domain: n2, ...a2 && { expires: new Date(a2) }, ...s2 && { httpOnly: true }, ..."string" == typeof o2 && { maxAge: Number(o2) }, path: l2, ...c2 && { sameSite: p.includes(g2 = (g2 = c2).toLowerCase()) ? g2 : void 0 }, ...u2 && { secure: true }, ...m2 && { priority: f.includes(y = (y = m2).toLowerCase()) ? y : void 0 }, ...h2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in b) b[t3] && (e3[t3] = b[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2, o2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let l2 of a(t2)) s.call(e2, l2) || l2 === r2 || i(e2, l2, { get: () => t2[l2], enumerable: !(o2 = n(t2, l2)) || o2.enumerable });
        return e2;
      })(i({}, "__esModule", { value: true }), o);
      var p = ["strict", "lax", "none"], f = ["low", "medium", "high"], m = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of d(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let i2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === i2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, i2 = this._parsed;
          return i2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(i2).map(([e3, t3]) => u(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => u(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, g = class {
        constructor(e2) {
          var t2, r2, i2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const n2 = null != (i2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? i2 : [];
          for (const e3 of Array.isArray(n2) ? n2 : function(e4) {
            if (!e4) return [];
            var t3, r3, i3, n3, a2, s2 = [], o2 = 0;
            function l2() {
              for (; o2 < e4.length && /\s/.test(e4.charAt(o2)); ) o2 += 1;
              return o2 < e4.length;
            }
            for (; o2 < e4.length; ) {
              for (t3 = o2, a2 = false; l2(); ) if ("," === (r3 = e4.charAt(o2))) {
                for (i3 = o2, o2 += 1, l2(), n3 = o2; o2 < e4.length && "=" !== (r3 = e4.charAt(o2)) && ";" !== r3 && "," !== r3; ) o2 += 1;
                o2 < e4.length && "=" === e4.charAt(o2) ? (a2 = true, o2 = n3, s2.push(e4.substring(t3, i3)), t3 = o2) : o2 = i3 + 1;
              } else o2 += 1;
              (!a2 || o2 >= e4.length) && s2.push(e4.substring(t3, e4.length));
            }
            return s2;
          }(n2)) {
            const t3 = h(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let i2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === i2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, i2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, n2 = this._parsed;
          return n2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...i2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = u(r3);
              t3.append("set-cookie", e4);
            }
          }(n2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(u).join("; ");
        }
      };
    }, 90044, (e) => {
      "use strict";
      let t = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class r {
        disable() {
          throw t;
        }
        getStore() {
        }
        run() {
          throw t;
        }
        exit() {
          throw t;
        }
        enterWith() {
          throw t;
        }
        static bind(e2) {
          return e2;
        }
      }
      let i = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      e.s(["bindSnapshot", 0, function(e2) {
        return i ? i.bind(e2) : r.bind(e2);
      }, "createAsyncLocalStorage", 0, function() {
        return i ? new i() : new r();
      }, "createSnapshot", 0, function() {
        return i ? i.snapshot() : function(e2, ...t2) {
          return e2(...t2);
        };
      }]);
    }, 59110, (e, t, r) => {
      (() => {
        "use strict";
        let r2, i, n, a, s;
        var o, l, c, u, d, h, p, f, m, g, y, b, w, v, _, S, E = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let i2 = r3(223), n2 = r3(172), a2 = r3(930), s2 = "context", o2 = new i2.NoopContextManager();
          class l2 {
            static getInstance() {
              return this._instance || (this._instance = new l2()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, n2.registerGlobal)(s2, e3, a2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t3, r4, ...i3) {
              return this._getContextManager().with(e3, t3, r4, ...i3);
            }
            bind(e3, t3) {
              return this._getContextManager().bind(e3, t3);
            }
            _getContextManager() {
              return (0, n2.getGlobal)(s2) || o2;
            }
            disable() {
              this._getContextManager().disable(), (0, n2.unregisterGlobal)(s2, a2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = l2;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let i2 = r3(56), n2 = r3(912), a2 = r3(957), s2 = r3(172);
          class o2 {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, s2.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: a2.DiagLogLevel.INFO }) => {
                var i3, o3, l2;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (i3 = e5.stack) ? i3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let c2 = (0, s2.getGlobal)("diag"), u2 = (0, n2.createLogLevelDiagLogger)(null != (o3 = r4.logLevel) ? o3 : a2.DiagLogLevel.INFO, e4);
                if (c2 && !r4.suppressOverrideMessage) {
                  let e5 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  c2.warn(`Current logger will be overwritten from ${e5}`), u2.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, s2.registerGlobal)("diag", u2, t3, true);
              }, t3.disable = () => {
                (0, s2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new i2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new o2()), this._instance;
            }
          }
          t2.DiagAPI = o2;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let i2 = r3(660), n2 = r3(172), a2 = r3(930), s2 = "metrics";
          class o2 {
            static getInstance() {
              return this._instance || (this._instance = new o2()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, n2.registerGlobal)(s2, e3, a2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, n2.getGlobal)(s2) || i2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, n2.unregisterGlobal)(s2, a2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = o2;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let i2 = r3(172), n2 = r3(874), a2 = r3(194), s2 = r3(277), o2 = r3(369), l2 = r3(930), c2 = "propagation", u2 = new n2.NoopTextMapPropagator();
          class d2 {
            constructor() {
              this.createBaggage = o2.createBaggage, this.getBaggage = s2.getBaggage, this.getActiveBaggage = s2.getActiveBaggage, this.setBaggage = s2.setBaggage, this.deleteBaggage = s2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d2()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, i2.registerGlobal)(c2, e3, l2.DiagAPI.instance());
            }
            inject(e3, t3, r4 = a2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = a2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, i2.unregisterGlobal)(c2, l2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, i2.getGlobal)(c2) || u2;
            }
          }
          t2.PropagationAPI = d2;
        }, 997: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let i2 = r3(172), n2 = r3(846), a2 = r3(139), s2 = r3(607), o2 = r3(930), l2 = "trace";
          class c2 {
            constructor() {
              this._proxyTracerProvider = new n2.ProxyTracerProvider(), this.wrapSpanContext = a2.wrapSpanContext, this.isSpanContextValid = a2.isSpanContextValid, this.deleteSpan = s2.deleteSpan, this.getSpan = s2.getSpan, this.getActiveSpan = s2.getActiveSpan, this.getSpanContext = s2.getSpanContext, this.setSpan = s2.setSpan, this.setSpanContext = s2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new c2()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t3 = (0, i2.registerGlobal)(l2, this._proxyTracerProvider, o2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e3), t3;
            }
            getTracerProvider() {
              return (0, i2.getGlobal)(l2) || this._proxyTracerProvider;
            }
            getTracer(e3, t3) {
              return this.getTracerProvider().getTracer(e3, t3);
            }
            disable() {
              (0, i2.unregisterGlobal)(l2, o2.DiagAPI.instance()), this._proxyTracerProvider = new n2.ProxyTracerProvider();
            }
          }
          t2.TraceAPI = c2;
        }, 277: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let i2 = r3(491), n2 = (0, r3(780).createContextKey)("OpenTelemetry Baggage Key");
          function a2(e3) {
            return e3.getValue(n2) || void 0;
          }
          t2.getBaggage = a2, t2.getActiveBaggage = function() {
            return a2(i2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(n2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(n2);
          };
        }, 993: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0;
          class r3 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t3 = this._entries.get(e3);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t3]) => [e3, t3]);
            }
            setEntry(e3, t3) {
              let i2 = new r3(this._entries);
              return i2._entries.set(e3, t3), i2;
            }
            removeEntry(e3) {
              let t3 = new r3(this._entries);
              return t3._entries.delete(e3), t3;
            }
            removeEntries(...e3) {
              let t3 = new r3(this._entries);
              for (let r4 of e3) t3._entries.delete(r4);
              return t3;
            }
            clear() {
              return new r3();
            }
          }
          t2.BaggageImpl = r3;
        }, 830: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let i2 = r3(930), n2 = r3(993), a2 = r3(830), s2 = i2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new n2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (s2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: a2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(491).ContextAPI.getInstance();
        }, 223: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let i2 = r3(780);
          t2.NoopContextManager = class {
            active() {
              return i2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...i3) {
              return t3.call(r4, ...i3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 780: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r3 {
            constructor(e3) {
              const t3 = this;
              t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t3.getValue = (e4) => t3._currentContext.get(e4), t3.setValue = (e4, i2) => {
                let n2 = new r3(t3._currentContext);
                return n2._currentContext.set(e4, i2), n2;
              }, t3.deleteValue = (e4) => {
                let i2 = new r3(t3._currentContext);
                return i2._currentContext.delete(e4), i2;
              };
            }
          }
          t2.ROOT_CONTEXT = new r3();
        }, 506: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(930).DiagAPI.instance();
        }, 56: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let i2 = r3(172);
          function n2(e3, t3, r4) {
            let n3 = (0, i2.getGlobal)("diag");
            if (n3) return r4.unshift(t3), n3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return n2("debug", this._namespace, e3);
            }
            error(...e3) {
              return n2("error", this._namespace, e3);
            }
            info(...e3) {
              return n2("info", this._namespace, e3);
            }
            warn(...e3) {
              return n2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return n2("verbose", this._namespace, e3);
            }
          };
        }, 972: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let i2 = r3(957);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, i3) {
              let n2 = t3[r5];
              return "function" == typeof n2 && e3 >= i3 ? n2.bind(t3) : function() {
              };
            }
            return e3 < i2.DiagLogLevel.NONE ? e3 = i2.DiagLogLevel.NONE : e3 > i2.DiagLogLevel.ALL && (e3 = i2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", i2.DiagLogLevel.ERROR), warn: r4("warn", i2.DiagLogLevel.WARN), info: r4("info", i2.DiagLogLevel.INFO), debug: r4("debug", i2.DiagLogLevel.DEBUG), verbose: r4("verbose", i2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 172: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let i2 = r3(200), n2 = r3(521), a2 = r3(130), s2 = n2.VERSION.split(".")[0], o2 = Symbol.for(`opentelemetry.js.api.${s2}`), l2 = i2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, i3 = false) {
            var a3;
            let s3 = l2[o2] = null != (a3 = l2[o2]) ? a3 : { version: n2.VERSION };
            if (!i3 && s3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (s3.version !== n2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${s3.version} for ${e3} does not match previously registered API v${n2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return s3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${n2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let i3 = null == (t3 = l2[o2]) ? void 0 : t3.version;
            if (i3 && (0, a2.isCompatible)(i3)) return null == (r4 = l2[o2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${n2.VERSION}.`);
            let r4 = l2[o2];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let i2 = r3(521), n2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function a2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), i3 = e3.match(n2);
            if (!i3) return () => false;
            let a3 = { major: +i3[1], minor: +i3[2], patch: +i3[3], prerelease: i3[4] };
            if (null != a3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function s2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let i4 = e4.match(n2);
              if (!i4) return s2(e4);
              let o2 = { major: +i4[1], minor: +i4[2], patch: +i4[3], prerelease: i4[4] };
              if (null != o2.prerelease || a3.major !== o2.major) return s2(e4);
              if (0 === a3.major) return a3.minor === o2.minor && a3.patch <= o2.patch ? (t3.add(e4), true) : s2(e4);
              return a3.minor <= o2.minor ? (t3.add(e4), true) : s2(e4);
            };
          }
          t2._makeCompatibilityCheck = a2, t2.isCompatible = a2(i2.VERSION);
        }, 886: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(653).MetricsAPI.getInstance();
        }, 901: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 102: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class i2 {
          }
          t2.NoopMetric = i2;
          class n2 extends i2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = n2;
          class a2 extends i2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = a2;
          class s2 extends i2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = s2;
          class o2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = o2;
          class l2 extends o2 {
          }
          t2.NoopObservableCounterMetric = l2;
          class c2 extends o2 {
          }
          t2.NoopObservableGaugeMetric = c2;
          class u2 extends o2 {
          }
          t2.NoopObservableUpDownCounterMetric = u2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new n2(), t2.NOOP_HISTOGRAM_METRIC = new s2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new a2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new c2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 660: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let i2 = r3(102);
          class n2 {
            getMeter(e3, t3, r4) {
              return i2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = n2, t2.NOOP_METER_PROVIDER = new n2();
        }, 200: function(e2, t2, r3) {
          var i2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), Object.defineProperty(e3, i3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), e3[i3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || i2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(46), t2);
        }, 651: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 46: function(e2, t2, r3) {
          var i2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), Object.defineProperty(e3, i3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), e3[i3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || i2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(651), t2);
        }, 939: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(181).PropagationAPI.getInstance();
        }, 874: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 194: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 845: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(997).TraceAPI.getInstance();
        }, 403: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let i2 = r3(476);
          t2.NonRecordingSpan = class {
            constructor(e3 = i2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 614: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let i2 = r3(491), n2 = r3(607), a2 = r3(403), s2 = r3(139), o2 = i2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = o2.active()) {
              var i3;
              if (null == t3 ? void 0 : t3.root) return new a2.NonRecordingSpan();
              let l2 = r4 && (0, n2.getSpanContext)(r4);
              return "object" == typeof (i3 = l2) && "string" == typeof i3.spanId && "string" == typeof i3.traceId && "number" == typeof i3.traceFlags && (0, s2.isSpanContextValid)(l2) ? new a2.NonRecordingSpan(l2) : new a2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, i3) {
              let a3, s3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (a3 = t3, l2 = r4) : (a3 = t3, s3 = r4, l2 = i3);
              let c2 = null != s3 ? s3 : o2.active(), u2 = this.startSpan(e3, a3, c2), d2 = (0, n2.setSpan)(c2, u2);
              return o2.with(d2, l2, void 0, u2);
            }
          };
        }, 124: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let i2 = r3(614);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new i2.NoopTracer();
            }
          };
        }, 125: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let i2 = new (r3(614)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, i3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = i3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, i3) {
              let n2 = this._getTracer();
              return Reflect.apply(n2.startActiveSpan, n2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : i2;
            }
          };
        }, 846: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let i2 = r3(125), n2 = new (r3(124)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var n3;
              return null != (n3 = this.getDelegateTracer(e3, t3, r4)) ? n3 : new i2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : n2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var i3;
              return null == (i3 = this._delegate) ? void 0 : i3.getTracer(e3, t3, r4);
            }
          };
        }, 996: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 607: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let i2 = r3(780), n2 = r3(403), a2 = r3(491), s2 = (0, i2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o2(e3) {
            return e3.getValue(s2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(s2, t3);
          }
          t2.getSpan = o2, t2.getActiveSpan = function() {
            return o2(a2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(s2);
          }, t2.setSpanContext = function(e3, t3) {
            return l2(e3, new n2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = o2(e3)) ? void 0 : t3.spanContext();
          };
        }, 325: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let i2 = r3(564);
          class n2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e3) && r4._internalState.delete(e3), r4._internalState.set(e3, t3), r4;
            }
            unset(e3) {
              let t3 = this._clone();
              return t3._internalState.delete(e3), t3;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t3) => (e3.push(t3 + "=" + this.get(t3)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t3) => {
                let r4 = t3.trim(), n3 = r4.indexOf("=");
                if (-1 !== n3) {
                  let a2 = r4.slice(0, n3), s2 = r4.slice(n3 + 1, t3.length);
                  (0, i2.validateKey)(a2) && (0, i2.validateValue)(s2) && e4.set(a2, s2);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new n2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t2.TraceStateImpl = n2;
        }, 564: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", i2 = `[a-z]${r3}{0,255}`, n2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, a2 = RegExp(`^(?:${i2}|${n2})$`), s2 = /^[ -~]{0,255}[!-~]$/, o2 = /,|=/;
          t2.validateKey = function(e3) {
            return a2.test(e3);
          }, t2.validateValue = function(e3) {
            return s2.test(e3) && !o2.test(e3);
          };
        }, 98: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let i2 = r3(325);
          t2.createTraceState = function(e3) {
            return new i2.TraceStateImpl(e3);
          };
        }, 476: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let i2 = r3(475);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: i2.TraceFlags.NONE };
        }, 357: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 139: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let i2 = r3(476), n2 = r3(403), a2 = /^([0-9a-f]{32})$/i, s2 = /^[0-9a-f]{16}$/i;
          function o2(e3) {
            return a2.test(e3) && e3 !== i2.INVALID_TRACEID;
          }
          function l2(e3) {
            return s2.test(e3) && e3 !== i2.INVALID_SPANID;
          }
          t2.isValidTraceId = o2, t2.isValidSpanId = l2, t2.isSpanContextValid = function(e3) {
            return o2(e3.traceId) && l2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new n2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 475: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 521: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, x = {};
        function T(e2) {
          var t2 = x[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = x[e2] = { exports: {} }, i2 = true;
          try {
            E[e2].call(r3.exports, r3, r3.exports, T), i2 = false;
          } finally {
            i2 && delete x[e2];
          }
          return r3.exports;
        }
        T.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var C = {};
        Object.defineProperty(C, "__esModule", { value: true }), C.trace = C.propagation = C.metrics = C.diag = C.context = C.INVALID_SPAN_CONTEXT = C.INVALID_TRACEID = C.INVALID_SPANID = C.isValidSpanId = C.isValidTraceId = C.isSpanContextValid = C.createTraceState = C.TraceFlags = C.SpanStatusCode = C.SpanKind = C.SamplingDecision = C.ProxyTracerProvider = C.ProxyTracer = C.defaultTextMapSetter = C.defaultTextMapGetter = C.ValueType = C.createNoopMeter = C.DiagLogLevel = C.DiagConsoleLogger = C.ROOT_CONTEXT = C.createContextKey = C.baggageEntryMetadataFromString = void 0, o = T(369), Object.defineProperty(C, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return o.baggageEntryMetadataFromString;
        } }), l = T(780), Object.defineProperty(C, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(C, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), c = T(972), Object.defineProperty(C, "DiagConsoleLogger", { enumerable: true, get: function() {
          return c.DiagConsoleLogger;
        } }), u = T(957), Object.defineProperty(C, "DiagLogLevel", { enumerable: true, get: function() {
          return u.DiagLogLevel;
        } }), d = T(102), Object.defineProperty(C, "createNoopMeter", { enumerable: true, get: function() {
          return d.createNoopMeter;
        } }), h = T(901), Object.defineProperty(C, "ValueType", { enumerable: true, get: function() {
          return h.ValueType;
        } }), p = T(194), Object.defineProperty(C, "defaultTextMapGetter", { enumerable: true, get: function() {
          return p.defaultTextMapGetter;
        } }), Object.defineProperty(C, "defaultTextMapSetter", { enumerable: true, get: function() {
          return p.defaultTextMapSetter;
        } }), f = T(125), Object.defineProperty(C, "ProxyTracer", { enumerable: true, get: function() {
          return f.ProxyTracer;
        } }), m = T(846), Object.defineProperty(C, "ProxyTracerProvider", { enumerable: true, get: function() {
          return m.ProxyTracerProvider;
        } }), g = T(996), Object.defineProperty(C, "SamplingDecision", { enumerable: true, get: function() {
          return g.SamplingDecision;
        } }), y = T(357), Object.defineProperty(C, "SpanKind", { enumerable: true, get: function() {
          return y.SpanKind;
        } }), b = T(847), Object.defineProperty(C, "SpanStatusCode", { enumerable: true, get: function() {
          return b.SpanStatusCode;
        } }), w = T(475), Object.defineProperty(C, "TraceFlags", { enumerable: true, get: function() {
          return w.TraceFlags;
        } }), v = T(98), Object.defineProperty(C, "createTraceState", { enumerable: true, get: function() {
          return v.createTraceState;
        } }), _ = T(139), Object.defineProperty(C, "isSpanContextValid", { enumerable: true, get: function() {
          return _.isSpanContextValid;
        } }), Object.defineProperty(C, "isValidTraceId", { enumerable: true, get: function() {
          return _.isValidTraceId;
        } }), Object.defineProperty(C, "isValidSpanId", { enumerable: true, get: function() {
          return _.isValidSpanId;
        } }), S = T(476), Object.defineProperty(C, "INVALID_SPANID", { enumerable: true, get: function() {
          return S.INVALID_SPANID;
        } }), Object.defineProperty(C, "INVALID_TRACEID", { enumerable: true, get: function() {
          return S.INVALID_TRACEID;
        } }), Object.defineProperty(C, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return S.INVALID_SPAN_CONTEXT;
        } }), r2 = T(67), Object.defineProperty(C, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), i = T(506), Object.defineProperty(C, "diag", { enumerable: true, get: function() {
          return i.diag;
        } }), n = T(886), Object.defineProperty(C, "metrics", { enumerable: true, get: function() {
          return n.metrics;
        } }), a = T(939), Object.defineProperty(C, "propagation", { enumerable: true, get: function() {
          return a.propagation;
        } }), s = T(845), Object.defineProperty(C, "trace", { enumerable: true, get: function() {
          return s.trace;
        } }), C.default = { context: r2.context, diag: i.diag, metrics: n.metrics, propagation: a.propagation, trace: s.trace }, t.exports = C;
      })();
    }, 71498, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, i, n, a = {};
        a.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var n2 = {}, a2 = t2.split(i), s = (r3 || {}).decode || e2, o = 0; o < a2.length; o++) {
            var l = a2[o], c = l.indexOf("=");
            if (!(c < 0)) {
              var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
              '"' == d[0] && (d = d.slice(1, -1)), void 0 == n2[u] && (n2[u] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(d, s));
            }
          }
          return n2;
        }, a.serialize = function(e3, t2, i2) {
          var a2 = i2 || {}, s = a2.encode || r2;
          if ("function" != typeof s) throw TypeError("option encode is invalid");
          if (!n.test(e3)) throw TypeError("argument name is invalid");
          var o = s(t2);
          if (o && !n.test(o)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + o;
          if (null != a2.maxAge) {
            var c = a2.maxAge - 0;
            if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(c);
          }
          if (a2.domain) {
            if (!n.test(a2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + a2.domain;
          }
          if (a2.path) {
            if (!n.test(a2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + a2.path;
          }
          if (a2.expires) {
            if ("function" != typeof a2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + a2.expires.toUTCString();
          }
          if (a2.httpOnly && (l += "; HttpOnly"), a2.secure && (l += "; Secure"), a2.sameSite) switch ("string" == typeof a2.sameSite ? a2.sameSite.toLowerCase() : a2.sameSite) {
            case true:
            case "strict":
              l += "; SameSite=Strict";
              break;
            case "lax":
              l += "; SameSite=Lax";
              break;
            case "none":
              l += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return l;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, i = /; */, n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = a;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, i, n, a;
        var s = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function i2() {
          }
          function n2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function a2(e4, t3, i3, a3, s3) {
            if ("function" != typeof i3) throw TypeError("The listener must be a function");
            var o3 = new n2(i3, a3 || e4, s3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], o3] : e4._events[l2].push(o3) : (e4._events[l2] = o3, e4._eventsCount++), e4;
          }
          function s2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new i2() : delete e4._events[t3];
          }
          function o2() {
            this._events = new i2(), this._eventsCount = 0;
          }
          Object.create && (i2.prototype = /* @__PURE__ */ Object.create(null), new i2().__proto__ || (r3 = false)), o2.prototype.eventNames = function() {
            var e4, i3, n3 = [];
            if (0 === this._eventsCount) return n3;
            for (i3 in e4 = this._events) t2.call(e4, i3) && n3.push(r3 ? i3.slice(1) : i3);
            return Object.getOwnPropertySymbols ? n3.concat(Object.getOwnPropertySymbols(e4)) : n3;
          }, o2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, i3 = this._events[t3];
            if (!i3) return [];
            if (i3.fn) return [i3.fn];
            for (var n3 = 0, a3 = i3.length, s3 = Array(a3); n3 < a3; n3++) s3[n3] = i3[n3].fn;
            return s3;
          }, o2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, i3 = this._events[t3];
            return i3 ? i3.fn ? 1 : i3.length : 0;
          }, o2.prototype.emit = function(e4, t3, i3, n3, a3, s3) {
            var o3 = r3 ? r3 + e4 : e4;
            if (!this._events[o3]) return false;
            var l2, c2, u = this._events[o3], d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e4, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, i3), true;
                case 4:
                  return u.fn.call(u.context, t3, i3, n3), true;
                case 5:
                  return u.fn.call(u.context, t3, i3, n3, a3), true;
                case 6:
                  return u.fn.call(u.context, t3, i3, n3, a3, s3), true;
              }
              for (c2 = 1, l2 = Array(d - 1); c2 < d; c2++) l2[c2 - 1] = arguments[c2];
              u.fn.apply(u.context, l2);
            } else {
              var h, p = u.length;
              for (c2 = 0; c2 < p; c2++) switch (u[c2].once && this.removeListener(e4, u[c2].fn, void 0, true), d) {
                case 1:
                  u[c2].fn.call(u[c2].context);
                  break;
                case 2:
                  u[c2].fn.call(u[c2].context, t3);
                  break;
                case 3:
                  u[c2].fn.call(u[c2].context, t3, i3);
                  break;
                case 4:
                  u[c2].fn.call(u[c2].context, t3, i3, n3);
                  break;
                default:
                  if (!l2) for (h = 1, l2 = Array(d - 1); h < d; h++) l2[h - 1] = arguments[h];
                  u[c2].fn.apply(u[c2].context, l2);
              }
            }
            return true;
          }, o2.prototype.on = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, false);
          }, o2.prototype.once = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, true);
          }, o2.prototype.removeListener = function(e4, t3, i3, n3) {
            var a3 = r3 ? r3 + e4 : e4;
            if (!this._events[a3]) return this;
            if (!t3) return s2(this, a3), this;
            var o3 = this._events[a3];
            if (o3.fn) o3.fn !== t3 || n3 && !o3.once || i3 && o3.context !== i3 || s2(this, a3);
            else {
              for (var l2 = 0, c2 = [], u = o3.length; l2 < u; l2++) (o3[l2].fn !== t3 || n3 && !o3[l2].once || i3 && o3[l2].context !== i3) && c2.push(o3[l2]);
              c2.length ? this._events[a3] = 1 === c2.length ? c2[0] : c2 : s2(this, a3);
            }
            return this;
          }, o2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && s2(this, t3)) : (this._events = new i2(), this._eventsCount = 0), this;
          }, o2.prototype.off = o2.prototype.removeListener, o2.prototype.addListener = o2.prototype.on, o2.prefixed = r3, o2.EventEmitter = o2, e3.exports = o2;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let i2 = 0, n2 = e4.length;
            for (; n2 > 0; ) {
              let a2 = n2 / 2 | 0, s2 = i2 + a2;
              0 >= r3(e4[s2], t3) ? (i2 = ++s2, n2 -= a2 + 1) : n2 = a2;
            }
            return i2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let i2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let n2 = i2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(n2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          let i2 = r3(213);
          class n2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let a2 = (e4, t3, r4) => new Promise((a3, s2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void a3(e4);
            let o2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  a3(r4());
                } catch (e5) {
                  s2(e5);
                }
                return;
              }
              let i3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, o3 = r4 instanceof Error ? r4 : new n2(i3);
              "function" == typeof e4.cancel && e4.cancel(), s2(o3);
            }, t3);
            i2(e4.then(a3, s2), () => {
              clearTimeout(o2);
            });
          });
          e3.exports = a2, e3.exports.default = a2, e3.exports.TimeoutError = n2;
        } }, o = {};
        function l(e3) {
          var t2 = o[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = o[e3] = { exports: {} }, i2 = true;
          try {
            s[e3](r3, r3.exports, l), i2 = false;
          } finally {
            i2 && delete o[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var c = {};
        Object.defineProperty(c, "__esModule", { value: true }), e2 = l(993), r2 = l(816), i = l(821), n = () => {
        }, a = new r2.TimeoutError(), c.default = class extends e2 {
          constructor(e3) {
            var t2, r3, a2, s2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = n, this._resolveIdle = n, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: i.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (s2 = null == (a2 = e3.interval) ? void 0 : a2.toString()) ? s2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = n, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = n, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((i2, n2) => {
              let s2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let s3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && n2(a);
                  });
                  i2(await s3);
                } catch (e4) {
                  n2(e4);
                }
                this._next();
              };
              this._queue.enqueue(s2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = c;
      })();
    }, 25085, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var i = { getTestReqInfo: function() {
        return l;
      }, withRequest: function() {
        return o;
      } };
      for (var n in i) Object.defineProperty(r, n, { enumerable: true, get: i[n] });
      let a = new (e.r(78500)).AsyncLocalStorage();
      function s(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let i2 = t2.url(e2);
        return { url: i2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function o(e2, t2, r2) {
        let i2 = s(e2, t2);
        return i2 ? a.run(i2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = a.getStore();
        return r2 || (e2 && t2 ? s(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var i = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { handleFetch: function() {
        return c;
      }, interceptFetch: function() {
        return u;
      }, reader: function() {
        return o;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let s = e.r(25085), o = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function l(e2, t2) {
        let { url: r2, method: n2, headers: a2, body: s2, cache: o2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: h, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: n2, headers: [...Array.from(a2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: s2 ? i.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: h, referrerPolicy: p } };
      }
      async function c(e2, t2) {
        let r2 = (0, s.getTestReqInfo)(t2, o);
        if (!r2) return e2(t2);
        let { testData: n2, proxyPort: a2 } = r2, c2 = await l(n2, t2), u2 = await e2(`http://localhost:${a2}`, { method: "POST", body: JSON.stringify(c2), next: { internal: true } });
        if (!u2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await u2.json(), { api: h } = d;
        switch (h) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return function(e3) {
              let { status: t3, headers: r3, body: n3 } = e3.response;
              return new Response(n3 ? i.Buffer.from(n3, "base64") : null, { status: t3, headers: new Headers(r3) });
            }(d);
          default:
            return h;
        }
      }
      function u(t2) {
        return e.g.fetch = function(e2, r2) {
          var i2;
          return (null == r2 || null == (i2 = r2.next) ? void 0 : i2.internal) ? t2(e2, r2) : c(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var i = { interceptTestApis: function() {
        return o;
      }, wrapRequestHandler: function() {
        return l;
      } };
      for (var n in i) Object.defineProperty(r, n, { enumerable: true, get: i[n] });
      let a = e.r(25085), s = e.r(28325);
      function o() {
        return (0, s.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, a.withRequest)(t2, s.reader, () => e2(t2, r2));
      }
    }, 54846, (e, t, r) => {
      !function() {
        "use strict";
        var e2 = { 114: function(e3) {
          function t2(e4) {
            if ("string" != typeof e4) throw TypeError("Path must be a string. Received " + JSON.stringify(e4));
          }
          function r3(e4, t3) {
            for (var r4, i3 = "", n = 0, a = -1, s = 0, o = 0; o <= e4.length; ++o) {
              if (o < e4.length) r4 = e4.charCodeAt(o);
              else if (47 === r4) break;
              else r4 = 47;
              if (47 === r4) {
                if (a === o - 1 || 1 === s) ;
                else if (a !== o - 1 && 2 === s) {
                  if (i3.length < 2 || 2 !== n || 46 !== i3.charCodeAt(i3.length - 1) || 46 !== i3.charCodeAt(i3.length - 2)) {
                    if (i3.length > 2) {
                      var l = i3.lastIndexOf("/");
                      if (l !== i3.length - 1) {
                        -1 === l ? (i3 = "", n = 0) : n = (i3 = i3.slice(0, l)).length - 1 - i3.lastIndexOf("/"), a = o, s = 0;
                        continue;
                      }
                    } else if (2 === i3.length || 1 === i3.length) {
                      i3 = "", n = 0, a = o, s = 0;
                      continue;
                    }
                  }
                  t3 && (i3.length > 0 ? i3 += "/.." : i3 = "..", n = 2);
                } else i3.length > 0 ? i3 += "/" + e4.slice(a + 1, o) : i3 = e4.slice(a + 1, o), n = o - a - 1;
                a = o, s = 0;
              } else 46 === r4 && -1 !== s ? ++s : s = -1;
            }
            return i3;
          }
          var i2 = { resolve: function() {
            for (var e4, i3, n = "", a = false, s = arguments.length - 1; s >= -1 && !a; s--) s >= 0 ? i3 = arguments[s] : (void 0 === e4 && (e4 = ""), i3 = e4), t2(i3), 0 !== i3.length && (n = i3 + "/" + n, a = 47 === i3.charCodeAt(0));
            if (n = r3(n, !a), a) if (n.length > 0) return "/" + n;
            else return "/";
            return n.length > 0 ? n : ".";
          }, normalize: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            var i3 = 47 === e4.charCodeAt(0), n = 47 === e4.charCodeAt(e4.length - 1);
            return (0 !== (e4 = r3(e4, !i3)).length || i3 || (e4 = "."), e4.length > 0 && n && (e4 += "/"), i3) ? "/" + e4 : e4;
          }, isAbsolute: function(e4) {
            return t2(e4), e4.length > 0 && 47 === e4.charCodeAt(0);
          }, join: function() {
            if (0 == arguments.length) return ".";
            for (var e4, r4 = 0; r4 < arguments.length; ++r4) {
              var n = arguments[r4];
              t2(n), n.length > 0 && (void 0 === e4 ? e4 = n : e4 += "/" + n);
            }
            return void 0 === e4 ? "." : i2.normalize(e4);
          }, relative: function(e4, r4) {
            if (t2(e4), t2(r4), e4 === r4 || (e4 = i2.resolve(e4)) === (r4 = i2.resolve(r4))) return "";
            for (var n = 1; n < e4.length && 47 === e4.charCodeAt(n); ++n) ;
            for (var a = e4.length, s = a - n, o = 1; o < r4.length && 47 === r4.charCodeAt(o); ++o) ;
            for (var l = r4.length - o, c = s < l ? s : l, u = -1, d = 0; d <= c; ++d) {
              if (d === c) {
                if (l > c) {
                  if (47 === r4.charCodeAt(o + d)) return r4.slice(o + d + 1);
                  else if (0 === d) return r4.slice(o + d);
                } else s > c && (47 === e4.charCodeAt(n + d) ? u = d : 0 === d && (u = 0));
                break;
              }
              var h = e4.charCodeAt(n + d);
              if (h !== r4.charCodeAt(o + d)) break;
              47 === h && (u = d);
            }
            var p = "";
            for (d = n + u + 1; d <= a; ++d) (d === a || 47 === e4.charCodeAt(d)) && (0 === p.length ? p += ".." : p += "/..");
            return p.length > 0 ? p + r4.slice(o + u) : (o += u, 47 === r4.charCodeAt(o) && ++o, r4.slice(o));
          }, _makeLong: function(e4) {
            return e4;
          }, dirname: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            for (var r4 = e4.charCodeAt(0), i3 = 47 === r4, n = -1, a = true, s = e4.length - 1; s >= 1; --s) if (47 === (r4 = e4.charCodeAt(s))) {
              if (!a) {
                n = s;
                break;
              }
            } else a = false;
            return -1 === n ? i3 ? "/" : "." : i3 && 1 === n ? "//" : e4.slice(0, n);
          }, basename: function(e4, r4) {
            if (void 0 !== r4 && "string" != typeof r4) throw TypeError('"ext" argument must be a string');
            t2(e4);
            var i3, n = 0, a = -1, s = true;
            if (void 0 !== r4 && r4.length > 0 && r4.length <= e4.length) {
              if (r4.length === e4.length && r4 === e4) return "";
              var o = r4.length - 1, l = -1;
              for (i3 = e4.length - 1; i3 >= 0; --i3) {
                var c = e4.charCodeAt(i3);
                if (47 === c) {
                  if (!s) {
                    n = i3 + 1;
                    break;
                  }
                } else -1 === l && (s = false, l = i3 + 1), o >= 0 && (c === r4.charCodeAt(o) ? -1 == --o && (a = i3) : (o = -1, a = l));
              }
              return n === a ? a = l : -1 === a && (a = e4.length), e4.slice(n, a);
            }
            for (i3 = e4.length - 1; i3 >= 0; --i3) if (47 === e4.charCodeAt(i3)) {
              if (!s) {
                n = i3 + 1;
                break;
              }
            } else -1 === a && (s = false, a = i3 + 1);
            return -1 === a ? "" : e4.slice(n, a);
          }, extname: function(e4) {
            t2(e4);
            for (var r4 = -1, i3 = 0, n = -1, a = true, s = 0, o = e4.length - 1; o >= 0; --o) {
              var l = e4.charCodeAt(o);
              if (47 === l) {
                if (!a) {
                  i3 = o + 1;
                  break;
                }
                continue;
              }
              -1 === n && (a = false, n = o + 1), 46 === l ? -1 === r4 ? r4 = o : 1 !== s && (s = 1) : -1 !== r4 && (s = -1);
            }
            return -1 === r4 || -1 === n || 0 === s || 1 === s && r4 === n - 1 && r4 === i3 + 1 ? "" : e4.slice(r4, n);
          }, format: function(e4) {
            var t3, r4;
            if (null === e4 || "object" != typeof e4) throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e4);
            return t3 = e4.dir || e4.root, r4 = e4.base || (e4.name || "") + (e4.ext || ""), t3 ? t3 === e4.root ? t3 + r4 : t3 + "/" + r4 : r4;
          }, parse: function(e4) {
            t2(e4);
            var r4, i3 = { root: "", dir: "", base: "", ext: "", name: "" };
            if (0 === e4.length) return i3;
            var n = e4.charCodeAt(0), a = 47 === n;
            a ? (i3.root = "/", r4 = 1) : r4 = 0;
            for (var s = -1, o = 0, l = -1, c = true, u = e4.length - 1, d = 0; u >= r4; --u) {
              if (47 === (n = e4.charCodeAt(u))) {
                if (!c) {
                  o = u + 1;
                  break;
                }
                continue;
              }
              -1 === l && (c = false, l = u + 1), 46 === n ? -1 === s ? s = u : 1 !== d && (d = 1) : -1 !== s && (d = -1);
            }
            return -1 === s || -1 === l || 0 === d || 1 === d && s === l - 1 && s === o + 1 ? -1 !== l && (0 === o && a ? i3.base = i3.name = e4.slice(1, l) : i3.base = i3.name = e4.slice(o, l)) : (0 === o && a ? (i3.name = e4.slice(1, s), i3.base = e4.slice(1, l)) : (i3.name = e4.slice(o, s), i3.base = e4.slice(o, l)), i3.ext = e4.slice(s, l)), o > 0 ? i3.dir = e4.slice(0, o - 1) : a && (i3.dir = "/"), i3;
          }, sep: "/", delimiter: ":", win32: null, posix: null };
          i2.posix = i2, e3.exports = i2;
        } }, r2 = {};
        function i(t2) {
          var n = r2[t2];
          if (void 0 !== n) return n.exports;
          var a = r2[t2] = { exports: {} }, s = true;
          try {
            e2[t2](a, a.exports, i), s = false;
          } finally {
            s && delete r2[t2];
          }
          return a.exports;
        }
        i.ab = "/ROOT/node_modules/next/dist/compiled/path-browserify/", t.exports = i(114);
      }();
    }, 68886, (e, t, r) => {
      t.exports = e.r(54846);
    }, 67914, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/path-to-regexp/");
        var e2 = {};
        (() => {
          function t2(e3, t3) {
            void 0 === t3 && (t3 = {});
            for (var r3 = function(e4) {
              for (var t4 = [], r4 = 0; r4 < e4.length; ) {
                var i3 = e4[r4];
                if ("*" === i3 || "+" === i3 || "?" === i3) {
                  t4.push({ type: "MODIFIER", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("\\" === i3) {
                  t4.push({ type: "ESCAPED_CHAR", index: r4++, value: e4[r4++] });
                  continue;
                }
                if ("{" === i3) {
                  t4.push({ type: "OPEN", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("}" === i3) {
                  t4.push({ type: "CLOSE", index: r4, value: e4[r4++] });
                  continue;
                }
                if (":" === i3) {
                  for (var n2 = "", a3 = r4 + 1; a3 < e4.length; ) {
                    var s3 = e4.charCodeAt(a3);
                    if (s3 >= 48 && s3 <= 57 || s3 >= 65 && s3 <= 90 || s3 >= 97 && s3 <= 122 || 95 === s3) {
                      n2 += e4[a3++];
                      continue;
                    }
                    break;
                  }
                  if (!n2) throw TypeError("Missing parameter name at ".concat(r4));
                  t4.push({ type: "NAME", index: r4, value: n2 }), r4 = a3;
                  continue;
                }
                if ("(" === i3) {
                  var o3 = 1, l2 = "", a3 = r4 + 1;
                  if ("?" === e4[a3]) throw TypeError('Pattern cannot start with "?" at '.concat(a3));
                  for (; a3 < e4.length; ) {
                    if ("\\" === e4[a3]) {
                      l2 += e4[a3++] + e4[a3++];
                      continue;
                    }
                    if (")" === e4[a3]) {
                      if (0 == --o3) {
                        a3++;
                        break;
                      }
                    } else if ("(" === e4[a3] && (o3++, "?" !== e4[a3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(a3));
                    l2 += e4[a3++];
                  }
                  if (o3) throw TypeError("Unbalanced pattern at ".concat(r4));
                  if (!l2) throw TypeError("Missing pattern at ".concat(r4));
                  t4.push({ type: "PATTERN", index: r4, value: l2 }), r4 = a3;
                  continue;
                }
                t4.push({ type: "CHAR", index: r4, value: e4[r4++] });
              }
              return t4.push({ type: "END", index: r4, value: "" }), t4;
            }(e3), i2 = t3.prefixes, a2 = void 0 === i2 ? "./" : i2, s2 = t3.delimiter, o2 = void 0 === s2 ? "/#?" : s2, l = [], c = 0, u = 0, d = "", h = function(e4) {
              if (u < r3.length && r3[u].type === e4) return r3[u++].value;
            }, p = function(e4) {
              var t4 = h(e4);
              if (void 0 !== t4) return t4;
              var i3 = r3[u], n2 = i3.type, a3 = i3.index;
              throw TypeError("Unexpected ".concat(n2, " at ").concat(a3, ", expected ").concat(e4));
            }, f = function() {
              for (var e4, t4 = ""; e4 = h("CHAR") || h("ESCAPED_CHAR"); ) t4 += e4;
              return t4;
            }, m = function(e4) {
              for (var t4 = 0; t4 < o2.length; t4++) {
                var r4 = o2[t4];
                if (e4.indexOf(r4) > -1) return true;
              }
              return false;
            }, g = function(e4) {
              var t4 = l[l.length - 1], r4 = e4 || (t4 && "string" == typeof t4 ? t4 : "");
              if (t4 && !r4) throw TypeError('Must have text between two parameters, missing text after "'.concat(t4.name, '"'));
              return !r4 || m(r4) ? "[^".concat(n(o2), "]+?") : "(?:(?!".concat(n(r4), ")[^").concat(n(o2), "])+?");
            }; u < r3.length; ) {
              var y = h("CHAR"), b = h("NAME"), w = h("PATTERN");
              if (b || w) {
                var v = y || "";
                -1 === a2.indexOf(v) && (d += v, v = ""), d && (l.push(d), d = ""), l.push({ name: b || c++, prefix: v, suffix: "", pattern: w || g(v), modifier: h("MODIFIER") || "" });
                continue;
              }
              var _ = y || h("ESCAPED_CHAR");
              if (_) {
                d += _;
                continue;
              }
              if (d && (l.push(d), d = ""), h("OPEN")) {
                var v = f(), S = h("NAME") || "", E = h("PATTERN") || "", x = f();
                p("CLOSE"), l.push({ name: S || (E ? c++ : ""), pattern: S && !E ? g(v) : E, prefix: v, suffix: x, modifier: h("MODIFIER") || "" });
                continue;
              }
              p("END");
            }
            return l;
          }
          function r2(e3, t3) {
            void 0 === t3 && (t3 = {});
            var r3 = a(t3), i2 = t3.encode, n2 = void 0 === i2 ? function(e4) {
              return e4;
            } : i2, s2 = t3.validate, o2 = void 0 === s2 || s2, l = e3.map(function(e4) {
              if ("object" == typeof e4) return new RegExp("^(?:".concat(e4.pattern, ")$"), r3);
            });
            return function(t4) {
              for (var r4 = "", i3 = 0; i3 < e3.length; i3++) {
                var a2 = e3[i3];
                if ("string" == typeof a2) {
                  r4 += a2;
                  continue;
                }
                var s3 = t4 ? t4[a2.name] : void 0, c = "?" === a2.modifier || "*" === a2.modifier, u = "*" === a2.modifier || "+" === a2.modifier;
                if (Array.isArray(s3)) {
                  if (!u) throw TypeError('Expected "'.concat(a2.name, '" to not repeat, but got an array'));
                  if (0 === s3.length) {
                    if (c) continue;
                    throw TypeError('Expected "'.concat(a2.name, '" to not be empty'));
                  }
                  for (var d = 0; d < s3.length; d++) {
                    var h = n2(s3[d], a2);
                    if (o2 && !l[i3].test(h)) throw TypeError('Expected all "'.concat(a2.name, '" to match "').concat(a2.pattern, '", but got "').concat(h, '"'));
                    r4 += a2.prefix + h + a2.suffix;
                  }
                  continue;
                }
                if ("string" == typeof s3 || "number" == typeof s3) {
                  var h = n2(String(s3), a2);
                  if (o2 && !l[i3].test(h)) throw TypeError('Expected "'.concat(a2.name, '" to match "').concat(a2.pattern, '", but got "').concat(h, '"'));
                  r4 += a2.prefix + h + a2.suffix;
                  continue;
                }
                if (!c) {
                  var p = u ? "an array" : "a string";
                  throw TypeError('Expected "'.concat(a2.name, '" to be ').concat(p));
                }
              }
              return r4;
            };
          }
          function i(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            var i2 = r3.decode, n2 = void 0 === i2 ? function(e4) {
              return e4;
            } : i2;
            return function(r4) {
              var i3 = e3.exec(r4);
              if (!i3) return false;
              for (var a2 = i3[0], s2 = i3.index, o2 = /* @__PURE__ */ Object.create(null), l = 1; l < i3.length; l++) !function(e4) {
                if (void 0 !== i3[e4]) {
                  var r5 = t3[e4 - 1];
                  "*" === r5.modifier || "+" === r5.modifier ? o2[r5.name] = i3[e4].split(r5.prefix + r5.suffix).map(function(e5) {
                    return n2(e5, r5);
                  }) : o2[r5.name] = n2(i3[e4], r5);
                }
              }(l);
              return { path: a2, index: s2, params: o2 };
            };
          }
          function n(e3) {
            return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
          }
          function a(e3) {
            return e3 && e3.sensitive ? "" : "i";
          }
          function s(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            for (var i2 = r3.strict, s2 = void 0 !== i2 && i2, o2 = r3.start, l = r3.end, c = r3.encode, u = void 0 === c ? function(e4) {
              return e4;
            } : c, d = r3.delimiter, h = r3.endsWith, p = "[".concat(n(void 0 === h ? "" : h), "]|$"), f = "[".concat(n(void 0 === d ? "/#?" : d), "]"), m = void 0 === o2 || o2 ? "^" : "", g = 0; g < e3.length; g++) {
              var y = e3[g];
              if ("string" == typeof y) m += n(u(y));
              else {
                var b = n(u(y.prefix)), w = n(u(y.suffix));
                if (y.pattern) if (t3 && t3.push(y), b || w) if ("+" === y.modifier || "*" === y.modifier) {
                  var v = "*" === y.modifier ? "?" : "";
                  m += "(?:".concat(b, "((?:").concat(y.pattern, ")(?:").concat(w).concat(b, "(?:").concat(y.pattern, "))*)").concat(w, ")").concat(v);
                } else m += "(?:".concat(b, "(").concat(y.pattern, ")").concat(w, ")").concat(y.modifier);
                else {
                  if ("+" === y.modifier || "*" === y.modifier) throw TypeError('Can not repeat "'.concat(y.name, '" without a prefix and suffix'));
                  m += "(".concat(y.pattern, ")").concat(y.modifier);
                }
                else m += "(?:".concat(b).concat(w, ")").concat(y.modifier);
              }
            }
            if (void 0 === l || l) s2 || (m += "".concat(f, "?")), m += r3.endsWith ? "(?=".concat(p, ")") : "$";
            else {
              var _ = e3[e3.length - 1], S = "string" == typeof _ ? f.indexOf(_[_.length - 1]) > -1 : void 0 === _;
              s2 || (m += "(?:".concat(f, "(?=").concat(p, "))?")), S || (m += "(?=".concat(f, "|").concat(p, ")"));
            }
            return new RegExp(m, a(r3));
          }
          function o(e3, r3, i2) {
            if (e3 instanceof RegExp) {
              var n2;
              if (!r3) return e3;
              for (var l = /\((?:\?<(.*?)>)?(?!\?)/g, c = 0, u = l.exec(e3.source); u; ) r3.push({ name: u[1] || c++, prefix: "", suffix: "", modifier: "", pattern: "" }), u = l.exec(e3.source);
              return e3;
            }
            return Array.isArray(e3) ? (n2 = e3.map(function(e4) {
              return o(e4, r3, i2).source;
            }), new RegExp("(?:".concat(n2.join("|"), ")"), a(i2))) : s(t2(e3, i2), r3, i2);
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.pathToRegexp = e2.tokensToRegexp = e2.regexpToFunction = e2.match = e2.tokensToFunction = e2.compile = e2.parse = void 0, e2.parse = t2, e2.compile = function(e3, i2) {
            return r2(t2(e3, i2), i2);
          }, e2.tokensToFunction = r2, e2.match = function(e3, t3) {
            var r3 = [];
            return i(o(e3, r3, t3), r3, t3);
          }, e2.regexpToFunction = i, e2.tokensToRegexp = s, e2.pathToRegexp = o;
        })(), t.exports = e2;
      })();
    }, 64445, (e, t, r) => {
      var i = { 226: function(t2, r2) {
        !function(i2) {
          "use strict";
          var n2 = "function", a2 = "undefined", s = "object", o = "string", l = "major", c = "model", u = "name", d = "type", h = "vendor", p = "version", f = "architecture", m = "console", g = "mobile", y = "tablet", b = "smarttv", w = "wearable", v = "embedded", _ = "Amazon", S = "Apple", E = "ASUS", x = "BlackBerry", T = "Browser", C = "Chrome", A = "Firefox", P = "Google", k = "Huawei", R = "Microsoft", O = "Motorola", N = "Opera", I = "Samsung", $ = "Sharp", D = "Sony", L = "Xiaomi", U = "Zebra", j = "Facebook", M = "Chromium OS", B = "Mac OS", H = function(e2, t3) {
            var r3 = {};
            for (var i3 in e2) t3[i3] && t3[i3].length % 2 == 0 ? r3[i3] = t3[i3].concat(e2[i3]) : r3[i3] = e2[i3];
            return r3;
          }, q = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, F = function(e2, t3) {
            return typeof e2 === o && -1 !== W(t3).indexOf(W(e2));
          }, W = function(e2) {
            return e2.toLowerCase();
          }, K = function(e2, t3) {
            if (typeof e2 === o) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === a2 ? e2 : e2.substring(0, 350);
          }, V = function(e2, t3) {
            for (var r3, i3, a3, o2, l2, c2, u2 = 0; u2 < t3.length && !l2; ) {
              var d2 = t3[u2], h2 = t3[u2 + 1];
              for (r3 = i3 = 0; r3 < d2.length && !l2 && d2[r3]; ) if (l2 = d2[r3++].exec(e2)) for (a3 = 0; a3 < h2.length; a3++) c2 = l2[++i3], typeof (o2 = h2[a3]) === s && o2.length > 0 ? 2 === o2.length ? typeof o2[1] == n2 ? this[o2[0]] = o2[1].call(this, c2) : this[o2[0]] = o2[1] : 3 === o2.length ? typeof o2[1] !== n2 || o2[1].exec && o2[1].test ? this[o2[0]] = c2 ? c2.replace(o2[1], o2[2]) : void 0 : this[o2[0]] = c2 ? o2[1].call(this, c2, o2[2]) : void 0 : 4 === o2.length && (this[o2[0]] = c2 ? o2[3].call(this, c2.replace(o2[1], o2[2])) : void 0) : this[o2] = c2 || void 0;
              u2 += 2;
            }
          }, z = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === s && t3[r3].length > 0) {
              for (var i3 = 0; i3 < t3[r3].length; i3++) if (F(t3[r3][i3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (F(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, Q = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, J = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [p, [u, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [p, [u, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [u, p], [/opios[\/ ]+([\w\.]+)/i], [p, [u, N + " Mini"]], [/\bopr\/([\w\.]+)/i], [p, [u, N]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [u, p], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [p, [u, "UC" + T]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [p, [u, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [p, [u, "WeChat"]], [/konqueror\/([\w\.]+)/i], [p, [u, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [p, [u, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [p, [u, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[u, /(.+)/, "$1 Secure " + T], p], [/\bfocus\/([\w\.]+)/i], [p, [u, A + " Focus"]], [/\bopt\/([\w\.]+)/i], [p, [u, N + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [p, [u, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [p, [u, "Dolphin"]], [/coast\/([\w\.]+)/i], [p, [u, N + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [p, [u, "MIUI " + T]], [/fxios\/([-\w\.]+)/i], [p, [u, A]], [/\bqihu|(qi?ho?o?|360)browser/i], [[u, "360 " + T]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[u, /(.+)/, "$1 " + T], p], [/(comodo_dragon)\/([\w\.]+)/i], [[u, /_/g, " "], p], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [u, p], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [u], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[u, j], p], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [u, p], [/\bgsa\/([\w\.]+) .*safari\//i], [p, [u, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [p, [u, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [p, [u, C + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[u, C + " WebView"], p], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [p, [u, "Android " + T]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [u, p], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [p, [u, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [p, u], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [u, [p, z, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [u, p], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[u, "Netscape"], p], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [p, [u, A + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [u, p], [/(cobalt)\/([\w\.]+)/i], [u, [p, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[f, "amd64"]], [/(ia32(?=;))/i], [[f, W]], [/((?:i[346]|x)86)[;\)]/i], [[f, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[f, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[f, "armhf"]], [/windows (ce|mobile); ppc;/i], [[f, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[f, /ower/, "", W]], [/(sun4\w)[;\)]/i], [[f, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[f, W]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [c, [h, I], [d, y]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [c, [h, I], [d, g]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [c, [h, S], [d, g]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [c, [h, S], [d, y]], [/(macintosh);/i], [c, [h, S]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [c, [h, $], [d, g]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [c, [h, k], [d, y]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [c, [h, k], [d, g]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[c, /_/g, " "], [h, L], [d, g]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[c, /_/g, " "], [h, L], [d, y]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [c, [h, "OPPO"], [d, g]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [c, [h, "Vivo"], [d, g]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [c, [h, "Realme"], [d, g]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [c, [h, O], [d, g]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [c, [h, O], [d, y]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [c, [h, "LG"], [d, y]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [c, [h, "LG"], [d, g]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [c, [h, "Lenovo"], [d, y]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[c, /_/g, " "], [h, "Nokia"], [d, g]], [/(pixel c)\b/i], [c, [h, P], [d, y]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [c, [h, P], [d, g]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [c, [h, D], [d, g]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[c, "Xperia Tablet"], [h, D], [d, y]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [c, [h, "OnePlus"], [d, g]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [c, [h, _], [d, y]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[c, /(.+)/g, "Fire Phone $1"], [h, _], [d, g]], [/(playbook);[-\w\),; ]+(rim)/i], [c, h, [d, y]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [c, [h, x], [d, g]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [c, [h, E], [d, y]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [c, [h, E], [d, g]], [/(nexus 9)/i], [c, [h, "HTC"], [d, y]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [h, [c, /_/g, " "], [d, g]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [c, [h, "Acer"], [d, y]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [c, [h, "Meizu"], [d, g]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [h, c, [d, g]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [h, c, [d, y]], [/(surface duo)/i], [c, [h, R], [d, y]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [c, [h, "Fairphone"], [d, g]], [/(u304aa)/i], [c, [h, "AT&T"], [d, g]], [/\bsie-(\w*)/i], [c, [h, "Siemens"], [d, g]], [/\b(rct\w+) b/i], [c, [h, "RCA"], [d, y]], [/\b(venue[\d ]{2,7}) b/i], [c, [h, "Dell"], [d, y]], [/\b(q(?:mv|ta)\w+) b/i], [c, [h, "Verizon"], [d, y]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [c, [h, "Barnes & Noble"], [d, y]], [/\b(tm\d{3}\w+) b/i], [c, [h, "NuVision"], [d, y]], [/\b(k88) b/i], [c, [h, "ZTE"], [d, y]], [/\b(nx\d{3}j) b/i], [c, [h, "ZTE"], [d, g]], [/\b(gen\d{3}) b.+49h/i], [c, [h, "Swiss"], [d, g]], [/\b(zur\d{3}) b/i], [c, [h, "Swiss"], [d, y]], [/\b((zeki)?tb.*\b) b/i], [c, [h, "Zeki"], [d, y]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[h, "Dragon Touch"], c, [d, y]], [/\b(ns-?\w{0,9}) b/i], [c, [h, "Insignia"], [d, y]], [/\b((nxa|next)-?\w{0,9}) b/i], [c, [h, "NextBook"], [d, y]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[h, "Voice"], c, [d, g]], [/\b(lvtel\-)?(v1[12]) b/i], [[h, "LvTel"], c, [d, g]], [/\b(ph-1) /i], [c, [h, "Essential"], [d, g]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [c, [h, "Envizen"], [d, y]], [/\b(trio[-\w\. ]+) b/i], [c, [h, "MachSpeed"], [d, y]], [/\btu_(1491) b/i], [c, [h, "Rotor"], [d, y]], [/(shield[\w ]+) b/i], [c, [h, "Nvidia"], [d, y]], [/(sprint) (\w+)/i], [h, c, [d, g]], [/(kin\.[onetw]{3})/i], [[c, /\./g, " "], [h, R], [d, g]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [c, [h, U], [d, y]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [c, [h, U], [d, g]], [/smart-tv.+(samsung)/i], [h, [d, b]], [/hbbtv.+maple;(\d+)/i], [[c, /^/, "SmartTV"], [h, I], [d, b]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[h, "LG"], [d, b]], [/(apple) ?tv/i], [h, [c, S + " TV"], [d, b]], [/crkey/i], [[c, C + "cast"], [h, P], [d, b]], [/droid.+aft(\w)( bui|\))/i], [c, [h, _], [d, b]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [c, [h, $], [d, b]], [/(bravia[\w ]+)( bui|\))/i], [c, [h, D], [d, b]], [/(mitv-\w{5}) bui/i], [c, [h, L], [d, b]], [/Hbbtv.*(technisat) (.*);/i], [h, c, [d, b]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[h, K], [c, K], [d, b]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[d, b]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [h, c, [d, m]], [/droid.+; (shield) bui/i], [c, [h, "Nvidia"], [d, m]], [/(playstation [345portablevi]+)/i], [c, [h, D], [d, m]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [c, [h, R], [d, m]], [/((pebble))app/i], [h, c, [d, w]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [c, [h, S], [d, w]], [/droid.+; (glass) \d/i], [c, [h, P], [d, w]], [/droid.+; (wt63?0{2,3})\)/i], [c, [h, U], [d, w]], [/(quest( 2| pro)?)/i], [c, [h, j], [d, w]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [h, [d, v]], [/(aeobc)\b/i], [c, [h, _], [d, v]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [c, [d, g]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [c, [d, y]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[d, y]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[d, g]], [/(android[-\w\. ]{0,9});.+buil/i], [c, [h, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [p, [u, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [p, [u, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [u, p], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [p, u]], os: [[/microsoft (windows) (vista|xp)/i], [u, p], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [u, [p, z, Q]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[u, "Windows"], [p, z, Q]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[p, /_/g, "."], [u, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[u, B], [p, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [p, u], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [u, p], [/\(bb(10);/i], [p, [u, x]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [p, [u, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [p, [u, A + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [p, [u, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [p, [u, "watchOS"]], [/crkey\/([\d\.]+)/i], [p, [u, C + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[u, M], p], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [u, p], [/(sunos) ?([\w\.\d]*)/i], [[u, "Solaris"], p], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [u, p]] }, G = function(e2, t3) {
            if (typeof e2 === s && (t3 = e2, e2 = void 0), !(this instanceof G)) return new G(e2, t3).getResult();
            var r3 = typeof i2 !== a2 && i2.navigator ? i2.navigator : void 0, m2 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), b2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, w2 = t3 ? H(J, t3) : J, v2 = r3 && r3.userAgent == m2;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[u] = void 0, t4[p] = void 0, V.call(t4, m2, w2.browser), t4[l] = typeof (e3 = t4[p]) === o ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, v2 && r3 && r3.brave && typeof r3.brave.isBrave == n2 && (t4[u] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[f] = void 0, V.call(e3, m2, w2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[h] = void 0, e3[c] = void 0, e3[d] = void 0, V.call(e3, m2, w2.device), v2 && !e3[d] && b2 && b2.mobile && (e3[d] = g), v2 && "Macintosh" == e3[c] && r3 && typeof r3.standalone !== a2 && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[c] = "iPad", e3[d] = y), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[u] = void 0, e3[p] = void 0, V.call(e3, m2, w2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[u] = void 0, e3[p] = void 0, V.call(e3, m2, w2.os), v2 && !e3[u] && b2 && "Unknown" != b2.platform && (e3[u] = b2.platform.replace(/chrome os/i, M).replace(/macos/i, B)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return m2;
            }, this.setUA = function(e3) {
              return m2 = typeof e3 === o && e3.length > 350 ? K(e3, 350) : e3, this;
            }, this.setUA(m2), this;
          };
          if (G.VERSION = "1.0.35", G.BROWSER = q([u, p, l]), G.CPU = q([f]), G.DEVICE = q([c, h, d, m, g, b, y, w, v]), G.ENGINE = G.OS = q([u, p]), typeof r2 !== a2) t2.exports && (r2 = t2.exports = G), r2.UAParser = G;
          else if (typeof define === n2 && define.amd) e.r, void 0 !== G && e.v(G);
          else typeof i2 !== a2 && (i2.UAParser = G);
          var X = typeof i2 !== a2 && (i2.jQuery || i2.Zepto);
          if (X && !X.ua) {
            var Y = new G();
            X.ua = Y.getResult(), X.ua.get = function() {
              return Y.getUA();
            }, X.ua.set = function(e2) {
              Y.setUA(e2);
              var t3 = Y.getResult();
              for (var r3 in t3) X.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, n = {};
      function a(e2) {
        var t2 = n[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = n[e2] = { exports: {} }, s = true;
        try {
          i[e2].call(r2.exports, r2, r2.exports, a), s = false;
        } finally {
          s && delete n[e2];
        }
        return r2.exports;
      }
      a.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = a(226);
    }, 52069, (e, t, r) => {
      "use strict";
      var i = { H: null, A: null };
      function n(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var a = Array.isArray;
      function s() {
      }
      var o = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), f = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), y = Symbol.for("react.view_transition"), b = Symbol.iterator, w = Object.prototype.hasOwnProperty, v = Object.assign;
      function _(e2, t2, r2) {
        var i2 = r2.ref;
        return { $$typeof: o, type: e2, key: t2, ref: void 0 !== i2 ? i2 : null, props: r2 };
      }
      function S(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === o;
      }
      var E = /\/+/g;
      function x(e2, t2) {
        var r2, i2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, i2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return i2[e3];
        })) : t2.toString(36);
      }
      function T(e2, t2, r2) {
        if (null == e2) return e2;
        var i2 = [], c2 = 0;
        return !function e3(t3, r3, i3, c3, u2) {
          var d2, h2, p2, f2 = typeof t3;
          ("undefined" === f2 || "boolean" === f2) && (t3 = null);
          var g2 = false;
          if (null === t3) g2 = true;
          else switch (f2) {
            case "bigint":
            case "string":
            case "number":
              g2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case o:
                case l:
                  g2 = true;
                  break;
                case m:
                  return e3((g2 = t3._init)(t3._payload), r3, i3, c3, u2);
              }
          }
          if (g2) return u2 = u2(t3), g2 = "" === c3 ? "." + x(t3, 0) : c3, a(u2) ? (i3 = "", null != g2 && (i3 = g2.replace(E, "$&/") + "/"), e3(u2, r3, i3, "", function(e4) {
            return e4;
          })) : null != u2 && (S(u2) && (d2 = u2, h2 = i3 + (null == u2.key || t3 && t3.key === u2.key ? "" : ("" + u2.key).replace(E, "$&/") + "/") + g2, u2 = _(d2.type, h2, d2.props)), r3.push(u2)), 1;
          g2 = 0;
          var y2 = "" === c3 ? "." : c3 + ":";
          if (a(t3)) for (var w2 = 0; w2 < t3.length; w2++) f2 = y2 + x(c3 = t3[w2], w2), g2 += e3(c3, r3, i3, f2, u2);
          else if ("function" == typeof (w2 = null === (p2 = t3) || "object" != typeof p2 ? null : "function" == typeof (p2 = b && p2[b] || p2["@@iterator"]) ? p2 : null)) for (t3 = w2.call(t3), w2 = 0; !(c3 = t3.next()).done; ) f2 = y2 + x(c3 = c3.value, w2++), g2 += e3(c3, r3, i3, f2, u2);
          else if ("object" === f2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(s, s) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, i3, c3, u2);
            throw Error(n(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return g2;
        }(e2, i2, "", "", function(e3) {
          return t2.call(r2, e3, c2++);
        }), i2;
      }
      function C(e2) {
        if (-1 === e2._status) {
          var t2 = (0, e2._result)();
          t2.then(function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = r2, void 0 === t2.status && (t2.status = "fulfilled", t2.value = r2));
          }, function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = r2, void 0 === t2.status && (t2.status = "rejected", t2.reason = r2));
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function A() {
        return /* @__PURE__ */ new WeakMap();
      }
      function P() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = g, r.Children = { map: T, forEach: function(e2, t2, r2) {
        T(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return T(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return T(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!S(e2)) throw Error(n(143));
        return e2;
      } }, r.Fragment = c, r.Profiler = d, r.StrictMode = u, r.Suspense = p, r.ViewTransition = y, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, r.cache = function(e2) {
        return function() {
          var t2 = i.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(A);
          void 0 === (t2 = r2.get(e2)) && (t2 = P(), r2.set(e2, t2)), r2 = 0;
          for (var n2 = arguments.length; r2 < n2; r2++) {
            var a2 = arguments[r2];
            if ("function" == typeof a2 || "object" == typeof a2 && null !== a2) {
              var s2 = t2.o;
              null === s2 && (t2.o = s2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = s2.get(a2)) && (t2 = P(), s2.set(a2, t2));
            } else null === (s2 = t2.p) && (t2.p = s2 = /* @__PURE__ */ new Map()), void 0 === (t2 = s2.get(a2)) && (t2 = P(), s2.set(a2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var o2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = o2;
          } catch (e3) {
            throw (o2 = t2).s = 2, o2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = i.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(n(267, e2));
        var i2 = v({}, e2.props), a2 = e2.key;
        if (null != t2) for (s2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) w.call(t2, s2) && "key" !== s2 && "__self" !== s2 && "__source" !== s2 && ("ref" !== s2 || void 0 !== t2.ref) && (i2[s2] = t2[s2]);
        var s2 = arguments.length - 2;
        if (1 === s2) i2.children = r2;
        else if (1 < s2) {
          for (var o2 = Array(s2), l2 = 0; l2 < s2; l2++) o2[l2] = arguments[l2 + 2];
          i2.children = o2;
        }
        return _(e2.type, a2, i2);
      }, r.createElement = function(e2, t2, r2) {
        var i2, n2 = {}, a2 = null;
        if (null != t2) for (i2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) w.call(t2, i2) && "key" !== i2 && "__self" !== i2 && "__source" !== i2 && (n2[i2] = t2[i2]);
        var s2 = arguments.length - 2;
        if (1 === s2) n2.children = r2;
        else if (1 < s2) {
          for (var o2 = Array(s2), l2 = 0; l2 < s2; l2++) o2[l2] = arguments[l2 + 2];
          n2.children = o2;
        }
        if (e2 && e2.defaultProps) for (i2 in s2 = e2.defaultProps) void 0 === n2[i2] && (n2[i2] = s2[i2]);
        return _(e2, a2, n2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: h, render: e2 };
      }, r.isValidElement = S, r.lazy = function(e2) {
        return { $$typeof: m, _payload: { _status: -1, _result: e2 }, _init: C };
      }, r.memo = function(e2, t2) {
        return { $$typeof: f, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return i.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return i.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return i.H.useId();
      }, r.useMemo = function(e2, t2) {
        return i.H.useMemo(e2, t2);
      }, r.version = "19.3.0-canary-3f0b9e61-20260317";
    }, 40049, (e, t, r) => {
      "use strict";
      t.exports = e.r(52069);
    }, 7754, 46478, 9939, 25753, 38174, 53835, 18368, 63072, 51564, 16852, 75982, (e) => {
      "use strict";
      var t, r, i = e.i(90044);
      let n = (0, i.createAsyncLocalStorage)();
      e.s(["workAsyncStorageInstance", 0, n], 46478), e.s([], 7754);
      let a = (0, i.createAsyncLocalStorage)();
      e.s(["workUnitAsyncStorageInstance", 0, a], 9939), e.s(["InvariantError", 0, class extends Error {
        constructor(e2, t2) {
          super(`Invariant: ${e2.endsWith(".") ? e2 : e2 + "."} This is a bug in Next.js.`, t2), this.name = "InvariantError";
        }
      }], 25753);
      var s = ((t = {})[t.Before = 1] = "Before", t[t.EarlyStatic = 2] = "EarlyStatic", t[t.Static = 3] = "Static", t[t.EarlyRuntime = 4] = "EarlyRuntime", t[t.Runtime = 5] = "Runtime", t[t.Dynamic = 6] = "Dynamic", t[t.Abandoned = 7] = "Abandoned", t);
      e.s(["RenderStage", 0, s], 38174), e.s(["getPrerenderResumeDataCache", 0, function(e2) {
        switch (e2.type) {
          case "prerender":
          case "prerender-runtime":
          case "prerender-ppr":
          case "prerender-client":
          case "validation-client":
            return e2.prerenderResumeDataCache;
          case "request":
            if (e2.prerenderResumeDataCache) return e2.prerenderResumeDataCache;
          case "prerender-legacy":
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "generate-static-params":
            return null;
          default:
            return e2;
        }
      }, "getRenderResumeDataCache", 0, function(e2) {
        switch (e2.type) {
          case "request":
          case "prerender":
          case "prerender-runtime":
          case "prerender-client":
          case "validation-client":
            if (e2.renderResumeDataCache) return e2.renderResumeDataCache;
          case "prerender-ppr":
            return e2.prerenderResumeDataCache ?? null;
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-legacy":
          case "generate-static-params":
            return null;
          default:
            return e2;
        }
      }, "isInEarlyRenderStage", 0, function(e2) {
        let t2 = e2.stagedRendering;
        return !!t2 && (t2.currentStage === s.EarlyStatic || t2.currentStage === s.EarlyRuntime);
      }, "throwForMissingRequestStore", 0, function(e2) {
        throw Object.defineProperty(Error(`\`${e2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
      }], 53835);
      var o = e.i(40049);
      let l = "DYNAMIC_SERVER_USAGE";
      class c extends Error {
        constructor(e2) {
          super(`Dynamic server usage: ${e2}`), this.description = e2, this.digest = l;
        }
      }
      e.s(["DynamicServerError", 0, c, "isDynamicServerError", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && "string" == typeof e2.digest && e2.digest === l;
      }], 18368);
      let u = "function" == typeof o.default.unstable_postpone;
      function d(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function h(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === h(d("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      let p = "NEXT_PRERENDER_INTERRUPTED";
      function f(e2) {
        let t2 = Object.defineProperty(Error(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return t2.digest = p, t2;
      }
      RegExp("\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)"), RegExp("\\n\\s+at __next_metadata_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_viewport_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_outlet_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_instant_validation_boundary__[\\n\\s]"), e.s(["abortAndThrowOnSynchronousRequestDataAccess", 0, function(e2, t2, r2, i2) {
        if (false === i2.controller.signal.aborted) {
          let n2, a2;
          n2 = f(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`), i2.controller.abort(n2), (a2 = i2.dynamicTracking) && a2.dynamicAccesses.push({ stack: a2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 });
          let s2 = i2.dynamicTracking;
          s2 && null === s2.syncDynamicErrorWithStack && (s2.syncDynamicErrorWithStack = r2);
        }
        throw f(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }, "isDynamicPostpone", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && "string" == typeof e2.message && h(e2.message);
      }, "isPrerenderInterruptedError", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && e2.digest === p && "name" in e2 && "message" in e2 && e2 instanceof Error;
      }, "postponeWithTracking", 0, function(e2, t2, r2) {
        (function() {
          if (!u) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), r2 && r2.dynamicAccesses.push({ stack: r2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 }), o.default.unstable_postpone(d(e2, t2));
      }, "throwToInterruptStaticGeneration", 0, function(e2, t2, r2) {
        let i2 = Object.defineProperty(new c(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw r2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = i2.stack, i2;
      }, "trackDynamicDataInDynamicRender", 0, function(e2) {
        switch (e2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
        }
      }], 63072);
      let m = "HANGING_PROMISE_REJECTION";
      class g extends Error {
        constructor(e2, t2) {
          super(`During prerendering, ${t2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${e2}".`), this.route = e2, this.expression = t2, this.digest = m;
        }
      }
      let y = /* @__PURE__ */ new WeakMap();
      function b() {
      }
      e.s(["delayUntilRuntimeStage", 0, function(e2, t2) {
        let { stagedRendering: r2 } = e2;
        return r2 ? r2.waitForStage(r2.currentStage === s.EarlyStatic || r2.currentStage === s.EarlyRuntime ? s.EarlyRuntime : s.Runtime).then(() => t2) : t2;
      }, "isHangingPromiseRejectionError", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === m;
      }, "makeDevtoolsIOAwarePromise", 0, function(e2, t2, r2) {
        return t2.stagedRendering ? t2.stagedRendering.delayUntilStage(r2, void 0, e2) : new Promise((t3) => {
          setTimeout(() => {
            t3(e2);
          }, 0);
        });
      }, "makeHangingPromise", 0, function(e2, t2, r2) {
        if (e2.aborted) return Promise.reject(new g(t2, r2));
        {
          let i2 = new Promise((i3, n2) => {
            let a2 = n2.bind(null, new g(t2, r2)), s2 = y.get(e2);
            if (s2) s2.push(a2);
            else {
              let t3 = [a2];
              y.set(e2, t3), e2.addEventListener("abort", () => {
                for (let e3 = 0; e3 < t3.length; e3++) t3[e3]();
              }, { once: true });
            }
          });
          return i2.catch(b), i2;
        }
      }], 51564);
      var w = ((r = {})[r.SeeOther = 303] = "SeeOther", r[r.TemporaryRedirect = 307] = "TemporaryRedirect", r[r.PermanentRedirect = 308] = "PermanentRedirect", r);
      e.s(["RedirectStatusCode", 0, w], 16852);
      let v = "NEXT_REDIRECT";
      e.s(["REDIRECT_ERROR_CODE", 0, v, "isRedirectError", 0, function(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let t2 = e2.digest.split(";"), [r2, i2] = t2, n2 = t2.slice(2, -2).join(";"), a2 = Number(t2.at(-2));
        return r2 === v && ("replace" === i2 || "push" === i2) && "string" == typeof n2 && !isNaN(a2) && a2 in w;
      }], 75982);
    }, 91375, (e) => {
      "use strict";
      let t = (0, e.i(90044).createAsyncLocalStorage)();
      e.s([], 92999), e.i(92999), e.s(["actionAsyncStorage", 0, t], 91375);
    }, 82748, (e) => {
      "use strict";
      var t = e.i(51564);
      let r = Symbol.for("react.postpone"), i = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 }));
      var n = e.i(75982), a = e.i(63072), s = e.i(18368);
      e.s(["unstable_rethrow", 0, function e2(o) {
        if ((0, n.isRedirectError)(o) || function(e3) {
          if ("object" != typeof e3 || null === e3 || !("digest" in e3) || "string" != typeof e3.digest) return false;
          let [t2, r2] = e3.digest.split(";");
          return "NEXT_HTTP_ERROR_FALLBACK" === t2 && i.has(Number(r2));
        }(o) || "object" == typeof o && null !== o && "digest" in o && "BAILOUT_TO_CLIENT_SIDE_RENDERING" === o.digest || (0, s.isDynamicServerError)(o) || (0, a.isDynamicPostpone)(o) || "object" == typeof o && null !== o && o.$$typeof === r || (0, t.isHangingPromiseRejectionError)(o) || (0, a.isPrerenderInterruptedError)(o)) throw o;
        o instanceof Error && "cause" in o && e2(o.cause);
      }], 82748);
    }, 42738, (e) => {
      "use strict";
      let t, r, i, n, a, s, o, l, c, u;
      async function d() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.i(74398);
      let h = null;
      async function p() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        h || (h = d());
        let e10 = await h;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function f(...e10) {
        let t10 = await d();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let m = null;
      function g() {
        return m || (m = p()), m;
      }
      function y(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Object.defineProperty(Error(y(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(y(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r10, i10, n10) {
            if ("function" == typeof n10[0]) return n10[0](t10);
            throw Object.defineProperty(Error(y(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      g();
      class b extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class w extends Error {
        constructor() {
          super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  ");
        }
      }
      class v extends Error {
        constructor() {
          super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  ");
        }
      }
      let _ = "x-prerender-revalidate", S = ".meta", E = "x-next-cache-tags", x = "x-next-revalidated-tags", T = "_N_T_", C = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function A(e10) {
        var t10, r10, i10, n10, a10, s10 = [], o10 = 0;
        function l10() {
          for (; o10 < e10.length && /\s/.test(e10.charAt(o10)); ) o10 += 1;
          return o10 < e10.length;
        }
        for (; o10 < e10.length; ) {
          for (t10 = o10, a10 = false; l10(); ) if ("," === (r10 = e10.charAt(o10))) {
            for (i10 = o10, o10 += 1, l10(), n10 = o10; o10 < e10.length && "=" !== (r10 = e10.charAt(o10)) && ";" !== r10 && "," !== r10; ) o10 += 1;
            o10 < e10.length && "=" === e10.charAt(o10) ? (a10 = true, o10 = n10, s10.push(e10.substring(t10, i10)), t10 = o10) : o10 = i10 + 1;
          } else o10 += 1;
          (!a10 || o10 >= e10.length) && s10.push(e10.substring(t10, e10.length));
        }
        return s10;
      }
      function P(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [i10, n10] of e10.entries()) "set-cookie" === i10.toLowerCase() ? (r10.push(...A(n10)), t10[i10] = 1 === r10.length ? r10[0] : r10) : t10[i10] = n10;
        return t10;
      }
      function k(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...C, GROUP: { builtinReact: [C.reactServerComponents, C.actionBrowser], serverOnly: [C.reactServerComponents, C.actionBrowser, C.instrument, C.middleware], neutralTarget: [C.apiNode, C.apiEdge], clientOnly: [C.serverSideRendering, C.appPagesBrowser], bundled: [C.reactServerComponents, C.actionBrowser, C.serverSideRendering, C.appPagesBrowser, C.shared, C.instrument, C.middleware], appPages: [C.reactServerComponents, C.serverSideRendering, C.appPagesBrowser, C.actionBrowser] } });
      let R = Symbol("response"), O = Symbol("passThrough"), N = Symbol("waitUntil");
      class I {
        constructor(e10, t10) {
          this[O] = false, this[N] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[R] || (this[R] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[O] = true;
        }
        waitUntil(e10) {
          if ("external" === this[N].kind) return (0, this[N].function)(e10);
          this[N].promises.push(e10);
        }
      }
      class $ extends I {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new b({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new b({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function D(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function L(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), i10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return i10 || t10 > -1 ? { pathname: e10.substring(0, i10 ? r10 : t10), query: i10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function U(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: i10, hash: n10 } = L(e10);
        return `${t10}${r10}${i10}${n10}`;
      }
      function j(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: i10, hash: n10 } = L(e10);
        return `${r10}${t10}${i10}${n10}`;
      }
      function M(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = L(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let B = /* @__PURE__ */ new WeakMap();
      function H(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let i10 = B.get(t10);
        i10 || (i10 = t10.map((e11) => e11.toLowerCase()), B.set(t10, i10));
        let n10 = e10.split("/", 2);
        if (!n10[1]) return { pathname: e10 };
        let a10 = n10[1].toLowerCase(), s10 = i10.indexOf(a10);
        return s10 < 0 ? { pathname: e10 } : (r10 = t10[s10], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let q = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
      function F(e10, t10) {
        let r10 = new URL(String(e10), t10 && String(t10));
        return q.test(r10.hostname) && (r10.hostname = "localhost"), r10;
      }
      let W = Symbol("NextURLInternal");
      class K {
        constructor(e10, t10, r10) {
          let i10, n10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (i10 = t10, n10 = r10 || {}) : n10 = r10 || t10 || {}, this[W] = { url: F(e10, i10 ?? n10.base), options: n10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, i10, n10;
          let a10 = function(e11, t11) {
            let { basePath: r11, i18n: i11, trailingSlash: n11 } = t11.nextConfig ?? {}, a11 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : n11 };
            r11 && M(a11.pathname, r11) && (a11.pathname = function(e12, t12) {
              if (!M(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            }(a11.pathname, r11), a11.basePath = r11);
            let s11 = a11.pathname;
            if (a11.pathname.startsWith("/_next/data/") && a11.pathname.endsWith(".json")) {
              let e12 = a11.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              a11.buildId = e12[0], s11 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (a11.pathname = s11);
            }
            if (i11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(a11.pathname) : H(a11.pathname, i11.locales);
              a11.locale = e12.detectedLocale, a11.pathname = e12.pathname ?? a11.pathname, !e12.detectedLocale && a11.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(s11) : H(s11, i11.locales)).detectedLocale && (a11.locale = e12.detectedLocale);
            }
            return a11;
          }(this[W].url.pathname, { nextConfig: this[W].options.nextConfig, parseData: true, i18nProvider: this[W].options.i18nProvider }), s10 = function(e11, t11) {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[W].url, this[W].options.headers);
          this[W].domainLocale = this[W].options.i18nProvider ? this[W].options.i18nProvider.detectDomainLocale(s10) : function(e11, t11, r11) {
            if (e11) {
              for (let i11 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === i11.domain?.split(":", 1)[0].toLowerCase() || r11 === i11.defaultLocale.toLowerCase() || i11.locales?.some((e12) => e12.toLowerCase() === r11)) return i11;
            }
          }(null == (t10 = this[W].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, s10);
          let o10 = (null == (r10 = this[W].domainLocale) ? void 0 : r10.defaultLocale) || (null == (n10 = this[W].options.nextConfig) || null == (i10 = n10.i18n) ? void 0 : i10.defaultLocale);
          this[W].url.pathname = a10.pathname, this[W].defaultLocale = o10, this[W].basePath = a10.basePath ?? "", this[W].buildId = a10.buildId, this[W].locale = a10.locale ?? o10, this[W].trailingSlash = a10.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, i10) {
            if (!t11 || t11 === r10) return e11;
            let n10 = e11.toLowerCase();
            return !i10 && (M(n10, "/api") || M(n10, `/${t11.toLowerCase()}`)) ? e11 : U(e11, `/${t11}`);
          }((e10 = { basePath: this[W].basePath, buildId: this[W].buildId, defaultLocale: this[W].options.forceLocale ? void 0 : this[W].defaultLocale, locale: this[W].locale, pathname: this[W].url.pathname, trailingSlash: this[W].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = D(t10)), e10.buildId && (t10 = j(U(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = U(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : j(t10, "/") : D(t10);
        }
        formatSearch() {
          return this[W].url.search;
        }
        get buildId() {
          return this[W].buildId;
        }
        set buildId(e10) {
          this[W].buildId = e10;
        }
        get locale() {
          return this[W].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[W].locale || !(null == (r10 = this[W].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[W].locale = e10;
        }
        get defaultLocale() {
          return this[W].defaultLocale;
        }
        get domainLocale() {
          return this[W].domainLocale;
        }
        get searchParams() {
          return this[W].url.searchParams;
        }
        get host() {
          return this[W].url.host;
        }
        set host(e10) {
          this[W].url.host = e10;
        }
        get hostname() {
          return this[W].url.hostname;
        }
        set hostname(e10) {
          this[W].url.hostname = e10;
        }
        get port() {
          return this[W].url.port;
        }
        set port(e10) {
          this[W].url.port = e10;
        }
        get protocol() {
          return this[W].url.protocol;
        }
        set protocol(e10) {
          this[W].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[W].url = F(e10), this.analyze();
        }
        get origin() {
          return this[W].url.origin;
        }
        get pathname() {
          return this[W].url.pathname;
        }
        set pathname(e10) {
          this[W].url.pathname = e10;
        }
        get hash() {
          return this[W].url.hash;
        }
        set hash(e10) {
          this[W].url.hash = e10;
        }
        get search() {
          return this[W].url.search;
        }
        set search(e10) {
          this[W].url.search = e10;
        }
        get password() {
          return this[W].url.password;
        }
        set password(e10) {
          this[W].url.password = e10;
        }
        get username() {
          return this[W].url.username;
        }
        set username(e10) {
          this[W].url.username = e10;
        }
        get basePath() {
          return this[W].basePath;
        }
        set basePath(e10) {
          this[W].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new K(String(this), this[W].options);
        }
      }
      var V, z = e.i(28042);
      let Q = Symbol("internal request");
      class J extends Request {
        constructor(e10, t10 = {}) {
          const r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          k(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          const i10 = new K(r10, { headers: P(this.headers), nextConfig: t10.nextConfig });
          this[Q] = { cookies: new z.RequestCookies(this.headers), nextUrl: i10, url: i10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[Q].cookies;
        }
        get nextUrl() {
          return this[Q].nextUrl;
        }
        get page() {
          throw new w();
        }
        get ua() {
          throw new v();
        }
        get url() {
          return this[Q].url;
        }
      }
      class G {
        static get(e10, t10, r10) {
          let i10 = Reflect.get(e10, t10, r10);
          return "function" == typeof i10 ? i10.bind(e10) : i10;
        }
        static set(e10, t10, r10, i10) {
          return Reflect.set(e10, t10, r10, i10);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let X = Symbol("internal response"), Y = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function Z(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r11 = [];
          for (let [i10, n10] of e10.request.headers) t10.set("x-middleware-request-" + i10, n10), r11.push(i10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class ee extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          const r10 = this.headers, i10 = new Proxy(new z.ResponseCookies(r10), { get(e11, i11, n10) {
            switch (i11) {
              case "delete":
              case "set":
                return (...n11) => {
                  let a10 = Reflect.apply(e11[i11], e11, n11), s10 = new Headers(r10);
                  return a10 instanceof z.ResponseCookies && r10.set("x-middleware-set-cookie", a10.getAll().map((e12) => (0, z.stringifyCookie)(e12)).join(",")), Z(t10, s10), a10;
                };
              default:
                return G.get(e11, i11, n10);
            }
          } });
          this[X] = { cookies: i10, url: t10.url ? new K(t10.url, { headers: P(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[X].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new ee(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!Y.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let i10 = "object" == typeof t10 ? t10 : {}, n10 = new Headers(null == i10 ? void 0 : i10.headers);
          return n10.set("Location", k(e10)), new ee(null, { ...i10, headers: n10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", k(e10)), Z(t10, r10), new ee(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), Z(e10, t10), new ee(null, { ...e10, headers: t10 });
        }
      }
      function et(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, i10 = new URL(e10, t10), n10 = i10.origin === r10.origin;
        return { url: n10 ? i10.toString().slice(r10.origin.length) : i10.toString(), isRelative: n10 };
      }
      let er = "next-router-prefetch", ei = ["rsc", "next-router-state-tree", er, "next-hmr-refresh", "next-router-segment-prefetch"], en = "_rsc";
      function ea(e10) {
        return e10.startsWith("/") ? e10 : `/${e10}`;
      }
      function es(e10) {
        return ea(e10.split("/").reduce((e11, t10, r10, i10) => t10 ? "(" === t10[0] && t10.endsWith(")") || "@" === t10[0] || ("page" === t10 || "route" === t10) && r10 === i10.length - 1 ? e11 : `${e11}/${t10}` : e11, ""));
      }
      class eo extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new eo();
        }
      }
      class el extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, i10) {
            if ("symbol" == typeof r10) return G.get(t10, r10, i10);
            let n10 = r10.toLowerCase(), a10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            if (void 0 !== a10) return G.get(t10, a10, i10);
          }, set(t10, r10, i10, n10) {
            if ("symbol" == typeof r10) return G.set(t10, r10, i10, n10);
            let a10 = r10.toLowerCase(), s10 = Object.keys(e10).find((e11) => e11.toLowerCase() === a10);
            return G.set(t10, s10 ?? r10, i10, n10);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return G.has(t10, r10);
            let i10 = r10.toLowerCase(), n10 = Object.keys(e10).find((e11) => e11.toLowerCase() === i10);
            return void 0 !== n10 && G.has(t10, n10);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return G.deleteProperty(t10, r10);
            let i10 = r10.toLowerCase(), n10 = Object.keys(e10).find((e11) => e11.toLowerCase() === i10);
            return void 0 === n10 || G.deleteProperty(t10, n10);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return eo.callable;
              default:
                return G.get(e11, t10, r10);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new el(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, i10] of this.entries()) e10.call(t10, i10, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      e.i(7754);
      var ec = e.i(46478), ec = ec;
      class eu extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new eu();
        }
      }
      class ed {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return eu.callable;
              default:
                return G.get(e11, t10, r10);
            }
          } });
        }
      }
      let eh = Symbol.for("next.mutated.cookies");
      class ep {
        static wrap(e10, t10) {
          let r10 = new z.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let i10 = [], n10 = /* @__PURE__ */ new Set(), a10 = () => {
            let e11 = ec.workAsyncStorageInstance.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), i10 = r10.getAll().filter((e12) => n10.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of i10) {
                let r11 = new z.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, s10 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case eh:
                return i10;
              case "delete":
                return function(...t12) {
                  n10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), s10;
                  } finally {
                    a10();
                  }
                };
              case "set":
                return function(...t12) {
                  n10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), s10;
                  } finally {
                    a10();
                  }
                };
              default:
                return G.get(e11, t11, r11);
            }
          } });
          return s10;
        }
      }
      function ef(e10) {
        return "action" === e10.phase;
      }
      function em(e10, t10) {
        if (!ef(e10)) throw new eu();
      }
      var eg = ((n6 = eg || {}).handleRequest = "BaseServer.handleRequest", n6.run = "BaseServer.run", n6.pipe = "BaseServer.pipe", n6.getStaticHTML = "BaseServer.getStaticHTML", n6.render = "BaseServer.render", n6.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", n6.renderToResponse = "BaseServer.renderToResponse", n6.renderToHTML = "BaseServer.renderToHTML", n6.renderError = "BaseServer.renderError", n6.renderErrorToResponse = "BaseServer.renderErrorToResponse", n6.renderErrorToHTML = "BaseServer.renderErrorToHTML", n6.render404 = "BaseServer.render404", n6), ey = ((n8 = ey || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", n8.loadComponents = "LoadComponents.loadComponents", n8), eb = ((n9 = eb || {}).getRequestHandler = "NextServer.getRequestHandler", n9.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", n9.getServer = "NextServer.getServer", n9.getServerRequestHandler = "NextServer.getServerRequestHandler", n9.createServer = "createServer.createServer", n9), ew = ((n7 = ew || {}).compression = "NextNodeServer.compression", n7.getBuildId = "NextNodeServer.getBuildId", n7.createComponentTree = "NextNodeServer.createComponentTree", n7.clientComponentLoading = "NextNodeServer.clientComponentLoading", n7.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", n7.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", n7.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", n7.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", n7.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", n7.sendRenderResult = "NextNodeServer.sendRenderResult", n7.proxyRequest = "NextNodeServer.proxyRequest", n7.runApi = "NextNodeServer.runApi", n7.render = "NextNodeServer.render", n7.renderHTML = "NextNodeServer.renderHTML", n7.imageOptimizer = "NextNodeServer.imageOptimizer", n7.getPagePath = "NextNodeServer.getPagePath", n7.getRoutesManifest = "NextNodeServer.getRoutesManifest", n7.findPageComponents = "NextNodeServer.findPageComponents", n7.getFontManifest = "NextNodeServer.getFontManifest", n7.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", n7.getRequestHandler = "NextNodeServer.getRequestHandler", n7.renderToHTML = "NextNodeServer.renderToHTML", n7.renderError = "NextNodeServer.renderError", n7.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", n7.render404 = "NextNodeServer.render404", n7.startResponse = "NextNodeServer.startResponse", n7.route = "route", n7.onProxyReq = "onProxyReq", n7.apiResolver = "apiResolver", n7.internalFetch = "internalFetch", n7), ev = ((ae = ev || {}).startServer = "startServer.startServer", ae), e_ = ((at = e_ || {}).getServerSideProps = "Render.getServerSideProps", at.getStaticProps = "Render.getStaticProps", at.renderToString = "Render.renderToString", at.renderDocument = "Render.renderDocument", at.createBodyResult = "Render.createBodyResult", at), eS = ((ar = eS || {}).renderToString = "AppRender.renderToString", ar.renderToReadableStream = "AppRender.renderToReadableStream", ar.getBodyResult = "AppRender.getBodyResult", ar.fetch = "AppRender.fetch", ar), eE = ((ai = eE || {}).executeRoute = "Router.executeRoute", ai), ex = ((an = ex || {}).runHandler = "Node.runHandler", an), eT = ((aa = eT || {}).runHandler = "AppRouteRouteHandlers.runHandler", aa), eC = ((as = eC || {}).generateMetadata = "ResolveMetadata.generateMetadata", as.generateViewport = "ResolveMetadata.generateViewport", as), eA = ((ao = eA || {}).execute = "Middleware.execute", ao);
      let eP = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), ek = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function eR(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let eO = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: eN, propagation: eI, trace: e$, SpanStatusCode: eD, SpanKind: eL, ROOT_CONTEXT: eU } = t = e.r(59110);
      class ej extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let eM = (e10, t10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof ej && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: eD.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eB = /* @__PURE__ */ new Map(), eH = t.createContextKey("next.rootSpanId"), eq = 0, eF = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, eW = (c = new class e {
        getTracerInstance() {
          return e$.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return eN;
        }
        getTracePropagationData() {
          let e10 = eN.active(), t10 = [];
          return eI.inject(e10, t10, eF), t10;
        }
        getActiveScopeSpan() {
          return e$.getSpan(null == eN ? void 0 : eN.active());
        }
        withPropagatedContext(e10, t10, r10, i10 = false) {
          let n10 = eN.active();
          if (i10) {
            let i11 = eI.extract(eU, e10, r10);
            if (e$.getSpanContext(i11)) return eN.with(i11, t10);
            let a11 = eI.extract(n10, e10, r10);
            return eN.with(a11, t10);
          }
          if (e$.getSpanContext(n10)) return t10();
          let a10 = eI.extract(n10, e10, r10);
          return eN.with(a10, t10);
        }
        trace(...e10) {
          let [t10, r10, i10] = e10, { fn: n10, options: a10 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: i10, options: { ...r10 } }, s10 = a10.spanName ?? t10;
          if (!eP.has(t10) && "1" !== process.env.NEXT_OTEL_VERBOSE || a10.hideSpan) return n10();
          let o10 = this.getSpanContext((null == a10 ? void 0 : a10.parentSpan) ?? this.getActiveScopeSpan());
          o10 || (o10 = (null == eN ? void 0 : eN.active()) ?? eU);
          let l10 = o10.getValue(eH), c10 = "number" != typeof l10 || !eB.has(l10), u10 = eq++;
          return a10.attributes = { "next.span_name": s10, "next.span_type": t10, ...a10.attributes }, eN.with(o10.setValue(eH, u10), () => this.getTracerInstance().startActiveSpan(s10, a10, (e11) => {
            let r11;
            eO && t10 && ek.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let i11 = false, s11 = () => {
              !i11 && (i11 = true, eB.delete(u10), r11 && performance.measure(`${eO}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (c10 && eB.set(u10, new Map(Object.entries(a10.attributes ?? {}))), n10.length > 1) try {
              return n10(e11, (t11) => eM(e11, t11));
            } catch (t11) {
              throw eM(e11, t11), t11;
            } finally {
              s11();
            }
            try {
              let t11 = n10(e11);
              if (eR(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw eM(e11, t12), t12;
              }).finally(s11);
              return e11.end(), s11(), t11;
            } catch (t11) {
              throw eM(e11, t11), s11(), t11;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, i10, n10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eP.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = i10;
            "function" == typeof e11 && "function" == typeof n10 && (e11 = e11.apply(this, arguments));
            let a10 = arguments.length - 1, s10 = arguments[a10];
            if ("function" != typeof s10) return t10.trace(r10, e11, () => n10.apply(this, arguments));
            {
              let i11 = t10.getContext().bind(eN.active(), s10);
              return t10.trace(r10, e11, (e12, t11) => (arguments[a10] = function(e13) {
                return null == t11 || t11(e13), i11.apply(this, arguments);
              }, n10.apply(this, arguments)));
            }
          } : n10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, i10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, i10);
        }
        getSpanContext(e10) {
          return e10 ? e$.setSpan(eN.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = eN.active().getValue(eH);
          return eB.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = eN.active().getValue(eH), i10 = eB.get(r10);
          i10 && !i10.has(e10) && i10.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r10 = e$.setSpan(eN.active(), e10);
          return eN.with(r10, t10);
        }
      }(), () => c), eK = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eK);
      class eV {
        constructor(e10, t10, r10, i10) {
          var n10;
          const a10 = e10 && function(e11, t11) {
            let r11 = el.from(e11.headers);
            return { isOnDemandRevalidate: r11.get(_) === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, s10 = null == (n10 = r10.get(eK)) ? void 0 : n10.value;
          this._isEnabled = !!(!a10 && s10 && e10 && s10 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = i10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: eK, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: eK, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function ez(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], i10 = new Headers();
          for (let e11 of A(r10)) i10.append("set-cookie", e11);
          for (let e11 of new z.ResponseCookies(i10).getAll()) t10.set(e11);
        }
      }
      var eQ = e.i(53835), eJ = e.i(9939), eJ = eJ, eG = e.i(99734), eX = e.i(25753), ec = ec, eY = e.i(51615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let eZ = Symbol.for("@next/cache-handlers-map"), e0 = Symbol.for("@next/cache-handlers-set"), e1 = globalThis;
      function e2() {
        if (e1[eZ]) return e1[eZ].entries();
      }
      async function e3(e10, t10) {
        if (!e10) return t10();
        let r10 = e4(e10);
        try {
          return await t10();
        } finally {
          var i10, n10, a10, s10;
          let t11, o10, l10, c10, u10 = (i10 = r10, n10 = e4(e10), t11 = new Set(i10.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), o10 = new Set(i10.pendingRevalidateWrites), { pendingRevalidatedTags: n10.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r11}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(n10.pendingRevalidates).filter(([e11]) => !(e11 in i10.pendingRevalidates))), pendingRevalidateWrites: n10.pendingRevalidateWrites.filter((e11) => !o10.has(e11)) });
          await (a10 = e10, l10 = [], (c10 = (null == (s10 = u10) ? void 0 : s10.pendingRevalidatedTags) ?? a10.pendingRevalidatedTags ?? []).length > 0 && l10.push(e5(c10, a10.incrementalCache, a10)), l10.push(...Object.values((null == s10 ? void 0 : s10.pendingRevalidates) ?? a10.pendingRevalidates ?? {})), l10.push(...(null == s10 ? void 0 : s10.pendingRevalidateWrites) ?? a10.pendingRevalidateWrites ?? []), 0 !== l10.length && Promise.all(l10).then(() => void 0));
        }
      }
      function e4(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function e5(e10, t10, r10) {
        if (0 === e10.length) return;
        let i10 = function() {
          if (e1[e0]) return e1[e0].values();
        }(), n10 = [], a10 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of a10) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let i11 = e11 || r11;
          a10.has(i11) || a10.set(i11, []), a10.get(i11).push(t11.tag);
        }
        for (let [e11, o10] of a10) {
          let a11;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11) {
              var s10;
              if (!(t11 = null == r10 || null == (s10 = r10.cacheLifeProfiles) ? void 0 : s10[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            }
            t11 && (a11 = { expire: t11.expire });
          }
          for (let t11 of i10 || []) e11 ? n10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o10, a11)) : n10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o10));
          t10 && n10.push(t10.revalidateTag(o10, a11));
        }
        await Promise.all(n10);
      }
      var e6 = e.i(90044), eJ = eJ;
      let e8 = (0, e6.createAsyncLocalStorage)();
      class e9 {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new eG.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eR(e10)) this.waitUntil || e7(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          this.waitUntil || e7();
          let t10 = eJ.workUnitAsyncStorageInstance.getStore();
          t10 && this.workUnitStores.add(t10);
          let r10 = e8.getStore(), i10 = r10 ? r10.rootTaskSpawnPhase : null == t10 ? void 0 : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let n10 = (0, e6.bindSnapshot)(async () => {
            try {
              await e8.run({ rootTaskSpawnPhase: i10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          });
          this.callbackQueue.add(n10);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = ec.workAsyncStorageInstance.getStore();
          if (!e10) throw Object.defineProperty(new eX.InvariantError("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return e3(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new eX.InvariantError("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function e7() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function te(e10) {
        let t10, r10 = { then: (i10, n10) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(i10, n10)) };
        return r10;
      }
      var ec = ec;
      class tt {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function tr() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let ti = Symbol.for("@next/request-context"), tn = /[^\t\x20-\x7e]/, ta = /[^\t\x20-\x7e]+/g;
      function ts(e10) {
        return tn.test(e10) ? e10.replace(ta, (e11) => encodeURIComponent(e11)) : e10;
      }
      async function to(e10, t10, r10) {
        let i10 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.split("/");
            for (let e12 = 1; e12 < r11.length + 1; e12++) {
              let i11 = r11.slice(0, e12).join("/");
              i11 && (i11.endsWith("/page") || i11.endsWith("/route") || (i11 = `${i11}${!i11.endsWith("/") ? "/" : ""}layout`), t12.push(i11));
            }
          }
          return t12;
        })(e10)) t11 = ts(`${T}${t11}`), i10.add(t11);
        if (t10 && (!r10 || 0 === r10.size)) {
          let e11 = ts(`${T}${t10}`);
          i10.add(e11);
        }
        i10.has(`${T}/`) && i10.add(`${T}/index`), i10.has(`${T}/index`) && i10.add(`${T}/`);
        let n10 = Array.from(i10);
        return { tags: n10, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = e2();
          if (r11) for (let [i11, n11] of r11) "getExpiration" in n11 && t11.set(i11, te(async () => n11.getExpiration(e11)));
          return t11;
        }(n10) };
      }
      let tl = Symbol.for("NextInternalRequestMeta");
      class tc extends J {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new b({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new b({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new b({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let tu = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, td = (e10, t10) => eW().withPropagatedContext(e10.headers, t10, tu), th = false;
      async function tp(t10) {
        var r10, i10, n10, a10, s10;
        let o10, l10, c10, u10, d10;
        !function() {
          if (!th && (th = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(94165);
            t11(), td = r11(td);
          }
        }(), await g();
        let h10 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let p10 = t10.bypassNextUrl ? new URL(t10.request.url) : new K(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...p10.searchParams.keys()]) {
          let t11 = p10.searchParams.getAll(e10), r11 = function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          }(e10);
          if (r11) {
            for (let e11 of (p10.searchParams.delete(r11), t11)) p10.searchParams.append(r11, e11);
            p10.searchParams.delete(e10);
          }
        }
        let f2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in p10 && (f2 = p10.buildId || "", p10.buildId = "");
        let m2 = function(e10) {
          let t11 = new Headers();
          for (let [r11, i11] of Object.entries(e10)) for (let e11 of Array.isArray(i11) ? i11 : [i11]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        }(t10.request.headers), y2 = m2.has("x-nextjs-data"), b2 = "1" === m2.get("rsc");
        y2 && "/index" === p10.pathname && (p10.pathname = "/");
        let w2 = /* @__PURE__ */ new Map();
        if (!h10) for (let e10 of ei) {
          let t11 = m2.get(e10);
          null !== t11 && (w2.set(e10, t11), m2.delete(e10));
        }
        let v2 = p10.searchParams.get(en), _2 = new tc({ page: t10.page, input: ((u10 = (c10 = "string" == typeof p10) ? new URL(p10) : p10).searchParams.delete(en), c10 ? u10.toString() : u10).toString(), init: { body: t10.request.body, headers: m2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        t10.request.requestMeta && (s10 = t10.request.requestMeta, _2[tl] = s10), y2 && Object.defineProperty(_2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: tr() }) }));
        let S2 = t10.request.waitUntil ?? (null == (r10 = null == (d10 = globalThis[ti]) ? void 0 : d10.get()) ? void 0 : r10.waitUntil), E2 = new $({ request: _2, page: t10.page, context: S2 ? { waitUntil: S2 } : void 0 });
        if ((o10 = await td(_2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            let e10 = E2.waitUntil.bind(E2), r11 = new tt();
            return eW().trace(eA.execute, { spanName: `middleware ${_2.method}`, attributes: { "http.target": _2.nextUrl.pathname, "http.method": _2.method } }, async () => {
              try {
                var i11, n11, a11, s11, o11, c11;
                let u11 = tr(), d11 = await to("/", _2.nextUrl.pathname, null), h11 = (o11 = _2.nextUrl, c11 = (e11) => {
                  l10 = e11;
                }, function(e11, t11, r12, i12, n12, a12, s12, o12, l11, c12) {
                  function u12(e12) {
                    r12 && r12.setHeader("Set-Cookie", e12);
                  }
                  let d12 = {};
                  return { type: "request", phase: e11, implicitTags: a12, url: { pathname: i12.pathname, search: i12.search ?? "" }, rootParams: n12, get headers() {
                    return d12.headers || (d12.headers = function(e12) {
                      let t12 = el.from(e12);
                      for (let e13 of ei) t12.delete(e13);
                      return el.seal(t12);
                    }(t11.headers)), d12.headers;
                  }, get cookies() {
                    if (!d12.cookies) {
                      let e12 = new z.RequestCookies(el.from(t11.headers));
                      ez(t11, e12), d12.cookies = ed.seal(e12);
                    }
                    return d12.cookies;
                  }, set cookies(value) {
                    d12.cookies = value;
                  }, get mutableCookies() {
                    if (!d12.mutableCookies) {
                      var h12, p12;
                      let e12, i13 = (h12 = t11.headers, p12 = s12 || (r12 ? u12 : void 0), e12 = new z.RequestCookies(el.from(h12)), ep.wrap(e12, p12));
                      ez(t11, i13), d12.mutableCookies = i13;
                    }
                    return d12.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!d12.userspaceMutableCookies) {
                      var f3;
                      let e12;
                      f3 = this, d12.userspaceMutableCookies = e12 = new Proxy(f3.mutableCookies, { get(t12, r13, i13) {
                        switch (r13) {
                          case "delete":
                            return function(...r14) {
                              return em(f3, "cookies().delete"), t12.delete(...r14), e12;
                            };
                          case "set":
                            return function(...r14) {
                              return em(f3, "cookies().set"), t12.set(...r14), e12;
                            };
                          default:
                            return G.get(t12, r13, i13);
                        }
                      } });
                    }
                    return d12.userspaceMutableCookies;
                  }, get draftMode() {
                    return d12.draftMode || (d12.draftMode = new eV(o12, t11, this.cookies, this.mutableCookies)), d12.draftMode;
                  }, renderResumeDataCache: null, isHmrRefresh: l11, serverComponentsHmrCache: c12 || globalThis.__serverComponentsHmrCache, fallbackParams: null };
                }("action", _2, void 0, o11, {}, d11, c11, u11, false, void 0)), p11 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: i12, deploymentId: n12, previouslyRevalidatedTags: a12, nonce: s12 }) {
                  let o12 = !t11.shouldWaitOnAllReady && !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, l11 = o12 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), c12 = { isStaticGeneration: o12, page: e11, route: es(e11), incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, isBuildTimePrerendering: t11.isBuildTimePrerendering, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: i12, deploymentId: n12, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: s12, afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r13, onAfterTaskError: i13 } = e12;
                    return new e9({ waitUntil: t12, onClose: r13, onTaskError: i13 });
                  }(t11), cacheComponentsEnabled: t11.cacheComponents, previouslyRevalidatedTags: a12, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = e2();
                    if (t12) for (let [r13, i13] of t12) "refreshTags" in i13 && e12.set(r13, te(async () => i13.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: (0, e6.createSnapshot)(), shouldTrackFetchMetrics: l11, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                  return t11.store = c12, c12;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (n11 = t10.request.nextConfig) || null == (i11 = n11.experimental) ? void 0 : i11.cacheLife, cacheComponents: false, experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (s11 = t10.request.nextConfig) || null == (a11 = s11.experimental) ? void 0 : a11.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === _2.headers.get(er), buildId: f2 ?? "", deploymentId: false, previouslyRevalidatedTags: [] });
                return await ec.workAsyncStorageInstance.run(p11, () => eJ.workUnitAsyncStorageInstance.run(h11, t10.handler, _2, E2));
              } finally {
                setTimeout(() => {
                  r11.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(_2, E2);
        })) && !(o10 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        o10 && l10 && o10.headers.set("set-cookie", l10);
        let x2 = null == o10 ? void 0 : o10.headers.get("x-middleware-rewrite");
        if (o10 && x2 && (b2 || !h10)) {
          let e10 = new K(x2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          h10 || e10.host !== _2.nextUrl.host || (e10.buildId = f2 || e10.buildId, o10.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: s11 } = et(e10.toString(), p10.toString());
          !h10 && y2 && o10.headers.set("x-nextjs-rewrite", r11);
          let l11 = !s11 && (null == (a10 = t10.request.nextConfig) || null == (n10 = a10.experimental) || null == (i10 = n10.clientParamParsingOrigins) ? void 0 : i10.some((t11) => new RegExp(t11).test(e10.origin)));
          b2 && (s11 || l11) && (p10.pathname !== e10.pathname && o10.headers.set("x-nextjs-rewritten-path", e10.pathname), p10.search !== e10.search && o10.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (o10 && x2 && b2 && v2) {
          let e10 = new URL(x2);
          e10.searchParams.has(en) || (e10.searchParams.set(en, v2), o10.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let T2 = null == o10 ? void 0 : o10.headers.get("Location");
        if (o10 && T2 && !h10) {
          let e10 = new K(T2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          o10 = new Response(o10.body, o10), e10.host === p10.host && (e10.buildId = f2 || e10.buildId, o10.headers.set("Location", et(e10, p10).url)), y2 && (o10.headers.delete("Location"), o10.headers.set("x-nextjs-redirect", et(e10.toString(), p10.toString()).url));
        }
        let C2 = o10 || ee.next(), A2 = C2.headers.get("x-middleware-override-headers"), P2 = [];
        if (A2) {
          for (let [e10, t11] of w2) C2.headers.set(`x-middleware-request-${e10}`, t11), P2.push(e10);
          P2.length > 0 && C2.headers.set("x-middleware-override-headers", A2 + "," + P2.join(","));
        }
        return { response: C2, waitUntil: ("internal" === E2[N].kind ? Promise.all(E2[N].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: _2.fetchMetrics };
      }
      class tf {
        constructor() {
          let e10, t10;
          this.promise = new Promise((r10, i10) => {
            e10 = r10, t10 = i10;
          }), this.resolve = e10, this.reject = t10;
        }
      }
      class tm {
        constructor(e10, t10, r10) {
          this.prev = null, this.next = null, this.key = e10, this.data = t10, this.size = r10;
        }
      }
      class tg {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class ty {
        constructor(e10, t10, r10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10, this.onEvict = r10, this.head = new tg(), this.tail = new tg(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t10) {
          let r10 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t10)) ?? 1;
          if (r10 <= 0) throw Object.defineProperty(Error(`LRUCache: calculateSize returned ${r10}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`), "__NEXT_ERROR_CODE", { value: "E1045", enumerable: false, configurable: true });
          if (r10 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let i10 = this.cache.get(e10);
          if (i10) i10.data = t10, this.totalSize = this.totalSize - i10.size + r10, i10.size = r10, this.moveToHead(i10);
          else {
            let i11 = new tm(e10, t10, r10);
            this.cache.set(e10, i11), this.addToHead(i11), this.totalSize += r10;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size, null == this.onEvict || this.onEvict.call(this, e11.key, e11.data);
          }
          return true;
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t10 = this.cache.get(e10);
          if (t10) return this.moveToHead(t10), t10.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t10 = e10;
            yield [t10.key, t10.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t10 = this.cache.get(e10);
          t10 && (this.removeNode(t10), this.cache.delete(e10), this.totalSize -= t10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      let { env: tb, stdout: tw } = (null == (au = globalThis) ? void 0 : au.process) ?? {}, tv = tb && !tb.NO_COLOR && (tb.FORCE_COLOR || (null == tw ? void 0 : tw.isTTY) && !tb.CI && "dumb" !== tb.TERM), t_ = (e10, t10, r10, i10) => {
        let n10 = e10.substring(0, i10) + r10, a10 = e10.substring(i10 + t10.length), s10 = a10.indexOf(t10);
        return ~s10 ? n10 + t_(a10, t10, r10, s10) : n10 + a10;
      }, tS = (e10, t10, r10 = e10) => tv ? (i10) => {
        let n10 = "" + i10, a10 = n10.indexOf(t10, e10.length);
        return ~a10 ? e10 + t_(n10, t10, r10, a10) + t10 : e10 + n10 + t10;
      } : String, tE = tS("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      tS("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), tS("\x1B[3m", "\x1B[23m"), tS("\x1B[4m", "\x1B[24m"), tS("\x1B[7m", "\x1B[27m"), tS("\x1B[8m", "\x1B[28m"), tS("\x1B[9m", "\x1B[29m"), tS("\x1B[30m", "\x1B[39m");
      let tx = tS("\x1B[31m", "\x1B[39m"), tT = tS("\x1B[32m", "\x1B[39m"), tC = tS("\x1B[33m", "\x1B[39m");
      tS("\x1B[34m", "\x1B[39m");
      let tA = tS("\x1B[35m", "\x1B[39m");
      tS("\x1B[38;2;173;127;168m", "\x1B[39m"), tS("\x1B[36m", "\x1B[39m");
      let tP = tS("\x1B[37m", "\x1B[39m");
      tS("\x1B[90m", "\x1B[39m"), tS("\x1B[40m", "\x1B[49m"), tS("\x1B[41m", "\x1B[49m"), tS("\x1B[42m", "\x1B[49m"), tS("\x1B[43m", "\x1B[49m"), tS("\x1B[44m", "\x1B[49m"), tS("\x1B[45m", "\x1B[49m"), tS("\x1B[46m", "\x1B[49m"), tS("\x1B[47m", "\x1B[49m"), tP(tE("\u25CB")), tx(tE("\u2A2F")), tC(tE("\u26A0")), tP(tE(" ")), tT(tE("\u2713")), tA(tE("\xBB")), new ty(1e4, (e10) => e10.length), new ty(1e4, (e10) => e10.length);
      var tk = ((al = {}).APP_PAGE = "APP_PAGE", al.APP_ROUTE = "APP_ROUTE", al.PAGES = "PAGES", al.FETCH = "FETCH", al.REDIRECT = "REDIRECT", al.IMAGE = "IMAGE", al), tR = ((ac = {}).APP_PAGE = "APP_PAGE", ac.APP_ROUTE = "APP_ROUTE", ac.PAGES = "PAGES", ac.FETCH = "FETCH", ac.IMAGE = "IMAGE", ac);
      function tO() {
      }
      new TextEncoder();
      let tN = new TextEncoder();
      function tI(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(tN.encode(e10)), t10.close();
        } });
      }
      function t$(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(e10), t10.close();
        } });
      }
      async function tD(e10, t10) {
        let r10 = new TextDecoder("utf-8", { fatal: true }), i10 = "";
        for await (let n10 of e10) {
          if (null == t10 ? void 0 : t10.aborted) return i10;
          i10 += r10.decode(n10, { stream: true });
        }
        return i10 + r10.decode();
      }
      let tL = "ResponseAborted";
      class tU extends Error {
        constructor(...e10) {
          super(...e10), this.name = tL;
        }
      }
      let tj = 0, tM = 0, tB = 0;
      function tH(e10) {
        return (null == e10 ? void 0 : e10.name) === "AbortError" || (null == e10 ? void 0 : e10.name) === tL;
      }
      async function tq(e10, t10, r10) {
        try {
          let i10, { errored: n10, destroyed: a10 } = t10;
          if (n10 || a10) return;
          let s10 = (i10 = new AbortController(), t10.once("close", () => {
            t10.writableFinished || i10.abort(new tU());
          }), i10), o10 = function(e11, t11) {
            let r11 = false, i11 = new tf();
            function n11() {
              i11.resolve();
            }
            e11.on("drain", n11), e11.once("close", () => {
              e11.off("drain", n11), i11.resolve();
            });
            let a11 = new tf();
            return e11.once("finish", () => {
              a11.resolve();
            }), new WritableStream({ write: async (t12) => {
              if (!r11) {
                if (r11 = true, "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                  let e12 = function(e13 = {}) {
                    let t13 = 0 === tj ? void 0 : { clientComponentLoadStart: tj, clientComponentLoadTimes: tM, clientComponentLoadCount: tB };
                    return e13.reset && (tj = 0, tM = 0, tB = 0), t13;
                  }();
                  e12 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e12.clientComponentLoadStart, end: e12.clientComponentLoadStart + e12.clientComponentLoadTimes });
                }
                e11.flushHeaders(), eW().trace(ew.startResponse, { spanName: "start response" }, () => void 0);
              }
              try {
                let r12 = e11.write(t12);
                "flush" in e11 && "function" == typeof e11.flush && e11.flush(), r12 || (await i11.promise, i11 = new tf());
              } catch (t13) {
                throw e11.end(), Object.defineProperty(Error("failed to write chunk to response", { cause: t13 }), "__NEXT_ERROR_CODE", { value: "E321", enumerable: false, configurable: true });
              }
            }, abort: (t12) => {
              e11.writableFinished || e11.destroy(t12);
            }, close: async () => {
              if (t11 && await t11, !e11.writableFinished) return e11.end(), a11.promise;
            } });
          }(t10, r10);
          await e10.pipeTo(o10, { signal: s10.signal });
        } catch (e11) {
          if (tH(e11)) return;
          throw Object.defineProperty(Error("failed to pipe response", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E180", enumerable: false, configurable: true });
        }
      }
      class tF {
        static #e = this.EMPTY = new tF(null, { metadata: {}, contentType: null });
        static fromStatic(e10, t10) {
          return new tF(e10, { metadata: {}, contentType: t10 });
        }
        constructor(e10, { contentType: t10, waitUntil: r10, metadata: i10 }) {
          this.response = e10, this.contentType = t10, this.metadata = i10, this.waitUntil = r10;
        }
        assignMetadata(e10) {
          Object.assign(this.metadata, e10);
        }
        get isNull() {
          return null === this.response;
        }
        get isDynamic() {
          return "string" != typeof this.response;
        }
        toUnchunkedString(e10 = false) {
          if (null === this.response) return "";
          if ("string" != typeof this.response) {
            if (!e10) throw Object.defineProperty(new eX.InvariantError("dynamic responses cannot be unchunked. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E732", enumerable: false, configurable: true });
            return tD(this.readable);
          }
          return this.response;
        }
        get readable() {
          return null === this.response ? new ReadableStream({ start(e10) {
            e10.close();
          } }) : "string" == typeof this.response ? tI(this.response) : eY.Buffer.isBuffer(this.response) ? t$(this.response) : Array.isArray(this.response) ? function(...e10) {
            if (0 === e10.length) return new ReadableStream({ start(e11) {
              e11.close();
            } });
            if (1 === e10.length) return e10[0];
            let { readable: t10, writable: r10 } = new TransformStream(), i10 = e10[0].pipeTo(r10, { preventClose: true }), n10 = 1;
            for (; n10 < e10.length - 1; n10++) {
              let t11 = e10[n10];
              i10 = i10.then(() => t11.pipeTo(r10, { preventClose: true }));
            }
            let a10 = e10[n10];
            return (i10 = i10.then(() => a10.pipeTo(r10))).catch(tO), t10;
          }(...this.response) : this.response;
        }
        coerce() {
          return null === this.response ? [] : "string" == typeof this.response ? [tI(this.response)] : Array.isArray(this.response) ? this.response : eY.Buffer.isBuffer(this.response) ? [t$(this.response)] : [this.response];
        }
        pipeThrough(e10) {
          this.response = this.readable.pipeThrough(e10);
        }
        unshift(e10) {
          this.response = this.coerce(), this.response.unshift(e10);
        }
        push(e10) {
          this.response = this.coerce(), this.response.push(e10);
        }
        async pipeTo(e10) {
          try {
            await this.readable.pipeTo(e10, { preventClose: true }), this.waitUntil && await this.waitUntil, await e10.close();
          } catch (t10) {
            if (tH(t10)) return void await e10.abort(t10);
            throw t10;
          }
        }
        async pipeToNodeResponse(e10) {
          await tq(this.readable, e10, this.waitUntil);
        }
      }
      function tW(e10, t10) {
        if (!e10) return t10;
        let r10 = parseInt(e10, 10);
        return Number.isFinite(r10) && r10 > 0 ? r10 : t10;
      }
      tW(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 1e4), tW(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
      var tK = e.i(68886);
      let tV = /* @__PURE__ */ new Map(), tz = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = tV.get(r10), i10 = null == e11 ? void 0 : e11.expired;
          if ("number" == typeof i10 && i10 <= Date.now() && i10 > t10) return true;
        }
        return false;
      }, tQ = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = tV.get(r10), i10 = (null == e11 ? void 0 : e11.stale) ?? 0;
          if ("number" == typeof i10 && i10 > t10) return true;
        }
        return false;
      };
      class tJ {
        constructor(e10) {
          this.fs = e10, this.tasks = [];
        }
        findOrCreateTask(e10) {
          for (let t11 of this.tasks) if (t11[0] === e10) return t11;
          let t10 = this.fs.mkdir(e10);
          t10.catch(() => {
          });
          let r10 = [e10, t10, []];
          return this.tasks.push(r10), r10;
        }
        append(e10, t10) {
          let r10 = this.findOrCreateTask(tK.default.dirname(e10)), i10 = r10[1].then(() => this.fs.writeFile(e10, t10));
          i10.catch(() => {
          }), r10[2].push(i10);
        }
        wait() {
          return Promise.all(this.tasks.flatMap((e10) => e10[2]));
        }
      }
      function tG(e10) {
        return (null == e10 ? void 0 : e10.length) || 0;
      }
      class tX {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor(e10) {
          this.fs = e10.fs, this.flushToDisk = e10.flushToDisk, this.serverDistDir = e10.serverDistDir, this.revalidatedTags = e10.revalidatedTags, e10.maxMemoryCacheSize ? tX.memoryCache ? tX.debug && console.log("FileSystemCache: memory store already initialized") : (tX.debug && console.log("FileSystemCache: using memory store for fetch cache"), tX.memoryCache = function(e11) {
            return r || (r = new ty(e11, function({ value: e12 }) {
              var t10, r10;
              if (!e12) return 25;
              if (e12.kind === tk.REDIRECT) return JSON.stringify(e12.props).length;
              if (e12.kind === tk.IMAGE) throw Object.defineProperty(Error("invariant image should not be incremental-cache"), "__NEXT_ERROR_CODE", { value: "E501", enumerable: false, configurable: true });
              if (e12.kind === tk.FETCH) return JSON.stringify(e12.data || "").length;
              if (e12.kind === tk.APP_ROUTE) return e12.body.length;
              return e12.kind === tk.APP_PAGE ? Math.max(1, e12.html.length + tG(e12.rscData) + ((null == (r10 = e12.postponed) ? void 0 : r10.length) || 0) + function(e13) {
                if (!e13) return 0;
                let t11 = 0;
                for (let [r11, i10] of e13) t11 += r11.length + tG(i10);
                return t11;
              }(e12.segmentData)) : e12.html.length + ((null == (t10 = JSON.stringify(e12.pageData)) ? void 0 : t10.length) || 0);
            })), r;
          }(e10.maxMemoryCacheSize)) : tX.debug && console.log("FileSystemCache: not using memory store for fetch cache");
        }
        resetRequestCache() {
        }
        async revalidateTag(e10, t10) {
          if (e10 = "string" == typeof e10 ? [e10] : e10, tX.debug && console.log("FileSystemCache: revalidateTag", e10, t10), 0 === e10.length) return;
          let r10 = Date.now();
          for (let i10 of e10) {
            let e11 = tV.get(i10) || {};
            if (t10) {
              let n10 = { ...e11 };
              n10.stale = r10, void 0 !== t10.expire && (n10.expired = r10 + 1e3 * t10.expire), tV.set(i10, n10);
            } else tV.set(i10, { ...e11, expired: r10 });
          }
        }
        async get(...e10) {
          var t10, r10, i10, n10, a10, s10;
          let [o10, l10] = e10, { kind: c10 } = l10, u10 = null == (t10 = tX.memoryCache) ? void 0 : t10.get(o10);
          if (tX.debug && (c10 === tR.FETCH ? console.log("FileSystemCache: get", o10, l10.tags, c10, !!u10) : console.log("FileSystemCache: get", o10, c10, !!u10)), (null == u10 || null == (r10 = u10.value) ? void 0 : r10.kind) === tk.APP_PAGE || (null == u10 || null == (i10 = u10.value) ? void 0 : i10.kind) === tk.APP_ROUTE || (null == u10 || null == (n10 = u10.value) ? void 0 : n10.kind) === tk.PAGES) {
            let e11 = null == (s10 = u10.value.headers) ? void 0 : s10[E];
            if ("string" == typeof e11) {
              let t11 = e11.split(",");
              if (t11.length > 0 && tz(t11, u10.lastModified)) return tX.debug && console.log("FileSystemCache: expired tags", t11), null;
            }
          } else if ((null == u10 || null == (a10 = u10.value) ? void 0 : a10.kind) === tk.FETCH) {
            let e11 = l10.kind === tR.FETCH ? [...l10.tags || [], ...l10.softTags || []] : [];
            if (e11.some((e12) => this.revalidatedTags.includes(e12))) return tX.debug && console.log("FileSystemCache: was revalidated", e11), null;
            if (tz(e11, u10.lastModified)) return tX.debug && console.log("FileSystemCache: expired tags", e11), null;
          }
          return u10 ?? null;
        }
        async set(e10, t10, r10) {
          var i10;
          if (null == (i10 = tX.memoryCache) || i10.set(e10, { value: t10, lastModified: Date.now() }), tX.debug && console.log("FileSystemCache: set", e10), !this.flushToDisk || !t10) return;
          let n10 = new tJ(this.fs);
          if (t10.kind === tk.APP_ROUTE) {
            let r11 = this.getFilePath(`${e10}.body`, tR.APP_ROUTE);
            n10.append(r11, t10.body);
            let i11 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0 };
            n10.append(r11.replace(/\.body$/, S), JSON.stringify(i11, null, 2));
          } else if (t10.kind === tk.PAGES || t10.kind === tk.APP_PAGE) {
            let i11 = t10.kind === tk.APP_PAGE, a10 = this.getFilePath(`${e10}.html`, i11 ? tR.APP_PAGE : tR.PAGES);
            if (n10.append(a10, t10.html), r10.fetchCache || r10.isFallback || r10.isRoutePPREnabled || n10.append(this.getFilePath(`${e10}${i11 ? ".rsc" : ".json"}`, i11 ? tR.APP_PAGE : tR.PAGES), i11 ? t10.rscData : JSON.stringify(t10.pageData)), (null == t10 ? void 0 : t10.kind) === tk.APP_PAGE) {
              let e11;
              if (t10.segmentData) {
                e11 = [];
                let r12 = a10.replace(/\.html$/, ".segments");
                for (let [i12, a11] of t10.segmentData) {
                  e11.push(i12);
                  let t11 = r12 + i12 + ".segment.rsc";
                  n10.append(t11, a11);
                }
              }
              let r11 = { headers: t10.headers, status: t10.status, postponed: t10.postponed, segmentPaths: e11, prefetchHints: void 0 };
              n10.append(a10.replace(/\.html$/, S), JSON.stringify(r11));
            }
          } else if (t10.kind === tk.FETCH) {
            let i11 = this.getFilePath(e10, tR.FETCH);
            n10.append(i11, JSON.stringify({ ...t10, tags: r10.fetchCache ? r10.tags : [] }));
          }
          await n10.wait();
        }
        getFilePath(e10, t10) {
          switch (t10) {
            case tR.FETCH:
              return tK.default.join(this.serverDistDir, "..", "cache", "fetch-cache", e10);
            case tR.PAGES:
              return tK.default.join(this.serverDistDir, "pages", e10);
            case tR.IMAGE:
            case tR.APP_PAGE:
            case tR.APP_ROUTE:
              return tK.default.join(this.serverDistDir, "app", e10);
            default:
              throw Object.defineProperty(Error(`Unexpected file path kind: ${t10}`), "__NEXT_ERROR_CODE", { value: "E479", enumerable: false, configurable: true });
          }
        }
      }
      let tY = ["(..)(..)", "(.)", "(..)", "(...)"], tZ = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, t0 = /\/\[[^/]+\](?=\/|$)/;
      function t1(e10) {
        return e10.replace(/(?:\/index)?\/?$/, "") || "/";
      }
      class t2 {
        static #e = this.cacheControls = /* @__PURE__ */ new Map();
        constructor(e10) {
          this.prerenderManifest = e10;
        }
        get(e10) {
          let t10 = t2.cacheControls.get(e10);
          if (t10) return t10;
          let r10 = this.prerenderManifest.routes[e10];
          if (r10) {
            let { initialRevalidateSeconds: e11, initialExpireSeconds: t11 } = r10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
          let i10 = this.prerenderManifest.dynamicRoutes[e10];
          if (i10) {
            let { fallbackRevalidate: e11, fallbackExpire: t11 } = i10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
        }
        set(e10, t10) {
          t2.cacheControls.set(e10, t10);
        }
        clear() {
          t2.cacheControls.clear();
        }
      }
      var eJ = eJ;
      e.i(67914);
      var ec = ec;
      class t3 {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor({ fs: e10, dev: t10, flushToDisk: r10, minimalMode: i10, serverDistDir: n10, requestHeaders: a10, maxMemoryCacheSize: s10, getPrerenderManifest: o10, fetchCacheKeyPrefix: l10, CurCacheHandler: c10, allowedRevalidateHeaderKeys: u10 }) {
          var d10, h10, p10, f2;
          this.locks = /* @__PURE__ */ new Map(), this.hasCustomCacheHandler = !!c10;
          const m2 = Symbol.for("@next/cache-handlers"), g2 = globalThis;
          if (c10) t3.debug && console.log("IncrementalCache: using custom cache handler", c10.name);
          else {
            const t11 = g2[m2];
            (null == t11 ? void 0 : t11.FetchCache) ? (c10 = t11.FetchCache, t3.debug && console.log("IncrementalCache: using global FetchCache cache handler")) : e10 && n10 && (t3.debug && console.log("IncrementalCache: using filesystem cache handler"), c10 = tX);
          }
          process.env.__NEXT_TEST_MAX_ISR_CACHE && (s10 = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10)), this.dev = t10, this.disableForTestmode = "true" === process.env.NEXT_PRIVATE_TEST_PROXY, this.minimalMode = i10, this.requestHeaders = a10, this.allowedRevalidateHeaderKeys = u10, this.prerenderManifest = o10(), this.cacheControls = new t2(this.prerenderManifest), this.fetchCacheKeyPrefix = l10;
          let y2 = [];
          a10[_] === (null == (h10 = this.prerenderManifest) || null == (d10 = h10.preview) ? void 0 : d10.previewModeId) && (this.isOnDemandRevalidate = true), i10 && (y2 = this.revalidatedTags = function(e11, t11) {
            return "string" == typeof e11[x] && e11["x-next-revalidate-tag-token"] === t11 ? e11[x].split(",") : [];
          }(a10, null == (f2 = this.prerenderManifest) || null == (p10 = f2.preview) ? void 0 : p10.previewModeId)), c10 && (this.cacheHandler = new c10({ dev: t10, fs: e10, flushToDisk: r10, serverDistDir: n10, revalidatedTags: y2, maxMemoryCacheSize: s10, _requestHeaders: a10, fetchCacheKeyPrefix: l10 }));
        }
        calculateRevalidate(e10, t10, r10, i10) {
          if (r10) return Math.floor(performance.timeOrigin + performance.now() - 1e3);
          let n10 = this.cacheControls.get(t1(e10)), a10 = n10 ? n10.revalidate : !i10 && 1;
          return "number" == typeof a10 ? 1e3 * a10 + t10 : a10;
        }
        _getPathname(e10, t10) {
          return t10 ? e10 : /^\/index(\/|$)/.test(e10) && !function(e11, t11 = true) {
            return (void 0 !== e11.split("/").find((e12) => tY.find((t12) => e12.startsWith(t12))) && (e11 = function(e12) {
              let t12, r10, i10;
              for (let n10 of e12.split("/")) if (r10 = tY.find((e13) => n10.startsWith(e13))) {
                [t12, i10] = e12.split(r10, 2);
                break;
              }
              if (!t12 || !r10 || !i10) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", { value: "E269", enumerable: false, configurable: true });
              switch (t12 = es(t12), r10) {
                case "(.)":
                  i10 = "/" === t12 ? `/${i10}` : t12 + "/" + i10;
                  break;
                case "(..)":
                  if ("/" === t12) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", { value: "E207", enumerable: false, configurable: true });
                  i10 = t12.split("/").slice(0, -1).concat(i10).join("/");
                  break;
                case "(...)":
                  i10 = "/" + i10;
                  break;
                case "(..)(..)":
                  let n10 = t12.split("/");
                  if (n10.length <= 2) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", { value: "E486", enumerable: false, configurable: true });
                  i10 = n10.slice(0, -2).concat(i10).join("/");
                  break;
                default:
                  throw Object.defineProperty(Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", { value: "E112", enumerable: false, configurable: true });
              }
              return { interceptingRoute: t12, interceptedRoute: i10 };
            }(e11).interceptedRoute), t11) ? t0.test(e11) : tZ.test(e11);
          }(e10) ? `/index${e10}` : "/" === e10 ? "/index" : ea(e10);
        }
        resetRequestCache() {
          var e10, t10;
          null == (t10 = this.cacheHandler) || null == (e10 = t10.resetRequestCache) || e10.call(t10);
        }
        async lock(e10) {
          for (; ; ) {
            let t11 = this.locks.get(e10);
            if (t3.debug && console.log("IncrementalCache: lock get", e10, !!t11), !t11) break;
            await t11;
          }
          let { resolve: t10, promise: r10 } = new tf();
          return t3.debug && console.log("IncrementalCache: successfully locked", e10), this.locks.set(e10, r10), () => {
            t10(), this.locks.delete(e10);
          };
        }
        async revalidateTag(e10, t10) {
          var r10;
          return null == (r10 = this.cacheHandler) ? void 0 : r10.revalidateTag(e10, t10);
        }
        async generateCacheKey(e10, t10 = {}) {
          let r10 = [], i10 = new TextEncoder(), n10 = new TextDecoder();
          if (t10.body) if (t10.body instanceof Uint8Array) r10.push(n10.decode(t10.body)), t10._ogBody = t10.body;
          else if ("function" == typeof t10.body.getReader) {
            let e11 = t10.body, a11 = [];
            try {
              await e11.pipeTo(new WritableStream({ write(e12) {
                "string" == typeof e12 ? (a11.push(i10.encode(e12)), r10.push(e12)) : (a11.push(e12), r10.push(n10.decode(e12, { stream: true })));
              } })), r10.push(n10.decode());
              let s11 = a11.reduce((e12, t11) => e12 + t11.length, 0), o11 = new Uint8Array(s11), l10 = 0;
              for (let e12 of a11) o11.set(e12, l10), l10 += e12.length;
              t10._ogBody = o11;
            } catch (e12) {
              console.error("Problem reading body", e12);
            }
          } else if ("function" == typeof t10.body.keys) {
            let e11 = t10.body;
            for (let i11 of (t10._ogBody = t10.body, /* @__PURE__ */ new Set([...e11.keys()]))) {
              let t11 = e11.getAll(i11);
              r10.push(`${i11}=${(await Promise.all(t11.map(async (e12) => "string" == typeof e12 ? e12 : await e12.text()))).join(",")}`);
            }
          } else if ("function" == typeof t10.body.arrayBuffer) {
            let e11 = t10.body, i11 = await e11.arrayBuffer();
            r10.push(await e11.text()), t10._ogBody = new Blob([i11], { type: e11.type });
          } else "string" == typeof t10.body && (r10.push(t10.body), t10._ogBody = t10.body);
          let a10 = "function" == typeof (t10.headers || {}).keys ? Object.fromEntries(t10.headers) : Object.assign({}, t10.headers);
          "traceparent" in a10 && delete a10.traceparent, "tracestate" in a10 && delete a10.tracestate;
          let s10 = JSON.stringify(["v3", this.fetchCacheKeyPrefix || "", e10, t10.method, a10, t10.mode, t10.redirect, t10.credentials, t10.referrer, t10.referrerPolicy, t10.integrity, t10.cache, r10]);
          {
            var o10;
            let e11 = i10.encode(s10);
            return o10 = await crypto.subtle.digest("SHA-256", e11), Array.prototype.map.call(new Uint8Array(o10), (e12) => e12.toString(16).padStart(2, "0")).join("");
          }
        }
        async get(e10, t10) {
          var r10, i10, n10, a10, s10, o10, l10;
          let c10, u10;
          if (t10.kind === tR.FETCH) {
            let r11 = eJ.workUnitAsyncStorageInstance.getStore(), i11 = r11 ? (0, eQ.getRenderResumeDataCache)(r11) : null;
            if (i11) {
              let r12 = i11.fetch.get(e10);
              if ((null == r12 ? void 0 : r12.kind) === tk.FETCH) {
                let i12 = ec.workAsyncStorageInstance.getStore();
                if (![...t10.tags || [], ...t10.softTags || []].some((e11) => {
                  var t11, r13;
                  return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == i12 || null == (r13 = i12.pendingRevalidatedTags) ? void 0 : r13.some((t12) => t12.tag === e11));
                })) return t3.debug && console.log("IncrementalCache: rdc:hit", e10), { isStale: false, value: r12 };
                t3.debug && console.log("IncrementalCache: rdc:revalidated-tag", e10);
              } else t3.debug && console.log("IncrementalCache: rdc:miss", e10);
            } else t3.debug && console.log("IncrementalCache: rdc:no-resume-data");
          }
          if (this.disableForTestmode || this.dev && (t10.kind !== tR.FETCH || "no-cache" === this.requestHeaders["cache-control"])) return null;
          e10 = this._getPathname(e10, t10.kind === tR.FETCH);
          let d10 = await (null == (r10 = this.cacheHandler) ? void 0 : r10.get(e10, t10));
          if (t10.kind === tR.FETCH) {
            if (!d10) return null;
            if ((null == (n10 = d10.value) ? void 0 : n10.kind) !== tk.FETCH) throw Object.defineProperty(new eX.InvariantError(`Expected cached value for cache key ${JSON.stringify(e10)} to be a "FETCH" kind, got ${JSON.stringify(null == (a10 = d10.value) ? void 0 : a10.kind)} instead.`), "__NEXT_ERROR_CODE", { value: "E653", enumerable: false, configurable: true });
            let r11 = ec.workAsyncStorageInstance.getStore(), i11 = [...t10.tags || [], ...t10.softTags || []];
            if (i11.some((e11) => {
              var t11, i12;
              return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == r11 || null == (i12 = r11.pendingRevalidatedTags) ? void 0 : i12.some((t12) => t12.tag === e11));
            })) return t3.debug && console.log("IncrementalCache: expired tag", e10), null;
            let s11 = eJ.workUnitAsyncStorageInstance.getStore();
            if (s11) {
              let t11 = (0, eQ.getPrerenderResumeDataCache)(s11);
              t11 && (t3.debug && console.log("IncrementalCache: rdc:set", e10), t11.fetch.set(e10, d10.value));
            }
            let o11 = t10.revalidate || d10.value.revalidate, l11 = (performance.timeOrigin + performance.now() - (d10.lastModified || 0)) / 1e3 > o11, c11 = d10.value.data;
            return tz(i11, d10.lastModified) ? null : (tQ(i11, d10.lastModified) && (l11 = true), { isStale: l11, value: { kind: tk.FETCH, data: c11, revalidate: o11 } });
          }
          if ((null == d10 || null == (i10 = d10.value) ? void 0 : i10.kind) === tk.FETCH) throw Object.defineProperty(new eX.InvariantError(`Expected cached value for cache key ${JSON.stringify(e10)} not to be a ${JSON.stringify(t10.kind)} kind, got "FETCH" instead.`), "__NEXT_ERROR_CODE", { value: "E652", enumerable: false, configurable: true });
          let h10 = null, { isFallback: p10 } = t10, f2 = this.cacheControls.get(t1(e10));
          if ((null == d10 ? void 0 : d10.lastModified) === -1) c10 = -1, u10 = -31536e6;
          else {
            let r11 = performance.timeOrigin + performance.now(), i11 = (null == d10 ? void 0 : d10.lastModified) || r11;
            if (void 0 === (c10 = false !== (u10 = this.calculateRevalidate(e10, i11, this.dev ?? false, t10.isFallback)) && u10 < r11 || void 0) && ((null == d10 || null == (s10 = d10.value) ? void 0 : s10.kind) === tk.APP_PAGE || (null == d10 || null == (o10 = d10.value) ? void 0 : o10.kind) === tk.APP_ROUTE)) {
              let e11 = null == (l10 = d10.value.headers) ? void 0 : l10[E];
              if ("string" == typeof e11) {
                let t11 = e11.split(",");
                t11.length > 0 && (tz(t11, i11) ? c10 = -1 : tQ(t11, i11) && (c10 = true));
              }
            }
          }
          return d10 && (h10 = { isStale: c10, cacheControl: f2, revalidateAfter: u10, value: d10.value, isFallback: p10 }), !d10 && this.prerenderManifest.notFoundRoutes.includes(e10) && (h10 = { isStale: c10, value: null, cacheControl: f2, revalidateAfter: u10, isFallback: p10 }, this.set(e10, h10.value, { ...t10, cacheControl: f2 })), h10;
        }
        async set(e10, t10, r10) {
          if ((null == t10 ? void 0 : t10.kind) === tk.FETCH) {
            let r11 = eJ.workUnitAsyncStorageInstance.getStore(), i11 = r11 ? (0, eQ.getPrerenderResumeDataCache)(r11) : null;
            i11 && (t3.debug && console.log("IncrementalCache: rdc:set", e10), i11.fetch.set(e10, t10));
          }
          if (this.disableForTestmode || this.dev && !r10.fetchCache) return;
          e10 = this._getPathname(e10, r10.fetchCache);
          let i10 = JSON.stringify(t10).length;
          if (r10.fetchCache && i10 > 2097152 && !this.hasCustomCacheHandler && !r10.isImplicitBuildTimeCache) {
            let t11 = `Failed to set Next.js data cache for ${r10.fetchUrl || e10}, items over 2MB can not be cached (${i10} bytes)`;
            if (this.dev) throw Object.defineProperty(Error(t11), "__NEXT_ERROR_CODE", { value: "E1003", enumerable: false, configurable: true });
            console.warn(t11);
            return;
          }
          try {
            var n10;
            !r10.fetchCache && r10.cacheControl && this.cacheControls.set(t1(e10), r10.cacheControl), await (null == (n10 = this.cacheHandler) ? void 0 : n10.set(e10, t10, r10));
          } catch (t11) {
            console.warn("Failed to update prerender cache for", e10, t11);
          }
        }
      }
      var t4 = function(e10, t10, r10, i10, n10) {
        if ("m" === i10) throw TypeError("Private method is not writable");
        if ("a" === i10 && !n10) throw TypeError("Private accessor was defined without a setter");
        if ("function" == typeof t10 ? e10 !== t10 || !n10 : !t10.has(e10)) throw TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === i10 ? n10.call(e10, r10) : n10 ? n10.value = r10 : t10.set(e10, r10), r10;
      }, t5 = function(e10, t10, r10, i10) {
        if ("a" === r10 && !i10) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t10 ? e10 !== t10 || !i10 : !t10.has(e10)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === r10 ? i10 : "a" === r10 ? i10.call(e10) : i10 ? i10.value : t10.get(e10);
      };
      function t6(e10) {
        let t10 = e10 ? "__Secure-" : "";
        return { sessionToken: { name: `${t10}authjs.session-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, callbackUrl: { name: `${t10}authjs.callback-url`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, csrfToken: { name: `${e10 ? "__Host-" : ""}authjs.csrf-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, pkceCodeVerifier: { name: `${t10}authjs.pkce.code_verifier`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } }, state: { name: `${t10}authjs.state`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } }, nonce: { name: `${t10}authjs.nonce`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, webauthnChallenge: { name: `${t10}authjs.challenge`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } } };
      }
      class t8 {
        constructor(e10, t10, r10) {
          if (ad.add(this), ah.set(this, {}), ap.set(this, void 0), af.set(this, void 0), t4(this, af, r10, "f"), t4(this, ap, e10, "f"), !t10) return;
          const { name: i10 } = e10;
          for (const [e11, r11] of Object.entries(t10)) e11.startsWith(i10) && r11 && (t5(this, ah, "f")[e11] = r11);
        }
        get value() {
          return Object.keys(t5(this, ah, "f")).sort((e10, t10) => parseInt(e10.split(".").pop() || "0") - parseInt(t10.split(".").pop() || "0")).map((e10) => t5(this, ah, "f")[e10]).join("");
        }
        chunk(e10, t10) {
          let r10 = t5(this, ad, "m", ag).call(this);
          for (let i10 of t5(this, ad, "m", am).call(this, { name: t5(this, ap, "f").name, value: e10, options: { ...t5(this, ap, "f").options, ...t10 } })) r10[i10.name] = i10;
          return Object.values(r10);
        }
        clean() {
          return Object.values(t5(this, ad, "m", ag).call(this));
        }
      }
      ah = /* @__PURE__ */ new WeakMap(), ap = /* @__PURE__ */ new WeakMap(), af = /* @__PURE__ */ new WeakMap(), ad = /* @__PURE__ */ new WeakSet(), am = function(e10) {
        let t10 = Math.ceil(e10.value.length / 3936);
        if (1 === t10) return t5(this, ah, "f")[e10.name] = e10.value, [e10];
        let r10 = [];
        for (let i10 = 0; i10 < t10; i10++) {
          let t11 = `${e10.name}.${i10}`, n10 = e10.value.substr(3936 * i10, 3936);
          r10.push({ ...e10, name: t11, value: n10 }), t5(this, ah, "f")[t11] = n10;
        }
        return t5(this, af, "f").debug("CHUNKING_SESSION_COOKIE", { message: "Session cookie exceeds allowed 4096 bytes.", emptyCookieSize: 160, valueSize: e10.value.length, chunks: r10.map((e11) => e11.value.length + 160) }), r10;
      }, ag = function() {
        let e10 = {};
        for (let t10 in t5(this, ah, "f")) delete t5(this, ah, "f")?.[t10], e10[t10] = { name: t10, value: "", options: { ...t5(this, ap, "f").options, maxAge: 0 } };
        return e10;
      };
      class t9 extends Error {
        constructor(e10, t10) {
          e10 instanceof Error ? super(void 0, { cause: { err: e10, ...e10.cause, ...t10 } }) : "string" == typeof e10 ? (t10 instanceof Error && (t10 = { err: t10, ...t10.cause }), super(e10, t10)) : super(void 0, e10), this.name = this.constructor.name, this.type = this.constructor.type ?? "AuthError", this.kind = this.constructor.kind ?? "error", Error.captureStackTrace?.(this, this.constructor);
          const r10 = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
          this.message += `${this.message ? ". " : ""}Read more at ${r10}`;
        }
      }
      class t7 extends t9 {
      }
      t7.kind = "signIn";
      class re extends t9 {
      }
      re.type = "AdapterError";
      class rt extends t9 {
      }
      rt.type = "AccessDenied";
      class rr extends t9 {
      }
      rr.type = "CallbackRouteError";
      class ri extends t9 {
      }
      ri.type = "ErrorPageLoop";
      class rn extends t9 {
      }
      rn.type = "EventError";
      class ra extends t9 {
      }
      ra.type = "InvalidCallbackUrl";
      class rs extends t7 {
        constructor() {
          super(...arguments), this.code = "credentials";
        }
      }
      rs.type = "CredentialsSignin";
      class ro extends t9 {
      }
      ro.type = "InvalidEndpoints";
      class rl extends t9 {
      }
      rl.type = "InvalidCheck";
      class rc extends t9 {
      }
      rc.type = "JWTSessionError";
      class ru extends t9 {
      }
      ru.type = "MissingAdapter";
      class rd extends t9 {
      }
      rd.type = "MissingAdapterMethods";
      class rh extends t9 {
      }
      rh.type = "MissingAuthorize";
      class rp extends t9 {
      }
      rp.type = "MissingSecret";
      class rf extends t7 {
      }
      rf.type = "OAuthAccountNotLinked";
      class rm extends t7 {
      }
      rm.type = "OAuthCallbackError";
      class rg extends t9 {
      }
      rg.type = "OAuthProfileParseError";
      class ry extends t9 {
      }
      ry.type = "SessionTokenError";
      class rb extends t9 {
      }
      rb.type = "SignOutError";
      class rw extends t9 {
      }
      rw.type = "UnknownAction";
      class rv extends t9 {
      }
      rv.type = "UnsupportedStrategy";
      class r_ extends t9 {
      }
      r_.type = "InvalidProvider";
      class rS extends t9 {
      }
      rS.type = "UntrustedHost";
      class rE extends t9 {
      }
      rE.type = "Verification";
      class rx extends t7 {
      }
      rx.type = "MissingCSRF";
      let rT = /* @__PURE__ */ new Set(["CredentialsSignin", "OAuthAccountNotLinked", "OAuthCallbackError", "AccessDenied", "Verification", "MissingCSRF", "AccountNotLinked", "WebAuthnVerificationError"]);
      class rC extends t9 {
      }
      rC.type = "DuplicateConditionalUI";
      class rA extends t9 {
      }
      rA.type = "MissingWebAuthnAutocomplete";
      class rP extends t9 {
      }
      rP.type = "WebAuthnVerificationError";
      class rk extends t7 {
      }
      rk.type = "AccountNotLinked";
      class rR extends t9 {
      }
      rR.type = "ExperimentalFeatureNotEnabled";
      let rO = false;
      function rN(e10, t10) {
        try {
          return /^https?:/.test(new URL(e10, e10.startsWith("/") ? t10 : void 0).protocol);
        } catch {
          return false;
        }
      }
      let rI = false, r$ = false, rD = false, rL = ["createVerificationToken", "useVerificationToken", "getUserByEmail"], rU = ["createUser", "getUser", "getUserByEmail", "getUserByAccount", "updateUser", "linkAccount", "createSession", "getSessionAndUser", "updateSession", "deleteSession"], rj = ["createUser", "getUser", "linkAccount", "getAccount", "getAuthenticator", "createAuthenticator", "listAuthenticatorsByUserId", "updateAuthenticatorCounter"], rM = async (e10, t10, r10, i10, n10) => {
        let { crypto: { subtle: a10 } } = (() => {
          if ("u" > typeof globalThis) return globalThis;
          if ("u" > typeof self) return self;
          throw Error("unable to locate global object");
        })();
        return new Uint8Array(await a10.deriveBits({ name: "HKDF", hash: `SHA-${e10.substr(3)}`, salt: r10, info: i10 }, await a10.importKey("raw", t10, "HKDF", false, ["deriveBits"]), n10 << 3));
      };
      function rB(e10, t10) {
        if ("string" == typeof e10) return new TextEncoder().encode(e10);
        if (!(e10 instanceof Uint8Array)) throw TypeError(`"${t10}"" must be an instance of Uint8Array or a string`);
        return e10;
      }
      async function rH(e10, t10, r10, i10, n10) {
        return rM(function(e11) {
          switch (e11) {
            case "sha256":
            case "sha384":
            case "sha512":
            case "sha1":
              return e11;
            default:
              throw TypeError('unsupported "digest" value');
          }
        }(e10), function(e11) {
          let t11 = rB(e11, "ikm");
          if (!t11.byteLength) throw TypeError('"ikm" must be at least one byte in length');
          return t11;
        }(t10), rB(r10, "salt"), function(e11) {
          let t11 = rB(e11, "info");
          if (t11.byteLength > 1024) throw TypeError('"info" must not contain more than 1024 bytes');
          return t11;
        }(i10), function(e11, t11) {
          if ("number" != typeof e11 || !Number.isInteger(e11) || e11 < 1) throw TypeError('"keylen" must be a positive integer');
          if (e11 > 255 * (parseInt(t11.substr(3), 10) >> 3 || 20)) throw TypeError('"keylen" too large');
          return e11;
        }(n10, e10));
      }
      let rq = new TextEncoder(), rF = new TextDecoder();
      function rW(...e10) {
        let t10 = new Uint8Array(e10.reduce((e11, { length: t11 }) => e11 + t11, 0)), r10 = 0;
        for (let i10 of e10) t10.set(i10, r10), r10 += i10.length;
        return t10;
      }
      function rK(e10, t10, r10) {
        if (t10 < 0 || t10 >= 4294967296) throw RangeError(`value must be >= 0 and <= ${4294967296 - 1}. Received ${t10}`);
        e10.set([t10 >>> 24, t10 >>> 16, t10 >>> 8, 255 & t10], r10);
      }
      function rV(e10) {
        let t10 = Math.floor(e10 / 4294967296), r10 = new Uint8Array(8);
        return rK(r10, t10, 0), rK(r10, e10 % 4294967296, 4), r10;
      }
      function rz(e10) {
        let t10 = new Uint8Array(4);
        return rK(t10, e10), t10;
      }
      function rQ(e10) {
        let t10 = new Uint8Array(e10.length);
        for (let r10 = 0; r10 < e10.length; r10++) {
          let i10 = e10.charCodeAt(r10);
          if (i10 > 127) throw TypeError("non-ASCII string encountered in encode()");
          t10[r10] = i10;
        }
        return t10;
      }
      function rJ(e10) {
        if (Uint8Array.fromBase64) return Uint8Array.fromBase64("string" == typeof e10 ? e10 : rF.decode(e10), { alphabet: "base64url" });
        let t10 = e10;
        t10 instanceof Uint8Array && (t10 = rF.decode(t10)), t10 = t10.replace(/-/g, "+").replace(/_/g, "/");
        try {
          var r10 = t10;
          if (Uint8Array.fromBase64) return Uint8Array.fromBase64(r10);
          let e11 = atob(r10), i10 = new Uint8Array(e11.length);
          for (let t11 = 0; t11 < e11.length; t11++) i10[t11] = e11.charCodeAt(t11);
          return i10;
        } catch {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      }
      function rG(e10) {
        let t10 = e10;
        return ("string" == typeof t10 && (t10 = rq.encode(t10)), Uint8Array.prototype.toBase64) ? t10.toBase64({ alphabet: "base64url", omitPadding: true }) : function(e11) {
          if (Uint8Array.prototype.toBase64) return e11.toBase64();
          let t11 = [];
          for (let r10 = 0; r10 < e11.length; r10 += 32768) t11.push(String.fromCharCode.apply(null, e11.subarray(r10, r10 + 32768)));
          return btoa(t11.join(""));
        }(t10).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      e.s(["decode", 0, rJ, "encode", 0, rG], 22423);
      let rX = Symbol();
      function rY(e10, t10) {
        if (e10) throw TypeError(`${t10} can only be called once`);
      }
      function rZ(e10, t10, r10) {
        try {
          return rJ(e10);
        } catch {
          throw new r10(`Failed to base64url decode the ${t10}`);
        }
      }
      async function r0(e10, t10) {
        let r10 = `SHA-${e10.slice(-3)}`;
        return new Uint8Array(await crypto.subtle.digest(r10, t10));
      }
      let r1 = (e10, t10 = "algorithm.name") => TypeError(`CryptoKey does not support this operation, its ${t10} must be ${e10}`);
      function r2(e10, t10, r10) {
        switch (t10) {
          case "A128GCM":
          case "A192GCM":
          case "A256GCM": {
            if ("AES-GCM" !== e10.algorithm.name) throw r1("AES-GCM");
            let r11 = parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw r1(r11, "algorithm.length");
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW": {
            if ("AES-KW" !== e10.algorithm.name) throw r1("AES-KW");
            let r11 = parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw r1(r11, "algorithm.length");
            break;
          }
          case "ECDH":
            switch (e10.algorithm.name) {
              case "ECDH":
              case "X25519":
                break;
              default:
                throw r1("ECDH or X25519");
            }
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW":
            if ("PBKDF2" !== e10.algorithm.name) throw r1("PBKDF2");
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            if ("RSA-OAEP" !== e10.algorithm.name) throw r1("RSA-OAEP");
            var i10 = e10.algorithm, n10 = parseInt(t10.slice(9), 10) || 1;
            if (parseInt(i10.hash.name.slice(4), 10) !== n10) throw r1(`SHA-${n10}`, "algorithm.hash");
            break;
          default:
            throw TypeError("CryptoKey does not support this operation");
        }
        if (r10 && !e10.usages.includes(r10)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${r10}.`);
      }
      function r3(e10, t10, ...r10) {
        if ((r10 = r10.filter(Boolean)).length > 2) {
          let t11 = r10.pop();
          e10 += `one of type ${r10.join(", ")}, or ${t11}.`;
        } else 2 === r10.length ? e10 += `one of type ${r10[0]} or ${r10[1]}.` : e10 += `of type ${r10[0]}.`;
        return null == t10 ? e10 += ` Received ${t10}` : "function" == typeof t10 && t10.name ? e10 += ` Received function ${t10.name}` : "object" == typeof t10 && null != t10 && t10.constructor?.name && (e10 += ` Received an instance of ${t10.constructor.name}`), e10;
      }
      let r4 = (e10, ...t10) => r3("Key must be ", e10, ...t10), r5 = (e10, t10, ...r10) => r3(`Key for the ${e10} algorithm must be `, t10, ...r10);
      class r6 extends Error {
        static code = "ERR_JOSE_GENERIC";
        code = "ERR_JOSE_GENERIC";
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class r8 extends r6 {
        static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", i10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: i10, payload: t10 } }), this.claim = r10, this.reason = i10, this.payload = t10;
        }
      }
      class r9 extends r6 {
        static code = "ERR_JWT_EXPIRED";
        code = "ERR_JWT_EXPIRED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", i10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: i10, payload: t10 } }), this.claim = r10, this.reason = i10, this.payload = t10;
        }
      }
      class r7 extends r6 {
        static code = "ERR_JOSE_ALG_NOT_ALLOWED";
        code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      class ie extends r6 {
        static code = "ERR_JOSE_NOT_SUPPORTED";
        code = "ERR_JOSE_NOT_SUPPORTED";
      }
      class it extends r6 {
        static code = "ERR_JWE_DECRYPTION_FAILED";
        code = "ERR_JWE_DECRYPTION_FAILED";
        constructor(e10 = "decryption operation failed", t10) {
          super(e10, t10);
        }
      }
      class ir extends r6 {
        static code = "ERR_JWE_INVALID";
        code = "ERR_JWE_INVALID";
      }
      class ii extends r6 {
        static code = "ERR_JWT_INVALID";
        code = "ERR_JWT_INVALID";
      }
      class ia extends r6 {
        static code = "ERR_JWK_INVALID";
        code = "ERR_JWK_INVALID";
      }
      class is extends r6 {
        [Symbol.asyncIterator];
        static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        constructor(e10 = "multiple matching keys found in the JSON Web Key Set", t10) {
          super(e10, t10);
        }
      }
      function io(e10) {
        if (!il(e10)) throw Error("CryptoKey instance expected");
      }
      let il = (e10) => {
        if (e10?.[Symbol.toStringTag] === "CryptoKey") return true;
        try {
          return e10 instanceof CryptoKey;
        } catch {
          return false;
        }
      }, ic = (e10) => e10?.[Symbol.toStringTag] === "KeyObject", iu = (e10) => il(e10) || ic(e10);
      function id(e10) {
        switch (e10) {
          case "A128GCM":
            return 128;
          case "A192GCM":
            return 192;
          case "A256GCM":
          case "A128CBC-HS256":
            return 256;
          case "A192CBC-HS384":
            return 384;
          case "A256CBC-HS512":
            return 512;
          default:
            throw new ie(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      let ih = (e10) => crypto.getRandomValues(new Uint8Array(id(e10) >> 3));
      function ip(e10, t10) {
        let r10 = e10.byteLength << 3;
        if (r10 !== t10) throw new ir(`Invalid Content Encryption Key length. Expected ${t10} bits, got ${r10} bits`);
      }
      function im(e10) {
        switch (e10) {
          case "A128GCM":
          case "A128GCMKW":
          case "A192GCM":
          case "A192GCMKW":
          case "A256GCM":
          case "A256GCMKW":
            return 96;
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return 128;
          default:
            throw new ie(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      function ig(e10, t10) {
        if (t10.length << 3 !== im(e10)) throw new ir("Invalid Initialization Vector length");
      }
      async function iy(e10, t10, r10) {
        if (!(t10 instanceof Uint8Array)) throw TypeError(r4(t10, "Uint8Array"));
        let i10 = parseInt(e10.slice(1, 4), 10);
        return { encKey: await crypto.subtle.importKey("raw", t10.subarray(i10 >> 3), "AES-CBC", false, [r10]), macKey: await crypto.subtle.importKey("raw", t10.subarray(0, i10 >> 3), { hash: `SHA-${i10 << 1}`, name: "HMAC" }, false, ["sign"]), keySize: i10 };
      }
      async function ib(e10, t10, r10) {
        return new Uint8Array((await crypto.subtle.sign("HMAC", e10, t10)).slice(0, r10 >> 3));
      }
      async function iw(e10, t10, r10, i10, n10) {
        let { encKey: a10, macKey: s10, keySize: o10 } = await iy(e10, r10, "encrypt"), l10 = new Uint8Array(await crypto.subtle.encrypt({ iv: i10, name: "AES-CBC" }, a10, t10)), c10 = rW(n10, i10, l10, rV(n10.length << 3));
        return { ciphertext: l10, tag: await ib(s10, c10, o10), iv: i10 };
      }
      async function iv(e10, t10) {
        if (!(e10 instanceof Uint8Array)) throw TypeError("First argument must be a buffer");
        if (!(t10 instanceof Uint8Array)) throw TypeError("Second argument must be a buffer");
        let r10 = { name: "HMAC", hash: "SHA-256" }, i10 = await crypto.subtle.generateKey(r10, false, ["sign"]), n10 = new Uint8Array(await crypto.subtle.sign(r10, i10, e10)), a10 = new Uint8Array(await crypto.subtle.sign(r10, i10, t10)), s10 = 0, o10 = -1;
        for (; ++o10 < 32; ) s10 |= n10[o10] ^ a10[o10];
        return 0 === s10;
      }
      async function i_(e10, t10, r10, i10, n10, a10) {
        let s10, o10, { encKey: l10, macKey: c10, keySize: u10 } = await iy(e10, t10, "decrypt"), d10 = rW(a10, i10, r10, rV(a10.length << 3)), h10 = await ib(c10, d10, u10);
        try {
          s10 = await iv(n10, h10);
        } catch {
        }
        if (!s10) throw new it();
        try {
          o10 = new Uint8Array(await crypto.subtle.decrypt({ iv: i10, name: "AES-CBC" }, l10, r10));
        } catch {
        }
        if (!o10) throw new it();
        return o10;
      }
      async function iS(e10, t10, r10, i10, n10) {
        let a10;
        r10 instanceof Uint8Array ? a10 = await crypto.subtle.importKey("raw", r10, "AES-GCM", false, ["encrypt"]) : (r2(r10, e10, "encrypt"), a10 = r10);
        let s10 = new Uint8Array(await crypto.subtle.encrypt({ additionalData: n10, iv: i10, name: "AES-GCM", tagLength: 128 }, a10, t10)), o10 = s10.slice(-16);
        return { ciphertext: s10.slice(0, -16), tag: o10, iv: i10 };
      }
      async function iE(e10, t10, r10, i10, n10, a10) {
        let s10;
        t10 instanceof Uint8Array ? s10 = await crypto.subtle.importKey("raw", t10, "AES-GCM", false, ["decrypt"]) : (r2(t10, e10, "decrypt"), s10 = t10);
        try {
          return new Uint8Array(await crypto.subtle.decrypt({ additionalData: a10, iv: i10, name: "AES-GCM", tagLength: 128 }, s10, rW(r10, n10)));
        } catch {
          throw new it();
        }
      }
      let ix = "Unsupported JWE Content Encryption Algorithm";
      async function iT(e10, t10, r10, i10, n10) {
        if (!il(r10) && !(r10 instanceof Uint8Array)) throw TypeError(r4(r10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        if (i10) ig(e10, i10);
        else i10 = crypto.getRandomValues(new Uint8Array(im(e10) >> 3));
        switch (e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return r10 instanceof Uint8Array && ip(r10, parseInt(e10.slice(-3), 10)), iw(e10, t10, r10, i10, n10);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return r10 instanceof Uint8Array && ip(r10, parseInt(e10.slice(1, 4), 10)), iS(e10, t10, r10, i10, n10);
          default:
            throw new ie(ix);
        }
      }
      async function iC(e10, t10, r10, i10, n10, a10) {
        if (!il(t10) && !(t10 instanceof Uint8Array)) throw TypeError(r4(t10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        if (!i10) throw new ir("JWE Initialization Vector missing");
        if (!n10) throw new ir("JWE Authentication Tag missing");
        switch (ig(e10, i10), e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return t10 instanceof Uint8Array && ip(t10, parseInt(e10.slice(-3), 10)), i_(e10, t10, r10, i10, n10, a10);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return t10 instanceof Uint8Array && ip(t10, parseInt(e10.slice(1, 4), 10)), iE(e10, t10, r10, i10, n10, a10);
          default:
            throw new ie(ix);
        }
      }
      function iA(e10, t10) {
        if (e10.algorithm.length !== parseInt(t10.slice(1, 4), 10)) throw TypeError(`Invalid key size for alg: ${t10}`);
      }
      function iP(e10, t10, r10) {
        return e10 instanceof Uint8Array ? crypto.subtle.importKey("raw", e10, "AES-KW", true, [r10]) : (r2(e10, t10, r10), e10);
      }
      async function ik(e10, t10, r10) {
        let i10 = await iP(t10, e10, "wrapKey");
        iA(i10, e10);
        let n10 = await crypto.subtle.importKey("raw", r10, { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.wrapKey("raw", n10, i10, "AES-KW"));
      }
      async function iR(e10, t10, r10) {
        let i10 = await iP(t10, e10, "unwrapKey");
        iA(i10, e10);
        let n10 = await crypto.subtle.unwrapKey("raw", r10, i10, "AES-KW", { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.exportKey("raw", n10));
      }
      function iO(e10) {
        return rW(rz(e10.length), e10);
      }
      async function iN(e10, t10, r10) {
        let i10 = t10 >> 3, n10 = Math.ceil(i10 / 32), a10 = new Uint8Array(32 * n10);
        for (let t11 = 1; t11 <= n10; t11++) {
          let i11 = new Uint8Array(4 + e10.length + r10.length);
          i11.set(rz(t11), 0), i11.set(e10, 4), i11.set(r10, 4 + e10.length);
          let n11 = await r0("sha256", i11);
          a10.set(n11, (t11 - 1) * 32);
        }
        return a10.slice(0, i10);
      }
      async function iI(e10, t10, r10, i10, n10 = new Uint8Array(), a10 = new Uint8Array()) {
        var s10;
        r2(e10, "ECDH"), r2(t10, "ECDH", "deriveBits");
        let o10 = rW(iO(rQ(r10)), iO(n10), iO(a10), rz(i10), new Uint8Array());
        return iN(new Uint8Array(await crypto.subtle.deriveBits({ name: e10.algorithm.name, public: e10 }, t10, "X25519" === (s10 = e10).algorithm.name ? 256 : Math.ceil(parseInt(s10.algorithm.namedCurve.slice(-3), 10) / 8) << 3)), i10, o10);
      }
      function i$(e10) {
        switch (e10.algorithm.namedCurve) {
          case "P-256":
          case "P-384":
          case "P-521":
            return true;
          default:
            return "X25519" === e10.algorithm.name;
        }
      }
      async function iD(e10, t10, r10, i10) {
        if (!(e10 instanceof Uint8Array) || e10.length < 8) throw new ir("PBES2 Salt Input must be 8 or more octets");
        if (!Number.isSafeInteger(r10) || 1 !== Math.sign(r10)) throw new ir("PBES2 Count Input must be a positive integer");
        let n10 = rW(rQ(t10), Uint8Array.of(0), e10), a10 = parseInt(t10.slice(13, 16), 10), s10 = { hash: `SHA-${t10.slice(8, 11)}`, iterations: r10, name: "PBKDF2", salt: n10 }, o10 = await (i10 instanceof Uint8Array ? crypto.subtle.importKey("raw", i10, "PBKDF2", false, ["deriveBits"]) : (r2(i10, t10, "deriveBits"), i10));
        return new Uint8Array(await crypto.subtle.deriveBits(s10, o10, a10));
      }
      async function iL(e10, t10, r10, i10 = 2048, n10 = crypto.getRandomValues(new Uint8Array(16))) {
        let a10 = await iD(n10, e10, i10, t10);
        return { encryptedKey: await ik(e10.slice(-6), a10, r10), p2c: i10, p2s: rG(n10) };
      }
      async function iU(e10, t10, r10, i10, n10) {
        let a10 = await iD(n10, e10, i10, t10);
        return iR(e10.slice(-6), a10, r10);
      }
      function ij(e10, t10) {
        if (e10.startsWith("RS") || e10.startsWith("PS")) {
          let { modulusLength: r10 } = t10.algorithm;
          if ("number" != typeof r10 || r10 < 2048) throw TypeError(`${e10} requires key modulusLength to be 2048 bits or larger`);
        }
      }
      let iM = (e10) => {
        switch (e10) {
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            return "RSA-OAEP";
          default:
            throw new ie(`alg ${e10} is not supported either by JOSE or your javascript runtime`);
        }
      };
      async function iB(e10, t10, r10) {
        return r2(t10, e10, "encrypt"), ij(e10, t10), new Uint8Array(await crypto.subtle.encrypt(iM(e10), t10, r10));
      }
      async function iH(e10, t10, r10) {
        return r2(t10, e10, "decrypt"), ij(e10, t10), new Uint8Array(await crypto.subtle.decrypt(iM(e10), t10, r10));
      }
      function iq(e10) {
        if ("object" != typeof e10 || null === e10 || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        if (null === Object.getPrototypeOf(e10)) return true;
        let t10 = e10;
        for (; null !== Object.getPrototypeOf(t10); ) t10 = Object.getPrototypeOf(t10);
        return Object.getPrototypeOf(e10) === t10;
      }
      function iF(...e10) {
        let t10, r10 = e10.filter(Boolean);
        if (0 === r10.length || 1 === r10.length) return true;
        for (let e11 of r10) {
          let r11 = Object.keys(e11);
          if (!t10 || 0 === t10.size) {
            t10 = new Set(r11);
            continue;
          }
          for (let e12 of r11) {
            if (t10.has(e12)) return false;
            t10.add(e12);
          }
        }
        return true;
      }
      let iW = (e10) => iq(e10) && "string" == typeof e10.kty, iK = 'Invalid or unsupported JWK "alg" (Algorithm) Parameter value';
      async function iV(e10) {
        if (!e10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: t10, keyUsages: r10 } = function(e11) {
          let t11, r11;
          switch (e11.kty) {
            case "AKP":
              switch (e11.alg) {
                case "ML-DSA-44":
                case "ML-DSA-65":
                case "ML-DSA-87":
                  t11 = { name: e11.alg }, r11 = e11.priv ? ["sign"] : ["verify"];
                  break;
                default:
                  throw new ie(iK);
              }
              break;
            case "RSA":
              switch (e11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t11 = { name: "RSA-PSS", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t11 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t11 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e11.alg.slice(-3), 10) || 1}` }, r11 = e11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new ie(iK);
              }
              break;
            case "EC":
              switch (e11.alg) {
                case "ES256":
                case "ES384":
                case "ES512":
                  t11 = { name: "ECDSA", namedCurve: { ES256: "P-256", ES384: "P-384", ES512: "P-521" }[e11.alg] }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: "ECDH", namedCurve: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new ie(iK);
              }
              break;
            case "OKP":
              switch (e11.alg) {
                case "Ed25519":
                case "EdDSA":
                  t11 = { name: "Ed25519" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new ie(iK);
              }
              break;
            default:
              throw new ie('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t11, keyUsages: r11 };
        }(e10), i10 = { ...e10 };
        return "AKP" !== i10.kty && delete i10.alg, delete i10.use, crypto.subtle.importKey("jwk", i10, t10, e10.ext ?? (!e10.d && !e10.priv), e10.key_ops ?? r10);
      }
      let iz = "given KeyObject instance cannot be used for this algorithm", iQ = async (e10, t10, r10, n10 = false) => {
        let a10 = (i ||= /* @__PURE__ */ new WeakMap()).get(e10);
        if (a10?.[r10]) return a10[r10];
        let s10 = await iV({ ...t10, alg: r10 });
        return n10 && Object.freeze(e10), a10 ? a10[r10] = s10 : i.set(e10, { [r10]: s10 }), s10;
      };
      async function iJ(e10, t10) {
        if (e10 instanceof Uint8Array || il(e10)) return e10;
        if (ic(e10)) {
          if ("secret" === e10.type) return e10.export();
          if ("toCryptoKey" in e10 && "function" == typeof e10.toCryptoKey) try {
            return ((e11, t11) => {
              let r11, n10 = (i ||= /* @__PURE__ */ new WeakMap()).get(e11);
              if (n10?.[t11]) return n10[t11];
              let a10 = "public" === e11.type, s10 = !!a10;
              if ("x25519" === e11.asymmetricKeyType) {
                switch (t11) {
                  case "ECDH-ES":
                  case "ECDH-ES+A128KW":
                  case "ECDH-ES+A192KW":
                  case "ECDH-ES+A256KW":
                    break;
                  default:
                    throw TypeError(iz);
                }
                r11 = e11.toCryptoKey(e11.asymmetricKeyType, s10, a10 ? [] : ["deriveBits"]);
              }
              if ("ed25519" === e11.asymmetricKeyType) {
                if ("EdDSA" !== t11 && "Ed25519" !== t11) throw TypeError(iz);
                r11 = e11.toCryptoKey(e11.asymmetricKeyType, s10, [a10 ? "verify" : "sign"]);
              }
              switch (e11.asymmetricKeyType) {
                case "ml-dsa-44":
                case "ml-dsa-65":
                case "ml-dsa-87":
                  if (t11 !== e11.asymmetricKeyType.toUpperCase()) throw TypeError(iz);
                  r11 = e11.toCryptoKey(e11.asymmetricKeyType, s10, [a10 ? "verify" : "sign"]);
              }
              if ("rsa" === e11.asymmetricKeyType) {
                let i10;
                switch (t11) {
                  case "RSA-OAEP":
                    i10 = "SHA-1";
                    break;
                  case "RS256":
                  case "PS256":
                  case "RSA-OAEP-256":
                    i10 = "SHA-256";
                    break;
                  case "RS384":
                  case "PS384":
                  case "RSA-OAEP-384":
                    i10 = "SHA-384";
                    break;
                  case "RS512":
                  case "PS512":
                  case "RSA-OAEP-512":
                    i10 = "SHA-512";
                    break;
                  default:
                    throw TypeError(iz);
                }
                if (t11.startsWith("RSA-OAEP")) return e11.toCryptoKey({ name: "RSA-OAEP", hash: i10 }, s10, a10 ? ["encrypt"] : ["decrypt"]);
                r11 = e11.toCryptoKey({ name: t11.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5", hash: i10 }, s10, [a10 ? "verify" : "sign"]);
              }
              if ("ec" === e11.asymmetricKeyType) {
                let i10 = (/* @__PURE__ */ new Map([["prime256v1", "P-256"], ["secp384r1", "P-384"], ["secp521r1", "P-521"]])).get(e11.asymmetricKeyDetails?.namedCurve);
                if (!i10) throw TypeError(iz);
                let n11 = { ES256: "P-256", ES384: "P-384", ES512: "P-521" };
                n11[t11] && i10 === n11[t11] && (r11 = e11.toCryptoKey({ name: "ECDSA", namedCurve: i10 }, s10, [a10 ? "verify" : "sign"])), t11.startsWith("ECDH-ES") && (r11 = e11.toCryptoKey({ name: "ECDH", namedCurve: i10 }, s10, a10 ? [] : ["deriveBits"]));
              }
              if (!r11) throw TypeError(iz);
              return n10 ? n10[t11] = r11 : i.set(e11, { [t11]: r11 }), r11;
            })(e10, t10);
          } catch (e11) {
            if (e11 instanceof TypeError) throw e11;
          }
          let r10 = e10.export({ format: "jwk" });
          return iQ(e10, r10, t10);
        }
        if (iW(e10)) return e10.k ? rJ(e10.k) : iQ(e10, e10, t10, true);
        throw Error("unreachable");
      }
      async function iG(e10, t10, r10) {
        let i10;
        if (!iq(e10)) throw TypeError("JWK must be an object");
        switch (t10 ??= e10.alg, i10 ??= r10?.extractable ?? e10.ext, e10.kty) {
          case "oct":
            if ("string" != typeof e10.k || !e10.k) throw TypeError('missing "k" (Key Value) Parameter value');
            return rJ(e10.k);
          case "RSA":
            if ("oth" in e10 && void 0 !== e10.oth) throw new ie('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            return iV({ ...e10, alg: t10, ext: i10 });
          case "AKP":
            if ("string" != typeof e10.alg || !e10.alg) throw TypeError('missing "alg" (Algorithm) Parameter value');
            if (void 0 !== t10 && t10 !== e10.alg) throw TypeError("JWK alg and alg option value mismatch");
            return iV({ ...e10, ext: i10 });
          case "EC":
          case "OKP":
            return iV({ ...e10, alg: t10, ext: i10 });
          default:
            throw new ie('Unsupported "kty" (Key Type) Parameter value');
        }
      }
      async function iX(e10) {
        if (ic(e10)) if ("secret" !== e10.type) return e10.export({ format: "jwk" });
        else e10 = e10.export();
        if (e10 instanceof Uint8Array) return { kty: "oct", k: rG(e10) };
        if (!il(e10)) throw TypeError(r4(e10, "CryptoKey", "KeyObject", "Uint8Array"));
        if (!e10.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
        let { ext: t10, key_ops: r10, alg: i10, use: n10, ...a10 } = await crypto.subtle.exportKey("jwk", e10);
        return "AKP" === a10.kty && (a10.alg = i10), a10;
      }
      async function iY(e10) {
        return iX(e10);
      }
      async function iZ(e10, t10, r10, i10) {
        let n10 = e10.slice(0, 7), a10 = await iT(n10, r10, t10, i10, new Uint8Array());
        return { encryptedKey: a10.ciphertext, iv: rG(a10.iv), tag: rG(a10.tag) };
      }
      async function i0(e10, t10, r10, i10, n10) {
        return iC(e10.slice(0, 7), t10, r10, i10, n10, new Uint8Array());
      }
      let i1 = 'Invalid or unsupported "alg" (JWE Algorithm) header value';
      function i2(e10) {
        if (void 0 === e10) throw new ir("JWE Encrypted Key missing");
      }
      async function i3(e10, t10, r10, i10, n10) {
        switch (e10) {
          case "dir":
            if (void 0 !== r10) throw new ir("Encountered unexpected JWE Encrypted Key");
            return t10;
          case "ECDH-ES":
            if (void 0 !== r10) throw new ir("Encountered unexpected JWE Encrypted Key");
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let n11, a10;
            if (!iq(i10.epk)) throw new ir('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
            if (io(t10), !i$(t10)) throw new ie("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let s10 = await iG(i10.epk, e10);
            if (io(s10), void 0 !== i10.apu) {
              if ("string" != typeof i10.apu) throw new ir('JOSE Header "apu" (Agreement PartyUInfo) invalid');
              n11 = rZ(i10.apu, "apu", ir);
            }
            if (void 0 !== i10.apv) {
              if ("string" != typeof i10.apv) throw new ir('JOSE Header "apv" (Agreement PartyVInfo) invalid');
              a10 = rZ(i10.apv, "apv", ir);
            }
            let o10 = await iI(s10, t10, "ECDH-ES" === e10 ? i10.enc : e10, "ECDH-ES" === e10 ? id(i10.enc) : parseInt(e10.slice(-5, -2), 10), n11, a10);
            if ("ECDH-ES" === e10) return o10;
            return i2(r10), iR(e10.slice(-6), o10, r10);
          }
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            return i2(r10), io(t10), iH(e10, t10, r10);
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            let a10;
            if (i2(r10), "number" != typeof i10.p2c) throw new ir('JOSE Header "p2c" (PBES2 Count) missing or invalid');
            let s10 = n10?.maxPBES2Count || 1e4;
            if (i10.p2c > s10) throw new ir('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
            if ("string" != typeof i10.p2s) throw new ir('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
            return a10 = rZ(i10.p2s, "p2s", ir), iU(e10, t10, r10, i10.p2c, a10);
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            return i2(r10), iR(e10, t10, r10);
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW":
            if (i2(r10), "string" != typeof i10.iv) throw new ir('JOSE Header "iv" (Initialization Vector) missing or invalid');
            if ("string" != typeof i10.tag) throw new ir('JOSE Header "tag" (Authentication Tag) missing or invalid');
            return i0(e10, t10, r10, rZ(i10.iv, "iv", ir), rZ(i10.tag, "tag", ir));
          default:
            throw new ie(i1);
        }
      }
      async function i4(e10, t10, r10, i10, n10 = {}) {
        let a10, s10, o10;
        switch (e10) {
          case "dir":
            o10 = r10;
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let l10;
            if (io(r10), !i$(r10)) throw new ie("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let { apu: c10, apv: u10 } = n10;
            l10 = n10.epk ? await iJ(n10.epk, e10) : (await crypto.subtle.generateKey(r10.algorithm, true, ["deriveBits"])).privateKey;
            let { x: d10, y: h10, crv: p10, kty: f2 } = await iY(l10), m2 = await iI(r10, l10, "ECDH-ES" === e10 ? t10 : e10, "ECDH-ES" === e10 ? id(t10) : parseInt(e10.slice(-5, -2), 10), c10, u10);
            if (s10 = { epk: { x: d10, crv: p10, kty: f2 } }, "EC" === f2 && (s10.epk.y = h10), c10 && (s10.apu = rG(c10)), u10 && (s10.apv = rG(u10)), "ECDH-ES" === e10) {
              o10 = m2;
              break;
            }
            o10 = i10 || ih(t10);
            let g2 = e10.slice(-6);
            a10 = await ik(g2, m2, o10);
            break;
          }
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            o10 = i10 || ih(t10), io(r10), a10 = await iB(e10, r10, o10);
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            o10 = i10 || ih(t10);
            let { p2c: l10, p2s: c10 } = n10;
            ({ encryptedKey: a10, ...s10 } = await iL(e10, r10, o10, l10, c10));
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            o10 = i10 || ih(t10), a10 = await ik(e10, r10, o10);
            break;
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            o10 = i10 || ih(t10);
            let { iv: l10 } = n10;
            ({ encryptedKey: a10, ...s10 } = await iZ(e10, r10, o10, l10));
            break;
          }
          default:
            throw new ie(i1);
        }
        return { cek: o10, encryptedKey: a10, parameters: s10 };
      }
      function i5(e10, t10, r10, i10, n10) {
        let a10;
        if (void 0 !== n10.crit && i10?.crit === void 0) throw new e10('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!i10 || void 0 === i10.crit) return /* @__PURE__ */ new Set();
        if (!Array.isArray(i10.crit) || 0 === i10.crit.length || i10.crit.some((e11) => "string" != typeof e11 || 0 === e11.length)) throw new e10('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        for (let s10 of (a10 = void 0 !== r10 ? new Map([...Object.entries(r10), ...t10.entries()]) : t10, i10.crit)) {
          if (!a10.has(s10)) throw new ie(`Extension Header Parameter "${s10}" is not recognized`);
          if (void 0 === n10[s10]) throw new e10(`Extension Header Parameter "${s10}" is missing`);
          if (a10.get(s10) && void 0 === i10[s10]) throw new e10(`Extension Header Parameter "${s10}" MUST be integrity protected`);
        }
        return new Set(i10.crit);
      }
      let i6 = (e10) => e10?.[Symbol.toStringTag], i8 = (e10, t10, r10) => {
        if (void 0 !== t10.use) {
          let e11;
          switch (r10) {
            case "sign":
            case "verify":
              e11 = "sig";
              break;
            case "encrypt":
            case "decrypt":
              e11 = "enc";
          }
          if (t10.use !== e11) throw TypeError(`Invalid key for this operation, its "use" must be "${e11}" when present`);
        }
        if (void 0 !== t10.alg && t10.alg !== e10) throw TypeError(`Invalid key for this operation, its "alg" must be "${e10}" when present`);
        if (Array.isArray(t10.key_ops)) {
          let i10;
          switch (true) {
            case ("sign" === r10 || "verify" === r10):
            case "dir" === e10:
            case e10.includes("CBC-HS"):
              i10 = r10;
              break;
            case e10.startsWith("PBES2"):
              i10 = "deriveBits";
              break;
            case /^A\d{3}(?:GCM)?(?:KW)?$/.test(e10):
              i10 = !e10.includes("GCM") && e10.endsWith("KW") ? "encrypt" === r10 ? "wrapKey" : "unwrapKey" : r10;
              break;
            case ("encrypt" === r10 && e10.startsWith("RSA")):
              i10 = "wrapKey";
              break;
            case "decrypt" === r10:
              i10 = e10.startsWith("RSA") ? "unwrapKey" : "deriveBits";
          }
          if (i10 && t10.key_ops?.includes?.(i10) === false) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${i10}" when present`);
        }
        return true;
      };
      function i9(e10, t10, r10) {
        switch (e10.substring(0, 2)) {
          case "A1":
          case "A2":
          case "di":
          case "HS":
          case "PB":
            ((e11, t11, r11) => {
              if (!(t11 instanceof Uint8Array)) {
                if (iW(t11)) {
                  if ("oct" === t11.kty && "string" == typeof t11.k && i8(e11, t11, r11)) return;
                  throw TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
                }
                if (!iu(t11)) throw TypeError(r5(e11, t11, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
                if ("secret" !== t11.type) throw TypeError(`${i6(t11)} instances for symmetric algorithms must be of type "secret"`);
              }
            })(e10, t10, r10);
            break;
          default:
            ((e11, t11, r11) => {
              if (iW(t11)) switch (r11) {
                case "decrypt":
                case "sign":
                  if ("oct" !== t11.kty && ("AKP" === t11.kty && "string" == typeof t11.priv || "string" == typeof t11.d) && i8(e11, t11, r11)) return;
                  throw TypeError("JSON Web Key for this operation must be a private JWK");
                case "encrypt":
                case "verify":
                  if ("oct" !== t11.kty && void 0 === t11.d && void 0 === t11.priv && i8(e11, t11, r11)) return;
                  throw TypeError("JSON Web Key for this operation must be a public JWK");
              }
              if (!iu(t11)) throw TypeError(r5(e11, t11, "CryptoKey", "KeyObject", "JSON Web Key"));
              if ("secret" === t11.type) throw TypeError(`${i6(t11)} instances for asymmetric algorithms must not be of type "secret"`);
              if ("public" === t11.type) switch (r11) {
                case "sign":
                  throw TypeError(`${i6(t11)} instances for asymmetric algorithm signing must be of type "private"`);
                case "decrypt":
                  throw TypeError(`${i6(t11)} instances for asymmetric algorithm decryption must be of type "private"`);
              }
              if ("private" === t11.type) switch (r11) {
                case "verify":
                  throw TypeError(`${i6(t11)} instances for asymmetric algorithm verifying must be of type "public"`);
                case "encrypt":
                  throw TypeError(`${i6(t11)} instances for asymmetric algorithm encryption must be of type "public"`);
              }
            })(e10, t10, r10);
        }
      }
      function i7(e10) {
        if (void 0 === globalThis[e10]) throw new ie(`JWE "zip" (Compression Algorithm) Header Parameter requires the ${e10} API.`);
      }
      async function ne(e10) {
        i7("CompressionStream");
        let t10 = new CompressionStream("deflate-raw"), r10 = t10.writable.getWriter();
        r10.write(e10).catch(() => {
        }), r10.close().catch(() => {
        });
        let i10 = [], n10 = t10.readable.getReader();
        for (; ; ) {
          let { value: e11, done: t11 } = await n10.read();
          if (t11) break;
          i10.push(e11);
        }
        return rW(...i10);
      }
      async function nt(e10, t10) {
        i7("DecompressionStream");
        let r10 = new DecompressionStream("deflate-raw"), i10 = r10.writable.getWriter();
        i10.write(e10).catch(() => {
        }), i10.close().catch(() => {
        });
        let n10 = [], a10 = 0, s10 = r10.readable.getReader();
        for (; ; ) {
          let { value: e11, done: r11 } = await s10.read();
          if (r11) break;
          if (n10.push(e11), a10 += e11.byteLength, t10 !== 1 / 0 && a10 > t10) throw new ir("Decompressed plaintext exceeded the configured limit");
        }
        return rW(...n10);
      }
      class nr {
        #t;
        #r;
        #i;
        #n;
        #a;
        #s;
        #o;
        #l;
        constructor(e10) {
          if (!(e10 instanceof Uint8Array)) throw TypeError("plaintext must be an instance of Uint8Array");
          this.#t = e10;
        }
        setKeyManagementParameters(e10) {
          return rY(this.#l, "setKeyManagementParameters"), this.#l = e10, this;
        }
        setProtectedHeader(e10) {
          return rY(this.#r, "setProtectedHeader"), this.#r = e10, this;
        }
        setSharedUnprotectedHeader(e10) {
          return rY(this.#i, "setSharedUnprotectedHeader"), this.#i = e10, this;
        }
        setUnprotectedHeader(e10) {
          return rY(this.#n, "setUnprotectedHeader"), this.#n = e10, this;
        }
        setAdditionalAuthenticatedData(e10) {
          return this.#a = e10, this;
        }
        setContentEncryptionKey(e10) {
          return rY(this.#s, "setContentEncryptionKey"), this.#s = e10, this;
        }
        setInitializationVector(e10) {
          return rY(this.#o, "setInitializationVector"), this.#o = e10, this;
        }
        async encrypt(e10, t10) {
          let r10, i10, n10, a10, s10, o10;
          if (!this.#r && !this.#n && !this.#i) throw new ir("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
          if (!iF(this.#r, this.#n, this.#i)) throw new ir("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
          let l10 = { ...this.#r, ...this.#n, ...this.#i };
          if (i5(ir, /* @__PURE__ */ new Map(), t10?.crit, this.#r, l10), void 0 !== l10.zip && "DEF" !== l10.zip) throw new ie('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value.');
          if (void 0 !== l10.zip && !this.#r?.zip) throw new ir('JWE "zip" (Compression Algorithm) Header Parameter MUST be in a protected header.');
          let { alg: c10, enc: u10 } = l10;
          if ("string" != typeof c10 || !c10) throw new ir('JWE "alg" (Algorithm) Header Parameter missing or invalid');
          if ("string" != typeof u10 || !u10) throw new ir('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
          if (this.#s && ("dir" === c10 || "ECDH-ES" === c10)) throw TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${c10}`);
          i9("dir" === c10 ? u10 : c10, e10, "encrypt");
          {
            let n11, a11 = await iJ(e10, c10);
            ({ cek: i10, encryptedKey: r10, parameters: n11 } = await i4(c10, u10, a11, this.#s, this.#l)), n11 && (t10 && rX in t10 ? this.#n ? this.#n = { ...this.#n, ...n11 } : this.setUnprotectedHeader(n11) : this.#r ? this.#r = { ...this.#r, ...n11 } : this.setProtectedHeader(n11));
          }
          if (this.#r ? s10 = rQ(a10 = rG(JSON.stringify(this.#r))) : (a10 = "", s10 = new Uint8Array()), this.#a) {
            let e11 = rQ(o10 = rG(this.#a));
            n10 = rW(s10, rQ("."), e11);
          } else n10 = s10;
          let d10 = this.#t;
          "DEF" === l10.zip && (d10 = await ne(d10).catch((e11) => {
            throw new ir("Failed to compress plaintext", { cause: e11 });
          }));
          let { ciphertext: h10, tag: p10, iv: f2 } = await iT(u10, d10, i10, this.#o, n10), m2 = { ciphertext: rG(h10) };
          return f2 && (m2.iv = rG(f2)), p10 && (m2.tag = rG(p10)), r10 && (m2.encrypted_key = rG(r10)), o10 && (m2.aad = o10), this.#r && (m2.protected = a10), this.#i && (m2.unprotected = this.#i), this.#n && (m2.header = this.#n), m2;
        }
      }
      class ni {
        #c;
        constructor(e10) {
          this.#c = new nr(e10);
        }
        setContentEncryptionKey(e10) {
          return this.#c.setContentEncryptionKey(e10), this;
        }
        setInitializationVector(e10) {
          return this.#c.setInitializationVector(e10), this;
        }
        setProtectedHeader(e10) {
          return this.#c.setProtectedHeader(e10), this;
        }
        setKeyManagementParameters(e10) {
          return this.#c.setKeyManagementParameters(e10), this;
        }
        async encrypt(e10, t10) {
          let r10 = await this.#c.encrypt(e10, t10);
          return [r10.protected, r10.encrypted_key, r10.iv, r10.ciphertext, r10.tag].join(".");
        }
      }
      let nn = (e10) => Math.floor(e10.getTime() / 1e3), na = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
      function ns(e10) {
        let t10, r10 = na.exec(e10);
        if (!r10 || r10[4] && r10[1]) throw TypeError("Invalid time period format");
        let i10 = parseFloat(r10[2]);
        switch (r10[3].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            t10 = Math.round(i10);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            t10 = Math.round(60 * i10);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            t10 = Math.round(3600 * i10);
            break;
          case "day":
          case "days":
          case "d":
            t10 = Math.round(86400 * i10);
            break;
          case "week":
          case "weeks":
          case "w":
            t10 = Math.round(604800 * i10);
            break;
          default:
            t10 = Math.round(31557600 * i10);
        }
        return "-" === r10[1] || "ago" === r10[4] ? -t10 : t10;
      }
      function no(e10, t10) {
        if (!Number.isFinite(t10)) throw TypeError(`Invalid ${e10} input`);
        return t10;
      }
      let nl = (e10) => e10.includes("/") ? e10.toLowerCase() : `application/${e10.toLowerCase()}`;
      class nc {
        #u;
        constructor(e10) {
          if (!iq(e10)) throw TypeError("JWT Claims Set MUST be an object");
          this.#u = structuredClone(e10);
        }
        data() {
          return rq.encode(JSON.stringify(this.#u));
        }
        get iss() {
          return this.#u.iss;
        }
        set iss(e10) {
          this.#u.iss = e10;
        }
        get sub() {
          return this.#u.sub;
        }
        set sub(e10) {
          this.#u.sub = e10;
        }
        get aud() {
          return this.#u.aud;
        }
        set aud(e10) {
          this.#u.aud = e10;
        }
        set jti(e10) {
          this.#u.jti = e10;
        }
        set nbf(e10) {
          "number" == typeof e10 ? this.#u.nbf = no("setNotBefore", e10) : e10 instanceof Date ? this.#u.nbf = no("setNotBefore", nn(e10)) : this.#u.nbf = nn(/* @__PURE__ */ new Date()) + ns(e10);
        }
        set exp(e10) {
          "number" == typeof e10 ? this.#u.exp = no("setExpirationTime", e10) : e10 instanceof Date ? this.#u.exp = no("setExpirationTime", nn(e10)) : this.#u.exp = nn(/* @__PURE__ */ new Date()) + ns(e10);
        }
        set iat(e10) {
          void 0 === e10 ? this.#u.iat = nn(/* @__PURE__ */ new Date()) : e10 instanceof Date ? this.#u.iat = no("setIssuedAt", nn(e10)) : "string" == typeof e10 ? this.#u.iat = no("setIssuedAt", nn(/* @__PURE__ */ new Date()) + ns(e10)) : this.#u.iat = no("setIssuedAt", e10);
        }
      }
      class nu {
        #s;
        #o;
        #l;
        #r;
        #d;
        #h;
        #p;
        #f;
        constructor(e10 = {}) {
          this.#f = new nc(e10);
        }
        setIssuer(e10) {
          return this.#f.iss = e10, this;
        }
        setSubject(e10) {
          return this.#f.sub = e10, this;
        }
        setAudience(e10) {
          return this.#f.aud = e10, this;
        }
        setJti(e10) {
          return this.#f.jti = e10, this;
        }
        setNotBefore(e10) {
          return this.#f.nbf = e10, this;
        }
        setExpirationTime(e10) {
          return this.#f.exp = e10, this;
        }
        setIssuedAt(e10) {
          return this.#f.iat = e10, this;
        }
        setProtectedHeader(e10) {
          return rY(this.#r, "setProtectedHeader"), this.#r = e10, this;
        }
        setKeyManagementParameters(e10) {
          return rY(this.#l, "setKeyManagementParameters"), this.#l = e10, this;
        }
        setContentEncryptionKey(e10) {
          return rY(this.#s, "setContentEncryptionKey"), this.#s = e10, this;
        }
        setInitializationVector(e10) {
          return rY(this.#o, "setInitializationVector"), this.#o = e10, this;
        }
        replicateIssuerAsHeader() {
          return this.#d = true, this;
        }
        replicateSubjectAsHeader() {
          return this.#h = true, this;
        }
        replicateAudienceAsHeader() {
          return this.#p = true, this;
        }
        async encrypt(e10, t10) {
          let r10 = new ni(this.#f.data());
          return this.#r && (this.#d || this.#h || this.#p) && (this.#r = { ...this.#r, iss: this.#d ? this.#f.iss : void 0, sub: this.#h ? this.#f.sub : void 0, aud: this.#p ? this.#f.aud : void 0 }), r10.setProtectedHeader(this.#r), this.#o && r10.setInitializationVector(this.#o), this.#s && r10.setContentEncryptionKey(this.#s), this.#l && r10.setKeyManagementParameters(this.#l), r10.encrypt(e10, t10);
        }
      }
      var nd = e.i(22423), nd = nd;
      let nh = (e10, t10) => {
        if ("string" != typeof e10 || !e10) throw new ia(`${t10} missing or invalid`);
      };
      async function np(e10, t10) {
        let r10, i10;
        if (iW(e10)) r10 = e10;
        else if (iu(e10)) r10 = await iY(e10);
        else throw TypeError(r4(e10, "CryptoKey", "KeyObject", "JSON Web Key"));
        if ("sha256" !== (t10 ??= "sha256") && "sha384" !== t10 && "sha512" !== t10) throw TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
        switch (r10.kty) {
          case "AKP":
            nh(r10.alg, '"alg" (Algorithm) Parameter'), nh(r10.pub, '"pub" (Public key) Parameter'), i10 = { alg: r10.alg, kty: r10.kty, pub: r10.pub };
            break;
          case "EC":
            nh(r10.crv, '"crv" (Curve) Parameter'), nh(r10.x, '"x" (X Coordinate) Parameter'), nh(r10.y, '"y" (Y Coordinate) Parameter'), i10 = { crv: r10.crv, kty: r10.kty, x: r10.x, y: r10.y };
            break;
          case "OKP":
            nh(r10.crv, '"crv" (Subtype of Key Pair) Parameter'), nh(r10.x, '"x" (Public Key) Parameter'), i10 = { crv: r10.crv, kty: r10.kty, x: r10.x };
            break;
          case "RSA":
            nh(r10.e, '"e" (Exponent) Parameter'), nh(r10.n, '"n" (Modulus) Parameter'), i10 = { e: r10.e, kty: r10.kty, n: r10.n };
            break;
          case "oct":
            nh(r10.k, '"k" (Key Value) Parameter'), i10 = { k: r10.k, kty: r10.kty };
            break;
          default:
            throw new ie('"kty" (Key Type) Parameter missing or unsupported');
        }
        let n10 = rQ(JSON.stringify(i10));
        return rG(await r0(t10, n10));
      }
      function nf(e10, t10) {
        if (void 0 !== t10 && (!Array.isArray(t10) || t10.some((e11) => "string" != typeof e11))) throw TypeError(`"${e10}" option must be an array of strings`);
        if (t10) return new Set(t10);
      }
      async function nm(e10, t10, r10) {
        let i10, n10, a10, s10, o10, l10;
        if (!iq(e10)) throw new ir("Flattened JWE must be an object");
        if (void 0 === e10.protected && void 0 === e10.header && void 0 === e10.unprotected) throw new ir("JOSE Header missing");
        if (void 0 !== e10.iv && "string" != typeof e10.iv) throw new ir("JWE Initialization Vector incorrect type");
        if ("string" != typeof e10.ciphertext) throw new ir("JWE Ciphertext missing or incorrect type");
        if (void 0 !== e10.tag && "string" != typeof e10.tag) throw new ir("JWE Authentication Tag incorrect type");
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new ir("JWE Protected Header incorrect type");
        if (void 0 !== e10.encrypted_key && "string" != typeof e10.encrypted_key) throw new ir("JWE Encrypted Key incorrect type");
        if (void 0 !== e10.aad && "string" != typeof e10.aad) throw new ir("JWE AAD incorrect type");
        if (void 0 !== e10.header && !iq(e10.header)) throw new ir("JWE Shared Unprotected Header incorrect type");
        if (void 0 !== e10.unprotected && !iq(e10.unprotected)) throw new ir("JWE Per-Recipient Unprotected Header incorrect type");
        if (e10.protected) try {
          let t11 = rJ(e10.protected);
          i10 = JSON.parse(rF.decode(t11));
        } catch {
          throw new ir("JWE Protected Header is invalid");
        }
        if (!iF(i10, e10.header, e10.unprotected)) throw new ir("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
        let c10 = { ...i10, ...e10.header, ...e10.unprotected };
        if (i5(ir, /* @__PURE__ */ new Map(), r10?.crit, i10, c10), void 0 !== c10.zip && "DEF" !== c10.zip) throw new ie('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value.');
        if (void 0 !== c10.zip && !i10?.zip) throw new ir('JWE "zip" (Compression Algorithm) Header Parameter MUST be in a protected header.');
        let { alg: u10, enc: d10 } = c10;
        if ("string" != typeof u10 || !u10) throw new ir("missing JWE Algorithm (alg) in JWE Header");
        if ("string" != typeof d10 || !d10) throw new ir("missing JWE Encryption Algorithm (enc) in JWE Header");
        let h10 = r10 && nf("keyManagementAlgorithms", r10.keyManagementAlgorithms), p10 = r10 && nf("contentEncryptionAlgorithms", r10.contentEncryptionAlgorithms);
        if (h10 && !h10.has(u10) || !h10 && u10.startsWith("PBES2")) throw new r7('"alg" (Algorithm) Header Parameter value not allowed');
        if (p10 && !p10.has(d10)) throw new r7('"enc" (Encryption Algorithm) Header Parameter value not allowed');
        void 0 !== e10.encrypted_key && (n10 = rZ(e10.encrypted_key, "encrypted_key", ir));
        let f2 = false;
        "function" == typeof t10 && (t10 = await t10(i10, e10), f2 = true), i9("dir" === u10 ? d10 : u10, t10, "decrypt");
        let m2 = await iJ(t10, u10);
        try {
          a10 = await i3(u10, m2, n10, c10, r10);
        } catch (e11) {
          if (e11 instanceof TypeError || e11 instanceof ir || e11 instanceof ie) throw e11;
          a10 = ih(d10);
        }
        void 0 !== e10.iv && (s10 = rZ(e10.iv, "iv", ir)), void 0 !== e10.tag && (o10 = rZ(e10.tag, "tag", ir));
        let g2 = void 0 !== e10.protected ? rQ(e10.protected) : new Uint8Array();
        l10 = void 0 !== e10.aad ? rW(g2, rQ("."), rQ(e10.aad)) : g2;
        let y2 = rZ(e10.ciphertext, "ciphertext", ir), b2 = await iC(d10, a10, y2, s10, o10, l10), w2 = { plaintext: b2 };
        if ("DEF" === c10.zip) {
          let e11 = r10?.maxDecompressedLength ?? 25e4;
          if (0 === e11) throw new ie('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
          if (e11 !== 1 / 0 && (!Number.isSafeInteger(e11) || e11 < 1)) throw TypeError("maxDecompressedLength must be 0, a positive safe integer, or Infinity");
          w2.plaintext = await nt(b2, e11).catch((e12) => {
            if (e12 instanceof ir) throw e12;
            throw new ir("Failed to decompress plaintext", { cause: e12 });
          });
        }
        return (void 0 !== e10.protected && (w2.protectedHeader = i10), void 0 !== e10.aad && (w2.additionalAuthenticatedData = rZ(e10.aad, "aad", ir)), void 0 !== e10.unprotected && (w2.sharedUnprotectedHeader = e10.unprotected), void 0 !== e10.header && (w2.unprotectedHeader = e10.header), f2) ? { ...w2, key: m2 } : w2;
      }
      async function ng(e10, t10, r10) {
        if (e10 instanceof Uint8Array && (e10 = rF.decode(e10)), "string" != typeof e10) throw new ir("Compact JWE must be a string or Uint8Array");
        let { 0: i10, 1: n10, 2: a10, 3: s10, 4: o10, length: l10 } = e10.split(".");
        if (5 !== l10) throw new ir("Invalid Compact JWE");
        let c10 = await nm({ ciphertext: s10, iv: a10 || void 0, protected: i10, tag: o10 || void 0, encrypted_key: n10 || void 0 }, t10, r10), u10 = { plaintext: c10.plaintext, protectedHeader: c10.protectedHeader };
        return "function" == typeof t10 ? { ...u10, key: c10.key } : u10;
      }
      async function ny(e10, t10, r10) {
        let i10 = await ng(e10, t10, r10), n10 = function(e11, t11, r11 = {}) {
          var i11, n11;
          let a11, s11;
          try {
            a11 = JSON.parse(rF.decode(t11));
          } catch {
          }
          if (!iq(a11)) throw new ii("JWT Claims Set must be a top-level JSON object");
          let { typ: o10 } = r11;
          if (o10 && ("string" != typeof e11.typ || nl(e11.typ) !== nl(o10))) throw new r8('unexpected "typ" JWT header value', a11, "typ", "check_failed");
          let { requiredClaims: l10 = [], issuer: c10, subject: u10, audience: d10, maxTokenAge: h10 } = r11, p10 = [...l10];
          for (let e12 of (void 0 !== h10 && p10.push("iat"), void 0 !== d10 && p10.push("aud"), void 0 !== u10 && p10.push("sub"), void 0 !== c10 && p10.push("iss"), new Set(p10.reverse()))) if (!(e12 in a11)) throw new r8(`missing required "${e12}" claim`, a11, e12, "missing");
          if (c10 && !(Array.isArray(c10) ? c10 : [c10]).includes(a11.iss)) throw new r8('unexpected "iss" claim value', a11, "iss", "check_failed");
          if (u10 && a11.sub !== u10) throw new r8('unexpected "sub" claim value', a11, "sub", "check_failed");
          if (d10 && (i11 = a11.aud, n11 = "string" == typeof d10 ? [d10] : d10, "string" == typeof i11 ? !n11.includes(i11) : !(Array.isArray(i11) && n11.some(Set.prototype.has.bind(new Set(i11)))))) throw new r8('unexpected "aud" claim value', a11, "aud", "check_failed");
          switch (typeof r11.clockTolerance) {
            case "string":
              s11 = ns(r11.clockTolerance);
              break;
            case "number":
              s11 = r11.clockTolerance;
              break;
            case "undefined":
              s11 = 0;
              break;
            default:
              throw TypeError("Invalid clockTolerance option type");
          }
          let { currentDate: f2 } = r11, m2 = nn(f2 || /* @__PURE__ */ new Date());
          if ((void 0 !== a11.iat || h10) && "number" != typeof a11.iat) throw new r8('"iat" claim must be a number', a11, "iat", "invalid");
          if (void 0 !== a11.nbf) {
            if ("number" != typeof a11.nbf) throw new r8('"nbf" claim must be a number', a11, "nbf", "invalid");
            if (a11.nbf > m2 + s11) throw new r8('"nbf" claim timestamp check failed', a11, "nbf", "check_failed");
          }
          if (void 0 !== a11.exp) {
            if ("number" != typeof a11.exp) throw new r8('"exp" claim must be a number', a11, "exp", "invalid");
            if (a11.exp <= m2 - s11) throw new r9('"exp" claim timestamp check failed', a11, "exp", "check_failed");
          }
          if (h10) {
            let e12 = m2 - a11.iat;
            if (e12 - s11 > ("number" == typeof h10 ? h10 : ns(h10))) throw new r9('"iat" claim timestamp check failed (too far in the past)', a11, "iat", "check_failed");
            if (e12 < 0 - s11) throw new r8('"iat" claim timestamp check failed (it should be in the past)', a11, "iat", "check_failed");
          }
          return a11;
        }(i10.protectedHeader, i10.plaintext, r10), { protectedHeader: a10 } = i10;
        if (void 0 !== a10.iss && a10.iss !== n10.iss) throw new r8('replicated "iss" claim header parameter mismatch', n10, "iss", "mismatch");
        if (void 0 !== a10.sub && a10.sub !== n10.sub) throw new r8('replicated "sub" claim header parameter mismatch', n10, "sub", "mismatch");
        if (void 0 !== a10.aud && JSON.stringify(a10.aud) !== JSON.stringify(n10.aud)) throw new r8('replicated "aud" claim header parameter mismatch', n10, "aud", "mismatch");
        let s10 = { payload: n10, protectedHeader: a10 };
        return "function" == typeof t10 ? { ...s10, key: i10.key } : s10;
      }
      let nb = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, nw = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, nv = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, n_ = /^[\u0020-\u003A\u003D-\u007E]*$/, nS = Object.prototype.toString, nE = ((u = function() {
      }).prototype = /* @__PURE__ */ Object.create(null), u);
      function nx(e10, t10, r10) {
        do {
          let r11 = e10.charCodeAt(t10);
          if (32 !== r11 && 9 !== r11) return t10;
        } while (++t10 < r10);
        return r10;
      }
      function nT(e10, t10, r10) {
        for (; t10 > r10; ) {
          let r11 = e10.charCodeAt(--t10);
          if (32 !== r11 && 9 !== r11) return t10 + 1;
        }
        return r10;
      }
      function nC(e10) {
        if (-1 === e10.indexOf("%")) return e10;
        try {
          return decodeURIComponent(e10);
        } catch (t10) {
          return e10;
        }
      }
      e.s(["parse", 0, function(e10, t10) {
        let r10 = new nE(), i10 = e10.length;
        if (i10 < 2) return r10;
        let n10 = t10?.decode || nC, a10 = 0;
        do {
          let t11 = e10.indexOf("=", a10);
          if (-1 === t11) break;
          let s10 = e10.indexOf(";", a10), o10 = -1 === s10 ? i10 : s10;
          if (t11 > o10) {
            a10 = e10.lastIndexOf(";", t11 - 1) + 1;
            continue;
          }
          let l10 = nx(e10, a10, t11), c10 = nT(e10, t11, l10), u10 = e10.slice(l10, c10);
          if (void 0 === r10[u10]) {
            let i11 = nx(e10, t11 + 1, o10), a11 = nT(e10, o10, i11), s11 = n10(e10.slice(i11, a11));
            r10[u10] = s11;
          }
          a10 = o10 + 1;
        } while (a10 < i10);
        return r10;
      }, "serialize", 0, function(e10, t10, r10) {
        let i10 = r10?.encode || encodeURIComponent;
        if (!nb.test(e10)) throw TypeError(`argument name is invalid: ${e10}`);
        let n10 = i10(t10);
        if (!nw.test(n10)) throw TypeError(`argument val is invalid: ${t10}`);
        let a10 = e10 + "=" + n10;
        if (!r10) return a10;
        if (void 0 !== r10.maxAge) {
          if (!Number.isInteger(r10.maxAge)) throw TypeError(`option maxAge is invalid: ${r10.maxAge}`);
          a10 += "; Max-Age=" + r10.maxAge;
        }
        if (r10.domain) {
          if (!nv.test(r10.domain)) throw TypeError(`option domain is invalid: ${r10.domain}`);
          a10 += "; Domain=" + r10.domain;
        }
        if (r10.path) {
          if (!n_.test(r10.path)) throw TypeError(`option path is invalid: ${r10.path}`);
          a10 += "; Path=" + r10.path;
        }
        if (r10.expires) {
          var s10;
          if (s10 = r10.expires, "[object Date]" !== nS.call(s10) || !Number.isFinite(r10.expires.valueOf())) throw TypeError(`option expires is invalid: ${r10.expires}`);
          a10 += "; Expires=" + r10.expires.toUTCString();
        }
        if (r10.httpOnly && (a10 += "; HttpOnly"), r10.secure && (a10 += "; Secure"), r10.partitioned && (a10 += "; Partitioned"), r10.priority) switch ("string" == typeof r10.priority ? r10.priority.toLowerCase() : void 0) {
          case "low":
            a10 += "; Priority=Low";
            break;
          case "medium":
            a10 += "; Priority=Medium";
            break;
          case "high":
            a10 += "; Priority=High";
            break;
          default:
            throw TypeError(`option priority is invalid: ${r10.priority}`);
        }
        if (r10.sameSite) switch ("string" == typeof r10.sameSite ? r10.sameSite.toLowerCase() : r10.sameSite) {
          case true:
          case "strict":
            a10 += "; SameSite=Strict";
            break;
          case "lax":
            a10 += "; SameSite=Lax";
            break;
          case "none":
            a10 += "; SameSite=None";
            break;
          default:
            throw TypeError(`option sameSite is invalid: ${r10.sameSite}`);
        }
        return a10;
      }], 52411);
      var nA = e.i(52411);
      let { parse: nP } = nA, nk = "A256CBC-HS512";
      async function nR(e10) {
        let { token: t10 = {}, secret: r10, maxAge: i10 = 2592e3, salt: n10 } = e10, a10 = Array.isArray(r10) ? r10 : [r10], s10 = await nN(nk, a10[0], n10), o10 = await np({ kty: "oct", k: nd.encode(s10) }, `sha${s10.byteLength << 3}`);
        return await new nu(t10).setProtectedHeader({ alg: "dir", enc: nk, kid: o10 }).setIssuedAt().setExpirationTime((Date.now() / 1e3 | 0) + i10).setJti(crypto.randomUUID()).encrypt(s10);
      }
      async function nO(e10) {
        let { token: t10, secret: r10, salt: i10 } = e10, n10 = Array.isArray(r10) ? r10 : [r10];
        if (!t10) return null;
        let { payload: a10 } = await ny(t10, async ({ kid: e11, enc: t11 }) => {
          for (let r11 of n10) {
            let n11 = await nN(t11, r11, i10);
            if (void 0 === e11 || e11 === await np({ kty: "oct", k: nd.encode(n11) }, `sha${n11.byteLength << 3}`)) return n11;
          }
          throw Error("no matching decryption secret");
        }, { clockTolerance: 15, keyManagementAlgorithms: ["dir"], contentEncryptionAlgorithms: [nk, "A256GCM"] });
        return a10;
      }
      async function nN(e10, t10, r10) {
        let i10;
        switch (e10) {
          case "A256CBC-HS512":
            i10 = 64;
            break;
          case "A256GCM":
            i10 = 32;
            break;
          default:
            throw Error("Unsupported JWT Content Encryption Algorithm");
        }
        return await rH("sha256", t10, r10, `Auth.js Generated Encryption Key (${r10})`, i10);
      }
      async function nI({ options: e10, paramValue: t10, cookieValue: r10 }) {
        let { url: i10, callbacks: n10 } = e10, a10 = i10.origin;
        return t10 ? a10 = await n10.redirect({ url: t10, baseUrl: i10.origin }) : r10 && (a10 = await n10.redirect({ url: r10, baseUrl: i10.origin })), { callbackUrl: a10, callbackUrlCookie: a10 !== r10 ? a10 : void 0 };
      }
      let n$ = "\x1B[31m", nD = "\x1B[0m", nL = { error(e10) {
        let t10 = e10 instanceof t9 ? e10.type : e10.name;
        if (console.error(`${n$}[auth][error]${nD} ${t10}: ${e10.message}`), e10.cause && "object" == typeof e10.cause && "err" in e10.cause && e10.cause.err instanceof Error) {
          let { err: t11, ...r10 } = e10.cause;
          console.error(`${n$}[auth][cause]${nD}:`, t11.stack), r10 && console.error(`${n$}[auth][details]${nD}:`, JSON.stringify(r10, null, 2));
        } else e10.stack && console.error(e10.stack.replace(/.*/, "").substring(1));
      }, warn(e10) {
        console.warn(`\x1B[33m[auth][warn][${e10}]${nD}`, "Read more: https://warnings.authjs.dev");
      }, debug(e10, t10) {
        console.log(`\x1B[90m[auth][debug]:${nD} ${e10}`, JSON.stringify(t10, null, 2));
      } };
      function nU(e10) {
        let t10 = { ...nL };
        return e10.debug || (t10.debug = () => {
        }), e10.logger?.error && (t10.error = e10.logger.error), e10.logger?.warn && (t10.warn = e10.logger.warn), e10.logger?.debug && (t10.debug = e10.logger.debug), e10.logger ?? (e10.logger = t10), t10;
      }
      let nj = ["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error", "webauthn-options"], { parse: nM, serialize: nB } = nA;
      async function nH(e10) {
        if (!("body" in e10) || !e10.body || "POST" !== e10.method) return;
        let t10 = e10.headers.get("content-type");
        return t10?.includes("application/json") ? await e10.json() : t10?.includes("application/x-www-form-urlencoded") ? Object.fromEntries(new URLSearchParams(await e10.text())) : void 0;
      }
      async function nq(e10, t10) {
        try {
          if ("GET" !== e10.method && "POST" !== e10.method) throw new rw("Only GET and POST requests are supported");
          t10.basePath ?? (t10.basePath = "/auth");
          let r10 = new URL(e10.url), { action: i10, providerId: n10 } = function(e11, t11) {
            let r11 = e11.match(RegExp(`^${t11}(.+)`));
            if (null === r11) throw new rw(`Cannot parse action at ${e11}`);
            let i11 = r11.at(-1).replace(/^\//, "").split("/").filter(Boolean);
            if (1 !== i11.length && 2 !== i11.length) throw new rw(`Cannot parse action at ${e11}`);
            let [n11, a10] = i11;
            if (!nj.includes(n11) || a10 && !["signin", "callback", "webauthn-options"].includes(n11)) throw new rw(`Cannot parse action at ${e11}`);
            return { action: n11, providerId: "undefined" == a10 ? void 0 : a10 };
          }(r10.pathname, t10.basePath);
          return { url: r10, action: i10, providerId: n10, method: e10.method, headers: Object.fromEntries(e10.headers), body: e10.body ? await nH(e10) : void 0, cookies: nM(e10.headers.get("cookie") ?? "") ?? {}, error: r10.searchParams.get("error") ?? void 0, query: Object.fromEntries(r10.searchParams) };
        } catch (i10) {
          let r10 = nU(t10);
          r10.error(i10), r10.debug("request", e10);
        }
      }
      function nF(e10) {
        let t10 = new Headers(e10.headers);
        e10.cookies?.forEach((e11) => {
          let { name: r11, value: i11, options: n10 } = e11, a10 = nB(r11, i11, n10);
          t10.has("Set-Cookie") ? t10.append("Set-Cookie", a10) : t10.set("Set-Cookie", a10);
        });
        let r10 = e10.body;
        "application/json" === t10.get("content-type") ? r10 = JSON.stringify(e10.body) : "application/x-www-form-urlencoded" === t10.get("content-type") && (r10 = new URLSearchParams(e10.body).toString());
        let i10 = new Response(r10, { headers: t10, status: e10.redirect ? 302 : e10.status ?? 200 });
        return e10.redirect && i10.headers.set("Location", e10.redirect), i10;
      }
      async function nW(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => e11.toString(16).padStart(2, "0")).join("").toString();
      }
      function nK(e10) {
        return Array.from(crypto.getRandomValues(new Uint8Array(e10))).reduce((e11, t10) => e11 + ("0" + t10.toString(16)).slice(-2), "");
      }
      async function nV({ options: e10, cookieValue: t10, isPost: r10, bodyValue: i10 }) {
        if (t10) {
          let [n11, a11] = t10.split("|");
          if (a11 === await nW(`${n11}${e10.secret}`)) return { csrfTokenVerified: r10 && n11 === i10, csrfToken: n11 };
        }
        let n10 = nK(32), a10 = await nW(`${n10}${e10.secret}`);
        return { cookie: `${n10}|${a10}`, csrfToken: n10 };
      }
      function nz(e10, t10) {
        if (!t10) throw new rx(`CSRF token was missing during an action ${e10}`);
      }
      function nQ(e10) {
        return null !== e10 && "object" == typeof e10;
      }
      function nJ(e10, ...t10) {
        if (!t10.length) return e10;
        let r10 = t10.shift();
        if (nQ(e10) && nQ(r10)) for (let t11 in r10) nQ(r10[t11]) ? (nQ(e10[t11]) || (e10[t11] = Array.isArray(r10[t11]) ? [] : {}), nJ(e10[t11], r10[t11])) : void 0 !== r10[t11] && (e10[t11] = r10[t11]);
        return nJ(e10, ...t10);
      }
      let nG = Symbol("skip-csrf-check"), nX = Symbol("return-type-raw"), nY = Symbol("custom-fetch"), nZ = Symbol("conform-internal"), n0 = (e10) => n2({ id: e10.sub ?? e10.id ?? crypto.randomUUID(), name: e10.name ?? e10.nickname ?? e10.preferred_username, email: e10.email, image: e10.picture }), n1 = (e10) => n2({ access_token: e10.access_token, id_token: e10.id_token, refresh_token: e10.refresh_token, expires_at: e10.expires_at, scope: e10.scope, token_type: e10.token_type, session_state: e10.session_state });
      function n2(e10) {
        let t10 = {};
        for (let [r10, i10] of Object.entries(e10)) void 0 !== i10 && (t10[r10] = i10);
        return t10;
      }
      function n3(e10, t10) {
        if (!e10 && t10) return;
        if ("string" == typeof e10) return { url: new URL(e10) };
        let r10 = new URL(e10?.url ?? "https://authjs.dev");
        if (e10?.params != null) for (let [t11, i10] of Object.entries(e10.params)) "claims" === t11 && (i10 = JSON.stringify(i10)), r10.searchParams.set(t11, String(i10));
        return { url: r10, request: e10?.request, conform: e10?.conform, ...e10?.clientPrivateKey ? { clientPrivateKey: e10?.clientPrivateKey } : null };
      }
      let n4 = { signIn: () => true, redirect: ({ url: e10, baseUrl: t10 }) => e10.startsWith("/") ? `${t10}${e10}` : new URL(e10).origin === t10 ? e10 : t10, session: ({ session: e10 }) => ({ user: { name: e10.user?.name, email: e10.user?.email, image: e10.user?.image }, expires: e10.expires?.toISOString?.() ?? e10.expires }), jwt: ({ token: e10 }) => e10 };
      async function n5({ authOptions: e10, providerId: t10, action: r10, url: i10, cookies: n10, callbackUrl: a10, csrfToken: s10, csrfDisabled: o10, isPost: l10 }) {
        var c10, u10;
        let d10 = nU(e10), { providers: h10, provider: p10 } = function(e11) {
          let { providerId: t11, config: r11 } = e11, i11 = new URL(r11.basePath ?? "/auth", e11.url.origin), n11 = r11.providers.map((e12) => {
            let t12 = "function" == typeof e12 ? e12() : e12, { options: n12, ...a12 } = t12, s11 = n12?.id ?? a12.id, o11 = nJ(a12, n12, { signinUrl: `${i11}/signin/${s11}`, callbackUrl: `${i11}/callback/${s11}` });
            if ("oauth" === t12.type || "oidc" === t12.type) {
              var l11;
              let e13, t13, i12, a13;
              o11.redirectProxyUrl ?? (o11.redirectProxyUrl = n12?.redirectProxyUrl ?? r11.redirectProxyUrl);
              let s12 = ((l11 = o11).issuer && (l11.wellKnown ?? (l11.wellKnown = `${l11.issuer}/.well-known/openid-configuration`)), (e13 = n3(l11.authorization, l11.issuer)) && !e13.url?.searchParams.has("scope") && e13.url.searchParams.set("scope", "openid profile email"), t13 = n3(l11.token, l11.issuer), i12 = n3(l11.userinfo, l11.issuer), a13 = l11.checks ?? ["pkce"], l11.redirectProxyUrl && (a13.includes("state") || a13.push("state"), l11.redirectProxyUrl = `${l11.redirectProxyUrl}/callback/${l11.id}`), { ...l11, authorization: e13, token: t13, checks: a13, userinfo: i12, profile: l11.profile ?? n0, account: l11.account ?? n1 });
              return s12.authorization?.url.searchParams.get("response_mode") === "form_post" && delete s12.redirectProxyUrl, s12[nY] ?? (s12[nY] = n12?.[nY]), s12;
            }
            return o11;
          }), a11 = n11.find(({ id: e12 }) => e12 === t11);
          if (t11 && !a11) {
            let e12 = n11.map((e13) => e13.id).join(", ");
            throw Error(`Provider with id "${t11}" not found. Available providers: [${e12}].`);
          }
          return { providers: n11, provider: a11 };
        }({ url: i10, providerId: t10, config: e10 }), f2 = false;
        if ((p10?.type === "oauth" || p10?.type === "oidc") && p10.redirectProxyUrl) try {
          f2 = new URL(p10.redirectProxyUrl).origin === i10.origin;
        } catch {
          throw TypeError(`redirectProxyUrl must be a valid URL. Received: ${p10.redirectProxyUrl}`);
        }
        let m2 = { debug: false, pages: {}, theme: { colorScheme: "auto", logo: "", brandColor: "", buttonText: "" }, ...e10, url: i10, action: r10, provider: p10, cookies: nJ(t6(e10.useSecureCookies ?? "https:" === i10.protocol), e10.cookies), providers: h10, session: { strategy: e10.adapter ? "database" : "jwt", maxAge: 2592e3, updateAge: 86400, generateSessionToken: () => crypto.randomUUID(), ...e10.session }, jwt: { secret: e10.secret, maxAge: e10.session?.maxAge ?? 2592e3, encode: nR, decode: nO, ...e10.jwt }, events: (c10 = e10.events ?? {}, u10 = d10, Object.keys(c10).reduce((e11, t11) => (e11[t11] = async (...e12) => {
          try {
            let r11 = c10[t11];
            return await r11(...e12);
          } catch (e13) {
            u10.error(new rn(e13));
          }
        }, e11), {})), adapter: function(e11, t11) {
          if (e11) return Object.keys(e11).reduce((r11, i11) => (r11[i11] = async (...r12) => {
            try {
              t11.debug(`adapter_${i11}`, { args: r12 });
              let n11 = e11[i11];
              return await n11(...r12);
            } catch (r13) {
              let e12 = new re(r13);
              throw t11.error(e12), e12;
            }
          }, r11), {});
        }(e10.adapter, d10), callbacks: { ...n4, ...e10.callbacks }, logger: d10, callbackUrl: i10.origin, isOnRedirectProxy: f2, experimental: { ...e10.experimental } }, g2 = [];
        if (o10) m2.csrfTokenVerified = true;
        else {
          let { csrfToken: e11, cookie: t11, csrfTokenVerified: r11 } = await nV({ options: m2, cookieValue: n10?.[m2.cookies.csrfToken.name], isPost: l10, bodyValue: s10 });
          m2.csrfToken = e11, m2.csrfTokenVerified = r11, t11 && g2.push({ name: m2.cookies.csrfToken.name, value: t11, options: m2.cookies.csrfToken.options });
        }
        let { callbackUrl: y2, callbackUrlCookie: b2 } = await nI({ options: m2, cookieValue: n10?.[m2.cookies.callbackUrl.name], paramValue: a10 });
        return m2.callbackUrl = y2, b2 && g2.push({ name: m2.cookies.callbackUrl.name, value: b2, options: m2.cookies.callbackUrl.options }), { options: m2, cookies: g2 };
      }
      var n6, n8, n9, n7, ae, at, ar, ai, an, aa, as, ao, al, ac, au, ad, ah, ap, af, am, ag, ay, ab, aw, av, a_, aS, aE, ax, aT, aC, aA = {}, aP = [], ak = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, aR = Array.isArray;
      function aO(e10, t10) {
        for (var r10 in t10) e10[r10] = t10[r10];
        return e10;
      }
      function aN(e10) {
        e10 && e10.parentNode && e10.parentNode.removeChild(e10);
      }
      function aI(e10, t10, r10, i10, n10) {
        var a10 = { type: e10, props: t10, key: r10, ref: i10, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == n10 ? ++aw : n10, __i: -1, __u: 0 };
        return null == n10 && null != ab.vnode && ab.vnode(a10), a10;
      }
      function a$(e10) {
        return e10.children;
      }
      function aD(e10, t10) {
        this.props = e10, this.context = t10;
      }
      function aL(e10, t10) {
        if (null == t10) return e10.__ ? aL(e10.__, e10.__i + 1) : null;
        for (var r10; t10 < e10.__k.length; t10++) if (null != (r10 = e10.__k[t10]) && null != r10.__e) return r10.__e;
        return "function" == typeof e10.type ? aL(e10) : null;
      }
      function aU(e10) {
        (!e10.__d && (e10.__d = true) && av.push(e10) && !aj.__r++ || a_ !== ab.debounceRendering) && ((a_ = ab.debounceRendering) || aS)(aj);
      }
      function aj() {
        var e10, t10, r10, i10, n10, a10, s10, o10;
        for (av.sort(aE); e10 = av.shift(); ) e10.__d && (t10 = av.length, i10 = void 0, a10 = (n10 = (r10 = e10).__v).__e, s10 = [], o10 = [], r10.__P && ((i10 = aO({}, n10)).__v = n10.__v + 1, ab.vnode && ab.vnode(i10), aF(r10.__P, i10, n10, r10.__n, r10.__P.namespaceURI, 32 & n10.__u ? [a10] : null, s10, null == a10 ? aL(n10) : a10, !!(32 & n10.__u), o10), i10.__v = n10.__v, i10.__.__k[i10.__i] = i10, function(e11, t11, r11) {
          t11.__d = void 0;
          for (var i11 = 0; i11 < r11.length; i11++) aW(r11[i11], r11[++i11], r11[++i11]);
          ab.__c && ab.__c(t11, e11), e11.some(function(t12) {
            try {
              e11 = t12.__h, t12.__h = [], e11.some(function(e12) {
                e12.call(t12);
              });
            } catch (e12) {
              ab.__e(e12, t12.__v);
            }
          });
        }(s10, i10, o10), i10.__e != a10 && function e11(t11) {
          var r11, i11;
          if (null != (t11 = t11.__) && null != t11.__c) {
            for (t11.__e = t11.__c.base = null, r11 = 0; r11 < t11.__k.length; r11++) if (null != (i11 = t11.__k[r11]) && null != i11.__e) {
              t11.__e = t11.__c.base = i11.__e;
              break;
            }
            return e11(t11);
          }
        }(i10)), av.length > t10 && av.sort(aE));
        aj.__r = 0;
      }
      function aM(e10, t10, r10, i10, n10, a10, s10, o10, l10, c10, u10) {
        var d10, h10, p10, f2, m2, g2 = i10 && i10.__k || aP, y2 = t10.length;
        for (r10.__d = l10, function(e11, t11, r11) {
          var i11, n11, a11, s11, o11, l11 = t11.length, c11 = r11.length, u11 = c11, d11 = 0;
          for (e11.__k = [], i11 = 0; i11 < l11; i11++) null != (n11 = t11[i11]) && "boolean" != typeof n11 && "function" != typeof n11 ? (s11 = i11 + d11, (n11 = e11.__k[i11] = "string" == typeof n11 || "number" == typeof n11 || "bigint" == typeof n11 || n11.constructor == String ? aI(null, n11, null, null, null) : aR(n11) ? aI(a$, { children: n11 }, null, null, null) : void 0 === n11.constructor && n11.__b > 0 ? aI(n11.type, n11.props, n11.key, n11.ref ? n11.ref : null, n11.__v) : n11).__ = e11, n11.__b = e11.__b + 1, a11 = null, -1 !== (o11 = n11.__i = function(e12, t12, r12, i12) {
            var n12 = e12.key, a12 = e12.type, s12 = r12 - 1, o12 = r12 + 1, l12 = t12[r12];
            if (null === l12 || l12 && n12 == l12.key && a12 === l12.type && 0 == (131072 & l12.__u)) return r12;
            if (i12 > +(null != l12 && 0 == (131072 & l12.__u))) for (; s12 >= 0 || o12 < t12.length; ) {
              if (s12 >= 0) {
                if ((l12 = t12[s12]) && 0 == (131072 & l12.__u) && n12 == l12.key && a12 === l12.type) return s12;
                s12--;
              }
              if (o12 < t12.length) {
                if ((l12 = t12[o12]) && 0 == (131072 & l12.__u) && n12 == l12.key && a12 === l12.type) return o12;
                o12++;
              }
            }
            return -1;
          }(n11, r11, s11, u11)) && (u11--, (a11 = r11[o11]) && (a11.__u |= 131072)), null == a11 || null === a11.__v ? (-1 == o11 && d11--, "function" != typeof n11.type && (n11.__u |= 65536)) : o11 !== s11 && (o11 == s11 - 1 ? d11-- : o11 == s11 + 1 ? d11++ : (o11 > s11 ? d11-- : d11++, n11.__u |= 65536))) : n11 = e11.__k[i11] = null;
          if (u11) for (i11 = 0; i11 < c11; i11++) null != (a11 = r11[i11]) && 0 == (131072 & a11.__u) && (a11.__e == e11.__d && (e11.__d = aL(a11)), function e12(t12, r12, i12) {
            var n12, a12;
            if (ab.unmount && ab.unmount(t12), (n12 = t12.ref) && (n12.current && n12.current !== t12.__e || aW(n12, null, r12)), null != (n12 = t12.__c)) {
              if (n12.componentWillUnmount) try {
                n12.componentWillUnmount();
              } catch (e13) {
                ab.__e(e13, r12);
              }
              n12.base = n12.__P = null;
            }
            if (n12 = t12.__k) for (a12 = 0; a12 < n12.length; a12++) n12[a12] && e12(n12[a12], r12, i12 || "function" != typeof t12.type);
            i12 || aN(t12.__e), t12.__c = t12.__ = t12.__e = t12.__d = void 0;
          }(a11, a11));
        }(r10, t10, g2), l10 = r10.__d, d10 = 0; d10 < y2; d10++) null != (p10 = r10.__k[d10]) && (h10 = -1 === p10.__i ? aA : g2[p10.__i] || aA, p10.__i = d10, aF(e10, p10, h10, n10, a10, s10, o10, l10, c10, u10), f2 = p10.__e, p10.ref && h10.ref != p10.ref && (h10.ref && aW(h10.ref, null, p10), u10.push(p10.ref, p10.__c || f2, p10)), null == m2 && null != f2 && (m2 = f2), 65536 & p10.__u || h10.__k === p10.__k ? l10 = function e11(t11, r11, i11) {
          var n11, a11;
          if ("function" == typeof t11.type) {
            for (n11 = t11.__k, a11 = 0; n11 && a11 < n11.length; a11++) n11[a11] && (n11[a11].__ = t11, r11 = e11(n11[a11], r11, i11));
            return r11;
          }
          t11.__e != r11 && (r11 && t11.type && !i11.contains(r11) && (r11 = aL(t11)), i11.insertBefore(t11.__e, r11 || null), r11 = t11.__e);
          do
            r11 = r11 && r11.nextSibling;
          while (null != r11 && 8 === r11.nodeType);
          return r11;
        }(p10, l10, e10) : "function" == typeof p10.type && void 0 !== p10.__d ? l10 = p10.__d : f2 && (l10 = f2.nextSibling), p10.__d = void 0, p10.__u &= -196609);
        r10.__d = l10, r10.__e = m2;
      }
      function aB(e10, t10, r10) {
        "-" === t10[0] ? e10.setProperty(t10, null == r10 ? "" : r10) : e10[t10] = null == r10 ? "" : "number" != typeof r10 || ak.test(t10) ? r10 : r10 + "px";
      }
      function aH(e10, t10, r10, i10, n10) {
        var a10;
        e: if ("style" === t10) if ("string" == typeof r10) e10.style.cssText = r10;
        else {
          if ("string" == typeof i10 && (e10.style.cssText = i10 = ""), i10) for (t10 in i10) r10 && t10 in r10 || aB(e10.style, t10, "");
          if (r10) for (t10 in r10) i10 && r10[t10] === i10[t10] || aB(e10.style, t10, r10[t10]);
        }
        else if ("o" === t10[0] && "n" === t10[1]) a10 = t10 !== (t10 = t10.replace(/(PointerCapture)$|Capture$/i, "$1")), t10 = t10.toLowerCase() in e10 || "onFocusOut" === t10 || "onFocusIn" === t10 ? t10.toLowerCase().slice(2) : t10.slice(2), e10.l || (e10.l = {}), e10.l[t10 + a10] = r10, r10 ? i10 ? r10.u = i10.u : (r10.u = ax, e10.addEventListener(t10, a10 ? aC : aT, a10)) : e10.removeEventListener(t10, a10 ? aC : aT, a10);
        else {
          if ("http://www.w3.org/2000/svg" == n10) t10 = t10.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
          else if ("width" != t10 && "height" != t10 && "href" != t10 && "list" != t10 && "form" != t10 && "tabIndex" != t10 && "download" != t10 && "rowSpan" != t10 && "colSpan" != t10 && "role" != t10 && "popover" != t10 && t10 in e10) try {
            e10[t10] = null == r10 ? "" : r10;
            break e;
          } catch (e11) {
          }
          "function" == typeof r10 || (null == r10 || false === r10 && "-" !== t10[4] ? e10.removeAttribute(t10) : e10.setAttribute(t10, "popover" == t10 && 1 == r10 ? "" : r10));
        }
      }
      function aq(e10) {
        return function(t10) {
          if (this.l) {
            var r10 = this.l[t10.type + e10];
            if (null == t10.t) t10.t = ax++;
            else if (t10.t < r10.u) return;
            return r10(ab.event ? ab.event(t10) : t10);
          }
        };
      }
      function aF(e10, t10, r10, i10, n10, a10, s10, o10, l10, c10) {
        var u10, d10, h10, p10, f2, m2, g2, y2, b2, w2, v2, _2, S2, E2, x2, T2, C2 = t10.type;
        if (void 0 !== t10.constructor) return null;
        128 & r10.__u && (l10 = !!(32 & r10.__u), a10 = [o10 = t10.__e = r10.__e]), (u10 = ab.__b) && u10(t10);
        e: if ("function" == typeof C2) try {
          if (y2 = t10.props, b2 = "prototype" in C2 && C2.prototype.render, w2 = (u10 = C2.contextType) && i10[u10.__c], v2 = u10 ? w2 ? w2.props.value : u10.__ : i10, r10.__c ? g2 = (d10 = t10.__c = r10.__c).__ = d10.__E : (b2 ? t10.__c = d10 = new C2(y2, v2) : (t10.__c = d10 = new aD(y2, v2), d10.constructor = C2, d10.render = aK), w2 && w2.sub(d10), d10.props = y2, d10.state || (d10.state = {}), d10.context = v2, d10.__n = i10, h10 = d10.__d = true, d10.__h = [], d10._sb = []), b2 && null == d10.__s && (d10.__s = d10.state), b2 && null != C2.getDerivedStateFromProps && (d10.__s == d10.state && (d10.__s = aO({}, d10.__s)), aO(d10.__s, C2.getDerivedStateFromProps(y2, d10.__s))), p10 = d10.props, f2 = d10.state, d10.__v = t10, h10) b2 && null == C2.getDerivedStateFromProps && null != d10.componentWillMount && d10.componentWillMount(), b2 && null != d10.componentDidMount && d10.__h.push(d10.componentDidMount);
          else {
            if (b2 && null == C2.getDerivedStateFromProps && y2 !== p10 && null != d10.componentWillReceiveProps && d10.componentWillReceiveProps(y2, v2), !d10.__e && (null != d10.shouldComponentUpdate && false === d10.shouldComponentUpdate(y2, d10.__s, v2) || t10.__v === r10.__v)) {
              for (t10.__v !== r10.__v && (d10.props = y2, d10.state = d10.__s, d10.__d = false), t10.__e = r10.__e, t10.__k = r10.__k, t10.__k.some(function(e11) {
                e11 && (e11.__ = t10);
              }), _2 = 0; _2 < d10._sb.length; _2++) d10.__h.push(d10._sb[_2]);
              d10._sb = [], d10.__h.length && s10.push(d10);
              break e;
            }
            null != d10.componentWillUpdate && d10.componentWillUpdate(y2, d10.__s, v2), b2 && null != d10.componentDidUpdate && d10.__h.push(function() {
              d10.componentDidUpdate(p10, f2, m2);
            });
          }
          if (d10.context = v2, d10.props = y2, d10.__P = e10, d10.__e = false, S2 = ab.__r, E2 = 0, b2) {
            for (d10.state = d10.__s, d10.__d = false, S2 && S2(t10), u10 = d10.render(d10.props, d10.state, d10.context), x2 = 0; x2 < d10._sb.length; x2++) d10.__h.push(d10._sb[x2]);
            d10._sb = [];
          } else do
            d10.__d = false, S2 && S2(t10), u10 = d10.render(d10.props, d10.state, d10.context), d10.state = d10.__s;
          while (d10.__d && ++E2 < 25);
          d10.state = d10.__s, null != d10.getChildContext && (i10 = aO(aO({}, i10), d10.getChildContext())), b2 && !h10 && null != d10.getSnapshotBeforeUpdate && (m2 = d10.getSnapshotBeforeUpdate(p10, f2)), aM(e10, aR(T2 = null != u10 && u10.type === a$ && null == u10.key ? u10.props.children : u10) ? T2 : [T2], t10, r10, i10, n10, a10, s10, o10, l10, c10), d10.base = t10.__e, t10.__u &= -161, d10.__h.length && s10.push(d10), g2 && (d10.__E = d10.__ = null);
        } catch (e11) {
          if (t10.__v = null, l10 || null != a10) {
            for (t10.__u |= l10 ? 160 : 128; o10 && 8 === o10.nodeType && o10.nextSibling; ) o10 = o10.nextSibling;
            a10[a10.indexOf(o10)] = null, t10.__e = o10;
          } else t10.__e = r10.__e, t10.__k = r10.__k;
          ab.__e(e11, t10, r10);
        }
        else null == a10 && t10.__v === r10.__v ? (t10.__k = r10.__k, t10.__e = r10.__e) : t10.__e = function(e11, t11, r11, i11, n11, a11, s11, o11, l11) {
          var c11, u11, d11, h11, p11, f3, m3, g3 = r11.props, y3 = t11.props, b3 = t11.type;
          if ("svg" === b3 ? n11 = "http://www.w3.org/2000/svg" : "math" === b3 ? n11 = "http://www.w3.org/1998/Math/MathML" : n11 || (n11 = "http://www.w3.org/1999/xhtml"), null != a11) {
            for (c11 = 0; c11 < a11.length; c11++) if ((p11 = a11[c11]) && "setAttribute" in p11 == !!b3 && (b3 ? p11.localName === b3 : 3 === p11.nodeType)) {
              e11 = p11, a11[c11] = null;
              break;
            }
          }
          if (null == e11) {
            if (null === b3) return document.createTextNode(y3);
            e11 = document.createElementNS(n11, b3, y3.is && y3), o11 && (ab.__m && ab.__m(t11, a11), o11 = false), a11 = null;
          }
          if (null === b3) g3 === y3 || o11 && e11.data === y3 || (e11.data = y3);
          else {
            if (a11 = a11 && ay.call(e11.childNodes), g3 = r11.props || aA, !o11 && null != a11) for (g3 = {}, c11 = 0; c11 < e11.attributes.length; c11++) g3[(p11 = e11.attributes[c11]).name] = p11.value;
            for (c11 in g3) if (p11 = g3[c11], "children" == c11) ;
            else if ("dangerouslySetInnerHTML" == c11) d11 = p11;
            else if (!(c11 in y3)) {
              if ("value" == c11 && "defaultValue" in y3 || "checked" == c11 && "defaultChecked" in y3) continue;
              aH(e11, c11, null, p11, n11);
            }
            for (c11 in y3) p11 = y3[c11], "children" == c11 ? h11 = p11 : "dangerouslySetInnerHTML" == c11 ? u11 = p11 : "value" == c11 ? f3 = p11 : "checked" == c11 ? m3 = p11 : o11 && "function" != typeof p11 || g3[c11] === p11 || aH(e11, c11, p11, g3[c11], n11);
            if (u11) o11 || d11 && (u11.__html === d11.__html || u11.__html === e11.innerHTML) || (e11.innerHTML = u11.__html), t11.__k = [];
            else if (d11 && (e11.innerHTML = ""), aM(e11, aR(h11) ? h11 : [h11], t11, r11, i11, "foreignObject" === b3 ? "http://www.w3.org/1999/xhtml" : n11, a11, s11, a11 ? a11[0] : r11.__k && aL(r11, 0), o11, l11), null != a11) for (c11 = a11.length; c11--; ) aN(a11[c11]);
            o11 || (c11 = "value", "progress" === b3 && null == f3 ? e11.removeAttribute("value") : void 0 === f3 || f3 === e11[c11] && ("progress" !== b3 || f3) && ("option" !== b3 || f3 === g3[c11]) || aH(e11, c11, f3, g3[c11], n11), c11 = "checked", void 0 !== m3 && m3 !== e11[c11] && aH(e11, c11, m3, g3[c11], n11));
          }
          return e11;
        }(r10.__e, t10, r10, i10, n10, a10, s10, l10, c10);
        (u10 = ab.diffed) && u10(t10);
      }
      function aW(e10, t10, r10) {
        try {
          if ("function" == typeof e10) {
            var i10 = "function" == typeof e10.__u;
            i10 && e10.__u(), i10 && null == t10 || (e10.__u = e10(t10));
          } else e10.current = t10;
        } catch (e11) {
          ab.__e(e11, r10);
        }
      }
      function aK(e10, t10, r10) {
        return this.constructor(e10, r10);
      }
      ay = aP.slice, ab = { __e: function(e10, t10, r10, i10) {
        for (var n10, a10, s10; t10 = t10.__; ) if ((n10 = t10.__c) && !n10.__) try {
          if ((a10 = n10.constructor) && null != a10.getDerivedStateFromError && (n10.setState(a10.getDerivedStateFromError(e10)), s10 = n10.__d), null != n10.componentDidCatch && (n10.componentDidCatch(e10, i10 || {}), s10 = n10.__d), s10) return n10.__E = n10;
        } catch (t11) {
          e10 = t11;
        }
        throw e10;
      } }, aw = 0, aD.prototype.setState = function(e10, t10) {
        var r10;
        r10 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = aO({}, this.state), "function" == typeof e10 && (e10 = e10(aO({}, r10), this.props)), e10 && aO(r10, e10), null != e10 && this.__v && (t10 && this._sb.push(t10), aU(this));
      }, aD.prototype.forceUpdate = function(e10) {
        this.__v && (this.__e = true, e10 && this.__h.push(e10), aU(this));
      }, aD.prototype.render = a$, av = [], aS = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, aE = function(e10, t10) {
        return e10.__v.__b - t10.__v.__b;
      }, aj.__r = 0, ax = 0, aT = aq(false), aC = aq(true);
      var aV = /[\s\n\\/='"\0<>]/, az = /^(xlink|xmlns|xml)([A-Z])/, aQ = /^accessK|^auto[A-Z]|^cell|^ch|^col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z]/, aJ = /^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/, aG = /* @__PURE__ */ new Set(["draggable", "spellcheck"]), aX = /["&<]/;
      function aY(e10) {
        if (0 === e10.length || false === aX.test(e10)) return e10;
        for (var t10 = 0, r10 = 0, i10 = "", n10 = ""; r10 < e10.length; r10++) {
          switch (e10.charCodeAt(r10)) {
            case 34:
              n10 = "&quot;";
              break;
            case 38:
              n10 = "&amp;";
              break;
            case 60:
              n10 = "&lt;";
              break;
            default:
              continue;
          }
          r10 !== t10 && (i10 += e10.slice(t10, r10)), i10 += n10, t10 = r10 + 1;
        }
        return r10 !== t10 && (i10 += e10.slice(t10, r10)), i10;
      }
      var aZ = {}, a0 = /* @__PURE__ */ new Set(["animation-iteration-count", "border-image-outset", "border-image-slice", "border-image-width", "box-flex", "box-flex-group", "box-ordinal-group", "column-count", "fill-opacity", "flex", "flex-grow", "flex-negative", "flex-order", "flex-positive", "flex-shrink", "flood-opacity", "font-weight", "grid-column", "grid-row", "line-clamp", "line-height", "opacity", "order", "orphans", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "widows", "z-index", "zoom"]), a1 = /[A-Z]/g;
      function a2() {
        this.__d = true;
      }
      function a3(e10, t10, r10) {
        if (!e10.s) {
          if (r10 instanceof a9) {
            if (!r10.s) return void (r10.o = a3.bind(null, e10, t10));
            1 & t10 && (t10 = r10.s), r10 = r10.v;
          }
          if (r10 && r10.then) return void r10.then(a3.bind(null, e10, t10), a3.bind(null, e10, 2));
          e10.s = t10, e10.v = r10;
          let i10 = e10.o;
          i10 && i10(e10);
        }
      }
      var a4, a5, a6, a8, a9 = function() {
        function e10() {
        }
        return e10.prototype.then = function(t10, r10) {
          var i10 = new e10(), n10 = this.s;
          if (n10) {
            var a10 = 1 & n10 ? t10 : r10;
            if (a10) {
              try {
                a3(i10, 1, a10(this.v));
              } catch (e11) {
                a3(i10, 2, e11);
              }
              return i10;
            }
            return this;
          }
          return this.o = function(e11) {
            try {
              var n11 = e11.v;
              1 & e11.s ? a3(i10, 1, t10 ? t10(n11) : n11) : r10 ? a3(i10, 1, r10(n11)) : a3(i10, 2, n11);
            } catch (e12) {
              a3(i10, 2, e12);
            }
          }, i10;
        }, e10;
      }(), a7 = {}, se = [], st = Array.isArray, sr = Object.assign;
      function si(e10, t10) {
        var r10, i10 = e10.type, n10 = true;
        return e10.__c ? (n10 = false, (r10 = e10.__c).state = r10.__s) : r10 = new i10(e10.props, t10), e10.__c = r10, r10.__v = e10, r10.props = e10.props, r10.context = t10, r10.__d = true, null == r10.state && (r10.state = a7), null == r10.__s && (r10.__s = r10.state), i10.getDerivedStateFromProps ? r10.state = sr({}, r10.state, i10.getDerivedStateFromProps(r10.props, r10.state)) : n10 && r10.componentWillMount ? (r10.componentWillMount(), r10.state = r10.__s !== r10.state ? r10.__s : r10.state) : !n10 && r10.componentWillUpdate && r10.componentWillUpdate(), a6 && a6(e10), r10.render(r10.props, r10.state, t10);
      }
      var sn = /* @__PURE__ */ new Set(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]), sa = 0;
      function ss(e10, t10, r10, i10, n10, a10) {
        t10 || (t10 = {});
        var s10, o10, l10 = t10;
        "ref" in t10 && (s10 = t10.ref, delete t10.ref);
        var c10 = { type: e10, props: l10, key: r10, ref: s10, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --sa, __i: -1, __u: 0, __source: n10, __self: a10 };
        if ("function" == typeof e10 && (s10 = e10.defaultProps)) for (o10 in s10) void 0 === l10[o10] && (l10[o10] = s10[o10]);
        return ab.vnode && ab.vnode(c10), c10;
      }
      async function so(e10, t10) {
        let r10 = window.SimpleWebAuthnBrowser;
        async function i10(r11) {
          let i11 = new URL(`${e10}/webauthn-options/${t10}`);
          r11 && i11.searchParams.append("action", r11), a10().forEach((e11) => {
            i11.searchParams.append(e11.name, e11.value);
          });
          let n11 = await fetch(i11);
          return n11.ok ? n11.json() : void console.error("Failed to fetch options", n11);
        }
        function n10() {
          let e11 = `#${t10}-form`, r11 = document.querySelector(e11);
          if (!r11) throw Error(`Form '${e11}' not found`);
          return r11;
        }
        function a10() {
          return Array.from(n10().querySelectorAll("input[data-form-field]"));
        }
        async function s10(e11, t11) {
          let r11 = n10();
          if (e11) {
            let t12 = document.createElement("input");
            t12.type = "hidden", t12.name = "action", t12.value = e11, r11.appendChild(t12);
          }
          if (t11) {
            let e12 = document.createElement("input");
            e12.type = "hidden", e12.name = "data", e12.value = JSON.stringify(t11), r11.appendChild(e12);
          }
          return r11.submit();
        }
        async function o10(e11, t11) {
          let i11 = await r10.startAuthentication(e11, t11);
          return await s10("authenticate", i11);
        }
        async function l10(e11) {
          a10().forEach((e12) => {
            if (e12.required && !e12.value) throw Error(`Missing required field: ${e12.name}`);
          });
          let t11 = await r10.startRegistration(e11);
          return await s10("register", t11);
        }
        async function c10() {
          if (!r10.browserSupportsWebAuthnAutofill()) return;
          let e11 = await i10("authenticate");
          if (!e11) return void console.error("Failed to fetch option for autofill authentication");
          try {
            await o10(e11.options, true);
          } catch (e12) {
            console.error(e12);
          }
        }
        (async function() {
          let e11 = n10();
          if (!r10.browserSupportsWebAuthn()) {
            e11.style.display = "none";
            return;
          }
          e11 && e11.addEventListener("submit", async (e12) => {
            e12.preventDefault();
            let t11 = await i10(void 0);
            if (!t11) return void console.error("Failed to fetch options for form submission");
            if ("authenticate" === t11.action) try {
              await o10(t11.options, false);
            } catch (e13) {
              console.error(e13);
            }
            else if ("register" === t11.action) try {
              await l10(t11.options);
            } catch (e13) {
              console.error(e13);
            }
          });
        })(), c10();
      }
      let sl = { default: "Unable to sign in.", Signin: "Try signing in with a different account.", OAuthSignin: "Try signing in with a different account.", OAuthCallbackError: "Try signing in with a different account.", OAuthCreateAccount: "Try signing in with a different account.", EmailCreateAccount: "Try signing in with a different account.", Callback: "Try signing in with a different account.", OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.", EmailSignin: "The e-mail could not be sent.", CredentialsSignin: "Sign in failed. Check the details you provided are correct.", SessionRequired: "Please sign in to access this page." }, sc = `:root {
  --border-width: 1px;
  --border-radius: 0.5rem;
  --color-error: #c94b4b;
  --color-info: #157efb;
  --color-info-hover: #0f6ddb;
  --color-info-text: #fff;
}

.__next-auth-theme-auto,
.__next-auth-theme-light {
  --color-background: #ececec;
  --color-background-hover: rgba(236, 236, 236, 0.8);
  --color-background-card: #fff;
  --color-text: #000;
  --color-primary: #444;
  --color-control-border: #bbb;
  --color-button-active-background: #f9f9f9;
  --color-button-active-border: #aaa;
  --color-separator: #ccc;
  --provider-bg: #fff;
  --provider-bg-hover: color-mix(
    in srgb,
    var(--provider-brand-color) 30%,
    #fff
  );
}

.__next-auth-theme-dark {
  --color-background: #161b22;
  --color-background-hover: rgba(22, 27, 34, 0.8);
  --color-background-card: #0d1117;
  --color-text: #fff;
  --color-primary: #ccc;
  --color-control-border: #555;
  --color-button-active-background: #060606;
  --color-button-active-border: #666;
  --color-separator: #444;
  --provider-bg: #161b22;
  --provider-bg-hover: color-mix(
    in srgb,
    var(--provider-brand-color) 30%,
    #000
  );
}

.__next-auth-theme-dark img[src$="42-school.svg"],
  .__next-auth-theme-dark img[src$="apple.svg"],
  .__next-auth-theme-dark img[src$="boxyhq-saml.svg"],
  .__next-auth-theme-dark img[src$="eveonline.svg"],
  .__next-auth-theme-dark img[src$="github.svg"],
  .__next-auth-theme-dark img[src$="mailchimp.svg"],
  .__next-auth-theme-dark img[src$="medium.svg"],
  .__next-auth-theme-dark img[src$="okta.svg"],
  .__next-auth-theme-dark img[src$="patreon.svg"],
  .__next-auth-theme-dark img[src$="ping-id.svg"],
  .__next-auth-theme-dark img[src$="roblox.svg"],
  .__next-auth-theme-dark img[src$="threads.svg"],
  .__next-auth-theme-dark img[src$="wikimedia.svg"] {
    filter: invert(1);
  }

.__next-auth-theme-dark #submitButton {
    background-color: var(--provider-bg, var(--color-info));
  }

@media (prefers-color-scheme: dark) {
  .__next-auth-theme-auto {
    --color-background: #161b22;
    --color-background-hover: rgba(22, 27, 34, 0.8);
    --color-background-card: #0d1117;
    --color-text: #fff;
    --color-primary: #ccc;
    --color-control-border: #555;
    --color-button-active-background: #060606;
    --color-button-active-border: #666;
    --color-separator: #444;
    --provider-bg: #161b22;
    --provider-bg-hover: color-mix(
      in srgb,
      var(--provider-brand-color) 30%,
      #000
    );
  }
    .__next-auth-theme-auto img[src$="42-school.svg"],
    .__next-auth-theme-auto img[src$="apple.svg"],
    .__next-auth-theme-auto img[src$="boxyhq-saml.svg"],
    .__next-auth-theme-auto img[src$="eveonline.svg"],
    .__next-auth-theme-auto img[src$="github.svg"],
    .__next-auth-theme-auto img[src$="mailchimp.svg"],
    .__next-auth-theme-auto img[src$="medium.svg"],
    .__next-auth-theme-auto img[src$="okta.svg"],
    .__next-auth-theme-auto img[src$="patreon.svg"],
    .__next-auth-theme-auto img[src$="ping-id.svg"],
    .__next-auth-theme-auto img[src$="roblox.svg"],
    .__next-auth-theme-auto img[src$="threads.svg"],
    .__next-auth-theme-auto img[src$="wikimedia.svg"] {
      filter: invert(1);
    }
    .__next-auth-theme-auto #submitButton {
      background-color: var(--provider-bg, var(--color-info));
    }
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
}

h1 {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  font-weight: 400;
  color: var(--color-text);
}

p {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  color: var(--color-text);
}

form {
  margin: 0;
  padding: 0;
}

label {
  font-weight: 500;
  text-align: left;
  margin-bottom: 0.25rem;
  display: block;
  color: var(--color-text);
}

input[type] {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border: var(--border-width) solid var(--color-control-border);
  background: var(--color-background-card);
  font-size: 1rem;
  border-radius: var(--border-radius);
  color: var(--color-text);
}

p {
  font-size: 1.1rem;
  line-height: 2rem;
}

a.button {
  text-decoration: none;
  line-height: 1rem;
}

a.button:link,
  a.button:visited {
    background-color: var(--color-background);
    color: var(--color-primary);
  }

button,
a.button {
  padding: 0.75rem 1rem;
  color: var(--provider-color, var(--color-primary));
  background-color: var(--provider-bg, var(--color-background));
  border: 1px solid #00000031;
  font-size: 0.9rem;
  height: 50px;
  border-radius: var(--border-radius);
  transition: background-color 250ms ease-in-out;
  font-weight: 300;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:is(button,a.button):hover {
    background-color: var(--provider-bg-hover, var(--color-background-hover));
    cursor: pointer;
  }

:is(button,a.button):active {
    cursor: pointer;
  }

:is(button,a.button) span {
    color: var(--provider-bg);
  }

#submitButton {
  color: var(--button-text-color, var(--color-info-text));
  background-color: var(--brand-color, var(--color-info));
  width: 100%;
}

#submitButton:hover {
    background-color: var(
      --button-hover-bg,
      var(--color-info-hover)
    ) !important;
  }

a.site {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1rem;
  line-height: 2rem;
}

a.site:hover {
    text-decoration: underline;
  }

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page > div {
    text-align: center;
  }

.error a.button {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 0.5rem;
  }

.error .message {
    margin-bottom: 1.5rem;
  }

.signin input[type="text"] {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

.signin hr {
    display: block;
    border: 0;
    border-top: 1px solid var(--color-separator);
    margin: 2rem auto 1rem auto;
    overflow: visible;
  }

.signin hr::before {
      content: "or";
      background: var(--color-background-card);
      color: #888;
      padding: 0 0.4rem;
      position: relative;
      top: -0.7rem;
    }

.signin .error {
    background: #f5f5f5;
    font-weight: 500;
    border-radius: 0.3rem;
    background: var(--color-error);
  }

.signin .error p {
      text-align: left;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      line-height: 1.2rem;
      color: var(--color-info-text);
    }

.signin > div,
  .signin form {
    display: block;
  }

.signin > div input[type], .signin form input[type] {
      margin-bottom: 0.5rem;
    }

.signin > div button, .signin form button {
      width: 100%;
    }

.signin .provider + .provider {
    margin-top: 1rem;
  }

.logo {
  display: inline-block;
  max-width: 150px;
  margin: 1.25rem 0;
  max-height: 70px;
}

.card {
  background-color: var(--color-background-card);
  border-radius: 1rem;
  padding: 1.25rem 2rem;
}

.card .header {
    color: var(--color-primary);
  }

.card input[type]::-moz-placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type]::placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type] {
    background: color-mix(in srgb, var(--color-background-card) 95%, black);
  }

.section-header {
  color: var(--color-text);
}

@media screen and (min-width: 450px) {
  .card {
    margin: 2rem 0;
    width: 368px;
  }
}

@media screen and (max-width: 450px) {
  .card {
    margin: 1rem 0;
    width: 343px;
  }
}
`;
      function su({ html: e10, title: t10, status: r10, cookies: i10, theme: n10, headTags: a10 }) {
        return { cookies: i10, status: r10, headers: { "Content-Type": "text/html" }, body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${sc}</style><title>${t10}</title>${a10 ?? ""}</head><body class="__next-auth-theme-${n10?.colorScheme ?? "auto"}"><div class="page">${function(e11) {
          var t11 = ab.__s;
          ab.__s = true, a4 = ab.__b, a5 = ab.diffed, a6 = ab.__r, a8 = ab.unmount;
          var r11 = function(e12, t12, r12) {
            var i12, n11, a11, s10 = {};
            for (a11 in t12) "key" == a11 ? i12 = t12[a11] : "ref" == a11 ? n11 = t12[a11] : s10[a11] = t12[a11];
            if (arguments.length > 2 && (s10.children = arguments.length > 3 ? ay.call(arguments, 2) : r12), "function" == typeof e12 && null != e12.defaultProps) for (a11 in e12.defaultProps) void 0 === s10[a11] && (s10[a11] = e12.defaultProps[a11]);
            return aI(e12, s10, i12, n11, null);
          }(a$, null);
          r11.__k = [e11];
          try {
            var i11 = function e12(t12, r12, i12, n11, a11, s10, o10) {
              if (null == t12 || true === t12 || false === t12 || "" === t12) return "";
              var l10 = typeof t12;
              if ("object" != l10) return "function" == l10 ? "" : "string" == l10 ? aY(t12) : t12 + "";
              if (st(t12)) {
                var c10, u10 = "";
                a11.__k = t12;
                for (var d10 = 0; d10 < t12.length; d10++) {
                  var h10 = t12[d10];
                  if (null != h10 && "boolean" != typeof h10) {
                    var p10, f2 = e12(h10, r12, i12, n11, a11, s10, o10);
                    "string" == typeof f2 ? u10 += f2 : (c10 || (c10 = []), u10 && c10.push(u10), u10 = "", st(f2) ? (p10 = c10).push.apply(p10, f2) : c10.push(f2));
                  }
                }
                return c10 ? (u10 && c10.push(u10), c10) : u10;
              }
              if (void 0 !== t12.constructor) return "";
              t12.__ = a11, a4 && a4(t12);
              var m2 = t12.type, g2 = t12.props;
              if ("function" == typeof m2) {
                var y2, b2, w2, v2 = r12;
                if (m2 === a$) {
                  if ("tpl" in g2) {
                    for (var _2 = "", S2 = 0; S2 < g2.tpl.length; S2++) if (_2 += g2.tpl[S2], g2.exprs && S2 < g2.exprs.length) {
                      var E2 = g2.exprs[S2];
                      if (null == E2) continue;
                      "object" == typeof E2 && (void 0 === E2.constructor || st(E2)) ? _2 += e12(E2, r12, i12, n11, t12, s10, o10) : _2 += E2;
                    }
                    return _2;
                  }
                  if ("UNSTABLE_comment" in g2) return "<!--" + aY(g2.UNSTABLE_comment) + "-->";
                  b2 = g2.children;
                } else {
                  if (null != (y2 = m2.contextType)) {
                    var x2 = r12[y2.__c];
                    v2 = x2 ? x2.props.value : y2.__;
                  }
                  var T2 = m2.prototype && "function" == typeof m2.prototype.render;
                  if (T2) b2 = si(t12, v2), w2 = t12.__c;
                  else {
                    t12.__c = w2 = { __v: t12, context: v2, props: t12.props, setState: a2, forceUpdate: a2, __d: true, __h: [] };
                    for (var C2 = 0; w2.__d && C2++ < 25; ) w2.__d = false, a6 && a6(t12), b2 = m2.call(w2, g2, v2);
                    w2.__d = true;
                  }
                  if (null != w2.getChildContext && (r12 = sr({}, r12, w2.getChildContext())), T2 && ab.errorBoundaries && (m2.getDerivedStateFromError || w2.componentDidCatch)) {
                    b2 = null != b2 && b2.type === a$ && null == b2.key && null == b2.props.tpl ? b2.props.children : b2;
                    try {
                      return e12(b2, r12, i12, n11, t12, s10, o10);
                    } catch (a12) {
                      return m2.getDerivedStateFromError && (w2.__s = m2.getDerivedStateFromError(a12)), w2.componentDidCatch && w2.componentDidCatch(a12, a7), w2.__d ? (b2 = si(t12, r12), null != (w2 = t12.__c).getChildContext && (r12 = sr({}, r12, w2.getChildContext())), e12(b2 = null != b2 && b2.type === a$ && null == b2.key && null == b2.props.tpl ? b2.props.children : b2, r12, i12, n11, t12, s10, o10)) : "";
                    } finally {
                      a5 && a5(t12), t12.__ = null, a8 && a8(t12);
                    }
                  }
                }
                b2 = null != b2 && b2.type === a$ && null == b2.key && null == b2.props.tpl ? b2.props.children : b2;
                try {
                  var A2 = e12(b2, r12, i12, n11, t12, s10, o10);
                  return a5 && a5(t12), t12.__ = null, ab.unmount && ab.unmount(t12), A2;
                } catch (a12) {
                  if (!s10 && o10 && o10.onError) {
                    var P2 = o10.onError(a12, t12, function(a13) {
                      return e12(a13, r12, i12, n11, t12, s10, o10);
                    });
                    if (void 0 !== P2) return P2;
                    var k2 = ab.__e;
                    return k2 && k2(a12, t12), "";
                  }
                  if (!s10 || !a12 || "function" != typeof a12.then) throw a12;
                  return a12.then(function a13() {
                    try {
                      return e12(b2, r12, i12, n11, t12, s10, o10);
                    } catch (l11) {
                      if (!l11 || "function" != typeof l11.then) throw l11;
                      return l11.then(function() {
                        return e12(b2, r12, i12, n11, t12, s10, o10);
                      }, a13);
                    }
                  });
                }
              }
              var R2, O2 = "<" + m2, N2 = "";
              for (var I2 in g2) {
                var $2 = g2[I2];
                if ("function" != typeof $2 || "class" === I2 || "className" === I2) {
                  switch (I2) {
                    case "children":
                      R2 = $2;
                      continue;
                    case "key":
                    case "ref":
                    case "__self":
                    case "__source":
                      continue;
                    case "htmlFor":
                      if ("for" in g2) continue;
                      I2 = "for";
                      break;
                    case "className":
                      if ("class" in g2) continue;
                      I2 = "class";
                      break;
                    case "defaultChecked":
                      I2 = "checked";
                      break;
                    case "defaultSelected":
                      I2 = "selected";
                      break;
                    case "defaultValue":
                    case "value":
                      switch (I2 = "value", m2) {
                        case "textarea":
                          R2 = $2;
                          continue;
                        case "select":
                          n11 = $2;
                          continue;
                        case "option":
                          n11 != $2 || "selected" in g2 || (O2 += " selected");
                      }
                      break;
                    case "dangerouslySetInnerHTML":
                      N2 = $2 && $2.__html;
                      continue;
                    case "style":
                      "object" == typeof $2 && ($2 = function(e13) {
                        var t13 = "";
                        for (var r13 in e13) {
                          var i13 = e13[r13];
                          if (null != i13 && "" !== i13) {
                            var n12 = "-" == r13[0] ? r13 : aZ[r13] || (aZ[r13] = r13.replace(a1, "-$&").toLowerCase()), a12 = ";";
                            "number" != typeof i13 || n12.startsWith("--") || a0.has(n12) || (a12 = "px;"), t13 = t13 + n12 + ":" + i13 + a12;
                          }
                        }
                        return t13 || void 0;
                      }($2));
                      break;
                    case "acceptCharset":
                      I2 = "accept-charset";
                      break;
                    case "httpEquiv":
                      I2 = "http-equiv";
                      break;
                    default:
                      if (az.test(I2)) I2 = I2.replace(az, "$1:$2").toLowerCase();
                      else {
                        if (aV.test(I2)) continue;
                        ("-" === I2[4] || aG.has(I2)) && null != $2 ? $2 += "" : i12 ? aJ.test(I2) && (I2 = "panose1" === I2 ? "panose-1" : I2.replace(/([A-Z])/g, "-$1").toLowerCase()) : aQ.test(I2) && (I2 = I2.toLowerCase());
                      }
                  }
                  null != $2 && false !== $2 && (O2 = true === $2 || "" === $2 ? O2 + " " + I2 : O2 + " " + I2 + '="' + ("string" == typeof $2 ? aY($2) : $2 + "") + '"');
                }
              }
              if (aV.test(m2)) throw Error(m2 + " is not a valid HTML tag name in " + O2 + ">");
              if (N2 || ("string" == typeof R2 ? N2 = aY(R2) : null != R2 && false !== R2 && true !== R2 && (N2 = e12(R2, r12, "svg" === m2 || "foreignObject" !== m2 && i12, n11, t12, s10, o10))), a5 && a5(t12), t12.__ = null, a8 && a8(t12), !N2 && sn.has(m2)) return O2 + "/>";
              var D2 = "</" + m2 + ">", L2 = O2 + ">";
              return st(N2) ? [L2].concat(N2, [D2]) : "string" != typeof N2 ? [L2, N2, D2] : L2 + N2 + D2;
            }(e11, a7, false, void 0, r11, false, void 0);
            return st(i11) ? i11.join("") : i11;
          } catch (e12) {
            if (e12.then) throw Error('Use "renderToStringAsync" for suspenseful rendering.');
            throw e12;
          } finally {
            ab.__c && ab.__c(e11, se), ab.__s = t11, se.length = 0;
          }
        }(e10)}</div></body></html>` };
      }
      function sd(e10) {
        let { url: t10, theme: r10, query: i10, cookies: n10, pages: a10, providers: s10 } = e10;
        return { csrf: (e11, t11, r11) => e11 ? (t11.logger.warn("csrf-disabled"), r11.push({ name: t11.cookies.csrfToken.name, value: "", options: { ...t11.cookies.csrfToken.options, maxAge: 0 } }), { status: 404, cookies: r11 }) : { headers: { "Content-Type": "application/json", "Cache-Control": "private, no-cache, no-store", Expires: "0", Pragma: "no-cache" }, body: { csrfToken: t11.csrfToken }, cookies: r11 }, providers: (e11) => ({ headers: { "Content-Type": "application/json" }, body: e11.reduce((e12, { id: t11, name: r11, type: i11, signinUrl: n11, callbackUrl: a11 }) => (e12[t11] = { id: t11, name: r11, type: i11, signinUrl: n11, callbackUrl: a11 }, e12), {}) }), signin(t11, o10) {
          if (t11) throw new rw("Unsupported action");
          if (a10?.signIn) {
            let t12 = `${a10.signIn}${a10.signIn.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: e10.callbackUrl ?? "/" })}`;
            return o10 && (t12 = `${t12}&${new URLSearchParams({ error: o10 })}`), { redirect: t12, cookies: n10 };
          }
          let l10 = s10?.find((e11) => "webauthn" === e11.type && e11.enableConditionalUI && !!e11.simpleWebAuthnBrowserVersion), c10 = "";
          if (l10) {
            let { simpleWebAuthnBrowserVersion: e11 } = l10;
            c10 = `<script src="https://unpkg.com/@simplewebauthn/browser@${e11}/dist/bundle/index.umd.min.js" crossorigin="anonymous"></script>`;
          }
          return su({ cookies: n10, theme: r10, html: function(e11) {
            let { csrfToken: t12, providers: r11 = [], callbackUrl: i11, theme: n11, email: a11, error: s11 } = e11;
            "u" > typeof document && n11?.brandColor && document.documentElement.style.setProperty("--brand-color", n11.brandColor), "u" > typeof document && n11?.buttonText && document.documentElement.style.setProperty("--button-text-color", n11.buttonText);
            let o11 = s11 && (sl[s11] ?? sl.default), l11 = r11.find((e12) => "webauthn" === e12.type && e12.enableConditionalUI)?.id;
            return ss("div", { className: "signin", children: [n11?.brandColor && ss("style", { dangerouslySetInnerHTML: { __html: `:root {--brand-color: ${n11.brandColor}}` } }), n11?.buttonText && ss("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --button-text-color: ${n11.buttonText}
        }
      ` } }), ss("div", { className: "card", children: [o11 && ss("div", { className: "error", children: ss("p", { children: o11 }) }), n11?.logo && ss("img", { src: n11.logo, alt: "Logo", className: "logo" }), r11.map((e12, n12) => {
              let s12, o12, l12;
              ("oauth" === e12.type || "oidc" === e12.type) && ({ bg: s12 = "#fff", brandColor: o12, logo: l12 = `https://authjs.dev/img/providers/${e12.id}.svg` } = e12.style ?? {});
              let c11 = o12 ?? s12 ?? "#fff";
              return ss("div", { className: "provider", children: ["oauth" === e12.type || "oidc" === e12.type ? ss("form", { action: e12.signinUrl, method: "POST", children: [ss("input", { type: "hidden", name: "csrfToken", value: t12 }), i11 && ss("input", { type: "hidden", name: "callbackUrl", value: i11 }), ss("button", { type: "submit", className: "button", style: { "--provider-brand-color": c11 }, tabIndex: 0, children: [ss("span", { style: { filter: "invert(1) grayscale(1) brightness(1.3) contrast(9000)", "mix-blend-mode": "luminosity", opacity: 0.95 }, children: ["Sign in with ", e12.name] }), l12 && ss("img", { loading: "lazy", height: 24, src: l12 })] })] }) : null, ("email" === e12.type || "credentials" === e12.type || "webauthn" === e12.type) && n12 > 0 && "email" !== r11[n12 - 1].type && "credentials" !== r11[n12 - 1].type && "webauthn" !== r11[n12 - 1].type && ss("hr", {}), "email" === e12.type && ss("form", { action: e12.signinUrl, method: "POST", children: [ss("input", { type: "hidden", name: "csrfToken", value: t12 }), ss("label", { className: "section-header", htmlFor: `input-email-for-${e12.id}-provider`, children: "Email" }), ss("input", { id: `input-email-for-${e12.id}-provider`, autoFocus: true, type: "email", name: "email", value: a11, placeholder: "email@example.com", required: true }), ss("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), "credentials" === e12.type && ss("form", { action: e12.callbackUrl, method: "POST", children: [ss("input", { type: "hidden", name: "csrfToken", value: t12 }), Object.keys(e12.credentials).map((t13) => ss("div", { children: [ss("label", { className: "section-header", htmlFor: `input-${t13}-for-${e12.id}-provider`, children: e12.credentials[t13].label ?? t13 }), ss("input", { name: t13, id: `input-${t13}-for-${e12.id}-provider`, type: e12.credentials[t13].type ?? "text", placeholder: e12.credentials[t13].placeholder ?? "", ...e12.credentials[t13] })] }, `input-group-${e12.id}`)), ss("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), "webauthn" === e12.type && ss("form", { action: e12.callbackUrl, method: "POST", id: `${e12.id}-form`, children: [ss("input", { type: "hidden", name: "csrfToken", value: t12 }), Object.keys(e12.formFields).map((t13) => ss("div", { children: [ss("label", { className: "section-header", htmlFor: `input-${t13}-for-${e12.id}-provider`, children: e12.formFields[t13].label ?? t13 }), ss("input", { name: t13, "data-form-field": true, id: `input-${t13}-for-${e12.id}-provider`, type: e12.formFields[t13].type ?? "text", placeholder: e12.formFields[t13].placeholder ?? "", ...e12.formFields[t13] })] }, `input-group-${e12.id}`)), ss("button", { id: `submitButton-${e12.id}`, type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), ("email" === e12.type || "credentials" === e12.type || "webauthn" === e12.type) && n12 + 1 < r11.length && ss("hr", {})] }, e12.id);
            })] }), l11 && ss(a$, { children: ss("script", { dangerouslySetInnerHTML: { __html: `
const currentURL = window.location.href;
const authURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
(${so})(authURL, "${l11}");
` } }) })] });
          }({ csrfToken: e10.csrfToken, providers: e10.providers?.filter((e11) => ["email", "oauth", "oidc"].includes(e11.type) || "credentials" === e11.type && e11.credentials || "webauthn" === e11.type && e11.formFields || false), callbackUrl: e10.callbackUrl, theme: e10.theme, error: o10, ...i10 }), title: "Sign In", headTags: c10 });
        }, signout: () => a10?.signOut ? { redirect: a10.signOut, cookies: n10 } : su({ cookies: n10, theme: r10, html: function(e11) {
          let { url: t11, csrfToken: r11, theme: i11 } = e11;
          return ss("div", { className: "signout", children: [i11?.brandColor && ss("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${i11.brandColor}
        }
      ` } }), i11?.buttonText && ss("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --button-text-color: ${i11.buttonText}
        }
      ` } }), ss("div", { className: "card", children: [i11?.logo && ss("img", { src: i11.logo, alt: "Logo", className: "logo" }), ss("h1", { children: "Signout" }), ss("p", { children: "Are you sure you want to sign out?" }), ss("form", { action: t11?.toString(), method: "POST", children: [ss("input", { type: "hidden", name: "csrfToken", value: r11 }), ss("button", { id: "submitButton", type: "submit", children: "Sign out" })] })] })] });
        }({ csrfToken: e10.csrfToken, url: t10, theme: r10 }), title: "Sign Out" }), verifyRequest: (e11) => a10?.verifyRequest ? { redirect: `${a10.verifyRequest}${t10?.search ?? ""}`, cookies: n10 } : su({ cookies: n10, theme: r10, html: function(e12) {
          let { url: t11, theme: r11 } = e12;
          return ss("div", { className: "verify-request", children: [r11.brandColor && ss("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${r11.brandColor}
        }
      ` } }), ss("div", { className: "card", children: [r11.logo && ss("img", { src: r11.logo, alt: "Logo", className: "logo" }), ss("h1", { children: "Check your email" }), ss("p", { children: "A sign in link has been sent to your email address." }), ss("p", { children: ss("a", { className: "site", href: t11.origin, children: t11.host }) })] })] });
        }({ url: t10, theme: r10, ...e11 }), title: "Verify Request" }), error: (e11) => a10?.error ? { redirect: `${a10.error}${a10.error.includes("?") ? "&" : "?"}error=${e11}`, cookies: n10 } : su({ cookies: n10, theme: r10, ...function(e12) {
          let { url: t11, error: r11 = "default", theme: i11 } = e12, n11 = `${t11}/signin`, a11 = { default: { status: 200, heading: "Error", message: ss("p", { children: ss("a", { className: "site", href: t11?.origin, children: t11?.host }) }) }, Configuration: { status: 500, heading: "Server error", message: ss("div", { children: [ss("p", { children: "There is a problem with the server configuration." }), ss("p", { children: "Check the server logs for more information." })] }) }, AccessDenied: { status: 403, heading: "Access Denied", message: ss("div", { children: [ss("p", { children: "You do not have permission to sign in." }), ss("p", { children: ss("a", { className: "button", href: n11, children: "Sign in" }) })] }) }, Verification: { status: 403, heading: "Unable to sign in", message: ss("div", { children: [ss("p", { children: "The sign in link is no longer valid." }), ss("p", { children: "It may have been used already or it may have expired." })] }), signin: ss("a", { className: "button", href: n11, children: "Sign in" }) } }, { status: s11, heading: o10, message: l10, signin: c10 } = a11[r11] ?? a11.default;
          return { status: s11, html: ss("div", { className: "error", children: [i11?.brandColor && ss("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${i11?.brandColor}
        }
      ` } }), ss("div", { className: "card", children: [i11?.logo && ss("img", { src: i11?.logo, alt: "Logo", className: "logo" }), ss("h1", { children: o10 }), ss("div", { className: "message", children: l10 }), c10] })] }) };
        }({ url: t10, theme: r10, error: e11 }), title: "Error" }) };
      }
      function sh(e10, t10 = Date.now()) {
        return new Date(t10 + 1e3 * e10);
      }
      async function sp(e10, t10, r10, i10) {
        if (!r10?.providerAccountId || !r10.type) throw Error("Missing or invalid provider account");
        if (!["email", "oauth", "oidc", "webauthn"].includes(r10.type)) throw Error("Provider not supported");
        let { adapter: n10, jwt: a10, events: s10, session: { strategy: o10, generateSessionToken: l10 } } = i10;
        if (!n10) return { user: t10, account: r10 };
        let c10 = r10, { createUser: u10, updateUser: d10, getUser: h10, getUserByAccount: p10, getUserByEmail: f2, linkAccount: m2, createSession: g2, getSessionAndUser: y2, deleteSession: b2 } = n10, w2 = null, v2 = null, _2 = false, S2 = "jwt" === o10;
        if (e10) if (S2) try {
          let t11 = i10.cookies.sessionToken.name;
          (w2 = await a10.decode({ ...a10, token: e10, salt: t11 })) && "sub" in w2 && w2.sub && (v2 = await h10(w2.sub));
        } catch {
        }
        else {
          let t11 = await y2(e10);
          t11 && (w2 = t11.session, v2 = t11.user);
        }
        if ("email" === c10.type) {
          let r11 = await f2(t10.email);
          return r11 ? (v2?.id !== r11.id && !S2 && e10 && await b2(e10), v2 = await d10({ id: r11.id, emailVerified: /* @__PURE__ */ new Date() }), await s10.updateUser?.({ user: v2 })) : (v2 = await u10({ ...t10, emailVerified: /* @__PURE__ */ new Date() }), await s10.createUser?.({ user: v2 }), _2 = true), { session: w2 = S2 ? {} : await g2({ sessionToken: l10(), userId: v2.id, expires: sh(i10.session.maxAge) }), user: v2, isNewUser: _2 };
        }
        if ("webauthn" === c10.type) {
          let e11 = await p10({ providerAccountId: c10.providerAccountId, provider: c10.provider });
          if (e11) {
            if (v2) {
              if (e11.id === v2.id) {
                let e12 = { ...c10, userId: v2.id };
                return { session: w2, user: v2, isNewUser: _2, account: e12 };
              }
              throw new rk("The account is already associated with another user", { provider: c10.provider });
            }
            w2 = S2 ? {} : await g2({ sessionToken: l10(), userId: e11.id, expires: sh(i10.session.maxAge) });
            let t11 = { ...c10, userId: e11.id };
            return { session: w2, user: e11, isNewUser: _2, account: t11 };
          }
          {
            if (v2) {
              await m2({ ...c10, userId: v2.id }), await s10.linkAccount?.({ user: v2, account: c10, profile: t10 });
              let e13 = { ...c10, userId: v2.id };
              return { session: w2, user: v2, isNewUser: _2, account: e13 };
            }
            if (t10.email ? await f2(t10.email) : null) throw new rk("Another account already exists with the same e-mail address", { provider: c10.provider });
            v2 = await u10({ ...t10 }), await s10.createUser?.({ user: v2 }), await m2({ ...c10, userId: v2.id }), await s10.linkAccount?.({ user: v2, account: c10, profile: t10 }), w2 = S2 ? {} : await g2({ sessionToken: l10(), userId: v2.id, expires: sh(i10.session.maxAge) });
            let e12 = { ...c10, userId: v2.id };
            return { session: w2, user: v2, isNewUser: true, account: e12 };
          }
        }
        let E2 = await p10({ providerAccountId: c10.providerAccountId, provider: c10.provider });
        if (E2) {
          if (v2) {
            if (E2.id === v2.id) return { session: w2, user: v2, isNewUser: _2 };
            throw new rf("The account is already associated with another user", { provider: c10.provider });
          }
          return { session: w2 = S2 ? {} : await g2({ sessionToken: l10(), userId: E2.id, expires: sh(i10.session.maxAge) }), user: E2, isNewUser: _2 };
        }
        {
          let { provider: e11 } = i10, { type: r11, provider: n11, providerAccountId: a11, userId: o11, ...d11 } = c10;
          if (c10 = Object.assign(e11.account(d11) ?? {}, { providerAccountId: a11, provider: n11, type: r11, userId: o11 }), v2) return await m2({ ...c10, userId: v2.id }), await s10.linkAccount?.({ user: v2, account: c10, profile: t10 }), { session: w2, user: v2, isNewUser: _2 };
          let h11 = t10.email ? await f2(t10.email) : null;
          if (h11) {
            let e12 = i10.provider;
            if (e12?.allowDangerousEmailAccountLinking) v2 = h11, _2 = false;
            else throw new rf("Another account already exists with the same e-mail address", { provider: c10.provider });
          } else v2 = await u10({ ...t10, emailVerified: null }), _2 = true;
          return await s10.createUser?.({ user: v2 }), await m2({ ...c10, userId: v2.id }), await s10.linkAccount?.({ user: v2, account: c10, profile: t10 }), { session: w2 = S2 ? {} : await g2({ sessionToken: l10(), userId: v2.id, expires: sh(i10.session.maxAge) }), user: v2, isNewUser: _2 };
        }
      }
      function sf(e10, t10) {
        if (null == e10) return false;
        try {
          return e10 instanceof t10 || Object.getPrototypeOf(e10)[Symbol.toStringTag] === t10.prototype[Symbol.toStringTag];
        } catch {
          return false;
        }
      }
      ("u" < typeof navigator || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) && (n = "oauth4webapi/v3.8.6");
      let sm = "ERR_INVALID_ARG_VALUE", sg = "ERR_INVALID_ARG_TYPE";
      function sy(e10, t10, r10) {
        let i10 = TypeError(e10, { cause: r10 });
        return Object.assign(i10, { code: t10 }), i10;
      }
      let sb = Symbol(), sw = Symbol(), sv = Symbol(), s_ = Symbol(), sS = Symbol(), sE = Symbol();
      Symbol();
      let sx = new TextEncoder(), sT = new TextDecoder();
      function sC(e10) {
        return "string" == typeof e10 ? sx.encode(e10) : sT.decode(e10);
      }
      function sA(e10) {
        return "string" == typeof e10 ? s(e10) : a(e10);
      }
      a = Uint8Array.prototype.toBase64 ? (e10) => (e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10)), e10.toBase64({ alphabet: "base64url", omitPadding: true })) : (e10) => {
        e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10));
        let t10 = [];
        for (let r10 = 0; r10 < e10.byteLength; r10 += 32768) t10.push(String.fromCharCode.apply(null, e10.subarray(r10, r10 + 32768)));
        return btoa(t10.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }, s = Uint8Array.fromBase64 ? (e10) => {
        try {
          return Uint8Array.fromBase64(e10, { alphabet: "base64url" });
        } catch (e11) {
          throw sy("The input to be decoded is not correctly encoded.", sm, e11);
        }
      } : (e10) => {
        try {
          let t10 = atob(e10.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), r10 = new Uint8Array(t10.length);
          for (let e11 = 0; e11 < t10.length; e11++) r10[e11] = t10.charCodeAt(e11);
          return r10;
        } catch (e11) {
          throw sy("The input to be decoded is not correctly encoded.", sm, e11);
        }
      };
      class sP extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = ok, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class sk extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, t10?.code && (this.code = t10?.code), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      function sR(e10, t10, r10) {
        return new sk(e10, { code: t10, cause: r10 });
      }
      function sO(e10) {
        return !(null === e10 || "object" != typeof e10 || Array.isArray(e10));
      }
      function sN(e10) {
        sf(e10, Headers) && (e10 = Object.fromEntries(e10.entries()));
        let t10 = new Headers(e10 ?? {});
        if (n && !t10.has("user-agent") && t10.set("user-agent", n), t10.has("authorization")) throw sy('"options.headers" must not include the "authorization" header name', sm);
        return t10;
      }
      function sI(e10, t10) {
        if (void 0 !== t10) {
          if ("function" == typeof t10 && (t10 = t10(e10.href)), !(t10 instanceof AbortSignal)) throw sy('"options.signal" must return or be an instance of AbortSignal', sg);
          return t10;
        }
      }
      function s$(e10) {
        return e10.includes("//") ? e10.replace("//", "/") : e10;
      }
      async function sD(e10, t10, r10, i10) {
        if (!(e10 instanceof URL)) throw sy(`"${t10}" must be an instance of URL`, sg);
        sX(e10, i10?.[sb] !== true);
        let n10 = r10(new URL(e10.href)), a10 = sN(i10?.headers);
        return a10.set("accept", "application/json"), (i10?.[s_] || fetch)(n10.href, { body: void 0, headers: Object.fromEntries(a10.entries()), method: "GET", redirect: "manual", signal: sI(n10, i10?.signal) });
      }
      async function sL(e10, t10) {
        return sD(e10, "issuerIdentifier", (e11) => {
          switch (t10?.algorithm) {
            case void 0:
            case "oidc":
              e11.pathname = s$(`${e11.pathname}/.well-known/openid-configuration`);
              break;
            case "oauth2":
              !function(e12, t11, r10 = false) {
                "/" === e12.pathname ? e12.pathname = t11 : e12.pathname = s$(`${t11}/${r10 ? e12.pathname : e12.pathname.replace(/(\/)$/, "")}`);
              }(e11, ".well-known/oauth-authorization-server");
              break;
            default:
              throw sy('"options.algorithm" must be "oidc" (default), or "oauth2"', sm);
          }
          return e11;
        }, t10);
      }
      function sU(e10, t10, r10, i10, n10) {
        try {
          if ("number" != typeof e10 || !Number.isFinite(e10)) throw sy(`${r10} must be a number`, sg, n10);
          if (e10 > 0) return;
          if (t10) {
            if (0 !== e10) throw sy(`${r10} must be a non-negative number`, sm, n10);
            return;
          }
          throw sy(`${r10} must be a positive number`, sm, n10);
        } catch (e11) {
          if (i10) throw sR(e11.message, i10, n10);
          throw e11;
        }
      }
      function sj(e10, t10, r10, i10) {
        try {
          if ("string" != typeof e10) throw sy(`${t10} must be a string`, sg, i10);
          if (0 === e10.length) throw sy(`${t10} must not be empty`, sm, i10);
        } catch (e11) {
          if (r10) throw sR(e11.message, r10, i10);
          throw e11;
        }
      }
      async function sM(e10, t10) {
        if (!(e10 instanceof URL) && e10 !== oX) throw sy('"expectedIssuerIdentifier" must be an instance of URL', sg);
        if (!sf(t10, Response)) throw sy('"response" must be an instance of Response', sg);
        if (200 !== t10.status) throw sR('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', oD, t10);
        oF(t10);
        let r10 = await oG(t10);
        if (sj(r10.issuer, '"response" body "issuer" property', oI, { body: r10 }), e10 !== oX && new URL(r10.issuer).href !== e10.href) throw sR('"response" body "issuer" property does not match the expected value', oB, { expected: e10.href, body: r10, attribute: "issuer" });
        return r10;
      }
      function sB(e10) {
        var t10 = e10, r10 = "application/json";
        if (on(t10) !== r10) throw function(e11, ...t11) {
          let r11 = '"response" content-type must be ';
          if (t11.length > 2) {
            let e12 = t11.pop();
            r11 += `${t11.join(", ")}, or ${e12}`;
          } else 2 === t11.length ? r11 += `${t11[0]} or ${t11[1]}` : r11 += t11[0];
          return sR(r11, o$, e11);
        }(t10, r10);
      }
      function sH() {
        return sA(crypto.getRandomValues(new Uint8Array(32)));
      }
      async function sq(e10) {
        return sj(e10, "codeVerifier"), sA(await crypto.subtle.digest("SHA-256", sC(e10)));
      }
      function sF(e10) {
        let t10 = e10?.[sw];
        return "number" == typeof t10 && Number.isFinite(t10) ? t10 : 0;
      }
      function sW(e10) {
        let t10 = e10?.[sv];
        return "number" == typeof t10 && Number.isFinite(t10) && -1 !== Math.sign(t10) ? t10 : 30;
      }
      function sK() {
        return Math.floor(Date.now() / 1e3);
      }
      function sV(e10) {
        if ("object" != typeof e10 || null === e10) throw sy('"as" must be an object', sg);
        sj(e10.issuer, '"as.issuer"');
      }
      function sz(e10) {
        if ("object" != typeof e10 || null === e10) throw sy('"client" must be an object', sg);
        sj(e10.client_id, '"client.client_id"');
      }
      function sQ(e10, t10) {
        let r10 = sK() + sF(t10);
        return { jti: sH(), aud: e10.issuer, exp: r10 + 60, iat: r10, nbf: r10, iss: t10.client_id, sub: t10.client_id };
      }
      async function sJ(e10, t10, r10) {
        if (!r10.usages.includes("sign")) throw sy('CryptoKey instances used for signing assertions must include "sign" in their "usages"', sm);
        let i10 = `${sA(sC(JSON.stringify(e10)))}.${sA(sC(JSON.stringify(t10)))}`, n10 = sA(await crypto.subtle.sign(function(e11) {
          switch (e11.algorithm.name) {
            case "ECDSA":
              return { name: e11.algorithm.name, hash: function(e12) {
                let { algorithm: t11 } = e12;
                switch (t11.namedCurve) {
                  case "P-256":
                    return "SHA-256";
                  case "P-384":
                    return "SHA-384";
                  case "P-521":
                    return "SHA-512";
                  default:
                    throw new sP("unsupported ECDSA namedCurve", { cause: e12 });
                }
              }(e11) };
            case "RSA-PSS":
              switch (oW(e11), e11.algorithm.hash.name) {
                case "SHA-256":
                case "SHA-384":
                case "SHA-512":
                  return { name: e11.algorithm.name, saltLength: parseInt(e11.algorithm.hash.name.slice(-3), 10) >> 3 };
                default:
                  throw new sP("unsupported RSA-PSS hash name", { cause: e11 });
              }
            case "RSASSA-PKCS1-v1_5":
              return oW(e11), e11.algorithm.name;
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
            case "Ed25519":
              return e11.algorithm.name;
          }
          throw new sP("unsupported CryptoKey algorithm name", { cause: e11 });
        }(r10), r10, sC(i10)));
        return `${i10}.${n10}`;
      }
      let sG = URL.parse ? (e10, t10) => URL.parse(e10, t10) : (e10, t10) => {
        try {
          return new URL(e10, t10);
        } catch {
          return null;
        }
      };
      function sX(e10, t10) {
        if (t10 && "https:" !== e10.protocol) throw sR("only requests to HTTPS are allowed", oL, e10);
        if ("https:" !== e10.protocol && "http:" !== e10.protocol) throw sR("only HTTP and HTTPS requests are allowed", oU, e10);
      }
      function sY(e10, t10, r10, i10) {
        let n10;
        if ("string" != typeof e10 || !(n10 = sG(e10))) throw sR(`authorization server metadata does not contain a valid ${r10 ? `"as.mtls_endpoint_aliases.${t10}"` : `"as.${t10}"`}`, void 0 === e10 ? oH : oq, { attribute: r10 ? `mtls_endpoint_aliases.${t10}` : t10 });
        return sX(n10, i10), n10;
      }
      function sZ(e10, t10, r10, i10) {
        return r10 && e10.mtls_endpoint_aliases && t10 in e10.mtls_endpoint_aliases ? sY(e10.mtls_endpoint_aliases[t10], t10, r10, i10) : sY(e10[t10], t10, r10, i10);
      }
      class s0 extends Error {
        cause;
        code;
        error;
        status;
        error_description;
        response;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = oP, this.cause = t10.cause, this.error = t10.cause.error, this.status = t10.response.status, this.error_description = t10.cause.error_description, Object.defineProperty(this, "response", { enumerable: false, value: t10.response }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class s1 extends Error {
        cause;
        code;
        error;
        error_description;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = oR, this.cause = t10.cause, this.error = t10.cause.get("error"), this.error_description = t10.cause.get("error_description") ?? void 0, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class s2 extends Error {
        cause;
        code;
        response;
        status;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = oA, this.cause = t10.cause, this.status = t10.response.status, this.response = t10.response, Object.defineProperty(this, "response", { enumerable: false }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      let s3 = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+", s4 = RegExp("^[,\\s]*(" + s3 + ")"), s5 = RegExp("^[,\\s]*(" + s3 + ')\\s*=\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)"[,\\s]*(.*)'), s6 = RegExp("^[,\\s]*" + ("(" + s3 + ")\\s*=\\s*(") + s3 + ")[,\\s]*(.*)"), s8 = RegExp("^([a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2})(?:$|[,\\s])(.*)");
      async function s9(e10) {
        if (e10.status > 399 && e10.status < 500) {
          oF(e10), sB(e10);
          try {
            let t10 = await e10.clone().json();
            if (sO(t10) && "string" == typeof t10.error && t10.error.length) return t10;
          } catch {
          }
        }
      }
      async function s7(e10, t10, r10) {
        if (e10.status !== t10) {
          let t11;
          if (oh(e10), t11 = await s9(e10)) throw await e10.body?.cancel(), new s0("server responded with an error in the response body", { cause: t11, response: e10 });
          throw sR(`"response" is not a conform ${r10} response (unexpected HTTP status code)`, oD, e10);
        }
      }
      function oe(e10) {
        if (!oy.has(e10)) throw sy('"options.DPoP" is not a valid DPoPHandle', sm);
      }
      async function ot(e10, t10, r10, i10, n10, a10) {
        if (sj(e10, '"accessToken"'), !(r10 instanceof URL)) throw sy('"url" must be an instance of URL', sg);
        sX(r10, a10?.[sb] !== true), i10 = sN(i10), a10?.DPoP && (oe(a10.DPoP), await a10.DPoP.addProof(r10, i10, t10.toUpperCase(), e10)), i10.set("authorization", `${i10.has("dpop") ? "DPoP" : "Bearer"} ${e10}`);
        let s10 = await (a10?.[s_] || fetch)(r10.href, { duplex: sf(n10, ReadableStream) ? "half" : void 0, body: n10, headers: Object.fromEntries(i10.entries()), method: t10, redirect: "manual", signal: sI(r10, a10?.signal) });
        return a10?.DPoP?.cacheNonce(s10, r10), s10;
      }
      async function or(e10, t10, r10, i10) {
        sV(e10), sz(t10);
        let n10 = sZ(e10, "userinfo_endpoint", t10.use_mtls_endpoint_aliases, i10?.[sb] !== true), a10 = sN(i10?.headers);
        return t10.userinfo_signed_response_alg ? a10.set("accept", "application/jwt") : (a10.set("accept", "application/json"), a10.append("accept", "application/jwt")), ot(r10, "GET", n10, a10, null, { ...i10, [sw]: sF(t10) });
      }
      let oi = Symbol();
      function on(e10) {
        return e10.headers.get("content-type")?.split(";")[0];
      }
      async function oa(e10, t10, r10, i10, n10) {
        let a10;
        if (sV(e10), sz(t10), !sf(i10, Response)) throw sy('"response" must be an instance of Response', sg);
        if (oh(i10), 200 !== i10.status) throw sR('"response" is not a conform UserInfo Endpoint response (unexpected HTTP status code)', oD, i10);
        if (oF(i10), "application/jwt" === on(i10)) {
          let { claims: r11, jwt: s10 } = await oK(await i10.text(), oV.bind(void 0, t10.userinfo_signed_response_alg, e10.userinfo_signing_alg_values_supported, void 0), sF(t10), sW(t10), n10?.[sE]).then(op.bind(void 0, t10.client_id)).then(om.bind(void 0, e10));
          oc.set(i10, s10), a10 = r11;
        } else {
          if (t10.userinfo_signed_response_alg) throw sR("JWT UserInfo Response expected", oO, i10);
          a10 = await oG(i10);
        }
        if (sj(a10.sub, '"response" body "sub" property', oI, { body: a10 }), r10 === oi) ;
        else if (sj(r10, '"expectedSubject"'), a10.sub !== r10) throw sR('unexpected "response" body "sub" property value', oB, { expected: r10, body: a10, attribute: "sub" });
        return a10;
      }
      async function os(e10, t10, r10, i10, n10, a10, s10) {
        return await r10(e10, t10, n10, a10), a10.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), (s10?.[s_] || fetch)(i10.href, { body: n10, headers: Object.fromEntries(a10.entries()), method: "POST", redirect: "manual", signal: sI(i10, s10?.signal) });
      }
      async function oo(e10, t10, r10, i10, n10, a10) {
        let s10 = sZ(e10, "token_endpoint", t10.use_mtls_endpoint_aliases, a10?.[sb] !== true);
        n10.set("grant_type", i10);
        let o10 = sN(a10?.headers);
        o10.set("accept", "application/json"), a10?.DPoP !== void 0 && (oe(a10.DPoP), await a10.DPoP.addProof(s10, o10, "POST"));
        let l10 = await os(e10, t10, r10, s10, n10, o10, a10);
        return a10?.DPoP?.cacheNonce(l10, s10), l10;
      }
      let ol = /* @__PURE__ */ new WeakMap(), oc = /* @__PURE__ */ new WeakMap();
      function ou(e10) {
        if (!e10.id_token) return;
        let t10 = ol.get(e10);
        if (!t10) throw sy('"ref" was already garbage collected or did not resolve from the proper sources', sm);
        return t10;
      }
      async function od(e10, t10, r10, i10, n10, a10) {
        if (sV(e10), sz(t10), !sf(r10, Response)) throw sy('"response" must be an instance of Response', sg);
        await s7(r10, 200, "Token Endpoint"), oF(r10);
        let s10 = await oG(r10);
        if (sj(s10.access_token, '"response" body "access_token" property', oI, { body: s10 }), sj(s10.token_type, '"response" body "token_type" property', oI, { body: s10 }), s10.token_type = s10.token_type.toLowerCase(), void 0 !== s10.expires_in) {
          let e11 = "number" != typeof s10.expires_in ? parseFloat(s10.expires_in) : s10.expires_in;
          sU(e11, true, '"response" body "expires_in" property', oI, { body: s10 }), s10.expires_in = e11;
        }
        if (void 0 !== s10.refresh_token && sj(s10.refresh_token, '"response" body "refresh_token" property', oI, { body: s10 }), void 0 !== s10.scope && "string" != typeof s10.scope) throw sR('"response" body "scope" property must be a string', oI, { body: s10 });
        if (void 0 !== s10.id_token) {
          sj(s10.id_token, '"response" body "id_token" property', oI, { body: s10 });
          let a11 = ["aud", "exp", "iat", "iss", "sub"];
          true === t10.require_auth_time && a11.push("auth_time"), void 0 !== t10.default_max_age && (sU(t10.default_max_age, true, '"client.default_max_age"'), a11.push("auth_time")), i10?.length && a11.push(...i10);
          let { claims: o10, jwt: l10 } = await oK(s10.id_token, oV.bind(void 0, t10.id_token_signed_response_alg, e10.id_token_signing_alg_values_supported, "RS256"), sF(t10), sW(t10), n10).then(o_.bind(void 0, a11)).then(og.bind(void 0, e10)).then(of.bind(void 0, t10.client_id));
          if (Array.isArray(o10.aud) && 1 !== o10.aud.length) {
            if (void 0 === o10.azp) throw sR('ID Token "aud" (audience) claim includes additional untrusted audiences', oM, { claims: o10, claim: "aud" });
            if (o10.azp !== t10.client_id) throw sR('unexpected ID Token "azp" (authorized party) claim value', oM, { expected: t10.client_id, claims: o10, claim: "azp" });
          }
          void 0 !== o10.auth_time && sU(o10.auth_time, true, 'ID Token "auth_time" (authentication time)', oI, { claims: o10 }), oc.set(r10, l10), ol.set(s10, o10);
        }
        if (a10?.[s10.token_type] !== void 0) a10[s10.token_type](r10, s10);
        else if ("dpop" !== s10.token_type && "bearer" !== s10.token_type) throw new sP("unsupported `token_type` value", { cause: { body: s10 } });
        return s10;
      }
      function oh(e10) {
        let t10;
        if (t10 = function(e11) {
          if (!sf(e11, Response)) throw sy('"response" must be an instance of Response', sg);
          let t11 = e11.headers.get("www-authenticate");
          if (null === t11) return;
          let r10 = [], i10 = t11;
          for (; i10; ) {
            let e12, t12 = i10.match(s4), n10 = t12?.["1"].toLowerCase();
            if (!n10) return;
            let a10 = i10.substring(t12[0].length);
            if (a10 && !a10.match(/^[\s,]/)) return;
            let s10 = a10.match(/^\s+(.*)$/), o10 = !!s10;
            i10 = s10 ? s10[1] : void 0;
            let l10 = {};
            if (o10) for (; i10; ) {
              let r11, n11;
              if (t12 = i10.match(s5)) {
                if ([, r11, n11, i10] = t12, n11.includes("\\")) try {
                  n11 = JSON.parse(`"${n11}"`);
                } catch {
                }
                l10[r11.toLowerCase()] = n11;
                continue;
              }
              if (t12 = i10.match(s6)) {
                [, r11, n11, i10] = t12, l10[r11.toLowerCase()] = n11;
                continue;
              }
              if (t12 = i10.match(s8)) {
                if (Object.keys(l10).length) break;
                [, e12, i10] = t12;
                break;
              }
              return;
            }
            else i10 = a10 || void 0;
            let c10 = { scheme: n10, parameters: l10 };
            e12 && (c10.token68 = e12), r10.push(c10);
          }
          if (r10.length) return r10;
        }(e10)) throw new s2("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: t10, response: e10 });
      }
      function op(e10, t10) {
        return void 0 !== t10.claims.aud ? of(e10, t10) : t10;
      }
      function of(e10, t10) {
        if (Array.isArray(t10.claims.aud)) {
          if (!t10.claims.aud.includes(e10)) throw sR('unexpected JWT "aud" (audience) claim value', oM, { expected: e10, claims: t10.claims, claim: "aud" });
        } else if (t10.claims.aud !== e10) throw sR('unexpected JWT "aud" (audience) claim value', oM, { expected: e10, claims: t10.claims, claim: "aud" });
        return t10;
      }
      function om(e10, t10) {
        return void 0 !== t10.claims.iss ? og(e10, t10) : t10;
      }
      function og(e10, t10) {
        let r10 = e10[oY]?.(t10) ?? e10.issuer;
        if (t10.claims.iss !== r10) throw sR('unexpected JWT "iss" (issuer) claim value', oM, { expected: r10, claims: t10.claims, claim: "iss" });
        return t10;
      }
      let oy = /* @__PURE__ */ new WeakSet(), ob = Symbol();
      async function ow(e10, t10, r10, i10, n10, a10, s10) {
        if (sV(e10), sz(t10), !oy.has(i10)) throw sy('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', sm);
        sj(n10, '"redirectUri"');
        let o10 = oz(i10, "code");
        if (!o10) throw sR('no authorization code in "callbackParameters"', oI);
        let l10 = new URLSearchParams(s10?.additionalParameters);
        return l10.set("redirect_uri", n10), l10.set("code", o10), a10 !== ob && (sj(a10, '"codeVerifier"'), l10.set("code_verifier", a10)), oo(e10, t10, r10, "authorization_code", l10, s10);
      }
      let ov = { aud: "audience", c_hash: "code hash", client_id: "client id", exp: "expiration time", iat: "issued at", iss: "issuer", jti: "jwt id", nonce: "nonce", s_hash: "state hash", sub: "subject", ath: "access token hash", htm: "http method", htu: "http uri", cnf: "confirmation", auth_time: "authentication time" };
      function o_(e10, t10) {
        for (let r10 of e10) if (void 0 === t10.claims[r10]) throw sR(`JWT "${r10}" (${ov[r10]}) claim missing`, oI, { claims: t10.claims });
        return t10;
      }
      let oS = Symbol(), oE = Symbol();
      async function ox(e10, t10, r10, i10) {
        return "string" == typeof i10?.expectedNonce || "number" == typeof i10?.maxAge || i10?.requireIdToken ? oT(e10, t10, r10, i10.expectedNonce, i10.maxAge, i10[sE], i10.recognizedTokenTypes) : oC(e10, t10, r10, i10?.[sE], i10?.recognizedTokenTypes);
      }
      async function oT(e10, t10, r10, i10, n10, a10, s10) {
        let o10 = [];
        switch (i10) {
          case void 0:
            i10 = oS;
            break;
          case oS:
            break;
          default:
            sj(i10, '"expectedNonce" argument'), o10.push("nonce");
        }
        switch (n10 ??= t10.default_max_age) {
          case void 0:
            n10 = oE;
            break;
          case oE:
            break;
          default:
            sU(n10, true, '"maxAge" argument'), o10.push("auth_time");
        }
        let l10 = await od(e10, t10, r10, o10, a10, s10);
        sj(l10.id_token, '"response" body "id_token" property', oI, { body: l10 });
        let c10 = ou(l10);
        if (n10 !== oE) {
          let e11 = sK() + sF(t10), r11 = sW(t10);
          if (c10.auth_time + n10 < e11 - r11) throw sR("too much time has elapsed since the last End-User authentication", oj, { claims: c10, now: e11, tolerance: r11, claim: "auth_time" });
        }
        if (i10 === oS) {
          if (void 0 !== c10.nonce) throw sR('unexpected ID Token "nonce" claim value', oM, { expected: void 0, claims: c10, claim: "nonce" });
        } else if (c10.nonce !== i10) throw sR('unexpected ID Token "nonce" claim value', oM, { expected: i10, claims: c10, claim: "nonce" });
        return l10;
      }
      async function oC(e10, t10, r10, i10, n10) {
        let a10 = await od(e10, t10, r10, void 0, i10, n10), s10 = ou(a10);
        if (s10) {
          if (void 0 !== t10.default_max_age) {
            sU(t10.default_max_age, true, '"client.default_max_age"');
            let e11 = sK() + sF(t10), r11 = sW(t10);
            if (s10.auth_time + t10.default_max_age < e11 - r11) throw sR("too much time has elapsed since the last End-User authentication", oj, { claims: s10, now: e11, tolerance: r11, claim: "auth_time" });
          }
          if (void 0 !== s10.nonce) throw sR('unexpected ID Token "nonce" claim value', oM, { expected: void 0, claims: s10, claim: "nonce" });
        }
        return a10;
      }
      let oA = "OAUTH_WWW_AUTHENTICATE_CHALLENGE", oP = "OAUTH_RESPONSE_BODY_ERROR", ok = "OAUTH_UNSUPPORTED_OPERATION", oR = "OAUTH_AUTHORIZATION_RESPONSE_ERROR", oO = "OAUTH_JWT_USERINFO_EXPECTED", oN = "OAUTH_PARSE_ERROR", oI = "OAUTH_INVALID_RESPONSE", o$ = "OAUTH_RESPONSE_IS_NOT_JSON", oD = "OAUTH_RESPONSE_IS_NOT_CONFORM", oL = "OAUTH_HTTP_REQUEST_FORBIDDEN", oU = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN", oj = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED", oM = "OAUTH_JWT_CLAIM_COMPARISON_FAILED", oB = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED", oH = "OAUTH_MISSING_SERVER_METADATA", oq = "OAUTH_INVALID_SERVER_METADATA";
      function oF(e10) {
        if (e10.bodyUsed) throw sy('"response" body has been used already', sm);
      }
      function oW(e10) {
        let { algorithm: t10 } = e10;
        if ("number" != typeof t10.modulusLength || t10.modulusLength < 2048) throw new sP(`unsupported ${t10.name} modulusLength`, { cause: e10 });
      }
      async function oK(e10, t10, r10, i10, n10) {
        let a10, s10, { 0: o10, 1: l10, length: c10 } = e10.split(".");
        if (5 === c10) if (void 0 !== n10) e10 = await n10(e10), { 0: o10, 1: l10, length: c10 } = e10.split(".");
        else throw new sP("JWE decryption is not configured", { cause: e10 });
        if (3 !== c10) throw sR("Invalid JWT", oI, e10);
        try {
          a10 = JSON.parse(sC(sA(o10)));
        } catch (e11) {
          throw sR("failed to parse JWT Header body as base64url encoded JSON", oN, e11);
        }
        if (!sO(a10)) throw sR("JWT Header must be a top level object", oI, e10);
        if (t10(a10), void 0 !== a10.crit) throw new sP('no JWT "crit" header parameter extensions are supported', { cause: { header: a10 } });
        try {
          s10 = JSON.parse(sC(sA(l10)));
        } catch (e11) {
          throw sR("failed to parse JWT Payload body as base64url encoded JSON", oN, e11);
        }
        if (!sO(s10)) throw sR("JWT Payload must be a top level object", oI, e10);
        let u10 = sK() + r10;
        if (void 0 !== s10.exp) {
          if ("number" != typeof s10.exp) throw sR('unexpected JWT "exp" (expiration time) claim type', oI, { claims: s10 });
          if (s10.exp <= u10 - i10) throw sR('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', oj, { claims: s10, now: u10, tolerance: i10, claim: "exp" });
        }
        if (void 0 !== s10.iat && "number" != typeof s10.iat) throw sR('unexpected JWT "iat" (issued at) claim type', oI, { claims: s10 });
        if (void 0 !== s10.iss && "string" != typeof s10.iss) throw sR('unexpected JWT "iss" (issuer) claim type', oI, { claims: s10 });
        if (void 0 !== s10.nbf) {
          if ("number" != typeof s10.nbf) throw sR('unexpected JWT "nbf" (not before) claim type', oI, { claims: s10 });
          if (s10.nbf > u10 + i10) throw sR('unexpected JWT "nbf" (not before) claim value', oj, { claims: s10, now: u10, tolerance: i10, claim: "nbf" });
        }
        if (void 0 !== s10.aud && "string" != typeof s10.aud && !Array.isArray(s10.aud)) throw sR('unexpected JWT "aud" (audience) claim type', oI, { claims: s10 });
        return { header: a10, claims: s10, jwt: e10 };
      }
      function oV(e10, t10, r10, i10) {
        if (void 0 !== e10) {
          if ("string" == typeof e10 ? i10.alg !== e10 : !e10.includes(i10.alg)) throw sR('unexpected JWT "alg" header parameter', oI, { header: i10, expected: e10, reason: "client configuration" });
          return;
        }
        if (Array.isArray(t10)) {
          if (!t10.includes(i10.alg)) throw sR('unexpected JWT "alg" header parameter', oI, { header: i10, expected: t10, reason: "authorization server metadata" });
          return;
        }
        if (void 0 !== r10) {
          if ("string" == typeof r10 ? i10.alg !== r10 : "function" == typeof r10 ? !r10(i10.alg) : !r10.includes(i10.alg)) throw sR('unexpected JWT "alg" header parameter', oI, { header: i10, expected: r10, reason: "default value" });
          return;
        }
        throw sR('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: e10, issuer: t10, fallback: r10 });
      }
      function oz(e10, t10) {
        let { 0: r10, length: i10 } = e10.getAll(t10);
        if (i10 > 1) throw sR(`"${t10}" parameter must be provided only once`, oI);
        return r10;
      }
      let oQ = Symbol(), oJ = Symbol();
      async function oG(e10, t10 = sB) {
        let r10;
        try {
          r10 = await e10.json();
        } catch (r11) {
          throw t10(e10), sR('failed to parse "response" body as JSON', oN, r11);
        }
        if (!sO(r10)) throw sR('"response" body must be a top level object', oI, { body: r10 });
        return r10;
      }
      let oX = Symbol(), oY = Symbol();
      async function oZ(e10, t10, r10) {
        let { cookies: i10, logger: n10 } = r10, a10 = i10[e10], s10 = /* @__PURE__ */ new Date();
        s10.setTime(s10.getTime() + 9e5), n10.debug(`CREATE_${e10.toUpperCase()}`, { name: a10.name, payload: t10, COOKIE_TTL: 900, expires: s10 });
        let o10 = await nR({ ...r10.jwt, maxAge: 900, token: { value: t10 }, salt: a10.name }), l10 = { ...a10.options, expires: s10 };
        return { name: a10.name, value: o10, options: l10 };
      }
      async function o0(e10, t10, r10) {
        try {
          let { logger: i10, cookies: n10, jwt: a10 } = r10;
          if (i10.debug(`PARSE_${e10.toUpperCase()}`, { cookie: t10 }), !t10) throw new rl(`${e10} cookie was missing`);
          let s10 = await nO({ ...a10, token: t10, salt: n10[e10].name });
          if (s10?.value) return s10.value;
          throw Error("Invalid cookie");
        } catch (t11) {
          throw new rl(`${e10} value could not be parsed`, { cause: t11 });
        }
      }
      function o1(e10, t10, r10) {
        let { logger: i10, cookies: n10 } = t10, a10 = n10[e10];
        i10.debug(`CLEAR_${e10.toUpperCase()}`, { cookie: a10 }), r10.push({ name: a10.name, value: "", options: { ...n10[e10].options, maxAge: 0 } });
      }
      function o2(e10, t10) {
        return async function(r10, i10, n10) {
          let { provider: a10, logger: s10 } = n10;
          if (!a10?.checks?.includes(e10)) return;
          let o10 = r10?.[n10.cookies[t10].name];
          s10.debug(`USE_${t10.toUpperCase()}`, { value: o10 });
          let l10 = await o0(t10, o10, n10);
          return o1(t10, n10, i10), l10;
        };
      }
      let o3 = { async create(e10) {
        let t10 = sH(), r10 = await sq(t10);
        return { cookie: await oZ("pkceCodeVerifier", t10, e10), value: r10 };
      }, use: o2("pkce", "pkceCodeVerifier") }, o4 = "encodedState", o5 = { async create(e10, t10) {
        let { provider: r10 } = e10;
        if (!r10.checks.includes("state")) {
          if (t10) throw new rl("State data was provided but the provider is not configured to use state");
          return;
        }
        let i10 = { origin: t10, random: sH() }, n10 = await nR({ secret: e10.jwt.secret, token: i10, salt: o4, maxAge: 900 });
        return { cookie: await oZ("state", n10, e10), value: n10 };
      }, use: o2("state", "state"), async decode(e10, t10) {
        try {
          t10.logger.debug("DECODE_STATE", { state: e10 });
          let r10 = await nO({ secret: t10.jwt.secret, token: e10, salt: o4 });
          if (r10) return r10;
          throw Error("Invalid state");
        } catch (e11) {
          throw new rl("State could not be decoded", { cause: e11 });
        }
      } }, o6 = { async create(e10) {
        if (!e10.provider.checks.includes("nonce")) return;
        let t10 = sH();
        return { cookie: await oZ("nonce", t10, e10), value: t10 };
      }, use: o2("nonce", "nonce") }, o8 = "encodedWebauthnChallenge", o9 = { create: async (e10, t10, r10) => ({ cookie: await oZ("webauthnChallenge", await nR({ secret: e10.jwt.secret, token: { challenge: t10, registerData: r10 }, salt: o8, maxAge: 900 }), e10) }), async use(e10, t10, r10) {
        let i10 = t10?.[e10.cookies.webauthnChallenge.name], n10 = await o0("webauthnChallenge", i10, e10), a10 = await nO({ secret: e10.jwt.secret, token: n10, salt: o8 });
        if (o1("webauthnChallenge", e10, r10), !a10) throw new rl("WebAuthn challenge was missing");
        return a10;
      } };
      function o7(e10) {
        return encodeURIComponent(e10).replace(/%20/g, "+");
      }
      async function le(e10, t10, r10) {
        var i10, n10;
        let a10, s10, o10, l10, c10, { logger: u10, provider: d10 } = r10, { token: h10, userinfo: p10 } = d10;
        if (h10?.url && "authjs.dev" !== h10.url.host || p10?.url && "authjs.dev" !== p10.url.host) a10 = { issuer: d10.issuer ?? "https://authjs.dev", token_endpoint: h10?.url.toString(), userinfo_endpoint: p10?.url.toString() };
        else {
          let e11 = new URL(d10.issuer), t11 = await sL(e11, { [sb]: true, [s_]: d10[nY] });
          if (!(a10 = await sM(e11, t11)).token_endpoint) throw TypeError("TODO: Authorization server did not provide a token endpoint.");
          if (!a10.userinfo_endpoint) throw TypeError("TODO: Authorization server did not provide a userinfo endpoint.");
        }
        let f2 = { client_id: d10.clientId, ...d10.client };
        switch (f2.token_endpoint_auth_method) {
          case void 0:
          case "client_secret_basic":
            s10 = (e11, t11, r11, i11) => {
              var n11, a11;
              let s11, o11, l11;
              i11.set("authorization", (n11 = d10.clientId, a11 = d10.clientSecret, s11 = o7(n11), o11 = o7(a11), l11 = btoa(`${s11}:${o11}`), `Basic ${l11}`));
            };
            break;
          case "client_secret_post":
            sj(i10 = d10.clientSecret, '"clientSecret"'), s10 = (e11, t11, r11, n11) => {
              r11.set("client_id", t11.client_id), r11.set("client_secret", i10);
            };
            break;
          case "client_secret_jwt":
            sj(n10 = d10.clientSecret, '"clientSecret"'), c10 = void 0, s10 = async (e11, t11, r11, i11) => {
              l10 ||= await crypto.subtle.importKey("raw", sC(n10), { hash: "SHA-256", name: "HMAC" }, false, ["sign"]);
              let a11 = { alg: "HS256" }, s11 = sQ(e11, t11);
              c10?.(a11, s11);
              let o11 = `${sA(sC(JSON.stringify(a11)))}.${sA(sC(JSON.stringify(s11)))}`, u11 = await crypto.subtle.sign(l10.algorithm, l10, sC(o11));
              r11.set("client_id", t11.client_id), r11.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), r11.set("client_assertion", `${o11}.${sA(new Uint8Array(u11))}`);
            };
            break;
          case "private_key_jwt":
            s10 = function(e11, t11) {
              let { key: r11, kid: i11 } = e11 instanceof CryptoKey ? { key: e11 } : e11?.key instanceof CryptoKey ? (void 0 !== e11.kid && sj(e11.kid, '"kid"'), { key: e11.key, kid: e11.kid }) : {};
              var n11 = '"clientPrivateKey.key"';
              if (!(r11 instanceof CryptoKey)) throw sy(`${n11} must be a CryptoKey`, sg);
              if ("private" !== r11.type) throw sy(`${n11} must be a private CryptoKey`, sm);
              return async (e12, n12, a11, s11) => {
                let o11 = { alg: function(e13) {
                  switch (e13.algorithm.name) {
                    case "RSA-PSS":
                      switch (e13.algorithm.hash.name) {
                        case "SHA-256":
                          return "PS256";
                        case "SHA-384":
                          return "PS384";
                        case "SHA-512":
                          return "PS512";
                        default:
                          throw new sP("unsupported RsaHashedKeyAlgorithm hash name", { cause: e13 });
                      }
                    case "RSASSA-PKCS1-v1_5":
                      switch (e13.algorithm.hash.name) {
                        case "SHA-256":
                          return "RS256";
                        case "SHA-384":
                          return "RS384";
                        case "SHA-512":
                          return "RS512";
                        default:
                          throw new sP("unsupported RsaHashedKeyAlgorithm hash name", { cause: e13 });
                      }
                    case "ECDSA":
                      switch (e13.algorithm.namedCurve) {
                        case "P-256":
                          return "ES256";
                        case "P-384":
                          return "ES384";
                        case "P-521":
                          return "ES512";
                        default:
                          throw new sP("unsupported EcKeyAlgorithm namedCurve", { cause: e13 });
                      }
                    case "Ed25519":
                    case "ML-DSA-44":
                    case "ML-DSA-65":
                    case "ML-DSA-87":
                      return e13.algorithm.name;
                    case "EdDSA":
                      return "Ed25519";
                    default:
                      throw new sP("unsupported CryptoKey algorithm name", { cause: e13 });
                  }
                }(r11), kid: i11 }, l11 = sQ(e12, n12);
                t11?.[sS]?.(o11, l11), a11.set("client_id", n12.client_id), a11.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), a11.set("client_assertion", await sJ(o11, l11, r11));
              };
            }(d10.token.clientPrivateKey, { [sS](e11, t11) {
              t11.aud = [a10.issuer, a10.token_endpoint];
            } });
            break;
          case "none":
            s10 = (e11, t11, r11, i11) => {
              r11.set("client_id", t11.client_id);
            };
            break;
          default:
            throw Error("unsupported client authentication method");
        }
        let m2 = [], g2 = await o5.use(t10, m2, r10);
        try {
          o10 = function(e11, t11, r11, i11) {
            var n11;
            if (sV(e11), sz(t11), r11 instanceof URL && (r11 = r11.searchParams), !(r11 instanceof URLSearchParams)) throw sy('"parameters" must be an instance of URLSearchParams, or URL', sg);
            if (oz(r11, "response")) throw sR('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', oI, { parameters: r11 });
            let a11 = oz(r11, "iss"), s11 = oz(r11, "state");
            if (!a11 && e11.authorization_response_iss_parameter_supported) throw sR('response parameter "iss" (issuer) missing', oI, { parameters: r11 });
            if (a11 && a11 !== e11.issuer) throw sR('unexpected "iss" (issuer) response parameter value', oI, { expected: e11.issuer, parameters: r11 });
            switch (i11) {
              case void 0:
              case oJ:
                if (void 0 !== s11) throw sR('unexpected "state" response parameter encountered', oI, { expected: void 0, parameters: r11 });
                break;
              case oQ:
                break;
              default:
                if (sj(i11, '"expectedState" argument'), s11 !== i11) throw sR(void 0 === s11 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', oI, { expected: i11, parameters: r11 });
            }
            if (oz(r11, "error")) throw new s1("authorization response from the server is an error", { cause: r11 });
            let o11 = oz(r11, "id_token"), l11 = oz(r11, "token");
            if (void 0 !== o11 || void 0 !== l11) throw new sP("implicit and hybrid flows are not supported");
            return n11 = new URLSearchParams(r11), oy.add(n11), n11;
          }(a10, f2, new URLSearchParams(e10), d10.checks.includes("state") ? g2 : oQ);
        } catch (e11) {
          if (e11 instanceof s1) {
            let t11 = { providerId: d10.id, ...Object.fromEntries(e11.cause.entries()) };
            throw u10.debug("OAuthCallbackError", t11), new rm("OAuth Provider returned an error", t11);
          }
          throw e11;
        }
        let y2 = await o3.use(t10, m2, r10), b2 = d10.callbackUrl;
        !r10.isOnRedirectProxy && d10.redirectProxyUrl && (b2 = d10.redirectProxyUrl);
        let w2 = await ow(a10, f2, s10, o10, b2, y2 ?? "decoy", { [sb]: true, [s_]: (...e11) => (d10.checks.includes("pkce") || e11[1].body.delete("code_verifier"), (d10[nY] ?? fetch)(...e11)) });
        d10.token?.conform && (w2 = await d10.token.conform(w2.clone()) ?? w2);
        let v2 = {}, _2 = "oidc" === d10.type;
        if (d10[nZ]) switch (d10.id) {
          case "microsoft-entra-id":
          case "azure-ad": {
            let e11 = await w2.clone().json();
            if (e11.error) {
              let t12 = { providerId: d10.id, ...e11 };
              throw new rm(`OAuth Provider returned an error: ${e11.error}`, t12);
            }
            let { tid: t11 } = function(e12) {
              let t12, r11;
              if ("string" != typeof e12) throw new ii("JWTs must use Compact JWS serialization, JWT must be a string");
              let { 1: i11, length: n11 } = e12.split(".");
              if (5 === n11) throw new ii("Only JWTs using Compact JWS serialization can be decoded");
              if (3 !== n11) throw new ii("Invalid JWT");
              if (!i11) throw new ii("JWTs must contain a payload");
              try {
                t12 = rJ(i11);
              } catch {
                throw new ii("Failed to base64url decode the payload");
              }
              try {
                r11 = JSON.parse(rF.decode(t12));
              } catch {
                throw new ii("Failed to parse the decoded payload as JSON");
              }
              if (!iq(r11)) throw new ii("Invalid JWT Claims Set");
              return r11;
            }(e11.id_token);
            if ("string" == typeof t11) {
              let e12 = a10.issuer?.match(/microsoftonline\.com\/(\w+)\/v2\.0/)?.[1] ?? "common", r11 = new URL(a10.issuer.replace(e12, t11)), i11 = await sL(r11, { [s_]: d10[nY] });
              a10 = await sM(r11, i11);
            }
          }
        }
        let S2 = await ox(a10, f2, w2, { expectedNonce: await o6.use(t10, m2, r10), requireIdToken: _2 });
        if (_2) {
          let t11 = ou(S2);
          if (v2 = t11, d10[nZ] && "apple" === d10.id) try {
            v2.user = JSON.parse(e10?.user);
          } catch {
          }
          if (false === d10.idToken) {
            let e11 = await or(a10, f2, S2.access_token, { [s_]: d10[nY], [sb]: true });
            v2 = await oa(a10, f2, t11.sub, e11);
          }
        } else if (p10?.request) {
          let e11 = await p10.request({ tokens: S2, provider: d10 });
          e11 instanceof Object && (v2 = e11);
        } else if (p10?.url) {
          let e11 = await or(a10, f2, S2.access_token, { [s_]: d10[nY], [sb]: true });
          v2 = await e11.json();
        } else throw TypeError("No userinfo endpoint configured");
        return S2.expires_in && (S2.expires_at = Math.floor(Date.now() / 1e3) + Number(S2.expires_in)), { ...await lt(v2, d10, S2, u10), profile: v2, cookies: m2 };
      }
      async function lt(e10, t10, r10, i10) {
        try {
          let i11 = await t10.profile(e10, r10);
          return { user: { ...i11, id: crypto.randomUUID(), email: i11.email?.toLowerCase() }, account: { ...r10, provider: t10.id, type: t10.type, providerAccountId: i11.id ?? crypto.randomUUID() } };
        } catch (r11) {
          i10.debug("getProfile error details", e10), i10.error(new rg(r11, { provider: t10.id }));
        }
      }
      async function lr(e10, t10, r10, i10) {
        let n10 = await lo(e10, t10, r10), { cookie: a10 } = await o9.create(e10, n10.challenge, r10);
        return { status: 200, cookies: [...i10 ?? [], a10], body: { action: "register", options: n10 }, headers: { "Content-Type": "application/json" } };
      }
      async function li(e10, t10, r10, i10) {
        let n10 = await ls(e10, t10, r10), { cookie: a10 } = await o9.create(e10, n10.challenge);
        return { status: 200, cookies: [...i10 ?? [], a10], body: { action: "authenticate", options: n10 }, headers: { "Content-Type": "application/json" } };
      }
      async function ln(e10, t10, r10) {
        let i10, { adapter: n10, provider: a10 } = e10, s10 = t10.body && "string" == typeof t10.body.data ? JSON.parse(t10.body.data) : void 0;
        if (!s10 || "object" != typeof s10 || !("id" in s10) || "string" != typeof s10.id) throw new t9("Invalid WebAuthn Authentication response");
        let o10 = lu(lc(s10.id)), l10 = await n10.getAuthenticator(o10);
        if (!l10) throw new t9(`WebAuthn authenticator not found in database: ${JSON.stringify({ credentialID: o10 })}`);
        let { challenge: c10 } = await o9.use(e10, t10.cookies, r10);
        try {
          var u10;
          let r11 = a10.getRelayingParty(e10, t10);
          i10 = await a10.simpleWebAuthn.verifyAuthenticationResponse({ ...a10.verifyAuthenticationOptions, expectedChallenge: c10, response: s10, authenticator: { ...u10 = l10, credentialDeviceType: u10.credentialDeviceType, transports: ld(u10.transports), credentialID: lc(u10.credentialID), credentialPublicKey: lc(u10.credentialPublicKey) }, expectedOrigin: r11.origin, expectedRPID: r11.id });
        } catch (e11) {
          throw new rP(e11);
        }
        let { verified: d10, authenticationInfo: h10 } = i10;
        if (!d10) throw new rP("WebAuthn authentication response could not be verified");
        try {
          let { newCounter: e11 } = h10;
          await n10.updateAuthenticatorCounter(l10.credentialID, e11);
        } catch (e11) {
          throw new re(`Failed to update authenticator counter. This may cause future authentication attempts to fail. ${JSON.stringify({ credentialID: o10, oldCounter: l10.counter, newCounter: h10.newCounter })}`, e11);
        }
        let p10 = await n10.getAccount(l10.providerAccountId, a10.id);
        if (!p10) throw new t9(`WebAuthn account not found in database: ${JSON.stringify({ credentialID: o10, providerAccountId: l10.providerAccountId })}`);
        let f2 = await n10.getUser(p10.userId);
        if (!f2) throw new t9(`WebAuthn user not found in database: ${JSON.stringify({ credentialID: o10, providerAccountId: l10.providerAccountId, userID: p10.userId })}`);
        return { account: p10, user: f2 };
      }
      async function la(e10, t10, r10) {
        var i10;
        let n10, { provider: a10 } = e10, s10 = t10.body && "string" == typeof t10.body.data ? JSON.parse(t10.body.data) : void 0;
        if (!s10 || "object" != typeof s10 || !("id" in s10) || "string" != typeof s10.id) throw new t9("Invalid WebAuthn Registration response");
        let { challenge: o10, registerData: l10 } = await o9.use(e10, t10.cookies, r10);
        if (!l10) throw new t9("Missing user registration data in WebAuthn challenge cookie");
        try {
          let r11 = a10.getRelayingParty(e10, t10);
          n10 = await a10.simpleWebAuthn.verifyRegistrationResponse({ ...a10.verifyRegistrationOptions, expectedChallenge: o10, response: s10, expectedOrigin: r11.origin, expectedRPID: r11.id });
        } catch (e11) {
          throw new rP(e11);
        }
        if (!n10.verified || !n10.registrationInfo) throw new rP("WebAuthn registration response could not be verified");
        let c10 = { providerAccountId: lu(n10.registrationInfo.credentialID), provider: e10.provider.id, type: a10.type }, u10 = { providerAccountId: c10.providerAccountId, counter: n10.registrationInfo.counter, credentialID: lu(n10.registrationInfo.credentialID), credentialPublicKey: lu(n10.registrationInfo.credentialPublicKey), credentialBackedUp: n10.registrationInfo.credentialBackedUp, credentialDeviceType: n10.registrationInfo.credentialDeviceType, transports: (i10 = s10.response.transports, i10?.join(",")) };
        return { user: l10, account: c10, authenticator: u10 };
      }
      async function ls(e10, t10, r10) {
        let { provider: i10, adapter: n10 } = e10, a10 = r10 && r10.id ? await n10.listAuthenticatorsByUserId(r10.id) : null, s10 = i10.getRelayingParty(e10, t10);
        return await i10.simpleWebAuthn.generateAuthenticationOptions({ ...i10.authenticationOptions, rpID: s10.id, allowCredentials: a10?.map((e11) => ({ id: lc(e11.credentialID), type: "public-key", transports: ld(e11.transports) })) });
      }
      async function lo(e10, t10, r10) {
        let { provider: i10, adapter: n10 } = e10, a10 = r10.id ? await n10.listAuthenticatorsByUserId(r10.id) : null, s10 = nK(32), o10 = i10.getRelayingParty(e10, t10);
        return await i10.simpleWebAuthn.generateRegistrationOptions({ ...i10.registrationOptions, userID: s10, userName: r10.email, userDisplayName: r10.name ?? void 0, rpID: o10.id, rpName: o10.name, excludeCredentials: a10?.map((e11) => ({ id: lc(e11.credentialID), type: "public-key", transports: ld(e11.transports) })) });
      }
      function ll(e10) {
        let { provider: t10, adapter: r10 } = e10;
        if (!r10) throw new ru("An adapter is required for the WebAuthn provider");
        if (!t10 || "webauthn" !== t10.type) throw new r_("Provider must be WebAuthn");
        return { ...e10, provider: t10, adapter: r10 };
      }
      function lc(e10) {
        return new Uint8Array(eY.Buffer.from(e10, "base64"));
      }
      function lu(e10) {
        return eY.Buffer.from(e10).toString("base64");
      }
      function ld(e10) {
        return e10 ? e10.split(",") : void 0;
      }
      async function lh(e10, t10, r10, i10) {
        if (!t10.provider) throw new r_("Callback route called without provider");
        let { query: n10, body: a10, method: s10, headers: o10 } = e10, { provider: l10, adapter: c10, url: u10, callbackUrl: d10, pages: h10, jwt: p10, events: f2, callbacks: m2, session: { strategy: g2, maxAge: y2 }, logger: b2 } = t10, w2 = "jwt" === g2;
        try {
          if ("oauth" === l10.type || "oidc" === l10.type) {
            let s11, o11 = l10.authorization?.url.searchParams.get("response_mode") === "form_post" ? a10 : n10;
            if (t10.isOnRedirectProxy && o11?.state) {
              let e11 = await o5.decode(o11.state, t10);
              if (e11?.origin && new URL(e11.origin).origin !== t10.url.origin) {
                let t11 = `${e11.origin}?${new URLSearchParams(o11)}`;
                return b2.debug("Proxy redirecting to", t11), { redirect: t11, cookies: i10 };
              }
            }
            let g3 = await le(o11, e10.cookies, t10);
            g3.cookies.length && i10.push(...g3.cookies), b2.debug("authorization result", g3);
            let { user: v2, account: _2, profile: S2 } = g3;
            if (!v2 || !_2 || !S2) return { redirect: `${u10}/signin`, cookies: i10 };
            if (c10) {
              let { getUserByAccount: e11 } = c10;
              s11 = await e11({ providerAccountId: _2.providerAccountId, provider: l10.id });
            }
            let E2 = await lp({ user: s11 ?? v2, account: _2, profile: S2 }, t10);
            if (E2) return { redirect: E2, cookies: i10 };
            let { user: x2, session: T2, isNewUser: C2 } = await sp(r10.value, v2, _2, t10);
            if (w2) {
              let e11 = { name: x2.name, email: x2.email, picture: x2.image, sub: x2.id?.toString() }, n11 = await m2.jwt({ token: e11, user: x2, account: _2, profile: S2, isNewUser: C2, trigger: C2 ? "signUp" : "signIn" });
              if (null === n11) i10.push(...r10.clean());
              else {
                let e12 = t10.cookies.sessionToken.name, a11 = await p10.encode({ ...p10, token: n11, salt: e12 }), s12 = /* @__PURE__ */ new Date();
                s12.setTime(s12.getTime() + 1e3 * y2);
                let o12 = r10.chunk(a11, { expires: s12 });
                i10.push(...o12);
              }
            } else i10.push({ name: t10.cookies.sessionToken.name, value: T2.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: T2.expires } });
            if (await f2.signIn?.({ user: x2, account: _2, profile: S2, isNewUser: C2 }), C2 && h10.newUser) return { redirect: `${h10.newUser}${h10.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d10 })}`, cookies: i10 };
            return { redirect: d10, cookies: i10 };
          }
          if ("email" === l10.type) {
            let e11 = n10?.token, a11 = n10?.email;
            if (!e11) {
              let t11 = TypeError("Missing token. The sign-in URL was manually opened without token or the link was not sent correctly in the email.", { cause: { hasToken: !!e11 } });
              throw t11.name = "Configuration", t11;
            }
            let s11 = l10.secret ?? t10.secret, o11 = await c10.useVerificationToken({ identifier: a11, token: await nW(`${e11}${s11}`) }), u11 = !!o11, g3 = u11 && o11.expires.valueOf() < Date.now();
            if (!u11 || g3 || a11 && o11.identifier !== a11) throw new rE({ hasInvite: u11, expired: g3 });
            let { identifier: b3 } = o11, v2 = await c10.getUserByEmail(b3) ?? { id: crypto.randomUUID(), email: b3, emailVerified: null }, _2 = { providerAccountId: v2.email, userId: v2.id, type: "email", provider: l10.id }, S2 = await lp({ user: v2, account: _2 }, t10);
            if (S2) return { redirect: S2, cookies: i10 };
            let { user: E2, session: x2, isNewUser: T2 } = await sp(r10.value, v2, _2, t10);
            if (w2) {
              let e12 = { name: E2.name, email: E2.email, picture: E2.image, sub: E2.id?.toString() }, n11 = await m2.jwt({ token: e12, user: E2, account: _2, isNewUser: T2, trigger: T2 ? "signUp" : "signIn" });
              if (null === n11) i10.push(...r10.clean());
              else {
                let e13 = t10.cookies.sessionToken.name, a12 = await p10.encode({ ...p10, token: n11, salt: e13 }), s12 = /* @__PURE__ */ new Date();
                s12.setTime(s12.getTime() + 1e3 * y2);
                let o12 = r10.chunk(a12, { expires: s12 });
                i10.push(...o12);
              }
            } else i10.push({ name: t10.cookies.sessionToken.name, value: x2.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: x2.expires } });
            if (await f2.signIn?.({ user: E2, account: _2, isNewUser: T2 }), T2 && h10.newUser) return { redirect: `${h10.newUser}${h10.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d10 })}`, cookies: i10 };
            return { redirect: d10, cookies: i10 };
          }
          if ("credentials" === l10.type && "POST" === s10) {
            let e11 = a10 ?? {};
            Object.entries(n10 ?? {}).forEach(([e12, t11]) => u10.searchParams.set(e12, t11));
            let c11 = await l10.authorize(e11, new Request(u10, { headers: o10, method: s10, body: JSON.stringify(a10) }));
            if (c11) c11.id = c11.id?.toString() ?? crypto.randomUUID();
            else throw new rs();
            let h11 = { providerAccountId: c11.id, type: "credentials", provider: l10.id }, g3 = await lp({ user: c11, account: h11, credentials: e11 }, t10);
            if (g3) return { redirect: g3, cookies: i10 };
            let b3 = { name: c11.name, email: c11.email, picture: c11.image, sub: c11.id }, w3 = await m2.jwt({ token: b3, user: c11, account: h11, isNewUser: false, trigger: "signIn" });
            if (null === w3) i10.push(...r10.clean());
            else {
              let e12 = t10.cookies.sessionToken.name, n11 = await p10.encode({ ...p10, token: w3, salt: e12 }), a11 = /* @__PURE__ */ new Date();
              a11.setTime(a11.getTime() + 1e3 * y2);
              let s11 = r10.chunk(n11, { expires: a11 });
              i10.push(...s11);
            }
            return await f2.signIn?.({ user: c11, account: h11 }), { redirect: d10, cookies: i10 };
          } else if ("webauthn" === l10.type && "POST" === s10) {
            let n11, a11, s11, o11 = e10.body?.action;
            if ("string" != typeof o11 || "authenticate" !== o11 && "register" !== o11) throw new t9("Invalid action parameter");
            let l11 = ll(t10);
            switch (o11) {
              case "authenticate": {
                let t11 = await ln(l11, e10, i10);
                n11 = t11.user, a11 = t11.account;
                break;
              }
              case "register": {
                let r11 = await la(t10, e10, i10);
                n11 = r11.user, a11 = r11.account, s11 = r11.authenticator;
              }
            }
            await lp({ user: n11, account: a11 }, t10);
            let { user: c11, isNewUser: u11, session: g3, account: b3 } = await sp(r10.value, n11, a11, t10);
            if (!b3) throw new t9("Error creating or finding account");
            if (s11 && c11.id && await l11.adapter.createAuthenticator({ ...s11, userId: c11.id }), w2) {
              let e11 = { name: c11.name, email: c11.email, picture: c11.image, sub: c11.id?.toString() }, n12 = await m2.jwt({ token: e11, user: c11, account: b3, isNewUser: u11, trigger: u11 ? "signUp" : "signIn" });
              if (null === n12) i10.push(...r10.clean());
              else {
                let e12 = t10.cookies.sessionToken.name, a12 = await p10.encode({ ...p10, token: n12, salt: e12 }), s12 = /* @__PURE__ */ new Date();
                s12.setTime(s12.getTime() + 1e3 * y2);
                let o12 = r10.chunk(a12, { expires: s12 });
                i10.push(...o12);
              }
            } else i10.push({ name: t10.cookies.sessionToken.name, value: g3.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: g3.expires } });
            if (await f2.signIn?.({ user: c11, account: b3, isNewUser: u11 }), u11 && h10.newUser) return { redirect: `${h10.newUser}${h10.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d10 })}`, cookies: i10 };
            return { redirect: d10, cookies: i10 };
          }
          throw new r_(`Callback for provider type (${l10.type}) is not supported`);
        } catch (t11) {
          if (t11 instanceof t9) throw t11;
          let e11 = new rr(t11, { provider: l10.id });
          throw b2.debug("callback route error details", { method: s10, query: n10, body: a10 }), e11;
        }
      }
      async function lp(e10, t10) {
        let r10, { signIn: i10, redirect: n10 } = t10.callbacks;
        try {
          r10 = await i10(e10);
        } catch (e11) {
          if (e11 instanceof t9) throw e11;
          throw new rt(e11);
        }
        if (!r10) throw new rt("AccessDenied");
        if ("string" == typeof r10) return await n10({ url: r10, baseUrl: t10.url.origin });
      }
      async function lf(e10, t10, r10, i10, n10) {
        let { adapter: a10, jwt: s10, events: o10, callbacks: l10, logger: c10, session: { strategy: u10, maxAge: d10 } } = e10, h10 = { body: null, headers: { "Content-Type": "application/json", ...!i10 && { "Cache-Control": "private, no-cache, no-store", Expires: "0", Pragma: "no-cache" } }, cookies: r10 }, p10 = t10.value;
        if (!p10) return h10;
        if ("jwt" === u10) {
          try {
            let r11 = e10.cookies.sessionToken.name, a11 = await s10.decode({ ...s10, token: p10, salt: r11 });
            if (!a11) throw Error("Invalid JWT");
            let c11 = await l10.jwt({ token: a11, ...i10 && { trigger: "update" }, session: n10 }), u11 = sh(d10);
            if (null !== c11) {
              let e11 = { user: { name: c11.name, email: c11.email, image: c11.picture }, expires: u11.toISOString() }, i11 = await l10.session({ session: e11, token: c11 });
              h10.body = i11;
              let n11 = await s10.encode({ ...s10, token: c11, salt: r11 }), a12 = t10.chunk(n11, { expires: u11 });
              h10.cookies?.push(...a12), await o10.session?.({ session: i11, token: c11 });
            } else h10.cookies?.push(...t10.clean());
          } catch (e11) {
            c10.error(new rc(e11)), h10.cookies?.push(...t10.clean());
          }
          return h10;
        }
        try {
          let { getSessionAndUser: r11, deleteSession: s11, updateSession: c11 } = a10, u11 = await r11(p10);
          if (u11 && u11.session.expires.valueOf() < Date.now() && (await s11(p10), u11 = null), u11) {
            let { user: t11, session: r12 } = u11, a11 = e10.session.updateAge, s12 = r12.expires.valueOf() - 1e3 * d10 + 1e3 * a11, f2 = sh(d10);
            s12 <= Date.now() && await c11({ sessionToken: p10, expires: f2 });
            let m2 = await l10.session({ session: { ...r12, user: t11 }, user: t11, newSession: n10, ...i10 ? { trigger: "update" } : {} });
            h10.body = m2, h10.cookies?.push({ name: e10.cookies.sessionToken.name, value: p10, options: { ...e10.cookies.sessionToken.options, expires: f2 } }), await o10.session?.({ session: m2 });
          } else p10 && h10.cookies?.push(...t10.clean());
        } catch (e11) {
          c10.error(new ry(e11));
        }
        return h10;
      }
      async function lm(e10, t10) {
        let r10, i10, { logger: n10, provider: a10 } = t10, s10 = a10.authorization?.url;
        if (!s10 || "authjs.dev" === s10.host) {
          let e11 = new URL(a10.issuer), t11 = await sL(e11, { [s_]: a10[nY], [sb]: true }), r11 = await sM(e11, t11).catch((t12) => {
            if (!(t12 instanceof TypeError) || "Invalid URL" !== t12.message) throw t12;
            throw TypeError(`Discovery request responded with an invalid issuer. expected: ${e11}`);
          });
          if (!r11.authorization_endpoint) throw TypeError("Authorization server did not provide an authorization endpoint.");
          s10 = new URL(r11.authorization_endpoint);
        }
        let o10 = s10.searchParams, l10 = a10.callbackUrl;
        !t10.isOnRedirectProxy && a10.redirectProxyUrl && (l10 = a10.redirectProxyUrl, i10 = a10.callbackUrl, n10.debug("using redirect proxy", { redirect_uri: l10, data: i10 }));
        let c10 = Object.assign({ response_type: "code", client_id: a10.clientId, redirect_uri: l10, ...a10.authorization?.params }, Object.fromEntries(a10.authorization?.url.searchParams ?? []), e10);
        for (let e11 in c10) o10.set(e11, c10[e11]);
        let u10 = [];
        a10.authorization?.url.searchParams.get("response_mode") === "form_post" && (t10.cookies.state.options.sameSite = "none", t10.cookies.state.options.secure = true, t10.cookies.nonce.options.sameSite = "none", t10.cookies.nonce.options.secure = true);
        let d10 = await o5.create(t10, i10);
        if (d10 && (o10.set("state", d10.value), u10.push(d10.cookie)), a10.checks?.includes("pkce")) if (r10 && !r10.code_challenge_methods_supported?.includes("S256")) "oidc" === a10.type && (a10.checks = ["nonce"]);
        else {
          let { value: e11, cookie: r11 } = await o3.create(t10);
          o10.set("code_challenge", e11), o10.set("code_challenge_method", "S256"), u10.push(r11);
        }
        let h10 = await o6.create(t10);
        return h10 && (o10.set("nonce", h10.value), u10.push(h10.cookie)), "oidc" !== a10.type || s10.searchParams.has("scope") || s10.searchParams.set("scope", "openid profile email"), n10.debug("authorization url is ready", { url: s10, cookies: u10, provider: a10 }), { redirect: s10.toString(), cookies: u10 };
      }
      async function lg(e10, t10) {
        let r10, { body: i10 } = e10, { provider: n10, callbacks: a10, adapter: s10 } = t10, o10 = (n10.normalizeIdentifier ?? function(e11) {
          if (!e11) throw Error("Missing email from request body.");
          let t11 = e11.toLowerCase().trim();
          if (t11.includes('"')) throw Error("Invalid email address format.");
          let [r11, i11] = t11.split("@");
          if (!r11 || !i11 || 2 !== t11.split("@").length || !(i11 = i11.split(",")[0])) throw Error("Invalid email address format.");
          return `${r11}@${i11}`;
        })(i10?.email), l10 = { id: crypto.randomUUID(), email: o10, emailVerified: null }, c10 = await s10.getUserByEmail(o10) ?? l10, u10 = { providerAccountId: o10, userId: c10.id, type: "email", provider: n10.id };
        try {
          r10 = await a10.signIn({ user: c10, account: u10, email: { verificationRequest: true } });
        } catch (e11) {
          throw new rt(e11);
        }
        if (!r10) throw new rt("AccessDenied");
        if ("string" == typeof r10) return { redirect: await a10.redirect({ url: r10, baseUrl: t10.url.origin }) };
        let { callbackUrl: d10, theme: h10 } = t10, p10 = await n10.generateVerificationToken?.() ?? nK(32), f2 = new Date(Date.now() + (n10.maxAge ?? 86400) * 1e3), m2 = n10.secret ?? t10.secret, g2 = new URL(t10.basePath, t10.url.origin), y2 = n10.sendVerificationRequest({ identifier: o10, token: p10, expires: f2, url: `${g2}/callback/${n10.id}?${new URLSearchParams({ callbackUrl: d10, token: p10, email: o10 })}`, provider: n10, theme: h10, request: new Request(e10.url, { headers: e10.headers, method: e10.method, body: "POST" === e10.method ? JSON.stringify(e10.body ?? {}) : void 0 }) }), b2 = s10.createVerificationToken?.({ identifier: o10, token: await nW(`${p10}${m2}`), expires: f2 });
        return await Promise.all([y2, b2]), { redirect: `${g2}/verify-request?${new URLSearchParams({ provider: n10.id, type: n10.type })}` };
      }
      async function ly(e10, t10, r10) {
        let i10 = `${r10.url.origin}${r10.basePath}/signin`;
        if (!r10.provider) return { redirect: i10, cookies: t10 };
        switch (r10.provider.type) {
          case "oauth":
          case "oidc": {
            let { redirect: i11, cookies: n10 } = await lm(e10.query, r10);
            return n10 && t10.push(...n10), { redirect: i11, cookies: t10 };
          }
          case "email":
            return { ...await lg(e10, r10), cookies: t10 };
          default:
            return { redirect: i10, cookies: t10 };
        }
      }
      async function lb(e10, t10, r10) {
        let { jwt: i10, events: n10, callbackUrl: a10, logger: s10, session: o10 } = r10, l10 = t10.value;
        if (!l10) return { redirect: a10, cookies: e10 };
        try {
          if ("jwt" === o10.strategy) {
            let e11 = r10.cookies.sessionToken.name, t11 = await i10.decode({ ...i10, token: l10, salt: e11 });
            await n10.signOut?.({ token: t11 });
          } else {
            let e11 = await r10.adapter?.deleteSession(l10);
            await n10.signOut?.({ session: e11 });
          }
        } catch (e11) {
          s10.error(new rb(e11));
        }
        return e10.push(...t10.clean()), { redirect: a10, cookies: e10 };
      }
      async function lw(e10, t10) {
        let { adapter: r10, jwt: i10, session: { strategy: n10 } } = e10, a10 = t10.value;
        if (!a10) return null;
        if ("jwt" === n10) {
          let t11 = e10.cookies.sessionToken.name, r11 = await i10.decode({ ...i10, token: a10, salt: t11 });
          if (r11 && r11.sub) return { id: r11.sub, name: r11.name, email: r11.email, image: r11.picture };
        } else {
          let e11 = await r10?.getSessionAndUser(a10);
          if (e11) return e11.user;
        }
        return null;
      }
      async function lv(e10, t10, r10, i10) {
        let n10 = ll(t10), { provider: a10 } = n10, { action: s10 } = e10.query ?? {};
        if ("register" !== s10 && "authenticate" !== s10 && void 0 !== s10) return { status: 400, body: { error: "Invalid action" }, cookies: i10, headers: { "Content-Type": "application/json" } };
        let o10 = await lw(t10, r10), l10 = o10 ? { user: o10, exists: true } : await a10.getUserInfo(t10, e10), c10 = l10?.user;
        switch (function(e11, t11, r11) {
          let { user: i11, exists: n11 = false } = r11 ?? {};
          switch (e11) {
            case "authenticate":
              return "authenticate";
            case "register":
              if (i11 && t11 === n11) return "register";
              break;
            case void 0:
              if (!t11) if (!i11) return "authenticate";
              else if (n11) return "authenticate";
              else return "register";
          }
          return null;
        }(s10, !!o10, l10)) {
          case "authenticate":
            return li(n10, e10, c10, i10);
          case "register":
            if ("string" == typeof c10?.email) return lr(n10, e10, c10, i10);
            break;
          default:
            return { status: 400, body: { error: "Invalid request" }, cookies: i10, headers: { "Content-Type": "application/json" } };
        }
      }
      async function l_(e10, t10) {
        let { action: r10, providerId: i10, error: n10, method: a10 } = e10, s10 = t10.skipCSRFCheck === nG, { options: o10, cookies: l10 } = await n5({ authOptions: t10, action: r10, providerId: i10, url: e10.url, callbackUrl: e10.body?.callbackUrl ?? e10.query?.callbackUrl, csrfToken: e10.body?.csrfToken, cookies: e10.cookies, isPost: "POST" === a10, csrfDisabled: s10 }), c10 = new t8(o10.cookies.sessionToken, e10.cookies, o10.logger);
        if ("GET" === a10) {
          let t11 = sd({ ...o10, query: e10.query, cookies: l10 });
          switch (r10) {
            case "callback":
              return await lh(e10, o10, c10, l10);
            case "csrf":
              return t11.csrf(s10, o10, l10);
            case "error":
              return t11.error(n10);
            case "providers":
              return t11.providers(o10.providers);
            case "session":
              return await lf(o10, c10, l10);
            case "signin":
              return t11.signin(i10, n10);
            case "signout":
              return t11.signout();
            case "verify-request":
              return t11.verifyRequest();
            case "webauthn-options":
              return await lv(e10, o10, c10, l10);
          }
        } else {
          let { csrfTokenVerified: t11 } = o10;
          switch (r10) {
            case "callback":
              return "credentials" === o10.provider.type && nz(r10, t11), await lh(e10, o10, c10, l10);
            case "session":
              return nz(r10, t11), await lf(o10, c10, l10, true, e10.body?.data);
            case "signin":
              return nz(r10, t11), await ly(e10, l10, o10);
            case "signout":
              return nz(r10, t11), await lb(l10, c10, o10);
          }
        }
        throw new rw(`Cannot handle action: ${r10}`);
      }
      function lS(e10, t10, r10, i10, n10) {
        let a10, s10 = n10?.basePath, o10 = i10.AUTH_URL ?? i10.NEXTAUTH_URL;
        if (o10) a10 = new URL(o10), s10 && "/" !== s10 && "/" !== a10.pathname && (a10.pathname !== s10 && nU(n10).warn("env-url-basepath-mismatch"), a10.pathname = "/");
        else {
          let e11 = r10.get("x-forwarded-host") ?? r10.get("host"), i11 = r10.get("x-forwarded-proto") ?? t10 ?? "https", n11 = i11.endsWith(":") ? i11 : i11 + ":";
          a10 = new URL(`${n11}//${e11}`);
        }
        let l10 = a10.toString().replace(/\/$/, "");
        if (s10) {
          let t11 = s10?.replace(/(^\/|\/$)/g, "") ?? "";
          return new URL(`${l10}/${t11}/${e10}`);
        }
        return new URL(`${l10}/${e10}`);
      }
      async function lE(e10, t10) {
        let r10 = nU(t10), i10 = await nq(e10, t10);
        if (!i10) return Response.json("Bad request.", { status: 400 });
        let n10 = function(e11, t11) {
          let { url: r11 } = e11, i11 = [];
          if (!rO && t11.debug && i11.push("debug-enabled"), !t11.trustHost) return new rS(`Host must be trusted. URL was: ${e11.url}`);
          if (!t11.secret?.length) return new rp("Please define a `secret`");
          let n11 = e11.query?.callbackUrl;
          if (n11 && !rN(n11, r11.origin)) return new ra(`Invalid callback URL. Received: ${n11}`);
          let { callbackUrl: a11 } = t6(t11.useSecureCookies ?? "https:" === r11.protocol), s11 = e11.cookies?.[t11.cookies?.callbackUrl?.name ?? a11.name];
          if (s11 && !rN(s11, r11.origin)) return new ra(`Invalid callback URL. Received: ${s11}`);
          let o10 = false;
          for (let e12 of t11.providers) {
            let t12 = "function" == typeof e12 ? e12() : e12;
            if (("oauth" === t12.type || "oidc" === t12.type) && !(t12.issuer ?? t12.options?.issuer)) {
              let e13, { authorization: r12, token: i12, userinfo: n12 } = t12;
              if ("string" == typeof r12 || r12?.url ? "string" == typeof i12 || i12?.url ? "string" == typeof n12 || n12?.url || (e13 = "userinfo") : e13 = "token" : e13 = "authorization", e13) return new ro(`Provider "${t12.id}" is missing both \`issuer\` and \`${e13}\` endpoint config. At least one of them is required`);
            }
            if ("credentials" === t12.type) rI = true;
            else if ("email" === t12.type) r$ = true;
            else if ("webauthn" === t12.type) {
              var l10;
              if (rD = true, t12.simpleWebAuthnBrowserVersion && (l10 = t12.simpleWebAuthnBrowserVersion, !/^v\d+(?:\.\d+){0,2}$/.test(l10))) return new t9(`Invalid provider config for "${t12.id}": simpleWebAuthnBrowserVersion "${t12.simpleWebAuthnBrowserVersion}" must be a valid semver string.`);
              if (t12.enableConditionalUI) {
                if (o10) return new rC("Multiple webauthn providers have 'enableConditionalUI' set to True. Only one provider can have this option enabled at a time");
                if (o10 = true, !Object.values(t12.formFields).some((e13) => e13.autocomplete && e13.autocomplete.toString().indexOf("webauthn") > -1)) return new rA(`Provider "${t12.id}" has 'enableConditionalUI' set to True, but none of its formFields have 'webauthn' in their autocomplete param`);
              }
            }
          }
          if (rI) {
            let e12 = t11.session?.strategy === "database", r12 = !t11.providers.some((e13) => "credentials" !== ("function" == typeof e13 ? e13() : e13).type);
            if (e12 && r12) return new rv("Signing in with credentials only supported if JWT strategy is enabled");
            if (t11.providers.some((e13) => {
              let t12 = "function" == typeof e13 ? e13() : e13;
              return "credentials" === t12.type && !t12.authorize;
            })) return new rh("Must define an authorize() handler to use credentials authentication provider");
          }
          let { adapter: c10, session: u10 } = t11, d10 = [];
          if (r$ || u10?.strategy === "database" || !u10?.strategy && c10) if (r$) {
            if (!c10) return new ru("Email login requires an adapter");
            d10.push(...rL);
          } else {
            if (!c10) return new ru("Database session requires an adapter");
            d10.push(...rU);
          }
          if (rD) {
            if (!t11.experimental?.enableWebAuthn) return new rR("WebAuthn is an experimental feature. To enable it, set `experimental.enableWebAuthn` to `true` in your config");
            if (i11.push("experimental-webauthn"), !c10) return new ru("WebAuthn requires an adapter");
            d10.push(...rj);
          }
          if (c10) {
            let e12 = d10.filter((e13) => !(e13 in c10));
            if (e12.length) return new rd(`Required adapter methods were missing: ${e12.join(", ")}`);
          }
          return rO || (rO = true), i11;
        }(i10, t10);
        if (Array.isArray(n10)) n10.forEach(r10.warn);
        else if (n10) {
          if (r10.error(n10), !(/* @__PURE__ */ new Set(["signin", "signout", "error", "verify-request"])).has(i10.action) || "GET" !== i10.method) return Response.json({ message: "There was a problem with the server configuration. Check the server logs for more information." }, { status: 500 });
          let { pages: e11, theme: a11 } = t10, s11 = e11?.error && i10.url.searchParams.get("callbackUrl")?.startsWith(e11.error);
          if (!e11?.error || s11) return s11 && r10.error(new ri(`The error page ${e11?.error} should not require authentication`)), nF(sd({ theme: a11 }).error("Configuration"));
          let o10 = `${i10.url.origin}${e11.error}?error=Configuration`;
          return Response.redirect(o10);
        }
        let a10 = e10.headers?.has("X-Auth-Return-Redirect"), s10 = t10.raw === nX;
        try {
          let e11 = await l_(i10, t10);
          if (s10) return e11;
          let r11 = nF(e11), n11 = r11.headers.get("Location");
          if (!a10 || !n11) return r11;
          return Response.json({ url: n11 }, { headers: r11.headers });
        } catch (d10) {
          r10.error(d10);
          let n11 = d10 instanceof t9;
          if (n11 && s10 && !a10) throw d10;
          if ("POST" === e10.method && "session" === i10.action) return Response.json(null, { status: 400 });
          let o10 = new URLSearchParams({ error: d10 instanceof t9 && rT.has(d10.type) ? d10.type : "Configuration" });
          d10 instanceof rs && o10.set("code", d10.code);
          let l10 = n11 && d10.kind || "error", c10 = t10.pages?.[l10] ?? `${t10.basePath}/${l10.toLowerCase()}`, u10 = `${i10.url.origin}${c10}?${o10}`;
          if (a10) return Response.json({ url: u10 });
          return Response.redirect(u10);
        }
      }
      e.i(64445);
      var lx = e.i(63072);
      function lT() {
        let e10 = e8.getStore();
        return (null == e10 ? void 0 : e10.rootTaskSpawnPhase) === "action";
      }
      function lC(e10) {
        let t10 = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
        if (!t10) return e10;
        let { origin: r10 } = new URL(t10), { href: i10, origin: n10 } = e10.nextUrl;
        return new J(i10.replace(n10, r10), e10);
      }
      function lA(e10) {
        try {
          e10.secret ?? (e10.secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET);
          let t10 = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
          if (!t10) return;
          let { pathname: r10 } = new URL(t10);
          if ("/" === r10) return;
          e10.basePath || (e10.basePath = r10);
        } catch {
        } finally {
          e10.basePath || (e10.basePath = "/api/auth"), function(e11, t10, r10 = false) {
            try {
              let i10 = e11.AUTH_URL;
              i10 && (t10.basePath ? r10 || nU(t10).warn("env-url-basepath-redundant") : t10.basePath = new URL(i10).pathname);
            } catch {
            } finally {
              t10.basePath ?? (t10.basePath = "/auth");
            }
            if (!t10.secret?.length) {
              t10.secret = [];
              let r11 = e11.AUTH_SECRET;
              for (let i10 of (r11 && t10.secret.push(r11), [1, 2, 3])) {
                let r12 = e11[`AUTH_SECRET_${i10}`];
                r12 && t10.secret.unshift(r12);
              }
            }
            t10.redirectProxyUrl ?? (t10.redirectProxyUrl = e11.AUTH_REDIRECT_PROXY_URL), t10.trustHost ?? (t10.trustHost = !!(e11.AUTH_URL ?? e11.AUTH_TRUST_HOST ?? e11.VERCEL ?? e11.CF_PAGES ?? "production" !== e11.NODE_ENV)), t10.providers = t10.providers.map((t11) => {
              let { id: r11 } = "function" == typeof t11 ? t11({}) : t11, i10 = r11.toUpperCase().replace(/-/g, "_"), n10 = e11[`AUTH_${i10}_ID`], a10 = e11[`AUTH_${i10}_SECRET`], s10 = e11[`AUTH_${i10}_ISSUER`], o10 = e11[`AUTH_${i10}_KEY`], l10 = "function" == typeof t11 ? t11({ clientId: n10, clientSecret: a10, issuer: s10, apiKey: o10 }) : t11;
              return "oauth" === l10.type || "oidc" === l10.type ? (l10.clientId ?? (l10.clientId = n10), l10.clientSecret ?? (l10.clientSecret = a10), l10.issuer ?? (l10.issuer = s10)) : "email" === l10.type && (l10.apiKey ?? (l10.apiKey = o10)), l10;
            });
          }(process.env, e10, true);
        }
      }
      var ec = ec, eJ = eJ;
      class lP extends Error {
        constructor(...e10) {
          super(...e10), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
      var lk = e.i(51564), lR = e.i(40049);
      let lO = { current: null }, lN = "function" == typeof lR.cache ? lR.cache : (e10) => e10, lI = console.warn;
      function l$(e10) {
        return function(...t10) {
          lI(e10(...t10));
        };
      }
      function lD() {
        let e10 = "cookies", t10 = ec.workAsyncStorageInstance.getStore(), r10 = eJ.workUnitAsyncStorageInstance.getStore();
        if (t10) {
          if (r10 && "after" === r10.phase && !lT()) throw Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`cookies()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E843", enumerable: false, configurable: true });
          if (t10.forceStatic) return lU(ed.seal(new z.RequestCookies(new Headers({}))));
          if (t10.dynamicShouldError) throw Object.defineProperty(new lP(`Route ${t10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E849", enumerable: false, configurable: true });
          if (r10) switch (r10.type) {
            case "cache":
              let a10 = Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E831", enumerable: false, configurable: true });
              throw Error.captureStackTrace(a10, lD), t10.invalidDynamicUsageError ??= a10, a10;
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E846", enumerable: false, configurable: true });
            case "generate-static-params":
              throw Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E1123", enumerable: false, configurable: true });
            case "prerender":
              var i10 = t10, n10 = r10;
              let s10 = lL.get(n10);
              if (s10) return s10;
              let o10 = (0, lk.makeHangingPromise)(n10.renderSignal, i10.route, "`cookies()`");
              return lL.set(n10, o10), o10;
            case "prerender-client":
            case "validation-client":
              let l10 = "`cookies`";
              throw Object.defineProperty(new eX.InvariantError(`${l10} must not be used within a Client Component. Next.js should be preventing ${l10} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E1037", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, lx.postponeWithTracking)(t10.route, e10, r10.dynamicTracking);
            case "prerender-legacy":
              return (0, lx.throwToInterruptStaticGeneration)(e10, t10, r10);
            case "prerender-runtime":
              return (0, lk.delayUntilRuntimeStage)(r10, lU(r10.cookies));
            case "private-cache":
              return lU(r10.cookies);
            case "request":
              let c10;
              if ((0, lx.trackDynamicDataInDynamicRender)(r10), c10 = ef(r10) ? r10.userspaceMutableCookies : r10.cookies, !r10.asyncApiPromises) return lU(c10);
              {
                let e11 = (0, eQ.isInEarlyRenderStage)(r10);
                if (c10 === r10.mutableCookies) return e11 ? r10.asyncApiPromises.earlyMutableCookies : r10.asyncApiPromises.mutableCookies;
                return e11 ? r10.asyncApiPromises.earlyCookies : r10.asyncApiPromises.cookies;
              }
          }
        }
        (0, eQ.throwForMissingRequestStore)(e10);
      }
      lN((e10) => {
        try {
          lI(lO.current);
        } finally {
          lO.current = null;
        }
      }), e.i(38174);
      let lL = /* @__PURE__ */ new WeakMap();
      function lU(e10) {
        let t10 = lL.get(e10);
        if (t10) return t10;
        let r10 = Promise.resolve(e10);
        return lL.set(e10, r10), r10;
      }
      l$(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`cookies()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E830", enumerable: false, configurable: true });
      });
      var ec = ec, eJ = eJ;
      function lj() {
        let e10 = "headers", t10 = ec.workAsyncStorageInstance.getStore(), r10 = eJ.workUnitAsyncStorageInstance.getStore();
        if (t10) {
          if (r10 && "after" === r10.phase && !lT()) throw Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`headers()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E839", enumerable: false, configurable: true });
          if (t10.forceStatic) return lB(el.seal(new Headers({})));
          if (r10) switch (r10.type) {
            case "cache": {
              let e11 = Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E833", enumerable: false, configurable: true });
              throw Error.captureStackTrace(e11, lj), t10.invalidDynamicUsageError ??= e11, e11;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E838", enumerable: false, configurable: true });
            case "generate-static-params":
              throw Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E1134", enumerable: false, configurable: true });
          }
          if (t10.dynamicShouldError) throw Object.defineProperty(new lP(`Route ${t10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E828", enumerable: false, configurable: true });
          if (r10) switch (r10.type) {
            case "prerender":
              var i10 = t10, n10 = r10;
              let a10 = lM.get(n10);
              if (a10) return a10;
              let s10 = (0, lk.makeHangingPromise)(n10.renderSignal, i10.route, "`headers()`");
              return lM.set(n10, s10), s10;
            case "prerender-client":
            case "validation-client":
              let o10 = "`headers`";
              throw Object.defineProperty(new eX.InvariantError(`${o10} must not be used within a client component. Next.js should be preventing ${o10} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E1017", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, lx.postponeWithTracking)(t10.route, e10, r10.dynamicTracking);
            case "prerender-legacy":
              return (0, lx.throwToInterruptStaticGeneration)(e10, t10, r10);
            case "prerender-runtime":
              return (0, lk.delayUntilRuntimeStage)(r10, lB(r10.headers));
            case "private-cache":
              return lB(r10.headers);
            case "request":
              if ((0, lx.trackDynamicDataInDynamicRender)(r10), r10.asyncApiPromises) return (0, eQ.isInEarlyRenderStage)(r10) ? r10.asyncApiPromises.earlyHeaders : r10.asyncApiPromises.headers;
              return lB(r10.headers);
          }
        }
        (0, eQ.throwForMissingRequestStore)(e10);
      }
      let lM = /* @__PURE__ */ new WeakMap();
      function lB(e10) {
        let t10 = lM.get(e10);
        if (t10) return t10;
        let r10 = Promise.resolve(e10);
        return lM.set(e10, r10), r10;
      }
      l$(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`headers()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E836", enumerable: false, configurable: true });
      });
      var ec = ec, eJ = eJ;
      async function lH(e10, t10) {
        return lE(new Request(lS("session", e10.get("x-forwarded-proto"), e10, process.env, t10), { headers: { cookie: e10.get("cookie") ?? "" } }), { ...t10, callbacks: { ...t10.callbacks, async session(...e11) {
          let r10 = await t10.callbacks?.session?.(...e11) ?? { ...e11[0].session, expires: e11[0].session.expires?.toISOString?.() ?? e11[0].session.expires };
          return { user: e11[0].user ?? e11[0].token, ...r10 };
        } } });
      }
      function lq(e10) {
        return "function" == typeof e10;
      }
      function lF(e10, t10) {
        return "function" == typeof e10 ? async (...r10) => {
          if (!r10.length) {
            let r11 = await lj(), i11 = await e10(void 0);
            return t10?.(i11), lH(r11, i11).then((e11) => e11.json());
          }
          if (r10[0] instanceof Request) {
            let i11 = r10[0], n11 = r10[1], a11 = await e10(i11);
            return t10?.(a11), lW([i11, n11], a11);
          }
          if (lq(r10[0])) {
            let i11 = r10[0];
            return async (...r11) => {
              let n11 = await e10(r11[0]);
              return t10?.(n11), lW(r11, n11, i11);
            };
          }
          let i10 = "req" in r10[0] ? r10[0].req : r10[0], n10 = "res" in r10[0] ? r10[0].res : r10[1], a10 = await e10(i10);
          return t10?.(a10), lH(new Headers(i10.headers), a10).then(async (e11) => {
            let t11 = await e11.json();
            for (let t12 of e11.headers.getSetCookie()) "headers" in n10 ? n10.headers.append("set-cookie", t12) : n10.appendHeader("set-cookie", t12);
            return t11;
          });
        } : (...t11) => {
          if (!t11.length) return Promise.resolve(lj()).then((t12) => lH(t12, e10).then((e11) => e11.json()));
          if (t11[0] instanceof Request) return lW([t11[0], t11[1]], e10);
          if (lq(t11[0])) {
            let r11 = t11[0];
            return async (...t12) => lW(t12, e10, r11).then((e11) => e11);
          }
          let r10 = "req" in t11[0] ? t11[0].req : t11[0], i10 = "res" in t11[0] ? t11[0].res : t11[1];
          return lH(new Headers(r10.headers), e10).then(async (e11) => {
            let t12 = await e11.json();
            for (let t13 of e11.headers.getSetCookie()) "headers" in i10 ? i10.headers.append("set-cookie", t13) : i10.appendHeader("set-cookie", t13);
            return t12;
          });
        };
      }
      async function lW(e10, t10, r10) {
        let i10 = lC(e10[0]), n10 = await lH(i10.headers, t10), a10 = await n10.json(), s10 = true;
        t10.callbacks?.authorized && (s10 = await t10.callbacks.authorized({ request: i10, auth: a10 }));
        let o10 = ee.next?.();
        if (s10 instanceof Response) {
          var l10, c10, u10;
          let e11, r11;
          o10 = s10;
          let n11 = s10.headers.get("Location"), { pathname: a11 } = i10.nextUrl;
          n11 && (l10 = a11, c10 = new URL(n11).pathname, u10 = t10, e11 = c10.replace(`${l10}/`, ""), r11 = Object.values(u10.pages ?? {}), (lK.has(e11) || r11.includes(c10)) && c10 === l10) && (s10 = true);
        } else if (r10) i10.auth = a10, o10 = await r10(i10, e10[1]) ?? ee.next();
        else if (!s10) {
          let e11 = t10.pages?.signIn ?? `${t10.basePath}/signin`;
          if (i10.nextUrl.pathname !== e11) {
            let t11 = i10.nextUrl.clone();
            t11.pathname = e11, t11.searchParams.set("callbackUrl", i10.nextUrl.href), o10 = ee.redirect(t11);
          }
        }
        let d10 = new Response(o10?.body, o10);
        for (let e11 of n10.headers.getSetCookie()) d10.headers.append("set-cookie", e11);
        return d10;
      }
      e.i(18368), /* @__PURE__ */ new WeakMap(), l$(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`draftMode()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E835", enumerable: false, configurable: true });
      });
      let lK = /* @__PURE__ */ new Set(["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error"]);
      URLSearchParams;
      var lV = e.i(16852), lz = e.i(75982);
      let lQ = e.r(91375).actionAsyncStorage;
      function lJ(e10, t10) {
        throw function(e11, t11, r10 = lV.RedirectStatusCode.TemporaryRedirect) {
          let i10 = Object.defineProperty(Error(lz.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          return i10.digest = `${lz.REDIRECT_ERROR_CODE};${t11};${e11};${r10};`, i10;
        }(e10, t10 ??= lQ?.getStore()?.isAction ? "push" : "replace", lV.RedirectStatusCode.TemporaryRedirect);
      }
      async function lG(e10, t10 = {}, r10, i10) {
        let n10 = new Headers(await lj()), { redirect: a10 = true, redirectTo: s10, ...o10 } = t10 instanceof FormData ? Object.fromEntries(t10) : t10, l10 = s10?.toString() ?? n10.get("Referer") ?? "/", c10 = lS("signin", n10.get("x-forwarded-proto"), n10, process.env, i10);
        if (!e10) return c10.searchParams.append("callbackUrl", l10), a10 && lJ(c10.toString()), c10.toString();
        let u10 = `${c10}/${e10}?${new URLSearchParams(r10)}`, d10 = {};
        for (let t11 of i10.providers) {
          let { options: r11, ...i11 } = "function" == typeof t11 ? t11() : t11, n11 = r11?.id ?? i11.id;
          if (n11 === e10) {
            d10 = { id: n11, type: r11?.type ?? i11.type };
            break;
          }
        }
        if (!d10.id) {
          let e11 = `${c10}?${new URLSearchParams({ callbackUrl: l10 })}`;
          return a10 && lJ(e11), e11;
        }
        "credentials" === d10.type && (u10 = u10.replace("signin", "callback")), n10.set("Content-Type", "application/x-www-form-urlencoded");
        let h10 = new Request(u10, { method: "POST", headers: n10, body: new URLSearchParams({ ...o10, callbackUrl: l10 }) }), p10 = await lE(h10, { ...i10, raw: nX, skipCSRFCheck: nG }), f2 = await lD();
        for (let e11 of p10?.cookies ?? []) f2.set(e11.name, e11.value, e11.options);
        let m2 = (p10 instanceof Response ? p10.headers.get("Location") : p10.redirect) ?? u10;
        return a10 ? lJ(m2) : m2;
      }
      async function lX(e10, t10) {
        let r10 = new Headers(await lj());
        r10.set("Content-Type", "application/x-www-form-urlencoded");
        let i10 = lS("signout", r10.get("x-forwarded-proto"), r10, process.env, t10), n10 = new URLSearchParams({ callbackUrl: e10?.redirectTo ?? r10.get("Referer") ?? "/" }), a10 = new Request(i10, { method: "POST", headers: r10, body: n10 }), s10 = await lE(a10, { ...t10, raw: nX, skipCSRFCheck: nG }), o10 = await lD();
        for (let e11 of s10?.cookies ?? []) o10.set(e11.name, e11.value, e11.options);
        return e10?.redirect ?? true ? lJ(s10.redirect) : s10;
      }
      async function lY(e10, t10) {
        let r10 = new Headers(await lj());
        r10.set("Content-Type", "application/json");
        let i10 = new Request(lS("session", r10.get("x-forwarded-proto"), r10, process.env, t10), { method: "POST", headers: r10, body: JSON.stringify({ data: e10 }) }), n10 = await lE(i10, { ...t10, raw: nX, skipCSRFCheck: nG }), a10 = await lD();
        for (let e11 of n10?.cookies ?? []) a10.set(e11.name, e11.value, e11.options);
        return n10.body;
      }
      e.r(82748).unstable_rethrow;
      let lZ = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/, l0 = "SELECT * FROM users WHERE id = ?", l1 = `
  SELECT u.*
  FROM users u JOIN accounts a ON a.userId = u.id
  WHERE a.providerAccountId = ? AND a.provider = ?`, l2 = `
  UPDATE users 
  SET name = ?, email = ?, emailVerified = ?, image = ?
  WHERE id = ? `, l3 = `
  SELECT id, sessionToken, userId, expires
  FROM sessions
  WHERE sessionToken = ?`, l4 = "UPDATE sessions SET expires = ? WHERE sessionToken = ?", l5 = "DELETE FROM sessions WHERE sessionToken = ?", l6 = `
  INSERT INTO accounts (
    id, userId, type, provider, 
    providerAccountId, refresh_token, access_token, 
    expires_at, token_type, scope, id_token, session_state,
    oauth_token, oauth_token_secret
  ) 
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, l8 = "SELECT * FROM verification_tokens WHERE identifier = ? AND token = ?";
      function l9(e10) {
        return e10.map((e11) => void 0 === e11 ? null : e11);
      }
      async function l7(e10, t10, r10, i10, n10) {
        try {
          return r10 = l9(r10), await e10.prepare(t10).bind(...r10).run(), await ce(e10, i10, n10);
        } catch (e11) {
          throw console.error(e11.message, e11.cause?.message), e11;
        }
      }
      async function ce(e10, t10, r10) {
        try {
          r10 = l9(r10);
          let i10 = await e10.prepare(t10).bind(...r10).first();
          if (!i10) return null;
          for (let [e11, t11] of Object.entries(i10)) null === t11 && delete i10[e11], "string" == typeof t11 && lZ.test(t11) && !isNaN(Date.parse(t11)) && (i10[e11] = new Date(t11));
          return i10;
        } catch (e11) {
          throw console.error(e11.message, e11.cause?.message), e11;
        }
      }
      async function ct(e10, t10, r10) {
        try {
          return r10 = l9(r10), await e10.prepare(t10).bind(...r10).run();
        } catch (e11) {
          throw console.error(e11.message, e11.cause?.message), e11;
        }
      }
      async function cr(e10, t10, r10) {
        try {
          r10 = l9(r10), await e10.prepare(t10).bind(...r10).run();
        } catch (e11) {
          throw console.error(e11.message, e11.cause?.message), e11;
        }
      }
      let ci = Symbol.for("drizzle:entityKind");
      function cn(e10, t10) {
        if (!e10 || "object" != typeof e10) return false;
        if (e10 instanceof t10) return true;
        if (!Object.prototype.hasOwnProperty.call(t10, ci)) throw Error(`Class "${t10.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`);
        let r10 = Object.getPrototypeOf(e10).constructor;
        if (r10) for (; r10; ) {
          if (ci in r10 && r10[ci] === t10[ci]) return true;
          r10 = Object.getPrototypeOf(r10);
        }
        return false;
      }
      Symbol.for("drizzle:hasOwnEntityKind");
      class ca {
        static [ci] = "ConsoleLogWriter";
        write(e10) {
          console.log(e10);
        }
      }
      class cs {
        static [ci] = "DefaultLogger";
        writer;
        constructor(e10) {
          this.writer = e10?.writer ?? new ca();
        }
        logQuery(e10, t10) {
          let r10 = t10.map((e11) => {
            try {
              return JSON.stringify(e11);
            } catch {
              return String(e11);
            }
          }), i10 = r10.length ? ` -- params: [${r10.join(", ")}]` : "";
          this.writer.write(`Query: ${e10}${i10}`);
        }
      }
      class co {
        static [ci] = "NoopLogger";
        logQuery() {
        }
      }
      let cl = Symbol.for("drizzle:Name"), cc = Symbol.for("drizzle:Schema"), cu = Symbol.for("drizzle:Columns"), cd = Symbol.for("drizzle:ExtraConfigColumns"), ch = Symbol.for("drizzle:OriginalName"), cp = Symbol.for("drizzle:BaseName"), cf = Symbol.for("drizzle:IsAlias"), cm = Symbol.for("drizzle:ExtraConfigBuilder"), cg = Symbol.for("drizzle:IsDrizzleTable");
      class cy {
        static [ci] = "Table";
        static Symbol = { Name: cl, Schema: cc, OriginalName: ch, Columns: cu, ExtraConfigColumns: cd, BaseName: cp, IsAlias: cf, ExtraConfigBuilder: cm };
        [cl];
        [ch];
        [cc];
        [cu];
        [cd];
        [cp];
        [cf] = false;
        [cg] = true;
        [cm] = void 0;
        constructor(e10, t10, r10) {
          this[cl] = this[ch] = e10, this[cc] = t10, this[cp] = r10;
        }
      }
      function cb(e10) {
        return `${e10[cc] ?? "public"}.${e10[cl]}`;
      }
      class cw {
        constructor(e10, t10) {
          this.table = e10, this.config = t10, this.name = t10.name, this.keyAsName = t10.keyAsName, this.notNull = t10.notNull, this.default = t10.default, this.defaultFn = t10.defaultFn, this.onUpdateFn = t10.onUpdateFn, this.hasDefault = t10.hasDefault, this.primary = t10.primaryKey, this.isUnique = t10.isUnique, this.uniqueName = t10.uniqueName, this.uniqueType = t10.uniqueType, this.dataType = t10.dataType, this.columnType = t10.columnType, this.generated = t10.generated, this.generatedIdentity = t10.generatedIdentity;
        }
        static [ci] = "Column";
        name;
        keyAsName;
        primary;
        notNull;
        default;
        defaultFn;
        onUpdateFn;
        hasDefault;
        isUnique;
        uniqueName;
        uniqueType;
        dataType;
        columnType;
        enumValues = void 0;
        generated = void 0;
        generatedIdentity = void 0;
        config;
        mapFromDriverValue(e10) {
          return e10;
        }
        mapToDriverValue(e10) {
          return e10;
        }
        shouldDisableInsert() {
          return void 0 !== this.config.generated && "byDefault" !== this.config.generated.type;
        }
      }
      class cv {
        static [ci] = "ColumnBuilder";
        config;
        constructor(e10, t10, r10) {
          this.config = { name: e10, keyAsName: "" === e10, notNull: false, default: void 0, hasDefault: false, primaryKey: false, isUnique: false, uniqueName: void 0, uniqueType: void 0, dataType: t10, columnType: r10, generated: void 0 };
        }
        $type() {
          return this;
        }
        notNull() {
          return this.config.notNull = true, this;
        }
        default(e10) {
          return this.config.default = e10, this.config.hasDefault = true, this;
        }
        $defaultFn(e10) {
          return this.config.defaultFn = e10, this.config.hasDefault = true, this;
        }
        $default = this.$defaultFn;
        $onUpdateFn(e10) {
          return this.config.onUpdateFn = e10, this.config.hasDefault = true, this;
        }
        $onUpdate = this.$onUpdateFn;
        primaryKey() {
          return this.config.primaryKey = true, this.config.notNull = true, this;
        }
        setName(e10) {
          "" === this.config.name && (this.config.name = e10);
        }
      }
      class c_ {
        static [ci] = "PgForeignKeyBuilder";
        reference;
        _onUpdate = "no action";
        _onDelete = "no action";
        constructor(e10, t10) {
          this.reference = () => {
            let { name: t11, columns: r10, foreignColumns: i10 } = e10();
            return { name: t11, columns: r10, foreignTable: i10[0].table, foreignColumns: i10 };
          }, t10 && (this._onUpdate = t10.onUpdate, this._onDelete = t10.onDelete);
        }
        onUpdate(e10) {
          return this._onUpdate = void 0 === e10 ? "no action" : e10, this;
        }
        onDelete(e10) {
          return this._onDelete = void 0 === e10 ? "no action" : e10, this;
        }
        build(e10) {
          return new cS(e10, this);
        }
      }
      class cS {
        constructor(e10, t10) {
          this.table = e10, this.reference = t10.reference, this.onUpdate = t10._onUpdate, this.onDelete = t10._onDelete;
        }
        static [ci] = "PgForeignKey";
        reference;
        onUpdate;
        onDelete;
        getName() {
          let { name: e10, columns: t10, foreignColumns: r10 } = this.reference(), i10 = t10.map((e11) => e11.name), n10 = r10.map((e11) => e11.name), a10 = [this.table[cl], ...i10, r10[0].table[cl], ...n10];
          return e10 ?? `${a10.join("_")}_fk`;
        }
      }
      function cE(e10, ...t10) {
        return e10(...t10);
      }
      function cx(e10, t10) {
        return `${e10[cl]}_${t10.join("_")}_unique`;
      }
      class cT {
        constructor(e10, t10) {
          this.name = t10, this.columns = e10;
        }
        static [ci] = "PgUniqueConstraintBuilder";
        columns;
        nullsNotDistinctConfig = false;
        nullsNotDistinct() {
          return this.nullsNotDistinctConfig = true, this;
        }
        build(e10) {
          return new cA(e10, this.columns, this.nullsNotDistinctConfig, this.name);
        }
      }
      class cC {
        static [ci] = "PgUniqueOnConstraintBuilder";
        name;
        constructor(e10) {
          this.name = e10;
        }
        on(...e10) {
          return new cT(e10, this.name);
        }
      }
      class cA {
        constructor(e10, t10, r10, i10) {
          this.table = e10, this.columns = t10, this.name = i10 ?? cx(this.table, this.columns.map((e11) => e11.name)), this.nullsNotDistinct = r10;
        }
        static [ci] = "PgUniqueConstraint";
        columns;
        name;
        nullsNotDistinct = false;
        getName() {
          return this.name;
        }
      }
      function cP(e10, t10, r10) {
        for (let i10 = t10; i10 < e10.length; i10++) {
          let n10 = e10[i10];
          if ("\\" === n10) {
            i10++;
            continue;
          }
          if ('"' === n10) return [e10.slice(t10, i10).replace(/\\/g, ""), i10 + 1];
          if (!r10 && ("," === n10 || "}" === n10)) return [e10.slice(t10, i10).replace(/\\/g, ""), i10];
        }
        return [e10.slice(t10).replace(/\\/g, ""), e10.length];
      }
      class ck extends cv {
        foreignKeyConfigs = [];
        static [ci] = "PgColumnBuilder";
        array(e10) {
          return new cI(this.config.name, this, e10);
        }
        references(e10, t10 = {}) {
          return this.foreignKeyConfigs.push({ ref: e10, actions: t10 }), this;
        }
        unique(e10, t10) {
          return this.config.isUnique = true, this.config.uniqueName = e10, this.config.uniqueType = t10?.nulls, this;
        }
        generatedAlwaysAs(e10) {
          return this.config.generated = { as: e10, type: "always", mode: "stored" }, this;
        }
        buildForeignKeys(e10, t10) {
          return this.foreignKeyConfigs.map(({ ref: r10, actions: i10 }) => cE((r11, i11) => {
            let n10 = new c_(() => ({ columns: [e10], foreignColumns: [r11()] }));
            return i11.onUpdate && n10.onUpdate(i11.onUpdate), i11.onDelete && n10.onDelete(i11.onDelete), n10.build(t10);
          }, r10, i10));
        }
        buildExtraConfigColumn(e10) {
          return new cO(e10, this.config);
        }
      }
      class cR extends cw {
        constructor(e10, t10) {
          t10.uniqueName || (t10.uniqueName = cx(e10, [t10.name])), super(e10, t10), this.table = e10;
        }
        static [ci] = "PgColumn";
      }
      class cO extends cR {
        static [ci] = "ExtraConfigColumn";
        getSQLType() {
          return this.getSQLType();
        }
        indexConfig = { order: this.config.order ?? "asc", nulls: this.config.nulls ?? "last", opClass: this.config.opClass };
        defaultConfig = { order: "asc", nulls: "last", opClass: void 0 };
        asc() {
          return this.indexConfig.order = "asc", this;
        }
        desc() {
          return this.indexConfig.order = "desc", this;
        }
        nullsFirst() {
          return this.indexConfig.nulls = "first", this;
        }
        nullsLast() {
          return this.indexConfig.nulls = "last", this;
        }
        op(e10) {
          return this.indexConfig.opClass = e10, this;
        }
      }
      class cN {
        static [ci] = "IndexedColumn";
        constructor(e10, t10, r10, i10) {
          this.name = e10, this.keyAsName = t10, this.type = r10, this.indexConfig = i10;
        }
        name;
        keyAsName;
        type;
        indexConfig;
      }
      class cI extends ck {
        static [ci] = "PgArrayBuilder";
        constructor(e10, t10, r10) {
          super(e10, "array", "PgArray"), this.config.baseBuilder = t10, this.config.size = r10;
        }
        build(e10) {
          let t10 = this.config.baseBuilder.build(e10);
          return new c$(e10, this.config, t10);
        }
      }
      class c$ extends cR {
        constructor(e10, t10, r10, i10) {
          super(e10, t10), this.baseColumn = r10, this.range = i10, this.size = t10.size;
        }
        size;
        static [ci] = "PgArray";
        getSQLType() {
          return `${this.baseColumn.getSQLType()}[${"number" == typeof this.size ? this.size : ""}]`;
        }
        mapFromDriverValue(e10) {
          return "string" == typeof e10 && (e10 = function(e11) {
            let [t10] = function e12(t11, r10 = 0) {
              let i10 = [], n10 = r10, a10 = false;
              for (; n10 < t11.length; ) {
                let s10 = t11[n10];
                if ("," === s10) {
                  (a10 || n10 === r10) && i10.push(""), a10 = true, n10++;
                  continue;
                }
                if (a10 = false, "\\" === s10) {
                  n10 += 2;
                  continue;
                }
                if ('"' === s10) {
                  let [e13, r11] = cP(t11, n10 + 1, true);
                  i10.push(e13), n10 = r11;
                  continue;
                }
                if ("}" === s10) return [i10, n10 + 1];
                if ("{" === s10) {
                  let [r11, a11] = e12(t11, n10 + 1);
                  i10.push(r11), n10 = a11;
                  continue;
                }
                let [o10, l10] = cP(t11, n10, false);
                i10.push(o10), n10 = l10;
              }
              return [i10, n10];
            }(e11, 1);
            return t10;
          }(e10)), e10.map((e11) => this.baseColumn.mapFromDriverValue(e11));
        }
        mapToDriverValue(e10, t10 = false) {
          let r10 = e10.map((e11) => null === e11 ? null : cn(this.baseColumn, c$) ? this.baseColumn.mapToDriverValue(e11, true) : this.baseColumn.mapToDriverValue(e11));
          return t10 ? r10 : function e11(t11) {
            return `{${t11.map((t12) => Array.isArray(t12) ? e11(t12) : "string" == typeof t12 ? `"${t12.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"` : `${t12}`).join(",")}}`;
          }(r10);
        }
      }
      class cD extends ck {
        static [ci] = "PgEnumObjectColumnBuilder";
        constructor(e10, t10) {
          super(e10, "string", "PgEnumObjectColumn"), this.config.enum = t10;
        }
        build(e10) {
          return new cL(e10, this.config);
        }
      }
      class cL extends cR {
        static [ci] = "PgEnumObjectColumn";
        enum;
        enumValues = this.config.enum.enumValues;
        constructor(e10, t10) {
          super(e10, t10), this.enum = t10.enum;
        }
        getSQLType() {
          return this.enum.enumName;
        }
      }
      let cU = Symbol.for("drizzle:isPgEnum");
      class cj extends ck {
        static [ci] = "PgEnumColumnBuilder";
        constructor(e10, t10) {
          super(e10, "string", "PgEnumColumn"), this.config.enum = t10;
        }
        build(e10) {
          return new cM(e10, this.config);
        }
      }
      class cM extends cR {
        static [ci] = "PgEnumColumn";
        enum = this.config.enum;
        enumValues = this.config.enum.enumValues;
        constructor(e10, t10) {
          super(e10, t10), this.enum = t10.enum;
        }
        getSQLType() {
          return this.enum.enumName;
        }
      }
      class cB {
        static [ci] = "Subquery";
        constructor(e10, t10, r10, i10 = false, n10 = []) {
          this._ = { brand: "Subquery", sql: e10, selectedFields: t10, alias: r10, isWith: i10, usedTables: n10 };
        }
      }
      class cH extends cB {
        static [ci] = "WithSubquery";
      }
      let cq = (e10, t10) => o ? (l || (l = o.trace.getTracer("drizzle-orm", "0.45.2")), cE((r10, i10) => i10.startActiveSpan(e10, (e11) => {
        try {
          return t10(e11);
        } catch (t11) {
          throw e11.setStatus({ code: r10.SpanStatusCode.ERROR, message: t11 instanceof Error ? t11.message : "Unknown error" }), t11;
        } finally {
          e11.end();
        }
      }), o, l)) : t10(), cF = Symbol.for("drizzle:ViewBaseConfig");
      class cW {
        static [ci] = "FakePrimitiveParam";
      }
      function cK(e10) {
        return null != e10 && "function" == typeof e10.getSQL;
      }
      class cV {
        static [ci] = "StringChunk";
        value;
        constructor(e10) {
          this.value = Array.isArray(e10) ? e10 : [e10];
        }
        getSQL() {
          return new cz([this]);
        }
      }
      class cz {
        constructor(e10) {
          for (const t10 of (this.queryChunks = e10, e10)) if (cn(t10, cy)) {
            const e11 = t10[cy.Symbol.Schema];
            this.usedTables.push(void 0 === e11 ? t10[cy.Symbol.Name] : e11 + "." + t10[cy.Symbol.Name]);
          }
        }
        static [ci] = "SQL";
        decoder = cJ;
        shouldInlineParams = false;
        usedTables = [];
        append(e10) {
          return this.queryChunks.push(...e10.queryChunks), this;
        }
        toQuery(e10) {
          return cq("drizzle.buildSQL", (t10) => {
            let r10 = this.buildQueryFromSourceParams(this.queryChunks, e10);
            return t10?.setAttributes({ "drizzle.query.text": r10.sql, "drizzle.query.params": JSON.stringify(r10.params) }), r10;
          });
        }
        buildQueryFromSourceParams(e10, t10) {
          let r10 = Object.assign({}, t10, { inlineParams: t10.inlineParams || this.shouldInlineParams, paramStartIndex: t10.paramStartIndex || { value: 0 } }), { casing: i10, escapeName: n10, escapeParam: a10, prepareTyping: s10, inlineParams: o10, paramStartIndex: l10 } = r10;
          var c10 = e10.map((e11) => {
            if (cn(e11, cV)) return { sql: e11.value.join(""), params: [] };
            if (cn(e11, cQ)) return { sql: n10(e11.value), params: [] };
            if (void 0 === e11) return { sql: "", params: [] };
            if (Array.isArray(e11)) {
              let t11 = [new cV("(")];
              for (let [r11, i11] of e11.entries()) t11.push(i11), r11 < e11.length - 1 && t11.push(new cV(", "));
              return t11.push(new cV(")")), this.buildQueryFromSourceParams(t11, r10);
            }
            if (cn(e11, cz)) return this.buildQueryFromSourceParams(e11.queryChunks, { ...r10, inlineParams: o10 || e11.shouldInlineParams });
            if (cn(e11, cy)) {
              let t11 = e11[cy.Symbol.Schema], r11 = e11[cy.Symbol.Name];
              return { sql: void 0 === t11 || e11[cf] ? n10(r11) : n10(t11) + "." + n10(r11), params: [] };
            }
            if (cn(e11, cw)) {
              let r11 = i10.getColumnCasing(e11);
              if ("indexes" === t10.invokeSource) return { sql: n10(r11), params: [] };
              let a11 = e11.table[cy.Symbol.Schema];
              return { sql: e11.table[cf] || void 0 === a11 ? n10(e11.table[cy.Symbol.Name]) + "." + n10(r11) : n10(a11) + "." + n10(e11.table[cy.Symbol.Name]) + "." + n10(r11), params: [] };
            }
            if (cn(e11, c4)) {
              let t11 = e11[cF].schema, r11 = e11[cF].name;
              return { sql: void 0 === t11 || e11[cF].isAlias ? n10(r11) : n10(t11) + "." + n10(r11), params: [] };
            }
            if (cn(e11, cX)) {
              if (cn(e11.value, c1)) return { sql: a10(l10.value++, e11), params: [e11], typings: ["none"] };
              let t11 = null === e11.value ? null : e11.encoder.mapToDriverValue(e11.value);
              if (cn(t11, cz)) return this.buildQueryFromSourceParams([t11], r10);
              if (o10) return { sql: this.mapInlineParam(t11, r10), params: [] };
              let i11 = ["none"];
              return s10 && (i11 = [s10(e11.encoder)]), { sql: a10(l10.value++, t11), params: [t11], typings: i11 };
            }
            return cn(e11, c1) ? { sql: a10(l10.value++, e11), params: [e11], typings: ["none"] } : cn(e11, cz.Aliased) && void 0 !== e11.fieldAlias ? { sql: n10(e11.fieldAlias), params: [] } : cn(e11, cB) ? e11._.isWith ? { sql: n10(e11._.alias), params: [] } : this.buildQueryFromSourceParams([new cV("("), e11._.sql, new cV(") "), new cQ(e11._.alias)], r10) : e11 && "function" == typeof e11 && cU in e11 && true === e11[cU] ? e11.schema ? { sql: n10(e11.schema) + "." + n10(e11.enumName), params: [] } : { sql: n10(e11.enumName), params: [] } : cK(e11) ? e11.shouldOmitSQLParens?.() ? this.buildQueryFromSourceParams([e11.getSQL()], r10) : this.buildQueryFromSourceParams([new cV("("), e11.getSQL(), new cV(")")], r10) : o10 ? { sql: this.mapInlineParam(e11, r10), params: [] } : { sql: a10(l10.value++, e11), params: [e11], typings: ["none"] };
          });
          let u10 = { sql: "", params: [] };
          for (let e11 of c10) u10.sql += e11.sql, u10.params.push(...e11.params), e11.typings?.length && (u10.typings || (u10.typings = []), u10.typings.push(...e11.typings));
          return u10;
        }
        mapInlineParam(e10, { escapeString: t10 }) {
          if (null === e10) return "null";
          if ("number" == typeof e10 || "boolean" == typeof e10) return e10.toString();
          if ("string" == typeof e10) return t10(e10);
          if ("object" == typeof e10) {
            let r10 = e10.toString();
            return "[object Object]" === r10 ? t10(JSON.stringify(e10)) : t10(r10);
          }
          throw Error("Unexpected param value: " + e10);
        }
        getSQL() {
          return this;
        }
        as(e10) {
          return void 0 === e10 ? this : new cz.Aliased(this, e10);
        }
        mapWith(e10) {
          return this.decoder = "function" == typeof e10 ? { mapFromDriverValue: e10 } : e10, this;
        }
        inlineParams() {
          return this.shouldInlineParams = true, this;
        }
        if(e10) {
          return e10 ? this : void 0;
        }
      }
      class cQ {
        constructor(e10) {
          this.value = e10;
        }
        static [ci] = "Name";
        brand;
        getSQL() {
          return new cz([this]);
        }
      }
      let cJ = { mapFromDriverValue: (e10) => e10 }, cG = { mapToDriverValue: (e10) => e10 };
      ({ ...cJ, ...cG });
      class cX {
        constructor(e10, t10 = cG) {
          this.value = e10, this.encoder = t10;
        }
        static [ci] = "Param";
        brand;
        getSQL() {
          return new cz([this]);
        }
      }
      function cY(e10, ...t10) {
        let r10 = [];
        for (let [i10, n10] of ((t10.length > 0 || e10.length > 0 && "" !== e10[0]) && r10.push(new cV(e10[0])), t10.entries())) r10.push(n10, new cV(e10[i10 + 1]));
        return new cz(r10);
      }
      (V = cY || (cY = {})).empty = function() {
        return new cz([]);
      }, V.fromList = function(e10) {
        return new cz(e10);
      }, V.raw = function(e10) {
        return new cz([new cV(e10)]);
      }, V.join = function(e10, t10) {
        let r10 = [];
        for (let [i10, n10] of e10.entries()) i10 > 0 && void 0 !== t10 && r10.push(t10), r10.push(n10);
        return new cz(r10);
      }, V.identifier = function(e10) {
        return new cQ(e10);
      }, V.placeholder = function(e10) {
        return new c1(e10);
      }, V.param = function(e10, t10) {
        return new cX(e10, t10);
      };
      var cZ = cz || (cz = {});
      class c0 {
        constructor(e10, t10) {
          this.sql = e10, this.fieldAlias = t10;
        }
        static [ci] = "SQL.Aliased";
        isSelectionField = false;
        getSQL() {
          return this.sql;
        }
        clone() {
          return new c0(this.sql, this.fieldAlias);
        }
      }
      cZ.Aliased = c0;
      class c1 {
        constructor(e10) {
          this.name = e10;
        }
        static [ci] = "Placeholder";
        getSQL() {
          return new cz([this]);
        }
      }
      function c2(e10, t10) {
        return e10.map((e11) => {
          if (cn(e11, c1)) {
            if (!(e11.name in t10)) throw Error(`No value for placeholder "${e11.name}" was provided`);
            return t10[e11.name];
          }
          if (cn(e11, cX) && cn(e11.value, c1)) {
            if (!(e11.value.name in t10)) throw Error(`No value for placeholder "${e11.value.name}" was provided`);
            return e11.encoder.mapToDriverValue(t10[e11.value.name]);
          }
          return e11;
        });
      }
      let c3 = Symbol.for("drizzle:IsDrizzleView");
      class c4 {
        static [ci] = "View";
        [cF];
        [c3] = true;
        constructor({ name: e10, schema: t10, selectedFields: r10, query: i10 }) {
          this[cF] = { name: e10, originalName: e10, schema: t10, selectedFields: r10, query: i10, isExisting: !i10, isAlias: false };
        }
        getSQL() {
          return new cz([this]);
        }
      }
      function c5(e10, t10, r10) {
        let i10 = {}, n10 = e10.reduce((e11, { path: n11, field: a10 }, s10) => {
          let o10;
          o10 = cn(a10, cw) ? a10 : cn(a10, cz) ? a10.decoder : cn(a10, cB) ? a10._.sql.decoder : a10.sql.decoder;
          let l10 = e11;
          for (let [e12, c10] of n11.entries()) if (e12 < n11.length - 1) c10 in l10 || (l10[c10] = {}), l10 = l10[c10];
          else {
            let e13 = t10[s10], u10 = l10[c10] = null === e13 ? null : o10.mapFromDriverValue(e13);
            if (r10 && cn(a10, cw) && 2 === n11.length) {
              let e14 = n11[0];
              e14 in i10 ? "string" == typeof i10[e14] && i10[e14] !== a10.table[cl] && (i10[e14] = false) : i10[e14] = null === u10 && a10.table[cl];
            }
          }
          return e11;
        }, {});
        if (r10 && Object.keys(i10).length > 0) for (let [e11, t11] of Object.entries(i10)) "string" != typeof t11 || r10[t11] || (n10[e11] = null);
        return n10;
      }
      function c6(e10, t10) {
        return Object.entries(e10).reduce((e11, [r10, i10]) => {
          if ("string" != typeof r10) return e11;
          let n10 = t10 ? [...t10, r10] : [r10];
          return cn(i10, cw) || cn(i10, cz) || cn(i10, cz.Aliased) || cn(i10, cB) ? e11.push({ path: n10, field: i10 }) : cn(i10, cy) ? e11.push(...c6(i10[cy.Symbol.Columns], n10)) : e11.push(...c6(i10, n10)), e11;
        }, []);
      }
      function c8(e10, t10) {
        let r10 = Object.keys(e10), i10 = Object.keys(t10);
        if (r10.length !== i10.length) return false;
        for (let [e11, t11] of r10.entries()) if (t11 !== i10[e11]) return false;
        return true;
      }
      function c9(e10, t10) {
        let r10 = Object.entries(t10).filter(([, e11]) => void 0 !== e11).map(([t11, r11]) => cn(r11, cz) || cn(r11, cw) ? [t11, r11] : [t11, new cX(r11, e10[cy.Symbol.Columns][t11])]);
        if (0 === r10.length) throw Error("No values to set");
        return Object.fromEntries(r10);
      }
      function c7(e10) {
        return cn(e10, cB) ? e10._.alias : cn(e10, c4) ? e10[cF].name : cn(e10, cz) ? void 0 : e10[cy.Symbol.IsAlias] ? e10[cy.Symbol.Name] : e10[cy.Symbol.BaseName];
      }
      function ue(e10, t10) {
        return { name: "string" == typeof e10 && e10.length > 0 ? e10 : "", config: "object" == typeof e10 ? e10 : t10 };
      }
      cw.prototype.getSQL = function() {
        return new cz([this]);
      }, cy.prototype.getSQL = function() {
        return new cz([this]);
      }, cB.prototype.getSQL = function() {
        return new cz([this]);
      };
      let ut = "u" < typeof TextDecoder ? null : new TextDecoder();
      class ur extends ck {
        static [ci] = "PgIntColumnBaseBuilder";
        generatedAlwaysAsIdentity(e10) {
          if (e10) {
            let { name: t10, ...r10 } = e10;
            this.config.generatedIdentity = { type: "always", sequenceName: t10, sequenceOptions: r10 };
          } else this.config.generatedIdentity = { type: "always" };
          return this.config.hasDefault = true, this.config.notNull = true, this;
        }
        generatedByDefaultAsIdentity(e10) {
          if (e10) {
            let { name: t10, ...r10 } = e10;
            this.config.generatedIdentity = { type: "byDefault", sequenceName: t10, sequenceOptions: r10 };
          } else this.config.generatedIdentity = { type: "byDefault" };
          return this.config.hasDefault = true, this.config.notNull = true, this;
        }
      }
      class ui extends ur {
        static [ci] = "PgBigInt53Builder";
        constructor(e10) {
          super(e10, "number", "PgBigInt53");
        }
        build(e10) {
          return new un(e10, this.config);
        }
      }
      class un extends cR {
        static [ci] = "PgBigInt53";
        getSQLType() {
          return "bigint";
        }
        mapFromDriverValue(e10) {
          return "number" == typeof e10 ? e10 : Number(e10);
        }
      }
      class ua extends ur {
        static [ci] = "PgBigInt64Builder";
        constructor(e10) {
          super(e10, "bigint", "PgBigInt64");
        }
        build(e10) {
          return new us(e10, this.config);
        }
      }
      class us extends cR {
        static [ci] = "PgBigInt64";
        getSQLType() {
          return "bigint";
        }
        mapFromDriverValue(e10) {
          return BigInt(e10);
        }
      }
      class uo extends ck {
        static [ci] = "PgBigSerial53Builder";
        constructor(e10) {
          super(e10, "number", "PgBigSerial53"), this.config.hasDefault = true, this.config.notNull = true;
        }
        build(e10) {
          return new ul(e10, this.config);
        }
      }
      class ul extends cR {
        static [ci] = "PgBigSerial53";
        getSQLType() {
          return "bigserial";
        }
        mapFromDriverValue(e10) {
          return "number" == typeof e10 ? e10 : Number(e10);
        }
      }
      class uc extends ck {
        static [ci] = "PgBigSerial64Builder";
        constructor(e10) {
          super(e10, "bigint", "PgBigSerial64"), this.config.hasDefault = true;
        }
        build(e10) {
          return new uu(e10, this.config);
        }
      }
      class uu extends cR {
        static [ci] = "PgBigSerial64";
        getSQLType() {
          return "bigserial";
        }
        mapFromDriverValue(e10) {
          return BigInt(e10);
        }
      }
      class ud extends ck {
        static [ci] = "PgBooleanBuilder";
        constructor(e10) {
          super(e10, "boolean", "PgBoolean");
        }
        build(e10) {
          return new uh(e10, this.config);
        }
      }
      class uh extends cR {
        static [ci] = "PgBoolean";
        getSQLType() {
          return "boolean";
        }
      }
      class up extends ck {
        static [ci] = "PgCharBuilder";
        constructor(e10, t10) {
          super(e10, "string", "PgChar"), this.config.length = t10.length, this.config.enumValues = t10.enum;
        }
        build(e10) {
          return new uf(e10, this.config);
        }
      }
      class uf extends cR {
        static [ci] = "PgChar";
        length = this.config.length;
        enumValues = this.config.enumValues;
        getSQLType() {
          return void 0 === this.length ? "char" : `char(${this.length})`;
        }
      }
      class um extends ck {
        static [ci] = "PgCidrBuilder";
        constructor(e10) {
          super(e10, "string", "PgCidr");
        }
        build(e10) {
          return new ug(e10, this.config);
        }
      }
      class ug extends cR {
        static [ci] = "PgCidr";
        getSQLType() {
          return "cidr";
        }
      }
      class uy extends ck {
        static [ci] = "PgCustomColumnBuilder";
        constructor(e10, t10, r10) {
          super(e10, "custom", "PgCustomColumn"), this.config.fieldConfig = t10, this.config.customTypeParams = r10;
        }
        build(e10) {
          return new ub(e10, this.config);
        }
      }
      class ub extends cR {
        static [ci] = "PgCustomColumn";
        sqlName;
        mapTo;
        mapFrom;
        constructor(e10, t10) {
          super(e10, t10), this.sqlName = t10.customTypeParams.dataType(t10.fieldConfig), this.mapTo = t10.customTypeParams.toDriver, this.mapFrom = t10.customTypeParams.fromDriver;
        }
        getSQLType() {
          return this.sqlName;
        }
        mapFromDriverValue(e10) {
          return "function" == typeof this.mapFrom ? this.mapFrom(e10) : e10;
        }
        mapToDriverValue(e10) {
          return "function" == typeof this.mapTo ? this.mapTo(e10) : e10;
        }
      }
      class uw extends ck {
        static [ci] = "PgDateColumnBaseBuilder";
        defaultNow() {
          return this.default(cY`now()`);
        }
      }
      class uv extends uw {
        static [ci] = "PgDateBuilder";
        constructor(e10) {
          super(e10, "date", "PgDate");
        }
        build(e10) {
          return new u_(e10, this.config);
        }
      }
      class u_ extends cR {
        static [ci] = "PgDate";
        getSQLType() {
          return "date";
        }
        mapFromDriverValue(e10) {
          return "string" == typeof e10 ? new Date(e10) : e10;
        }
        mapToDriverValue(e10) {
          return e10.toISOString();
        }
      }
      class uS extends uw {
        static [ci] = "PgDateStringBuilder";
        constructor(e10) {
          super(e10, "string", "PgDateString");
        }
        build(e10) {
          return new uE(e10, this.config);
        }
      }
      class uE extends cR {
        static [ci] = "PgDateString";
        getSQLType() {
          return "date";
        }
        mapFromDriverValue(e10) {
          return "string" == typeof e10 ? e10 : e10.toISOString().slice(0, -14);
        }
      }
      class ux extends ck {
        static [ci] = "PgDoublePrecisionBuilder";
        constructor(e10) {
          super(e10, "number", "PgDoublePrecision");
        }
        build(e10) {
          return new uT(e10, this.config);
        }
      }
      class uT extends cR {
        static [ci] = "PgDoublePrecision";
        getSQLType() {
          return "double precision";
        }
        mapFromDriverValue(e10) {
          return "string" == typeof e10 ? Number.parseFloat(e10) : e10;
        }
      }
      class uC extends ck {
        static [ci] = "PgInetBuilder";
        constructor(e10) {
          super(e10, "string", "PgInet");
        }
        build(e10) {
          return new uA(e10, this.config);
        }
      }
      class uA extends cR {
        static [ci] = "PgInet";
        getSQLType() {
          return "inet";
        }
      }
      class uP extends ur {
        static [ci] = "PgIntegerBuilder";
        constructor(e10) {
          super(e10, "number", "PgInteger");
        }
        build(e10) {
          return new uk(e10, this.config);
        }
      }
      class uk extends cR {
        static [ci] = "PgInteger";
        getSQLType() {
          return "integer";
        }
        mapFromDriverValue(e10) {
          return "string" == typeof e10 ? Number.parseInt(e10) : e10;
        }
      }
      class uR extends ck {
        static [ci] = "PgIntervalBuilder";
        constructor(e10, t10) {
          super(e10, "string", "PgInterval"), this.config.intervalConfig = t10;
        }
        build(e10) {
          return new uO(e10, this.config);
        }
      }
      class uO extends cR {
        static [ci] = "PgInterval";
        fields = this.config.intervalConfig.fields;
        precision = this.config.intervalConfig.precision;
        getSQLType() {
          let e10 = this.fields ? ` ${this.fields}` : "", t10 = this.precision ? `(${this.precision})` : "";
          return `interval${e10}${t10}`;
        }
      }
      class uN extends ck {
        static [ci] = "PgJsonBuilder";
        constructor(e10) {
          super(e10, "json", "PgJson");
        }
        build(e10) {
          return new uI(e10, this.config);
        }
      }
      class uI extends cR {
        static [ci] = "PgJson";
        constructor(e10, t10) {
          super(e10, t10);
        }
        getSQLType() {
          return "json";
        }
        mapToDriverValue(e10) {
          return JSON.stringify(e10);
        }
        mapFromDriverValue(e10) {
          if ("string" == typeof e10) try {
            return JSON.parse(e10);
          } catch {
          }
          return e10;
        }
      }
      class u$ extends ck {
        static [ci] = "PgJsonbBuilder";
        constructor(e10) {
          super(e10, "json", "PgJsonb");
        }
        build(e10) {
          return new uD(e10, this.config);
        }
      }
      class uD extends cR {
        static [ci] = "PgJsonb";
        constructor(e10, t10) {
          super(e10, t10);
        }
        getSQLType() {
          return "jsonb";
        }
        mapToDriverValue(e10) {
          return JSON.stringify(e10);
        }
        mapFromDriverValue(e10) {
          if ("string" == typeof e10) try {
            return JSON.parse(e10);
          } catch {
          }
          return e10;
        }
      }
      class uL extends ck {
        static [ci] = "PgLineBuilder";
        constructor(e10) {
          super(e10, "array", "PgLine");
        }
        build(e10) {
          return new uU(e10, this.config);
        }
      }
      class uU extends cR {
        static [ci] = "PgLine";
        getSQLType() {
          return "line";
        }
        mapFromDriverValue(e10) {
          let [t10, r10, i10] = e10.slice(1, -1).split(",");
          return [Number.parseFloat(t10), Number.parseFloat(r10), Number.parseFloat(i10)];
        }
        mapToDriverValue(e10) {
          return `{${e10[0]},${e10[1]},${e10[2]}}`;
        }
      }
      class uj extends ck {
        static [ci] = "PgLineABCBuilder";
        constructor(e10) {
          super(e10, "json", "PgLineABC");
        }
        build(e10) {
          return new uM(e10, this.config);
        }
      }
      class uM extends cR {
        static [ci] = "PgLineABC";
        getSQLType() {
          return "line";
        }
        mapFromDriverValue(e10) {
          let [t10, r10, i10] = e10.slice(1, -1).split(",");
          return { a: Number.parseFloat(t10), b: Number.parseFloat(r10), c: Number.parseFloat(i10) };
        }
        mapToDriverValue(e10) {
          return `{${e10.a},${e10.b},${e10.c}}`;
        }
      }
      class uB extends ck {
        static [ci] = "PgMacaddrBuilder";
        constructor(e10) {
          super(e10, "string", "PgMacaddr");
        }
        build(e10) {
          return new uH(e10, this.config);
        }
      }
      class uH extends cR {
        static [ci] = "PgMacaddr";
        getSQLType() {
          return "macaddr";
        }
      }
      class uq extends ck {
        static [ci] = "PgMacaddr8Builder";
        constructor(e10) {
          super(e10, "string", "PgMacaddr8");
        }
        build(e10) {
          return new uF(e10, this.config);
        }
      }
      class uF extends cR {
        static [ci] = "PgMacaddr8";
        getSQLType() {
          return "macaddr8";
        }
      }
      class uW extends ck {
        static [ci] = "PgNumericBuilder";
        constructor(e10, t10, r10) {
          super(e10, "string", "PgNumeric"), this.config.precision = t10, this.config.scale = r10;
        }
        build(e10) {
          return new uK(e10, this.config);
        }
      }
      class uK extends cR {
        static [ci] = "PgNumeric";
        precision;
        scale;
        constructor(e10, t10) {
          super(e10, t10), this.precision = t10.precision, this.scale = t10.scale;
        }
        mapFromDriverValue(e10) {
          return "string" == typeof e10 ? e10 : String(e10);
        }
        getSQLType() {
          return void 0 !== this.precision && void 0 !== this.scale ? `numeric(${this.precision}, ${this.scale})` : void 0 === this.precision ? "numeric" : `numeric(${this.precision})`;
        }
      }
      class uV extends ck {
        static [ci] = "PgNumericNumberBuilder";
        constructor(e10, t10, r10) {
          super(e10, "number", "PgNumericNumber"), this.config.precision = t10, this.config.scale = r10;
        }
        build(e10) {
          return new uz(e10, this.config);
        }
      }
      class uz extends cR {
        static [ci] = "PgNumericNumber";
        precision;
        scale;
        constructor(e10, t10) {
          super(e10, t10), this.precision = t10.precision, this.scale = t10.scale;
        }
        mapFromDriverValue(e10) {
          return "number" == typeof e10 ? e10 : Number(e10);
        }
        mapToDriverValue = String;
        getSQLType() {
          return void 0 !== this.precision && void 0 !== this.scale ? `numeric(${this.precision}, ${this.scale})` : void 0 === this.precision ? "numeric" : `numeric(${this.precision})`;
        }
      }
      class uQ extends ck {
        static [ci] = "PgNumericBigIntBuilder";
        constructor(e10, t10, r10) {
          super(e10, "bigint", "PgNumericBigInt"), this.config.precision = t10, this.config.scale = r10;
        }
        build(e10) {
          return new uJ(e10, this.config);
        }
      }
      class uJ extends cR {
        static [ci] = "PgNumericBigInt";
        precision;
        scale;
        constructor(e10, t10) {
          super(e10, t10), this.precision = t10.precision, this.scale = t10.scale;
        }
        mapFromDriverValue = BigInt;
        mapToDriverValue = String;
        getSQLType() {
          return void 0 !== this.precision && void 0 !== this.scale ? `numeric(${this.precision}, ${this.scale})` : void 0 === this.precision ? "numeric" : `numeric(${this.precision})`;
        }
      }
      class uG extends ck {
        static [ci] = "PgPointTupleBuilder";
        constructor(e10) {
          super(e10, "array", "PgPointTuple");
        }
        build(e10) {
          return new uX(e10, this.config);
        }
      }
      class uX extends cR {
        static [ci] = "PgPointTuple";
        getSQLType() {
          return "point";
        }
        mapFromDriverValue(e10) {
          if ("string" == typeof e10) {
            let [t10, r10] = e10.slice(1, -1).split(",");
            return [Number.parseFloat(t10), Number.parseFloat(r10)];
          }
          return [e10.x, e10.y];
        }
        mapToDriverValue(e10) {
          return `(${e10[0]},${e10[1]})`;
        }
      }
      class uY extends ck {
        static [ci] = "PgPointObjectBuilder";
        constructor(e10) {
          super(e10, "json", "PgPointObject");
        }
        build(e10) {
          return new uZ(e10, this.config);
        }
      }
      class uZ extends cR {
        static [ci] = "PgPointObject";
        getSQLType() {
          return "point";
        }
        mapFromDriverValue(e10) {
          if ("string" == typeof e10) {
            let [t10, r10] = e10.slice(1, -1).split(",");
            return { x: Number.parseFloat(t10), y: Number.parseFloat(r10) };
          }
          return e10;
        }
        mapToDriverValue(e10) {
          return `(${e10.x},${e10.y})`;
        }
      }
      function u0(e10, t10) {
        let r10 = new DataView(new ArrayBuffer(8));
        for (let i10 = 0; i10 < 8; i10++) r10.setUint8(i10, e10[t10 + i10]);
        return r10.getFloat64(0, true);
      }
      function u1(e10) {
        let t10 = function(e11) {
          let t11 = [];
          for (let r11 = 0; r11 < e11.length; r11 += 2) t11.push(Number.parseInt(e11.slice(r11, r11 + 2), 16));
          return new Uint8Array(t11);
        }(e10), r10 = 0, i10 = t10[0];
        r10 += 1;
        let n10 = new DataView(t10.buffer), a10 = n10.getUint32(r10, 1 === i10);
        if (r10 += 4, 536870912 & a10 && (n10.getUint32(r10, 1 === i10), r10 += 4), (65535 & a10) == 1) {
          let e11 = u0(t10, r10), i11 = u0(t10, r10 += 8);
          return r10 += 8, [e11, i11];
        }
        throw Error("Unsupported geometry type");
      }
      class u2 extends ck {
        static [ci] = "PgGeometryBuilder";
        constructor(e10) {
          super(e10, "array", "PgGeometry");
        }
        build(e10) {
          return new u3(e10, this.config);
        }
      }
      class u3 extends cR {
        static [ci] = "PgGeometry";
        getSQLType() {
          return "geometry(point)";
        }
        mapFromDriverValue(e10) {
          return u1(e10);
        }
        mapToDriverValue(e10) {
          return `point(${e10[0]} ${e10[1]})`;
        }
      }
      class u4 extends ck {
        static [ci] = "PgGeometryObjectBuilder";
        constructor(e10) {
          super(e10, "json", "PgGeometryObject");
        }
        build(e10) {
          return new u5(e10, this.config);
        }
      }
      class u5 extends cR {
        static [ci] = "PgGeometryObject";
        getSQLType() {
          return "geometry(point)";
        }
        mapFromDriverValue(e10) {
          let t10 = u1(e10);
          return { x: t10[0], y: t10[1] };
        }
        mapToDriverValue(e10) {
          return `point(${e10.x} ${e10.y})`;
        }
      }
      class u6 extends ck {
        static [ci] = "PgRealBuilder";
        constructor(e10, t10) {
          super(e10, "number", "PgReal"), this.config.length = t10;
        }
        build(e10) {
          return new u8(e10, this.config);
        }
      }
      class u8 extends cR {
        static [ci] = "PgReal";
        constructor(e10, t10) {
          super(e10, t10);
        }
        getSQLType() {
          return "real";
        }
        mapFromDriverValue = (e10) => "string" == typeof e10 ? Number.parseFloat(e10) : e10;
      }
      class u9 extends ck {
        static [ci] = "PgSerialBuilder";
        constructor(e10) {
          super(e10, "number", "PgSerial"), this.config.hasDefault = true, this.config.notNull = true;
        }
        build(e10) {
          return new u7(e10, this.config);
        }
      }
      class u7 extends cR {
        static [ci] = "PgSerial";
        getSQLType() {
          return "serial";
        }
      }
      class de extends ur {
        static [ci] = "PgSmallIntBuilder";
        constructor(e10) {
          super(e10, "number", "PgSmallInt");
        }
        build(e10) {
          return new dt(e10, this.config);
        }
      }
      class dt extends cR {
        static [ci] = "PgSmallInt";
        getSQLType() {
          return "smallint";
        }
        mapFromDriverValue = (e10) => "string" == typeof e10 ? Number(e10) : e10;
      }
      class dr extends ck {
        static [ci] = "PgSmallSerialBuilder";
        constructor(e10) {
          super(e10, "number", "PgSmallSerial"), this.config.hasDefault = true, this.config.notNull = true;
        }
        build(e10) {
          return new di(e10, this.config);
        }
      }
      class di extends cR {
        static [ci] = "PgSmallSerial";
        getSQLType() {
          return "smallserial";
        }
      }
      class dn extends ck {
        static [ci] = "PgTextBuilder";
        constructor(e10, t10) {
          super(e10, "string", "PgText"), this.config.enumValues = t10.enum;
        }
        build(e10) {
          return new da(e10, this.config);
        }
      }
      class da extends cR {
        static [ci] = "PgText";
        enumValues = this.config.enumValues;
        getSQLType() {
          return "text";
        }
      }
      class ds extends uw {
        constructor(e10, t10, r10) {
          super(e10, "string", "PgTime"), this.withTimezone = t10, this.precision = r10, this.config.withTimezone = t10, this.config.precision = r10;
        }
        static [ci] = "PgTimeBuilder";
        build(e10) {
          return new dl(e10, this.config);
        }
      }
      class dl extends cR {
        static [ci] = "PgTime";
        withTimezone;
        precision;
        constructor(e10, t10) {
          super(e10, t10), this.withTimezone = t10.withTimezone, this.precision = t10.precision;
        }
        getSQLType() {
          let e10 = void 0 === this.precision ? "" : `(${this.precision})`;
          return `time${e10}${this.withTimezone ? " with time zone" : ""}`;
        }
      }
      class dc extends uw {
        static [ci] = "PgTimestampBuilder";
        constructor(e10, t10, r10) {
          super(e10, "date", "PgTimestamp"), this.config.withTimezone = t10, this.config.precision = r10;
        }
        build(e10) {
          return new du(e10, this.config);
        }
      }
      class du extends cR {
        static [ci] = "PgTimestamp";
        withTimezone;
        precision;
        constructor(e10, t10) {
          super(e10, t10), this.withTimezone = t10.withTimezone, this.precision = t10.precision;
        }
        getSQLType() {
          let e10 = void 0 === this.precision ? "" : ` (${this.precision})`;
          return `timestamp${e10}${this.withTimezone ? " with time zone" : ""}`;
        }
        mapFromDriverValue(e10) {
          return "string" == typeof e10 ? new Date(this.withTimezone ? e10 : e10 + "+0000") : e10;
        }
        mapToDriverValue = (e10) => e10.toISOString();
      }
      class dd extends uw {
        static [ci] = "PgTimestampStringBuilder";
        constructor(e10, t10, r10) {
          super(e10, "string", "PgTimestampString"), this.config.withTimezone = t10, this.config.precision = r10;
        }
        build(e10) {
          return new dh(e10, this.config);
        }
      }
      class dh extends cR {
        static [ci] = "PgTimestampString";
        withTimezone;
        precision;
        constructor(e10, t10) {
          super(e10, t10), this.withTimezone = t10.withTimezone, this.precision = t10.precision;
        }
        getSQLType() {
          let e10 = void 0 === this.precision ? "" : `(${this.precision})`;
          return `timestamp${e10}${this.withTimezone ? " with time zone" : ""}`;
        }
        mapFromDriverValue(e10) {
          if ("string" == typeof e10) return e10;
          let t10 = e10.toISOString().slice(0, -1).replace("T", " ");
          if (this.withTimezone) {
            let r10 = e10.getTimezoneOffset();
            return `${t10}${r10 <= 0 ? "+" : "-"}${Math.floor(Math.abs(r10) / 60).toString().padStart(2, "0")}`;
          }
          return t10;
        }
      }
      class dp extends ck {
        static [ci] = "PgUUIDBuilder";
        constructor(e10) {
          super(e10, "string", "PgUUID");
        }
        defaultRandom() {
          return this.default(cY`gen_random_uuid()`);
        }
        build(e10) {
          return new df(e10, this.config);
        }
      }
      class df extends cR {
        static [ci] = "PgUUID";
        getSQLType() {
          return "uuid";
        }
      }
      class dm extends ck {
        static [ci] = "PgVarcharBuilder";
        constructor(e10, t10) {
          super(e10, "string", "PgVarchar"), this.config.length = t10.length, this.config.enumValues = t10.enum;
        }
        build(e10) {
          return new dg(e10, this.config);
        }
      }
      class dg extends cR {
        static [ci] = "PgVarchar";
        length = this.config.length;
        enumValues = this.config.enumValues;
        getSQLType() {
          return void 0 === this.length ? "varchar" : `varchar(${this.length})`;
        }
      }
      class dy extends ck {
        static [ci] = "PgBinaryVectorBuilder";
        constructor(e10, t10) {
          super(e10, "string", "PgBinaryVector"), this.config.dimensions = t10.dimensions;
        }
        build(e10) {
          return new db(e10, this.config);
        }
      }
      class db extends cR {
        static [ci] = "PgBinaryVector";
        dimensions = this.config.dimensions;
        getSQLType() {
          return `bit(${this.dimensions})`;
        }
      }
      class dw extends ck {
        static [ci] = "PgHalfVectorBuilder";
        constructor(e10, t10) {
          super(e10, "array", "PgHalfVector"), this.config.dimensions = t10.dimensions;
        }
        build(e10) {
          return new dv(e10, this.config);
        }
      }
      class dv extends cR {
        static [ci] = "PgHalfVector";
        dimensions = this.config.dimensions;
        getSQLType() {
          return `halfvec(${this.dimensions})`;
        }
        mapToDriverValue(e10) {
          return JSON.stringify(e10);
        }
        mapFromDriverValue(e10) {
          return e10.slice(1, -1).split(",").map((e11) => Number.parseFloat(e11));
        }
      }
      class d_ extends ck {
        static [ci] = "PgSparseVectorBuilder";
        constructor(e10, t10) {
          super(e10, "string", "PgSparseVector"), this.config.dimensions = t10.dimensions;
        }
        build(e10) {
          return new dS(e10, this.config);
        }
      }
      class dS extends cR {
        static [ci] = "PgSparseVector";
        dimensions = this.config.dimensions;
        getSQLType() {
          return `sparsevec(${this.dimensions})`;
        }
      }
      class dE extends ck {
        static [ci] = "PgVectorBuilder";
        constructor(e10, t10) {
          super(e10, "array", "PgVector"), this.config.dimensions = t10.dimensions;
        }
        build(e10) {
          return new dx(e10, this.config);
        }
      }
      class dx extends cR {
        static [ci] = "PgVector";
        dimensions = this.config.dimensions;
        getSQLType() {
          return `vector(${this.dimensions})`;
        }
        mapToDriverValue(e10) {
          return JSON.stringify(e10);
        }
        mapFromDriverValue(e10) {
          return e10.slice(1, -1).split(",").map((e11) => Number.parseFloat(e11));
        }
      }
      let dT = Symbol.for("drizzle:PgInlineForeignKeys"), dC = Symbol.for("drizzle:EnableRLS");
      class dA extends cy {
        static [ci] = "PgTable";
        static Symbol = Object.assign({}, cy.Symbol, { InlineForeignKeys: dT, EnableRLS: dC });
        [dT] = [];
        [dC] = false;
        [cy.Symbol.ExtraConfigBuilder] = void 0;
        [cy.Symbol.ExtraConfigColumns] = {};
      }
      class dP {
        static [ci] = "PgPrimaryKeyBuilder";
        columns;
        name;
        constructor(e10, t10) {
          this.columns = e10, this.name = t10;
        }
        build(e10) {
          return new dk(e10, this.columns, this.name);
        }
      }
      class dk {
        constructor(e10, t10, r10) {
          this.table = e10, this.columns = t10, this.name = r10;
        }
        static [ci] = "PgPrimaryKey";
        columns;
        name;
        getName() {
          return this.name ?? `${this.table[dA.Symbol.Name]}_${this.columns.map((e10) => e10.name).join("_")}_pk`;
        }
      }
      function dR(e10, t10) {
        return "object" != typeof t10 || null === t10 || !("mapToDriverValue" in t10) || "function" != typeof t10.mapToDriverValue || cK(e10) || cn(e10, cX) || cn(e10, c1) || cn(e10, cw) || cn(e10, cy) || cn(e10, c4) ? e10 : new cX(e10, t10);
      }
      let dO = (e10, t10) => cY`${e10} = ${dR(t10, e10)}`, dN = (e10, t10) => cY`${e10} <> ${dR(t10, e10)}`;
      function dI(...e10) {
        let t10 = e10.filter((e11) => void 0 !== e11);
        if (0 !== t10.length) return new cz(1 === t10.length ? t10 : [new cV("("), cY.join(t10, new cV(" and ")), new cV(")")]);
      }
      function d$(...e10) {
        let t10 = e10.filter((e11) => void 0 !== e11);
        if (0 !== t10.length) return new cz(1 === t10.length ? t10 : [new cV("("), cY.join(t10, new cV(" or ")), new cV(")")]);
      }
      function dD(e10) {
        return cY`not ${e10}`;
      }
      let dL = (e10, t10) => cY`${e10} > ${dR(t10, e10)}`, dU = (e10, t10) => cY`${e10} >= ${dR(t10, e10)}`, dj = (e10, t10) => cY`${e10} < ${dR(t10, e10)}`, dM = (e10, t10) => cY`${e10} <= ${dR(t10, e10)}`;
      function dB(e10, t10) {
        return Array.isArray(t10) ? 0 === t10.length ? cY`false` : cY`${e10} in ${t10.map((t11) => dR(t11, e10))}` : cY`${e10} in ${dR(t10, e10)}`;
      }
      function dH(e10, t10) {
        return Array.isArray(t10) ? 0 === t10.length ? cY`true` : cY`${e10} not in ${t10.map((t11) => dR(t11, e10))}` : cY`${e10} not in ${dR(t10, e10)}`;
      }
      function dq(e10) {
        return cY`${e10} is null`;
      }
      function dF(e10) {
        return cY`${e10} is not null`;
      }
      function dW(e10) {
        return cY`exists ${e10}`;
      }
      function dK(e10) {
        return cY`not exists ${e10}`;
      }
      function dV(e10, t10, r10) {
        return cY`${e10} between ${dR(t10, e10)} and ${dR(r10, e10)}`;
      }
      function dz(e10, t10, r10) {
        return cY`${e10} not between ${dR(t10, e10)} and ${dR(r10, e10)}`;
      }
      function dQ(e10, t10) {
        return cY`${e10} like ${t10}`;
      }
      function dJ(e10, t10) {
        return cY`${e10} not like ${t10}`;
      }
      function dG(e10, t10) {
        return cY`${e10} ilike ${t10}`;
      }
      function dX(e10, t10) {
        return cY`${e10} not ilike ${t10}`;
      }
      function dY(e10) {
        return cY`${e10} asc`;
      }
      function dZ(e10) {
        return cY`${e10} desc`;
      }
      class d0 {
        constructor(e10, t10, r10) {
          this.sourceTable = e10, this.referencedTable = t10, this.relationName = r10, this.referencedTableName = t10[cy.Symbol.Name];
        }
        static [ci] = "Relation";
        referencedTableName;
        fieldName;
      }
      class d1 {
        constructor(e10, t10) {
          this.table = e10, this.config = t10;
        }
        static [ci] = "Relations";
      }
      class d2 extends d0 {
        constructor(e10, t10, r10, i10) {
          super(e10, t10, r10?.relationName), this.config = r10, this.isNullable = i10;
        }
        static [ci] = "One";
        withFieldName(e10) {
          let t10 = new d2(this.sourceTable, this.referencedTable, this.config, this.isNullable);
          return t10.fieldName = e10, t10;
        }
      }
      class d3 extends d0 {
        constructor(e10, t10, r10) {
          super(e10, t10, r10?.relationName), this.config = r10;
        }
        static [ci] = "Many";
        withFieldName(e10) {
          let t10 = new d3(this.sourceTable, this.referencedTable, this.config);
          return t10.fieldName = e10, t10;
        }
      }
      function d4(e10) {
        return { one: function(t10, r10) {
          return new d2(e10, t10, r10, r10?.fields.reduce((e11, t11) => e11 && t11.notNull, true) ?? false);
        }, many: function(t10, r10) {
          return new d3(e10, t10, r10);
        } };
      }
      class d5 {
        constructor(e10) {
          this.table = e10;
        }
        static [ci] = "ColumnAliasProxyHandler";
        get(e10, t10) {
          return "table" === t10 ? this.table : e10[t10];
        }
      }
      class d6 {
        constructor(e10, t10) {
          this.alias = e10, this.replaceOriginalName = t10;
        }
        static [ci] = "TableAliasProxyHandler";
        get(e10, t10) {
          if (t10 === cy.Symbol.IsAlias) return true;
          if (t10 === cy.Symbol.Name || this.replaceOriginalName && t10 === cy.Symbol.OriginalName) return this.alias;
          if (t10 === cF) return { ...e10[cF], name: this.alias, isAlias: true };
          if (t10 === cy.Symbol.Columns) {
            let t11 = e10[cy.Symbol.Columns];
            if (!t11) return t11;
            let r11 = {};
            return Object.keys(t11).map((i10) => {
              r11[i10] = new Proxy(t11[i10], new d5(new Proxy(e10, this)));
            }), r11;
          }
          let r10 = e10[t10];
          return cn(r10, cw) ? new Proxy(r10, new d5(new Proxy(e10, this))) : r10;
        }
      }
      class d8 {
        constructor(e10) {
          this.alias = e10;
        }
        static [ci] = "RelationTableAliasProxyHandler";
        get(e10, t10) {
          return "sourceTable" === t10 ? d9(e10.sourceTable, this.alias) : e10[t10];
        }
      }
      function d9(e10, t10) {
        return new Proxy(e10, new d6(t10, false));
      }
      function d7(e10, t10) {
        return new Proxy(e10, new d5(new Proxy(e10.table, new d6(t10, false))));
      }
      function he(e10, t10) {
        return new cz.Aliased(ht(e10.sql, t10), e10.fieldAlias);
      }
      function ht(e10, t10) {
        return cY.join(e10.queryChunks.map((e11) => cn(e11, cw) ? d7(e11, t10) : cn(e11, cz) ? ht(e11, t10) : cn(e11, cz.Aliased) ? he(e11, t10) : e11));
      }
      class hr {
        static [ci] = "SelectionProxyHandler";
        config;
        constructor(e10) {
          this.config = { ...e10 };
        }
        get(e10, t10) {
          if ("_" === t10) return { ...e10._, selectedFields: new Proxy(e10._.selectedFields, this) };
          if (t10 === cF) return { ...e10[cF], selectedFields: new Proxy(e10[cF].selectedFields, this) };
          if ("symbol" == typeof t10) return e10[t10];
          let r10 = (cn(e10, cB) ? e10._.selectedFields : cn(e10, c4) ? e10[cF].selectedFields : e10)[t10];
          if (cn(r10, cz.Aliased)) {
            if ("sql" === this.config.sqlAliasedBehavior && !r10.isSelectionField) return r10.sql;
            let e11 = r10.clone();
            return e11.isSelectionField = true, e11;
          }
          if (cn(r10, cz)) {
            if ("sql" === this.config.sqlBehavior) return r10;
            throw Error(`You tried to reference "${t10}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`);
          }
          return cn(r10, cw) ? this.config.alias ? new Proxy(r10, new d5(new Proxy(r10.table, new d6(this.config.alias, this.config.replaceOriginalName ?? false)))) : r10 : "object" != typeof r10 || null === r10 ? r10 : new Proxy(r10, new hr(this.config));
        }
      }
      function hi(e10) {
        return (e10.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []).map((e11) => e11.toLowerCase()).join("_");
      }
      function hn(e10) {
        return (e10.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []).reduce((e11, t10, r10) => e11 + (0 === r10 ? t10.toLowerCase() : `${t10[0].toUpperCase()}${t10.slice(1)}`), "");
      }
      function ha(e10) {
        return e10;
      }
      class hs {
        static [ci] = "CasingCache";
        cache = {};
        cachedTables = {};
        convert;
        constructor(e10) {
          this.convert = "snake_case" === e10 ? hi : "camelCase" === e10 ? hn : ha;
        }
        getColumnCasing(e10) {
          if (!e10.keyAsName) return e10.name;
          let t10 = e10.table[cy.Symbol.Schema] ?? "public", r10 = e10.table[cy.Symbol.OriginalName], i10 = `${t10}.${r10}.${e10.name}`;
          return this.cache[i10] || this.cacheTable(e10.table), this.cache[i10];
        }
        cacheTable(e10) {
          let t10 = e10[cy.Symbol.Schema] ?? "public", r10 = e10[cy.Symbol.OriginalName], i10 = `${t10}.${r10}`;
          if (!this.cachedTables[i10]) {
            for (let t11 of Object.values(e10[cy.Symbol.Columns])) {
              let e11 = `${i10}.${t11.name}`;
              this.cache[e11] = this.convert(t11.name);
            }
            this.cachedTables[i10] = true;
          }
        }
        clearCache() {
          this.cache = {}, this.cachedTables = {};
        }
      }
      class ho extends Error {
        static [ci] = "DrizzleError";
        constructor({ message: e10, cause: t10 }) {
          super(e10), this.name = "DrizzleError", this.cause = t10;
        }
      }
      class hl extends Error {
        constructor(e10, t10, r10) {
          super(`Failed query: ${e10}
params: ${t10}`), this.query = e10, this.params = t10, this.cause = r10, Error.captureStackTrace(this, hl), r10 && (this.cause = r10);
        }
      }
      class hc extends ho {
        static [ci] = "TransactionRollbackError";
        constructor() {
          super({ message: "Rollback" });
        }
      }
      class hu {
        static [ci] = "SQLiteForeignKeyBuilder";
        reference;
        _onUpdate;
        _onDelete;
        constructor(e10, t10) {
          this.reference = () => {
            let { name: t11, columns: r10, foreignColumns: i10 } = e10();
            return { name: t11, columns: r10, foreignTable: i10[0].table, foreignColumns: i10 };
          }, t10 && (this._onUpdate = t10.onUpdate, this._onDelete = t10.onDelete);
        }
        onUpdate(e10) {
          return this._onUpdate = e10, this;
        }
        onDelete(e10) {
          return this._onDelete = e10, this;
        }
        build(e10) {
          return new hd(e10, this);
        }
      }
      class hd {
        constructor(e10, t10) {
          this.table = e10, this.reference = t10.reference, this.onUpdate = t10._onUpdate, this.onDelete = t10._onDelete;
        }
        static [ci] = "SQLiteForeignKey";
        reference;
        onUpdate;
        onDelete;
        getName() {
          let { name: e10, columns: t10, foreignColumns: r10 } = this.reference(), i10 = t10.map((e11) => e11.name), n10 = r10.map((e11) => e11.name), a10 = [this.table[cl], ...i10, r10[0].table[cl], ...n10];
          return e10 ?? `${a10.join("_")}_fk`;
        }
      }
      function hh(e10, t10) {
        return `${e10[cl]}_${t10.join("_")}_unique`;
      }
      class hp {
        constructor(e10, t10) {
          this.name = t10, this.columns = e10;
        }
        static [ci] = "SQLiteUniqueConstraintBuilder";
        columns;
        build(e10) {
          return new hm(e10, this.columns, this.name);
        }
      }
      class hf {
        static [ci] = "SQLiteUniqueOnConstraintBuilder";
        name;
        constructor(e10) {
          this.name = e10;
        }
        on(...e10) {
          return new hp(e10, this.name);
        }
      }
      class hm {
        constructor(e10, t10, r10) {
          this.table = e10, this.columns = t10, this.name = r10 ?? hh(this.table, this.columns.map((e11) => e11.name));
        }
        static [ci] = "SQLiteUniqueConstraint";
        columns;
        name;
        getName() {
          return this.name;
        }
      }
      class hg extends cv {
        static [ci] = "SQLiteColumnBuilder";
        foreignKeyConfigs = [];
        references(e10, t10 = {}) {
          return this.foreignKeyConfigs.push({ ref: e10, actions: t10 }), this;
        }
        unique(e10) {
          return this.config.isUnique = true, this.config.uniqueName = e10, this;
        }
        generatedAlwaysAs(e10, t10) {
          return this.config.generated = { as: e10, type: "always", mode: t10?.mode ?? "virtual" }, this;
        }
        buildForeignKeys(e10, t10) {
          return this.foreignKeyConfigs.map(({ ref: r10, actions: i10 }) => {
            let n10;
            return n10 = new hu(() => ({ columns: [e10], foreignColumns: [r10()] })), i10.onUpdate && n10.onUpdate(i10.onUpdate), i10.onDelete && n10.onDelete(i10.onDelete), n10.build(t10);
          });
        }
      }
      class hy extends cw {
        constructor(e10, t10) {
          t10.uniqueName || (t10.uniqueName = hh(e10, [t10.name])), super(e10, t10), this.table = e10;
        }
        static [ci] = "SQLiteColumn";
      }
      class hb extends hg {
        static [ci] = "SQLiteBigIntBuilder";
        constructor(e10) {
          super(e10, "bigint", "SQLiteBigInt");
        }
        build(e10) {
          return new hw(e10, this.config);
        }
      }
      class hw extends hy {
        static [ci] = "SQLiteBigInt";
        getSQLType() {
          return "blob";
        }
        mapFromDriverValue(e10) {
          return void 0 !== eY.Buffer && eY.Buffer.from ? BigInt((eY.Buffer.isBuffer(e10) ? e10 : e10 instanceof ArrayBuffer ? eY.Buffer.from(e10) : e10.buffer ? eY.Buffer.from(e10.buffer, e10.byteOffset, e10.byteLength) : eY.Buffer.from(e10)).toString("utf8")) : BigInt(ut.decode(e10));
        }
        mapToDriverValue(e10) {
          return eY.Buffer.from(e10.toString());
        }
      }
      class hv extends hg {
        static [ci] = "SQLiteBlobJsonBuilder";
        constructor(e10) {
          super(e10, "json", "SQLiteBlobJson");
        }
        build(e10) {
          return new h_(e10, this.config);
        }
      }
      class h_ extends hy {
        static [ci] = "SQLiteBlobJson";
        getSQLType() {
          return "blob";
        }
        mapFromDriverValue(e10) {
          return void 0 !== eY.Buffer && eY.Buffer.from ? JSON.parse((eY.Buffer.isBuffer(e10) ? e10 : e10 instanceof ArrayBuffer ? eY.Buffer.from(e10) : e10.buffer ? eY.Buffer.from(e10.buffer, e10.byteOffset, e10.byteLength) : eY.Buffer.from(e10)).toString("utf8")) : JSON.parse(ut.decode(e10));
        }
        mapToDriverValue(e10) {
          return eY.Buffer.from(JSON.stringify(e10));
        }
      }
      class hS extends hg {
        static [ci] = "SQLiteBlobBufferBuilder";
        constructor(e10) {
          super(e10, "buffer", "SQLiteBlobBuffer");
        }
        build(e10) {
          return new hE(e10, this.config);
        }
      }
      class hE extends hy {
        static [ci] = "SQLiteBlobBuffer";
        mapFromDriverValue(e10) {
          return eY.Buffer.isBuffer(e10) ? e10 : eY.Buffer.from(e10);
        }
        getSQLType() {
          return "blob";
        }
      }
      function hx(e10, t10) {
        let { name: r10, config: i10 } = ue(e10, t10);
        return i10?.mode === "json" ? new hv(r10) : i10?.mode === "bigint" ? new hb(r10) : new hS(r10);
      }
      class hT extends hg {
        static [ci] = "SQLiteCustomColumnBuilder";
        constructor(e10, t10, r10) {
          super(e10, "custom", "SQLiteCustomColumn"), this.config.fieldConfig = t10, this.config.customTypeParams = r10;
        }
        build(e10) {
          return new hC(e10, this.config);
        }
      }
      class hC extends hy {
        static [ci] = "SQLiteCustomColumn";
        sqlName;
        mapTo;
        mapFrom;
        constructor(e10, t10) {
          super(e10, t10), this.sqlName = t10.customTypeParams.dataType(t10.fieldConfig), this.mapTo = t10.customTypeParams.toDriver, this.mapFrom = t10.customTypeParams.fromDriver;
        }
        getSQLType() {
          return this.sqlName;
        }
        mapFromDriverValue(e10) {
          return "function" == typeof this.mapFrom ? this.mapFrom(e10) : e10;
        }
        mapToDriverValue(e10) {
          return "function" == typeof this.mapTo ? this.mapTo(e10) : e10;
        }
      }
      function hA(e10) {
        return (t10, r10) => {
          let { name: i10, config: n10 } = ue(t10, r10);
          return new hT(i10, n10, e10);
        };
      }
      class hP extends hg {
        static [ci] = "SQLiteBaseIntegerBuilder";
        constructor(e10, t10, r10) {
          super(e10, t10, r10), this.config.autoIncrement = false;
        }
        primaryKey(e10) {
          return e10?.autoIncrement && (this.config.autoIncrement = true), this.config.hasDefault = true, super.primaryKey();
        }
      }
      class hk extends hy {
        static [ci] = "SQLiteBaseInteger";
        autoIncrement = this.config.autoIncrement;
        getSQLType() {
          return "integer";
        }
      }
      class hR extends hP {
        static [ci] = "SQLiteIntegerBuilder";
        constructor(e10) {
          super(e10, "number", "SQLiteInteger");
        }
        build(e10) {
          return new hO(e10, this.config);
        }
      }
      class hO extends hk {
        static [ci] = "SQLiteInteger";
      }
      class hN extends hP {
        static [ci] = "SQLiteTimestampBuilder";
        constructor(e10, t10) {
          super(e10, "date", "SQLiteTimestamp"), this.config.mode = t10;
        }
        defaultNow() {
          return this.default(cY`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
        }
        build(e10) {
          return new hI(e10, this.config);
        }
      }
      class hI extends hk {
        static [ci] = "SQLiteTimestamp";
        mode = this.config.mode;
        mapFromDriverValue(e10) {
          return new Date("timestamp" === this.config.mode ? 1e3 * e10 : e10);
        }
        mapToDriverValue(e10) {
          let t10 = e10.getTime();
          return "timestamp" === this.config.mode ? Math.floor(t10 / 1e3) : t10;
        }
      }
      class h$ extends hP {
        static [ci] = "SQLiteBooleanBuilder";
        constructor(e10, t10) {
          super(e10, "boolean", "SQLiteBoolean"), this.config.mode = t10;
        }
        build(e10) {
          return new hD(e10, this.config);
        }
      }
      class hD extends hk {
        static [ci] = "SQLiteBoolean";
        mode = this.config.mode;
        mapFromDriverValue(e10) {
          return 1 === Number(e10);
        }
        mapToDriverValue(e10) {
          return +!!e10;
        }
      }
      function hL(e10, t10) {
        let { name: r10, config: i10 } = ue(e10, t10);
        return i10?.mode === "timestamp" || i10?.mode === "timestamp_ms" ? new hN(r10, i10.mode) : i10?.mode === "boolean" ? new h$(r10, i10.mode) : new hR(r10);
      }
      class hU extends hg {
        static [ci] = "SQLiteNumericBuilder";
        constructor(e10) {
          super(e10, "string", "SQLiteNumeric");
        }
        build(e10) {
          return new hj(e10, this.config);
        }
      }
      class hj extends hy {
        static [ci] = "SQLiteNumeric";
        mapFromDriverValue(e10) {
          return "string" == typeof e10 ? e10 : String(e10);
        }
        getSQLType() {
          return "numeric";
        }
      }
      class hM extends hg {
        static [ci] = "SQLiteNumericNumberBuilder";
        constructor(e10) {
          super(e10, "number", "SQLiteNumericNumber");
        }
        build(e10) {
          return new hB(e10, this.config);
        }
      }
      class hB extends hy {
        static [ci] = "SQLiteNumericNumber";
        mapFromDriverValue(e10) {
          return "number" == typeof e10 ? e10 : Number(e10);
        }
        mapToDriverValue = String;
        getSQLType() {
          return "numeric";
        }
      }
      class hH extends hg {
        static [ci] = "SQLiteNumericBigIntBuilder";
        constructor(e10) {
          super(e10, "bigint", "SQLiteNumericBigInt");
        }
        build(e10) {
          return new hq(e10, this.config);
        }
      }
      class hq extends hy {
        static [ci] = "SQLiteNumericBigInt";
        mapFromDriverValue = BigInt;
        mapToDriverValue = String;
        getSQLType() {
          return "numeric";
        }
      }
      function hF(e10, t10) {
        let { name: r10, config: i10 } = ue(e10, t10), n10 = i10?.mode;
        return "number" === n10 ? new hM(r10) : "bigint" === n10 ? new hH(r10) : new hU(r10);
      }
      class hW extends hg {
        static [ci] = "SQLiteRealBuilder";
        constructor(e10) {
          super(e10, "number", "SQLiteReal");
        }
        build(e10) {
          return new hK(e10, this.config);
        }
      }
      class hK extends hy {
        static [ci] = "SQLiteReal";
        getSQLType() {
          return "real";
        }
      }
      function hV(e10) {
        return new hW(e10 ?? "");
      }
      class hz extends hg {
        static [ci] = "SQLiteTextBuilder";
        constructor(e10, t10) {
          super(e10, "string", "SQLiteText"), this.config.enumValues = t10.enum, this.config.length = t10.length;
        }
        build(e10) {
          return new hQ(e10, this.config);
        }
      }
      class hQ extends hy {
        static [ci] = "SQLiteText";
        enumValues = this.config.enumValues;
        length = this.config.length;
        constructor(e10, t10) {
          super(e10, t10);
        }
        getSQLType() {
          return `text${this.config.length ? `(${this.config.length})` : ""}`;
        }
      }
      class hJ extends hg {
        static [ci] = "SQLiteTextJsonBuilder";
        constructor(e10) {
          super(e10, "json", "SQLiteTextJson");
        }
        build(e10) {
          return new hG(e10, this.config);
        }
      }
      class hG extends hy {
        static [ci] = "SQLiteTextJson";
        getSQLType() {
          return "text";
        }
        mapFromDriverValue(e10) {
          return JSON.parse(e10);
        }
        mapToDriverValue(e10) {
          return JSON.stringify(e10);
        }
      }
      function hX(e10, t10 = {}) {
        let { name: r10, config: i10 } = ue(e10, t10);
        return "json" === i10.mode ? new hJ(r10) : new hz(r10, i10);
      }
      let hY = Symbol.for("drizzle:SQLiteInlineForeignKeys");
      class hZ extends cy {
        static [ci] = "SQLiteTable";
        static Symbol = Object.assign({}, cy.Symbol, { InlineForeignKeys: hY });
        [cy.Symbol.Columns];
        [hY] = [];
        [cy.Symbol.ExtraConfigBuilder] = void 0;
      }
      let h0 = (e10, t10, r10) => function(e11, t11, r11, i10 = e11) {
        let n10 = new hZ(e11, void 0, i10), a10 = Object.fromEntries(Object.entries("function" == typeof t11 ? t11({ blob: hx, customType: hA, integer: hL, numeric: hF, real: hV, text: hX }) : t11).map(([e12, t12]) => {
          t12.setName(e12);
          let r12 = t12.build(n10);
          return n10[hY].push(...t12.buildForeignKeys(r12, n10)), [e12, r12];
        })), s10 = Object.assign(n10, a10);
        return s10[cy.Symbol.Columns] = a10, s10[cy.Symbol.ExtraConfigColumns] = a10, r11 && (s10[hZ.Symbol.ExtraConfigBuilder] = r11), s10;
      }(e10, t10, r10);
      class h1 extends c4 {
        static [ci] = "SQLiteViewBase";
      }
      class h2 {
        static [ci] = "SQLiteDialect";
        casing;
        constructor(e10) {
          this.casing = new hs(e10?.casing);
        }
        escapeName(e10) {
          return `"${e10.replace(/"/g, '""')}"`;
        }
        escapeParam(e10) {
          return "?";
        }
        escapeString(e10) {
          return `'${e10.replace(/'/g, "''")}'`;
        }
        buildWithCTE(e10) {
          if (!e10?.length) return;
          let t10 = [cY`with `];
          for (let [r10, i10] of e10.entries()) t10.push(cY`${cY.identifier(i10._.alias)} as (${i10._.sql})`), r10 < e10.length - 1 && t10.push(cY`, `);
          return t10.push(cY` `), cY.join(t10);
        }
        buildDeleteQuery({ table: e10, where: t10, returning: r10, withList: i10, limit: n10, orderBy: a10 }) {
          let s10 = this.buildWithCTE(i10), o10 = r10 ? cY` returning ${this.buildSelection(r10, { isSingleTable: true })}` : void 0, l10 = t10 ? cY` where ${t10}` : void 0, c10 = this.buildOrderBy(a10), u10 = this.buildLimit(n10);
          return cY`${s10}delete from ${e10}${l10}${o10}${c10}${u10}`;
        }
        buildUpdateSet(e10, t10) {
          let r10 = e10[cy.Symbol.Columns], i10 = Object.keys(r10).filter((e11) => void 0 !== t10[e11] || r10[e11]?.onUpdateFn !== void 0), n10 = i10.length;
          return cY.join(i10.flatMap((e11, i11) => {
            let a10 = r10[e11], s10 = a10.onUpdateFn?.(), o10 = t10[e11] ?? (cn(s10, cz) ? s10 : cY.param(s10, a10)), l10 = cY`${cY.identifier(this.casing.getColumnCasing(a10))} = ${o10}`;
            return i11 < n10 - 1 ? [l10, cY.raw(", ")] : [l10];
          }));
        }
        buildUpdateQuery({ table: e10, set: t10, where: r10, returning: i10, withList: n10, joins: a10, from: s10, limit: o10, orderBy: l10 }) {
          let c10 = this.buildWithCTE(n10), u10 = this.buildUpdateSet(e10, t10), d10 = s10 && cY.join([cY.raw(" from "), this.buildFromTable(s10)]), h10 = this.buildJoins(a10), p10 = i10 ? cY` returning ${this.buildSelection(i10, { isSingleTable: true })}` : void 0, f2 = r10 ? cY` where ${r10}` : void 0, m2 = this.buildOrderBy(l10), g2 = this.buildLimit(o10);
          return cY`${c10}update ${e10} set ${u10}${d10}${h10}${f2}${p10}${m2}${g2}`;
        }
        buildSelection(e10, { isSingleTable: t10 = false } = {}) {
          let r10 = e10.length, i10 = e10.flatMap(({ field: e11 }, i11) => {
            let n10 = [];
            if (cn(e11, cz.Aliased) && e11.isSelectionField) n10.push(cY.identifier(e11.fieldAlias));
            else if (cn(e11, cz.Aliased) || cn(e11, cz)) {
              let r11 = cn(e11, cz.Aliased) ? e11.sql : e11;
              t10 ? n10.push(new cz(r11.queryChunks.map((e12) => cn(e12, cw) ? cY.identifier(this.casing.getColumnCasing(e12)) : e12))) : n10.push(r11), cn(e11, cz.Aliased) && n10.push(cY` as ${cY.identifier(e11.fieldAlias)}`);
            } else if (cn(e11, cw)) {
              let r11 = e11.table[cy.Symbol.Name];
              "SQLiteNumericBigInt" === e11.columnType ? t10 ? n10.push(cY`cast(${cY.identifier(this.casing.getColumnCasing(e11))} as text)`) : n10.push(cY`cast(${cY.identifier(r11)}.${cY.identifier(this.casing.getColumnCasing(e11))} as text)`) : t10 ? n10.push(cY.identifier(this.casing.getColumnCasing(e11))) : n10.push(cY`${cY.identifier(r11)}.${cY.identifier(this.casing.getColumnCasing(e11))}`);
            } else if (cn(e11, cB)) {
              let t11 = Object.entries(e11._.selectedFields);
              if (1 === t11.length) {
                let r11 = t11[0][1], i12 = cn(r11, cz) ? r11.decoder : cn(r11, cw) ? { mapFromDriverValue: (e12) => r11.mapFromDriverValue(e12) } : r11.sql.decoder;
                i12 && (e11._.sql.decoder = i12);
              }
              n10.push(e11);
            }
            return i11 < r10 - 1 && n10.push(cY`, `), n10;
          });
          return cY.join(i10);
        }
        buildJoins(e10) {
          if (!e10 || 0 === e10.length) return;
          let t10 = [];
          if (e10) for (let [r10, i10] of e10.entries()) {
            0 === r10 && t10.push(cY` `);
            let n10 = i10.table, a10 = i10.on ? cY` on ${i10.on}` : void 0;
            if (cn(n10, hZ)) {
              let e11 = n10[hZ.Symbol.Name], r11 = n10[hZ.Symbol.Schema], s10 = n10[hZ.Symbol.OriginalName], o10 = e11 === s10 ? void 0 : i10.alias;
              t10.push(cY`${cY.raw(i10.joinType)} join ${r11 ? cY`${cY.identifier(r11)}.` : void 0}${cY.identifier(s10)}${o10 && cY` ${cY.identifier(o10)}`}${a10}`);
            } else t10.push(cY`${cY.raw(i10.joinType)} join ${n10}${a10}`);
            r10 < e10.length - 1 && t10.push(cY` `);
          }
          return cY.join(t10);
        }
        buildLimit(e10) {
          return "object" == typeof e10 || "number" == typeof e10 && e10 >= 0 ? cY` limit ${e10}` : void 0;
        }
        buildOrderBy(e10) {
          let t10 = [];
          if (e10) for (let [r10, i10] of e10.entries()) t10.push(i10), r10 < e10.length - 1 && t10.push(cY`, `);
          return t10.length > 0 ? cY` order by ${cY.join(t10)}` : void 0;
        }
        buildFromTable(e10) {
          return cn(e10, cy) && e10[cy.Symbol.IsAlias] ? cY`${cY`${cY.identifier(e10[cy.Symbol.Schema] ?? "")}.`.if(e10[cy.Symbol.Schema])}${cY.identifier(e10[cy.Symbol.OriginalName])} ${cY.identifier(e10[cy.Symbol.Name])}` : e10;
        }
        buildSelectQuery({ withList: e10, fields: t10, fieldsFlat: r10, where: i10, having: n10, table: a10, joins: s10, orderBy: o10, groupBy: l10, limit: c10, offset: u10, distinct: d10, setOperators: h10 }) {
          let p10 = r10 ?? c6(t10);
          for (let e11 of p10) {
            let t11;
            if (cn(e11.field, cw) && e11.field.table[cl] !== (cn(a10, cB) ? a10._.alias : cn(a10, h1) ? a10[cF].name : cn(a10, cz) ? void 0 : a10[cl]) && (t11 = e11.field.table, !s10?.some(({ alias: e12 }) => e12 === (t11[cy.Symbol.IsAlias] ? t11[cl] : t11[cy.Symbol.BaseName])))) {
              let t12 = e11.field.table[cl];
              throw Error(`Your "${e11.path.join("->")}" field references a column "${t12}"."${e11.field.name}", but the table "${t12}" is not part of the query! Did you forget to join it?`);
            }
          }
          let f2 = !s10 || 0 === s10.length, m2 = this.buildWithCTE(e10), g2 = d10 ? cY` distinct` : void 0, y2 = this.buildSelection(p10, { isSingleTable: f2 }), b2 = this.buildFromTable(a10), w2 = this.buildJoins(s10), v2 = i10 ? cY` where ${i10}` : void 0, _2 = n10 ? cY` having ${n10}` : void 0, S2 = [];
          if (l10) for (let [e11, t11] of l10.entries()) S2.push(t11), e11 < l10.length - 1 && S2.push(cY`, `);
          let E2 = S2.length > 0 ? cY` group by ${cY.join(S2)}` : void 0, x2 = this.buildOrderBy(o10), T2 = this.buildLimit(c10), C2 = u10 ? cY` offset ${u10}` : void 0, A2 = cY`${m2}select${g2} ${y2} from ${b2}${w2}${v2}${E2}${_2}${x2}${T2}${C2}`;
          return h10.length > 0 ? this.buildSetOperations(A2, h10) : A2;
        }
        buildSetOperations(e10, t10) {
          let [r10, ...i10] = t10;
          if (!r10) throw Error("Cannot pass undefined values to any set operator");
          return 0 === i10.length ? this.buildSetOperationQuery({ leftSelect: e10, setOperator: r10 }) : this.buildSetOperations(this.buildSetOperationQuery({ leftSelect: e10, setOperator: r10 }), i10);
        }
        buildSetOperationQuery({ leftSelect: e10, setOperator: { type: t10, isAll: r10, rightSelect: i10, limit: n10, orderBy: a10, offset: s10 } }) {
          let o10, l10 = cY`${e10.getSQL()} `, c10 = cY`${i10.getSQL()}`;
          if (a10 && a10.length > 0) {
            let e11 = [];
            for (let t11 of a10) if (cn(t11, hy)) e11.push(cY.identifier(t11.name));
            else if (cn(t11, cz)) {
              for (let e12 = 0; e12 < t11.queryChunks.length; e12++) {
                let r11 = t11.queryChunks[e12];
                cn(r11, hy) && (t11.queryChunks[e12] = cY.identifier(this.casing.getColumnCasing(r11)));
              }
              e11.push(cY`${t11}`);
            } else e11.push(cY`${t11}`);
            o10 = cY` order by ${cY.join(e11, cY`, `)}`;
          }
          let u10 = "object" == typeof n10 || "number" == typeof n10 && n10 >= 0 ? cY` limit ${n10}` : void 0, d10 = cY.raw(`${t10} ${r10 ? "all " : ""}`), h10 = s10 ? cY` offset ${s10}` : void 0;
          return cY`${l10}${d10}${c10}${o10}${u10}${h10}`;
        }
        buildInsertQuery({ table: e10, values: t10, onConflict: r10, returning: i10, withList: n10, select: a10 }) {
          let s10 = [], o10 = Object.entries(e10[cy.Symbol.Columns]).filter(([e11, t11]) => !t11.shouldDisableInsert()), l10 = o10.map(([, e11]) => cY.identifier(this.casing.getColumnCasing(e11)));
          if (a10) cn(t10, cz) ? s10.push(t10) : s10.push(t10.getSQL());
          else for (let [e11, r11] of (s10.push(cY.raw("values ")), t10.entries())) {
            let i11 = [];
            for (let [e12, t11] of o10) {
              let n11 = r11[e12];
              if (void 0 === n11 || cn(n11, cX) && void 0 === n11.value) {
                let e13;
                if (null !== t11.default && void 0 !== t11.default) e13 = cn(t11.default, cz) ? t11.default : cY.param(t11.default, t11);
                else if (void 0 !== t11.defaultFn) {
                  let r12 = t11.defaultFn();
                  e13 = cn(r12, cz) ? r12 : cY.param(r12, t11);
                } else if (t11.default || void 0 === t11.onUpdateFn) e13 = cY`null`;
                else {
                  let r12 = t11.onUpdateFn();
                  e13 = cn(r12, cz) ? r12 : cY.param(r12, t11);
                }
                i11.push(e13);
              } else i11.push(n11);
            }
            s10.push(i11), e11 < t10.length - 1 && s10.push(cY`, `);
          }
          let c10 = this.buildWithCTE(n10), u10 = cY.join(s10), d10 = i10 ? cY` returning ${this.buildSelection(i10, { isSingleTable: true })}` : void 0, h10 = r10?.length ? cY.join(r10) : void 0;
          return cY`${c10}insert into ${e10} ${l10} ${u10}${h10}${d10}`;
        }
        sqlToQuery(e10, t10) {
          return e10.toQuery({ casing: this.casing, escapeName: this.escapeName, escapeParam: this.escapeParam, escapeString: this.escapeString, invokeSource: t10 });
        }
        buildRelationalQuery({ fullSchema: e10, schema: t10, tableNamesMap: r10, table: i10, tableConfig: n10, queryConfig: a10, tableAlias: s10, nestedQueryRelation: o10, joinOn: l10 }) {
          let c10, u10 = [], d10, h10, p10 = [], f2, m2 = [];
          if (true === a10) u10 = Object.entries(n10.columns).map(([e11, t11]) => ({ dbKey: t11.name, tsKey: e11, field: d7(t11, s10), relationTableTsKey: void 0, isJson: false, selection: [] }));
          else {
            let i11 = Object.fromEntries(Object.entries(n10.columns).map(([e11, t11]) => [e11, d7(t11, s10)]));
            if (a10.where) {
              let e11 = "function" == typeof a10.where ? a10.where(i11, { and: dI, between: dV, eq: dO, exists: dW, gt: dL, gte: dU, ilike: dG, inArray: dB, isNull: dq, isNotNull: dF, like: dQ, lt: dj, lte: dM, ne: dN, not: dD, notBetween: dz, notExists: dK, notLike: dJ, notIlike: dX, notInArray: dH, or: d$, sql: cY }) : a10.where;
              f2 = e11 && ht(e11, s10);
            }
            let o11 = [], l11 = [];
            if (a10.columns) {
              let e11 = false;
              for (let [t11, r11] of Object.entries(a10.columns)) void 0 !== r11 && t11 in n10.columns && (e11 || true !== r11 || (e11 = true), l11.push(t11));
              l11.length > 0 && (l11 = e11 ? l11.filter((e12) => a10.columns?.[e12] === true) : Object.keys(n10.columns).filter((e12) => !l11.includes(e12)));
            } else l11 = Object.keys(n10.columns);
            for (let e11 of l11) {
              let t11 = n10.columns[e11];
              o11.push({ tsKey: e11, value: t11 });
            }
            let c11 = [];
            if (a10.with && (c11 = Object.entries(a10.with).filter((e11) => !!e11[1]).map(([e11, t11]) => ({ tsKey: e11, queryConfig: t11, relation: n10.relations[e11] }))), a10.extras) for (let [e11, t11] of Object.entries("function" == typeof a10.extras ? a10.extras(i11, { sql: cY }) : a10.extras)) o11.push({ tsKey: e11, value: he(t11, s10) });
            for (let { tsKey: e11, value: t11 } of o11) u10.push({ dbKey: cn(t11, cz.Aliased) ? t11.fieldAlias : n10.columns[e11].name, tsKey: e11, field: cn(t11, cw) ? d7(t11, s10) : t11, relationTableTsKey: void 0, isJson: false, selection: [] });
            let m3 = "function" == typeof a10.orderBy ? a10.orderBy(i11, { sql: cY, asc: dY, desc: dZ }) : a10.orderBy ?? [];
            for (let { tsKey: i12, queryConfig: n11, relation: o12 } of (Array.isArray(m3) || (m3 = [m3]), p10 = m3.map((e11) => cn(e11, cw) ? d7(e11, s10) : ht(e11, s10)), d10 = a10.limit, h10 = a10.offset, c11)) {
              let a11 = function(e11, t11, r11) {
                if (cn(r11, d2) && r11.config) return { fields: r11.config.fields, references: r11.config.references };
                let i13 = t11[cb(r11.referencedTable)];
                if (!i13) throw Error(`Table "${r11.referencedTable[cy.Symbol.Name]}" not found in schema`);
                let n12 = e11[i13];
                if (!n12) throw Error(`Table "${i13}" not found in schema`);
                let a12 = r11.sourceTable, s11 = t11[cb(a12)];
                if (!s11) throw Error(`Table "${a12[cy.Symbol.Name]}" not found in schema`);
                let o13 = [];
                for (let e12 of Object.values(n12.relations)) (r11.relationName && r11 !== e12 && e12.relationName === r11.relationName || !r11.relationName && e12.referencedTable === r11.sourceTable) && o13.push(e12);
                if (o13.length > 1) throw r11.relationName ? Error(`There are multiple relations with name "${r11.relationName}" in table "${i13}"`) : Error(`There are multiple relations between "${i13}" and "${r11.sourceTable[cy.Symbol.Name]}". Please specify relation name`);
                if (o13[0] && cn(o13[0], d2) && o13[0].config) return { fields: o13[0].config.references, references: o13[0].config.fields };
                throw Error(`There is not enough information to infer relation "${s11}.${r11.fieldName}"`);
              }(t10, r10, o12), l12 = r10[cb(o12.referencedTable)], c12 = `${s10}_${i12}`, d11 = dI(...a11.fields.map((e11, t11) => dO(d7(a11.references[t11], c12), d7(e11, s10)))), h11 = this.buildRelationalQuery({ fullSchema: e10, schema: t10, tableNamesMap: r10, table: e10[l12], tableConfig: t10[l12], queryConfig: cn(o12, d2) ? true === n11 ? { limit: 1 } : { ...n11, limit: 1 } : n11, tableAlias: c12, joinOn: d11, nestedQueryRelation: o12 }), p11 = cY`(${h11.sql})`.as(i12);
              u10.push({ dbKey: i12, tsKey: i12, field: p11, relationTableTsKey: l12, isJson: true, selection: h11.selection });
            }
          }
          if (0 === u10.length) throw new ho({ message: `No fields selected for table "${n10.tsName}" ("${s10}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.` });
          if (f2 = dI(l10, f2), o10) {
            let e11 = cY`json_array(${cY.join(u10.map(({ field: e12 }) => cn(e12, hy) ? cY.identifier(this.casing.getColumnCasing(e12)) : cn(e12, cz.Aliased) ? e12.sql : e12), cY`, `)})`;
            cn(o10, d3) && (e11 = cY`coalesce(json_group_array(${e11}), json_array())`);
            let t11 = [{ dbKey: "data", tsKey: "data", field: e11.as("data"), isJson: true, relationTableTsKey: n10.tsName, selection: u10 }];
            void 0 !== d10 || void 0 !== h10 || p10.length > 0 ? (c10 = this.buildSelectQuery({ table: d9(i10, s10), fields: {}, fieldsFlat: [{ path: [], field: cY.raw("*") }], where: f2, limit: d10, offset: h10, orderBy: p10, setOperators: [] }), f2 = void 0, d10 = void 0, h10 = void 0, p10 = void 0) : c10 = d9(i10, s10), c10 = this.buildSelectQuery({ table: cn(c10, hZ) ? c10 : new cB(c10, {}, s10), fields: {}, fieldsFlat: t11.map(({ field: e12 }) => ({ path: [], field: cn(e12, cw) ? d7(e12, s10) : e12 })), joins: m2, where: f2, limit: d10, offset: h10, orderBy: p10, setOperators: [] });
          } else c10 = this.buildSelectQuery({ table: d9(i10, s10), fields: {}, fieldsFlat: u10.map(({ field: e11 }) => ({ path: [], field: cn(e11, cw) ? d7(e11, s10) : e11 })), joins: m2, where: f2, limit: d10, offset: h10, orderBy: p10, setOperators: [] });
          return { tableTsKey: n10.tsName, sql: c10, selection: u10 };
        }
      }
      class h3 extends h2 {
        static [ci] = "SQLiteSyncDialect";
        migrate(e10, t10, r10) {
          let i10 = void 0 === r10 || "string" == typeof r10 ? "__drizzle_migrations" : r10.migrationsTable ?? "__drizzle_migrations", n10 = cY`
			CREATE TABLE IF NOT EXISTS ${cY.identifier(i10)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
          t10.run(n10);
          let a10 = t10.values(cY`SELECT id, hash, created_at FROM ${cY.identifier(i10)} ORDER BY created_at DESC LIMIT 1`)[0] ?? void 0;
          t10.run(cY`BEGIN`);
          try {
            for (let r11 of e10) if (!a10 || Number(a10[2]) < r11.folderMillis) {
              for (let e11 of r11.sql) t10.run(cY.raw(e11));
              t10.run(cY`INSERT INTO ${cY.identifier(i10)} ("hash", "created_at") VALUES(${r11.hash}, ${r11.folderMillis})`);
            }
            t10.run(cY`COMMIT`);
          } catch (e11) {
            throw t10.run(cY`ROLLBACK`), e11;
          }
        }
      }
      class h4 extends h2 {
        static [ci] = "SQLiteAsyncDialect";
        async migrate(e10, t10, r10) {
          let i10 = void 0 === r10 || "string" == typeof r10 ? "__drizzle_migrations" : r10.migrationsTable ?? "__drizzle_migrations", n10 = cY`
			CREATE TABLE IF NOT EXISTS ${cY.identifier(i10)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
          await t10.run(n10);
          let a10 = (await t10.values(cY`SELECT id, hash, created_at FROM ${cY.identifier(i10)} ORDER BY created_at DESC LIMIT 1`))[0] ?? void 0;
          await t10.transaction(async (t11) => {
            for (let r11 of e10) if (!a10 || Number(a10[2]) < r11.folderMillis) {
              for (let e11 of r11.sql) await t11.run(cY.raw(e11));
              await t11.run(cY`INSERT INTO ${cY.identifier(i10)} ("hash", "created_at") VALUES(${r11.hash}, ${r11.folderMillis})`);
            }
          });
        }
      }
      class h5 {
        static [ci] = "TypedQueryBuilder";
        getSelectedFields() {
          return this._.selectedFields;
        }
      }
      class h6 {
        static [ci] = "QueryPromise";
        [Symbol.toStringTag] = "QueryPromise";
        catch(e10) {
          return this.then(void 0, e10);
        }
        finally(e10) {
          return this.then((t10) => (e10?.(), t10), (t10) => {
            throw e10?.(), t10;
          });
        }
        then(e10, t10) {
          return this.execute().then(e10, t10);
        }
      }
      class h8 {
        constructor(e10, t10) {
          this.name = e10, this.value = t10;
        }
        static [ci] = "SQLiteCheckBuilder";
        brand;
        build(e10) {
          return new h9(e10, this);
        }
      }
      class h9 {
        constructor(e10, t10) {
          this.table = e10, this.name = t10.name, this.value = t10.value;
        }
        static [ci] = "SQLiteCheck";
        name;
        value;
      }
      class h7 {
        constructor(e10, t10) {
          this.name = e10, this.unique = t10;
        }
        static [ci] = "SQLiteIndexBuilderOn";
        on(...e10) {
          return new pe(this.name, e10, this.unique);
        }
      }
      class pe {
        static [ci] = "SQLiteIndexBuilder";
        config;
        constructor(e10, t10, r10) {
          this.config = { name: e10, columns: t10, unique: r10, where: void 0 };
        }
        where(e10) {
          return this.config.where = e10, this;
        }
        build(e10) {
          return new pt(this.config, e10);
        }
      }
      class pt {
        static [ci] = "SQLiteIndex";
        config;
        constructor(e10, t10) {
          this.config = { ...e10, table: t10 };
        }
      }
      class pr {
        static [ci] = "SQLitePrimaryKeyBuilder";
        columns;
        name;
        constructor(e10, t10) {
          this.columns = e10, this.name = t10;
        }
        build(e10) {
          return new pi(e10, this.columns, this.name);
        }
      }
      class pi {
        constructor(e10, t10, r10) {
          this.table = e10, this.columns = t10, this.name = r10;
        }
        static [ci] = "SQLitePrimaryKey";
        columns;
        name;
        getName() {
          return this.name ?? `${this.table[hZ.Symbol.Name]}_${this.columns.map((e10) => e10.name).join("_")}_pk`;
        }
      }
      function pn(e10) {
        return cn(e10, hZ) ? [`${e10[cy.Symbol.BaseName]}`] : cn(e10, cB) ? e10._.usedTables ?? [] : cn(e10, cz) ? e10.usedTables ?? [] : [];
      }
      class pa {
        static [ci] = "SQLiteSelectBuilder";
        fields;
        session;
        dialect;
        withList;
        distinct;
        constructor(e10) {
          this.fields = e10.fields, this.session = e10.session, this.dialect = e10.dialect, this.withList = e10.withList, this.distinct = e10.distinct;
        }
        from(e10) {
          let t10, r10 = !!this.fields;
          return t10 = this.fields ? this.fields : cn(e10, cB) ? Object.fromEntries(Object.keys(e10._.selectedFields).map((t11) => [t11, e10[t11]])) : cn(e10, h1) ? e10[cF].selectedFields : cn(e10, cz) ? {} : e10[cy.Symbol.Columns], new po({ table: e10, fields: t10, isPartialSelect: r10, session: this.session, dialect: this.dialect, withList: this.withList, distinct: this.distinct });
        }
      }
      class ps extends h5 {
        static [ci] = "SQLiteSelectQueryBuilder";
        _;
        config;
        joinsNotNullableMap;
        tableName;
        isPartialSelect;
        session;
        dialect;
        cacheConfig = void 0;
        usedTables = /* @__PURE__ */ new Set();
        constructor({ table: e10, fields: t10, isPartialSelect: r10, session: i10, dialect: n10, withList: a10, distinct: s10 }) {
          for (const o10 of (super(), this.config = { withList: a10, table: e10, fields: { ...t10 }, distinct: s10, setOperators: [] }, this.isPartialSelect = r10, this.session = i10, this.dialect = n10, this._ = { selectedFields: t10, config: this.config }, this.tableName = c7(e10), this.joinsNotNullableMap = "string" == typeof this.tableName ? { [this.tableName]: true } : {}, pn(e10))) this.usedTables.add(o10);
        }
        getUsedTables() {
          return [...this.usedTables];
        }
        createJoin(e10) {
          return (t10, r10) => {
            let i10 = this.tableName, n10 = c7(t10);
            for (let e11 of pn(t10)) this.usedTables.add(e11);
            if ("string" == typeof n10 && this.config.joins?.some((e11) => e11.alias === n10)) throw Error(`Alias "${n10}" is already used in this query`);
            if (!this.isPartialSelect && (1 === Object.keys(this.joinsNotNullableMap).length && "string" == typeof i10 && (this.config.fields = { [i10]: this.config.fields }), "string" == typeof n10 && !cn(t10, cz))) {
              let e11 = cn(t10, cB) ? t10._.selectedFields : cn(t10, c4) ? t10[cF].selectedFields : t10[cy.Symbol.Columns];
              this.config.fields[n10] = e11;
            }
            if ("function" == typeof r10 && (r10 = r10(new Proxy(this.config.fields, new hr({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })))), this.config.joins || (this.config.joins = []), this.config.joins.push({ on: r10, table: t10, joinType: e10, alias: n10 }), "string" == typeof n10) switch (e10) {
              case "left":
                this.joinsNotNullableMap[n10] = false;
                break;
              case "right":
                this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([e11]) => [e11, false])), this.joinsNotNullableMap[n10] = true;
                break;
              case "cross":
              case "inner":
                this.joinsNotNullableMap[n10] = true;
                break;
              case "full":
                this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([e11]) => [e11, false])), this.joinsNotNullableMap[n10] = false;
            }
            return this;
          };
        }
        leftJoin = this.createJoin("left");
        rightJoin = this.createJoin("right");
        innerJoin = this.createJoin("inner");
        fullJoin = this.createJoin("full");
        crossJoin = this.createJoin("cross");
        createSetOperator(e10, t10) {
          return (r10) => {
            let i10 = "function" == typeof r10 ? r10(pc()) : r10;
            if (!c8(this.getSelectedFields(), i10.getSelectedFields())) throw Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
            return this.config.setOperators.push({ type: e10, isAll: t10, rightSelect: i10 }), this;
          };
        }
        union = this.createSetOperator("union", false);
        unionAll = this.createSetOperator("union", true);
        intersect = this.createSetOperator("intersect", false);
        except = this.createSetOperator("except", false);
        addSetOperators(e10) {
          return this.config.setOperators.push(...e10), this;
        }
        where(e10) {
          return "function" == typeof e10 && (e10 = e10(new Proxy(this.config.fields, new hr({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })))), this.config.where = e10, this;
        }
        having(e10) {
          return "function" == typeof e10 && (e10 = e10(new Proxy(this.config.fields, new hr({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })))), this.config.having = e10, this;
        }
        groupBy(...e10) {
          if ("function" == typeof e10[0]) {
            let t10 = e10[0](new Proxy(this.config.fields, new hr({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
            this.config.groupBy = Array.isArray(t10) ? t10 : [t10];
          } else this.config.groupBy = e10;
          return this;
        }
        orderBy(...e10) {
          if ("function" == typeof e10[0]) {
            let t10 = e10[0](new Proxy(this.config.fields, new hr({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" }))), r10 = Array.isArray(t10) ? t10 : [t10];
            this.config.setOperators.length > 0 ? this.config.setOperators.at(-1).orderBy = r10 : this.config.orderBy = r10;
          } else this.config.setOperators.length > 0 ? this.config.setOperators.at(-1).orderBy = e10 : this.config.orderBy = e10;
          return this;
        }
        limit(e10) {
          return this.config.setOperators.length > 0 ? this.config.setOperators.at(-1).limit = e10 : this.config.limit = e10, this;
        }
        offset(e10) {
          return this.config.setOperators.length > 0 ? this.config.setOperators.at(-1).offset = e10 : this.config.offset = e10, this;
        }
        getSQL() {
          return this.dialect.buildSelectQuery(this.config);
        }
        toSQL() {
          let { typings: e10, ...t10 } = this.dialect.sqlToQuery(this.getSQL());
          return t10;
        }
        as(e10) {
          let t10 = [];
          if (t10.push(...pn(this.config.table)), this.config.joins) for (let e11 of this.config.joins) t10.push(...pn(e11.table));
          return new Proxy(new cB(this.getSQL(), this.config.fields, e10, false, [...new Set(t10)]), new hr({ alias: e10, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
        }
        getSelectedFields() {
          return new Proxy(this.config.fields, new hr({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
        }
        $dynamic() {
          return this;
        }
      }
      class po extends ps {
        static [ci] = "SQLiteSelect";
        _prepare(e10 = true) {
          if (!this.session) throw Error("Cannot execute a query on a query builder. Please use a database instance instead.");
          let t10 = c6(this.config.fields), r10 = this.session[e10 ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), t10, "all", true, void 0, { type: "select", tables: [...this.usedTables] }, this.cacheConfig);
          return r10.joinsNotNullableMap = this.joinsNotNullableMap, r10;
        }
        $withCache(e10) {
          return this.cacheConfig = void 0 === e10 ? { config: {}, enable: true, autoInvalidate: true } : false === e10 ? { enable: false } : { enable: true, autoInvalidate: true, ...e10 }, this;
        }
        prepare() {
          return this._prepare(false);
        }
        run = (e10) => this._prepare().run(e10);
        all = (e10) => this._prepare().all(e10);
        get = (e10) => this._prepare().get(e10);
        values = (e10) => this._prepare().values(e10);
        async execute() {
          return this.all();
        }
      }
      for (let e10 of [h6]) for (let t10 of Object.getOwnPropertyNames(e10.prototype)) "constructor" !== t10 && Object.defineProperty(po.prototype, t10, Object.getOwnPropertyDescriptor(e10.prototype, t10) || /* @__PURE__ */ Object.create(null));
      function pl(e10, t10) {
        return (r10, i10, ...n10) => {
          let a10 = [i10, ...n10].map((r11) => ({ type: e10, isAll: t10, rightSelect: r11 }));
          for (let e11 of a10) if (!c8(r10.getSelectedFields(), e11.rightSelect.getSelectedFields())) throw Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
          return r10.addSetOperators(a10);
        };
      }
      let pc = () => ({ union: pu, unionAll: pd, intersect: ph, except: pp }), pu = pl("union", false), pd = pl("union", true), ph = pl("intersect", false), pp = pl("except", false);
      class pf {
        static [ci] = "SQLiteQueryBuilder";
        dialect;
        dialectConfig;
        constructor(e10) {
          this.dialect = cn(e10, h2) ? e10 : void 0, this.dialectConfig = cn(e10, h2) ? void 0 : e10;
        }
        $with = (e10, t10) => {
          let r10 = this;
          return { as: (i10) => ("function" == typeof i10 && (i10 = i10(r10)), new Proxy(new cH(i10.getSQL(), t10 ?? ("getSelectedFields" in i10 ? i10.getSelectedFields() ?? {} : {}), e10, true), new hr({ alias: e10, sqlAliasedBehavior: "alias", sqlBehavior: "error" }))) };
        };
        with(...e10) {
          let t10 = this;
          return { select: function(r10) {
            return new pa({ fields: r10 ?? void 0, session: void 0, dialect: t10.getDialect(), withList: e10 });
          }, selectDistinct: function(r10) {
            return new pa({ fields: r10 ?? void 0, session: void 0, dialect: t10.getDialect(), withList: e10, distinct: true });
          } };
        }
        select(e10) {
          return new pa({ fields: e10 ?? void 0, session: void 0, dialect: this.getDialect() });
        }
        selectDistinct(e10) {
          return new pa({ fields: e10 ?? void 0, session: void 0, dialect: this.getDialect(), distinct: true });
        }
        getDialect() {
          return this.dialect || (this.dialect = new h3(this.dialectConfig)), this.dialect;
        }
      }
      class pm extends h6 {
        constructor(e10, t10, r10, i10) {
          super(), this.table = e10, this.session = t10, this.dialect = r10, this.config = { table: e10, withList: i10 };
        }
        static [ci] = "SQLiteDelete";
        config;
        where(e10) {
          return this.config.where = e10, this;
        }
        orderBy(...e10) {
          if ("function" == typeof e10[0]) {
            let t10 = e10[0](new Proxy(this.config.table[cy.Symbol.Columns], new hr({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" }))), r10 = Array.isArray(t10) ? t10 : [t10];
            this.config.orderBy = r10;
          } else this.config.orderBy = e10;
          return this;
        }
        limit(e10) {
          return this.config.limit = e10, this;
        }
        returning(e10 = this.table[hZ.Symbol.Columns]) {
          return this.config.returning = c6(e10), this;
        }
        getSQL() {
          return this.dialect.buildDeleteQuery(this.config);
        }
        toSQL() {
          let { typings: e10, ...t10 } = this.dialect.sqlToQuery(this.getSQL());
          return t10;
        }
        _prepare(e10 = true) {
          return this.session[e10 ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, void 0, { type: "delete", tables: pn(this.config.table) });
        }
        prepare() {
          return this._prepare(false);
        }
        run = (e10) => this._prepare().run(e10);
        all = (e10) => this._prepare().all(e10);
        get = (e10) => this._prepare().get(e10);
        values = (e10) => this._prepare().values(e10);
        async execute(e10) {
          return this._prepare().execute(e10);
        }
        $dynamic() {
          return this;
        }
      }
      class pg {
        constructor(e10, t10, r10, i10) {
          this.table = e10, this.session = t10, this.dialect = r10, this.withList = i10;
        }
        static [ci] = "SQLiteInsertBuilder";
        values(e10) {
          if (0 === (e10 = Array.isArray(e10) ? e10 : [e10]).length) throw Error("values() must be called with at least one value");
          let t10 = e10.map((e11) => {
            let t11 = {}, r10 = this.table[cy.Symbol.Columns];
            for (let i10 of Object.keys(e11)) {
              let n10 = e11[i10];
              t11[i10] = cn(n10, cz) ? n10 : new cX(n10, r10[i10]);
            }
            return t11;
          });
          return new py(this.table, t10, this.session, this.dialect, this.withList);
        }
        select(e10) {
          let t10 = "function" == typeof e10 ? e10(new pf()) : e10;
          if (!cn(t10, cz) && !c8(this.table[cu], t10._.selectedFields)) throw Error("Insert select error: selected fields are not the same or are in a different order compared to the table definition");
          return new py(this.table, t10, this.session, this.dialect, this.withList, true);
        }
      }
      class py extends h6 {
        constructor(e10, t10, r10, i10, n10, a10) {
          super(), this.session = r10, this.dialect = i10, this.config = { table: e10, values: t10, withList: n10, select: a10 };
        }
        static [ci] = "SQLiteInsert";
        config;
        returning(e10 = this.config.table[hZ.Symbol.Columns]) {
          return this.config.returning = c6(e10), this;
        }
        onConflictDoNothing(e10 = {}) {
          if (this.config.onConflict || (this.config.onConflict = []), void 0 === e10.target) this.config.onConflict.push(cY` on conflict do nothing`);
          else {
            let t10 = Array.isArray(e10.target) ? cY`${e10.target}` : cY`${[e10.target]}`, r10 = e10.where ? cY` where ${e10.where}` : cY``;
            this.config.onConflict.push(cY` on conflict ${t10} do nothing${r10}`);
          }
          return this;
        }
        onConflictDoUpdate(e10) {
          if (e10.where && (e10.targetWhere || e10.setWhere)) throw Error('You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.');
          this.config.onConflict || (this.config.onConflict = []);
          let t10 = e10.where ? cY` where ${e10.where}` : void 0, r10 = e10.targetWhere ? cY` where ${e10.targetWhere}` : void 0, i10 = e10.setWhere ? cY` where ${e10.setWhere}` : void 0, n10 = Array.isArray(e10.target) ? cY`${e10.target}` : cY`${[e10.target]}`, a10 = this.dialect.buildUpdateSet(this.config.table, c9(this.config.table, e10.set));
          return this.config.onConflict.push(cY` on conflict ${n10}${r10} do update set ${a10}${t10}${i10}`), this;
        }
        getSQL() {
          return this.dialect.buildInsertQuery(this.config);
        }
        toSQL() {
          let { typings: e10, ...t10 } = this.dialect.sqlToQuery(this.getSQL());
          return t10;
        }
        _prepare(e10 = true) {
          return this.session[e10 ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, void 0, { type: "insert", tables: pn(this.config.table) });
        }
        prepare() {
          return this._prepare(false);
        }
        run = (e10) => this._prepare().run(e10);
        all = (e10) => this._prepare().all(e10);
        get = (e10) => this._prepare().get(e10);
        values = (e10) => this._prepare().values(e10);
        async execute() {
          return this.config.returning ? this.all() : this.run();
        }
        $dynamic() {
          return this;
        }
      }
      class pb {
        constructor(e10, t10, r10, i10) {
          this.table = e10, this.session = t10, this.dialect = r10, this.withList = i10;
        }
        static [ci] = "SQLiteUpdateBuilder";
        set(e10) {
          return new pw(this.table, c9(this.table, e10), this.session, this.dialect, this.withList);
        }
      }
      class pw extends h6 {
        constructor(e10, t10, r10, i10, n10) {
          super(), this.session = r10, this.dialect = i10, this.config = { set: t10, table: e10, withList: n10, joins: [] };
        }
        static [ci] = "SQLiteUpdate";
        config;
        from(e10) {
          return this.config.from = e10, this;
        }
        createJoin(e10) {
          return (t10, r10) => {
            let i10 = c7(t10);
            if ("string" == typeof i10 && this.config.joins.some((e11) => e11.alias === i10)) throw Error(`Alias "${i10}" is already used in this query`);
            if ("function" == typeof r10) {
              let e11 = this.config.from ? cn(t10, hZ) ? t10[cy.Symbol.Columns] : cn(t10, cB) ? t10._.selectedFields : cn(t10, h1) ? t10[cF].selectedFields : void 0 : void 0;
              r10 = r10(new Proxy(this.config.table[cy.Symbol.Columns], new hr({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })), e11 && new Proxy(e11, new hr({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
            }
            return this.config.joins.push({ on: r10, table: t10, joinType: e10, alias: i10 }), this;
          };
        }
        leftJoin = this.createJoin("left");
        rightJoin = this.createJoin("right");
        innerJoin = this.createJoin("inner");
        fullJoin = this.createJoin("full");
        where(e10) {
          return this.config.where = e10, this;
        }
        orderBy(...e10) {
          if ("function" == typeof e10[0]) {
            let t10 = e10[0](new Proxy(this.config.table[cy.Symbol.Columns], new hr({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" }))), r10 = Array.isArray(t10) ? t10 : [t10];
            this.config.orderBy = r10;
          } else this.config.orderBy = e10;
          return this;
        }
        limit(e10) {
          return this.config.limit = e10, this;
        }
        returning(e10 = this.config.table[hZ.Symbol.Columns]) {
          return this.config.returning = c6(e10), this;
        }
        getSQL() {
          return this.dialect.buildUpdateQuery(this.config);
        }
        toSQL() {
          let { typings: e10, ...t10 } = this.dialect.sqlToQuery(this.getSQL());
          return t10;
        }
        _prepare(e10 = true) {
          return this.session[e10 ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, void 0, { type: "insert", tables: pn(this.config.table) });
        }
        prepare() {
          return this._prepare(false);
        }
        run = (e10) => this._prepare().run(e10);
        all = (e10) => this._prepare().all(e10);
        get = (e10) => this._prepare().get(e10);
        values = (e10) => this._prepare().values(e10);
        async execute() {
          return this.config.returning ? this.all() : this.run();
        }
        $dynamic() {
          return this;
        }
      }
      class pv extends cz {
        constructor(e10) {
          super(pv.buildEmbeddedCount(e10.source, e10.filters).queryChunks), this.params = e10, this.session = e10.session, this.sql = pv.buildCount(e10.source, e10.filters);
        }
        sql;
        static [ci] = "SQLiteCountBuilderAsync";
        [Symbol.toStringTag] = "SQLiteCountBuilderAsync";
        session;
        static buildEmbeddedCount(e10, t10) {
          return cY`(select count(*) from ${e10}${cY.raw(" where ").if(t10)}${t10})`;
        }
        static buildCount(e10, t10) {
          return cY`select count(*) from ${e10}${cY.raw(" where ").if(t10)}${t10}`;
        }
        then(e10, t10) {
          return Promise.resolve(this.session.count(this.sql)).then(e10, t10);
        }
        catch(e10) {
          return this.then(void 0, e10);
        }
        finally(e10) {
          return this.then((t10) => (e10?.(), t10), (t10) => {
            throw e10?.(), t10;
          });
        }
      }
      class p_ {
        constructor(e10, t10, r10, i10, n10, a10, s10, o10) {
          this.mode = e10, this.fullSchema = t10, this.schema = r10, this.tableNamesMap = i10, this.table = n10, this.tableConfig = a10, this.dialect = s10, this.session = o10;
        }
        static [ci] = "SQLiteAsyncRelationalQueryBuilder";
        findMany(e10) {
          return "sync" === this.mode ? new pE(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, e10 || {}, "many") : new pS(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, e10 || {}, "many");
        }
        findFirst(e10) {
          return "sync" === this.mode ? new pE(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, e10 ? { ...e10, limit: 1 } : { limit: 1 }, "first") : new pS(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, e10 ? { ...e10, limit: 1 } : { limit: 1 }, "first");
        }
      }
      class pS extends h6 {
        constructor(e10, t10, r10, i10, n10, a10, s10, o10, l10) {
          super(), this.fullSchema = e10, this.schema = t10, this.tableNamesMap = r10, this.table = i10, this.tableConfig = n10, this.dialect = a10, this.session = s10, this.config = o10, this.mode = l10;
        }
        static [ci] = "SQLiteAsyncRelationalQuery";
        mode;
        getSQL() {
          return this.dialect.buildRelationalQuery({ fullSchema: this.fullSchema, schema: this.schema, tableNamesMap: this.tableNamesMap, table: this.table, tableConfig: this.tableConfig, queryConfig: this.config, tableAlias: this.tableConfig.tsName }).sql;
        }
        _prepare(e10 = false) {
          let { query: t10, builtQuery: r10 } = this._toSQL();
          return this.session[e10 ? "prepareOneTimeQuery" : "prepareQuery"](r10, void 0, "first" === this.mode ? "get" : "all", true, (e11, r11) => {
            let i10 = e11.map((e12) => function e13(t11, r12, i11, n10, a10 = (e14) => e14) {
              let s10 = {};
              for (let [o10, l10] of n10.entries()) if (l10.isJson) {
                let n11 = r12.relations[l10.tsKey], c10 = i11[o10], u10 = "string" == typeof c10 ? JSON.parse(c10) : c10;
                s10[l10.tsKey] = cn(n11, d2) ? u10 && e13(t11, t11[l10.relationTableTsKey], u10, l10.selection, a10) : u10.map((r13) => e13(t11, t11[l10.relationTableTsKey], r13, l10.selection, a10));
              } else {
                let e14, t12 = a10(i11[o10]), r13 = l10.field;
                e14 = cn(r13, cw) ? r13 : cn(r13, cz) ? r13.decoder : r13.sql.decoder, s10[l10.tsKey] = null === t12 ? null : e14.mapFromDriverValue(t12);
              }
              return s10;
            }(this.schema, this.tableConfig, e12, t10.selection, r11));
            return "first" === this.mode ? i10[0] : i10;
          });
        }
        prepare() {
          return this._prepare(false);
        }
        _toSQL() {
          let e10 = this.dialect.buildRelationalQuery({ fullSchema: this.fullSchema, schema: this.schema, tableNamesMap: this.tableNamesMap, table: this.table, tableConfig: this.tableConfig, queryConfig: this.config, tableAlias: this.tableConfig.tsName }), t10 = this.dialect.sqlToQuery(e10.sql);
          return { query: e10, builtQuery: t10 };
        }
        toSQL() {
          return this._toSQL().builtQuery;
        }
        executeRaw() {
          return "first" === this.mode ? this._prepare(false).get() : this._prepare(false).all();
        }
        async execute() {
          return this.executeRaw();
        }
      }
      class pE extends pS {
        static [ci] = "SQLiteSyncRelationalQuery";
        sync() {
          return this.executeRaw();
        }
      }
      class px extends h6 {
        constructor(e10, t10, r10, i10, n10) {
          super(), this.execute = e10, this.getSQL = t10, this.dialect = i10, this.mapBatchResult = n10, this.config = { action: r10 };
        }
        static [ci] = "SQLiteRaw";
        config;
        getQuery() {
          return { ...this.dialect.sqlToQuery(this.getSQL()), method: this.config.action };
        }
        mapResult(e10, t10) {
          return t10 ? this.mapBatchResult(e10) : e10;
        }
        _prepare() {
          return this;
        }
        isResponseInArrayMode() {
          return false;
        }
      }
      class pT {
        constructor(e10, t10, r10, i10) {
          this.resultKind = e10, this.dialect = t10, this.session = r10, this._ = i10 ? { schema: i10.schema, fullSchema: i10.fullSchema, tableNamesMap: i10.tableNamesMap } : { schema: void 0, fullSchema: {}, tableNamesMap: {} }, this.query = {};
          const n10 = this.query;
          if (this._.schema) for (const [a10, s10] of Object.entries(this._.schema)) n10[a10] = new p_(e10, i10.fullSchema, this._.schema, this._.tableNamesMap, i10.fullSchema[a10], s10, t10, r10);
          this.$cache = { invalidate: async (e11) => {
          } };
        }
        static [ci] = "BaseSQLiteDatabase";
        query;
        $with = (e10, t10) => {
          let r10 = this;
          return { as: (i10) => ("function" == typeof i10 && (i10 = i10(new pf(r10.dialect))), new Proxy(new cH(i10.getSQL(), t10 ?? ("getSelectedFields" in i10 ? i10.getSelectedFields() ?? {} : {}), e10, true), new hr({ alias: e10, sqlAliasedBehavior: "alias", sqlBehavior: "error" }))) };
        };
        $count(e10, t10) {
          return new pv({ source: e10, filters: t10, session: this.session });
        }
        with(...e10) {
          let t10 = this;
          return { select: function(r10) {
            return new pa({ fields: r10 ?? void 0, session: t10.session, dialect: t10.dialect, withList: e10 });
          }, selectDistinct: function(r10) {
            return new pa({ fields: r10 ?? void 0, session: t10.session, dialect: t10.dialect, withList: e10, distinct: true });
          }, update: function(r10) {
            return new pb(r10, t10.session, t10.dialect, e10);
          }, insert: function(r10) {
            return new pg(r10, t10.session, t10.dialect, e10);
          }, delete: function(r10) {
            return new pm(r10, t10.session, t10.dialect, e10);
          } };
        }
        select(e10) {
          return new pa({ fields: e10 ?? void 0, session: this.session, dialect: this.dialect });
        }
        selectDistinct(e10) {
          return new pa({ fields: e10 ?? void 0, session: this.session, dialect: this.dialect, distinct: true });
        }
        update(e10) {
          return new pb(e10, this.session, this.dialect);
        }
        $cache;
        insert(e10) {
          return new pg(e10, this.session, this.dialect);
        }
        delete(e10) {
          return new pm(e10, this.session, this.dialect);
        }
        run(e10) {
          let t10 = "string" == typeof e10 ? cY.raw(e10) : e10.getSQL();
          return "async" === this.resultKind ? new px(async () => this.session.run(t10), () => t10, "run", this.dialect, this.session.extractRawRunValueFromBatchResult.bind(this.session)) : this.session.run(t10);
        }
        all(e10) {
          let t10 = "string" == typeof e10 ? cY.raw(e10) : e10.getSQL();
          return "async" === this.resultKind ? new px(async () => this.session.all(t10), () => t10, "all", this.dialect, this.session.extractRawAllValueFromBatchResult.bind(this.session)) : this.session.all(t10);
        }
        get(e10) {
          let t10 = "string" == typeof e10 ? cY.raw(e10) : e10.getSQL();
          return "async" === this.resultKind ? new px(async () => this.session.get(t10), () => t10, "get", this.dialect, this.session.extractRawGetValueFromBatchResult.bind(this.session)) : this.session.get(t10);
        }
        values(e10) {
          let t10 = "string" == typeof e10 ? cY.raw(e10) : e10.getSQL();
          return "async" === this.resultKind ? new px(async () => this.session.values(t10), () => t10, "values", this.dialect, this.session.extractRawValuesValueFromBatchResult.bind(this.session)) : this.session.values(t10);
        }
        transaction(e10, t10) {
          return this.session.transaction(e10, t10);
        }
      }
      class pC {
        static [ci] = "Cache";
      }
      class pA extends pC {
        strategy() {
          return "all";
        }
        static [ci] = "NoopCache";
        async get(e10) {
        }
        async put(e10, t10, r10, i10) {
        }
        async onMutate(e10) {
        }
      }
      async function pP(e10, t10) {
        let r10 = `${e10}-${JSON.stringify(t10)}`, i10 = new TextEncoder().encode(r10);
        return [...new Uint8Array(await crypto.subtle.digest("SHA-256", i10))].map((e11) => e11.toString(16).padStart(2, "0")).join("");
      }
      class pk extends h6 {
        constructor(e10) {
          super(), this.resultCb = e10;
        }
        static [ci] = "ExecuteResultSync";
        async execute() {
          return this.resultCb();
        }
        sync() {
          return this.resultCb();
        }
      }
      class pR {
        constructor(e10, t10, r10, i10, n10, a10) {
          this.mode = e10, this.executeMethod = t10, this.query = r10, this.cache = i10, this.queryMetadata = n10, this.cacheConfig = a10, i10 && "all" === i10.strategy() && void 0 === a10 && (this.cacheConfig = { enable: true, autoInvalidate: true }), this.cacheConfig?.enable || (this.cacheConfig = void 0);
        }
        static [ci] = "PreparedQuery";
        joinsNotNullableMap;
        async queryWithCache(e10, t10, r10) {
          if (void 0 === this.cache || cn(this.cache, pA) || void 0 === this.queryMetadata || this.cacheConfig && !this.cacheConfig.enable) try {
            return await r10();
          } catch (r11) {
            throw new hl(e10, t10, r11);
          }
          if (("insert" === this.queryMetadata.type || "update" === this.queryMetadata.type || "delete" === this.queryMetadata.type) && this.queryMetadata.tables.length > 0) try {
            let [e11] = await Promise.all([r10(), this.cache.onMutate({ tables: this.queryMetadata.tables })]);
            return e11;
          } catch (r11) {
            throw new hl(e10, t10, r11);
          }
          if (!this.cacheConfig) try {
            return await r10();
          } catch (r11) {
            throw new hl(e10, t10, r11);
          }
          if ("select" === this.queryMetadata.type) {
            let i10 = await this.cache.get(this.cacheConfig.tag ?? await pP(e10, t10), this.queryMetadata.tables, void 0 !== this.cacheConfig.tag, this.cacheConfig.autoInvalidate);
            if (void 0 === i10) {
              let i11;
              try {
                i11 = await r10();
              } catch (r11) {
                throw new hl(e10, t10, r11);
              }
              return await this.cache.put(this.cacheConfig.tag ?? await pP(e10, t10), i11, this.cacheConfig.autoInvalidate ? this.queryMetadata.tables : [], void 0 !== this.cacheConfig.tag, this.cacheConfig.config), i11;
            }
            return i10;
          }
          try {
            return await r10();
          } catch (r11) {
            throw new hl(e10, t10, r11);
          }
        }
        getQuery() {
          return this.query;
        }
        mapRunResult(e10, t10) {
          return e10;
        }
        mapAllResult(e10, t10) {
          throw Error("Not implemented");
        }
        mapGetResult(e10, t10) {
          throw Error("Not implemented");
        }
        execute(e10) {
          return "async" === this.mode ? this[this.executeMethod](e10) : new pk(() => this[this.executeMethod](e10));
        }
        mapResult(e10, t10) {
          switch (this.executeMethod) {
            case "run":
              return this.mapRunResult(e10, t10);
            case "all":
              return this.mapAllResult(e10, t10);
            case "get":
              return this.mapGetResult(e10, t10);
          }
        }
      }
      class pO {
        constructor(e10) {
          this.dialect = e10;
        }
        static [ci] = "SQLiteSession";
        prepareOneTimeQuery(e10, t10, r10, i10, n10, a10, s10) {
          return this.prepareQuery(e10, t10, r10, i10, n10, a10, s10);
        }
        run(e10) {
          let t10 = this.dialect.sqlToQuery(e10);
          try {
            return this.prepareOneTimeQuery(t10, void 0, "run", false).run();
          } catch (e11) {
            throw new ho({ cause: e11, message: `Failed to run the query '${t10.sql}'` });
          }
        }
        extractRawRunValueFromBatchResult(e10) {
          return e10;
        }
        all(e10) {
          return this.prepareOneTimeQuery(this.dialect.sqlToQuery(e10), void 0, "run", false).all();
        }
        extractRawAllValueFromBatchResult(e10) {
          throw Error("Not implemented");
        }
        get(e10) {
          return this.prepareOneTimeQuery(this.dialect.sqlToQuery(e10), void 0, "run", false).get();
        }
        extractRawGetValueFromBatchResult(e10) {
          throw Error("Not implemented");
        }
        values(e10) {
          return this.prepareOneTimeQuery(this.dialect.sqlToQuery(e10), void 0, "run", false).values();
        }
        async count(e10) {
          return (await this.values(e10))[0][0];
        }
        extractRawValuesValueFromBatchResult(e10) {
          throw Error("Not implemented");
        }
      }
      class pN extends pT {
        constructor(e10, t10, r10, i10, n10 = 0) {
          super(e10, t10, r10, i10), this.schema = i10, this.nestedIndex = n10;
        }
        static [ci] = "SQLiteTransaction";
        rollback() {
          throw new hc();
        }
      }
      class pI extends pO {
        constructor(e10, t10, r10, i10 = {}) {
          super(t10), this.client = e10, this.schema = r10, this.options = i10, this.logger = i10.logger ?? new co(), this.cache = i10.cache ?? new pA();
        }
        static [ci] = "SQLiteD1Session";
        logger;
        cache;
        prepareQuery(e10, t10, r10, i10, n10, a10, s10) {
          return new pL(this.client.prepare(e10.sql), e10, this.logger, this.cache, a10, s10, t10, r10, i10, n10);
        }
        async batch(e10) {
          let t10 = [], r10 = [];
          for (let i10 of e10) {
            let e11 = i10._prepare(), n10 = e11.getQuery();
            if (t10.push(e11), n10.params.length > 0) r10.push(e11.stmt.bind(...n10.params));
            else {
              let t11 = e11.getQuery();
              r10.push(this.client.prepare(t11.sql).bind(...t11.params));
            }
          }
          return (await this.client.batch(r10)).map((e11, r11) => t10[r11].mapResult(e11, true));
        }
        extractRawAllValueFromBatchResult(e10) {
          return e10.results;
        }
        extractRawGetValueFromBatchResult(e10) {
          return e10.results[0];
        }
        extractRawValuesValueFromBatchResult(e10) {
          return pD(e10.results);
        }
        async transaction(e10, t10) {
          let r10 = new p$("async", this.dialect, this, this.schema);
          await this.run(cY.raw(`begin${t10?.behavior ? " " + t10.behavior : ""}`));
          try {
            let t11 = await e10(r10);
            return await this.run(cY`commit`), t11;
          } catch (e11) {
            throw await this.run(cY`rollback`), e11;
          }
        }
      }
      class p$ extends pN {
        static [ci] = "D1Transaction";
        async transaction(e10) {
          let t10 = `sp${this.nestedIndex}`, r10 = new p$("async", this.dialect, this.session, this.schema, this.nestedIndex + 1);
          await this.session.run(cY.raw(`savepoint ${t10}`));
          try {
            let i10 = await e10(r10);
            return await this.session.run(cY.raw(`release savepoint ${t10}`)), i10;
          } catch (e11) {
            throw await this.session.run(cY.raw(`rollback to savepoint ${t10}`)), e11;
          }
        }
      }
      function pD(e10) {
        let t10 = [];
        for (let r10 of e10) {
          let e11 = Object.keys(r10).map((e12) => r10[e12]);
          t10.push(e11);
        }
        return t10;
      }
      class pL extends pR {
        constructor(e10, t10, r10, i10, n10, a10, s10, o10, l10, c10) {
          super("async", o10, t10, i10, n10, a10), this.logger = r10, this._isResponseInArrayMode = l10, this.customResultMapper = c10, this.fields = s10, this.stmt = e10;
        }
        static [ci] = "D1PreparedQuery";
        customResultMapper;
        fields;
        stmt;
        async run(e10) {
          let t10 = c2(this.query.params, e10 ?? {});
          return this.logger.logQuery(this.query.sql, t10), await this.queryWithCache(this.query.sql, t10, async () => this.stmt.bind(...t10).run());
        }
        async all(e10) {
          let { fields: t10, query: r10, logger: i10, stmt: n10, customResultMapper: a10 } = this;
          if (!t10 && !a10) {
            let t11 = c2(r10.params, e10 ?? {});
            return i10.logQuery(r10.sql, t11), await this.queryWithCache(r10.sql, t11, async () => n10.bind(...t11).all().then(({ results: e11 }) => this.mapAllResult(e11)));
          }
          let s10 = await this.values(e10);
          return this.mapAllResult(s10);
        }
        mapAllResult(e10, t10) {
          return (t10 && (e10 = pD(e10.results)), this.fields || this.customResultMapper) ? this.customResultMapper ? this.customResultMapper(e10) : e10.map((e11) => c5(this.fields, e11, this.joinsNotNullableMap)) : e10;
        }
        async get(e10) {
          let { fields: t10, joinsNotNullableMap: r10, query: i10, logger: n10, stmt: a10, customResultMapper: s10 } = this;
          if (!t10 && !s10) {
            let t11 = c2(i10.params, e10 ?? {});
            return n10.logQuery(i10.sql, t11), await this.queryWithCache(i10.sql, t11, async () => a10.bind(...t11).all().then(({ results: e11 }) => e11[0]));
          }
          let o10 = await this.values(e10);
          if (o10[0]) return s10 ? s10(o10) : c5(t10, o10[0], r10);
        }
        mapGetResult(e10, t10) {
          return (t10 && (e10 = pD(e10.results)[0]), this.fields || this.customResultMapper) ? this.customResultMapper ? this.customResultMapper([e10]) : c5(this.fields, e10, this.joinsNotNullableMap) : e10;
        }
        async values(e10) {
          let t10 = c2(this.query.params, e10 ?? {});
          return this.logger.logQuery(this.query.sql, t10), await this.queryWithCache(this.query.sql, t10, async () => this.stmt.bind(...t10).raw());
        }
        isResponseInArrayMode() {
          return this._isResponseInArrayMode;
        }
      }
      class pU extends pT {
        static [ci] = "D1Database";
        async batch(e10) {
          return this.session.batch(e10);
        }
      }
      let pj = h0("users", { id: hX("id").primaryKey(), name: hX("name"), email: hX("email").notNull().unique(), emailVerified: hL("emailVerified", { mode: "timestamp" }), image: hX("image"), role: hX("role", { enum: ["ADMIN", "STAFF", "PATIENT"] }).default("PATIENT").notNull(), passwordHash: hX("password_hash"), salt: hX("salt"), createdAt: hX("created_at").default(cY`CURRENT_TIMESTAMP`).notNull() }), pM = h0("accounts", { id: hX("id").primaryKey(), userId: hX("userId").notNull().references(() => pj.id, { onDelete: "cascade" }), type: hX("type").notNull(), provider: hX("provider").notNull(), providerAccountId: hX("providerAccountId").notNull(), refresh_token: hX("refresh_token"), access_token: hX("access_token"), expires_at: hL("expires_at"), token_type: hX("token_type"), scope: hX("scope"), id_token: hX("id_token"), session_state: hX("session_state") }), pB = h0("sessions", { id: hX("id").primaryKey(), sessionToken: hX("sessionToken").notNull().unique(), userId: hX("userId").notNull().references(() => pj.id, { onDelete: "cascade" }), expires: hL("expires", { mode: "timestamp" }).notNull() }), pH = h0("verification_tokens", { identifier: hX("identifier").notNull(), token: hX("token").notNull(), expires: hL("expires", { mode: "timestamp" }).notNull() }, (e10) => ({ pk: function(...e11) {
        return e11[0].columns ? new pr(e11[0].columns, e11[0].name) : new pr(e11);
      }({ columns: [e10.identifier, e10.token] }) })), pq = h0("services", { id: hX("id").primaryKey(), title: hX("title").notNull(), category: hX("category").notNull(), duration: hX("duration"), description: hX("description"), image: hX("image"), tags: hX("tags"), visibility: hX("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(), createdAt: hX("createdAt").default(cY`CURRENT_TIMESTAMP`).notNull() }), pF = h0("blog_posts", { slug: hX("slug").primaryKey(), title: hX("title").notNull(), category: hX("category").notNull(), excerpt: hX("excerpt"), content: hX("content"), image: hX("image"), author: hX("author"), authorImage: hX("authorImage"), tags: hX("tags"), visibility: hX("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(), createdAt: hX("createdAt").default(cY`CURRENT_TIMESTAMP`).notNull() }), pW = h0("partners", { id: hX("id").primaryKey(), name: hX("name").notNull(), image: hX("image"), visibility: hX("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(), createdAt: hX("createdAt").default(cY`CURRENT_TIMESTAMP`).notNull() }), pK = h0("doctors", { id: hX("id").primaryKey(), name: hX("name").notNull(), title: hX("title").notNull(), department: hX("department").notNull(), experience: hX("experience").notNull(), bio: hX("bio"), image: hX("image"), visibility: hX("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(), hospitalId: hX("hospitalId").references(() => pW.id, { onDelete: "set null" }), createdAt: hX("createdAt").default(cY`CURRENT_TIMESTAMP`).notNull() }), pV = h0("hospitals", { id: hX("id").primaryKey(), name: hX("name").notNull(), location: hX("location").notNull(), focus: hX("focus").notNull(), description: hX("description"), image: hX("image"), visibility: hX("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(), createdAt: hX("createdAt").default(cY`CURRENT_TIMESTAMP`).notNull() }), pz = h0("testimonials", { id: hX("id").primaryKey(), quote: hX("quote").notNull(), name: hX("name").notNull(), role: hX("role").notNull(), rating: hL("rating").default(5).notNull(), image: hX("image"), visibility: hX("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(), createdAt: hX("createdAt").default(cY`CURRENT_TIMESTAMP`).notNull() }), pQ = h0("faqs", { id: hX("id").primaryKey(), question: hX("question").notNull(), answer: hX("answer").notNull(), category: hX("category").notNull(), visibility: hX("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(), createdAt: hX("createdAt").default(cY`CURRENT_TIMESTAMP`).notNull() }), pJ = h0("consultation_requests", { id: hX("id").primaryKey(), name: hX("name").notNull(), email: hX("email").notNull(), phone: hX("phone").notNull(), service: hX("service").notNull(), status: hX("status", { enum: ["new", "contacted", "closed"] }).default("new").notNull(), userId: hX("userId").references(() => pj.id, { onDelete: "set null" }), createdAt: hX("created_at").default(cY`CURRENT_TIMESTAMP`).notNull() });
      e.s(["accounts", 0, pM, "blogPosts", 0, pF, "consultationRequests", 0, pJ, "doctors", 0, pK, "faqs", 0, pQ, "hospitals", 0, pV, "partners", 0, pW, "services", 0, pq, "sessions", 0, pB, "testimonials", 0, pz, "users", 0, pj, "verificationTokens", 0, pH], 93004);
      var pG = e.i(93004);
      async function pX(e10, t10) {
        let r10, i10, n10 = new TextEncoder().encode(e10);
        if (t10) {
          i10 = t10;
          let e11 = t10.match(/.{1,2}/g);
          r10 = new Uint8Array(e11 ? e11.map((e12) => parseInt(e12, 16)) : []);
        } else r10 = new Uint8Array(16), crypto.getRandomValues(r10), i10 = Array.from(r10).map((e11) => e11.toString(16).padStart(2, "0")).join("");
        let a10 = await crypto.subtle.importKey("raw", n10, { name: "PBKDF2" }, false, ["deriveBits"]);
        return { hash: Array.from(new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", salt: r10, iterations: 1e5, hash: "SHA-256" }, a10, 256))).map((e11) => e11.toString(16).padStart(2, "0")).join(""), salt: i10 };
      }
      async function pY(e10, t10, r10) {
        return (await pX(e10, r10)).hash === t10;
      }
      let pZ = "PATIENT", { handlers: p0, auth: p1, signIn: p2, signOut: p3 } = function(e10) {
        if ("function" == typeof e10) {
          let t11 = async (t12) => {
            let r10 = await e10(t12);
            return lA(r10), lE(lC(t12), r10);
          };
          return { handlers: { GET: t11, POST: t11 }, auth: lF(e10, (e11) => lA(e11)), signIn: async (t12, r10, i10) => {
            let n10 = await e10(void 0);
            return lA(n10), lG(t12, r10, i10, n10);
          }, signOut: async (t12) => {
            let r10 = await e10(void 0);
            return lA(r10), lX(t12, r10);
          }, unstable_update: async (t12) => {
            let r10 = await e10(void 0);
            return lA(r10), lY(t12, r10);
          } };
        }
        lA(e10);
        let t10 = (t11) => lE(lC(t11), e10);
        return { handlers: { GET: t10, POST: t10 }, auth: lF(e10), signIn: (t11, r10, i10) => lG(t11, r10, i10, e10), signOut: (t11) => lX(t11, e10), unstable_update: (t11) => lY(t11, e10) };
      }(() => {
        let e10 = process.env.DB ?? globalThis.DB ?? null;
        return { adapter: e10 ? { async createUser(t10) {
          let r10 = crypto.randomUUID(), i10 = [r10, t10.name, t10.email, t10.emailVerified?.toISOString(), t10.image], n10 = await l7(e10, "INSERT INTO users (id, name, email, emailVerified, image) VALUES (?, ?, ?, ?, ?)", i10, l0, [r10]);
          if (n10) return n10;
          throw Error("Error creating user: Cannot get user after creation.");
        }, getUser: async (t10) => await ce(e10, l0, [t10]), getUserByEmail: async (t10) => await ce(e10, "SELECT * FROM users WHERE email = ?", [t10]), getUserByAccount: async ({ providerAccountId: t10, provider: r10 }) => await ce(e10, l1, [t10, r10]), async updateUser(t10) {
          let r10 = await ce(e10, l0, [t10.id]);
          if (r10 && (Object.assign(r10, t10), (await ct(e10, l2, [r10.name, r10.email, r10.emailVerified?.toISOString(), r10.image, r10.id])).success)) {
            let t11 = await ce(e10, l0, [r10.id]);
            if (t11) return t11;
            throw Error("Error updating user: Cannot get user after updating.");
          }
          throw Error("Error updating user: Failed to run the update SQL.");
        }, deleteUser: async (t10) => (await cr(e10, "DELETE FROM accounts WHERE userId = ?", [t10]), await cr(e10, "DELETE FROM sessions WHERE userId = ?", [t10]), await cr(e10, "DELETE FROM users WHERE id = ?", [t10]), null), async linkAccount(t10) {
          let r10 = crypto.randomUUID(), i10 = [r10, t10.userId, t10.type, t10.provider, t10.providerAccountId, t10.refresh_token, t10.access_token, t10.expires_at, t10.token_type, t10.scope, t10.id_token, t10.session_state, t10.oauth_token ?? null, t10.oauth_token_secret ?? null], n10 = [r10];
          return await l7(e10, l6, i10, "SELECT * FROM accounts WHERE id = ? ", n10);
        }, async unlinkAccount({ providerAccountId: t10, provider: r10 }) {
          await cr(e10, "DELETE FROM accounts WHERE provider = ? AND providerAccountId = ?", [r10, t10]);
        }, async createSession({ sessionToken: t10, userId: r10, expires: i10 }) {
          let n10 = [crypto.randomUUID(), t10, r10, i10.toISOString()], a10 = await l7(e10, "INSERT INTO sessions (id, sessionToken, userId, expires) VALUES (?,?,?,?)", n10, l3, [t10]);
          if (a10) return a10;
          throw Error("Couldn't create session");
        }, async getSessionAndUser(t10) {
          let r10 = await ce(e10, l3, [t10]);
          if (null === r10) return null;
          let i10 = await ce(e10, l0, [r10.userId]);
          return null === i10 ? null : { session: r10, user: i10 };
        }, async updateSession({ sessionToken: t10, expires: r10 }) {
          if (void 0 === r10) return await cr(e10, l5, [t10]), null;
          let i10 = await ce(e10, l3, [t10]);
          return i10 ? (i10.expires = r10, await ct(e10, l4, [r10?.toISOString(), t10]), await e10.prepare(l4).bind(r10?.toISOString(), t10).first()) : null;
        }, deleteSession: async (t10) => (await cr(e10, l5, [t10]), null), createVerificationToken: async ({ identifier: t10, expires: r10, token: i10 }) => await l7(e10, "INSERT INTO verification_tokens (identifier, expires, token) VALUES (?,?,?)", [t10, r10.toISOString(), i10], l8, [t10, i10]), async useVerificationToken({ identifier: t10, token: r10 }) {
          let i10 = await ce(e10, l8, [t10, r10]);
          return i10 ? (await cr(e10, "DELETE FROM verification_tokens WHERE identifier = ? and token = ?", [t10, r10]), i10) : null;
        } } : void 0, providers: [{ id: "credentials", name: "Credentials", type: "credentials", credentials: {}, authorize: () => null, options: { name: "Credentials", credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } }, async authorize(e11) {
          let t10 = e11?.email?.toString() ?? "", r10 = e11?.password?.toString() ?? "";
          if (!t10 || !r10) return null;
          try {
            let e12 = function() {
              let e13 = process.env.DB ?? globalThis.DB ?? null;
              if (!e13) throw Error("D1 database connection unavailable. Ensure that the 'DB' binding is configured in wrangler.toml and available in the current environment context.");
              return function(e14, t11 = {}) {
                let r11, i11, n11 = new h4({ casing: t11.casing });
                if (true === t11.logger ? r11 = new cs() : false !== t11.logger && (r11 = t11.logger), t11.schema) {
                  let e15 = function(e16, t12) {
                    1 === Object.keys(e16).length && "default" in e16 && !cn(e16.default, cy) && (e16 = e16.default);
                    let r12 = {}, i12 = {}, n12 = {};
                    for (let [a11, s11] of Object.entries(e16)) if (cn(s11, cy)) {
                      let e17 = cb(s11), t13 = i12[e17];
                      for (let i13 of (r12[e17] = a11, n12[a11] = { tsName: a11, dbName: s11[cy.Symbol.Name], schema: s11[cy.Symbol.Schema], columns: s11[cy.Symbol.Columns], relations: t13?.relations ?? {}, primaryKey: t13?.primaryKey ?? [] }, Object.values(s11[cy.Symbol.Columns]))) i13.primary && n12[a11].primaryKey.push(i13);
                      let o10 = s11[cy.Symbol.ExtraConfigBuilder]?.(s11[cy.Symbol.ExtraConfigColumns]);
                      if (o10) for (let e18 of Object.values(o10)) cn(e18, dP) && n12[a11].primaryKey.push(...e18.columns);
                    } else if (cn(s11, d1)) {
                      let e17, a12 = cb(s11.table), o10 = r12[a12];
                      for (let [r13, l10] of Object.entries(s11.config(t12(s11.table)))) if (o10) {
                        let t13 = n12[o10];
                        t13.relations[r13] = l10, e17 && t13.primaryKey.push(...e17);
                      } else a12 in i12 || (i12[a12] = { relations: {}, primaryKey: e17 }), i12[a12].relations[r13] = l10;
                    }
                    return { tables: n12, tableNamesMap: r12 };
                  }(t11.schema, d4);
                  i11 = { fullSchema: t11.schema, schema: e15.tables, tableNamesMap: e15.tableNamesMap };
                }
                let a10 = new pI(e14, n11, i11, { logger: r11, cache: t11.cache }), s10 = new pU("async", n11, a10, i11);
                return s10.$client = e14, s10.$cache = t11.cache, s10.$cache && (s10.$cache.invalidate = t11.cache?.onMutate), s10;
              }(e13, { schema: pG });
            }(), i10 = await e12.select().from(pj).where(dO(pj.email, t10.toLowerCase())).limit(1);
            if (0 === i10.length) return null;
            let n10 = i10[0];
            if (!n10.passwordHash || !n10.salt || !await pY(r10, n10.passwordHash, n10.salt)) return null;
            return { id: n10.id, name: n10.name, email: n10.email, role: n10.role };
          } catch (e12) {
            return console.error("Authorize callback error:", e12), null;
          }
        } } }], session: { strategy: "jwt" }, callbacks: { jwt: async ({ token: e11, user: t10 }) => (t10 && (e11.role = t10.role ?? pZ, e11.id = t10.id), e11), session: async ({ session: e11, token: t10 }) => (e11.user && (e11.user.role = t10.role ?? pZ, e11.user.id = t10.id), e11) }, pages: { signIn: "/admin/login" }, trustHost: true, secret: process.env.AUTH_SECRET, cookies: { sessionToken: { name: "__Secure-authjs.session-token", options: { httpOnly: true, sameSite: "lax", path: "/", secure: true } } } };
      });
      async function p4(e10) {
        let t10 = await p1(), r10 = !!t10?.user, i10 = t10?.user?.role, n10 = new URL(e10.url);
        if (n10.pathname.startsWith("/admin")) {
          if ("/admin/login" === n10.pathname || "/admin/register" === n10.pathname) return r10 && ("ADMIN" === i10 || "STAFF" === i10) ? ee.redirect(new URL("/admin/dashboard", e10.url)) : ee.next();
          if (!r10) return ee.redirect(new URL(`/admin/login?callbackUrl=${encodeURIComponent(n10.pathname)}`, e10.url));
          if ("ADMIN" !== i10 && "STAFF" !== i10) return ee.redirect(new URL("/", e10.url));
        }
        return n10.pathname.startsWith("/patient") && !r10 ? ee.redirect(new URL(`/admin/login?callbackUrl=${encodeURIComponent(n10.pathname)}`, e10.url)) : ee.next();
      }
      e.s(["config", 0, { matcher: ["/admin/:path*", "/patient/:path*"] }, "middleware", 0, p4], 99446);
      let p5 = { ...e.i(99446) }, p6 = "/middleware", p8 = p5.middleware || p5.default;
      if ("function" != typeof p8) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${p6}" must export a function named \`middleware\` or a default function.`);
      let p9 = (e10) => tp({ ...e10, IncrementalCache: t3, incrementalCacheHandler: null, page: p6, handler: async (...e11) => {
        try {
          return await p8(...e11);
        } catch (n10) {
          let t10 = e11[0], r10 = new URL(t10.url), i10 = r10.pathname + r10.search;
          throw await f(n10, { path: i10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), n10;
        }
      } });
      async function p7(e10, t10) {
        let r10 = await p9({ request: { url: e10.url, method: e10.method, headers: P(e10.headers), nextConfig: { basePath: "", i18n: "", trailingSlash: false, experimental: { cacheLife: { default: { stale: 300, revalidate: 900, expire: 4294967294 }, seconds: { stale: 30, revalidate: 1, expire: 60 }, minutes: { stale: 300, revalidate: 60, expire: 3600 }, hours: { stale: 300, revalidate: 3600, expire: 86400 }, days: { stale: 300, revalidate: 86400, expire: 604800 }, weeks: { stale: 300, revalidate: 604800, expire: 2592e3 }, max: { stale: 300, revalidate: 2592e3, expire: 31536e3 } }, authInterrupts: false, clientParamParsingOrigins: [] } }, page: { name: p6 }, body: "GET" !== e10.method && "HEAD" !== e10.method ? e10.body ?? void 0 : void 0, waitUntil: t10.waitUntil, requestMeta: t10.requestMeta, signal: t10.signal || new AbortController().signal } });
        return null == t10.waitUntil || t10.waitUntil.call(t10, r10.waitUntil), r10.response;
      }
      e.s(["default", 0, p9, "handler", 0, p7], 42738);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0dh3zbb.js
var require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_0dh3zbb = __commonJS({
  ".next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0dh3zbb.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0dh3zbb.js", { otherChunks: ["chunks/[root-of-the-server]__0rl5avo._.js", "chunks/node_modules_next_dist_0d_i8t_._.js"], runtimeModuleIds: [38022] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = ["NEXT_DEPLOYMENT_ID", "NEXT_CLIENT_ASSET_SUFFIX"];
      var r, n = ((r = n || {})[r.Runtime = 0] = "Runtime", r[r.Parent = 1] = "Parent", r[r.Update = 2] = "Update", r);
      let o = /* @__PURE__ */ new WeakMap();
      function u(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let l = u.prototype, i = Object.prototype.hasOwnProperty, a = "u" > typeof Symbol && Symbol.toStringTag;
      function s(e2, t2, r2) {
        i.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function c(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = f(t2), e2[t2] = r2), r2;
      }
      function f(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function d(e2, t2) {
        s(e2, "__esModule", { value: true }), a && s(e2, a, { value: "Module" });
        let r2 = 0;
        for (; r2 < t2.length; ) {
          let n2 = t2[r2++], o2 = t2[r2++];
          if ("number" == typeof o2) if (0 === o2) s(e2, n2, { value: t2[r2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[r2] ? s(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : s(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      function h(e2, t2) {
        (null != t2 ? c(this.c, t2) : this.m).exports = e2;
      }
      l.s = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = c(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, d(n2, e2);
      }, l.j = function(e2, t2) {
        var r2, n2;
        let u2, l2, a2;
        null != t2 ? l2 = (u2 = c(this.c, t2)).exports : (u2 = this.m, l2 = this.e);
        let s2 = (r2 = u2, n2 = l2, (a2 = o.get(r2)) || (o.set(r2, a2 = []), r2.exports = r2.namespaceObject = new Proxy(n2, { get(e3, t3) {
          if (i.call(e3, t3) || "default" === t3 || "__esModule" === t3) return Reflect.get(e3, t3);
          for (let e4 of a2) {
            let r3 = Reflect.get(e4, t3);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          let t3 = Reflect.ownKeys(e3);
          for (let e4 of a2) for (let r3 of Reflect.ownKeys(e4)) "default" === r3 || t3.includes(r3) || t3.push(r3);
          return t3;
        } })), a2);
        "object" == typeof e2 && null !== e2 && s2.push(e2);
      }, l.v = h, l.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? c(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let p = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, m = [null, p({}), p([]), p(p)];
      function b(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !m.includes(t3); t3 = p(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), d(t2, n2), t2;
      }
      function y(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function g(e2) {
        let t2 = K(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = b(r2, y(r2), r2 && r2.__esModule);
      }
      function w(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function O(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function _() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      l.i = g, l.A = function(e2) {
        return this.r(e2)(g.bind(this));
      }, l.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, l.r = function(e2) {
        return K(e2, this.m).exports;
      }, l.f = function(e2) {
        function t2(t3) {
          if (t3 = w(t3), i.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = w(t3), i.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let k = Symbol("turbopack queues"), j = Symbol("turbopack exports"), C = Symbol("turbopack error");
      function P(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      l.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: l2, promise: i2 } = _(), a2 = Object.assign(i2, { [j]: r2.exports, [k]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), a2.catch(() => {
          });
        } }), s2 = { get: () => a2, set(e3) {
          e3 !== a2 && (a2[j] = e3);
        } };
        Object.defineProperty(r2, "exports", s2), Object.defineProperty(r2, "namespaceObject", s2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (k in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [j]: {}, [k]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[j] = e5, P(t4);
                }, (e5) => {
                  r4[C] = e5, P(t4);
                }), r4;
              }
            }
            return { [j]: e4, [k]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[C]) throw e4[C];
            return e4[j];
          }), { promise: u3, resolve: l3 } = _(), i3 = Object.assign(() => l3(r3), { queueCount: 0 });
          function a3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (i3.queueCount++, e4.push(i3)));
          }
          return t3.map((e4) => e4[k](a3)), i3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? l2(a2[C] = e3) : u2(a2[j]), P(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let v = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function E(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      v.prototype = URL.prototype, l.U = v, l.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, l.g = globalThis;
      let U = u.prototype, R = /* @__PURE__ */ new Map();
      l.M = R;
      let x = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map();
      async function $(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return A(e2, t2, q(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!R.has(e3) || x.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let l2 = r2.moduleChunks || [], i2 = l2.map((e3) => M.get(e3)).filter((e3) => e3);
        if (i2.length > 0) {
          if (i2.length === l2.length) return void await Promise.all(i2);
          let r3 = /* @__PURE__ */ new Set();
          for (let e3 of l2) M.has(e3) || r3.add(e3);
          for (let n3 of r3) {
            let r4 = A(e2, t2, q(n3));
            M.set(n3, r4), i2.push(r4);
          }
          n2 = Promise.all(i2);
        } else {
          for (let o3 of (n2 = A(e2, t2, q(r2.path)), l2)) M.has(o3) || M.set(o3, n2);
        }
        for (let e3 of o2) x.has(e3) || x.set(e3, n2);
        await n2;
      }
      U.l = function(e2) {
        return $(n.Parent, this.m.id, e2);
      };
      let T = Promise.resolve(void 0), S = /* @__PURE__ */ new WeakMap();
      function A(t2, r2, o2) {
        let u2 = e.loadChunkCached(t2, o2), l2 = S.get(u2);
        if (void 0 === l2) {
          let e2 = S.set.bind(S, u2, T);
          l2 = u2.then(e2).catch((e3) => {
            let u3;
            switch (t2) {
              case n.Runtime:
                u3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case n.Parent:
                u3 = `from module ${r2}`;
                break;
              case n.Update:
                u3 = "from an HMR update";
                break;
              default:
                E(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let l3 = Error(`Failed to load chunk ${o2} ${u3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw l3.name = "ChunkLoadError", l3;
          }), S.set(u2, l2);
        }
        return l2;
      }
      function q(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      U.L = function(e2) {
        return A(n.Parent, this.m.id, e2);
      }, U.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, U.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, U.q = function(e2, t2) {
        h.call(this, `${e2}`, t2);
      }, U.b = function(e2, r2, n2, o2) {
        let u2 = "SharedWorker" === e2.name, l2 = [n2.map((e3) => q(e3)).reverse(), ""];
        for (let e3 of t) l2.push(globalThis[e3]);
        let i2 = new URL(q(r2), location.origin), a2 = JSON.stringify(l2);
        return u2 ? i2.searchParams.set("params", a2) : i2.hash = "#params=" + encodeURIComponent(a2), new e2(i2, o2 ? { ...o2, type: void 0 } : void 0);
      };
      let N = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      l.w = function(t2, r2, o2) {
        return e.loadWebAssembly(n.Parent, this.m.id, t2, r2, o2);
      }, l.u = function(t2, r2) {
        return e.loadWebAssemblyModule(n.Parent, this.m.id, t2, r2);
      };
      let I = {};
      l.c = I;
      let K = (e2, t2) => {
        let r2 = I[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return L(e2, n.Parent, t2.id);
      };
      function L(e2, t2, r2) {
        let n2 = R.get(e2);
        if ("function" != typeof n2) throw Error(function(e3, t3, r3) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r3}`;
              break;
            case 1:
              n3 = `because it was required from module ${r3}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              E(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, r2));
        let o2 = f(e2), l2 = o2.exports;
        I[e2] = o2;
        let i2 = new u(o2, l2);
        try {
          n2(i2, o2, l2);
        } catch (e3) {
          throw o2.error = e3, e3;
        }
        return o2.namespaceObject && o2.exports !== o2.namespaceObject && b(o2.exports, o2.namespaceObject), o2;
      }
      function W(t2) {
        let r2, n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          if (e2) return { src: e2.getAttribute("src") };
          if ("u" > typeof TURBOPACK_NEXT_CHUNK_URLS) return { src: TURBOPACK_NEXT_CHUNK_URLS.pop() };
          throw Error("chunk path empty but not in a worker");
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3) {
          let r3 = 1;
          for (; r3 < e2.length; ) {
            let n3, o2 = r3 + 1;
            for (; o2 < e2.length && "function" != typeof e2[o2]; ) o2++;
            if (o2 === e2.length) throw Error("malformed chunk format, expected a factory function");
            let u2 = e2[o2];
            for (let u3 = r3; u3 < o2; u3++) {
              let r4 = e2[u3], o3 = t3.get(r4);
              if (o3) {
                n3 = o3;
                break;
              }
            }
            let l2 = n3 ?? u2, i2 = false;
            for (let n4 = r3; n4 < o2; n4++) {
              let r4 = e2[n4];
              t3.has(r4) || (i2 || (l2 === u2 && Object.defineProperty(u2, "name", { value: "module evaluation" }), i2 = true), t3.set(r4, l2));
            }
            r3 = o2 + 1;
          }
        }(t2, R)), e.registerChunk(n2, r2);
      }
      function B(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : b(n2, y(n2), true);
      }
      l.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? b(t2.default, y(t2), true) : t2;
      }, B.resolve = (e2, t2) => __require.resolve(e2, t2), l.x = B, e = { registerChunk(e2, t2) {
        let r2 = function(e3) {
          if ("string" == typeof e3) return e3;
          let t3 = decodeURIComponent(e3.src.replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(e2);
        F.add(r2), function(e3) {
          let t3 = D.get(e3);
          if (null != t3) {
            for (let r3 of t3) r3.requiredChunks.delete(e3), 0 === r3.requiredChunks.size && X(r3.runtimeModuleIds, r3.chunkPath);
            D.delete(e3);
          }
        }(r2), null != t2 && (0 === t2.otherChunks.length ? X(t2.runtimeModuleIds, r2) : function(e3, t3, r3) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r3, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = O(e4);
            if (F.has(t4)) continue;
            n2.add(t4);
            let r4 = D.get(t4);
            null == r4 && (r4 = /* @__PURE__ */ new Set(), D.set(t4, r4)), r4.add(o2);
          }
          0 === o2.requiredChunks.size && X(o2.runtimeModuleIds, o2.chunkPath);
        }(r2, t2.otherChunks.filter((e3) => {
          var t3;
          return t3 = O(e3), N.test(t3);
        }), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      }, async loadWebAssembly(e2, t2, r2, n2, o2) {
        let u2 = await z(r2, n2);
        return await WebAssembly.instantiate(u2, o2);
      }, loadWebAssemblyModule: async (e2, t2, r2, n2) => z(r2, n2) };
      let F = /* @__PURE__ */ new Set(), D = /* @__PURE__ */ new Map();
      function X(e2, t2) {
        for (let r2 of e2) !function(e3, t3) {
          let r3 = I[t3];
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          L(t3, n.Runtime, e3);
        }(t2, r2);
      }
      async function z(e2, t2) {
        let r2;
        try {
          r2 = t2();
        } catch (e3) {
        }
        if (!r2) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return r2;
      }
      let H = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: W }, H.forEach(W);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/patient(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$"] }];
    require_root_of_the_server_0rl5avo();
    require_node_modules_next_dist_0d_i8t();
    require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_0dh3zbb();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.js", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [{ "protocol": "https", "hostname": "lh3.googleusercontent.com" }, { "protocol": "https", "hostname": "images.unsplash.com" }], "qualities": [75], "unoptimized": false, "customCacheHandler": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": { "serverFunctions": true, "browserToTerminal": "warn" }, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "F:\\boroKhalamoni\\medical", "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "experimental": { "appNewScrollHandler": false, "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "cachedNavigations": false, "partialFallbacks": false, "dynamicOnHover": false, "varyParams": false, "prefetchInlining": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 11, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "strictRouteTypes": false, "viewTransition": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": true, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "gestureTransition": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "browserDebugInfoInTerminal": "warn", "lockDistDir": true, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": false, "turbopackInferModuleSideEffects": true, "turbopackPluginRuntimeStrategy": "childProcesses", "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.js", "turbopack": { "root": "F:\\boroKhalamoni\\medical" }, "distDirRoot": ".next" };
var BuildId = "4_94il4xbrmv3f7mq8Qns";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/about", "regex": "^/about(?:/)?$", "routeKeys": {}, "namedRegex": "^/about(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/dashboard", "regex": "^/admin/dashboard(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/dashboard(?:/)?$" }, { "page": "/admin/login", "regex": "^/admin/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/login(?:/)?$" }, { "page": "/admin/register", "regex": "^/admin/register(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/register(?:/)?$" }, { "page": "/admin/upload", "regex": "^/admin/upload(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/upload(?:/)?$" }, { "page": "/api/admin/content", "regex": "^/api/admin/content(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/content(?:/)?$" }, { "page": "/api/admin/login", "regex": "^/api/admin/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/login(?:/)?$" }, { "page": "/api/admin/logout", "regex": "^/api/admin/logout(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/logout(?:/)?$" }, { "page": "/api/admin/users", "regex": "^/api/admin/users(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/users(?:/)?$" }, { "page": "/api/appointments", "regex": "^/api/appointments(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/appointments(?:/)?$" }, { "page": "/blog", "regex": "^/blog(?:/)?$", "routeKeys": {}, "namedRegex": "^/blog(?:/)?$" }, { "page": "/contact", "regex": "^/contact(?:/)?$", "routeKeys": {}, "namedRegex": "^/contact(?:/)?$" }, { "page": "/doctors", "regex": "^/doctors(?:/)?$", "routeKeys": {}, "namedRegex": "^/doctors(?:/)?$" }, { "page": "/faq", "regex": "^/faq(?:/)?$", "routeKeys": {}, "namedRegex": "^/faq(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/hospitals", "regex": "^/hospitals(?:/)?$", "routeKeys": {}, "namedRegex": "^/hospitals(?:/)?$" }, { "page": "/medical-visa", "regex": "^/medical\\-visa(?:/)?$", "routeKeys": {}, "namedRegex": "^/medical\\-visa(?:/)?$" }, { "page": "/patient/dashboard", "regex": "^/patient/dashboard(?:/)?$", "routeKeys": {}, "namedRegex": "^/patient/dashboard(?:/)?$" }, { "page": "/privacy-policy", "regex": "^/privacy\\-policy(?:/)?$", "routeKeys": {}, "namedRegex": "^/privacy\\-policy(?:/)?$" }, { "page": "/services", "regex": "^/services(?:/)?$", "routeKeys": {}, "namedRegex": "^/services(?:/)?$" }, { "page": "/terms", "regex": "^/terms(?:/)?$", "routeKeys": {}, "namedRegex": "^/terms(?:/)?$" }, { "page": "/treatments", "regex": "^/treatments(?:/)?$", "routeKeys": {}, "namedRegex": "^/treatments(?:/)?$" }], "dynamic": [{ "page": "/api/auth/[...nextauth]", "regex": "^/api/auth/(.+?)(?:/)?$", "routeKeys": { "nxtPnextauth": "nxtPnextauth" }, "namedRegex": "^/api/auth/(?<nxtPnextauth>.+?)(?:/)?$" }, { "page": "/blog/[slug]", "regex": "^/blog/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/blog/(?<nxtPslug>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [{ "source": "/:path*", "headers": [{ "key": "X-Content-Type-Options", "value": "nosniff" }, { "key": "X-Frame-Options", "value": "DENY" }, { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }, { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }], "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }];
var PrerenderManifest = { "version": 4, "routes": { "/": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/about": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/about", "dataRoute": "/about.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin", "dataRoute": "/admin.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/login": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/login", "dataRoute": "/admin/login.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/register": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/register", "dataRoute": "/admin/register.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/upload": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/upload", "dataRoute": "/admin/upload.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog", "dataRoute": "/blog.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/contact": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/contact", "dataRoute": "/contact.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/doctors": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/doctors", "dataRoute": "/doctors.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/faq": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/faq", "dataRoute": "/faq.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/hospitals": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/hospitals", "dataRoute": "/hospitals.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/medical-visa": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/medical-visa", "dataRoute": "/medical-visa.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/privacy-policy": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/privacy-policy", "dataRoute": "/privacy-policy.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/services": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/services", "dataRoute": "/services.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/terms": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/terms", "dataRoute": "/terms.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/treatments": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/treatments", "dataRoute": "/treatments.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "ebf3d3f5b7d7a697e09d16050ebfb143", "previewModeSigningKey": "3dc3380d7b2e9551d4ee8822178b592c27d294d288b09800b56bc910e7f4680e", "previewModeEncryptionKey": "13ac4d2ce73ce782f3d47a06fc3f74b277a2e323f403ae408a047109bd77b30c" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__0rl5avo._.js", "server/edge/chunks/node_modules_next_dist_0d_i8t_._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0dh3zbb.js"], "name": "middleware", "page": "/", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0dh3zbb.js", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/admin/:path*" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/patient(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/patient/:path*" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "4_94il4xbrmv3f7mq8Qns", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Np5u8+xLBZ8IeQ2pvZnG3PfD56SuyNB0Qb2rA4OuUd8=", "__NEXT_PREVIEW_MODE_ID": "ebf3d3f5b7d7a697e09d16050ebfb143", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "13ac4d2ce73ce782f3d47a06fc3f74b277a2e323f403ae408a047109bd77b30c", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "3dc3380d7b2e9551d4ee8822178b592c27d294d288b09800b56bc910e7f4680e" } } }, "sortedMiddleware": ["/"], "functions": { "/admin/dashboard/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_1d7e6ux._.js", "server/edge/chunks/ssr/_090ab-0._.js", "server/edge/chunks/ssr/node_modules_next_dist_0ktlevu._.js", "server/edge/chunks/ssr/node_modules_179p869._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1zxnqeb._.js", "server/edge/chunks/ssr/node_modules_next_dist_0iea_qs._.js", "server/edge/chunks/ssr/app_admin_dashboard_DashboardTabs_tsx_03nmkrz._.js", "server/app/admin/dashboard/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_03g6x1-._.js", "server/edge/chunks/ssr/[root-of-the-server]__1_107wo._.js", "server/edge/chunks/ssr/node_modules_next_dist_0ub_o75._.js", "server/edge/chunks/ssr/_0clonew._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_1a94epc.js", "server/edge/chunks/ssr/_1xh7ps8._.js", "server/edge/chunks/ssr/_01gxq_1._.js", "server/edge/chunks/ssr/node_modules_next_dist_16_2mw3._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_0czwz5q._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_092l9bg._.js", "server/edge/chunks/ssr/node_modules_0o03eks._.js", "server/edge/chunks/ssr/[root-of-the-server]__1_kx8bt._.js", "server/edge/chunks/ssr/node_modules_next_dist_042kahv._.js", "server/edge/chunks/ssr/node_modules_13wzio4._.js", "server/edge/chunks/ssr/node_modules_next_dist_072nntg._.js", "server/edge/chunks/ssr/[root-of-the-server]__1lwhjev._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_build_templates_edge-ssr-app_0a9_np1.js", "server/edge/chunks/ssr/node_modules_next_dist_0hvoqp9._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0c3h2oi.js", "server/app/admin/dashboard/page/react-loadable-manifest.js"], "name": "app/admin/dashboard/page", "page": "/admin/dashboard/page", "entrypoint": "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0c3h2oi.js", "matchers": [{ "regexp": "^/admin/dashboard(?:/)?$", "originalSource": "/admin/dashboard" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "4_94il4xbrmv3f7mq8Qns", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Np5u8+xLBZ8IeQ2pvZnG3PfD56SuyNB0Qb2rA4OuUd8=", "__NEXT_PREVIEW_MODE_ID": "ebf3d3f5b7d7a697e09d16050ebfb143", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "13ac4d2ce73ce782f3d47a06fc3f74b277a2e323f403ae408a047109bd77b30c", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "3dc3380d7b2e9551d4ee8822178b592c27d294d288b09800b56bc910e7f4680e" } }, "/api/admin/content/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/content/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_content_route_actions_1f21a8e.js", "server/edge/chunks/[root-of-the-server]__0yhbtnk._.js", "server/edge/chunks/_0wi58gb._.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_02d8s7l.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1rwz82k.js"], "name": "app/api/admin/content/route", "page": "/api/admin/content/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1rwz82k.js", "matchers": [{ "regexp": "^/api/admin/content(?:/)?$", "originalSource": "/api/admin/content" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "4_94il4xbrmv3f7mq8Qns", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Np5u8+xLBZ8IeQ2pvZnG3PfD56SuyNB0Qb2rA4OuUd8=", "__NEXT_PREVIEW_MODE_ID": "ebf3d3f5b7d7a697e09d16050ebfb143", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "13ac4d2ce73ce782f3d47a06fc3f74b277a2e323f403ae408a047109bd77b30c", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "3dc3380d7b2e9551d4ee8822178b592c27d294d288b09800b56bc910e7f4680e" } }, "/api/admin/users/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/users/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_users_route_actions_1xprzc5.js", "server/edge/chunks/[root-of-the-server]__1dka94q._.js", "server/edge/chunks/_0wi58gb._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_16x5cwu.js"], "name": "app/api/admin/users/route", "page": "/api/admin/users/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_16x5cwu.js", "matchers": [{ "regexp": "^/api/admin/users(?:/)?$", "originalSource": "/api/admin/users" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "4_94il4xbrmv3f7mq8Qns", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Np5u8+xLBZ8IeQ2pvZnG3PfD56SuyNB0Qb2rA4OuUd8=", "__NEXT_PREVIEW_MODE_ID": "ebf3d3f5b7d7a697e09d16050ebfb143", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "13ac4d2ce73ce782f3d47a06fc3f74b277a2e323f403ae408a047109bd77b30c", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "3dc3380d7b2e9551d4ee8822178b592c27d294d288b09800b56bc910e7f4680e" } }, "/api/appointments/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/appointments/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_appointments_route_actions_0z-pyay.js", "server/edge/chunks/[root-of-the-server]__161914m._.js", "server/edge/chunks/_1rjplm_._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_09h2yhf.js"], "name": "app/api/appointments/route", "page": "/api/appointments/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_09h2yhf.js", "matchers": [{ "regexp": "^/api/appointments(?:/)?$", "originalSource": "/api/appointments" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "4_94il4xbrmv3f7mq8Qns", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Np5u8+xLBZ8IeQ2pvZnG3PfD56SuyNB0Qb2rA4OuUd8=", "__NEXT_PREVIEW_MODE_ID": "ebf3d3f5b7d7a697e09d16050ebfb143", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "13ac4d2ce73ce782f3d47a06fc3f74b277a2e323f403ae408a047109bd77b30c", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "3dc3380d7b2e9551d4ee8822178b592c27d294d288b09800b56bc910e7f4680e" } }, "/api/auth/[...nextauth]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/[...nextauth]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_[___nextauth]_route_actions_0rd81-f.js", "server/edge/chunks/[root-of-the-server]__1ip2637._.js", "server/edge/chunks/_0rwufa6._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0b4jrh-.js"], "name": "app/api/auth/[...nextauth]/route", "page": "/api/auth/[...nextauth]/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0b4jrh-.js", "matchers": [{ "regexp": "^/api/auth/(?P<nxtPnextauth>.+?)(?:/)?$", "originalSource": "/api/auth/[...nextauth]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "4_94il4xbrmv3f7mq8Qns", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Np5u8+xLBZ8IeQ2pvZnG3PfD56SuyNB0Qb2rA4OuUd8=", "__NEXT_PREVIEW_MODE_ID": "ebf3d3f5b7d7a697e09d16050ebfb143", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "13ac4d2ce73ce782f3d47a06fc3f74b277a2e323f403ae408a047109bd77b30c", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "3dc3380d7b2e9551d4ee8822178b592c27d294d288b09800b56bc910e7f4680e" } }, "/blog/[slug]/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_1d7e6ux._.js", "server/edge/chunks/ssr/_090ab-0._.js", "server/edge/chunks/ssr/node_modules_next_dist_0ktlevu._.js", "server/edge/chunks/ssr/node_modules_179p869._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1zxnqeb._.js", "server/edge/chunks/ssr/node_modules_next_dist_03p3kvw._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_client_image-component_1n4w9qy.js", "server/edge/chunks/ssr/node_modules_next_dist_0iea_qs._.js", "server/app/blog/[slug]/page_client-reference-manifest.js", "server/edge/chunks/ssr/_next-internal_server_app_blog_[slug]_page_actions_20vp-0s.js", "server/edge/chunks/ssr/node_modules_0o03eks._.js", "server/edge/chunks/ssr/node_modules_next_dist_1jspkuz._.js", "server/edge/chunks/ssr/[root-of-the-server]__1_hhoj1._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_0czwz5q._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_build_templates_edge-ssr-app_05eogzv.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_1a94epc.js", "server/edge/chunks/ssr/node_modules_next_dist_042kahv._.js", "server/edge/chunks/ssr/node_modules_next_dist_072nntg._.js", "server/edge/chunks/ssr/node_modules_next_dist_0hvoqp9._.js", "server/edge/chunks/ssr/node_modules_next_dist_02z-z4t._.js", "server/edge/chunks/ssr/[root-of-the-server]__1lwhjev._.js", "server/edge/chunks/ssr/node_modules_13wzio4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_03ifmzg._.js", "server/edge/chunks/ssr/_1xh7ps8._.js", "server/edge/chunks/ssr/[root-of-the-server]__1wletrt._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1lm8jnq.js", "server/app/blog/[slug]/page/react-loadable-manifest.js"], "name": "app/blog/[slug]/page", "page": "/blog/[slug]/page", "entrypoint": "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1lm8jnq.js", "matchers": [{ "regexp": "^/blog/(?P<nxtPslug>[^/]+?)(?:/)?$", "originalSource": "/blog/[slug]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "4_94il4xbrmv3f7mq8Qns", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Np5u8+xLBZ8IeQ2pvZnG3PfD56SuyNB0Qb2rA4OuUd8=", "__NEXT_PREVIEW_MODE_ID": "ebf3d3f5b7d7a697e09d16050ebfb143", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "13ac4d2ce73ce782f3d47a06fc3f74b277a2e323f403ae408a047109bd77b30c", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "3dc3380d7b2e9551d4ee8822178b592c27d294d288b09800b56bc910e7f4680e" } }, "/patient/dashboard/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_1d7e6ux._.js", "server/edge/chunks/ssr/_090ab-0._.js", "server/edge/chunks/ssr/node_modules_next_dist_0ktlevu._.js", "server/edge/chunks/ssr/node_modules_179p869._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1zxnqeb._.js", "server/edge/chunks/ssr/node_modules_next_dist_0iea_qs._.js", "server/app/patient/dashboard/page_client-reference-manifest.js", "server/edge/chunks/ssr/_next-internal_server_app_patient_dashboard_page_actions_0ju5gxt.js", "server/edge/chunks/ssr/node_modules_0o03eks._.js", "server/edge/chunks/ssr/node_modules_next_dist_1jspkuz._.js", "server/edge/chunks/ssr/[root-of-the-server]__1_hhoj1._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kdfmyr._.js", "server/edge/chunks/ssr/node_modules_next_dist_02z-z4t._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_03ifmzg._.js", "server/edge/chunks/ssr/node_modules_next_dist_042kahv._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_build_templates_edge-ssr-app_10vxkkc.js", "server/edge/chunks/ssr/node_modules_next_dist_0hvoqp9._.js", "server/edge/chunks/ssr/node_modules_next_dist_072nntg._.js", "server/edge/chunks/ssr/_19bwmfy._.js", "server/edge/chunks/ssr/[root-of-the-server]__1lwhjev._.js", "server/edge/chunks/ssr/_01gxq_1._.js", "server/edge/chunks/ssr/node_modules_13wzio4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_1a94epc.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_0czwz5q._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1slo5zh.js", "server/app/patient/dashboard/page/react-loadable-manifest.js"], "name": "app/patient/dashboard/page", "page": "/patient/dashboard/page", "entrypoint": "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1slo5zh.js", "matchers": [{ "regexp": "^/patient/dashboard(?:/)?$", "originalSource": "/patient/dashboard" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "4_94il4xbrmv3f7mq8Qns", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Np5u8+xLBZ8IeQ2pvZnG3PfD56SuyNB0Qb2rA4OuUd8=", "__NEXT_PREVIEW_MODE_ID": "ebf3d3f5b7d7a697e09d16050ebfb143", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "13ac4d2ce73ce782f3d47a06fc3f74b277a2e323f403ae408a047109bd77b30c", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "3dc3380d7b2e9551d4ee8822178b592c27d294d288b09800b56bc910e7f4680e" } } } };
var AppPathRoutesManifest = { "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/about/page": "/about", "/admin/dashboard/page": "/admin/dashboard", "/admin/login/page": "/admin/login", "/admin/page": "/admin", "/admin/register/page": "/admin/register", "/admin/upload/page": "/admin/upload", "/api/admin/content/route": "/api/admin/content", "/api/admin/login/route": "/api/admin/login", "/api/admin/logout/route": "/api/admin/logout", "/api/admin/users/route": "/api/admin/users", "/api/appointments/route": "/api/appointments", "/api/auth/[...nextauth]/route": "/api/auth/[...nextauth]", "/blog/[slug]/page": "/blog/[slug]", "/blog/page": "/blog", "/contact/page": "/contact", "/doctors/page": "/doctors", "/faq/page": "/faq", "/favicon.ico/route": "/favicon.ico", "/hospitals/page": "/hospitals", "/medical-visa/page": "/medical-visa", "/page": "/", "/patient/dashboard/page": "/patient/dashboard", "/privacy-policy/page": "/privacy-policy", "/services/page": "/services", "/terms/page": "/terms", "/treatments/page": "/treatments" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/admin/dashboard": {}, "/api/admin/content": {}, "/api/admin/users": {}, "/api/appointments": {}, "/api/auth/[...nextauth]": {}, "/blog/[slug]": {}, "/patient/dashboard": {} } };
var PagesManifest = { "/404": "pages/404.html", "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(localizedPath, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !(event.query.__nextDataReq === "1") && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
