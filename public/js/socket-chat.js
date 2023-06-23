let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
	window.location = 'index.html';
	throw new Error('El nombre y la sala son requeridos para ingresar al chat');
}

let usuario = {
	nombre: params.get('nombre'),
	sala: params.get('sala'),
};

socket.on('connect', function () {
	console.log('Conectado al servidor');

	socket.emit('entrarChat', usuario, function (resp) {
		console.log('Usuarios conectados', resp);
	});
});

socket.on('crearMensaje', function (mensaje) {
	console.log('Servidor: ', mensaje);
});

// escuchar
socket.on('disconnect', function () {
	console.log('Perdimos conexión con el servidor');
});

// Enviar información
// socket.emit(
// 	'crearMensaje',
// 	{
// 		usuario: 'Fernando',
// 		mensaje: 'Hola Mundo',
// 	},
// 	function (resp) {
// 		console.log('respuesta server: ', resp);
// 	}
// );

// Escuchar información
socket.on('enviarMensaje', function (mensaje) {
	console.log('Servidor:', mensaje);
});

// Escuchar cambios de usuarios (cuando entra o sale del chat)

socket.on('listaPersonas', (usuarios) => {
	console.log(usuarios);
});

socket.on('mensajePrivado', (mensaje) => {
	console.log('Mensaje privado: ', mensaje);
});
