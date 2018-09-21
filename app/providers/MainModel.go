package providers

type Task struct {
	Task_number    int
	Project_title  string
	task_title     string
	task_hours     int
	task_timestamp string
	task_status    string
	task_doer      User
}

type User struct {
	LOGIN              string
	PASSWORD           string
	employee_id        int
	employee_first     string
	employee_second    string
	employee_middle    string
	employee_rank      string
	employee_pic       string
	employee_timestamp string
	taskstack          []Task
}

type Project struct {
	project_id          int
	project_number      int
	project_title       string
	project_description string
	project_status      string
	project_timestamp   string
	project_doers       []User
	taskstack           []Task
}
