package providers

import (
	"github.com/revel/revel"
	"io/ioutil"
)

type TaskModel struct {
	//db *sql.DB
	//поля не отображают сущность.
	//поля нужны для работы с сущностями и не содержат их структуру
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

func (t *TaskModel) GetTask() (task *Task, err error) {
	task = &Task{
		Task_number:   1,
		Project_title: "asd",
	}
	return
}
func (t *TaskModel) GetFile() string {
	path := revel.AppPath
	file, err := ioutil.ReadFile(path + "/providers/data.json")

	if err != nil {
		panic(err)
	}
	return string(file)
}
