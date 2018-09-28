package providers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
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
	var users []User
	var user User

	sqlstatement := `SELECT t_users.c_user_secondname, t_users.c_user_rank FROM t_users, toc_projects_users WHERE toc_projects_users.fk_project_id = $1 AND t_users.user_id = toc_projects_users.fk_user_id`
	rows, err := c.DB.Query(sqlstatement, id)
	if err != nil { /*IF NOT WORKING REMOVE CNT STATEMENT */
		fmt.Println(err.Error())
		return "Cannot get userlist"
	}
	for rows.Next() {
		err = rows.Scan(&user.User_secondname, &user.User_rank)
		if err != nil {
		}
		users = append(users, user)
	}

	list, err := json.Marshal(users)
	if err != nil {

	}
	return string(list)
}

func (c *ProjectModel) GetUsersOutProject(id int) string {
	var users []User
	var user User
	sqlstatement := `SELECT t_users.c_user_secondname, t_users.c_user_rank FROM t_users EXCEPT
SELECT t_users.c_user_secondname, t_users.c_user_rank FROM t_users, toc_projects_users WHERE toc_projects_users.fk_project_id = $1 AND t_users.user_id = toc_projects_users.fk_user_id`
	rows, err := c.DB.Query(sqlstatement, id)
	if err != nil {
		fmt.Println(err.Error())
		return "Cannot get userlist"
	}
	for rows.Next() {
		err = rows.Scan(&user.User_secondname, &user.User_rank)
		if err != nil {
		}
		users = append(users, user)
	}

	fmt.Println(users)

	list, err := json.Marshal(users)
	if err != nil {

	}
	return string(list)
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

	/* REMOVE ALL USERS' CONNECTIONS TO PROJECT */
	sqlcostatement := `DELETE FROM toc_projects_users WHERE toc_projects_users.fk_project_id = $1`
	_, err := c.DB.Query(sqlcostatement, &project.Project_id)
	if err != nil {
		fmt.Println(err.Error())
		return ""
	}
	/* REMOVE ALL TASKS CONNECTED TO PROJECT */
	sqlcostatement2 := `DELETE FROM t_Tasks WHERE t_tasks.fk_project_id = $1`
	_, err = c.DB.Query(sqlcostatement2, &project.Project_id)
	if err != nil {
		fmt.Println(err.Error())
		fmt.Println("cannot delete task")
		return ""
	}

	/* REMOVE PROJECT */
	sqlstatement := `DELETE FROM t_projects WHERE t_projects.project_id = $1`
	_, err = c.DB.Query(sqlstatement, &project.Project_id)
	if err != nil {
		fmt.Println(err.Error())
		return ""
	}
	fmt.Println("Successful del task")
	return string(body)
}

func (c *ProjectModel) EditProject(body []byte, id int) string {
	var project Project
	err := json.Unmarshal(body, &project)
	if err != nil {
		fmt.Println(err.Error())
	}
	sqlstatement := `UPDATE t_projects SET (c_project_title, c_project_description, c_project_status) = ($1, $2, $3) WHERE t_projects.project_id = $4;`
	_, err = c.DB.Query(sqlstatement, &project.Project_title, &project.Project_description, &project.Project_status, id)
	if err != nil {
		fmt.Println(err.Error())
	}

	/* REMOVE ALL USERS' CONNECTIONS TO PROJECT */
	//sqlcostatement := `DELETE FROM toc_projects_users WHERE toc_projects_users.fk_project_id = $1`
	//_, err = c.DB.Query(sqlcostatement, id)
	//if err != nil {
	//	fmt.Println(err.Error())
	//	return ""
	//}

	/* RESTORE ALL USERS' CONNECTIONS TO PROJECT  */

	sqltocinsert := `INSERT INTO toc_projects_users(fk_project_id, fk_user_id) VALUES ($1, $2);`
	for i := 0; i < len(project.Userstack); i++ {
		uid := project.Userstack[i].User_id
		fmt.Print(project.Userstack)
		fmt.Print(" ==================== >")
		fmt.Println(project.Userstack[i].User_id)
		_, err := c.DB.Query(sqltocinsert, string(id), uid)
		if err != nil {
			fmt.Println(err.Error())
		}
	}

	fmt.Println(project.Userstack)

	return string(body)
}
