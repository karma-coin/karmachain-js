export default {
    types: {},
    rpc: {
        events: {
            getBlockchainEvents: {
                description: "Provides events for specific blocks",
                params: [
                    {
                        name: "from_block_height",
                        type: "u32",
                    },
                    {
                        name: "to_block_height",
                        type: "u32",
                    },
                ],
                type: "Vec<Event>",
            },
        },
    },
};
