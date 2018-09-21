package providers

type UserModel struct {
	name string
}

func NewUserModel() *UserModel {
	return &UserModel{
		//скобки {} означают пустой новый экземпляр, &ссылка на него
		//возвращаем новый экземпляр модели (опционально: с инициализированными полями)
	}

}

func (u *UserModel) getUser() string {
	return ""
}
