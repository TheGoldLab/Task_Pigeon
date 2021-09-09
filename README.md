# PigeonTask

This is a 4 block versino of the task. Online choice-Predefined-Online Choice-Predefined. The BlockBuilder code blocks have all the important variables that get changed between each test block.

Change   timeline: [pavlovia_init, consentdemo_block, FirstInstructions_block, BlockBuilder_A, full_block, BlockBuilder_B, test_frame_int_pre, full_block_pre, Instructions,Instructions,  BlockBuilder_1, full_block, BlockBuilder_2, Instructions, test_frame_int_pre, full_block_pre, BlockBuilder_3,Instructions, full_block, Instructions, BlockBuilder_4, test_frame_int_pre, full_block_pre, pavlovia_finish], 

to

  timeline: [consentdemo_block, FirstInstructions_block, BlockBuilder_A, full_block, BlockBuilder_B, test_frame_int_pre, full_block_pre, Instructions,Instructions,  BlockBuilder_1, full_block, BlockBuilder_2, Instructions, test_frame_int_pre, full_block_pre, BlockBuilder_3,Instructions, full_block, Instructions, BlockBuilder_4, test_frame_int_pre, full_block_pre], 
  
  to run outside pavlovia.
  
  Change the timing of the predefined bounds set  to get the balls to appear almost instantly instead of having to wait the half second for them to appear. You'll need to stop it from moving on directly to the bounds adjustment screen though. 
  
  Integration with prolific: https://www.jspsych.org/overview/prolific/
  
  https://pavlovia.org/js-psych
  
  There's a longer set of video workshops here: https://www.jspsych.org/tutorials/video-tutorials/ to figure out the basics of jspsych. 
