/* global jQuery */

jQuery(($) => {
    const formC = $('#form-contact')
    const _config = {
        form: formC,
        formBtn: $('#form-contact').find('.button'),
        formURL: $('#form-contact').attr('action'),
        formMethod: $('#form-contact').attr('method')
    }

    _config.form.submit((e) => {
        e.preventDefault()
        $.ajax({
            url: _config.formURL,
            method: _config.formMethod,
            data: formC.serialize(),
            dataType: 'json',
            beforeSend() {
                _config.formBtn
                    .addClass('disabled')
                    .attr('value', 'Sending...')
            },
            success(data) {
                _config.form.find('.form__group').hide()
                _config.form.find('.alert--success').removeClass('hide')
                _config.formBtn.removeClass('disabled')
            },
            error(err) {
                _config.form.find('.alert--danger').removeClass('hide')
                _config.formBtn
                    .removeClass('disabled')
                    .attr('value', 'Send')
            }
        })
    })
})
