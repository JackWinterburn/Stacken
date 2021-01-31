package models

import "github.com/jinzhu/gorm"

type Section struct {
	gorm.Model

	Title  string
	UserID int
	Decks  []Deck
}
