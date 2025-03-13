import { useLocation } from "react-router-dom";
import { useEffect } from "react";



export default function ToObject() {
  const location = useLocation();


  
  useEffect(() => {

    // fetch object
    const fetchObject = async () => {
      try {
        const objId = new URLSearchParams(location.search).get('id');
        if (!objId) { return; }

        const res = await fetch(`http://localhost:3002/objects/fetch-objects?id=${objId}`);
        if (!res.ok) { throw new Error(res.statusText); }

        const json = await res.json();
        
        window.location.href = `${window.location.origin}/${json.hardwareOnMap}?id=${objId}`;
      }
      catch (error) {
        console.error("Error handling fetchObject response");
        console.error(error);
      }
    }


    fetchObject();
  }, []);
}