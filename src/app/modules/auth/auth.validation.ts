import { z } from "zod";

export const login = z.object({
  email: z.email(),
  password: z.string(),  
});




const AuthDataValidation = {
  login,

}


export default AuthDataValidation;