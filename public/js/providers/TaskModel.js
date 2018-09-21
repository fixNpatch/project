function TaskModel() {

    this.pullTask = function (number) {
        return TASKS[number];
    };
    this.getTasks = function () {
        // let list = JSON.stringify(TASKS, "", 4);
        // console.log(list);
        // return list;
    };

    this.getTaskList = function(){
        console.log("Trynna get tasklist");
        $.ajax({url:"/tasklist", type:'GET', success: function (data) {
            //Метод ассинхронный. нужно сразу делать коллбэк к запросу
            console.log(data);
        }});
    }
}