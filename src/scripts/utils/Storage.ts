/* @flow */

export function loadLocalStorageByKey<T>(key: string): Promise<T | null> {
  return new Promise(resolve => {
    const serializedSrc = window.localStorage.getItem(key)
    if (serializedSrc) {
      const deserializedSrc = JSON.parse(serializedSrc)
      resolve(deserializedSrc)
    }
  })
}

export function saveLocalStorageByKey(src: any, key: string): Promise<void> {
  return new Promise(resolve => {
    const serializedSrc = JSON.stringify(src)
    window.localStorage.setItem(key, serializedSrc)
    resolve()
  })
}

export function deleteLocalStorageByKey(key: string): Promise<void> {
  return new Promise(resolve => {
    window.localStorage.removeItem(key)
    resolve()
  })
}

export function wait(duration: number = 0): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
