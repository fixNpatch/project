/*------------------------TEST BLOCK---------------------------------*/
//
// let users = {
//     SampleID: true,
//     SampleID2: false
// };
//


/*-----------------------------VARS AND DATA-------------------------*/
/*--------------------------------TASKS------------------------------*/


let task = {
    task_number:"",
    project_title:"",
    task_title:"",
    task_hours:"",
    task_timestamp:"",
    task_status:""
};

let TASKS = [
    task[0] = {
        task_number:"10",
        project_title:"ERROR FIELD",
        task_title:"Front-end / website layout",
        task_hours:"34",
        task_timestamp:"26.12.1990",
        task_status:""
    },

    task[1] = {
        task_number:"11",
        project_title:"FIELD",
        task_title:"Back-end / server setup",
        task_hours:"56",
        task_timestamp:"26.12.1990",
        task_status:""
    },

    task[2] = {
        task_number:"12",
        project_title:"FIELD",
        task_title:"Database",
        task_hours:"20",
        task_timestamp:"26.12.1990",
        task_status:""
    },
    task[3] = {
        task_number:"13",
        project_title:"FIELD",
        task_title:"Documentation",
        task_hours:"20",
        task_timestamp:"26.12.1990",
        task_status:""
    },
    task[4] = {
        task_number:"14",
        project_title:"FIELD",
        task_title:"DEPLOYING",
        task_hours:"20",
        task_timestamp:"26.12.1990",
        task_status:""
    },
    task[5] = {
        task_number:"15",
        project_title:"FIELD",
        task_title:"DEPLOYING",
        task_hours:"20",
        task_timestamp:"26.12.1990",
        task_status:""
    }

];




/*-----------------------------VARS AND DATA-------------------------*/
/*--------------------------------USERS------------------------------*/

let user = {
    LOGIN:"",
    PASSWORD:"",
    employee_first:"",
    employee_second:"",
    employee_middle:"",
    employee_rank:"",
    employee_pic:"",
    employee_id:"",
    employee_timestamp:"",
    taskstack:[]
};

let USERS = [
    user[0] = {
        LOGIN:"admin",
        PASSWORD:"123",
        employee_first:"Artyom",
        employee_second:"Artemev",
        employee_middle:"Artemovich",
        employee_rank:"TL",
        employee_pic:"assets/img/avatar.jpg",
        employee_id:"123",
        employee_timestamp:"19.09.2018",
        taskstack:[
            task[0]
        ]
    },

    user[1] = {
        LOGIN:"awp",
        PASSWORD:"333",
        employee_first:"Anton",
        employee_second:"Titov",
        employee_middle:"Sergeyevich",
        employee_rank:"Jnr",
        employee_pic:"assets/img/avatar2.jpg",
        employee_id:"135",
        employee_timestamp:"19.09.2018",
        taskstack:[
            task[1]
        ]
    },

    user[2] = {
        LOGIN:"asm",
        PASSWORD:"111",
        employee_first:"Maxim",
        employee_second:"Maximov",
        employee_middle:"Maximovich",
        employee_rank:"Jnr",
        employee_pic:"assets/img/avatar3.jpg",
        employee_id:"111",
        employee_timestamp:"19.09.2018",
        taskstack:[
            task[2]
        ]
    },
    user[3] = {
        LOGIN:"MVP",
        PASSWORD:"777",
        employee_first:"Ivan",
        employee_second:"Ivanov",
        employee_middle:"Ivanovich",
        employee_rank:"Dev",
        employee_pic:"assets/img/avatar4.jpg",
        employee_id:"112",
        employee_timestamp:"19.09.2018",
        taskstack:[
            task[3]
        ]
    },
    user[4] = {
        LOGIN:"CHEB",
        PASSWORD:"1337",
        employee_first:"Cheburashka",
        employee_second:"Rusakov",
        employee_middle:"Gennadiyevich",
        employee_rank:"HR",
        employee_pic:"assets/img/avatar5.jpg",
        employee_id:"777",
        employee_timestamp:"19.09.2018",
        taskstack:[
            task[4]
        ]
    },
    user[5] = {
        LOGIN:"PVV",
        PASSWORD:"666",
        employee_first:"Vladimir",
        employee_second:"Kudin",
        employee_middle:"Vladimirovich",
        employee_rank:"Chief",
        employee_pic:"assets/img/avatar6.jpg",
        employee_id:"666",
        employee_timestamp:"19.09.2018",
        taskstack:[]
    }
];



/*-----------------------------VARS AND DATA-------------------------*/
/*--------------------------------PROJECTS---------------------------*/

let project = {
    project_id:"",
    project_number:"",
    project_title:"",
    project_description:"",
    project_timestamp:"",
    project_status:"",
    userstack: []
};


let PROJECTS = [
    project[0] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"1",
        project_title:"Taskmanager",
        project_description:"Front-end / website layout",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[1], USERS[2]
        ]
    },

    project[1] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"2",
        project_title:"Tomb Rider",
        project_description:"Back-end / server setup",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[1], USERS[2], USERS[3]
        ]
    },

    project[2] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"3",
        project_title:"Fortnite",
        project_description:"Database",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[1], USERS[2], USERS[3], USERS[4]
        ]
    },
    project[3] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"4",
        project_title:"FlyManager",
        project_description:"Documentation",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[0], USERS[2]
        ]
    },
    project[4] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"5",
        project_title:"Kek-master",
        project_description:"DEPLOYING",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[0], USERS[1]
        ]
    },
    project[5] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"6",
        project_title:"Cooking book",
        project_description:"Create cooking book, describing how to cook cookies, meat, bad coders",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[2], USERS[1], USERS[5], USERS[0], USERS[4], USERS[3]
        ]
    },
    project[6] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"7",
        project_title:"World of Warcraft",
        project_description:"Create and deploy the most popular massive multiplayer online game ever. Should contains all of religions, races," +
            "types of bodies and sex. Paid well!",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[0], USERS[4], USERS[3],  USERS[1], USERS[5]
        ]
    },
    project[7] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"8",
        project_title:"Mafia",
        project_description:"DEPLOYING",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[4], USERS[3],  USERS[1]
        ]
    },
    project[8] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"9",
        project_title:"WhereIsMyMoney",
        project_description:"DEPLOYING",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[2], USERS[1], USERS[5], USERS[0], USERS[4], USERS[3]
        ]
    },
    project[9] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"10",
        project_title:"NetMonet",
        project_description:"DEPLOYING",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[5], USERS[0], USERS[4], USERS[3]
        ]
    },
    project[10] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"11",
        project_title:"HoolaHoop",
        project_description:"DEPLOYING",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[2], USERS[1], USERS[5], USERS[0], USERS[4], USERS[3]
        ]
    },
    project[11] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"12",
        project_title:"Circus",
        project_description:"DEPLOYING",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[5], USERS[4], USERS[3]
        ]
    },
    project[12] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"13",
        project_title:"Bachata",
        project_description:"DEPLOYING",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[5], USERS[3]
        ]
    },
    project[13] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"14",
        project_title:"BeliveYouFly",
        project_description:"DEPLOYING",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[5], USERS[4], USERS[3]
        ]
    },
    project[14] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"15",
        project_title:"MagicWand",
        project_description:"DEPLOYING",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[5], USERS[4], USERS[3]
        ]
    },
    project[15] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"16",
        project_title:"Scorpion",
        project_description:"DEPLOYING",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[4], USERS[3]
        ]
    },
    project[16] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"17",
        project_title:"All Of My Love",
        project_description:"DEPLOYING",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[5]
        ]
    },
    project[17] = {
        project_id: Math.round((Math.random() * 1011 + 3) / 2),
        project_number:"18",
        project_title:"CinemaPark",
        project_description:"DEPLOYING",
        project_timestamp:"26.12.1990",
        project_status:"В процессе",
        userstack: [
            USERS[5], USERS[4]
        ]
    }

];

