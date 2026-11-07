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
