/#{
	"category" : "Common API",
	"name" : "onPageExec"
}#/
## chromoon.onPageExec(function)
此API為執行function於Page上

範例：  

		chromoon.onPageExec(function(chromoon){
			alert('here is call by pop!');
		})

於background或是pop使用，會alert一個文字在page上


/#{
	"name" : "onPageLoadScript"
}#/
## chromoon.onPageLoadScript
將Script載入到Page上  
使用時機大多於Background或是Pop  
範例(於example_bg.js)：  

		chromoon.onPageLoadScript(['example_page.js']);
		chromoon.onPageFinished(function(chromoon){
			example_script_on_page_call();
		});

其中example_page.js有下列function：

		function example_script_on_page_call(){
			console.log('here is:example_script_on_page_call');
		}

所以可以透過此方式在background中呼叫到預先寫好的JavaScript


