import { useLocation } from "react-router-dom";
import { useEffect } from "react";


import { socket, fetchObjectDataFromId } from "../utils/socketIOHandler";


export default function ToObject() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');


  useEffect(() => {
    fetchObjectDataFromId(id);

    const handleRes = (data) => {
      if (!data[0]) { return; }

      window.location.href = `${window.location.origin}/${data[0].hardwareOnMap}?id=${id}`;
    }

    socket.on('objectsFetchRes', handleRes);

    return () => { socket.off('objectsFetchRes', handleRes) }
  }, [id]);
}