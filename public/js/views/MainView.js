function MainView(app) {
    this.app = app;
    // console.log("@ => Main View");
    // console.log(this);
    this.content_gen = function (arg) {
        this.app.content_gen(arg);
    };


    this.call_modal = function(arg){
        this.app.call_modal(arg);
    };
    this.render = function (arg) {
        console.log("MainView Rendered.");
        document.getElementsByTagName("body")[0].id = "container";
        let container = document.getElementById("container");
        if(arg === "right"){
            webix.ui({
                container: $$("right-area").getNode(),
                type:"template",
                rows:[
                    {
                        id: "task_block",
                    },
                    {
                        gravity:1.4,
                        id: "project_block"
                    }
                ]
            });
            $$("task_block").getNode().id = "task_block";
            $$("project_block").getNode().id = "project_block";
            return;
        }
        webix.ui({
            container:container,
            cols:[
                {
                    css:"left-area",
                    type:"template",
                    id: "left-area"
                },
                {
                    css:"right-area",
                    type:"template",
                    id: "right-area",
                    rows:[
                        {
                            id: "task_block"
                        },
                        {
                            id: "project_block"
                        }
                    ]
                }
            ]
        });
    };
}
