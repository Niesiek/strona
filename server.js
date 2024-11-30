const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();
const PORT = 3300;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'login',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
        return;
    }
    console.log('Połączono z bazą danych MySQL');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Błąd serwera' });
        }
        if (results.length > 0) {
            res.json({ success: true, message: 'Logowanie udane!' });
        } else {
            res.json({ success: false, message: 'Nieprawidłowy login lub hasło' });
        }
    });
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    const checkUserSql = 'SELECT * FROM users WHERE username = ?';
    db.query(checkUserSql, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Błąd serwera podczas sprawdzania użytkownika' });
        }
        if (results.length > 0) {
            return res.json({ success: false, message: 'Nazwa użytkownika jest już zajęta' });
        }

        const insertUserSql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(insertUserSql, [username, password], (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Błąd serwera podczas tworzenia konta' });
            }
            res.json({ success: true, message: 'Konto zostało utworzone pomyślnie!' });
        });
    });
});

app.get('/assets', (req, res) => {
    const sql = 'SELECT * FROM assets';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Błąd serwera podczas pobierania assetów' });
        }
        res.json(results);
    });
});


app.get('/assets/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM assets WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Błąd serwera podczas pobierania assetu' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Asset nie znaleziony' });
        }
        res.json(result[0]);
    });
});


app.put('/assets/:id', (req, res) => {
    const { id } = req.params;
    const { producent, name, description } = req.body;  // Sprawdź, czy `producent` jest poprawnie odczytywany

    const sql = 'UPDATE assets SET producent = ?, name = ?, description = ? WHERE id = ?';
    db.query(sql, [producent, name, description, id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Błąd podczas edycji assetu' });
        }
        res.json({ success: true, message: 'Asset został zaktualizowany.' });
    });
});

app.post('/assets', (req, res) => {
    const { producent, name, description } = req.body;

    const sql = 'INSERT INTO assets (producent, name, description) VALUES (?, ?, ?)';
    db.query(sql, [producent, name, description], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Błąd podczas dodawania assetu.' });
        }
        res.json({ success: true, message: 'Asset został dodany.' });
    });
});
app.get('/assets', (req, res) => {
    const search = req.query.search || ''; 
    const sql = `
        SELECT * FROM assets
        WHERE id LIKE ? OR name LIKE ? OR description LIKE ?
    `;
    const searchQuery = `%${search}%`; 
    db.query(sql, [searchQuery, searchQuery, searchQuery], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Błąd podczas wyszukiwania assetów.' });
        }
        res.json(results); 
    });
});
app.delete('/assets/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM assets WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Błąd podczas usuwania assetu' });
        }
        res.json({ success: true, message: 'Asset został usunięty.' });
    });
});

app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});

