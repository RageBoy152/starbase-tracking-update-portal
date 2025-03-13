import { io } from 'socket.io-client';
export const socket = io('http://localhost:3000');



export function fetchChopstickData(chopstickId) {
  socket.emit('chopstickFetchReq', chopstickId);
}



export function updateChopstickData(chopstickData, saveToDB) {
  socket.emit('updateChopstickData', chopstickData, saveToDB);
}



export function socketAddNewObject(newObject) {
  socket.emit('addNewObject', newObject);
}



export function socketDeleteObject(id) {
  socket.emit('deleteObject', id);
}



export function socketUpdateObject(updatedObject, options) {
  socket.emit('updateObject', updatedObject, options);
}