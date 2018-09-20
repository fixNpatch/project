package controllers

import (
	"github.com/revel/revel"
)

type UserController struct {
	*revel.Controller
}

func (c UserController) Index() revel.Result {
	return c.Render()
}
func (c UserController) GetUser(id int) revel.Result {
	a := 1 + id
	return c.RenderJSON(a)
}

//func (c UserController) GetPictute() revel.Result  {
//	return c.
//}
