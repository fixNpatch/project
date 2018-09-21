package controllers

import (
	"github.com/revel/revel"
	"io/ioutil"
)

type UserController struct {
	//здесь должна быть инциализирована модель
	*revel.Controller
}

func (c UserController) Index() revel.Result {
	return c.Render()
}
func (c UserController) GetUser(id int) revel.Result {
	a := 1 + id
	return c.RenderJSON(a)
}

func (c UserController) GetPicture() revel.Result {
	file, err := ioutil.ReadFile("C:/Users/dev/go/src/testapp/app/providers/picture.json")
	if err != nil {
		panic(err)
	}
	return c.RenderText(string(file))
}
