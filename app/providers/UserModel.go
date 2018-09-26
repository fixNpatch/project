package providers

import (
	"database/sql"
	"fmt"
	"github.com/revel/revel"
	"io/ioutil"
	"os"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "password"
	dbname   = "test"
)

type UserModel struct {
	name string
	DB   *sql.DB
}

func NewUserModel() *UserModel {
	c := &UserModel{
		//скобки {} означают пустой новый экземпляр, &ссылка на него
		//возвращаем новый экземпляр модели (опционально: с инициализированными полями)
	}
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	var err error
	c.DB, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		revel.INFO.Print("DB Error", err)
	}
	/* пинг обязателен? */
	err = c.DB.Ping()
	if err != nil {
		fmt.Print()
	}
	fmt.Println("Successfully connected!")
	return c

}
func (c *UserModel) Init() *UserModel {

	return nil
}

/* Эталон */
func (c *UserModel) GetPic() (user *User, err error) {

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

func (c *UserModel) GetUsers() string {

	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/userlist.json")
	url := string(file)
	return url
}
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

func (c *UserModel) GetFromDb() []User {
	var userlist []User
	/*зачем МНЕ использовать sql.NullString? */
	var (
		c_user_id         string
		c_user_login      string
		c_user_password   string
		c_user_firstname  string
		c_user_secondname string
		c_user_middlename string
		c_user_rank       string
		c_user_pic        string
	)
	sqlstatement := `SELECT * FROM t_Users`
	rows, err := c.DB.Query(sqlstatement)
	if err != nil {
		revel.INFO.Print("DB Error", err)
	}
	defer rows.Close()
	for rows.Next() {
		err = rows.Scan(&c_user_id, &c_user_login, &c_user_password, &c_user_firstname, &c_user_secondname, &c_user_middlename, &c_user_rank, &c_user_pic)
		if err != nil {
		}
		userlist = append(userlist, User{
			User_id:         c_user_id,
			PASSWORD:        c_user_password,
			LOGIN:           c_user_login,
			User_firstname:  c_user_firstname,
			User_secondname: c_user_secondname,
			User_middlename: c_user_middlename,
			User_rank:       c_user_rank,
			User_pic:        c_user_pic,
		})
	}

	defer c.DB.Close()
	return userlist
}
