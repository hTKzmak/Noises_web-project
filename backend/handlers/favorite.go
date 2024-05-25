package handlers

import (
	"leet/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddToFavorite(c *gin.Context) {
	userID := c.MustGet("userID").(int)
	musicIDParam := c.Param("music_id")
	musicID, err := strconv.Atoi(musicIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid music ID", "details": err.Error()})
		return
	}

	err = models.AddToFavorite(userID, musicID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add to favorite", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Added to favorite successfully"})
}

func RemoveFromFavorite(c *gin.Context) {
	userID := c.MustGet("userID").(int)
	musicIDParam := c.Param("music_id")
	musicID, err := strconv.Atoi(musicIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid music ID", "details": err.Error()})
		return
	}

	err = models.RemoveFromFavorite(userID, musicID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove from favorite", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Removed from favorite successfully"})
}

func GetFavorites(c *gin.Context) {
	userID := c.MustGet("userID").(int)

	favorites, err := models.GetFavorites(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get favorites", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, favorites)
}
