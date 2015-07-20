import React, {Component, PropTypes} from 'react';

import d3 from 'd3';

export default class ArcGauge extends Component {
  static propTypes = {
    value: PropTypes.number.required,
    width: PropTypes.number,
    strokeWidth: PropTypes.number
  };
  
  componentDidMount() {
    return this.renderArcGauge();
  }
  
  componentDidUpdate() {
    return this.renderArcGauge();
  }
  
  render() {
    return <div/>;
  }
  
  renderArcGauge() {
    function deg2rad(deg) {
      return deg / 180 * Math.PI;
    }
    
    const {value, width, strokeWidth} = this.props;
    
    const height = width / 2,
          el = React.findDOMNode(this);
          
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    let progress = 0,
        total = 0;

    let arc = d3.svg.arc()
        .startAngle(deg2rad(-80))
        .innerRadius(height - strokeWidth)
        .outerRadius(height)
        .cornerRadius(strokeWidth);

    let svg = d3.select(el).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height + ")");

    var meter = svg.append("g")
        .attr("class", "progress-meter")

    meter.append("path")
        .style("fill", "#ccc")
        .attr("d", arc.endAngle(deg2rad(80)));

    let foreground = meter.append("path");//.style("fill", "#000");

    let color = d3.scale.linear()
        .domain([0, 50, 100])
        .range(["green", "yellow", "red"]);

    let scale = d3.scale.linear()
        .domain([0, 100])
        .range([-1, 1]);

    let text = meter.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "24px")
        .attr("font-weight", "bold")
        .attr("dy", "-1em")
        .style("fill", function (){return color(value)});

    foreground.attr("d", arc.endAngle(deg2rad(80) * scale(value)))
      .style("fill", function() { return color(value) });

    text.text(value.toFixed(2));

    meter.transition();

    return meter;
  }
}
