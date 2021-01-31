package models

import "github.com/jinzhu/gorm"

type Card struct {
	gorm.Model

	Question string
	Answer   string
	DeckID   int
}
