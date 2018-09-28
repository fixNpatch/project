function ProjectModel() {

    this.loadProjectBlock = function () {
        $$("project_block_nest").load(function(){
            return webix.ajax("/give_me_projects").then(function(data){
                //console.log(data.json());
                return data.json();
            });
        });
    };

    this.LoadUsersOnProject = function (id) {
        let on = "/usersonproject/" + id.toString();
        $$("project_doers").load(function(){
            return webix.ajax(on).then(function(data){
                return data.json();
            });
        });
    }
}