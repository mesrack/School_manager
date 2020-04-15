
window.onload = function() {
    var modal = new RModal(
        document.getElementById('modal')
        , options // See "Options" below details
    );

    document.addEventListener('keydown', function(ev) {
        modal.keydown(ev);
    }, false);

    document.getElementById('showModal')
    .addEventListener("click", function(ev) {
        ev.preventDefault();
        modal.open();
    }, false);

    window.modal = modal;
}