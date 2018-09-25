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
                        { id:"Project_status",         header:"Статус проекта",        fillspace:1},
                        { id:"Project_timestamp",      header:"Создан",                fillspace:true},
                        { id:"Userstack",              header:"Исполнители",           fillspace:2},
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
                                    { view:"text", label:"PROJECT TITLE", labelWidth:150},
                                    { view:"text", value:"PROJECT TIMESTAMP", labelWidth:150},
                                    { view:"text", value:"PROJECT STATUS", labelWidth:150},
                                ]
                            },
                            { view:"text", label:"PROJECT DESCRIPTION", labelWidth:150},
                            { view:"text", label:"TASK DOER", labelWidth:150},
                            { view:"text", label:"TASK HOURS", labelWidth:150},
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
            $$("open_project").show();
            this.hide();

        });

        app.loadProjectBlock();
    }
}