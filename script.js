const svg = d3.select("#scene");

const svgWidth = +svg.attr("width");
const svgHeight = +svg.attr("height");

const baseStartPoint = { x: 140, y: 295 };
const pointBaseRadius = 12;

const safeArea = {
    left: 20,
    right: 20,
    top: 55,
    bottom: 20
};

// Базовая траектория
const basePathD = `
    M 140 295
    C 85 255, 70 175, 95 110
    C 125 45, 210 20, 285 35
    C 365 50, 430 105, 450 175
    C 495 135, 585 145, 640 210
    C 695 275, 700 365, 655 430
    C 610 495, 530 505, 475 470
    C 455 545, 390 590, 305 600
    C 215 610, 130 575, 90 510
    C 50 445, 55 350, 140 295
`;

let preparedScene = null;

// --------------------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---------------------

function readNumber(id, defaultValue) {
    const raw = document.getElementById(id).value.replace(",", ".");
    const num = parseFloat(raw);
    return isNaN(num) ? defaultValue : num;
}

function rotatePoint(x, y, cx, cy, angleDeg) {
    const a = angleDeg * Math.PI / 180;
    const dx = x - cx;
    const dy = y - cy;

    return {
        x: cx + dx * Math.cos(a) - dy * Math.sin(a),
        y: cy + dx * Math.sin(a) + dy * Math.cos(a)
    };
}

function scalePoint(x, y, cx, cy, scale) {
    return {
        x: cx + (x - cx) * scale,
        y: cy + (y - cy) * scale
    };
}

function getBounds(points) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    points.forEach(p => {
        if (p.x < minX) minX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x;
        if (p.y > maxY) maxY = p.y;
    });

    return {
        minX,
        minY,
        maxX,
        maxY,
        width: maxX - minX,
        height: maxY - minY
    };
}

function pointsToPath(points) {
    return d3.line()
        .x(d => d.x)
        .y(d => d.y)(points);
}

function sampleBasePath(step = 4) {
    const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tempPath.setAttribute("d", basePathD);

    const totalLength = tempPath.getTotalLength();
    const pts = [];

    for (let l = 0; l <= totalLength; l += step) {
        const p = tempPath.getPointAtLength(l);
        pts.push({ x: p.x, y: p.y });
    }

    const last = tempPath.getPointAtLength(totalLength);
    const lastSaved = pts[pts.length - 1];

    if (!lastSaved || lastSaved.x !== last.x || lastSaved.y !== last.y) {
        pts.push({ x: last.x, y: last.y });
    }

    return pts;
}

// Главная функция:
// 1) поворачивает траекторию
// 2) при необходимости масштабирует её
// 3) сдвигает и центрирует в видимой области SVG
function buildPreparedPath(angleDeg) {
    let points = sampleBasePath(4);

    // Поворот вокруг стартовой точки
    points = points.map(p =>
        rotatePoint(p.x, p.y, baseStartPoint.x, baseStartPoint.y, angleDeg)
    );

    // Определяем границы после поворота
    let bounds = getBounds(points);

    const availableWidth = svgWidth - safeArea.left - safeArea.right;
    const availableHeight = svgHeight - safeArea.top - safeArea.bottom;

    // Автомасштаб, чтобы рисунок не вылетал за область
    const fitScale = Math.min(
        1,
        availableWidth / bounds.width,
        availableHeight / bounds.height
    );

    // Масштабируем вокруг стартовой точки
    points = points.map(p =>
        scalePoint(p.x, p.y, baseStartPoint.x, baseStartPoint.y, fitScale)
    );

    bounds = getBounds(points);

    // Центрируем внутри доступной области
    const targetMinX = safeArea.left + (availableWidth - bounds.width) / 2;
    const targetMinY = safeArea.top + (availableHeight - bounds.height) / 2;

    const dx = targetMinX - bounds.minX;
    const dy = targetMinY - bounds.minY;

    points = points.map(p => ({
        x: p.x + dx,
        y: p.y + dy
    }));

    bounds = getBounds(points);

    return {
        angleDeg,
        fitScale,
        points,
        pathD: pointsToPath(points),
        startPoint: points[0],
        bounds
    };
}

// Стрелка рисуется по самой траектории
function drawArrowOnPath(pathNode, startLen = 28, endLen = 60) {
    const totalLength = pathNode.getTotalLength();

    startLen = Math.max(0, Math.min(startLen, totalLength));
    endLen = Math.max(0, Math.min(endLen, totalLength));

    const pts = [];
    for (let l = startLen; l <= endLen; l += 2) {
        const p = pathNode.getPointAtLength(l);
        pts.push({ x: p.x, y: p.y });
    }

    svg.append("path")
        .attr("d", pointsToPath(pts))
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round");

    const tip = pathNode.getPointAtLength(endLen);
    const prev = pathNode.getPointAtLength(Math.max(endLen - 3, 0));
    const angle = Math.atan2(tip.y - prev.y, tip.x - prev.x);

    const headSize = 13;

    const x1 = tip.x - headSize * Math.cos(angle - Math.PI / 6);
    const y1 = tip.y - headSize * Math.sin(angle - Math.PI / 6);

    const x2 = tip.x - headSize * Math.cos(angle + Math.PI / 6);
    const y2 = tip.y - headSize * Math.sin(angle + Math.PI / 6);

    svg.append("line")
        .attr("x1", tip.x)
        .attr("y1", tip.y)
        .attr("x2", x1)
        .attr("y2", y1)
        .attr("stroke", "blue")
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round");

    svg.append("line")
        .attr("x1", tip.x)
        .attr("y1", tip.y)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "blue")
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round");
}

// --------------------- ПОДГОТОВКА СЦЕНЫ ---------------------

function drawScene() {
    svg.selectAll("*").remove();

    svg.append("text")
        .attr("x", 18)
        .attr("y", 30)
        .attr("font-size", 18)
        .attr("font-weight", "700")
        .text("Движение рисунка по заданной траектории");

    const rotateDegrees = readNumber("rotateDegrees", 0);

    preparedScene = buildPreparedPath(rotateDegrees);

    // Скрытая траектория движения
    svg.append("path")
        .attr("id", "motionPath")
        .attr("d", preparedScene.pathD)
        .attr("fill", "none")
        .attr("stroke", "transparent")
        .attr("stroke-width", 1);

    // Видимый рисунок сразу полностью
    svg.append("path")
        .attr("id", "drawnPath")
        .attr("d", preparedScene.pathD)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round");

    // Красная точка в начале
    svg.append("circle")
        .attr("id", "drawPoint")
        .attr("cx", preparedScene.startPoint.x)
        .attr("cy", preparedScene.startPoint.y)
        .attr("r", pointBaseRadius)
        .attr("fill", "brown");

    const pathNode = document.getElementById("motionPath");
    drawArrowOnPath(pathNode, 28, 60);
}
// --------------------- АНИМАЦИЯ ---------------------

function startAnimation() {
    const duration = readNumber("duration", 1000);
    const startScale = readNumber("startScale", 1);
    const endScale = readNumber("endScale", 1);
    const rotateDegrees = readNumber("rotateDegrees", 0);

    if (duration <= 0) {
        alert("Введите корректное время анимации.");
        return;
    }

    if (startScale <= 0 || endScale <= 0) {
        alert("Масштаб должен быть больше 0.");
        return;
    }

    if (!preparedScene || preparedScene.angleDeg !== rotateDegrees) {
        drawScene();
    }

    const motionPath = document.getElementById("motionPath");
    const drawnPath = d3.select("#drawnPath");
    const point = d3.select("#drawPoint");

    if (!motionPath || point.empty()) {
        alert("Сначала нажмите «Нарисовать».");
        return;
    }

    const totalLength = motionPath.getTotalLength();

    const lengthInterpolator = d3.interpolateNumber(0, totalLength);
    const scaleInterpolator = d3.interpolateNumber(startScale, endScale);

    const start = preparedScene.startPoint;

    drawnPath.attr("d", "");

    point.interrupt();

    point.transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .tween("drawPath", function () {
            return function (t) {
                const currentLength = lengthInterpolator(t);
                const currentScale = scaleInterpolator(t);

                const pts = [];

                for (let l = 0; l <= currentLength; l += 4) {
                    const p = motionPath.getPointAtLength(l);

                    const scaledX = start.x + (p.x - start.x) * currentScale;
                    const scaledY = start.y + (p.y - start.y) * currentScale;

                    pts.push({ x: scaledX, y: scaledY });
                }

                const currentPoint = motionPath.getPointAtLength(currentLength);

                const scaledCurrentX = start.x + (currentPoint.x - start.x) * currentScale;
                const scaledCurrentY = start.y + (currentPoint.y - start.y) * currentScale;

                pts.push({ x: scaledCurrentX, y: scaledCurrentY });

                drawnPath.attr("d", pointsToPath(pts));

                point
                    .attr("cx", scaledCurrentX)
                    .attr("cy", scaledCurrentY)
                    .attr("r", pointBaseRadius);
            };
        })
        .on("end", function () {
            const finalScale = endScale;
            const finalPts = [];

            for (let l = 0; l <= totalLength; l += 4) {
                const p = motionPath.getPointAtLength(l);

                finalPts.push({
                    x: start.x + (p.x - start.x) * finalScale,
                    y: start.y + (p.y - start.y) * finalScale
                });
            }

            const endPoint = motionPath.getPointAtLength(totalLength);

            finalPts.push({
                x: start.x + (endPoint.x - start.x) * finalScale,
                y: start.y + (endPoint.y - start.y) * finalScale
            });

            drawnPath.attr("d", pointsToPath(finalPts));

            point
                .attr("cx", start.x + (endPoint.x - start.x) * finalScale)
                .attr("cy", start.y + (endPoint.y - start.y) * finalScale)
                .attr("r", pointBaseRadius);
        });
}

function clearScene() {
    svg.selectAll("*").remove();
    preparedScene = null;
}

// --------------------- СОБЫТИЯ ---------------------

document.getElementById("drawBtn").addEventListener("click", drawScene);
document.getElementById("startBtn").addEventListener("click", startAnimation);
document.getElementById("clearBtn").addEventListener("click", clearScene);

// Первичная подготовка
drawScene();