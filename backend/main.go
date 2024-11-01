package main

import (
    "fmt"
    "net/http"
    "github.com/gorilla/mux"
    "shop-simplify-backend/routes" // Replace with your actual project path
)

func main() {
    r := mux.NewRouter()

    // Route for "/" that accepts both GET and POST methods
    r.HandleFunc("/", routes.HomeHandler).Methods(http.MethodGet, http.MethodPost)

    // Route for "/about" that accepts only GET method
    r.HandleFunc("/about", routes.AboutHandler).Methods(http.MethodGet)

    http.Handle("/", r)
    fmt.Printf("Server listening on port 8080\n")
    http.ListenAndServe(":8080", nil)
    
    
}
