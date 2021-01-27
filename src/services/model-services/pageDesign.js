const {PageDesign,Page}=require("../../models")
const NodeCache = require( "node-cache" );
const globalService=require("./global")

const pageDesignCache = new NodeCache();


const getDomainDivisionPageDesigns=async(user)=>{
    let {domain_,division_}=user

    let allPageDesigns={}
    let {rows}=await globalService.getAll({ 
        model:Page,
        user,
        attributes:['api_url'],
        where:{domain_,division_},
        include:[
            {
                model:PageDesign,
                attributes:[
                    '_id','section','section_no','field','label','table_seq',
                    'section_seq','type','value','readonly','only_insert','control_field',
                    'validations','mandatory'

            ],
                //order:[['section_no','asc'],['section_seq','asc']]
            }
        ],
        raw:false,
        })

    
        for (let row of rows)
            allPageDesigns[row['api_url']]=row['page_designs']
            
        pageDesignCache.set(domain_+":"+division_,allPageDesigns)// storing in cache also

        return allPageDesigns;    

}

const getAllPageDesigns=async(user)=>{

    let {domain_,division_}=user

    let allPageDesigns=pageDesignCache.get(domain_+":"+division_)

     if(!allPageDesigns)
         allPageDesigns=await getDomainDivisionPageDesigns(user)

    return allPageDesigns;

}



const getOnePageDesign=async(pageDesignName,user)=>{

    let allPageDesigns=await getAllPageDesigns(user)

    return allPageDesigns[pageDesignName]

}

const resetPageDesignCache=()=>{
    pageDesignCache.flushAll()

}

module.exports={
    getAllPageDesigns,
    getOnePageDesign,
    resetPageDesignCache
}