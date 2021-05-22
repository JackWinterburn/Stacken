package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/JackWinterburn/stacken/db"
	"github.com/JackWinterburn/stacken/models"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

type ErrorResponse struct {
	Error string
}

type error interface {
	Error() string
}

var database = db.Connect()

func Login(w http.ResponseWriter, r *http.Request) {
	user := &models.User{}

	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil {
		resp := map[string]interface{}{"status": false, "message": "invalid request"}
		json.NewEncoder(w).Encode(resp)
	}

	resp := FindOne(user.Email, user.Password)
	json.NewEncoder(w).Encode(resp)
}

/*---------------------------------------------------------------------------------------
 * FindOne function: used to try and find the account that the user is trying to login to
 * and returns a JWT back to the user if successfull
 *-------------------------------------------------------------------------------------*/
func FindOne(email, password string) map[string]interface{} {
	user := &models.User{}

	// Check to see if the email provided exists in the database
	err := database.Where("Email = ?", email).First(user).Error
	if err != nil {
		resp := map[string]interface{}{"status": false, "message": "Email address not found"}
		return resp
	}

	expiresAt := time.Now().Add(time.Minute * 100000).Unix()

	// Check to see if the password matches the one stored in the databse
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		resp := map[string]interface{}{"satus": false, "message": "Incorrect Password"}
		return resp
	}

	// Create a JWT that the user can use to authenticate without loggin in all the time
	tk := &models.Token{
		UserID: user.ID,
		Name:   user.Name,
		Email:  user.Email,
		StandardClaims: &jwt.StandardClaims{
			ExpiresAt: expiresAt,
		},
	}

	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)

	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		fmt.Println(err)
	}

	// Return the token and a successfull login message
	resp := map[string]interface{}{"status": true, "message": "Successfully logged in"}
	resp["token"] = tokenString
	resp["user"] = user

	return resp
}

/*------------------- API Getters and Setters -------------------------*/

func CreateUser(w http.ResponseWriter, r *http.Request) {
	user := &models.User{}
	json.NewDecoder(r.Body).Decode(user)

	password, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println(err)
		err := ErrorResponse{Error: "Password Encryption  failed"}
		json.NewEncoder(w).Encode(err)
		return
	}

	user.Password = string(password)

	createdUser := database.Create(user)
	err = createdUser.Error
	if err != nil {
		fmt.Println(err)
		json.NewEncoder(w).Encode(err)
		return
	}

	json.NewEncoder(w).Encode(createdUser)
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []models.User
	database.Find(&users)

	json.NewEncoder(w).Encode(users)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	var user models.User
	var sections []models.Section

	database.First(&user, params["id"])
	database.Model(&user).Related(&sections)

	user.Sections = sections

	json.NewEncoder(w).Encode(&user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	var updatedUser models.User

	err := json.NewDecoder(r.Body).Decode(&updatedUser)
	if err != nil {
		fmt.Print(err)
	}

	database.First(&user, updatedUser.ID)
	user.Name = updatedUser.Name
	user.Email = updatedUser.Email
	user.ProfilePictureURL = updatedUser.ProfilePictureURL
	database.Save(&user)
}
