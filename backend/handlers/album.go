package handlers

import (
	"fmt"
	"leet/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreateAlbumHandler(c *gin.Context) {
	name := c.PostForm("name")
	description := c.PostForm("description")

	if name == "" || description == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Name and description are required"})
		return
	}

	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Image file is required"})
		return
	}

	openedFile, err := file.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open image file"})
		return
	}
	defer openedFile.Close()

	// imagePath, err := models.SaveUploadedFile(openedFile, "D:/Ptoger/golang/noisesV0.1/backend/Image", file.Filename)
	// imagePath, err := models.SaveUploadedFile(openedFile, "C:/Users/Slava/Desktop/noisesV0.1/backend/Image", file.Filename)
	imagePath, err := models.SaveUploadedFile(openedFile, "C:/Users/Slava/Desktop/Noises_web-project/backend/Image", file.Filename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
		return
	}

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user ID from token"})
		return
	}

	albumID, err := models.CreateAlbum(name, description, imagePath, userID.(int))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create album"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Album created successfully", "album_id": albumID})
}

func AddMusicToAlbumHandler(c *gin.Context) {
	var req struct {
		AlbumID int `json:"album_id"`
		MusicID int `json:"music_id"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	err := models.AddMusicToAlbum(req.AlbumID, req.MusicID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add music to album"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Music added to album successfully"})
}

func GetAlbumsByUserHandler(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user ID from token"})
		return
	}

	albums, err := models.GetAlbumsByUserID(userID.(int))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get albums"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"albums": albums})
}

func GetAlbumByIDHandler(c *gin.Context) {
	albumIDParam := c.Param("id")
	albumID, err := strconv.Atoi(albumIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid album ID"})
		return
	}

	album, err := models.GetAlbumByID(albumID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get album"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"album": album})
}

func GetTracksByAlbumIDHandler(c *gin.Context) {
	albumIDParam := c.Param("id")
	albumID, err := strconv.Atoi(albumIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid album ID"})
		return
	}

	tracks, err := models.GetTracksByAlbumID(albumID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get tracks: %v", err)})
		return
	}

	c.JSON(http.StatusOK, gin.H{"tracks": tracks})
}

func RemoveMusicFromAlbumHandler(c *gin.Context) {
	var req struct {
		AlbumID int `json:"album_id"`
		MusicID int `json:"music_id"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	err := models.RemoveMusicFromAlbum(req.AlbumID, req.MusicID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove music from album"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Music removed from album successfully"})
}

func DeleteAlbumHandler(c *gin.Context) {
	albumIDParam := c.Param("id")
	albumID, err := strconv.Atoi(albumIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid album ID"})
		return
	}

	err = models.DeleteAlbum(albumID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete album"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Album deleted successfully"})
}
