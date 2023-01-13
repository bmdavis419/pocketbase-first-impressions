// main.go
package main

import (
	"log"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	// add a custom route
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/pb-demo/api/hello", func(c echo.Context) error {
			return c.String(200, "Hello world!")
		})
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
