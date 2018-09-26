function ManagementModel() {
    this.pullUser = function (number) {
        return USERS[number];
    };

    this.loadUserBlock = function () {
        $$("management_block_nest").load(function(){
            return webix.ajax("/use_db").then(function(data){
                return data.json();
            });
        });
    }
}