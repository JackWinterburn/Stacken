package models

import "github.com/jinzhu/gorm"

type Section struct {
	gorm.Model

	Title  string
	UserID int
	Color  string
	Decks  []Deck
}
