import { ipcMain } from "electron";

export default function setUpHandlers(db) {
    ipcMain.handle('tasks:add', (_, title) => {
        db.addTask(title);
    })
    ipcMain.handle('tasks:delete', (_, id) => {
        db.deleteTask(id);
    })
    ipcMain.handle('tasks:markComplete', (_, params) => {
        db.markCompleted(params);
    })
    ipcMain.handle('tasks:getAll', () => {
        return db.getAllTasks();
    });
}