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

function onfound_h1(h1_array){
	var content = "";
	for(i in h1_array){
		content += h1_array[i] + "\n";
		console.log('H1:' + h1_array[i]);
	}
	chromoon.notify(content);
}

function modify_page_h1(){
	chromoon.onPageExec(function(){
		// this is run on page
		$('h1').text('Modify by Chromoon');
	});
}

chromoon.onPopReady(function(chromoon){
	$('#get_page_h1').click(function(){
		chromoon.setState({
			action : 'get_h1'
		})
	});
	$('#modify_page_h1').click(function(){
		modify_page_h1();
	});
});

chromoon.onStateChangeFromListener(function(chromoon, state){
	switch(state.action){
		case 'found_h1':
			onfound_h1(state.h1_array);
			chromoon.setState({action:'none'});
			break;
	}
});
