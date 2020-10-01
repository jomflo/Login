var firebaseConfig= {
	// Tus credenciales de firebase
}

//iNITIALIZE fIREBASE
const app = firebase.initializeApp(firebaseConfig)

var db = app.firestore();

//funcion para guardar el registro de un usuario
function guardar(){

	var user = document.getElementById("user");
    var password = document.getElementById("password");
	var tabla = document.getElementById("tablaprueba");
	
    //Guardar los datos ingresados en las cajas de texto en la base de datos
	db.collection("Users")
		.add({
			nombre: user.value,
			contrasenia: password.value
		})
		.then(function(docRef) {
			console.log("Document written with ID: ", docRef.id);
			//limpiams las cajas de texto
			user.value="";
			password.value="";
			alert("Guardado");
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
			alert("No se pudo Guardar");
		});
		//fin de guardar datos
    
}

//funcion para editar los datos de un usuario al presionar el boton editar
function editar(){
	alert("a");
}

function ver(){
	var latabla = document.getElementById("latabla");
	db.collection("Users").get().then((querySnapshot) => {
		latabla.innerHTML="";
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${doc.data()}`);
			latabla.innerHTML+= `<tr><th scope="row">${doc.id}</th><td>${doc.data().nombre}</td><td>${doc.data().contrasenia}</td></tr>`
		});
	});
}