function TaskModel() {

    this.pullTask = function (number) {
        return TASKS[number];
    };
    this.getTasks = function () {
        // let list = JSON.stringify(TASKS, "", 4);
        // console.log(list);
        // return list;
    };

    this.loadTaskBlock = function () {
        $$("task_block_nest").load(function(){
            return webix.ajax("/give_me_tasks").then(function(data){
                return data.json();
            });
        });
    }
}