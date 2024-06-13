package handlers

import (
	"leet/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreatePlaylistHandler(c *gin.Context) {
	// Получение данных плейлиста
	name := c.PostForm("name")
	description := c.PostForm("description")

	if name == "" || description == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Name and description are required"})
		return
	}

	// Работа с файлом изображения
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Image file is required"})
		return
	}

	// Открытие файла
	openedFile, err := file.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open image file"})
		return
	}
	defer openedFile.Close()

	// Сохранение изображения
	imagePath, err := models.SaveUploadedFile(openedFile, "uploads/images", file.Filename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
		return
	}

	// Получение userID из контекста
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user ID from token"})
		return
	}

	// Создание плейлиста
	playlistID, err := models.CreatePlaylist(name, description, imagePath, userID.(int))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create playlist"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Playlist created successfully", "playlist_id": playlistID})
}
func AddMusicToPlaylistHandlers(c *gin.Context) {
	var req struct {
		PlaylistID int `json:"playlist_id"`
		MusicID    int `json:"music_id"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	err := models.AddMusicToPlaylist(req.PlaylistID, req.MusicID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add music to playlist"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Music added to playlist successfully"})
}
