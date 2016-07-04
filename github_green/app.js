/**
 * Created by wangning on 16/7/4.
 */
(function() {
  //UI configuration
  var itemSize = 18,
      cellSize = itemSize - 1,
      width = 500,
      height = 200,
      margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 25,
        last:142
      };
  //formats
  var hourFormat = d3.time.format('%H'),
      dayFormat = d3.time.format('%j'), //天数
      timeFormat = d3.time.format('%Y-%m-%dT%X'),
      monthDayFormat = d3.time.format('%m.%d');

  //data vars for rendering
  var dateExtent = null,
      data = null,
      dayOffset = 0,
      colorCalibration = ['#96a6b5', '#96a6b5', '#32485e', '#32485e', '#4f85bb', '#64b0fc'],
      dailyValueExtent = {};

  //axises and scales
  var axisWidth = itemSize * 24,
      axisHeight = 0,
      xAxisScale = d3.scale.linear()
          .domain([0,24])
          .range([0,axisWidth]),
      xAxis = d3.svg.axis()
          .orient('bottom')
          .ticks([])
          .tickFormat(d3.format('01d'))
          .scale(xAxisScale),
      yAxisScale = d3.time.scale(),
      yAxis = d3.svg.axis()
          .orient('left');
    //xAxisScale.ticks([0,6,12,18,24])
  var svg = d3.select('[role="heatmap"]');
  var heatmap = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  var rect = null;

  d3.json('pm25.json', function(err, data) {
    data = data.data;
    data.forEach(function(valueObj) {
      valueObj['date'] = timeFormat.parse(valueObj['timestamp']);
      var day = valueObj['day'] = monthDayFormat(valueObj['date']);
      //console.log(day);
      var dayData = dailyValueExtent[day] = (dailyValueExtent[day] || [1000, -1]);
      //console.log(dayData);
      var pmValue = valueObj['value']['PM2.5'];
      //console.log(pmValue);
      dayData[0] = d3.min([dayData[0], pmValue]);
      dayData[1] = d3.max([dayData[1], pmValue]);
    });

    dateExtent = d3.extent(data, function(d) {
      return d.date;
      //consle.log(d.date);
    });
    console.log(dateExtent);
    //[Thu Sep 25 2014 00:00:00 GMT+0800 (CST), Thu Oct 16 2014 23:00:00 GMT+0800 (CST)]
    axisHeight = itemSize * (dayFormat(dateExtent[1]) - dayFormat(dateExtent[0]) + 1);
    //计算宽度从数据的第一天到数据的最后一天,可以写死,因为项目只需要7天
    //render axises
    yAxis.scale(yAxisScale.range([0, axisHeight]).domain([dateExtent[0], dateExtent[1]]));
    svg.append('g')
        // 进行移动
        .attr('transform', 'translate(' + margin.left + ',' + margin.last + ')')
        .attr('class', 'x axis')
        .call(xAxis)
        .append('text');

    svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('class', 'y axis');

    //render heatmap rects
    dayOffset = dayFormat(dateExtent[0]);
    //console.log(dayFormat(dateExtent[1]));
    //365天中的哪一天
    console.log(heatmap.select('rect'));
    rect = heatmap.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('x', function(d) {
          //console.log(d);
          //计算偏移量hourFormat(d.date) * itemSize;
          return hourFormat(d.date) * itemSize;
        })
        .attr('y', function(d) {
          return itemSize * (dayFormat(d.date) - dayOffset);
        })
        .attr('fill', '#ffffff');

    rect.filter(function(d) {
          return d.value['PM2.5'] > 0;
        })
        .append('title')
        .text(function(d) {
          return monthDayFormat(d.date) + ' '+hourFormat(d.date)+' ' + d.value['PM2.5'];
        });

    renderColor();
  });
  function renderColor() {
    rect
        .filter(function(d) {
          return (d.value['PM2.5'] >= 0);
        })
        .transition()
        .delay(function(d) {
          return (dayFormat(d.date) - dayOffset) * 15;
        })
        .duration(500)
        .attrTween('fill', function(d, i, a) {
          // 由相同颜色向不同颜色的平滑过度
          //choose color dynamicly
          var colorIndex = d3.scale.quantize()
              .range([0, 1, 2, 3, 4, 5])
              .domain(([0, 500]));

          return d3.interpolate(a, colorCalibration[colorIndex(d.value['PM2.5'])]);
        });
  }

  //extend frame height in `http://bl.ocks.org/`
  d3.select(self.frameElement).style("height", "600px");
})();