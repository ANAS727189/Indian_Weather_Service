package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

type apiConfigData struct {
	OpenWeatherMapApiKey string `json:"openWeatherMapApiKey"`
}

type weatherData struct {
	Name string `json:"name"`
	Main struct {
		Temp float64 `json:"temp"`
	} `json:"main"`
}

func loadApiConfig(filename string) (apiConfigData, error) {
	bytes, err := ioutil.ReadFile(filename)
	if err != nil {
		return apiConfigData{}, err
	}
	var c apiConfigData
	err = json.Unmarshal(bytes, &c)
	if err != nil {
		return apiConfigData{}, err
	}
	return c, nil
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello, World using go!"))
}

func query(city string) (weatherData, error) {
	apiConfig, err := loadApiConfig(".apiConfig")
	if err != nil {
		return weatherData{}, err
	}
	resp, err := http.Get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiConfig.OpenWeatherMapApiKey + "&units=metric")
	if err != nil {
		return weatherData{}, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return weatherData{}, fmt.Errorf("failed to get weather data: %s", resp.Status)
	}
	var data weatherData
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		return weatherData{}, err
	}
	return data, nil
}

func weatherHandler(w http.ResponseWriter, r *http.Request) {
	city := strings.SplitN(r.URL.Path, "/", 3)[2]
	data, err := query(city)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	json.NewEncoder(w).Encode(data)
}

func main() {
	http.HandleFunc("/hello", helloHandler)
	http.HandleFunc("/weather/", weatherHandler)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
