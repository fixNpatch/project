function MainController(app) {
    this.app = app;
    let mainView = new MainView(this);
    function renderMainWindow() {
        mainView.render();
    }

    this.initialization = function (event, currentUser) {
        //console.log(currentUser);
        this.app.setCurrentUser(currentUser, this.app);
        renderMainWindow();
        //console.log("Logged as " + currentUser.employee_first);
        console.log('Main Window initialization...');
        dispatchEvent(this.app.getEvent('profile', currentUser));
        this.content_gen('main', currentUser);

    };
    this.content_gen = function(arg, currentUser) {
        destroyDOM($$("right-area").getNode());
        switch (arg) {
            case "main": {
                mainView.render("right");
                dispatchEvent(this.app.getEvent("main", currentUser));
            } break;
            case "task": {
                dispatchEvent(this.app.getEvent("task", currentUser));
            } break;
            case "project": {
                dispatchEvent(this.app.getEvent("project", currentUser));
            } break;
            case "account": {
                dispatchEvent(this.app.getEvent("account", currentUser));
            } break;
            case "management": {
                dispatchEvent(this.app.getEvent("management", currentUser));
            } break;
            case "logout": {
                this.app.logout();
            } break;
        }
    };

    this.call_modal = function (arg) {
        switch (arg) {
            case "add":{
                dispatchEvent(this.app.getEvent_modal("add"));
            }break;
            case "del":{
                dispatchEvent(this.app.getEvent_modal("del"));
            }break;
            case "edit":{
                dispatchEvent(this.app.getEvent_modal("edit"));
            }break;
        }
    };



}