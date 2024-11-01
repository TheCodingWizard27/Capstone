package routes

import (
    "fmt"
    "net/http"
)

// HomeHandler handles the "/" route
func HomeHandler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    fmt.Fprintln(w, "Welcome to the Go server with Gorilla Mux!")
}

// AboutHandler handles the "/about" route
func AboutHandler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    fmt.Fprintln(w, "This is the about page.")
}
