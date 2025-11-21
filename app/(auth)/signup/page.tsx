
import  { SingInView } from "@/modules/UI/auth-view/Sing-view-page";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

 async function Page(){
const cookieStore = await  cookies();
const token =cookieStore.get("token")?.value;

 if(token){
     redirect("/")
 }
    return <SingInView />
}
export default Page;