"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useServices = exports.UserAPI = void 0;
const swr_1 = require("swr");
function baseFetcher(endpoint, requestInit) {
    return () => fetch(endpoint, requestInit).then(res => res.json()).catch(err => console.log(err));
}
class UserAPI {
    static urls = {
        users: "https://jsonplaceholder.typicode.com/users",
        posts: "https://jsonplaceholder.typicode.com/posts"
    };
    static getUsers() {
        return [this.urls["users"], baseFetcher(this.urls["users"], { method: "GET" })];
    }
    static sendPosts(postData) {
        console.log({ postData });
        return [this.urls["posts"], baseFetcher(this.urls["posts"], {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })];
    }
}
exports.UserAPI = UserAPI;
const useServices = (api) => {
    const swr = (0, swr_1.default)(...api, { revalidateOnFocus: false });
    return swr;
};
exports.useServices = useServices;
