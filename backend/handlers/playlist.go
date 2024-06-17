package handlers

import (
	"fmt"
	"leet/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreatePlaylistHandler(c *gin.Context) {
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

func GetPlaylistsByUserHandler(c *gin.Context) {
	// Получение userID из контекста
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user ID from token"})
		return
	}

	playlists, err := models.GetPlaylistsByUserID(userID.(int))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get playlists"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"playlists": playlists})
}

func GetPlaylistByIDHandler(c *gin.Context) {
	playlistIDParam := c.Param("id")
	playlistID, err := strconv.Atoi(playlistIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid playlist ID"})
		return
	}

	playlist, err := models.GetPlaylistByID(playlistID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get playlist"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"playlist": playlist})
}

func GetTracksByPlaylistIDHandler(c *gin.Context) {
	playlistIDParam := c.Param("id")
	playlistID, err := strconv.Atoi(playlistIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid playlist ID"})
		return
	}

	tracks, err := models.GetTracksByPlaylistID(playlistID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get tracks: %v", err)})
		return
	}

	c.JSON(http.StatusOK, gin.H{"tracks": tracks})
}

func RemoveMusicFromPlaylistHandler(c *gin.Context) {
	var req struct {
		PlaylistID int `json:"playlist_id"`
		MusicID    int `json:"music_id"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	err := models.RemoveMusicFromPlaylist(req.PlaylistID, req.MusicID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove music from playlist"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Music removed from playlist successfully"})
}

func DeletePlaylistHandler(c *gin.Context) {
	playlistIDParam := c.Param("id")
	playlistID, err := strconv.Atoi(playlistIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid playlist ID"})
		return
	}

	err = models.DeletePlaylist(playlistID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete playlist"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Playlist deleted successfully"})
}

func GetPlaylistsForStatusTwoUsersHandler(c *gin.Context) {
	playlists, err := models.GetPlaylistsForStatusTwoUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get playlists"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"playlists": playlists})
}
