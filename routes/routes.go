package routes

import (
	"net/http"

	"github.com/JackWinterburn/stacken/controllers"
	"github.com/gorilla/mux"
)

func Handlers() *mux.Router {
	r := mux.NewRouter().StrictSlash(true)
	r.Use(CommonMiddleware)

	// User Routes
	r.HandleFunc("/register", controllers.CreateUser).Methods("POST")
	r.HandleFunc("/login", controllers.Login).Methods("POST")
	r.HandleFunc("/users", controllers.GetUsers).Methods("GET")
	r.HandleFunc("/user/{id}", controllers.GetUser).Methods("GET")

	// Section Routes
	r.HandleFunc("/create/section", controllers.CreateSection).Methods("POST")
	r.HandleFunc("/get/sections/{id}", controllers.GetSections).Methods("GET")
	r.HandleFunc("/get/section/{id}", controllers.GetSection).Methods("GET")
	r.HandleFunc("/delete/section/{id}", controllers.DeleteSection).Methods("DELETE")

	// Deck Routes
	r.HandleFunc("/create/deck", controllers.CreateDeck).Methods("POST")
	r.HandleFunc("/get/decks/{id}", controllers.GetDecks).Methods("GET")
	r.HandleFunc("/get/deck/{id}", controllers.GetDeck).Methods("GET")
	r.HandleFunc("/delete/deck/{id}", controllers.DeleteDeck).Methods("DELETE")

	// Card Routes
	r.HandleFunc("/create/card", controllers.CreateCard).Methods("POST")
	r.HandleFunc("/get/cards/{id}", controllers.GetCards).Methods("GET")
	r.HandleFunc("/get/card/{id}", controllers.GetCard).Methods("GET")
	r.HandleFunc("/delete/card/{id}", controllers.DeleteCard).Methods("DELETE")

	return r
}

// CommonMiddleware --Set content-type
func CommonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Access-Control-Request-Headers, Access-Control-Request-Method, Connection, Host, Origin, User-Agent, Referer, Cache-Control, X-header")
		next.ServeHTTP(w, r)
	})
}
