package models

import (
	// "fmt"
	"time"
)

type Album struct {
	ID          int       `json:"album_id"`
	Name        string    `json:"album_name"`
	Description string    `json:"album_description"`
	ImagePath   string    `json:"image_path"`
	CreatedAt   time.Time `json:"created_at"`
	UserID      int       `json:"user_id"`
	Tracks      []Music   `json:"tracks,omitempty"`
}

// Создание нового альбома с изображением
func CreateAlbum(name, description, imagePath string, userID int) (int, error) {
	query := `INSERT INTO Albums (Album_name, Album_description, Image_path, User_id) VALUES ($1, $2, $3, $4) RETURNING Album_id`
	var albumID int
	err := DB.QueryRow(query, name, description, imagePath, userID).Scan(&albumID)
	if err != nil {
		return 0, err
	}
	return albumID, nil
}

// Добавление трека в альбом
func AddMusicToAlbum(albumID, musicID int) error {
	query := `INSERT INTO AlbumTracks (Album_id, Music_id) VALUES ($1, $2)`
	_, err := DB.Exec(query, albumID, musicID)
	return err
}

// Получение треков из альбома по его ID
func GetTracksByAlbumID(albumID int) ([]Music, error) {
	query := `
		SELECT m.id, m.Music_name, m.Music_path, m.Music_img_path, m.Release_Date, m.Popularity, m.Music_Access, m.User_id 
		FROM Music m 
		JOIN AlbumTracks at ON m.id = at.music_id 
		WHERE at.album_id = $1`
	rows, err := DB.Query(query, albumID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tracks []Music
	for rows.Next() {
		var m Music
		if err := rows.Scan(&m.ID, &m.Name, &m.Path, &m.ImagePath, &m.ReleaseDate, &m.Popularity, &m.MusicAccess, &m.UserID); err != nil {
			return nil, err
		}
		tracks = append(tracks, m)
	}
	return tracks, nil
}

// Получение всех альбомов пользователя
func GetAlbumsByUserID(userID int) ([]Album, error) {
	query := `SELECT Album_id, Album_name, Album_description, Image_path, Created_at FROM Albums WHERE User_id = $1`
	rows, err := DB.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var albums []Album
	for rows.Next() {
		var a Album
		if err := rows.Scan(&a.ID, &a.Name, &a.Description, &a.ImagePath, &a.CreatedAt); err != nil {
			return nil, err
		}
		albums = append(albums, a)
	}
	return albums, nil
}

// Получение альбома по ID
func GetAlbumByID(albumID int) (Album, error) {
	query := `SELECT Album_id, Album_name, Album_description, Image_path, Created_at, User_id FROM Albums WHERE Album_id = $1`
	var a Album
	err := DB.QueryRow(query, albumID).Scan(&a.ID, &a.Name, &a.Description, &a.ImagePath, &a.CreatedAt, &a.UserID)
	if err != nil {
		return a, err
	}
	return a, nil
}

// Удаление трека из альбома
func RemoveMusicFromAlbum(albumID, musicID int) error {
	query := `DELETE FROM AlbumTracks WHERE album_id = $1 AND music_id = $2`
	_, err := DB.Exec(query, albumID, musicID)
	return err
}

// Удаление альбома и связанных треков
func DeleteAlbum(albumID int) error {
	tx, err := DB.Begin()
	if err != nil {
		return err
	}

	// Удаление всех треков из альбома
	_, err = tx.Exec(`DELETE FROM AlbumTracks WHERE album_id = $1`, albumID)
	if err != nil {
		tx.Rollback()
		return err
	}

	// Удаление самого альбома
	_, err = tx.Exec(`DELETE FROM Albums WHERE Album_id = $1`, albumID)
	if err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit()
}
