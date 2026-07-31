(function (global) {
  function normalizeBase(base) {
    if (!base) return '';
    return String(base).replace(/\/$/, '');
  }

  function getDefaultApiBase() {
    if (typeof global !== 'undefined' && global.__EDURANK_API_BASE_URL__) {
      return normalizeBase(global.__EDURANK_API_BASE_URL__);
    }

    if (typeof document !== 'undefined') {
      const meta = document.querySelector('meta[name="edurank-api-base-url"]');
      if (meta && meta.content) {
        return normalizeBase(meta.content);
      }
    }

    if (typeof window !== 'undefined' && window.location) {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3000';
      }
    }

    return '';
  }

  function getApiBaseUrl(override) {
    const base = override || global.__EDURANK_API_BASE_URL__ || getDefaultApiBase();
    if (!base) return '/api';
    return normalizeBase(base);
  }

  function getApiUrl(path, override) {
    const base = getApiBaseUrl(override);
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    // The same-origin default already includes the API prefix. Avoid producing
    // `/api/api/...` when callers pass the conventional `/api/...` route.
    if (base === '/api' && (normalizedPath === '/api' || normalizedPath.startsWith('/api/'))) {
      return normalizedPath;
    }
    if (!base) return normalizedPath;
    return `${base}${normalizedPath}`;
  }

  function getSocketUrl(override) {
    const base = override || global.__EDURANK_SOCKET_URL__ || getDefaultApiBase();
    if (!base) return '/';
    return normalizeBase(base);
  }

  function getSocketScriptUrl(override) {
    const base = override || global.__EDURANK_SOCKET_URL__ || getDefaultApiBase();
    if (!base) return 'https://cdn.socket.io/4.8.3/socket.io.min.js';
    return `${normalizeBase(base)}/socket.io/socket.io.js`;
  }

  const apiConfig = {
    getApiUrl,
    getApiBaseUrl,
    getSocketUrl,
    getSocketScriptUrl
  };

  global.EduRankConfig = apiConfig;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = apiConfig;
  }
})(typeof window !== 'undefined' ? window : globalThis);
