package dbmanager

import (
	"database/sql"
	"fmt"
	"github.com/revel/revel"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "password"
	dbname   = "test"
)

func InitConnection() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	var err error
	var db *sql.DB
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		revel.INFO.Print("DB Error", err)
	}
	err = db.Ping()
	if err != nil {
		fmt.Print()
	}

	fmt.Println("Successfully connected!")
	return db
}
