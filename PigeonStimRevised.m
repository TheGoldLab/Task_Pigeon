MaxTrialAmount = 39;
ScriptAmounts = 1000;

GeneratedStim = normrnd(5, 25, MaxTrialAmount,ScriptAmounts);
GeneratedStimCS = cumsum(GeneratedStim); 
GeneratedStimCS = round(GeneratedStimCS)';
GeneratedStimCS = [zeros(size(GeneratedStimCS,1),1) GeneratedStimCS];
tablenorm = array2table(GeneratedStimCS);
writetable(tablenorm,'Mean05.csv');

GeneratedStim = normrnd(7.5, 25, MaxTrialAmount,ScriptAmounts);
GeneratedStimCS = cumsum(GeneratedStim); 
GeneratedStimCS = round(GeneratedStimCS)';
GeneratedStimCS = [zeros(size(GeneratedStimCS,1),1) GeneratedStimCS];
tablenorm = array2table(GeneratedStimCS);
writetable(tablenorm,'Mean7half.csv');

GeneratedStim = normrnd(10, 25, MaxTrialAmount,ScriptAmounts);
GeneratedStimCS = cumsum(GeneratedStim); 
GeneratedStimCS = round(GeneratedStimCS)';
GeneratedStimCS = [zeros(size(GeneratedStimCS,1),1) GeneratedStimCS];
tablenorm = array2table(GeneratedStimCS);
writetable(tablenorm,'Mean10.csv');

GeneratedStim = normrnd(15, 25, MaxTrialAmount,ScriptAmounts);
GeneratedStimCS = cumsum(GeneratedStim);
GeneratedStimCS = round(GeneratedStimCS)';
GeneratedStimCS = [zeros(size(GeneratedStimCS,1),1) GeneratedStimCS];
tablenorm = array2table(GeneratedStimCS);
writetable(tablenorm,'Mean15.csv');


GeneratedStim = normrnd(10, 70, MaxTrialAmount,ScriptAmounts);
GeneratedStimCS = cumsum(GeneratedStim);
GeneratedStimCS = round(GeneratedStimCS)';
GeneratedStimCS = [zeros(size(GeneratedStimCS,1),1) GeneratedStimCS];
tablenorm = array2table(GeneratedStimCS);
writetable(tablenorm,'Mean10SD70.csv');