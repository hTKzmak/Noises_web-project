package handlers

import (
	"leet/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type PlaylistRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

func CreatePlaylist(c *gin.Context) {
	var req PlaylistRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	userID := c.MustGet("userID").(int)
	playlistID, err := models.CreatePlaylist(req.Name, req.Description, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create playlist"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Playlist created successfully", "playlist_id": playlistID})
}

func AddMusicToPlaylist(c *gin.Context) {
	var req struct {
		PlaylistID int `json:"playlist_id"`
		MusicID    int `json:"music_id"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	err := models.AddMusicToPlaylist(req.PlaylistID, req.MusicID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add music to playlist"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Music added to playlist successfully"})
}

func GetPlaylistsByUser(c *gin.Context) {
	userID := c.MustGet("userID").(int)

	playlists, err := models.GetPlaylistsByUser(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get playlists"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"playlists": playlists})
}
func DeleteMusicFromPlaylist(c *gin.Context) {
	// Получаем playlistID и musicID из параметров URL
	playlistIDParam := c.Param("playlistID")
	musicIDParam := c.Param("musicID")

	playlistID, err := strconv.Atoi(playlistIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid playlist ID"})
		return
	}

	musicID, err := strconv.Atoi(musicIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid music ID"})
		return
	}

	// Вызываем функцию удаления музыки из плейлиста по ID
	err = models.DeleteMusicFromPlaylist(playlistID, musicID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete music from playlist"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Music deleted from playlist successfully"})
}
