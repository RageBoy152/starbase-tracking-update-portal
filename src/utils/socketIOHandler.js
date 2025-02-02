import { io } from 'socket.io-client';
export const socket = io('http://localhost:3000');



export function fetchObjectsData() {
  socket.emit('objectsFetchReq');
}



export function socketAddNewObject(newObject) {
  socket.emit('addNewObject', newObject);
}



export function socketDeleteInspectedObject(deleteObjectId) {
  socket.emit('deleteObject', deleteObjectId);
}



export function socketUpdateInspectedObject(updatedObject) {
  socket.emit('updateObject', updatedObject);
}