import React, { useRef } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "./NewPost.css";
import { Input } from "../../components/Input/Input";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const NewPost = () => {
	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const authorRef = useRef(null);
	const imagesRef = useRef(null);

	const navigate = useNavigate();

	const { token } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("title", titleRef.current.value);
		formData.append("content", contentRef.current.value);
		formData.append("author", authorRef.current.value);

		// Accessing the files from the input field and appending them to the formData
		const imageFiles = imagesRef.current.files;
		for (let i = 0; i < imageFiles.length; i++) {
			formData.append("images", imageFiles[i]);
		}

		fetch("https://troubled-sheath-dress-bass.cyclic.app/posts/create", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					return Promise.reject({
						status: res.status,
						statusText: res.statusText,
					});
				}
			})
			.then((data) => {
				console.log(data);
				navigate("/posts/");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Navbar />
			<div className="new-post-container">
				<h1>Vamos iniciar a criação do seu novo post</h1>
				<form
					onSubmit={handleSubmit}
					className="new-post-content"
					encType="multipart/form-data"
				>
					<h2>Qual título você deseja colocar no post?</h2>
					<Input type="text" name="title" ref={titleRef} />

					<h2>Legal! e agora qual o conteúdo do post?</h2>
					<textarea
						name="content"
						className="textarea-input"
						ref={contentRef}
					></textarea>

					<h2>Últimas etapas! qual o nome do autor?</h2>
					<Input type="text" name="author" ref={authorRef} />

					<h2>Temos imagens para este post?</h2>
					<div className="send-image-field">
						<Input
							type="file"
							name="images"
							labelName="Enviar Imagens"
							id="images"
							ref={imagesRef}
							multiple
						/>
					</div>

					<button className="btn btn-register">Criar Post</button>
				</form>
			</div>
		</>
	);
};
