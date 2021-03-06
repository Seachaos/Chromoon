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

// EXAMPLE Background JS
chromoon.packageName = 'test_example';

chromoon.setState({
	value_from_bg : 'Hi'
});

chromoon.onStateChange(function(chromoon, state){
	console.log('STATE CHANGE!');
	console.log(state);
});

chromoon.onStateChangeFromListener(function(chromoon, state){
	console.log('STATE CHANGE FROM LISTENER!');
	console.log(state);


	// demo for receve action
	switch(state.action){
		case 'show_notfiy_on_page':
			chromoon.notify('Here is notify from example_bg.js');
			// clear action
			chromoon.setState({action : 'none' });
			break;
	}
});

/**********************/
chromoon.onPageLoadScript(['example_page.js']);
chromoon.onPageFinished(function(chromoon){
	// this code is run on font, using chromoon.setState for return data
	console.log('page finished. from bg');
});
