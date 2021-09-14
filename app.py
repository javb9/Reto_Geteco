from sys import meta_path
import psycopg2
from flask import Flask, render_template, request
import json
from json import JSONEncoder
import datetime

connect = psycopg2.connect(user='postgres',
                           password='javb1999',
                           host='127.0.0.1',
                           port='5433',
                           database='bd_Reto_Geteco')

app = Flask(__name__)

#   REBDERIZADO DE VISTAS


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/create_data')
def create_data():
    return render_template('crear.html')


@app.route('/edit_or_delete')
def edit_or_delete():
    return render_template('editar_eliminar.html')


#   LEER DATOS DE LA TABLA

@app.route('/show_data', methods=['POST'])
def show_datas():
    if request.method == 'POST':
        cursor = connect.cursor()
        sql = 'select * from crud'
        cursor.execute(sql)
        r = cursor.fetchall()

        class DateTimeEncoder(JSONEncoder):

            def default(self, obj):

                if isinstance(obj, (datetime.date, datetime.datetime, datetime.time)):
                    return obj.isoformat()

        respuesta = json.dumps(r, indent=7, cls=DateTimeEncoder)
        print(respuesta)
        cursor.close()

        return respuesta
    return 'error'

#   CREAR NUEVO DATO (INSERTAR EN LA TABLA)


@app.route('/insert_data', methods=['POST'])
def insert_data():
    if request.method == 'POST':
        fecha_hora = request.form['fecha_hora']
        empresa = request.form['empresa']
        ciudad = request.form['ciudad']
        asunto = request.form['asunto']
        respuesta = request.form['respuesta']
        cur = connect.cursor()
        cur.execute('insert into crud (fecha_hora_atencion, hora_final, empresa, ciudad, asunto, respuesta, fecha_solicitud) values (%s,CURRENT_TIME,%s,%s,%s,%s,CURRENT_DATE)',
                    (fecha_hora, empresa, ciudad, asunto, respuesta)
                    )
        connect.commit()
        return 'si'
    return 'error'

#   BUSCAR ID DE LAS ATENCIONES


@app.route('/refresh', methods=['POST'])
def refresh():
    cur = connect.cursor()
    cur.execute('SELECT id FROM crud')
    datos = cur.fetchall()
    datas = str(json.dumps(datos))
    return datas

#   TRAER DATOS A EDITAR DEPENDIENDO DEL ID


@app.route('/datas_from_id', methods=['POST'])
def datas_from_id():
    if request.method == 'POST':
        id = request.form['id']
        cur = connect.cursor()
        cur.execute(
            'select empresa, ciudad, asunto, respuesta from crud where id=%s', (id,))
        dato = cur.fetchall()
        data = str(json.dumps(dato))
        return data

#   EDITAR DATOS


@app.route('/edit', methods=['POST'])
def edit():
    if request.method == 'POST':
        id = request.form['id_atencion']
        empresa=request.form['empresa_ed_del']
        ciudad=request.form['ciudad_ed_del']
        asunto=request.form['asunto_ed_del']
        respuesta=request.form['repuesta_ed_del']
        cur = connect.cursor()
        cur.execute('UPDATE crud SET empresa=%s, ciudad=%s, asunto=%s, respuesta=%s WHERE id=%s',
                    (empresa, ciudad, asunto, respuesta, id)
                    )
        connect.commit()
        return 'si'

#   ELIMINAR DATO

@app.route('/delete', methods=['POST'])
def delete():
    if request.method == 'POST':
        id = request.form['id_atencion']
        cur = connect.cursor()
        cur.execute('DELETE FROM crud WHERE id=%s',
                    (id,)
                    )
        connect.commit()
        return 'si'

if __name__ == '__main__':
    app.run(port=3000, debug=True)
