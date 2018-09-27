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
	return &UserModel{}
}

/* CHANGES */
func (c *UserModel) GetPicture() string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/picture.json")
	url := string(file)
	return url
}

func (c *UserModel) GetSubordinates() string {

	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/ela_list.json")
	url := string(file)
	return url
}

//func (c *UserModel) GetUsers() string {
//
//	path := revel.AppPath
//	file, _ := ioutil.ReadFile(path + "/dummy/userlist.json")
//	url := string(file)
//	return url
//}
func (c *UserModel) AddUser(data []byte) revel.Result {
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

func (c *UserModel) GetUsers() []User {
	var userlist []User
	/*зачем МНЕ использовать sql.NullString? */
	var (
		c_user_id           string
		c_user_login        string
		c_user_password     string
		c_user_firstname    string
		c_user_secondname   string
		c_user_middlename   string
		c_user_rank         string
		c_user_registration string
		c_user_pic          string
	)
	sqlstatement := `SELECT * FROM public.t_Users`
	rows, err := c.DB.Query(sqlstatement)
	if err != nil {
		revel.INFO.Print("DB Error", err)
	}
	defer rows.Close()
	for rows.Next() {
		err = rows.Scan(&c_user_id, &c_user_login, &c_user_password, &c_user_firstname, &c_user_secondname, &c_user_middlename, &c_user_rank, &c_user_registration, &c_user_pic)
		if err != nil {
		}
		userlist = append(userlist, User{
			User_id:         c_user_id,
			PASSWORD:        c_user_password,
			LOGIN:           c_user_login,
			User_firstname:  c_user_firstname,
			User_secondname: c_user_secondname,
			User_middlename: c_user_middlename,
			User_timestamp:  c_user_registration,
			User_rank:       c_user_rank,
			User_pic:        c_user_pic,
		})
	}
	return userlist
}
