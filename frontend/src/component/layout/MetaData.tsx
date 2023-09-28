
import Helmet from "react-helmet"

interface title {
    title: string
}
const MetaData = ({title}:title)=>{
    return(
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

export default MetaData