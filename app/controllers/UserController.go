package controllers

import (
	"fmt"
	"github.com/revel/revel"
	"io/ioutil"
	"log"
	"os"
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

/*================================================*/
/*                 MY VARIANT                     */

func (c *UserController) AddUser() revel.Result {

	body := c.Request.GetBody()

	content, _ := ioutil.ReadAll(body)
	path := revel.AppPath
	file, _ := os.Create(path + "/dummy/test.json")
	defer file.Close()
	_, _ = file.WriteString(string(content))

	log.Print(content)

	return c.RenderJSON(content)
}

/*================================================*/
/*                 ULTRA KOSTYL                   */

//
//func (c *UserController) AddUser() revel.Result {
//	data1 := c.Params.Get("data")
//	var data *providers.User
//	fmt.Printf("ggggggggggggggggggggggg %+v", data1)
//	err := json.Unmarshal([]byte(data1), &data)
//	if err != nil {
//		return c.RenderJSON(err.Error())
//	}
//
//
//	return c.RenderJSON(1)
//}

/*================================================*/

/*          2 variant         */

//func (c *UserController) AddUser() revel.Result {
//
//	var jsonData map[string]interface{}
//	c.Params.BindJSON(&jsonData)
//
//	//	file, _ := os.Create(path + "/dummy/test.json")
//	//	defer file.Close()
//	//	_, _ = file.WriteString(string(content))
//
//	//c.model.AddUser()
//	content := string(jsonData)
//	log.Println(jsonData)
//	return c.RenderJSON(jsonData)
//}
