function UserModel() {

    this.pullUser = function (number) {
        return USERS[number];
    };

    this.getList = function () {
        let list = JSON.stringify(USERS, "", 4);
        console.log(list);
    };

    this.getProfilePicture = function () {

        webix.ajax("/give_me_pic", function (data) {
            /* KOSTYL WTF */
            /* JSON IN JSON IN JSON ????????*/
            let dat = JSON.parse(JSON.parse(data));
            $("#profile_picture").attr("src",dat.url);
        });

    };

    this.getEmployeeBlock = function () {
        $$("ela_nest").load(function(){
            return webix.ajax("/use_db").then(function(data){
                console.log(data);
                console.log(data.json());
                return data.json();
            });
        });
    };
}