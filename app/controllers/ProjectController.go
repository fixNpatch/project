package controllers

import (
	"github.com/revel/revel"
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
