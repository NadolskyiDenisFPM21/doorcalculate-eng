

function isStringInOptions(selectId, searchString) {
    var selectElement = $(selectId);
    var options = selectElement.children();

    for (var i = 0; i < options.length; i++) {
        if (options[i].text.includes(searchString)) {
            return true; // Найдено совпадение
        }
    }

    return false; // Совпадение не найдено
}


export function attachChangeEvent() {
    //change width
    $('.get_filtered_data').change(function (e) {
        if ($(this).attr('id') == 'select-model') {
            $('#select-frame').empty();
            $('#select-frame').append($('<option value="" disabled selected>Frame type</option>'));
            $('#select-width').empty();
            $('#select-width').append($('<option value="" disabled selected>Width mm</option>'));
        }
        var selectedModel = $('#select-model').val();
        var selectedFrame = $('#select-frame').val();
        var selectedWidth = $('#select-width').val();
        $.ajax({
            url: '/get_filtered_data/',
            data: {
                'selected_model': selectedModel,
                'selected_frame': selectedFrame,
                'selected_width': selectedWidth,
            },
            dataType: "json",
            success: function (data) {
                var keys = Object.keys(data[0]);
                if ('height' == keys[0]) {
                    $('#select-height').empty();
                    $('#select-height').append($('<option value="" disabled selected>Height mm</option>'));
                    $.each(data, function (index, item) {
                        if (!isStringInOptions('#select-height', item.height)) {
                            $('#select-height').append('<option value="' + item.height + '">' + item.height + '</option>');
                        }
                    });
                    return;
                }

                if ('width' == keys[0]) {
                    $('#select-width').empty();
                    $('#select-width').append($('<option value="" disabled selected>Width mm</option>'));
                    $('#select-opening-2').empty();
                    $('#select-opening-2').append($('<option value="" disabled selected>Opening</option>'));
                    $.each(data, function (index, item) {
                        if (!isStringInOptions('#select-width', item.width)) {
                            $('#select-width').append('<option value="' + item.width + '">' + item.width + '</option>');
                        }
                        $.each(item.opening_type2, function (j, jvalue) {
                            var t = jvalue == 'External' ? 'External' : 'Internal';
                            if (!isStringInOptions('#select-opening-2', t)) {
                                $('#select-opening-2').append('<option value="' + jvalue + '">' + t + '</option>');
                            }
                        });
                    });
                    return;
                }

                if ('frame' == keys[0]) {
                    $('#select-frame').empty();
                    $('#select-frame').append($('<option value="" disabled selected>Frame type</option>'));
                    $.each(data, function (index, item) {
                        if (!isStringInOptions('#select-frame', item.frame)) {
                            $('#select-frame').append('<option value="' + item.frame + '">' + item.frame + '</option>');
                        }
                    });
                    return;
                }

            }
        });
    });

}



$(document).ready(function () {
    attachChangeEvent();
});
