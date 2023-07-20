import React from "react";

export const AccessDenied = () => {
	return (
		<div className="access-denied-container">
			<h1>Acesso Negado!</h1>
			<p>
				Você não tem as permissões necessárias para acessar esta página
			</p>
		</div>
	);
};
