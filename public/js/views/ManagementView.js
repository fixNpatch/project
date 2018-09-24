function ManagementView(app) {
    MainView.call(this);
    this.app = app;
    console.log("@ => Management View");

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

    this.render = function() {
        console.log("ManagementView Rendered.");
        webix.ui({
            container: $$("right-area").getNode(),
            rows: [
                {
                    id: "management_block",
                    rows: [
                        {
                            gravity: 0.10,
                            css: "red-head",
                            id: "management_block_header",
                            type: "clean",
                            cols: [
                                {
                                    gravity: 3,
                                    css: "transparent h04v",
                                    id: "management_block_name",
                                    template: "Пользователи",
                                    type: "clean"
                                },
                                {
                                    css: "h04v",
                                    id: "management_block_control",
                                    cols: [
                                        {
                                            id: "addbtn",
                                            view: "button",
                                            type: "image",
                                            image: "public/img/add.png",
                                            click: call_modal_add
                                        },
                                        {
                                            id: "editbtn",
                                            view: "button",
                                            type: "image",
                                            image: "public/img/edit.png",
                                            click: call_modal_edit
                                        },
                                        {
                                            id: "delbtn",
                                            view: "button",
                                            type: "image",
                                            image: "public/img/delete.png",
                                            click: call_modal_del
                                        },
                                        {
                                            id: "backbtn",
                                            view: "button",
                                            type: "image",
                                            image: "public/img/home.png",
                                            click: returnHome
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            css: "beige",
                            id: "management_block_nest",
                            view: "datatable",
                            scrollX: false,
                            columns: [
                                {id: "User_rank", header: "Должность", fillspace: 0.8},
                                {id: "User_secondname", header: "Фамилия", fillspace: 2},
                                {id: "User_firstname", header: "Имя", fillspace: 2},
                                {id: "User_middlename", header: "Отчество", fillspace: 2},
                                {id: "User_timestamp", header: "Регистрация", fillspace: true},
                                {id: "User_pic", view:"button", header: "Фото", fillspace: 0.5, type:"image"},
                            ]
                        },
                        {
                            id:"open_block",
                            css:"beige",

                            hidden:true,
                            cols:[
                                {
                                    css:"beige",
                                    id:"profile_picture",
                                    view:"template",
                                    template:"<img src=\'/public/img/avatar.jpg\' class=\'main_avatar\'>",
                                    align:"center",
                                    type:"clean",

                                },
                                {
                                    id:"open_main_info",
                                    view:"form",
                                    css:"beige",
                                    gravity:1.8,
                                    elements:[
                                        {view:"text", id: "User_rank",      label: "Должность",  name:"User_rank"},
                                        {view:"text", id: "User_secondname",label: "Фамилия",    name:"User_secondname"},
                                        {view:"text", id: "User_firstname", label: "Имя",        name:"User_firstname"},
                                        {view:"text", id: "User_middlename",label: "Отчество",   name:"User_middlename"},
                                        {view:"text", id: "User_timestamp", label: "Регистрация",name:"User_timestamp"},
                                        {view:"button", label:"Добавить задачу"},
                                        {view:"button", label:"Вернуться назад", click:function () {
                                                $$("open_block").hide();
                                                $$("management_block_nest").show();
                                            }
                                        }
                                    ],
                                    elementsConfig: {
                                        labelWidth: 200
                                    }
                                }
                            ]

                        }
                    ]
                }
            ]
        });
        $$("management_block_nest").attachEvent("onItemClick", function (id) {
            let item = this.getItem(id);
            this.hide();
            $$("open_main_info").setValues({
                User_firstname:item.User_firstname,
                User_secondname:item.User_secondname,
                User_middlename:item.User_middlename,
                User_rank:item.User_rank,
                User_timestamp:item.User_timestamp
            });
            $$("open_block").show();
        });
        app.loadUserBlock();
    }
}

