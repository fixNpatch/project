function ModalController(app) {
    MainController.call(this);
    this.app = app;
    // console.log("@ => Modal Controller");

    let MView = new ModalView(this);

    this.render = function(arg) {
        console.log("Modal Controller render...");
        MView.showModal(arg);
    };

    this.editproject = function(){
        $$("choose_project").load(function(){
            return webix.ajax("/load_modal_projectlist_edit").then(function(data){
                return data.json();
            });
        });
    };
    this.delproject = function(){
        $$("choose_project").load(function(){
            return webix.ajax("/load_modal_projectlist_delete").then(function(data){
                return data.json();
            });
        });
    };
    this.edituser = function(){
        $$("choose_user").load(function(){
            return webix.ajax("/load_modal_userlist_edit").then(function(data){
                return data.json();
            });
        });
    };
    this.deluser = function(){
        $$("choose_user").load(function(){
            return webix.ajax("/load_modal_userlist_delete").then(function(data){
                return data.json();
            });
        });
    };

    this.addtask = function(){
        $$("project_manager").load(function(){
            return webix.ajax("/load_modal_tasklist_add").then(function(data){
                return data.json();
            });
        });
    };
    this.edittask = function(){
        $$("task_choose").load(function(){
            return webix.ajax("/load_modal_tasklist_edit").then(function(data){
                return data.json();
            });
        });
    };

    this.AddUser = function(object){
        console.log('post =>');
        $.ajax({
            type: "POST",
            url: "/post_new_user",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(object, " ", 3),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){console.log(data);},
            fail: function(errMsg) {
                alert(errMsg);
            }
        });
    }
}