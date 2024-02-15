import multer from "multer";

//antes de instanciar, debemos configurar donde se almacenaran los archivos
const storage = multer.diskStorage({
  //destination hace referencia a la carpeta donde se guarda
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public/img");
  },
  //filename hace referencia al nombre final que tendra el archivo
  filename: (req, file, cb) => {
    cb(null, file.originalname); // conservamos nombre
  },
});

export const uploader = multer({ storage });
