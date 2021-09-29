# PigeonTask

This is a 4 block version of the task. Online choice-Predefined-Online Choice-Predefined. The BlockBuilder code blocks have all the important variables that get changed between each test block.

## Running outside of Pavlovia

Make the following changes:

index.html
- comment out the lines referencing Prolific
- comment out the line referencing the jspsych-pavlovia plugin

test.js
- change the timeline parameter (currently around line 820) to

  timeline: [consentdemo_block, FirstInstructions_block, BlockBuilder_A, full_block, BlockBuilder_B, test_frame_int_pre, full_block_pre, Instructions,Instructions,  BlockBuilder_1, full_block, BlockBuilder_2, Instructions, test_frame_int_pre, full_block_pre, BlockBuilder_3,Instructions, full_block, Instructions, BlockBuilder_4, test_frame_int_pre, full_block_pre],

If you run into an issue with the CORS settings when running it locally, use this link to be able to run the task on your machine: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server

## Other notes

The timeline parameter in test.js for running in Pavlovia is:

  timeline: [pavlovia_init, consentdemo_block, FirstInstructions_block, BlockBuilder_A, full_block, BlockBuilder_B, test_frame_int_pre, full_block_pre, Instructions,Instructions,  BlockBuilder_1, full_block, BlockBuilder_2, Instructions, test_frame_int_pre, full_block_pre, BlockBuilder_3,Instructions, full_block, Instructions, BlockBuilder_4, test_frame_int_pre, full_block_pre, pavlovia_finish],

Change the timing of the predefined bounds set  to get the balls to appear almost instantly instead of having to wait the half second for them to appear. You'll need to stop it from moving on directly to the bounds adjustment screen though.

Integration with prolific: https://www.jspsych.org/overview/prolific/

https://pavlovia.org/js-psych

There's a longer set of video workshops here: https://www.jspsych.org/tutorials/video-tutorials/ to figure out the basics of jspsych.
