let interval = null

chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === 'local' && 'skipAdEnabled' in changes) {
        if(changes.skipAdEnabled.newValue){
            interval = setInterval( () => {
                document.querySelector(".ytp-skip-ad-button") && document.querySelector(".ytp-skip-ad-button").click()
            } , 100)
        }else{
            clearInterval(interval)
            interval = null
        }
    }
});

