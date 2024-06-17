package models

import (
	"fmt"
	"os"
	// "time"
)

func SaveDataToDB(musicName, releaseDate, filePath1, filePath2 string, userID int) error {
	_, err := DB.Exec("INSERT INTO Music (Music_name, Release_Date, Music_path, Music_img_path, User_id) VALUES ($1, $2, $3, $4, $5)", musicName, releaseDate, filePath1, filePath2, userID)
	return err
}

func GetPendingTracks() ([]Music, error) {
	rows, err := DB.Query("SELECT id, Music_name, Music_path, Music_img_path, Release_Date, Popularity, Music_Access, User_id FROM Music WHERE Music_Access = false")
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

func ApproveTrack(id int) error {
	query := "UPDATE Music SET Music_Access = true WHERE id = $1"
	_, err := DB.Exec(query, id)
	return err
}

func DeleteTrack(id, userID, userStatus int) (Music, error) {
	var track Music
	err := DB.QueryRow("SELECT id, Music_name, Music_path, Music_img_path, Release_Date, Popularity, Music_Access, User_id FROM Music WHERE id = $1", id).Scan(&track.ID, &track.Name, &track.Path, &track.ImagePath, &track.ReleaseDate, &track.Popularity, &track.MusicAccess, &track.UserID)
	if err != nil {
		return track, fmt.Errorf("failed to get track: %v", err)
	}

	// Check if user has permission to delete the track
	if userStatus < 2 && userID != track.UserID {
		return track, fmt.Errorf("недостаточно прав для удаления этого трека")
	}

	// Получаем email пользователя на основе user_id
	var userEmail string
	err = DB.QueryRow("SELECT User_email FROM NoisesUser WHERE User_id = $1", track.UserID).Scan(&userEmail)
	if err != nil {
		return track, fmt.Errorf("failed to get user email: %v", err)
	}

	// Delete related entries in PlaylistMusic
	_, err = DB.Exec("DELETE FROM PlaylistMusic WHERE Music_id = $1", id)
	if err != nil {
		return track, fmt.Errorf("failed to delete related playlist music entries: %v", err)
	}

	// Delete the track and image files
	if err := os.Remove(track.Path); err != nil {
		return track, fmt.Errorf("failed to delete track file: %v", err)
	}
	if err := os.Remove(track.ImagePath); err != nil {
		return track, fmt.Errorf("failed to delete image file: %v", err)
	}

	query := "DELETE FROM Music WHERE id = $1"
	_, err = DB.Exec(query, id)
	if err != nil {
		return track, fmt.Errorf("failed to delete track from database: %v", err)
	}
	// для работы send Email нужен пароль для приложений но в настройках нет возможности создать пароль для приложений, у людей в гайдах есть такая кнопка, а у меня нет!
	// if err := sendEmail(userEmail, "Your track has been removed", fmt.Sprintf("Your track '%s' has been removed from our platform.", track.Name)); err != nil {
	// 	return track, fmt.Errorf("failed to send email: %v", err)
	// }
	return track, nil
}

// func sendEmail(to, subject, body string) error {
// 	from := "noises484@gmail.com"
// 	password := "Noises2024"
// 	smtpHost := "smtp.gmail.com"
// 	smtpPort := "587"

// 	auth := smtp.PlainAuth("", from, password, smtpHost)
// 	msg := []byte("To: " + to + "\r\n" +
// 		"Subject: " + subject + "\r\n" +
// 		"\r\n" +
// 		body + "\r\n")
// 	addr := smtpHost + ":" + smtpPort
// 	return smtp.SendMail(addr, auth, from, []string{to}, msg)
// }
