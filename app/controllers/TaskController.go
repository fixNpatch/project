package controllers

import (
	"github.com/revel/revel"
	"log"
	"net/http"
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
func (c TaskController) Init() revel.Result {
	c.model = providers.NewTaskModel()
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
