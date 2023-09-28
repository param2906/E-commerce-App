import { useState } from "react"
import { useRouter } from 'next/router'
import Styles from "../styles/search.module.css"

const Search = () => {
    const [keyword, setKeyword] = useState("")
    const router = useRouter()
    const searchSubmitHandler = (e: any) => {
        e.preventDefault();
        console.log("KEYWORD", keyword);

        if (keyword.trim()) {
            router.push(`/products/${keyword}`)
        }
        else {
            router.push(`/products`);
        }
    }
    return (
        <>
            <form className={Styles.searchBox} onSubmit={searchSubmitHandler}>
                <input type="text"
                    placeholder="search a product"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="search"></input>
            </form>
        </>
    )
}

export default Search