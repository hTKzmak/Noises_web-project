package models

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"

	"github.com/google/uuid"
)


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


func createDirIfNotExists(path string) error {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return os.MkdirAll(path, os.ModePerm)
	}
	return nil
}

func SaveUploadedFile(file multipart.File, uploadDir, fileName string) (string, error) {

	uuidFileName := fmt.Sprintf("%s%s", uuid.New().String(), filepath.Ext(fileName))
	fullPath := filepath.Join(uploadDir, uuidFileName)


	if err := createDirIfNotExists(uploadDir); err != nil {
		return "", err
	}

	newFile, err := os.Create(fullPath)
	if err != nil {
		return "", err
	}
	defer newFile.Close()

	if _, err := io.Copy(newFile, file); err != nil {
		return "", err
	}

	return fullPath, nil
}

func GetPlaylistsByUserID(userID int) ([]Playlist, error) {
	query := `SELECT Playlist_id, Playlist_name, Playlist_description, Image_path, Created_at FROM Playlists WHERE User_id = $1`
	rows, err := DB.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var playlists []Playlist
	for rows.Next() {
		var p Playlist
		if err := rows.Scan(&p.ID, &p.Name, &p.Description, &p.ImagePath, &p.CreatedAt); err != nil {
			return nil, err
		}
		playlists = append(playlists, p)
	}
	return playlists, nil
}

func GetPlaylistByID(playlistID int) (Playlist, error) {
	query := `SELECT Playlist_id, Playlist_name, Playlist_description, Image_path, Created_at, User_id FROM Playlists WHERE Playlist_id = $1`
	var p Playlist
	err := DB.QueryRow(query, playlistID).Scan(&p.ID, &p.Name, &p.Description, &p.ImagePath, &p.CreatedAt, &p.UserID)
	if err != nil {
		return p, err
	}
	return p, nil
}

func GetTracksByPlaylistID(playlistID int) ([]Music, error) {
	query := `
		SELECT m.id, m.Music_name, m.Music_path, m.Music_img_path, m.Release_Date, m.Popularity, m.Music_Access, m.User_id 
		FROM Music m 
		JOIN PlaylistTracks pt ON m.id = pt.music_id 
		WHERE pt.playlist_id = $1`
	rows, err := DB.Query(query, playlistID)
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

func RemoveMusicFromPlaylist(playlistID, musicID int) error {
	query := `DELETE FROM PlaylistTracks WHERE playlist_id = $1 AND music_id = $2`
	_, err := DB.Exec(query, playlistID, musicID)
	return err
}

func DeletePlaylist(playlistID int) error {
	tx, err := DB.Begin()
	if err != nil {
		return err
	}

	_, err = tx.Exec(`DELETE FROM PlaylistTracks WHERE playlist_id = $1`, playlistID)
	if err != nil {
		tx.Rollback()
		return err
	}
	_, err = tx.Exec(`DELETE FROM Playlists WHERE Playlist_id = $1`, playlistID)
	if err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit()
}


func GetPlaylistsForStatusTwoUsers() ([]Playlist, error) {
	query := `
		SELECT p.Playlist_id, p.Playlist_name, p.Playlist_description, p.Image_path, p.Created_at, p.User_id
		FROM Playlists p
		JOIN NoisesUser u ON p.User_id = u.User_id
		WHERE u.Status = 2`
	rows, err := DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var playlists []Playlist
	for rows.Next() {
		var p Playlist
		if err := rows.Scan(&p.ID, &p.Name, &p.Description, &p.ImagePath, &p.CreatedAt, &p.UserID); err != nil {
			return nil, err
		}
		playlists = append(playlists, p)
	}
	return playlists, nil
}