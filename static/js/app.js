
var create_data = document.getElementById('create_data');
var DOMtable = document.querySelector('#DOMtable');
var fecha_hora = document.getElementById('fecha_hora');
var btn_volver = document.getElementById('btn_volver');
var edit_or_delete = document.getElementById('edit_or_delete');
var btn_refrescar = document.getElementById('btn_refrescar');
var btn_editar_modal = document.getElementById('btn_editar_modal');
var btn_eliminar_modal = document.getElementById('btn_eliminar_modal');

edit_or_delete.addEventListener('click', editar_eliminar);
create_data.addEventListener('click', crear_tabla);

if (btn_eliminar_modal) {
    btn_eliminar_modal.addEventListener('click', eliminar);
}

if (btn_editar_modal) {
    btn_editar_modal.addEventListener('click', edit);
}

if (btn_refrescar) {
    btn_refrescar.addEventListener('click', refresh);

    //  TRAER DATOS CORRESPONDIENTE AL NUEMRO DE LA ATENCION YA REALIZADA

    $('#id_atencion').focusout(function () {
        var id = $('#id_atencion').val();
        if (id == 'ID') {
            var empresa_ed_del = document.getElementById('empresa_ed_del');
            var ciudad_ed_del = document.getElementById('ciudad_ed_del');
            var asunto_ed_del = document.getElementById('asunto_ed_del');
            var repuesta_ed_del = document.getElementById('repuesta_ed_del');
            empresa_ed_del.value = ' ';
            ciudad_ed_del.value = ' ';
            asunto_ed_del.value = ' ';
            repuesta_ed_del.value = ' ';
            $('#alert').removeClass('alert alert-primary');
            $('#alert').addClass('alert alert-danger');
            var alert_text = document.getElementById('alert_text');
            alert_text.innerHTML = 'Ingrese ID de atencio valido';
            $('#alert').fadeIn(100);
            setTimeout(function () {
                $('#alert').fadeOut(300);
            }, 1500);
        } else {
            $.ajax({
                url: '/datas_from_id',
                type: 'POST',
                data: { 'id': id },
                success: function (res) {
                    var resp = JSON.parse(res);
                    var empresa_ed_del = document.getElementById('empresa_ed_del');
                    empresa_ed_del.value = resp[0][0];
                    var ciudad_ed_del = document.getElementById('ciudad_ed_del');
                    ciudad_ed_del.value = resp[0][1];
                    var asunto_ed_del = document.getElementById('asunto_ed_del');
                    asunto_ed_del.value = resp[0][2];
                    var repuesta_ed_del = document.getElementById('repuesta_ed_del');
                    repuesta_ed_del.value = resp[0][3];
                },
                error: function (error) {
                    console.log('error', error);
                }
            });
        }
    });
}

if (btn_volver) {
    btn_volver.addEventListener('click', back);
}

if (fecha_hora) {
    var fecha = new Date();
    var hora = fecha.getHours() + ':' + fecha.getMinutes(); + ':' + fecha.getSeconds();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    var ano = fecha.getFullYear();
    if (dia < 10)
        dia = '0' + dia;
    if (mes < 10)
        mes = '0' + mes
    fecha_hora.value = ano + "-" + mes + "-" + dia + " " + hora;
}

function crear_tabla() {
    window.location = '/create_data'
}

function back() {
    window.location = '/';
}

function editar_eliminar() {
    window.location = '/edit_or_delete';
}

// MOSTRAR DATOS DE LA BASE DE DATOS EN POSTGRES DE FORMA GRAFICA EN PAGINA WEB

if (DOMtable) {

    $.ajax({
        type: 'POST',
        url: '/show_data',
        data: {},
        success: function (res) {
            var resp = JSON.parse(res);
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tr = document.createElement('tr')
            const th_T0 = document.createElement('th');
            const th_T1 = document.createElement('th');
            const th_T2 = document.createElement('th');
            const th_T3 = document.createElement('th');
            const th_T4 = document.createElement('th');
            const th_T5 = document.createElement('th');
            const th_T6 = document.createElement('th');
            const th_T7 = document.createElement('th');
            table.setAttribute('id', 'tabla');
            table.className = 'table table-striped';
            th_T0.innerHTML = 'No.';
            th_T1.innerHTML = 'FECHA_HORA_ATENCION';
            th_T2.innerHTML = 'HORA_FINAL';
            th_T3.innerHTML = 'EMPRESA';
            th_T4.innerHTML = 'CIUDAD';
            th_T5.innerHTML = 'ASUNTO';
            th_T6.innerHTML = 'RESPUESTA';
            th_T7.innerHTML = 'FECHA_SOLICITUD';
            tr.appendChild(th_T0);
            tr.appendChild(th_T1);
            tr.appendChild(th_T2);
            tr.appendChild(th_T3);
            tr.appendChild(th_T4);
            tr.appendChild(th_T5);
            tr.appendChild(th_T6);
            tr.appendChild(th_T7);
            thead.appendChild(tr);
            resp.forEach(el => {
                const tr = document.createElement('tr');
                for (let prop in el) {
                    const td = document.createElement('td');
                    td.innerHTML = `${el[prop]}`;
                    tr.appendChild(td);
                    thead.appendChild(tr);
                }
            });

            table.appendChild(thead);
            DOMtable.appendChild(table);

        },
        error: function (error) {
            console.log('Error', error);
        }
    });
}

// FUNCION PARA INSERTAR DATOS A BASE DE DATOS

function send_data() {

    $.ajax({
        url: '/insert_data',
        type: 'POST',
        data: $('#form_send_data').serialize(),
        success: function (res) {
            var alert_text = document.getElementById('alert_text');
            alert_text.innerHTML = 'Datos guardados exitosamente'
            $('#alert').fadeIn(100);
            setTimeout(function () {
                $('#alert').fadeOut(300);
            }, 1500);
        }
    })
}

//  FUNCION PARA HACER APARECER EL NUMERO DE LA ATENCION 

function refresh() {
    btn_refrescar.setAttribute('style', 'display:none;');
    $.ajax({
        url: '/refresh',
        type: 'POST',
        data: {},
        success: function (res) {
            const select = document.getElementById("id_atencion");
            var resp = JSON.parse(res);
            resp.forEach(el => {
                for (let prop in el) {
                    var option = document.createElement("option");
                    option.innerHTML = `${el[prop]}`;
                    select.appendChild(option);
                }
            });
        },
        error: function (error) {
            console.log('error', error);
        }
    });
}

//  FUNCION PARA HACER LA EDICION DE LOS DATOS 

function edit() {
    var id = $('#id_atencion').val();
    var empresa_ed_del = $('#empresa_ed_del').val();
    var ciudad_ed_del = $('#ciudad_ed_del').val();
    var asunto_ed_del = $('#asunto_ed_del').val();
    var repuesta_ed_del = $('#repuesta_ed_del').val();
    if (id == 'ID') {
        $('#alert').removeClass('alert alert-primary');
        $('#alert').addClass('alert alert-danger');
        var alert_text = document.getElementById('alert_text');
        alert_text.innerHTML = 'Ingrese ID de atencio valido';
        $('#alert').fadeIn(100);
        setTimeout(function () {
            $('#alert').fadeOut(300);
        }, 1500);
    } else {
        $.ajax({
            url: '/edit',
            type: 'POST',
            data: { 'id_atencion': id, 'empresa_ed_del': empresa_ed_del, 'ciudad_ed_del': ciudad_ed_del, 'asunto_ed_del': asunto_ed_del, 'repuesta_ed_del': repuesta_ed_del },
            success: function (res) {
                window.location = '/';
            },
            error: function (error) {
                console.log('error', error);
            }
        });
    }
}

//  FUNCION PARA ELEMININAR DATOS

function eliminar() {
    var id = $('#id_atencion').val();
    $.ajax({
        url: '/delete',
        type: 'POST',
        data: { 'id_atencion': id },
        success: function (res) {
            window.location = '/';
        },
        error: function (error) {
            console.log('error', error);
        }
    });
}