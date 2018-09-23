package providers

import (
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
