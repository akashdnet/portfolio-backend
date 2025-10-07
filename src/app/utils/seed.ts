import { UserModel } from "../modules/user/user.model"
import AppError from "./AppError"
import statusCode from "./statusCodes"


export async function seed(){
    await createUser()
}




const createUser = async ()=>{

    const user = {
        email: "admin@akash.com",
        password: "12345678"
    }

    const isExist = await UserModel.findOne({email: user.email})
    
    try {
        if(isExist){
        console.log(`😎 Already admin user exist - ${user.email}:${user.password}`)
    }else{
        const result = await UserModel.create(user)
        if(result){
            console.log(`✅ Successfully created admin user - ${user.email}:${user.password}`)
        }

    }
        
    } catch (error) {

        console.log(error)

        new AppError(statusCode.NOT_IMPLEMENTED, "Something went wrong.")        
    }


}