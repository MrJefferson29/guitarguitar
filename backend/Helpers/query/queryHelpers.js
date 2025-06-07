const searchHelper = (field1, field2, query, req) => {
    const search = req?.query?.search;

    if (search) {
        const searchObject = {
            $or: [
                { [field1]: { $regex: search, $options: "i" } },
                { [field2]: { $regex: search, $options: "i" } }
            ]
        };
        return query.find(searchObject);
    }

    return query;
};


const paginateHelper = async (model ,query ,req)=> {

    const page = parseInt( req.query.page ) || 1 ; 
    const pageSize = parseInt( req.query.limit ) || 6 ; 
    const skip  = (page-1 ) * pageSize ; 
   
    const regex = new RegExp(req.query.search, "i")    

    const total = await model.countDocuments({"title" : regex})
  
    const pages = Math.ceil(total / pageSize )  ;

    query = query.skip(skip).limit(pageSize) ; 

    return {
        query : query  ,
        page : page ,
        pages : pages  
    }

}


module.exports ={
    searchHelper,
    paginateHelper
}