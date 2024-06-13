package handlers

import (
	"net/http"
	"strconv"
	"strings"

	"leet/models"
	"leet/utils"

	"github.com/gin-gonic/gin"
)

func GetUserTracksTrue(c *gin.Context) {
	userID := c.Param("user_id")

	query := `SELECT id, Music_name, Music_path, Music_img_path, Release_Date, Popularity, Music_Access, User_id FROM Music WHERE User_id = $1 AND Music_Access = true`
	rows, err := models.DB.Query(query, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var tracks []models.Music
	for rows.Next() {
		var track models.Music
		err := rows.Scan(&track.ID, &track.Name, &track.Path, &track.ImagePath, &track.ReleaseDate, &track.Popularity, &track.MusicAccess, &track.UserID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		tracks = append(tracks, track)
	}

	c.JSON(http.StatusOK, gin.H{"tracks": tracks})
}

func GetPrivateUserTracksFalse(c *gin.Context) {
	userIDStr := c.Param("user_id")
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}

	tokenString := c.GetHeader("Authorization")

	// Удаляем префикс 'Bearer ' из строки токена, если он есть
	tokenString = strings.TrimPrefix(tokenString, "Bearer ")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
		return
	}

	// Проверка и парсинг JWT токена
	claims, err := utils.ValidateJWT(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	// Получение authUserID из claims
	authUserID, err := models.GetUserIDByEmail(claims.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User not found"})
		return
	}

	// Проверка прав доступа
	if authUserID != userID {
		var userStatus int
		err = models.DB.QueryRow("SELECT User_status FROM NoisesUser WHERE User_id = $1", authUserID).Scan(&userStatus)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user status"})
			return
		}
		if userStatus != 2 {
			c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
			return
		}
	}

	// SQL запрос для получения всех треков пользователя, где MusicAccess = false
	query := `SELECT id, Music_name, Music_path, Music_img_path, Release_Date, Popularity, Music_Access, User_id FROM Music WHERE User_id = $1 AND Music_Access = false`
	rows, err := models.DB.Query(query, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var tracks []models.Music
	for rows.Next() {
		var track models.Music
		err := rows.Scan(&track.ID, &track.Name, &track.Path, &track.ImagePath, &track.ReleaseDate, &track.Popularity, &track.MusicAccess, &track.UserID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		tracks = append(tracks, track)
	}

	c.JSON(http.StatusOK, gin.H{"tracks": tracks})
}

func GetRandomUserTrack(c *gin.Context) {
	userID := c.Param("user_id")

	// SQL запрос для получения случайного трека пользователя
	query := `SELECT id, Music_name, Music_path, Music_img_path, Release_Date, Popularity, Music_Access, User_id FROM Music WHERE User_id = $1 ORDER BY RANDOM() LIMIT 1`
	row := models.DB.QueryRow(query, userID)

	var track models.Music
	err := row.Scan(&track.ID, &track.Name, &track.Path, &track.ImagePath, &track.ReleaseDate, &track.Popularity, &track.MusicAccess, &track.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"track": track})
}
