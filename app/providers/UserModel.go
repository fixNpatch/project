package providers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
	"io/ioutil"
	"math/rand"
	"time"
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

func (c *UserModel) AddUser(body []byte) string {
	var user User
	rand.Seed(time.Now().UnixNano())
	random := rand.Int()
	json.Unmarshal(body, &user)
	sqlstatement := `INSERT INTO t_Users (c_user_login, c_user_password, c_user_firstname, c_user_secondname, c_user_middlename,c_user_rank, c_user_registration,  c_user_pic) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
	_, err := c.DB.Query(sqlstatement, "login"+string(random), "password", &user.User_firstname, &user.User_secondname, &user.User_middlename, &user.User_rank, time.Now(), "/public/img/avatar.jpg")
	if err != nil {
		fmt.Println(err.Error())
		return ""
	}
	fmt.Println("Successful add user")
	return string(body)
}
func (c *UserModel) DelUser(body []byte) string {
	var user User
	json.Unmarshal(body, &user)
	sqlstatement := `DELETE FROM t_Users WHERE t_users.user_id = $1`
	_, err := c.DB.Query(sqlstatement, &user.User_id)
	if err != nil {
		fmt.Println(err.Error())
		return ""
	}
	fmt.Println("Successful del user")
	return string(body)
}
func (c *UserModel) EditUser(body []byte, id int) string {
	var user User
	json.Unmarshal(body, &user)
	sqlstatement := `UPDATE t_Users SET (c_user_firstname, c_user_secondname, c_user_middlename, c_user_rank) = ($1, $2, $3, $4) WHERE t_Users.user_id = $5;`
	_, err := c.DB.Query(sqlstatement, &user.User_firstname, &user.User_secondname, &user.User_middlename, &user.User_rank, id)
	if err != nil {
		fmt.Println(err.Error())
		return ""
	}
	fmt.Println("Successful edit user")
	return string(body)
}
