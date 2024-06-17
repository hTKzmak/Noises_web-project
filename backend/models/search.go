package models

import (
	"time"
)

// "database/sql"

type Music struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Path        string    `json:"path"`
	ImagePath   string    `json:"image_path"`
	ReleaseDate time.Time `json:"release_date"`
	Popularity  int       `json:"popularity"`
	MusicAccess bool      `json:"music_access"`
	UserID      int       `json:"user_id"`
}

type Performer struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	ImagePath string `json:"image_path"`
	Country   string `json:"country"`
	Status    int    `json:"status"`
}

type Playlist struct {
	ID          int       `json:"playlist_id"`
	Name        string    `json:"playlist_name"`
	Description string    `json:"playlist_description"`
	ImagePath   string    `json:"image_path"`
	CreatedAt   time.Time `json:"created_at"`
	UserID      int       `json:"user_id"`
}

func Search(query string) (map[string]interface{}, error) {
	results := make(map[string]interface{})

	// Search Music
	musicList, err := searchMusic(query)
	if err != nil {
		return nil, err
	}
	results["music"] = musicList

	// Search Performers
	performers, err := searchPerformers(query)
	if err != nil {
		return nil, err
	}
	results["performer"] = performers

	// Search Playlists
	playlists, err := searchPlaylists(query)
	if err != nil {
		return nil, err
	}
	results["playlist"] = playlists

	// Search Albums
	albums, err := searchAlbums(query)
	if err != nil {
		return nil, err
	}
	results["album"] = albums

	return results, nil
}

func searchMusic(query string) ([]Music, error) {
	rows, err := DB.Query("SELECT id, Music_name, Music_path, Music_img_path, Release_Date, Popularity, Music_Access FROM Music WHERE Music_name ILIKE $1", "%"+query+"%")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var musicList []Music
	for rows.Next() {
		var m Music
		if err := rows.Scan(&m.ID, &m.Name, &m.Path, &m.ImagePath, &m.ReleaseDate, &m.Popularity, &m.MusicAccess); err != nil {
			return nil, err
		}
		musicList = append(musicList, m)
	}
	return musicList, nil
}

func searchPerformers(query string) ([]Performer, error) {
	rows, err := DB.Query("SELECT User_id, User_name, User_email, User_img_path, Country, Status FROM NoisesUser WHERE User_name ILIKE $1", "%"+query+"%")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var performers []Performer
	for rows.Next() {
		var p Performer
		if err := rows.Scan(&p.ID, &p.Name, &p.Email, &p.ImagePath, &p.Country, &p.Status); err != nil {
			return nil, err
		}
		performers = append(performers, p)
	}
	return performers, nil
}

func searchPlaylists(query string) ([]Playlist, error) {
	rows, err := DB.Query("SELECT Playlist_id, Playlist_name, Playlist_description, Image_path, Created_at, User_id FROM Playlists WHERE Playlist_name ILIKE $1", "%"+query+"%")
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

func searchAlbums(query string) ([]Album, error) {
	rows, err := DB.Query("SELECT Album_id, Album_name, Album_description, Image_path, Created_at, User_id FROM Albums WHERE Album_name ILIKE $1", "%"+query+"%")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var albums []Album
	for rows.Next() {
		var a Album
		if err := rows.Scan(&a.ID, &a.Name, &a.Description, &a.ImagePath, &a.CreatedAt, &a.UserID); err != nil {
			return nil, err
		}
		albums = append(albums, a)
	}
	return albums, nil
}
