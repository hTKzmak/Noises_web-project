package handlers

import (
	"leet/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Stream(c *gin.Context) {
	var result string
	err := models.DB.QueryRow("SELECT Music_path FROM Music WHERE id = $1", c.Param("id")).Scan(&result)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	models.DB.Exec("UPDATE Music SET Popularity = Popularity + 1 WHERE id = $1", c.Param("id"))

	c.File(result)

	// Для получения данных в виде json
	// c.JSON(http.StatusOK, gin.H{"music_path": result})
}
