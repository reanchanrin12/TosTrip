// set token to local storage
import  secureLocalStorage  from  "react-secure-storage";


export function setToken(token){
    secureLocalStorage.setItem(import.meta.env.VITE_SECURE_LOCAL_STORAGE_PREFIX, token)
}

export function removeToken(){
    secureLocalStorage.removeItem(import.meta.env.VITE_SECURE_LOCAL_STORAGE_PREFIX)
}
