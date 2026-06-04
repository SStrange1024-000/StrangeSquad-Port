// used to store access token in your local storage

export const KEY_ACCESS_TOKEN=""

export function getItem(key){
    return sessionStorage.getItem(key)
}

export function setItem(key, value){
     sessionStorage.setItem(key, value);
}

export function removeItem(key){
     sessionStorage.removeItem(key);
}