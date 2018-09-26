package controllers

import (
	"github.com/revel/revel"
)

func init() {
	//revel.InterceptMethod(App.Index, revel.BEFORE)
	revel.InterceptMethod((*UserController).Init, revel.BEFORE)
	revel.InterceptMethod(ProjectController.Init, revel.BEFORE)
	revel.InterceptMethod(TaskController.Init, revel.BEFORE)
	//revel.InterceptMethod(providers.UserModel.Init, revel.BEFORE)

}
