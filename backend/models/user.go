package models

import (
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
	"errors"
)

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"-"`
}

func CreateUser(username, email, password string) error {
	var exists bool
	err := DB.QueryRow("SELECT EXISTS(SELECT 1 FROM NoisesUser WHERE User_email = $1)", email).Scan(&exists)
	if err != nil {
		return err
	}
	if exists {
		return errors.New("email already in use")
	}

	hashedPassword := hashPassword(password)
	_, err = DB.Exec("INSERT INTO NoisesUser (User_name, User_email, User_password) VALUES ($1, $2, $3)", username, email, hashedPassword)
	return err
}

func GetUser(email, password string) (*User, error) {
	hashedPassword := hashPassword(password)
	user := &User{}
	err := DB.QueryRow("SELECT User_id, User_name, User_email FROM NoisesUser WHERE User_email = $1 AND User_password = $2", email, hashedPassword).Scan(&user.ID, &user.Username, &user.Email)
	if err == sql.ErrNoRows {
		return nil, errors.New("invalid email or password")
	} else if err != nil {
		return nil, err
	}
	return user, nil
}

func GetUserStatus(email string) (int, error) {
	var status int
	err := DB.QueryRow("SELECT Status FROM NoisesUser WHERE User_email = $1", email).Scan(&status)
	if err != nil {
		return 0, err
	}
	return status, nil
}

func GetUserIDByEmail(email string) (int, error) {
	var userID int
	err := DB.QueryRow("SELECT User_id FROM NoisesUser WHERE User_email = $1", email).Scan(&userID)
	if err != nil {
		return 0, err
	}
	return userID, nil
}

func GetUserLoginByEmail(email string) (string, error) {
	var login string
	err := DB.QueryRow("SELECT User_name FROM NoisesUser WHERE User_email = $1", email).Scan(&login)
	if err != nil {
		return "", err
	}
	return login, nil
}

func GetUserByEmail(email string) (User, error) {
	var user User
	err := DB.QueryRow("SELECT User_id, User_login, User_email, User_password FROM NoisesUser WHERE User_email = $1", email).Scan(&user.ID, &user.Username, &user.Email, &user.Password)
	if err != nil {
		return user, err
	}
	return user, nil
}
func hashPassword(password string) string {
	hash := sha256.New()
	hash.Write([]byte(password))
	return hex.EncodeToString(hash.Sum(nil))
}
