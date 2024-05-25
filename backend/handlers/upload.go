package handlers

import (
	"fmt"
	"leet/models"
	"leet/utils"
	"net/http"
	"path/filepath"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func Upload(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		c.String(http.StatusBadRequest, fmt.Sprintf("Ошибка при получении файлов: %s", err.Error()))
		return
	}

	claims, exists := c.Get("claims")
	if !exists {
		c.String(http.StatusUnauthorized, "Не удалось получить данные пользователя")
		return
	}

	userClaims, ok := claims.(*utils.Claims)
	if !ok {
		c.String(http.StatusUnauthorized, "Не удалось получить данные пользователя")
		return
	}

	userID, err := models.GetUserIDByEmail(userClaims.Email)
	if err != nil {
		c.String(http.StatusInternalServerError, fmt.Sprintf("Ошибка при получении ID пользователя: %s", err.Error()))
		return
	}

	destination1 := "D:/Ptoger/golang/Noises2/Music"
	destination2 := "D:/Ptoger/golang/Noises2/Image"

	musicName := c.PostForm("musicName")
	releaseDate := c.PostForm("releaseDate")

	files := form.File["files"]
	if len(files) != 2 {
		c.String(http.StatusBadRequest, "Неверное количество файлов. Ожидалось 2 файла.")
		return
	}

	var musicPath, imagePath string
	for _, file := range files {
		var destination string
		if strings.HasSuffix(file.Filename, ".mp3") || strings.HasSuffix(file.Filename, ".wav") {
			destination = destination1
			musicPath = filepath.Join(destination1, file.Filename)
		} else if strings.HasSuffix(file.Filename, ".jpg") || strings.HasSuffix(file.Filename, ".png") || strings.HasSuffix(file.Filename, ".gif") {
			destination = destination2
			imagePath = filepath.Join(destination2, file.Filename)
		} else {
			c.String(http.StatusBadRequest, fmt.Sprintf("Недопустимый формат файла: %s", file.Filename))
			return
		}

		err := utils.SaveFile(file, destination)
		if err != nil {
			c.String(http.StatusInternalServerError, fmt.Sprintf("Ошибка при сохранении файла: %s", err.Error()))
			return
		}
	}

	if releaseDate == "" {
		releaseDate = time.Now().Format("2006-01-02")
	}

	err = models.SaveDataToDB(musicName, releaseDate, musicPath, imagePath, userID)
	if err != nil {
		c.String(http.StatusInternalServerError, fmt.Sprintf("Ошибка при сохранении данных в базу данных: %s", err.Error()))
		return
	}

	c.String(http.StatusOK, "Файлы и данные успешно загружены")
}
