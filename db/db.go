package db

import (
	"fmt"
	"os"

	"github.com/JackWinterburn/stacken/models"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres" //Gorm postgres dialect interface
)

//Connect function: Make database connection
func Connect() *gorm.DB {

	//Load environmenatal variables
	username := os.Getenv("databaseUser")
	password := os.Getenv("databasePassword")
	databaseName := os.Getenv("databaseName")
	databaseHost := os.Getenv("databaseHost")
	databasePort := os.Getenv("databasePort")

	//Define DB connection string
	dbURI := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s port=%s", databaseHost, username, databaseName, password, databasePort)

	//connect to db URI
	db, err := gorm.Open("postgres", dbURI)

	if err != nil {
		fmt.Println("error", err)
		panic(err)
	}

	// Migrate the schemas
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Section{})
	db.AutoMigrate(&models.Deck{})
	db.AutoMigrate(&models.Card{})

	fmt.Println("Successfully connected!", db)
	return db
}
