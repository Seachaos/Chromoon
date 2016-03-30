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
	this.packageName = window._chromoon_packageName;
	window._chromoon_packageName = null;
	window._chromoon = window._chromoon || [];
	window._chromoon[this.packageName] = this;
	this.state = {};	
}
window._Chromoon_setState = function(packageName, data){
	if(!window._chromoon){ return; }
	var chromoon = window._chromoon[packageName];
	if(!chromoon){ return; }
	chromoon.setState(data);
}

Chromoon.prototype.setState = function(arg){
	this.state = arg;
}

var chromoon = new Chromoon();


// chrome.runtime.sendMessage(arg);