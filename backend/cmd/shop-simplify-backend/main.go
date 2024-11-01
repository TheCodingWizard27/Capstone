package main

import (
    "fmt"
    "log"
    "net/http"
    "github.com/gorilla/mux"
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

func main() {
    // Create a new router
    router := mux.NewRouter()

    // Define routes
    router.HandleFunc("/", HomeHandler).Methods("GET")
    router.HandleFunc("/about", AboutHandler).Methods("GET")

    // Start the server
    fmt.Println("Server is running on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", router))
}
