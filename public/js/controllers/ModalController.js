function ModalController(app) {
    MainController.call(this);
    this.app = app;
    // console.log("@ => Modal Controller");

    let MView = new ModalView(this);

    this.render = function(arg) {
        console.log("Modal Controller render...");
        MView.showModal(arg);
    };

    this.getPLE = function(){
        console.log("getPLE");
        $$("choose_project").load(function(){
            return webix.ajax("/load_modal_projectlist_edit").then(function(data){
                console.log(data);
                return data.json();
            });
        });
    };
    this.getPLD = function(){
        console.log("getPLD");
        $$("choose_project").load(function(){
            return webix.ajax("/load_modal_projectlist_delete").then(function(data){
                return data.json();
            });
        });
    };
    this.getULE = function(){
        console.log("getULE");
        $$("choose_user").load(function(){
            return webix.ajax("/load_modal_userlist_edit").then(function(data){
                return data.json();
            });
        });
    };
    this.getULD = function(){
        console.log("getULD");
        $$("choose_user").load(function(){
            return webix.ajax("/load_modal_userlist_delete").then(function(data){
                return data.json();
            });
        });
    };


    /* PROBLEM */
    this.addtask = function(){
        $$("project_manager").load(function(){
            return webix.ajax("/load_modal_tasklist_add").then(function(data){
                console.log(data);
                return data.json();
            });
        });
    }
}