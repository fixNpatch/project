
function getProjectlist() {
    let list = JSON.stringify(PROJECTS, function replacer(key, value) {
        if(this && key === "LOGIN" || key === "PASSWORD"){
            return undefined
        }
        return value;
    }, " ", 4);
    return list
}







function getTasklistOnly() {
    let list = JSON.stringify(TASKS, "", 4);
    return list
}

function getTasklistWithUsers() {

    let base = getProjectlist();
    base = JSON.parse(base);
    let list = [], users, tasks, cnt = 0;
    for(let i = 0; i < base.length; i++){
        users = base[i].userstack;
        for(let j = 0; j < users.length; j++){
            tasks = users[j].taskstack;
            for(let k = 0; k < tasks.length; k++){
                list.push(tasks[k]);
                list[cnt++].task_doer = users[j];
                users[j].taskstack.shift();
                //console.log(list[k]);
            }
        }
    }
    list = JSON.stringify(list, function replacer(key, value){
        if(this && key === "taskstack" || key === "LOGIN" || key === "PASSWORD"){
            return undefined
        }
        return value;
    }, " ", 4);


    console.log(list);

    return list;
}




function getUserlistOnly() {
    /*Get users without taskstack*/
    let list = JSON.stringify(USERS, function replacer(key, value) {
        if(this && key === "taskstack" || key === "LOGIN" || key === "PASSWORD"){
            return undefined
        }
        return value;
    }, " ", 4);
    return list
}

function getProjectlistOnly() {
    let list = JSON.stringify(PROJECTS, function replacer(key, value) {
        if(this && key === "userstack"){
            return undefined
        }
        return value;
    }, " ", 4);
    return list
}

function getProjectlistWithUsers() {
    let list = JSON.stringify(PROJECTS, function replacer(key, value) {
        if(this && key === "taskstack" || key === "LOGIN" || key === "PASSWORD"){
            return undefined
        }
        return value;
    }, " ", 4);
    return list
}


// original
/*
function task_parse_modal(url) {
    let answer = new XMLHttpRequest(),
        maindata = new XMLHttpRequest();
    answer.open("GET", url, false);
    answer.send(null);

    let file = JSON.parse(answer.responseText);
    console.log(file);


    maindata.open("GET", "assets/script/data.json", false);
    maindata.send(null);

    let base = JSON.parse(maindata.responseText);
    console.log(base);

    for(let i = 0; i < base.data.length; i++){
        file.data[i].value = base.data[i].project_title;
        for(let j = 0; j < base.data[i].project_doers.length; j++)
        file.data[i].data[j].value = base.data[i].project_doers[j].employee_second + " " + base.data[i].project_doers[j].employee_first;
    }
    console.log(base.data.length);
    console.log(base.data[0].project_doers.length);
    console.log(file);

    return file;
}
*/

/*second variant*/

// function task_parse_modal() {
//     let maindata = new XMLHttpRequest();
//
//     let file = {data:[]};
//     maindata.open("GET", "assets/script/data.json", false);
//     maindata.send(null);
//     let base = JSON.parse(maindata.responseText);
//
//     for(let i = 0; i < base.data.length; i++){
//         file.data.push({value: base.data[i].project_title, type:"folder", data:[]});
//
//         for(let j = 0; j < base.data[i].project_doers.length; j++) {
//
//             let string = base.data[i].project_doers[j].employee_second + " "
//                 + base.data[i].project_doers[j].employee_first[0]
//                 + ". " + base.data[i].project_doers[j].employee_middle[0] + ".";
//
//             file.data[i].data.push({type:"file",
//                 value:string
//             });
//         }
//     }
//
//     console.log(file);
//
//     return file;
// }


function task_parse_modal() {
    let base = getProjectlistWithUsers();
    let list = {data:[]};

    console.log(base);


    base = JSON.parse(base);
    console.log(base);

    for(let i = 0; i < base.length; i++){
        list.data.push({value: base[i].project_title, type:"folder", data:[]});

        for(let j = 0; j < base[i].userstack.length; j++) {

            let string = base[i].userstack[j].employee_second + " "
                + base[i].userstack[j].employee_first[0]
                + ". " + base[i].userstack[j].employee_middle[0] + ".";

            list.data[i].data.push({type:"file",
                value:string
            });
        }
    }

    console.log(list);


    return list
}

function task_add_to_list(obj) {
    let answer = {};
    answer.task_number = Math.round(Math.random() * 14031 / 100);
    answer.task_doer = obj.selected_doer;
    answer.task_description = obj.description;
    answer.task_status = "Новая";
    answer.task_hours = obj.hours;
    answer.task_timestamp = "12.12.2018";

    return answer;
}

function task_parse_modal_edit() {
    let base = getProjectlist();
    let list = {data:[]};

    console.log(base);


    base = JSON.parse(base);
    console.log(base);

    for(let i = 0; i < base.length; i++){
        list.data.push({value: base[i].project_title, type:"folder", data:[]});

        for(let j = 0; j < base[i].userstack.length; j++) {

            let string = base[i].userstack[j].employee_second + " "
                + base[i].userstack[j].employee_first[0]
                + ". " + base[i].userstack[j].employee_middle[0] + ".";

            list.data[i].data.push({type:"folder", value:string, data:[]});

            for(let k = 0; k < base[i].userstack[j].taskstack.length; k++){
                let task = base[i].userstack[j].taskstack[k].task_title;
                list.data[i].data[j].data.push({type:"file", value: task});
            }
        }
    }


    return list
}