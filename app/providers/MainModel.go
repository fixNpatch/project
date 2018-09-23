package providers

type Task struct {
	Task_number    int
	Project_title  string
	Task_title     string
	Task_hours     int
	Task_timestamp string
	Task_status    string
	Task_doer      User
}

type User struct {
	LOGIN              string
	PASSWORD           string
	Employee_id        int
	Employee_first     string
	Employee_second    string
	Employee_middle    string
	Employee_rank      string
	Employee_pic       string
	Employee_timestamp string
	Taskstack          []Task
}

type Project struct {
	Project_id          int
	Project_number      int
	Project_title       string
	Project_description string
	Project_status      string
	Project_timestamp   string
	Project_doers       []User
	Taskstack           []Task
}
