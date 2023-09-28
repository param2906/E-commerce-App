import Header from "../component/layout/Header/Header"
import Footer from "../component/layout/Footer/Footer"
import Home from "../component/Home/Home"
import { useAppSelector } from '@/store/hooks'
import UserOptions from "../component/layout/Header/UserOptions";

 const HomePage = ()=>{
    const { isAuthenticated, user } = useAppSelector<any>((state) => state.user);
    return(
        <>
        {isAuthenticated && <UserOptions user={user} />}
        <Header />
        <Home />

        <Footer />
        </>
        
    )
}

export default HomePage