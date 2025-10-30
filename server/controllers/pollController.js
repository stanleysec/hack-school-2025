const Poll = require("../models/Poll");

// TODO
// ACTIVITY 2a - Implement getPolls function (return all polls)
const getPolls = async () => { 
    const poll = await Poll.find();
    console.log("getting polls");
    return poll;
}
// ACTIVITY 2b - Implement getPoll function (get one poll by id)
const getPoll = async (id) => { 
    const poll = await Poll.findById(id);
    console.log(`getting poll by id ${id}`);
    return poll;
}

// END ACTIVITY 2

// TODO
// ACTIVITY 3a - Implement postPoll function to create a new poll
const postPoll = async ({ownerId, title, description, options}) => { 
    if (!ownerId || !title || !options) return;
    const poll = new Poll({
        ownerId: ownerId,
        title: title,
        description: description,
        options: options,
    });

    await poll.save();
    return poll;
}
// ACTIVITY 3b - Implement postVote function to cast a vote
const postVote = async ({pollId, optionId}) => { 
    if (!pollId || !optionId ) 
        return res.status(404).json({ error: 'Invalid request' });
    
    const updateOption = await Poll.updateOne({ _id: pollId, 'options._id': optionId }, { $inc: { 'options.$.count': 1, totalVotes: 1 } }); 
    if (updateOption.modifiedCount == 0)
        return res.json({ error: 'Failed to update poll' });
    
    const updatedPoll = await Poll.findById(pollId);

    console.log(`Vote cast for ${pollId} on option ${optionId}`);

    return updatedPoll;

    }


// ACTIVITY 3c - Implement module exports
module.exports = { getPolls, getPoll, postPoll, postVote };;
// END ACTIVITY 3
