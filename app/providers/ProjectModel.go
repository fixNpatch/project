package providers

import (
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
	"io/ioutil"
)

type ProjectModel struct {
	name string
}

func NewProjectModel() *ProjectModel {
	return &ProjectModel{
		//скобки {} означают пустой новый экземпляр, &ссылка на него
		//возвращаем новый экземпляр модели (опционально: с инициализированными полями)
	}

}

func (t *ProjectModel) GetProjects() string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/projectWithUsers.json")
	url := string(file)
	return url
}

/* Возвращаем массив объектов типа юзер */
func (t *ProjectModel) GetUsersOnProject(id int) string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/projectWithUsers.json")
	var data []Project //включает в себя поле Project_doer []User
	var users []User

	json.Unmarshal(file, &data) //парсим
	var i = 0
	var j = 0
	for i < len(data) {
		if data[i].Project_id == id {
			for j < len(data[i].Userstack) {
				users = append(users, data[i].Userstack[j])
				j++
			}
			break
		}
		i++
	}
	answer, _ := json.Marshal(users)
	fmt.Println(answer)
	return string(answer)
}

func (t *ProjectModel) GetUsersOutProject(id int) string {
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
	for i < len(data) {
		if data[i].Project_id == id {
			var k = 0
			for j < len(data[i].Userstack) {
				found := false
				for k < len(userlist) {
					if data[i].Userstack[j].User_id == userlist[k].User_id {
						found = true
					}
				}
				if found == false {
					users = append(users, data[i].Userstack[j])
				}
				j++
			}
			break
		}
		i++
	}
	answer, _ := json.Marshal(users)
	fmt.Println(answer)
	return string(answer)
}
