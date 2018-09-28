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
            return webix.ajax("/get_userlist").then(function(data){
                return data.json();
            });
        });
    };
    this.LoadData4EditProject = function(){
        $$("choose_project").load(function(){
            return webix.ajax("/get_projects").then(function(data){
                console.log(data.json());
                return data.json();
            });
        });
    };
    this.LoadData4DelProject = function(){
        $$("choose_project").load(function(){
            return webix.ajax("/get_projects").then(function(data){
                console.log(data.json());
                return data.json();
            });
        });
    };
    this.LoadData4EditUser = function(){
        $$("choose_user").load(function(){
            return webix.ajax("/get_userlist").then(function(data){
                return data.json();
            });
        });
    };
    this.LoadData4DelUser = function(){
        $$("choose_user").load(function(){
            return webix.ajax("/get_userlist").then(function(data){
                return data.json();
            });
        });
    };




    /*=============================================================*/
    /*------------------------- TASK ------------------------------*/

    this.LoadData4AddTask = function(){
        $$("project_manager").load(function(){
            return webix.ajax("/load_modal_tasklist_add").then(function(data){
                console.log(data.json());
                return data.json();
            });
        });
    };
    this.LoadData4EditTask = function(){
        $$("task_choose").load(function(){
            return webix.ajax("/load_modal_tasklist_edit").then(function(data){
                console.log(data.json());
                return data.json();
            });
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

    this.DelTask = function(Task_id){
        let data = {Task_id:Task_id};
        $.ajax({
            type: "POST",
            url: "/delete_task",
            data:JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function(data){console.log(data);},
            fail: function(errMsg) {
                alert(errMsg);
            }
        });
    };

    this.EditTask = function(Task_id, object){
        let url = /edit_task/ + Task_id;
        let data = JSON.stringify(object);
        $.ajax({
            type: "POST",
            url: url,
            data:data,
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function(data){console.log(data);},
            fail: function(errMsg) {
                alert(errMsg);
            }
        });
    };


    /*=============================================================*/
    /*----------------------- PROJECT -----------------------------*/

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
    };

    this.DelProject = function(Project_id){
        let data = {Project_id:Project_id};
        console.log('post => delete_user');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/delete_project",
            data:JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function(data){console.log(data);},
            fail: function(errMsg) {
                alert(errMsg);
            }
        });
    };

    this.EditProject = function(Project_id, object){
        let url = /edit_project/ + Project_id;
        let data = JSON.stringify(object);
        console.log(data);
        $.ajax({
            type: "POST",
            url: url,
            data:data,
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function(data){console.log(data);},
            fail: function(errMsg) {
                alert(errMsg);
            }
        });
    };

    this.LoadUsersOnProject = function (id) {
        let on = "/usersonproject/" + id.toString();
        $$("project_doers").load(function(){
            return webix.ajax(on).then(function(data){
                return data.json();
            });
        });
    };
    this.LoadUsersOutProject = function (id) {
        let out = "/usersoutproject/" + id.toString();
        $$("all_doers").load(function(){
            return webix.ajax(out).then(function(data){
                return data.json();
            });
        });
    };

    /*=============================================================*/
    /*------------------------- USER ------------------------------*/

    this.AddUser = function(object){
        console.log('post => post_new_user');
        //object.User_rank = object.User_rank.toString();
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

    this.DelUser = function(User_id){
        let data = {User_id:User_id};
        console.log('post => delete_user');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/delete_user",
            data:JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function(data){console.log(data);},
            fail: function(errMsg) {
                alert(errMsg);
            }
        });
    };

    this.EditUser = function(User_id, object){
        let url = /edit_user/ + User_id;
        console.log(url);
        console.log('post => delete_user');
        let data = JSON.stringify(object);
        console.log(data);
        $.ajax({
            type: "POST",
            url: url,
            data:data,
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function(data){console.log(data);},
            fail: function(errMsg) {
                alert(errMsg);
            }
        });
    };

}