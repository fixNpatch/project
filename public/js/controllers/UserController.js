function UserController(app) {
    MainController.call(this);
    this.app = app;
    // console.log("@ => User Controller");


    let UView = new UserView(this);
    let provider = new UserModel();

    this.render = function(currentUser) {
        UView.render(currentUser);
    };

    this.getUser = function(number){
        return provider.pullUser(number);
    };

    this.getProfilePicture = function () {
        provider.getProfilePicture();
    }
}