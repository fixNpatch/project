package providers

import (
	"database/sql"
	"fmt"
	"github.com/revel/revel"
	"io/ioutil"
	"os"
)

type UserModel struct {
	name string
	DB   *sql.DB
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
		User_pic: url,
	}
	return
}

/* CHANGES */
func (t *UserModel) GetPicture() string {

	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/picture.json")
	url := string(file)
	return url
}

func (t *UserModel) GetSubordinates() string {

	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/ela_list.json")
	url := string(file)
	return url
}

func (t *UserModel) GetUsers() string {

	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/userlist.json")
	url := string(file)
	return url
}
func (t *UserModel) AddUser(data []byte) revel.Result {

	/* DO NOT WASTE TIME. IT WILL BE SAVING IN DB SOON */
	path := revel.AppPath
	f, err := os.OpenFile(path+"/dummy/test.json", os.O_APPEND|os.O_WRONLY, 0600)
	if err != nil {
		fmt.Print(err.Error())
	}
	defer f.Close()
	if _, err = f.WriteString(string(data)); err != nil {
		fmt.Print(err.Error())
	}

	return nil
}

func (c *UserModel) GetFormDb() revel.Result {

	/* Нужно ли делать опен? */

	//var err error
	//c.DB, err = sql.Open("postgres", Source)
	//if err != nil{
	//	revel.INFO.Print("DB Error", err)
	//}
	//revel.INFO.Println("DB Connected")

	sql := "SELECT * FROM t_Users"
	rows, err := c.DB.Query(sql)
	if err != nil {
		revel.INFO.Print("DB Error", err)
	}
	defer rows.Close()
	for rows.Next() {
		err = rows.Scan()
		if err != nil {
		}

	}

	return nil
}
