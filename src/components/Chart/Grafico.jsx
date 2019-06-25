import React, { Component } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

class CustomizedAxisTick extends Component {
    render() {
        const {
            x, y, payload
        } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text fontSize={10} x={0} y={0} dy={17} textAnchor="end" fill="#666" transform="rotate(-56)">{payload.value}</text>
            </g>
        );
    }
}

export default class Grafico extends Component {

    render() {
        const { data } = this.props;
        return (
            <ResponsiveContainer height={430}>
                <LineChart
                    data={data.values}
                    margin={{ top: 3, right: 15, left: -30, bottom: 30, }}>
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey={'data'} height={70} tick={<CustomizedAxisTick />} />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line type="monotone" dataKey={data.label1} stroke={data.color1} dot={false} />
                    <Line type="monotone" dataKey={data.label2} stroke={data.color2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}



