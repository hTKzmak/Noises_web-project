package models

import (
	"fmt"
)

type Favorite struct {
	ID      int `json:"id"`
	UserID  int `json:"user_id"`
	MusicID int `json:"music_id"`
}

func AddToFavorite(userID, musicID int) error {
	query := "INSERT INTO Favorites (user_id, music_id) VALUES ($1, $2) ON CONFLICT (user_id, music_id) DO NOTHING"
	_, err := DB.Exec(query, userID, musicID)
	if err != nil {
		return fmt.Errorf("failed to add to favorite: %v", err)
	}
	return nil
}

func RemoveFromFavorite(userID, musicID int) error {
	query := "DELETE FROM Favorites WHERE user_id = $1 AND music_id = $2"
	_, err := DB.Exec(query, userID, musicID)
	if err != nil {
		return fmt.Errorf("failed to remove from favorite: %v", err)
	}
	return nil
}

func GetFavorites(userID int) ([]Music, error) {
	rows, err := DB.Query(`
		SELECT m.id, m.Music_name, m.Music_path, m.Music_img_path, m.Release_Date, m.Popularity, m.Music_Access, m.User_id
		FROM Music m
		INNER JOIN Favorites f ON m.id = f.music_id
		WHERE f.user_id = $1`, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get favorites: %v", err)
	}
	defer rows.Close()

	var musicList []Music
	for rows.Next() {
		var m Music
		if err := rows.Scan(&m.ID, &m.Name, &m.Path, &m.ImagePath, &m.ReleaseDate, &m.Popularity, &m.MusicAccess, &m.UserID); err != nil {
			return nil, fmt.Errorf("failed to scan favorite: %v", err)
		}
		musicList = append(musicList, m)
	}
	return musicList, nil
}
