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

        /* ULTRA KOSTYL*/
        // $.ajax({
        //     type: "POST",
        //     url: "/post_new_user?data="+JSON.stringify(object),
        //     // The key needs to match your method's input parameter (case-sensitive).
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     success: function(data){console.log(data);},
        //     fail: function(errMsg) {
        //         alert(errMsg);
        //     }
        // });

        /*     2 variant         */
        // let dat = JSON.stringify(object);
        // webix.ajax().post("/post_new_user", data, function (data) {
        //     console.log(data);
        // });
    }
}