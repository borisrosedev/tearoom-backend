const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../..', 'uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage }).single('photo')

function multerMiddleware(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log('❌ MulterError:', err.message)
      return res.status(400).json({ error: err.message })
    } else if (err) {
      console.log('❌ Unknown error:', err)
      return res.status(500).json({ error: err.message })
    }

    console.log('✅ Fichier reçu')
    console.log('🧾 req.file:', req.file)
    console.log('🧾 req.body:', req.body)

    next()
  })
}

module.exports = multerMiddleware
