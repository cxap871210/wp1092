const Mutation = {
  async insertPeople(parent, {data}, { db }, info) {
    try{
      const collections = db.people;
    

      for(let i = 0 ; i < data.length ; i++){
        const found = false;
        const target = 0 ;
        for(let j = 0 ; j < collections.length ; j++)
        {
          if(collections[j].ssn === data[i].ssn) {
            found = true;
            target = j ;
            break ;
          }
        }
        if(found === false){
          collections.push(data[i]) ;
        }
        else{
          collections[target].name = data[i].name ;
          collections[target].severity = data[i].severity ;
          collections[target].location.name = data[i].location.name ;
          collections[target].location.description = data[i].location.description ;
        }
      }
    
      return true ;
    }
    catch(e){
      return false ;
    }

      
  }
};

export { Mutation as default };
