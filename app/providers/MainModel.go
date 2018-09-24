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
	LOGIN           string
	PASSWORD        string
	User_id         string
	User_firstname  string
	User_secondname string
	User_middlename string
	User_rank       string
	User_pic        string
	User_timestamp  string
	Taskstack       []Task
}

type Project struct {
	Project_id          int
	Project_number      int
	Project_title       string
	Project_description string
	Project_status      string
	Project_timestamp   string
	Userstack           []User
	Taskstack           []Task
}
