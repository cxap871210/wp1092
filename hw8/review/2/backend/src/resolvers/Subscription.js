const Subscription = {
    message: {
        subscribe(parent, { name } , { pubsub }, info) {
            //console.log(name);
            return pubsub.asyncIterator(name);
        },
    },
};

export { Subscription as default };