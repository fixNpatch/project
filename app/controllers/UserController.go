package controllers

import (
	"fmt"
	"github.com/revel/revel"
	"log"
	"testapp/app/providers"
)

type UserController struct {
	*revel.Controller
	model *providers.UserModel
}

// Что это такое???
//func (c *UserController) Apply(req *revel.Request, resp *revel.Response) {
//	panic("implement me")
//}

func (c UserController) Init() *UserController {
	c.model = providers.NewUserModel()
	return nil
}

/* Эталон */
func (c *UserController) GetPic() revel.Result {
	data, err := c.model.GetPic()
	if err != nil {
		return c.RenderJSON(err.Error())
	}
	fmt.Println(data)
	return c.RenderJSON(data)
}

/* CHANGES*/
func (c *UserController) GetPicture() revel.Result {
	data := c.model.GetPicture()
	fmt.Println(data)
	return c.RenderJSON(data)
}

func (c *UserController) GetSubordinates() revel.Result {
	data := c.model.GetSubordinates()
	return c.RenderJSON(data)
}

func (c *UserController) GetUsers() revel.Result {
	data := c.model.GetUsers()
	return c.RenderJSON(data)
}

//func (c *UserController) AddUser() revel.Result {
//
//	log.Println("json taken")
//	body := c.Request.GetBody()
//	//body := r.Body
//	content, _ := ioutil.ReadAll(body)
//	path := revel.AppPath
//	file, _ := os.Create(path + "/dummy/test.json")
//	defer file.Close()
//	_, _ = file.WriteString(string(content))
//
//	log.Println(content)
//	return c.RenderJSON(content)
//}

func (c *UserController) AddUser() revel.Result {

	var jsonData map[string]interface{}
	c.Params.BindJSON(&jsonData)

	//c.model.AddUser()

	log.Println(jsonData)
	return c.RenderJSON(jsonData)
}
