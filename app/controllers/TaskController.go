package controllers

import (
	"github.com/revel/revel"
	"io/ioutil"
)

type TaskController struct {
	*revel.Controller
}

func (c TaskController) Index() revel.Result {
	return c.Render()
}
func (c TaskController) GetUser(id int) revel.Result {
	a := 1 + id
	return c.RenderJSON(a)
}

type Task struct {
	task_number    int
	project_title  string
	task_title     string
	task_hours     int
	task_timestamp string
	task_status    string
	task_doer      User
}

type User struct {
	LOGIN              string
	PASSWORD           string
	employee_id        int
	employee_first     string
	employee_second    string
	employee_middle    string
	employee_rank      string
	employee_pic       string
	employee_timestamp string
	taskstack          []Task
}

type Project struct {
	project_id          int
	project_number      int
	project_title       string
	project_description string
	project_status      string
	project_timestamp   string
	project_doers       []User
	taskstack           []Task
}

func (c TaskController) GetTaskList() revel.Result {
	file, err := ioutil.ReadFile("C:/Users/dev/go/src/testapp/app/providers/data.json")
	if err != nil {
		panic(err)
	}
	return c.RenderText(string(file))
}
