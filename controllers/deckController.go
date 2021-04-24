package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/JackWinterburn/stacken/models"
	"github.com/gorilla/mux"
)

func GetDecks(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	var section models.Section
	var decks []models.Deck

	database.First(&section, params["id"])
	database.Model(&section).Related(&decks)

	section.Decks = decks

	json.NewEncoder(w).Encode(&section.Decks)
}

func GetDeck(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	var deck models.Deck
	var cards []models.Card
	database.First(&deck, params["id"]).Related(&cards)

	deck.Cards = cards

	json.NewEncoder(w).Encode(deck)
}

func CreateDeck(w http.ResponseWriter, r *http.Request) {
	deck := &models.Deck{}
	json.NewDecoder(r.Body).Decode(deck)

	createdDeck := database.Create(deck)
	if createdDeck.Error != nil {
		fmt.Println(createdDeck.Error)
	}

	json.NewEncoder(w).Encode(createdDeck)
}

func DeleteDeck(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	var deck models.Deck

	database.First(&deck, params["id"])
	database.Delete(&deck)
}
