
export function getCookie(cookieName) {
    // Разделяем все cookie по точке с запятой в массив
    const cookies = document.cookie.split(';');

    // Ищем cookie с заданным именем
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();

        // Проверяем, начинается ли cookie с искомого имени
        if (cookie.startsWith(cookieName + '=')) {
            // Если да, возвращаем значение cookie
            return cookie.substring(cookieName.length + 1);
        }
    }

    // Если cookie с указанным именем не найдено, возвращаем null
    return null;
}

function getKilobyteSize(str) {
    // Переводим строку в байты, учитывая кодировку UTF-8
    var byteSize = new TextEncoder().encode(str).length;

    // Конвертируем байты в килобайты
    var kilobyteSize = byteSize / 1024;

    return kilobyteSize.toFixed(2); // Округляем до двух знаков после запятой
}


export function setCookie() {
    var id = $('#order_id').text();
    var tableHtml = document.getElementById('table').outerHTML;
    var order_number = $('#order-number').val();
    var total = parseFloat($('#full-price-value').text());
    var sale = parseFloat($('#discount-value').val());
    var total_with_sale = parseFloat($('#full-price-discount-value').text());
    var delivery = parseFloat($('#delivery-value').val());
    var install = parseFloat($('#instal-value').val());
    var measurements = parseFloat($('#zamery-value').val());
    var poslugy = parseFloat($('#poslugy').text());
    var total_ex_vat = parseFloat($('#total-ex-vat-value').text());
    var prepayment = parseFloat($('#prepayment-value').val());
    var remainder = parseFloat($('#remainder-value').text());
    var city = $('#city').val();
    var client = $('#client').val();
    var client_contact = $('#client-contact').val();
    var delivery_info = $('#delivery-info').val();
    var client_email = $('#client-email').val();
    var date = $('#date').text();
    var note = $('#note').val();


    var formData = {
        'html': tableHtml,
        'order_number': order_number,
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        'csrftoken': getCookie('csrftoken'),
        'total': total,
        'sale': sale,
        'total_with_sale': total_with_sale,
        'delivery': delivery,
        'install': install,
        'measurements': measurements,
        'poslugy': poslugy,
        'total_ex_vat': total_ex_vat,
        'prepayment': prepayment,
        'remainder': remainder,
        'city': city,
        'client': client,
        'client_contact': client_contact,
        'delivery_info': delivery_info,
        'client_email': client_email,
        'date': date,
        'note': note
    };

    $.ajax({
        type: 'POST',
        url: '/set_table/' + id + '/',
        data: formData,
    });
}

