chromoon.packageName = 'test_example';

chromoon.setState({
	popValue : 'HereIsPOP'
});

chromoon.onPopReady(function(chromoon){
	
	$('#test_state_change').click(function(){
		chromoon.setState({
			formPop : 'test_state_change'
		})
	});

	$('#show_alert_on_page').click(function(){
		chromoon.onPageExec(function(chromoon){
			alert('here is call by pop!');
			console.log(chromoon.state);
		})
	});
});

chromoon.onStateChange(function(chromoon, state){
	console.log('STATE CHANGE!');
	console.log(state);
});

chromoon.onStateChangeFromListener(function(chromoon, state){
	console.log('STATE CHANGE FROM LISTENER!');
	console.log(state);
});

chromoon.onPageFinished(function(chromoon){
	// this code is run on font, using chromoon.setState for return data
	console.log('page finished. from pop');
});