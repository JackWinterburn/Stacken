package main

import (
	"fmt"
	"log"

	"github.com/JackWinterburn/stacken/routes"
	"github.com/joho/godotenv"
)

func main() {
	e := godotenv.Load()

	if e != nil {
		log.Fatal("Error loading .env file")
	}
	fmt.Println(e)

	// Handle routes
	routes.Handlers()

}
