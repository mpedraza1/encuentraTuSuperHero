$(() => {
  const formulario = $("#formulario");
  const inputID = $("#inputID");
  const personajeDinamico = $("#personajeDinamico");
  const chartContainer = $("#chartContainer");

  formulario.on("submit", (e) => {
    e.preventDefault();

    console.log("procesando formulario");
    console.log(inputID.val());
    const soloNumReg = /^\d+$/;
    console.log(soloNumReg.test(inputID.val()));
    
    if (!soloNumReg.test(inputID.val())) {
        return console.log("no escribiste solo números");
    }

    chartContainer.html("");
    personajeDinamico.html("");

    $.ajax({
      url: `https://www.superheroapi.com/api.php/3525635500807579/${inputID.val()}`,
      type: "GET",
      dataType: "JSON",
      success(data) {
        console.log(data);
        

        personajeDinamico.append(`
                <div class="row g-0">
                    <div class="col-md-4">
                         <img src="${data.image}" 
                         class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${data.name.url}</h5>
                        <p class="card-text">${data.powerstats}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
                `);


                const opciones ={
                    animationEnabled: true,
                    title: {
                        text: "Gráfico de torta habilidades del personaje",
                    },
                    zoomEnabled: true,
                    data: [
                        {
                            type: "pie",
                            showInLegend: true,
                            legendText: "{indexLabel}",
                            dataPoints: [
                                {
                                    y:
                                        data.powerstats.intelligence !== "null"
                                            ? data.powerstats.intelligence
                                            :0,
                                    indexLabel: "intelligence",
                                },
                                {
                                    y:
                                        data.powerstats.strength !== "null"
                                            ? data.powerstats.strength
                                            :0,
                                    indexLabel: "strength",
                                },
                                {
                                    y:
                                        data.powerstats.speed !== "null"
                                            ? data.powerstats.speed
                                            :0,
                                    indexLabel: "speed",
                                },
                                {
                                    y:
                                        data.powerstats.durability !== "null"
                                            ? data.powerstats.durability
                                            :0,
                                    indexLabel: "durability",
                                },
                                {
                                    y:
                                        data.powerstats.power !== "null"
                                            ? data.powerstats.power
                                            :0,
                                    indexLabel: "power",
                                },
                                {
                                    y:
                                        data.powerstats.combat !== "null"
                                            ? data.powerstats.combat
                                            :0,
                                    indexLabel: "combat",
                                },
                            ]
                        }
                    ]
                }
                chartContainer.CanvasJSChart(opciones);
      },

      error(e) {
        console.log(e);
      },
    });
  });
});
