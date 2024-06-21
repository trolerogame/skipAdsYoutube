let intervalSkipAd = null
let intervalVideoAd = null
let isRemoteButton = false
const config = { attributes: true, childList: true, subtree: true };


const $ = (el) => document.querySelector(el)

// SKIPS ADS

const skipAds = () => {
    $('ytp-ad-skip-button-modern') && $('ytp-ad-skip-button-modern').click()
    $(".ytp-skip-ad-button") && $(".ytp-skip-ad-button").click()
}

const removeButtonRemote = (remove = true) => {
    isRemoteButton = remove
    if($('.ytp-remote-button')){
        setTimeout(() => {
            $('.ytp-remote-button').style.display = remove ? 'none' : 'inline-block'
        }, 1000)
    }

}

const destroyInterval = () => {
    clearInterval(intervalSkipAd)
    intervalSkipAd = null
    clearInterval(intervalVideoAd)
    intervalVideoAd = null
}

const addObserve = (removeButton) => {
    observeVideoAd.observe($('.video-ads'), config)
    destroyInterval()
    removeButton && removeButtonRemote()
}

const addInterval = (removeButton) => {
    intervalSkipAd = setInterval(skipAds, 100)
    intervalVideoAd = setInterval(() => {
        $('.video-ads') && addObserve(removeButton)
    }, 100)
}


const callbackObserve = () => {
    skipAds()
}

const observeVideoAd = new MutationObserver(callbackObserve)




chrome.storage.local.get(['skipAdEnabled', 'removeButtonRemote'], function(result) {
    destroyInterval()
    observeVideoAd.disconnect()
    console.log('start')
    const isChecked = result.skipAdEnabled || false
    if(isChecked && intervalSkipAd == null){
        console.log('active') 
        addInterval(result.removeButtonRemote) 
    }
    if(result.removeButtonRemote){
        removeButtonRemote()
    }
});


chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === 'local' && 'skipAdEnabled' && 'removeButtonRemote' in changes) {
        if(changes.skipAdEnabled){
            if(changes.skipAdEnabled.newValue){
                console.log('active')
                addInterval()
            }else{
                console.log('inactive')
                removeButtonRemote(false)
                destroyInterval()
                observeVideoAd.disconnect()
            }
        }
        if(changes.removeButtonRemote){
            if(changes.removeButtonRemote.newValue){
                removeButtonRemote()
            }else{
                removeButtonRemote(false)
            }
        }
    }
});

