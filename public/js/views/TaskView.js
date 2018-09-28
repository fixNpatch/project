function TaskView(app) {
    MainView.call(this);
    this.app = app;
    console.log("@ => Task View");

    let call_modal = this.call_modal.bind(this);
    let content_gen = this.content_gen.bind(this);

    function returnHome() {
        content_gen('main');
    }

    function call_modal_add() {
        call_modal("add");
    }
    function call_modal_edit() {
        call_modal("edit");
    }
    function call_modal_del() {
        call_modal("del");
    }

    this.render = function (arg) {
        console.log("TaskView Rendered.");
        if(arg === "full"){
            webix.ui({
                container: $$("right-area").getNode(),
                rows:[
                    {id:"task_block", css:"beige"}
                ]
            });
            $$("task_block").getNode().id = "task_block";
        }
        webix.ui({
            container:"task_block",
            rows:[
                {
                    borderless:true,
                    gravity:0.1,
                    id: "task_block_header",
                    css:"red-head",
                    type:"clean",
                    cols:[
                        {
                            gravity:3,
                            css:"transparent",
                            id: "task_block_name",
                            template: "Ваши задачи",
                            type:"clean"
                        },
                        {
                            hidden:true,
                            css:"h04v",
                            id: "task_block_control",
                            cols:[
                                {
                                    id:"addbtn",
                                    view:"button",
                                    type: "image",
                                    image:"public/img/add.png",
                                    click: call_modal_add
                                },
                                {
                                    id:"editbtn",
                                    view:"button",
                                    type: "image",
                                    image:"public/img/edit.png",
                                    click: call_modal_edit
                                },
                                {
                                    id:"delbtn",
                                    view:"button",
                                    type: "image",
                                    image:"public/img/delete.png",
                                    click: call_modal_del
                                },
                                {
                                    id:"markbtn",
                                    view:"button",
                                    type: "image",
                                    image:"public/img/mark.png",
                                },
                                {
                                    id:"backbtn",
                                    view:"button",
                                    type: "image",
                                    image:"public/img/home.png",
                                    click:returnHome
                                }
                            ]
                        }
                    ]
                },
                {
                    borderless:true,
                    css:"beige",
                    id: "task_block_nest",
                    view: "datatable",
                    scrollX: false,
                    columns:[
                        { id:"Task_number",         header:"№", fillspace:0.4},
                        { id:"Project_title",       header:"Название проекта", fillspace:2},
                        { id:"Task_title",          header:"Название задачи", fillspace:3},
                        { id:"Task_doer",           header:"Исполнитель", fillspace:2},
                        { id:"Task_status",         header:"Статус"},
                        { id:"Task_hours",          header:"Р/Часы"},
                        { id:"Task_timestamp",      header:"Поставлена"}
                    ],
                    hover:"hoverrow"
                },
                {
                    id:"open_task",
                    css:"beige",
                    hidden:true,
                    height:"auto",
                    view:"fieldset",
                    label:"PROJECT NAME",
                    body:{
                        css:"beige",
                        height:"auto",
                        rows:[
                            {cols:[
                                    { view:"text", id:"Task_title", label:"TASK TITLE", labelWidth:150, gravity:4, readonly: true},
                                    { view:"text", id:"Task_timestamp", value:"TASK TIMESTAMP", labelWidth:150, readonly: true},
                                    { view:"text", id:"Task_hours", value:"TASK HOURS", labelWidth:150, readonly: true},
                                    { view:"combo", id:"Task_status", value:"TASK STATUS", labelWidth:150, readonly: true, icon:null, options:[
                                            { "id":1, "value":"Поставлена"},
                                            { "id":2, "value":"В разработке"},
                                            { "id":3, "value":"На проверке"},
                                            { "id":4, "value":"Выполнена"}
                                        ]},
                                ]
                            },
                            { view:"text", id:"Task_description", label:"TASK DESCRIPTION", labelWidth:150, height:150, readonly: true},
                            { view:"text", id:"Task_doer", label:"TASK DOER", labelWidth:150, readonly: true},
                            { view:"button", label:"НАЗАД", click:function () {
                                    $$("open_task").hide();
                                    $$("task_block_nest").show();
                                }
                            }
                        ]
                    }
                }
            ]
        });


        if(arg === "full") $$("task_block_control").show();

        $$("task_block_nest").attachEvent("onItemClick", function (id) {
            let item = this.getItem(id);
            $$("Task_title").setValue(item.Task_title);
            $$("Task_timestamp").setValue(item.Task_timestamp);
            $$("Task_status").setValue(item.Task_status);
            $$("Task_description").setValue(item.Task_description);
            $$("Task_doer").setValue(item.Task_doer);
            $$("Task_hours").setValue(item.Task_hours + " рабочих часов");
            $$("open_task").show();
            this.hide();
        });

        app.loadTaskBlock();
    }
}