package controllers

import (
	"github.com/revel/revel"
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
