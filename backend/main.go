package main

import (
	"leet/handlers"
	"leet/middleware"
	"leet/models"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db, err := models.ConnectDB()
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
	defer db.Close()
	models.SetDB(db)

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.OPTIONS("/*path", func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
		c.AbortWithStatus(204)
	})

	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)

	r.GET("/search", handlers.Search) // Маршрут для поиска

	protected := r.Group("/")
	protected.Use(middleware.AuthMiddleware(0))
	protected.POST("/create_playlist", handlers.CreatePlaylist)
	protected.POST("/add_music_to_playlist", handlers.AddMusicToPlaylist)
	protected.GET("/playlists", handlers.GetPlaylistsByUser)

	moderationGroup := r.Group("/")
	moderationGroup.Use(middleware.AuthMiddleware(2)) // Только модераторы могут выполнять модерацию
	moderationGroup.GET("/moderation/pending_tracks", handlers.GetPendingTracks)
	moderationGroup.PUT("/moderation/approve/:id", handlers.ApproveTrack)
	moderationGroup.DELETE("/moderation/delete/:id", handlers.DeleteTrack)

	favoritesGroup := protected.Group("/favorites")
	favoritesGroup.POST("/:music_id", handlers.AddToFavorite)
	favoritesGroup.DELETE("/:music_id", handlers.RemoveFromFavorite)
	favoritesGroup.GET("/", handlers.GetFavorites)

	deleteGroup := r.Group("/")
	deleteGroup.Use(middleware.AuthMiddleware(1))
	deleteGroup.DELETE("/delete", handlers.DeleteHandler)
	deleteGroup.DELETE("/playlist/:playlistID/music/:musicID", handlers.DeleteMusicFromPlaylist)

	uploadGroup := r.Group("/")
	uploadGroup.Use(middleware.AuthMiddleware(1))
	uploadGroup.POST("/upload", handlers.Upload)

	r.GET("/stream/:id", handlers.Stream)
	r.GET("/image/:category/:id", handlers.GetImage)

	r.Run(":8080")
}
