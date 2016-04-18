/#{
	"category" : "Example",
	"name" : "File H1 and edit in page",
	"file_name" : "example_2_get_h1"
}#/

# Example Get H1 介紹

本範例程式可以從 [GitHub上取得](https://github.com/Seachaos/Chromoon/tree/example_get_h1/Chromoon)  
(https://github.com/Seachaos/Chromoon/tree/example_get_h1/Chromoon)   
主要有三個部份  

* example_bg.js
* example_pop.js
* example_page.js

主要是示範如何取得使用者正在觀看的頁面(page)上所有h1 tag與修改內容

## example_bg.js
此為背景執行的JS，在此範例中負責在Page載入頁面完成時掛載上我們的 example_page.js

		chromoon.onPageLoadScript(['example_page.js']);
		chromoon.onPageFinished(function(chromoon){
			// this code is run on font, using chromoon.setState for return data
		});


## example_pop.js
此為Chrome plugin彈出對話框的JS部份  
以下程式碼是在Pop準備好時註冊click事件  


		chromoon.onPopReady(function(chromoon){
			$('#get_page_h1').click(function(){
				chromoon.setState({ // note1
					action : 'get_h1'
				})
			});
			$('#modify_page_h1').click(function(){
				modify_page_h1();  // note2
			});
		});

note1： 透過 setState 的方式來通知page要執行事件  
note2： 執行修改page上h1的方法，內容如下  

		function modify_page_h1(){
			chromoon.onPageExec(function(){
				// 此部份JS是執行在JS上的，和pop無關
				$('h1').text('Modify by Chromoon');
			});
		}

另外因為note1部份，會需要等待page回報結果，所以也有以下程式碥

		// 監聽從其他頁面 setState 來的變化
		chromoon.onStateChangeFromListener(function(chromoon, state){
			switch(state.action){ // 從 action來判定動作
				case 'found_h1':
					onfound_h1(state.h1_array); // 顯示出page回報的h1_array  
					chromoon.setState({action:'none'}); // 將 action 重置 (避免重複觸發)
					break;
			}
		});

onfound_h1 是顯示資料用

		function onfound_h1(h1_array){
			var content = "";
			for(i in h1_array){
				content += h1_array[i] + "\n";
				console.log('H1:' + h1_array[i]);
			}
			chromoon.notify(content);
		}



## example_page.js
此為頁面上所執行的JS

		chromoon.onStateChangeFromListener(function(chromoon, state){
			switch(state.action){
				case 'get_h1': // 監聽送來的action, 如果是 get_h1就執行 get_page_h1();
					get_page_h1();
					break;
			}
		});

get\_page\_h1 部份：

		function get_page_h1(){
			var array = [];
			// 使用 JQuery來取得所有h1 tag的內文
			$('h1').each(function(){
				array.push($(this).text());
			});
			// 將事件與資料送至state, 這邊會呼叫其他的 onStateChangeFromListener
			chromoon.setState({action:'found_h1', h1_array:array});
		}










