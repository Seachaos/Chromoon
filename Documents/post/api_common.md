/#{
	"category" : "Common API",
	"name" : "onPageExec",
	"escape_html" : true
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


/#{
	"name" : "onStateChangeFromListener"
}#/
## chromoon.onStateChangeFromListener(function)
當state有改變(需使用setState) 時會觸發此function，在當前的頁面呼叫setState並不會觸發此function  
例如在background.js上呼叫setState，不會觸發background.js，但是會觸發 page和 pop上的此事件  
 

範例 pop.js

		chromoon.setState({
			popValue : 'HereIsPOP'
		});

範例 page.js 

		// 由其他頁面的setState觸發
		chromoon.onStateChangeFromListener(function(chromoon, state){
			console.log('STATE CHANGE FROM LISTENER ON PAGE!');
			console.log(state); // 有來自於page.js 的 popValue
			chromoon.setState({
				// 由此通知其他頁面
				FromPageValue : 'Good'
			});
		});

/#{
	"name" : "notify"
}#/
## chromoon.notify(msg, opt)  
顯示Chrome的通知訊息，此功能目前於page上無效，但可以作用於background與pop

範例：

		chromoon.notify('Here is notify from example_bg.js');


範例：

		chromoon.notify({
			title : 'Title',
			msg : 'here is example message',
			icon : 'images/ic_info_black_24dp_2x.png',
			click : function(notify){
				notify.close();
			}
		});



/#{
	"name" : "domWatch"
}#/
## chromoon.domWatch(dom, function)
監視DOM是否有變更  
如果有異動就會觸發function  

範例：  

		chromoon.domWatch($('body'), function(){
			alert('Body has change!')
		}



/#{
	"name" : "domTriggerChange"
}#/
## chromoon.domTriggerChange(dom)
觸發DOM原生的change事件  
例如 <input onchange="..." />  
就會觸發 onchange事件  







