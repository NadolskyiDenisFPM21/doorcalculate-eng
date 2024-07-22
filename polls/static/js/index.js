import { setCookie } from './cookies.js';
import { getCookie } from './cookies.js';
import { attachChangeEvent } from './select_model.js'




function full_price() {
    var fullPrice = 0.0;
    var discountVal = parseFloat($('#discount-value').val());
    var count = 0;
    var poslugy = 0.0;
    $("#table tbody tr .total-price").each(function (index, element) {
        var price = $(element).find('span');
        fullPrice += parseFloat(price.text());
    });
    $('#table tbody tr .count').each(function (index, element) {
        count += parseInt($(element).find('span').text());
    });
    $('#full-price-value').text(fullPrice.toFixed(2));
    fullPrice = parseFloat((fullPrice * (1 - discountVal / 100)).toFixed(2));
    $('#full-price-discount-value').text(fullPrice.toFixed(2));
    poslugy = parseFloat($('#delivery-value').val()) + parseFloat($('#instal-value').val() * count) + parseFloat($('#zamery-value').val());
    $('#poslugy').text(poslugy);
    fullPrice += poslugy;
    $('#total-ex-vat-value').text(fullPrice.toFixed(2));
    $('#prepayment-percent').text(fullPrice * parseFloat($('#prepayment-value').val()) / 100);
    fullPrice -= fullPrice * parseFloat($('#prepayment-value').val()) / 100;
    $('#remainder-value').text(fullPrice.toFixed(2));

    setCookie();
}


function removeDoor() {
    var tr = $(this).parent();
    tr.next().remove();
    tr.remove();
    setCookie();
    full_price();
}


function addNumber() {
    var rows = document.querySelectorAll("#table tbody tr:nth-child(2n-1)");

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];

        // Проверяем, есть ли у текущей строки уже номер
        var numberExists = row.querySelector(".counter");

        if (!numberExists) {
            var cellNumber = document.createElement("td");
            cellNumber.setAttribute("rowspan", "2");
            cellNumber.textContent = i + 1;
            cellNumber.classList.add("counter"); // Добавляем класс "counter"
            row.insertBefore(cellNumber, row.firstChild);
        }

    }

}

$(document).ready(function () {
    var remove_buttons = $('.remove-button');
    remove_buttons.each(function () {
        $(this).click(removeDoor);
    });
    full_price();

    $('.info-value').change(function () {
        full_price();
    });


    $('#add').click(function (e) {
        if ($('#select-model').val() && $('#select-opening').val() && $('#select-opening-2').val() && $('#select-width').val() && $('#select-height').val() && $('#select-frame').val() && $('#count').val()) {
            var html_data = $("#form-table tbody").children();
            var base = $("#form-table tbody").children().clone();
            html_data.children().each(function () {
                $(this).find('span').each(function () {
                    $(this).replaceWith('<span>' + $(this).text() + '</span>');
                });
                // Find select and input elements within the cell
                $(this).find('select, input').each(function () {
                    // Replace select or input with span
                    $(this).replaceWith('<span>' + $(this).val() + '</span>');
                });
            });
            $(html_data[0]).append('<td rowspan="2" class="remove-button">⮾</td>');
            var remove_buttons = $('.remove-button');
            $(remove_buttons[remove_buttons.length - 1]).click(removeDoor);
            var rem = $($("#table thead").children()[0]).find('.remove');
            if (rem.length == 0) {
                $($("#table thead").children()[0]).append('<th class="cell remove" rowspan="3">Del</th>');
            }
            base.children().each(function () {
                $(this).find('input').each(function () {
                    $(this).val(0);
                });
            });
            $('#table tbody').append(html_data);
            addNumber();
            $('#form-table tbody').append(base);

        }
        attachChangeEvent();
        full_price();
    });


    const inputs = document.querySelectorAll('input[type=number]');
    Array.from(inputs).forEach(input => {
        const min = +input.min;
        const max = +input.max;

        input.addEventListener('input', (e) => {
            const value = +input.value;
            if (value > max) { input.value = max }
            else if (value < min) { input.value = min }
        }
        )
    });

});
