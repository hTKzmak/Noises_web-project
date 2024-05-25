package utils

import (
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
)

func SaveFile(file *multipart.FileHeader, destination string) error {
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	dstPath := filepath.Join(destination, file.Filename)
	dst, err := os.Create(dstPath)
	if err != nil {
		return err
	}
	defer dst.Close()

	_, err = io.Copy(dst, src)
	if err != nil {
		return err
	}

	return nil
}
