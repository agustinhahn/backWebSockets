export const bodyProductsValidator = (req,res,next)=>{
    if(!req.body.title) return res.status(400).json({msg:"campo title es obligatorio"})
    if(typeof(req.body.title) !== "string") return res.status(400).json({msg:"en el campo title solo debe ingresar string"})
    if(!req.body.description) return res.status(400).json({msg:"campo description es obligatorio"})
    if(typeof(req.body.description) !== "string") return res.status(400).json({msg:"en el campo description solo debe ingresar string"})
    if(!req.body.code) return res.status(400).json({msg:"campo code es obligatorio"})
    if(typeof(req.body.code) !== "string") return res.status(400).json({msg:"en el campo code solo debe ingresar string"})
    if(!req.body.price) return res.status(400).json({msg:"campo price es obligatorio"})
    if(typeof(req.body.price) !== "number") return res.status(400).json({msg:"en el campo price solo debe ingresar numeros"})
    if(!req.body.stock) return res.status(400).json({msg:"campo stock es obligatorio"})
    if(typeof(req.body.stock) !== "number") return res.status(400).json({msg:"en el campo stock solo debe ingresar numeros"})
    if(!req.body.category) return res.status(400).json({msg:"campo category es obligatorio"})
    if(typeof(req.body.category) !== "string") return res.status(400).json({msg:"en el campo category solo debe ingresar string"})
    if(req.body.thumbnails){
        if(!Array.isArray(req.body.thumbnails)){
            return res.status(400).json({msg:"el campo thumbnails debe ser un array de strings"})
        }
        for(let thumbnail of req.body.thumbnails){
            if(typeof(thumbnail) !== "string"){
                return res.status(400).json({msg:"cada elemento de thumbnails debe ser un strings"})
            }
        }
    }
    next()
}