function TaskModel() {

    this.pullTask = function (number) {
        return TASKS[number];
    };
    this.getTasks = function () {
        // let list = JSON.stringify(TASKS, "", 4);
        // console.log(list);
        // return list;
    }
}