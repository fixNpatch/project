package providers

import (
	"encoding/json"
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

func (t *ProjectModel) GetUsersOnProject(id int) string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/projectWithUsers.json")
	var data []Project
	var users []User
	json.Unmarshal(file, &data)

	var i = 0
	var j = 0
	for i < len(data) {
		if data[i].Project_id == id {
			for j < len(data[i].Project_doers) {
				users = append(users, data[i].Project_doers[j])
				j++
			}
		}
		i++
	}
	answer, _ := json.Marshal(users)
	return string(answer)
}

func (t *ProjectModel) GetUsersOutProject(id int) string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/projectWithUsers.json")
	var data []Project
	var users []User
	json.Unmarshal(file, &data)

	var i = 0
	var j = 0
	for i < len(data) {
		if data[i].Project_id == id {
			for j < len(data[i].Project_doers) {
				users = append(users, data[i].Project_doers[j])
				j++
			}
		}
		i++
	}
	answer, _ := json.Marshal(users)
	return string(answer)
}
