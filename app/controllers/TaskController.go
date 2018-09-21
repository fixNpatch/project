package controllers

import (
	"github.com/revel/revel"
	"io/ioutil"
)

type TaskController struct {
	*revel.Controller
}

func (c TaskController) Index() revel.Result {
	return c.Render()
}
func (c TaskController) GetUser(id int) revel.Result {
	a := 1 + id
	return c.RenderJSON(a)
}

func (c TaskController) GetTaskList() revel.Result {
	file, err := ioutil.ReadFile("C:/Users/dev/go/src/testapp/app/providers/data.json")
	if err != nil {
		panic(err)
	}
	return c.RenderText(string(file))
}
