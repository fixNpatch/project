package controllers

import "github.com/revel/revel"

func init() {
	//revel.InterceptMethod(App.Index, revel.BEFORE)
	revel.InterceptMethod(TaskController.Init, revel.BEFORE)
}
