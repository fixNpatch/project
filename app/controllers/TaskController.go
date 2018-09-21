package controllers

import (
	"fmt"
	"github.com/revel/revel"
	"testapp/app/providers"
)

type TaskController struct {
	*revel.Controller

	//uncomment == crush
	//*providers.TaskModel
	model *providers.TaskModel
}

//Инициализация (создание) контроллера и его модели.
//Данная функция вызывается в интерцепторе
//Интерцептор - внутренний метод Ревела. Простыми словами сборник правил
func (c TaskController) Init() revel.Result {
	c.model = providers.NewTaskModel()
	return nil
}

func (c *TaskController) Index() revel.Result {
	return c.Render()
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
