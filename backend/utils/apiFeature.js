class ApiFeature {
    constructor(query,querystr){
    this.query = query 
    this.querystr = querystr
    }
    search(){
        const keyword = this.querystr.keyword ? 
        {
            name:{
                $regex:this.querystr.keyword,
                $options:"i"
            },
            
        }:
        {};
        this.query = this.query.find({...keyword})
        return this
    }
    filter(){
        const querycopy = {...this.querystr}
        const removequery = ["keyword","page","limit"]

        removequery.forEach((element) => 
            delete querycopy[element]
        );
        let filterString = JSON.stringify(querycopy)
        filterString = filterString.replace(/\b(gt|lt|gte|lte)\b/g,(key)=> `$${key}`)
        this.query = this.query.find(JSON.parse(filterString))
        return this
    }
    pagination(productPerPage){
        const page = Number(this.querystr.page) || 1
        const skip = productPerPage * (page-1)
        this.query = this.query.limit(productPerPage).skip(skip);

        return this;
    }


}

module.exports = ApiFeature