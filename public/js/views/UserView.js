function UserView(app) {
    MainView.call(this);
    this.app = app;
    console.log("@ => User View");
    let content_gen = this.content_gen.bind(this);

    /*LOL KOSTYL! But how to improve?*/
    function task() {
        content_gen("task");
    }
    function project() {
        content_gen("project");
    }
    function account(arg) {
        console.log(arg);
        content_gen("account");
    }
    function logout() {
        content_gen("logout");
    }
    function management() {
        content_gen("management");
    }



    this.render = function(currentUser){
        /*SAME QUESTION AS IN PROJECTS*/
        let data = getUserlistOnly();



        let date = Date.now();
        webix.Date.startOnMonday = true;
        webix.i18n.setLocale("ru-RU");
        webix.ui({
            container:$$("left-area").getNode(),
            type:"clean",
            rows:[
                {
                    id: "profile_block",
                    type:"clean",
                    rows:[
                        {
                            css:"black",
                            id:"profile_picture",
                            view:"template",
                            template:"<img src='' id =\'profile_picture\' class=\'main_avatar\'>",
                            align:"center",
                            type:"clean",
                            gravity:6
                        },
                        {
                            id:"profile_navbar",
                            css:"navigation",
                            cols:[
                                {
                                    css:"navbar_button",
                                    id:"accbtn",
                                    view:"button",
                                    type: "image",
                                    image:"public/img/account.png",
                                    label: "Image Button",
                                    click:account
                                },
                                {
                                    id:"tskbtn",
                                    view:"button",
                                    type: "image",
                                    image:"public/img/task.png",
                                    label: "Image Button",
                                    click:task
                                },
                                {
                                    css:"navbar_button",
                                    id:"prjbtn",
                                    view:"button",
                                    type: "image",
                                    image:"public/img/project.png",
                                    label: "Image Button",
                                    click:project
                                },
                                {
                                    id:"mngbtn",
                                    view:"button",
                                    type: "image",
                                    image:"public/img/management.png",
                                    label: "Image Button",
                                    click:management
                                },
                                {
                                    id:"lgtbtn",
                                    view:"button",
                                    type: "image",
                                    image:"public/img/logout.png",
                                    label: "Image Button",
                                    click:logout
                                }
                            ]
                        }
                    ]

                },
                {
                    css:"black",
                    view:"calendar",
                    type:"clear",
                    id:"calendar",
                    date:new Date(date),
                    weekHeader:true,
                    width:272,
                    height:200,
                    icons: true,
                    borderless:true
                },
                {
                    id: "employees_list",
                    template: "ELA",
                    gravity: 1.9,
                    type:"clean",
                    borderless:true,
                    rows: [
                        {
                            type:"clean",
                            css:"red-head",
                            id:"ela_title",
                            template:"Ваши подчиненные"
                        },
                        {
                            type:"clean",
                            css:"black",
                            id:"ela_nest",
                            view: "datatable",
                            scroll:"y",
                            gravity: 10,
                            columns:[
                                {id: "employee_rank", header: "Должность", type:"clean"},
                                {id: "employee_second", header: "Фамилия", fillspace:true}
                            ],
                            data:data,
                        }
                    ]
                }
            ]
        });

        let picture = {url:""};
        $.get('/give_me_pic', function (picture_url) {
            picture = JSON.parse(picture_url)
        });

        console.log(picture);
        console.log(picture.url)
        //$("#profile_picture").setAttribute("src", picture.url);

    }

}