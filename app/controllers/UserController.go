package controllers

import (
	"github.com/revel/revel"
	"io/ioutil"
)

// Как я понял из примера revel/booking от разработчиков ревела, необязательно инициализировать модель в структуре контроллера
// Более того, не у всех моделей есть методы. Модели вызываются как экземляр или массив экземпляров в
// Controller.Init ===>>> var bookings []*models.Booking.
// controller наследуется от app, то есть в своей структуре содержит апп
//			type Controller struct {
//				App
//			}
// Наставники сказали. что модель не содержит в себе полей сущности. На примере наоборот.
// Как итог, скорее всего в методах контроллера надо инициализировать модели (по ссылке)
// и уже к ним применять их методы

type UserController struct {
	*revel.Controller
}

// Что это такое???
func (c *UserController) Apply(req *revel.Request, resp *revel.Response) {
	panic("implement me")
}

func (c UserController) Init() *UserController {
	//var m *providers.UserModel
	//providers.NewUserModel()
	return &c
}

func (c *UserController) Index() revel.Result {
	return c.Render()
}

func (c *UserController) GetPicture() revel.Result {
	path := revel.AppPath
	file, err := ioutil.ReadFile(path + "/providers/picture.json")
	if err != nil {
		panic(err)
	}
	return c.RenderText(string(file))
}
