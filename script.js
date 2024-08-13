// Inicialización del mapa centrado en Brown Nte. 290, Ñuñoa, Región Metropolitana
var map = L.map('map').setView([-33.45262739448091, -70.59207720382507], 16);

// Capa de mapa con un diseño minimalista
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
}).addTo(map);

// Función para añadir pines al mapa
function onMapClick(e) {
    var popupContent = `
        <div class="popup-content">
            <input type="text" placeholder="Título" id="pinTitle">
            <textarea id="pinDesc" placeholder="Descripción"></textarea>
            <input type="file" id="pinImage1" accept="image/*">
            <input type="file" id="pinImage2" accept="image/*">
            <button onclick="savePin(${e.latlng.lat}, ${e.latlng.lng})">Publicar</button>
            <button onclick="contact()">Contactar</button>
        </div>
    `;
    L.popup({maxWidth: 600})
        .setLatLng(e.latlng)
        .setContent(popupContent)
        .openOn(map);
}

// Guardar el pin con la información proporcionada
function savePin(lat, lng) {
    var title = document.getElementById('pinTitle').value;
    var desc = document.getElementById('pinDesc').value;
    var img1 = document.getElementById('pinImage1').files[0];
    var img2 = document.getElementById('pinImage2').files[0];

    var reader1 = new FileReader();
    var reader2 = new FileReader();

    reader1.onload = function (e1) {
        reader2.onload = function (e2) {
            var popupContent = `
                <div class="popup-content">
                    <b>${title}</b><br>
                    <p>${desc}</p>
                    <img src="${e1.target.result}" alt="Img 1">
                    <img src="${e2.target.result}" alt="Img 2">
                    <button onclick="contact()">Contactar</button>
                </div>
            `;
            L.marker([lat, lng]).addTo(map)
                .bindPopup(popupContent)
                .openPopup();
        };
        if (img2) {
            reader2.readAsDataURL(img2);
        } else {
            // Si no hay segunda imagen, mostrar solo la primera
            var popupContent = `
                <div class="popup-content">
                    <b>${title}</b><br>
                    <p>${desc}</p>
                    <img src="${e1.target.result}" alt="Imagen 1">
                    <button onclick="contact()">Contactar</button>
                </div>
            `;
            L.marker([lat, lng]).addTo(map)
                .bindPopup(popupContent)
                .openPopup();
        }
    };
    if (img1) {
        reader1.readAsDataURL(img1);
    }
}

// Función de ejemplo para el botón "Contactar"
function contact() {
    alert('Contactando...');
}

// Añadir un evento de clic en el mapa para añadir pines
map.on('click', onMapClick);

// Crear los pines predeterminados al cargar la página
var pin1 = L.marker([-33.4509668721507, -70.59258682354299]).addTo(map);
pin1.bindPopup(`
    <div class="popup-content">
        <b>Regalo Telefono CISCO</b><br>
        <p> Regalo el telefono de mi abuelito porque ya no lo uso, sé que alguien
        le puede dar un buen uso</p>
        <img src="img/xtelefono.jpg" alt="Pin 1">
        <button onclick="contact()">Contactar</button>
    </div>
`);

var pin2 = L.marker([-33.452739288374765, -70.58931989295327]).addTo(map);
pin2.bindPopup(`
    <div class="popup-content">
        <b>Dono Audifono SAMSON</b><br>
        <p>Regalo el audifono de mi hijo, puesto que ya no lo usa y 
        ha preferido dejar de usarlo</p>
        <img src="img/xaudifono.jpg" alt="Pin 2">
        <button onclick="contact()">Contactar</button>
    </div>
`);

var pin3 = L.marker([-33.45197 , -70.59148]).addTo(map);
pin2.bindPopup(`
    <div class="popup-content">
        <b>no se que es</b><br>
        <p>Se regala esta cosa, según mi tata es una cinta de impacto </p>
        <img src="img/xcinta.jpg" alt="Pin 2">
        <button onclick="contact()">Contactar</button>
    </div>
`);

var pin4 = L.marker([-33.453065994810345, -70.58991578070874]).addTo(map);
pin2.bindPopup(`
    <div class="popup-content">
        <b>Regalo teclado cochino</b><br>
        <p>no uso este teclado porque dejé de jugar lol, así que me limpie la vida
        alguien más puede usarla </p>
        <img src="img/xteclado.jpg" alt="Pin 2">
        <button onclick="contact()">Contactar</button>
    </div>
`);

var pin5 = L.marker([-33.45463370389981, -70.59253674953749]).addTo(map);
pin1.bindPopup(`
    <div class="popup-content">
        <b>empresto una kalkulaora</b><br>
        <p> no se de matematica, yo la kiero pal bicio, marta vuelve por favor</p>
        <img src="img/xcalculadora.jpg" alt="Pin 1">
        <button onclick="contact()">Contactar</button>
    </div>
`);

// Cargar donaciones desde el JSON (si es necesario para pines predeterminados)
fetch('donaciones.json')
.then(response => response.json())
.then(data => {
    data.forEach(donacion => {
        var marker = L.marker([donacion.lat, donacion.lng]).addTo(map);
        marker.bindPopup(`
            <div class="popup-content">
                <b>${donacion.titulo}</b><br>
                <p>${donacion.descripcion}</p>
                <img src="${donacion.imagen}" alt="${donacion.titulo}">
                <button onclick="contact()">Contactar</button>
            </div>
        `);
    });
});
