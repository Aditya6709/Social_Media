
import { useRouter } from "next/router"
const Dynamicpage = () =>{

const router= useRouter();
const { query } = router;
    return(
         
    <div>
        this is a {query.username} page
         <button onClick={(e)=> router.push('/user')}>HOME</button>
    </div>
    )
}
export default Dynamicpage