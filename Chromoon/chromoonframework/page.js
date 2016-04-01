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

function Chromoon(){
	/* if need package name */
	// this.packageName = window._chromoon_packageName;
	// window._chromoon_packageName = null;
	// window._chromoon = window._chromoon || [];
	// window._chromoon[this.packageName] = this;

	this.packageName = 'none';
	this.state = {};
}

window._Chromoon_setState = function(packageName, data){
	/* if need package name */
	// if(!window._chromoon){ return; }
	// var chromoon = window._chromoon[packageName];
	// if(!chromoon){ return; }
	chromoon = window._chromoon;
	chromoon._megerState(data);
	chromoon._onStateChange();
	if(chromoon._onStateChangeFromListener){
		chromoon._onStateChangeFromListener(chromoon, chromoon.state);
	};
}

Chromoon.prototype.setState = function(newState){
	console.log('Chromoon.prototype.setState');
	this._megerState(newState);
	// send state to Pop
	this._sendDataToChromeMessage('_set_data_for_pop', this.state);
	this._sendDataToChromeMessage('_set_data_for_bg', this.state);
	// on state change
	this._onStateChange();
}

var chromoon = chromoon || new Chromoon();
window._chromoon = chromoon;


// chrome.runtime.sendMessage(arg);