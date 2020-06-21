const multer = require('multer')
const path = require('path')

let  storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now().toString() + path.extname(file.originalname))
    }
})

let fileFilter = (req, file, cb) => {

    if(file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true);
    }else{
        cb(new Error("O formato da imagem não é compatível com( jpg, jpeg ou png)"))
    }
}

const uploads = multer({storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter});


module.exports = uploads.array('images',5);