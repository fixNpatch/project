function App() {
    let wnd = new MainController(this),
        UController = new UserController(this),
        PController = new ProjectController(this),
        TController = new TaskController(this),
        AController = new AccountController(this),
        MngController = new ManagementController(this),
        MController = new ModalController(this);

    let rendUC = new Event('rendUC'),
        rendMC_add = new Event('rendMC_add'),
        rendMC_del = new Event('rendMC_del'),
        rendMC_edit = new Event('rendMC_edit'),
        rendTPC = new Event('rendTPC'),
        rendACF = new Event('rendACF'),
        rendMCF = new Event('rendMCF'),
        rendTCF = new Event('rendTCF'),
        rendPCF = new Event('rendPCF');


    addEventListener('rendMC_add', function () {MController.render('add')});
    addEventListener('rendMC_del', function () {MController.render('del')});
    addEventListener('rendMC_edit', function () {MController.render('edit')});


    addEventListener('rendUC', function () {UController.render(self.getCurrentUser())});
    addEventListener('rendTPC', function () {
        TController.render();
        PController.render();
    });
    addEventListener('rendTCF', function () {TController.render("full", self.getCurrentUser())});
    addEventListener('rendPCF', function () {PController.render("full", self.getCurrentUser())});
    addEventListener('rendACF', function () {AController.render("full", self.getCurrentUser())});
    addEventListener('rendMCF', function () {MngController.render("full", self.getCurrentUser())});

    this.getEvent_modal = function (arg) {
        switch (arg) {
            case "add":{return rendMC_add;}
            case "del":{return rendMC_del;}
            case "edit":{return rendMC_edit;}
            default: break;
        }
    };
    this.getEvent = function (arg) {
        console.log("GetEvent function. Looking for event...");
        switch (arg) {
            case "profile":{return rendUC;}
            case "main":{return rendTPC;}
            case "task":{return rendTCF;}
            case "account":{return rendACF;}
            case "project":{return rendPCF;}
            case "management":{return rendMCF;}
            default: break;
        }
    };

    this.run = function (event = rendUC) {
        //this.login();
        console.log('run initialization...');
        wnd.initialization(event);
    };

    this.currentUser = null;
    let self = this;



    this.logout = function () {
        let body = document.getElementsByTagName("body")[0];
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
        self.currentUser = null;
        console.log("Logged out");
        self.login();
    };


    this.login = function () {
        let body = document.getElementsByTagName('body')[0];
        document.getElementsByTagName("body")[0].id = "container";
        function trylogin() {
            let targetUser = null,
                login = $$('log_form').getValues().e_login,
                password = $$('log_form').getValues().e_password;

            for(let i = 0; i < USERS.length; i++){
                if(login.toLowerCase() === USERS[i].LOGIN)
                    targetUser = USERS[i];
            }
            if(targetUser !== null){
                if(password === targetUser.PASSWORD){
                    while (body.firstChild) {
                        body.removeChild(body.firstChild);
                    }
                    wnd.initialization(event, targetUser);
                }
                else alert("Password incorrect");
            }
            else{
                alert("Users doesn't exist");
            }
        }

        webix.ui(
            {
                container:"container",
                view:"form",
                id:"log_form",
                width:300,
                elements:[
                    { view:"text", id:"Login",    label:"Login",    name:"e_login"},
                    { view:"text", id:"Password", label:"Password", name:"e_password", type:"password"},
                    {
                        margin:5,
                        id:"loginButton",
                        view:"button",
                        value:"Login",
                        click:trylogin
                    }
                ]
            }
        );
        $$("log_form").getNode().id = "log_form";
        console.log(document.getElementById("log_form"));

    };

    this.setCurrentUser = function(target, context) {
        context.currentUser = target;
    };

    self.getCurrentUser = function() {
        return this.currentUser;
    }
}

function ready() {
    function createApp(){
        console.log("app run. everything is good for now...");
        let app = new App();
        app.run();
    }
    createApp();
}

document.addEventListener("DOMContentLoaded", ready);