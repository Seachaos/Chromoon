/#{
	"category" : "Pop API",
	"name" : "onPopReady"
}#/
## chromoon.onPopReady(function)
當pop頁面準備完成會觸發此function，類似jQuery的$(document).ready

範例  

		chromoon.onPopReady(function(chromoon){
		
			$('#test_state_change').click(function(){
				alert(...)
			});


