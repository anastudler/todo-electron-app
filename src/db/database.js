import { app } from 'electron';
import path from 'node:path';
import Database from 'better-sqlite3';

class AppDatabase {
    constructor() {
        const dbPath = path.join(app.getPath('userData'), 'to-do.sqlite');
        console.log('Database path:', dbPath);
        this.db = new Database(dbPath);
        this.db.pragma('journal_mode = WAL');
        this.setUpDataBase();
    }

    setUpDataBase() {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                completed INTEGER NOT NULL DEFAULT 0
            );
        `);

        const tables = this.db.prepare(`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name='tasks'
    `).all();

        console.log('Tables in database:', tables);
        console.log('db initialized');
    }
}

export default AppDatabase;