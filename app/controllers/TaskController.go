package controllers

import (
	"fmt"
	"github.com/revel/revel"
	"log"
	"net/http"
	"testapp/app/dbmanager"
	"testapp/app/providers"
)

type TaskController struct {
	*revel.Controller

	/* declare model as field */
	model *providers.TaskModel
}

/* This function is included in interceptor BEFORE */
/* BEFORE each call to other functions Interceptor makes this function be called before */
/* Init - create "c" as model declared in structure ^^^   */
func (c *TaskController) Init() *TaskController {
	c.model = providers.NewTaskModel()
	c.model.DB = dbmanager.InitConnection()
	return nil
}

func (c *TaskController) CloseConnection() *TaskController {
	var err error
	err = c.model.DB.Close()
	if err != nil {
		fmt.Print("ERROR")
		return nil
	}
	fmt.Print("All right")
	return nil
}

func (c *TaskController) GetTasks() revel.Result {
	data := c.model.GetTasks()
	return c.RenderJSON(data)
}

func (c *TaskController) OpenModalAdd() revel.Result {
	data := c.model.OpenModalAdd()
	return c.RenderJSON(data)
}

func (c *TaskController) OpenModalEdit() revel.Result {
	data := c.model.OpenModalEdit()
	return c.RenderJSON(data)
}

func (c *TaskController) AddTask(r *http.Request) revel.Result {
	request := c.Params.JSON
	//c.model.AddTask(request)
	data := string(request)
	log.Print(data)
	return c.RenderJSON(data)
}

func (c *TaskController) DelTask() revel.Result {
	request := c.Params.JSON
	//c.model.DelTask(request)
	data := string(request)
	log.Print(data)
	return c.RenderJSON(data)
}

func (c *TaskController) EditTask(id int) revel.Result {
	request := c.Params.JSON
	data := string(request)
	log.Print(data)
	return c.RenderJSON(data)
}
