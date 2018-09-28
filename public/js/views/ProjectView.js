function ProjectView(app) {
    MainView.call(this);
    this.app = app;
    console.log("@ => Project View");

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
        console.log("ProjectView Rendered.");
        if(arg === "full"){
            webix.ui({
                container: $$("right-area").getNode(),
                rows:[
                    {id:"project_block"}
                ]
            });
            $$("project_block").getNode().id = "project_block";
        }
        webix.ui({
            container:"project_block",
            rows:[
                {
                    borderless:true,
                    gravity:0.08,
                    id: "project_block_header",
                    css:"red-head",
                    type:"clean",
                    cols:[
                        {
                            gravity:3,
                            css:"transparent",
                            id: "project_block_name",
                            template: "Ваши проекты",
                            type:"clean"
                        },
                        {
                            hidden:true,
                            css:"h04v",
                            id: "project_block_control",
                            cols:[
                                {
                                    id:"addbtn",
                                    view:"button",
                                    type: "image",
                                    image:"public/img/add.png",
                                    click:call_modal_add
                                },
                                {
                                    id:"editbtn",
                                    view:"button",
                                    type: "image",
                                    image:"public/img/edit.png",
                                    click:call_modal_edit
                                },
                                {
                                    id:"delbtn",
                                    view:"button",
                                    type: "image",
                                    image:"public/img/delete.png",
                                    click:call_modal_del
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
                    id: "project_block_nest",
                    view: "datatable",
                    scrollX:false,
                    columns:[
                        { id:"Project_number",         header:"№",                    fillspace:0.4},
                        { id:"Project_title",          header:"Название проекта",      fillspace:2},
                        { id:"Project_description",    header:"Описание",              fillspace:3},
                        { id:"Project_status",         header:"Статус проекта",        fillspace:1 ,view:"combo",  readonly:true, icon:null,   options:[
                                { "id":1, "value":"Создан"},
                                { "id":2, "value":"В разработке"},
                                { "id":3, "value":"На проверке"},
                                { "id":4, "value":"Сдан"}
                            ]},
                        { id:"Project_timestamp",      header:"Создан",                fillspace:true},
                        { id:"Userstack",              header:"Исполнители",           fillspace:2, hidden:true},
                    ],
                    hover:"hoverrow"
                },
                {
                    id:"open_project",
                    css:"beige",
                    hidden:true,
                    height:"auto",
                    view:"fieldset",
                    label:"PROJECT NAME",
                    body:{
                        rows:[
                            {cols:[
                                    { view:"text", id:"Project_title", label:"PROJECT TITLE", labelWidth:200},
                                    { view:"text", id:"Project_timestamp", value:"PROJECT TIMESTAMP"},
                                    { view:"combo", id:"Project_status",value:"PROJECT STATUS",  readonly:true, icon:null,   options:[
                                        { "id":1, "value":"Создан"},
                                        { "id":2, "value":"В разработке"},
                                        { "id":3, "value":"На проверке"},
                                        { "id":4, "value":"Сдан"}
                                    ]},
                                ]
                            },
                            {
                                gravity:0.01
                            },
                            {cols:[
                                    {
                                        view:"text", id:"Project_description",label:"PROJECT DESCRIPTION", labelWidth:200
                                    },
                                    {
                                        gravity:0.01
                                    },
                                    {
                                        css:"rounded_border",
                                        view:"datatable",
                                        id:"project_doers",
                                        label:"На этом проекте",
                                        name:"doers",
                                        scrollX: false,
                                        height:300,
                                        columns:[
                                            {id:"User_rank", header:"Должность"},
                                            {id:"User_secondname", header:"Фамилия (Участвует в проекте)", fillspace:true}
                                        ]
                                    }
                                ]
                            },
                            {
                                gravity:0.1
                            },
                            { view:"button", label:"НАЗАД", click:function () {
                                    $$("open_project").hide();
                                    $$("project_block_nest").show();
                                }
                            }
                        ]
                    }
                },
            ]
        });
        if(arg === "full") $$("project_block_control").show();

        $$("project_block_nest").attachEvent("onItemClick", function (id) {
            let item = this.getItem(id);
            $$("project_doers").clearAll();
            $$("Project_title").setValue(item.Project_title);
            $$("Project_timestamp").setValue(item.Project_timestamp);
            $$("Project_status").setValue(item.Project_status);
            $$("Project_description").setValue(item.Project_description);

            app.LoadUsersOnProject(item.Project_id);

            $$("open_project").show();
            this.hide();

        });

        app.loadProjectBlock();
    }
}