package models

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"

	"github.com/google/uuid"
)

// Создание нового плейлиста с изображением
func CreatePlaylist(name, description, imagePath string, userID int) (int, error) {
	query := `INSERT INTO Playlists (Playlist_name, Playlist_description, Image_path, User_id) VALUES ($1, $2, $3, $4) RETURNING Playlist_id`
	var playlistID int
	err := DB.QueryRow(query, name, description, imagePath, userID).Scan(&playlistID)
	if err != nil {
		return 0, err
	}
	return playlistID, nil
}

func AddMusicToPlaylist(playlistID, musicID int) error {
	query := `INSERT INTO PlaylistTracks (Playlist_id, Music_id) VALUES ($1, $2)`
	_, err := DB.Exec(query, playlistID, musicID)
	return err
}

// Функция для создания директории, если она не существует
func createDirIfNotExists(path string) error {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return os.MkdirAll(path, os.ModePerm)
	}
	return nil
}

// Функция для сохранения загруженного файла
func SaveUploadedFile(file multipart.File, uploadDir, fileName string) (string, error) {
	// Генерация уникального имени файла
	uuidFileName := fmt.Sprintf("%s%s", uuid.New().String(), filepath.Ext(fileName))
	fullPath := filepath.Join(uploadDir, uuidFileName)

	// Создание папки, если необходимо
	if err := createDirIfNotExists(uploadDir); err != nil {
		return "", err
	}

	// Создание нового файла на диске
	newFile, err := os.Create(fullPath)
	if err != nil {
		return "", err
	}
	defer newFile.Close()

	// Копирование содержимого загруженного файла
	if _, err := io.Copy(newFile, file); err != nil {
		return "", err
	}

	return fullPath, nil
}
