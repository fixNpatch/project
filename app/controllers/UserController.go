package controllers

import (
	"github.com/revel/revel"
	"io/ioutil"
	"testapp/app/providers"
)

type UserController struct {
	//здесь должна быть инциализирована модель
	*revel.Controller
	//*providers.UserModel
}

// Что это такое???
func (c *UserController) Apply(req *revel.Request, resp *revel.Response) {
	panic("implement me")
}

func (c UserController) Init() revel.Result {
	providers.NewUserModel()
	//return &UserController{}
	return nil
}

func (c *UserController) Index() revel.Result {
	return c.Render()
}

func (c *UserController) GetPicture() revel.Result {
	file, err := ioutil.ReadFile("C:/Users/dev/go/src/testapp/app/providers/picture.json")
	if err != nil {
		panic(err)
	}
	return c.RenderText(string(file))
}
