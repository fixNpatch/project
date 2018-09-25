package controllers

import (
	"github.com/revel/revel"
	"log"
	"net/http"
	"testapp/app/providers"
)

type ProjectController struct {
	*revel.Controller
	model *providers.ProjectModel
}

func (c ProjectController) Init() revel.Result {
	c.model = providers.NewProjectModel()
	return nil
}

func (c *ProjectController) GetProjects() revel.Result {
	data := c.model.GetProjects()
	return c.RenderJSON(data)
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
	data := string(request)
	log.Print(data)
	return c.RenderJSON(data)
}
