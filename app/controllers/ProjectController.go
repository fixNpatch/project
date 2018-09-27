package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
	"log"
	"net/http"
	"testapp/app/dbmanager"
	"testapp/app/providers"
)

type ProjectController struct {
	*revel.Controller
	model *providers.ProjectModel
}

func (c *ProjectController) Init() *ProjectController {
	c.model = providers.NewProjectModel()
	c.model.DB = dbmanager.InitConnection()
	return nil
}
func (c *ProjectController) CloseConnection() *ProjectController {
	var err error
	err = c.model.DB.Close()
	if err != nil {
		fmt.Println("ERROR. Perhaps connection doesn't exist")
		return nil
	}
	fmt.Println("Connection closed")
	return nil
}

/*DUMMY*/
//func (c *ProjectController) GetProjects() revel.Result {
//	data := c.model.GetProjects()
//	return c.RenderJSON(data)
//}

func (c *ProjectController) GetProjects() revel.Result {
	data, _ := json.Marshal(c.model.GetProjects())
	list := string(data)
	return c.RenderJSON(list)
}

func (c *ProjectController) GetUsersOnProject(id int) revel.Result {
	data := c.model.GetUsersOnProject(id)
	return c.RenderJSON(data)
}

func (c *ProjectController) GetUsersOutProject(id int) revel.Result {
	data := c.model.GetUsersOutProject(id)
	return c.RenderJSON(data)
}

func (c *ProjectController) AddProject(r *http.Request) revel.Result {
	request := c.Params.JSON
	data := c.model.AddProject(request)
	return c.RenderJSON(data)
}

func (c *ProjectController) DelProject() revel.Result {
	request := c.Params.JSON
	data := c.model.DelProject(request)
	log.Print(data)
	return c.RenderJSON(data)
}
