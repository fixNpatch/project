package controllers

import (
	"github.com/revel/revel"
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
