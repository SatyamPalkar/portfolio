/* Olist delivery dashboard: static, data from ./data/dashboard.json, charts by ECharts 5.5.1. */
(function () {
  "use strict";

  var C = { bg: "#0E1621", card: "#18222F", text: "#F2F5F8", label: "#C3CCD6", muted: "#9AA7B6",
    line: "#26334A", cyan: "#3FC1E8", pink: "#E8467C", amber: "#F2B84B", good: "#4CD6A4", bar: "#C9D1DA" };
  var TIER = { Priority: C.pink, Watch: C.amber, Monitor: C.cyan };
  var PAGES = { overview: "EXECUTIVE OVERVIEW", diagnostics: "DELIVERY DIAGNOSTICS", seller: "SELLER & FULFILMENT", action: "ACTION QUEUE" };

  var TAKEAWAYS = {
    overview: [
      ["1 · Growth", "Jan–Aug 2018 sales +141% vs 2017; flat at R$0.84–0.98M a month since Mar 2018."],
      ["2 · Logistics strain", "Late rate more than doubled (4.2% to 9.4%), peaking in Feb–Mar 2018."],
      ["3 · Lateness hurts ratings", "4.3 stars when early vs ~1.7 when 8+ days late."],
      ["4 · Concentration", "SP = 38% of sales; top 10 categories = 62%."],
      ["5 · Regional risk", "Northeast 14.3% late vs ~7% South/Southeast; RJ 13.5% at scale."],
      ["6 · Retention gap", "Only 3.0% of customers ordered twice."],
      ["7 · Payments", "Credit card 78.5% of payment value, boleto 18.0%."]],
    diagnostics: [
      ["When", "Mar 2018: 19%+ late in every region (South 19.4%, Southeast 19.2%)."],
      ["Where", "Geography amplifies it: NE 36.3%, North 39.2% in Mar 2018; NE 14.4% vs South 7.1% overall."],
      ["Not the driver", "Category: 22 large categories sit at 5.5–9.8% late; states span 5.0–23.9%."],
      ["Category exception", "Office Furniture: slowest (20.6 days) and lowest-rated (3.64) large category."],
      ["Retention", "First order late: 3.19% repeat vs 4.04% on time (cohort before Mar 2018). Association."],
      ["Instalments", "37% of card orders use 4+ instalments. Order value rises with term: R$101 (1x) to R$333 (7–10x)."]],
    seller: [
      ["Dispatch vs transit", "Late orders: 5.8 days seller dispatch + 25.7 days carrier transit. On-time orders: 3.0 + 7.9. About 86% of the extra 20.6 days is transit."],
      ["Shipping limit", "Sellers handed over after the shipping limit on 9.0% of orders; those were late 24.4% vs 6.5%. 27% of late orders had a missed limit."],
      ["Routes", "SP → RJ is late 15.4% on 8,273 seller-orders, the largest excess of any route; SP → CE 15.2%, SP → BA 14.7%."],
      ["Seller states", "71% of seller-orders ship from SP (69,395 of 97,811), so route says more than seller state."],
      ["Grain and exclusions", "Order × seller: 1,275 multi-seller orders (1.3%) count once per seller. 197 orders with missing or out-of-sequence hand-off dates are excluded from timing."]],
    action: [
      ["How tiers work", "Priority: late rate 3+ pp above the network (8.11%) and 50+ excess late orders. Watch: 1+ pp above. Monitor: otherwise."],
      ["Priority states (6)", "RJ, BA, CE, MA, ES, AL: 1,176 excess late orders and R$426.7K of sales on late orders (3.2% of all sales)."],
      ["Biggest lever", "Rio de Janeiro alone accounts for 663 excess late orders (56% of the Priority total), on 12,351 orders."],
      ["Watch (8)", "PA, SC, PE, RN, SE, PI, PB, MS: 255 excess late orders combined."],
      ["Fixed population", "Tiers and headline use all delivered orders in the 21 states with 300+ orders. Selecting a state filters only the monthly trend."]]
  };

  var D = null, charts = {}, rendered = {}, state = { region: "", selected: null };

  // ---------------------------------------------------------------- formatting
  function fmtInt(x) { return Math.round(x).toLocaleString("en-US"); }
  function brl(x) { return "R$" + Math.round(x).toLocaleString("en-US"); }
  function brlM(x, d) { return "R$" + (x / 1e6).toFixed(d === undefined ? 2 : d) + "M"; }
  function pct(x, d) { return x === null || x === undefined ? "–" : (100 * x).toFixed(d === undefined ? 1 : d) + "%"; }
  function k1(x) { return x >= 1000 ? (x / 1000).toFixed(1) + "K" : String(x); }
  function signed(x) { var r = Math.round(x); return (r >= 0 ? "+" : "") + r.toLocaleString("en-US"); }
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function monthLabel(m) { return MON[+m.slice(5, 7) - 1] + " " + m.slice(2, 4); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function tipHtml(title, rows, note) {
    var h = "<b>" + esc(title) + "</b>";
    rows.forEach(function (r) { h += esc(r[0]) + ": <strong>" + esc(r[1]) + "</strong><br>"; });
    if (note) h += '<span style="color:' + C.muted + '">' + esc(note) + "</span>";
    return h;
  }

  // ---------------------------------------------------------------- errors / states
  function showError(msg) {
    var e = document.getElementById("error");
    e.textContent = msg; e.hidden = false;
    document.getElementById("loading").hidden = true;
  }
  function logError(msg) {
    var p = document.getElementById("errlog");
    p.textContent += msg + "\n";
  }
  window.addEventListener("error", function (ev) { logError("error: " + ev.message); });
  window.addEventListener("unhandledrejection", function (ev) { logError("rejection: " + (ev.reason && ev.reason.message || ev.reason)); });

  // ---------------------------------------------------------------- chart helpers
  var TOOLTIP = { backgroundColor: "#0A1119", borderColor: C.line, textStyle: { color: C.text, fontSize: 12 },
    extraCssText: "max-width:320px;white-space:normal;", confine: true };
  function chart(id, option) {
    var el = document.getElementById(id);
    var c = echarts.getInstanceByDom(el) || echarts.init(el, null, { renderer: "canvas" });
    option.animation = false;
    option.textStyle = { color: C.label, fontFamily: getComputedStyle(document.body).fontFamily };
    option.tooltip = Object.assign({}, TOOLTIP, option.tooltip || {});
    c.setOption(option, true);
    charts[id] = c;
    return c;
  }
  // horizontal ranked/labelled bar chart
  function hbar(id, items, o) {
    var max = o.max || Math.max.apply(null, items.map(function (d) { return o.value(d); })) * (o.headroom || 1.9);
    return chart(id, {
      grid: { left: o.left || 150, right: o.right || 8, top: 4, bottom: 4, containLabel: false },
      xAxis: { type: "value", min: 0, max: max, show: false },
      yAxis: { type: "category", inverse: true, data: items.map(o.name), axisLine: { show: false }, axisTick: { show: false },
        axisLabel: { color: C.text, fontSize: 12, width: (o.left || 150) - 12, overflow: "truncate", align: o.alignLeft ? "left" : "right",
          margin: o.alignLeft ? (o.left || 150) - 4 : 8 } },
      tooltip: { trigger: "item", formatter: function (p) { return o.tip(items[p.dataIndex]); } },
      series: [{ type: "bar", barWidth: o.barWidth || "45%",
        data: items.map(function (d) { return { value: o.value(d), itemStyle: { color: o.color ? o.color(d) : C.bar } }; }),
        label: { show: true, position: "right", color: C.label, fontSize: 11.5,
          formatter: function (p) { return o.label(items[p.dataIndex]); } } }]
    });
  }

  // HTML tooltip for table rows
  var tipEl = null;
  function attachTip(el, html) {
    function show(ev) {
      tipEl.innerHTML = html; tipEl.hidden = false;
      var r = el.getBoundingClientRect(), x = ev && ev.clientX ? ev.clientX + 14 : r.left + 20, y = ev && ev.clientY ? ev.clientY + 14 : r.bottom + 4;
      var w = tipEl.offsetWidth, h = tipEl.offsetHeight;
      if (x + w > window.innerWidth - 8) x = window.innerWidth - w - 8;
      if (y + h > window.innerHeight - 8) y = (ev && ev.clientY ? ev.clientY : r.top) - h - 10;
      tipEl.style.left = x + "px"; tipEl.style.top = y + "px";
    }
    function hide() { tipEl.hidden = true; }
    el.addEventListener("mousemove", show); el.addEventListener("mouseleave", hide);
    el.addEventListener("focusin", function () { show(null); }); el.addEventListener("focusout", hide);
  }
  function barCell(value, max, color, label, zeroCentered) {
    var w, left;
    if (zeroCentered) {
      var half = 50, frac = Math.min(Math.abs(value) / max, 1) * half;
      left = value >= 0 ? half : half - frac; w = frac;
      var lab = value >= 0 ? 'left:calc(' + (half + frac) + '% + 4px)' : 'right:calc(' + (half + frac) + '% + 4px)';
      return '<div class="bar-wrap"><span class="axis-zero" style="left:50%"></span><span class="bar" style="left:' + left + '%;width:' + w +
        '%;background:' + color + '"></span><span class="bar-label" style="' + lab + '">' + esc(label) + "</span></div>";
    }
    w = Math.min(value / max, 1) * 60;   // leave 40% of the cell for the label
    return '<div class="bar-wrap"><span class="bar" style="left:0;width:' + w + '%;background:' + color +
      '"></span><span class="bar-label" style="left:calc(' + w + '% + 4px)">' + esc(label) + "</span></div>";
  }

  // ---------------------------------------------------------------- page: overview
  function renderOverview() {
    var o = D.overview, k = o.kpi, a = o.jan_aug["2017"], b = o.jan_aug["2018"];
    var cards = [
      { cap: "MERCHANDISE SALES", val: brlM(k.sales), delta: "▲ " + Math.round(100 * (b.sales / a.sales - 1)) + "% Jan–Aug 2018 vs 2017", cls: "good",
        spark: "sales", color: C.cyan, def: "Sum of item price excl. freight, all delivered orders, BRL." },
      { cap: "DELIVERED ORDERS", val: (k.orders / 1000).toFixed(1) + "K", delta: "▲ " + Math.round(100 * (b.orders / a.orders - 1)) + "% Jan–Aug 2018 vs 2017", cls: "good",
        spark: "orders", color: C.cyan, def: fmtInt(k.orders) + " delivered orders, Sep 2016 – Aug 2018." },
      { cap: "LATE DELIVERY RATE", val: pct(k.late_rate), delta: "▲ " + pct(a.late_rate) + " to " + pct(b.late_rate) + " (Jan–Aug 17 to 18)", cls: "bad",
        spark: "rate", color: C.pink, def: fmtInt(k.late) + " late of " + fmtInt(k.eligible) + " orders with both dates." },
      { cap: "AVG REVIEW SCORE", val: k.review.toFixed(2) + " / 5", delta: "▼ " + a.review.toFixed(2) + " to " + b.review.toFixed(2) + " (Jan–Aug 17 to 18)", cls: "bad",
        spark: "review", color: C.pink, def: "Average review (1–5) of delivered orders with a review." }];
    var host = document.getElementById("kpis");
    host.innerHTML = cards.map(function (c, i) {
      return '<div class="card kpi" tabindex="0" id="kpi-' + i + '"><div class="cap">' + c.cap + '</div><div class="val">' + c.val +
        '</div><div class="delta ' + c.cls + '">' + c.delta + '</div><div class="spark" id="spark-' + i + '"></div></div>';
    }).join("") + '<div class="card kpi-more" tabindex="0" id="kpi-more"><dl>' +
      "<dt>AVG ORDER VALUE</dt><dd>R$" + k.aov.toFixed(2) + "</dd><dt>REPEAT CUSTOMERS</dt><dd>" + pct(k.repeat_rate) +
      "</dd><dt>AVG DELIVERY TIME</dt><dd>" + k.delivery_days.toFixed(1) + " days</dd><dt>FREIGHT SHARE</dt><dd>" + pct(k.freight_share) + "</dd></dl></div>";
    cards.forEach(function (c, i) {
      attachTip(document.getElementById("kpi-" + i), tipHtml(c.cap, [["Value", c.val]], c.def + " Delta compares Jan–Aug 2018 with Jan–Aug 2017."));
      var vals = o.monthly.map(function (m) { return m[c.spark]; });
      chart("spark-" + i, {
        grid: { left: 0, right: 0, top: 4, bottom: 0 },
        xAxis: { type: "category", data: o.monthly.map(function (m) { return monthLabel(m.month); }), show: false, boundaryGap: false },
        yAxis: { type: "value", show: false, scale: c.spark === "review" },
        tooltip: { trigger: "axis", formatter: function (p) {
          var m = o.monthly[p[0].dataIndex], v = c.spark === "sales" ? brlM(m.sales) : c.spark === "orders" ? fmtInt(m.orders)
            : c.spark === "rate" ? pct(m.rate) + " (" + fmtInt(m.late) + " of " + fmtInt(m.eligible) + ")" : m.review.toFixed(2);
          return "<b>" + monthLabel(m.month) + "</b>" + c.cap.toLowerCase() + ": <strong>" + v + "</strong>"; } },
        series: [{ type: "line", data: vals, symbol: "none", lineStyle: { color: c.color, width: 1.5 },
          areaStyle: c.spark === "review" ? undefined : { color: c.color, opacity: 0.35 } }]
      });
    });
    attachTip(document.getElementById("kpi-more"), tipHtml("Secondary metrics", [], "AOV = (price + freight) / delivered orders. Repeat = customers with 2+ delivered orders / all customers (" + fmtInt(k.customers) + "). Delivery time = purchase to customer delivery. Freight share = freight / order value."));

    var months = o.monthly.map(function (m) { return monthLabel(m.month); });
    chart("c-sales", {
      grid: { left: 62, right: 10, top: 10, bottom: 22 },
      xAxis: { type: "category", data: months, boundaryGap: false, axisLabel: { color: C.label, interval: 2 }, axisLine: { lineStyle: { color: C.line } } },
      yAxis: { type: "value", axisLabel: { color: C.label, formatter: function (v) { return brlM(v, 1); } }, splitLine: { lineStyle: { color: C.line } } },
      tooltip: { trigger: "axis", formatter: function (p) { var m = o.monthly[p[0].dataIndex];
        return tipHtml(monthLabel(m.month), [["Merchandise sales", brlM(m.sales)], ["Delivered orders", fmtInt(m.orders)]], "Item price excl. freight, by purchase month"); } },
      series: [{ type: "line", data: o.monthly.map(function (m) { return m.sales; }), symbol: "none",
        lineStyle: { color: C.cyan }, areaStyle: { color: C.cyan, opacity: 0.6 } }]
    });
    chart("c-late", {
      grid: { left: 62, right: 10, top: 8, bottom: 22 },
      xAxis: { type: "category", data: months, axisLabel: { color: C.label, interval: 2 }, axisLine: { lineStyle: { color: C.line } } },
      yAxis: { type: "value", axisLabel: { color: C.label, formatter: function (v) { return pct(v, 0); } }, splitLine: { lineStyle: { color: C.line } } },
      tooltip: { trigger: "axis", formatter: function (p) { var m = o.monthly[p[0].dataIndex];
        return tipHtml(monthLabel(m.month), [["Late rate", pct(m.rate)], ["Late orders", fmtInt(m.late)], ["Orders with dates", fmtInt(m.eligible)]], "Late = delivered after the estimated date"); } },
      series: [{ type: "bar", data: o.monthly.map(function (m) { return m.rate; }), barWidth: "55%", itemStyle: { color: C.pink } }]
    });
    hbar("c-timing", o.timing, { left: 150, max: 5, name: function (d) { return d.bucket; }, value: function (d) { return d.review; },
      color: function (d) { return d.late ? C.pink : C.cyan; }, label: function (d) { return d.review.toFixed(2) + " ★"; }, barWidth: "50%",
      tip: function (d) { return tipHtml(d.bucket, [["Avg review", d.review.toFixed(2)], ["Delivered orders", fmtInt(d.orders)], ["Outcome", d.late ? "Late" : "On time or early"]], "Delivered orders, Sep 2016 – Aug 2018"); } });
    hbar("c-cats", o.top_categories, { left: 190, headroom: 2.4, alignLeft: true, name: function (d) { return pad(d.rank) + "  " + d.category; }, value: function (d) { return d.sales; },
      label: function (d) { return brlM(d.sales) + " · " + pct(d.share); },
      tip: function (d) { return tipHtml(d.category, [["Sales", brl(d.sales)], ["Share of sales", pct(d.share)], ["Orders", fmtInt(d.orders)]]); } });
    hbar("c-states", o.top_states, { left: 190, headroom: 3.2, alignLeft: true, name: function (d) { return pad(d.sales_rank) + "  " + d.name; }, value: function (d) { return d.sales; },
      color: function () { return C.cyan; }, label: function (d) { return brlM(d.sales) + " · " + pct(d.rate) + " late"; },
      tip: function (d) { return stateTip(d); } });
    hbar("c-worst", o.worst_late, { left: 190, headroom: 3.2, alignLeft: true, name: function (d) { return pad(d.late_rank) + "  " + d.name; }, value: function (d) { return d.rate; },
      color: function () { return C.pink; }, label: function (d) { return pct(d.rate) + " · " + k1(d.eligible) + " orders"; },
      tip: function (d) { return stateTip(d); } });
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function stateTip(d) {
    return tipHtml(d.name, [["Sales", brl(d.sales)], ["Delivered orders", fmtInt(d.orders)], ["Late rate", pct(d.rate) + " (" + fmtInt(d.late) + " late)"],
      ["Avg review", d.review.toFixed(2)], ["Region", d.region]]);
  }

  // ---------------------------------------------------------------- page: diagnostics
  function renderDiagnostics() {
    var g = D.diagnostics, sel = document.getElementById("region");
    if (sel.options.length === 1) {
      g.regions.forEach(function (r) { var op = document.createElement("option"); op.value = op.textContent = r; sel.appendChild(op); });
      sel.addEventListener("change", function () { state.region = sel.value; drawRegionCharts(); });
      document.getElementById("region-reset").addEventListener("click", function () { sel.value = ""; state.region = ""; drawRegionCharts(); });
    }
    drawRegionCharts();
    var cats = g.categories;
    hbar("c-catdiag", cats, { left: 160, max: 0.16, name: function (d) { return d.category; }, value: function (d) { return d.rate; }, barWidth: "55%",
      color: function (d) { return d.above_network ? C.pink : C.cyan; }, label: function (d) { return pct(d.rate) + " · " + d.review.toFixed(2) + " ★"; },
      tip: function (d) { return tipHtml(d.category, [["Late rate", pct(d.rate)], ["Vs network (" + pct(g.category_network) + ")", d.above_network ? "Above" : "At or below"],
        ["Avg review", d.review.toFixed(2)], ["Avg delivery days", d.days.toFixed(1)], ["Orders containing category", fmtInt(d.orders)], ["Category sales", brl(d.sales)]],
        "Per order containing the category (order × category grain)"); } });
    var ret = [["Late", g.retention.Late], ["On time", g.retention["On time"]]];
    chart("c-ret", {
      grid: { left: 10, right: 10, top: 22, bottom: 22 },
      xAxis: { type: "category", data: ret.map(function (r) { return r[0]; }), axisLabel: { color: C.text }, axisLine: { lineStyle: { color: C.line } }, axisTick: { show: false } },
      yAxis: { type: "value", show: false, max: 0.055 },
      tooltip: { trigger: "item", formatter: function (p) { var r = ret[p.dataIndex];
        return tipHtml("First order " + r[0].toLowerCase(), [["Repeat rate (2+ delivered orders)", pct(r[1].repeat_rate, 2)], ["Repeat customers", fmtInt(r[1].repeaters)], ["Customers", fmtInt(r[1].customers)]], "Unique customers; first delivered order before Mar 2018"); } },
      series: [{ type: "bar", barWidth: "40%", data: ret.map(function (r) { return { value: r[1].repeat_rate, itemStyle: { color: r[0] === "Late" ? C.pink : C.cyan } }; }),
        label: { show: true, position: "top", color: C.text, fontWeight: "bold", formatter: function (p) { var r = ret[p.dataIndex][1]; return pct(r.repeat_rate, 2) + " · " + k1(r.customers); } } }]
    });
    var inst = g.instalments, maxShare = 0.75;
    var t = '<div class="table-scroll"><table class="data"><caption class="sr-only">Credit-card orders by instalment band</caption><thead><tr><th>Term</th><th class="num">Orders</th><th class="num">AOV</th><th class="num">Review</th><th class="num">Late</th><th class="barcell">Share</th></tr></thead><tbody>';
    inst.forEach(function (b, i) {
      t += '<tr tabindex="0" id="inst-' + i + '"><td>' + esc(b.band) + '</td><td class="num">' + fmtInt(b.orders) + '</td><td class="num">' + brl(b.aov) +
        '</td><td class="num">' + b.review.toFixed(2) + '</td><td class="num">' + pct(b.rate) + '</td><td class="barcell">' + barCell(b.share, maxShare, C.cyan, pct(b.share)) + "</td></tr>";
    });
    document.getElementById("t-inst").innerHTML = t + "</tbody></table></div>";
    inst.forEach(function (b, i) {
      attachTip(document.getElementById("inst-" + i), tipHtml(b.band + " instalment" + (b.band === "1" ? "" : "s"), [["Share of card orders", pct(b.share)], ["Orders", fmtInt(b.orders)],
        ["Avg order value", "R$" + b.aov.toFixed(2)], ["Avg instalments", b.avg_instalments.toFixed(1)], ["Avg review", b.review.toFixed(2)], ["Late rate", pct(b.rate)]],
        "Review and late rate by band: association only. 2 orders with 0 instalments excluded."));
    });
  }
  function drawRegionCharts() {
    var g = D.diagnostics, regs = state.region ? [state.region] : g.regions;
    var data = [];
    g.heatmap.forEach(function (c) {
      var y = regs.indexOf(c.region); if (y < 0) return;
      data.push([g.months.indexOf(c.month), y, c.rate, c.late, c.eligible]);
    });
    var narrow = document.getElementById("c-heat").clientWidth < 700;
    var hc = chart("c-heat", {
      grid: { left: 96, right: 8, top: 22, bottom: 6 },
      xAxis: { type: "category", position: "top", data: g.months.map(monthLabel), axisLabel: { color: C.label, interval: narrow ? 3 : 0, fontSize: 11 }, axisLine: { show: false }, axisTick: { show: false }, splitArea: { show: false } },
      yAxis: { type: "category", inverse: true, data: regs, axisLabel: { color: C.text }, axisLine: { show: false }, axisTick: { show: false } },
      visualMap: { show: false, min: 0, max: 0.4, dimension: 2, inRange: { color: ["#1f2b3a", "#4a3050", "#8d3a63", "#c94272", C.pink] } },
      tooltip: { trigger: "item", formatter: function (p) { var v = p.data;
        return tipHtml(regs[v[1]] + " · " + monthLabel(g.months[v[0]]), [["Late rate", pct(v[2])], ["Late orders", fmtInt(v[3])], ["Orders with dates", fmtInt(v[4])],
          ["Region, Jan 2017 – Aug 2018", pct(g.region_rate[regs[v[1]]])]], v[4] < 50 ? "Small cell (under 50 orders): volatile." : ""); } },
      series: [{ type: "heatmap", data: data, label: { show: !narrow, color: C.text, fontSize: 11, formatter: function (p) { return pct(p.data[2]); } },
        itemStyle: { borderColor: C.card, borderWidth: 1 } }]
    });
    hc.resize();
    var st = g.states.filter(function (s) { return !state.region || s.region === state.region; });
    chart("c-scatter", {
      grid: { left: 52, right: 30, top: 12, bottom: 40 },
      xAxis: { type: "log", logBase: 10, min: 200, max: 60000, name: "Delivered orders (log scale)", nameLocation: "middle", nameGap: 26,
        nameTextStyle: { color: C.label }, axisLabel: { color: C.label, formatter: function (v) { return fmtInt(v); } }, splitLine: { show: false }, axisLine: { lineStyle: { color: C.line } } },
      yAxis: { type: "value", min: 0, max: 0.25, interval: 0.05, name: "Late rate", nameTextStyle: { color: C.label }, axisLabel: { color: C.label, formatter: function (v) { return pct(v, 0); } }, splitLine: { lineStyle: { color: C.line } } },
      tooltip: { trigger: "item", formatter: function (p) { var s = st[p.dataIndex];
        return tipHtml(s.name, [["Tier", s.tier], ["Late rate", pct(s.rate)], ["Gap vs network (pp)", (s.gap_pp >= 0 ? "+" : "") + s.gap_pp.toFixed(1)],
          ["Excess late orders", signed(s.excess)], ["Delivered orders", fmtInt(s.orders)]], "Network late rate = " + pct(D.meta.network_late_rate, 2)); } },
      series: [{ type: "scatter", symbolSize: 9, labelLayout: { hideOverlap: true },
        data: st.map(function (s) { return { value: [s.orders, s.rate], itemStyle: { color: TIER[s.tier] } }; }),
        label: { show: true, position: "bottom", color: C.text, fontSize: 11, fontWeight: "bold", formatter: function (p) { return st[p.dataIndex].code; } } }]
    });
    var note = document.getElementById("region-note");
    note.textContent = (state.region ? "Showing " + state.region + " (" + st.length + " of 21 states). " : "") +
      "The filter applies to the heatmap and the state scatter only. Headline, categories, retention and instalments always use all delivered orders.";
    if (!st.length) note.textContent = "No states with 300+ orders in this region. " + note.textContent;
  }

  // ---------------------------------------------------------------- page: seller
  function renderSeller() {
    var s = D.seller, sp = s.split;
    var outcomes = [["Late orders", sp["Late orders"]], ["On-time orders", sp["On-time orders"]]];
    ["disp", "tran"].forEach(function (kind) {
      hbar("c-" + kind, outcomes, { left: 104, max: 38, name: function (d) { return d[0]; }, barWidth: "40%",
        value: function (d) { return kind === "disp" ? d[1].dispatch : d[1].transit; },
        color: function (d) { return d[0] === "Late orders" ? C.pink : C.cyan; },
        label: function (d) { return (kind === "disp" ? d[1].dispatch : d[1].transit).toFixed(1) + " days"; },
        tip: function (d) { return tipHtml(d[0], [["Avg seller dispatch (purchase to hand-off)", d[1].dispatch.toFixed(1) + " days"],
          ["Avg carrier transit (hand-off to customer)", d[1].transit.toFixed(1) + " days"], ["Orders", fmtInt(d[1].orders)]],
          "96,281 orders with purchase ≤ hand-off ≤ delivery (197 excluded)"); } });
    });
    var ship = [["Shipped after limit", s.ship_limit["Shipped after limit"]], ["Shipped within limit", s.ship_limit["Shipped within limit"]]];
    hbar("c-ship", ship, { left: 130, max: 0.66, name: function (d) { return d[0]; }, barWidth: "40%", value: function (d) { return d[1].rate; },
      color: function (d) { return d[0] === "Shipped after limit" ? C.pink : C.cyan; },
      label: function (d) { return pct(d[1].rate) + " late · " + k1(d[1].orders) + " orders"; },
      tip: function (d) { return tipHtml(d[0], [["Late rate", pct(d[1].rate)], ["Late orders", fmtInt(d[1].late)], ["Orders", fmtInt(d[1].orders)]],
        "Shipping limit = latest shipping_limit_date of the order's items. Association."); } });
    function rateBars(id, items, left) {
      hbar(id, items, { left: left, max: 0.42, name: function (d) { return d.key; }, value: function (d) { return d.rate; }, barWidth: "55%",
        color: function (d) { return d.rate > s.network ? C.pink : C.cyan; }, label: function (d) { return pct(d.rate) + " · " + k1(d.orders); },
        tip: function (d) { return tipHtml(d.key, [["Late rate", pct(d.rate)], ["Network late rate", pct(s.network)], ["Seller-orders", fmtInt(d.orders)],
          ["Excess late orders", signed(d.excess)], ["Avg carrier transit", d.transit.toFixed(1) + " days"], ["Missed shipping limit", pct(d.missed)]],
          "Order × seller grain: an order with 2+ sellers counts once per seller"); } });
    }
    rateBars("c-routes", s.routes, 76);
    rateBars("c-sstates", s.seller_states, 40);
    var mx = s.sellers[0].excess;
    var t = '<div class="table-scroll"><table class="data"><caption class="sr-only">Seller exception list</caption><thead><tr><th>Seller</th><th>State</th><th class="num">Orders</th><th class="num">Late rate</th><th class="num">Missed limit</th><th class="num">Dispatch</th><th class="num">Review</th><th class="barcell">Excess late</th></tr></thead><tbody>';
    s.sellers.forEach(function (x, i) {
      t += '<tr tabindex="0" id="sel-' + i + '"><td><code>' + esc(x.key) + "</code></td><td>" + esc(x.state) + '</td><td class="num">' + fmtInt(x.orders) +
        '</td><td class="num">' + pct(x.rate) + '</td><td class="num">' + pct(x.missed, 0) + '</td><td class="num">' + x.dispatch.toFixed(1) + '</td><td class="num">' +
        x.review.toFixed(2) + '</td><td class="barcell">' + barCell(x.excess, mx, C.pink, signed(x.excess)) + "</td></tr>";
    });
    document.getElementById("t-sellers").innerHTML = t + "</tbody></table></div>";
    s.sellers.forEach(function (x, i) {
      attachTip(document.getElementById("sel-" + i), tipHtml("Seller " + x.key + " (" + x.state + ")", [["Seller-orders", fmtInt(x.orders)], ["Late rate", pct(x.rate)],
        ["Excess late orders", signed(x.excess)], ["Missed shipping limit", pct(x.missed)], ["Avg dispatch", x.dispatch.toFixed(1) + " days"],
        ["Avg transit", x.transit.toFixed(1) + " days"], ["Avg review", x.review.toFixed(2)], ["Seller sales", brl(x.sales)]],
        "Rank " + x.rank + " of " + s.ranked_sellers + ". Late flag and review are order-level, shared by every seller in the order."));
    });
  }

  // ---------------------------------------------------------------- page: action
  function renderAction() {
    var a = D.action, st = a.states;
    var mx = Math.max.apply(null, st.map(function (s) { return Math.abs(s.excess); })) * 1.9;
    var t = '<div class="table-scroll"><table class="data" id="queue"><caption class="sr-only">State exception queue</caption><thead><tr><th>State</th><th>Tier</th><th class="num">Orders</th><th class="num">Late rate</th><th class="num">Gap (pp)</th><th class="num">Review</th><th class="num">Late-order sales</th><th class="barcell wide">Excess late orders</th></tr></thead><tbody>';
    st.forEach(function (s) {
      t += '<tr data-code="' + s.code + '" id="row-' + s.code + '"><td><button type="button" class="state-btn" aria-pressed="false" data-code="' + s.code + '">' + esc(s.name) +
        '</button></td><td class="tier ' + s.tier + '">' + s.tier + '</td><td class="num">' + fmtInt(s.orders) + '</td><td class="num">' + pct(s.rate) +
        '</td><td class="num">' + (s.gap_pp >= 0 ? "+" : "") + s.gap_pp.toFixed(1) + '</td><td class="num">' + s.review.toFixed(2) + '</td><td class="num">' +
        brl(s.late_sales) + '</td><td class="barcell wide">' + barCell(s.excess, mx, TIER[s.tier], signed(s.excess), true) + "</td></tr>";
    });
    document.getElementById("t-action").innerHTML = t + "</tbody></table></div>";
    st.forEach(function (s) {
      attachTip(document.getElementById("row-" + s.code), tipHtml(s.name, [["Tier", s.tier], ["Region", s.region], ["Delivered orders", fmtInt(s.orders)],
        ["Late orders", fmtInt(s.late)], ["Late rate", pct(s.rate)], ["Network late rate", pct(D.meta.network_late_rate, 2)],
        ["Gap (pp)", (s.gap_pp >= 0 ? "+" : "") + s.gap_pp.toFixed(1)], ["Excess late orders", signed(s.excess)], ["Avg review", s.review.toFixed(2)],
        ["Sales on late orders", brl(s.late_sales)]], "Excess = late orders − orders with dates × network late rate. Click to filter the trend."));
    });
    document.querySelectorAll("#queue .state-btn").forEach(function (b) {
      b.addEventListener("click", function () { selectState(state.selected === b.dataset.code ? null : b.dataset.code, true); });
    });
    document.getElementById("trend-reset").addEventListener("click", function () { selectState(null, true); });
    selectState(state.selected, false);
  }
  function selectState(code, updateHash) {
    var a = D.action;
    if (code && !a.state_monthly[code]) code = null;
    state.selected = code;
    document.querySelectorAll("#queue tbody tr").forEach(function (tr) {
      var on = tr.dataset.code === code; tr.classList.toggle("selected", on);
      tr.querySelector(".state-btn").setAttribute("aria-pressed", on ? "true" : "false");
    });
    var key = code || "ALL", series = a.state_monthly[key], all = a.state_monthly.ALL, months = D.diagnostics.months;
    var name = code ? a.state_names[code] : "all 27 states";
    document.getElementById("trend-title").textContent = "Monthly late rate: " + name;
    document.getElementById("trend-sub").textContent = code ? "Pink bars = " + name + "; grey line = all states for context. Reset to clear." :
      "All delivered orders until a state is selected in the queue.";
    document.getElementById("trend-reset").hidden = !code;
    var rate = series.map(function (v) { return v[1] ? v[0] / v[1] : null; });
    var el = document.getElementById("c-trend");
    if (!rate.some(function (x) { return x !== null; })) { el.innerHTML = '<div class="empty">No delivered orders with dates for this selection.</div>'; return; }
    chart("c-trend", {
      grid: { left: 46, right: 10, top: 10, bottom: 24 },
      xAxis: { type: "category", data: months.map(monthLabel), axisLabel: { color: C.label, interval: 3 }, axisLine: { lineStyle: { color: C.line } } },
      yAxis: { type: "value", axisLabel: { color: C.label, formatter: function (v) { return pct(v, 0); } }, splitLine: { lineStyle: { color: C.line } } },
      tooltip: { trigger: "axis", formatter: function (p) { var i = p[0].dataIndex, v = series[i], w = all[i];
        var rows = [["Late rate", v[1] ? pct(v[0] / v[1]) : "no orders"], ["Late orders", fmtInt(v[0])], ["Orders with dates", fmtInt(v[1])]];
        if (code) rows.push(["All states", pct(w[0] / w[1])]);
        return tipHtml(name + " · " + monthLabel(months[i]), rows, "Late = delivered after the estimated date"); } },
      series: [{ type: "bar", data: rate, barWidth: "55%", itemStyle: { color: C.pink } }].concat(code ? [{ type: "line", data: all.map(function (v) { return v[0] / v[1]; }),
        symbol: "none", lineStyle: { color: C.muted, width: 1.5 } }] : [])
    });
    if (updateHash) history.replaceState(null, "", "#action" + (code ? "/" + code : ""));
  }

  // ---------------------------------------------------------------- self-test (?selftest=1): exercises the real event handlers
  function selfTest() {
    var out = [], ok = true;
    function check(name, cond) { out.push((cond ? "PASS " : "FAIL ") + name); ok = ok && cond; }
    location.hash = "#action"; route();
    var btn = document.querySelector('#queue .state-btn[data-code="RJ"]');
    btn.click();
    check("click RJ filters trend", document.getElementById("trend-title").textContent === "Monthly late rate: Rio de Janeiro (RJ)" &&
      btn.getAttribute("aria-pressed") === "true" && !document.getElementById("trend-reset").hidden && /#action\/RJ$/.test(location.hash));
    btn.click();
    check("second click clears", document.getElementById("trend-title").textContent === "Monthly late rate: all 27 states");
    document.querySelector('#queue .state-btn[data-code="SP"]').click();
    document.getElementById("trend-reset").click();
    check("reset clears", document.getElementById("trend-title").textContent === "Monthly late rate: all 27 states" &&
      document.getElementById("trend-reset").hidden);
    location.hash = "#diagnostics"; route();
    var sel = document.getElementById("region"); sel.value = "Northeast"; sel.dispatchEvent(new Event("change"));
    check("region filter Northeast", /^Showing Northeast \(9 of 21 states\)/.test(document.getElementById("region-note").textContent) &&
      charts["c-scatter"].getOption().series[0].data.length === 9 && charts["c-heat"].getOption().yAxis[0].data.length === 1);
    document.getElementById("region-reset").click();
    check("region reset", sel.value === "" && charts["c-scatter"].getOption().series[0].data.length === 21);
    check("headline unchanged by filters", document.querySelector("#page-action .band h1").textContent.indexOf("1,176") > -1);
    var pre = document.createElement("pre"); pre.id = "selftest"; pre.textContent = (ok ? "SELFTEST OK\n" : "SELFTEST FAILED\n") + out.join("\n");
    document.body.appendChild(pre);
  }

  // ---------------------------------------------------------------- routing
  var RENDER = { overview: renderOverview, diagnostics: renderDiagnostics, seller: renderSeller, action: renderAction };
  function route() {
    var h = (location.hash || "#overview").slice(1).split("/"), page = PAGES[h[0]] ? h[0] : "overview";
    if (page === "action" && h[1]) state.selected = h[1].toUpperCase();
    Object.keys(PAGES).forEach(function (p) {
      document.getElementById("page-" + p).hidden = p !== page;
      var link = document.querySelector('.nav a[data-page="' + p + '"]');
      if (p === page) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
    document.getElementById("brand-page").textContent = PAGES[page];
    document.title = "Olist Delivery Dashboard · " + PAGES[page].charAt(0) + PAGES[page].slice(1).toLowerCase();
    document.getElementById("takeaways").innerHTML = TAKEAWAYS[page].map(function (t) { return "<h4>" + esc(t[0]) + "</h4><p>" + esc(t[1]) + "</p>"; }).join("");
    if (!D) return;
    if (!rendered[page]) { RENDER[page](); rendered[page] = true; }
    else if (page === "action") selectState(state.selected, false);
    resizeVisible();
  }
  function resizeVisible() {
    if (rendered.diagnostics && !document.getElementById("page-diagnostics").hidden) drawRegionCharts();
    Object.keys(charts).forEach(function (id) { var el = document.getElementById(id); if (el && el.offsetParent !== null) charts[id].resize(); });
  }
  var rt = null;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(resizeVisible, 120); });
  window.addEventListener("hashchange", function () { route(); document.getElementById("main").focus({ preventScroll: true }); });

  document.addEventListener("DOMContentLoaded", function () {
    tipEl = document.getElementById("tip");
    route();
    if (typeof echarts === "undefined") { showError("The chart library could not be loaded. Check your connection and reload the page."); return; }
    fetch("./data/dashboard.json").then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) { D = data; document.getElementById("loading").hidden = true; route();
        if (/[?&]selftest=1/.test(location.search)) selfTest(); })
      .catch(function (e) { showError("Dashboard data could not be loaded (" + e.message + ")."); logError("data: " + e.message); });
  });
})();
