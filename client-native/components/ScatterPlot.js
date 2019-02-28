import React from "react";
import {
  ART,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";

const { Surface, Group, Shape, Text } = ART;

import { max, ticks } from "d3-array";

import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as format from "d3-format";
import * as axis from "d3-axis";
import * as path from "d3-path";

import moment from "moment";

import { graphql } from "react-apollo";
import { currentUserQueryRecord } from "../lib/graphQL/queries";
import { branch, renderComponent } from "recompose";

const d3 = {
  scale,
  shape,
  format,
  axis,
  path
};

const enhance = branch(
  ({ data }) => data.currentUser == null && data.loading,
  renderComponent(ActivityIndicator)
);

class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);
    this.createPoints.bind(this);
    this.drawLine.bind(this);
  }

  drawLine(startPoint, endPoint) {
    var path = d3.path.path();
    path.lineTo(startPoint, endPoint);
    return path;
  }

  createPoints(x, y) {
    return d3
      .shape()
      .line()
      .x(x)
      .y(y);
  }

  render() {
    const margin = { top: 10, right: 10, bottom: 10, left: 20 };
    const width = Dimensions.get("window").width * 0.8;
    const height = 150;

    const data = this.props.data.currentUser.record.bloodPressure.map(bp => {
      return [bp.Diastolic, bp.Systolic];
    });

    const x = d3.scale
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map(d => d[0]));

    const maxFrequency = max(data, d => d[1]);

    const y = d3.scale
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([0, maxFrequency]);

    const firstLetterX = x(data[0][0]);
    const secondLetterX = x(data[1][0]);
    const lastLetterX = x(data[data.length - 1][0]);
    const labelDx = (secondLetterX - firstLetterX) / 2;

    const bottomAxis = [firstLetterX - labelDx, lastLetterX + labelDx];

    const bottomAxisD = d3.shape
      .line()
      .x(d => d + labelDx)
      .y(() => 0)(bottomAxis);

    const leftAxis = ticks(0, maxFrequency, 5);

    const leftAxisD = d3.shape
      .line()
      .x(() => bottomAxis[0] + labelDx)
      .y(d => y(d) - height)(leftAxis);
    const notch = 3;
    const labelDistance = 9;
    const emptySpace = "";
    return (
      <React.Fragment>
        <Surface width={Dimensions.get("window").width * 0.9} height={250}>
          <Group x={margin.left} y={margin.top}>
            <Group x={0} y={height}>
              <Group key={-1}>
                <Shape d={bottomAxisD} stroke="#01395c" key="-1" />

                {data.map((d, i) => (
                  <Group x={x(d[0]) + labelDx} y={0} key={i + 1}>
                    <Shape
                      d={this.drawLine(0, notch)}
                      y2={notch}
                      stroke="#01395c"
                    />
                    <Text
                      x={-15}
                      y={labelDistance}
                      fill="#01395c"
                      font="11px helvetica"
                    >
                      Hola {d[0]}
                    </Text>
                  </Group>
                ))}
              </Group>

              <Group key={-2}>
                <Shape stroke="#01395c" d={leftAxisD} key="-1" />

                {leftAxis.map((d, i) => (
                  <Group x={0} y={y(d) - height} key={i + 1}>
                    <Shape d={this.drawLine(notch, 0)} stroke="#01395c" />
                    <Text
                      fill="#01395c"
                      x={-21}
                      y={-labelDistance}
                      font="11px helvetica"
                    >
                      {d + emptySpace}
                    </Text>
                  </Group>
                ))}
              </Group>

              {data.map((d, i) => (
                <TouchableWithoutFeedback key={i}>
                  <Shape
                    d={this.createPoints(d[0], d[1])}
                    fill={this.props.color}
                  />
                </TouchableWithoutFeedback>
              ))}
            </Group>
          </Group>
        </Surface>
      </React.Fragment>
    );
  }
}

export default graphql(currentUserQueryRecord)(enhance(ScatterPlot));
