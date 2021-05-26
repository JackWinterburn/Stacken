package models

import "github.com/jinzhu/gorm"

type Deck struct {
	gorm.Model

	Title     string
	SectionID int
	Color     string
	Cards     []Card
}
