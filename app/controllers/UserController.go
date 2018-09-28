package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
	"testapp/app/dbmanager"
	"testapp/app/providers"
)

type UserController struct {
	*revel.Controller
	model *providers.UserModel
}

func (c *UserController) Init() *UserController {
	c.model = providers.NewUserModel()
	c.model.DB = dbmanager.InitConnection()
	return nil
}
func (c *UserController) CloseConnection() *UserController {
	var err error
	err = c.model.DB.Close()
	if err != nil {
		fmt.Println("ERROR. Perhaps connection doesn't exist")
		return nil
	}
	fmt.Println("Connection closed")
	return nil
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

//func (c *UserController) GetUsers() revel.Result {
//	data := c.model.GetUsers()
//	return c.RenderJSON(data)
//}

func (c *UserController) AddUser() revel.Result {
	request := c.Params.JSON
	data := c.model.AddUser(request)
	return c.RenderJSON(data)
}

func (c *UserController) DelUser() revel.Result {
	request := c.Params.JSON
	data := c.model.DelUser(request)
	return c.RenderJSON(data)
}

func (c *UserController) EditUser(id int) revel.Result {
	request := c.Params.JSON
	data := c.model.EditUser(request, id)
	return c.RenderJSON(data)
}

func (c *UserController) GetUsers() revel.Result {
	data, _ := json.Marshal(c.model.GetUsers())
	list := string(data)
	return c.RenderJSON(list)
}
