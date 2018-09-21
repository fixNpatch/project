package controllers

import (
	"github.com/revel/revel"
)

type App struct {
	*revel.Controller
}

func (c *App) Index() revel.Result {
	return c.Render()
}
func (c *App) GetUser(id int) revel.Result {
	a := 1 + id
	return c.RenderJSON(a)
}
