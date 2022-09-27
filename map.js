const ras = [];
const decs = [];

makeChart();

async function getData() {
    const response = await fetch('startest.csv');
    const data = await response.text();
    //console.log(data)

    const table = data.split('\n');
    table.forEach(elt => {
        const row = elt.split(',');
        const ra = (row[7] * 15);
        ras.push(ra);
        const dec = (row[8] * 1.0);
        decs.push(dec);
        //console.log("ra", ra, "dec", dec,);
    })
    //console.log(ras, decs);
}

async function makeChart() {
    await getData();

    const datas = ras.map((ras, i) => {
        return {
            x: ras,
            y: decs[i]
        };
    });
    console.log(datas);
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: [
            {
                label: "star chart",
                data: datas
            }],
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    beginAtZero: true
                }

            }
        }
    });


}

