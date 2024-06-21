let intervalSkipAd = null
let intervalVideoAd = null
let intervalRemoveButtonRemote = null
let isRemoteButton = false
const config = { attributes: true, childList: true, subtree: true };


const $ = (el) => document.querySelector(el)

// SKIPS ADS

const skipAds = () => {
    $('ytp-ad-skip-button-modern') && $('ytp-ad-skip-button-modern').click()
    $(".ytp-skip-ad-button") && $(".ytp-skip-ad-button").click()
}


const destroyInterval = () => {
    clearInterval(intervalSkipAd)
    intervalSkipAd = null
    clearInterval(intervalVideoAd)
    intervalVideoAd = null
}

const addObserve = () => {
    observeVideoAd.observe($('.video-ads'), config)
    destroyInterval()
}

const addInterval = () => {
    intervalSkipAd = setInterval(skipAds, 100)
    intervalVideoAd = setInterval(() => {
        $('.video-ads') && addObserve()
    }, 100)
}


const callbackObserve = () => {
    skipAds()
}

const observeVideoAd = new MutationObserver(callbackObserve)


// remove button

const addIntervalRemoveButtonRemote = () => {
    intervalRemoveButtonRemote = setInterval(() => {
        if($('.ytp-remote-button')){
            $('.ytp-remote-button').style.display = 'none'
        }
    }, 1000)
}
const destroyIntervalRemoveButtonRemote = () => {
    clearInterval(intervalRemoveButtonRemote)
    intervalRemoveButtonRemote = null
    if($('.ytp-remote-button')){
        $('.ytp-remote-button').style.display = 'inline-block'
    }
}



chrome.storage.local.get(['skipAdEnabled', 'removeButtonRemote'], function(result) {
    destroyInterval()
    observeVideoAd.disconnect()
    console.log('start')
    const isChecked = result.skipAdEnabled || false
    const isCheckedRemote = result.removeButtonRemote || false
    if(isChecked && intervalSkipAd == null){
        console.log('active skip ad') 
        addInterval() 
    }
    if(isCheckedRemote && intervalRemoveButtonRemote == null){
        console.log('active remove button remote') 
        addIntervalRemoveButtonRemote()
    }
});


chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === 'local' && 'skipAdEnabled' && 'removeButtonRemote' in changes) {
        if(changes.skipAdEnabled){
            if(changes.skipAdEnabled.newValue){
                console.log('active skip ad') 
                addInterval()
            }else{
                console.log('inactive skip ad') 
                removeButtonRemote(false)
                destroyInterval()
                observeVideoAd.disconnect()
            }
        }
        if(changes.removeButtonRemote){
            if(changes.removeButtonRemote.newValue){
                console.log('active remove button remote') 
                addIntervalRemoveButtonRemote()
            }else{
                console.log('inactive remove button remote') 
                destroyIntervalRemoveButtonRemote()

            }
        }
    }
});

