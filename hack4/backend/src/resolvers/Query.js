const Query = {
  async statsCount(parent, {severity, locationKeywords}, { db }, info) {
    try{
      const collections = db.people;  // 這是個 Array

      // 測試過以下這些操作 其他的不確定可不可以
      // console.log(collections[0].location.name);
      // console.log(severity) ;
      // console.log(locationKeywords) ;

      let outcome = []
      if (typeof severity !== 'undefined'){
        
        for(let i = 0 ; i < locationKeywords.length ; i++){
          let loction_contain = collections.filter(function(value) {
            return value.location.description.includes(locationKeywords[i]);
          });

          let severity_higher = loction_contain.filter(function(value) {
            return value.severity >= severity ;
          });

          outcome.push(severity_higher.length)
        }
      }
      else{
        for(let i = 0 ; i < locationKeywords.length ; i++){
          let loction_contain = collections.filter(function(value) {
            return value.location.description.includes(locationKeywords[i]);
          });

        outcome.push(loction_contain.length)
        }
      } 

      return outcome ;

    }
    catch(e){
      return null ;
    }
  },

};

export { Query as default };
