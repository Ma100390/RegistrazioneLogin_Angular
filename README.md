# Back-end
// Importa i moduli necessari
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Crea un'istanza di Express
const app = express();

// Configura il body parser per analizzare le richieste POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configura la connessione al database MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'registrazionelogin',  // Assicurati che il nome del database sia corretto
});

// Connessione al database MySQL
db.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connesso al database MySQL');
});

// Rotta per la registrazione degli utenti
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Cripta la password prima di salvarla nel database
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Errore durante la crittografia della password:', err);
      res.status(500).json({ error: 'Errore interno del server' });
      return;
    }

    // Query per inserire l'utente nel database
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hash], (err, result) => {
      if (err) {
        console.error('Errore durante la registrazione dell\'utente:', err);
        res.status(500).json({ error: 'Errore interno del server' });
        return;
      }
      console.log('Utente registrato con successo');
      res.status(201).json({ message: 'Utente registrato con successo' });
    });
  });
});

// Rotta per l'accesso degli utenti
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query per recuperare l'utente dal database basato sull'email
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Errore durante il recupero dell\'utente:', err);
      res.status(500).json({ error: 'Errore interno del server' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Credenziali non valide' });
      return;
    }

    const user = results[0];

    // Verifica la password
    bcrypt.compare(password, user.password, (err, isValid) => {
      if (err) {
        console.error('Errore durante la verifica della password:', err);
        res.status(500).json({ error: 'Errore interno del server' });
        return;
      }

      if (!isValid) {
        res.status(401).json({ error: 'Credenziali non valide' });
        return;
      }

      // Genera un token JWT per l'utente
      const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });
      res.status(200).json({ token });
    });
  });
});

// Avvia il server Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});









# NomeProgetto

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
