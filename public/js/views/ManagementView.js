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
                                {id: "user_rank", header: "Должность", fillspace: 0.8},
                                {id: "user_secondname", header: "Фамилия", fillspace: 2},
                                {id: "user_firstname", header: "Имя", fillspace: 2},
                                {id: "user_middlename", header: "Отчество", fillspace: 2},
                                {id: "user_timestamp", header: "Регистрация", fillspace: true},
                                {id: "user_pic", view:"button", header: "Фото", fillspace: 0.5, type:"image"},
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
                                        {view:"text", id: "employee_rank", label: "Должность", name:"rank"},
                                        {view:"text", id: "employee_second", label: "Фамилия", name:"Family"},
                                        {view:"text", id: "employee_first", label: "Имя", name:"Name"},
                                        {view:"text", id: "employee_middle", label: "Отчество", name:"Patronymic"},
                                        {view:"text", id: "employee_timestamp", label: "Регистрация", name:"Registration"},
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
                Name:item.employee_first,
                Family:item.employee_second,
                Patronymic:item.employee_middle,
                rank:item.employee_rank,
                Registration:item.employee_timestamp
            });
            $$("open_block").show();
        });
        app.loadUserBlock();
    }
}

