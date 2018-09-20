function AccountModel() {
    this.pullUser = function (number) {
        return USERS[number];
    };
}