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
	tokenString := c.GetHeader("Authorization")

	// Удаляем префикс 'Bearer ' из строки токена, если он есть
	tokenString = strings.TrimPrefix(tokenString, "Bearer ")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
		return
	}

	// Проверка и парсинг JWT токена
	claims, err := utils.ValidateJWT(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	// Получение информации о пользователе по email
	user, err := models.GetUserByEmail(claims.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user info"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": user})
}
