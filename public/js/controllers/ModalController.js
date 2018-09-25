function ModalController(app) {
    MainController.call(this);
    this.app = app;
    // console.log("@ => Modal Controller");

    let MView = new ModalView(this);

    this.render = function(arg) {
        console.log("Modal Controller render...");
        MView.showModal(arg);
    };

    this.LoadData4AddProject = function(){
        $$("all_doers").load(function(){
            return webix.ajax("/load_modal_projectlist_add").then(function(data){
                return data.json();
            });
        });
    };
    this.LoadData4EditProject = function(){
        $$("choose_project").load(function(){
            return webix.ajax("/load_modal_projectlist_edit").then(function(data){
                return data.json();
            });
        });
    };
    this.LoadData4DelProject = function(){
        $$("choose_project").load(function(){
            return webix.ajax("/load_modal_projectlist_delete").then(function(data){
                return data.json();
            });
        });
    };
    this.LoadData4EditUser = function(){
        $$("choose_user").load(function(){
            return webix.ajax("/load_modal_userlist_edit").then(function(data){
                return data.json();
            });
        });
    };
    this.LoadData4DelUser = function(){
        $$("choose_user").load(function(){
            return webix.ajax("/load_modal_userlist_delete").then(function(data){
                return data.json();
            });
        });
    };

    this.LoadData4AddTask = function(){
        $$("project_manager").load(function(){
            return webix.ajax("/load_modal_tasklist_add").then(function(data){
                return data.json();
            });
        });
    };
    this.LoadData4EditTask = function(){
        $$("task_choose").load(function(){
            return webix.ajax("/load_modal_tasklist_edit").then(function(data){
                return data.json();
            });
        });
    };

    this.AddUser = function(object){
        console.log('post => post_new_user');
        object.User_rank = object.User_rank.toString();
        let data = JSON.stringify(object);
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/post_new_user",
            data:data,
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function(data){console.log(data);},
            fail: function(errMsg) {
                alert(errMsg);
            }
        });
    };

    this.AddTask = function(object){
        console.log('post => post_new_task');
        let data = JSON.stringify(object);
        $.ajax({
            type: "POST",
            url: "/post_new_task",
            data:data,
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function(data){console.log(data);},
            fail: function(errMsg) {
                alert(errMsg);
            }
        });
    };

    this.AddProject = function(object){
        console.log('post => post_new_project');
        let data = JSON.stringify(object);
        $.ajax({
            type: "POST",
            url: "/post_new_project",
            data:data,
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function(data){console.log(data);},
            fail: function(errMsg) {
                alert(errMsg);
            }
        });
    }

}