function AccountController(app) {
    MainController.call(this);
    this.app = app;
    // console.log("@ => Account Controller");

    let AView = new AccountView(this);
    let provider = new AccountModel();

    this.render = function(arg) {
        AView.render(arg);
    };

    this.getUser = function(number){
        return provider.pullUser(number);
    };
}