var timeline = []
rw = 0	
ball_array = []
var ChoiceDirection = ''
var BallVisible = true
var PointBonus = 1
var Penalty = 0
var PointTotal = 0
var UpperChoiceThreshold = 200
var LowerChoiceThreshold = 400
var trial_time = 500
var direction = 38
var AbsoluteFrames = 200
var hmm = 0
var CDcolor = 'No Choice'
var timeleft = 10
var pre_trials = 'stop'
//var scale_factor = prompt('Scale Factor (recommended: 15-20)')		
//var mean_picker = prompt('0397,1218,2133,3277,5201')
var scale_factor = 15
var script_picker = Math.floor(Math.random() * 998) + 1
var ScreenWidth = window.innerWidth
var SpaceBarMessage = 'Press Spacebar to abort trial'
var SNR_Picker = 1
	var SNR_Array = ['Mean10SD70','Mean7half','Mean10','Mean15', 'Mean10SD70'];
	var shuffledSNRArray = jsPsych.randomization.shuffle(SNR_Array);
var SNR = 'Mean10SD70'
var buttonappear = false
var instruction_picker = 1
var BottomBarMessage = 'No Response'
var chosenSNRArray = 'Mean15'
var PayToPlay = 0

var BlockNumber = 1


var pavlovia_init = {
	    type: "pavlovia",
	    command: "init"
	};
 
		
    function centered_message(message) {
 return '<div class="container" style="display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;font-weight:normal;font-family:Arial;font-size:40px">' + message + '<div>'
    }
   
   
   
    Mean10SD70Data = $ .get(`GeneratedStim/Mean10SD70.csv`, function(){
 Mean10SD70Actual = Papa.parse(Mean10SD70Data.responseText, {
     dynamicTyping: true
 })
    }) 
	
    Mean05Data = $ .get(`GeneratedStim/Mean05.csv`, function(){
 Mean05Actual = Papa.parse(Mean05Data.responseText, {
     dynamicTyping: true
 })
    }) 
	   Mean7halfData = $ .get(`GeneratedStim/Mean7half.csv`, function(){
 Mean7halfActual = Papa.parse(Mean7halfData.responseText, {
     dynamicTyping: true
 })
    })
    Mean10Data = $ .get(`GeneratedStim/Mean10.csv`, function(){
 Mean10Actual = Papa.parse(Mean10Data.responseText, {
     dynamicTyping: true
 })
    })
    Mean15Data = $ .get(`GeneratedStim/Mean15.csv`, function(){
 Mean15Actual = Papa.parse(Mean15Data.responseText, {
     dynamicTyping: true
 })
    })
	
    function myFunctionWiden(){
    	UpperChoiceThreshold += -20
		LowerChoiceThreshold += 20
    }
    function myFunctionNarrow(){
    	UpperChoiceThreshold += 20
		LowerChoiceThreshold += -20
    }
	var check_consent = function(elem) {
	    if ($('#consent_checkbox').is(':checked')) {
		return true;
	    }
	    else {
		alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
		return false;
	    }
	    return false;
	};

    var consent = {
       type:'external-html', 
       url: "consent.html", 
       cont_btn: "start", 
       check_fn: check_consent
   }

   var Gender_options = ["Male", "Female", "Transgender", "Do Not Wish To Say"];
   var Ethnicity_options = ["American Indian or Alaskan Native","Asian","Black or African American","Native Hawaiian or Pacific Islander","White","Hispanic or Latino","Other","Do Not Wish to Respond"]
   var demographics = {
   	type: "survey-multi-choice",
   	questions: [{prompt:"Gender Orientation:", options: Gender_options, required:true,}, 
   	{prompt:"Ethnicity:", options: Ethnicity_options, required:true}],
   	   };
   var age = {
   type: "survey-text",
   questions: [{prompt: "How old are you?"}],
   post_trial_gap: 100
   	   };

   var ProlificID = {
   type: "survey-text",
   questions: [{prompt: "Please Enter your ProlificID"}],
   post_trial_gap: 100
   	   };


	
    var FirstInstructions = {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 405,
 stimulus_width: 720,
		on_start: function(trial){
			 trial.stimulus = 'instructions/Slide' + instruction_picker + '.png'
			pre_trials = 'stop'
			AbsoluteFrames = 10
			PointTotal = 0
		},
   	     on_finish: function(trial){
   	     instruction_picker = instruction_picker + 1
   	 }
    };	
	
	var Instructions = {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 405,
 stimulus_width: 720,
		on_start: function(trial){
			 trial.stimulus = 'instructions/Slide' + instruction_picker + '.png'
		},
   	     on_finish: function(trial){
   	     instruction_picker = instruction_picker + 1
   	 }
	}
	
    var online_frame = {
 type: 'canvas-keyboard-response',
		trial_duration: [],
 stimulus: [],
 stimulus_height: 600,
 stimulus_width: 0,
 choices: ['uparrow', 'downarrow'],
 prompt: '',
 on_start: function(trial){
	 SpaceBarMessage = 'Use the up or down arrows on the keyboard to make a choice'
     trial.stimulus_width = window.innerWidth
	 switch(true) {
	 case (AbsoluteFrames > 0):
		 var lasttimelinedata = jsPsych.currentTrial();
		  trial.stimulus = rw
	      trial.trial_duration = trial_time
		 switch(SNR){
		 case 'Mean10SD70': 
			TransformedDataS1 = Mean10SD70Actual.data[script_picker]
			 break;
		 case 'Mean05':
			TransformedDataS1 = Mean05Actual.data[script_picker]
			 break;
		 case 'mixed':	        
			 chosenSNRArray = shuffledSNRArray[SNR_Picker]
		 	switch(chosenSNRArray){
		 	 case 'Mean05': TransformedDataS1 = Mean05Actual.data[script_picker]
			 break;
		 	 case 'Mean7half': TransformedDataS1 = Mean7halfActual.data[script_picker]
			 break;
		 	 case 'Mean10': TransformedDataS1 = Mean10Actual.data[script_picker]
			 break;
		 	 case 'Mean15': TransformedDataS1 = Mean15Actual.data[script_picker]
			 break;
		 }
	 };
	 		switch(direction) {
	 		   case 38: TransformedDataS2 = TransformedDataS1.map(x=> 300 - x)
		 	   break;
	 		  case 40: TransformedDataS2 = TransformedDataS1.map(x=> 300 + x)
		 	  break;
	                          }	 
							  trial.data = TransformedDataS2	
							  break;
							  
						  case (AbsoluteFrames <= 0):
							  trial.data = 0 
 }
		},
 on_finish: function(trial){
	 var lasttimelinedata = jsPsych.currentTrial();
  ChoiceDirection = 'No Choice'
	 switch(true) {
     case (AbsoluteFrames >0):		 
  if(trial.key_press === 38) {
  	ChoiceDirection = 'Above'
	  BallVisible = false
	  trial_time = 0
	  CDcolor = 'red'
	  PointTotal += Penalty
	  jsPsych.endCurrentTimeline();
	  
	  
	  if(trial.key_press === 38 && direction === 38) {
		  PointTotal += PointBonus
		  CDcolor = 'blue'
		  jsPsych.endCurrentTimeline();
		  
	  }
  }
  if(trial.key_press === 40) {
  	ChoiceDirection = 'Below'
	  BallVisible = false
	  trial_time = 0
	  CDcolor = 'red'
	  PointTotal += Penalty
	  jsPsych.endCurrentTimeline();
	  
	  
  if(trial.key_press === 40 && direction === 40) {
	  PointTotal += PointBonus
	  CDcolor = 'blue'
	  jsPsych.endCurrentTimeline();
	  
  }

  }
  AbsoluteFrames += -1
  rw += 1
	  break;
  case (AbsoluteFrames <= 0):
	  jsPsych.endCurrentTimeline();
  }
  }

    }
	
    var Pre_frame = {
 type: 'canvas-keyboard-response',
 trial_duration: [],
 stimulus: [],
 stimulus_height: 600,
 stimulus_width: 0,
 choices: ['spacebar'],
 prompt: '',
 on_start: function(trial){
     trial.stimulus_width = window.innerWidth
	 switch(true) {
	 case (AbsoluteFrames > 0):
		 var lasttimelinedata = jsPsych.currentTrial();
		  trial.stimulus = rw
	        trial.trial_duration = trial_time
	
		 switch(SNR){
		 case 'Mean10SD70': 
			TransformedDataS1 = Mean10SD70Actual.data[script_picker]
			 break;
		 case 'Mean05':
			TransformedDataS1 = Mean05Actual.data[script_picker]
			 break;
		 case 'mixed':	        
			 chosenSNRArray = shuffledSNRArray[SNR_Picker]
		 	switch(chosenSNRArray){
		 	 case 'Mean05': TransformedDataS1 = Mean05Actual.data[script_picker]
			 break;
		 	 case 'Mean7half': TransformedDataS1 = Mean7halfActual.data[script_picker]
			 break;
		 	 case 'Mean10': TransformedDataS1 = Mean10Actual.data[script_picker]
			 break;
		 	 case 'Mean15': TransformedDataS1 = Mean15Actual.data[script_picker]
			 break;
		 }
	 };
	 		switch(direction) {
	 		   case 38: TransformedDataS2 = TransformedDataS1.map(x=> 300 - x)
		 	   break;
	 		  case 40: TransformedDataS2 = TransformedDataS1.map(x=> 300 + x)
		 	  break;
	                          }	 
							  trial.data = TransformedDataS2	
							  break;
							  
						  case (AbsoluteFrames <= 0):
							  trial.data = 0 
 }
		},
 on_finish: function(trial){
	 var lasttimelinedata = jsPsych.currentTrial();
	 switch(true) {
     case (AbsoluteFrames >0):	
		 	 
  ChoiceDirection = 'No Choice'
	     if(trial.key_press === 32) {
	     	ChoiceDirection = ''
	   	  BallVisible = false
	   	  trial_time = 0
	   	  CDcolor = 'No Choice'
	   	  jsPsych.endCurrentTimeline();
	  }
		   
	  if (TransformedDataS2[rw] < UpperChoiceThreshold) {
	  	ChoiceDirection = 'Above'
		  BallVisible = false
		  trial_time = 0
		  CDcolor = 'red'
	      PointTotal += Penalty
		  jsPsych.endCurrentTimeline();
	  
	  if (TransformedDataS2[rw] < UpperChoiceThreshold && direction === 38) {
		  PointTotal += PointBonus
		  CDcolor = 'blue'
		  jsPsych.endCurrentTimeline();
	  }} 
	  
	  if (TransformedDataS2[rw] > LowerChoiceThreshold) {
	  	ChoiceDirection = 'Below'
		  BallVisible = false
		  trial_time = 0
		  CDcolor = 'red'
	      PointTotal += Penalty
		  jsPsych.endCurrentTimeline();
	  
	  if (TransformedDataS2[rw] > LowerChoiceThreshold && direction === 40) {
		  PointTotal += PointBonus
		  CDcolor = 'blue'
		  jsPsych.endCurrentTimeline();
		  }} 
 
	 
  
  
  AbsoluteFrames += -1
  rw += 1
	  break;
  case (AbsoluteFrames <= 0):
	  jsPsych.endCurrentTimeline();
  }
  }
}
 var test_frame_int = {
 type: 'canvas-keyboard-response',
 stimulus: [],
 stimulus_height: 600,
 stimulus_width: 0,
 choices: ['spacebar'],
 prompt: '',
	 response_ends_trial: true,
		on_start: function(trial){
		SpaceBarMessage = 'Press Spacebar to continue'
	 switch(CDcolor) {
	   		 case 'blue': BottomBarMessage = `<em class = "correct">${ChoiceDirection}</em>`
	   		 break;
	   	     case 'red': BottomBarMessage = `<em class = "incorrect">${ChoiceDirection}</em>`
             break;
	 case 'No Choice': BottomBarMessage = '<em>No Choice Made!</em>'
	 }
			
     trial.stimulus_width = window.innerWidth
			trial.data = 0
			if(AbsoluteFrames <=0){
				trial.trial_duration = 0
	  		  jsPsych.endCurrentTimeline();
			}
		},
		on_finish: function(trial){
     SpaceBarMessage = 'Use the up or down arrows on the keyboard to make a choice'
			
			rw = 0
			script_picker = Math.floor(Math.random() * 998) + 1
			BallVisible = true
			trial_time = 500
			var myArray = [38,40];
			var shuffledArray = jsPsych.randomization.shuffle(myArray);
			direction = shuffledArray[0]
			timeleft = 10
            SNR_Picker = Math.floor(Math.random() * 4)
			AbsoluteFrames += PayToPlay
			
			
		}
	}
	
    var test_frame_int_pre = {
    type: 'canvas-keyboard-response',
    stimulus: [],
    stimulus_height: 600,
    stimulus_width: 0,
    choices: ['spacebar'],
    prompt: '',

   		on_start: function(trial){
		SpaceBarMessage = 'Use buttons to adjust threshold then press Spacebar to continue'
		 buttonappear = true
	   	 switch(CDcolor) {
	   		 case 'blue': BottomBarMessage = `<em class = "correct">${ChoiceDirection}</em>`
	   		 break;
	   	     case 'red': BottomBarMessage = `<em class = "incorrect">${ChoiceDirection}</em>`
	   		 break;
	   	 case 'No Choice': BottomBarMessage = '<em> No Response</em>'
	   	 }
			
	        trial.stimulus_width = window.innerWidth
	   			trial.data = 0
	   			if(AbsoluteFrames <=0){
	   				trial.trial_duration = 0
		  		  jsPsych.endCurrentTimeline();
					
	   			}
	   		},
	   		on_finish: function(trial){
			buttonappear = false
	        SpaceBarMessage = 'Press Spacebar to abort trial.'
			
	   			rw = 0
	   			script_picker = Math.floor(Math.random() * 998) + 1
	   			BallVisible = true
	   			trial_time = 500
	   			var myArray = [38,40];
	   			var shuffledArray = jsPsych.randomization.shuffle(myArray);
	   			direction = shuffledArray[0]
	   			timeleft = 10
	   			CDcolor = 'No Choice'
	            SNR_Picker = Math.floor(Math.random() * 4)
				AbsoluteFrames += PayToPlay
	   		}
   	}	
	
	
	var training_trial_start	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 405,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'instructions/Slide' + instruction_picker + '.png'
		},
		on_finish: function(trial){
			pre_trials = "stop"
			AbsoluteFrames = 100
            instruction_picker = instruction_picker + 1

            
		}
	}
    
	var training_trial_end	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 405,
 stimulus_width: 720,
		on_start: function(trial){
						trial.stimulus = 'instructions/Slide' + instruction_picker + '.png'
		},
		on_finish: function(trial){
            AbsoluteFrames = 10
			pre_trials = "start"
            instruction_picker = instruction_picker + 1

		}
	}
    
   	var BlockBuilder_A	= {
type: 'image-keyboard-response',
stimulus: '',
choices: ['spacebar'],
stimulus_height: 450,
stimulus_width: 720,
	on_start: function(trial){
		trial.stimulus = 'instructions/Slide' + instruction_picker + '.png'	},
	on_finish: function(trial){
        instruction_picker = instruction_picker + 1
		pre_trials = 'stop'
		AbsoluteFrames = 100
		PointTotal = 0
		Penalty = 0
		PointBonus = 1
		SNR = 'Mean10SD70'
		chosenSNRArray = 'Mean10SD70'
		BlockNumber = -1
	}
}	
	
   	var BlockBuilder_B	= {
type: 'image-keyboard-response',
stimulus: '',
choices: ['spacebar'],
stimulus_height: 450,
stimulus_width: 720,
	on_start: function(trial){
		trial.stimulus = 'instructions/Slide' + instruction_picker + '.png'	},
	on_finish: function(trial){
        instruction_picker = instruction_picker + 1
		pre_trials = 'start'
		AbsoluteFrames = 100
		PointTotal = 0
		Penalty = 0
		PointBonus = 1
		SNR = 'Mean10SD70'
		chosenSNRArray = 'Mean10SD70'
		BlockNumber = 0
	}
}	
	
    	var BlockBuilder_1	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'stop'
			AbsoluteFrames = 500
			PointTotal = 0
			Penalty = -1
			PointBonus = 2
			SNR = 'Mean10SD70'
			chosenSNRArray = 'Mean10SD70'
			BlockNumber = 1
		}
	}
	
	var BlockBuilder_2	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'start'
			AbsoluteFrames = 500
			PointTotal = 0
			Penalty = -1
			PointBonus = 2
			SNR = 'Mean10SD70'
			chosenSNRArray = 'Mean10SD70'
			BlockNumber = 2
		}
	}
	
	var BlockBuilder_3	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'stop'
			AbsoluteFrames = 500
			PointTotal = 0
			Penalty = -4
			PointBonus = 7
			SNR = 'Mean10SD70'
			chosenSNRArray = 'Mean10SD70'
			BlockNumber = 3
		}
	}
	
	var BlockBuilder_4	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'start'
			AbsoluteFrames = 500
			PointTotal = 0
			Penalty = -4
			PointBonus = 7
			SNR = 'Mean10SD70'
			chosenSNRArray = 'Mean10SD70'
			BlockNumber = 4
		}
	}
	
	var BlockBuilder_5	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'start'
			AbsoluteFrames = 100
			PointTotal = 0
			Penalty = 0
			PointBonus = 1
			SNR = 'Mean05'
			chosenSNRArray = 'Mean05'
			BlockNumber = 5
		}
	}
	
	var BlockBuilder_6	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'stop'
			AbsoluteFrames = 100
			PointTotal = 0
			Penalty = 0
			PointBonus = 1
			SNR = 'Mean05'
			chosenSNRArray = 'Mean05'
			BlockNumber = 6
		}
	}
	
	var BlockBuilder_7	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'start'
			AbsoluteFrames = 100
			PointTotal = 0
			Penalty = -1
			PointBonus = 2
			SNR = 'Mean05'
			chosenSNRArray = 'Mean05'
			BlockNumber = 7
		}
	}
	
	var BlockBuilder_8	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'stop'
			AbsoluteFrames = 100
			PointTotal = 0
			Penalty = -1
			PointBonus = 2
			SNR = 'Mean05'
			chosenSNRArray = 'Mean05'
			BlockNumber = 8
		}
	}
	
	var BlockBuilder_9	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'start'
			AbsoluteFrames = 350
			PointTotal = 0
			Penalty = 0
			PointBonus = 1
			SNR = 'mixed'
			BlockNumber = 9
		}
	}
	
	var BlockBuilder_10	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'stop'
			AbsoluteFrames = 350
			PointTotal = 0
			Penalty = 0
			PointBonus = 1
			SNR = 'mixed'
			BlockNumber = 10
		}
	}
	
	var BlockBuilder_11	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'start'
			AbsoluteFrames = 350
			PointTotal = 0
			Penalty = -1
			PointBonus = 2
			SNR = 'mixed'
			BlockNumber = 11
		}
	}
	
	var BlockBuilder_12	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'stop'
			AbsoluteFrames = 350
			PointTotal = 0
			Penalty = -1
			PointBonus = 2
			SNR = 'mixed'
			BlockNumber = 12
		}
	}
	
	var test_block = {
		timeline: [online_frame],
		repetitions: 30
	}
	var test_block_pre = {
		timeline: [Pre_frame],
		repetitions: 30
	}
	
	var test_frame_int_block = {
		timeline: [test_frame_int_pre],
		repetitions: 1
	}	
	
	var full_block = {
		timeline: [test_block, test_frame_int],
		repetitions: 500
	}

	var full_block_pre = {
		timeline: [test_block_pre, test_frame_int_pre],
		repetitions: 10
	}
		
	var FirstInstructions_block = {
		timeline: [FirstInstructions],
		repetitions: 20
	}

	
	

		 var pavlovia_finish = {
	      type: "pavlovia",
	      command: "finish"
	  };
      
      
  var consentdemo_block = {
      timeline: [consent, demographics, age, ProlificID],
      repetitions: 0}
	
        
            jsPsych.init({
  //timeline: [pavlovia_init, consentdemo_block, FirstInstructions_block, training_block_pre, training_block, Instructions,Instructions, BlockBuilder_1, test_frame_int_pre, full_block_pre, BlockBuilder_2, Instructions, full_block, BlockBuilder_3,Instructions, test_frame_int_pre, full_block_pre, BlockBuilder_4, pavlovia_finish],
  timeline: [pavlovia_init, consentdemo_block, FirstInstructions_block, BlockBuilder_A, full_block, BlockBuilder_B, test_frame_int_pre, full_block_pre, Instructions,Instructions, BlockBuilder_1, full_block, BlockBuilder_2, Instructions, test_frame_int_pre, full_block_pre, BlockBuilder_3,Instructions, full_block, Instructions, BlockBuilder_4, test_frame_int_pre, full_block_pre, pavlovia_finish], 
				 

		on_data_update: function(data){
			jsPsych.data.get().addToLast({Direction: direction})
			jsPsych.data.get().addToLast({CorrectChoice: CDcolor})
			jsPsych.data.get().addToLast({UpperChoiceThreshold: UpperChoiceThreshold})
			jsPsych.data.get().addToLast({LowerChoiceThreshold: LowerChoiceThreshold})
			jsPsych.data.get().addToLast({ChosenSNRArray: chosenSNRArray})
			jsPsych.data.get().addToLast({BlockNumber: BlockNumber})
			jsPsych.data.get().addToLast({PointTotal: PointTotal})
			jsPsych.data.get().addToLast({SeedPenalty: Penalty})
			jsPsych.data.get().addToLast({StepPayToPlay: PayToPlay})
            jsPsych.data.get().addToLast({Steps: AbsoluteFrames})

			
		},
 preload: [Mean10SD70Data, Mean05Data,Mean7halfData,Mean10Data,Mean15Data],
		default_iti: 0,
		    	  on_finish: function() {	          document.body.innerHTML = '<p> Please wait. Data is being uploaded. Please do not close the browser window or your data may be lost. You will be redirected back to Prolific in 3 seconds.</p>'
	          setTimeout(function () { location.href = prolific_href }, 3000) } 
	})



