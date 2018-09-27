package providers

import (
	"database/sql"
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
	sqlstatement := `SELECT task_id, c_task_number, c_task_title, c_task_description, c_task_hours, c_task_status, c_task_timestamp, c_user_secondname  
FROM public.t_Tasks, public.t_Users
WHERE t_Tasks.fk_user_id = t_Users.user_id;`
	rows, err := c.DB.Query(sqlstatement)
	if err != nil {
		revel.INFO.Print("DB Error", err)
	}
	defer rows.Close()
	for rows.Next() {
		err = rows.Scan(&task.Task_id, &task.Task_number, &task.Task_title,
			&task.Task_description, &task.Task_hours, &task.Task_status, &task.Task_timestamp, &doer.User_secondname)
		if err != nil {
		}
		task.Task_doer = doer
		fmt.Println(task)
		tasklist = append(tasklist, task)
	}
	return tasklist
}

func (c *TaskModel) OpenModalAdd() string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/task_modal_add.json")
	url := string(file)
	return url
}

func (c *TaskModel) OpenModalEdit() string {
	path := revel.AppPath
	file, _ := ioutil.ReadFile(path + "/dummy/task_modal_edit.json")
	url := string(file)
	return url
}
