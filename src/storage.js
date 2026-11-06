export function createStore(storage, onError = () => {}) {
  // Failed writes remain readable for this page. Successful writes always read
  // the underlying store so changes from other tabs are not hidden by a cache.
  const temporary = new Map();
  function read(key, fallback) {
    try {
      const value = temporary.has(key)
        ? temporary.get(key)
        : storage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  function write(key, value) {
    const serialized = JSON.stringify(value);
    try {
      storage.setItem(key, serialized);
      temporary.delete(key);
      return true;
    } catch {
      temporary.set(key, serialized);
      onError();
      return false;
    }
  }
  return {
    read,
    write,
    raw(key) {
      try {
        return (
          (temporary.has(key) ? temporary.get(key) : storage.getItem(key)) || ""
        );
      } catch {
        return "";
      }
    },
    remove(key) {
      try {
        storage.removeItem(key);
        temporary.delete(key);
        return true;
      } catch {
        temporary.set(key, null);
        onError();
        return false;
      }
    },
  };
}
export function migrateFavorites(store, catalog) {
  const current = store.read("define_favorites", null);
  if (Array.isArray(current))
    return current.filter((item) => typeof item === "string");
  const old = store.read("favorites", []);
  const legacy = store
    .raw("favoritesAll")
    .split("\n")
    .map((line) => line.split(" - ")[0].trim())
    .filter(Boolean);
  const saved = [...(Array.isArray(old) ? old : []), ...legacy]
    .filter((term) => typeof term === "string")
    .map(
      (term) =>
        catalog.find((item) => item.term.toLowerCase() === term.toLowerCase())
          ?.id || term.trim(),
    )
    .filter(Boolean);
  const unique = [...new Set(saved)];
  store.write("define_favorites", unique);
  return unique;
}
