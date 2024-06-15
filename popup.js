document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('toggle-skip-ad');

    // Cargar el estado del checkbox desde el almacenamiento local
    chrome.storage.local.get(['skipAdEnabled'], function(result) {
        checkbox.checked = result.skipAdEnabled || false;
    });

    // Guardar el estado del checkbox cuando cambia
    checkbox.addEventListener('change', function() {
        chrome.storage.local.set({skipAdEnabled: checkbox.checked});
    });
});