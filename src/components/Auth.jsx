class AuthUser {
    constructor() {
        this.apiUrl = process.env.REACT_APP_URL;
        // this.action;
        // this.username;
        // this.password;
        this.isAuth = false;
        // this.user;
        this.commentsArr = [];
    }

    // async execute(action,username,password) {
    //     this.action = action;
    //     if (this.action === 'register') {
    //         if (await this.register(username,password)) {
    //             // this.displayComments();
    //             alert('Registration successfull you now can login to see comments')
    //             return true;
    //         } else {
    //             alert('Try different username /password (it must containe some characters) ');
    //             return false;
    //         }
    //     } else if (this.action === 'login') {
    //         if (await this.login(username,password)) {
    //             return true;
    //         } else {
    //             alert('Enter valid creadentials');
    //             return false;
    //         }
    //     } else if (this.action === 'comment') {
    //         if (await this.addChat(username,password)) {
    //             alert("success");
    //             return this.getComments();
    //         } else {
    //             alert("Error occured comment cannot be empty ");
    //         }
    //     } else if (this.action === 'logout') {
    //         if (await this.logout()) {
    //             alert("success");
    //             return true;
    //         } else {
    //             alert("Error occured");
    //         }
    //     }

    // }


    async logout() {
        this.username = '';
        this.password = '';
        this.isAuth = false;
        this.user = '';
        this.commentsArr = [];
        return true;
    }

    async addChat(cmt) {
        if(!this.username){
            return "error please login"
        }
        if(!this.password){
            return "error please login"
        }
        let comment = cmt.toLocaleString();
        if (comment === "" || comment === undefined) {
            return false;
        }
        let data = {
            action: 'addChat',
            username: this.username,
            password: this.password,
            chat: comment
        };
        let jres = await this.makePostRequest(data);
        let res = JSON.parse(jres);
        // comment.value = ' ';
        if (res.status) {
            this.user = res.data;
            this.commentsArr = res.comments;
            return true;
        } else {
            return false;
        }

    }

    isAuthenciated() {
        let data = {
            action: 'auth',
            username: this.username,
            password: this.password,
        };
        let res = JSON.parse(this.makePostRequest(data));
        if (res.status) {
            this.user = res.data;
            // this.fetchComments();
            return true;
        } else {
            return false;
        }

    }

    getUserName(){
        return this.username;
    }

    async login(username,password) {
        this.username = username
        this.password = password
        let data = {
            action: 'login',
            username: this.username,
            password: this.password,
        };
        let jres = await this.makePostRequest(data);
        let res = JSON.parse(jres)
        if (res.status) {
            this.isAuth = true;
            this.user = res.data;
            this.commentsArr = res.comments;
            return true;
        } else {
            return false;
        }

    }

    async register(username,password) {
        this.username = username
        this.password = password
        const alphabetRegex = /[a-zA-Z]/;
        let passCheck = alphabetRegex.test(this.password);
        if (!passCheck) {
            return false;
        }
        if (this.username === '' || this.password === '') {
            return false;
        }
        let data = {
            action: 'register',
            username: this.username,
            password: this.password,
        };
        let jres = await this.makePostRequest(data);
        let res = JSON.parse(jres);
        if (res.status) {
            this.isAuth = true;
            this.user = res.data;
            this.commentsArr = res.comments;
            return true;
        } else {
            return false;
        }

    }

    getComments() {
        return this.commentsArr;
    }

    getUserObj(){
        return {username:this.username,pass:this.password};
    }

    async fetchComments() {
        let data = {
            action: 'comments',
            username: this.username,
            password: this.password,
        };
        let jres = await this.makePostRequest(data);
        let res = JSON.parse(jres);
        if (res.status) {
            this.commentsArr = res.data.comments;
            return true;
        } else {
            console.log("error getting comments");
            return false;
        }
    }

    handleErrors(response) {
        if (!response.status) {
            throw Error(response.statusText);
        }
        return response.json();
    }

    async makeGetRequest() {
        return await fetch(this.apiUrl)
            .then(this.handleErrors)
            .then(data => {
                // this.display(JSON.stringify(data));
                this.images = data.images;
                console.log('GET Request Successful:', data);
            })
            .catch(error => {
                console.error('GET Request Failed:', error);
            });
    }

    getImages(){
        return this.images;
    }

    async makePostRequest(postData) {
        return await fetch(this.apiUrl, {
            method: 'POST',
            contentType: "application/json", // Set the content type if applicable
            // payload: JSON.stringify(postData),
            header: {
                'contentType': "text/plain;charset=utf-8",
            },
            body: JSON.stringify(postData),
        })
            .then(this.handleErrors)
            .then(data => {
                // this.display(JSON.stringify(data));
                // console.log('POST Request Successful:', data);
                return JSON.stringify(data);
            })
            .catch(error => {
                console.error('POST Request Failed:', error);
                return JSON.stringify({ status: false });
            });
    }
}

let Auth = new AuthUser();
export default Auth;