package controllers

import (
	"github.com/revel/revel"
	"io/ioutil"
	"testapp/app/providers"
)

type TaskController struct {
	*revel.Controller

	//uncomment == crush
	//*providers.TaskModel
	providers.TaskModel
}

//Инициализация (создание) контроллера и его модели.
//Данная функция вызывается в интерцепторе
//Интерцептор - внутренний метод Ревела. Простыми словами сборник правил
func (c TaskController) Init() revel.Result {
	providers.NewTaskModel()
	return nil
}

func (c *TaskController) Index() revel.Result {
	return c.Render()
}

func (c *TaskController) GetTaskList() revel.Result {

	//Желательно создать Response структуру
	//Response {status: 1(err) / 0(ok), body: content, errmsg: message if error }

	path := revel.AppPath
	file, err := ioutil.ReadFile(path + "providers/data.json")
	//err render json

	if err != nil {
		return c.RenderText(err.Error())
	}

	return c.RenderText(string(file))
}
