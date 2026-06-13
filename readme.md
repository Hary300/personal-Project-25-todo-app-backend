routes/
untuk endpoint
const router = require("express").Router()

controllers/
function untuk nyambung ke service

models/
model

types/
type

middlewares/
middleware

services/
function yang nyambung langsung ke db

schemas/
schema mongodb

helpers/

render

app.post("/register", validate, Controller.register)
