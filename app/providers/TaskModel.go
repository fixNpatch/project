package providers

import (
	"database/sql"
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

func (t *TaskModel) GetTasks() string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/taskWithUsers.json")
	url := string(file)
	return url
}

func (t *TaskModel) OpenModalAdd() string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/task_modal_add.json")
	url := string(file)
	return url
}

func (t *TaskModel) OpenModalEdit() string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/task_modal_edit.json")
	url := string(file)
	return url
}
