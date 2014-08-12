package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type BenchmarkJSON []struct {
	Id         string   `json:"_id"`
	Index      int      `json:"index"`
	Guid       string   `json:"guid"`
	IsActive   bool     `json:"isActive"`
	Balance    string   `json:"balance"`
	Picture    string   `json:"picture"`
	Age        int      `json:"age"`
	EyeColor   string   `json:"eyeColor"`
	Name       string   `json:"name"`
	Gender     string   `json:"gender"`
	Company    string   `json:"company"`
	Email      string   `json:"email"`
	Phone      string   `json:"phone"`
	Address    string   `json:"address"`
	About      string   `json:"about"`
	Registered string   `json:"registered"`
	Latitude   float32  `json:"latitude"`
	Longitude  float32  `json:"longitude"`
	Tags       []string `json:"tags"`
	Friends    []struct {
		Id   int    `json:"id"`
		Name string `json:"name"`
	} `json:"friends"`
	Greeting      string `json:"greeting"`
	FavoriteFruit string `json:"favoriteFruit"`
}

var content []byte
var jsonFile BenchmarkJSON

func main() {
	content, err := ioutil.ReadFile("../small.json")
	if err != nil {
	} else {
		json.Unmarshal(content, &jsonFile)
	}
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	body, err := json.Marshal(jsonFile[0])
	if err != nil {
		fmt.Println("There is an issue")
	}
	w.Write(body)
}
