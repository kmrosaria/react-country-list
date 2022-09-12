import React, { useState } from "react";

export default function Modal({ setModal, selected }) {
	return (
	  	<>
			<div className={"modal-overlay"} onClick={() => setModal(false)} />
			<div className={"modal"}>
				<div className={"modal-header"}>
					<h5>{selected.name.common}</h5>
				</div>

				<div className={"modal-content"}>
					<div className={"country-details"}>
						<div className={"row"}>
							<div className={"column"}>
								Official Name:
							</div>
							<div className={"column"}>
								{selected.name.official}
							</div>
						</div>
						<div className={"row"}>
							<div className={"column"}>
								Capital:
							</div>
							<div className={"column"}>
								{selected.capital[0]}
							</div>
						</div>
						<div className={"row"}>
							<div className={"column"}>
								Continent:
							</div>
							<div className={"column"}>
								{selected.continents[0]}
							</div>
						</div>
						<div className={"row"}>
							<div className={"column"}>
								Languages:
							</div>
							<div className={"column"}>
								{Object.values(selected.languages).length > 0 ?
									Object.values(selected.languages).join(', ') : ''
								}
							</div>
						</div>
						<div className={"row"}>
							<div className={"column"}>
								Currencies:
							</div>
							<div className={"column"}>
								{Object.values(selected.currencies).length > 0 ?
									Object.values(selected.currencies).map((currency, id) => {
										return (
											<div key={`currency-${id}`}>
												{currency.name} ({currency.symbol})
											</div>
											)
									}) : ''
								}
							</div>
						</div>
					</div>
				</div>

				<div className={"modal-actions"}>
					<div className={"actions-container"}>
						<button className={"close"} onClick={() => setModal(false)}>
							Close
						</button>
					</div>
				</div>
			</div>
	    </>
    );
}