let interval = null

chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === 'local' && 'skipAdEnabled' in changes) {
        if(changes.skipAdEnabled.newValue){
            console.log('active')
            interval = setInterval( () => {
                document.querySelector(".ytp-skip-ad-button") && document.querySelector(".ytp-skip-ad-button").click()
            } , 100)
        }else{
            console.log('inactive')
            clearInterval(interval)
            interval = null
        }
    }
});

