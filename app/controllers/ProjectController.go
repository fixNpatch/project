package controllers

import (
	"github.com/revel/revel"
)

type ProjectController struct {
	*revel.Controller
}

func (c ProjectController) Index() revel.Result {
	return c.Render()
}
func (c ProjectController) GetUser(id int) revel.Result {
	a := 1 + id
	return c.RenderJSON(a)
}
