# e-Pharmed API (v3)

REST API behind **e-Pharmed**, a French-language drug reference app. It serves drug brands, generic names (DCI, *dénomination commune internationale*), medical terms and pharmacies (*officines*) to the [e-Pharmed client](https://github.com/ndawkunda/e-pharmed-v3-client).

## Tech stack

- Node.js with Express
- MongoDB with Mongoose
- dotenv for configuration, CORS enabled

## API

All routes live under `/api/v1`. Each resource supports full CRUD.

| Resource | List / create | Read / update / delete |
| --- | --- | --- |
| Generic names (DCI) | `GET` / `POST` `/api/v1/dcis` | `GET` / `PUT` / `DELETE` `/api/v1/dcis/:id` |
| Brands | `GET` / `POST` `/api/v1/brands` | `GET` / `PUT` / `DELETE` `/api/v1/brands/:id` |
| Medical terms | `GET` / `POST` `/api/v1/medical_terms` | `GET` / `PUT` / `DELETE` `/api/v1/medical_terms/:id` |
| Pharmacies | `GET` / `POST` `/api/v1/officines` | `GET` / `PUT` / `DELETE` `/api/v1/officines/:id` |

A brand record holds the clinical information found in a drug monograph: generic name, indications, dosage, side effects, contraindications, precautions, interactions, overdose, and pregnancy and breastfeeding guidance.

## Project structure

```
config/       MongoDB connection
controllers/  Request handlers for each resource
models/       Mongoose schemas (brand, dci, medicalTerm, officine)
routes/       Express routers mounted under /api/v1
index.js      App entry point
```

## Running locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your own values:
   ```
   NODE_ENV=development
   PORT=5000
   CONNECTION_URI=<your MongoDB connection string>
   ```
3. Start the server (runs with nodemon):
   ```bash
   npm start
   ```

The API listens on `http://localhost:5000` by default.
