package handlers

import (
	"leet/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetPendingTracks(c *gin.Context) {
	tracks, err := models.GetPendingTracks()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get pending tracks"})
		return
	}
	c.JSON(http.StatusOK, tracks)
}

func ApproveTrack(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid track ID"})
		return
	}

	err = models.ApproveTrack(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to approve track"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Track approved successfully"})
}

func DeleteTrack(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid track ID", "details": err.Error()})
		return
	}

	userID := c.MustGet("userID").(int)
	userStatus := c.MustGet("userStatus").(int)

	track, err := models.DeleteTrack(id, userID, userStatus)
	if err != nil {
		if err.Error() == "Недостаточно прав для удаления этого трека" {
			c.JSON(http.StatusForbidden, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete track", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Track deleted successfully", "track": track})
}
