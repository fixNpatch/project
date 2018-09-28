package providers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
	"io/ioutil"
	"math/rand"
	"time"
)

type ProjectModel struct {
	name string
	DB   *sql.DB
}

func NewProjectModel() *ProjectModel {
	return &ProjectModel{}
}

func (c *ProjectModel) GetProjects() []Project {
	var projectlist []Project
	var project Project
	sqlstatement := `SELECT * FROM public.t_Projects`
	rows, err := c.DB.Query(sqlstatement)
	if err != nil {
		revel.INFO.Print("DB Error", err)
	}
	defer rows.Close()
	for rows.Next() {
		err = rows.Scan(&project.Project_id, &project.Project_number, &project.Project_title,
			&project.Project_description, &project.Project_deadline, &project.Project_status, &project.Project_timestamp)
		if err != nil {
		}
		projectlist = append(projectlist, project)
	}
	return projectlist
}

/* Возвращаем массив объектов типа юзер */
func (c *ProjectModel) GetUsersOnProject(id int) string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/projectWithUsers.json")
	var data []Project //включает в себя поле Project_doer []User
	var users []User

	json.Unmarshal(file, &data) //парсим
	var i = 0
	var j = 0
	for i < len(data) {
		if data[i].Project_id == string(id) {
			for j < len(data[i].Userstack) {
				users = append(users, data[i].Userstack[j])
				j++
			}
			break
		}
		i++
	}
	answer, _ := json.Marshal(users)
	return string(answer)
}

func (c *ProjectModel) GetUsersOutProject(id int) string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/projectWithUsers.json")
	ulfile, _ := ioutil.ReadFile(path + "/dummy/userlist.json")
	var data []Project //включает в себя поле Project_doer []User
	var userlist []User
	var users []User

	json.Unmarshal(file, &data) //парсим
	json.Unmarshal(ulfile, &userlist)
	var i = 0
	var j = 0
	var k int
	for i < len(data) { /* Ищем проект по id*/
		if data[i].Project_id == string(id) { /* если найден то */
			for j < len(userlist) { /* берем каждый элемент в userbase*/
				found := false
				k = 0
				for k < len(data[i].Userstack) { /*начинаем поэлементно сравнивать со стеком проекта*/
					if data[i].Userstack[k].User_id == userlist[j].User_id { /* если они совпадают то*/
						found = true
						break
					}
					k++
				}
				if found == false { /* если элемент из базы не был найден в стеке то добавляем его к ответу*/
					users = append(users, userlist[j])
				}
				j++
			}
			break
		}
		i++
	}

	answer, _ := json.Marshal(users)
	return string(answer)
}

func (c *ProjectModel) AddProject(body []byte) string {
	var project Project
	now := time.Now()
	err := json.Unmarshal(body, &project)
	if err != nil {
		fmt.Println(err.Error())
	}
	sqlstatement := `INSERT INTO t_projects(c_project_number, c_project_title, c_project_description, c_project_status, c_project_timestamp) 
	VALUES ($1, $2, $3, $4, $5);`
	_, err = c.DB.Query(sqlstatement, rand.Intn(1000), &project.Project_title, &project.Project_description, 1, now)
	cnt := 0
	if err != nil { /*IF NOT WORKING REMOVE CNT STATEMENT */
		if cnt < 3 {
			c.DB.Query(sqlstatement, rand.Intn(1000), &project.Project_title, &project.Project_description, 1, now)
		} else {
			fmt.Println(err.Error())
			return "Cannot add project"
		}
		cnt++
	}

	sqlgetpid := `SELECT project_id FROM t_projects where c_project_timestamp = $1`
	row, err := c.DB.Query(sqlgetpid, now)
	if err != nil {
	}
	for row.Next() {
		err = row.Scan(&project.Project_id)
		if err != nil {
		}
	}

	sqltocinsert := `INSERT INTO toc_projects_users(fk_project_id, fk_user_id) VALUES ($1, $2);`
	for i := 0; i < len(project.Userstack); i++ {
		pid := project.Project_id
		uid := project.Userstack[i].User_id
		_, err := c.DB.Query(sqltocinsert, pid, uid)
		if err != nil {
			fmt.Println(err.Error())
		}
		fmt.Println("############## ADD NEW LINE IN TOC ################")
	}

	fmt.Println("Successful add project")
	return string(body)
}

func (c *ProjectModel) DelProject(body []byte) string {
	var project Project
	json.Unmarshal(body, &project)
	sqlstatement := `DELETE FROM t_projects WHERE t_projects.project_id = $1`
	_, err := c.DB.Query(sqlstatement, &project.Project_id)
	if err != nil {
		fmt.Println(err.Error())
		return ""
	}

	/* ALSO REQUIRE TO DELETE ALL ROWS IN TOC_PROJECT_USERS*/

	fmt.Print("==================== USERSTACK LEN ============================")
	fmt.Println(len(project.Userstack))

	sqlcostatement := `DELETE FROM toc_projects_users WHERE toc_projects_users.project_id = $1`
	for i := 0; i < len(project.Userstack); i++ {
		_, err := c.DB.Query(sqlcostatement, &project.Project_id)
		if err != nil {
			fmt.Println(err.Error())
			return ""
		}
		fmt.Println("REMOVE ONE LINE IN TOC")
	}

	/* ALSO REQUIRE TO DELETE ALL TASK INCLUDED IN PROJECT*/

	sqlcostatement2 := `DELETE FROM t_Tasks WHERE t_tasks.fk_project_id = $1`
	for i := 0; i < len(project.Userstack); i++ {
		_, err := c.DB.Query(sqlcostatement2, &project.Project_id)
		if err != nil {
			fmt.Println(err.Error())
			fmt.Println("cannot delete task")
			return "Cannot delete task"
		}
		fmt.Println("REMOVE ONE LINE IN TOC")
	}

	fmt.Println("Successful del task")
	return string(body)
}
