import React, { useState, useEffect } from "react";
import axios from 'axios';

import useLongPress from './hook/useLongPress';
import Modal from './Modal';

function List() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [countries, setCountries] = useState([]);
	const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState(false);

	const [startLongPress, setStartLongPress] = useState(false);

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
        .then((response) => {
            setIsLoaded(true);
            setCountries(response.data);
	    }).catch((err) => {
	    	if (err.response) {
	            setIsLoaded(true);
	            setError(err.response.data.message);
	    	}
	    });

    }, []);

	useEffect(() => {
		let timerId;
		console.log(startLongPress);
		if (startLongPress) {
		  timerId = setTimeout((() => {
		  	console.log('show');
		  	setModal(true);
		  	setStartLongPress(false);
		  }), 1000);
		} else {
		  clearTimeout(timerId);
		}

		return () => {
		  clearTimeout(timerId);
		};
	}, [startLongPress, selected]);

	const handlePress = (val) => {
		setStartLongPress(!startLongPress);
		setSelected(val);
	}
  
    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
        	<>
	            <div className="container">
	            {
	            	countries.length > 0 ? 
	            	countries.map((country, id) => (
	            		<div 
	            			key={`country-${id}`}
						    onMouseDown={() => handlePress(country)}
						    onMouseUp={() => handlePress(country)}
					    >
	            			<span className={"country"}>{country.name.common}</span><span className={"continent"}>{country.continents[0]} </span> 
	            		</div>
	            		)
	            	) : (<></>)
	            }
	            </div>

		      	{modal && selected && <Modal setModal={setModal} selected={selected} />}
	      	</>
        );
        }
    }

export default List;