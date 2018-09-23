package controllers

import (
	"fmt"
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

func (c *TaskController) GetTaskList() revel.Result {
	fmt.Println("TaskController::GetTaskList")
	data, err := c.model.GetTask()
	if err != nil {
		return c.RenderJSON(err.Error())
	}
	fmt.Println("TaskController::GetTaskList data;", data)
	return c.RenderJSON(data)
}
