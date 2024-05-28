package models

// import (
// 	"time"
// )

// type Playlist struct {
// 	ID          int       `json:"id"`
// 	Name        string    `json:"name"`
// 	Description string    `json:"description"`
// 	CreatedAt   time.Time `json:"created_at"`
// 	UserID      int       `json:"user_id"`
// 	MusicList   []Music   `json:"musiclist"`
// }

type PlaylistMusic struct {
	PlaylistID int `json:"playlist_id"`
	MusicID    int `json:"music_id"`
}

// type Music struct {
// 	ID          int       `json:"id"`
// 	Name        string    `json:"name"`
// 	Path        string    `json:"path"`
// 	ImagePath   string    `json:"image_path"`
// 	ReleaseDate time.Time `json:"release_date"`
// 	Popularity  int       `json:"popularity"`
// 	MusicAccess bool      `json:"music_access"`
// }

func CreatePlaylist(name, description string, userID int) (int, error) {
	var playlistID int
	err := DB.QueryRow("INSERT INTO Playlists (Playlist_name, Playlist_description, User_id) VALUES ($1, $2, $3) RETURNING Playlist_id",
		name, description, userID).Scan(&playlistID)
	if err != nil {
		return 0, err
	}
	return playlistID, nil
}

func AddMusicToPlaylist(playlistID, musicID int) error {
	_, err := DB.Exec("INSERT INTO PlaylistMusic (Playlist_id, Music_id) VALUES ($1, $2)", playlistID, musicID)
	return err
}

func GetPlaylistsByUser(userID int) ([]Playlist, error) {
	rows, err := DB.Query("SELECT Playlist_id, Playlist_name, Playlist_description, Created_at FROM Playlists WHERE User_id = $1", userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var playlists []Playlist
	for rows.Next() {
		var p Playlist
		if err := rows.Scan(&p.ID, &p.Name, &p.Description, &p.CreatedAt); err != nil {
			return nil, err
		}
		p.MusicList, err = GetMusicByPlaylistID(p.ID)
		if err != nil {
			return nil, err
		}
		playlists = append(playlists, p)
	}
	return playlists, nil
}

func GetMusicByPlaylistID(playlistID int) ([]Music, error) {
	rows, err := DB.Query(`
		SELECT m.id, m.Music_name, m.Music_path, m.Music_img_path, m.Release_Date, m.Popularity, m.Music_Access
		FROM Music m
		INNER JOIN PlaylistMusic pm ON m.id = pm.Music_id
		WHERE pm.Playlist_id = $1`, playlistID)
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

func DeleteMusicFromPlaylist(playlistID int, musicID int) error {
	query := "DELETE FROM PlaylistMusic WHERE Playlist_id = $1 AND Music_id = $2"
	_, err := DB.Exec(query, playlistID, musicID)
	return err
}
