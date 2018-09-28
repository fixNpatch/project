function UserModel() {

    this.getList = function () {
        let list = JSON.stringify(USERS, "", 4);
        console.log(list);
    };

    this.getProfilePicture = function () {

        /*THIS FUNCTION IS USELESS BUT I HAVE NO TIME TO REMOVE IT */
        webix.ajax("/give_me_pic", function (data) {
            /* KOSTYL WTF */
            /* JSON IN JSON IN JSON ????????*/
            let dat = JSON.parse(JSON.parse(data));
            $("#profile_picture").attr("src",dat.url);
        });

    };

    this.getEmployeeBlock = function () {
        $$("ela_nest").load(function(){
            return webix.ajax("/get_userlist").then(function(data){
                //console.log(data.json());
                return data.json();
            });
        });
    };
}