/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable camelcase */
/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */

import { useLayoutEffect } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

const chartOpts = {
  dataSource: {
    url: `/api/orders`,
    reloadFrequency: 30 * 1000,
  },
  numberFormatter: {
    format: "#,###.####",
  },
};

function makeDepthPointOnChart({ value, volume, totalvolume }, type) {
  return {
    value,
    [`${type}volume`]: volume,
    [`${type}totalvolume`]: totalvolume,
  };
}

function sortByKey(key = "value") {
  return (a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }

    return 0;
  };
}

function isTokenBoughtProcess(order) {
  const { giveCurrency } = order;
  return "0x0000000000000000000000000000000000000000" === giveCurrency;
}

function isTokenSellProcess(order) {
  const { takeCurrency } = order;
  return "0x0000000000000000000000000000000000000000" === takeCurrency;
}

function unify(order) {
  if (isTokenBoughtProcess(order)) {
    return {
      value: Number(order.give),
      volume: Number(order.take),
    };
  } else {
    return {
      value: Number(order.take),
      volume: Number(order.give),
    };
  }
}

function round(n) {
  return Math.round(10e4 * n) / 10e4;
}

function processOrdersData(res, orders, type, desc) {
  let _list = orders
    .map(unify)
    .sort((a, b) => a.value - b.value)
    .reduce((acc, { value, volume }) => {
      if (acc.length === 0) {
        acc.push({
          value,
          volume,
        });
        return acc;
      }
      if (acc[acc.length - 1].value === value) {
        acc[acc.length - 1].volume = round(acc[acc.length - 1].volume + volume);
      } else {
        acc.push({
          value,
          volume,
        });
      }

      return acc;
    }, []);

  let _fn = "push";

  if (desc) {
    _list = _list.reverse();
    _fn = "unshift";
  }

  for (var i = 0; i < _list.length; i++) {
    if (i > 0) {
      _list[i].totalvolume = round(_list[i - 1].totalvolume + _list[i].volume);
    } else {
      _list[i].totalvolume = round(_list[i].volume);
    }
    res[_fn](makeDepthPointOnChart(_list[i], type));
  }
}

function createSeries(chart) {
  const series = chart.series.push(new am4charts.StepLineSeries());
  series.dataFields.categoryX = "value";
  series.dataFields.valueY = "bidstotalvolume";
  series.strokeWidth = 2;
  series.stroke = am4core.color("#0f0");
  series.fill = series.stroke;
  series.fillOpacity = 0.1;
  series.tooltipText =
    "Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{bidsvolume}[/]";

  const series2 = chart.series.push(new am4charts.StepLineSeries());
  series2.dataFields.categoryX = "value";
  series2.dataFields.valueY = "askstotalvolume";
  series2.strokeWidth = 2;
  series2.stroke = am4core.color("#f00");
  series2.fill = series2.stroke;
  series2.fillOpacity = 0.1;
  series2.tooltipText =
    "Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{asksvolume}[/]";

  // const series3 = chart.series.push(new am4charts.ColumnSeries());
  // series3.dataFields.categoryX = 'value';
  // series3.dataFields.valueY = 'bidsvolume';
  // series3.strokeWidth = 0;
  // series3.fill = am4core.color('#000');
  // series3.fillOpacity = 0.2;

  // const series4 = chart.series.push(new am4charts.ColumnSeries());
  // series4.dataFields.categoryX = 'value';
  // series4.dataFields.valueY = 'asksvolume';
  // series4.strokeWidth = 0;
  // series4.fill = am4core.color('#000');
  // series4.fillOpacity = 0.2;
}

function createXYAxis(chart) {
  // Create axes
  const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  xAxis.dataFields.category = "value";
  // xAxis.renderer.grid.template.location = 0;
  xAxis.renderer.minGridDistance = 50;
  xAxis.title.text = "Price (ETH)";

  const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  yAxis.title.text = "Volume";
}

function initStockChart() {
  const stock = am4core.create("chartdiv", am4charts.XYChart);

  // console.log(stock.dataSource)
  stock.dataSource.url = chartOpts.dataSource.url;
  stock.dataSource.reloadFrequency = chartOpts.dataSource.reloadFrequency;
  stock.dataSource.adapter.add("parsedData", (data) => {
    const res = [];
    processOrdersData(res, data.sells, "asks", false); // ask to sell
    processOrdersData(res, data.buys, "bids", true); // bid to buy
    return res.sort((a, b) => a.value - b.value);
  });

  // Set up precision for numbers
  stock.numberFormatter.numberFormat = chartOpts.numberFormatter.format;

  stock.cursor = new am4charts.XYCursor();

  return stock;
}

const useStockChart = () => {
  useLayoutEffect(() => {
    const stock = initStockChart();
    createXYAxis(stock);
    createSeries(stock);
  }, []);

  return null;
};

export { useStockChart };
