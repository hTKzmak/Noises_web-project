package middleware

import (
	"leet/models"
	"leet/utils"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(requiredStatus int) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token not provided"})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token must be Bearer <token>"})
			c.Abort()
			return
		}

		claims, err := utils.ValidateJWT(tokenString)
		if err != nil {
			log.Printf("Failed to validate JWT: %v", err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		status, err := models.GetUserStatus(claims.Email)
		if err != nil {
			log.Printf("Failed to get user status: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user status"})
			c.Abort()
			return
		}

		if status < requiredStatus {
			c.JSON(http.StatusForbidden, gin.H{"error": "Insufficient permissions"})
			c.Abort()
			return
		}

		userID, err := models.GetUserIDByEmail(claims.Email)
		if err != nil {
			log.Printf("Failed to get user ID: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user ID"})
			c.Abort()
			return
		}

		c.Set("userID", userID)
		c.Set("userStatus", status)
		c.Set("claims", claims) // Добавляем claims в контекст
		c.Next()
	}
}
