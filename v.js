 const generateReference = async()=>{
    try {
         var referenceNo = ((Date.now() + Math.random()) * 1000).toString()
         var reference = "T"+referenceNo.slice(0,15)
         return reference
    }catch(e){
         return e.data.response ? e.data.response : e.message
    }
}

console.log(generateReference())