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
	protected.POST("/create_playlist", handlers.CreatePlaylistHandler)
	protected.POST("/add_music_to_playlist", handlers.AddMusicToPlaylistHandlers)
	protected.GET("/playlists", handlers.GetPlaylistsByUserHandler)
	protected.GET("/playlist/:id", handlers.GetPlaylistByIDHandler)
	protected.GET("/playlist/:id/tracks", handlers.GetTracksByPlaylistIDHandler)
	protected.DELETE("/remove_music", handlers.RemoveMusicFromPlaylistHandler)
	protected.DELETE("/playlist/:id", handlers.DeletePlaylistHandler)
	protected.GET("/user-info", handlers.GetUserInfo)

	album := r.Group(("/"))
	album.Use(middleware.AuthMiddleware(1))
	album.POST("/create-album", handlers.CreateAlbumHandler)
	album.POST("/add-music-to-album", handlers.AddMusicToAlbumHandler)
	album.GET("/albums", handlers.GetAlbumsByUserHandler)
	album.GET("/album/:id", handlers.GetAlbumByIDHandler)
	album.GET("/album/:id/tracks", handlers.GetTracksByAlbumIDHandler)
	album.DELETE("/remove-music-from-album", handlers.RemoveMusicFromAlbumHandler)
	album.DELETE("/album/:id", handlers.DeleteAlbumHandler)

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
	// deleteGroup.DELETE("/playlist/:playlistID/music/:musicID", handlers.DeleteMusicFromPlaylist)

	uploadGroup := r.Group("/")
	uploadGroup.Use(middleware.AuthMiddleware(1))
	uploadGroup.POST("/upload", handlers.UploadTrack)

	r.GET("/user-login", handlers.GetUserLogin)
	r.GET("/random-track/:user_id", handlers.GetRandomUserTrack)
	r.GET("/private-tracks/:user_id", handlers.GetPrivateUserTracksFalse)
	r.GET("/tracks/:user_id", handlers.GetUserTracksTrue)
	r.GET("/stream/:id", handlers.Stream)
	r.GET("/image/:category/:id", handlers.GetImage)
	r.GET("/playlists-status-two", handlers.GetPlaylistsForStatusTwoUsersHandler)
	r.GET("/random-track", handlers.GetRandomTrack)
	r.GET("/all-tracks", handlers.GetAllTracks)
	r.GET("/random-performer", handlers.GetRandomPerformer)

	r.Run(":8080")
}
