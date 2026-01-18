import { createContext } from "react-router";

interface User {
    username: string,
    firstName: string,
    lastName: string,
    email: string
}

export const userContext = createContext<User | null>(null);
