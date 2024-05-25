package handlers

import (
	"database/sql"
	"leet/models"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetImage(c *gin.Context) {
	category := c.Param("category")
	id := c.Param("id")

	imageID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid image ID"})
		return
	}

	var query string
	switch category {
	case "music":
		query = "SELECT Music_img_path FROM Music WHERE id = $1"
	case "user":
		query = "SELECT User_img_path FROM User_img_path WHERE id = $1"
	case "performer":
		query = "SELECT Performer_img_path FROM Performer_img_path WHERE id = $1"
	default:
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category"})
		return
	}

	var imagePath string
	err = models.DB.QueryRow(query, imageID).Scan(&imagePath)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Image not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve image path from database"})
		}
		return
	}

	file, err := os.Open(imagePath)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Image not found"})
		return
	}
	defer file.Close()

	c.File(imagePath)
}
