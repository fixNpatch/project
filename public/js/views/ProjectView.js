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



        /*HOW TO RENDER BEFORE AND THEN LOAD FROM FILE, not URL*/
        let data = getProjectlistWithUsers();



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
                    gravity:0.10,
                    css:"red-head",
                    id: "project_block_header",
                    type:"clean",
                    borderless:true,
                    cols:[
                        {
                            gravity:3,
                            css:"transparent h04v",
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
                                    image:"../img/add.png",
                                    click:call_modal_add
                                },
                                {
                                    id:"editbtn",
                                    view:"button",
                                    type: "image",
                                    image:"../img/edit.png",
                                    click:call_modal_edit
                                },
                                {
                                    id:"delbtn",
                                    view:"button",
                                    type: "image",
                                    image:"../img/delete.png",
                                    click:call_modal_del
                                },
                                {
                                    id:"markbtn",
                                    view:"button",
                                    type: "image",
                                    image:"../img/mark.png",
                                },
                                {
                                    id:"backbtn",
                                    view:"button",
                                    type: "image",
                                    image:"../img/home.png",
                                    click:returnHome
                                }
                            ]
                        }
                    ]
                },
                {
                    gravity:10,
                    id:"open_project",
                    css:"beige",
                    hidden:true,
                    view:"layout",
                    label:"PROJECT NAME",
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

                },
                {
                    css:"beige",
                    borderless:true,
                    id: "project_block_nest",
                    view: "datatable",
                    scrollX:false,
                    columns:[
                        { id:"project_number",         header:"№",                    fillspace:0.4},
                        { id:"project_title",          header:"Название проекта",      fillspace:2},
                        { id:"project_description",    header:"Описание",              fillspace:3},
                        { id:"project_status",         header:"Статус проекта",        fillspace:1},
                        { id:"project_timestamp",      header:"Создан",                fillspace:true},
                        { id:"project_doers",           header:"Исполнители",           fillspace:2},
                    ],
                    data:data
                }

            ]
        });
        if(arg === "full") $$("project_block_control").show();

        $$("project_block_nest").attachEvent("onItemClick", function (id) {
            let item = this.getItem(id);
            this.hide();
            $$("open_project").show();
            $$("project_block_header").resize();
            $$("open_project").resize();

        });
    }
}