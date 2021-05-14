package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/JackWinterburn/stacken/models"
	"github.com/gorilla/mux"
)

func GetCards(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	var deck models.Deck
	var cards []models.Card

	database.First(&deck, params["id"])
	database.Model(&deck).Related(&cards)

	deck.Cards = cards

	json.NewEncoder(w).Encode(&deck.Cards)
}

func GetCard(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	var card models.Card
	database.First(&card, params["id"])

	json.NewEncoder(w).Encode(card)
}

func CreateCard(w http.ResponseWriter, r *http.Request) {
	card := &models.Card{}
	json.NewDecoder(r.Body).Decode(card)

	createdCard := database.Create(card)
	if createdCard.Error != nil {
		fmt.Println(createdCard.Error)
	}

	json.NewEncoder(w).Encode(createdCard)
}

func UpdateCard(w http.ResponseWriter, r *http.Request) {
	var card models.Card
	var updatedCard models.Card

	err := json.NewDecoder(r.Body).Decode(&updatedCard)
	if err != nil {
		fmt.Print(err)
	}

	database.First(&card, updatedCard.ID)
	card.Front = updatedCard.Front
	card.Back = updatedCard.Back
	database.Save(&card)
}

func DeleteCard(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	var card models.Card

	database.First(&card, params["id"])
	database.Delete(&card)
}
