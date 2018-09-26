package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
	"log"
	"net/http"
	"testapp/app/providers"

	_ "github.com/lib/pq"
)

type UserController struct {
	*revel.Controller
	model *providers.UserModel
}

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "password"
	dbname   = "test"
)

// Что это такое???
//func (c *UserController) Apply(req *revel.Request, resp *revel.Response) {
//	panic("implement me")
//}

func (c *UserController) Init() *UserController {
	c.model = providers.NewUserModel()

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	var err error
	c.model.DB, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		revel.INFO.Print("DB Error", err)
	}
	err = c.model.DB.Ping()
	if err != nil {
		fmt.Print()
	}

	fmt.Println("Successfully connected!")
	return nil
}

func (c *UserController) CloseConnection() *UserController {
	var err error
	err = c.model.DB.Close()
	if err != nil {
		fmt.Print("ERROR")
		return nil
	}
	fmt.Print("All right")
	return nil
}

/* Эталон */
func (c *UserController) GetPic() revel.Result {
	data, err := c.model.GetPic()
	if err != nil {
		return c.RenderJSON(err.Error())
	}
	fmt.Println(data)
	return c.RenderJSON(data)
}

/* CHANGES*/
func (c *UserController) GetPicture() revel.Result {
	data := c.model.GetPicture()
	fmt.Println(data)
	return c.RenderJSON(data)
}

func (c *UserController) GetSubordinates() revel.Result {
	data := c.model.GetSubordinates()
	return c.RenderJSON(data)
}

func (c *UserController) GetUsers() revel.Result {
	data := c.model.GetUsers()
	return c.RenderJSON(data)
}

func (c *UserController) AddUser(r *http.Request) revel.Result {
	request := c.Params.JSON
	c.model.AddUser(request)
	data := string(request)
	log.Print(data)
	return c.RenderJSON(data)
}

func (c *UserController) DelUser() revel.Result {
	request := c.Params.JSON
	//c.model.AddUser(request)
	data := string(request)
	log.Print(data)
	return c.RenderJSON(data)
}

func (c *UserController) EditUser(id int) revel.Result {
	request := c.Params.JSON
	data := string(request)
	log.Print(data)
	return c.RenderJSON(data)
}

func (c *UserController) GetFromDb() revel.Result {
	data, _ := json.Marshal(c.model.GetFromDb())
	list := string(data)
	return c.RenderJSON(list)
}
