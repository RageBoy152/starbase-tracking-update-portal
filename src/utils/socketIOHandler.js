import { io } from 'socket.io-client';
export const socket = io('http://localhost:3000');



socket.on('auth_error', (data) => {
  console.log(data);
});



export function fetchObjectsData() {
  socket.emit('objectsFetchReq');
}



export function fetchObjectDataFromId(id) {
  socket.emit('objectFetchFromIdReq', id);
}



export function socketAddNewObject(newObject) {
  socket.emit('addNewObject', newObject);
}



export function socketDeleteInspectedObject(deleteObjectId) {
  socket.emit('deleteObject', deleteObjectId);
}



export function socketUpdateObject(updatedObject, moving = false, updateSingle = false, save = true) {
  socket.emit('updateObject', updatedObject, moving, updateSingle, save);
}