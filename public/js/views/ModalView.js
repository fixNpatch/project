function ModalView(app) {
    MainView.call(this);
    this.app = app;
    console.log("@ => Modal View");

    function parseDate(date) {
        let day, month, result;
        (date.getDay() < 10) ? day = "0" + date.getDay(): day = date.getDay();
        (date.getMonth() < 10) ? month = "0" + date.getMonth(): month = date.getMonth();
        result =  day + "." + month + "." + date.getFullYear();
        return result
    }
    function close_modal() {
        $$("modal_window").close();
    }

    function add_task() {
        console.log("add_task triggered");
        webix.ui({
            container:$$("modal_body").getNode(),
            view:"form",
            id:"add_task",
            elements:[
                {view:"grouplist", id:"project_manager", scroll:"y", select:true},
                {view: "text", id:"Task_doer", hidden:true},
                {view:"text", id:"Project_title", hidden:true, name:"Project_title"},
                {view:"text", id:"Task_title", label:"Название задачи", name:"Task_title"},
                {view:"text", id:"Task_description", label:"Описание задачи", name:"Task_description"},
                {view:"counter", id:"Task_hours", label:"Рабочие часы", step:1, value:5, name:"Task_hours"},
                {view:"button", id:"submit_button", label:"Подтвердить", name:"button"},
                {view:"button", id:"cancel_button", label:"Отмена", name:"button", click:close_modal}

            ],
            elementsConfig:{
                labelWidth:200
            }
        });
        $$("project_manager").attachEvent("onAfterSelect", function (id) {
            let user = $$("project_manager").getItem(id);
            $$("add_task").setValues({Task_doer:user.value}, true);
        });

        $$("project_manager").attachEvent("onItemClick", function(id){
            let item = this.getItem(id);
            if(item.type === "folder"){
                $$("add_task").setValues({Project_title:item.value, Project_id:item.Project_id}, true);
            }
            else{
                $$("add_task").setValues({Task_doer:item.value, User_id:item.User_id}, true);
            }
        });
        app.LoadData4AddTask();
        $$("submit_button").attachEvent("onItemClick", function(){
            let save = $$("add_task").getValues();
            delete save.button;
            save.Task_timestamp = parseDate(new Date());
            app.AddTask(save);
            close_modal();
        });
    }
    function del_task() {
        webix.ui({
            container:$$("modal_body").getNode(),
            view:"form",
            id:"del_task",
            elements:[
                {view:"grouplist", id:"task_choose", scroll:"y", select:true},
                {view:"button", id:"submit_button", label:"Удалить", name:"button"},
                {view:"button", id:"cancel_button", label:"Отмена", name:"button", click:close_modal}

            ],
            elementsConfig:{
                labelWidth:200
            }
        });
        $$("task_choose").attachEvent("onAfterSelect", function (id) {
            let item = this.getItem(id);
            $$("del_task").setValues({
                    Task_id:item.Task_id,
                    Task_title:item.Task_title,
                    Task_description:item.Task_description,
                }, true);
        });
        app.LoadData4EditTask();
        $$("submit_button").attachEvent("onItemClick", function(){
            let save = $$("del_task").getValues();
            let Task_id = save.Task_id;
            app.DelTask(Task_id);
            close_modal();
        });

    }
    function edit_task() {
        webix.ui({
            container:$$("modal_body").getNode(),
            view:"form",
            id:"edit_task",
            elements:[
                {view:"grouplist", id:"task_choose", scroll:"y", select:true},
                {view:"text", id:"Task_title", label:"Название задачи", name:"Task_title"},
                {view:"text", id:"Task_description", label:"Описание задачи", name:"Task_description"},
                {view:"counter", id:"Task_hours", label:"Рабочие часы", step:1, value:5, name:"hours"},
                {view:"button", id:"submit_button", label:"Подтвердить", name:"button"},
                {view:"button", id:"cancel_button", label:"Отмена", name:"button", click:close_modal}
            ],
            elementsConfig:{
                labelWidth:200
            }
        });

        $$("task_choose").attachEvent("onAfterSelect", function (id) {
            let item = this.getItem(id);
            console.log(item);
            console.log($$("edit_task").getValues());
            $$("edit_task").setValues(
                {
                    Task_id:item.Task_id,
                    Task_title:item.Task_title,
                    Task_description:item.Task_description,
                }, true);
        });
        $$("task_choose").attachEvent("onItemClick", function(id){
            let item = this.getItem(id);
            if(item.User_id == null){
                console.log("ProjectID:");
                console.log(item.Project_id);
                console.log(item.Project_title);
                $$("edit_task").setValues({Project_title:item.value, Project_id:item.Project_id}, true);
            }
            else{
                console.log("UserID:");
                console.log(item.User_id);
                console.log(item.Task_doer);
                $$("edit_task").setValues({Task_doer:item.value, User_id:item.User_id}, true);
            }
            console.log(item);
        });
        app.LoadData4EditTask();
        $$("submit_button").attachEvent("onItemClick", function(){
            let save = $$("edit_task").getValues();
            delete save.button;
            let Task_id = save.Task_id;
            app.EditTask(Task_id, save);
            close_modal();
        });
    }

    function add_project() {
        webix.ui({
            container:$$("modal_body").getNode(),
            view:"form",
            id:"add_project",
            elements:[
                {view:"text", id:"Project_title", label:"Название проекта", name:"Project_title"},
                {view:"text", id:"Project_description", label:"Описание проекта", name:"Project_description"},
                {
                    view:"datatable",
                    css:"project_doers_modal",
                    id:"all_doers",
                    label:"Не на этом проекте",
                    name:"all_doers",
                    height:300,
                    columns:[
                        {id:"User_rank", header:"Должность"},
                        {id:"User_secondname", header:"Фамилия  (Не участвует)", fillspace:true}
                    ]
                },
                {
                    view:"datatable",
                    css:"project_doers_modal",
                    id:"project_doers",
                    label:"На этом проекте",
                    name:"doers",
                    height:300,
                    columns:[
                        {id:"User_rank", header:"Должность"},
                        {id:"User_secondname", header:"Фамилия (Участвует в проекте)", fillspace:true}
                    ]
                },
                {view:"button", id:"submit_button", label:"Подтвердить", name:"button"},
                {view:"button", id:"cancel_button", label:"Отмена", name:"button", click:close_modal}
            ],
            elementsConfig:{
                labelWidth:200,
            }
        });
        $$("all_doers").attachEvent("onItemClick", function (id) {
            let item = this.getItem(id);
            $$("project_doers").add(item);
            this.remove(id);
        });
        $$("project_doers").attachEvent("onItemClick", function (id) {
            let item = this.getItem(id);
            $$("all_doers").add(item);
            this.remove(id);
        });
        app.LoadData4AddProject();
        $$("submit_button").attachEvent("onItemClick", function(){
            let save = $$("add_project").getValues();
            save.Project_status = "1";
            save.Userstack = [];
            $$("project_doers").eachRow(function (row) {
                save.Userstack.push(this.getItem(row));
                console.log(this.getItem(row));
            });
            delete save.button;
            app.AddProject(save);
            close_modal();
        });
    }
    function del_project() {
        webix.ui({
            container:$$("modal_body").getNode(),
            view:"accordion",
            type:"wide",
            rows:[
                { id:"del_project_choose", header:"Выберите проект", body:{
                        view:"datatable",
                        id:"choose_project",
                        columns:[
                            {id: "Project_number", header:"№"},
                            {id: "Project_title", header: "Название проекта", fillspace:true},
                            {id: "Project_description", header: "Описание", fillspace:2}
                        ]
                    }
                },
                { id:"del_project_form", header:"Удалить проект", collapsed:true, disabled:true, body:{
                        view:"form",
                        id:"del_project",
                        elements:[
                            {view:"text", id:"Project_title", label:"Название проекта", name:"Project_title", disabled: true},
                            {view:"text", id:"Project_description", label:"Описание проекта", name:"Project_description", disabled: true},
                            {
                                view:"datatable",
                                id:"project_doers",
                                label:"На этом проекте",
                                name:"doers",
                                height:200,
                                columns:[
                                    {id:"User_rank", header:"Должность"},
                                    {id:"User_secondname", header:"Фамилия (Участвует в проекте)", fillspace:true}
                                ]
                            },
                            {view:"button", id:"submit_button", label:"Подтвердить", name:"button"},
                            {view:"button", id:"cancel_button", label:"Отмена", name:"button", click:close_modal}
                        ],
                        elementsConfig:{
                            labelWidth:200,
                        }
                    }
                }
            ]
        });
        $$("choose_project").attachEvent("onItemClick", function (id) {
            $$("project_doers").clearAll();
            let item = this.getItem(id);
            $$("del_project_choose").collapse();
            $$("del_project_form").enable();
            $$("del_project").setValues(
                {
                    Project_title:item.Project_title,
                    Project_description:item.Project_description,
                }, true);
            app.LoadUsersOnProject(item.Project_id);
        });

        app.LoadData4DelProject();
    }
    function edit_project() {
        webix.ui({
            container:$$("modal_body").getNode(),
            view:"accordion",
            type:"wide",
            rows:[
                { id:"edit_project_choose", header:"Выберите проект", body:{
                        view:"datatable",
                        id:"choose_project",
                        columns:[
                            {id: "Project_number", header:"№"},
                            {id: "Project_title", header: "Название проекта", fillspace:true},
                            {id: "Project_description", header: "Описание", fillspace:2}
                        ]
                    }
                },
                { id:"edit_project_form", header:"Изменить проект", collapsed:true, disabled:true, body:{
                        view:"form",
                        id:"edit_project",
                        elements:[
                            {view:"text", id:"Project_title", label:"Название проекта", name:"Project_title"},
                            {view:"text", id:"Project_description", label:"Описание проекта", name:"Project_description"},
                            {
                                view:"datatable",
                                css:"project_doers_modal",
                                id:"all_doers",
                                label:"Не на этом проекте",
                                name:"all_doers",
                                height:200,
                                columns:[
                                    {id:"User_rank", header:"Должность"},
                                    {id:"User_secondname", header:"Фамилия  (Не участвует)", fillspace:true}
                                ]
                            },
                            {
                                view:"datatable",
                                css:"project_doers_modal",
                                id:"project_doers",
                                label:"На этом проекте",
                                name:"doers",
                                height:200,
                                columns:[
                                    {id:"User_rank", header:"Должность"},
                                    {id:"User_secondname", header:"Фамилия (Участвует в проекте)", fillspace:true}
                                ]
                            },
                            {view:"button", id:"submit_button", label:"Подтвердить", name:"button"},
                            {view:"button", id:"cancel_button", label:"Отмена", name:"button", click:close_modal}
                        ],
                        elementsConfig:{
                            labelWidth:200,
                        }
                    }
                }
            ]
        });
        $$("choose_project").attachEvent("onItemClick", function (id) {
            let item = this.getItem(id);
            $$("project_doers").clearAll();
            $$("all_doers").clearAll();

            $$("edit_project_choose").collapse();
            $$("edit_project_form").enable();
            $$("edit_project").setValues(
                {
                    Project_title:item.Project_title,
                    Project_description:item.Project_description,
                }, true);



            let on = "/usersonproject/" + String(item.project_id);
            let out = "/usersoutproject/" + String(item.project_id);
            $$("project_doers").load(function(){
                console.log('project doers: ');
                return webix.ajax(on).then(function(data){
                    return data.json();
                });
            });
            $$("all_doers").load(function(){
                console.log("all doers; ");
                return webix.ajax(out).then(function(data){

                    console.log(data.json());
                    return data.json();
                });
            });

        });

        $$("all_doers").attachEvent("onItemClick", function (id) {
            let item = this.getItem(id);
            $$("project_doers").add(item);
            this.remove(id);
        });

        $$("project_doers").attachEvent("onItemClick", function (id) {
            let item = this.getItem(id);
            $$("all_doers").add(item);
            this.remove(id);
        });
        app.LoadData4EditProject();

    }


    function add_user() {
        webix.ui({
            container:$$("modal_body").getNode(),
            id:"add_user_form",
            view:"form",
            autoheight: true,
            elements:[
                {view:"text", id:"User_secondname", label:"Фамилия", name:"User_secondname"},
                {view:"text", id:"User_firstname", label:"Имя", name:"User_firstname"},
                {view:"text", id:"User_middlename", label:"Отчество", name:"User_middlename"},
                {view:"combo", id:"User_rank",  name:"User_rank",
                    value:1, // the initially selected one
                    label: 'Должность',
                    options:[
                        { "id":1, "value":"Junior"},
                        { "id":2, "value":"Developer"},
                        { "id":3, "value":"Senior"},
                        { "id":4, "value":"Teamlead"},
                        { "id":5, "value":"QA"},
                        { "id":6, "value":"HR"},
                        { "id":7, "value":"Chief"}
                    ]},


                /*Upload photo Drag'n'Drop*/

                { type:"header", template:"Перетащите сюда свою фотографию" },
                { view:"list", id:"dropzone", type:"uploader",
                    height:200, scroll:false },





                {view:"button", id:"submit_button", label:"Подтвердить", name:"button"},
                {view:"button", id:"cancel_button", label:"Отмена", name:"button", click:close_modal}
            ],
            elementsConfig:{
                labelWidth:200,
            }
        });
        /*===================================================================*/
        /* ---------------------- config upload ---------------------------- */

        webix.ui({
            id:"uploadAPI",
            view:"uploader",
            upload:"",
            on:{
                onFileUpload:function(item){
                    webix.message("Done");
                }
            },
            link:"dropzone",
            apiOnly:true
        });
        $$("uploadAPI").addDropZone( $$("dropzone").$view, "Drop files here");

        /* -------------------- finishing config --------------------------- */
        /*===================================================================*/
        $$("submit_button").attachEvent("onItemClick", function(){
            let save = $$("add_user_form").getValues();
            delete save.button;
            save.User_rank = save.User_rank.toString()
            //save.User_rank = $$("User_rank").getInputNode(save.User_rank).value;
            save.User_timestamp = parseDate(new Date());
            app.AddUser(save);
            close_modal();
        });
    }
    function del_user() {
        webix.ui({
            container:$$("modal_body").getNode(),

            view:"accordion",
            type:"wide",
            rows:[
                {
                    id:"del_user_choose",
                    header:"Выберите пользователя",
                    body:{
                        id: "choose_user",
                        view: "datatable",
                        select:true,
                        scrollX: false,
                        columns: [
                            {id: "User_rank", header: "Должность", fillspace: 0.8},
                            {id: "User_secondname", header: "Фамилия", fillspace: 2},
                            {id: "User_firstname", header: "Имя", fillspace: 2},
                            {id: "User_middlename", header: "Отчество", fillspace: 2},
                            {id: "User_timestamp", header: "Регистрация", fillspace: true},
                        ]
                    }
                },
                {
                    id:"del_user",
                    header:"Удалить пользователя",
                    collapsed:true, disabled:true,
                    body:{
                        id:"del_user_form",
                        view:"form",
                        height:450,
                        autoheight: true,
                        elements:[
                            {view:"text", id:"User_secondname", label:"Фамилия", name:"User_secondname", disabled:true},
                            {view:"text", id:"User_firstname", label:"Имя", name:"User_firstname", disabled:true},
                            {view:"text", id:"User_middlename", label:"Отчество", name:"User_middlename", disabled:true},
                            {view:"combo", id:"User_rank",  name:"User_rank", disabled:true,
                                value:1, // the initially selected one
                                label: 'Должность',
                                options:[
                                    { "id":1, "value":"Junior"},
                                    { "id":2, "value":"Developer"},
                                    { "id":3, "value":"Senior"},
                                    { "id":4, "value":"Teamlead"},
                                    { "id":5, "value":"QA"},
                                    { "id":6, "value":"HR"},
                                    { "id":7, "value":"Chief"}
                                ]},


                            {view:"button", id:"submit_button", label:"Подтвердить", name:"button"},
                            {view:"button", id:"cancel_button", label:"Отмена", name:"button", click:close_modal}
                        ],
                        elementsConfig:{
                            labelWidth:200,
                        }
                    }
                }
            ]
        });

        $$("choose_user").attachEvent("onAfterSelect", function (id) {
            let item = this.getItem(id);
            $$("del_user_form").setValues({
                User_id:item.User_id,
                User_secondname:item.User_secondname,
                User_firstname:item.User_firstname,
                User_middlename:item.User_middlename,
                User_rank:1
            });
            $$("del_user_choose").collapse();
            $$("del_user").enable();
            console.log(item.User_id);
        });
        app.LoadData4DelUser(); //User List Deletion

        $$("submit_button").attachEvent("onItemClick", function(){
            let save = $$("del_user_form").getValues();
            let User_id = save.User_id;
            app.DelUser(User_id);
            close_modal();
        });
    }
    function edit_user() {
        webix.ui({
            container:$$("modal_body").getNode(),

            view:"accordion",
            type:"wide",
            rows:[
                {
                    id:"edit_user_choose",
                    header:"Выберите пользователя",
                    body:{
                        id: "choose_user",
                        view: "datatable",
                        select:true,
                        scrollX: false,
                        columns: [
                            {id: "User_rank", header: "Должность", fillspace: 0.8},
                            {id: "User_secondname", header: "Фамилия", fillspace: 2},
                            {id: "User_firstname", header: "Имя", fillspace: 2},
                            {id: "User_middlename", header: "Отчество", fillspace: 2},
                            {id: "User_timestamp", header: "Регистрация", fillspace: true},
                        ]
                    }
                },
                {
                    id:"edit_user",
                    header:"Изменить пользователя",
                    collapsed:true, disabled:true,
                    body:{
                        id:"edit_user_form",
                        view:"form",
                        autoheight: true,
                        elements:[
                            {view:"text", id:"User_secondname", label:"Фамилия", name:"User_secondname"},
                            {view:"text", id:"User_firstname", label:"Имя", name:"User_firstname"},
                            {view:"text", id:"User_middlename", label:"Отчество", name:"User_middlename"},
                            {view:"combo", id:"User_rank",  name:"User_rank",
                                value:1, // the initially selected one
                                label: 'Должность',
                                options:[
                                    { "id":1, "value":"Junior"},
                                    { "id":2, "value":"Developer"},
                                    { "id":3, "value":"Senior"},
                                    { "id":4, "value":"Teamlead"},
                                    { "id":5, "value":"QA"},
                                    { "id":6, "value":"HR"},
                                    { "id":7, "value":"Chief"}
                                ]},


                            /*Upload photo Drag'n'Drop*/


                            { type:"header", template:"Перетащите сюда фотографию" },
                            { view:"list", id:"dropzone", type:"uploader",
                                height:100, scroll:false },




                            {view:"button", id:"submit_button", label:"Подтвердить", name:"button"},
                            {view:"button", id:"cancel_button", label:"Отмена", name:"button", click:close_modal}
                        ],
                        elementsConfig:{
                            labelWidth:200,
                        }
                    }
                }
            ]
        });
        webix.ui({
            id:"uploadAPI",
            view:"uploader",
            upload:"",
            on:{
                onFileUpload:function(item){
                    webix.message("Done");
                }
            },
            link:"dropzone",
            apiOnly:true
        });

        $$("uploadAPI").addDropZone( $$("dropzone").$view, "Drop files here");

        $$("choose_user").attachEvent("onAfterSelect", function (id) {
            let item = this.getItem(id);
            $$("edit_user_form").setValues({
                User_id:item.User_id,
                User_secondname:item.User_secondname,
                User_firstname:item.User_firstname,
                User_middlename:item.User_middlename,
                User_rank:1
            });
            $$("edit_user_choose").collapse();
            $$("edit_user").enable();
        });

        app.LoadData4EditUser();


        $$("submit_button").attachEvent("onItemClick", function(){
            let save = $$("edit_user_form").getValues();
            delete save.button;
            let User_id = save.User_id;
            app.EditUser(User_id, save);
            close_modal();
        });
    }



    this.showModal = function (arg) {
        let template;
        switch(arg){
            case "add": template = "Добавить"; break;
            case "del": template = "Удалить"; break;
            case "edit": template = "Изменить"; break;
            default: break
        }
        webix.ui({
            view:"window",
            id:"modal_window",
            height:600,
            width:1000,
            head:{
                css:"red-head white",
                cols:[
                    {
                        id:"modal_title",
                        view:"template",
                        template:template,
                        type:"clean",
                        css:"transparent",
                        gravity:12,
                    },
                    {
                        id:"close_modal",
                        view:"button",
                        type: "image",
                        image:"public/img/close.png",
                        click:close_modal
                    }
                ]
            },
            position:"center",
            body:{
                id:"modal_body",
                css:"beige"
            },
            modal:true
        }).show();
        $$("modal_body").getNode().id = "modal_body";

        /* check page (task/project) */

        if(document.getElementById("task_block") !== null){
            switch (arg) {
                case "add":{add_task()}break;
                case "del":{del_task()}break;
                case "edit":{edit_task()}break;
                default:break;
            }
        }
        else if(document.getElementById("project_block") !== null){
            switch (arg) {
                case "add":{add_project()}break;
                case "del":{del_project()}break;
                case "edit":{edit_project()}break;
                default:break;
            }
        }
        else{
            switch (arg) {
                case "add":{add_user()}break;
                case "del":{del_user()}break;
                case "edit":{edit_user()}break;
                default:break;
            }
        }
    }
}