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
}

//Инициализация (создание) контроллера и его модели.
//Данная функция вызывается в интерцепторе
//Интерцептор - внутренний метод Ревела. Простыми словами сборник правил
func (c *TaskController) Init() revel.Result {
	providers.NewTaskModel()
	return c.Result
}

func (c TaskController) Index() revel.Result {
	return c.Render()
}
func (c TaskController) GetUser(id int) revel.Result {
	a := 1 + id
	return c.RenderJSON(a)
}

// уже не помню что это
//var projects []Project = []Project{
//	Project{
//		project_id:1,
//	},
//}

func (c TaskController) GetTaskList() revel.Result {

	//Желательно создать Response структуру
	//Response {status: 1(err) / 0(ok), body: content, errmsg: message if error }
	file, err := ioutil.ReadFile("C:/Users/dev/go/src/testapp/app/providers/data.json")
	//err render json

	if err != nil {
		return c.RenderText(err.Error())
	}

	return c.RenderJSON(file)
}
