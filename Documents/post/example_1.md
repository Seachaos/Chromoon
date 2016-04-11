/#{
	"category" : "Example",
	"name" : "Show Alert From Pop"
}#/
## Show Alert From Pop to Page


範例 (example_pop.js)：

		chromoon.onPopReady(function(chromoon){
			chromoon.onPageExec(function(){
				alert('Here is Alert');
			});
		});


chromoon.onPopReady 會在pop 載入完成時觸發(類似jQuery的ready)  

chromoon.onPageExec 會將function中的內容在page中執行  
注意：此方法是執行於Page中，所以Pop上的所有Javascript和其無關，如果有變數要傳遞，可以使用 setState 方法