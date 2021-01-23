
# charts 

a lightweight canvas chart library
-- for mobile

# more
<a href="https://www.gitsu.cn/article79">
    <img src="https://img.shields.io/badge/charts-介绍-brightgreen" alt="charts" />
</a>
<a href="https://winesu.github.io/charts/dist/index.html?s==22">
    <img src="https://img.shields.io/badge/charts-预览-brightgreen" alt="charts" />
</a>

## Quickstart

```
$ git clone https://github.com/wineSu/charts.git
$ cd charts
$ npm i
$ npm run dev
$ npm run build
```

## Usage

```
const lineChart = Charts({
    id:'can1',
    type:'line',
    data:[{
        xVal:'5-26',
        yVal:40
    },{
        xVal:'5-27',
        yVal:20
    },{
        xVal:'5-28',
        yVal:30
    },{
        xVal:'5-29',
        yVal:80
    },{
        xVal:'5-30',
        yVal:60
    },{
        xVal:'6-01',
        yVal:20
    }]
});

... 

```
