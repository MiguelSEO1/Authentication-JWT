import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Demo = () => {
	const { store } = useContext(Context);

	return (
		<div className="container-fluid text-center mt-5 border bg-warning text-danger fs-1">
			PÁGINA POST REGISTRO. Hola nuevo usuario {store.currentUserEmail}
		</div>
	);
};
