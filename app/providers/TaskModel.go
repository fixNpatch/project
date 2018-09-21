package providers

type TaskModel struct {
	task_number    int
	project_title  string
	task_title     string
	task_hours     int
	task_timestamp string
	task_status    string
	task_doer      User
}

func (t TaskModel) GetTask() {

}
