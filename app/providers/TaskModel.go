package providers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
	"io/ioutil"
)

type TaskModel struct {
	DB *sql.DB
}

//чтобы использовать модель в контроллере необходимо проинициализировать её
//есть два варианта
//первый

//func NewTaskModel(db *sql.DB) *TaskModel{
func NewTaskModel() *TaskModel {
	return &TaskModel{
		//скобки {} означают пустой новый экземпляр, &ссылка на него
		//возвращаем новый экземпляр модели (опционально: с инициализированными полями)
		//db:db,
	}

}

/*DUMMY*/
//func (t *TaskModel) GetTasks() string {
//	path := revel.AppPath
//	file, _ := ioutil.ReadFile(path + "/dummy/taskWithUsers.json")
//	url := string(file)
//	return url
//}

func (c *TaskModel) GetTasks() []Task {
	var tasklist []Task
	var task Task
	var doer User
	var project Project
	sqlstatement := `SELECT task_id, c_task_number, c_task_title, c_task_description, c_task_hours, c_task_status, c_task_timestamp, c_user_secondname, c_project_title  
FROM public.t_Tasks, public.t_Users, public.t_Projects
WHERE t_Tasks.fk_user_id = t_Users.user_id AND t_Tasks.fk_project_id = t_Projects.project_id;`
	rows, err := c.DB.Query(sqlstatement)
	if err != nil {
		revel.INFO.Print("DB Error", err)
	}
	defer rows.Close()
	for rows.Next() {
		err = rows.Scan(&task.Task_id, &task.Task_number, &task.Task_title,
			&task.Task_description, &task.Task_hours, &task.Task_status, &task.Task_timestamp, &doer.User_secondname, &project.Project_title)
		if err != nil {
		}
		task.Project_title = project.Project_title
		task.Task_doer = doer
		fmt.Println(task)
		tasklist = append(tasklist, task)
	}
	return tasklist
}

/*DUMMY*/
//func (c *TaskModel) OpenModalAdd() string {
//	path := revel.AppPath
//	file, _ := ioutil.ReadFile(path + "/dummy/task_modal_add.json")
//	url := string(file)
//	return url
//}

func (c *TaskModel) OpenModalAdd() []byte {
	type File struct {
		User_id string
		Value   string `json:"value"`
		Type    string `json:"type"`
	}
	type Folder struct {
		Project_id string `json:"Project_id"`
		Value      string `json:"value"`
		Type       string `json:"type"`
		Data       []File `json:"data"`
	}

	var projects []Folder
	var project Folder
	var user File

	sqlstatement := `SELECT project_id, c_project_title FROM public.t_Projects;`

	rows, err := c.DB.Query(sqlstatement)
	if err != nil {
		revel.INFO.Print("DB Error", err)
	}
	for rows.Next() {
		err = rows.Scan(&project.Project_id, &project.Value)
		if err != nil {
			fmt.Println("Cannot read a row")
			return nil
		}
		project.Type = "folder"
		fmt.Println(project)
		projects = append(projects, project)
	}
	rows.Close()
	i := 0
	for i < len(projects) {
		var secondname, firstname string

		/* HOW TO CHANGE fk_project_id = i not 1*/
		substatement := `SELECT user_id, c_user_secondname, c_user_firstname FROM public.t_Users, public.toc_Projects_Users
WHERE toc_Projects_Users.fk_project_id = 1 AND t_Users.user_id = toc_Projects_Users.fk_user_id`

		rows, err := c.DB.Query(substatement)
		if err != nil {
			revel.INFO.Print("DB Error", err)
		}
		for rows.Next() {
			err = rows.Scan(&user.User_id, &secondname, &firstname)
			if err != nil {
				fmt.Println("Cannot read a row")
				return nil
			}
			user.Value = secondname + " " + firstname
			project.Type = "file"
			fmt.Println(user)
			projects[i].Data = append(projects[i].Data, user)
		}
		i++
	}

	bytes, err := json.Marshal(projects)
	if err != nil {
		fmt.Println("cannot marshal", err.Error())
		return nil
	}
	return bytes
}

func (c *TaskModel) OpenModalEdit() string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/task_modal_edit.json")
	url := string(file)
	return url
}
