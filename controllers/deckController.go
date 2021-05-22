package controllers

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/JackWinterburn/stacken/models"
	"github.com/gorilla/mux"
)

// shuffleDeck is used to shuffle the cards in a deck when requested by the frontend
func shuffleDeck(workDeck []models.Card) []models.Card {

	shuffled := make([]models.Card, len(workDeck))

	rand.Seed(time.Now().UTC().UnixNano())
	perm := rand.Perm(len(workDeck))

	for i, v := range perm {
		shuffled[v] = workDeck[i]
	}

	return shuffled
}

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

	deck.Cards = shuffleDeck(cards)

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

func UpdateDeck(w http.ResponseWriter, r *http.Request) {
	var deck models.Deck
	var updatedDeck models.Deck

	err := json.NewDecoder(r.Body).Decode(&updatedDeck)
	if err != nil {
		fmt.Print(err)
	}

	database.First(&deck, updatedDeck.ID)
	deck.Title = updatedDeck.Title
	database.Save(&deck)
}

func DeleteDeck(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	var deck models.Deck

	database.First(&deck, params["id"])
	database.Delete(&deck)
}
