package providers

type File struct {
	Type  string
	Value string
}
type Folder struct {
	Type  string
	Value string
	Data  []File
}

type Task struct {
	Task_id          string
	Task_number      string
	Task_title       string
	Task_description string
	Task_hours       int
	Task_deadline    string
	Task_timestamp   string
	Task_status      string
	Task_doer        User
	Project_title    string
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
	Project_id          string
	Project_number      string
	Project_title       string
	Project_description string
	Project_deadline    string
	Project_status      string
	Project_timestamp   string
	Userstack           []User
	Taskstack           []Task
}
