package providers

import (
	"fmt"
	"github.com/revel/revel"
	"io/ioutil"
)

type UserModel struct {
	name string
}

func NewUserModel() *UserModel {
	return &UserModel{
		//скобки {} означают пустой новый экземпляр, &ссылка на него
		//возвращаем новый экземпляр модели (опционально: с инициализированными полями)
	}

}

/* Эталон */
func (t *UserModel) GetPic() (user *User, err error) {

	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/providers/picture.json")

	url := string(file)
	fmt.Println("HELLO IT'S ME :: " + url)

	/* create obj under template User*/
	user = &User{
		Employee_pic: url,
	}
	return
}

/* CHANGES */
func (t *UserModel) GetPicture() string {

	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/providers/picture.json")
	url := string(file)
	return url
}

func (t *UserModel) GetEmployees() string {

	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/providers/ela_list.json")
	url := string(file)
	return url
}

func (t *UserModel) GetUsers() string {

	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/providers/userlist.json")
	url := string(file)
	return url
}
