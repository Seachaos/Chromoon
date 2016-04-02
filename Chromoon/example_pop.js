/*
The MIT License (MIT)
Copyright (c) 2016 Seachaos
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

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
		chromoon.notify('XD'); return;
		chromoon.onPageExec(function(chromoon){
			alert('here is call by pop!');
			console.log(chromoon.state);
		})
	});

	$('#notify_example').click(function(){
		chromoon.notify({
			title : 'Title',
			msg : 'here is example message',
			icon : 'images/ic_info_black_24dp_2x.png',
			click : function(notify){
				notify.close();
			}
		});
	})
	$('#notify_example_from_page').click(function(){
		chromoon.setState(
			{ action: 'show_notfiy_on_page' }
		);
	})
});

chromoon.onStateChange(function(chromoon, state){
	console.log('STATE CHANGE!');
	console.log(state);
});

chromoon.onStateChangeFromListener(function(chromoon, state){
	console.log('STATE CHANGE FROM LISTENER!');
	console.log(state);
});


/**********************/
chromoon.onPageLoadScript(['example_page.js']);
chromoon.onPageFinished(function(chromoon){
	// this code is run on font page, using chromoon.setState for return data
	console.log('page finished. from pop');
	example_script_on_page_call();
});