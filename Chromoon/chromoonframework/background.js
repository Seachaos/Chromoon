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

let bg call page and pass data.
page data can sent back to bg.
popup and bg sharedata.
*/
function Chromoon(){
	this.callback_onPageFinished = false;
	window._chromoon = this;
};

Chromoon.prototype.main = function(){

}

Chromoon.prototype.onPageComplete =  function (tabId, changeInfo, tab){
	// if has page finish callback, call it
	if(this.callback_onPageFinished){
		this._runMethodOnPage(this.callback_onPageFinished);
	}
}

Chromoon.prototype._runMethodOnPage = function(page_method){
	chrome.tabs.getSelected(null, function(tab) {
		// warp method
		var code = "(" + page_method.toString() + page_method.name + "(window._chromoon_font))";
		console.log(code);
		chrome.tabs.executeScript(tab.id, {
			code : code
		}, function(){

		});
	});
}

Chromoon.prototype._loadHelperOnPage = function(){
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.executeScript(tab.id, {
			file : 'chromoonframework/pagehelper.js'
		}, function(){
		});
	});
}

Chromoon.onPageFinished = function(callback_onPageFinished){
	window._chromoon.callback_onPageFinished = callback_onPageFinished;
}

new Chromoon();
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	var _chromoon = window._chromoon;
	if (changeInfo.status == 'complete') {
		_chromoon._loadHelperOnPage();
		_chromoon.onPageComplete(tabId, changeInfo, tab);
	}
});
document.addEventListener('DOMContentLoaded', function () {
    
})

