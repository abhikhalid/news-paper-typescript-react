import { createContext, useContext } from "react";
import NewsStore from "./newsStore";

interface Store {
    newsStore: NewsStore
}


export const store: Store = {
    newsStore: new NewsStore()
}


export const StoreContext = createContext(store);


export function useStore() {
    return useContext(StoreContext);
}