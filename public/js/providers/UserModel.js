function UserModel() {

    this.pullUser = function (number) {
        return USERS[number];
    };

    this.getList = function () {
        let list = JSON.stringify(USERS, "", 4);
        console.log(list);
    }
}