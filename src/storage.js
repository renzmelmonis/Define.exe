// Read and write browser data in one place.
// If a write fails, keep that value in memory until this page is left.
export function createStore(storage, onError) {
  if (onError === undefined) {
    onError = function () {};
  }

  const temporaryValues = new Map();

  function raw(key) {
    try {
      let value;

      if (temporaryValues.has(key)) {
        value = temporaryValues.get(key);
      } else {
        value = storage.getItem(key);
      }

      if (value === null) {
        return "";
      }

      return value;
    } catch {
      return "";
    }
  }

  function read(key, fallback) {
    const text = raw(key);

    if (text === "") {
      return fallback;
    }

    try {
      return JSON.parse(text);
    } catch {
      return fallback;
    }
  }

  function write(key, value) {
    const text = JSON.stringify(value);

    try {
      storage.setItem(key, text);
      temporaryValues.delete(key);
      return true;
    } catch {
      temporaryValues.set(key, text);
      onError();
      return false;
    }
  }

  function remove(key) {
    try {
      storage.removeItem(key);
      temporaryValues.delete(key);
      return true;
    } catch {
      temporaryValues.set(key, null);
      onError();
      return false;
    }
  }

  return {
    read: read,
    write: write,
    raw: raw,
    remove: remove,
  };
}

// Older versions used two different favorites formats.
// Convert both formats once so existing discoveries are not lost.
export function migrateFavorites(store, catalog) {
  const currentFavorites = store.read("define_favorites", null);
  const savedTerms = [];

  if (Array.isArray(currentFavorites)) {
    for (const item of currentFavorites) {
      if (typeof item === "string") {
        savedTerms.push(item);
      }
    }

    return savedTerms;
  }

  const oldFavorites = store.read("favorites", []);
  const oldCombinedText = store.raw("favoritesAll");
  const oldLines = oldCombinedText.split("\n");
  const itemsToConvert = [];

  if (Array.isArray(oldFavorites)) {
    for (const item of oldFavorites) {
      itemsToConvert.push(item);
    }
  }

  for (const line of oldLines) {
    const parts = line.split(" - ");
    const word = parts[0].trim();

    if (word !== "") {
      itemsToConvert.push(word);
    }
  }

  for (const item of itemsToConvert) {
    if (typeof item !== "string") {
      continue;
    }

    let savedName = item.trim();
    const lowercaseName = savedName.toLowerCase();

    for (const term of catalog) {
      if (term.term.toLowerCase() === lowercaseName) {
        savedName = term.id;
        break;
      }
    }

    if (savedName === "") {
      continue;
    }

    if (!savedTerms.includes(savedName)) {
      savedTerms.push(savedName);
    }
  }

  store.write("define_favorites", savedTerms);
  return savedTerms;
}
