document.addEventListener("DOMContentLoaded", function () {
    const svg = d3.select("svg");

    const cx = document.getElementById("cx");
    const cy = document.getElementById("cy");
    const cx_finish = document.getElementById("cx_finish");
    const cy_finish = document.getElementById("cy_finish");
    const anim = document.getElementById("anim");
    const ease = document.getElementById("ease");
    const pathSelect = document.getElementById("pathSelect");

    const drawBtn = document.getElementById("draw");
    const clearBtn = document.getElementById("clear");

    drawBtn.addEventListener("click", function () {
        let pict = drawSmile(svg);

        if (!anim.checked) {
            pict.attr("transform", `translate(${cx.value}, ${cy.value})`);
            return;
        }

        let easeFunc = d3.easeLinear;
        if (ease.value === "bounce") easeFunc = d3.easeBounce;
        if (ease.value === "elastic") easeFunc = d3.easeElastic;

        let path = drawPath(pathSelect.value);

        pict.attr("transform", `translate(${cx.value}, ${cy.value})`)
            .transition()
            .duration(6000)
            .ease(easeFunc)
            .attrTween("transform", translateAlong(path.node()));
    });

    clearBtn.addEventListener("click", function () {
        svg.selectAll("*").remove();
    });
});