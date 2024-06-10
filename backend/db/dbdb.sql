CREATE TABLE Music (
    id SERIAL PRIMARY KEY,
    Music_name VARCHAR(255) NOT NULL,
    Music_path VARCHAR(255) ,
	Music_img_path VARCHAR(255) DEFAULT 'Тут меняй путь до дефолтной картинки',
    Release_Date DATE DEFAULT CURRENT_DATE,
    Popularity INT DEFAULT 0,
	-- Music_Access bool DEFAUlT False,
	Music_Access bool DEFAUlT True,
	User_id INT ,
    FOREIGN KEY (User_id) REFERENCES NoisesUser(User_id)
);

select * from Music

DROP TABLE Music

CREATE TABLE NoisesUser (
	User_id SERIAL PRIMARY KEY,
	User_name VARCHAR(45) NOT NULL,
	User_email VARCHAR(320) NOT NULL UNIQUE,
	User_password VARCHAR(255) NOT NULL,
	User_img_path VARCHAR(255) DEFAULT 'Тут меняй путь до дефолтной картинки',
	Country VARCHAR(30) DEFAULT 'Не указана',
	Status int DEFAULT 1
);
-- обычный user - 0 исполнитель - 1 админ - 2
-- UPDATE NoisesUser SET Status = 2 WHERE User_email = 'admin@perf.com'; 
DELETE FROM Music where id = 23

UPDATE NoisesUser SET Status = 2 WHERE User_email = 'example@example.com'; 

select * from NoisesUser

DROP TABLE NoisesUser

CREATE TABLE Playlists (
    Playlist_id SERIAL PRIMARY KEY,
    Playlist_name VARCHAR(255) NOT NULL,
    Playlist_description TEXT,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    User_id INT NOT NULL,
    FOREIGN KEY (User_id) REFERENCES NoisesUser(User_id)
);

select * from Playlists

DROP TABLE Playlists


CREATE TABLE PlaylistMusic (
    Playlist_id INT NOT NULL,
    Music_id INT NOT NULL,
    PRIMARY KEY (Playlist_id, Music_id),
    FOREIGN KEY (Playlist_id) REFERENCES Playlists(Playlist_id),
    FOREIGN KEY (Music_id) REFERENCES Music(id)
);
select * from PlaylistMusic

DROP TABLE PlaylistMusic


CREATE TABLE Favorites (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES NoisesUser(User_id),
    music_id INT REFERENCES Music(id),
    UNIQUE(user_id, music_id)
);
select * from Favorites

DROP TABLE Favorites