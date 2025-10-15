const isvaildcapasity = (capacity) => (capacity >0 && capacity <= 1000) 
    
const isvaildate = (date)=> (new Date(date) > new Date())
    
    


export {isvaildcapasity,isvaildate}