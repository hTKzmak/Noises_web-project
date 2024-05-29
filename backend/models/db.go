package models

import (
	"database/sql"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectDB() (*sql.DB, error) {
	// db, err := sql.Open("postgres", "user=postgres password=1224 dbname=postgres sslmode=disable")

	// новые данные
	db, err := sql.Open("postgres", "user=postgres password=1224 dbname=Noises_database sslmode=disable host=localhost port=5433")
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}

func SetDB(database *sql.DB) {
	DB = database
}
