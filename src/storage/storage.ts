type StorageLocation = 'session' | 'local'
// ^ local is actually sync in this case.
export function getItem(
    location: StorageLocation,
    key: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const storage = chooseStorage(location);
    storage.get(key, function(items) {
      if (items[key]) {
        resolve(items[key]);
      } else {
        reject(new Error('No value found'));
      }
    });
  });
}

export function setItem(
    location: StorageLocation,
    storageKey: string,
    value: string,
): void {
  const setter = {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setter[storageKey] = value;
  const storage = chooseStorage(location);
  storage.set(setter, function() {
    console.log('Value is set to ' + value);
  });
}

export function itemExists(
    location: StorageLocation,
    key: string,
): Promise<boolean> {
  return new Promise((resolve) => {
    const storage = chooseStorage(location);
    storage.get(key, function(items) {
      if (items[key]) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function chooseStorage(location: StorageLocation): chrome.storage.StorageArea {
  switch (location) {
    case 'session':
      return chrome.storage.session;
    case 'local':
      return chrome.storage.sync;
  }
}
