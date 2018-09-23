function ProjectModel() {

    this.pullProject = function (number) {
        return PROJECTS[number];
    };

    this.loadProjectBlock = function () {
        $$("project_block_nest").load(function(){
            return webix.ajax("/give_me_projects").then(function(data){
                return data.json();
            });
        });
    }
}