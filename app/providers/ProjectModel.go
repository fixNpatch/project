package providers

import (
	"database/sql"
	"encoding/json"
	"github.com/revel/revel"
	"io/ioutil"
)

type ProjectModel struct {
	name string
	DB   *sql.DB
}

func NewProjectModel() *ProjectModel {
	return &ProjectModel{}
}

/*DUMMY*/
/*func (t *ProjectModel) GetProjects() string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/projectWithUsers.json")
	url := string(file)
	return url
}*/

/* TEST WITH DBase*/
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
