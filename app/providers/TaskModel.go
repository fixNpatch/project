package providers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
	"math/rand"
	"time"
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
		task.Task_timestamp.Format("02012006")
		task.Project_title = project.Project_title
		task.Task_doer = doer
		tasklist = append(tasklist, task)
	}
	return tasklist
}

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

	var list []Folder
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

	for i := 0; i < len(projects); i++ {
		var secondname, firstname string
		substatement := `SELECT user_id, c_user_secondname, c_user_firstname FROM public.t_Users, public.toc_Projects_Users
WHERE toc_Projects_Users.fk_project_id = $1 AND t_Users.user_id = toc_Projects_Users.fk_user_id`

		rows, err := c.DB.Query(substatement, projects[i].Project_id)
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
		rows.Close()

	}

	/* CHECK FOR PROJECTS WITHOUT USERS */
	for i := 0; i < len(projects); i++ {
		if len(projects[i].Data) > 0 {
			list = append(list, projects[i])
		}
	}

	bytes, err := json.Marshal(list)
	if err != nil {
		fmt.Println("cannot marshal", err.Error())
		return nil
	}
	return bytes
}

func (c *TaskModel) OpenModalEdit() []byte {
	type File struct {
		Task_id          string
		Value            string `json:"value"`
		Type             string `json:"type"`
		Task_description string
		Task_hours       int
	}
	type Subfolder struct {
		User_id string
		Value   string `json:"value"`
		Type    string `json:"type"`
		Data    []File `json:"data"`
	}
	type Folder struct {
		Project_id string      `json:"Project_id"`
		Value      string      `json:"value"`
		Type       string      `json:"type"`
		Data       []Subfolder `json:"data"`
	}

	var list []Folder
	var sublist []Subfolder
	var projects []Folder
	var project Folder
	var user Subfolder
	var task File

	/* SELECT ALL PROJECTS */

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
		projects = append(projects, project)
	}
	rows.Close()

	/* SELECT PROJECTS' USERS*/

	for i := 0; i < len(projects); i++ {
		var secondname, firstname string
		substatement := `SELECT user_id, c_user_secondname, c_user_firstname FROM public.t_Users, public.toc_Projects_Users
WHERE toc_Projects_Users.fk_project_id = $1 AND t_Users.user_id = toc_Projects_Users.fk_user_id`

		rows, err := c.DB.Query(substatement, projects[i].Project_id)
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
			user.Type = "folder"
			projects[i].Data = append(projects[i].Data, user)
		}
		rows.Close()
	}

	/* SELECT USERS' TASKS*/

	for i := 0; i < len(projects); i++ {
		for j := 0; j < len(projects[i].Data); j++ {
			subsubstatement := `SELECT task_id, c_task_title, c_task_description, c_task_hours FROM public.t_Tasks WHERE t_Tasks.fk_project_id = $1 AND t_Tasks.fk_user_id = $2`
			rows, err := c.DB.Query(subsubstatement, projects[i].Project_id, projects[i].Data[j].User_id)
			if err != nil {
				revel.INFO.Print("DB Error", err)
			}
			for rows.Next() {
				err = rows.Scan(&task.Task_id, &task.Value, &task.Task_description, &task.Task_hours)
				if err != nil {
					fmt.Println("Cannot read a row")
					return nil
				}
				task.Type = "folder"
				projects[i].Data[j].Data = append(projects[i].Data[j].Data, task)
			}
			rows.Close()
		}

	}
	/* CHECK VALID */
	for i := 0; i < len(projects); i++ { // бежим по проектам
		sublist = nil                                //обнуляем подлист
		for j := 0; j < len(projects[i].Data); j++ { // берем проект, бежим по его юзерам
			if len(projects[i].Data[j].Data) > 0 { // берем юзера, если у него есть задачи
				sublist = append(sublist, projects[i].Data[j]) //добавляем этого юзера в подлист
			}
		}
		projects[i].Data = sublist     // перезаписываем массив юзеров у проекта на валидные нам
		if len(projects[i].Data) > 0 { //если после этого массив юзеров больше нуля
			list = append(list, projects[i]) //то записываем этот проект в окончательный Response
		}
	}

	bytes, err := json.Marshal(list)
	if err != nil {
		fmt.Println("cannot marshal", err.Error())
		return nil
	}
	return bytes
}

func (c *TaskModel) AddTask(body []byte) string {
	var task Task
	rand.Seed(time.Now().UnixNano())
	random := rand.Int()
	json.Unmarshal(body, &task)
	sqlstatement := `INSERT INTO t_Tasks (c_task_number, c_task_title, c_task_description, c_task_hours, c_task_status, c_task_timestamp, fk_user_id, fk_project_id) 
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
	_, err := c.DB.Query(sqlstatement, random, &task.Task_title, &task.Task_description, &task.Task_hours, 1, time.Now(), &task.User_id, &task.Project_id)
	if err != nil {
		fmt.Println(err.Error())
		return ""
	}
	fmt.Println("Successful add task")
	return string(body)
}

func (c *TaskModel) DelTask(body []byte) string {
	var task Task
	json.Unmarshal(body, &task)
	fmt.Println(task)
	sqlstatement := `DELETE FROM t_Tasks WHERE t_tasks.task_id = $1`
	_, err := c.DB.Query(sqlstatement, &task.Task_id)
	if err != nil {
		fmt.Println(err.Error())
		return ""
	}
	fmt.Println("Successful del task")
	return string(body)
}

func (c *TaskModel) EditTask(body []byte, id int) string {
	var task Task
	json.Unmarshal(body, &task)
	sqlstatement := `UPDATE t_tasks SET (c_task_title, c_task_description, c_task_hours, c_task_status) = ($1, $2, $3, $4) WHERE t_Tasks.task_id = $5;`
	_, err := c.DB.Query(sqlstatement, &task.Task_title, &task.Task_description, &task.Task_hours, 1, id)
	if err != nil {
		fmt.Println(err.Error())
		return ""
	}
	fmt.Println("Successful add task")
	return string(body)
}
