document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('toggle-skip-ad');
    const checkboxRemote = document.getElementById('toggle-remove-remote');

    // Cargar el estado del checkbox desde el almacenamiento local
    chrome.storage.local.get(['skipAdEnabled', 'removeButtonRemote'], function(result) {
        checkbox.checked = result.skipAdEnabled || false;
        checkboxRemote.checked = result.removeButtonRemote || false;

    });

    // Guardar el estado del checkbox cuando cambia
    checkbox.addEventListener('change', function() {
        chrome.storage.local.set({skipAdEnabled: checkbox.checked});
    });
    checkboxRemote.addEventListener('change', function() {
        chrome.storage.local.set({removeButtonRemote: checkboxRemote.checked});
    });
});