const BASE_URL = "https://kvell-app.herokuapp.com/";

const url_mapping = {
    login: "login",
    signup: "signup",

    getFeed: "feed",
    getHomeFeed: "feed", // needs extra headers

    getFollow: "follow",
    updateFollow: "follow/:followUserId",
    unFollow: "follow/:followUserId",

    getNotifications: "notification",
    markNotificationsRead: "notification",
    createNotification: "notification",
    
    getAllPosts: "posts",
    addPost: "posts",
    getPost: "posts/:postId",
    updatePost: "posts/:postId",
    removePost: "posts/:postId",

    search:"search",

    getAllUsers: "users",
    getUser: "users/:userId",
    updateUser: "users/:userId",
    removeUser: "users/:userId"
}

export function getUrl(urlkey, params){
    let generated_url = BASE_URL + Object.keys(params).reduce( (acc, cur) => {
        return acc.replace(`:${cur}`, params[cur]);
    }, url_mapping[urlkey]);

    // console.log('generatedurL: ', generated_url);
    return generated_url;
}