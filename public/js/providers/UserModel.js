function UserModel() {

    this.pullUser = function (number) {
        return USERS[number];
    };

    this.getList = function () {
        let list = JSON.stringify(USERS, "", 4);
        console.log(list);
    };

    this.getProfilePicture = function () {
        $.ajax({url:"/give_me_pic", type:'GET', success: function (data) {
            //Метод ассинхронный. нужно сразу делать коллбэк к запросу
            let dat = JSON.parse(data);
            $("#profile_picture").attr("src",dat.url);
        }});
    }
}