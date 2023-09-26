import { SignUp } from "@clerk/nextjs";

const page = () => {
    return ( 
        <div>    
            <div>sign-up</div>
            <SignUp />
        </div>
     );
}
 
export default page;