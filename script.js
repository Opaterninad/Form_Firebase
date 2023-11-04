const firebaseConfig = {
    apiKey: "AIzaSyAgQwlGThUSkwaNpRXxY2c5F0dgXhZH_As",
    authDomain: "datos-formulario-ada0e.firebaseapp.com",
    projectId: "datos-formulario-ada0e",
    storageBucket: "datos-formulario-ada0e.appspot.com",
    messagingSenderId: "639790769181",
    appId: "1:639790769181:web:a8936cac1cb5541a68d2f4",
    measurementId: "G-HQH56E1K3F"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()

    //Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor, introduce tu nombre'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //Validar correo electrónico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico
    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introducí un mail válido'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    //Validar la contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales.'
        contrasenaError.classList.add('error-message')
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    //Si todos los campos son válidos enviar formulario

    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){

        //BACKEND QUE RECIBA LA INFORMACIÓN

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            Swal.fire(
                'Felicidades',
                'La información ha sido enviada con éxito!',
                'success'
              , docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
          Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'parece que no se envió la información!',
              }) 
              
        });

        
    }

})
