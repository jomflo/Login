var firebaseConfig= {
	apiKey: "AIzaSyAsKnHHEftjEVxKB2xxsj4r0EtON1saFg4",
 	authDomain: "login-293c3.firebaseapp.com",
 	databaseURL: "https://login-293c3.firebaseio.com",
 	projectId: "login-293c3",
 	storageBucket: "login-293c3.appspot.com",
 	messagingSenderId: "331717350518",
 	appId: "1 :331717350518:web:a30273f15be7cb380d7b57",
 	measurementId: "G-NGGWRH0SGE"
}

//INITIALIZE fIREBASE
const app = firebase.initializeApp(firebaseConfig)

var db = app.firestore();

//funcion para guardar el registro de un usuario
function guardar(){

	var user = document.getElementById("user");
    var password = document.getElementById("password");
	
    //Guardar los datos ingresados en las cajas de texto en la base de datos
	db.collection("Users").add({
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

function ver(){
	var latabla = document.getElementById("latabla");
	db.collection("Users").onSnapshot((querySnapshot) => {
		latabla.innerHTML="";
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${doc.data()}`);
			latabla.innerHTML+= `
			<th scope="row">${doc.id}</th>
			<td>${doc.data().nombre}</td>
			<td>${doc.data().contrasenia}</td>
			<td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().contrasenia}')">Editar</button></td>
   			<td> <button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
			</tr>`
		});
	});
}

//Borrar documento
function eliminar(Id)
{
	db.collection("Users").doc(Id).delete().then(function() {
	    console.log("Document successfully deleted!");
	}).catch(function(error) {
	    console.error("Error removing document: ", error);
	});
}

//actualizar(editar) document
function editar(Id, nombr , passw)
{ 
	document.getElementById("user").value=nombr;
	document.getElementById("password").value=passw;

	var boton= document.getElementById("boton");
	boton.innerHTML="Editar";
	boton.onclick=function(){
		var washingtonRef = db.collection("User").doc(Id);

	// Set the "capital" field of the city 'DC'
	var nomb = document.getElementById("user").value;
	var pass = document.getElementById("password").value;
	boton.innerHTML="Guardar";
	    nomb.value="";
		pass.value="";
	return washingtonRef.update({
	    nombre: nomb,
		contrasenia: pass
	})
	.then(function() {
	    console.log("Document successfully updated!");
	    boton.innerHTML="Guardar";
	    user.value="";
		password.value="";
	})
	.catch(function(error) {
	    // The document probably doesn't exist.
	    console.error("Error updating document: ", error);
	    boton.innerHTML="Guardar";
	    user.value="";
		password.value="";
	});
	}	
}

function entrar(){
	//var url="https://www.google.com";
	//$(location).attr('href',url);
	//miweb: "https://jomflo.github.io/miweb/";
	var usuario= document.getElementById("user").value;
	var clave=document.getElementById("password").value;

		document.getElementById("user").value="";
		document.getElementById("password").value="";
		var usuarioo;
		var clavee;

db.collection("Users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        if(usuario==`${doc.data().nombre}` & clave==`${doc.data().contrasenia}` & usuario!="" & clave!="")
			{
				usuarioo=`${doc.data().nombre}` ;
				clavee=`${doc.data().contrasenia}`;
				location.href="https://jomflo.github.io/miweb/";
			}
    });
    
			if(usuario!=usuarioo & clave!=clavee)
			{
				alert("Usted no tiene una cuenta aun");
			}
});	
}