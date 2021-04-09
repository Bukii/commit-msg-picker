const fetch = require("node-fetch");

export const queryNewMessage = () => {
    return fetch("https://raw.githubusercontent.com/ngerakines/commitment/master/commit_messages.txt")
        .then((response: { text: () => any; }) => response.text())
        .then((data: any) => {
            let arr = data.split("\n");
            let ran = Math.floor(Math.random() * arr.length);
            return arr[ran-1];
        });
};