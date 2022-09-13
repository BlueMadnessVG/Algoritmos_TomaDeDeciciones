const button = document.getElementById("submit");
const results_box = document.querySelector(".result");

button.addEventListener ("click", () => {
    
    //NUMERO DE VARIABLES A EVALUAR
    var num_tr = document.getElementsByClassName("tr_input");
    var num_td = document.getElementById("tableId").rows[1].cells.length - 1;

    //CALCULAR MAX-MIN
    var Mmin = 0;
    var Mmin_name = "";

    //CICLO PARA RECORRER TODAS LAS VARIABLES
    for (let n = 1; n <= num_tr.length; n++) {

        //OBTENER EL VALOR DEL INPUT
        const maxmin = "inp_" + n;
        var Max_value = Number(document.getElementsByName(maxmin + "-" + num_td)[0].value);
        //RECONOCER EL MAYOR
        if (Mmin < Max_value) {
            Mmin = Max_value;
            Mmin_name = maxmin + "-0";
        }
    }
    //FIN DE CALCULAR MAX-MIN

    //CALCULAR MAXI-MAX
    var Mmax = 0;
    var Mmax_name = "";

    //CICLO PARA RECORRER TODAS LAS VARIABLES
    for (let i = 1; i <= num_tr.length; i++) {

        //OBTENER EL VALOR DEL INPUT
        const maximax = "inp_" + i;
        var Max_value = Number(document.getElementsByName(maximax + "-1")[0].value);

        //RECONOCER EL MAYOR
        if (Mmax < Max_value) {
            Mmax = Max_value;

            Mmax_name = maximax + "-0";
        }
    }
    //FIN DE CALCULAR MAXI-MAX
    
    //CALCULAR OPTIMISMO - PESIMISMO
    var op = 0;
    var P = 0.7, q = 0.3;
    var op_name = "";

    for (let i = 1; i <= num_tr.length; i++) {
        //OBTENER EL VALOR DEL INPUT
        const op_input = "inp_" + i;
        var op_max = Number(document.getElementsByName(op_input + "-1")[0].value);
        var op_min = Number(document.getElementsByName(op_input + "-" + num_td)[0].value);

        var cof = (op_max * P) + (op_min * q);

        if (op < cof) {
            op = cof

            op_name = op_input + "-0";
        }
    }
    //FIN DE CALCULAR OPTIMISMO - PESIMISMO

    //CALCULO DE LAPLACE
    var lap = 0;
    var lap_name = "";

    //CICLO PARA RECORRER TODOS LAS VARIABLES
    for (let i = 1; i <= num_tr.length; i++) {
        const lap_input = "inp_" + i;

        let sum = 0;
        //CICLO PARA RECORRER TODAS LOS VALORES
        for (let n = 1; n <= num_td; n++) {
            sum = parseFloat(sum) + parseFloat(document.getElementsByName(lap_input + "-" + n)[0].value);
        }
        
        sum = parseFloat(sum) / parseInt(num_td);
        if (lap < sum) {
            lap = sum

            lap_name = lap_input + "-0";
        }
    }
    //FIN DEL CALCULO LAPLACE

    //CALCULO DE CONSTO - OPORTUNIDAD
    var coeficientes = [];
    var co = 0;
    var co_name = "";

    //CICLO PARA RECONOSER LOS COEFICIENTES MAS ALTOS
    for (let i = 1; i <= num_td; i++) {
        coeficientes.push(0);
        for (let n = 1; n <= num_tr.length; n++) {
            const co_input = "inp_" + n;
            if (Number(coeficientes[i - 1]) < Number(document.getElementsByName(co_input + "-" + i)[0].value)) {
                coeficientes[i - 1] = Number(document.getElementsByName(co_input + "-" + i)[0].value);
            }
        }
    }

    for (let i = 1; i <= num_tr.length; i++) {
        const co_input = "inp_" + i;

        let sum = 0;
        //CICLO PARA RECORRER TODAS LOS VALORES
        for (let n = 1; n <= num_td; n++) {
            sum = parseFloat(sum) + ( Math.abs(parseFloat(coeficientes[n - 1]) - parseFloat(document.getElementsByName(co_input + "-" + n)[0].value)));
        }
        
        sum = parseFloat(sum) / parseInt(num_td);
        if (co > sum || co == 0) {
            co = sum;

            co_name = co_input + "-0"
        }
    }

    //MOSTRAR LOS RESULTADOS EN PANTALLA
    let valuesResult =`
        <div _ngcontent-pdv-c12 class="info_result">
            <p> MAXI - MIN  </p>
            <p> ${document.getElementById(Mmin_name).value}  </p>
        </div> 
        <div _ngcontent-pdv-c12 class="info_result">
            <p> MAXI - MAX  </p>
            <p> ${document.getElementById(Mmax_name).value}  </p>
        </div>
        <div _ngcontent-pdv-c12 class="info_result">
            <p> OPTIMISMO - PECIMISMO  </p>
            <p> ${document.getElementById(op_name).value}  </p>
        </div>
        <div _ngcontent-pdv-c12 class="info_result">
            <p> LAPLACE  </p>
            <p> ${document.getElementById(lap_name).value}  </p>
        </div>
        <div _ngcontent-pdv-c12 class="info_result">
            <p> COSTO DE OPORTUNIDAD  </p>
            <p> ${document.getElementById(co_name).value}  </p>
        </div>
    `;
    results_box.insertAdjacentHTML("afterbegin", valuesResult);
    console.log(Mmax_name);
}
);