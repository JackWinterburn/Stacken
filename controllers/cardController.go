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
	var oldCard models.Card

	newCard := &models.Card{}
	json.NewDecoder(r.Body).Decode(newCard)

	database.First(&oldCard, newCard.ID)

	oldCard.Front = newCard.Front
	oldCard.Back = newCard.Back
	database.Save(&oldCard)
}

func DeleteCard(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	var card models.Card

	database.First(&card, params["id"])
	database.Delete(&card)
}
