const images = [
    { img: "images/photo1.jpg" },
    { img: "images/photo3.jpg" },
    { img: "images/photo4.jpg" },
    { img: "images/photo5.jpg" },
    { img: "images/photo6.jpg" },
    { img: "images/photo7.jpg" },
    { img: "images/photo8.jpg" },
    { img: "images/photo9.jpg" },
    { img: "images/photo10.jpg" },
    { img: "images/photo11.jpg" },
    { img: "images/photo12.jpg" },
    { img: "images/photo13.jpg" },
    { img: "images/photo14.jpg" },
    { img: "images/photo15.jpg" },
    { img: "images/photo16.jpg" },
    { img: "images/photo17.jpg" },
    { img: "images/photo18.jpg" },
    { img: "images/photo19.jpg" },
    { img: "images/photo20.jpg" },
    { img: "images/photo22.jpg" },
    { img: "images/photo23.jpg" },
    { img: "images/photo24.jpg" },
    { img: "images/photo25.jpg" },
    { img: "images/photo26.jpg" },
    { img: "images/photo27.jpg" },
    { img: "images/photo28.jpg" },
    { img: "images/photo29.jpg" },
    { img: "images/photo30.jpg" },
    { img: "images/photo31.jpg" },
    { img: "images/photo32.jpg" },
    { img: "images/photo33.jpg" },
    { img: "images/photo34.jpg" },
    { img: "images/photo35.jpg" },
    { img: "images/photo36.jpg" },
    { img: "images/photo37.jpg" },
    { img: "images/photo38.jpg" },
    { img: "images/photo39.jpg" },
    { img: "images/photo40.jpg" },
    { img: "images/photo41.jpg" },
    { img: "images/photo42.jpg" },
    { img: "images/photo43.jpg" },
    { img: "images/photo44.jpg" },
    { img: "images/photo45.jpg" },
    { img: "images/photo46.jpg" },
    { img: "images/photo47.jpg" },
    { img: "images/photo48.jpg" },
    { img: "images/photo49.jpg" },
    { img: "images/photo50.jpg" }
];

// Variable para almacenar el número máximo de imágenes seleccionables
let maxSelected = 4;  // Valor predeterminado (4 columnas)

// Obtener el select para el layout
const layoutSelect = document.querySelector('.select');

// Escuchar el cambio en el select
layoutSelect.addEventListener('change', function() {
    // Obtener el número máximo de imágenes seleccionables según la opción seleccionada
    const selectedValue = JSON.parse(layoutSelect.value);
    maxSelected = selectedValue.columns;  // 4 o 8 columnas

    // Resetear las selecciones al cambiar el layout (opcional)
    resetSelections();
});

// Seleccionar el contenedor de las miniaturas
const thumbnailsContainer = document.querySelector('.thumbnails-container');

// Variable para llevar el control de cuántas imágenes están seleccionadas
let selectedImagesCount = 0;

// Iterar sobre el array de imágenes y agregar cada una al contenedor
images.forEach(image => {
    // Crear el contenedor para cada imagen (thumbnail)
    const thumbnailItem = document.createElement('div');
    thumbnailItem.classList.add('thumbnail-item');

    // Crear la etiqueta <img> y establecer su atributo src
    const img = document.createElement('img');
    img.classList.add('img');
    img.src = `${image.img}?w=240&h=240&fit=crop&auto=format`;

    // Agregar la imagen al contenedor de miniaturas
    thumbnailItem.appendChild(img);

    // Agregar el contenedor de la miniatura al contenedor principal
    thumbnailsContainer.appendChild(thumbnailItem);

    // Añadir el evento de clic para seleccionar/deseleccionar la miniatura
    thumbnailItem.addEventListener('click', function() {
        // Si la miniatura ya está seleccionada, deseleccionarla
        if (thumbnailItem.classList.contains('thumbnail-item--selected')) {
            thumbnailItem.classList.remove('thumbnail-item--selected');
            const badge = thumbnailItem.querySelector('.badge');
            if (badge) badge.remove();  // Eliminar el badge con el check
            selectedImagesCount--; // Decrementar el contador
        } else {
            // Si no está seleccionada y aún hay espacio, seleccionarla
            if (selectedImagesCount < maxSelected) {
                thumbnailItem.classList.add('thumbnail-item--selected');
                
                // Crear la estructura del badge y el check
                const badge = document.createElement('div');
                badge.classList.add('badge');
                
                const check = document.createElement('div');
                check.classList.add('check');
                
                // Insertar el check dentro del badge
                badge.appendChild(check);
                
                // Insertar el badge dentro del thumbnail
                thumbnailItem.insertBefore(badge, img);

                selectedImagesCount++; // Incrementar el contador
            } else {
                alert(`Puedes seleccionar un máximo de ${maxSelected} imágenes.`);
            }
        }
    });
});

// Función para resetear las selecciones (opcional)
function resetSelections() {
    selectedImagesCount = 0;
    const selectedItems = document.querySelectorAll('.thumbnail-item--selected');
    selectedItems.forEach(item => {
        item.classList.remove('thumbnail-item--selected');
        const badge = item.querySelector('.badge');
        if (badge) badge.remove();  // Eliminar el badge con el check
    });
}


// Seleccionar el botón de crear collage
const createCollageBtn = document.querySelector(".btn-create-collage");

// Escuchar el evento de clic en el botón
createCollageBtn.addEventListener("click", createCollage);

// Función que se ejecuta al hacer clic en el botón
function createCollage() {
    const selectedItems = document.querySelectorAll('.thumbnail-item--selected'); // Obtener todas las miniaturas seleccionadas
    const previewContainer = document.querySelector('.previewContainer');  // Obtener el contenedor del collage
    
    // Limpiar cualquier contenido previo en el contenedor del collage
    previewContainer.innerHTML = '';

    // Si hay imágenes seleccionadas, creamos el collage
    if (selectedItems.length > 0) {
        // Establecer el número de columnas (por ahora 4 siempre)
        const columns = 4;
        let rows = Math.ceil(selectedItems.length / columns);  // Calcular cuántas filas son necesarias

        // Crear un contenedor de "collage" y añadir las imágenes seleccionadas
        for (let i = 0; i < rows; i++) {
            // Crear una fila para cada conjunto de 4 imágenes
            const row = document.createElement('div');
            row.classList.add('collage-row'); // Añadir una clase para dar estilo a cada fila

            // Agregar las imágenes correspondientes a la fila
            for (let j = 0; j < columns; j++) {
                const index = i * columns + j;  // Calcular el índice de la imagen
                if (index < selectedItems.length) {
                    const img = selectedItems[index].querySelector('img').cloneNode();  // Obtener la imagen y clonarla
                    img.classList.add('collage-image');  // Añadir una clase para dar estilo

                    // Agregar la imagen a la fila
                    row.appendChild(img);
                }
            }

            // Agregar la fila al contenedor del collage
            previewContainer.appendChild(row);
        }
    } else {
        alert("Por favor, selecciona imágenes primero.");
    }
}

const downloadBtn = document.querySelector(".btn-download");
downloadBtn.addEventListener("click", downloadCollage);

function downloadCollage() {
    alert("Aviso al navegante, este botón funciona correctamente en mi servidor local. Sin embargo, al publicarlo en línea, es posible que el navegador bloquee la descarga debido a restricciones de seguridad CORS. Si esto sucede, podría haber problemas al usarlo.");
    const selectedItems = document.querySelectorAll('.thumbnail-item--selected');  // Obtener todas las miniaturas seleccionadas
    const previewContainer = document.querySelector('.previewContainer');  // Obtener el contenedor del collage

    // Asegurarse de que hay imágenes seleccionadas
    if (selectedItems.length === 0) {
        alert("Por favor, selecciona imágenes primero.");
        return;
    }

    // Calcular el número de columnas y filas en función de las imágenes seleccionadas
    const columns = maxSelected === 4 ? 4 : 4;  // Si el maxSelected es 4, tendríamos 4 columnas (por ahora no se cambia dinámicamente)
    const rows = Math.ceil(selectedItems.length / columns);  // Número de filas necesarias para acomodar las imágenes

    // Definir el tamaño de cada imagen en el collage (en píxeles)
    const imageWidth = 240; // Ancho fijo para cada imagen
    const imageHeight = 240; // Alto fijo para cada imagen

    // Crear un canvas con el tamaño adecuado
    const canvas = document.createElement('canvas');
    canvas.width = columns * imageWidth;  // Ancho total del collage (columnas * ancho de cada imagen)
    canvas.height = rows * imageHeight;  // Alto total del collage (filas * alto de cada imagen)

    const ctx = canvas.getContext('2d');

    // Dibujar cada imagen en el canvas
    selectedItems.forEach((item, index) => {
        const img = item.querySelector('img');  // Obtener la imagen del thumbnail
        const x = (index % columns) * imageWidth;  // Calcular la posición horizontal
        const y = Math.floor(index / columns) * imageHeight;  // Calcular la posición vertical

        // Crear un objeto Image para cargar la imagen correctamente
        const imageElement = new Image();
        imageElement.src = img.src;  // Usar la misma URL de la imagen

        // Esperar a que la imagen se cargue y luego dibujarla en el canvas
        imageElement.onload = function() {
            ctx.drawImage(imageElement, x, y, imageWidth, imageHeight);

            // Si es la última imagen que se ha dibujado, podemos proceder a la descarga
            if (index === selectedItems.length - 1) {
                // Crear una URL de datos para la imagen del canvas
                const dataUrl = canvas.toDataURL('image/png');

                // Crear un enlace para descargar la imagen
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'collage.png';  // Nombre del archivo de la imagen descargada
                link.click();  // Simular un clic para descargar la imagen
            }
        };
    });
}


// Seleccionar el botón de "Start over"
const startOverBtn = document.querySelector('.btn-start-over');

// Función para reiniciar todo
function startOver() {
    // 1. Limpiar las selecciones de las miniaturas
    const selectedItems = document.querySelectorAll('.thumbnail-item--selected');
    selectedItems.forEach(item => {
        item.classList.remove('thumbnail-item--selected'); // Eliminar la clase de selección
        const badge = item.querySelector('.badge');
        if (badge) badge.remove(); // Eliminar el badge con el check
    });

    // 2. Limpiar el contador de imágenes seleccionadas
    selectedImagesCount = 0; // Restablecer el contador de imágenes seleccionadas

    // 3. Limpiar el contenedor del collage
    const previewContainer = document.querySelector('.previewContainer');
    previewContainer.innerHTML = ''; // Eliminar todas las imágenes del collage

    // 4. (Opcional) Si tienes otras acciones de reinicio, añádelas aquí
    // Ejemplo: resetear cualquier otro estado o formulario
}

// Añadir el event listener al botón
startOverBtn.addEventListener('click', startOver);
