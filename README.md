# SHORT.ly

Aplicación que permite a los usuarios acortar enlaces y almacenarlos en su cuenta para uso posterior. Orientada a usuarios relacionados con el área de marketing y/o activos en redes sociales donde es necesario ahorrar caracteres y llevar un registro de enlaces compartidos.

## Estilos

### Tipografías

**Fuente:** Roboto 400, 700

**Body**: Font-size: 16px

**H1**: 2.5rem

**H2**: 1.5rem

**H3**: 1.25rem

### Colores

**Primario**: #07a0c3

**Secundario**: #0069d9


## Instalación

Se utiliza parcel.js como bundler de la aplicación. Para mayor información, consultar 
[documentación](https://https://parceljs.org/ "Parcel JS DOCS")

Tambien es necesario tener instalado Firebase CLI en el sistema. Documentación disponible [aquí](https://firebase.google.com/docs/cli/?hl=es-419).

**Instalar dependencias**

En la carpeta principal del proyecto, instalar dependencias utilizando:

NPM:
```
npm install
```
Yarn:
```
yarn install
```

A continuación navegar hasta el directorio functions, donde se procederán a instalar las depencias necesarias para este módulo.

Por limitaciones de Firebase, las dependencias de esta carpeta solo podrán ser instaladas utilizando NPM.

Dentro del archivo package.json se lista como dependencia el módulo 'cors'. Es importante que se encuentre presente para evitar problemas de CORS.

**Configurar Firebase**
Crear una nueva aplicación en firebase: https://console.firebase.google.com/

Acceder a la configuración del proyecto, aquí se encontrarán las claves necesarias que deberan ser colocadas en el archivo firebase-config.js contenido en la carpeta 'src'.

Para inicializar Firebase, loguearse utilizando el comando

```
firebase login
```

Iniciar la aplicación utilizando el comando
```
firebase init
```

Para realizar un deploy de las cloud functions, utilizar el comando
```
firebase deploy --only functions
```

Importante: Es necesario realizar un deploy de las cloud functions para que sean generadas las rutas en donde estarán disponibles.

Una vez hecho el deploy, las rutas pueden ser encontradas en la consola del proyecto, en la sección Functions.

Estas rutas deben ser copiadas dentro del objeto firebasePaths del archivo firebase-config.js.


**Deploy a Firebase Hosting**
Empaquetar la aplicación utilizando el comando

```
npm run build
```

Usando Yarn sería
```
yarn build
```

La aplicación compilada y empaquetada estará disponible en la carpeta public (misma carpeta configurada para Firebase Hosting)

Para subir la aplicación, utilizar el comando
```
firebase deploy --only hosting
```

### Usuarios de prueba
user: demoproyecto@desafiolatam.com
pass: desafioLATAM

user: demoproyecto2@desafiolatam.com
pass: desafioLATAM2
