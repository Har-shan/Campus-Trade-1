import Users from "../db/Models/User.js"
export const getUserData=async (req,res)=>{
    try {
        console.log(req.body)
        const userData=await Users.findById({_id:req.body.userId})
        res.status(200).render('USER_PROFILE',{user:userData})
    } catch (error) {
        console.error(`${error.message}!!`)
        //Not returning error but rendering the same page with no change
        res.render('index',{user : undefined});
    }
}