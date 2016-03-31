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


/*
TODO : 

page data can sent back to bg.
popup and bg sharedata.
*/
function Chromoon(){
	this.callback_onPageFinished = false;
	this.state = {};
	this.packageName = 'none';
	_chromoonarray = window._chromoon || [];
	_chromoonarray.push(this);
	window._chromoon = _chromoonarray;
};

// comm
function _Chromoon_check_tab(tab){
	if(tab.id==-1){ return false; }
	if(tab.url.indexOf('http')==-1){ return false; }
	if(!tab.active){ return false; }
	return true;
}

Chromoon.prototype.main = function(){

}

Chromoon.prototype.onPageComplete =  function (){
	// if has page finish callback, call it
	if(this.callback_onPageFinished){
		this._runMethodOnPage(this.callback_onPageFinished);
	}
}

Chromoon.prototype.onPageExec = function(arg){
	this._runMethodOnPage(arg);
}

Chromoon.prototype.onPopExec = function(arg){

}

Chromoon.prototype._runMethodOnPage = function(page_method){
	var me = this;
	var packageName = me.packageName;
	chrome.tabs.getSelected(null, function(tab) {
		if(!_Chromoon_check_tab(tab)){ return; }
		me._sendStateToPage(me.state, function(){
			// warp method
			var callback_obj = "window._chromoon[\""+packageName+"\"]";
			var code = "(" + page_method.toString() + page_method.name + "(" + callback_obj+ "))";
			chrome.tabs.executeScript(tab.id, {
				code : code
			}, function(){

			});
		});
	});
}

Chromoon.prototype.setState = function(newState){
	this._megerState(newState);
	// send state to Pop
	this._sendDataToChromeMessage('_set_data_for_pop', this.state);
	// send state to page
	this._sendStateToPage(this.state);
	// on state change
	this._onStateChange();
}

Chromoon.prototype._megerState = function(newState){
	for(i in newState){
		this.state[i] = newState[i];
	}
}

// comm
Chromoon.prototype._onStateChange = function(){
	if(this._onStateChange_arg){
		this._onStateChange_arg(this, this.state);
	}
}
// comm
Chromoon.prototype.onStateChange = function(arg){
	this._onStateChange_arg = arg;
}
// comm
Chromoon.prototype.onStateChangeFromListener = function(arg){
	this._onStateChangeFromListener = arg;
}
// comm
Chromoon.prototype._sendDataToChromeMessage = function(action, data){
	chrome.runtime.sendMessage({
        action: action,
        source: data
    });
}

// comm
Chromoon.prototype._sendStateToPage = function(state, callback){
	var packageName = this.packageName;
	var me = this;
	chrome.tabs.getSelected(null, function(tab) {
		if(!_Chromoon_check_tab(tab)){ return; }
		var code = JSON.stringify(state);
		code = 'window._Chromoon_setState("'+packageName+'",'+code+')';
		chrome.tabs.executeScript(tab.id, {
			code : code
		}, function(){
			if(callback){
				callback.bind(me)();
			}
		});
	});
}

// comm
Chromoon.prototype.pageExecuteScript = function(arg, callback){
	var index = 0;
	var me = this;
	var run = function(tab){
		if(!_Chromoon_check_tab(tab)){ return; }
		var _arg = arg[index++];
		if(_arg){
			chrome.tabs.executeScript(tab.id, _arg, function(){
				run.bind(me)(tab);
			});
		}else{
			if(callback){
				callback.bind(me)();
			}
		}
	};
	chrome.tabs.getSelected(null, function(tab) {
		if(!_Chromoon_check_tab(tab)){ return; }
		run.bind(me)(tab);
	});
};
// comm
Chromoon.prototype._loadHelperOnPage = function(){
	this.pageExecuteScript([
		{ code : 'window._chromoon_packageName="'+this.packageName+'"' },
		{ file : 'chromoonframework/jquery.js' },
		{ file : 'chromoonframework/pagehelper.js' }
	], function(){
		this.onPageComplete();
	});
}
// comm
Chromoon.prototype.onPageFinished = function(arg){
	this.callback_onPageFinished = arg;
}

Chromoon.prototype._onMessage = function(request, sender) {
	switch(request.action){
		case '_set_data_for_bg':
			this._megerState(request.source);
			this._onStateChange();
			if(this._onStateChangeFromListener){ this._onStateChangeFromListener(this, this.state); };
			break;
	}
}

var chromoon = new Chromoon();

// comm
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	for(i in window._chromoon){
		var _chromoon = window._chromoon[i];
		if (changeInfo.status == 'complete') {
			_chromoon._loadHelperOnPage();
		}
	}
});
chrome.runtime.onMessage.addListener(function(request, sender) {
	chromoon._onMessage(request, sender);
});

