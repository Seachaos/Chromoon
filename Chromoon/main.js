chromoon.packageName = 'test_example';

chromoon.setState({
	popValue : 'HereIsPOP'
});

chromoon.onPopReady(function(chromoon){
	
	$('#btn').click(function(){
		chromoon.setState({
			formPop : '123321'
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
