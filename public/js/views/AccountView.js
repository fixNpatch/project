function AccountView(app) {
    MainView.call(this);
    this.app = app;
    let content_gen = this.content_gen.bind(this);
    console.log("@ => Account View");

    function returnHome() {
        content_gen('main');
    }

    this.render = function() {
        console.log("ManagementView Rendered.");
        webix.ui({
            container: $$("right-area").getNode(),
            rows:[
                {
                    id:"account_block",
                    rows:[
                        {
                            gravity:0.10,
                            css:"red-head",
                            id: "account_block_header",
                            type:"clean",
                            cols:[
                                {
                                    gravity:16,
                                    css:"transparent h04v",
                                    id: "account_block_name",
                                    template: "Аккаунт",
                                    type:"clean"
                                },
                                {
                                    css:"h04v",
                                    id: "account_block_control",
                                    cols:[
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
                            id:"account_settings",
                            view:"form",
                            elements:[
                                {id:"user_first", view:"text", name:"first_name", label:"Имя"},
                                {id:"user_second", view:"text", name:"second_name", label:"Фамилия"},
                                {id:"user_middle", view:"text", name:"middle_name", label:"Отчество"},
                                { type:"header", template:"Перетащите сюда свою фотографию" },
                                {
                                    view:"list",
                                    id:"dropzone",
                                    type:"uploader",
                                    height:200,
                                    scroll:false
                                }
                            ]
                        }
                    ]
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

        /* finishing config */
    }


}

