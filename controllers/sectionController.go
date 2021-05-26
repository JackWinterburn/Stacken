package controllers

import (
	"encoding/json"
	"fmt"
	"sort"
	"net/http"

	"github.com/JackWinterburn/stacken/models"
	"github.com/gorilla/mux"
)

func GetSections(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	var user models.User
	var sections []models.Section

	database.First(&user, params["id"])
	database.Model(&user).Related(&sections)


	user.Sections = sections

	json.NewEncoder(w).Encode(&user.Sections)
}

func GetSection(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	var section models.Section
	var decks []models.Deck

	database.First(&section, params["id"]).Related(&decks)

	// sorting decks by date created
	sort.Slice(decks, func(i, j int) bool {return decks[i].CreatedAt.Before(decks[j].CreatedAt)})
	section.Decks = decks

	json.NewEncoder(w).Encode(section)
}

func CreateSection(w http.ResponseWriter, r *http.Request) {
	section := &models.Section{}
	json.NewDecoder(r.Body).Decode(section)

	createdSection := database.Create(section)
	if createdSection.Error != nil {
		fmt.Println(createdSection.Error)
	}

	json.NewEncoder(w).Encode(createdSection)
}

func UpdateSection(w http.ResponseWriter, r *http.Request) {
	var section models.Section
	var updatedSection models.Section

	err := json.NewDecoder(r.Body).Decode(&updatedSection)
	if err != nil {
		fmt.Print(err)
	}

	database.First(&section, updatedSection.ID)
	section.Title = updatedSection.Title
	section.Color = updatedSection.Color
	database.Save(&section)
}

func DeleteSection(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	var section models.Section

	database.First(&section, params["id"])
	database.Delete(&section)
}
