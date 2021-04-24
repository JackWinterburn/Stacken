package models

import "github.com/jinzhu/gorm"

type Card struct {
	gorm.Model

	Front  string
	Back   string
	DeckID int
}
