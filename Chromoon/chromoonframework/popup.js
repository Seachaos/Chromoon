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
	this._onPopReady = false;
	this.packageName = 'none';
	this.state = {};
	this._chromoonLoadReady = function(){
		this._sendDataToChromeMessage('_give_me_state_for_pop', {});
	};
};

Chromoon.prototype._domContentLoaded = function(){
	if(this._onPopReady){
		this._onPopReady(chromoon);
	}
	this.onPageComplete();
}
Chromoon.prototype.onPopReady = function(arg){
	this._onPopReady = arg;
}

Chromoon.prototype.setState = function(newState){
	this._mergeState(newState);
	// send state to Pop
	this._sendDataToChromeMessage('_set_data_for_bg', this.state);
	// send state to page
	this._sendStateToPage(this.state);
	// on state change
	this._onStateChange();
}

Chromoon.prototype._onMessage = function(request, sender) {
	switch(request.action){
		case '_set_data_for_pop':
			this._mergeState(request.source);
			this._onStateChange();
			if(this._onStateChangeFromListener){ this._onStateChangeFromListener(this, this.state); };
			break;
		case '_page_complete':
			this.onPageComplete();
			break;
	}
}

var chromoon = chromoon || new Chromoon();


document.addEventListener('DOMContentLoaded', function () {
	chromoon._domContentLoaded();
})
