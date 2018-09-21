package controllers

import (
	"github.com/revel/revel"
	"io/ioutil"
	"testapp/app/providers"
)

// Как я понял из примера revel/booking от разработчиков ревела, необязательно инициализировать модель в структуре контроллера
// Более того, не у всех моделей есть методы. Модели вызываются как экземляр или массив экземпляров в
// Controller.Init ===>>> var bookings []*models.Booking.
// controller наследуется от app, то есть в своей структуре содержит апп
//			type Application struct {
//				gorpController.Controller
//			}
// Наставники сказали. что модель не содержит в себе полей сущности. На примере наоборот.

type UserController struct {
	*revel.Controller
}

// Что это такое???
func (c *UserController) Apply(req *revel.Request, resp *revel.Response) {
	panic("implement me")
}

func (c UserController) Init() revel.Result {
	providers.NewUserModel()
	//return &UserController{}
	return nil
}

func (c *UserController) Index() revel.Result {
	return c.Render()
}

func (c *UserController) GetPicture() revel.Result {
	file, err := ioutil.ReadFile("C:/Users/dev/go/src/testapp/app/providers/picture.json")
	if err != nil {
		panic(err)
	}
	return c.RenderText(string(file))
}
