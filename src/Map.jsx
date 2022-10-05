import { useState, useEffect, useContext } from "react";
import { useUserData } from "./userContext";
import axios from "axios";

function MapPage() {
        const [states, setStates] = useState([]);
        const [refreshAxios, setRefreshAxios] = useState(false);
        const [userData] = useUserData();
        const config = {
                headers: {
                  Authorization: `Bearer ${userData}`,
                },
        };
        console.log(userData)

        function getMap(){
                const request = axios.get(
                  `http://localhost:5000/map`,
                  config
                );
               // setLoading(true);
                request
                  .then((response) => {
                    setStates(response.data);
                  //  setLoading(false);
                  })
                  .catch((err) => {
/*                     setConnectError(err);
                    setLoading(false); */
                    console.error(err);
                  })
              }
            
              useEffect(() => {
                getMap();
              }, [refreshAxios]);
    return (
            <>
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 613 639"
                        aria-label="Map of Brazil"
                >

                        {states.map( (estado)=> (<>	
                                                <path
                                                        id={estado.id}
                                                        name={estado.name}
                                                        d={estado.path}
                                                        className="estados"
                                                        onClick={() => setLocation([...location, estado.id])}
                                                />
                                                </>))}
                </svg>
            </>
    )
  }
  
  export default MapPage
  