package models

import "github.com/jinzhu/gorm"

type Deck struct {
	gorm.Model

	Title     string
	SectionID int
	Cards     []Card
}
