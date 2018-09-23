function TaskController(app) {
    MainController.call(this);
    this.app = app;
    // console.log("@ => Task Controller");

    let TView = new TaskView(this);
    let provider = new TaskModel();

    this.render = function(arg) {
        TView.render(arg);
        this.getTask()
    };

    this.getTask = function(number){
        return provider.getTasks(number);
    };

    this.loadTaskBlock = function(){
        provider.loadTaskBlock();
    }
}