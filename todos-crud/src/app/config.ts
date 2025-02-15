import { environment } from "../environments/environment";

export const GlobalVariable = Object.freeze({
    BASE_URL: environment.API_URL,
});

export const ApiUrls = Object.freeze({
    LOGIN_USER: `${GlobalVariable.BASE_URL}users/login`,
    TODOS: `${GlobalVariable.BASE_URL}todos`,
});