function ProjectController(app) {
    MainController.call(this);
    this.app = app;
    // console.log("@ => Project Controller");

    let PView = new ProjectView(this);
    let provider = new ProjectModel();

    this.render = function(arg) {
        PView.render(arg);
    };

    // this.getProject = function(number){
    //     return provider.pullProject(number);
    // };

    this.loadProjectBlock = function(){
        provider.loadProjectBlock();
    }
}