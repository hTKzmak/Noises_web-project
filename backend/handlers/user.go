package handlers

import (
	"net/http"
	"strings"

	"leet/models"
	"leet/utils"

	"github.com/gin-gonic/gin"
)

func GetUserLogin(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")
	tokenString = strings.TrimPrefix(tokenString, "Bearer ")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
		return
	}

	claims, err := utils.ValidateJWT(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	login, err := models.GetUserLoginByEmail(claims.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user login"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"login": login})
}
func GetUserInfo(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token not provided"})
		return
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	if tokenString == authHeader {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token must be Bearer <token>"})
		return
	}

	claims, err := utils.ValidateJWT(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	user, err := models.GetUserByEmail2(claims.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user info"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func GetRandomTrack(c *gin.Context) {
	track, err := models.GetRandomTrack()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get random track"})
		return
	}
	c.JSON(http.StatusOK, track)
}

// Получение всех треков
func GetAllTracks(c *gin.Context) {
	tracks, err := models.GetAllTracks()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get all tracks"})
		return
	}
	c.JSON(http.StatusOK, tracks)
}

// Получение случайного исполнителя
func GetRandomPerformer(c *gin.Context) {
	performer, err := models.GetRandomPerformer()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get random performer"})
		return
	}
	c.JSON(http.StatusOK, performer)
}
