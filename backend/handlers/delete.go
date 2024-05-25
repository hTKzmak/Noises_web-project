package handlers

import (
	"leet/models"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func DeleteHandler(c *gin.Context) {
	id := c.Query("id")
	userID := c.MustGet("userID").(int)
	userStatus := c.MustGet("userStatus").(int)

	var trackPath, imagePath string
	var trackUserID int
	err := models.DB.QueryRow("SELECT Music_path, Music_img_path, User_id FROM Music WHERE id = $1", id).Scan(&trackPath, &imagePath, &trackUserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при получении пути к треку и картинке из базы данных"})
		return
	}

	// Check if user has permission to delete the track
	if userStatus < 2 && userID != trackUserID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Недостаточно прав для удаления этого трека"})
		return
	}

	// Delete the track and image files
	os.Remove(trackPath)
	os.Remove(imagePath)

	_, err = models.DB.Exec("DELETE FROM Music WHERE id = $1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при удалении записи из базы данных"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Трек и его картинка успешно удалены"})
}
