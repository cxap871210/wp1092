const Subscription = {
    chatbox: {
      subscribe(parent, { box_name }, { db, pubsub }, info) {
        // const post = db.posts.find(post => post.id === postId && post.published)
        const existing = db.ChatBoxModel.findOne({name: box_name});
  
        if (existing === null) {
          throw new Error('Chatbox not found')
        }
  
        // console.log(pubsub);
        // console.log('sdwefw');
        return pubsub.asyncIterator(`chatbox ${box_name}`)
      }
    },
  }

  export { Subscription as default };