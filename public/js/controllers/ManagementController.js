function ManagementController(app) {
    MainController.call(this);
    this.app = app;
    // console.log("@ => Management Controller");

    let MView = new ManagementView(this);
    let provider = new ManagementModel();

    this.render = function(arg) {
        MView.render(arg);
    };

    this.loadUserBlock = function(){
        provider.loadUserBlock();
    };
}