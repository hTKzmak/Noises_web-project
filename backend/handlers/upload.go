package handlers

import (
	// "fmt"
	"fmt"
	"leet/models"
	"leet/utils"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	// "strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func UploadTrack(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing authorization token"})
		return
	}

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

	// Получение данных из формы
	name := c.PostForm("name")
	releaseDateStr := c.PostForm("release_date")
	releaseDate, err := time.Parse("2006-01-02", releaseDateStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid release date format"})
		return
	}

	musicFile, err := c.FormFile("music")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Music file is required"})
		return
	}
	// Указываем пути для сохранения файлов
	// В пути нужно заменить \ на / если ругается
	musicUploadPath := "D:/Ptoger/golang/noisesV0.1/backend/Music"
	imageUploadPath := "D:/Ptoger/golang/noisesV0.1/backend/Image"

	// Папки сами создадутся
	// Создаем папки, если они не существуют
	if err := createDirIfNotExists(musicUploadPath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create music directory"})
		return
	}
	if err := createDirIfNotExists(imageUploadPath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create image directory"})
		return
	}

	// Генерируем уникальное имя для музыкального файла
	musicFileName := fmt.Sprintf("%s_%s", uuid.New().String(), filepath.Base(musicFile.Filename))
	musicPath := filepath.Join(musicUploadPath, musicFileName)
	if err := c.SaveUploadedFile(musicFile, musicPath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Сохранение изображения, если оно предоставлено
	imagePath := ""
	imageFile, err := c.FormFile("image")
	if err == nil {
		imageFileName := fmt.Sprintf("%s_%s", uuid.New().String(), filepath.Base(imageFile.Filename))
		imagePath = filepath.Join(imageUploadPath, imageFileName)
		if err := c.SaveUploadedFile(imageFile, imagePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	// Получение userID из claims
	userID, err := models.GetUserIDByEmail(claims.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User not found"})
		return
	}

	music := models.Music{
		Name:        name,
		Path:        musicPath,
		ImagePath:   imagePath,
		ReleaseDate: releaseDate,
		Popularity:  0,
		MusicAccess: true, // по умолчанию музыка доступна, поменяв на false трек уйдет на модерацию
		UserID:      userID,
	}

	query := `INSERT INTO Music (Music_name, Music_path, Music_img_path, Release_Date, Popularity, Music_Access, User_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`
	_, err = models.DB.Exec(query, music.Name, music.Path, music.ImagePath, music.ReleaseDate, music.Popularity, music.MusicAccess, music.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Track uploaded successfully", "track": music})
}

func createDirIfNotExists(path string) error {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		err = os.MkdirAll(path, os.ModePerm)
		if err != nil {
			return err
		}
	}
	return nil
}
