package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
	"log"
	"testapp/app/dbmanager"
	"testapp/app/providers"
)

type TaskController struct {
	*revel.Controller
	model *providers.TaskModel
}

func (c *TaskController) Init() *TaskController {
	c.model = providers.NewTaskModel()
	c.model.DB = dbmanager.InitConnection()
	return nil
}
func (c *TaskController) CloseConnection() *TaskController {
	var err error
	err = c.model.DB.Close()
	if err != nil {
		fmt.Println("ERROR. Perhaps connection doesn't exist")
		return nil
	}
	fmt.Println("Connection closed")
	return nil
}

func (c *TaskController) GetTasks() revel.Result {
	data, _ := json.Marshal(c.model.GetTasks())
	list := string(data)
	return c.RenderJSON(list)
}

func (c *TaskController) OpenModalAdd() revel.Result {
	data := c.model.OpenModalAdd()
	list := string(data)
	return c.RenderJSON(list)
}

func (c *TaskController) OpenModalEdit() revel.Result {
	data := c.model.OpenModalEdit()
	list := string(data)
	return c.RenderJSON(list)
}

func (c *TaskController) AddTask() revel.Result {
	request := c.Params.JSON
	data := c.model.AddTask(request)
	return c.RenderJSON(data)
}

func (c *TaskController) DelTask() revel.Result {
	request := c.Params.JSON
	data := c.model.DelTask(request)
	log.Print(data)
	return c.RenderJSON(data)
}

func (c *TaskController) EditTask(id int) revel.Result {
	request := c.Params.JSON
	data := c.model.EditTask(request, id)
	log.Print(data)
	return c.RenderJSON(data)
}
